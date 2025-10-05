'use client'

import React from 'react'
import { Server, Database, Network, Shield, Zap, Activity } from 'lucide-react'
import Image from 'next/image'

const RamArchitecturePage = () => {
  const components = [
    {
      title: 'RAM Controller (ramctrl)',
      description: 'Central management daemon that orchestrates cluster operations and monitors node health.',
      icon: <Server className="w-6 h-6" />,
      features: ['Cluster management', 'Health monitoring', 'Failover coordination', 'Configuration management']
    },
    {
      title: 'RAM Daemon (ramd)',
      description: 'Node-specific daemon that manages local PostgreSQL instances and reports status.',
      icon: <Database className="w-6 h-6" />,
      features: ['PostgreSQL management', 'Status reporting', 'Local operations', 'Health checks']
    },
    {
      title: 'Network Layer',
      description: 'High-performance networking for inter-node communication and data replication.',
      icon: <Network className="w-6 h-6" />,
      features: ['Inter-node communication', 'Data replication', 'Heartbeat monitoring', 'Load balancing']
    },
    {
      title: 'Consensus Engine',
      description: 'Raft-based consensus protocol ensuring cluster consistency and leader election.',
      icon: <Shield className="w-6 h-6" />,
      features: ['Leader election', 'Log replication', 'Split-brain prevention', 'Consistency guarantees']
    }
  ]

  const architectureFeatures = [
    {
      title: 'High Availability',
      description: 'Automatic failover with sub-second detection and recovery.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Real-time Monitoring',
      description: 'Comprehensive metrics and health monitoring for all cluster components.',
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: 'Enterprise Security',
      description: 'Token-based authentication, SSL/TLS encryption, and rate limiting.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Cloud Native',
      description: 'Docker, Kubernetes, and Helm chart support for modern deployments.',
      icon: <Server className="w-6 h-6" />
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
                  src="/ico/RAM_HD.ico"
                  alt="RAM icon"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2 font-light">
                  RAM Architecture
                </h1>
                <p className="text-xl text-white/80">
                  Resilient Adaptive Manager system design
                </p>
              </div>
            </div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Learn about RAM's distributed architecture, components, and how they work together to provide high availability.
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

      {/* Architecture Diagram */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-white mb-6">
              Cluster Architecture
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              RAM implements a distributed architecture with multiple nodes working together to provide high availability and automatic failover.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Primary Node</h3>
                  <p className="text-white/70 text-sm">
                    Active PostgreSQL instance handling read/write operations
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Standby Nodes</h3>
                  <p className="text-white/70 text-sm">
                    Replica instances ready for failover and read scaling
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Consensus Layer</h3>
                  <p className="text-white/70 text-sm">
                    Raft protocol ensuring consistency and coordination
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RamArchitecturePage
