import React, { useState } from 'react'
import Typography from './Typography'
import { ArrowRight } from 'lucide-react'
import { 
  Mountain, HeartHandshake, LayoutList, Star, Target, Lightbulb,
  Compass, Book, GraduationCap, Heart, Sparkles, RefreshCcw,
  Palette, HelpCircle, Wand2
} from 'lucide-react'

const iconMap = {
  Mountain, HeartHandshake, LayoutList, Star, Target, Lightbulb,
  Compass, Book, GraduationCap, Heart, Sparkles, RefreshCcw,
  Palette, HelpCircle, Wand2
}

const Card = ({
  iconType,
  title,
  description,
  action,
  onClick,
  className = '',
  ...props
}) => {
  const [wiggleState, setWiggleState] = useState('idle')
  const Icon = iconMap[iconType] || Mountain

  const handleMouseEnter = () => {
    setWiggleState('wiggleRight')
    setTimeout(() => setWiggleState('hold'), 300)
  }

  const handleMouseLeave = () => {
    setWiggleState('wiggleLeft')
    setTimeout(() => setWiggleState('idle'), 300)
  }

  const getIconStyles = () => {
    switch (wiggleState) {
      case 'wiggleRight': return 'animate-[wiggleToRight_0.3s_ease-in-out_forwards]'
      case 'hold': return 'rotate-[12deg]'
      case 'wiggleLeft': return 'animate-[wiggleFromRight_0.3s_ease-in-out_forwards]'
      default: return 'rotate-0'
    }
  }

  const baseStyles = 'flex flex-col gap-6 p-8 bg-background shadow-card transition-all duration-300 border-0'
  const hoverStyles = onClick ? 'hover:bg-surface hover:-translate-y-1 hover:shadow-card-hover' : ''
  const hasAction = action || onClick

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Icon */}
      <div className="flex items-start">
        <div className="relative w-12 h-12">
          <Icon
            className={`w-12 h-12 text-primary transition-none absolute left-0 ${getIconStyles()}`}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body">{description}</Typography>
      </div>

      {/* Optional Action */}
      {hasAction && (
        <div className="flex items-center gap-2 group">
          <Typography
            variant="label"
            className="transition-colors duration-300 group-hover:text-accent"
          >
            {action || 'Learn More'}
          </Typography>
          <ArrowRight className="w-6 h-6 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1" />
        </div>
      )}
    </div>
  )
}

export default Card
