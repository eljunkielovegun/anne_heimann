'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import {
  Mountain, HeartHandshake, MessageCircle, LayoutList, Star, Target, Lightbulb,
  Compass, Book, GraduationCap, Heart, Sparkles, RefreshCcw, Palette, HelpCircle, Wand2, Menu, X
} from 'lucide-react';
import Typography from './Typography';
import Container from './Container';

const iconMap = {
  Mountain, HeartHandshake, MessageCircle, LayoutList, Star, Target, Lightbulb,
  Compass, Book, GraduationCap, Heart, Sparkles, RefreshCcw, Palette, HelpCircle, Wand2
};

const ServiceLink = ({ service, onNavigate }) => {
  const Icon = iconMap[service.iconType] || Mountain;

  const handleClick = (e) => {
    e.preventDefault();
    onNavigate();
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <a
      href="#contact"
      className="block py-3 group hover:cursor-pointer text-center"
      onClick={handleClick}
    >
      <div className="flex gap-3 items-center justify-center">
        <div className="w-8 h-8 relative overflow-visible">
          <Icon
            className="w-8 h-8 text-[hsl(var(--primary))] shrink-0"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Typography
            variant="h4"
            className="text-[hsl(var(--primary))] text-sm font-[var(--font-heading)] whitespace-nowrap"
          >
            {service.title}
          </Typography>
          <Typography
            variant="body-small"
            className="text-[hsl(var(--primary))] text-xs line-clamp-1 font-[var(--font-body)]"
          >
            {service.description}
          </Typography>
        </div>
      </div>
    </a>
  );
};

const ServicesNav = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const router = useRouter();

  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  // When using dynamic import with ssr:false, we can directly use the passed data
  const services = data?.services || [
    {
      id: 1,
      title: "Life Coaching",
      description: "Transform your life with expert guidance.",
      href: "#contact",
      iconType: "Mountain"
    },
    {
      id: 2,
      title: "Dating Coaching",
      description: "Find love with personalized coaching.",
      href: "#contact",
      iconType: "HeartHandshake"
    },
    {
      id: 3,
      title: "Testimonials",
      description: "Hear from our happy clients.",
      href: "#contact",
      iconType: "MessageCircle"
    },
    {
      id: 4,
      title: "Resources",
      description: "Explore articles and tips for success.",
      href: "#contact",
      iconType: "LayoutList"
    }
  ];

  return (
    <div className="w-full bg-[hsl(var(--background))] box-border">
      <nav
        ref={navRef}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        className="w-full relative mb-6 overflow-hidden hidden lg:block transition-colors duration-300"
        style={{
          backgroundColor: 'hsl(var(--accent))',
          backgroundImage: isNavHovered
            ? `radial-gradient(circle 80px at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--accent-light)) 0%, transparent 60%)`
            : 'none'
        }}
      >
        <Container noPadding size="default" className="py-0 px-4 sm:px-6 md:px-8">
          <div className="flex flex-row justify-center gap-10 items-center h-14">
            {services.map((service, index) => (
              <div key={service.id || index} className="flex-0">
                <ServiceLink service={service} onNavigate={handleNavigate} />
              </div>
            ))}
          </div>
        </Container>
      </nav>

      <div className="lg:hidden relative z-50">
        <Container noPadding className="py-4 relative">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-50 p-2 bg-[hsl(var(--accent))] rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[hsl(var(--primary))]" />
              ) : (
                <Menu className="w-6 h-6 text-[hsl(var(--primary))]" />
              )}
            </button>
            
            {/* Optional logo/title placeholder */}
            <span className="text-[hsl(var(--primary))] font-[var(--font-heading)] font-semibold">
              Anne Heimann
            </span>
            
            {/* Empty div for flex spacing */}
            <div className="w-10"></div>
          </div>
        </Container>

        <div className={`
          fixed inset-0 bg-[hsl(var(--accent))] transition-transform duration-300 ease-in-out z-40 box-border
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Container noPadding className="py-0 h-full px-6">
            <div className="pt-24 space-y-6 flex flex-col items-center justify-start h-full w-full">
              {services.map((service, index) => (
                <ServiceLink
                  key={service.id || index}
                  service={service}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ServicesNav;