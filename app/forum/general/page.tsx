import React from 'react'
import { MessagesSquare, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'General Discussion | pgElephant Forum',
  description: 'General PostgreSQL and pgElephant community discussions',
}

const ForumGeneralPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            General Discussion
          </h1>
          <p className="text-xl text-slate-300">
            Community conversations, questions, and sharing PostgreSQL experiences
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-indigo-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <MessagesSquare className="w-12 h-12 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Join the Discussion on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our General Discussion category is hosted on GitHub Discussions, where the community
                shares knowledge, asks questions, and connects with fellow PostgreSQL enthusiasts.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/general"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to General Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-indigo-300 mb-3">Discussion Topics</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>PostgreSQL best practices and patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Use case discussions and success stories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Database design and architecture questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Community events and meetups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Tips, tricks, and helpful resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Anything PostgreSQL or pgElephant related!</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-purple-300 mb-3">Community Guidelines</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Be respectful and welcoming to all community members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Stay on topic and keep discussions relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Search before posting to avoid duplicates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Share knowledge and help others when you can</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Use clear titles and provide context</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Mark helpful responses and thank contributors</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/40 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">🌟 Growing Community</h3>
            <p className="text-slate-300 text-sm">
              Join thousands of PostgreSQL users and developers sharing knowledge, solving
              problems together, and building amazing things with pgElephant.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/community" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
            <span className="font-semibold">Community</span>
            <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
            <span className="font-semibold">Documentation</span>
            <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumGeneralPage
