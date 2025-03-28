'use client';
import React from 'react'
import Typography from './Typography'
import { cn } from '@/utils/cn'

const CTABanner = ({ data, className, ...props }) => {
  const content = {
    mainText: data?.mainText || "Ready to change your life?",
    linkText: data?.linkText || "Contact Us",
    linkUrl: data?.linkUrl || "#contact"
  }

  return (
    <div 
      className={cn(
        "w-full bg-primary px-4 lg:px-16 py-4",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-heading font-bold text-accent">
            {content.mainText}
          </span>
          <a 
            href={content.linkUrl} 
            className="text-lg font-body text-accent/80 hover:text-accent underline font-bold transition-colors"
          >
            {content.linkText}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTABanner
