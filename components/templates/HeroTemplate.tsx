import React from 'react'
import { cn } from '@/lib/utils'

export interface HeroTemplateProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  overlay?: boolean
  height?: 'default' | 'fixed' | 'product'
}

/**
 * HeroTemplate - Standardized hero section wrapper
 * Uses solid background color for consistent hero styling
 * - default: h-[400px] md:h-[750px] (for home page)
 * - fixed: h-[400px] (for all other pages)
 * - product: h-[400px] (for product pages)
 */
export default function HeroTemplate({
  children,
  className,
  backgroundImage,
  overlay = false,
  height = 'fixed',
}: HeroTemplateProps) {
  const heightClass = height === 'default'
    ? 'h-[400px] md:h-[750px]'
    : height === 'product'
      ? 'h-[400px]'
      : 'h-[400px]'

  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center pt-20',
        heightClass,
        className
      )}
      style={{
        backgroundColor: '#111827',
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}

