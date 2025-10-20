import React from 'react';
import { Metadata } from 'next';
import { 
  Settings, Database, Activity, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap, Globe, CheckCircle, 
  AlertTriangle, LineChart, BookOpen, Code, Monitor, Download, 
  Terminal, Container, ArrowRight, Copy, Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgSentinel Configuration - Complete Setup Guide',
  description: 'Complete configuration guide for pgSentinel monitoring platform. Environment variables, Docker settings, PostgreSQL configuration, and customization options.',
  keywords: [
    'pgSentinel configuration', 'monitoring setup', 'Docker configuration',
    'PostgreSQL monitoring config', 'environment variables', 'customization options'
  ].join(', '),
  openGraph: {
    title: 'pgSentinel Configuration - Complete Setup Guide',
    description: 'Complete configuration guide for pgSentinel monitoring platform.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgsentinel/configuration',
    siteName: 'pgElephant',
  },
};

const PgSentinelConfigurationPage = () => {
  const environmentVariables = [
    {
      category: 'Database Configuration',
      icon: <Database className="w-5 h-5" />,
      variables: [
        {
          name: 'DATABASE_URL',
          required: true,
          description: 'PostgreSQL connection string',
          example: 'postgresql://username:password@localhost:5432/database',
          default: 'postgresql://postgres:password@localhost:5432/postgres'
        },
        {
          name: 'DB_HOST',
          required: false,
          description: 'PostgreSQL host (overrides DATABASE_URL)',
          example: 'localhost',
          default: 'localhost'
        },
        {
          name: 'DB_PORT',
          required: false,
          description: 'PostgreSQL port (overrides DATABASE_URL)',
          example: '5432',
          default: '5432'
        },
        {
          name: 'DB_NAME',
          required: false,
          description: 'PostgreSQL database name (overrides DATABASE_URL)',
          example: 'postgres',
          default: 'postgres'
        },
        {
          name: 'DB_USER',
          required: false,
          description: 'PostgreSQL username (overrides DATABASE_URL)',
          example: 'postgres',
          default: 'postgres'
        },
        {
          name: 'DB_PASSWORD',
          required: false,
          description: 'PostgreSQL password (overrides DATABASE_URL)',
          example: 'password',
          default: 'password'
        }
      ]
    },
    {
      category: 'Redis Configuration',
      icon: <HardDrive className="w-5 h-5" />,
      variables: [
        {
          name: 'REDIS_URL',
          required: true,
          description: 'Redis connection string for caching',
          example: 'redis://localhost:6379',
          default: 'redis://localhost:6379'
        },
        {
          name: 'REDIS_HOST',
          required: false,
          description: 'Redis host (overrides REDIS_URL)',
          example: 'localhost',
          default: 'localhost'
        },
        {
          name: 'REDIS_PORT',
          required: false,
          description: 'Redis port (overrides REDIS_URL)',
          example: '6379',
          default: '6379'
        },
        {
          name: 'REDIS_PASSWORD',
          required: false,
          description: 'Redis password for authentication',
          example: 'redis_password',
          default: ''
        }
      ]
    },
    {
      category: 'Service Ports',
      icon: <Network className="w-5 h-5" />,
      variables: [
        {
          name: 'BACKEND_PORT',
          required: false,
          description: 'Backend API server port',
          example: '8000',
          default: '8000'
        },
        {
          name: 'FRONTEND_PORT',
          required: false,
          description: 'Frontend web server port',
          example: '3000',
          default: '3000'
        },
        {
          name: 'WEBSITE_PORT',
          required: false,
          description: 'Marketing website port',
          example: '3002',
          default: '3002'
        },
        {
          name: 'PROMETHEUS_PORT',
          required: false,
          description: 'Prometheus metrics server port',
          example: '9090',
          default: '9090'
        },
        {
          name: 'GRAFANA_PORT',
          required: false,
          description: 'Grafana dashboard port',
          example: '3001',
          default: '3001'
        }
      ]
    },
    {
      category: 'Monitoring Configuration',
      icon: <Activity className="w-5 h-5" />,
      variables: [
        {
          name: 'METRICS_INTERVAL',
          required: false,
          description: 'Metrics collection interval in seconds',
          example: '5',
          default: '5'
        },
        {
          name: 'PROMETHEUS_RETENTION',
          required: false,
          description: 'Prometheus data retention period',
          example: '15d',
          default: '15d'
        },
        {
          name: 'GRAFANA_ADMIN_PASSWORD',
          required: false,
          description: 'Grafana admin password',
          example: 'admin123',
          default: 'admin'
        },
        {
          name: 'ALERT_EMAIL',
          required: false,
          description: 'Email address for alerts',
          example: 'admin@example.com',
          default: ''
        }
      ]
    },
    {
      category: 'Security & Authentication',
      icon: <Shield className="w-5 h-5" />,
      variables: [
        {
          name: 'SECRET_KEY',
          required: true,
          description: 'Secret key for JWT token signing',
          example: 'your-secret-key-here',
          default: 'change-this-secret-key'
        },
        {
          name: 'JWT_EXPIRE_HOURS',
          required: false,
          description: 'JWT token expiration time in hours',
          example: '24',
          default: '24'
        },
        {
          name: 'CORS_ORIGINS',
          required: false,
          description: 'Allowed CORS origins (comma-separated)',
          example: 'http://localhost:3000,https://yourdomain.com',
          default: 'http://localhost:3000'
        }
      ]
    }
  ];

  const dockerConfigurations = [
    {
      title: 'Docker Compose Override',
      description: 'Override default settings using docker-compose.override.yml',
      icon: <Container className="w-6 h-6" />,
      code: `# docker-compose.override.yml
version: '3.8'

services:
  backend:
    environment:
      - DATABASE_URL=postgresql://user:pass@host:5432/db
      - REDIS_URL=redis://redis:6379
      - METRICS_INTERVAL=10
    ports:
      - "8000:8000"
  
  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    ports:
      - "3000:3000"
  
  grafana:
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=your-password
    ports:
      - "3001:3000"
  
  prometheus:
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'
    ports:
      - "9090:9090"`,
      language: 'yaml'
    },
    {
      title: 'Environment File',
      description: 'Create .env file for local development',
      icon: <Settings className="w-6 h-6" />,
      code: `# .env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=password

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# Service Ports
BACKEND_PORT=8000
FRONTEND_PORT=3000
WEBSITE_PORT=3002
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001

# Monitoring Configuration
METRICS_INTERVAL=5
PROMETHEUS_RETENTION=15d
GRAFANA_ADMIN_PASSWORD=admin123
ALERT_EMAIL=admin@example.com

# Security
SECRET_KEY=your-super-secret-key-here
JWT_EXPIRE_HOURS=24
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com`,
      language: 'bash'
    },
    {
      title: 'Production Docker Compose',
      description: 'Production-ready configuration with external services',
      icon: <Server className="w-6 h-6" />,
      code: `# docker-compose.prod.yml
version: '3.8'

services:
  backend:
    image: pgsentinel/backend:latest
    environment:
      - DATABASE_URL=$\{DATABASE_URL\}
      - REDIS_URL=$\{REDIS_URL\}
      - SECRET_KEY=$\{SECRET_KEY\}
      - METRICS_INTERVAL=30
    restart: unless-stopped
    depends_on:
      - postgres
      - redis
  
  frontend:
    image: pgsentinel/frontend:latest
    environment:
      - NEXT_PUBLIC_API_URL=$\{API_URL\}
    restart: unless-stopped
    depends_on:
      - backend
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=$\{DB_NAME\}
      - POSTGRES_USER=$\{DB_USER\}
      - POSTGRES_PASSWORD=$\{DB_PASSWORD\}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
  
  redis:
    image: redis:7-alpine
    restart: unless-stopped
  
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    restart: unless-stopped
  
  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=$\{GRAFANA_PASSWORD\}
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana:/etc/grafana/provisioning
    restart: unless-stopped

volumes:
  postgres_data:
  prometheus_data:
  grafana_data:`,
      language: 'yaml'
    }
  ];

  const postgresqlConfiguration = [
    {
      title: 'Required Extensions',
      description: 'Enable these PostgreSQL extensions for full functionality',
      icon: <Database className="w-6 h-6" />,
      code: `-- Connect to your PostgreSQL database
psql -U postgres -d your_database

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE EXTENSION IF NOT EXISTS pg_stat_kcache;
CREATE EXTENSION IF NOT EXISTS pg_qualstats;
CREATE EXTENSION IF NOT EXISTS pg_buffercache;

-- Grant necessary permissions
GRANT pg_monitor TO your_api_user;
GRANT SELECT ON pg_stat_statements TO your_api_user;
GRANT SELECT ON pg_stat_user_tables TO your_api_user;
GRANT SELECT ON pg_stat_user_indexes TO your_api_user;
GRANT SELECT ON pg_stat_database TO your_api_user;
GRANT SELECT ON pg_stat_activity TO your_api_user;
GRANT SELECT ON pg_locks TO your_api_user;
GRANT SELECT ON pg_stat_replication TO your_api_user;`,
      language: 'sql'
    },
    {
      title: 'postgresql.conf Settings',
      description: 'Recommended PostgreSQL configuration for optimal monitoring',
      icon: <Settings className="w-6 h-6" />,
      code: `# postgresql.conf
# Shared preload libraries
shared_preload_libraries = 'pg_stat_statements'

# pg_stat_statements configuration
pg_stat_statements.max = 10000
pg_stat_statements.track = all
pg_stat_statements.track_utility = on
pg_stat_statements.track_planning = on

# Logging configuration
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_min_duration_statement = 1000  # Log slow queries (1 second)

# Statistics configuration
track_activities = on
track_counts = on
track_io_timing = on
track_functions = all

# Connection settings
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB

# WAL settings
wal_level = replica
max_wal_senders = 3
max_replication_slots = 3`,
      language: 'ini'
    }
  ];

  const customizationOptions = [
    {
      title: 'Custom Metrics',
      description: 'Add your own custom metrics to the monitoring system',
      icon: <TrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            You can add custom metrics by extending the Prometheus metrics in the backend:
          </p>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <div className="text-slate-300"># In backend/main.py</div>
            <div className="text-blue-300">from prometheus_client import Counter, Gauge, Histogram</div>
            <div className="text-slate-300"># Add custom metrics</div>
            <div className="text-blue-300">custom_metric = Counter('custom_operations_total', 'Total custom operations')</div>
            <div className="text-blue-300">custom_gauge = Gauge('custom_value', 'Custom value metric')</div>
          </div>
        </div>
      )
    },
    {
      title: 'Custom Dashboards',
      description: 'Create custom Grafana dashboards for specific use cases',
      icon: <BarChart3 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Add custom dashboard JSON files to the monitoring/grafana/dashboards/ directory:
          </p>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <div className="text-slate-300"># Directory structure</div>
            <div className="text-blue-300">monitoring/</div>
            <div className="text-blue-300">├── grafana/</div>
            <div className="text-blue-300">│   ├── dashboards/</div>
            <div className="text-blue-300">│   │   ├── custom-dashboard.json</div>
            <div className="text-blue-300">│   │   └── business-metrics.json</div>
            <div className="text-blue-300">│   └── provisioning/</div>
          </div>
        </div>
      )
    },
    {
      title: 'Alert Rules',
      description: 'Configure custom alert rules for your specific requirements',
      icon: <Bell className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Modify the Prometheus alert rules in monitoring/prometheus/alerts.yml:
          </p>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <div className="text-slate-300"># Custom alert rule example</div>
            <div className="text-blue-300">- alert: CustomHighCPU</div>
            <div className="text-blue-300">  expr: cpu_usage_percent {'>'} 90</div>
            <div className="text-blue-300">  for: 5m</div>
            <div className="text-blue-300">  labels:</div>
            <div className="text-blue-300">    severity: warning</div>
            <div className="text-blue-300">  annotations:</div>
            <div className="text-blue-300">    summary: "High CPU usage detected"</div>
          </div>
        </div>
      )
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
                <Settings className="w-16 h-16 text-blue-500 animate-pulse" />
                <Database className="w-6 h-6 text-purple-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
                <Shield className="w-5 h-5 text-orange-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              pgSentinel
              <span className="block text-3xl md:text-4xl text-blue-300 font-light mt-2">
                Configuration
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete configuration guide for pgSentinel monitoring platform. 
              Environment variables, Docker settings, and customization options.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Settings className="w-4 h-4 inline mr-2" />
                Environment variables
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-300">
                <Container className="w-4 h-4 inline mr-2" />
                Docker configuration
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Production ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Environment Variables</h2>
          <p className="text-slate-300 text-lg">Complete reference for all configuration options</p>
        </div>

        <div className="space-y-12">
          {environmentVariables.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-8">
                <div className="text-blue-400 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-6">
                {category.variables.map((variable, variableIndex) => (
                  <div key={variableIndex} className="border-l-4 border-slate-700 pl-6">
                    <div className="flex items-center mb-2">
                      <code className="text-lg font-mono text-white mr-4">
                        {variable.name}
                      </code>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        variable.required 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-slate-500/20 text-slate-300'
                      }`}>
                        {variable.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 mb-3">
                      {variable.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Example</h4>
                        <div className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                          <div className="text-slate-300">{variable.name}={variable.example}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Default</h4>
                        <div className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                          <div className="text-slate-300">{variable.name}={variable.default}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Docker Configurations */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Docker Configurations</h2>
            <p className="text-slate-300 text-lg">Docker Compose setups for different environments</p>
          </div>

          <div className="space-y-8">
            {dockerConfigurations.map((config, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-blue-400 mr-3">
                    {config.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {config.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {config.description}
                </p>
                <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap">{config.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PostgreSQL Configuration */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">PostgreSQL Configuration</h2>
          <p className="text-slate-300 text-lg">Required PostgreSQL setup for optimal monitoring</p>
        </div>

        <div className="space-y-8">
          {postgresqlConfiguration.map((config, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-cyan-400 mr-3">
                  {config.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {config.title}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {config.description}
              </p>
              <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap">{config.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Options */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Customization Options</h2>
            <p className="text-slate-300 text-lg">Extend and customize pgSentinel for your needs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {customizationOptions.map((option, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-purple-400 mr-3">
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {option.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {option.description}
                </p>
                {option.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Validation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Configuration Validation</h2>
          <p className="text-slate-300 text-lg">Verify your configuration is correct</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Health Check</h3>
                <p className="text-slate-300">Verify all services are running correctly</p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">curl http://localhost:8000/api/v1/health</div>
            </div>

            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Database Connection</h3>
                <p className="text-slate-300">Test PostgreSQL connectivity and permissions</p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">curl http://localhost:8000/api/v1/insights/dashboard</div>
            </div>

            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Metrics Collection</h3>
                <p className="text-slate-300">Verify metrics are being collected and stored</p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">curl http://localhost:9090/api/v1/query?query=up</div>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Help?</h2>
          <p className="text-slate-300 text-lg mb-8">
            If you're having trouble with configuration, check our troubleshooting guide or get support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/docs/pgsentinel/troubleshooting"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <AlertTriangle className="w-8 h-8 text-orange-400 mb-4 group-hover:text-orange-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Troubleshooting</h3>
              <p className="text-slate-300 text-sm">Common issues and solutions</p>
            </a>
            
            <a
              href="/docs/pgsentinel/api"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
              <p className="text-slate-300 text-sm">Complete API documentation</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgSentinelConfigurationPage;
