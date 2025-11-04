import React from 'react'
import { LifeBuoy, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Technical Support | pgElephant Forum',
  description: 'Get technical support and troubleshooting help for pgElephant products',
}

const ForumSupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Technical Support
          </h1>
          <p className="text-xl text-slate-300">
            Get help troubleshooting issues, debugging errors, and optimizing performance
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <LifeBuoy className="w-12 h-12 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Join the Discussion on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our Technical Support category is hosted on GitHub Discussions, where our community
                and maintainers can help you resolve issues and optimize your deployments.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to Support Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-purple-300 mb-3">Common Support Topics</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Connection and authentication issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Performance tuning and optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Error messages and debugging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Replication and high availability setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Configuration and tuning recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Migration and upgrade assistance</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-pink-300 mb-3">How to Get the Best Help</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Provide a clear description of the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Include complete error messages and stack traces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Share relevant configuration files and settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Describe steps to reproduce the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Mention what you've already tried</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Include PostgreSQL version and OS details</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
            <span className="font-semibold">Documentation</span>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/docs/troubleshooting" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
            <span className="font-semibold">Troubleshooting Guides</span>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumSupportPage
