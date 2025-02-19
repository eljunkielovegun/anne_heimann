const Container = ({
  children,
  className = '',
  size = 'default',
  noPadding = false,
  ...props
}) => {
  const baseStyles = 'w-[90%] mx-auto' // Changed to 90% width with auto margins
  
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

  // Container width constraints based on viewport
  const constraints = 'min-w-[320px]'
  
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