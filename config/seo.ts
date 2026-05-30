/**
 * SEO Configuration
 * 
 * Centralized SEO metadata templates and generators.
 * Used for consistent SEO across all pages.
 */

import { Metadata } from 'next'
import { products, generateProductMetadata, generateDocsMetadata, getProduct, type ProductId } from './products'

// ============================================================================
// BASE SEO CONFIGURATION
// ============================================================================

export const baseSEO = {
  siteName: 'pgElephant',
  siteUrl: 'https://www.pgelephant.com',
  twitterHandle: '@pgElephant',
  defaultImage: '/og-image.jpg?v=2',
  defaultDescription: 'PostgreSQL High Availability Solution with automatic failover, zero-downtime clustering, distributed consensus, and production-ready extensions for enterprise database infrastructure.',
}

// ============================================================================
// SEO TEMPLATE GENERATORS
// ============================================================================

/**
 * Generate basic metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path,
  image,
  noindex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  path: string
  image?: string
  noindex?: boolean
}): Metadata {
  const url = `${baseSEO.siteUrl}${path}`
  const ogImage = image || baseSEO.defaultImage

  return {
    title: `${title} | ${baseSEO.siteName}`,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: baseSEO.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: baseSEO.twitterHandle,
      site: baseSEO.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generate metadata for a product page
 */
export function generateProductPageMetadata(productId: ProductId): Metadata {
  return generateProductMetadata(productId)
}

/**
 * Generate metadata for a docs page
 */
export function generateDocsPageMetadata(
  productId: ProductId,
  pageTitle?: string
): Metadata {
  return generateDocsMetadata(productId, pageTitle)
}

/**
 * Generate metadata for a blog post
 */
export function generateBlogMetadata({
  title,
  description,
  slug,
  publishedAt,
  image,
  author = 'pgElephant Team',
}: {
  title: string
  description: string
  slug: string
  publishedAt: string
  image?: string
  author?: string
}): Metadata {
  const url = `${baseSEO.siteUrl}/blog/${slug}`
  const ogImage = image || baseSEO.defaultImage

  return {
    title: `${title} | ${baseSEO.siteName} Blog`,
    description,
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: baseSEO.siteName,
      publishedTime: publishedAt,
      authors: [author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: baseSEO.twitterHandle,
      site: baseSEO.twitterHandle,
    },
    alternates: {
      canonical: url,
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
}

// ============================================================================
// STRUCTURED DATA SCHEMAS
// ============================================================================

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: baseSEO.siteName,
    url: baseSEO.siteUrl,
    logo: `${baseSEO.siteUrl}/logo.png`,
    sameAs: [
      'https://github.com/pgElephant',
      'https://twitter.com/pgElephant',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${baseSEO.siteUrl}/contact`,
    },
  }
}

/**
 * Generate SoftwareApplication structured data for a product
 */
export function generateProductSchema(productId: ProductId) {
  const product = getProduct(productId)
  if (!product) {
    throw new Error(`Product ${productId} not found`)
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.displayName,
    applicationCategory: 'DatabaseApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: product.description,
    url: `${baseSEO.siteUrl}${product.productUrl}`,
    downloadUrl: product.githubUrl,
    softwareVersion: product.version || 'latest',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

/**
 * Generate Article structured data for a blog post
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  image,
  author = 'pgElephant Team',
}: {
  title: string
  description: string
  slug: string
  publishedAt: string
  modifiedAt?: string
  image?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${baseSEO.siteUrl}${baseSEO.defaultImage}`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: baseSEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseSEO.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseSEO.siteUrl}/blog/${slug}`,
    },
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseSEO.siteUrl}${item.url}`,
    })),
  }
}

