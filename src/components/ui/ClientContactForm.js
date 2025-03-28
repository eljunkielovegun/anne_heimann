'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import ContactForm with SSR disabled to prevent hydration errors
const ContactForm = dynamic(() => import('../sections/ContactForm'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-background"></div>
});

export default function ClientContactForm({ data }) {
  // Start with client-side only rendering (useEffect)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-[500px] bg-background"></div>;
  }
  
  return <ContactForm data={data} />;
}