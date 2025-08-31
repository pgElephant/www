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
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-10 pb-6">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="mb-2">
          <ElephantLogo size="md" animated={false} />
        </div>
        <span className="text-2xl font-bold text-white tracking-wide mb-2">pgElephant</span>
        <div className="text-slate-400 text-sm mt-2">© 2024 pgElephant. PostgreSQL High Availability &amp; Management.</div>
      </div>
    </footer>
  )
}

export default Footer 