import { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Standardized Hero Templates
 * All hero sections use py-24 for consistent vertical height
 * All use bg-hero-gradient for consistent styling
 */

// Template 1: Main Home Page Hero
export interface MainHeroProps {
  title: string
  description: string
  cta?: {
    label: string
    href: string
    external?: boolean
  }
  badge?: {
    label: string
    icon?: ReactNode
  }
}

export function MainHero({ title, description, cta, badge }: MainHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[400px] flex items-center bg-hero-gradient">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-20">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                {badge.icon}
                <span className="text-sm font-semibold uppercase tracking-wide text-white/90">{badge.label}</span>
              </div>
            </div>
          )}
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/90">{description}</p>
          {cta && (
            <div className="mt-10 flex justify-center">
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Template 2: Product Landing Page Hero
export interface ProductHeroProps {
  badgeLabel: string
  badgeIcon?: ReactNode
  title: string
  description: string
  ctas?: Array<{
    label: string
    href: string
    icon?: ReactNode
    external?: boolean
    variant?: 'primary' | 'secondary'
  }>
}

export function ProductHero({ badgeLabel, badgeIcon, title, description, ctas }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[400px] flex items-center bg-hero-gradient">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-2xl bg-white/80 dark:bg-slate-800/80 p-2 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
              <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 px-4 py-2 text-white">
                {badgeIcon}
                <span className="text-lg font-semibold">{badgeLabel}</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/90">{description}</p>
          {ctas && ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {ctas.map((cta) => {
                const Component = cta.external ? 'a' : Link
                const props = cta.external
                  ? { href: cta.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: cta.href }
                const className =
                  cta.variant === 'secondary'
                    ? 'inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50'
                    : 'inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20'

                return (
                  <Component key={cta.href} {...props} className={className}>
                    {cta.icon}
                    {cta.label}
                  </Component>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Template 3: Documentation/Other Pages Hero
export interface DocsHeroProps {
  badgeLabel?: string
  badgeIcon?: ReactNode
  title: string
  description?: string
  actions?: ReactNode
  align?: 'center' | 'left'
}

export function DocsHero({ badgeLabel, badgeIcon, title, description, actions, align = 'center' }: DocsHeroProps) {
  return (
    <section className="relative overflow-hidden py-24 bg-hero-gradient">
      <div
        className={`relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-6 ${
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        {badgeLabel && (
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            {badgeIcon}
            <span>{badgeLabel}</span>
          </div>
        )}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="text-base text-white/90 sm:text-lg lg:text-xl max-w-3xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </section>
  )
}

