'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, Clock, Send, Github, Linkedin, Twitter, Users } from 'lucide-react'
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
              Contact Us
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Get in touch with our team for support, sales, or technical questions.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Method Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center mr-4 rounded-lg" style={{ backgroundColor: method.id === 'github' ? '#24292e' : '#f8fafc' }}>
                      <method.icon 
                        className="w-8 h-8" 
                        style={{ 
                          color: method.id === 'github' ? '#ffffff' : 
                                 method.id === 'email' ? '#dc2626' : '#6366f1'
                        }} 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-1">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {method.title}
                      </p>
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-3">
                    {method.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          {(() => {
                            const IconComponent = getContactIcon(link.type)
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
                        href={method.links[0].href}
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                      >
                        Contact Now
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

      {/* Contact Form Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl text-gray-900 mb-6 text-center">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
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