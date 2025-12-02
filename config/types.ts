/**
 * TypeScript Types for Configuration System
 * 
 * Centralized type definitions for theme, products, and SEO configurations.
 */

import { Metadata } from 'next'
import { LucideIcon } from 'lucide-react'

// ============================================================================
// THEME TYPES
// ============================================================================

export type ProductId = 'pgraft' | 'pgbalancer' | 'fauxdb' | 'pgsentinel' | 'pg-stat-insights'

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export interface ProductIconColors {
  primary: string
  secondary: string
  tertiary?: string
  quaternary?: string
}

export interface ProductTheme {
  badgeGradient: string
  heroGradient: string
  pageGradient: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  iconColors: ProductIconColors
  buttonPrimary: string
  buttonSecondary: string
  linkHover: string
  featureIconClass: string
  featureCardClass: string
  quickLinkCardClass: string
  quickLinkIconClass: string
  quickLinkHoverLabelClass: string
  docCardClass: string
}

export interface ButtonStyles {
  base: string
  colors: string
  sizes: {
    sm: string
    md: string
    lg: string
  }
}

export interface CardStyles {
  base: string
  colors: string
  hover: string
}

export interface TypographyConfig {
  fontFamily: {
    sans: string[]
    heading: string[]
    body: string[]
    display: string[]
    mono: string[]
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
  }
  fontWeight: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
    loose: number
  }
}

export interface SpacingConfig {
  section: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  container: {
    narrow: string
    default: string
    wide: string
    extraWide: string
    ultraWide: string
    full: string
  }
  padding: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface AnimationConfig {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    default: string
    in: string
    out: string
  }
  keyframes: {
    fadeIn: Record<string, Record<string, string>>
    slideUp: Record<string, Record<string, string>>
    bounceGentle: Record<string, Record<string, string>>
  }
}

export interface ThemeConfig {
  colors: {
    primary: ColorScale
    secondary: ColorScale
    accent: ColorScale
    neutral: ColorScale
    cool: ColorScale
    white: string
    black: string
  }
  productThemes: Record<ProductId, ProductTheme>
  gradients: {
    hero: {
      css: string
      tailwind: string
    }
    page: {
      css: string
      tailwind: string
    }
    overlay: {
      hero: string
      page: string
    }
  }
  buttons: {
    primary: ButtonStyles
    secondary: ButtonStyles
    outline: ButtonStyles
  }
  cards: {
    feature: CardStyles
    doc: CardStyles
    quickLink: CardStyles
  }
  typography: TypographyConfig
  spacing: SpacingConfig
  animations: AnimationConfig
  getProductTheme: (productId: ProductId) => ProductTheme
  getButtonClasses: (variant: 'primary' | 'secondary' | 'outline', size?: 'sm' | 'md' | 'lg') => string
  getCardClasses: (type: 'feature' | 'doc' | 'quickLink', withHover?: boolean) => string
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface ProductMetadata {
  id: ProductId
  name: string
  displayName: string
  tagline: string
  description: string
  longDescription: string
  keywords: string[]
  githubUrl: string
  docsUrl: string
  productUrl: string
  ogImage: string
  category: string
  version?: string
  postgresqlVersions: string[]
}

export interface ProductFeatures {
  title: string
  description: string
  items: string[]
}

export interface ProductBadges {
  badges: string[]
}

export interface ProductConfig extends ProductMetadata, ProductFeatures, ProductBadges {}

export interface ProductsConfig {
  [key: string]: ProductConfig
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface BaseSEOConfig {
  siteName: string
  siteUrl: string
  twitterHandle: string
  defaultImage: string
  defaultDescription: string
}

export interface PageMetadataOptions {
  title: string
  description: string
  keywords?: string[]
  path: string
  image?: string
  noindex?: boolean
}

export interface BlogMetadataOptions {
  title: string
  description: string
  slug: string
  publishedAt: string
  image?: string
  author?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface OpenGraphOptions {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article'
}

export interface TwitterCardOptions {
  title: string
  description: string
  image?: string
}

// ============================================================================
// COMPONENT TYPES
// ============================================================================

export interface ProductIconProps {
  size?: number
  className?: string
}

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

export interface CardBaseProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
}

export interface FeatureCardProps extends CardBaseProps {
  icon?: React.ReactNode | LucideIcon
  title: string
  description: string
  productId?: ProductId
  hover?: boolean
}

export interface DocCardProps extends CardBaseProps {
  title: string
  description?: string
  href: string
  external?: boolean
  productId?: ProductId
  icon?: React.ReactNode | LucideIcon
}

export interface QuickLinkCardProps extends CardBaseProps {
  title: string
  description: string
  href: string
  external?: boolean
  productId?: ProductId
  icon?: React.ReactNode | LucideIcon
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  Metadata,
  LucideIcon,
}

