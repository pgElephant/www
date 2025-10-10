/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pgelephant.com',
  generateRobotsTxt: false, // We have a custom robots.ts file
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '*.json',
    '/server-sitemap.xml',
    '/search*',
    '/*?utm_*',
    '/*?ref=*',
    '/*?source=*'
  ],
  additionalPaths: async (config) => {
    const result = []
    
    // Add dynamic blog posts and documentation pages
    const blogCategories = ['ram', 'pgbalancer', 'fauxdb', 'rale', 'pgraft', 'postgresql', 'high-availability', 'tutorials']
    const docSections = [
      'ram/getting-started',
      'ram/installation', 
      'ram/configuration',
      'ram/docker',
      'ram/kubernetes',
      'pgbalancer/getting-started',
      'pgbalancer/installation',
      'pgbalancer/configuration',
      'pgbalancer/ai-configuration',
      'pgbalancer/metrics',
      'pgbalancer/performance-tuning',
      'fauxdb/getting-started',
      'fauxdb/installation',
      'fauxdb/api-reference',
      'rale/getting-started',
      'rale/installation',
      'rale/consensus-algorithm',
      'pgraft/getting-started',
      'pgraft/installation',
      'pgraft/raft-protocol'
    ]
    
    // Add blog category pages
    blogCategories.forEach(category => {
      result.push({
        loc: `/blog/${category}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString()
      })
    })
    
    // Add documentation pages
    docSections.forEach(section => {
      result.push({
        loc: `/docs/${section}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      })
    })
    
    return result
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.5
    let changefreq = 'weekly'

    // Homepage - highest priority
    if (path === '/') {
      priority = 1.0
      changefreq = 'weekly'
    } 
    // Main product pages - very high priority
    else if (path.match(/^\/(ram|pgbalancer|fauxdb|rale|pgraft)$/)) {
      priority = 0.9
      changefreq = 'weekly'
    } 
    // Documentation - high priority for SEO
    else if (path.match(/^\/docs/)) {
      priority = 0.8
      changefreq = 'monthly'
      
      // Getting started pages are more important
      if (path.includes('getting-started') || path.includes('installation')) {
        priority = 0.85
      }
    } 
    // Download and community pages
    else if (path.match(/^\/(download|community)/)) {
      priority = 0.75
      changefreq = 'weekly'
    }
    // Blog content
    else if (path.match(/^\/blog/)) {
      priority = 0.6
      changefreq = 'weekly'
      
      // Main blog page higher priority
      if (path === '/blog') {
        priority = 0.7
      }
    }
    // Contact and utility pages
    else if (path.match(/^\/(contact|privacy|terms)/)) {
      priority = 0.4
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      // Add images for better SEO
      images: getImagesForPath(path),
      // Add news metadata for blog posts
      ...(path.startsWith('/blog/') && path !== '/blog' ? {
        news: {
          publication: {
            name: 'pgElephant Blog',
            language: 'en'
          },
          publication_date: new Date().toISOString(),
          title: getPageTitle(path)
        }
      } : {})
    }
  }
}

// Helper function to get images for specific paths
function getImagesForPath(path) {
  const baseUrl = 'https://www.pgelephant.com'
  const images = []
  
  if (path === '/') {
    images.push({
      loc: `${baseUrl}/og-image.jpg`,
      title: 'pgElephant - Enterprise PostgreSQL Platform',
      caption: 'High availability PostgreSQL solutions'
    })
  } else if (path === '/pgbalancer') {
    images.push({
      loc: `${baseUrl}/screenshots/pgbalancer-dashboard.jpg`,
      title: 'pgbalancer AI Dashboard',
      caption: 'AI-powered PostgreSQL connection pooling interface'
    })
  } else if (path === '/ram') {
    images.push({
      loc: `${baseUrl}/screenshots/ram-cluster.jpg`,
      title: 'RAM Cluster Management',
      caption: 'PostgreSQL cluster management with automatic failover'
    })
  }
  
  return images
}

// Helper function to generate titles for news metadata
function getPageTitle(path) {
  const pathSegments = path.split('/').filter(Boolean)
  if (pathSegments.length >= 2) {
    const category = pathSegments[1]
    return `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} Updates - pgElephant Blog`
  }
  return 'pgElephant Blog - PostgreSQL Enterprise Solutions'
}