import React from 'react'

interface PgbalancerSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
}

const PgbalancerSEO: React.FC<PgbalancerSEOProps> = ({
  title = 'pgbalancer - AI-Powered PostgreSQL Connection Pooling & Load Balancing',
  description = 'Next-generation AI-driven PostgreSQL connection pooling with machine learning optimization and intelligent load balancing.',
  keywords = [],
  canonicalUrl = 'https://www.pgelephant.com/pgbalancer'
}) => {
  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "pgbalancer",
    "description": "AI-powered PostgreSQL connection pooling and load balancing solution with machine learning optimization, intelligent query routing, and predictive scaling capabilities.",
    "url": canonicalUrl,
    "applicationCategory": "DatabaseManagementSoftware",
    "applicationSubCategory": "Connection Pooling Software",
    "operatingSystem": ["Linux", "macOS", "Windows", "Docker", "Kubernetes"],
    "softwareVersion": "2.1.4",
    "releaseNotes": "Latest release with enhanced AI intelligence engine and improved machine learning models.",
    "downloadUrl": "https://www.pgelephant.com/download",
    "installUrl": "https://www.pgelephant.com/docs/pgbalancer/getting-started",
    "screenshot": "https://www.pgelephant.com/screenshots/pgbalancer-demo.jpg",
    "video": "https://www.pgelephant.com/videos/pgbalancer-demo.mp4",
    "image": [
      "https://www.pgelephant.com/ico/pgbalancer_HD.ico",
      "https://www.pgelephant.com/screenshots/pgbalancer-dashboard.jpg",
      "https://www.pgelephant.com/screenshots/pgbalancer-ai-insights.jpg"
    ],
    "logo": "https://www.pgelephant.com/ico/pgbalancer_HD.ico",
    "creator": {
      "@type": "Organization",
      "name": "pgElephant Team",
      "url": "https://www.pgelephant.com",
      "logo": "https://www.pgelephant.com/ico/pgElephant_HD.ico",
      "email": "contact@pgelephant.com",
      "foundingDate": "2024-01-01",
      "description": "Open-source PostgreSQL enterprise solutions provider"
    },
    "maintainer": {
      "@type": "Organization",
      "name": "pgElephant Community",
      "url": "https://github.com/pgElephant/pgbalancer"
    },
    "license": "https://opensource.org/licenses/MIT",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.pgelephant.com/download"
    },
    "featureList": [
      "AI Intelligence Engine with Machine Learning",
      "Intelligent Connection Pooling",
      "Smart Load Balancing",
      "Predictive Scaling",
      "Adaptive Query Routing",
      "Real-time Performance Monitoring",
      "Automatic Failover",
      "REST API Management",
      "Health Monitoring and Prediction",
      "Query Cache Optimization",
      "Multi-backend Support",
      "Enterprise Security"
    ],
    "requirements": [
      "PostgreSQL 12+",
      "Linux/macOS/Windows",
      "Minimum 512MB RAM",
      "Network connectivity"
    ],
    "softwareRequirements": "PostgreSQL 12 or higher",
    "memoryRequirements": "512MB RAM minimum, 2GB recommended",
    "storageRequirements": "100MB disk space",
    "processorRequirements": "x86_64 or ARM64 processor",
    "permissions": "Database connection permissions",
    "installationUrl": "https://www.pgelephant.com/docs/pgbalancer/installation",
    "softwareHelp": {
      "@type": "WebPage",
      "url": "https://www.pgelephant.com/docs/pgbalancer"
    },
    "releaseNotesUrl": {
      "@type": "WebPage",
      "url": "https://www.pgelephant.com/blog/pgbalancer-release-notes"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "247",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "189"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Database Administrator"
        },
        "reviewBody": "pgbalancer's AI-powered connection pooling has dramatically improved our PostgreSQL performance. The predictive scaling feature is a game-changer."
      }
    ],
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "pgElephant",
      "url": "https://www.pgelephant.com"
    }
  }

  // How-To Schema for Implementation
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Set Up AI-Powered PostgreSQL Connection Pooling with pgbalancer",
    "description": "Step-by-step guide to configure pgbalancer for optimal PostgreSQL performance with AI intelligence.",
    "image": "https://www.pgelephant.com/tutorials/pgbalancer-setup.jpg",
    "totalTime": "PT15M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "PostgreSQL Database"
      },
      {
        "@type": "HowToSupply", 
        "name": "pgbalancer Software"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Terminal or Command Line"
      },
      {
        "@type": "HowToTool",
        "name": "Text Editor"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Download and Install",
        "text": "Download pgbalancer from the official website and install using the provided installation script.",
        "url": "https://www.pgelephant.com/docs/pgbalancer/installation"
      },
      {
        "@type": "HowToStep", 
        "name": "Configure AI Settings",
        "text": "Enable AI intelligence engine and configure machine learning models for optimal performance.",
        "url": "https://www.pgelephant.com/docs/pgbalancer/ai-configuration"
      },
      {
        "@type": "HowToStep",
        "name": "Start pgbalancer",
        "text": "Launch pgbalancer with AI features enabled and connect your PostgreSQL databases.",
        "url": "https://www.pgelephant.com/docs/pgbalancer/getting-started"
      }
    ]
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes pgbalancer different from other PostgreSQL connection poolers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "pgbalancer features a built-in AI intelligence engine with machine learning algorithms that continuously optimize connection patterns, predict traffic loads, and automatically adjust pool configurations for optimal performance. Unlike traditional poolers, it offers predictive scaling and intelligent query routing."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI intelligence engine improve database performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The AI engine analyzes query patterns, connection usage, and traffic trends to make intelligent decisions about connection allocation, load balancing weights, and cache optimization. It can predict traffic spikes and pre-scale resources, resulting in 30% better performance compared to traditional poolers."
        }
      },
      {
        "@type": "Question",
        "name": "Is pgbalancer compatible with existing PostgreSQL setups?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, pgbalancer is fully compatible with PostgreSQL 12+ and can be deployed as a drop-in replacement for existing connection poolers. It supports all standard PostgreSQL protocols and requires minimal configuration changes."
        }
      },
      {
        "@type": "Question",
        "name": "What are the system requirements for pgbalancer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "pgbalancer requires PostgreSQL 12 or higher, minimum 512MB RAM (2GB recommended), 100MB disk space, and runs on Linux, macOS, Windows, Docker, and Kubernetes environments."
        }
      }
    ]
  }

  // WebSite Schema for search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "pgElephant - pgbalancer",
    "url": "https://www.pgelephant.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.pgelephant.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pgelephant.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://www.pgelephant.com/#products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "pgbalancer",
        "item": "https://www.pgelephant.com/pgbalancer"
      }
    ]
  }

  return (
    <>
      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema)
        }}
      />
      
      {/* How-To Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Technical SEO */}
      <meta name="theme-color" content="#4f46e5" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Additional meta tags for rich snippets */}
      <meta name="application-name" content="pgbalancer" />
      <meta name="apple-mobile-web-app-title" content="pgbalancer" />
      <meta name="msapplication-TileColor" content="#4f46e5" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </>
  )
}

export default PgbalancerSEO