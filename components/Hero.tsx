'use client'

import React from 'react'
import { ArrowRight, Play, Database, Zap, Shield, Globe, Sparkles, Cpu, BarChart3, Crown, Settings, FileText, CheckCircle, Download } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="premium-hero">
      <div className="container-custom py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl premium-heading mb-8">
              Enterprise-Grade
              <span className="professional-text-gradient block">PostgreSQL Platform</span>
            </h1>
            <p className="text-xl premium-subheading mb-10 max-w-3xl mx-auto">
              Unified platform for PostgreSQL clustering, document databases, and distributed consensus. 
              Deploy production-ready applications in weeks, not months.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center premium-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Zero Downtime</span>
            </div>
            <div className="flex items-center premium-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center premium-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center premium-badge">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Enterprise Security</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/docs" className="premium-button">
              <Database className="w-5 h-5 mr-3" />
              Get Started
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
            <Link href="/download" className="professional-button-outline">
              <Download className="w-5 h-5 mr-3" />
              Download Now
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="premium-grid">
            <div className="premium-card p-10 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Crown className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">RALE</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">Resilient Adaptive Leader Election for distributed consensus</p>
              <Link href="/rale" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors text-lg">
                Learn More →
              </Link>
            </div>

            <div className="premium-card p-10 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Settings className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">RAM</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">PostgreSQL clustering with automatic failover</p>
              <Link href="/ram" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors text-lg">
                Learn More →
              </Link>
            </div>

            <div className="premium-card p-10 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <FileText className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">FauxDB</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">MongoDB-compatible document database</p>
              <Link href="/fauxdb" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors text-lg">
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