import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

const CATEGORY_KEYS = ['getting-started', 'installation', 'configuration', 'troubleshooting', 'common-issues'] as const

interface HeroStat {
  label: string
  value: string
}

interface HeroConfig {
  badgeLabel: string
  badgeIcon?: ReactNode
  title: string
  description: string
  stats: HeroStat[]
}

type ProductCategoryKey = (typeof CATEGORY_KEYS)[number]

interface ProductCategory {
  key: ProductCategoryKey
  title: string
  description: string
  href: string
  icon?: ReactNode
}

interface HubProductTheme {
  gradient: string
  border: string
  glow: string
  iconBorder?: string
  accentText?: string
}

interface HubProduct {
  id: string
  name: string
  headline: string
  summary: string
  icon: ReactNode
  theme: HubProductTheme
  categories: ProductCategory[]
  viewAllHref: string
}

interface ResourceLink {
  title: string
  description: string
  href: string
  icon: ReactNode
  external?: boolean
}

interface DocsHubLandingProps {
  hero: HeroConfig
  products: HubProduct[]
  resources?: ResourceLink[]
}

const CATEGORY_ORDER: ProductCategoryKey[] = [...CATEGORY_KEYS]

const DEFAULT_THEME: HubProductTheme = {
  gradient: 'from-slate-800/70 to-slate-900/70',
  border: 'border-slate-700/60',
  glow: 'shadow-slate-900/40',
  iconBorder: 'border-slate-700/70',
  accentText: 'text-slate-300'
}

export default function DocsHubLanding({ hero, products, resources }: DocsHubLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(6, 182, 212, 0.35) 50%, rgba(16, 185, 129, 0.35) 100%)' }} />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-16 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute top-48 right-24 h-32 w-32 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute bottom-24 left-1/3 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
              {hero.badgeIcon}
              <span className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{hero.badgeLabel}</span>
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">{hero.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-100/90">{hero.description}</p>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-cyan-300">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2">
          {products.map((product) => {
            const theme = { ...DEFAULT_THEME, ...product.theme }
            const categories = [...product.categories].sort(
              (a, b) => CATEGORY_ORDER.indexOf(a.key) - CATEGORY_ORDER.indexOf(b.key)
            )

            return (
              <div
                key={product.id}
                className={`group relative rounded-2xl border-2 ${theme.border} bg-gradient-to-br ${theme.gradient} p-8 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.01] ${theme.glow}`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 ${theme.iconBorder} bg-black/20 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                    <p className={`text-md font-semibold ${theme.accentText}`}>{product.headline}</p>
                    <p className="mt-3 text-sm text-white/80">{product.summary}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.key}
                      href={category.href}
                      className="group/category flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/40 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        {category.icon ? (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                            {category.icon}
                          </span>
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                            {CATEGORY_ORDER.indexOf(category.key) + 1}
                          </span>
                        )}
                        <div>
                          <div className="font-semibold text-white group-hover/category:text-cyan-100">
                            {category.title}
                          </div>
                          <p className="text-xs text-white/70 group-hover/category:text-white/80">{category.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/40 transition group-hover/category:text-cyan-200 group-hover/category:translate-x-1" />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <Link
                    href={product.viewAllHref}
                    className="inline-flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    View complete documentation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {resources && resources.length > 0 ? (
        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white">Additional Resources</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
              Explore downloads, community links, and source code to get the most out of pgElephant products.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resources.map((link) => {
                const Wrapper = link.external ? 'a' : Link
                const wrapperProps = link.external
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href }

                return (
                  <Wrapper
                    key={link.href}
                    {...wrapperProps}
                    className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-cyan-300/50 hover:bg-white/10"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cyan-200 transition group-hover:scale-110">
                      {link.icon}
                    </span>
                    <div className="text-lg font-semibold text-white transition group-hover:text-cyan-100">{link.title}</div>
                    <p className="text-sm text-white/70">{link.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Wrapper>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export type { HubProduct, ProductCategory, ResourceLink, ProductCategoryKey }
