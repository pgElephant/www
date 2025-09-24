'use client'

import React from 'react'

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
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Architecture', href: '/#architecture' },
      { name: 'Download', href: '/download' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' },
      { name: 'RALE - High Availability', href: '/rale' },
      { name: 'RAM - Resource Management', href: '/ram' },
      { name: 'FauxDB - Document Database', href: '/fauxdb' },
    ],
    company: [
      { name: 'About', href: '/' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/community' },
      { name: 'Support', href: '/community' },
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
      className="pt-12 pb-6"
      style={{
        background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
      }}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center border border-white/20">
                <img 
                  src="/ico/pgElephant_no_com_HD.ico" 
                  alt="pgElephant" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 text-center md:text-left max-w-xs mx-auto md:mx-0">
              Enterprise-grade PostgreSQL platform.
            </p>
          </div>

          {/* Product Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm">Products</h3>
            <ul className="space-y-2">
              <li><a href="/rale" className="text-slate-300 hover:text-white transition-colors text-sm">RALE</a></li>
              <li><a href="/ram" className="text-slate-300 hover:text-white transition-colors text-sm">RAM</a></li>
              <li><a href="/fauxdb" className="text-slate-300 hover:text-white transition-colors text-sm">FauxDB</a></li>
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