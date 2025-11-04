import React from 'react'
import { MessageCircle, Github, ArrowRight, ExternalLink, HelpCircle, Code, Megaphone, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Community Forum | pgElephant',
  description: 'Join the pgElephant community discussions, get help, and share your experiences',
}

const ForumPage = () => {
  const forumCategories = [
    {
      id: 'installation',
      title: 'Installation & Setup',
      description: 'Get help installing and configuring pgElephant products',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30',
      githubLabel: 'installation',
      threads: 12,
      posts: 45
    },
    {
      id: 'support',
      title: 'Support & Help',
      description: 'Ask questions and get help from the community',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30',
      githubLabel: 'question',
      threads: 28,
      posts: 156
    },
    {
      id: 'features',
      title: 'Feature Requests',
      description: 'Suggest new features and vote on existing proposals',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30',
      githubLabel: 'enhancement',
      threads: 18,
      posts: 92
    },
    {
      id: 'development',
      title: 'Development Discussion',
      description: 'Technical discussions about development and internals',
      icon: <Code className="w-8 h-8" />,
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-400/30',
      githubLabel: 'development',
      threads: 15,
      posts: 78
    },
    {
      id: 'announcements',
      title: 'Announcements',
      description: 'Official announcements about releases and updates',
      icon: <Megaphone className="w-8 h-8" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-400/30',
      githubLabel: 'announcement',
      threads: 8,
      posts: 24
    },
    {
      id: 'general',
      title: 'General Discussion',
      description: 'Everything else about pgElephant and PostgreSQL',
      icon: <Users className="w-8 h-8" />,
      color: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-400/30',
      githubLabel: 'discussion',
      threads: 34,
      posts: 187
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link 
            href="/community" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Community
          </Link>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Community Forum
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Join discussions, get help, and collaborate with the pgElephant community. 
            All discussions are hosted on GitHub Discussions for seamless integration with our development workflow.
          </p>
        </div>

        {/* GitHub Discussions CTA */}
        <div className="mb-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-400/30 flex-shrink-0">
              <Github className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">
                Join us on GitHub Discussions
              </h2>
              <p className="text-slate-300 mb-6">
                Our forum is powered by GitHub Discussions, providing a seamless experience for technical discussions, 
                feature requests, and community support. Sign in with your GitHub account to participate.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/pgElephant/www/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Open GitHub Discussions
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/20 transition-colors"
                >
                  View Documentation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Discussion Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forumCategories.map((category) => (
              <a
                key={category.id}
                href={`https://github.com/pgElephant/www/discussions/categories/${category.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gradient-to-br ${category.color} backdrop-blur-sm rounded-xl p-6 border-2 ${category.borderColor} hover:border-opacity-60 transition-all hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center border ${category.borderColor} text-white group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors ml-auto" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-4 border-t border-white/10">
                  <span>{category.threads} threads</span>
                  <span>•</span>
                  <span>{category.posts} posts</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Need Help?
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Check our documentation first - you might find your answer there!
            </p>
            <Link 
              href="/docs"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
            >
              Browse Documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Github className="w-5 h-5 text-purple-400" />
              Found a Bug?
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Report issues directly on GitHub for faster resolution.
            </p>
            <a 
              href="https://github.com/pgElephant/www/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
            >
              Report an Issue
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-400" />
              Want to Contribute?
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Join our development discussions and contribute to pgElephant.
            </p>
            <Link 
              href="/community"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Be Respectful</h3>
              <p className="text-slate-300 text-sm">
                Treat everyone with respect. We're all here to learn and help each other.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Stay On Topic</h3>
              <p className="text-slate-300 text-sm">
                Keep discussions relevant to pgElephant and PostgreSQL-related topics.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Search First</h3>
              <p className="text-slate-300 text-sm">
                Before posting, search for existing discussions to avoid duplicates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Provide Details</h3>
              <p className="text-slate-300 text-sm">
                When asking for help, include version numbers, error messages, and steps to reproduce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumPage
