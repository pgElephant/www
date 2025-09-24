'use client'

import React from 'react'

import { Github, Twitter, Linkedin, Mail, Globe, Users, BookOpen, Download } from 'lucide-react'
import ElephantLogo from './ElephantLogo'

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
    <footer className="professional-footer pt-16 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <ElephantLogo size="md" animated={false} />
              <span className="text-xl font-bold text-white">pgElephant</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Enterprise-grade PostgreSQL platform with distributed consensus, clustering, and document database capabilities.
            </p>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a key={item.name} href={item.href} className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
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