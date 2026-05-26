import React from 'react'

export const metadata = {
  title: 'pgElephant | Under Construction',
  description: 'The pgElephant website is currently under construction. Please check back soon for updates.',
  keywords: [
    'pgElephant',
    'PostgreSQL high availability',
    'under construction',
    'database reliability',
  ].join(', '),
  openGraph: {
    title: 'pgElephant | Under Construction',
    description: 'The pgElephant website is currently under construction. Please check back soon for updates.',
    images: [
      {
        url: '/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'pgElephant PostgreSQL Extensions',
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgElephant | Under Construction',
    description: 'The pgElephant website is currently under construction. Please check back soon for updates.',
    images: ['/og-image.jpg?v=2'],
    creator: '@pgElephant',
    site: '@pgElephant',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-6 py-24 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-8 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 backdrop-blur">
          Under Construction
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          pgElephant is getting a fresh new home.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
          We are rebuilding the main site and will be back soon with product updates,
          documentation, and PostgreSQL reliability resources.
        </p>

        <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
          {['New product pages', 'Better docs', 'Launch updates'].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-medium text-slate-200 shadow-2xl shadow-slate-950/20 backdrop-blur"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-400">
          Need to reach us? Contact the pgElephant team while we finish construction.
        </p>
      </div>
    </section>
  )
}
