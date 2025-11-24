import React from 'react'
import { cn } from '@/lib/utils'

export interface HeroTemplateProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  overlay?: boolean
}

/**
 * HeroTemplate - Standardized hero section wrapper
 * Uses bg-hero-gradient background for consistent hero styling
 */
export default function HeroTemplate({
  children,
  className,
  backgroundImage,
  overlay = false,
}: HeroTemplateProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-hero-gradient',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

