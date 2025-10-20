import React from 'react';
import { Metadata } from 'next';
import { 
  BookOpen, Database, Activity, TrendingUp, Search, BarChart3, 
  Settings, Code, Monitor, AlertTriangle, CheckCircle, ArrowRight,
  Clock, Zap, Eye, Shield, Target, Globe, Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgElephant Documentation - Complete Guides and References',
  description: 'Complete documentation for all pgElephant products. Guides, API references, best practices, and troubleshooting for PostgreSQL tools and monitoring solutions.',
  keywords: [
    'pgElephant documentation', 'PostgreSQL tools docs', 'pgbalancer documentation',
    'pgSentinel docs', 'pg_stat_insights docs', 'database monitoring guides'
  ].join(', '),
  openGraph: {
    title: 'pgElephant Documentation - Complete Guides and References',
    description: 'Complete documentation for all pgElephant products.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs',
    siteName: 'pgElephant',
  },
};

const DocsIndexPage = () => {
  const products = [
    {
      name: 'pgSentinel',
      description: 'Professional pgbalancer Management & Monitoring Platform',
      icon: <Activity className="w-8 h-8" />,
      color: 'blue',
      features: [
        'Real-time monitoring dashboard',
        'Prometheus metrics collection',
        'Grafana visualization',
        'WebSocket live updates',
        'REST API integration'
      ],
      documentation: [
        {
          title: 'Getting Started',
          description: 'Quick setup guide to get pgSentinel running in minutes',
          href: '/docs/pgsentinel/getting-started',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Configuration',
          description: 'Complete configuration guide with environment variables and Docker settings',
          href: '/docs/pgsentinel/configuration',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'API Reference',
          description: 'Complete REST API documentation with examples and code samples',
          href: '/docs/pgsentinel/api',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Dashboard Guide',
          description: 'Learn to use the monitoring interface effectively',
          href: '/docs/pgsentinel/dashboard',
          icon: <Monitor className="w-5 h-5" />
        },
        {
          title: 'Grafana Integration',
          description: 'Set up and customize Grafana dashboards for monitoring',
          href: '/docs/pgsentinel/grafana',
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          title: 'Metrics Reference',
          description: 'Complete reference for all available metrics and their meanings',
          href: '/docs/pgsentinel/metrics',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Troubleshooting',
          description: 'Common issues, error messages, and solutions',
          href: '/docs/pgsentinel/troubleshooting',
          icon: <AlertTriangle className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pg_stat_insights',
      description: 'Deep PostgreSQL Performance Analytics',
      icon: <Database className="w-8 h-8" />,
      color: 'cyan',
      features: [
        'Query performance analysis',
        'Table and index optimization',
        'Cache hit ratio monitoring',
        'Replication lag tracking',
        'Intelligent recommendations'
      ],
      documentation: [
        {
          title: 'Getting Started',
          description: 'Quick setup guide for PostgreSQL performance analytics',
          href: '/docs/pg-stat-insights/getting-started',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Query Analytics',
          description: 'Deep dive into query performance analysis and optimization',
          href: '/docs/pg-stat-insights/query-analytics',
          icon: <Search className="w-5 h-5" />
        },
        {
          title: 'Table & Index Analysis',
          description: 'Monitor table health, bloat detection, and index optimization',
          href: '/docs/pg-stat-insights/table-index',
          icon: <Target className="w-5 h-5" />
        },
        {
          title: 'Cache Monitoring',
          description: 'Buffer cache analysis and memory optimization strategies',
          href: '/docs/pg-stat-insights/cache',
          icon: <Eye className="w-5 h-5" />
        },
        {
          title: 'Replication Insights',
          description: 'Monitor replication lag and standby server health',
          href: '/docs/pg-stat-insights/replication',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'API Reference',
          description: 'Complete API documentation for programmatic access',
          href: '/docs/pg-stat-insights/api',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Best Practices',
          description: 'Performance optimization strategies and monitoring techniques',
          href: '/docs/pg-stat-insights/best-practices',
          icon: <CheckCircle className="w-5 h-5" />
        }
      ]
    }
  ];

  const quickStartGuides = [
    {
      title: 'pgSentinel Quick Start',
      description: 'Get pgSentinel running in 5 minutes',
      href: '/docs/pgsentinel/getting-started',
      icon: <Activity className="w-6 h-6" />,
      steps: ['Clone repository', 'Configure environment', 'Start services', 'Access dashboard']
    },
    {
      title: 'pg_stat_insights Setup',
      description: 'Enable PostgreSQL performance analytics',
      href: '/docs/pg-stat-insights/getting-started',
      icon: <Database className="w-6 h-6" />,
      steps: ['Install extensions', 'Configure permissions', 'Test connection', 'View insights']
    }
  ];

  const apiReferences = [
    {
      title: 'pgSentinel API',
      description: '25+ endpoints for monitoring and management',
      href: '/docs/pgsentinel/api',
      icon: <Code className="w-6 h-6" />,
      endpoints: ['System health', 'Real-time metrics', 'pgbalancer management', 'WebSocket events']
    },
    {
      title: 'pg_stat_insights API',
      description: '20+ endpoints for performance analytics',
      href: '/docs/pg-stat-insights/api',
      icon: <TrendingUp className="w-6 h-6" />,
      endpoints: ['Query analytics', 'Table statistics', 'Cache monitoring', 'Recommendations']
    }
  ];

  const troubleshootingGuides = [
    {
      title: 'pgSentinel Troubleshooting',
      description: 'Common issues and solutions for the monitoring platform',
      href: '/docs/pgsentinel/troubleshooting',
      icon: <AlertTriangle className="w-6 h-6" />,
      categories: ['Docker issues', 'Database connection', 'Frontend problems', 'Monitoring stack']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <BookOpen className="w-16 h-16 text-blue-500 animate-pulse" />
                <Database className="w-6 h-6 text-cyan-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-6 h-6 text-purple-400 absolute -top-1 -right-1" />
                <Code className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              pgElephant
              <span className="block text-3xl md:text-4xl text-blue-300 font-light mt-2">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete documentation for all pgElephant products. 
              Comprehensive guides, API references, and best practices for PostgreSQL tools and monitoring solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Complete guides
              </div>
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Code className="w-4 h-4 inline mr-2" />
                API references
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Best practices
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Documentation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Product Documentation</h2>
          <p className="text-slate-300 text-lg">Comprehensive guides for each pgElephant product</p>
        </div>

        <div className="space-y-12">
          {products.map((product, productIndex) => (
            <div key={productIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className={`text-${product.color}-400 mr-4`}>
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-slate-300">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className={`px-3 py-1 rounded-full text-sm bg-${product.color}-500/20 text-${product.color}-300`}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.documentation.map((doc, docIndex) => (
                  <a
                    key={docIndex}
                    href={doc.href}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="flex items-center mb-2">
                      <div className={`text-${product.color}-400 mr-2 group-hover:text-${product.color}-300`}>
                        {doc.icon}
                      </div>
                      <h5 className="font-semibold text-white group-hover:text-slate-200">
                        {doc.title}
                      </h5>
                    </div>
                    <p className="text-slate-300 text-sm">
                      {doc.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Guides */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Start Guides</h2>
            <p className="text-slate-300 text-lg">Get up and running quickly with these step-by-step guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickStartGuides.map((guide, index) => (
              <a
                key={index}
                href={guide.href}
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-400 mr-3 group-hover:text-blue-300">
                    {guide.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-slate-200">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {guide.description}
                </p>
                <div>
                  <h4 className="font-semibold text-white mb-2">Steps</h4>
                  <ol className="space-y-1">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-slate-300 text-sm flex items-center">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* API References */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">API References</h2>
          <p className="text-slate-300 text-lg">Complete API documentation with examples and code samples</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apiReferences.map((api, index) => (
            <a
              key={index}
              href={api.href}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <div className="flex items-center mb-4">
                <div className="text-cyan-400 mr-3 group-hover:text-cyan-300">
                  {api.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-slate-200">
                  {api.title}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {api.description}
              </p>
              <div>
                <h4 className="font-semibold text-white mb-2">Key Endpoints</h4>
                <div className="flex flex-wrap gap-2">
                  {api.endpoints.map((endpoint, endpointIndex) => (
                    <span key={endpointIndex} className="px-2 py-1 rounded text-sm bg-cyan-500/20 text-cyan-300">
                      {endpoint}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Troubleshooting</h2>
            <p className="text-slate-300 text-lg">Common issues, error messages, and solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {troubleshootingGuides.map((guide, index) => (
              <a
                key={index}
                href={guide.href}
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-red-400 mr-3 group-hover:text-red-300">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-slate-200">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm">
                  {guide.description}
                </p>
                <div>
                  <h4 className="font-semibold text-white mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.categories.map((category, categoryIndex) => (
                      <span key={categoryIndex} className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-300">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Additional Resources</h2>
          <p className="text-slate-300 text-lg mb-8">
            Explore more resources to get the most out of pgElephant products
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/pgsentinel"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Activity className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">pgSentinel Product</h3>
              <p className="text-slate-300 text-sm">Learn more about the monitoring platform</p>
            </a>
            
            <a
              href="/pg-stat-insights"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Database className="w-8 h-8 text-cyan-400 mb-4 group-hover:text-cyan-300" />
              <h3 className="text-lg font-semibold text-white mb-2">pg_stat_insights Product</h3>
              <p className="text-slate-300 text-sm">Explore the performance analytics tool</p>
            </a>
            
            <a
              href="https://github.com/pgelephant"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-green-400 mb-4 group-hover:text-green-300" />
              <h3 className="text-lg font-semibold text-white mb-2">GitHub Repository</h3>
              <p className="text-slate-300 text-sm">View source code and contribute</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsIndexPage;
