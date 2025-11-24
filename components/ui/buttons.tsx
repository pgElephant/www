/**
 * Modular Button Components
 * 
 * Centralized button components using theme configuration.
 * All button styles are derived from config/theme.ts
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getButtonClasses, getProductTheme, type ProductId } from '@/config/theme'
import Link from 'next/link'

// ============================================================================
// BUTTON BASE PROPS
// ============================================================================

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

export interface ButtonLinkProps {
  href: string
  external?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  productId?: ProductId
  children: React.ReactNode
}

// ============================================================================
// PRIMARY BUTTON
// ============================================================================

export function PrimaryButton({
  className,
  size = 'md',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonBaseProps) {
  const baseClasses = getButtonClasses('primary', size)
  const classes = cn(
    baseClasses,
    'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    loading && 'cursor-wait',
    className
  )

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// ============================================================================
// SECONDARY BUTTON
// ============================================================================

export function SecondaryButton({
  className,
  size = 'md',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonBaseProps) {
  const baseClasses = getButtonClasses('secondary', size)
  const classes = cn(
    baseClasses,
    'hover:shadow-md hover:scale-105 active:scale-95',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    loading && 'cursor-wait',
    className
  )

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// ============================================================================
// OUTLINE BUTTON
// ============================================================================

export function OutlineButton({
  className,
  size = 'md',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonBaseProps) {
  const baseClasses = getButtonClasses('outline', size)
  const classes = cn(
    baseClasses,
    'hover:shadow-md hover:scale-105 active:scale-95',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    loading && 'cursor-wait',
    className
  )

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// ============================================================================
// PRODUCT-SPECIFIC BUTTONS
// ============================================================================

export function ProductPrimaryButton({
  productId,
  className,
  size = 'md',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonBaseProps & { productId: ProductId }) {
  const theme = getProductTheme(productId)
  const baseClasses = theme.buttonPrimary
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  
  const classes = cn(
    'inline-flex items-center gap-2 rounded-xl font-semibold shadow-lg transition-all duration-300',
    baseClasses,
    sizeClasses[size],
    'hover:shadow-xl hover:scale-105 active:scale-95',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    loading && 'cursor-wait',
    className
  )

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export function ProductSecondaryButton({
  productId,
  className,
  size = 'md',
  disabled = false,
  loading = false,
  children,
  ...props
}: ButtonBaseProps & { productId: ProductId }) {
  const theme = getProductTheme(productId)
  const baseClasses = theme.buttonSecondary
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  
  const classes = cn(
    'inline-flex items-center gap-2 rounded-xl border font-semibold transition-all duration-300',
    baseClasses,
    sizeClasses[size],
    'hover:shadow-md hover:scale-105 active:scale-95',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    loading && 'cursor-wait',
    className
  )

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// ============================================================================
// BUTTON LINKS
// ============================================================================

export function PrimaryButtonLink({
  href,
  external = false,
  className,
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  const baseClasses = getButtonClasses('primary', size)
  const classes = cn(
    baseClasses,
    'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

export function SecondaryButtonLink({
  href,
  external = false,
  className,
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  const baseClasses = getButtonClasses('secondary', size)
  const classes = cn(
    baseClasses,
    'hover:shadow-md hover:scale-105 active:scale-95',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

export function OutlineButtonLink({
  href,
  external = false,
  className,
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  const baseClasses = getButtonClasses('outline', size)
  const classes = cn(
    baseClasses,
    'hover:shadow-md hover:scale-105 active:scale-95',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

// ============================================================================
// DEFAULT EXPORT (for backward compatibility)
// ============================================================================

export const Button = PrimaryButton
export default Button

