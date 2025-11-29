import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface CTAButton {
  label: string
  href: string
  icon?: ReactNode
  external?: boolean
  variant?: 'primary' | 'secondary'
}

interface HeroConfig {
  badgeLabel: string
  badgeIcon?: ReactNode
  badgeGradient: string
  title: string
  description: string
  ctas?: CTAButton[]
}

interface FeatureCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface DocSectionItem {
  title: string
  href: string
  description: string
}

interface DocSection {
  title: string
  description: string
  items: DocSectionItem[]
}

interface QuickLink {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

interface ProductDocsLandingProps {
  hero: HeroConfig
  features: FeatureCard[]
  docSections: DocSection[]
  quickLinks: QuickLink[]
  theme?: Partial<LandingTheme>
}

interface LandingTheme {
  pageBackground: string
  heroOverlay: string
  badgeContainerBg: string
  badgeRing: string
  primaryButtonClass: string
  secondaryButtonClass: string
  featureCardClass: string
  featureIconClass: string
  docCardClass: string
  linkHoverClass: string
  quickLinkCardClass: string
  quickLinkIconClass: string
  quickLinkHoverLabelClass: string
}

const DEFAULT_THEME: LandingTheme = {
  pageBackground: 'bg-page-gradient',
  heroOverlay: 'bg-hero-gradient',
  badgeContainerBg: 'bg-white/80 dark:bg-slate-800/80',
  badgeRing: 'ring-gray-900/10 dark:ring-white/10',
  primaryButtonClass:
    'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800',
  secondaryButtonClass:
    'inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-600 dark:text-slate-200',
  featureCardClass: 'rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  featureIconClass: 'text-indigo-600',
  docCardClass: 'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60',
  linkHoverClass: 'hover:text-indigo-600',
  quickLinkCardClass:
    'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/60',
  quickLinkIconClass: 'text-indigo-600',
  quickLinkHoverLabelClass: 'text-indigo-600'
}

export default function ProductDocsLanding({ hero, features, docSections, quickLinks, theme }: ProductDocsLandingProps) {
  const themeClasses = { ...DEFAULT_THEME, ...theme }

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[400px] flex items-center">
        <div className={`absolute inset-0 ${themeClasses.heroOverlay}`} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-20">
          <div className="mx-auto max-w-3xl text-center w-full">
            <div className="mb-8 flex justify-center">
              <div
                className={`relative rounded-2xl ${themeClasses.badgeContainerBg} p-2 shadow-2xl ring-1 ${themeClasses.badgeRing}`}
              >
                <div className={`flex items-center space-x-2 rounded-xl bg-slate-700 px-4 py-2 text-white`}>
                  {hero.badgeIcon}
                  <span className="text-lg font-semibold">{hero.badgeLabel}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">{hero.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{hero.description}</p>

            {hero.ctas && hero.ctas.length > 0 ? (
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {hero.ctas.map((cta) => {
                  const Component = cta.external ? 'a' : Link
                  const props = cta.external
                    ? { href: cta.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: cta.href }
                  const className = cta.variant === 'secondary' ? themeClasses.secondaryButtonClass : themeClasses.primaryButtonClass

                  return (
                    <Component key={cta.href} {...props} className={className}>
                      {cta.icon}
                      {cta.label}
                    </Component>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      {features.length > 0 ? (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Key Capabilities</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className={themeClasses.featureCardClass}>
                  <Icon className={`h-6 w-6 ${themeClasses.featureIconClass}`} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Documentation Sections */}
      {docSections.length > 0 ? (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Documentation Library</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {docSections.map((section) => (
                <div key={section.title} className={themeClasses.docCardClass}>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between text-slate-700 dark:text-slate-200 ${themeClasses.linkHoverClass}`}
                        >
                          <span>{item.title}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Quick Links */}
      {quickLinks.length > 0 ? (
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Quick Links</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {quickLinks.map(({ title, description, href, icon: Icon, external }) => {
                const Component = external ? 'a' : Link
                const props = external
                  ? { href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href }

                return (
                  <Component key={href} {...props} className={themeClasses.quickLinkCardClass}>
                    <Icon className={`h-6 w-6 ${themeClasses.quickLinkIconClass}`} />
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                    <span
                      className={`mt-4 inline-flex items-center text-sm font-semibold ${themeClasses.quickLinkHoverLabelClass}`}
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Component>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
