'use client'

import React from 'react'
import { Database, Network, Shield, Zap, Activity, Globe } from 'lucide-react'
import Image from 'next/image'

const RaleArchitecturePage = () => {
  const components = [
    {
      title: 'RALE Daemon (raled)',
      description: 'Core consensus engine that manages distributed state and coordinates cluster operations.',
      icon: <Database className="w-6 h-6" />,
      features: ['Consensus protocol', 'State management', 'Leader election', 'Log replication']
    },
    {
      title: 'RALE Controller (ralectrl)',
      description: 'Management interface for cluster administration and monitoring operations.',
      icon: <Network className="w-6 h-6" />,
      features: ['Cluster management', 'Configuration', 'Monitoring', 'Health checks']
    },
    {
      title: 'Database Integration',
      description: 'PostgreSQL integration layer for persistent storage and transaction coordination.',
      icon: <Shield className="w-6 h-6" />,
      features: ['PostgreSQL backend', 'ACID compliance', 'Transaction coordination', 'Data persistence']
    },
    {
      title: 'Network Layer',
      description: 'High-performance networking for inter-node communication and consensus.',
      icon: <Globe className="w-6 h-6" />,
      features: ['Inter-node communication', 'Consensus messaging', 'Heartbeat monitoring', 'Fault tolerance']
    }
  ]

  const architectureFeatures = [
    {
      title: 'Distributed Consensus',
      description: 'Raft-based consensus protocol ensuring cluster consistency and coordination.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Real-time Monitoring',
      description: 'Comprehensive monitoring and health checks for all cluster components.',
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: 'Database Integration',
      description: 'Seamless PostgreSQL integration with ACID transaction support.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'High Availability',
      description: 'Automatic failover and recovery with minimal downtime.',
      icon: <Shield className="w-6 h-6" />
    }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6 border border-white/20">
                <Image
                  src="/ico/RALE_HD.ico"
                  alt="RALE icon"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2 font-light">
                  RALE Architecture
                </h1>
                <p className="text-xl text-white/80">
                  Distributed Consensus Engine design
                </p>
              </div>
            </div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Learn about RALE's distributed consensus architecture, components, and PostgreSQL integration.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Features */}
      <div className="bg-white/5 backdrop-blur-sm py-16">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-white mb-12 text-center">Architecture Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {architectureFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Components */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-slate-900 mb-12 text-center">System Components</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {components.map((component, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      {component.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {component.title}
                      </h3>
                      <p className="text-slate-600">
                        {component.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {component.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span className="text-slate-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Consensus Architecture */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-white mb-6">
              Consensus Architecture
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              RALE implements a distributed consensus protocol that ensures consistency and coordination across all cluster nodes.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Leader Node</h3>
                  <p className="text-white/70 text-sm">
                    Coordinates consensus decisions and manages cluster state
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Follower Nodes</h3>
                  <p className="text-white/70 text-sm">
                    Participate in consensus and maintain replica state
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">PostgreSQL Backend</h3>
                  <p className="text-white/70 text-sm">
                    Persistent storage with ACID transaction guarantees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Benefits */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-slate-900 mb-12 text-center">PostgreSQL Integration Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">ACID Compliance</h3>
                <p className="text-slate-600 mb-4">
                  RALE leverages PostgreSQL's proven ACID transaction model to ensure data consistency and reliability.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Atomic operations across all nodes</li>
                  <li>• Consistent state replication</li>
                  <li>• Isolation of concurrent operations</li>
                  <li>• Durable storage guarantees</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">High Performance</h3>
                <p className="text-slate-600 mb-4">
                  Optimized for high-throughput consensus operations with minimal latency overhead.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Sub-millisecond consensus decisions</li>
                  <li>• Optimized network protocols</li>
                  <li>• Efficient state synchronization</li>
                  <li>• Minimal resource overhead</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaleArchitecturePage
