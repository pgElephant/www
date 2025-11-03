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
import PerformanceOptimizations from '@/components/PerformanceOptimizations'
import ClientOnlyComponents from '@/components/ClientOnlyComponents'
import './globals.css'

// Lazy load components for better performance
const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-slate-900 border-b border-slate-700" />
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
    default: 'pgElephant - Enterprise PostgreSQL High Availability | MongoDB Alternative | Database Clustering',
    template: '%s | pgElephant - PostgreSQL Enterprise Solutions'
  },
  description: 'pgElephant: Enterprise PostgreSQL high availability platform with automatic failover, MongoDB-compatible document database, and distributed consensus. Production-ready pgbalancer connection pooling, pgraft Raft extension, FauxDB document database, and NeuronDB vector database. Zero-downtime database solutions for modern applications.',
  applicationName: 'pgElephant',
  authors: [
    { name: 'pgElephant Team', url: 'https://www.pgelephant.com' },
    { name: 'pgElephant', url: 'https://github.com/pgElephant' }
  ],
  generator: 'Next.js',
  keywords: [
    // Primary search terms
    'PostgreSQL high availability', 'PostgreSQL clustering', 'PostgreSQL failover', 'PostgreSQL HA',
    'MongoDB alternative', 'MongoDB compatible', 'document database', 'NoSQL database',
    'database clustering', 'database failover', 'automatic failover', 'zero downtime database',
    'PostgreSQL extension', 'PostgreSQL tools', 'PostgreSQL management', 'PostgreSQL solutions',
    // Product-specific terms
    'pgbalancer PostgreSQL', 'pgraft extension', 'FauxDB database', 'NeuronDB vector database',
    'PostgreSQL Raft', 'distributed PostgreSQL', 'PostgreSQL consensus', 'PostgreSQL leader election',
    'PostgreSQL replication', 'PostgreSQL backup', 'PostgreSQL monitoring', 'PostgreSQL performance',
    // Technical keywords
    'Raft algorithm', 'distributed consensus', 'leader election', 'database replication',
    'database clustering software', 'database management system', 'database administration tools',
    'high performance database', 'enterprise database', 'production database', 'cloud database',
    // Industry and use case terms
    'DevOps database', 'database administration', 'system reliability', 'database scalability',
    'database performance optimization', 'open source database', 'free database tools',
    'PostgreSQL production', 'PostgreSQL enterprise', 'PostgreSQL cloud', 'PostgreSQL Docker',
    'PostgreSQL Kubernetes', 'database automation', 'database orchestration', 'database monitoring',
    // Long-tail keywords
    'best PostgreSQL high availability solution', 'PostgreSQL automatic failover tool',
    'MongoDB to PostgreSQL migration', 'PostgreSQL clustering software',
    'enterprise PostgreSQL management', 'PostgreSQL distributed systems',
    'PostgreSQL consensus protocol', 'PostgreSQL raft implementation'
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
    description: 'Enterprise-grade PostgreSQL solutions: pgbalancer connection pooling, pgraft Raft extension, FauxDB MongoDB-compatible document database, and NeuronDB AI vector database.',
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
    description: 'Enterprise-grade PostgreSQL solutions: pgbalancer connection pooling, pgraft Raft extension, FauxDB MongoDB-compatible document database, and NeuronDB AI vector database.',
    images: ['/og-image.jpg'],
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
        
  {/* Primary favicon */}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/x-icon" href="/ico/pgElephant_HD.ico" />

  {/* Apple Touch Icon - use existing square OG image */}
  <link rel="apple-touch-icon" href="/og-image-square.jpg" />
        
        {/* Windows/Microsoft icons */}
        <meta name="msapplication-TileColor" content="#070d1a" />
        <meta name="msapplication-TileImage" content="/ico/pgElephant_HD.ico" />
        <meta name="msapplication-square70x70logo" content="/ico/pgElephant_HD.ico" />
        <meta name="msapplication-square150x150logo" content="/ico/pgElephant_HD.ico" />
        <meta name="msapplication-square310x310logo" content="/ico/pgElephant_HD.ico" />
        <meta name="msapplication-wide310x150logo" content="/ico/pgElephant_HD.ico" />
        
        {/* Theme colors for better visibility */}
        <meta name="theme-color" content="#070d1a" />
        <meta name="msapplication-navbutton-color" content="#070d1a" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Additional favicon meta tags for maximum visibility */}
        <meta name="application-name" content="pgElephant" />
        <meta name="apple-mobile-web-app-title" content="pgElephant" />
        <meta name="msapplication-tooltip" content="pgElephant - Enterprise PostgreSQL Platform" />
        <meta name="msapplication-starturl" content="/" />
        
  {/* Safari pinned tab icon - use an SVG */}
  <link rel="mask-icon" href="/hero-bg.svg" color="#070d1a" />
        
        {/* Additional browser-specific favicons */}
        <link rel="fluid-icon" href="/ico/pgElephant_HD.ico" title="pgElephant" />
        
        {/* Organization Schema for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "pgElephant",
              "alternateName": "PostgreSQL Elephant",
              "url": "https://www.pgelephant.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.pgelephant.com/ico/pgElephant_HD.ico",
                "width": 512,
                "height": 512
              },
              "description": "Enterprise PostgreSQL high availability platform with automatic failover, MongoDB-compatible document database, and distributed consensus",
              "foundingDate": "2024",
              "sameAs": [
                "https://github.com/pgElephant"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Technical Support",
                "url": "https://www.pgelephant.com/contact"
              }
            })
          }}
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "pgElephant",
              "alternateName": ["pgElephant Platform", "PostgreSQL Elephant"],
              "description": "Enterprise PostgreSQL high availability platform with automatic failover, MongoDB-compatible document database, and distributed consensus",
              "url": "https://www.pgelephant.com",
              "applicationCategory": "DatabaseApplication",
              "operatingSystem": ["Linux", "macOS", "Windows", "Docker", "Kubernetes"],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://www.pgelephant.com/download"
              },
              "creator": {
                "@type": "Organization",
                "name": "pgElephant Team",
                "url": "https://www.pgelephant.com",
                "logo": "https://www.pgelephant.com/ico/pgElephant_HD.ico"
              },
              "image": "https://www.pgelephant.com/ico/pgElephant_HD.ico",
              "logo": "https://www.pgelephant.com/ico/pgElephant_HD.ico",
              "featureList": [
                "PostgreSQL High Availability",
                "Automatic Failover",
                "MongoDB Compatibility",
                "Distributed Consensus",
                "Zero Downtime Operations",
                "Database Clustering",
                "Raft Algorithm Implementation",
                "Leader Election",
                "Real-time Monitoring",
                "Enterprise Security"
              ],
              "softwareVersion": "1.0.0",
              "datePublished": "2024-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "downloadUrl": "https://www.pgelephant.com/download",
              "screenshot": "https://www.pgelephant.com/og-image.jpg",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "ratingCount": "1",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "pgElephant",
              "url": "https://www.pgelephant.com",
              "logo": "https://www.pgelephant.com/ico/pgElephant_HD.ico",
              "description": "Enterprise PostgreSQL solutions provider specializing in high availability, clustering, and MongoDB-compatible databases",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://www.pgelephant.com/contact"
              },
              "sameAs": [
                "https://github.com/pgElephant"
              ],
              "knowsAbout": [
                "PostgreSQL",
                "Database High Availability",
                "Distributed Systems",
                "MongoDB",
                "Database Clustering",
                "Raft Consensus",
                "Database Management"
              ]
            })
          }}
        />
        

        {/* WebSite SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.pgelephant.com",
              "name": "pgElephant",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.google.com/search?q=site%3Apgelephant.com+{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <PerformanceOptimizations />
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