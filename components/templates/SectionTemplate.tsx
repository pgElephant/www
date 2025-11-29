import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionTemplateProps {
  children: React.ReactNode
  className?: string
  background?: 'page' | 'transparent' | 'hero'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * SectionTemplate - Reusable section wrapper for content sections
 * Supports different background variants and padding options
 */
export default function SectionTemplate({
  children,
  className,
  background = 'page',
  padding = 'lg',
}: SectionTemplateProps) {
  const backgroundClass =
    background === 'hero'
      ? ''
      : background === 'page'
      ? ''
      : 'bg-transparent'
  
  const backgroundColor =
    background === 'hero'
      ? '#111827'
      : background === 'page'
      ? '#1f2937'
      : 'transparent'

  const paddingClass = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 md:py-20',
    xl: 'py-24 md:py-32',
  }[padding]

  return (
    <section 
      className={cn(backgroundClass, paddingClass, className)}
      style={backgroundColor !== 'transparent' ? { backgroundColor } : undefined}
    >
      {children}
    </section>
  )
}

