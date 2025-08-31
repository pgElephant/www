'use client'

import React from 'react'
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen, Zap, Users, TrendingUp } from 'lucide-react'

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'pgelephant v1.2.0 Released: Improved Failover Performance',
      excerpt: 'We\'re excited to announce the release of pgelephant v1.2.0, featuring significant improvements to failover performance, enhanced monitoring capabilities, and better multi-zone support.',
      author: 'pgelephant Team',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Release',
      tags: ['release', 'performance', 'failover'],
      featured: true,
      image: '/blog/v1.2.0-release.jpg'
    },
    {
      id: 2,
      title: 'How Company X Achieved 99.99% Uptime with pgelephant',
      excerpt: 'A detailed case study showing how a leading fintech company implemented pgelephant to achieve enterprise-grade PostgreSQL high availability and eliminate downtime.',
      author: 'Sarah Chen',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Case Study',
      tags: ['case-study', 'enterprise', 'uptime'],
      featured: false,
      image: '/blog/company-x-case-study.jpg'
    },
    {
      id: 3,
      title: 'Multi-Zone PostgreSQL Deployment: Best Practices',
      excerpt: 'Learn how to deploy PostgreSQL clusters across multiple availability zones for maximum resilience and performance using pgelephant.',
      author: 'Michael Rodriguez',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'Tutorial',
      tags: ['tutorial', 'multi-zone', 'deployment'],
      featured: false,
      image: '/blog/multi-zone-deployment.jpg'
    },
    {
      id: 4,
      title: 'Understanding RALE Consensus in PostgreSQL Clustering',
      excerpt: 'Deep dive into how pgelephant uses RALE consensus algorithm for leader election and maintaining consistency across PostgreSQL nodes.',
      author: 'Dr. Alex Thompson',
      date: '2024-01-01',
      readTime: '15 min read',
      category: 'Technical',
      tags: ['technical', 'rale', 'consensus'],
      featured: false,
      image: '/blog/rale-consensus.jpg'
    },
    {
      id: 5,
      title: 'Performance Benchmarks: pgelephant vs Traditional HA Solutions',
      excerpt: 'Comprehensive performance comparison showing how pgelephant outperforms traditional PostgreSQL high availability solutions in real-world scenarios.',
      author: 'pgelephant Team',
      date: '2023-12-28',
      readTime: '10 min read',
      category: 'Benchmark',
      tags: ['benchmark', 'performance', 'comparison'],
      featured: false,
      image: '/blog/performance-benchmarks.jpg'
    },
    {
      id: 6,
      title: 'Community Spotlight: Top Contributors of 2023',
      excerpt: 'Celebrating the amazing contributors who helped make pgelephant better throughout 2023, with insights into their contributions and impact.',
      author: 'Community Team',
      date: '2023-12-25',
      readTime: '6 min read',
      category: 'Community',
      tags: ['community', 'contributors', '2023'],
      featured: false,
      image: '/blog/community-spotlight.jpg'
    }
  ]

  const categories = [
    { name: 'All', count: 6, active: true },
    { name: 'Release', count: 1, active: false },
    { name: 'Tutorial', count: 1, active: false },
    { name: 'Case Study', count: 1, active: false },
    { name: 'Technical', count: 1, active: false },
    { name: 'Community', count: 1, active: false },
    { name: 'Benchmark', count: 1, active: false }
  ]

  const featuredPost = blogPosts.find(post => post.featured)

  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Latest updates, tutorials, case studies, and insights from the pgelephant community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-slate-300">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>Latest posts and updates</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Zap className="w-5 h-5 mr-2" />
                <span>Technical deep dives</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Users className="w-5 h-5 mr-2" />
                <span>Community stories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-slate-400/30">
        <div className="container-custom py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category.active
                    ? 'bg-teal-600 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-slate-400/20'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="container-custom py-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-teal-400/20 text-teal-300 rounded-full text-sm font-medium mb-4">
                  <Zap className="w-4 h-4 mr-1" />
                  Featured Post
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-300 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-slate-400 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <a
                  href="/docs"
                  className="inline-flex items-center text-teal-300 hover:text-teal-200 font-medium"
                >
                  Read full article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
              <div className="bg-slate-100/20 rounded-xl h-64 flex items-center justify-center border border-slate-400/30">
                <span className="text-slate-400">Featured Image</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-slate-400/30 hover:shadow-lg transition-shadow">
              <div className="bg-slate-100/20 rounded-t-xl h-48 flex items-center justify-center border-b border-slate-400/30">
                <span className="text-slate-400">Post Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 bg-teal-400/20 text-teal-300 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-slate-400">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <a
                    href="/docs"
                    className="text-teal-300 hover:text-teal-200 font-medium text-sm"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest pgelephant updates, tutorials, and community stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
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