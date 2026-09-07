import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { AMAZON_AUTHOR_URL, BOOKS } from '@/config/books'
import {
  YOUTUBE_CHANNEL,
  YOUTUBE_CHANNEL_AI,
  YOUTUBE_CHANNEL_CYBER,
} from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Dr. Ibrar Ahmed. Principal Engineer at pgEdge, PhD in AI and Scientometrics, PostgreSQL specialist, author, and educator.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Dr. Ibrar Ahmed',
    description:
      'Principal Engineer at pgEdge, PhD in AI and Scientometrics, PostgreSQL specialist, author, and educator.',
    url: '/about',
    images: [{ url: '/profile/dr-ibrar-ahmed.png', alt: 'Dr. Ibrar Ahmed' }],
  },
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/ibrarahmed74/'

const experience = [
  {
    role: 'Principal Engineer',
    org: 'pgEdge',
    period: 'Jul 2023 to Present',
    detail:
      'Distributed PostgreSQL for multi-master and active-active deployments: seamless failover, zero-downtime maintenance, and cross-region disaster recovery.',
  },
  {
    role: 'Developer',
    org: 'PostgreSQL Global Development Group',
    period: 'Jan 2008 to Present',
    detail:
      'Community contributions including work on pg_upgrade, index-only scans, performance patches, and production bug fixes.',
  },
  {
    role: 'Principal Engineer (Lead)',
    org: 'Percona',
    period: 'Jul 2018 to Jul 2023',
    detail:
      'PostgreSQL systems design, performance and reliability, mentoring engineers, and open-source contribution across the PostgreSQL ecosystem.',
  },
  {
    role: 'PostgreSQL Technology Consultant',
    org: 'MTBC / CareCloud',
    period: 'Jan 2017 to Jul 2023',
    detail:
      'Highly available PostgreSQL on AWS RDS and Aurora: multi-cluster infrastructure, backup and recovery, and performance at healthcare scale.',
  },
  {
    role: 'Senior Software Architect / Technical Architect',
    org: 'EnterpriseDB',
    period: '2010 to 2018',
    detail:
      'Core and extension work including mysql_fdw, mongo_fdw, and hdfs_fdw, plus performance internals, replication, and on-site training for enterprise teams.',
  },
]

const education = [
  {
    degree: 'PhD, Computer Science (AI and Deep Learning)',
    school: 'Capital University of Science and Technology',
    period: '2017 to 2025',
  },
  {
    degree: 'MS, Computer Engineering',
    school: 'University of Engineering and Technology, Taxila',
    period: '2005 to 2007',
  },
  {
    degree: 'MSc, Computer Science',
    school: 'International Islamic University, Islamabad',
    period: '1996 to 2000',
  },
]

export default function AboutPage() {
  return (
    <main className="bg-[#090909]">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(201,182,142,0.09),transparent_28%)]"
        />
        <div className="relative mx-auto grid max-w-6xl px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div className="flex items-end border-b border-white/[0.08] py-12 lg:border-b-0 lg:border-r lg:py-20 lg:pr-14">
            <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-stone-900">
                <Image
                  src="/profile/dr-ibrar-ahmed.png"
                  alt="Portrait of Dr. Ibrar Ahmed"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 416px, 390px"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-600">
                Islamabad · Working globally
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between py-14 lg:py-20 lg:pl-16">
            <p className="text-sm text-stone-500">
              <Link href="/" className="transition hover:text-stone-200">
                Home
              </Link>
              <span className="mx-2 text-stone-700" aria-hidden="true">
                /
              </span>
              <span className="text-stone-300">About</span>
            </p>

            <div className="my-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9b68e]">
                Engineer · Author · Educator
              </p>
              <h1 className="mt-6 max-w-2xl font-serif text-5xl font-normal leading-[0.98] tracking-[-0.04em] text-[#f3f0e9] sm:text-7xl">
                Dr. Ibrar Ahmed
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-[1.65] text-stone-300">
                Building dependable data systems, contributing to PostgreSQL,
                and teaching engineers how production systems actually behave.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 bg-[#eee9de] px-5 text-sm font-semibold text-stone-950 transition hover:bg-white"
              >
                LinkedIn profile
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <span className="text-xs uppercase tracking-[0.14em] text-stone-500">
                Principal Engineer at pgEdge
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]" aria-label="At a glance">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/[0.08] border-x border-white/[0.08] sm:grid-cols-4">
          {[
            ['27', 'Years in software'],
            ['2008', 'PostgreSQL contributor'],
            ['60+', 'International talks'],
            ['4', 'Published books'],
          ].map(([value, label]) => (
            <div key={label} className="px-5 py-8 sm:px-8 sm:py-10">
              <p className="font-serif text-3xl text-[#eee9de] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <section
          aria-labelledby="about-heading"
          className="grid gap-10 border-b border-white/[0.08] py-20 sm:py-28 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
              Profile
            </p>
            <h2
              id="about-heading"
              className="mt-5 font-serif text-4xl font-normal tracking-[-0.03em] text-[#f3f0e9]"
            >
              Work with consequence
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-[1.85] text-stone-300">
            <p>
              I am a Principal Engineer at pgEdge with 27 years in software
              development. My work centers on PostgreSQL core development,
              performance, query optimization, Ultra-HA, and multi-master
              replication for systems that cannot afford downtime.
            </p>
            <p>
              Since 2008 I have contributed to the PostgreSQL Global Development
              Group. Roles at EnterpriseDB, Percona, and CareCloud shaped the
              way I approach production engineering: measure first, change
              carefully, and verify with evidence.
            </p>
            <p>
              I hold a PhD in AI and Scientometrics and write books for working
              engineers. Through PostgreSQL Mechanics, AI Mechanics, and Cyber
              Mechanics, I turn difficult systems into practical lessons
              grounded in real behavior.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="experience-heading"
          className="grid gap-10 border-b border-white/[0.08] py-20 sm:py-28 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
              Career
            </p>
            <h2
              id="experience-heading"
              className="mt-5 font-serif text-4xl font-normal tracking-[-0.03em] text-[#f3f0e9]"
            >
              Experience
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-500">
              More than two decades across database internals, distributed
              systems, consulting, and technical leadership.
            </p>
          </div>

          <ol className="border-t border-white/[0.09]">
            {experience.map((item, index) => (
              <li
                key={`${item.org}-${item.role}`}
                className="grid gap-4 border-b border-white/[0.09] py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6"
              >
                <span className="font-mono text-xs text-stone-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-medium text-stone-100">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#c9b68e]">
                    {item.org}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
                    {item.detail}
                  </p>
                </div>
                <time className="text-xs text-stone-500">{item.period}</time>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="education-heading"
          className="border-b border-white/[0.08] py-20 sm:py-28"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
                Academic foundation
              </p>
              <h2
                id="education-heading"
                className="mt-5 font-serif text-4xl font-normal tracking-[-0.03em] text-[#f3f0e9]"
              >
                Education
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-stone-500">
              Computer science, engineering, artificial intelligence, and the
              study of how research influence is measured.
            </p>
          </div>
          <ul className="grid border border-white/[0.09] md:grid-cols-3 md:divide-x md:divide-white/[0.09]">
            {education.map((item, index) => (
              <li
                key={item.degree}
                className="border-b border-white/[0.09] p-6 last:border-b-0 md:border-b-0 md:p-8"
              >
                <span className="font-mono text-[10px] text-stone-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-base font-medium leading-snug text-stone-100">
                  {item.degree}
                </h3>
                <p className="mt-4 text-sm leading-6 text-stone-400">
                  {item.school}
                </p>
                <p className="mt-5 text-xs text-stone-600">{item.period}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="books"
          aria-labelledby="books-heading"
          className="border-b border-white/[0.08] py-20 sm:py-28"
        >
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
                Selected work
              </p>
              <h2
                id="books-heading"
                className="mt-5 font-serif text-4xl font-normal tracking-[-0.03em] text-[#f3f0e9]"
              >
                Books
              </h2>
            </div>
            <a
              href={AMAZON_AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-white"
            >
              Amazon author page
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2">
            {BOOKS.map((book) => (
              <li key={book.href} className="bg-[#090909]">
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full gap-6 p-5 transition hover:bg-white/[0.035] sm:p-7"
                >
                  <Image
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    width={110}
                    height={150}
                    className="h-[9.25rem] w-[6.75rem] shrink-0 border border-white/10 object-cover shadow-[0_14px_35px_rgba(0,0,0,0.4)] transition duration-300 group-hover:-translate-y-1"
                  />
                  <div className="flex min-w-0 flex-col py-1">
                    <p className="text-base font-medium leading-snug text-stone-100 group-hover:text-white">
                      {book.title}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-stone-500">
                      {book.authors}
                    </p>
                    <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-wider text-stone-600">
                      {book.year}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20"
          aria-labelledby="channels"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9b68e]">
              Teaching in public
            </p>
            <h2
              id="channels"
              className="mt-5 font-serif text-4xl font-normal tracking-[-0.03em] text-[#f3f0e9]"
            >
              Channels
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-500">
              Long-form technical education across databases, AI systems, and
              cyber security.
            </p>
          </div>
          <div>
            <ul className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
              {[YOUTUBE_CHANNEL, YOUTUBE_CHANNEL_AI, YOUTUBE_CHANNEL_CYBER].map(
                (channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 py-6 text-stone-200 transition hover:text-white"
                    >
                      <Image
                        src={channel.logo}
                        alt=""
                        width={52}
                        height={52}
                        className="h-[3.25rem] w-[3.25rem] rounded-full border border-white/15 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                      />
                      <span className="flex-1 font-medium">{channel.name}</span>
                      <ExternalLink
                        className="h-4 w-4 text-stone-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              )}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {[
                ['LinkedIn', LINKEDIN_URL],
                ['Amazon', AMAZON_AUTHOR_URL],
                ['GitHub', 'https://github.com/pgElephant'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
