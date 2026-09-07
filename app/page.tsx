import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { TOPIC_LIST } from '@/config/topics'
import { fetchChannelVideos, formatPublishedDate } from '@/lib/youtube'
import { videoSlug } from '@/lib/video-blog'

export const metadata: Metadata = {
  title: {
    absolute: 'Dr. Ibrar Ahmed',
  },
  description:
    'Principal Engineer and educator. Long-form notes and videos on PostgreSQL, AI systems, and cyber security.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dr. Ibrar Ahmed',
    description:
      'Principal Engineer and educator. Long-form notes and videos on PostgreSQL, AI systems, and cyber security.',
    url: '/',
    images: [{ url: '/profile/dr-ibrar-ahmed.png', alt: 'Dr. Ibrar Ahmed' }],
  },
}

export const revalidate = 3600

const credentials = [
  'Principal Engineer, pgEdge',
  'PostgreSQL contributor since 2008',
  'PhD in AI and Scientometrics',
]

const channels = [
  {
    href: '/postgresql',
    name: 'PostgreSQL Mechanics',
    blurb: 'Production databases, HA, RDS, Aurora, and day-to-day DBA craft.',
    logo: '/channels/postgresql-mechanics.jpg',
    accent: 'text-sky-400',
  },
  {
    href: '/ai',
    name: 'AI Mechanics',
    blurb: 'How LLMs, RAG, inference, and agents actually work.',
    logo: '/channels/ai-mechanics.jpg',
    accent: 'text-amber-500',
  },
  {
    href: '/cybersecurity',
    name: 'Cyber Mechanics',
    blurb: 'AI security and defensive education for builders and SOC teams.',
    logo: '/channels/cyber-mechanics.jpg',
    accent: 'text-emerald-400',
  },
]

export default async function HomePage() {
  const latestByTopic = await Promise.all(
    TOPIC_LIST.map(async (topic) => {
      const videos = await fetchChannelVideos(topic.channel, { limit: 1 })
      return { topic, video: videos[0] ?? null }
    })
  )

  return (
    <main className="bg-[#090909]">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(214,197,163,0.09),transparent_28%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[calc(50%-1px)] hidden w-px bg-white/[0.04] lg:block"
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-6xl px-5 sm:px-8 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)] lg:px-10">
          <div className="home-reveal flex flex-col justify-between pb-14 pt-16 sm:pb-20 sm:pt-24 lg:pr-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9b68e]">
              Principal Engineer · Author · Educator
            </p>

            <div className="my-16 sm:my-24">
              <h1 className="max-w-3xl font-serif text-[3.65rem] font-normal leading-[0.91] tracking-[-0.045em] text-[#f3f0e9] sm:text-[5.6rem] lg:text-[6.35rem]">
                Dr. Ibrar
                <br />
                Ahmed
              </h1>
              <p className="mt-9 max-w-2xl text-lg leading-[1.7] text-stone-400 sm:text-xl">
                I build and teach systems that must work in production, from
                PostgreSQL at global scale to practical AI and defensive
                security.
              </p>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                {credentials.map((credential) => (
                  <span
                    key={credential}
                    className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-2 bg-[#eee9de] px-5 text-sm font-semibold text-stone-950 transition hover:bg-white"
              >
                View profile
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/postgresql"
                className="inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-sm font-medium text-stone-300 transition hover:border-white/30 hover:text-white"
              >
                Read the articles
              </Link>
            </div>
          </div>

          <div className="home-reveal home-reveal-delay-1 relative flex items-end border-t border-white/[0.08] pb-14 pt-10 sm:pb-20 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-24">
            <div className="w-full">
              <div className="relative mx-auto aspect-[4/5] max-w-[23rem] overflow-hidden border border-white/10 bg-stone-900 lg:mx-0">
                <Image
                  src="/profile/dr-ibrar-ahmed.png"
                  alt="Portrait of Dr. Ibrar Ahmed"
                  fill
                  priority
                  className="object-cover object-top grayscale"
                  sizes="(max-width: 1024px) 368px, 360px"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="mx-auto mt-6 flex max-w-[23rem] items-center justify-between border-t border-white/10 pt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-600 lg:mx-0">
                <span>Islamabad</span>
                <span>Working globally</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]" aria-label="Career highlights">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/[0.08] border-x border-white/[0.08] px-0 sm:grid-cols-4">
          {[
            ['27', 'Years in software'],
            ['2008', 'PostgreSQL contributor'],
            ['60+', 'International talks'],
            ['4', 'Published books'],
          ].map(([value, label]) => (
            <div key={label} className="px-5 py-8 sm:px-8 sm:py-10">
              <p className="font-serif text-3xl font-normal text-[#eee9de] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="channels-heading" className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
                Knowledge in public
              </p>
              <h2
                id="channels-heading"
                className="mt-5 font-serif text-4xl font-normal tracking-[-0.025em] text-[#f3f0e9] sm:text-5xl"
              >
                Teaching
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-stone-500">
                Long-form, visual explanations for engineers who want to
                understand how systems behave, not just how to operate them.
              </p>
            </div>

            <ul className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {channels.map((channel) => (
              <li key={channel.href}>
                <Link
                  href={channel.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 outline-none transition sm:gap-7 sm:py-7"
                >
                  <Image
                    src={channel.logo}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border border-white/15 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition duration-300 group-hover:scale-[1.04] group-hover:border-white/30"
                  />
                  <div className="min-w-0">
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${channel.accent}`}>
                      Long-form channel
                    </p>
                    <p className="mt-1.5 text-lg font-medium text-stone-100">
                      {channel.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-400">
                      {channel.blurb}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-stone-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
                From the desk
              </p>
              <h2
                id="latest-heading"
                className="mt-5 font-serif text-4xl font-normal tracking-[-0.025em] text-[#f3f0e9] sm:text-5xl"
              >
                Latest articles
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-stone-100"
            >
              Books and background
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ol className="grid border border-white/[0.09] lg:grid-cols-3 lg:divide-x lg:divide-white/[0.09]">
            {latestByTopic.map(({ topic, video }, index) =>
              video ? (
                <li
                  key={topic.path}
                  className="group border-b border-white/[0.09] bg-white/[0.015] last:border-b-0 hover:bg-white/[0.035] lg:border-b-0"
                >
                  <Link
                    href={`/${topic.path}/${videoSlug(video)}`}
                    className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/50"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-900">
                      <Image
                        src={video.thumbnailUrl}
                        alt=""
                        fill
                        className="object-cover saturate-[0.88] transition duration-500 group-hover:scale-[1.025] group-hover:saturate-100"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        unoptimized
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 transition group-hover:from-black/20" />
                      <span className="absolute left-4 top-4 border border-white/10 bg-black/75 px-2.5 py-1 font-mono text-[10px] text-stone-200 backdrop-blur">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${topic.accentTextClass}`}>
                        {topic.channel.name}
                      </p>
                      <h3 className="mt-4 text-lg font-medium leading-snug text-stone-100 transition group-hover:text-white">
                        {video.title}
                      </h3>
                      {video.publishedAt && (
                        <time
                          dateTime={video.publishedAt}
                          className="mt-5 block text-xs text-stone-500"
                        >
                          {formatPublishedDate(video.publishedAt)}
                        </time>
                      )}
                    </div>
                  </Link>
                </li>
              ) : null
            )}
          </ol>
        </div>
      </section>
    </main>
  )
}
