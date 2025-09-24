import React from 'react'
import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  structuredData?: any
  noindex?: boolean
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData,
  noindex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('pgElephant') ? title : `${title} | pgElephant`
  const fullDescription = description
  const fullKeywords = [
    'PostgreSQL', 'high availability', 'HA', 'clustering', 'failover', 'database',
    'RAM', 'RALE', 'FauxDB', 'MongoDB alternative', 'distributed consensus',
    'enterprise database', 'production ready', 'automated failover',
    'pgraft', 'ramd', 'ramctrl', 'MongoDB compatible', 'document database',
    'Rust database', 'PostgreSQL extension', 'consensus algorithm',
    ...keywords
  ].join(', ')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="pgElephant Team" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || 'https://pgelephant.com'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="pgElephant" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pgElephant" />
      <meta name="twitter:creator" content="@pgElephant" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="pgElephant" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://twitter.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://twitter.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Head>
  )
}
