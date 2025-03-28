'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import Footer with SSR disabled to prevent hydration errors
const Footer = dynamic(() => import('./Footer'), { 
  ssr: false,
  loading: () => <div className="w-full h-16 bg-background"></div>
});

export default function ClientFooter() {
  // Start with client-side only rendering (useEffect)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-16 bg-background"></div>;
  }
  
  return <Footer />;
}