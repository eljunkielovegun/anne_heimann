import NextImage from 'next/image'
import { siteImages } from '@/config/images'

const Image = ({ 
  src, 
  alt,
  className = '',
  priority = false,
  position = 'desktop-right', // 'desktop-right' | 'desktop-left' | 'center'
  ...props 
}) => {
  // Get metadata for the image
  const metadata = siteImages.metadata[src] || {
    alt: alt || 'Site image',
    width: 618,
    height: 641
  }

  const positionStyles = {
    'desktop-right': 'order-first lg:order-last',
    'desktop-left': 'order-first',
    'center': 'order-first'
  }

  const baseStyles = 'relative w-full'
  const imageStyles = 'w-full h-auto object-cover'

  return (
    <div className={`${baseStyles} ${positionStyles[position]} ${className}`}>
      <NextImage
        src={src}
        alt={metadata.alt}
        width={metadata.width}
        height={metadata.height}
        priority={priority}
        className={imageStyles}
        {...props}
      />
    </div>
  )
}

export default Image