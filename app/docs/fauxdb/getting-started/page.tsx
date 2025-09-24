'use client'

import React, { useState } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Users, Settings, BarChart3, GitBranch, Crown, Wifi, CheckCircle, AlertTriangle, Terminal, Copy } from 'lucide-react'
import Link from 'next/link'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const FauxDbGettingStartedPage = () => {
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const codeBlocks = {
    install: `# Download FauxDB binary
wget https://github.com/pgelephant/fauxdb/releases/latest/download/fauxdb-linux-amd64
chmod +x fauxdb-linux-amd64
sudo mv fauxdb-linux-amd64 /usr/local/bin/fauxdb

# Verify installation
fauxdb --version`,

    config: `# /etc/fauxdb/fauxdb.conf
[server]
port = 27017
host = "0.0.0.0"

[postgresql]
host = "localhost"
port = 5432
database = "fauxdb"
username = "fauxdb"
password = "your_password"

[storage]
data_directory = "/var/lib/fauxdb/data"
max_connections = 100`,

    start: `# Start FauxDB server
sudo systemctl start fauxdb

# Check status
sudo systemctl status fauxdb

# View logs
sudo journalctl -u fauxdb -f`
  }

  const steps = [
    {
      number: 1,
      title: 'Install FauxDB',
      description: 'Download and install the FauxDB binary on your system',
      icon: Download,
      color: palette.cyan
    },
    {
      number: 2,
      title: 'Configure Database',
      description: 'Set up PostgreSQL connection and FauxDB configuration',
      icon: Settings,
      color: palette.teal
    },
    {
      number: 3,
      title: 'Start Services',
      description: 'Launch FauxDB server and connect to PostgreSQL',
      icon: Server,
      color: palette.orange
    },
    {
      number: 4,
      title: 'Verify Setup',
      description: 'Test MongoDB compatibility and database operations',
      icon: CheckCircle,
      color: palette.teal
    }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
        }}
      >
        <div className="container-wide py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                <img 
                  src="/ico/FauxDB_HD.ico" 
                  alt="FauxDB icon"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                  FauxDB Getting Started
                </h1>
                <p className="text-xl text-gray-300">
                  Set up your first MongoDB-compatible database
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Get FauxDB up and running in minutes with PostgreSQL backend and MongoDB compatibility.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-12 text-center">
              Quick Start Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-8 text-center">
              Installation Steps
            </h2>

            {/* Step 1: Install */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Install FauxDB Binary
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.install}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.install, 'install')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 2: Configure */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Configure Database
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.config}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.config, 'config')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'config' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 3: Start */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Start FauxDB Server
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.start}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.start, 'start')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'start' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-gray-900 mb-6">
              What's Next?
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Your FauxDB server is ready! Explore these next steps.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/docs/fauxdb/configuration"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <Settings className="w-8 h-8 text-cyan-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Configuration
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn about advanced configuration options.
                </p>
              </Link>

              <Link
                href="/docs/fauxdb/api"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <Code className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  API Reference
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore MongoDB-compatible API endpoints.
                </p>
              </Link>

              <Link
                href="/docs/fauxdb/examples"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <BookOpen className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Examples
                </h3>
                <p className="text-gray-600 text-sm">
                  See practical usage examples and integrations.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FauxDbGettingStartedPage