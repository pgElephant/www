'use client'

import React, { useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import Link from 'next/link'
import ElephantLogo from './ElephantLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigation = [
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: 'https://github.com/pgElephant' },
    { name: 'Download', href: '/download' },
  ]

  const githubProjects = [
    { name: 'RALE', href: 'https://github.com/pgElephant/rale', description: 'High Availability' },
    { name: 'RAM', href: 'https://github.com/pgElephant/ram', description: 'Resource Management' },
    { name: 'FauxDB', href: 'https://github.com/pgElephant/fauxdb', description: 'Document Database' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-500/90 backdrop-blur-xl border-b border-slate-400/30 z-50 shadow-sm">
      <div className="w-full px-0 mx-0">
        <div className="flex items-center h-[76.8px] w-full">
          {/* Logo left of Docs */}
          <Link href="/" className="flex items-center space-x-3 group pl-0 ml-0 mr-8">
            <div className="text-teal-400 group-hover:text-teal-300 transition-colors">
              <ElephantLogo size="sm" animated={false} />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
              pgelephant
            </span>
          </Link>
          {/* Centered menu */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-teal-300 transition-colors duration-200 font-medium"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.name}
              </Link>
            ))}
            {/* GitHub Projects Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-slate-300 hover:text-teal-300 transition-colors duration-200">
                <Github className="w-5 h-5 mr-2" />
                Projects
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-600/95 backdrop-blur-xl border border-slate-400/30 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 space-y-3">
                  {githubProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-3 rounded-lg hover:bg-slate-500/50 transition-colors duration-200 group/item"
                    >
                      <Github className="w-5 h-5 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white group-hover/item:text-teal-300 transition-colors">
                          {project.name}
                        </div>
                        <div className="text-sm text-slate-400 group-hover/item:text-slate-300 transition-colors">
                          {project.description}
                        </div>
                      </div>
                    </a>
                  ))}
                  <a
                    href="https://github.com/pgElephant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-lg hover:bg-slate-500/50 transition-colors duration-200 group/item border-t border-slate-400/30 pt-3"
                  >
                    <Github className="w-5 h-5 text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white group-hover/item:text-teal-300 transition-colors">
                        View All Projects
                      </div>
                      <div className="text-sm text-slate-400 group-hover/item:text-slate-300 transition-colors">
                        pgElephant Organization
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          {/* Getting Started button right */}
          <div className="flex items-center justify-end min-w-[180px]">
            <Link href="/docs/rale/getting-started" className="px-6 py-2 bg-teal-500 text-white font-bold rounded-full shadow hover:bg-teal-400 transition-all duration-200 text-lg">Getting Started</Link>
          </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-teal-300 transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

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
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile GitHub Projects */}
              <div className="border-t border-slate-400/30 pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
                  GitHub Projects
                </div>
                {githubProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-slate-300 hover:text-teal-300 hover:bg-slate-400/20 rounded-md font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    {project.name} - {project.description}
                  </a>
                ))}
                <a
                  href="https://github.com/pgElephant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-slate-300 hover:text-teal-300 hover:bg-slate-400/20 rounded-md font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}

export default Header 