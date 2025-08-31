'use client'

import React, { useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import Link from 'next/link'
import ElephantLogo from './ElephantLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigation = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/community' },
    { name: 'Download', href: '/download' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-500/90 backdrop-blur-xl border-b border-slate-400/30 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-teal-400 group-hover:text-teal-300 transition-colors">
              <ElephantLogo size="sm" animated={false} />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
              pgelephant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-teal-300 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://github.com/pgElephant/rale"
              className="text-slate-300 hover:text-teal-300 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-teal-300 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-400/30 bg-slate-500/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-teal-300 hover:bg-slate-400/20 rounded-md font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://github.com/pgElephant/rale"
                className="flex items-center px-3 py-2 text-slate-300 hover:text-teal-300 hover:bg-slate-400/20 rounded-md font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 