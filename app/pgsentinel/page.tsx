import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import { generateProductPageMetadata } from '@/config/seo';
import { 
  Activity, Shield, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap,
  Globe, CheckCircle, AlertTriangle, LineChart
} from 'lucide-react';

export const metadata = generateProductPageMetadata('pgsentinel');

const pgSentinelConfig = {
  productId: 'pgsentinel' as const,
  hero: {
    subtitle: 'Enterprise monitoring platform with real-time WebSocket updates, Prometheus metrics, Grafana dashboards, and pg_stat_insights analytics',
  },
  badges: [
    'Real-Time Monitoring',
    'Prometheus Integration',
    'Grafana Dashboards',
    'pg_stat_insights',
    'REST API',
    'WebSocket Live',
    'Production Ready',
    'Docker Optimized',
  ],
  demo: (
    <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
        <Activity className="w-5 h-5 text-green-400" />
        <span className="text-green-400 font-semibold">pgSentinel Dashboard</span>
        <span className="ml-auto text-xs text-slate-400">Real-Time Monitoring</span>
      </div>
      
      <div className="space-y-4 font-mono text-sm">
        <div className="text-slate-300">
          <span className="text-blue-400">$</span> docker-compose up -d
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">✅ Backend API</span>
            <span className="text-green-400">http://localhost:8000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">✅ Dashboard</span>
            <span className="text-green-400">http://localhost:3000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">✅ Grafana</span>
            <span className="text-green-400">http://localhost:3001</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">✅ Prometheus</span>
            <span className="text-green-400">http://localhost:9090</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-slate-300">
            <span className="text-purple-400">◆</span> <span className="text-cyan-300">Real-Time Metrics:</span>
          </div>
          <div className="pl-4 space-y-1 text-slate-400">
            <div>• CPU Usage: <span className="text-green-400">12.5%</span></div>
            <div>• Memory: <span className="text-green-400">45.2%</span></div>
            <div>• Active Connections: <span className="text-green-400">127</span></div>
            <div>• Pool Utilization: <span className="text-green-400">67.8%</span></div>
            <div>• Query Throughput: <span className="text-green-400">1,245 QPS</span></div>
          </div>
        </div>
        
        <div className="bg-green-900/20 border border-green-700/30 p-3 rounded text-green-300">
          <span className="text-green-400">✓</span> All services running healthy • 8 containers operational
        </div>
      </div>
    </div>
  ),
  features: [
    { icon: '📊', iconColor: 'text-blue-500', title: 'Real-Time Dashboard', desc: 'Beautiful web-based interface with live metrics, connection pool visualization, and backend node management.' },
    { icon: '📈', iconColor: 'text-purple-500', title: 'Prometheus Metrics', desc: '30+ custom metrics exported for comprehensive monitoring with PromQL query support and time-series analysis.' },
    { icon: '📉', iconColor: 'text-green-500', title: 'Grafana Dashboards', desc: '22 pre-built visualization panels covering all aspects of pgbalancer performance and health.' },
    { icon: '🔍', iconColor: 'text-cyan-500', title: 'pg_stat_insights', desc: 'Deep PostgreSQL performance insights with query analysis, table stats, index usage, and recommendations.' },
    { icon: '🔔', iconColor: 'text-orange-500', title: 'Alert Management', desc: 'Integrated Alertmanager for configurable alerts, notifications, and incident response workflows.' },
    { icon: '🌐', iconColor: 'text-pink-500', title: 'REST API', desc: 'Comprehensive FastAPI backend with 25+ endpoints for programmatic control and data access.' },
    { icon: '⚡', iconColor: 'text-yellow-500', title: 'WebSocket Live', desc: 'Real-time updates via WebSocket for instant metric refresh and live event streaming.' },
    { icon: '🐳', iconColor: 'text-blue-400', title: 'Docker Ready', desc: 'Production-ready Docker Compose deployment with 8 integrated services and health checks.' },
    { icon: '🔐', iconColor: 'text-red-500', title: 'Secure & Scalable', desc: 'Enterprise-grade security with role-based access, Redis caching, and horizontal scalability.' },
  ],
  featurePillars: {
    kicker: 'Complete Monitoring Stack',
    items: [
      { title: 'Real-Time Web Dashboard', desc: 'Interactive Next.js 14 dashboard with React 18, TypeScript, Tailwind CSS, and Recharts. Live WebSocket updates every 5 seconds for instant visibility.' },
      { title: 'Prometheus Integration', desc: '30+ custom metrics including active connections, CPU/memory usage, pool utilization, query throughput, and backend health with full PromQL support.' },
      { title: 'Grafana Visualization', desc: '2 professional dashboards with 22 panels covering system metrics, pg_stat_insights data, and custom analytics with configurable time ranges.' },
      { title: 'pg_stat_insights Analytics', desc: 'Deep PostgreSQL performance analysis including slow queries, cache hit ratios, table bloat, index usage, replication lag, and optimization recommendations.' },
      { title: 'FastAPI Backend', desc: 'High-performance Python 3.12 backend with 25+ RESTful endpoints, WebSocket support, Pydantic validation, and asyncpg for PostgreSQL connectivity.' },
      { title: 'Alert Management', desc: 'Integrated Alertmanager with configurable routing, grouping, silencing, and notification channels for proactive incident response.' },
      { title: 'Docker Orchestration', desc: '8-service architecture with backend, frontend, website, PostgreSQL, Redis, Prometheus, Grafana, and Alertmanager all orchestrated via Docker Compose.' },
      { title: 'Production Ready', desc: 'Complete with health checks, automatic restarts, volume persistence, network isolation, and comprehensive logging across all services.' },
    ],
  },
  featureMatrix: {
    title: 'Platform Architecture',
    subtitle: 'pgSentinel monitoring and management platform architecture with comprehensive component overview.',
    content: (
    <div className="space-y-8">
      {/* Architecture Diagram */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">pgSentinel Platform Architecture</h3>
        
        <div className="space-y-6">
          {/* Users/Clients Layer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-blue-600/20 border-2 border-blue-500 rounded-lg">
              <Globe className="w-6 h-6 text-blue-300" />
              <span className="text-lg font-semibold text-blue-300">DevOps / SRE / Database Administrators</span>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-500"></div>
          </div>
          
          {/* Frontend Layer */}
          <div className="bg-green-600/10 border-2 border-green-500 rounded-xl p-6">
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold text-green-300">Frontend Dashboard (Port 3000)</h4>
              <p className="text-sm text-slate-400">Next.js 14 + React 18 + TypeScript + Tailwind CSS</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-slate-800/60 border border-green-400 rounded-lg p-4">
                <div className="text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="font-semibold text-green-300">Real-Time Metrics</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • Live Updates<br/>
                    • WebSocket<br/>
                    • Recharts<br/>
                    • Interactive UI
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 border border-cyan-400 rounded-lg p-4">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                  <div className="font-semibold text-cyan-300">Dashboards</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • System Metrics<br/>
                    • Pool Stats<br/>
                    • Node Status<br/>
                    • Custom Charts
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 border border-purple-400 rounded-lg p-4">
                <div className="text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="font-semibold text-purple-300">Node Management</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • Attach/Detach<br/>
                    • Health Check<br/>
                    • Config Editor<br/>
                    • One-Click Ops
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-purple-500"></div>
          </div>
          
          {/* Backend Layer */}
          <div className="bg-purple-600/10 border-2 border-purple-500 rounded-xl p-6">
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold text-purple-300">Backend API (Port 8000)</h4>
              <p className="text-sm text-slate-400">FastAPI + Python 3.12 + Uvicorn + WebSocket</p>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="bg-slate-800/60 border border-blue-400 rounded-lg p-3">
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                  <div className="text-xs font-semibold text-blue-300">REST API</div>
                  <div className="text-xs text-slate-400 mt-1">25+ Endpoints</div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 border border-green-400 rounded-lg p-3">
                <div className="text-center">
                  <Network className="w-6 h-6 mx-auto mb-1 text-green-400" />
                  <div className="text-xs font-semibold text-green-300">WebSocket</div>
                  <div className="text-xs text-slate-400 mt-1">Live Updates</div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 border border-cyan-400 rounded-lg p-3">
                <div className="text-center">
                  <LineChart className="w-6 h-6 mx-auto mb-1 text-cyan-400" />
                  <div className="text-xs font-semibold text-cyan-300">Metrics</div>
                  <div className="text-xs text-slate-400 mt-1">30+ Custom</div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 border border-orange-400 rounded-lg p-3">
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-orange-400" />
                  <div className="text-xs font-semibold text-orange-300">Health</div>
                  <div className="text-xs text-slate-400 mt-1">Auto-Check</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Down - Split into 3 */}
          <div className="flex justify-center gap-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-orange-500"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-red-500"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500"></div>
          </div>
          
          {/* Monitoring Stack Layer */}
          <div className="grid grid-cols-3 gap-4">
            {/* Prometheus */}
            <div className="bg-orange-600/10 border-2 border-orange-500 rounded-xl p-4">
              <div className="text-center">
                <BarChart3 className="w-10 h-10 mx-auto mb-2 text-orange-400" />
                <h5 className="font-bold text-orange-300">Prometheus</h5>
                <div className="text-sm text-slate-400 mt-2">Port 9090</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">●</span>
                    <span className="text-slate-300">30+ Custom Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">●</span>
                    <span className="text-slate-300">PromQL Queries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">●</span>
                    <span className="text-slate-300">Alert Rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">●</span>
                    <span className="text-slate-300">30-Day Retention</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Grafana */}
            <div className="bg-red-600/10 border-2 border-red-500 rounded-xl p-4">
              <div className="text-center">
                <TrendingUp className="w-10 h-10 mx-auto mb-2 text-red-400" />
                <h5 className="font-bold text-red-300">Grafana</h5>
                <div className="text-sm text-slate-400 mt-2">Port 3001</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">●</span>
                    <span className="text-slate-300">2 Dashboards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">●</span>
                    <span className="text-slate-300">22 Panels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">●</span>
                    <span className="text-slate-300">Custom Queries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">●</span>
                    <span className="text-slate-300">Visualization</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alertmanager */}
            <div className="bg-yellow-600/10 border-2 border-yellow-500 rounded-xl p-4">
              <div className="text-center">
                <Bell className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
                <h5 className="font-bold text-yellow-300">Alertmanager</h5>
                <div className="text-sm text-slate-400 mt-2">Port 9093</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">●</span>
                    <span className="text-slate-300">12 Alert Rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">●</span>
                    <span className="text-slate-300">Routing Config</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">●</span>
                    <span className="text-slate-300">Grouping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">●</span>
                    <span className="text-slate-300">Notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-indigo-500"></div>
          </div>
          
          {/* Infrastructure Layer */}
          <div className="grid grid-cols-3 gap-4">
            {/* PostgreSQL */}
            <div className="bg-cyan-600/10 border-2 border-cyan-500 rounded-xl p-4">
              <div className="text-center">
                <Server className="w-10 h-10 mx-auto mb-2 text-cyan-400" />
                <h5 className="font-bold text-cyan-300">PostgreSQL 17</h5>
                <div className="text-sm text-slate-400 mt-2">Metadata Storage</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">●</span>
                    <span className="text-slate-300">Config Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">●</span>
                    <span className="text-slate-300">pg_stat_insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">●</span>
                    <span className="text-slate-300">Query Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Redis */}
            <div className="bg-pink-600/10 border-2 border-pink-500 rounded-xl p-4">
              <div className="text-center">
                <Zap className="w-10 h-10 mx-auto mb-2 text-pink-400" />
                <h5 className="font-bold text-pink-300">Redis 7</h5>
                <div className="text-sm text-slate-400 mt-2">Cache & Sessions</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">●</span>
                    <span className="text-slate-300">Session Cache</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">●</span>
                    <span className="text-slate-300">Data Caching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">●</span>
                    <span className="text-slate-300">Fast Retrieval</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Node Exporter */}
            <div className="bg-indigo-600/10 border-2 border-indigo-500 rounded-xl p-4">
              <div className="text-center">
                <Cpu className="w-10 h-10 mx-auto mb-2 text-indigo-400" />
                <h5 className="font-bold text-indigo-300">Node Exporter</h5>
                <div className="text-sm text-slate-400 mt-2">System Metrics</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">CPU Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Memory Usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Disk I/O</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-green-500"></div>
          </div>
          
          {/* pgbalancer Target */}
          <div className="bg-green-600/10 border-2 border-green-500 rounded-xl p-6">
            <div className="text-center">
              <Server className="w-12 h-12 mx-auto mb-2 text-green-400" />
              <h5 className="text-xl font-bold text-green-300">pgbalancer Cluster</h5>
              <div className="text-sm text-slate-400 mt-2">Connection Pooler & Load Balancer</div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-green-300 mb-1">PostgreSQL Node 1</div>
                  <div className="text-slate-400">Primary (5433)</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-300 mb-1">PostgreSQL Node 2</div>
                  <div className="text-slate-400">Standby (5434)</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-indigo-300 mb-1">PostgreSQL Node 3</div>
                  <div className="text-slate-400">Standby (5435)</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 8 Services Summary */}
          <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-green-900/30 border border-slate-600 rounded-lg p-4">
            <div className="text-center mb-3">
              <h5 className="font-bold text-white">8-Service Docker Architecture</h5>
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="text-center">
                <div className="font-semibold text-green-300 mb-1">✓ Frontend</div>
                <div className="text-slate-400">Next.js:3000</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-300 mb-1">✓ Backend</div>
                <div className="text-slate-400">FastAPI:8000</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-orange-300 mb-1">✓ Prometheus</div>
                <div className="text-slate-400">Metrics:9090</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-300 mb-1">✓ Grafana</div>
                <div className="text-slate-400">Dashboards:3001</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-300 mb-1">✓ Alertmanager</div>
                <div className="text-slate-400">Alerts:9093</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-cyan-300 mb-1">✓ PostgreSQL</div>
                <div className="text-slate-400">Metadata:5432</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-pink-300 mb-1">✓ Redis</div>
                <div className="text-slate-400">Cache:6379</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-indigo-300 mb-1">✓ Node Exporter</div>
                <div className="text-slate-400">System:9100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Component Table */}
      <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Component</th>
          <th className="px-4 py-3 font-semibold text-white">Technology</th>
          <th className="px-4 py-3 font-semibold text-white">Purpose</th>
          <th className="px-4 py-3 font-semibold text-white">Key Features</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">Frontend Dashboard</td>
          <td className="px-4 py-3 text-slate-300">Next.js 14, React 18, TypeScript</td>
          <td className="px-4 py-3 text-slate-300">Real-time monitoring interface</td>
          <td className="px-4 py-3 text-slate-300">Live metrics, WebSocket updates, beautiful UI</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-purple-300">Backend API</td>
          <td className="px-4 py-3 text-slate-300">FastAPI, Python 3.12, asyncpg</td>
          <td className="px-4 py-3 text-slate-300">API server & data aggregation</td>
          <td className="px-4 py-3 text-slate-300">25+ endpoints, WebSocket, Pydantic validation</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-green-300">Prometheus</td>
          <td className="px-4 py-3 text-slate-300">Prometheus 2.x</td>
          <td className="px-4 py-3 text-slate-300">Metrics collection & storage</td>
          <td className="px-4 py-3 text-slate-300">30+ custom metrics, PromQL, alerting</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-orange-300">Grafana</td>
          <td className="px-4 py-3 text-slate-300">Grafana 10.x</td>
          <td className="px-4 py-3 text-slate-300">Professional visualization</td>
          <td className="px-4 py-3 text-slate-300">2 dashboards, 22 panels, custom queries</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">pg_stat_insights</td>
          <td className="px-4 py-3 text-slate-300">PostgreSQL extensions</td>
          <td className="px-4 py-3 text-slate-300">Deep performance analytics</td>
          <td className="px-4 py-3 text-slate-300">Query stats, table/index analysis, recommendations</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-pink-300">Redis Cache</td>
          <td className="px-4 py-3 text-slate-300">Redis 7</td>
          <td className="px-4 py-3 text-slate-300">Session & data caching</td>
          <td className="px-4 py-3 text-slate-300">Fast retrieval, session management</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-yellow-300">Alertmanager</td>
          <td className="px-4 py-3 text-slate-300">Prometheus Alertmanager</td>
          <td className="px-4 py-3 text-slate-300">Alert routing & notification</td>
          <td className="px-4 py-3 text-slate-300">Routing, grouping, silencing</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-indigo-300">Node Exporter</td>
          <td className="px-4 py-3 text-slate-300">Prometheus Node Exporter</td>
          <td className="px-4 py-3 text-slate-300">System metrics collection</td>
          <td className="px-4 py-3 text-slate-300">CPU, memory, disk, network stats</td>
        </tr>
      </tbody>
    </table>
    </div>
    ),
  },
  useCases: [
    {
      title: 'Production Monitoring',
      description: 'Monitor pgbalancer in production with real-time dashboards, alerts, and comprehensive metrics for 24/7 operational visibility.',
      icon: <Server className="w-8 h-8" />,
    },
    {
      title: 'Performance Tuning',
      description: 'Analyze query patterns, identify bottlenecks, and optimize configuration using pg_stat_insights and historical trend analysis.',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: 'Capacity Planning',
      description: 'Use historical metrics and growth trends to plan resource allocation, scale infrastructure, and prevent capacity issues.',
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: 'Incident Response',
      description: 'Quickly identify and diagnose issues with real-time metrics, detailed logs, and automatic alerting for faster resolution.',
      icon: <AlertTriangle className="w-8 h-8" />,
    },
  ],
  codeExamples: [
    {
      title: 'Quick Start with Docker Compose',
      code: `# Clone the repository
git clone https://github.com/pgelephant/pgsentinel.git
cd pgsentinel

# Configure environment
cp env.template .env
# Edit .env with your PostgreSQL connection details

# Start all services
docker-compose up -d

# Access the dashboard
# Dashboard:   http://localhost:3000
# API:         http://localhost:8000/docs
# Grafana:     http://localhost:3001 (admin/admin)
# Prometheus:  http://localhost:9090`,
      language: 'bash',
    },
    {
      title: 'API Usage - Get Dashboard Metrics',
      code: `import requests

# Get dashboard metrics
response = requests.get('http://localhost:8000/api/v1/dashboard')
data = response.json()

print(f"CPU Usage: {data['cpu_usage']}%")
print(f"Memory Usage: {data['memory_usage']}%")
print(f"Active Connections: {data['active_connections']}")
print(f"Pool Utilization: {data['pool_utilization']}%")

# Get pg_stat_insights
insights = requests.get('http://localhost:8000/api/v1/insights/dashboard')
insights_data = insights.json()

print(f"Cache Hit Ratio: {insights_data['cache_hit_ratio']}%")
print(f"Slow Queries: {len(insights_data['slow_queries'])}")`,
      language: 'python',
    },
    {
      title: 'WebSocket Live Updates',
      code: `// Connect to WebSocket for real-time updates
const ws = new WebSocket('ws://localhost:8000/ws/live');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  console.log('Live Update:', {
    timestamp: data.timestamp,
    cpuUsage: data.metrics.cpu_usage,
    memoryUsage: data.metrics.memory_usage,
    connections: data.metrics.active_connections,
    backends: data.backends.length
  });
};

// Updates arrive every 5 seconds
// No polling required!`,
      language: 'javascript',
    },
    {
      title: 'PromQL Queries for Grafana',
      code: `# Query active connections
pgbalancer_active_connections

# Calculate connection rate (per minute)
rate(pgbalancer_total_connections[1m])

# Average pool utilization over 5 minutes
avg_over_time(pgbalancer_pool_utilization[5m])

# Cache hit ratio percentage
pg_cache_hit_ratio * 100

# Count slow queries
increase(pg_slow_queries_total[1h])

# Backend health score
pgbalancer_backend_health{backend="primary"}`,
      language: 'promql',
    },
  ],
  documentation: [
    { title: 'Quick Start Guide', path: '/docs/pgsentinel/getting-started' },
    { title: 'Configuration Reference', path: '/docs/pgsentinel/configuration' },
    { title: 'API Documentation', path: '/docs/pgsentinel/api' },
    { title: 'Metrics Reference', path: '/docs/pgsentinel/metrics' },
    { title: 'Dashboard Guide', path: '/docs/pgsentinel/dashboard' },
    { title: 'Grafana Setup', path: '/docs/pgsentinel/grafana' },
    { title: 'pg_stat_insights', path: '/pg-stat-insights' },
    { title: 'Troubleshooting', path: '/docs/pgsentinel/troubleshooting' },
  ],
  comparison: {
    title: 'Why pgSentinel?',
    description: 'Comprehensive monitoring platform designed specifically for pgbalancer',
    items: [
      {
        feature: 'Real-Time Monitoring',
        pgsentinel: '✅ WebSocket live updates every 5s',
        alternative: '❌ Manual refresh or polling',
      },
      {
        feature: 'Web-Based Dashboard',
        pgsentinel: '✅ Modern React UI with interactive charts',
        alternative: '⚠️ Command-line only or basic HTML',
      },
      {
        feature: 'Prometheus Metrics',
        pgsentinel: '✅ 30+ custom metrics with full PromQL',
        alternative: '⚠️ Limited metrics or manual scraping',
      },
      {
        feature: 'Grafana Integration',
        pgsentinel: '✅ 2 pre-built dashboards, 22 panels',
        alternative: '❌ Manual dashboard creation',
      },
      {
        feature: 'pg_stat_insights',
        pgsentinel: '✅ Built-in deep performance analytics',
        alternative: '❌ Manual query analysis',
      },
      {
        feature: 'REST API',
        pgsentinel: '✅ 25+ endpoints with Swagger docs',
        alternative: '⚠️ Limited or no API',
      },
      {
        feature: 'Docker Deployment',
        pgsentinel: '✅ One-command full stack deployment',
        alternative: '⚠️ Manual service setup',
      },
      {
        feature: 'Alert Management',
        pgsentinel: '✅ Integrated Alertmanager with routing',
        alternative: '❌ No built-in alerting',
      },
    ],
  },
  architecture: (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm">
      <div className="text-center mb-6">
        <div className="text-cyan-400 text-lg font-semibold mb-2">pgSentinel Architecture</div>
        <div className="text-slate-400 text-xs">8-Service Docker Compose Stack</div>
      </div>
      
      <div className="space-y-4">
        {/* Frontend Layer */}
        <div className="border border-blue-500/30 bg-blue-900/10 rounded-lg p-4">
          <div className="text-blue-300 font-semibold mb-2">Frontend Layer</div>
          <div className="pl-4 space-y-1 text-slate-400">
            <div>• Next.js 14 Dashboard (port 3000)</div>
            <div>• Marketing Website (port 3002)</div>
            <div>• WebSocket client for live updates</div>
          </div>
        </div>
        
        {/* Backend Layer */}
        <div className="border border-purple-500/30 bg-purple-900/10 rounded-lg p-4">
          <div className="text-purple-300 font-semibold mb-2">Backend Layer</div>
          <div className="pl-4 space-y-1 text-slate-400">
            <div>• FastAPI + uvicorn (port 8000)</div>
            <div>• WebSocket server for metrics</div>
            <div>• pg_stat_insights integration</div>
          </div>
        </div>
        
        {/* Monitoring Layer */}
        <div className="border border-green-500/30 bg-green-900/10 rounded-lg p-4">
          <div className="text-green-300 font-semibold mb-2">Monitoring Layer</div>
          <div className="pl-4 space-y-1 text-slate-400">
            <div>• Prometheus (port 9090) - Metrics storage</div>
            <div>• Grafana (port 3001) - Visualization</div>
            <div>• Alertmanager (port 9093) - Alerts</div>
            <div>• Node Exporter (port 9100) - System metrics</div>
          </div>
        </div>
        
        {/* Data Layer */}
        <div className="border border-orange-500/30 bg-orange-900/10 rounded-lg p-4">
          <div className="text-orange-300 font-semibold mb-2">Data Layer</div>
          <div className="pl-4 space-y-1 text-slate-400">
            <div>• PostgreSQL (port 5432) - Primary database</div>
            <div>• Redis (port 6379) - Cache & sessions</div>
            <div>• pg_stat_statements extension</div>
          </div>
        </div>
        
        <div className="text-center text-slate-500 text-xs pt-2">
          All services orchestrated via Docker Compose with automatic health checks
        </div>
      </div>
    </div>
  ),
  performance: {
    kicker: 'Built for Scale',
    metrics: [
      { label: 'Metric Collection Interval', value: '5 seconds', color: 'text-blue-400' },
      { label: 'WebSocket Update Frequency', value: '5 seconds', color: 'text-green-400' },
      { label: 'API Response Time', value: '<50ms', color: 'text-cyan-400' },
      { label: 'Prometheus Metrics', value: '30+', color: 'text-purple-400' },
      { label: 'Grafana Panels', value: '22', color: 'text-orange-400' },
      { label: 'Docker Services', value: '8', color: 'text-pink-400' },
    ],
  },
  installation: {
    title: 'Get Started in Minutes',
    description: 'Deploy the complete monitoring stack with a single command',
    steps: [
      'Clone the pgSentinel repository',
      'Configure environment variables (.env)',
      'Run docker-compose up -d',
      'Access dashboard at http://localhost:3000',
      'Login to Grafana at http://localhost:3001',
      'Explore API at http://localhost:8000/docs',
    ],
  },
  ctaSection: {
    kicker: 'Get Started',
    title: 'Monitor Your pgbalancer Clusters',
    description: 'Deploy pgSentinel and gain real-time visibility into your PostgreSQL connection pooling infrastructure with professional dashboards and comprehensive analytics.',
    primaryCTA: { href: '/docs/pgsentinel/getting-started', label: 'View Documentation' },
    secondaryCTA: { href: 'https://github.com/pgElephant/pgSentinel', label: 'View on GitHub', external: true },
  },
};

export default function PgSentinelPage() {
  return <ProductPageTemplate {...pgSentinelConfig} />;
}

