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
 * Uses solid background color for consistent hero styling
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
        'relative overflow-hidden min-h-[400px] flex items-center',
        className
      )}
      style={{
        backgroundColor: '#111827',
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
      <div className="relative z-10 w-full pt-32 pb-20">{children}</div>
    </section>
  )
}

