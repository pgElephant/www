'use client'

import React from 'react'

import { Github, Heart, MessageCircle, Users, TrendingUp, Star, Globe, Zap } from 'lucide-react'

const Community = () => {
  const communityStats = [
    { icon: Users, label: 'Community Members', value: '2,400+' },
    { icon: Github, label: 'GitHub Stars', value: '2.4k+' },
    { icon: TrendingUp, label: 'Monthly Downloads', value: '15k+' },
    { icon: Star, label: 'Contributors', value: '150+' }
  ]

  const platforms = [
    {
      name: 'GitHub',
      description: 'Open source development and discussions',
      url: 'https://github.com/pgElephant/rale',
      icon: Github,
      color: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200',
      stats: '2.4k stars, 150+ contributors'
    },
    {
      name: 'Discord',
      description: 'Real-time community chat and support',
      url: '#',
      icon: MessageCircle,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      stats: '500+ members, active discussions'
    },
    {
      name: 'Blog',
      description: 'Latest updates, tutorials, and insights',
      url: '/blog',
      icon: Globe,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      stats: 'Monthly posts, technical deep dives'
    }
  ]

  const recentUpdates = [
    {
      title: 'v1.2.0 Release',
      description: 'Improved failover performance and enhanced monitoring',
      date: '2024-01-15',
      tag: 'Release'
    },
    {
      title: 'New Documentation',
      description: 'Comprehensive guides for multi-zone deployments',
      date: '2024-01-10',
      tag: 'Docs'
    },
    {
      title: 'Community Spotlight',
      description: 'Featured contributor: Sarah Chen from TechCorp',
      date: '2024-01-05',
      tag: 'Community'
    }
  ]

  const contributionAreas = [
    {
      title: 'Code Contributions',
      description: 'Help improve the core functionality and add new features',
      link: 'https://github.com/pgElephant/rale',
      icon: Github,
      color: 'text-green-600'
    },
    {
      title: 'Documentation',
      description: 'Write tutorials, improve guides, and help with API docs',
      link: 'https://github.com/pgElephant/rale',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      title: 'Bug Reports',
      description: 'Report issues and help improve stability',
      link: 'https://github.com/pgElephant/rale',
      icon: Zap,
      color: 'text-orange-600'
    },
    {
      title: 'Community Support',
      description: 'Help other users and share your experiences',
      link: '#',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  return (
    <section id="community" className="section-padding bg-gradient-to-br from-edbGray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-edbDark-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-edbGray-600 max-w-3xl mx-auto">
            Connect with developers, share experiences, and contribute to the future of PostgreSQL high availability.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div
              key={stat.label}
             
             
             
             
              className="text-center"
            >
              <div className="w-16 h-16 bg-edb-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-edb-600" />
              </div>
              <div className="text-2xl font-bold text-edbDark-900 mb-2">{stat.value}</div>
              <div className="text-edbGray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                  <platform.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-edbDark-900">{platform.name}</h3>
                  <p className="text-sm text-edbGray-600">{platform.description}</p>
                </div>
              </div>
              
              <p className="text-sm text-edbGray-600 mb-6">{platform.stats}</p>
              
              <a
                href={platform.url}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                target={platform.url.startsWith('http') ? '_blank' : undefined}
                rel={platform.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                Join {platform.name}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Contribution Areas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-edbDark-900 mb-4">
              How You Can Contribute
            </h3>
            <p className="text-lg text-edbGray-600 max-w-2xl mx-auto">
              There are many ways to get involved and help make pgelephant better for everyone.
            </p>
          </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionAreas.map((area, index) => (
              <div
                key={area.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="font-semibold text-edbDark-900 mb-2">{area.title}</h4>
                <p className="text-sm text-edbGray-600 mb-4">{area.description}</p>
                <a
                  href={area.link}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  target={area.link.startsWith('http') ? '_blank' : undefined}
                  rel={area.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  Get Started →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates & Blog */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Updates */}
          <div>
            <h3 className="text-2xl font-bold text-edbDark-900 mb-6">Recent Updates</h3>
            <div className="space-y-6">
              {recentUpdates.map((update, index) => (
                <div
                  key={update.title}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-edbDark-900">{update.title}</h4>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {update.tag}
                    </span>
                  </div>
                  <p className="text-edbGray-600 text-sm mb-3">{update.description}</p>
                  <div className="text-xs text-edbGray-500">{update.date}</div>
                </div>
              ))}
            </div>
            <button className="btn-edb-secondary mt-6">
              View All Updates
            </button>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-2xl font-bold text-edbDark-900 mb-6">Get Involved</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-edbDark-900 mb-3">Contribute Code</h4>
                <p className="text-edbGray-600 text-sm mb-4">
                  Help improve pgelephant by contributing code, documentation, or bug reports.
                </p>
                <a
                  href="https://github.com/pgElephant/rale"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Fork on GitHub
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-edbDark-900 mb-3">Share Your Story</h4>
                <p className="text-edbGray-600 text-sm mb-4">
                  Tell us how pgelephant helped your organization achieve high availability.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Submit Case Study
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-edbDark-900 mb-3">Help Others</h4>
                <p className="text-edbGray-600 text-sm mb-4">
                  Answer questions, share knowledge, and help new users in our community.
                </p>
                <a
                  href="https://discord.gg/pgelephant"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community 