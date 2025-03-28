import { NextResponse } from 'next/server';

// Track the last revalidation timestamp and all revalidation events
let lastRevalidationTime = Date.now();
let revalidationHistory = [lastRevalidationTime];  // Keep history of timestamps

// Method to update the timestamp when revalidation happens
export function recordRevalidation() {
  lastRevalidationTime = Date.now();
  
  // Add to history, limit to last 10 events
  revalidationHistory.push(lastRevalidationTime);
  if (revalidationHistory.length > 10) {
    revalidationHistory.shift();
  }
  
  console.log(`Revalidation recorded at ${new Date(lastRevalidationTime).toISOString()}`);
  console.log(`Recent revalidation history: ${revalidationHistory.map(ts => new Date(ts).toISOString()).join(', ')}`);
  
  return lastRevalidationTime;
}

// Get server-side generated response - prevents caching
function getResponseData(clientLastCheck) {
  // Always force cache busting
  const currentTime = Date.now();
  
  let shouldRevalidate = false;
  let reason = '';
  
  // Case 1: Client has older data than our most recent update
  if (clientLastCheck && parseInt(clientLastCheck) < lastRevalidationTime) {
    shouldRevalidate = true;
    reason = 'newer_content_available';
  } 
  // Removed other cases to prevent duplicate refreshes
  
  return {
    lastRevalidation: lastRevalidationTime,
    revalidationHistory: revalidationHistory,
    currentTime,
    shouldRevalidate,
    reason
  };
}

// Polling endpoint
export async function GET(request) {
  // Get client's last known revalidation time from query params
  const url = new URL(request.url);
  const clientLastCheck = url.searchParams.get('lastCheck');
  
  // Generate response data
  const responseData = getResponseData(clientLastCheck);
  
  // Return with no-cache headers
  return NextResponse.json(responseData, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}