'use client'

import React from 'react'
import Image from 'next/image'

import { Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()

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
      className="relative overflow-hidden border-t border-slate-700/50"
      style={{ backgroundColor: '#111827' }}
    >
      <div className="w-full">
        {/* Main Footer Content - Full Width */}
        <div className="container-extra-wide mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Products Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Products</h3>
              <nav aria-label="Products">
                <ul className="space-y-3">
                  <li>
                    <Link href="/pgraft" className="text-white/70 hover:text-white transition-colors text-sm">
                      pgraft
                    </Link>
                  </li>
                  <li>
                    <Link href="/pgbalancer" className="text-white/70 hover:text-white transition-colors text-sm">
                      pgBalancer
                    </Link>
                  </li>
                  <li>
                    <Link href="/pgsentinel" className="text-white/70 hover:text-white transition-colors text-sm">
                      pgSentinel
                    </Link>
                  </li>
                  <li>
                    <Link href="/pg-stat-insights" className="text-white/70 hover:text-white transition-colors text-sm">
                      pg_stat_insights
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Resources Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
              <nav aria-label="Resources">
                <ul className="space-y-3">
                  <li>
                    <Link href="/docs" className="text-white/70 hover:text-white transition-colors text-sm">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/download" className="text-white/70 hover:text-white transition-colors text-sm">
                      Download
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/videos" className="text-white/70 hover:text-white transition-colors text-sm">
                      Videos
                    </Link>
                  </li>
                  <li>
                    <Link href="/videos-ai" className="text-white/70 hover:text-white transition-colors text-sm">
                      AI Videos
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-white/70 hover:text-white transition-colors text-sm">
                      Community
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Enterprise Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Enterprise</h3>
              <nav aria-label="Enterprise">
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      Partnership
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Learn & Explore Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Learn & Explore</h3>
              <nav aria-label="Learn & Explore">
                <ul className="space-y-3">
                  <li>
                    <Link href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-white/70 hover:text-white transition-colors text-sm">
                      Community
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/pgElephant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <Link href="/docs" className="text-white/70 hover:text-white transition-colors text-sm">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Company Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
              <nav aria-label="Company">
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/pgElephant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Logo and Social Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <Image
                  src="/favicons/favelatest.ico"
                  alt="pgElephant"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  unoptimized
                />
                <span className="ml-2 text-white font-semibold text-lg">pgElephant</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed mb-6">
                PostgreSQL extensions with distributed consensus, automatic failover, and MongoDB compatibility.
              </p>
              {/* Social links */}
              <div className="flex gap-4" aria-label="Social links">
                {social.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Full Width */}
        <div className="border-t border-slate-700/50">
          <div className="container-extra-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © {year} pgElephant. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 