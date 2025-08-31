'use client'

import React from 'react'
import { Github, MessageCircle, Users, BookOpen, Heart, Star, Calendar, Award, Code, Bug, FileText, Globe } from 'lucide-react'

const CommunityPage = () => {
  const communityPlatforms = [
    {
      icon: Github,
      title: 'GitHub',
      description: 'Source code, issues, and contributions',
      url: 'https://github.com/pgelephant/pgelephant',
      stats: '2.4k stars',
      color: 'bg-gray-800 hover:bg-gray-700',
      features: ['Source code', 'Issue tracking', 'Pull requests', 'Discussions']
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Real-time chat and support',
      url: 'https://discord.gg/pgelephant',
      stats: '500+ members',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      features: ['Real-time chat', 'Support channels', 'Community events', 'Voice channels']
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Discussions and Q&A',
      url: 'https://community.pgelephant.com',
      stats: 'Active discussions',
      color: 'bg-green-600 hover:bg-green-700',
      features: ['Q&A forum', 'Best practices', 'Troubleshooting', 'Feature requests']
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API docs',
      url: 'https://docs.pgelephant.com',
      stats: 'Complete docs',
      color: 'bg-blue-600 hover:bg-blue-700',
      features: ['User guides', 'API reference', 'Tutorials', 'Examples']
    }
  ]

  const contributionAreas = [
    {
      icon: Code,
      title: 'Code Contributions',
      description: 'Help improve pgelephant by contributing code, bug fixes, and new features.',
      difficulty: 'Intermediate',
      timeCommitment: '2-10 hours',
      skills: ['Go', 'PostgreSQL', 'Distributed systems'],
      link: 'https://github.com/pgelephant/pgelephant/blob/main/CONTRIBUTING.md'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Improve our documentation, write tutorials, or translate content.',
      difficulty: 'Beginner',
      timeCommitment: '1-5 hours',
      skills: ['Technical writing', 'Markdown', 'PostgreSQL'],
      link: 'https://github.com/pgelephant/pgelephant/tree/main/docs'
    },
    {
      icon: Bug,
      title: 'Bug Reports',
      description: 'Report bugs, test releases, and help improve stability.',
      difficulty: 'Beginner',
      timeCommitment: '30 min - 2 hours',
      skills: ['Testing', 'Problem solving'],
      link: 'https://github.com/pgelephant/pgelephant/issues'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Help other users in Discord, forums, and GitHub discussions.',
      difficulty: 'Beginner',
      timeCommitment: '1-3 hours',
      skills: ['Communication', 'PostgreSQL', 'Problem solving'],
      link: 'https://discord.gg/pgelephant'
    }
  ]

  const upcomingEvents = [
    {
      title: 'pgelephant Community Meetup',
      date: '2024-02-15',
      time: '6:00 PM UTC',
      type: 'Virtual',
      description: 'Monthly community meetup with technical talks and networking.',
      attendees: 45
    },
    {
      title: 'PostgreSQL Conference 2024',
      date: '2024-03-20',
      time: 'All day',
      type: 'In-person',
      description: 'pgelephant team presenting on PostgreSQL high availability.',
      attendees: 200
    },
    {
      title: 'Contributor Workshop',
      date: '2024-02-28',
      time: '2:00 PM UTC',
      type: 'Virtual',
      description: 'Learn how to contribute to pgelephant with hands-on guidance.',
      attendees: 25
    }
  ]

  const stats = [
    { label: 'GitHub Stars', value: '2.4k+', icon: Star },
    { label: 'Community Members', value: '500+', icon: Users },
    { label: 'Contributors', value: '50+', icon: Heart },
    { label: 'Uptime Achieved', value: '99.9%', icon: Award }
  ]

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
              Community
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of developers building the future of PostgreSQL high availability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-slate-300">
                <Users className="w-5 h-5 mr-2" />
                <span>500+ members worldwide</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Heart className="w-5 h-5 mr-2" />
                <span>Open source & welcoming</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Globe className="w-5 h-5 mr-2" />
                <span>Global community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-400/30">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-teal-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Platforms */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Join the Conversation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityPlatforms.map((platform) => (
            <a
              key={platform.title}
              href={platform.url}
              className={`${platform.color} text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <platform.icon className="w-12 h-12" />
                <Star className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
              <p className="text-white/80 mb-4">{platform.description}</p>
              <div className="text-white/60 text-sm font-medium mb-4">{platform.stats}</div>
              <ul className="space-y-1">
                {platform.features.map((feature) => (
                  <li key={feature} className="text-white/70 text-sm">• {feature}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>

      {/* Contribution Opportunities */}
      <div className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Contribute to pgelephant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributionAreas.map((area) => (
              <div key={area.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-slate-100/20 rounded-lg flex items-center justify-center mr-3 border border-slate-400/30">
                    <area.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                    <p className="text-sm text-slate-300">{area.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Difficulty</div>
                    <div className="text-sm font-medium text-white">{area.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Time Commitment</div>
                    <div className="text-sm font-medium text-white">{area.timeCommitment}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">Skills needed</div>
                  <div className="flex flex-wrap gap-1">
                    {area.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-slate-100/20 text-slate-300 rounded text-xs border border-slate-400/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={area.link}
                  className="inline-flex items-center text-teal-300 hover:text-teal-200 font-medium text-sm"
                >
                  Get started
                  <Globe className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2 py-1 bg-teal-400/20 text-teal-300 rounded-full text-xs font-medium">
                  {event.type}
                </span>
                <div className="flex items-center text-xs text-slate-400">
                  <Users className="w-3 h-3 mr-1" />
                  {event.attendees} attending
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-slate-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{event.date} at {event.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 text-white font-semibold rounded-lg hover:bg-slate-400/20 transition-colors">
            View all events
          </button>
        </div>
      </div>

      {/* Get Involved CTA */}
      <div className="bg-white/10 backdrop-blur-sm py-16 border-t border-slate-400/30">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you're a PostgreSQL expert or just getting started, there's a place for you in the pgelephant community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/pgElephant/rale"
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              Join on GitHub
            </a>
            <a
              href="https://discord.gg/pgelephant"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage 