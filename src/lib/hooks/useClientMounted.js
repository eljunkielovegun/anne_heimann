'use client';

import { useState, useEffect } from 'react';

// A simple hook to handle client-side mounting
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted;
}