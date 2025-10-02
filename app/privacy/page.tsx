import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - pgElephant',
  description: 'Privacy policy for pgElephant - how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden py-28"
        style={{ 
          background: `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`,
        }}
      >
        {/* Elegant overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
          }}
        />
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-wide mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              How we collect, use, and protect your information when using pgElephant services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
        }}
      >
        <div className="container-wide mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-thin text-white mb-6">Information We Collect</h2>
              <p className="text-white/90 mb-4">
                pgElephant is committed to protecting your privacy. We collect minimal information necessary to provide our services:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 mb-8">
                <li>Usage analytics to improve our products</li>
                <li>Contact information when you reach out for support</li>
                <li>Download statistics for product improvement</li>
              </ul>

              <h2 className="text-2xl font-thin text-white mb-6">How We Use Your Information</h2>
              <p className="text-white/90 mb-4">
                We use collected information solely to:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-2 mb-8">
                <li>Improve our products and services</li>
                <li>Provide technical support</li>
                <li>Send important updates and announcements</li>
              </ul>

              <h2 className="text-2xl font-thin text-white mb-6">Data Protection</h2>
              <p className="text-white/90 mb-4">
                We implement industry-standard security measures to protect your information and never sell or share personal data with third parties.
              </p>

              <h2 className="text-2xl font-thin text-white mb-6">Contact Us</h2>
              <p className="text-white/90">
                If you have questions about this privacy policy, please contact us at{' '}
                <a href="/contact" className="text-blue-400 hover:underline">our contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
