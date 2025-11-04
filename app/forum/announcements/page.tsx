import React from 'react'
import { Megaphone, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Announcements | pgElephant Forum',
  description: 'Official product announcements, releases, and important updates',
}

const ForumAnnouncementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <Link href="/forum" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Forum
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">
            Announcements
          </h1>
          <p className="text-xl text-slate-300">
            Official product announcements, releases, and important pgElephant updates
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-orange-400/30 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Megaphone className="w-12 h-12 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Stay Updated on GitHub</h2>
              <p className="text-slate-300 mb-6">
                Our Announcements category is hosted on GitHub Discussions, where we share
                official news, release notes, security updates, and important information.
              </p>
              <a
                href="https://github.com/pgedge/pgedge/discussions/categories/announcements"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Go to Announcements
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-orange-300 mb-3">What Gets Announced</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>New product releases and version updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Security advisories and patches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Major feature launches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Breaking changes and deprecations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Community events and webinars</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Important maintenance windows</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-amber-300 mb-3">Stay Informed</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Watch the GitHub repository to get notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Subscribe to the Announcements category</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Follow us on social media for instant updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Check the changelog for detailed release notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">✓</span>
                <span>Join our community Slack for real-time discussions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">📢 Important</h3>
            <p className="text-slate-300 text-sm">
              Security announcements are posted here immediately. We recommend all users
              subscribe to announcements to stay informed about critical security updates.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/blog" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all group">
            <span className="font-semibold">Blog</span>
            <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/changelog" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-400/50 transition-all group">
            <span className="font-semibold">Changelog</span>
            <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForumAnnouncementsPage
