import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Configuration - PostgreSQL Settings | pgElephant',
  description: 'Complete configuration guide for pgraft PostgreSQL Raft extension. PostgreSQL settings, cluster configuration, and performance tuning.',
}

export default function PgraftConfigurationPage() {
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
              pgraft Configuration
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Configure pgraft extension and PostgreSQL for optimal Raft consensus performance.
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
              {/* PostgreSQL Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">PostgreSQL Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">postgresql.conf Settings</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Required settings<br/>
                        shared_preload_libraries = 'pgraft'<br/><br/>
                        # Recommended settings<br/>
                        max_connections = 200<br/>
                        shared_buffers = 256MB<br/>
                        wal_level = replica<br/>
                        max_wal_senders = 10<br/>
                        hot_standby = on
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">pg_hba.conf Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Allow replication connections<br/>
                        local   replication     postgres                        peer<br/>
                        host    replication     postgres        127.0.0.1/32    md5<br/>
                        host    replication     postgres        ::1/128         md5
                      </code>
              </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* pgraft Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">pgraft Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Extension Parameters</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Set in postgresql.conf or via ALTER SYSTEM<br/>
                        pgraft.listen_address = '0.0.0.0:5433'<br/>
                        pgraft.heartbeat_interval = 100ms<br/>
                        pgraft.election_timeout = 1000ms<br/>
                        pgraft.snapshot_threshold = 1000<br/>
                        pgraft.max_log_entries = 10000
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Runtime Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Check current configuration<br/>
                        SELECT * FROM pgraft_get_config();<br/><br/>
                        # Update configuration<br/>
                        SELECT pgraft_set_config('heartbeat_interval', '50ms');<br/>
                        SELECT pgraft_set_config('election_timeout', '500ms');
                      </code>
              </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cluster Setup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Setup</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Initialize Cluster</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Create cluster<br/>
                        SELECT pgraft_init_cluster('my-cluster');<br/><br/>
                        # Add nodes<br/>
                        SELECT pgraft_add_member('my-cluster', 'node1', 'host=192.168.1.10 port=5432');<br/>
                        SELECT pgraft_add_member('my-cluster', 'node2', 'host=192.168.1.11 port=5432');<br/>
                        SELECT pgraft_add_member('my-cluster', 'node3', 'host=192.168.1.12 port=5432');
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Verify Cluster</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Check cluster status<br/>
                        SELECT * FROM pgraft_cluster_status('my-cluster');<br/><br/>
                        # Check leader<br/>
                        SELECT * FROM pgraft_leader('my-cluster');
                      </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Tuning */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Tuning</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">High Throughput</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        pgraft.heartbeat_interval = 50ms<br/>
                        pgraft.election_timeout = 500ms<br/>
                        pgraft.snapshot_threshold = 5000<br/>
                        pgraft.max_log_entries = 20000
                      </code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Low Latency</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        pgraft.heartbeat_interval = 25ms<br/>
                        pgraft.election_timeout = 250ms<br/>
                        pgraft.snapshot_threshold = 1000<br/>
                        pgraft.max_log_entries = 5000
                      </code>
                      </pre>
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
