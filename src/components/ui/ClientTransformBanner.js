'use client';

import dynamic from 'next/dynamic';
import { useClientMounted } from '@/lib/hooks/useClientMounted';

// Import direct implementation with no overlays
const TransformBanner = dynamic(() => import('../sections/DirectTransformBanner'), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-primary animate-pulse"></div>
});

export default function ClientTransformBanner({ data }) {
  const mounted = useClientMounted();
  
  if (!mounted) {
    // Return a placeholder while not mounted to avoid hydration mismatch
    return <div className="w-full h-[600px] bg-primary animate-pulse"></div>;
  }
  
  return <TransformBanner data={data} />;
}