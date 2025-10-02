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
  const navigation = {
    products: [
      { name: 'RALE', href: '/rale', description: 'Distributed Consensus' },
      { name: 'RAM', href: '/ram', description: 'PostgreSQL Clustering' },
      { name: 'pgraft', href: '/pgraft', description: 'Raft Extension' },
      { name: 'FauxDB', href: '/fauxdb', description: 'MongoDB Proxy' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs', description: 'Technical guides' },
      { name: 'Download', href: '/download', description: 'Get started' },
      { name: 'Blog', href: '/blog', description: 'Latest insights' },
      { name: 'Community', href: '/community', description: 'Join the community' },
    ],
    enterprise: [
      { name: 'Enterprise Support', href: '/contact', description: '24/7 support' },
      { name: 'Professional Services', href: '/contact', description: 'Consulting' },
      { name: 'Training', href: '/contact', description: 'Expert training' },
      { name: 'Partnership', href: '/contact', description: 'Become a partner' },
    ],
    company: [
      { name: 'About Us', href: '/', description: 'Our mission' },
      { name: 'Careers', href: '/community', description: 'Join our team' },
      { name: 'Press Kit', href: '/contact', description: 'Media resources' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
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
      className="pt-12 pb-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
        position: 'relative'
      }}
    >
      {/* Elegant overlay gradient - same as Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
        }}
      />
      
      {/* Elegant floating elements - same as Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-primary-500/15 to-secondary-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-accent-500/8 to-primary-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center border border-white/20">
                <Image 
                  src="/ico/pgElephant_no_com_HD.ico" 
                  alt="pgElephant" 
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4 text-center md:text-left max-w-xs mx-auto md:mx-0 drop-shadow-sm">
              Enterprise-grade PostgreSQL platform.
            </p>
          </div>

          {/* Product Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm drop-shadow-sm">Products</h3>
            <ul className="space-y-2">
              <li><a href="/rale" className="text-white/70 hover:text-white transition-colors text-sm drop-shadow-sm">RALE</a></li>
              <li><a href="/ram" className="text-white/70 hover:text-white transition-colors text-sm drop-shadow-sm">RAM</a></li>
              <li><a href="/fauxdb" className="text-white/70 hover:text-white transition-colors text-sm drop-shadow-sm">FauxDB</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/download" className="text-slate-300 hover:text-white transition-colors text-sm">Download</a></li>
              <li><a href="/blog" className="text-slate-300 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="/docs" className="text-slate-300 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="/community" className="text-slate-300 hover:text-white transition-colors text-sm">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 pgElephant. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
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