import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - pgElephant',
  description: 'Terms of service for pgElephant - usage terms and conditions for our products and services.',
}

export default function TermsPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden py-28"
        style={{ 
          backgroundColor: '#1f2937',
        }}
      >
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-wide mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Terms and conditions for using pgElephant products and services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="py-20"
        style={{ 
          backgroundColor: '#1f2937',
        }}
      >
        <div className="container-wide mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-thin text-white mb-6">Acceptance of Terms</h2>
              <p className="text-white/90 mb-4">
                By downloading, installing, or using pgElephant products, you agree to be bound by these terms of service.
              </p>

              <h2 className="text-2xl font-thin text-white mb-6">Open Source License</h2>
              <p className="text-white/90 mb-4">
                pgElephant products are released under open source licenses. Please review the specific license for each product:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 mb-8">
                <li>RALE: Apache 2.0 License</li>
                <li>RAM: Apache 2.0 License</li>
                <li>pgraft: Apache 2.0 License</li>
                <li>FauxDB: Apache 2.0 License</li>
              </ul>

              <h2 className="text-2xl font-thin text-white mb-6">Usage Guidelines</h2>
              <p className="text-white/90 mb-4">
                You may use pgElephant products for:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 mb-4">
                <li>Commercial and non-commercial projects</li>
                <li>Production environments</li>
                <li>Modification and distribution (subject to license terms)</li>
              </ul>

              <h2 className="text-2xl font-thin text-white mb-6">Support and Warranty</h2>
              <p className="text-white/90 mb-4">
                pgElephant products are provided "as is" without warranty. Community support is available through our documentation and community forums.
              </p>

              <h2 className="text-2xl font-thin text-white mb-6">Limitation of Liability</h2>
              <p className="text-white/90 mb-4">
                pgElephant shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our products.
              </p>

              <h2 className="text-2xl font-thin text-white mb-6">Contact Us</h2>
              <p className="text-white/90">
                For questions about these terms, please contact us at{' '}
                <a href="/contact" className="text-blue-400 hover:underline">our contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
