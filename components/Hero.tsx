'use client'

import React, { useState } from 'react'
import { ArrowRight, Play, Database, Zap, Shield, Globe, Sparkles, Cpu, BarChart3, Crown, Settings, FileText } from 'lucide-react'

const Hero = () => {
  const commonBg = "bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 w-full h-full";
  const slides = [
    {
      bg: commonBg,
      image: (
        <svg viewBox="0 0 400 200" fill="none" className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="300" cy="100" rx="120" ry="80" fill="url(#rale-main-gradient)" opacity="0.18" />
          <defs>
            <radialGradient id="rale-main-gradient" cx="0" cy="0" r="1" gradientTransform="translate(300 100) scale(120 80)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#facc15" />
              <stop offset="1" stopColor="#0d9488" />
            </radialGradient>
          </defs>
        </svg>
      ),
  icon: <Crown className="w-12 h-12 text-yellow-400" />, // RALE: Crown/leader icon
  title: "RALE - Resilient Adaptive Leader Election",
  subtitle: "",
      titleColor: "text-yellow-200",
  desc: "Enterprise-grade distributed consensus and leader election. Reliable, open source, and easy to integrate with any system.",
        ctas: [
          { label: "Learn More", href: "/blog/rale", className: "bg-yellow-400/80 text-slate-900" }
        ]
    },
    {
      bg: commonBg,
      image: (
        <svg viewBox="0 0 400 200" fill="none" className="absolute left-0 top-0 w-1/2 h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="40" width="200" height="120" rx="60" fill="url(#ram-main-gradient)" opacity="0.16" />
          <defs>
            <linearGradient id="ram-main-gradient" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22c55e" />
              <stop offset="1" stopColor="#0d9488" />
            </linearGradient>
          </defs>
        </svg>
      ),
    icon: <Settings className="w-12 h-12 text-green-400" />, // RAM: Settings/manager icon
    title: "RAM - Resilient Adaptive Manager For PostgreSQL Cluster",
  subtitle: "",
      titleColor: "text-green-200",
      desc: "Automated PostgreSQL failover and cluster management powered by RALE. High availability, resilience, and seamless scaling.",
        ctas: [
          { label: "Learn More", href: "/blog/ram", className: "bg-green-400/80 text-slate-900" }
        ]
    },
    {
      bg: commonBg,
      image: (
        <svg viewBox="0 0 400 200" fill="none" className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="100" r="80" fill="url(#fauxdb-main-gradient)" opacity="0.15" />
          <defs>
            <radialGradient id="fauxdb-main-gradient" cx="0" cy="0" r="1" gradientTransform="translate(300 100) scale(80)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0d9488" />
            </radialGradient>
          </defs>
        </svg>
      ),
  icon: <FileText className="w-12 h-12 text-blue-400" />, // FauxDB: Document icon
  title: "FauxDB - A PostgreSQL Based MongoDB compatible Document Database",
    subtitle: "",
      titleColor: "text-blue-200",
      desc: "Scalable, flexible document database built on PostgreSQL. Fully open source and MongoDB API compatible for modern apps.",
        ctas: [
          { label: "Learn More", href: "/blog/fauxdb", className: "bg-blue-400/80 text-slate-900" }
        ]
    }
  ];
  const [active, setActive] = useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [active]);
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
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

          {/* Slideable Product Highlights Carousel */}
          <div className="mb-16 flex flex-col items-start w-full">
            <div className={`w-full ${slides[active].bg} shadow-none flex flex-col items-start justify-center transition-all duration-500 relative overflow-hidden`} style={{minHeight: '480px'}}>
              {/* Remove per-slide image overlays for a unified look */}
              {/* Ensure consistent height for all slides */}
              {/* minHeight is already set to 480px, but let's enforce it for all screen sizes */}
              {/* Optionally, you can use h-[480px] for Tailwind or set minHeight inline for all slides */}
              <div className="relative z-10 flex flex-col items-start justify-center w-full px-16 py-12">
                <div className="flex items-center justify-start mb-8 w-full">
                  <div className="flex items-center justify-center w-36 h-36 rounded-3xl bg-white/10 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-center w-36 h-36 rounded-3xl bg-white/10 shadow-lg">
                    {slides[active].icon}
                  </div>
                  </div>
                </div>
                <div className="w-full max-w-3xl">
                </div>
                <div className="w-full max-w-5xl">
                  <h2 className={`font-extrabold mb-2 leading-tight ${slides[active].titleColor} text-left whitespace-nowrap text-2xl md:text-4xl`} style={{ maxWidth: '100%', width: '100%' }}>{slides[active].title}</h2>
                  {slides[active].subtitle && slides[active].subtitle.trim() !== "" && (
                    <div className={`italic text-base md:text-xl font-semibold mb-6 text-left ${active === 2 ? 'text-blue-100' : active === 1 ? 'text-green-100' : 'text-yellow-100'}`}>{slides[active].subtitle}</div>
                  )}
                  <p className="text-2xl md:text-3xl text-slate-100 mb-8 leading-snug text-left">{slides[active].desc}</p>
                  <div className="flex flex-wrap gap-6 mb-8 justify-start">
                    {slides[active].ctas.map((cta, idx) => (
                      <a key={idx} href={cta.href} className={`px-10 py-5 text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition ${cta.className}`}>{cta.label}</a>
                    ))}
                  </div>
                  <div className="flex gap-8 mt-2 justify-start">
                    <button
                      className={`px-6 py-3 rounded-full bg-slate-800 text-white font-bold text-xl shadow-lg hover:bg-teal-600 transition-all duration-200 ${active === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setActive((a) => Math.max(a - 1, 0))}
                      disabled={active === 0}
                    >
                      &#8592; Prev
                    </button>
                    <button
                      className={`px-6 py-3 rounded-full bg-slate-800 text-white font-bold text-xl shadow-lg hover:bg-teal-600 transition-all duration-200 ${active === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setActive((a) => Math.min(a + 1, slides.length - 1))}
                      disabled={active === slides.length - 1}
                    >
                      Next &#8594;
                    </button>
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

export default Hero 