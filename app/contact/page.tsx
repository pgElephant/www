'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Inquiry Type: ${formData.inquiryType}
Message: ${formData.message}
      `)
      
      const mailtoLink = `mailto:admin@pgelephant.com?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink
      
      // Show success message after a brief delay
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSubmitting(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error opening email client:', error)
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'admin@pgelephant.com',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Community Support',
      details: 'Discord & GitHub',
      description: 'Get help from our community and developers'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 24 hours',
      description: 'We typically respond within one business day'
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales & Licensing' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'other', label: 'Other' }
  ]

  if (isSubmitted) {
    return (
      <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 min-h-screen">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-slate-400/30">
              <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
              <p className="text-slate-300 mb-8 text-lg">
                Thank you for reaching out. We've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    subject: '',
                    message: '',
                    inquiryType: 'general'
                  })
                }}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 min-h-screen">
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
              Contact Us
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Get in touch with our team. We're here to help with your PostgreSQL high availability needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-400/30">
              <div className="w-16 h-16 bg-teal-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-400/30">
                <info.icon className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
              <p className="text-teal-300 font-medium mb-2">{info.details}</p>
              <p className="text-slate-300 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
              <p className="text-slate-300">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-white mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-slate-800 text-white">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50 focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 text-white font-semibold rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
