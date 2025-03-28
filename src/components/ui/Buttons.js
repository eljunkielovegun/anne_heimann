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

  const baseStyles = 'px-6 py-3 font-mono font-bold text-base transition-colors inline-flex items-center justify-center min-w-[140px] rounded-md';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'border border-primary text-primary hover:bg-primary/10',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    altOutline: 'border border-background text-background hover:bg-background/10'
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
