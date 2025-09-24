'use client'

import React from 'react'
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen, Search, Filter } from 'lucide-react'
import Link from 'next/link'

// Same palette as home page
const palette = {
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'pgElephant Enterprise Platform: The fastest way to build, deploy, and scale PostgreSQL applications',
      excerpt: 'A unified PostgreSQL platform that breaks free from the complexity trap and transforms your database initiatives from concept to production in weeks, not months or years.',
      author: 'pgElephant Team',
      date: '2025-01-20',
      readTime: '12 min read',
      category: 'Enterprise',
      tags: ['enterprise', 'platform', 'postgresql'],
      featured: true,
      image: '/blog/enterprise-platform.jpg',
      href: '/blog/pgelephant-enterprise-postgresql-platform'
    },
    {
      id: 2,
      title: 'RALE - Resilient Adaptive Leader Election',
      excerpt: 'Deep dive into how pgelephant uses RALE consensus algorithm for leader election and maintaining consistency across PostgreSQL nodes.',
      author: 'pgElephant Team',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Technical',
      tags: ['technical', 'rale', 'consensus'],
      featured: false,
      image: '/blog/rale-consensus.jpg',
      href: '/blog/rale'
    },
    {
      id: 3,
      title: 'RAM - Resilient Adaptive Manager',
      excerpt: 'Learn about RAM, the management layer that orchestrates PostgreSQL clusters using RALE consensus for automated failover and monitoring.',
      author: 'pgElephant Team',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Technical',
      tags: ['technical', 'ram', 'management'],
      featured: false,
      image: '/blog/ram-management.jpg',
      href: '/blog/ram'
    },
    {
      id: 4,
      title: 'FauxDB - MongoDB Compatible Document Database',
      excerpt: 'Discover FauxDB, a PostgreSQL-based document database that provides MongoDB API compatibility with ACID compliance and better reliability.',
      author: 'pgElephant Team',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Technical',
      tags: ['technical', 'fauxdb', 'mongodb'],
      featured: false,
      image: '/blog/fauxdb-document.jpg',
      href: '/blog/fauxdb'
    },
  ]

  const categories = [
    { name: 'All', count: 4, active: true },
    { name: 'Enterprise', count: 1, active: false },
    { name: 'Technical', count: 3, active: false }
  ]

  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <div className="pt-16">
      {/* Header with gradient background */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.navy}, ${palette.slate}, ${palette.navy})`
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="container-wide py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Latest updates, tutorials, case studies, and insights from the pgElephant community.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: palette.gray300 }} />
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:border-transparent bg-white/10 backdrop-blur-sm border text-white placeholder-gray-300"
                style={{ borderColor: 'rgba(255,255,255,0.25)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-wide py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.active
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                style={{
                  backgroundColor: category.active ? palette.cyan : 'transparent'
                }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="bg-white">
          <div className="container-wide py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${palette.cyan}15`, 
                        color: palette.cyan 
                      }}
                    >
                      Featured Post
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredPost.date}</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <Link
                    href={featuredPost.href}
                    className="inline-flex items-center font-medium transition-colors"
                    style={{ color: palette.cyan }}
                    onMouseEnter={e => e.currentTarget.style.color = palette.cyanDeep}
                    onMouseLeave={e => e.currentTarget.style.color = palette.cyan}
                  >
                    Read full article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="bg-gray-50">
        <div className="container-wide py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-teal-600" />
                      </div>
                      <span className="text-gray-500 text-sm">Blog Post</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Link
                        href={post.href}
                        className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white border-t border-gray-200">
        <div className="container-wide py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest pgElephant updates, tutorials, and community stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage