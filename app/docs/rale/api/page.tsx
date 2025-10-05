'use client'

import React from 'react'
import { Code, Database, Network, Shield, Zap, Activity } from 'lucide-react'
import Image from 'next/image'

const RaleApiPage = () => {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/cluster/status',
      description: 'Get current cluster status and node information',
      example: 'GET /api/v1/cluster/status'
    },
    {
      method: 'POST',
      path: '/api/v1/cluster/join',
      description: 'Join a new node to the cluster',
      example: 'POST /api/v1/cluster/join {"node_id": "node3", "address": "192.168.1.10:8080"}'
    },
    {
      method: 'DELETE',
      path: '/api/v1/cluster/nodes/{node_id}',
      description: 'Remove a node from the cluster',
      example: 'DELETE /api/v1/cluster/nodes/node3'
    },
    {
      method: 'GET',
      path: '/api/v1/consensus/leader',
      description: 'Get current leader node information',
      example: 'GET /api/v1/consensus/leader'
    },
    {
      method: 'POST',
      path: '/api/v1/consensus/propose',
      description: 'Propose a new consensus value',
      example: 'POST /api/v1/consensus/propose {"value": "configuration_update"}'
    },
    {
      method: 'GET',
      path: '/api/v1/logs/{node_id}',
      description: 'Get consensus log entries for a specific node',
      example: 'GET /api/v1/logs/node1'
    }
  ]

  const features = [
    {
      title: 'Cluster Management',
      description: 'Complete cluster lifecycle management with dynamic node membership.',
      icon: <Network className="w-6 h-6" />
    },
    {
      title: 'Consensus API',
      description: 'Raft-based consensus protocol with leader election and log replication.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Database Integration',
      description: 'Seamless PostgreSQL integration with ACID transaction support.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'High Performance',
      description: 'Optimized for low-latency consensus operations and high throughput.',
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const consensusOperations = [
    {
      operation: 'Leader Election',
      description: 'Automatic leader election when the current leader fails or becomes unavailable.',
      endpoint: 'GET /api/v1/consensus/leader'
    },
    {
      operation: 'Log Replication',
      description: 'Replicate consensus decisions across all cluster nodes for consistency.',
      endpoint: 'POST /api/v1/consensus/propose'
    },
    {
      operation: 'State Synchronization',
      description: 'Synchronize cluster state across all nodes to maintain consistency.',
      endpoint: 'GET /api/v1/cluster/status'
    },
    {
      operation: 'Node Membership',
      description: 'Dynamic addition and removal of nodes from the cluster.',
      endpoint: 'POST /api/v1/cluster/join'
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
                  RALE API Reference
                </h1>
                <p className="text-xl text-white/80">
                  Distributed consensus engine API
                </p>
              </div>
            </div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Complete API reference for RALE's distributed consensus engine and cluster management interface.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/5 backdrop-blur-sm py-16">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-white mb-12 text-center">API Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
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

      {/* API Endpoints */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-slate-900 mb-12 text-center">API Endpoints</h2>
            
            <div className="space-y-6">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-slate-900 font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <code className="text-sm">
                      {endpoint.example}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Consensus Operations */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-white mb-12 text-center">Consensus Operations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {consensusOperations.map((operation, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {operation.operation}
                      </h3>
                      <p className="text-white/70 mb-4">
                        {operation.description}
                      </p>
                      <code className="text-white/90 text-sm bg-white/10 px-2 py-1 rounded">
                        {operation.endpoint}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PostgreSQL Integration */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-slate-900 mb-6">
              PostgreSQL Integration
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              RALE seamlessly integrates with PostgreSQL to provide persistent storage and ACID transaction support for consensus operations.
            </p>
            
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-slate-700 mr-3" />
                <h3 className="text-xl text-slate-900 font-semibold">Database Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-slate-900 font-semibold mb-3">Consensus Storage</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Log entry persistence</li>
                    <li>• State snapshots</li>
                    <li>• Node membership records</li>
                    <li>• Configuration storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-slate-900 font-semibold mb-3">Transaction Support</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• ACID compliance</li>
                    <li>• Multi-node coordination</li>
                    <li>• Rollback capabilities</li>
                    <li>• Consistency guarantees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaleApiPage
