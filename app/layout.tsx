import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

// Lazy load components for better performance
const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white border-b border-cool-200" />
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
    template: '%s | pgElephant'
  },
  description: 'Enterprise-grade PostgreSQL high availability with RAM clustering, MongoDB-compatible FauxDB, and distributed consensus with RALE. Production-ready solutions for modern applications.',
  keywords: [
    'PostgreSQL', 'high availability', 'HA', 'clustering', 'failover', 'database',
    'RAM', 'RALE', 'FauxDB', 'MongoDB alternative', 'distributed consensus',
    'enterprise database', 'production ready', 'automated failover',
    'PostgreSQL clustering', 'database replication', 'zero downtime',
    'pgraft', 'ramd', 'ramctrl', 'MongoDB compatible', 'document database',
    'Rust database', 'PostgreSQL extension', 'consensus algorithm'
  ],
  authors: [{ name: 'pgElephant Team', url: 'https://pgelephant.com' }],
  creator: 'pgElephant',
  publisher: 'pgElephant',
  metadataBase: new URL('https://pgelephant.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pgelephant.com',
    siteName: 'pgElephant',
    title: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
    description: 'Enterprise-grade PostgreSQL high availability with RAM clustering, MongoDB-compatible FauxDB, and distributed consensus with RALE.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgElephant',
    creator: '@pgElephant',
    title: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
    description: 'Enterprise-grade PostgreSQL high availability with RAM clustering, MongoDB-compatible FauxDB, and distributed consensus with RALE.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'googleb23f567d03136a8b',
  },
  category: 'technology',
  classification: 'Database, High Availability, PostgreSQL, MongoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "pgElephant",
    "url": "https://pgelephant.com",
    "logo": "https://pgelephant.com/logo.png",
    "description": "Enterprise-grade PostgreSQL high availability with RAM clustering, MongoDB-compatible FauxDB, and distributed consensus with RALE.",
    "foundingDate": "2024",
    "sameAs": [
      "https://github.com/pgElephant",
      "https://twitter.com/pgElephant"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://pgelephant.com/contact"
    },
    "offers": [
      {
        "@type": "SoftwareApplication",
        "name": "RAM",
        "description": "PostgreSQL clustering solution with automatic failover and Raft consensus",
        "applicationCategory": "DatabaseApplication",
        "operatingSystem": "Linux, macOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "FauxDB",
        "description": "MongoDB-compatible document database built in Rust with PostgreSQL backend",
        "applicationCategory": "DatabaseApplication",
        "operatingSystem": "Linux, macOS, Windows",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "RALE",
        "description": "Distributed consensus and key-value store system",
        "applicationCategory": "DatabaseApplication",
        "operatingSystem": "Linux, macOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://twitter.com" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
} 