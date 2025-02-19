const Typography = ({
    variant = 'body',
    children,
    className = '',
    as,
    ...props
  }) => {
    const variants = {
      // Headings - Quicksand
      'h1': 'font-heading font-bold text-4xl md:text-5xl leading-tight', // 48px
      'h2': 'font-heading font-bold text-3xl md:text-4xl leading-tight', // 40px
      'h3': 'font-heading font-bold text-2xl md:text-3xl leading-tight', // 32px
      'h4': 'font-heading font-bold text-xl md:text-2xl leading-tight',  // 24px
      
      // Body - Open Sans
      'body-large': 'font-body text-lg md:text-xl leading-relaxed',     // 20-24px
      'body': 'font-body text-base leading-relaxed',                     // 16px
      'body-small': 'font-body text-sm leading-relaxed',                // 14px
      
      // Special styles
      'display': 'font-heading font-bold text-5xl md:text-6xl leading-tight', // 60-72px
      'label': 'font-mono font-bold text-base md:text-lg leading-normal',     // 16-20px
      'caption': 'font-sans text-sm leading-normal'                           // 14px
    }
  
    const defaultTags = {
      'h1': 'h1',
      'h2': 'h2',
      'h3': 'h3',
      'h4': 'h4',
      'body-large': 'p',
      'body': 'p',
      'body-small': 'p',
      'display': 'h1',
      'label': 'span',
      'caption': 'span'
    }
  
    const Tag = as || defaultTags[variant] || 'p'
  
    return (
      <Tag 
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    )
  }
  
  export default Typography