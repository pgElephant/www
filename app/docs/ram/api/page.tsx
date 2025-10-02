import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM API Reference - REST API Documentation | pgElephant',
  description: 'Complete REST API documentation for RAM PostgreSQL clustering. HTTP endpoints, request/response formats, and authentication.',
}

export default function RamApiPage() {
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
              RAM API Reference
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete REST API documentation for RAM PostgreSQL clustering management.
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
              {/* API Overview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">API Overview</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    The RAM API provides RESTful endpoints for cluster management, monitoring, and administrative operations. 
                    All endpoints return JSON responses and support standard HTTP status codes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <span className="text-blue-400 text-2xl">🔗</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">RESTful</h3>
                      <p className="text-white/90 text-sm">Standard HTTP methods and status codes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <span className="text-green-400 text-2xl">🔒</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Secure</h3>
                      <p className="text-white/90 text-sm">Token-based authentication and TLS support</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                        <span className="text-purple-400 text-2xl">📊</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">JSON</h3>
                      <p className="text-white/90 text-sm">Structured JSON requests and responses</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Authentication</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Token Authentication</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Include token in Authorization header<br/>
                        curl -H "Authorization: Bearer your-token-here" \<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;http://localhost:8080/api/v1/status<br/><br/>
                        # Or use API key header<br/>
                        curl -H "X-API-Key: your-api-key-here" \<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;http://localhost:8080/api/v1/status
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cluster Management Endpoints */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Management</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/status</h3>
                    <p className="text-white/90 text-sm mb-3">Get comprehensive cluster status</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/status
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/nodes</h3>
                    <p className="text-white/90 text-sm mb-3">List all cluster nodes</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/nodes
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">POST /api/v1/nodes</h3>
                    <p className="text-white/90 text-sm mb-3">Add a new node to the cluster</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        {`curl -X POST http://localhost:8080/api/v1/nodes \\
  -H "Content-Type: application/json" \\
  -d '{"id": "node4", "address": "192.168.1.13:8080"}'`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Failover Endpoints */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Failover Operations</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">POST /api/v1/failover</h3>
                    <p className="text-white/90 text-sm mb-3">Trigger manual failover</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl -X POST http://localhost:8080/api/v1/failover
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health and Metrics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Health and Metrics</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/health</h3>
                    <p className="text-white/90 text-sm mb-3">Cluster health check</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/health
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/metrics</h3>
                    <p className="text-white/90 text-sm mb-3">Prometheus metrics</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/metrics
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Handling */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Error Handling</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">HTTP Status Codes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-400/30">
                            <th className="text-left py-2 text-white font-thin">Code</th>
                            <th className="text-left py-2 text-white font-thin">Description</th>
                            <th className="text-left py-2 text-white font-thin">Usage</th>
                          </tr>
                        </thead>
                        <tbody className="text-white/90">
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">200</td>
                            <td className="py-2">OK</td>
                            <td className="py-2">Successful operation</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">201</td>
                            <td className="py-2">Created</td>
                            <td className="py-2">Resource created successfully</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">400</td>
                            <td className="py-2">Bad Request</td>
                            <td className="py-2">Invalid request parameters</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">401</td>
                            <td className="py-2">Unauthorized</td>
                            <td className="py-2">Authentication required</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">403</td>
                            <td className="py-2">Forbidden</td>
                            <td className="py-2">Insufficient permissions</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">500</td>
                            <td className="py-2">Internal Server Error</td>
                            <td className="py-2">Server error</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
