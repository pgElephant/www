import { MetadataRoute } from 'next'

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pgelephant.com'
  const currentDate = new Date()
  
  // Define priority levels for different content types
  const priorities = {
    homepage: 1.0,
    mainProducts: 0.9,
    docs: 0.8,
    subPages: 0.7,
    blog: 0.6,
    utility: 0.5
  }

  // Core pages with highest priority
  const corePages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.homepage,
    }
  ]

  // Main product pages
  const productPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/neurondb`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/pgbalancer`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/fauxdb`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/pgraft`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/pgsentinel`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/pg-stat-insights`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    }
  ]

  // Documentation pages
  const docPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.docs,
    },
    // NeurondB documentation
    {
      url: `${baseUrl}/docs/neurondb`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/neurondb/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/features/vector-types`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/ml/embeddings`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/gpu`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/hybrid`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/analytics`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/rag`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/background-workers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/configuration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/neurondb/performance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // pgbalancer documentation
    {
      url: `${baseUrl}/docs/pgbalancer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/pgbalancer/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgbalancer/configuration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgbalancer/metrics`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgbalancer/internals`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // FauxDB documentation
    {
      url: `${baseUrl}/docs/fauxdb`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/fauxdb/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/api`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/docker`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // pgraft documentation
    {
      url: `${baseUrl}/docs/pgraft`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/pgraft/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/configuration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/cluster-management`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/raft-protocol`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/sql-functions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/performance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgraft/troubleshooting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // pgSentinel documentation
    {
      url: `${baseUrl}/docs/pgsentinel`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/pgsentinel/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgsentinel/configuration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgsentinel/api`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgsentinel/troubleshooting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // pg_stat_insights documentation
    {
      url: `${baseUrl}/docs/pg-stat-insights`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/docs/pg-stat-insights/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pg-stat-insights/api`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pg-stat-insights/query-analytics`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pg-stat-insights/best-practices`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    }
  ]

  // Utility and secondary pages
  const utilityPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/download`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.docs,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.blog,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.blog,
    }
  ]

  // Blog category pages
  const blogPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/blog/pgraft`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.blog,
    },
    {
      url: `${baseUrl}/blog/pg-stat-insights`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.blog,
    }
  ]

  // Combine all pages
  return [
    ...corePages,
    ...productPages,
    ...docPages,
    ...utilityPages,
    ...blogPages
  ]
}

