import { definePlugin } from 'sanity';

// Custom plugin to trigger revalidation when content is published in Sanity Studio
export const sanityRevalidate = definePlugin({
  name: 'sanity-revalidate',
  document: {
    // Keep document actions
    actions: (prev) => prev,
    
    // Listen specifically for publish events with retry logic
    published: async (doc) => {
      try {
        if (!doc || !doc._type) {
          console.warn('No document type available for revalidation');
          return;
        }
        
        // Get environment variables - try both formats (Studio and regular)
        const revalidateSecret = 
          import.meta.env?.SANITY_STUDIO_REVALIDATE_SECRET || 
          process.env?.SANITY_STUDIO_REVALIDATE_SECRET ||
          "anne-heimann-revalidate-2024"; // Fallback
        
        // Get the document info for the revalidation request
        const { _type, _id } = doc;
        
        // Determine the correct URL for the revalidation endpoint
        let revalidateUrl;
        if (typeof window !== 'undefined') {
          // Get origin and transform if needed
          const origin = window.location.origin;
          // Remove /studio if present
          const baseUrl = origin.replace(/\/studio\/?$/, '');
          revalidateUrl = `${baseUrl}/api/revalidate`;
        } else {
          // Fallback to a hardcoded URL if not in browser
          revalidateUrl = 'https://anneheimann.com/api/revalidate';
        }
        
        console.log(`🔄 Triggering revalidation for ${_type} (${_id})`);
        console.log(`Sending request to: ${revalidateUrl}`);
        
        // Make the revalidation request with 3 retries
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const response = await fetch(revalidateUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store',
                'Pragma': 'no-cache',
              },
              body: JSON.stringify({
                _type,
                _id,
                secret: revalidateSecret,
                timestamp: Date.now(), // Force unique request
              }),
              // Force no-cache for the request
              cache: 'no-store',
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log(`✅ Revalidation successful (attempt ${attempt}):`, result);
              
              // Make a second request to the poll endpoint to ensure timestamps are updated
              try {
                const pollResponse = await fetch(`${revalidateUrl.replace(/\/revalidate$/, '')}/revalidate/poll?force=true&ts=${Date.now()}`);
                if (pollResponse.ok) {
                  console.log('✅ Poll endpoint updated');
                }
              } catch (pollErr) {
                console.log('Warning: Poll notification failed:', pollErr);
              }
              
              // Stop trying after success
              break;
            } else {
              console.error(`❌ Revalidation failed (attempt ${attempt}): ${response.status}`);
              // We'll retry if it wasn't the last attempt
              if (attempt === 3) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
              }
            }
          } catch (err) {
            console.error(`❌ Revalidation request error (attempt ${attempt}):`, err);
          }
          
          // Wait before retrying (exponential backoff)
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          }
        }
      } catch (err) {
        console.error('❌ Unhandled revalidation error:', err);
      }
    }
  }
});