'use client';
import Container from '@/components/ui/Container';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Buttons';
import { ArrowRight } from 'lucide-react';
import { siteImages } from '@/config/images';
import Image from '@/components/ui/Image';
import { urlFor } from '@/sanity/lib/image';

const HeroSection = ({ data }) => {
  if (!data) return null;

  const content = {
    labelText: data?.labelText || "Transform",
    heading: data?.heading || "Unlock Your Potential with Anne Heimann",
    mainDescription: data?.mainDescription || "Experience a profound shift in your confidence and relationships.",
    featureOneHeading: data?.featureOneHeading || "Boost Confidence",
    featureOneDescription: data?.featureOneDescription || "Gain the self-assurance to pursue your dreams.",
    featureTwoHeading: data?.featureTwoHeading || "Enhance Relationships",
    featureTwoDescription: data?.featureTwoDescription || "Learn to communicate effectively.",
    primaryButtonText: data?.primaryButtonText || "Learn More",
    secondaryButtonText: data?.secondaryButtonText || "Contact",
    heroImage: data?.heroImage || null
  };

  let imageUrl = null;
  if (content.heroImage?.asset) {
    try {
      imageUrl = urlFor(content.heroImage).width(800).height(600).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }

  return (
    <Container size="large" className="bg-background">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-20">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 order-last lg:order-first">
          <div className="flex flex-col gap-4">
            <Typography variant="label">
              {content.labelText}
            </Typography>

            <div className="flex flex-col gap-6">
              <Typography variant="h1">
                {content.heading}
              </Typography>
              <Typography variant="body-large">
                {content.mainDescription}
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Typography variant="h4">
                {content.featureOneHeading}
              </Typography>
              <Typography variant="body-large">
                {content.featureOneDescription}
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              <Typography variant="h4">
                {content.featureTwoHeading}
              </Typography>
              <Typography variant="body-large">
                {content.featureTwoDescription}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Button variant="primary">
              {content.primaryButtonText}
            </Button>
            <Button variant="secondary" className="group">
              {content.secondaryButtonText}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 order-first lg:order-last">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={content.heroImage?.alt || "Anne Heimann Coaching"}
              width={800}
              height={600}
              priority
              className="shadow-card border-0"
            />
          ) : (
            <Image
              src={siteImages.primary}
              alt="Anne Heimann Coaching"
              priority
              className="shadow-card border-0"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