export const postgresqlVideoKeywords = [
  'PostgreSQL videos',
  'PostgreSQL tutorials',
  'PostgreSQL DBA',
  'PostgreSQL training',
  'PostgreSQL performance tuning',
  'PostgreSQL high availability',
  'PostgreSQL replication',
  'PostgreSQL logical replication',
  'PostgreSQL backup',
  'PostgreSQL PITR',
  'PostgreSQL VACUUM',
  'PostgreSQL indexing',
  'PostgreSQL EXPLAIN ANALYZE',
  'PostgreSQL migration',
  'PostgreSQL security',
  'PostgreSQL disaster recovery',
  'PostgreSQL bloat',
  'PostgreSQL checkpoint',
  'PostgreSQL slow queries',
  'PostgreSQL multi-master',
  'learn PostgreSQL',
  'PostgreSQL course',
  'PostgreSQL webinar',
  'Dr Ibrar Ahmed PostgreSQL',
  'pgElephant videos',
]

const videosPageTitle = 'PostgreSQL Videos, Tutorials & DBA Guides'
const videosPageDescription =
  'Free PostgreSQL video tutorials on replication, high availability, performance tuning, VACUUM, indexing, backups, PITR, migrations, and production DBA skills. Watch embedded lessons from Dr. Ibrar Ahmed on pgElephant.'

interface VideoForSeo {
  id: string
  title: string
  description?: string
  publishedAt: string
  thumbnailUrl: string
  url: string
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength - 3).trim()}...`
}

/**
 * Metadata for the PostgreSQL videos hub page
 */
export function generateVideosMetadata(
  videos: VideoForSeo[],
  channelName: string
): Metadata {
  const latestVideo = videos[0]
  const videoCount = videos.length
  const description = `${videosPageDescription} ${videoCount} videos available.`
  const ogImage = latestVideo?.thumbnailUrl || baseSEO.defaultImage

  return {
    title: videosPageTitle,
    description,
    keywords: postgresqlVideoKeywords.join(', '),
    authors: [{ name: channelName, url: 'https://www.youtube.com/@DrIbrarAhmed' }],
    category: 'PostgreSQL',
    openGraph: {
      title: `${videosPageTitle} | ${baseSEO.siteName}`,
      description,
      type: 'website',
      url: `${baseSEO.siteUrl}/videos`,
      siteName: baseSEO.siteName,
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: latestVideo?.title || videosPageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${videosPageTitle} | ${baseSEO.siteName}`,
      description,
      images: [ogImage],
      creator: baseSEO.twitterHandle,
      site: baseSEO.twitterHandle,
    },
    alternates: {
      canonical: `${baseSEO.siteUrl}/videos`,
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
}

function buildVideoObjectSchema(
  video: VideoForSeo,
  channelName: string,
  channelUrl: string
) {
  return {
    '@type': 'VideoObject',
    '@id': `${baseSEO.siteUrl}/videos#video-${video.id}`,
    name: video.title,
    description: truncateText(
      video.description || `PostgreSQL tutorial: ${video.title}`,
      500
    ),
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.publishedAt,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: video.url,
    url: video.url,
    inLanguage: 'en-US',
    genre: 'PostgreSQL',
    isFamilyFriendly: true,
    publisher: {
      '@type': 'Organization',
      name: channelName,
      url: channelUrl,
    },
  }
}

/**
 * Single JSON-LD graph for the videos hub (avoids duplicate VideoObject markup).
 */
export function generateVideosStructuredData(
  videos: VideoForSeo[],
  channelName: string,
  channelUrl: string
) {
  const validVideos = videos.filter(
    (video) => video.publishedAt && video.title && video.thumbnailUrl
  )

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${baseSEO.siteUrl}/videos#webpage`,
        name: videosPageTitle,
        description: videosPageDescription,
        url: `${baseSEO.siteUrl}/videos`,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: baseSEO.siteName,
          url: baseSEO.siteUrl,
        },
        about: {
          '@type': 'Thing',
          name: 'PostgreSQL',
          sameAs: 'https://en.wikipedia.org/wiki/PostgreSQL',
        },
        author: {
          '@type': 'Person',
          name: 'Dr. Ibrar Ahmed',
          url: channelUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: baseSEO.siteName,
          url: baseSEO.siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseSEO.siteUrl}/favicon-512.png`,
          },
        },
        mainEntity: {
          '@type': 'ItemList',
          name: `${channelName} PostgreSQL Videos`,
          numberOfItems: validVideos.length,
          itemListElement: validVideos.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseSEO.siteUrl}/videos#video-${video.id}`,
          })),
        },
      },
      ...validVideos.map((video) => buildVideoObjectSchema(video, channelName, channelUrl)),
      {
        ...generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'PostgreSQL Videos', url: '/videos' },
        ]),
        '@context': undefined,
      },
      {
        ...generateVideosFaqSchema(),
        '@context': undefined,
      },
    ],
  }
}

