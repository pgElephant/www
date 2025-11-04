import React from 'react'
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Feature Requests | pgElephant Forum',
  description: 'Suggest new features and enhancements for pgElephant products',
}

const ForumFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            Feature Requests
          </h1>
          <p className="text-xl text-slate-300">
            Suggest new features, enhancements, and improvements for pgElephant products
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-teal-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-teal-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Join the Discussion on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our Feature Requests category is hosted on GitHub Discussions. Share your ideas,
                vote on features, and collaborate with the community to shape the future of pgElephant.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/features"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to Feature Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-teal-300 mb-3">Types of Feature Requests</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>New product features and capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>API enhancements and new endpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Performance improvements and optimizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Developer experience improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Integration with third-party tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Documentation and examples</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-cyan-300 mb-3">Writing a Great Feature Request</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Describe the problem or use case</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Explain the proposed solution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Provide examples or mockups if applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Consider alternatives you've thought of</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Explain the impact and benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Check if similar requests already exist</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/40 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">💡 Pro Tip</h3>
            <p className="text-slate-300 text-sm">
              Use GitHub's reaction system to vote on feature requests you'd like to see.
              The most popular requests often get prioritized for development.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
            <span className="font-semibold">Documentation</span>
            <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/roadmap" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
            <span className="font-semibold">Roadmap</span>
            <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumFeaturesPage
