'use client'

import React, { useState } from 'react'
import { Download as DownloadIcon, Terminal, Copy, Check, ArrowRight, Github, BookOpen, Users, Zap, Database, Shield, Cpu, Package, ExternalLink } from 'lucide-react'

const Download = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const components = [
    {
      title: 'RALE Consensus',
      description: 'Distributed store for leader election and cluster coordination',
      icon: Database,
      packages: {
        debian: 'pgelephant-rale',
        rpm: 'pgelephant-rale'
      },
      downloadLinks: {
        deb: 'https://packages.pgelephant.com/debian/pgelephant-rale_1.0.0_amd64.deb',
        rpm: 'https://packages.pgelephant.com/rpm/pgelephant-rale-1.0.0-1.x86_64.rpm'
      }
    },
    {
      title: 'RAM Resilient Adaptive Manager',
      description: 'Intelligent cluster management with automatic failover',
      icon: Cpu,
      packages: {
        debian: 'pgelephant-ram',
        rpm: 'pgelephant-ram'
      },
      downloadLinks: {
        deb: 'https://packages.pgelephant.com/debian/pgelephant-ram_1.0.0_amd64.deb',
        rpm: 'https://packages.pgelephant.com/rpm/pgelephant-ram-1.0.0-1.x86_64.rpm'
      }
    },
    {
      title: 'FauxDB',
      description: 'MongoDB-compatible document database for PostgreSQL.',
      icon: Database,
      packages: {
        debian: 'pgelephant-fauxdb',
        rpm: 'pgelephant-fauxdb'
      },
      downloadLinks: {
        deb: 'https://packages.pgelephant.com/debian/pgelephant-fauxdb_1.0.0_amd64.deb',
        rpm: 'https://packages.pgelephant.com/rpm/pgelephant-fauxdb-1.0.0-1.x86_64.rpm'
      }
    },
    {
      title: 'Secure PostgreSQL',
      description: 'Hardened PostgreSQL with enhanced security features',
      icon: Shield,
      packages: {
        debian: 'pgelephant-postgresql',
        rpm: 'pgelephant-postgresql'
      },
      downloadLinks: {
        deb: 'https://packages.pgelephant.com/debian/pgelephant-postgresql_1.0.0_amd64.deb',
        rpm: 'https://packages.pgelephant.com/rpm/pgelephant-postgresql-1.0.0-1.x86_64.rpm'
      }
    },
  ]

  const installationMethods = [
    {
      title: 'CLI Installation',
      description: 'Install via CLI tool',
      command: 'curl -fsSL https://get.pgelephant.com | sh',
      icon: Terminal
    },
    {
      title: 'Docker',
      description: 'Run with Docker container',
      command: 'docker run -d pgelephant/pgelephant:latest',
      icon: DownloadIcon
    },
    {
      title: 'GitHub Release',
      description: 'Download from GitHub',
      command: 'wget https://github.com/pgElephant/rale/releases/latest/download/pgelephant-linux-amd64',
      icon: Github
    }
  ]

  const repositoryInfo = {
    debian: {
      name: 'Debian/Ubuntu Repository',
      addRepo: 'curl -fsSL https://packages.pgelephant.com/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/pgelephant-archive-keyring.gpg',
      addSource: 'echo "deb [signed-by=/usr/share/keyrings/pgelephant-archive-keyring.gpg] https://packages.pgelephant.com/debian stable main" | sudo tee /etc/apt/sources.list.d/pgelephant.list',
      update: 'sudo apt update',
      install: 'sudo apt install pgelephant-rale pgelephant-ram pgelephant-postgresql pgelephant-postgresql-custom'
    },
    rpm: {
      name: 'RHEL/CentOS Repository',
      addRepo: 'sudo yum-config-manager --add-repo https://packages.pgelephant.com/rpm/pgelephant.repo',
      update: 'sudo yum update',
      install: 'sudo yum install pgelephant-rale pgelephant-ram pgelephant-postgresql pgelephant-postgresql-custom'
    }
  }

  const quickStartCommands = [
    {
      title: 'Initialize Cluster',
      description: 'Create a new 3-node cluster',
      command: 'pgelephant cluster init --nodes 3'
    },
    {
      title: 'Start Cluster',
      description: 'Start all nodes in the cluster',
      command: 'pgelephant cluster start'
    },
    {
      title: 'Check Status',
      description: 'View cluster health and status',
      command: 'pgelephant cluster status'
    }
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(text)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Get pgelephant and start building high-availability PostgreSQL clusters.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">

        {/* Repository Setup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Repository Setup
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Add the official pgelephant repository for easy package management and updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Debian Repository */}
            <div className="bg-slate-100/20 rounded-xl p-6 border border-slate-400/30">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-teal-400" />
                Debian/Ubuntu Repository
              </h4>
              <div className="space-y-3">
                <div className="bg-slate-100/20 rounded-lg p-3 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Add GPG Key</span>
                    <button
                      onClick={() => copyToClipboard(repositoryInfo.debian.addRepo)}
                      className="text-slate-400 hover:text-teal-300 transition-colors"
                    >
                      {copiedCommand === repositoryInfo.debian.addRepo ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-slate-300 font-mono break-all">
                    {repositoryInfo.debian.addRepo}
                  </code>
                </div>
                <div className="bg-slate-100/20 rounded-lg p-3 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Add Repository</span>
                    <button
                      onClick={() => copyToClipboard(repositoryInfo.debian.addSource)}
                      className="text-slate-400 hover:text-teal-300 transition-colors"
                    >
                      {copiedCommand === repositoryInfo.debian.addSource ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-slate-300 font-mono break-all">
                    {repositoryInfo.debian.addSource}
                  </code>
                </div>
                <div className="bg-slate-100/20 rounded-lg p-3 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Update & Install</span>
                    <button
                      onClick={() => copyToClipboard(`${repositoryInfo.debian.update}\n${repositoryInfo.debian.install}`)}
                      className="text-slate-400 hover:text-teal-300 transition-colors"
                    >
                      {copiedCommand === `${repositoryInfo.debian.update}\n${repositoryInfo.debian.install}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-slate-300 font-mono break-all">
                    {repositoryInfo.debian.update}<br/>
                    {repositoryInfo.debian.install}
                  </code>
                </div>
              </div>
            </div>
            
            {/* RPM Repository */}
            <div className="bg-slate-100/20 rounded-xl p-6 border border-slate-400/30">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-teal-400" />
                RHEL/CentOS Repository
              </h4>
              <div className="space-y-3">
                <div className="bg-slate-100/20 rounded-lg p-3 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Add Repository</span>
                    <button
                      onClick={() => copyToClipboard(repositoryInfo.rpm.addRepo)}
                      className="text-slate-400 hover:text-teal-300 transition-colors"
                    >
                      {copiedCommand === repositoryInfo.rpm.addRepo ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-slate-300 font-mono break-all">
                    {repositoryInfo.rpm.addRepo}
                  </code>
                </div>
                <div className="bg-slate-100/20 rounded-lg p-3 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400">Update & Install</span>
                    <button
                      onClick={() => copyToClipboard(`${repositoryInfo.rpm.update}\n${repositoryInfo.rpm.install}`)}
                      className="text-slate-400 hover:text-teal-300 transition-colors"
                    >
                      {copiedCommand === `${repositoryInfo.rpm.update}\n${repositoryInfo.rpm.install}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-slate-300 font-mono break-all">
                    {repositoryInfo.rpm.update}<br/>
                    {repositoryInfo.rpm.install}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {components.map((component) => (
            <div
              key={component.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mr-4 border border-slate-400/30">
                  <component.icon className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{component.title}</h3>
                  <p className="text-sm text-slate-300">{component.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Debian Package */}
                <div className="bg-slate-100/20 rounded-xl p-4 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400 flex items-center">
                      <Package className="w-3 h-3 mr-1" />
                      Debian Package
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(`apt install ${component.packages.debian}`)}
                        className="text-slate-400 hover:text-teal-300 transition-colors"
                      >
                        {copiedCommand === `apt install ${component.packages.debian}` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={component.downloadLinks.deb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-teal-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <code className="text-sm text-slate-300 font-mono break-all">
                    apt install {component.packages.debian}
                  </code>
                </div>
                
                {/* RPM Package */}
                <div className="bg-slate-100/20 rounded-xl p-4 border border-slate-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400 flex items-center">
                      <Package className="w-3 h-3 mr-1" />
                      RPM Package
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(`yum install ${component.packages.rpm}`)}
                        className="text-slate-400 hover:text-teal-300 transition-colors"
                      >
                        {copiedCommand === `yum install ${component.packages.rpm}` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={component.downloadLinks.rpm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-teal-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <code className="text-sm text-slate-300 font-mono break-all">
                    yum install {component.packages.rpm}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Package Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Package Distribution
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              All pgelephant components are available as Debian (.deb) and RPM (.rpm) packages for easy deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-100/20 rounded-xl p-6 border border-slate-400/30">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-teal-400" />
                Debian/Ubuntu Packages
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• pgelephant-rale - RALE consensus distributed store</li>
                <li>• pgelephant-ram - RAM resilient adaptive manager</li>
                <li>• pgelephant-postgresql - Secure PostgreSQL</li>
                <li>• pgelephant-postgresql-custom - Custom patched PostgreSQL</li>
              </ul>
            </div>
            
            <div className="bg-slate-100/20 rounded-xl p-6 border border-slate-400/30">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-teal-400" />
                RHEL/CentOS Packages
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• pgelephant-rale - RALE consensus distributed store</li>
                <li>• pgelephant-ram - RAM resilient adaptive manager</li>
                <li>• pgelephant-postgresql - Secure PostgreSQL</li>
                <li>• pgelephant-postgresql-custom - Custom patched PostgreSQL</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Installation Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {installationMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mr-4 border border-slate-400/30">
                  <method.icon className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{method.title}</h3>
                  <p className="text-sm text-slate-300">{method.description}</p>
                </div>
              </div>
              
              <div className="bg-slate-100/20 rounded-xl p-4 border border-slate-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Command</span>
                  <button
                    onClick={() => copyToClipboard(method.command)}
                    className="text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {copiedCommand === method.command ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-sm text-slate-300 font-mono break-all">
                  {method.command}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-slate-400/30">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Quick Start Guide
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Get your first PostgreSQL cluster running in under 5 minutes.
            </p>
          </div>

          <div className="space-y-6">
            {quickStartCommands.map((step, index) => (
              <div
                key={step.title}
                className="bg-slate-100/20 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-slate-100/20 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-400/30">
                    <span className="text-teal-400 text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-300 text-sm mb-4">{step.description}</p>
                    <div className="bg-slate-100/20 rounded-lg p-4 border border-slate-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-400">Terminal</span>
                        <button
                          onClick={() => copyToClipboard(step.command)}
                          className="text-slate-400 hover:text-teal-300 transition-colors"
                        >
                          {copiedCommand === step.command ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <code className="text-sm text-slate-300 font-mono">
                        {step.command}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Need Help Getting Started?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs"
              className="group bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              <BookOpen className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">Documentation</h4>
              <p className="text-sm text-slate-300">Comprehensive guides and API reference</p>
            </a>
            
            <a
              href="/community"
              className="group bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              <Users className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">Community</h4>
              <p className="text-sm text-slate-300">Join our community for support</p>
            </a>
            
            <a
              href="https://github.com/pgElephant/rale"
              className="group bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              <Github className="w-8 h-8 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-white mb-2">GitHub</h4>
              <p className="text-sm text-slate-300">Open source and contributions</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Download 