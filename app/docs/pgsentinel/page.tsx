import React from 'react';
import { Metadata } from 'next';
import { 
  Activity, Shield, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap,
  Globe, CheckCircle, AlertTriangle, LineChart,
  BookOpen, Code, Settings, Database, Monitor
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgSentinel Documentation - Professional pgbalancer Management & Monitoring Platform',
  description: 'Complete documentation for pgSentinel - the professional web-based management and monitoring platform for pgbalancer with real-time metrics, Prometheus/Grafana integration, and pg_stat_insights analytics.',
  keywords: [
    'pgSentinel documentation', 'pgbalancer monitoring', 'PostgreSQL monitoring platform',
    'real-time database metrics', 'Prometheus PostgreSQL', 'Grafana PostgreSQL',
    'pg_stat_insights', 'database observability', 'connection pool monitoring'
  ].join(', '),
  openGraph: {
    title: 'pgSentinel Documentation - Professional Monitoring Platform',
    description: 'Complete documentation for pgSentinel monitoring and management platform.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgsentinel',
    siteName: 'pgElephant',
  },
};

const PgSentinelDocsPage = () => {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Quick setup and first steps with pgSentinel',
      icon: <Zap className="w-6 h-6" />,
      href: '/docs/pgsentinel/getting-started',
      features: ['Docker installation', 'Configuration', 'First dashboard', 'Basic setup']
    },
    {
      title: 'Configuration',
      description: 'Complete configuration guide and options',
      icon: <Settings className="w-6 h-6" />,
      href: '/docs/pgsentinel/configuration',
      features: ['Environment variables', 'Service configuration', 'Database setup', 'Custom settings']
    },
    {
      title: 'Dashboard Guide',
      description: 'Using the real-time monitoring dashboard',
      icon: <Monitor className="w-6 h-6" />,
      href: '/docs/pgsentinel/dashboard',
      features: ['Live metrics', 'WebSocket updates', 'Custom views', 'Alert management']
    },
    {
      title: 'API Reference',
      description: 'Complete REST API documentation',
      icon: <Code className="w-6 h-6" />,
      href: '/docs/pgsentinel/api',
      features: ['25+ endpoints', 'WebSocket API', 'Authentication', 'Examples']
    },
    {
      title: 'Grafana Integration',
      description: 'Setting up and using Grafana dashboards',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/docs/pgsentinel/grafana',
      features: ['Pre-built dashboards', 'Custom panels', 'PromQL queries', 'Alerting rules']
    },
    {
      title: 'Metrics Reference',
      description: 'Complete metrics and monitoring guide',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/docs/pgsentinel/metrics',
      features: ['30+ custom metrics', 'Prometheus export', 'System metrics', 'pg_stat_insights']
    },
    {
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: <AlertTriangle className="w-6 h-6" />,
      href: '/docs/pgsentinel/troubleshooting',
      features: ['Common problems', 'Debug guides', 'Performance issues', 'Log analysis']
    }
  ];

  const features = [
    {
      title: 'Real-Time Monitoring',
      description: 'Live dashboard with WebSocket updates every 5 seconds',
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      details: [
        'Interactive Next.js 14 dashboard with React 18',
        'WebSocket live updates for instant metric refresh',
        'Beautiful UI with Tailwind CSS and Recharts',
        'Real-time connection pool visualization'
      ]
    },
    {
      title: 'Prometheus Integration',
      description: '30+ custom metrics with full PromQL support',
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      details: [
        'Custom metrics for pgbalancer performance',
        'System resource monitoring (CPU, memory, disk)',
        'PostgreSQL-specific metrics and insights',
        'Time-series data collection and storage'
      ]
    },
    {
      title: 'Grafana Dashboards',
      description: '22 pre-built visualization panels',
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      details: [
        'Professional dashboards for system metrics',
        'pg_stat_insights visualization panels',
        'Configurable time ranges and queries',
        'Custom panel creation and sharing'
      ]
    },
    {
      title: 'pg_stat_insights',
      description: 'Deep PostgreSQL performance analytics',
      icon: <Database className="w-8 h-8 text-cyan-500" />,
      details: [
        'Query performance analysis and optimization',
        'Table and index usage statistics',
        'Cache hit ratio monitoring',
        'Intelligent recommendations and alerts'
      ]
    },
    {
      title: 'REST API',
      description: '25+ endpoints for programmatic control',
      icon: <Code className="w-8 h-8 text-orange-500" />,
      details: [
        'FastAPI backend with async support',
        'Comprehensive API documentation',
        'WebSocket support for real-time data',
        'Python and TypeScript client libraries'
      ]
    },
    {
      title: 'Docker Ready',
      description: '8-service stack with one-command deployment',
      icon: <Server className="w-8 h-8 text-pink-500" />,
      details: [
        'Complete Docker Compose orchestration',
        'Production-ready container configuration',
        'Automatic health checks and restarts',
        'Volume persistence and network isolation'
      ]
    }
  ];

  const architecture = [
    {
      layer: 'Frontend Layer',
      services: ['Next.js Dashboard (port 3000)', 'Marketing Website (port 3002)'],
      description: 'Modern React-based user interfaces with real-time updates'
    },
    {
      layer: 'Backend Layer',
      services: ['FastAPI + uvicorn (port 8000)', 'WebSocket server', 'pg_stat_insights integration'],
      description: 'High-performance Python backend with async support'
    },
    {
      layer: 'Monitoring Layer',
      services: ['Prometheus (port 9090)', 'Grafana (port 3001)', 'Alertmanager (port 9093)', 'Node Exporter (port 9100)'],
      description: 'Complete observability stack with metrics collection and visualization'
    },
    {
      layer: 'Data Layer',
      services: ['PostgreSQL (port 5432)', 'Redis (port 6379)', 'pg_stat_statements extension'],
      description: 'Primary database with caching and performance extensions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Eye className="w-20 h-20 text-blue-500 animate-pulse" />
                <Shield className="w-8 h-8 text-purple-400 absolute -top-2 -left-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-8 h-8 text-green-400 absolute -top-2 -right-2" />
                <Bell className="w-6 h-6 text-orange-400 absolute -bottom-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              pgSentinel
              <span className="block text-3xl md:text-4xl text-blue-300 font-light mt-2">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete guide to the professional pgbalancer management and monitoring platform. 
              Real-time metrics, Prometheus integration, Grafana dashboards, and deep PostgreSQL analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Clock className="w-4 h-4 inline mr-2" />
                Real-Time Monitoring
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-300">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                30+ Metrics
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                22 Grafana Panels
              </div>
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Database className="w-4 h-4 inline mr-2" />
                pg_stat_insights
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Documentation Sections</h2>
          <p className="text-slate-300 text-lg">Everything you need to get started and master pgSentinel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <a
              key={index}
              href={section.href}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-white ml-3 group-hover:text-blue-300 transition-colors">
                  {section.title}
                </h3>
              </div>
              <p className="text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">
                {section.description}
              </p>
              <ul className="space-y-1">
                {section.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-slate-400 flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-slate-300 text-lg">Comprehensive monitoring and management capabilities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-slate-400 flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Architecture Overview</h2>
          <p className="text-slate-300 text-lg">8-service Docker Compose stack for complete monitoring</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          <div className="space-y-6">
            {architecture.map((layer, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-white mb-2">{layer.layer}</h3>
                <p className="text-slate-300 mb-3">{layer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
          <p className="text-slate-300 text-lg mb-8">
            Get pgSentinel running in minutes with Docker Compose
          </p>
          
          <div className="bg-slate-900 rounded-xl p-8 text-left">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">Terminal Commands</span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="text-slate-300">
                <span className="text-blue-400">#</span> Clone the repository
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300">git clone https://github.com/pgelephant/pgsentinel.git</div>
                <div className="text-slate-300">cd pgsentinel</div>
              </div>
              
              <div className="text-slate-300">
                <span className="text-blue-400">#</span> Configure environment
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300">cp env.template .env</div>
                <div className="text-slate-300"># Edit .env with your PostgreSQL connection details</div>
              </div>
              
              <div className="text-slate-300">
                <span className="text-blue-400">#</span> Start all services
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300">docker-compose up -d</div>
              </div>
              
              <div className="text-slate-300">
                <span className="text-blue-400">#</span> Access the dashboard
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300"># Dashboard:   http://localhost:3000</div>
                <div className="text-slate-300"># API:         http://localhost:8000/docs</div>
                <div className="text-slate-300"># Grafana:     http://localhost:3001 (admin/admin)</div>
                <div className="text-slate-300"># Prometheus:  http://localhost:9090</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Explore the complete pgSentinel documentation and start monitoring your PostgreSQL infrastructure today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/pgsentinel/getting-started"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Getting Started Guide
            </a>
            <a
              href="/pgsentinel"
              className="border border-blue-500 text-blue-300 hover:bg-blue-500/10 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Product Overview
            </a>
            <a
              href="/docs/pgsentinel/api"
              className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Code className="w-5 h-5 mr-2" />
              API Reference
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgSentinelDocsPage;
