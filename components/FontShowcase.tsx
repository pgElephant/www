'use client'

import React from 'react'

const FontShowcase = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">Cool Font</span>
            <br />
            <span className="text-purple-300 font-heading">Showcase</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-body">
            Experience the power of modern typography with our carefully selected font collection.
          </p>
        </div>

        {/* Font Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Display Font - Space Grotesk */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30">
            <h3 className="text-2xl font-heading font-bold text-purple-300 mb-4">Display Font</h3>
            <div className="space-y-4">
              <h1 className="text-6xl font-display font-bold text-white">
                pgElephant
              </h1>
              <p className="text-lg text-slate-300 font-body">
                Perfect for hero sections and large headings. Clean, modern, and highly readable.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-display: Space Grotesk
              </code>
            </div>
          </div>

          {/* Heading Font - Poppins */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/30">
            <h3 className="text-2xl font-heading font-bold text-blue-300 mb-4">Heading Font</h3>
            <div className="space-y-4">
              <h2 className="text-4xl font-heading font-bold text-white">
                Enterprise PostgreSQL
              </h2>
              <p className="text-lg text-slate-300 font-body">
                Great for section titles and important headings. Friendly yet professional.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-heading: Poppins
              </code>
            </div>
          </div>

          {/* Body Font - Inter */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
            <h3 className="text-2xl font-heading font-bold text-green-300 mb-4">Body Font</h3>
            <div className="space-y-4">
              <p className="text-xl font-body text-white leading-relaxed">
                High-performance PostgreSQL solutions with automatic failover and distributed consensus.
              </p>
              <p className="text-lg text-slate-300 font-body">
                Optimized for readability and user experience across all devices.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-body: Inter
              </code>
            </div>
          </div>

          {/* Tech Font - Orbitron */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30">
            <h3 className="text-2xl font-heading font-bold text-orange-300 mb-4">Tech Font</h3>
            <div className="space-y-4">
              <h3 className="text-3xl font-tech font-bold text-white">
                PGRaft v2.0
              </h3>
              <p className="text-lg text-slate-300 font-body">
                Futuristic and technical. Perfect for version numbers and tech branding.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-tech: Orbitron
              </code>
            </div>
          </div>

          {/* Geometric Font - Outfit */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-pink-400/30">
            <h3 className="text-2xl font-heading font-bold text-pink-300 mb-4">Geometric Font</h3>
            <div className="space-y-4">
              <h4 className="text-2xl font-geometric font-bold text-white">
                Modern & Clean
              </h4>
              <p className="text-lg text-slate-300 font-body">
                Geometric and contemporary. Great for UI elements and modern design.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-geometric: Outfit
              </code>
            </div>
          </div>

          {/* Monospace Font - JetBrains Mono */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30">
            <h3 className="text-2xl font-heading font-bold text-cyan-300 mb-4">Monospace Font</h3>
            <div className="space-y-4">
              <div className="bg-black rounded p-4 font-mono text-sm text-green-400">
                <div>$ ./run.sh init</div>
                <div>Starting pgraft cluster...</div>
                <div>✓ Node 1: Leader (Term 2)</div>
                <div>✓ Node 2: Follower (Term 2)</div>
                <div>✓ Cluster ready!</div>
              </div>
              <p className="text-lg text-slate-300 font-body">
                Perfect for code, terminals, and technical documentation.
              </p>
              <code className="block bg-black/50 text-green-400 p-3 rounded font-mono text-sm">
                font-mono: JetBrains Mono
              </code>
            </div>
          </div>

        </div>

        {/* Typography Scale */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-heading font-bold text-white mb-8">
            Typography Scale
          </h3>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 max-w-4xl mx-auto">
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-600 pb-2">
                <span className="text-6xl font-display font-bold text-white">H1</span>
                <code className="font-mono text-green-400">font-display text-6xl</code>
              </div>
              <div className="flex items-center justify-between border-b border-slate-600 pb-2">
                <span className="text-4xl font-heading font-bold text-white">H2</span>
                <code className="font-mono text-green-400">font-heading text-4xl</code>
              </div>
              <div className="flex items-center justify-between border-b border-slate-600 pb-2">
                <span className="text-2xl font-heading font-bold text-white">H3</span>
                <code className="font-mono text-green-400">font-heading text-2xl</code>
              </div>
              <div className="flex items-center justify-between border-b border-slate-600 pb-2">
                <span className="text-xl font-body text-white">Body Large</span>
                <code className="font-mono text-green-400">font-body text-xl</code>
              </div>
              <div className="flex items-center justify-between border-b border-slate-600 pb-2">
                <span className="text-base font-body text-white">Body Regular</span>
                <code className="font-mono text-green-400">font-body text-base</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-green-400">Code / Terminal</span>
                <code className="font-mono text-green-400">font-mono text-sm</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FontShowcase
