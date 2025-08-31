'use client'

import React from 'react'
import { ArrowRight, Play, Database, Zap, Shield, Globe, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
      {/* Sleek Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle cool background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
      </div>

      {/* Static grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Static glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-teal-300/30 rounded-full text-sm font-semibold text-teal-200 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            Production-Ready PostgreSQL
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="text-white">
              PostgreSQL
            </span>
            <br />
            <span className="text-teal-300">
              High Availability
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto font-medium">
            Zero-downtime • Multi-node • Production-ready
          </p>

          {/* Feature icons */}
          <div className="flex justify-center gap-12 md:gap-16 mb-6">
            {[
              { icon: Zap, text: "Fast Failover", color: "text-yellow-400" },
              { icon: Shield, text: "Advanced Security", color: "text-green-400" },
              { icon: Globe, text: "Global Scale", color: "text-blue-400" }
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-sm font-medium text-slate-300"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                {item.text}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/download"
              className="group px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block"
            >
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            
            <a 
              href="/#architecture"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-teal-300/30 text-teal-200 font-semibold rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 inline-block"
            >
              <div className="flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Architecture
              </div>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-12 md:gap-16 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              99.99% Uptime
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              &lt;30s Failover
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              2.4k+ GitHub Stars
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 