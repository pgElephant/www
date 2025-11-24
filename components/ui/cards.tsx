/**
 * Modular Card Components
 * 
 * Centralized card components using theme configuration.
 * All card styles are derived from config/theme.ts
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getCardClasses, getProductTheme, type ProductId } from '@/config/theme'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

// ============================================================================
// CARD BASE PROPS
// ============================================================================

export interface CardBaseProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
}

// ============================================================================
// FEATURE CARD
// ============================================================================

export interface FeatureCardProps extends CardBaseProps {
  icon?: React.ReactNode | LucideIcon
  title: string
  description: string
  productId?: ProductId
  hover?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  productId,
  hover = true,
  className,
  onClick,
  href,
  external,
  children,
}: FeatureCardProps) {
  const baseClasses = productId
    ? getProductTheme(productId).featureCardClass
    : getCardClasses('feature', hover)
  
  const iconClasses = productId
    ? getProductTheme(productId).featureIconClass
    : 'text-primary-600'
  
  const classes = cn(
    baseClasses,
    onClick || href ? 'cursor-pointer' : '',
    className
  )

  const IconComponent = typeof icon === 'function' ? icon : null
  const iconElement = IconComponent ? <IconComponent className={cn('w-6 h-6', iconClasses)} /> : (icon as React.ReactNode)

  const content = (
    <>
      {iconElement && (
        <div className={cn('mb-4', iconClasses)}>
          {iconElement}
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
      {children}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={cn(classes, 'text-left w-full')} onClick={onClick}>
        {content}
      </button>
    )
  }

  return <div className={classes}>{content}</div>
}

// ============================================================================
// DOC CARD
// ============================================================================

export interface DocCardProps extends CardBaseProps {
  title: string
  description?: string
  href: string
  external?: boolean
  productId?: ProductId
  icon?: React.ReactNode | LucideIcon
}

export function DocCard({
  title,
  description,
  href,
  external = false,
  productId,
  icon,
  className,
  children,
}: DocCardProps) {
  const baseClasses = productId
    ? getProductTheme(productId).docCardClass
    : getCardClasses('doc', true)
  
  const classes = cn(baseClasses, 'cursor-pointer', className)

  const IconComponent = typeof icon === 'function' ? icon : null
  const iconElement = IconComponent ? <IconComponent className="w-5 h-5" /> : (icon as React.ReactNode)

  const content = (
    <>
      {iconElement && (
        <div className="mb-3 text-primary-600 dark:text-primary-400">
          {iconElement}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

// ============================================================================
// QUICK LINK CARD
// ============================================================================

export interface QuickLinkCardProps extends CardBaseProps {
  title: string
  description: string
  href: string
  external?: boolean
  productId?: ProductId
  icon?: React.ReactNode | LucideIcon
}

export function QuickLinkCard({
  title,
  description,
  href,
  external = false,
  productId,
  icon,
  className,
  children,
}: QuickLinkCardProps) {
  const theme = productId ? getProductTheme(productId) : null
  const baseClasses = theme
    ? theme.quickLinkCardClass
    : getCardClasses('quickLink', true)
  
  const iconClasses = theme
    ? theme.quickLinkIconClass
    : 'text-primary-600'
  
  const hoverLabelClasses = theme
    ? theme.quickLinkHoverLabelClass
    : 'text-primary-600'
  
  const classes = cn(baseClasses, 'cursor-pointer group', className)

  const IconComponent = typeof icon === 'function' ? icon : null
  const iconElement = IconComponent ? <IconComponent className={cn('w-6 h-6', iconClasses)} /> : (icon as React.ReactNode)

  const content = (
    <>
      {iconElement && (
        <div className={cn('mb-4', iconClasses)}>
          {iconElement}
        </div>
      )}
      <h3 className={cn('text-lg font-semibold mb-2 group-hover:', hoverLabelClasses, 'text-slate-900 dark:text-white')}>
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
      {children}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

// ============================================================================
// GENERIC CARD
// ============================================================================

export interface CardProps extends CardBaseProps {
  variant?: 'default' | 'feature' | 'doc' | 'quickLink'
  productId?: ProductId
  hover?: boolean
}

export function Card({
  variant = 'default',
  productId,
  hover = true,
  className,
  onClick,
  href,
  external,
  children,
}: CardProps) {
  let baseClasses = ''
  
  if (variant === 'feature') {
    baseClasses = productId
      ? getProductTheme(productId).featureCardClass
      : getCardClasses('feature', hover)
  } else if (variant === 'doc') {
    baseClasses = productId
      ? getProductTheme(productId).docCardClass
      : getCardClasses('doc', hover)
  } else if (variant === 'quickLink') {
    baseClasses = productId
      ? getProductTheme(productId).quickLinkCardClass
      : getCardClasses('quickLink', hover)
  } else {
    baseClasses = 'rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-700/60 dark:bg-slate-900/60 p-6 shadow-sm'
  }
  
  const classes = cn(
    baseClasses,
    onClick || href ? 'cursor-pointer' : '',
    className
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={cn(classes, 'text-left w-full')} onClick={onClick}>
        {children}
      </button>
    )
  }

  return <div className={classes}>{children}</div>
}

// ============================================================================
// CARD GRID
// ============================================================================

export interface CardGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CardGrid({
  children,
  columns = 3,
  gap = 'md',
  className,
}: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }
  
  const classes = cn('grid', gridCols[columns], gapClasses[gap], className)

  return <div className={classes}>{children}</div>
}

// ============================================================================
// DEFAULT EXPORTS
// ============================================================================

export default Card

