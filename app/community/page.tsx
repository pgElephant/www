'use client'

import React from 'react'
import { Github, MessageCircle, Users, BookOpen, ArrowRight, Code, Bug, FileText, Heart, Star } from 'lucide-react'
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

  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      title: 'Source Code & Development',
      icon: Github,
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'Repository', href: 'https://github.com/pgelephant', type: 'Code' },
        { title: 'Issues', href: 'https://github.com/pgelephant/issues', type: 'Support' },
        { title: 'Pull Requests', href: 'https://github.com/pgelephant/pulls', type: 'Code' }
      ]
    },
    {
      id: 'discord',
      name: 'Discord',
      title: 'Real-time Community Chat',
      icon: MessageCircle,
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Join Server', href: 'https://discord.gg/pgelephant', type: 'Support' },
        { title: 'Support Channel', href: 'https://discord.gg/pgelephant', type: 'Support' },
        { title: 'Development', href: 'https://discord.gg/pgelephant', type: 'Code' }
      ]
    },
    {
      id: 'forum',
      name: 'Forum',
      title: 'Discussions & Q&A',
      icon: Users,
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'General Discussion', href: '/community', type: 'Support' },
        { title: 'Features', href: '/community', type: 'Documentation' },
        { title: 'Troubleshooting', href: '/community', type: 'Support' }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with gradient background */}
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
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Community
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Join our vibrant community of developers, users, and contributors.
            </p>
          </div>
        </div>
      </div>

      {/* Community Platforms */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Platform Header */}
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 flex items-center justify-center mr-4 rounded-lg" 
                      style={{ 
                        backgroundColor: platform.id === 'github' ? '#24292e' : 
                                        platform.id === 'discord' ? '#5865f2' : '#f8fafc'
                      }}
                    >
                      {typeof platform.icon === 'string' ? (
                        <img 
                          src={platform.icon} 
                          alt={`${platform.name} icon`}
                          className="w-14 h-14 object-contain"
                        />
                      ) : (
                        <platform.icon 
                          className="w-8 h-8" 
                          style={{ 
                            color: platform.id === 'github' ? '#ffffff' : 
                                   platform.id === 'discord' ? '#ffffff' : '#6366f1'
                          }} 
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-1">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {platform.title}
                      </p>
                    </div>
                  </div>

                  {/* Community Links */}
                  <div className="space-y-3">
                    {platform.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          {(() => {
                            const IconComponent = getContributionIcon(link.type)
                            return <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                          })()}
                          <div>
                            <span className="text-xs text-gray-900 whitespace-nowrap">
                              {link.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {link.type}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </Link>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Link
                        href={platform.links[0].href}
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                      >
                        Join Now
                      </Link>
                      <Link
                        href="/docs"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs"
                        style={{ backgroundColor: palette.cyan }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
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