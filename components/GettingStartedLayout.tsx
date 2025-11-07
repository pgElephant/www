import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

const ACCENT_STYLES = {
  indigo: {
    border: 'border-indigo-500',
    badge: 'from-indigo-600 to-purple-600',
  },
  purple: {
    border: 'border-purple-500',
    badge: 'from-purple-600 to-pink-600',
  },
  emerald: {
    border: 'border-emerald-500',
    badge: 'from-emerald-600 to-teal-600',
  },
  blue: {
    border: 'border-blue-500',
    badge: 'from-blue-600 to-cyan-600',
  },
  cyan: {
    border: 'border-cyan-500',
    badge: 'from-cyan-600 to-sky-600',
  },
  pink: {
    border: 'border-pink-500',
    badge: 'from-pink-500 to-rose-600',
  },
  rose: {
    border: 'border-rose-500',
    badge: 'from-rose-500 to-fuchsia-600',
  },
  amber: {
    border: 'border-amber-500',
    badge: 'from-amber-500 to-orange-500',
  },
  slate: {
    border: 'border-slate-500',
    badge: 'from-slate-600 to-slate-400',
  },
} as const

type Accent = keyof typeof ACCENT_STYLES

interface HeroCTA {
  label: string
  href: string
  icon?: ReactNode
  external?: boolean
}

interface HeroProps {
  label: string
  labelIcon?: ReactNode
  labelAccent?: Accent
  title: string
  description: string
  cta?: HeroCTA
}

interface ThemeProps {
  pageBackground: string
  heroOverlay: string
  requirementsBorder: Accent
  requirementsBackground?: string
}

interface RequirementsProps {
  title: string
  items: string[]
  note?: ReactNode
}

interface SectionCard {
  id: string
  title: string
  description?: string
  accent: Accent
  content: ReactNode
}

interface SectionProps {
  id?: string
  title: string
  description?: string
  cards?: SectionCard[]
  content?: ReactNode
}

interface NextStepLink {
  href: string
  title: string
  description: string
  icon?: ReactNode
  external?: boolean
}

interface SupportLink {
  href: string
  label: string
  description: string
  external?: boolean
}

interface GettingStartedLayoutProps {
  product: string
  hero: HeroProps
  theme: ThemeProps
  requirements: RequirementsProps
  sections: SectionProps[]
  nextSteps?: NextStepLink[]
  supportLinks?: SupportLink[]
  footerNote?: ReactNode
}

export default function GettingStartedLayout({
  product,
  hero,
  theme,
  requirements,
  sections,
  nextSteps,
  supportLinks,
  footerNote,
}: GettingStartedLayoutProps) {
  const heroAccent = hero.labelAccent ?? 'indigo'
  const heroBadgeGradient = ACCENT_STYLES[heroAccent]?.badge ?? ACCENT_STYLES.indigo.badge
  const requirementsAccent = theme.requirementsBorder
  const requirementsBorderClass = ACCENT_STYLES[requirementsAccent]?.border ?? ACCENT_STYLES.indigo.border
  const requirementsBackgroundClass = theme.requirementsBackground ?? 'bg-white/90'

  return (
    <div className={`min-h-screen ${theme.pageBackground}`}>
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className={`absolute inset-0 ${theme.heroOverlay}`} />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-2xl bg-white/85 p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-700">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${heroBadgeGradient} px-4 py-2 text-sm font-semibold text-white`}
                >
                  {hero.labelIcon}
                  {hero.label}
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{hero.title}</h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{hero.description}</p>
              </div>
              {hero.cta ? (
                hero.cta.external ? (
                  <a
                    href={hero.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200"
                  >
                    {hero.cta.icon}
                    {hero.cta.label}
                  </a>
                ) : (
                  <Link
                    href={hero.cta.href}
                    className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200"
                  >
                    {hero.cta.icon}
                    {hero.cta.label}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-6 pb-24 lg:px-8">
        <div className={`rounded-2xl border ${requirementsBorderClass} ${requirementsBackgroundClass} p-6 shadow-sm dark:border-opacity-60`}> 
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{requirements.title}</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {requirements.items.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
          {requirements.note ? <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">{requirements.note}</div> : null}
        </div>

        {sections.map((section) => (
          <section key={section.title} id={section.id} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              {section.description ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
              ) : null}
            </div>
            {section.cards ? (
              <div className="space-y-6">
                {section.cards.map((card) => {
                  const accent = ACCENT_STYLES[card.accent] ?? ACCENT_STYLES.indigo
                  return (
                    <div
                      key={card.id}
                      id={card.id}
                      className={`border-l-4 ${accent.border} bg-white/80 p-4 shadow-sm dark:bg-slate-900/50`}
                    >
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                      {card.description ? (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
                      ) : null}
                      <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">{card.content}</div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            {section.content ? <div className="space-y-4">{section.content}</div> : null}
          </section>
        ))}

        {nextSteps && nextSteps.length > 0 ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Next Steps</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {nextSteps.map((link) => {
                const Wrapper = link.external ? 'a' : Link
                const wrapperProps = link.external
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href }

                return (
                  <Wrapper
                    key={link.href}
                    {...wrapperProps}
                    className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
                  >
                    {link.icon ? <span className="mr-2 inline-flex items-center">{link.icon}</span> : null}
                    {link.title}
                    <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">{link.description}</p>
                    {link.external ? (
                      <span className="mt-2 inline-flex items-center text-xs font-medium text-blue-600">
                        Open Link <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    ) : null}
                  </Wrapper>
                )
              })}
            </div>
          </section>
        ) : null}

        {supportLinks && supportLinks.length > 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Need Help?</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Join our community for support and discussion:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  •{' '}
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-blue-600 hover:underline dark:text-blue-400">
                      {link.label}
                    </Link>
                  )}
                  <span className="text-slate-600 dark:text-slate-400"> — {link.description}</span>
                </li>
              ))}
            </ul>
            {footerNote ? <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">{footerNote}</div> : null}
          </section>
        ) : null}
      </section>
    </div>
  )
}
