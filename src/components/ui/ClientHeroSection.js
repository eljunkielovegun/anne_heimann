'use client';

import dynamic from 'next/dynamic';
import { useClientMounted } from '@/lib/hooks/useClientMounted';

// Import HeroSection with improved loading state
const HeroSection = dynamic(() => import('../sections/HeroSection'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-background animate-pulse"></div>
});

export default function ClientHeroSection({ data }) {
  const mounted = useClientMounted();
  
  // If not mounted yet on client, show placeholder with animation
  if (!mounted) {
    return <div className="w-full h-[400px] bg-background animate-pulse"></div>;
  }
  
  return <HeroSection data={data} />;
}