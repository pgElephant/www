import React from 'react'
import type { Metadata } from 'next'
import { 
  Inter, 
  Poppins, 
  Space_Grotesk, 
  JetBrains_Mono, 
  Outfit, 
  Orbitron, 
  Exo_2, 
  Playfair_Display 
} from 'next/font/google'
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

// Modern font configurations
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800']
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
})

const exo2 = Exo_2({ 
  subsets: ['latin'],
  variable: '--font-exo-2',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    default: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
    template: '%s | pgElephant'
  },
  description: 'High-performance PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and MongoDB-compatible FauxDB. Production-ready tools for modern applications.',
  icons: {
    icon: '/ico/pgElephant_no_com_HD.ico',
    shortcut: '/ico/pgElephant_no_com_HD.ico',
    apple: '/ico/pgElephant_no_com_HD.ico',
  },
  keywords: [
    'PostgreSQL', 'high availability', 'HA', 'clustering', 'failover', 'database',
    'RAM', 'RALE', 'pgraft', 'FauxDB', 'MongoDB alternative', 'distributed consensus',
    'high-performance database', 'production ready', 'automated failover',
    'PostgreSQL clustering', 'database replication', 'zero downtime',
    'ramd', 'ramctrl', 'raft extension', 'raft consensus', 'MongoDB compatible', 'document database',
    'Rust database', 'PostgreSQL extension', 'consensus algorithm'
  ],
  authors: [{ name: 'pgElephant Team', url: 'https://www.pgelephant.com' }],
  creator: 'pgElephant',
  publisher: 'pgElephant',
  metadataBase: new URL('https://www.pgelephant.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pgelephant.com',
    siteName: 'pgElephant',
    title: 'pgElephant - PostgreSQL High Availability & MongoDB Alternative',
    description: 'High-performance PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and MongoDB-compatible FauxDB.',
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
    description: 'High-performance PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and MongoDB-compatible FauxDB.',
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
    "url": "https://www.pgelephant.com",
    "logo": "https://www.pgelephant.com/logo.png",
    "description": "High-performance PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and MongoDB-compatible FauxDB.",
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
        "name": "RALE",
        "description": "Distributed consensus and key-value store system",
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
        "name": "pgraft",
        "description": "PostgreSQL extension implementing Raft consensus protocol",
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
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} ${orbitron.variable} ${exo2.variable} ${playfairDisplay.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
} 