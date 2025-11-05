'use client'

import React from 'react'
import { Code, Database, Globe, Shield, Zap } from 'lucide-react'
import Image from 'next/image'

const FauxDbApiPage = () => {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/databases',
      description: 'List all databases',
      example: 'GET /api/v1/databases'
    },
    {
      method: 'POST',
      path: '/api/v1/databases',
      description: 'Create a new database',
      example: 'POST /api/v1/databases {"name": "mydb"}'
    },
    {
      method: 'GET',
      path: '/api/v1/databases/{db}/collections',
      description: 'List collections in a database',
      example: 'GET /api/v1/databases/mydb/collections'
    },
    {
      method: 'POST',
      path: '/api/v1/databases/{db}/collections',
      description: 'Create a new collection',
      example: 'POST /api/v1/databases/mydb/collections {"name": "users"}'
    },
    {
      method: 'GET',
      path: '/api/v1/databases/{db}/collections/{collection}/documents',
      description: 'Query documents in a collection',
      example: 'GET /api/v1/databases/mydb/collections/users/documents'
    },
    {
      method: 'POST',
      path: '/api/v1/databases/{db}/collections/{collection}/documents',
      description: 'Insert a new document',
      example: 'POST /api/v1/databases/mydb/collections/users/documents {"name": "John", "email": "john@example.com"}'
    }
  ]

  const features = [
    {
      title: 'MongoDB Compatible',
      description: 'Full MongoDB wire protocol compatibility with existing drivers and tools.',
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: 'RESTful API',
      description: 'Modern REST API for programmatic access and integration.',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'ACID Transactions',
      description: 'Multi-document ACID transactions with PostgreSQL backend.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'High Performance',
      description: 'Optimized for high-throughput workloads with connection pooling.',
      icon: <Zap className="w-6 h-6" />
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
                  src="/ico/FauxDB_HD.ico"
                  alt="FauxDB icon"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  unoptimized
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2 font-light">
                  FauxDB API Reference
                </h1>
                <p className="text-xl text-white/80">
                  MongoDB-compatible API documentation
                </p>
              </div>
            </div>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Complete API reference for FauxDB's MongoDB-compatible interface and REST endpoints.
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
                <div key={index} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
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
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-sm">
                        {endpoint.example}
                      </code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MongoDB Compatibility */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-white mb-6">
              MongoDB Wire Protocol Compatibility
            </h2>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              FauxDB implements the MongoDB wire protocol, ensuring compatibility with existing MongoDB drivers, tools, and applications.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-white mr-3" />
                <h3 className="text-xl text-white font-semibold">Supported Operations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-white font-semibold mb-3">CRUD Operations</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• insertOne, insertMany</li>
                    <li>• findOne, find</li>
                    <li>• updateOne, updateMany</li>
                    <li>• deleteOne, deleteMany</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Advanced Features</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Aggregation pipelines</li>
                    <li>• Geospatial queries</li>
                    <li>• ACID transactions</li>
                    <li>• Indexing support</li>
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

export default FauxDbApiPage
