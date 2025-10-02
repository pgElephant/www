import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM ramctrl Documentation - Command Line Interface | pgElephant',
  description: 'Complete documentation for ramctrl command-line interface. Cluster management, monitoring, and administrative operations for RAM PostgreSQL clustering.',
}

export default function RamRamctrlPage() {
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
              ramctrl Documentation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Command-line interface for managing RAM PostgreSQL clusters and performing administrative operations.
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
                <h2 className="text-2xl font-thin text-white mb-6">ramctrl Overview</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    ramctrl (Resilient Adaptive Manager Control) is the command-line interface for managing RAM clusters. 
                    It provides comprehensive cluster management, monitoring, and administrative capabilities through an intuitive CLI.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <span className="text-green-400 text-2xl">⚙️</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Cluster Management</h3>
                      <p className="text-white/90 text-sm">Create, configure, and manage clusters</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <span className="text-blue-400 text-2xl">📊</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Monitoring</h3>
                      <p className="text-white/90 text-sm">Real-time cluster monitoring and status</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                        <span className="text-purple-400 text-2xl">🔧</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Administration</h3>
                      <p className="text-white/90 text-sm">Administrative operations and maintenance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Installation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Install ramctrl</h3>
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
                    <h3 className="text-lg font-thin text-white mb-3">Verify Installation</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl --version<br/>
                        ramctrl --help
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Commands */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Basic Commands</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Cluster Status</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl status<br/>
                        ramctrl status --cluster my-cluster<br/>
                        ramctrl status --json
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Display current cluster status and node information.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Node Information</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl nodes list<br/>
                        ramctrl nodes info node1<br/>
                        ramctrl nodes health
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">List and get information about cluster nodes.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Leader Information</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl leader<br/>
                        ramctrl leader --cluster my-cluster
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Display current cluster leader information.</p>
                  </div>
                </div>
              </div>

              {/* Cluster Management */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Management</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Create Cluster</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl cluster create --name my-cluster \\<br/>
                        &nbsp;&nbsp;--node node1:8080 \\<br/>
                        &nbsp;&nbsp;--replication-factor 3
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Create a new RAM cluster with specified configuration.</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Add Node</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl nodes add --cluster my-cluster \\<br/>
                        &nbsp;&nbsp;--node node2:8080 \\<br/>
                        &nbsp;&nbsp;--postgres-host 192.168.1.11 \\<br/>
                        &nbsp;&nbsp;--postgres-port 5432
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Add a new node to an existing cluster.</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Remove Node</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl nodes remove --cluster my-cluster --node node2
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Remove a node from the cluster.</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Destroy Cluster</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl cluster destroy --name my-cluster --confirm
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Destroy an existing cluster and clean up resources.</p>
                  </div>
                </div>
              </div>

              {/* Failover Operations */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Failover Operations</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Manual Failover</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl failover --cluster my-cluster<br/>
                        ramctrl failover --cluster my-cluster --target-node node2
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Trigger a manual failover to a new leader.</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Failover Status</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl failover status --cluster my-cluster<br/>
                        ramctrl failover history --cluster my-cluster
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Check failover status and view failover history.</p>
                  </div>
                </div>
              </div>

              {/* Monitoring Commands */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring Commands</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Health Check</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl health --cluster my-cluster<br/>
                        ramctrl health --node node1<br/>
                        ramctrl health --all
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Check cluster or node health status.</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Metrics</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl metrics --cluster my-cluster<br/>
                        ramctrl metrics --node node1 --format prometheus
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Display cluster or node metrics.</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Live Monitoring</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl monitor --cluster my-cluster<br/>
                        ramctrl monitor --cluster my-cluster --refresh 5s
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Live monitoring with auto-refresh.</p>
                  </div>
                </div>
              </div>

              {/* Configuration Management */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration Management</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Get Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl config get --cluster my-cluster<br/>
                        ramctrl config get --cluster my-cluster --key heartbeat_interval
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Retrieve cluster configuration parameters.</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Set Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl config set --cluster my-cluster \\<br/>
                        &nbsp;&nbsp;--key heartbeat_interval --value 50ms<br/><br/>
                        ramctrl config set --cluster my-cluster \\<br/>
                        &nbsp;&nbsp;--key election_timeout --value 500ms
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Update cluster configuration parameters.</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Configuration Validation</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        ramctrl config validate --cluster my-cluster<br/>
                        ramctrl config validate --file cluster.conf
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Validate cluster configuration for errors.</p>
                  </div>
                </div>
              </div>

              {/* Global Options */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Global Options</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">Connection Options</h3>
                      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                        <code className="text-green-400 text-sm">
                          --cluster &lt;name&gt;<br/>
                          --node &lt;addr&gt;<br/>
                          --timeout &lt;duration&gt;<br/>
                          --tls-enabled<br/>
                          --tls-cert &lt;file&gt;
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">Output Options</h3>
                      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                        <code className="text-green-400 text-sm">
                          --format &lt;format&gt;<br/>
                          --json<br/>
                          --yaml<br/>
                          --quiet<br/>
                          --verbose
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
    </div>
  )
}
