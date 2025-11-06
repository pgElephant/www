import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  ArrowRight,
  Code,
  Download,
  ExternalLink,
  Play,
  Database,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Network,
  Settings,
  Activity,
  Server,
  Layers,
  Brain
} from 'lucide-react'

export const metadata = {
  title: 'pgBalancer - PostgreSQL AI Load Balancer & Connection Pooler | Official Documentation',
  description: 'pgBalancer is an AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and MQTT event streaming. Modern fork of pgpool-II with machine learning algorithms for optimal query routing.',
  keywords: [
    'pgBalancer',
    'PostgreSQL load balancer',
    'connection pooler',
    'AI load balancing',
    'PostgreSQL cluster',
    'query routing',
    'REST API',
    'MQTT streaming',
    'pgpool-II',
    'database proxy',
    'connection pooling PostgreSQL',
    'intelligent routing',
    'machine learning database',
    'PostgreSQL high availability',
    'database load balancing'
  ],
  openGraph: {
    title: 'pgBalancer - PostgreSQL AI Load Balancer & Connection Pooler',
    description: 'AI-powered PostgreSQL connection pooler with intelligent routing, REST API management, and real-time monitoring. Modern alternative to pgpool-II.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgbalancer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgBalancer - PostgreSQL AI Load Balancer',
    description: 'Intelligent PostgreSQL connection pooling with AI-based load balancing and REST API management.',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/pgbalancer',
  }
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'pgBalancer',
    applicationCategory: 'DatabaseApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: 'AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and MQTT event streaming. Modern fork of pgpool-II with machine learning algorithms.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '180'
    },
    softwareRequirements: 'PostgreSQL 13+',
    releaseNotes: 'https://www.pgelephant.com/docs/pgbalancer/getting-started',
    installUrl: 'https://www.pgelephant.com/docs/pgbalancer/getting-started',
    keywords: 'PostgreSQL, load balancer, connection pooler, AI routing, REST API, MQTT, pgpool-II',
    author: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    },
    creator: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    }
  }

  const features = [
    {
      icon: Cpu,
      title: 'AI Load Balancing',
      description: 'Machine learning algorithms analyze query patterns and server performance for optimal routing'
    },
    {
      icon: Network,
      title: 'REST API Management',
      description: '17 HTTP/JSON endpoints for complete cluster management and real-time monitoring'
    },
    {
      icon: Database,
      title: 'Connection Pooling',
      description: 'Advanced connection pooling with health checks, failover, and load distribution'
    },
    {
      icon: Activity,
      title: 'MQTT Event Streaming',
      description: 'Real-time event publishing for node status, failovers, and health monitoring'
    }
  ]

  const quickLinks = [
    {
      title: 'Getting Started',
      href: '/docs/pgbalancer/getting-started',
      description: 'Install and configure pgBalancer in 5 minutes',
      icon: BookOpen
    },
    {
      title: 'REST API Reference',
      href: '/docs/pgbalancer/rest-api',
      description: 'Complete API documentation with examples',
      icon: Code
    },
    {
      title: 'GitHub Repository',
      href: 'https://github.com/pgElephant/pgBalancer',
      description: 'View source code and contribute',
      icon: ExternalLink,
      external: true
    }
  ]

  const docSections = [
    {
      title: 'Getting Started',
      description: 'Installation, quick start, and basic configuration',
      items: [
        { title: 'Installation Guide', href: '/docs/pgbalancer/getting-started', description: 'Build and install pgBalancer' },
        { title: 'Quick Start', href: '/docs/pgbalancer/getting-started', description: 'Get running in under 5 minutes' },
        { title: 'Configuration', href: '/docs/pgbalancer/configuration', description: 'Basic configuration parameters' }
      ]
    },
    {
      title: 'Core Features',
      description: 'Load balancing, connection pooling, and routing',
      items: [
        { title: 'AI Load Balancing', href: '/docs/pgbalancer/load-balancing', description: 'Intelligent query routing algorithms' },
        { title: 'Connection Pooling', href: '/docs/pgbalancer/connection-pooling', description: 'Advanced pooling with health checks' },
        { title: 'High Availability', href: '/docs/pgbalancer/high-availability', description: 'Failover and redundancy features' }
      ]
    },
    {
      title: 'Management & Monitoring',
      description: 'API, CLI tools, and observability',
      items: [
        { title: 'REST API', href: '/docs/pgbalancer/rest-api', description: '17 HTTP endpoints for cluster management' },
        { title: 'CLI Management (bctl)', href: '/docs/pgbalancer/cli-management', description: 'Command-line interface for operations' },
        { title: 'Metrics & Monitoring', href: '/docs/pgbalancer/metrics', description: 'Observability and alerting' }
      ]
    },
    {
      title: 'Advanced Topics',
      description: 'Architecture, internals, and troubleshooting',
      items: [
        { title: 'Architecture & Internals', href: '/docs/pgbalancer/internals', description: 'System design and implementation' },
        { title: 'Monitoring Integration', href: '/docs/pgbalancer/monitoring', description: 'External monitoring systems' }
      ]
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative rounded-2xl bg-white/80 dark:bg-slate-800/80 p-2 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
                  <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white">
                    <Database className="h-6 w-6" />
                    <span className="text-lg font-semibold">pgBalancer</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                PostgreSQL AI Load Balancer
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Modern connection pooler with <strong>AI-powered load balancing</strong>, REST API management, and MQTT event streaming.
                Intelligent query routing using machine learning algorithms for optimal PostgreSQL performance.
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs/pgbalancer/getting-started"
                  className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Link>
                <Link
                  href="https://github.com/pgElephant/pgBalancer"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  View on GitHub <ExternalLink className="ml-1 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                AI-Powered PostgreSQL Management
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Modern fork of pgpool-II with machine learning algorithms, REST API, and real-time monitoring
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-7xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div key={index} className="relative rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-x-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Quick Start
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Get pgBalancer running in your PostgreSQL cluster in minutes
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`group relative rounded-2xl p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-xl transition-all duration-300 ${
                      link.external ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <div className="flex items-center gap-x-3">
                      <link.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {link.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
                    {link.external && <ExternalLink className="absolute top-4 right-4 h-4 w-4 text-gray-400" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Complete Documentation
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Everything you need to deploy, configure, and manage pgBalancer
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-7xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {docSections.map((section, index) => (
                  <div key={index} className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{section.description}</p>

                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                        >
                          <div className="flex items-start gap-x-3">
                            <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Highlight */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Why Choose pgBalancer?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Advanced PostgreSQL connection management with AI-powered intelligence
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Machine Learning Routing</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    AI algorithms learn from query patterns and optimize backend selection for maximum performance
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-teal-600">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">REST API Management</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Complete cluster management through 17 HTTP/JSON endpoints with sub-10ms response times
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Real-Time Monitoring</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    MQTT event streaming and comprehensive metrics for observability and alerting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Join the growing community of PostgreSQL professionals using pgBalancer for intelligent connection management
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/docs/pgbalancer/getting-started"
                  className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  Start Installation <Play className="ml-2 h-4 w-4 inline" />
                </Link>
                <Link
                  href="https://github.com/pgElephant/pgBalancer"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Star on GitHub <ExternalLink className="ml-1 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
