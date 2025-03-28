'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import ServicesNav with SSR disabled to prevent hydration errors
const ServicesNav = dynamic(() => import('./ServicesNav'), { 
  ssr: false,
  loading: () => <div className="w-full h-14 bg-background"></div>
});

export default function ClientServicesNav({ data }) {
  // Start with client-side only rendering (useEffect)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-14 bg-background"></div>;
  }
  
  return <ServicesNav data={data} />;
}