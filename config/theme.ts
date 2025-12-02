/**
 * Central Theme Configuration
 * 
 * This is the single source of truth for all styling, colors, gradients, and design tokens
 * across the entire website. Change values here to update the entire site consistently.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Primary brand colors
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Main primary
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  // Secondary brand colors
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // Main secondary
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  // Accent colors
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Success/positive
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  // Legacy cool colors for backward compatibility
  cool: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Semantic colors
  white: '#FFFFFF',
  black: '#000000',
}

// ============================================================================
// PRODUCT-SPECIFIC THEMES
// ============================================================================

export type ProductId = 'pgraft' | 'pgbalancer' | 'fauxdb' | 'pgsentinel' | 'pg-stat-insights'

export interface ProductTheme {
  // Gradient classes for Tailwind
  badgeGradient: string
  heroGradient: string
  pageGradient: string
  // Color classes
  primaryColor: string
  secondaryColor: string
  accentColor: string
  // Icon colors
  iconColors: {
    primary: string
    secondary: string
    tertiary?: string
    quaternary?: string
  }
  // Button styles
  buttonPrimary: string
  buttonSecondary: string
  // Link hover
  linkHover: string
  // Feature card
  featureIconClass: string
  featureCardClass: string
  // Quick link card
  quickLinkCardClass: string
  quickLinkIconClass: string
  quickLinkHoverLabelClass: string
  // Doc card
  docCardClass: string
}

export const productThemes: Record<ProductId, ProductTheme> = {
  pgraft: {
    badgeGradient: 'from-blue-600 to-purple-600',
    heroGradient: 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10',
    pageGradient: 'bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900',
    primaryColor: 'blue-600',
    secondaryColor: 'purple-600',
    accentColor: 'cyan-600',
    iconColors: {
      primary: 'blue-400',
      secondary: 'yellow-400',
      tertiary: 'green-400',
      quaternary: 'purple-400',
    },
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'border-blue-300 hover:border-blue-400 text-blue-600',
    linkHover: 'hover:text-blue-600',
    featureIconClass: 'text-blue-600',
    featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-blue-300 dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkIconClass: 'text-blue-600',
    quickLinkHoverLabelClass: 'text-blue-600',
    docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  },
  pgbalancer: {
    badgeGradient: 'from-blue-600 to-cyan-600',
    heroGradient: 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 dark:from-blue-500/10 dark:to-cyan-500/10',
    pageGradient: 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900',
    primaryColor: 'blue-600',
    secondaryColor: 'cyan-600',
    accentColor: 'green-600',
    iconColors: {
      primary: 'cyan-400',
      secondary: 'green-400',
      tertiary: 'yellow-400',
    },
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'border-cyan-300 hover:border-cyan-400 text-cyan-600',
    linkHover: 'hover:text-blue-600',
    featureIconClass: 'text-blue-600',
    featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-blue-300 dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkIconClass: 'text-blue-600',
    quickLinkHoverLabelClass: 'text-blue-600',
    docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  },
  fauxdb: {
    badgeGradient: 'from-emerald-600 to-orange-600',
    heroGradient: 'bg-gradient-to-r from-emerald-600/20 to-orange-600/20 dark:from-emerald-500/10 dark:to-orange-500/10',
    pageGradient: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900',
    primaryColor: 'emerald-600',
    secondaryColor: 'orange-600',
    accentColor: 'blue-600',
    iconColors: {
      primary: 'emerald-400',
      secondary: 'orange-400',
      tertiary: 'blue-400',
      quaternary: 'red-400',
    },
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    buttonSecondary: 'border-emerald-300 hover:border-emerald-400 text-emerald-600',
    linkHover: 'hover:text-emerald-600',
    featureIconClass: 'text-emerald-600',
    featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-emerald-300 dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkIconClass: 'text-emerald-600',
    quickLinkHoverLabelClass: 'text-emerald-600',
    docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  },
  pgsentinel: {
    badgeGradient: 'from-blue-600 to-green-600',
    heroGradient: 'bg-gradient-to-r from-blue-600/20 to-green-600/20 dark:from-blue-500/10 dark:to-green-500/10',
    pageGradient: 'bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900',
    primaryColor: 'blue-600',
    secondaryColor: 'green-600',
    accentColor: 'yellow-600',
    iconColors: {
      primary: 'blue-400',
      secondary: 'green-400',
      tertiary: 'yellow-400',
      quaternary: 'red-400',
    },
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'border-green-300 hover:border-green-400 text-green-600',
    linkHover: 'hover:text-blue-600',
    featureIconClass: 'text-blue-600',
    featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-blue-300 dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkIconClass: 'text-blue-600',
    quickLinkHoverLabelClass: 'text-blue-600',
    docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  },
  'pg-stat-insights': {
    badgeGradient: 'from-purple-600 to-blue-600',
    heroGradient: 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 dark:from-purple-500/10 dark:to-blue-500/10',
    pageGradient: 'bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900',
    primaryColor: 'purple-600',
    secondaryColor: 'blue-600',
    accentColor: 'green-600',
    iconColors: {
      primary: 'purple-400',
      secondary: 'blue-400',
      tertiary: 'green-400',
      quaternary: 'orange-400',
    },
    buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white',
    buttonSecondary: 'border-purple-300 hover:border-purple-400 text-purple-600',
    linkHover: 'hover:text-purple-600',
    featureIconClass: 'text-purple-600',
    featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-purple-300 dark:border-slate-700/60 dark:bg-slate-900/60',
    quickLinkIconClass: 'text-purple-600',
    quickLinkHoverLabelClass: 'text-purple-600',
    docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  },
}

// ============================================================================
// GLOBAL BACKGROUNDS
// ============================================================================
// 
// IMPORTANT: The entire website uses ONE solid background color:
// Solid color: #1f2937 (used for all hero sections, footer, and page content)
//
// Change this value to update backgrounds across the entire site.

export const gradients = {
  // Hero and Footer - Solid color (slightly darker than page background)
  hero: {
    css: '#111827',
    tailwind: 'bg-[#111827]',
  },
  // Page background - Solid color (used for all other page content)
  page: {
    css: '#1f2937',
    tailwind: 'bg-[#1f2937]',
  },
}

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const buttons = {
  primary: {
    base: 'inline-flex items-center gap-2 rounded-xl font-semibold text-white shadow-lg transition-all duration-300',
    colors: 'bg-slate-900 hover:bg-slate-800',
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    },
  },
  secondary: {
    base: 'inline-flex items-center gap-2 rounded-xl border font-semibold transition-all duration-300',
    colors: 'border-slate-300 hover:border-slate-400 text-slate-700 dark:border-slate-600 dark:text-slate-200',
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    },
  },
  outline: {
    base: 'inline-flex items-center gap-2 rounded-xl border-2 font-semibold transition-all duration-300 backdrop-blur-sm',
    colors: 'bg-transparent hover:bg-primary-50/50 text-primary-600 border-primary-600 hover:border-primary-700 hover:bg-primary-600 hover:text-white',
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    },
  },
}

// ============================================================================
// CARD STYLES
// ============================================================================

export const cards = {
  feature: {
    base: 'rounded-2xl border p-6 shadow-sm transition-all duration-300',
    colors: 'border-slate-200 bg-white/85 dark:border-slate-700/60 dark:bg-slate-900/60',
    hover: 'hover:shadow-md hover:-translate-y-1',
  },
  doc: {
    base: 'rounded-2xl border p-6 shadow-sm transition-all duration-300',
    colors: 'border-slate-200 bg-white/90 dark:border-slate-700/60 dark:bg-slate-900/60',
    hover: 'hover:shadow-md hover:border-primary-300',
  },
  quickLink: {
    base: 'rounded-2xl border p-6 shadow-sm transition-all duration-300',
    colors: 'border-slate-200 bg-white/90 dark:border-slate-700/60 dark:bg-slate-900/60',
    hover: 'hover:shadow-md hover:border-primary-300',
  },
}

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
    heading: ['Poppins', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
    body: ['Inter', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
}

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  section: {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  },
  container: {
    narrow: 'max-w-3xl',
    default: 'max-w-4xl',
    wide: 'max-w-6xl',
    extraWide: 'max-w-7xl',
    ultraWide: 'max-w-8xl',
    full: 'max-w-9xl',
  },
  padding: {
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  },
}

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    bounceGentle: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-5px)' },
    },
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get theme for a specific product
 */
export function getProductTheme(productId: ProductId): ProductTheme {
  return productThemes[productId]
}

/**
 * Get button classes for a specific variant and size
 */
export function getButtonClasses(variant: 'primary' | 'secondary' | 'outline', size: 'sm' | 'md' | 'lg' = 'md'): string {
  const button = buttons[variant]
  return `${button.base} ${button.colors} ${button.sizes[size]}`
}

/**
 * Get card classes for a specific type
 */
export function getCardClasses(type: 'feature' | 'doc' | 'quickLink', withHover = true): string {
  const card = cards[type]
  return `${card.base} ${card.colors} ${withHover ? card.hover : ''}`
}

// ============================================================================
// EXPORT DEFAULT THEME OBJECT
// ============================================================================

export const theme = {
  colors,
  productThemes,
  gradients,
  buttons,
  cards,
  typography,
  spacing,
  animations,
  getProductTheme,
  getButtonClasses,
  getCardClasses,
}

export default theme

