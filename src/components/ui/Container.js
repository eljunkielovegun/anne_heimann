'use client';

const Container = ({
  children,
  className = '',
  size = 'default',
  noPadding = false,
  ...props
}) => {
  // Use box-sizing: border-box to ensure consistent handling across browsers
  const baseStyles = 'box-border w-[90%] mx-auto' 
  
  // Responsive max-widths
  const sizes = {
    sm: 'max-w-3xl',      // 768px
    default: 'max-w-7xl',  // 1280px
    large: 'max-w-8xl',    // 1440px
    full: 'max-w-full'     // No max-width
  }
  
  // Responsive padding
  const padding = noPadding 
    ? '' 
    : 'px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-28'

  // Container width constraints - removed min-width to fix Firefox issue
  const constraints = 'w-full'
  
  return (
    <div 
      className={`${baseStyles} ${sizes[size]} ${padding} ${constraints} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container