import React from 'react';
import { cn } from '@/utils/cn';

const Footer = ({ className, ...props }) => {
  return (
    <footer className={cn("w-full bg-background", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="border-t border-primary/10 pt-0 py-6">
          <div className="text-right text-xs text-primary/80">
            ©Anne Heimann 2025, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;