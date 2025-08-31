'use client'

import React, { useState } from 'react'

import { Check, ArrowRight, Zap, Shield, Globe } from 'lucide-react'

const ConfiguratorBox = () => {
  const [selectedPlan, setSelectedPlan] = useState('developer')

  const plans = [
    {
      id: 'developer',
      name: 'Developer',
      icon: Zap,
      description: 'Perfect for development and testing',
      cores: '0-100 CORES',
      features: ['Single node setup', 'Basic monitoring', 'Local development', 'Testing environment']
    },
    {
      id: 'business',
      name: 'Business',
      icon: Shield,
      description: 'Production-ready for growing teams',
      cores: '100-1,000 CORES',
      features: ['Multi-node cluster', 'Advanced monitoring', 'High availability', 'Production support']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Globe,
      description: 'Enterprise-grade with full support',
      cores: '1,000-10,000 CORES',
      features: ['Global distribution', '24/7 support', 'Custom integrations', 'SLA guarantees']
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-white to-edbGray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-edbDark-900 mb-4">
            Choose Your Deployment
          </h2>
          <p className="text-xl text-edbGray-600 max-w-2xl mx-auto">
            Configure your PostgreSQL cluster based on your needs and scale.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Plan Selection Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'border-edb-600 bg-edb-50 shadow-lg'
                    : 'border-edbGray-200 bg-white hover:border-edb-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <plan.icon className={`w-8 h-8 ${
                    selectedPlan === plan.id ? 'text-edb-600' : 'text-edbGray-500'
                  }`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  selectedPlan === plan.id ? 'text-edbDark-900' : 'text-edbGray-700'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  selectedPlan === plan.id ? 'text-edbGray-600' : 'text-edbGray-500'
                }`}>
                  {plan.cores}
                </p>
              </button>
            ))}
          </div>

          {/* Configuration Panel */}
          <div className="bg-white rounded-2xl border border-edbGray-200 shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Features */}
              <div>
                <h3 className="text-2xl font-bold text-edbDark-900 mb-6">
                  {plans.find(p => p.id === selectedPlan)?.name} Features
                </h3>
                <div className="space-y-4">
                  {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 bg-edb-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-edb-600" />
                      </div>
                      <span className="text-edbGray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Configuration */}
              <div className="bg-gradient-to-br from-edb-50 to-edb-100 rounded-xl p-6">
                <h4 className="text-lg font-bold text-edbDark-900 mb-4">
                  Configuration
                </h4>
                
                {/* Workload Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-edbGray-700 mb-3">
                    Select Workloads
                  </label>
                  <div className="space-y-2">
                    {['Transactional', 'Analytics', 'AI/ML', 'Hybrid'].map((workload) => (
                      <label key={workload} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-edb-600 border-edbGray-300 rounded focus:ring-edb-500" />
                        <span className="text-edbGray-700 text-sm">{workload}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Environment Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-edbGray-700 mb-3">
                    Select Environment
                  </label>
                  <div className="space-y-2">
                    {['Public Cloud', 'On-Premises', 'Hybrid'].map((env) => (
                      <label key={env} className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="environment" className="w-4 h-4 text-edb-600 border-edbGray-300 focus:ring-edb-500" />
                        <span className="text-edbGray-700 text-sm">{env}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-edb-600 hover:bg-edb-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group">
                  Configure
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfiguratorBox 