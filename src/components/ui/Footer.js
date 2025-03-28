'use client';
import React from 'react';
import { cn } from '@/utils/cn';

const Footer = ({ className, ...props }) => {
  return (
    <footer className={cn("w-full bg-background text-foreground", className)} {...props}>
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-16">
        <div className="border-t border-border py-6">
          <p className="text-right text-xs text-muted-foreground">
            © Anne Heimann 2025, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
