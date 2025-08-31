'use client'

import React, { useState } from 'react'

import { Check, ArrowRight, Zap, Shield, Globe, Star, Users, Clock, Database } from 'lucide-react'

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('developer')

  const plans = [
    {
      id: 'developer',
      name: 'Developer',
      icon: Zap,
      description: 'Perfect for development and testing',
      cores: '0-100 CORES',
      price: 'Free',
      features: ['Single node setup', 'Basic monitoring', 'Local development', 'Testing environment'],
      popular: false
    },
    {
      id: 'business',
      name: 'Business',
      icon: Shield,
      description: 'Production-ready for growing teams',
      cores: '100-1,000 CORES',
      price: '$99/month',
      features: ['Multi-node cluster', 'Advanced monitoring', 'High availability', 'Production support'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Professional',
      icon: Globe,
      description: 'Professional-grade with full support',
      cores: '1,000-10,000 CORES',
      price: 'Custom',
      features: ['Global distribution', '24/7 support', 'Custom integrations', 'SLA guarantees'],
      popular: false
    }
  ]

  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
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
              Pricing
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Choose the perfect plan for your PostgreSQL high availability needs.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border border-slate-400/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                plan.popular 
                  ? 'border-teal-400/50 shadow-xl scale-105' 
                  : 'border-slate-400/30 hover:border-teal-300/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-100/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                    <plan.icon className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-300 mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                  <div className="text-sm text-slate-400">{plan.cores}</div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-slate-100/20 rounded-full flex items-center justify-center border border-slate-400/30">
                        <Check className="w-3 h-3 text-teal-400" />
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center group ${
                  plan.popular
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-white/10 hover:bg-slate-400/20 text-white border border-slate-400/30'
                }`}>
                  {plan.id === 'developer' ? 'Get Started Free' : 'Choose Plan'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-slate-400/30 shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {plans.find(p => p.id === selectedPlan)?.name} Features
                </h3>
                <div className="space-y-4">
                  {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 bg-slate-100/20 rounded-full flex items-center justify-center border border-slate-400/30">
                        <Check className="w-4 h-4 text-teal-400" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Configuration */}
              <div className="bg-slate-100/20 rounded-xl p-6 border border-slate-400/30">
                <h4 className="text-lg font-bold text-white mb-4">
                  Configuration
                </h4>
                
                {/* Workload Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Select Workloads
                  </label>
                  <div className="space-y-2">
                    {['Transactional', 'Analytics', 'AI/ML', 'Hybrid'].map((workload) => (
                      <label key={workload} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 border-slate-400 rounded focus:ring-teal-500" />
                        <span className="text-slate-300 text-sm">{workload}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Environment Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Select Environment
                  </label>
                  <div className="space-y-2">
                    {['Public Cloud', 'On-Premises', 'Hybrid'].map((env) => (
                      <label key={env} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="environment" className="w-4 h-4 text-teal-600 border-slate-400 focus:ring-teal-500" />
                        <span className="text-slate-300 text-sm">{env}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group">
                  Configure
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Choose pgelephant?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Professional PostgreSQL high availability with simple configuration and powerful features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Trusted by Teams</h4>
              <p className="text-sm text-slate-300">Used by 500+ organizations worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                <Clock className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="font-bold text-white mb-2">99.99% Uptime</h4>
              <p className="text-sm text-slate-300">Professional-grade reliability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-400/30">
                <Database className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Zero Data Loss</h4>
              <p className="text-sm text-slate-300">Synchronous replication guarantees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing 