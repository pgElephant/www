import React from 'react'
import { cn } from '@/lib/utils'

export interface PageTemplateProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

/**
 * PageTemplate - Main page wrapper component
 * Uses solid background color for consistent page background
 */
export default function PageTemplate({
  children,
  className,
  containerClassName,
}: PageTemplateProps) {
  return (
    <div 
      className={cn('min-h-screen', className)}
      style={{ backgroundColor: '#1f2937' }}
    >
      <div className={cn('w-full', containerClassName)}>{children}</div>
    </div>
  )
}

