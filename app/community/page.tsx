'use client'

import React from 'react'
import { Github, MessageCircle, Users, BookOpen, ArrowRight, Code, Bug, FileText, Heart, Star, Zap, Trophy, Award, TrendingUp, Globe, Calendar, Clock, UserCheck, Shield, Lightbulb, Server, Database } from 'lucide-react'
import Link from 'next/link'

// Use theme config colors
import { colors } from '@/config/theme'

const palette = {
  iconTeal: colors.secondary[700],
  iconTealLight: colors.secondary[600],
  iconTealMedium: colors.secondary[700],
  iconTealDark: colors.secondary[800],
  // Supporting colors from theme
  navy: colors.cool[800],
  navyDeep: colors.cool[900],
  slate: colors.cool[700],
  cyan: colors.secondary[500],
  cyanDeep: colors.secondary[600],
  teal: colors.accent[500],
  tealDeep: colors.accent[600],
  gray100: colors.cool[50],
  gray300: colors.cool[300],
  white: colors.white,
  orange: '#F97316', // Keep specific orange for community page
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
      description: 'Our community follows a code of conduct to ensure a safe and inclusive environment.'
    },
    {
      icon: Lightbulb,
      title: 'Share Knowledge',
      description: 'Help others learn and grow. Share your expertise and learn from the community.'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Work together to build something useful. Collaboration is important.'
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
      {/* Hero Section with technical background - same as main page */}
      <div 
        className="relative overflow-hidden bg-hero-gradient"
        style={{ 
          position: 'relative'
        }}
      >

        <div className="container-extra-wide relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white mb-6 drop-shadow-lg">
              Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white max-w-4xl mx-auto drop-shadow-lg">
              Join our growing community of developers, users, and contributors building the future of PostgreSQL clustering.
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-thin text-white mb-2 drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm text-white/80 drop-shadow-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community Platforms - Enhanced Layout */}
      <div className="py-20 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-16">
              {platforms.map((platform) => (
                <div key={platform.id} className="border-b border-white/20 pb-16 last:border-b-0">
                  {/* Platform Header with Stats */}
                  <div className="flex flex-col lg:flex-row lg:items-center mb-8 gap-6">
                    <div className="flex items-center">
                      <div 
                        className="w-16 h-16 flex items-center justify-center mr-6 rounded-xl" 
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
                        <h3 className="text-3xl font-thin text-white mb-2">
                          {platform.name}
                        </h3>
                        <p className="text-lg text-white mb-2">
                          {platform.title}
                        </p>
                        <p className="text-white/80 max-w-2xl">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Platform Stats */}
                    <div className="flex flex-wrap gap-4 lg:ml-auto">
                      {Object.entries(platform.stats).map(([key, value]) => (
                        <div key={key} className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <div className="text-lg font-thin text-white">{value}</div>
                          <div className="text-xs text-white/80 capitalize">{key}</div>
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
                        className="flex items-start p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all duration-300 group border border-white/20 hover:border-blue-400"
                      >
                        <div className="flex items-start w-full">
                          {(() => {
                            const IconComponent = getContributionIcon(link.type)
                            return <IconComponent className="w-5 h-5 mr-3 text-white/70 mt-0.5 flex-shrink-0" />
                          })()}
                          <div className="flex-1 min-w-0">
                            <div className="font-thin text-white group-hover:text-blue-300 mb-1">
                              {link.title}
                            </div>
                            <div className="text-sm text-white/70 mb-2">
                              {link.type}
                            </div>
                            <div className="text-xs text-white/60 leading-relaxed">
                              {link.description}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-blue-400 transition-colors ml-2 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={platform.links[0].href}
                      className="inline-flex items-center px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors font-thin"
                    >
                      <platform.icon className="w-4 h-4 mr-2" />
                      Join {platform.name}
                    </Link>
                    <Link
                      href="/docs"
                      className="inline-flex items-center px-6 py-3 rounded-lg text-white transition-colors font-thin"
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
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
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
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-6 ">
                  <MessageCircle className="w-10 h-10 text-white " />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-thin text-white mb-2">
                    Discord
                  </h2>
                  <p className="text-xl text-white /90 ">
                    Real-time Community Chat
                  </p>
                </div>
              </div>
              <p className="text-lg text-white /80 max-w-3xl mx-auto ">
                Join our active Discord server for instant support, discussions, and real-time collaboration.
              </p>
            </div>

            {/* Discord Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white  mb-2 ">23</div>
                <div className="text-sm text-white /80 ">members</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white  mb-2 ">3</div>
                <div className="text-sm text-white /80 ">online</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white  mb-2 ">5</div>
                <div className="text-sm text-white /80 ">channels</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-thin text-white  mb-2 ">3</div>
                <div className="text-sm text-white /80 ">languages</div>
              </div>
            </div>

            {/* Discord Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* General Chat */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white ">General Chat</h3>
                    <p className="text-sm text-white /70">Support</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Connect with the community
                </p>
                <p className="text-white /60 text-xs">
                  Casual discussions and introductions
                </p>
              </div>

              {/* Technical Support */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white ">Technical Support</h3>
                    <p className="text-sm text-white /70">Support</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Get help with installation and usage
                </p>
                <p className="text-white /60 text-xs">
                  Expert assistance and troubleshooting
                </p>
              </div>

              {/* Development Channel */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white ">Development Channel</h3>
                    <p className="text-sm text-white /70">Code</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Discuss code and architecture
                </p>
                <p className="text-white /60 text-xs">
                  Technical discussions and code reviews
                </p>
              </div>

              {/* Announcements */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white ">Announcements</h3>
                    <p className="text-sm text-white /70">Documentation</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Latest updates and releases
                </p>
                <p className="text-white /60 text-xs">
                  Stay informed about new features
                </p>
              </div>

              {/* Voice Channels */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white ">Voice Channels</h3>
                    <p className="text-sm text-white /70">Support</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Voice calls and screen sharing
                </p>
                <p className="text-white /60 text-xs">
                  Real-time collaboration and meetings
                </p>
              </div>
            </div>

            {/* Discord Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://discord.gg/pgelephant"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white  rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-thin  hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white  border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 font-thin"
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
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
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
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-slate-800 rounded-2xl flex items-center justify-center mr-6 ">
                  <Github className="w-10 h-10 text-white " />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    GitHub
                  </h2>
                  <p className="text-xl text-white /90 ">
                    Source Code & Development
                  </p>
                </div>
              </div>
              <p className="text-lg text-white /80 max-w-3xl mx-auto ">
                Contribute to open source PostgreSQL clustering solutions. Fork, star, and collaborate on our projects.
              </p>
            </div>

            {/* GitHub Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">3</div>
                <div className="text-sm text-white /80 ">Projects</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">12</div>
                <div className="text-sm text-white /80 ">Contributors</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">45</div>
                <div className="text-sm text-white /80 ">Commits</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">2</div>
                <div className="text-sm text-white /80 ">Stars</div>
              </div>
            </div>

            {/* GitHub Repositories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* RALE Repository */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">RALE</h3>
                    <p className="text-sm text-white /70">Consensus Engine</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Distributed consensus and leader election
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Server className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">RAM</h3>
                    <p className="text-sm text-white /70">Clustering Manager</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  PostgreSQL clustering with auto-failover
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Database className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">FauxDB</h3>
                    <p className="text-sm text-white /70">MongoDB Proxy</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  MongoDB wire protocol proxy for PostgreSQL
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white /60">
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
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-slate-800 text-white  rounded-xl hover:from-gray-800 hover:to-slate-900 transition-all duration-200 font-bold  hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  View Organization
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white  border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 font-bold"
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
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
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
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mr-6 ">
                  <MessageCircle className="w-10 h-10 text-white " />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Community Forum
                  </h2>
                  <p className="text-xl text-white /90 ">
                    Technical Discussions & Support
                  </p>
                </div>
              </div>
              <p className="text-lg text-white /80 max-w-3xl mx-auto ">
                Join our community forum for technical discussions, troubleshooting, and sharing knowledge about PostgreSQL clustering.
              </p>
            </div>

            {/* Forum Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">156</div>
                <div className="text-sm text-white /80 ">Topics</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">423</div>
                <div className="text-sm text-white /80 ">Posts</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">89</div>
                <div className="text-sm text-white /80 ">Members</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white  mb-2 ">12</div>
                <div className="text-sm text-white /80 ">Categories</div>
              </div>
            </div>

            {/* Forum Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Installation & Setup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <ArrowRight className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">Installation & Setup</h3>
                    <p className="text-sm text-white /70">Getting Started</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Installation guides and initial setup
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">Technical Support</h3>
                    <p className="text-sm text-white /70">Help & Troubleshooting</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Get help with technical issues
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Lightbulb className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">Feature Requests</h3>
                    <p className="text-sm text-white /70">Suggestions & Ideas</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Propose new features and improvements
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">Development</h3>
                    <p className="text-sm text-white /70">Contributing</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Developer discussions and contributions
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">Announcements</h3>
                    <p className="text-sm text-white /70">News & Updates</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  Latest news and product updates
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white ">General Discussion</h3>
                    <p className="text-sm text-white /70">Community Chat</p>
                  </div>
                </div>
                <p className="text-white /80 text-sm mb-4">
                  General discussions and community chat
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white /60">
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
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white  rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-bold  hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Forum
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white  border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 font-bold"
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
      <div 
        className="py-20 relative overflow-hidden"
        style={{ 
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
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

        <div className="container-wide relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-thin text-white mb-4">Community Guidelines</h2>
              <p className="text-lg text-white/90">Our principles for a welcoming and productive community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guidelines.map((guideline, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <guideline.icon className="w-8 h-8 text-white " />
                  </div>
                  <h3 className="text-lg font-thin text-white mb-3">{guideline.title}</h3>
                  <p className="text-white/80 leading-relaxed">{guideline.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CommunityPage