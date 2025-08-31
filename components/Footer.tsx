'use client'

import React from 'react'

import { Github, Twitter, Linkedin, Mail, Globe, Users, BookOpen, Download } from 'lucide-react'
import ElephantLogo from './ElephantLogo'

const Footer = () => {
  const navigation = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Architecture', href: '/#architecture' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Download', href: '/download' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: 'https://github.com/pgElephant' },
      { name: 'RALE - High Availability', href: 'https://github.com/pgElephant/rale' },
      { name: 'RAM - Resource Management', href: 'https://github.com/pgElephant/ram' },
      { name: 'FauxDB - Testing Framework', href: 'https://github.com/pgElephant/fauxdb' },
    ],
    company: [
      { name: 'About', href: '/#features' },
      { name: 'Contact', href: 'mailto:hello@pgelephant.com' },
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
    <footer className="bg-gradient-to-br from-cool-800 via-cool-700 to-cool-800 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-accent-400">
                <ElephantLogo size="sm" animated={false} />
              </div>
              <span className="text-xl font-bold text-white">pgelephant</span>
            </div>
            <p className="text-cool-300 mb-6 max-w-md">
              Professional PostgreSQL high availability with zero-downtime failover and intelligent leader election.
            </p>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-cool-400 hover:text-accent-400 transition-colors duration-200 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cool-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cool-300 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cool-300 hover:text-white transition-colors duration-200"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cool-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-cool-400 text-sm">
              © 2024 pgelephant. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/docs" className="text-cool-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/docs" className="text-cool-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="/docs" className="text-cool-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 