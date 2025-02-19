"use client"  

import React, { useState } from 'react';
import Typography from '../ui/Typography';
import Container from '../ui/Container';
import { ArrowRight, Mountain, HeartHandshake, LayoutList, Star, Target, 
  Lightbulb, Compass, Book, GraduationCap, Heart, Sparkles, RefreshCcw, 
  Palette, HelpCircle, Wand2 } from 'lucide-react';

const iconMap = {
  Mountain,
  HeartHandshake,
  LayoutList,
  Star,
  Target,
  Lightbulb,
  Compass,
  Book,
  GraduationCap,
  Heart,
  Sparkles,
  RefreshCcw,
  Palette,
  HelpCircle,
  Wand2
}

const ServiceCard = ({ title, description, actionText, Icon }) => {
  const [wiggleState, setWiggleState] = useState('idle');

  const handleMouseEnter = () => {
    setWiggleState('wiggleRight');
    setTimeout(() => {
      setWiggleState('hold');
    }, 300);
  };

  const handleMouseLeave = () => {
    setWiggleState('wiggleLeft');
    setTimeout(() => {
      setWiggleState('idle');
    }, 300);
  };

  const getIconStyles = () => {
    switch(wiggleState) {
      case 'wiggleRight':
        return 'animate-[wiggleToRight_0.3s_ease-in-out_forwards]';
      case 'hold':
        return 'rotate-[12deg]';
      case 'wiggleLeft':
        return 'animate-[wiggleFromRight_0.3s_ease-in-out_forwards]';
      default:
        return 'rotate-0';
    }
  };

  return (
    <div 
      className="flex-1 flex flex-col gap-8 p-8 bg-background hover:bg-surface rounded-lg transition-all duration-300 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-6">
        <div className="relative w-12 h-12">
          <Icon 
            className={`w-12 h-12 text-primary transition-none absolute left-0 
              ${getIconStyles()}`}
            strokeWidth={1.5} 
          />
        </div>
        
        <Typography variant="h4" className="max-w-sm">
          {title}
        </Typography>
        
        <Typography variant="body-large" className="max-w-md">
          {description}
        </Typography>
      </div>
      
      <div className="flex items-center gap-2 group cursor-pointer mt-auto">
        <Typography 
          variant="label" 
          className="text-base transition-colors duration-300 group-hover:text-accent"
        >
          {actionText}
        </Typography>
        <ArrowRight className="w-6 h-6 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1" />
      </div>
    </div>
  );
};

const ServicesSection = ({ data }) => {
  // Default content
  const content = {
    mainHeading: data?.mainHeading || "Unlock Your Potential with Our Comprehensive Coaching Services",
    description: data?.description || "Our personalized coaching sessions are designed to help you navigate the complexities of dating and relationships. Join our engaging workshops to gain practical skills and insights. Explore our extensive online resources for ongoing support and guidance.",
    services: data?.services || [
      {
        title: "Transform Your Life with Tailored Coaching and Workshops",
        description: "Experience growth and empowerment through our expert-led services.",
        actionText: "Learn More",
        iconType: "Mountain"
      },
      {
        title: "Engage with Our Community for Lasting Connections and Support",
        description: "Join our community to connect with like-minded individuals on your journey.",
        actionText: "Sign Up",
        iconType: "HeartHandshake"
      },
      {
        title: "Access Valuable Online Resources for Continuous Learning and Growth",
        description: "Utilize our curated resources to enhance your dating skills and knowledge.",
        actionText: "Explore",
        iconType: "LayoutList"
      }
    ]
  };

  return (
    <Container size="large" className="bg-background">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <Typography variant="h2">
              {content.mainHeading}
            </Typography>
          </div>
          
          <div className="flex-1">
            <Typography variant="body-large">
              {content.description}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <ServiceCard
              key={index}
              Icon={iconMap[service.iconType] || Mountain}
              title={service.title}
              description={service.description}
              actionText={service.actionText}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ServicesSection;