'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import ServicesSection with SSR disabled to prevent hydration errors
const ServicesSection = dynamic(() => import('../sections/ServicesSection'), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-background"></div>
});

export default function ClientServicesSection({ data }) {
  // Start with client-side only rendering (useEffect)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-[600px] bg-background"></div>;
  }
  
  return <ServicesSection data={data} />;
}