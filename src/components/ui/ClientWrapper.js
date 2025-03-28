'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

// This component forces a refresh when Sanity content changes
export default function ClientWrapper({ children }) {
  // Use refs instead of state to avoid re-renders
  const isPollingRef = useRef(false);
  const lastContentVersionRef = useRef(Date.now());
  const lastManualCheckTimeRef = useRef(0);
  
  // For SSE connection and polling interval
  const evtSourceRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  
  // Use a ref to track if we're mounted to avoid memory leaks
  const isMountedRef = useRef(true);

  // Hard reload the page, bypassing cache
  const forceHardReload = useCallback(() => {
    if (!isMountedRef.current) return;
    
    console.log('🔄🔄🔄 Forcing hard refresh to get latest content...');
    
    // Set a query parameter to avoid cache
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('_vercel_no_cache', Date.now().toString());
    
    // Force reload with cache bypass
    window.location.href = newUrl.toString();
  }, []);

  // Check for content updates without causing re-renders
  const checkForContentUpdates = useCallback(() => {
    if (!isMountedRef.current) return;
    
    const timestamp = Date.now();
    lastManualCheckTimeRef.current = timestamp;
    
    fetch(`/api/revalidate/poll?ts=${timestamp}&lastCheck=${lastContentVersionRef.current}`)
      .then(response => response.json())
      .then(data => {
        if (!isMountedRef.current) return;
        
        // Update our last known content version if newer
        if (data.lastRevalidation > lastContentVersionRef.current) {
          lastContentVersionRef.current = data.lastRevalidation;
          console.log('🔄 Content update detected via polling, refreshing...');
          forceHardReload();
        }
      })
      .catch(error => {
        if (isMountedRef.current) {
          console.error('Content check error:', error);
        }
      });
  }, [forceHardReload]);

  // Set up SSE and polling
  const setupContentMonitoring = useCallback(() => {
    if (!isMountedRef.current) return;
    
    // Set up Server-Sent Events
    const setupSSE = () => {
      console.log('Setting up SSE connection for real-time updates...');
      const evtSource = new EventSource('/api/revalidate/listen');
      
      evtSource.onmessage = (event) => {
        if (!isMountedRef.current) return;
        
        try {
          const data = JSON.parse(event.data);
          
          if (data.revalidated) {
            console.log('🔄 Content update detected via SSE, refreshing page...');
            forceHardReload();
          }
        } catch (err) {
          console.error('Error processing SSE message:', err);
        }
      };
      
      evtSource.onopen = () => {
        if (isMountedRef.current) {
          console.log('SSE connection established');
        }
      };
      
      evtSource.onerror = (err) => {
        if (!isMountedRef.current) return;
        
        console.error('SSE connection error, falling back to polling...', err);
        evtSource.close();
        
        // Fallback to polling if SSE fails
        if (!isPollingRef.current) {
          isPollingRef.current = true;
          startPolling();
        }
      };
      
      evtSourceRef.current = evtSource;
    };
    
    // Start polling for updates
    const startPolling = () => {
      if (!isMountedRef.current || pollingIntervalRef.current) return;
      
      console.log('Starting revalidation polling...');
      
      // Immediate check
      checkForContentUpdates();
      
      // Set up interval for subsequent checks
      pollingIntervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          checkForContentUpdates();
        }
      }, 5000);
    };
    
    // Start monitoring
    try {
      setupSSE();
      startPolling(); // Always do both for redundancy
    } catch (err) {
      console.error('Failed to setup content monitoring:', err);
    }
    
    // Manual periodic refresh as a fallback
    const refreshTimer = setTimeout(() => {
      if (isMountedRef.current) {
        console.log('Periodic refresh timer triggered');
        forceHardReload();
      }
    }, 120000); // 2 minutes
    
    // Cleanup function
    return () => {
      isMountedRef.current = false;
      
      if (evtSourceRef.current) {
        evtSourceRef.current.close();
        evtSourceRef.current = null;
      }
      
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      
      clearTimeout(refreshTimer);
    };
  }, [checkForContentUpdates, forceHardReload]);

  // Handle visibility and focus events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isMountedRef.current) return;
      
      if (document.visibilityState === 'visible') {
        // Only check if we haven't checked recently
        if (Date.now() - lastManualCheckTimeRef.current > 5000) {
          console.log('Page became visible, checking for updates...');
          checkForContentUpdates();
        }
      }
    };
    
    const handleFocus = () => {
      if (!isMountedRef.current) return;
      
      if (Date.now() - lastManualCheckTimeRef.current > 10000) {
        console.log('Window focus detected, checking for updates...');
        checkForContentUpdates();
      }
    };
    
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkForContentUpdates]);

  // Main setup effect - only runs once on component mount
  useEffect(() => {
    isMountedRef.current = true;
    const cleanup = setupContentMonitoring();
    
    return () => {
      isMountedRef.current = false;
      if (cleanup) cleanup();
    };
  }, [setupContentMonitoring]);
  
  return children;
}