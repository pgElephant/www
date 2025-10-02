import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  Inter, 
  Poppins, 
  Space_Grotesk, 
  JetBrains_Mono, 
  Outfit
} from 'next/font/google'
import dynamic from 'next/dynamic'
import ClientOnlyComponents from '@/components/ClientOnlyComponents'
import './globals.css'

// Lazy load components for better performance
const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white border-b border-cool-200" />
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true
})

const OrganizationSchema = dynamic(() => import('@/components/SEO/OrganizationSchema'), {
  ssr: true
})

// Optimized font configurations - reduced to essential fonts only
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#4f46e5' }
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pgelephant.com'),
  title: {
    default: 'pgElephant - Enterprise PostgreSQL Platform | High Availability & MongoDB Alternative',
    template: '%s | pgElephant - Enterprise PostgreSQL Solutions'
  },
  description: 'pgElephant delivers enterprise-grade PostgreSQL solutions: RAM clustering with automatic failover, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database. Production-ready, open-source tools for modern applications.',
  applicationName: 'pgElephant',
  authors: [
    { name: 'pgElephant Team', url: 'https://www.pgelephant.com' },
    { name: 'pgElephant', url: 'https://github.com/pgElephant' }
  ],
  generator: 'Next.js',
  keywords: [
    // Core keywords
    'PostgreSQL', 'high availability', 'database clustering', 'failover', 'enterprise database',
    // Product specific
    'RAM PostgreSQL', 'RALE consensus', 'pgraft extension', 'FauxDB MongoDB',
    // Technical terms
    'distributed consensus', 'Raft algorithm', 'leader election', 'database replication',
    'MongoDB alternative', 'document database', 'PostgreSQL extension', 'Rust database',
    // Use cases
    'production database', 'zero downtime', 'automated failover', 'high-performance database',
    'database management', 'PostgreSQL solutions', 'open source database', 'cloud database',
    // Industry terms
    'DevOps', 'database administration', 'system reliability', 'scalability', 'performance optimization'
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'pgElephant Team',
  publisher: 'pgElephant',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'pgElephant Blog RSS Feed' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'pgElephant',
    title: 'pgElephant - Enterprise PostgreSQL Platform | High Availability & MongoDB Alternative',
    description: 'Enterprise-grade PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'pgElephant - Enterprise PostgreSQL Platform',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'pgElephant Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgElephant',
    creator: '@pgElephant',
    title: 'pgElephant - Enterprise PostgreSQL Platform',
    description: 'Enterprise-grade PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googleb23f567d03136a8b',
    yandex: 'yandex-verification-code',
  },
  category: 'Technology',
  classification: 'Database Software, High Availability Solutions, PostgreSQL Tools, MongoDB Alternatives',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://twitter.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/ico/pgElephant_no_com_HD.ico" />
        <link rel="apple-touch-icon" href="/ico/pgElephant_no_com_HD.ico" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <OrganizationSchema />
        <Header />
        <main role="main">
          {children}
        </main>
        <Footer />
        <ClientOnlyComponents />
      </body>
    </html>
  )
} 