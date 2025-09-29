'use client'

import React from 'react'
import { 
  Database, 
  Zap, 
  Shield, 
  Globe, 
  Settings, 
  Crown, 
  Terminal, 
  Code,
  Server,
  Users,
  Lock,
  CheckCircle,
  ArrowRight,
  Cpu,
  HardDrive,
  Network,
  Activity
} from 'lucide-react'

const FeaturesList = () => {
  const projects = [
    {
      name: 'RAM',
      description: 'High-Performance In-Memory Database',
      icon: <Zap className="w-8 h-8" />,
      color: 'yellow',
      features: [
        {
          title: 'Ultra-Fast Performance',
          description: 'In-memory operations with microsecond latency',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Zero Disk I/O',
          description: 'All data operations in RAM for maximum speed',
          icon: <HardDrive className="w-5 h-5" />
        },
        {
          title: 'Simple Setup',
          description: 'Get running in seconds with minimal configuration',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Developer Friendly',
          description: 'Perfect for development, testing, and prototyping',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Memory Optimized',
          description: 'Efficient memory usage with smart caching',
          icon: <Cpu className="w-5 h-5" />
        },
        {
          title: 'Real-time Analytics',
          description: 'Process large datasets with lightning speed',
          icon: <Activity className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pgraft',
      description: 'PostgreSQL Raft Consensus Engine',
      icon: <Crown className="w-8 h-8" />,
      color: 'green',
      features: [
        {
          title: 'Automatic Leader Election',
          description: 'Raft consensus ensures reliable leader selection',
          icon: <Crown className="w-5 h-5" />
        },
        {
          title: 'Fault Tolerance',
          description: 'Survives node failures with automatic failover',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Data Consistency',
          description: 'ACID compliance with distributed consensus',
          icon: <Lock className="w-5 h-5" />
        },
        {
          title: 'Multi-Node Clustering',
          description: 'Scale to 3, 5, or more nodes seamlessly',
          icon: <Users className="w-5 h-5" />
        },
        {
          title: 'Network Communication',
          description: 'TCP-based peer communication with retry logic',
          icon: <Network className="w-5 h-5" />
        },
        {
          title: 'Production Ready',
          description: 'Enterprise-grade reliability and monitoring',
          icon: <Server className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'RALE',
      description: 'Distributed Consensus Library',
      icon: <Globe className="w-8 h-8" />,
      color: 'blue',
      features: [
        {
          title: 'Raft Implementation',
          description: 'Complete Raft consensus algorithm implementation',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Shared Memory',
          description: 'Efficient inter-process communication',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'Background Workers',
          description: 'PostgreSQL background worker integration',
          icon: <Terminal className="w-5 h-5" />
        },
        {
          title: 'Configuration Management',
          description: 'Dynamic node addition and removal',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Command Queue',
          description: 'FIFO command processing for reliability',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Monitoring & Logging',
          description: 'Comprehensive logging and health monitoring',
          icon: <Shield className="w-5 h-5" />
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'yellow':
        return {
          bg: 'from-yellow-500/20 to-orange-500/20',
          border: 'border-yellow-400/30',
          icon: 'text-yellow-400',
          accent: 'text-yellow-300',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        }
      case 'green':
        return {
          bg: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-400/30',
          icon: 'text-green-400',
          accent: 'text-green-300',
          button: 'bg-green-600 hover:bg-green-700'
        }
      case 'blue':
        return {
          bg: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-400/30',
          icon: 'text-blue-400',
          accent: 'text-blue-300',
          button: 'bg-blue-600 hover:bg-blue-700'
        }
      default:
        return {
          bg: 'from-gray-500/20 to-slate-500/20',
          border: 'border-gray-400/30',
          icon: 'text-gray-400',
          accent: 'text-gray-300',
          button: 'bg-gray-600 hover:bg-gray-700'
        }
    }
  }

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 relative overflow-hidden">
      <div className="container-wide">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-full text-sm font-semibold text-purple-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
            Project Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Complete Database
            </span>
            <br />
            <span className="text-purple-300">
              Solution Suite
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Three powerful tools working together to provide everything you need for modern database operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color)
            
            return (
              <div
                key={project.name}
                className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-3xl p-8 border ${colors.border} hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
              >
                {/* Project Header */}
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={colors.icon}>
                      {project.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className={`text-lg font-medium ${colors.accent}`}>
                    {project.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-6">
                  {project.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8 text-center">
                  <button className={`${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto`}>
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose the right tool for your needs, or use them together for a complete database solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Database className="w-5 h-5" />
                Download All Projects
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesList
