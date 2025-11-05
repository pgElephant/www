import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Installation Guide - Build from Source | pgElephant',
  description: 'Complete installation guide for pgraft PostgreSQL Raft extension. Build from source, configure PostgreSQL, and enable the extension.',
}

export default function PgraftInstallationPage() {
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
              pgraft Installation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Build and install pgraft PostgreSQL Raft extension from source.
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
            <div className="space-y-8">
              {/* Prerequisites */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Prerequisites</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">PostgreSQL 16-18</h3>
                      <p className="text-white/90">pgraft requires PostgreSQL version 16 or higher with development headers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">Go 1.21+</h3>
                      <p className="text-white/90">pgraft uses a Go-based Raft implementation that requires Go 1.21 or later.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">Build Tools</h3>
                      <p className="text-white/90">GCC/Clang, Make, and pkg-config for building the extension.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation Steps */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Installation Steps</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">1. Clone the Repository</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        git clone https://github.com/pgElephant/pgraft.git<br/>
                        cd pgraft
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">2. Build the Extension</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        make<br/>
                        sudo make install
                      </code>
              </pre>
                    </div>
                    <p className="text-white/90 text-sm mt-2">This builds both the PostgreSQL extension and the Go Raft library.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">3. Configure PostgreSQL</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Add to postgresql.conf<br/>
                        shared_preload_libraries = 'pgraft'<br/><br/>
                        # Restart PostgreSQL<br/>
                        sudo systemctl restart postgresql
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">4. Create the Extension</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        psql -d postgres<br/>
                        CREATE EXTENSION pgraft;
                      </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Verification</h2>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    # Check if extension is loaded<br/>
                    SELECT * FROM pg_extension WHERE extname = 'pgraft';<br/><br/>
                    # Check available functions<br/>
                    \df pgraft_*
                  </code>
                  </pre>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Troubleshooting</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Build Errors</h3>
                    <p className="text-white/90">Ensure all dependencies are installed and PostgreSQL development headers are available.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Extension Not Loading</h3>
                    <p className="text-white/90">Check PostgreSQL logs for errors and ensure shared_preload_libraries is configured correctly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
