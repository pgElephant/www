'use client'

import React from 'react'
import Image from 'next/image'

import { Github, Twitter, Linkedin, Mail, Globe, Users, BookOpen, Download, Users as UsersIcon, Server, Cpu, Shield, Activity, Crown, Network } from 'lucide-react'
import { PgbalancerIcon, PgraftIcon, FauxDbIcon, NeurondBIcon, PgSentinelIcon, PgStatInsightsIcon } from '@/components/ProductIcons'
import { colors } from '@/config/theme'

// Use theme config colors
const palette = {
  iconTeal: colors.secondary[700],
  iconTealLight: colors.secondary[600],
  iconTealMedium: colors.secondary[700],
  iconTealDark: colors.secondary[800],
}

// Legacy icon components (for Rale and Ram - keep for backward compatibility)
const RaleIcon = ({ size = 16 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <UsersIcon className="text-indigo-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Network className="text-green-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Activity className="text-cyan-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

const RamIcon = ({ size = 16 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Server className="text-cyan-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Cpu className="text-green-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Activity className="text-orange-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Shield className="text-purple-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

const Footer = () => {
  const year = new Date().getFullYear()
  const navigation = {
    products: [
      { name: 'pgSentinel', href: '/pgsentinel', description: 'Monitoring Platform', icon: '' },
      { name: 'pg_stat_insights', href: '/pg-stat-insights', description: 'Performance Analytics', icon: '' },
      { name: 'pgraft', href: '/pgraft', description: 'Raft Extension', icon: 'pgraft-custom' },
      { name: 'pgbalancer', href: '/pgbalancer', description: 'Connection Pooling', icon: 'pgbalancer-custom' },
      { name: 'FauxDB', href: '/fauxdb', description: 'Document Database', icon: 'fauxdb-custom' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs', description: 'Technical guides', icon: '' },
      { name: 'Download', href: '/download', description: 'Get started', icon: '' },
      { name: 'Blog', href: '/blog', description: 'Insights and updates', icon: '' },
      { name: 'Community', href: '/community', description: 'Join our community', icon: '' },
    ],
    enterprise: [
      { name: 'Support', href: '/contact', description: 'Support available', icon: '' },
      { name: 'Services', href: '/contact', description: 'Consulting available', icon: '' },
      { name: 'Training', href: '/contact', description: 'Training', icon: '' },
      { name: 'Partnership', href: '/contact', description: 'Become a partner', icon: '' },
    ],
    company: [
      { name: 'About Us', href: '/', description: 'Our mission and vision', icon: '' },
      { name: 'Careers', href: '/community', description: 'Join our team', icon: '' },
      { name: 'Press Kit', href: '/contact', description: 'Media resources', icon: '' },
      { name: 'Contact', href: '/contact', description: 'Get in touch', icon: '' },
    ],
  }

  const social = [
    {
      name: 'GitHub',
      href: 'https://github.com/pgElephant',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/pgelephant',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/pgelephant',
      icon: Twitter,
    },
  ]

  return (
    <footer 
      role="contentinfo"
      aria-label="Site footer"
      className="pt-12 pb-6 relative overflow-hidden bg-hero-gradient"
    >
      
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="bg-transparent flex items-center justify-center">
                <Image 
                  src="/favicons/favelatest.ico" 
                  alt="pgElephant" 
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  unoptimized
                />
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-6 text-center md:text-left max-w-sm mx-auto md:mx-0">
              PostgreSQL extensions with distributed consensus, automatic failover, and MongoDB compatibility.
            </p>
            {/* Social links */}
            <div className="flex justify-center md:justify-start gap-4" aria-label="Social links">
              {social.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-light text-lg mb-4">Products</h3>
            <nav aria-label="Products">
              <ul className="space-y-3">
                {navigation.products.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 text-sm"
                    >
                      <div className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 bg-transparent rounded flex items-center justify-center">
                        {(() => {
                          const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
                            'pgbalancer-custom': PgbalancerIcon,
                            'pgraft-custom': PgraftIcon,
                            'fauxdb-custom': FauxDbIcon,
                            'neurondb-custom': NeurondBIcon,
                            'pgsentinel-custom': PgSentinelIcon,
                            'pg-stat-insights-custom': PgStatInsightsIcon,
                            'rale-custom': RaleIcon,
                            'ram-custom': RamIcon,
                          }
                          const IconComponent = iconMap[item.icon || '']
                          if (IconComponent) {
                            return <IconComponent size={12} />
                          }
                          if (item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http'))) {
                            return (
                              <Image 
                                src={item.icon} 
                                alt={`${item.name} icon`} 
                                width={12} 
                                height={12} 
                                className="w-3 h-3 object-contain"
                                unoptimized
                              />
                            )
                          }
                          return <span className="text-xs">{item.icon}</span>
                        })()}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-white/70">{item.description}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-light text-lg mb-4">Resources</h3>
            <nav aria-label="Resources">
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-white/70">{item.description}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Enterprise Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-light text-lg mb-4">Enterprise</h3>
            <nav aria-label="Enterprise">
              <ul className="space-y-3">
                {navigation.enterprise.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-white/70">{item.description}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {year} pgElephant. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 