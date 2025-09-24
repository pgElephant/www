'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Users, Settings, BarChart3, GitBranch, Crown, Wifi, RefreshCw, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const PrometheusPage = () => {
  const [metrics, setMetrics] = useState({
    clusterHealth: 'healthy',
    activeNodes: 3,
    totalNodes: 3,
    leaderElectionTime: '0.2s',
    replicationLag: '0.5ms',
    failoverCount: 0,
    uptime: '7d 12h 34m',
    lastBackup: '2h ago',
    memoryUsage: 45,
    cpuUsage: 23,
    diskUsage: 67
  })

  const [refreshInterval, setRefreshInterval] = useState(5000)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Simulate real-time metrics updates
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        replicationLag: `${(Math.random() * 2).toFixed(1)}ms`,
        memoryUsage: Math.max(20, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(5, Math.min(50, prev.cpuUsage + (Math.random() - 0.5) * 3)),
        leaderElectionTime: `${(Math.random() * 0.5 + 0.1).toFixed(1)}s`
      }))
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-red-600'
    if (usage > 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const nodes = [
    { id: 1, name: 'ram-node-1', role: 'Leader', status: 'healthy', port: '7400', lastSeen: '2s ago' },
    { id: 2, name: 'ram-node-2', role: 'Follower', status: 'healthy', port: '7400', lastSeen: '1s ago' },
    { id: 3, name: 'ram-node-3', role: 'Follower', status: 'healthy', port: '7400', lastSeen: '3s ago' }
  ]

  const postgresNodes = [
    { id: 1, name: 'postgres-primary', role: 'Primary', status: 'healthy', port: '5432', lastSeen: '1s ago' },
    { id: 2, name: 'postgres-standby-1', role: 'Standby', status: 'healthy', port: '5432', lastSeen: '2s ago' },
    { id: 3, name: 'postgres-standby-2', role: 'Standby', status: 'healthy', port: '5432', lastSeen: '1s ago' }
  ]

  return (
    <div className="pt-16">
      {/* Header with gradient background */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="container-wide py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                  RAM Prometheus
                </h1>
                <p className="text-xl text-gray-300">
                  Real-time Monitoring & Metrics
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Monitor your RAM PostgreSQL cluster with comprehensive metrics and dashboards.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Auto Refresh:</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    autoRefresh 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {autoRefresh ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Interval:</label>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-xs"
                >
                  <option value={1000}>1s</option>
                  <option value={5000}>5s</option>
                  <option value={10000}>10s</option>
                  <option value={30000}>30s</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white py-12">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-8 text-center">
              Cluster Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getHealthIcon(metrics.clusterHealth)}
                    <span className="ml-2 text-sm font-medium text-green-800">Cluster Health</span>
                  </div>
                  <span className={`text-lg font-bold ${getHealthColor(metrics.clusterHealth)}`}>
                    {metrics.clusterHealth.toUpperCase()}
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {metrics.activeNodes}/{metrics.totalNodes} Nodes
                </div>
                <div className="text-sm text-green-700">
                  Active
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Crown className="w-5 h-5 text-blue-600" />
                    <span className="ml-2 text-sm font-medium text-blue-800">Leader Election</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {metrics.leaderElectionTime}
                </div>
                <div className="text-sm text-blue-700">
                  Last Election
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 text-purple-600" />
                    <span className="ml-2 text-sm font-medium text-purple-800">Replication Lag</span>
                  </div>
                  <TrendingDown className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {metrics.replicationLag}
                </div>
                <div className="text-sm text-purple-700">
                  Average
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span className="ml-2 text-sm font-medium text-orange-800">Failovers</span>
                  </div>
                  <span className="text-lg font-bold text-orange-900">
                    {metrics.failoverCount}
                  </span>
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {metrics.uptime}
                </div>
                <div className="text-sm text-orange-700">
                  Uptime
                </div>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Memory Usage</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">RAM Daemon</span>
                  <span className={`text-sm font-medium ${getUsageColor(metrics.memoryUsage)}`}>
                    {metrics.memoryUsage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.memoryUsage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU Usage</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">System Load</span>
                  <span className={`text-sm font-medium ${getUsageColor(metrics.cpuUsage)}`}>
                    {metrics.cpuUsage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.cpuUsage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Disk Usage</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Data Volume</span>
                  <span className={`text-sm font-medium ${getUsageColor(metrics.diskUsage)}`}>
                    {metrics.diskUsage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.diskUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Status */}
      <div className="bg-gray-50 py-12">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RAM Nodes */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Server className="w-5 h-5 mr-2 text-cyan-600" />
                  RAM Daemon Nodes
                </h3>
                <div className="space-y-4">
                  {nodes.map((node) => (
                    <div key={node.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          node.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{node.name}</div>
                          <div className="text-sm text-gray-600">{node.role} • Port {node.port}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{node.status}</div>
                        <div className="text-xs text-gray-500">{node.lastSeen}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PostgreSQL Nodes */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-teal-600" />
                  PostgreSQL Nodes
                </h3>
                <div className="space-y-4">
                  {postgresNodes.map((node) => (
                    <div key={node.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          node.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{node.name}</div>
                          <div className="text-sm text-gray-600">{node.role} • Port {node.port}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{node.status}</div>
                        <div className="text-xs text-gray-500">{node.lastSeen}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prometheus Integration */}
      <div className="bg-white py-12">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-8 text-center">
              Prometheus Integration
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900">Metrics Endpoint</h3>
                </div>
                <p className="text-sm text-blue-800 mb-4">
                  Access RAM metrics via Prometheus-compatible endpoint.
                </p>
                <div className="bg-white rounded-lg p-3 mb-4">
                  <code className="text-xs text-blue-900">
                    http://localhost:7400/metrics
                  </code>
                </div>
                <Link
                  href="/docs/ram/prometheus"
                  className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900"
                >
                  Documentation
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Activity className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">Grafana Dashboards</h3>
                </div>
                <p className="text-sm text-green-800 mb-4">
                  Pre-built dashboards for comprehensive monitoring.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-green-900">RAM Cluster Overview</span>
                  </div>
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-green-900">PostgreSQL Performance</span>
                  </div>
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-green-900">Failover Events</span>
                  </div>
                </div>
                <Link
                  href="/docs/ram/grafana"
                  className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                >
                  Setup Guide
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-purple-900">Alerting Rules</h3>
                </div>
                <p className="text-sm text-purple-800 mb-4">
                  Configure alerts for critical events and thresholds.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-purple-900">High Replication Lag</span>
                  </div>
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-purple-900">Node Failure</span>
                  </div>
                  <div className="bg-white rounded p-2">
                    <span className="text-xs text-purple-900">Disk Space Low</span>
                  </div>
                </div>
                <Link
                  href="/docs/ram/alerts"
                  className="inline-flex items-center text-sm text-purple-700 hover:text-purple-900"
                >
                  Configuration
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-gray-900 mb-6">
              Get Started with RAM Monitoring
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Set up comprehensive monitoring for your RAM PostgreSQL cluster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/ram/prometheus"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-200 shadow-lg text-white"
                style={{ backgroundColor: palette.cyan }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </Link>
              <Link
                href="/docs/ram/grafana"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-gray-700 px-8 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                Grafana Setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrometheusPage
