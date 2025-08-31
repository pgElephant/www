'use client'

import React from 'react'
import { Server, Database, Wifi, Shield, ArrowRight, Zap, Globe, Users, Activity, Crown, CheckCircle, Circle } from 'lucide-react'

const Architecture = () => {
  return (
    <section id="architecture" className="section-padding bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Architecture Overview
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A robust 3-node PostgreSQL cluster with intelligent leader election and automated failover capabilities.
          </p>
        </div>

        {/* Clean Architecture Diagram */}
        <div className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            {/* Static Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
            </div>

            {/* Static Connection Lines */}
            <div className="absolute inset-0 hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#0d9488" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                
                {/* Static connection lines */}
                <path
                  d="M 200 200 L 400 200"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 400 200 L 600 200"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 200 200 L 400 300"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 400 200 L 400 300"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 600 200 L 400 300"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Nodes */}
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Node 1 - Leader */}
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-400/30">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                        <Crown className="w-8 h-8 text-teal-400" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                          <Circle className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-100/20 rounded-xl px-4 py-2 mb-4 border border-slate-400/30">
                      <span className="text-teal-400 text-sm font-semibold">LEADER</span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Node 1</h3>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        Primary Database
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-2" />
                        Accepts Writes
                      </div>
                      <div className="flex items-center justify-center">
                        <Shield className="w-4 h-4 mr-2" />
                        RALE Leader
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        pg_ram Extension
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 2 - Follower */}
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-400/30">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                        <Server className="w-8 h-8 text-teal-400" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center border-2 border-white">
                          <Circle className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-100/20 rounded-xl px-4 py-2 mb-4 border border-slate-400/30">
                      <span className="text-teal-400 text-sm font-semibold">FOLLOWER</span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Node 2</h3>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        Read Replica
                      </div>
                      <div className="flex items-center justify-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Failover Ready
                      </div>
                      <div className="flex items-center justify-center">
                        <Shield className="w-4 h-4 mr-2" />
                        RALE Follower
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        pg_ram Extension
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 3 - Follower */}
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-400/30">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                        <Server className="w-8 h-8 text-teal-400" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center border-2 border-white">
                          <Circle className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-100/20 rounded-xl px-4 py-2 mb-4 border border-slate-400/30">
                      <span className="text-teal-400 text-sm font-semibold">FOLLOWER</span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Node 3</h3>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        Read Replica
                      </div>
                      <div className="flex items-center justify-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Failover Ready
                      </div>
                      <div className="flex items-center justify-center">
                        <Shield className="w-4 h-4 mr-2" />
                        RALE Follower
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        pg_ram Extension
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center text-white bg-slate-100/20 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-400/30 shadow-sm">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Active Replication</span>
              </div>
              <div className="flex items-center text-white bg-slate-100/20 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-400/30 shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">RALE Leader Election</span>
              </div>
              <div className="flex items-center text-white bg-slate-100/20 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-400/30 shadow-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">Health Monitoring</span>
              </div>
              <div className="flex items-center text-white bg-slate-100/20 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-400/30 shadow-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium">RAM Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Consensus & Failover */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-teal-400" />
              Consensus & Failover
            </h3>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-teal-400" />
                      RALE (Resilient Adaptive Leader Election)
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Distributed consensus algorithm ensuring consistency across all nodes with intelligent leader election powered by pg_ram extension.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-teal-400" />
                      Automatic Failover
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Detects leader failure and promotes the most qualified follower in under 30 seconds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-teal-400" />
                      Zero Data Loss
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Synchronous replication ensures no committed transactions are lost during failover.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Replication & Security */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-teal-400" />
              Replication & Security
            </h3>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Wifi className="w-4 h-4 mr-2 text-teal-400" />
                      Multi-Mode Replication
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Support for both synchronous and asynchronous replication with configurable consistency levels.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-teal-400" />
                      Advanced Security
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      TLS encryption, role-based access control, and audit logging for production environments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Database className="w-4 h-4 mr-2 text-teal-400" />
                      RAM (Resilient Adaptive Manager)
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      pg_ram PostgreSQL extension providing intelligent cluster management and adaptive resource allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Architecture 