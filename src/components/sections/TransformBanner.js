import React from 'react';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Buttons';
import ScrollLink from '@/components/ui/ScrollLink'


const TransformBanner = ({ data }) => {
  const content = {
    mainHeading: data?.mainHeading || "Transform Your Life and Love Today",
    description: data?.description || "Unlock your potential and find true connection with expert guidance from a dedicated life and dating coach. Discover practical strategies to enhance your relationships and achieve personal growth.",
    primaryButton: data?.primaryButton || {
      text: "Learn More",
      link: "#contact"
    },
    secondaryButton: data?.secondaryButton || {
      text: "Sign Up",
      link: "#contact"
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full h-[600px] md:h-[800px] lg:h-[971px] relative bg-black/50 flex items-center justify-center">
        <img 
          src="/images/lovers.png"
          alt="Transform your life"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-16 relative">
          <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
            <Typography 
              variant="display" 
              className="text-[hsl(var(--background))] max-w-[798px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {content.mainHeading}
            </Typography>

            <div className="max-w-[768px] px-4 sm:px-8">
              <Typography 
                variant="body-large" 
                className="text-[hsl(var(--background))] text-lg sm:text-xl md:text-2xl"
              >
                {content.description}
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-8 md:mt-16">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-8 md:mt-16">
              <ScrollLink 
                variant="secondary" 
                href="#contact"
                className="bg-[hsl(var(--background))] hover:bg-[hsl(var(--background))] text-[hsl(var(--primary))] min-w-[200px] sm:min-w-[180px]"
              >
                {content.primaryButton.text}
              </ScrollLink>
              <ScrollLink 
                variant="altOutline" 
                href="#contact"
                className="text-[hsl(var(--background))] border-[hsl(var(--background))] hover:bg-[hsl(var(--background))]/10 min-w-[200px] sm:min-w-[180px]"
              >
                {content.secondaryButton.text}
              </ScrollLink>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformBanner;