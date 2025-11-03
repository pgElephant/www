'use client'

import React, { useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigation = [
    { name: 'Blogs', href: '/blog' },
    { name: 'Community', href: '/community' },
    { name: 'Download', href: '/download' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const githubProjects = [
    { name: 'pgraft', href: '/pgraft', description: 'Raft Extension' },
    { name: 'pgbalancer', href: '/pgbalancer', description: 'Connection Pooling' },
    { name: 'pgSentinel', href: '/pgsentinel', description: 'Monitoring Platform' },
    { name: 'pg_stat_insights', href: '/pg-stat-insights', description: 'Performance Analytics' },
    { name: 'FauxDB', href: '/fauxdb', description: 'Document Database' },
    { name: 'NeuronDB', href: '/neurondb', description: 'Vector Database' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg  border-b border-slate-700" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #334155 75%, #475569 100%)' }}>
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-white group-hover:text-white transition-colors">
              <Image 
                src="/favicons/favelatest.png" 
                alt="pgElephant" 
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
                unoptimized
                priority
              />
            </div>
          </Link>
          {/* Centered menu */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white  hover:text-white transition-colors font-semibold  "
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.name}
              </Link>
            ))}
            {/* GitHub Projects Dropdown */}
            <div className="relative group">
              <button className="text-white  hover:text-white transition-colors flex items-center font-semibold  ">
                <Github className="w-5 h-5 mr-2" />
                Projects
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 space-y-3">
                  {githubProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.href}
                      className="flex items-start p-3 rounded-xl hover:bg-white/10 transition-colors duration-200 group/item"
                    >
                      <Github className="w-5 h-5 text-white/70 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white group-hover/item:text-white/90 transition-colors">
                          {project.name}
                        </div>
                        <div className="text-sm text-white/70 group-hover/item:text-white/60 transition-colors">
                          {project.description}
                        </div>
                      </div>
                    </a>
                  ))}
                  <a
                    href="https://github.com/pgElephant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-xl hover:bg-white/10 transition-colors duration-200 group/item border-t border-white/20 pt-3"
                  >
                    <Github className="w-5 h-5 text-white/70 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white group-hover/item:text-white/90 transition-colors">
                        View All Projects
                      </div>
                      <div className="text-sm text-white/70 group-hover/item:text-white/60 transition-colors">
                        pgElephant Organization
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          {/* Getting Started button right - hidden on mobile */}
          <div className="hidden md:flex items-center justify-end min-w-[180px]">
            <Link href="/docs" className="bg-white/20 hover:bg-white/30 text-white  font-semibold px-6 py-2 rounded-lg transition-all duration-200 text-sm  ">Getting Started</Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Getting Started Button */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <Link
                  href="/docs"
                  className="flex items-center px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium transition-all duration-200 justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Getting Started
                </Link>
              </div>
              {/* Mobile Projects */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-medium text-white/60 uppercase tracking-wider">
                  Projects
                </div>
                {githubProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.href}
                    className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Github className="w-5 h-5 mr-3" />
                    {project.name} - {project.description}
                  </a>
                ))}
                <a
                  href="https://github.com/pgElephant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github className="w-5 h-5 mr-3" />
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header 