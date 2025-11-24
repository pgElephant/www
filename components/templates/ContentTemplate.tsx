import React from 'react'
import { cn } from '@/lib/utils'

export interface ContentTemplateProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
}

/**
 * ContentTemplate - Wrapper for main content areas between hero and footer
 * Uses bg-page-gradient and provides consistent max-width and padding
 */
export default function ContentTemplate({
  children,
  className,
  containerClassName,
  maxWidth = '7xl',
}: ContentTemplateProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }[maxWidth]

  return (
    <div className={cn('bg-page-gradient', className)}>
      <div
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          maxWidthClass,
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

