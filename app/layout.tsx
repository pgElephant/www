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
  title: 'pgelephant - PostgreSQL High Availability Made Easy',
  description: 'Zero-downtime. Multi-node. Production-ready PostgreSQL high availability solution with automated failover and intelligent leader election.',
  keywords: 'PostgreSQL, high availability, HA, clustering, failover, database, RALE, Spock',
  authors: [{ name: 'pgelephant team' }],
  metadataBase: new URL('https://pgelephant.com'),
  openGraph: {
    title: 'pgelephant - PostgreSQL High Availability Made Easy',
    description: 'Zero-downtime. Multi-node. Production-ready PostgreSQL high availability solution.',
    url: 'https://pgelephant.com',
    siteName: 'pgelephant',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'pgelephant - PostgreSQL High Availability',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgelephant - PostgreSQL High Availability Made Easy',
    description: 'Zero-downtime. Multi-node. Production-ready PostgreSQL high availability solution.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
} 