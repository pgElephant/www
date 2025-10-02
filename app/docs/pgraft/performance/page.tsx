import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Performance Tuning - Optimization Guide | pgElephant',
  description: 'Complete performance tuning guide for pgraft PostgreSQL Raft extension. Optimization strategies, configuration tuning, and performance monitoring.',
}

export default function PgraftPerformancePage() {
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
              pgraft Performance Tuning
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Optimize pgraft PostgreSQL Raft extension for maximum performance and throughput.
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
              {/* Performance Optimization Strategies */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Optimization Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">High Throughput Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Optimize for high throughput<br/>
                        pgraft.heartbeat_interval = 50ms<br/>
                        pgraft.election_timeout = 500ms<br/>
                        pgraft.snapshot_threshold = 5000<br/>
                        pgraft.max_log_entries = 20000<br/>
                        pgraft.batch_size = 1000
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Configuration optimized for maximum transaction throughput.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Low Latency Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Optimize for low latency<br/>
                        pgraft.heartbeat_interval = 25ms<br/>
                        pgraft.election_timeout = 250ms<br/>
                        pgraft.snapshot_threshold = 1000<br/>
                        pgraft.max_log_entries = 5000<br/>
                        pgraft.batch_size = 100
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Configuration optimized for minimal response times.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Balanced Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Balanced performance<br/>
                        pgraft.heartbeat_interval = 100ms<br/>
                        pgraft.election_timeout = 1000ms<br/>
                        pgraft.snapshot_threshold = 2000<br/>
                        pgraft.max_log_entries = 10000<br/>
                        pgraft.batch_size = 500
                      </code>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Balanced configuration for most use cases.</p>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Tuning */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">PostgreSQL Configuration Tuning</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Memory Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Memory settings<br/>
                        shared_buffers = 256MB<br/>
                        effective_cache_size = 1GB<br/>
                        work_mem = 4MB<br/>
                        maintenance_work_mem = 64MB<br/>
                        max_connections = 200
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">WAL Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # WAL settings<br/>
                        wal_level = replica<br/>
                        max_wal_senders = 10<br/>
                        wal_keep_size = 1GB<br/>
                        checkpoint_completion_target = 0.9<br/>
                        wal_buffers = 16MB
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Connection Settings</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Connection optimization<br/>
                        tcp_keepalives_idle = 600<br/>
                        tcp_keepalives_interval = 30<br/>
                        tcp_keepalives_count = 3<br/>
                        listen_addresses = '*'<br/>
                        port = 5432
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Optimization */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Network Optimization</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Network Settings</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Network optimization<br/>
                        pgraft.network_buffer_size = 1MB<br/>
                        pgraft.max_connections_per_node = 100<br/>
                        pgraft.connection_timeout = 30s<br/>
                        pgraft.keepalive_interval = 60s<br/>
                        pgraft.keepalive_count = 3
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Topology</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Recommended Topology</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• Deploy nodes in same datacenter for low latency</li>
                          <li>• Use dedicated network for cluster communication</li>
                          <li>• Ensure symmetric network connectivity</li>
                          <li>• Monitor network latency between nodes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring and Metrics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Monitoring</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Key Metrics to Monitor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Raft Metrics</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Election duration</li>
                          <li>• Log replication latency</li>
                          <li>• Commit index lag</li>
                          <li>• Snapshot frequency</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">PostgreSQL Metrics</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Transaction throughput</li>
                          <li>• Connection count</li>
                          <li>• WAL generation rate</li>
                          <li>• Buffer hit ratio</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Performance Queries</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Get performance metrics<br/>
                        SELECT * FROM pgraft_metrics('my-cluster');<br/><br/>
                        # Check log replication status<br/>
                        SELECT * FROM pgraft_cluster_status('my-cluster');<br/><br/>
                        # Monitor PostgreSQL performance<br/>
                        SELECT * FROM pg_stat_activity;<br/>
                        SELECT * FROM pg_stat_database;
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting Performance Issues */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Troubleshooting</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Common Performance Issues</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">High Replication Latency</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            # Reduce heartbeat interval<br/>
                            SELECT pgraft_set_config('my-cluster', 'heartbeat_interval', '50ms');<br/><br/>
                            # Check network connectivity<br/>
                            SELECT * FROM pgraft_cluster_status('my-cluster');
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Frequent Elections</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            # Increase election timeout<br/>
                            SELECT pgraft_set_config('my-cluster', 'election_timeout', '2000ms');<br/><br/>
                            # Check node health<br/>
                            SELECT * FROM pgraft_node_info('my-cluster');
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">High Memory Usage</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            # Reduce log entries<br/>
                            SELECT pgraft_set_config('my-cluster', 'max_log_entries', '5000');<br/><br/>
                            # Force snapshot<br/>
                            SELECT pgraft_snapshot('my-cluster');
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Best Practices</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Configuration Guidelines</h3>
                    <ul className="text-white/90 text-sm space-y-1 ml-4">
                      <li>• Set election_timeout to 3-5x heartbeat_interval</li>
                      <li>• Use odd number of nodes for proper majority</li>
                      <li>• Monitor and tune based on actual workload</li>
                      <li>• Test failover scenarios regularly</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Operational Guidelines</h3>
                    <ul className="text-white/90 text-sm space-y-1 ml-4">
                      <li>• Deploy nodes across multiple availability zones</li>
                      <li>• Use dedicated network for cluster communication</li>
                      <li>• Implement comprehensive monitoring and alerting</li>
                      <li>• Regular performance testing and capacity planning</li>
                    </ul>
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
