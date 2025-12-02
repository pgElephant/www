'use client'

import React from 'react'
import Script from 'next/script'

interface EnhancedSEOProps {
  title: string
  description: string
  canonicalUrl: string
  ogImage?: string
  structuredData?: object
  breadcrumbs?: Array<{ name: string; url: string }>
}

/**
 * Enhanced SEO component with comprehensive optimizations
 * - Structured data (JSON-LD)
 * - Breadcrumbs
 * - Enhanced meta tags
 * - Performance optimizations
 */
const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-image.jpg?v=2',
  structuredData,
  breadcrumbs,
}) => {
  const baseUrl = 'https://www.pgelephant.com'
  const fullCanonicalUrl = `${baseUrl}${canonicalUrl}`
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  // Breadcrumb structured data
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  } : null

  // FAQ Schema (if applicable)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is pgElephant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'pgElephant is an enterprise PostgreSQL platform providing high availability, AI database capabilities, vector search, and MongoDB-compatible document database solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is pgElephant free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, pgElephant is open source and free to use. All products including pgbalancer, pgraft, FauxDB, pgSentinel, and pg_stat_insights are available under open source licenses.',
        },
      },
    ],
  }

  return (
    <>
      {/* Enhanced Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content="PostgreSQL, high availability, AI database, vector search, RAG, MongoDB alternative, database clustering" />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph Enhanced */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="pgElephant" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@pgElephant" />
      <meta name="twitter:creator" content="@pgElephant" />

      {/* Structured Data - Main Content */}
      {structuredData && (
        <Script
          id="structured-data-main"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbSchema && (
        <Script
          id="structured-data-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}

      {/* FAQ Structured Data for homepage */}
      {canonicalUrl === '/' && (
        <Script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  )
}

export default EnhancedSEO

