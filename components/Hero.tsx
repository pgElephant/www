'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Database, Loader2, Zap, Crown, Network, Shield, FileText, Cpu, Server, Users, Activity, Layers } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type BG = { from: string; via?: string; to: string }
const palette = {
  // Modern Tech Stack Colors
  primary: '#4f46e5',      // Indigo-600
  primaryLight: '#6366f1', // Indigo-500
  primaryDark: '#3730a3',  // Indigo-800
  secondary: '#06b6d4',    // Cyan-500
  secondaryLight: '#22d3ee', // Cyan-400
  secondaryDark: '#0891b2',  // Cyan-600
  accent: '#10b981',       // Emerald-500
  accentLight: '#34d399',  // Emerald-400
  accentDark: '#059669',   // Emerald-600
  // Neutral colors
  neutral: '#18181b',      // Zinc-900
  neutralLight: '#27272a', // Zinc-800
  neutralMedium: '#3f3f46', // Zinc-700
  white: '#FFFFFF',
  // Legacy compatibility
  navy: '#1E293B',
  slate: '#334155'
}

type Product = {
  id: string
  name: string
  title: string
  description: string
  description2: string
  description3: string
  icon: string
  color: string
  bg: BG
}

// Custom pgbalancer icon component
const PgbalancerIcon = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-cyan-400" style={{ width: size * 0.7, height: size * 0.7 }} />
    <Loader2 className="text-green-400 absolute -top-1 -right-1 animate-spin" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Zap className="text-yellow-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
  </div>
)