export function generateVideosFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I watch free PostgreSQL video tutorials?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'pgElephant hosts free PostgreSQL video tutorials at https://www.pgelephant.com/videos, including replication, high availability, performance tuning, backups, indexing, and DBA production guides from Dr. Ibrar Ahmed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What PostgreSQL topics are covered in these videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Topics include PostgreSQL logical replication, high availability, VACUUM and bloat, slow query tuning, EXPLAIN ANALYZE, indexing, backups, point-in-time recovery (PITR), Oracle and MySQL migration, security hardening, disaster recovery, checkpoints, and major version upgrades.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these PostgreSQL tutorials for beginners or DBAs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The library includes PostgreSQL content for developers and production DBAs, from foundational DBA cheat sheets to advanced replication, failover, and performance troubleshooting walkthroughs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who teaches the PostgreSQL videos on pgElephant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The videos are from Dr. Ibrar Ahmed on the YouTube channel PostgreSQL with Dr. Ibrar Ahmed, embedded and curated on pgElephant for PostgreSQL engineers and teams.',
        },
      },
    ],
  }
}

export function generateVideosBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'PostgreSQL Videos', url: '/videos' },
  ])
}

export function getVideosPageCopy() {
  return {
    title: videosPageTitle,
    description: videosPageDescription,
    topics: [
      'PostgreSQL replication & logical replication',
      'High availability & disaster recovery',
      'Performance tuning & slow queries',
      'VACUUM, bloat & autovacuum',
      'Indexing & EXPLAIN ANALYZE',
      'Backups, PITR & checkpoints',
      'Oracle & MySQL to PostgreSQL migration',
      'Security hardening & production runbooks',
    ],
  }
}

// ============================================================================
// OPENGRAPH TEMPLATES
// ============================================================================

export const openGraphTemplates = {
  /**
   * Generate OpenGraph image URL
   */
  imageUrl: (path: string) => `${baseSEO.siteUrl}${path}`,

  /**
   * Generate OpenGraph metadata
   */
  metadata: ({
    title,
    description,
    url,
    image,
    type = 'website',
  }: {
    title: string
    description: string
    url: string
    image?: string
    type?: 'website' | 'article'
  }) => ({
    title,
    description,
    type,
    url,
    siteName: baseSEO.siteName,
    images: [
      {
        url: image || baseSEO.defaultImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  }),
}

// ============================================================================
// TWITTER CARD TEMPLATES
// ============================================================================

export const twitterCardTemplates = {
  /**
   * Generate Twitter card metadata
   */
  metadata: ({
    title,
    description,
    image,
  }: {
    title: string
    description: string
    image?: string
  }) => ({
    card: 'summary_large_image' as const,
    title,
    description,
    images: [image || baseSEO.defaultImage],
    creator: baseSEO.twitterHandle,
    site: baseSEO.twitterHandle,
  }),
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

const seoConfig = {
  baseSEO,
  generatePageMetadata,
  generateProductPageMetadata,
  generateDocsPageMetadata,
  generateBlogMetadata,
  generateOrganizationSchema,
  generateProductSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateVideosMetadata,
  generateVideosStructuredData,
  generateVideosFaqSchema,
  generateVideosBreadcrumbSchema,
  getVideosPageCopy,
  postgresqlVideoKeywords,
  openGraphTemplates,
  twitterCardTemplates,
}

export default seoConfig

