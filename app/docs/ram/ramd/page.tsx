import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM ramd Documentation - Cluster Management Daemon | pgElephant',
  description: 'Complete documentation for ramd cluster management daemon. PostgreSQL clustering, monitoring, and automatic failover.',
}

export default function RamRamdPage() {
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
              ramd Documentation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cluster management daemon for PostgreSQL high availability and automatic failover.
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
              {/* Overview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">ramd Overview</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    ramd (Resilient Adaptive Manager Daemon) is the core component of RAM that manages PostgreSQL clusters. 
                    It provides automatic failover, cluster monitoring, and coordination between PostgreSQL nodes using Raft consensus.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <span className="text-green-400 text-2xl">🔄</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Auto Failover</h3>
                      <p className="text-white/90 text-sm">Automatic failover with sub-second detection</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <span className="text-blue-400 text-2xl">📊</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Monitoring</h3>
                      <p className="text-white/90 text-sm">Real-time cluster health monitoring</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                        <span className="text-purple-400 text-2xl">🌐</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">HTTP API</h3>
                      <p className="text-white/90 text-sm">RESTful API for cluster management</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Installation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Install ramd</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Install from package<br/>
                        sudo apt install pgelephant-ram<br/><br/>
                        # Or build from source<br/>
                        git clone https://github.com/pgElephant/ram.git<br/>
                        cd ram<br/>
                        make && sudo make install
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Enable service</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        sudo systemctl enable ramd<br/>
                        sudo systemctl start ramd
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Configuration File</h3>
                    <p className="text-white/90 mb-3">ramd configuration is stored in `/etc/ram/ramd.conf`:</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [cluster]<br/>
                        name = "my-cluster"<br/>
                        node_id = "node1"<br/><br/>
                        [postgresql]<br/>
                        host = "localhost"<br/>
                        port = 5432<br/>
                        user = "postgres"<br/>
                        password = "password"<br/><br/>
                        [raft]<br/>
                        listen_addr = "0.0.0.0:8080"<br/>
                        heartbeat_interval = 100ms<br/>
                        election_timeout = 1000ms<br/><br/>
                        [monitoring]<br/>
                        metrics_port = 9090<br/>
                        health_check_interval = 5s
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Environment Variables</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        export RAM_CLUSTER_NAME="my-cluster"<br/>
                        export RAM_NODE_ID="node1"<br/>
                        export RAM_LISTEN_ADDR="0.0.0.0:8080"<br/>
                        export RAM_METRICS_PORT="9090"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTTP API */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">HTTP API</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Status</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        GET /api/v1/status<br/>
                        curl http://localhost:8080/api/v1/status
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Returns current cluster status, leader, and node information.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Node Information</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        GET /api/v1/nodes<br/>
                        curl http://localhost:8080/api/v1/nodes
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Returns information about all nodes in the cluster.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Manual Failover</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        POST /api/v1/failover<br/>
                        curl -X POST http://localhost:8080/api/v1/failover
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Triggers a manual failover to a new leader.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Metrics</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        GET /api/v1/metrics<br/>
                        curl http://localhost:8080/api/v1/metrics
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Returns Prometheus-formatted metrics.</p>
                  </div>
                </div>
              </div>

              {/* Monitoring */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    ramd provides comprehensive monitoring capabilities including health checks, performance metrics, 
                    and cluster status monitoring.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-thin text-white mb-3">Health Checks</h3>
                      <ul className="text-white/90 text-sm space-y-1">
                        <li>• PostgreSQL connection status</li>
                        <li>• Raft consensus health</li>
                        <li>• Node reachability</li>
                        <li>• Log replication status</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-thin text-white mb-3">Metrics</h3>
                      <ul className="text-white/90 text-sm space-y-1">
                        <li>• Cluster uptime</li>
                        <li>• Failover events</li>
                        <li>• Request latency</li>
                        <li>• Node status changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Troubleshooting</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Common Issues</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">ramd won't start</h4>
                        <p className="text-white/90 text-sm">Check configuration file syntax and PostgreSQL connectivity.</p>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Cluster split-brain</h4>
                        <p className="text-white/90 text-sm">Ensure network connectivity and check Raft consensus status.</p>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Failover not working</h4>
                        <p className="text-white/90 text-sm">Verify pgraft extension is loaded and cluster is properly configured.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Logs</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Check ramd logs<br/>
                        journalctl -u ramd -f<br/><br/>
                        # Check configuration<br/>
                        ramd --config-check
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
