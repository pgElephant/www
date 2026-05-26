import React from 'react'

export const metadata = {
  title: 'pgElephant Community | Under Construction',
  description: 'pgElephant Community site under Construction.',
  keywords: [
    'pgElephant',
    'PostgreSQL high availability',
    'under construction',
    'database reliability',
  ].join(', '),
  openGraph: {
    title: 'pgElephant Community | Under Construction',
    description: 'pgElephant Community site under Construction.',
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
    title: 'pgElephant Community | Under Construction',
    description: 'pgElephant Community site under Construction.',
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
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        pgElephant Community site under Construction
      </h1>
    </section>
  )
}
