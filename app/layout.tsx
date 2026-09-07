import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonSchema from '@/components/SEO/PersonSchema'
import { baseSEO } from '@/config/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0c0a09',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseSEO.siteUrl),
  title: {
    default: 'Dr. Ibrar Ahmed',
    template: '%s · Dr. Ibrar Ahmed',
  },
  description: baseSEO.defaultDescription,
  applicationName: baseSEO.siteName,
  authors: [{ name: 'Dr. Ibrar Ahmed', url: baseSEO.linkedInUrl }],
  creator: 'Dr. Ibrar Ahmed',
  publisher: baseSEO.siteName,
  keywords: [
    'Dr. Ibrar Ahmed',
    'PostgreSQL Mechanics',
    'AI Mechanics',
    'Cyber Mechanics',
    'PostgreSQL',
    'AI',
    'cyber security',
    'Principal Engineer',
    'pgEdge',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: baseSEO.siteName,
    title: 'Dr. Ibrar Ahmed',
    description: baseSEO.defaultDescription,
    locale: 'en_US',
    images: [
      {
        url: baseSEO.profileImage,
        width: 800,
        height: 800,
        alt: 'Dr. Ibrar Ahmed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Ibrar Ahmed',
    description: baseSEO.defaultDescription,
    creator: baseSEO.twitterHandle,
    site: baseSEO.twitterHandle,
    images: [baseSEO.profileImage],
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
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <PersonSchema />
      </head>
      <body
        className={`${inter.variable} ${sourceSerif.variable} flex min-h-screen flex-col bg-stone-950 font-sans text-stone-200 antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
