'use client'

import { scrollToSection } from '@/utils/scrollTo'

const Button = ({ 
    variant = 'primary',
    children,
    href,
    className = '',
    ...props 
}) => {
    const handleClick = (e) => {
      if (href?.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    };

    const baseStyles = 'px-6 py-3 font-mono font-bold text-base md:text-lg transition-colors inline-flex items-center justify-center min-w-[140px]'
    const variants = {
      primary: 'bg-primary text-background border border-background hover:opacity-90',
      secondary: 'border border-primary text-primary hover:bg-surface',
      outline: 'border border-primary text-primary hover:bg-surface/50',
      altOutline: 'border border-background text-background hover:bg-surface/90'
    }
  
    const Tag = href ? 'a' : 'button'
  
    return (
      <Tag
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    )
}

export default Button