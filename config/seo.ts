/**
 * SEO Configuration
 * 
 * Centralized SEO metadata templates and generators.
 * Used for consistent SEO across all pages.
 */

import { Metadata } from 'next'
import { products, generateProductMetadata, generateDocsMetadata, getProduct, type ProductId } from './products'
import type { VideosHubConfig } from './videos'
import { POSTGRESQL_VIDEOS_HUB } from './videos'

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
 * Metadata for a videos hub page
 */
export function generateVideosHubMetadata(
  hub: VideosHubConfig,
  videos: VideoForSeo[]
): Metadata {
  const latestVideo = videos[0]
  const videoCount = videos.length
  const description = `${hub.description} ${videoCount} videos available on pgElephant.`
  const ogImage = latestVideo?.thumbnailUrl || baseSEO.defaultImage
  const pageUrl = `${baseSEO.siteUrl}${hub.path}`

  return {
    title: hub.metaTitle,
    description,
    keywords: hub.keywords.join(', '),
    authors: [{ name: 'Dr. Ibrar Ahmed', url: hub.channel.url }],
    creator: 'Dr. Ibrar Ahmed',
    publisher: baseSEO.siteName,
    category: hub.category,
    openGraph: {
      title: `${hub.title} | ${baseSEO.siteName}`,
      description,
      type: 'website',
      url: pageUrl,
      siteName: baseSEO.siteName,
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: latestVideo?.title || hub.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${hub.title} | ${baseSEO.siteName}`,
      description,
      images: [ogImage],
      creator: baseSEO.twitterHandle,
      site: baseSEO.twitterHandle,
    },
    alternates: {
      canonical: pageUrl,
      types: {
        'application/rss+xml': [
          {
            url: `https://www.youtube.com/feeds/videos.xml?channel_id=${hub.channel.id}`,
            title: `${hub.channel.name} RSS`,
          },
        ],
      },
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
    other: {
      'video:channel': hub.channel.url,
      'video:count': String(videoCount),
    },
  }
}

function buildVideoObjectSchema(hub: VideosHubConfig, video: VideoForSeo) {
  const pageUrl = `${baseSEO.siteUrl}${hub.path}`

  return {
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video-${video.id}`,
    name: video.title,
    description: truncateText(
      video.description || `${hub.genre} tutorial: ${video.title}`,
      500
    ),
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.publishedAt,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: video.url,
    url: video.url,
    inLanguage: 'en-US',
    genre: hub.genre,
    isFamilyFriendly: true,
    author: {
      '@type': 'Person',
      name: 'Dr. Ibrar Ahmed',
      url: hub.channel.url,
    },
    publisher: {
      '@type': 'Organization',
      name: hub.channel.name,
      url: hub.channel.url,
    },
    potentialAction: {
      '@type': 'WatchAction',
      target: video.url,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#webpage`,
      name: hub.title,
      url: pageUrl,
    },
  }
}

export function generateVideoObjectStructuredData(
  hub: VideosHubConfig,
  video: VideoForSeo
) {
  return {
    '@context': 'https://schema.org',
    ...buildVideoObjectSchema(hub, video),
  }
}

export function isValidVideoForSchema(video: VideoForSeo): boolean {
  return Boolean(video.publishedAt && video.title && video.thumbnailUrl)
}

/**
 * Page-level JSON-LD graph for a videos hub (CollectionPage, ItemList, FAQ, breadcrumbs).
 * Per-video VideoObject markup is emitted alongside each embedded player.
 */
export function generateVideosHubStructuredData(
  hub: VideosHubConfig,
  videos: VideoForSeo[]
) {
  const validVideos = videos.filter(
    (video) => video.publishedAt && video.title && video.thumbnailUrl
  )
  const pageUrl = `${baseSEO.siteUrl}${hub.path}`
  const latestVideo = validVideos[0]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        name: hub.title,
        description: hub.description,
        url: pageUrl,
        inLanguage: 'en-US',
        ...(latestVideo
          ? {
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: latestVideo.thumbnailUrl,
              },
            }
          : {}),
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseSEO.siteUrl}/#website`,
          name: baseSEO.siteName,
          url: baseSEO.siteUrl,
        },
        ...(hub.about
          ? {
              about: {
                '@type': 'Thing',
                name: hub.about.name,
                ...(hub.about.sameAs ? { sameAs: hub.about.sameAs } : {}),
              },
            }
          : {}),
        author: {
          '@type': 'Person',
          name: 'Dr. Ibrar Ahmed',
          url: hub.channel.url,
          sameAs: [hub.channel.url],
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
        sameAs: [hub.channel.url],
        ...(hub.siblingHub
          ? {
              relatedLink: `${baseSEO.siteUrl}${hub.siblingHub.href}`,
            }
          : {}),
        mainEntity: {
          '@type': 'ItemList',
          name: `${hub.channel.name} Videos`,
          numberOfItems: validVideos.length,
          itemListElement: validVideos.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: video.title,
            item: `${pageUrl}#video-${video.id}`,
          })),
        },
      },
      {
        ...generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: hub.breadcrumbLabel, url: hub.path },
        ]),
        '@context': undefined,
      },
      {
        ...generateVideosHubFaqSchema(hub),
        '@context': undefined,
      },
    ],
  }
}

export function generateVideosHubFaqSchema(hub: VideosHubConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/** @deprecated Use generateVideosHubMetadata with POSTGRESQL_VIDEOS_HUB */
export function generateVideosMetadata(videos: VideoForSeo[], _channelName: string): Metadata {
  return generateVideosHubMetadata(POSTGRESQL_VIDEOS_HUB, videos)
}

/** @deprecated Use generateVideosHubStructuredData with POSTGRESQL_VIDEOS_HUB */
export function generateVideosStructuredData(
  videos: VideoForSeo[],
  _channelName: string,
  _channelUrl: string
) {
  return generateVideosHubStructuredData(POSTGRESQL_VIDEOS_HUB, videos)
}

/** @deprecated Use generateVideosHubFaqSchema with POSTGRESQL_VIDEOS_HUB */
export function generateVideosFaqSchema() {
  return generateVideosHubFaqSchema(POSTGRESQL_VIDEOS_HUB)
}

/** @deprecated Use hub breadcrumb via generateVideosHubStructuredData */
export function generateVideosBreadcrumbSchema() {
  return generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'PostgreSQL Videos', url: '/videos' },
  ])
}

/** @deprecated Use POSTGRESQL_VIDEOS_HUB from config/videos */
export function getVideosPageCopy() {
  return {
    title: POSTGRESQL_VIDEOS_HUB.title,
    description: POSTGRESQL_VIDEOS_HUB.description,
    topics: POSTGRESQL_VIDEOS_HUB.topics,
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
  generateVideosHubMetadata,
  generateVideosHubStructuredData,
  generateVideosHubFaqSchema,
  postgresqlVideoKeywords,
  openGraphTemplates,
  twitterCardTemplates,
}

export default seoConfig

