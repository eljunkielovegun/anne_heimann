"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { 
  Mountain, 
  HeartHandshake, 
  MessageCircle, 
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
  Wand2,
  Menu,
  X 
} from 'lucide-react';
import Typography from './Typography';

const iconMap = {
  Mountain,
  HeartHandshake,
  MessageCircle,
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
    <a href="#contact" className="block py-3 group hover:cursor-pointer" onClick={handleClick}>
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 relative overflow-visible">
          <Icon 
            className="w-8 h-8 text-primary shrink-0"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Typography 
            variant="h4" 
            className="text-primary text-sm font-semibold whitespace-nowrap"
          >
            {service.title}
          </Typography>
          <Typography 
            variant="body-small" 
            className="text-primary text-xs line-clamp-1"
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
    <div className="w-full bg-background">
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
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-row gap-8 items-center h-14 px-4 lg:px-16">
            {services.map((service, index) => (
              <div key={service.id || index} className="flex-1">
                <ServiceLink service={service} onNavigate={handleNavigate} />
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="lg:hidden relative z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-accent rounded-md"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>

        <div className={`
          fixed inset-0 bg-accent transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="pt-20 px-4 space-y-2">
            {services.map((service, index) => (
              <ServiceLink 
                key={service.id || index}
                service={service}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesNav;