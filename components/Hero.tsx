'use client'

import React from 'react'
import { ArrowRight, Play, Database, Zap, Shield, Globe, Sparkles, Cpu, BarChart3, Crown, Settings, FileText, CheckCircle, Download } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="professional-hero">
      <div className="container-custom py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Enterprise-Grade
              <span className="professional-text-gradient block">PostgreSQL Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Unified platform for PostgreSQL clustering, document databases, and distributed consensus. 
              Deploy production-ready applications in weeks, not months.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center professional-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Zero Downtime</span>
            </div>
            <div className="flex items-center professional-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center professional-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center professional-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Enterprise Security</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/docs" className="professional-button">
              <Database className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/download" className="professional-button-outline">
              <Download className="w-5 h-5 mr-2" />
              Download Now
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="professional-feature-grid">
            <div className="professional-card p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">RALE</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Resilient Adaptive Leader Election for distributed consensus</p>
              <Link href="/rale" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Learn More →
              </Link>
            </div>

            <div className="professional-card p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">RAM</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">PostgreSQL clustering with automatic failover</p>
              <Link href="/ram" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Learn More →
              </Link>
            </div>

            <div className="professional-card p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">FauxDB</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">MongoDB-compatible document database</p>
              <Link href="/fauxdb" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero