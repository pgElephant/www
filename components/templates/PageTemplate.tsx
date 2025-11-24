import React from 'react'
import { cn } from '@/lib/utils'

export interface PageTemplateProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

/**
 * PageTemplate - Main page wrapper component
 * Uses bg-page-gradient for consistent page background
 */
export default function PageTemplate({
  children,
  className,
  containerClassName,
}: PageTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-page-gradient', className)}>
      <div className={cn('w-full', containerClassName)}>{children}</div>
    </div>
  )
}

