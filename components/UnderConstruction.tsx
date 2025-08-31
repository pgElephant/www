'use client'

import React from 'react'
import { Construction, Database, Clock, Sparkles, ArrowRight, Github, Mail, Users } from 'lucide-react'

const UnderConstruction = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Construction Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-teal-300/30 rounded-full text-sm font-semibold text-teal-200 mb-6 shadow-sm">
              <Construction className="w-4 h-4" />
              Under Construction
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="text-white">
                pgelephant
              </span>
              <br />
              <span className="text-teal-300">
                Coming Soon
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              We're building something amazing. A revolutionary PostgreSQL high availability solution that will change the way you think about database clustering.
            </p>

            {/* Progress Indicator */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300">Development Progress</span>
                <span className="text-teal-400 font-semibold">75%</span>
              </div>
              <div className="w-full bg-slate-100/20 rounded-full h-3 border border-slate-400/30">
                <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        {/* What We're Building */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We're Building
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A next-generation PostgreSQL high availability solution with intelligent clustering and zero-downtime operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-400/30">
                <Database className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">RALE Consensus</h3>
              <p className="text-slate-300">
                Distributed leader election with intelligent failover and zero data loss guarantees.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-400/30">
                <Clock className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fast Recovery</h3>
              <p className="text-slate-300">
                Automatic failover in under 30 seconds with seamless service continuity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-400/30">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Simple Setup</h3>
              <p className="text-slate-300">
                Get your cluster running in minutes with declarative configuration and smart defaults.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Development Timeline
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our roadmap to bringing pgelephant to production.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-100/20 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                <span className="text-teal-400 text-lg font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Core Architecture</h3>
                <p className="text-slate-300 mb-4">Building the RALE consensus algorithm and core clustering logic.</p>
                <div className="flex items-center text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Completed
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-100/20 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                <span className="text-teal-400 text-lg font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">CLI & API</h3>
                <p className="text-slate-300 mb-4">Developing the command-line interface and REST API for cluster management.</p>
                <div className="flex items-center text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Completed
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-100/20 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                <span className="text-teal-400 text-lg font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Testing & Documentation</h3>
                <p className="text-slate-300 mb-4">Comprehensive testing suite and detailed documentation for production readiness.</p>
                <div className="flex items-center text-sm text-slate-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  In Progress
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-100/20 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                <span className="text-teal-400 text-lg font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Public Release</h3>
                <p className="text-slate-300 mb-4">Launch of pgelephant with full feature set and community support.</p>
                <div className="flex items-center text-sm text-slate-400">
                  <div className="w-2 h-2 bg-slate-400 rounded-full mr-2"></div>
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get Notified */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Be the first to know when pgelephant is ready for production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="https://github.com/pgElephant/rale"
              className="group bg-slate-100/20 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <Github className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">GitHub</h4>
              <p className="text-sm text-slate-300">Follow development progress</p>
            </a>
            
            <a
              href="mailto:hello@pgelephant.com"
              className="group bg-slate-100/20 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <Mail className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">Email</h4>
              <p className="text-sm text-slate-300">Get notified on launch</p>
            </a>
            
            <a
              href="https://github.com/pgElephant/rale/discussions"
              className="group bg-slate-100/20 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <Users className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">Community</h4>
              <p className="text-sm text-slate-300">Join the discussion</p>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Transform Your PostgreSQL?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              pgelephant will revolutionize how you think about PostgreSQL high availability. 
              Simple, reliable, and production-ready.
            </p>
            <a 
              href="https://github.com/pgElephant/rale"
              className="group inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Database className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Follow Development
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnderConstruction 