'use client'

import React from 'react'
import Image from 'next/image'

import { Github, Twitter, Linkedin, Mail, Globe, Users, BookOpen, Download } from 'lucide-react'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
}

const Footer = () => {
  const year = new Date().getFullYear()
  const navigation = {
    products: [
      { name: 'RALE', href: '/rale', description: 'Distributed Consensus Engine', icon: '🏛️' },
      { name: 'RAM', href: '/ram', description: 'PostgreSQL Clustering Manager', icon: '⚡' },
      { name: 'pgraft', href: '/pgraft', description: 'Raft Consensus Extension', icon: '🔗' },
      { name: 'FauxDB', href: '/fauxdb', description: 'MongoDB Wire Protocol Proxy', icon: '📄' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs', description: 'Complete technical guides', icon: '📚' },
      { name: 'Download', href: '/download', description: 'Get started quickly', icon: '⬇️' },
      { name: 'Blog', href: '/blog', description: 'Latest insights & updates', icon: '📝' },
      { name: 'Community', href: '/community', description: 'Join our community', icon: '👥' },
    ],
    enterprise: [
      { name: 'Enterprise Support', href: '/contact', description: '24/7 dedicated support', icon: '🛡️' },
      { name: 'Professional Services', href: '/contact', description: 'Expert consulting', icon: '🎯' },
      { name: 'Training', href: '/contact', description: 'Comprehensive training', icon: '🎓' },
      { name: 'Partnership', href: '/contact', description: 'Become a partner', icon: '🤝' },
    ],
    company: [
      { name: 'About Us', href: '/', description: 'Our mission & vision', icon: '🏢' },
      { name: 'Careers', href: '/community', description: 'Join our team', icon: '💼' },
      { name: 'Press Kit', href: '/contact', description: 'Media resources', icon: '📰' },
      { name: 'Contact', href: '/contact', description: 'Get in touch', icon: '📞' },
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
      className="pt-12 pb-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`,
        position: 'relative'
      }}
    >
      {/* Elegant overlay gradient - same as Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
        }}
      />
      
      {/* Elegant floating elements - same as Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-secondary-500/15 to-accent-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-accent-500/12 to-primary-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <Image 
                  src="/ico/pgElephant_no_com_HD.ico" 
                  alt="pgElephant" 
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-6 text-center md:text-left max-w-sm mx-auto md:mx-0">
              Enterprise-grade PostgreSQL platform with distributed consensus, automatic failover, and MongoDB compatibility for modern applications.
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
                  className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-thin text-lg mb-4">Products</h3>
            <nav aria-label="Products">
              <ul className="space-y-3">
                {navigation.products.map((item) => (
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

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-thin text-lg mb-4">Resources</h3>
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
            <h3 className="text-white font-thin text-lg mb-4">Enterprise</h3>
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