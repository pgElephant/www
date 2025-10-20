import React from 'react';
import { Metadata } from 'next';
import { 
  Activity, Shield, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap,
  Globe, CheckCircle, AlertTriangle, LineChart,
  BookOpen, Code, Settings, Database, Monitor,
  Download, Terminal, Container, ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgSentinel Getting Started - Quick Setup Guide',
  description: 'Complete getting started guide for pgSentinel - professional pgbalancer management and monitoring platform. Docker installation, configuration, and first dashboard setup.',
  keywords: [
    'pgSentinel getting started', 'pgbalancer monitoring setup', 'Docker installation',
    'PostgreSQL monitoring quickstart', 'real-time dashboard setup', 'Prometheus Grafana setup'
  ].join(', '),
  openGraph: {
    title: 'pgSentinel Getting Started - Quick Setup Guide',
    description: 'Complete getting started guide for pgSentinel monitoring platform.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgsentinel/getting-started',
    siteName: 'pgElephant',
  },
};

const PgSentinelGettingStartedPage = () => {
  const steps = [
    {
      step: 1,
      title: 'Prerequisites',
      description: 'System requirements and dependencies',
      icon: <CheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">System Requirements</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Docker and Docker Compose installed
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                PostgreSQL 12+ with pg_stat_statements extension
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                4GB RAM minimum (8GB recommended)
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                2GB disk space for logs and data
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">PostgreSQL Setup</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">-- Enable required extensions</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_stat_statements;</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_stat_kcache;</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_qualstats;</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_buffercache;</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 2,
      title: 'Installation',
      description: 'Clone repository and configure environment',
      icon: <Download className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Clone Repository</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">git clone https://github.com/pgelephant/pgsentinel.git</div>
              <div className="text-slate-300">cd pgsentinel</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Configure Environment</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">cp env.template .env</div>
              <div className="text-slate-300"># Edit .env with your PostgreSQL connection details</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Environment Variables</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Required configuration:</div>
              <div className="text-blue-300">DATABASE_URL=postgresql://user:pass@localhost:5432/dbname</div>
              <div className="text-blue-300">REDIS_URL=redis://localhost:6379</div>
              <div className="text-blue-300">PROMETHEUS_PORT=9090</div>
              <div className="text-blue-300">GRAFANA_PORT=3001</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: 'Start Services',
      description: 'Launch the complete monitoring stack',
      icon: <Container className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Start All Services</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">docker-compose up -d</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Verify Services</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">docker-compose ps</div>
              <div className="text-slate-300"># All services should show 'Up' status</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Check Logs</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">docker-compose logs -f backend</div>
              <div className="text-slate-300">docker-compose logs -f frontend</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: 'Access Dashboard',
      description: 'Open the monitoring dashboard and verify setup',
      icon: <Monitor className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Access Points</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="font-semibold text-white">Main Dashboard</span>
                </div>
                <div className="text-blue-300">http://localhost:3000</div>
                <div className="text-slate-400 text-sm">Real-time monitoring interface</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Code className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="font-semibold text-white">API Documentation</span>
                </div>
                <div className="text-purple-300">http://localhost:8000/docs</div>
                <div className="text-slate-400 text-sm">Interactive API documentation</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
                  <span className="font-semibold text-white">Grafana</span>
                </div>
                <div className="text-green-300">http://localhost:3001</div>
                <div className="text-slate-400 text-sm">admin/admin (default login)</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-400 mr-2" />
                  <span className="font-semibold text-white">Prometheus</span>
                </div>
                <div className="text-orange-300">http://localhost:9090</div>
                <div className="text-slate-400 text-sm">Metrics collection and queries</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 5,
      title: 'Configuration',
      description: 'Customize settings and connect to your PostgreSQL',
      icon: <Settings className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Database Connection</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Update .env file with your PostgreSQL details:</div>
              <div className="text-blue-300">DATABASE_URL=postgresql://username:password@host:port/database</div>
              <div className="text-slate-400 text-xs mt-2">Replace with your actual connection details</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Restart Services</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">docker-compose restart backend</div>
              <div className="text-slate-300"># Backend will reconnect to your database</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Verify Connection</h4>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="text-slate-300 mb-2">Check the dashboard for:</div>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Database connection status
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Real-time metrics appearing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  pg_stat_insights data loading
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  const troubleshooting = [
    {
      issue: 'Services not starting',
      solution: 'Check Docker is running and ports are available',
      commands: ['docker-compose ps', 'docker-compose logs']
    },
    {
      issue: 'Database connection failed',
      solution: 'Verify DATABASE_URL in .env file and PostgreSQL is accessible',
      commands: ['docker-compose logs backend', 'psql $DATABASE_URL']
    },
    {
      issue: 'No metrics appearing',
      solution: 'Ensure pg_stat_statements is enabled and PostgreSQL is restarted',
      commands: ['SELECT * FROM pg_stat_statements LIMIT 1;', 'docker-compose restart backend']
    },
    {
      issue: 'Grafana login issues',
      solution: 'Default credentials are admin/admin, check container logs',
      commands: ['docker-compose logs grafana', 'docker-compose exec grafana grafana-cli admin reset-admin-password admin']
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
                <Eye className="w-16 h-16 text-blue-500 animate-pulse" />
                <Shield className="w-6 h-6 text-purple-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
                <Bell className="w-5 h-5 text-orange-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Getting Started with
              <span className="block text-3xl md:text-4xl text-blue-300 font-light mt-2">
                pgSentinel
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Quick setup guide to get pgSentinel running in minutes. 
              Professional pgbalancer monitoring with real-time metrics and analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Clock className="w-4 h-4 inline mr-2" />
                5-minute setup
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-300">
                <Container className="w-4 h-4 inline mr-2" />
                Docker ready
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Production ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Setup Steps</h2>
          <p className="text-slate-300 text-lg">Follow these steps to get pgSentinel running</p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-500" />
              )}
              
              <div className="flex items-start">
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-400 mr-3">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-lg mb-6">
                    {step.description}
                  </p>
                  
                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                    {step.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Verification */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Verification</h2>
            <p className="text-slate-300 text-lg">Verify everything is working correctly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                Dashboard Check
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Open http://localhost:3000
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Verify real-time metrics are updating
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Check WebSocket connection (green indicator)
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Navigate to /insights for pg_stat_insights
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-purple-400 mr-3" />
                Grafana Check
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Open http://localhost:3001
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Login with admin/admin
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Check pgSentinel dashboards are loaded
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Verify data is flowing from Prometheus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Troubleshooting</h2>
          <p className="text-slate-300 text-lg">Common issues and solutions</p>
        </div>

        <div className="space-y-6">
          {troubleshooting.map((item, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-400 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.issue}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {item.solution}
                  </p>
                  <div className="space-y-2">
                    {item.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                        <div className="text-slate-300">$ {command}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
          <p className="text-slate-300 text-lg mb-8">
            Now that pgSentinel is running, explore the advanced features and customization options.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/pgsentinel/configuration"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Settings className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Configuration</h3>
              <p className="text-slate-300 text-sm">Customize settings and environment variables</p>
            </a>
            
            <a
              href="/docs/pgsentinel/dashboard"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Monitor className="w-8 h-8 text-purple-400 mb-4 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Dashboard Guide</h3>
              <p className="text-slate-300 text-sm">Learn to use the monitoring interface effectively</p>
            </a>
            
            <a
              href="/docs/pgsentinel/api"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-green-400 mb-4 group-hover:text-green-300" />
              <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
              <p className="text-slate-300 text-sm">Integrate with your applications using the REST API</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgSentinelGettingStartedPage;
