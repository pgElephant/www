'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import HeroTemplate from '@/components/templates/HeroTemplate'
import { 
  PgbalancerIcon, 
  PgraftIcon, 
  FauxDbIcon, 
  PgSentinelIcon, 
  PgStatInsightsIcon,
  getProductIcon 
} from '@/components/ProductIcons'
import { getAllProducts, type ProductId } from '@/config/products'

type Product = {
  id: ProductId
  name: string
  title: string
  description: string
  description2: string
  description3: string
  description4: string
  description5: string
}

const Hero = () => {
  const [currentProduct, setCurrentProduct] = useState(0)

  // Icon mapping
  const iconMap: Partial<Record<ProductId, React.ComponentType<{ size?: number }>>> = {
    pgraft: PgraftIcon,
    pgbalancer: PgbalancerIcon,
    fauxdb: FauxDbIcon,
    pgsentinel: PgSentinelIcon,
    'pg-stat-insights': PgStatInsightsIcon,
  }

  // Get products from centralized config
  const allProducts = getAllProducts()
  const products: Product[] = allProducts
    .filter(product => iconMap[product.id]) // Only include products with icons
    .map(product => ({
      id: product.id,
      name: product.displayName,
      title: product.tagline,
      description: product.items[0] || '',
      description2: product.items[1] || '',
      description3: product.items[2] || '',
      description4: product.items[3] || '',
      description5: product.items[4] || '',
    }))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length])

  const current = products[currentProduct]

  return (
    <HeroTemplate className="relative overflow-hidden" height="default">
      <div className="container-extra-wide relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Product showcase */}
          <div className="max-w-5xl mx-auto mt-4">
              <div className="mb-6 backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 flex items-center justify-center">
                      {(() => {
                        const IconComponent = iconMap[current.id]
                        return IconComponent ? <IconComponent size={80} /> : null
                      })()}
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl md:text-3xl font-light text-white drop-shadow-lg">
                        {current.name}
                      </h1>
                      <h2 className="text-xl md:text-2xl font-bold text-white mt-1 drop-shadow-lg">
                        {current.title}
                      </h2>
                      <p className="text-base font-light text-white mt-1 drop-shadow-lg">
                        PostgreSQL extensions for production use
                      </p>
                    </div>
                  </div>
                </div>
                    <div className="text-lg max-w-4xl space-y-2 text-left pl-12 text-white drop-shadow-lg">
                      <p>{current.description}</p>
                      <p>{current.description2}</p>
                      <p>{current.description3}</p>
                      <p>{current.description4}</p>
                      <p>{current.description5}</p>
                    </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mb-4">
                {products.map((p, index) => {
                  const isActive = index === currentProduct
                  return (
                    <button
                      key={p.id}
                      onClick={() => setCurrentProduct(index)}
                      className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
                      style={{
                        backgroundColor: isActive ? 'var(--primary-600)' : 'rgba(255,255,255,0.3)',
                        boxShadow: isActive ? '0 0 12px rgba(79, 70, 229, 0.6)' : 'none'
                      }}
                      aria-label={`Show ${p.name}`}
                    />
                  )
                })}
              </div>

              {/* Product links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 {products.map((product) => {
                   const active = product.id === current.id
                   const IconComponent = iconMap[product.id]
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
                       {IconComponent && <IconComponent size={20} />}
                       <span className="font-medium text-white drop-shadow-sm">
                         {product.name}
                       </span>
                     </Link>
                   )
                 })}
              </div>
          </div>
        </div>
      </div>
    </HeroTemplate>
  )
}

export default Hero