// Custom pgraft icon component
const PgraftIcon = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-blue-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Network className="text-green-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Shield className="text-purple-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom FauxDB icon component
const FauxDbIcon = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-emerald-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <FileText className="text-orange-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Layers className="text-blue-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Activity className="text-red-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom RALE icon component
const RaleIcon = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Users className="text-indigo-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Network className="text-green-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Activity className="text-cyan-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom RAM icon component
const RamIcon = ({ size = 24 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Server className="text-cyan-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Cpu className="text-green-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Activity className="text-orange-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Shield className="text-purple-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

const Hero = () => {
  const [currentProduct, setCurrentProduct] = useState(0)

  const products: Product[] = [
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      description: '• High-performance MongoDB-compatible database built in Rust.',
      description2: '• Native JSON support with ACID transaction guarantees.',
      description3: '• Drop-in replacement for MongoDB with PostgreSQL reliability.',
      icon: 'fauxdb-custom',
      color: `from-[${palette.accent}] to-[${palette.accentLight}]`,
      bg: { from: palette.accentDark, via: palette.accent, to: palette.accentLight }
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'Raft Consensus Extension for PostgreSQL',
      description: '• Native Raft consensus for PostgreSQL clusters.',
      description2: '• Strong consistency, automatic leader election, and seamless failover.',
      description3: '• Built-in cluster management and observability.',
      icon: 'pgraft-custom',
      color: `from-[${palette.primaryDark}] to-[${palette.secondaryDark}]`,
      bg: { from: palette.primaryDark, via: palette.primary, to: palette.secondaryDark }
    },
    {
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'Connection Pooling & Load Balancing',
      description: '• High-performance connection pooling for PostgreSQL.',
      description2: '• Load balancing, failover, and observability in one lightweight service.',
      description3: '• YAML configuration, Prometheus metrics, and cloud-native ready.',
      icon: 'pgbalancer-custom',
      color: `from-[${palette.accentDark}] to-[${palette.primaryLight}]`,
      bg: { from: palette.accentDark, via: palette.primary, to: palette.primaryLight }
    },
    {
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      description: '• Enterprise-grade PostgreSQL clustering with automatic failover.',
      description2: '• Intelligent resource management and load balancing across nodes.',
      description3: '• Real-time monitoring and automated scaling capabilities.',
      icon: 'ram-custom',
      color: `from-[${palette.secondary}] to-[${palette.secondaryLight}]`,
      bg: { from: palette.secondaryDark, via: palette.secondary, to: palette.secondaryLight }
    },
    {
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      description: '• Distributed consensus for high availability in distributed systems.',
      description2: '• Automated leader election and failover for any distributed database.',
      description3: '• Zero data loss during node failures with strong consistency guarantees.',
      icon: 'rale-custom',
      color: `from-[${palette.primary}] to-[${palette.primaryLight}]`,
      bg: { from: palette.primaryDark, via: palette.primary, to: palette.primaryLight }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length])

  const current = products[currentProduct]
  
  // Elegant gradient design
  const heroGradient = `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`
  const tileGradient = `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`

  return (
    <section
      className="relative overflow-hidden"
      style={{ 
        background: heroGradient,
        position: 'relative'
      }}
    >
      {/* Elegant overlay gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
        }}
      />
      {/* Elegant floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container-extra-wide py-28 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Product showcase */}
          <div className="max-w-4xl mx-auto mt-8">
              <div className="mb-8">
                <div className="mb-6">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-24 h-24 flex items-center justify-center">
                      {current.icon === 'pgbalancer-custom' ? (
                        <PgbalancerIcon size={96} />
                      ) : current.icon === 'pgraft-custom' ? (
                        <PgraftIcon size={96} />
                      ) : current.icon === 'fauxdb-custom' ? (
                        <FauxDbIcon size={96} />
                      ) : current.icon === 'rale-custom' ? (
                        <RaleIcon size={96} />
                      ) : current.icon === 'ram-custom' ? (
                        <RamIcon size={96} />
                      ) : (
                        <Image 
                          src={current.icon} 
                          alt={`${current.name} icon`}
                          width={96}
                          height={96}
                          className="w-24 h-24"
                        />
                      )}
                    </div>
                    <div className="text-left">
                      <h1 className="text-3xl md:text-4xl font-thin text-white">
                        {current.name}
                      </h1>
                      <h2 className="text-2xl md:text-3xl font-thin text-white/90 mt-2">
                        {current.title}
                      </h2>
                      <p className="text-lg font-thin text-white/80 mt-1">
                        Enterprise PostgreSQL Platform
                      </p>
                    </div>
                  </div>
                </div>
                    <div className="text-xl max-w-3xl space-y-2 text-left pl-16 text-white">
                      <p>{current.description}</p>
                      <p>{current.description2}</p>
                      <p>{current.description3}</p>
                    </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mb-8">
                {products.map((p, index) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentProduct(index)}
                    className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
                    style={{
                      backgroundColor:
                        index === currentProduct ? '#4f46e5' : 'rgba(255,255,255,0.3)',
                      boxShadow: index === currentProduct ? '0 0 12px rgba(79, 70, 229, 0.6)' : 'none'
                    }}
                    aria-label={`Show ${p.name}`}
                  />
                ))}
              </div>

              {/* Product links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 {products.map((product) => {
                   const active = product.id === current.id
                   return (
                     <Link
                       key={product.id}
                       href={`/${product.id}`}
                       className="flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 backdrop-blur-sm hover:scale-105"
                       style={{
                         borderColor: active ? 'rgba(79, 70, 229, 0.6)' : 'rgba(255,255,255,0.2)',
                         backgroundColor: active ? 'rgba(79, 70, 229, 0.15)' : 'rgba(255,255,255,0.05)',
                         boxShadow: active ? '0 8px 32px rgba(79, 70, 229, 0.3)' : '0 4px 16px rgba(0,0,0,0.1)'
                       }}
                     >
                       {product.icon === 'pgbalancer-custom' ? (
                         <PgbalancerIcon size={20} />
                       ) : product.icon === 'pgraft-custom' ? (
                         <PgraftIcon size={20} />
                       ) : product.icon === 'fauxdb-custom' ? (
                         <FauxDbIcon size={20} />
                       ) : product.icon === 'rale-custom' ? (
                         <RaleIcon size={20} />
                       ) : product.icon === 'ram-custom' ? (
                         <RamIcon size={20} />
                       ) : (
                         <Image 
                           src={product.icon} 
                           alt={`${product.name} icon`}
                           width={20}
                           height={20}
                           className="w-5 h-5"
                           style={{ filter: active ? 'none' : 'brightness(0.7)' }}
                         />
                       )}
                       <span
                         className="font-medium text-white"
                       >
                         {product.name}
                       </span>
                     </Link>
                   )
                 })}
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

