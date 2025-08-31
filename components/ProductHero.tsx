import React from 'react'
import { ArrowRight, Crown, Settings, FileText } from 'lucide-react'

interface ProductHeroProps {
  product: {
    name: string
    subtitle: string
    title: string
    desc: string
    icon: React.ComponentType<any>
    titleColor: string
    bg: string
    image: React.ReactNode
    ctas: { label: string; href: string; className: string }[]
  }
}

const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  return (
    <section className="pt-16 md:pt-20 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
      {/* Sleek Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
      </div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

      <div className="w-full relative z-10">
        <div className="w-full text-left">
          <div className="flex flex-col items-start w-full">
            <div className={`${product.bg} shadow-none flex flex-col items-start justify-center transition-all duration-500 relative overflow-hidden`} style={{minHeight: '480px'}}>
              {product.image}
              <div className="relative z-10 flex flex-col items-start justify-center w-full px-16 py-12">
                <div className="flex items-center justify-start mb-8 w-full">
                  <div className="flex items-center justify-center w-36 h-36 rounded-3xl bg-white/10 border border-white/20 shadow-lg">
                    <product.icon className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>
                <div className="w-full max-w-3xl">
                </div>
                <div className="w-full max-w-5xl">
                  <h2 className={`font-extrabold mb-2 leading-tight ${product.titleColor} text-left whitespace-nowrap text-2xl md:text-4xl`} style={{ maxWidth: '100%', width: '100%' }}>{product.title}</h2>
                  {product.subtitle && product.subtitle.trim() !== "" && (
                    <div className={`italic text-base md:text-xl font-semibold mb-6 text-left ${product.name === 'RALE' ? 'text-yellow-100' : product.name === 'RAM' ? 'text-green-100' : 'text-blue-100'}`}>{product.subtitle}</div>
                  )}
                  <p className="text-2xl md:text-3xl text-slate-100 mb-8 leading-snug text-left">{product.desc}</p>
                  <div className="flex flex-wrap gap-6 mb-8 justify-start">
                    {product.ctas.map((cta, idx) => (
                      <a key={idx} href={cta.href} className={`px-10 py-5 text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition ${cta.className}`}>{cta.label}</a>
                    ))}
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

export default ProductHero
