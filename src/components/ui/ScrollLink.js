'use client'

import Button from './Buttons'

const ScrollLink = ({ href, variant, children, className, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Button 
      variant={variant} 
      className={className}
      onClick={handleClick} 
      href={href}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ScrollLink