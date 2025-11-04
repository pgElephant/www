import React from 'react'
import { Code2, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Development | pgElephant Forum',
  description: 'Discuss development topics, contribution guidelines, and technical architecture',
}

const ForumDevelopmentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            Development
          </h1>
          <p className="text-xl text-slate-300">
            Contribute to pgElephant, discuss architecture, and collaborate on development
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-green-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Code2 className="w-12 h-12 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Join the Discussion on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our Development category is hosted on GitHub Discussions, where contributors
                discuss technical implementation, review pull requests, and plan features.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/development"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to Development Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-green-300 mb-3">Development Topics</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Contributing code and documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Architecture discussions and design decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Testing strategies and CI/CD pipelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Code reviews and pull request discussions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Extension development and plugin APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Performance benchmarking and optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-emerald-300 mb-3">Getting Started with Contributing</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Read the CONTRIBUTING.md guide in each repository</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Set up your development environment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Look for "good first issue" labels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Join discussions before starting major work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Follow code style and testing guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Write clear commit messages and PR descriptions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/40 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">🚀 Ready to Contribute?</h3>
            <p className="text-slate-300 text-sm mb-4">
              Check out our GitHub repositories and join the development discussions.
              All contributions, from bug fixes to new features, are welcome!
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/pgedge/pgedge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all"
              >
                GitHub Repository
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-400/50 transition-all group">
            <span className="font-semibold">Developer Documentation</span>
            <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/docs/api" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-400/50 transition-all group">
            <span className="font-semibold">API Reference</span>
            <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumDevelopmentPage
