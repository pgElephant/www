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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-24 min-h-[400px] flex items-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-300/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              {hero.badgeIcon}
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">{hero.badgeLabel}</span>
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">{hero.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{hero.description}</p>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-5 text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
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
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{product.name}</h2>
                    <p className={`text-md font-semibold ${theme.accentText}`}>{product.headline}</p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{product.summary}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.key}
                      href={category.href}
                      className="group/category flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        {category.icon ? (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {category.icon}
                          </span>
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {CATEGORY_ORDER.indexOf(category.key) + 1}
                          </span>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white group-hover/category:text-slate-700 dark:group-hover/category:text-slate-200">
                            {category.title}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 group-hover/category:text-slate-700 dark:group-hover/category:text-slate-300">{category.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 dark:text-slate-500 transition group-hover/category:text-slate-700 dark:group-hover/category:text-slate-300 group-hover/category:translate-x-1" />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <Link
                    href={product.viewAllHref}
                    className="inline-flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 transition hover:text-slate-900 dark:hover:text-white"
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
        <section className="border-t border-slate-200 dark:border-slate-700 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Additional Resources</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
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
                    className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center transition hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 transition group-hover:scale-110">
                      {link.icon}
                    </span>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white transition group-hover:text-slate-700 dark:group-hover:text-slate-200">{link.title}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
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
