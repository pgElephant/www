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
      url: `${baseUrl}/ram`,
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
      url: `${baseUrl}/rale`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: priorities.mainProducts,
    },
    {
      url: `${baseUrl}/pgraft`,
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
    // pgbalancer documentation
    {
      url: `${baseUrl}/docs/pgbalancer/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/pgbalancer/installation`,
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
      url: `${baseUrl}/docs/pgbalancer/ai-configuration`,
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
      url: `${baseUrl}/docs/pgbalancer/performance-tuning`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // RAM documentation
    {
      url: `${baseUrl}/docs/ram/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/configuration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/docker`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/kubernetes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/cluster-setup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/ram/troubleshooting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // FauxDB documentation
    {
      url: `${baseUrl}/docs/fauxdb/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/configuration`,
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
    {
      url: `${baseUrl}/docs/fauxdb/kubernetes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/api-reference`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/fauxdb/migration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // RALE documentation
    {
      url: `${baseUrl}/docs/rale/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/rale/installation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/rale/docker`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/rale/cluster-setup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    {
      url: `${baseUrl}/docs/rale/consensus-algorithm`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.subPages,
    },
    // pgraft documentation
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
      url: `${baseUrl}/docs/pgraft/raft-protocol`,
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
      url: `${baseUrl}/blog/ram`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/fauxdb`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/rale`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/pgraft`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/postgresql`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/high-availability`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
    },
    {
      url: `${baseUrl}/blog/tutorials`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priorities.utility,
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
