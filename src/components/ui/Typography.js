'use client';

const Typography = ({
  variant = 'body',
  children,
  className = '',
  as,
  ...props
}) => {
  const variants = {
    // Headings
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-heading',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-heading',
    h3: 'text-xl md:text-2xl lg:text-3xl font-bold text-foreground font-heading',
    h4: 'text-lg md:text-xl lg:text-2xl font-bold text-foreground font-heading',

    // Body
    'body-large': 'text-lg md:text-xl text-foreground font-body',
    body: 'text-base text-foreground font-body',
    'body-small': 'text-sm text-foreground font-body',

    // Special styles
    display: 'text-4xl md:text-5xl text-foreground font-heading font-bold',
    label: 'text-base md:text-lg text-foreground font-mono font-bold',
    caption: 'text-sm text-foreground font-sans'
  };

  const defaultTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    'body-large': 'p',
    body: 'p',
    'body-small': 'p',
    display: 'h1',
    label: 'span',
    caption: 'span'
  };

  const Tag = as || defaultTags[variant] || 'p';

  return (
    <Tag className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;