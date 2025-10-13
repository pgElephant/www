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
  description4: string
  description5: string
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
      title: 'MongoDB-Compatible Document Database',
      description: '• Full MongoDB wire protocol compatibility for seamless migration',
      description2: '• Rust-powered high-performance engine with PostgreSQL storage',
      description3: '• ACID transactions with multi-document consistency guarantees',
      description4: '• Advanced geospatial queries and MongoDB aggregation pipeline',
      description5: '• Native JSON indexing with enterprise-grade reliability',
      icon: 'fauxdb-custom',
      color: `from-[${palette.accent}] to-[${palette.accentLight}]`,
      bg: { from: palette.accentDark, via: palette.accent, to: palette.accentLight }
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'PostgreSQL Raft Consensus Clustering',
      description: '• Native Raft consensus algorithm for PostgreSQL clusters',
      description2: '• Automatic leader election with split-brain prevention',
      description3: '• Strong consistency guarantees across all cluster nodes',
      description4: '• Zero-downtime failover with mathematical fault tolerance',
      description5: '• Production-grade clustering with background worker integration',
      icon: 'pgraft-custom',
      color: `from-[${palette.primaryDark}] to-[${palette.secondaryDark}]`,
      bg: { from: palette.primaryDark, via: palette.primary, to: palette.secondaryDark }
    },
    {
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'AI-Enhanced PostgreSQL Connection Pooling',
      description: '• Machine learning-powered connection optimization and load balancing',
      description2: '• Intelligent query routing with predictive performance scaling',
      description3: '• Real-time traffic analysis with adaptive connection management',
      description4: '• REST API for monitoring and automated optimization insights',
      description5: '• AI-driven pooling strategies with health monitoring integration',
      icon: 'pgbalancer-custom',
      color: `from-[${palette.accentDark}] to-[${palette.primaryLight}]`,
      bg: { from: palette.accentDark, via: palette.primary, to: palette.primaryLight }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length])

  const current = products[currentProduct]

  return (
    <section
      className="relative overflow-hidden"
      style={{ 
        backgroundImage: 'url(/hero-bg-technical.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* Additional overlay for better text contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.3) 0%, rgba(26, 26, 46, 0.4) 50%, rgba(83, 52, 131, 0.2) 100%)'
        }}
      />

      <div className="container-extra-wide pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Product showcase */}
          <div className="max-w-5xl mx-auto mt-4">
              <div className="mb-6 backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 flex items-center justify-center">
                      {current.icon === 'pgbalancer-custom' ? (
                        <PgbalancerIcon size={80} />
                      ) : current.icon === 'pgraft-custom' ? (
                        <PgraftIcon size={80} />
                      ) : current.icon === 'fauxdb-custom' ? (
                        <FauxDbIcon size={80} />
                      ) : current.icon === 'rale-custom' ? (
                        <RaleIcon size={80} />
                      ) : current.icon === 'ram-custom' ? (
                        <RamIcon size={80} />
                      ) : (
                        <Image 
                          src={current.icon} 
                          alt={`${current.name} icon`}
                          width={80}
                          height={80}
                          className="w-20 h-20"
                        />
                      )}
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl md:text-3xl font-light text-white drop-shadow-lg">
                        {current.name}
                      </h1>
                      <h2 className="text-xl md:text-2xl font-bold text-white/95 mt-1 drop-shadow-lg">
                        {current.title}
                      </h2>
                      <p className="text-base font-light text-white/85 mt-1 drop-shadow-lg">
                        Enterprise-grade PostgreSQL solutions combining reliability with modern flexibility
                      </p>
                    </div>
                  </div>
                </div>
                    <div className="text-lg max-w-4xl space-y-2 text-left pl-12 text-white/95 drop-shadow-lg">
                      <p>{current.description}</p>
                      <p>{current.description2}</p>
                      <p>{current.description3}</p>
                      <p>{current.description4}</p>
                      <p>{current.description5}</p>
                    </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mb-4">
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
                       className="flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 backdrop-blur-md hover:scale-105 hover:backdrop-blur-lg"
                       style={{
                         borderColor: active ? 'rgba(139, 92, 246, 0.8)' : 'rgba(255,255,255,0.3)',
                         backgroundColor: active ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.1)',
                         boxShadow: active ? '0 8px 32px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)' : '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
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
                           style={{ filter: active ? 'none' : 'brightness(0.8)' }}
                         />
                       )}
                       <span
                         className="font-medium text-white drop-shadow-sm"
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

