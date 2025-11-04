import React from 'react'
import { MessageSquare, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Installation Support | pgElephant Forum',
  description: 'Get help with installing pgElephant products and extensions',
}

const ForumInstallationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Installation Support
          </h1>
          <p className="text-xl text-slate-300">
            Get help with installing pgElephant products, extensions, and dependencies
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-blue-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <MessageSquare className="w-12 h-12 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Join the Discussion on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our Installation Support category is hosted on GitHub Discussions, making it easy to get help,
                share solutions, and collaborate with the community.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/installation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to Installation Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-blue-300 mb-3">Common Installation Topics</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Installing pgElephant on various Linux distributions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Docker and container deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>PostgreSQL extension installation and configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Dependency resolution and package conflicts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Upgrading from previous versions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Troubleshooting installation errors</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-cyan-300 mb-3">Before Posting</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Check the documentation for your product</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Search existing discussions for similar issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Include your OS version, PostgreSQL version, and error messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Provide installation logs or relevant command output</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
            <span className="font-semibold">Documentation</span>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/docs/getting-started" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
            <span className="font-semibold">Getting Started</span>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumInstallationPage
