// Simple script to test the revalidation endpoint
// Run with: node test-revalidation.js

async function testRevalidation() {
  // Replace with your domain when testing in production
  const baseUrl = 'http://localhost:3000';
  const revalidateUrl = `${baseUrl}/api/revalidate`;
  const secret = 'anne-heimann-revalidate-2024';

  try {
    console.log(`Testing revalidation at: ${revalidateUrl}`);
    
    // Try a GET request first (simpler)
    const getResponse = await fetch(`${revalidateUrl}?secret=${secret}`);
    const getData = await getResponse.json();
    console.log('GET Response:', getData);
    
    // Then try a POST request (actual webhook format)
    const postResponse = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: 'themeSettings',
        _id: 'theme-settings',
        secret: secret,
      }),
    });
    
    const postData = await postResponse.json();
    console.log('POST Response:', postData);
    
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testRevalidation();