import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#020617',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pgelephant.com'),
  title: {
    default: 'pgElephant Repositories',
    template: '%s | pgElephant',
  },
  description: 'A simple single-page directory for pgElephant GitHub repositories.',
  applicationName: 'pgElephant',
  authors: [{ name: 'pgElephant', url: 'https://github.com/pgElephant' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'pgElephant',
    title: 'pgElephant Repositories',
    description: 'Repository information and GitHub links for pgElephant projects.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
