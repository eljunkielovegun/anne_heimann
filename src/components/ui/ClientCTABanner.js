'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import CTABanner with SSR disabled to prevent hydration errors
const CTABanner = dynamic(() => import('./CTABanner'), { 
  ssr: false,
  loading: () => <div className="w-full h-12 bg-primary"></div>
});

export default function ClientCTABanner({ data }) {
  // Start with client-side only rendering (useEffect)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-12 bg-primary"></div>;
  }
  
  return <CTABanner data={data} />;
}