'use client';
import React from 'react';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Buttons';
import ScrollLink from '@/components/ui/ScrollLink';
import { siteImages } from '@/config/images';
import Image from '@/components/ui/Image';
import { urlFor } from '@/sanity/lib/image';

// This is an exact copy of TransformBanner but with the overlay removed
const NoOverlayTransformBanner = ({ data }) => {
  const content = {
    mainHeading: data?.mainHeading || "Transform Your Life and Love Today",
    description: data?.description || "Unlock your potential and find true connection with expert guidance from a dedicated life and dating coach.",
    primaryButton: data?.primaryButton || { text: "Learn More", link: "#contact" },
    secondaryButton: data?.secondaryButton || { text: "Sign Up", link: "#contact" },
    mainImage: data?.backgroundImage || null
  };

  let mainImageUrl = null;
  if (content.mainImage?.asset) {
    try {
      mainImageUrl = urlFor(content.mainImage).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }

  return (
    <div className="w-full relative">
      <div className="w-full h-[600px] md:h-[800px] lg:h-[971px] relative flex items-center justify-center overflow-hidden">
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={content.backgroundImage?.alt || "Transform your life"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <Image
            src={siteImages.primary}
            alt="Anne Heimann Coaching"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="w-full max-w-7xl mx-auto px-4 lg:px-16 relative z-20 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <Typography
              variant="display"
              className="text-background max-w-[798px]"
            >
              {content.mainHeading}
            </Typography>

            <div className="max-w-[768px] px-4 sm:px-8">
              <Typography
                variant="body-large"
                className="text-background"
              >
                {content.description}
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-8 md:mt-16">
              <ScrollLink
                variant="secondary"
                href={content.primaryButton.link}
                className="bg-background text-primary hover:bg-background min-w-[200px] sm:min-w-[180px]"
              >
                {content.primaryButton.text}
              </ScrollLink>
              <ScrollLink
                variant="altOutline"
                href={content.secondaryButton.link}
                className="text-background border-background hover:bg-background/10 min-w-[200px] sm:min-w-[180px]"
              >
                {content.secondaryButton.text}
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoOverlayTransformBanner;