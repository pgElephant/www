'use client'

import React from 'react'
import { Check, X, Minus, Database, Zap, Shield, Globe, Settings, Crown, Terminal, Code, Server, Users, Lock } from 'lucide-react'

const ProjectComparison = () => {
  const features = [
    {
      feature: 'Core Purpose',
      ramd: 'In-memory database',
      fauxdb: 'Mock database for testing',
      pgraft: 'PostgreSQL Raft consensus',
      showIcon: false
    },
    {
      feature: 'Consensus Protocol',
      ramd: 'None (single node)',
      fauxdb: 'None (testing only)',
      pgraft: 'Raft consensus',
      showIcon: true
    },
    {
      feature: 'Leader Election',
      ramd: '❌',
      fauxdb: '❌',
      pgraft: '✅ Automatic',
      showIcon: true
    },
    {
      feature: 'Fault Tolerance',
      ramd: '❌',
      fauxdb: '❌',
      pgraft: '✅ Multi-node',
      showIcon: true
    },
    {
      feature: 'Data Persistence',
      ramd: '❌ In-memory only',
      fauxdb: '❌ Temporary',
      pgraft: '✅ PostgreSQL storage',
      showIcon: true
    },
    {
      feature: 'Replication',
      ramd: '❌',
      fauxdb: '❌',
      pgraft: '✅ Log replication',
      showIcon: true
    },
    {
      feature: 'Configuration Management',
      ramd: 'Basic',
      fauxdb: 'Test configs',
      pgraft: '✅ Dynamic node addition/removal',
      showIcon: true
    },
    {
      feature: 'Network Communication',
      ramd: 'None',
      fauxdb: 'None',
      pgraft: '✅ TCP-based peer communication',
      showIcon: true
    },
    {
      feature: 'Shared Memory',
      ramd: 'Basic',
      fauxdb: 'None',
      pgraft: '✅ Command queue system',
      showIcon: true
    },
    {
      feature: 'Background Workers',
      ramd: 'None',
      fauxdb: 'None',
      pgraft: '✅ PostgreSQL background workers',
      showIcon: true
    },
    {
      feature: 'SQL Compatibility',
      ramd: 'Custom syntax',
      fauxdb: 'SQL-like',
      pgraft: '✅ Full PostgreSQL SQL',
      showIcon: true
    },
    {
      feature: 'Transaction Support',
      ramd: 'Limited',
      fauxdb: 'Basic',
      pgraft: '✅ ACID compliance',
      showIcon: true
    },
    {
      feature: 'Backup & Recovery',
      ramd: '❌',
      fauxdb: '❌',
      pgraft: '✅ Snapshot support',
      showIcon: true
    },
    {
      feature: 'Monitoring',
      ramd: 'Basic logs',
      fauxdb: 'Test output',
      pgraft: '✅ Comprehensive logging',
      showIcon: true
    },
    {
      feature: 'Performance',
      ramd: 'High (in-memory)',
      fauxdb: 'Fast (testing)',
      pgraft: 'Production-ready',
      showIcon: false
    },
    {
      feature: 'Production Use',
      ramd: '❌',
      fauxdb: '❌',
      pgraft: '✅ Enterprise-ready',
      showIcon: true
    },
    {
      feature: 'Setup Complexity',
      ramd: 'Simple',
      fauxdb: 'Very Simple',
      pgraft: 'Moderate',
      showIcon: false
    },
    {
      feature: 'Memory Usage',
      ramd: 'High',
      fauxdb: 'Low',
      pgraft: 'Configurable',
      showIcon: false
    },
    {
      feature: 'Scalability',
      ramd: 'Single node',
      fauxdb: 'Testing only',
      pgraft: 'Multi-node cluster',
      showIcon: false
    },
    {
      feature: 'Documentation',
      ramd: 'Basic',
      fauxdb: 'Minimal',
      pgraft: 'Comprehensive',
      showIcon: false
    },
    {
      feature: 'License',
      ramd: 'Open source',
      fauxdb: 'Open source',
      pgraft: 'Open source',
      showIcon: false
    },
    {
      feature: 'Community Support',
      ramd: 'Limited',
      fauxdb: 'Testing focused',
      pgraft: 'Active development',
      showIcon: false
    }
  ]

  const getFeatureIcon = (value: string) => {
    if (value.includes('✅') || value.includes('Raft consensus') || value.includes('Full PostgreSQL') || 
        value.includes('ACID') || value.includes('Enterprise-ready') || value.includes('Comprehensive')) {
      return <Check className="w-5 h-5 text-green-400" />
    } else if (value.includes('❌') || value.includes('None') || value.includes('Limited') || 
               value.includes('Basic') || value.includes('Custom syntax') || value.includes('Testing only')) {
      return <X className="w-5 h-5 text-red-400" />
    } else {
      return <Minus className="w-5 h-5 text-slate-400" />
    }
  }

  const getFeatureDisplay = (value: string, showIcon: boolean) => {
    if (showIcon) {
      return getFeatureIcon(value)
    } else {
      return (
        <span className="text-sm font-medium text-slate-300">
          {value}
        </span>
      )
    }
  }

  return (
    <section id="project-comparison" className="section-padding bg-gradient-to-br from-neutral-800 via-neutral-700 to-primary-700 relative overflow-hidden">
      <div className="container-wide">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-400/15 to-secondary-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary-400/15 to-primary-400/15 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm border border-primary-300/30 rounded-full text-sm font-semibold text-primary-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
            Project Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">
              pgelephant
            </span>
            <br />
            <span className="text-blue-300">
              Project Suite
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Compare RAMD, FauxDB, and pgraft - three complementary solutions for different database needs.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden relative z-10">
          {/* Mobile scrollable wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-sm md:text-lg font-semibold text-white">Feature</div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2 text-yellow-400" />
                      <span className="font-bold text-sm md:text-lg text-white">RAMD</span>
                    </div>
                    <div className="text-yellow-400 text-xs md:text-sm font-medium">In-Memory DB</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Code className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2 text-orange-400" />
                      <span className="font-bold text-sm md:text-lg text-white">FauxDB</span>
                    </div>
                    <div className="text-orange-400 text-xs md:text-sm font-medium">Mock Database</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Crown className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2 text-green-400" />
                      <span className="font-bold text-sm md:text-lg text-white">pgraft</span>
                    </div>
                    <div className="text-green-400 text-xs md:text-sm font-medium">Consensus Engine</div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-400/30">
                {features.map((feature) => (
                  <div
                    key={feature.feature}
                    className="grid grid-cols-4 gap-4 p-3 md:p-4 lg:p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="font-medium text-white flex items-center text-sm md:text-base">
                      {feature.feature}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {getFeatureDisplay(feature.ramd, feature.showIcon)}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {getFeatureDisplay(feature.fauxdb, feature.showIcon)}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {getFeatureDisplay(feature.pgraft, feature.showIcon)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mt-20 relative z-10">
          <h3 className="text-3xl font-bold text-center mb-4 text-white">
            When to Use Each Solution
          </h3>
          <p className="text-lg text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Each project serves a specific purpose in the database ecosystem
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* RAMD */}
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="font-bold text-white mb-2">RAMD</h4>
                <p className="text-sm text-slate-300 mb-4">High-performance in-memory database</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Development & testing</li>
                  <li>• Cache layer</li>
                  <li>• Real-time analytics</li>
                  <li>• Prototype applications</li>
                </ul>
              </div>
            </div>

            {/* FauxDB */}
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-400/30">
                  <Code className="w-8 h-8 text-orange-400" />
                </div>
                <h4 className="font-bold text-white mb-2">FauxDB</h4>
                <p className="text-sm text-slate-300 mb-4">MongoDB-compatible mock database</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Unit testing</li>
                  <li>• CI/CD pipelines</li>
                  <li>• Development mocking</li>
                  <li>• MongoDB migration testing</li>
                </ul>
              </div>
            </div>

            {/* pgraft */}
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                  <Crown className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-bold text-white mb-2">pgraft</h4>
                <p className="text-sm text-slate-300 mb-4">Production PostgreSQL clustering</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• High availability</li>
                  <li>• Fault tolerance</li>
                  <li>• Distributed consensus</li>
                  <li>• Enterprise deployments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Choose the Right Tool for Your Needs
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Whether you need fast in-memory operations, reliable testing, or production-grade consensus, pgelephant has you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/download" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download All Projects
              </a>
              <a href="/docs" className="border-2 border-white text-white px-6 py-3 sm:px-8 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm hover:text-slate-800 transition-colors flex items-center justify-center text-sm sm:text-base">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectComparison
