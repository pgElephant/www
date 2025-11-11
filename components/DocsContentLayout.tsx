import { ReactNode } from 'react'
import { cn } from '../lib/utils'

const GRADIENTS = {
  default: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)',
  slate: 'linear-gradient(135deg, #0b1120 0%, #111c2d 40%, #1f2937 70%, #273445 100%)',
} as const

const BADGE_GRADIENTS = {
  indigo: 'from-indigo-500 to-purple-500',
  cyan: 'from-cyan-500 to-sky-500',
  emerald: 'from-emerald-500 to-teal-500',
  purple: 'from-purple-500 to-fuchsia-500',
  blue: 'from-blue-500 to-cyan-500',
  amber: 'from-amber-500 to-orange-500',
  slate: 'from-slate-500 to-slate-300',
} as const

type BadgeTone = keyof typeof BADGE_GRADIENTS

type ContentWidth = 'narrow' | 'default' | 'wide'

type HeroAlign = 'center' | 'left'

interface HeroConfig {
  badgeLabel?: string
  badgeIcon?: ReactNode
  badgeTone?: BadgeTone
  title: string
  description?: string
  actions?: ReactNode
  align?: HeroAlign
  width?: ContentWidth
}

interface DocsContentLayoutProps {
  hero?: HeroConfig
  children: ReactNode
  gradient?: keyof typeof GRADIENTS
  contentWidth?: ContentWidth
  className?: string
}

const WIDTH_MAP: Record<ContentWidth, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
}

export default function DocsContentLayout({
  hero,
  children,
  gradient = 'default',
  contentWidth = 'default',
  className,
}: DocsContentLayoutProps) {
  const gradientStyle = GRADIENTS[gradient] ?? GRADIENTS.default
  const contentClass = WIDTH_MAP[contentWidth] ?? WIDTH_MAP.default

  const heroAlign = hero?.align ?? 'center'
  const heroWidth = WIDTH_MAP[hero?.width ?? 'wide'] ?? WIDTH_MAP.wide
  const badgeTone = hero?.badgeTone ?? 'indigo'

  return (
    <div
      className={cn('min-h-screen', className)}
      style={{ background: gradientStyle }}
    >
      {hero ? (
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.18), transparent 65%)' }}
          />
          <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
          <div className={cn('relative mx-auto px-6 lg:px-12 flex flex-col gap-6', heroWidth, heroAlign === 'center' ? 'items-center text-center' : 'items-start text-left')}>
            {hero.badgeLabel ? (
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30',
                  BADGE_GRADIENTS[badgeTone]
                )}
              >
                {hero.badgeIcon}
                <span>{hero.badgeLabel}</span>
              </div>
            ) : null}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              {hero.description ? (
                <p className="text-base text-slate-200 sm:text-lg lg:text-xl max-w-3xl">
                  {hero.description}
                </p>
              ) : null}
            </div>
            {hero.actions ? <div className="flex flex-wrap items-center gap-3">{hero.actions}</div> : null}
          </div>
        </section>
      ) : null}

      <section className="pb-20 pt-6 sm:pb-24 sm:pt-10">
        <div className={cn('mx-auto px-6 lg:px-12 space-y-16', contentClass)}>{children}</div>
      </section>
    </div>
  )
}
