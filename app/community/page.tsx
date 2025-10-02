'use client'

import React from 'react'
import { Github, MessageCircle, Users, BookOpen, ArrowRight, Code, Bug, FileText, Heart, Star, Zap, Trophy, Award, TrendingUp, Globe, Calendar, Clock, UserCheck, Shield, Lightbulb, Server, Database } from 'lucide-react'
import Link from 'next/link'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
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

const CommunityPage = () => {
  // Function to get appropriate icon for contribution type
  const getContributionIcon = (type: string) => {
    switch (type) {
      case 'Code':
        return Code
      case 'Documentation':
        return FileText
      case 'Support':
        return Users
      case 'Testing':
        return Bug
      default:
        return Heart
    }
  }

  // Community statistics
  const communityStats = [
    { label: 'Active Contributors', value: '12', icon: Users, color: 'text-blue-600' },
    { label: 'GitHub Stars', value: '2', icon: Star, color: 'text-yellow-500' },
    { label: 'Projects', value: '3', icon: Code, color: 'text-green-600' },
    { label: 'Countries', value: '2', icon: Globe, color: 'text-purple-600' }
  ]


  // Community guidelines
  const guidelines = [
    {
      icon: Heart,
      title: 'Be Respectful',
      description: 'Treat everyone with respect and kindness. We welcome diverse perspectives and experiences.'
    },
    {
      icon: Shield,
      title: 'Follow Code of Conduct',
      description: 'Our community follows a clear code of conduct to ensure a safe and inclusive environment.'
    },
    {
      icon: Lightbulb,
      title: 'Share Knowledge',
      description: 'Help others learn and grow. Share your expertise and learn from the community.'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Work together to build something amazing. Collaboration is key to our success.'
    }
  ]

  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      title: 'Source Code & Development',
      icon: Github,
      description: 'Our primary development platform where all pgElephant projects are hosted, developed, and maintained.',
      stats: { stars: '2', forks: '1', issues: '3', prs: '2' },
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'Main Repository', href: 'https://github.com/pgelephant', type: 'Code', description: 'Core pgElephant organization' },
        { title: 'RAM Project', href: 'https://github.com/pgelephant/ram', type: 'Code', description: 'Resilient Adaptive Manager' },
        { title: 'pgraft Extension', href: 'https://github.com/pgelephant/pgraft', type: 'Code', description: 'PostgreSQL Raft Extension' },
        { title: 'FauxDB Engine', href: 'https://github.com/pgelephant/fauxdb', type: 'Code', description: 'MongoDB Compatible Database' },
        { title: 'Report Issues', href: 'https://github.com/pgelephant/issues', type: 'Support', description: 'Bug reports and feature requests' },
        { title: 'Submit PRs', href: 'https://github.com/pgelephant/pulls', type: 'Code', description: 'Contribute code improvements' }
      ]
    },
    {
      id: 'discord',
      name: 'Discord',
      title: 'Real-time Community Chat',
      icon: MessageCircle,
      description: 'Join our active Discord server for instant support, discussions, and real-time collaboration.',
      stats: { members: '23', online: '3', channels: '5', languages: '3' },
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Join Server', href: 'https://discord.gg/pgelephant', type: 'Support', description: 'Connect with the community' },
        { title: 'General Chat', href: 'https://discord.gg/pgelephant', type: 'Support', description: 'Casual discussions and introductions' },
        { title: 'Technical Support', href: 'https://discord.gg/pgelephant', type: 'Support', description: 'Get help with installation and usage' },
        { title: 'Development Channel', href: 'https://discord.gg/pgelephant', type: 'Code', description: 'Discuss code and architecture' },
        { title: 'Announcements', href: 'https://discord.gg/pgelephant', type: 'Documentation', description: 'Latest updates and releases' },
        { title: 'Voice Channels', href: 'https://discord.gg/pgelephant', type: 'Support', description: 'Voice calls and screen sharing' }
      ]
    },
    {
      id: 'forum',
      name: 'Community Forum',
      title: 'Discussions & Knowledge Base',
      icon: Users,
      description: 'Our comprehensive forum for detailed discussions, tutorials, and community knowledge sharing.',
      stats: { topics: '5', posts: '12', members: '8', solved: '75%' },
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/community', type: 'Documentation', description: 'New user guides and tutorials' },
        { title: 'Feature Requests', href: '/community', type: 'Documentation', description: 'Suggest new features and improvements' },
        { title: 'Troubleshooting', href: '/community', type: 'Support', description: 'Common issues and solutions' },
        { title: 'Showcase', href: '/community', type: 'Support', description: 'Share your projects and use cases' },
        { title: 'Community Events', href: '/community', type: 'Support', description: 'Webinars, meetups, and conferences' },
        { title: 'Contributor Spotlights', href: '/community', type: 'Support', description: 'Recognize community contributions' }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with elegant gradient background - same as main page */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
          position: 'relative'
        }}
      >
        {/* Elegant overlay gradient - same as Hero */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
          }}
        />
        
        {/* Elegant floating elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/15 to-accent-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
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

  <div className="container-wide py-28 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white drop-shadow-lg mb-6 drop-shadow-lg">
              Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white drop-shadow-lg/90 drop-shadow-md max-w-4xl mx-auto">
              Join our growing community of developers, users, and contributors building the future of PostgreSQL clustering.
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-thin text-white drop-shadow-lg drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Platforms - Enhanced Layout */}
      <div className="bg-white/95 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-16">
              {platforms.map((platform) => (
                <div key={platform.id} className="border-b border-gray-200 pb-16 last:border-b-0">
                  {/* Platform Header with Stats */}
                  <div className="flex flex-col lg:flex-row lg:items-center mb-8 gap-6">
                    <div className="flex items-center">
                      <div 
                        className="w-16 h-16 flex items-center justify-center mr-6 rounded-xl shadow-lg" 
                        style={{ 
                          backgroundColor: platform.id === 'github' ? '#24292e' : 
                                          platform.id === 'discord' ? '#5865f2' : '#f8fafc'
                        }}
                      >
                        <platform.icon 
                          className="w-8 h-8" 
                          style={{ 
                            color: platform.id === 'github' ? '#ffffff' : 
                                   platform.id === 'discord' ? '#ffffff' : '#6366f1'
                          }} 
                        />
                      </div>
                      <div>
                        <h3 className="text-3xl font-thin text-gray-900 mb-2">
                          {platform.name}
                        </h3>
                        <p className="text-lg text-gray-600 mb-2">
                          {platform.title}
                        </p>
                        <p className="text-gray-500 max-w-2xl">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Platform Stats */}
                    <div className="flex flex-wrap gap-4 lg:ml-auto">
                      {Object.entries(platform.stats).map(([key, value]) => (
                        <div key={key} className="text-center px-4 py-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                          <div className="text-lg font-thin text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Links - Enhanced Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {platform.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-start p-4 bg-gradient-to-br from-slate-50 to-slate-100 hover:bg-blue-50 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-blue-300 hover:shadow-md"
                      >
                        <div className="flex items-start w-full">
                          {(() => {
                            const IconComponent = getContributionIcon(link.type)
                            return <IconComponent className="w-5 h-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          })()}
                          <div className="flex-1 min-w-0">
                            <div className="font-thin text-gray-900 group-hover:text-blue-700 mb-1">
                              {link.title}
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                              {link.type}
                            </div>
                            <div className="text-xs text-gray-400 leading-relaxed">
                              {link.description}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-2 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={platform.links[0].href}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gradient-to-br from-slate-50 to-slate-100 transition-colors font-thin shadow-sm hover:shadow-md"
                    >
                      <platform.icon className="w-4 h-4 mr-2" />
                      Join {platform.name}
                    </Link>
                    <Link
                      href="/docs"
                      className="inline-flex items-center px-6 py-3 rounded-lg text-white drop-shadow-lg transition-colors font-thin shadow-sm hover:shadow-md"
                      style={{ backgroundColor: palette.cyan }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discord Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
          position: 'relative'
        }}
      >
        {/* Elegant overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
          }}
        />
        
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container-wide py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Discord Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-2xl">
                  <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-thin text-white drop-shadow-lg mb-2 drop-shadow-lg">
                    Discord
                  </h2>
                  <p className="text-xl text-white drop-shadow-lg/90 drop-shadow-md">
                    Real-time Community Chat
                  </p>
                </div>
              </div>
              <p className="text-lg text-white drop-shadow-lg/80 max-w-3xl mx-auto drop-shadow-sm">
                Join our active Discord server for instant support, discussions, and real-time collaboration.
              </p>
            </div>

            {/* Discord Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white drop-shadow-lg mb-2 drop-shadow-sm">23</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">members</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white drop-shadow-lg mb-2 drop-shadow-sm">3</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">online</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white drop-shadow-lg mb-2 drop-shadow-sm">5</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">channels</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white drop-shadow-lg mb-2 drop-shadow-sm">3</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">languages</div>
              </div>
            </div>

            {/* Discord Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* General Chat */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white drop-shadow-lg">General Chat</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Support</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Connect with the community
                </p>
                <p className="text-white drop-shadow-lg/60 text-xs">
                  Casual discussions and introductions
                </p>
              </div>

              {/* Technical Support */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white drop-shadow-lg">Technical Support</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Support</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Get help with installation and usage
                </p>
                <p className="text-white drop-shadow-lg/60 text-xs">
                  Expert assistance and troubleshooting
                </p>
              </div>

              {/* Development Channel */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white drop-shadow-lg">Development Channel</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Code</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Discuss code and architecture
                </p>
                <p className="text-white drop-shadow-lg/60 text-xs">
                  Technical discussions and code reviews
                </p>
              </div>

              {/* Announcements */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white drop-shadow-lg">Announcements</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Documentation</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Latest updates and releases
                </p>
                <p className="text-white drop-shadow-lg/60 text-xs">
                  Stay informed about new features
                </p>
              </div>

              {/* Voice Channels */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white drop-shadow-lg">Voice Channels</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Support</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Voice calls and screen sharing
                </p>
                <p className="text-white drop-shadow-lg/60 text-xs">
                  Real-time collaboration and meetings
                </p>
              </div>
            </div>

            {/* Discord Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://discord.gg/pgelephant"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white drop-shadow-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-thin shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm text-white drop-shadow-lg border border-white/20 rounded-xl hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-200 font-thin"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
          position: 'relative'
        }}
      >
        {/* Elegant overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
          }}
        />
        
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-slate-500/15 to-gray-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container-wide py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* GitHub Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-slate-800 rounded-2xl flex items-center justify-center mr-6 shadow-2xl">
                  <Github className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-lg">
                    GitHub
                  </h2>
                  <p className="text-xl text-white drop-shadow-lg/90 drop-shadow-md">
                    Source Code & Development
                  </p>
                </div>
              </div>
              <p className="text-lg text-white drop-shadow-lg/80 max-w-3xl mx-auto drop-shadow-sm">
                Contribute to open source PostgreSQL clustering solutions. Fork, star, and collaborate on our projects.
              </p>
            </div>

            {/* GitHub Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">3</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Projects</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">12</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Contributors</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">45</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Commits</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">2</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Stars</div>
              </div>
            </div>

            {/* GitHub Repositories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* RALE Repository */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">RALE</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Consensus Engine</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Distributed consensus and leader election
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white drop-shadow-lg/60">
                    <span>⭐ 1</span>
                    <span>🍴 0</span>
                  </div>
                  <Link
                    href="https://github.com/pgelephant/rale"
                    className="text-blue-400 hover:text-blue-300 text-xs font-bold"
                  >
                    View Repository →
                  </Link>
                </div>
              </div>

              {/* RAM Repository */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Server className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">RAM</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Clustering Manager</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  PostgreSQL clustering with auto-failover
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white drop-shadow-lg/60">
                    <span>⭐ 1</span>
                    <span>🍴 0</span>
                  </div>
                  <Link
                    href="https://github.com/pgelephant/ram"
                    className="text-blue-400 hover:text-blue-300 text-xs font-bold"
                  >
                    View Repository →
                  </Link>
                </div>
              </div>

              {/* FauxDB Repository */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Database className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">FauxDB</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">MongoDB Proxy</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  MongoDB wire protocol proxy for PostgreSQL
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white drop-shadow-lg/60">
                    <span>⭐ 0</span>
                    <span>🍴 0</span>
                  </div>
                  <Link
                    href="https://github.com/pgelephant/fauxdb"
                    className="text-blue-400 hover:text-blue-300 text-xs font-bold"
                  >
                    View Repository →
                  </Link>
                </div>
              </div>
            </div>

            {/* GitHub Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://github.com/pgelephant"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-slate-800 text-white drop-shadow-lg rounded-xl hover:from-gray-800 hover:to-slate-900 transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  View Organization
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm text-white drop-shadow-lg border border-white/20 rounded-xl hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-200 font-bold"
                >
                  Contribute Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Forum Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
          position: 'relative'
        }}
      >
        {/* Elegant overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
          }}
        />
        
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-teal-500/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container-wide py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Community Forum Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mr-6 shadow-2xl">
                  <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-lg">
                    Community Forum
                  </h2>
                  <p className="text-xl text-white drop-shadow-lg/90 drop-shadow-md">
                    Technical Discussions & Support
                  </p>
                </div>
              </div>
              <p className="text-lg text-white drop-shadow-lg/80 max-w-3xl mx-auto drop-shadow-sm">
                Join our community forum for technical discussions, troubleshooting, and sharing knowledge about PostgreSQL clustering.
              </p>
            </div>

            {/* Forum Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">156</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Topics</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">423</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Posts</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">89</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Members</div>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white drop-shadow-lg mb-2 drop-shadow-sm">12</div>
                <div className="text-sm text-white drop-shadow-lg/80 drop-shadow-sm">Categories</div>
              </div>
            </div>

            {/* Forum Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Installation & Setup */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <ArrowRight className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">Installation & Setup</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Getting Started</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Installation guides and initial setup
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    23 topics • 67 posts
                  </div>
                  <Link
                    href="/forum/installation"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>

              {/* Technical Support */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">Technical Support</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Help & Troubleshooting</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Get help with technical issues
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    45 topics • 123 posts
                  </div>
                  <Link
                    href="/forum/support"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>

              {/* Feature Requests */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Lightbulb className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">Feature Requests</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Suggestions & Ideas</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Propose new features and improvements
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    18 topics • 34 posts
                  </div>
                  <Link
                    href="/forum/features"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>

              {/* Development */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">Development</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Contributing</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Developer discussions and contributions
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    32 topics • 89 posts
                  </div>
                  <Link
                    href="/forum/development"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">Announcements</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">News & Updates</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  Latest news and product updates
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    12 topics • 25 posts
                  </div>
                  <Link
                    href="/forum/announcements"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>

              {/* General Discussion */}
              <div className="bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">General Discussion</h3>
                    <p className="text-sm text-white drop-shadow-lg/70">Community Chat</p>
                  </div>
                </div>
                <p className="text-white drop-shadow-lg/80 text-sm mb-4">
                  General discussions and community chat
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white drop-shadow-lg/60">
                    26 topics • 85 posts
                  </div>
                  <Link
                    href="/forum/general"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
                  >
                    View Forum →
                  </Link>
                </div>
              </div>
            </div>

            {/* Forum Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/forum"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white drop-shadow-lg rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Forum
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-sm/10 backdrop-blur-sm text-white drop-shadow-lg border border-white/20 rounded-xl hover:bg-white/95 backdrop-blur-sm/15 transition-all duration-200 font-bold"
                >
                  Forum Guidelines
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guidelines Section */}
      <div className="bg-white/95 backdrop-blur-sm py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-thin text-gray-900 mb-4">Community Guidelines</h2>
              <p className="text-lg text-gray-600">Our principles for a welcoming and productive community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guidelines.map((guideline, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <guideline.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-lg font-thin text-gray-900 mb-3">{guideline.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{guideline.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CommunityPage