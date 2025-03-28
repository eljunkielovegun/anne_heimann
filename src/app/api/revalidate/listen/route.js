import { NextResponse } from 'next/server';

// Track connected clients and their writable streams
const clients = new Set();

// Last revalidation timestamp
let lastRevalidationTime = Date.now();

// Method to send revalidation message to all clients
export function sendRevalidationToClients() {
  // Update the revalidation timestamp
  lastRevalidationTime = Date.now();
  
  // Prepare the message
  const message = JSON.stringify({ 
    revalidated: true, 
    timestamp: lastRevalidationTime
  });
  
  // Debugging
  console.log(`Broadcasting revalidation to ${clients.size} connected clients`);
  
  // Encode message once for all clients
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(`data: ${message}\n\n`);
  
  // Send to all connected clients
  clients.forEach(client => {
    try {
      client.write(encodedMessage)
        .catch(err => {
          console.error('Error writing to client:', err);
          clients.delete(client);
        });
    } catch (err) {
      console.error('Error sending to client:', err);
      clients.delete(client);
    }
  });
  
  return lastRevalidationTime;
}

// SSE implementation with keepalive
export async function GET() {
  try {
    // Create a transform stream for SSE
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();
    
    // Track this client
    clients.add(writer);
    console.log(`New client connected. Total clients: ${clients.size}`);
    
    // Keep alive ping
    const pingInterval = setInterval(async () => {
      try {
        // Send a ping to keep the connection alive
        await writer.write(encoder.encode(`: ping\n\n`));
      } catch (err) {
        console.error('Error during keepalive:', err);
        clearInterval(pingInterval);
        clients.delete(writer);
      }
    }, 30000); // 30-second ping
    
    // When the request is aborted, clean up
    const cleanup = () => {
      clearInterval(pingInterval);
      clients.delete(writer);
      console.log(`Client disconnected. Remaining clients: ${clients.size}`);
    };
    
    // Send initial connection message
    const initialMessage = JSON.stringify({ 
      connected: true, 
      timestamp: Date.now(),
      lastRevalidation: lastRevalidationTime
    });
    await writer.write(encoder.encode(`data: ${initialMessage}\n\n`));
    
    // After sending initial message, check for immediate revalidation
    const timestamp = Date.now();
    if (timestamp - lastRevalidationTime < 5000) {
      // If there was a revalidation in the last 5 seconds, send a revalidation event too
      const revalidateMessage = JSON.stringify({ 
        revalidated: true, 
        timestamp: Date.now(),
        reason: 'recent_update' 
      });
      await writer.write(encoder.encode(`data: ${revalidateMessage}\n\n`));
    }
    
    // Return a readable stream as the response
    return new NextResponse(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform, no-store, must-revalidate',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable buffering for Nginx
      },
    });
  } catch (err) {
    console.error('Error setting up SSE:', err);
    return new NextResponse('Error setting up event stream', { status: 500 });
  }
}