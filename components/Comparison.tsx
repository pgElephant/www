'use client'

import React from 'react'
import { Check, X, Minus, Zap, Shield, Globe, Settings, Database, Crown, Terminal, Code } from 'lucide-react'

const Comparison = () => {
  const features = [
    {
      feature: 'Setup Complexity',
      pgelephant: 'Simple',
      patroni: 'Complex',
      repmgr: 'Moderate',
      showIcon: true
    },
    {
      feature: 'Failover Time',
      pgelephant: '< 30 seconds',
      patroni: '2-5 minutes',
      repmgr: 'Manual',
      showIcon: true
    },
    {
      feature: 'Leader Election',
      pgelephant: 'RALE consensus',
      patroni: 'DCS-based',
      repmgr: 'Manual selection',
      showIcon: true
    },
    {
      feature: 'Data Loss',
      pgelephant: 'Guaranteed zero',
      patroni: 'Possible',
      repmgr: 'Possible',
      showIcon: true
    },
    {
      feature: 'Configuration',
      pgelephant: 'Declarative YAML',
      patroni: 'Complex JSON',
      repmgr: 'Manual files',
      showIcon: true
    },
    {
      feature: 'CLI Tools',
      pgelephant: 'pg_ramctrl',
      patroni: 'patronictl',
      repmgr: 'repmgr',
      showIcon: false
    },
    {
      feature: 'Languages',
      pgelephant: 'C',
      patroni: 'Python, JSON',
      repmgr: 'C, SQL',
      showIcon: false
    },
    {
      feature: 'PostgreSQL Versions',
      pgelephant: '12-16',
      patroni: '9.6-16',
      repmgr: '9.6-16',
      showIcon: false
    },
    {
      feature: 'Monitoring',
      pgelephant: 'Built-in',
      patroni: 'External tools',
      repmgr: 'Basic',
      showIcon: true
    },
    {
      feature: 'Multi-Zone',
      pgelephant: 'Native support',
      patroni: 'Complex setup',
      repmgr: 'Limited',
      showIcon: true
    }
  ]

  const getFeatureIcon = (value: string) => {
    if (value.includes('Simple') || value.includes('< 30') || value.includes('RALE') || 
        value.includes('Guaranteed') || value.includes('Built-in') || value.includes('Native') || 
        value.includes('pg_ramctrl') || value.includes('C') || value.includes('12-16')) {
      return <Check className="w-5 h-5 text-green-400" />
    } else if (value.includes('Complex') || value.includes('Manual') || value.includes('Possible') || 
               value.includes('Limited') || value.includes('Basic') || value.includes('Minimal') ||
               value.includes('patronictl') || value.includes('repmgr') || value.includes('Python, JSON') ||
               value.includes('C, SQL') || value.includes('9.6-16')) {
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
    <section id="comparison" className="section-padding bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
      <div className="container-custom">
        {/* Dark Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/15 to-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-400/15 to-blue-400/15 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-teal-300/30 rounded-full text-sm font-semibold text-teal-200 mb-6 shadow-sm">
            <Crown className="w-4 h-4" />
            Performance Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Why pgelephant
            </span>
            <br />
            <span className="text-teal-300">
              Stands Out
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Compare pgelephant with other PostgreSQL high availability solutions and see the difference.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-400/30 overflow-hidden relative z-10">
          {/* Table Header */}
          <div className="bg-slate-100/20 backdrop-blur-sm border-b border-slate-400/30 p-6 md:p-8">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-semibold text-white">Feature</div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="w-6 h-6 mr-2 text-teal-400" />
                  <span className="font-bold text-lg text-white">pgelephant</span>
                </div>
                <div className="text-teal-400 text-sm font-medium">Recommended</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-slate-300">Patroni</div>
                <div className="text-slate-400 text-sm">Complex</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-slate-300">repmgr</div>
                <div className="text-slate-400 text-sm">Basic</div>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-400/30">
            {features.map((feature) => (
              <div
                key={feature.feature}
                className="grid grid-cols-4 gap-4 p-4 md:p-6 hover:bg-slate-100/20 transition-colors"
              >
                <div className="font-medium text-white flex items-center">
                  {feature.feature}
                </div>
                <div className="text-center flex items-center justify-center">
                  {getFeatureDisplay(feature.pgelephant, feature.showIcon)}
                </div>
                <div className="text-center flex items-center justify-center">
                  {getFeatureDisplay(feature.patroni, feature.showIcon)}
                </div>
                <div className="text-center flex items-center justify-center">
                  {getFeatureDisplay(feature.repmgr, feature.showIcon)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Advantages */}
        <div className="mt-20 relative z-10">
          <h3 className="text-3xl font-bold text-center mb-4 text-white">
            Key Advantages of pgelephant
          </h3>
          <p className="text-lg text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Built for performance, reliability, and simplicity
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-slate-100/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                  <Zap className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Faster Setup</h4>
                <p className="text-sm text-slate-300">Get your cluster running in minutes, not hours</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-slate-100/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                  <Shield className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Better Reliability</h4>
                <p className="text-sm text-slate-300">Guaranteed zero data loss with RALE consensus</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-slate-100/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                  <Terminal className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Better CLI</h4>
                <p className="text-sm text-slate-300">Simple pg_ramctrl commands vs complex patronictl</p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="bg-slate-100/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                  <Code className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Modern Stack</h4>
                <p className="text-sm text-slate-300">Pure C vs Python + JSON complexity</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have switched to pgelephant for their PostgreSQL high availability needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/download" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Database className="w-5 h-5 mr-2" />
                Try pgelephant Free
              </a>
              <a href="/docs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-colors flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comparison 