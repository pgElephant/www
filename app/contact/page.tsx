'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, Clock, Send, Github, Linkedin, Twitter, Users } from 'lucide-react'
import Link from 'next/link'

// Use theme config colors
import { colors } from '@/config/theme'

const palette = {
  iconTeal: colors.secondary[700],
  iconTealLight: colors.secondary[600],
  iconTealMedium: colors.secondary[700],
  iconTealDark: colors.secondary[800],
  // Supporting colors from theme
  navy: colors.cool[800],
  navyDeep: colors.cool[900],
  slate: colors.cool[700],
  cyan: colors.secondary[500],
  cyanDeep: colors.secondary[600],
  teal: colors.accent[500],
  tealDeep: colors.accent[600],
  gray100: colors.cool[50],
  gray300: colors.cool[300],
  white: colors.white,
  orange: '#F97316', // Keep specific orange for contact page
  orangeDark: '#EA580C'
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `)

    const mailtoLink = `mailto:contact@pgelephant.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
  }

  const contactMethods = [
    {
      id: 'email',
      name: 'Email',
      title: 'General Inquiries',
      icon: Mail,
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'General Support', href: 'mailto:support@pgelephant.com', type: 'Support' },
        { title: 'Sales Inquiries', href: 'mailto:sales@pgelephant.com', type: 'Sales' },
        { title: 'Technical Support', href: 'mailto:tech@pgelephant.com', type: 'Technical' }
      ]
    },
    {
      id: 'github',
      name: 'GitHub',
      title: 'Technical Issues',
      icon: Github,
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Report Bug', href: 'https://github.com/pgelephant/issues', type: 'Bug' },
        { title: 'Feature Request', href: 'https://github.com/pgelephant/issues', type: 'Feature' },
        { title: 'Code Discussion', href: 'https://github.com/pgelephant/discussions', type: 'Code' }
      ]
    },
    {
      id: 'community',
      name: 'Community',
      title: 'Discussions & Help',
      icon: MessageCircle,
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Discord Server', href: 'https://discord.gg/pgelephant', type: 'Chat' },
        { title: 'Forum Discussion', href: '/community', type: 'Forum' },
        { title: 'Documentation', href: '/docs', type: 'Docs' }
      ]
    }
  ]

  // Function to get appropriate icon for contact type
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'Support':
        return MessageCircle
      case 'Sales':
        return Mail
      case 'Technical':
        return Github
      case 'Bug':
        return Github
      case 'Feature':
        return Github
      case 'Code':
        return Github
      case 'Chat':
        return MessageCircle
      case 'Forum':
        return MessageCircle
      case 'Docs':
        return MessageCircle
      default:
        return Mail
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden flex items-center h-[400px] md:h-[400px] pt-20"
        style={{
          backgroundColor: '#111827'
        }}
      >
        <div className="container-extra-wide mx-auto relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl font-normal mb-8 leading-relaxed text-white">
                Get in touch with our team for support, sales, or technical questions. We're here to help you succeed with pgElephant's enterprise-grade PostgreSQL solutions.
              </p>

              {/* Contact Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-thin text-white mb-2">&lt; 2hrs</div>
                  <div className="text-sm text-white">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-thin text-white mb-2">24/7</div>
                  <div className="text-sm text-white">Enterprise Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-thin text-white mb-2">99.9%</div>
                  <div className="text-sm text-white">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Contact Methods */}
      <div className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            {/* Professional Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-thin text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Connect with our team through multiple channels. We're here to help with enterprise support, technical questions, and partnership opportunities.
              </p>
            </div>

            {/* Professional Contact Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Enterprise Support */}
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-thin text-white mb-1">
                      Enterprise Support
                    </h3>
                    <p className="text-sm text-white/80">
                      Premium technical assistance
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm/70 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">General Support</div>
                        <div className="text-xs text-white/70">support@pgelephant.com</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm/70 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Sales Inquiries</div>
                        <div className="text-xs text-white/70">sales@pgelephant.com</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm/70 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Technical Support</div>
                        <div className="text-xs text-white/70">tech@pgelephant.com</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <Link
                    href="mailto:support@pgelephant.com"
                    className="block w-full text-center py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-thin"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              {/* Technical Community */}
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-slate-800 rounded-xl flex items-center justify-center mr-4">
                    <Github className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-thin text-white mb-1">
                      Technical Community
                    </h3>
                    <p className="text-sm text-white/80">
                      Open source collaboration
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Report Bug</div>
                        <div className="text-xs text-white/70">GitHub Issues</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Feature Request</div>
                        <div className="text-xs text-white/70">GitHub Discussions</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Code Discussion</div>
                        <div className="text-xs text-white/70">Developer Community</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <Link
                    href="https://github.com/pgelephant"
                    className="block w-full text-center py-3 px-6 bg-gradient-to-r from-gray-700 to-slate-800 text-white rounded-lg hover:from-gray-800 hover:to-slate-900 transition-all duration-200 font-thin"
                  >
                    Visit GitHub
                  </Link>
                </div>
              </div>

              {/* Community Platform */}
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-thin text-white mb-1">
                      Community Platform
                    </h3>
                    <p className="text-sm text-white/80">
                      Discussions & collaboration
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Discord Server</div>
                        <div className="text-xs text-white/70">Real-time chat</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Forum Discussion</div>
                        <div className="text-xs text-white/70">Technical forums</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-thin text-white">Documentation</div>
                        <div className="text-xs text-white/70">Comprehensive guides</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <Link
                    href="/community"
                    className="block w-full text-center py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-thin"
                  >
                    Join Community
                  </Link>
                </div>
              </div>
            </div>

            {/* Professional Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-thin text-white mb-2">24/7</div>
                  <div className="text-sm text-white/80">Enterprise Support</div>
                </div>
                <div>
                  <div className="text-3xl font-thin text-white mb-2">&lt;2h</div>
                  <div className="text-sm text-white/80">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-thin text-white mb-2">99.9%</div>
                  <div className="text-sm text-white/80">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-thin text-white mb-2">Global</div>
                  <div className="text-sm text-white/80">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Contact Form Section */}
      <div className="py-24" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-thin text-white mb-4">
                Send us a Message
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have a question or need support? Send us a message and we'll get back to you within 2 hours.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-white/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none text-white placeholder-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg text-white transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ backgroundColor: palette.orange }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.orangeDark}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.orange}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage