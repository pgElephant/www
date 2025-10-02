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
                        curl -H "Authorization: Bearer your-token-here" \\<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;http://localhost:8080/api/v1/status<br/><br/>
                        # Or use API key header<br/>
                        curl -H "X-API-Key: your-api-key-here" \\<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;http://localhost:8080/api/v1/status
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Authentication Endpoints</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="text-lg font-thin text-white mb-2">POST /api/v1/auth/login</h4>
                        <p className="text-white/90 text-sm mb-2">Authenticate and get access token</p>
                        <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            curl -X POST http://localhost:8080/api/v1/auth/login \\<br/>
                            &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
                            &nbsp;&nbsp;-d '{"username": "admin", "password": "secret"}'
                          </code>
                        </div>
                      </div>
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
                        curl http://localhost:8080/api/v1/status<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"cluster": "production-cluster",<br/>
                        &nbsp;&nbsp;"leader": "node1",<br/>
                        &nbsp;&nbsp;"term": 42,<br/>
                        &nbsp;&nbsp;"nodes": [<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{"id": "node1", "state": "leader", "address": "192.168.1.10:8080"},<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{"id": "node2", "state": "follower", "address": "192.168.1.11:8080"},<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{"id": "node3", "state": "follower", "address": "192.168.1.12:8080"}<br/>
                        &nbsp;&nbsp;],<br/>
                        &nbsp;&nbsp;"health": "healthy"<br/>
                        }
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/nodes</h3>
                    <p className="text-white/90 text-sm mb-3">List all cluster nodes</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/nodes<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"nodes": [<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "node1",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"state": "leader",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"address": "192.168.1.10:8080",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"last_heartbeat": "2024-01-15T10:30:00Z"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;]<br/>
                        }
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">POST /api/v1/nodes</h3>
                    <p className="text-white/90 text-sm mb-3">Add a new node to the cluster</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl -X POST http://localhost:8080/api/v1/nodes \\<br/>
                        &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
                        &nbsp;&nbsp;-d '{<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"id": "node4",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"address": "192.168.1.13:8080",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"postgres_host": "192.168.1.13",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"postgres_port": 5432<br/>
                        &nbsp;&nbsp;}'<br/><br/>
                        # Response:<br/>
                        {"status": "success", "message": "Node added successfully"}
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
                        curl -X POST http://localhost:8080/api/v1/failover<br/><br/>
                        # Optional: specify target node<br/>
                        curl -X POST http://localhost:8080/api/v1/failover \\<br/>
                        &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
                        &nbsp;&nbsp;-d '{"target_node": "node2"}'<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"status": "success",<br/>
                        &nbsp;&nbsp;"new_leader": "node2",<br/>
                        &nbsp;&nbsp;"failover_time": "2024-01-15T10:30:00Z"<br/>
                        }
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/failover/history</h3>
                    <p className="text-white/90 text-sm mb-3">Get failover history</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/failover/history<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"failovers": [<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"timestamp": "2024-01-15T10:30:00Z",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"old_leader": "node1",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"new_leader": "node2",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reason": "manual"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;]<br/>
                        }
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
                        curl http://localhost:8080/api/v1/health<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"status": "healthy",<br/>
                        &nbsp;&nbsp;"cluster": "production-cluster",<br/>
                        &nbsp;&nbsp;"leader": "node1",<br/>
                        &nbsp;&nbsp;"uptime": "72h30m15s",<br/>
                        &nbsp;&nbsp;"checks": {<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"postgresql": "healthy",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"raft": "healthy",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"network": "healthy"<br/>
                        &nbsp;&nbsp;}<br/>
                        }
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/metrics</h3>
                    <p className="text-white/90 text-sm mb-3">Prometheus metrics</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/metrics<br/><br/>
                        # Response (Prometheus format):<br/>
                        # HELP ram_cluster_nodes_total Total number of nodes in cluster<br/>
                        # TYPE ram_cluster_nodes_total gauge<br/>
                        ram_cluster_nodes_total{cluster="production"} 3<br/>
                        # HELP ram_failover_events_total Total number of failover events<br/>
                        # TYPE ram_failover_events_total counter<br/>
                        ram_failover_events_total{cluster="production"} 5
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Management */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration Management</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">GET /api/v1/config</h3>
                    <p className="text-white/90 text-sm mb-3">Get cluster configuration</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl http://localhost:8080/api/v1/config<br/><br/>
                        # Response:<br/>
                        {<br/>
                        &nbsp;&nbsp;"heartbeat_interval": "100ms",<br/>
                        &nbsp;&nbsp;"election_timeout": "1000ms",<br/>
                        &nbsp;&nbsp;"snapshot_threshold": 1000,<br/>
                        &nbsp;&nbsp;"max_log_entries": 10000<br/>
                        }
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">PUT /api/v1/config</h3>
                    <p className="text-white/90 text-sm mb-3">Update cluster configuration</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        curl -X PUT http://localhost:8080/api/v1/config \\<br/>
                        &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
                        &nbsp;&nbsp;-d '{<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"heartbeat_interval": "50ms",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"election_timeout": "500ms"<br/>
                        &nbsp;&nbsp;}'<br/><br/>
                        # Response:<br/>
                        {"status": "success", "message": "Configuration updated"}
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

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Error Response Format</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Error response example<br/>
                        {<br/>
                        &nbsp;&nbsp;"error": {<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"code": "CLUSTER_NOT_READY",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"message": "Cluster is not ready for operations",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"details": "Leader election in progress"<br/>
                        &nbsp;&nbsp;},<br/>
                        &nbsp;&nbsp;"timestamp": "2024-01-15T10:30:00Z",<br/>
                        &nbsp;&nbsp;"request_id": "req-12345"<br/>
                        }
                      </code>
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
