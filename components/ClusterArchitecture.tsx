'use client'

import React from 'react'
import { 
  Database, 
  Server, 
  Activity, 
  Eye, 
  BarChart3,
  Network,
  ArrowRightLeft,
  Monitor,
  Cpu,
  HardDrive,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

const ClusterArchitecture = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 font-semibold text-sm">Enterprise Cluster Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Complete PostgreSQL HA Solution
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Production-ready high availability cluster with 3 pgbalancer nodes, 9 PostgreSQL databases (3 primaries + 6 replicas), 
            unified monitoring via pgSentinel, and comprehensive performance analytics with pg_stat_insights
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          
          {/* pgSentinel - Central Monitoring */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Monitor className="w-12 h-12 text-purple-400" />
                    <Eye className="w-6 h-6 text-green-400 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">pgSentinel</h3>
                    <p className="text-slate-300 text-sm">Unified Cluster Monitoring & Management</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600">
                    <div className="text-xs text-slate-400 mb-1">Dashboard</div>
                    <div className="text-green-400 font-semibold">:3000</div>
                  </div>
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600">
                    <div className="text-xs text-slate-400 mb-1">Grafana</div>
                    <div className="text-blue-400 font-semibold">:3001</div>
                  </div>
                  <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600">
                    <div className="text-xs text-slate-400 mb-1">Prometheus</div>
                    <div className="text-orange-400 font-semibold">:9090</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                <div className="bg-slate-800/30 px-3 py-2 rounded border border-slate-600/30 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-slate-300">Real-time Metrics</span>
                </div>
                <div className="bg-slate-800/30 px-3 py-2 rounded border border-slate-600/30 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-300">Performance Analytics</span>
                </div>
                <div className="bg-slate-800/30 px-3 py-2 rounded border border-slate-600/30 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-300">Health Monitoring</span>
                </div>
                <div className="bg-slate-800/30 px-3 py-2 rounded border border-slate-600/30 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-300">Alerts & Insights</span>
                </div>
              </div>
            </div>
          </div>

          {/* MQTT Connection Indicator */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg px-6 py-3 flex items-center gap-3">
              <Network className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-sm text-slate-300">MQTT Cluster Coordination Bus</span>
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>

          {/* pgbalancer Nodes Layer */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((balancerNum) => (
              <div key={balancerNum} className="relative">
                {/* Connection lines between balancers */}
                {balancerNum < 3 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <ArrowRightLeft className="w-6 h-6 text-cyan-400" />
                  </div>
                )}
                
                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-xl p-4 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Server className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">pgbalancer-{balancerNum}</h4>
                      <p className="text-xs text-slate-400">Connection Pool + Load Balancer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="bg-slate-800/50 px-3 py-1.5 rounded text-xs flex items-center justify-between border border-slate-600/50">
                      <span className="text-slate-400">API:</span>
                      <span className="text-cyan-400 font-mono">:808{balancerNum}</span>
                    </div>
                    <div className="bg-slate-800/50 px-3 py-1.5 rounded text-xs flex items-center justify-between border border-slate-600/50">
                      <span className="text-slate-400">Pool:</span>
                      <span className="text-green-400 font-mono">543{balancerNum}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="bg-green-900/30 border border-green-500/30 px-2 py-1 rounded text-xs text-green-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      AI Engine
                    </div>
                    <div className="bg-cyan-900/30 border border-cyan-500/30 px-2 py-1 rounded text-xs text-cyan-400 flex items-center gap-1">
                      <Network className="w-3 h-3" />
                      MQTT
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection indicators */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
                  <div className="h-8 w-0.5 bg-gradient-to-b from-green-500 to-purple-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* PostgreSQL Clusters Layer */}
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((clusterNum) => (
              <div key={clusterNum} className="bg-slate-800/30 border border-slate-600/50 rounded-xl p-4">
                <div className="text-center mb-4">
                  <h4 className="text-white font-bold mb-1">Cluster {clusterNum}</h4>
                  <p className="text-xs text-slate-400">1 Primary + 2 Replicas</p>
                </div>

                {/* Primary Database */}
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white font-semibold text-sm">pg-primary-{clusterNum}</div>
                        <div className="text-xs text-green-400">PRIMARY • Read/Write</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded p-2 mb-2 border border-slate-600/50">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">Port:</span>
                        <span className="text-slate-300 font-mono">543{clusterNum}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Status:</span>
                        <span className="text-green-400 font-semibold">● HEALTHY</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded px-2 py-1.5">
                      <BarChart3 className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-300">pg_stat_insights</span>
                    </div>
                  </div>
                </div>

                {/* Replica Databases */}
                <div className="space-y-3">
                  {[1, 2].map((replicaNum) => (
                    <div key={replicaNum} className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-white font-medium text-xs">pg-replica-{clusterNum}-{replicaNum}</div>
                          <div className="text-xs text-blue-400">REPLICA • Read Only</div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900/50 rounded p-1.5 mb-2 border border-slate-600/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Lag:</span>
                          <span className="text-green-400 font-mono">0.{replicaNum}s</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-purple-900/20 border border-purple-500/20 rounded px-2 py-1">
                        <BarChart3 className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-purple-300">pg_stat_insights</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs text-slate-400">Active/Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400">MQTT Cluster Link</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400">Performance Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400">Network Connection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-2">High Availability</h3>
            <p className="text-slate-400 text-sm">
              Zero downtime with automatic failover. 3 pgbalancer nodes ensure continuous service even during maintenance or failures.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Unified Monitoring</h3>
            <p className="text-slate-400 text-sm">
              Single pgSentinel instance monitors entire cluster with Grafana dashboards, Prometheus metrics, and real-time alerts.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Smart Load Balancing</h3>
            <p className="text-slate-400 text-sm">
              AI-powered query routing across 9 databases with pg_stat_insights analytics for optimal performance tuning.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-slate-700/50 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-sm text-slate-400">pgbalancer Nodes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">3</div>
              <div className="text-sm text-slate-400">Primary Databases</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">6</div>
              <div className="text-sm text-slate-400">Read Replicas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">9</div>
              <div className="text-sm text-slate-400">pg_stat_insights</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">1</div>
              <div className="text-sm text-slate-400">pgSentinel Monitor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClusterArchitecture

