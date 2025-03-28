import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { sendRevalidationToClients } from './listen/route';
import { recordRevalidation } from './poll/route';

// Optional secret to add an additional layer of security
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();
    
    // If you have a secret, validate it
    if (secret && body.secret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    
    // Check if this is a document from your dataset
    if (body._type) {
      console.log('Revalidating due to Sanity update:', body._type);
      
      // Document type-specific revalidation
      switch (body._type) {
        case 'themeSettings':
          // Revalidate using tag-based approach
          revalidateTag('themeSettings');
          // Also revalidate the entire layout since theme affects the whole site
          revalidatePath('/', 'layout');
          break;
        
        case 'hero':
        case 'servicesNav':
        case 'transformBanner':
        case 'servicesSection':
        case 'ctaBanner':
        case 'contactForm':
          // Revalidate the specific document type
          revalidateTag(body._type);
          // Also do a page revalidation since these components are on the homepage
          revalidatePath('/', 'page');
          break;
          
        default:
          // For any other type, just revalidate the home page
          revalidatePath('/', 'page');
      }
      
      // Notify any connected clients to refresh and update polling timestamp
      try {
        // Update the revalidation timestamp for polling
        const timestamp = recordRevalidation();
        
        // Send event to connected clients
        sendRevalidationToClients();
        
        console.log(`Revalidation recorded at: ${new Date(timestamp).toISOString()}`);
      } catch (err) {
        console.error('Error sending revalidation to clients:', err);
      }
      
      return NextResponse.json({ 
        revalidated: true,
        message: `Revalidated content for ${body._type}`
      });
    }
    
    return NextResponse.json({ 
      message: 'No valid document type received' 
    }, { status: 400 });
    
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err.message 
    }, { status: 500 });
  }
}

// Support for GET requests for testing
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    
    // Validate secret
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    
    // Test revalidation
    revalidatePath('/', 'page');
    
    return NextResponse.json({ 
      revalidated: true,
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err.message 
    }, { status: 500 });
  }
}