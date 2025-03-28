'use client';
import React, { useEffect, useState } from 'react';
import Typography from '@/components/ui/Typography';
import ScrollLink from '@/components/ui/ScrollLink';
import { siteImages } from '@/config/images';
import { urlFor } from '@/sanity/lib/image';
import NextImage from 'next/image';
import { useTheme } from '@/context/ThemeContext';

// A completely new implementation
const DirectTransformBanner = ({ data }) => {
  const [mainImageUrl, setMainImageUrl] = useState(null);
  // Get theme from global context instead of fetching it again
  const { primaryColor, backgroundColor, textColor } = useTheme();
  
  const themeColors = {
    primary: primaryColor || '#364182',
    background: backgroundColor || '#ffffff',
    text: textColor || '#333333'
  };
  
  useEffect(() => {
    // Set image URL on client side
    if (data?.backgroundImage?.asset) {
      try {
        setMainImageUrl(urlFor(data.backgroundImage).url());
      } catch (error) {
        console.error('Error generating image URL:', error);
      }
    }
  }, [data]);
  
  // Fallback data
  const content = {
    mainHeading: data?.mainHeading || "Transform Your Life and Love Today",
    description: data?.description || "Unlock your potential and find true connection with expert guidance from a dedicated life and dating coach.",
    primaryButton: data?.primaryButton || { text: "Learn More", link: "#contact" },
    secondaryButton: data?.secondaryButton || { text: "Sign Up", link: "#contact" },
    textPosition: data?.textPosition || "center", // 'left', 'center', 'right'
    // Using boolean format for textBackdrop
    textBackdrop: data?.textBackdrop ?? false,
    backdropStyle: data?.backdropStyle || {
      opacity: 0.25,
      blur: 3,
      shape: 'rounded'
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full h-[600px] md:h-[800px] lg:h-[971px] relative flex items-center justify-center overflow-hidden">
        {/* Background image as a direct element with NO overlay */}
        <div className="absolute inset-0">
          <NextImage
            src={mainImageUrl || siteImages.primary}
            alt="Banner background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Content on top of image with position control */}
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full max-w-7xl mx-auto px-4 lg:px-16 ${
            content.textPosition === 'center' ? 'text-center flex justify-center' : 
            content.textPosition === 'right' ? 'text-right flex justify-end' : 
            'text-left flex justify-start'
          }`}>
            <div className={`${
              content.textPosition === 'center' ? 'w-full' :
              'w-full md:max-w-[45%]'
            }`}>
            <div 
              className={`flex flex-col gap-6 md:gap-8 ${
                content.textPosition === 'center' ? 'items-center mx-auto' : 
                content.textPosition === 'right' ? 'items-end ml-auto' : 
                'items-start'
              } ${content.textBackdrop ? 'transform-gpu' : 'p-4'}`}
              style={content.textBackdrop ? {
                backgroundColor: `rgba(0, 0, 0, ${(content.backdropStyle?.opacity !== undefined) ? content.backdropStyle.opacity : 0.25})`,
                backdropFilter: `blur(${content.backdropStyle?.blur || 3}px)`,
                borderRadius: content.backdropStyle?.shape === 'rounded' ? '2rem' : 
                              content.backdropStyle?.shape === 'oval' ? '100vw / 100%' : 
                              content.backdropStyle?.shape === 'pill' ? '9999px' : '2rem',
                WebkitMaskImage: `radial-gradient(
                  ellipse 90% 80% at 50% 50%, 
                  black ${70 - (content.backdropStyle?.glow || 5) * 3}%, 
                  transparent ${94 - (content.backdropStyle?.glow || 5) * 2}%
                )`,
                maskImage: `radial-gradient(
                  ellipse 90% 80% at 50% 50%, 
                  black ${70 - (content.backdropStyle?.glow || 5) * 3}%, 
                  transparent ${94 - (content.backdropStyle?.glow || 5) * 2}%
                )`,
                padding: content.backdropStyle?.shape === 'oval' ? '3rem 8rem' :
                         content.backdropStyle?.shape === 'pill' ? '3rem 8rem' : 
                         '3rem 6rem',
                minWidth: content.backdropStyle?.shape === 'oval' || content.backdropStyle?.shape === 'pill' ? 
                          '500px' : '300px',
                maxWidth: '90vw'
              } : {}}
            >
              <Typography
                variant="display"
                className="max-w-[798px]"
                style={{ color: '#ffffff' }}
              >
                {content.mainHeading}
              </Typography>

              <div className="max-w-[768px] px-4 sm:px-8">
                <Typography
                  variant="body-large"
                  style={{ color: '#ffffff' }}
                >
                  {content.description}
                </Typography>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 md:mt-16 ${
                content.textPosition === 'center' ? 'justify-center' : ''
              }`}>
                <ScrollLink
                  variant="secondary"
                  href={content.primaryButton.link}
                  className="min-w-[200px] sm:min-w-[180px] text-center"
                  style={{ backgroundColor: '#ffffff', color: themeColors.primary }}
                >
                  {content.primaryButton.text}
                </ScrollLink>
                <ScrollLink
                  variant="altOutline"
                  href={content.secondaryButton.link}
                  className="min-w-[200px] sm:min-w-[180px] text-center"
                  style={{ color: '#ffffff', borderColor: '#ffffff' }}
                >
                  {content.secondaryButton.text}
                </ScrollLink>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add debug output when in development mode
const BannerWithDebug = ({ data }) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // Log the data being received in browser console
    useEffect(() => {
      console.log('TransformBanner received data:', data);
      console.log('textPosition:', data?.textPosition);
      console.log('textBackdrop:', data?.textBackdrop, '(boolean - true for backdrop, false for none)');
      console.log('backdropStyle:', data?.backdropStyle);
      
      // Detailed backdrop style properties
      if (data?.backdropStyle) {
        console.log('  opacity:', data.backdropStyle.opacity);
        console.log('  blur:', data.backdropStyle.blur);
        console.log('  shape:', data.backdropStyle.shape);
        console.log('  glow:', data.backdropStyle.glow);
      }
    }, [data]);
  }
  
  return <DirectTransformBanner data={data} />;
};

export default BannerWithDebug;