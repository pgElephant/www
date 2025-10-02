import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft SQL Functions - Complete Reference | pgElephant',
  description: 'Complete SQL function reference for pgraft PostgreSQL Raft extension. Cluster management, leader election, and monitoring functions.',
}

export default function PgraftSqlFunctionsPage() {
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
              pgraft SQL Functions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete reference for all pgraft SQL functions and procedures.
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
              {/* Cluster Management Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Management Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_init_cluster(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Initialize a new Raft cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_init_cluster('my-cluster');<br/>
                        -- Returns: true on success
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_add_member(cluster_name, node_id, connection_string)</h3>
                    <p className="text-white/90 mb-3">Add a new node to the cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_add_member('my-cluster', 'node1', 'host=192.168.1.10 port=5432');
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_remove_member(cluster_name, node_id)</h3>
                    <p className="text-white/90 mb-3">Remove a node from the cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_remove_member('my-cluster', 'node1');
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_destroy_cluster(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Destroy an existing cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_destroy_cluster('my-cluster');
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Leadership Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_leader(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Get the current leader of the cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_leader('my-cluster');<br/>
                        -- Returns: node_id, term, commit_index
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_is_leader(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Check if current node is the leader.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_is_leader('my-cluster');<br/>
                        -- Returns: boolean
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_force_election(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Force a new leader election.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_force_election('my-cluster');
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Monitoring Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Status and Monitoring Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_cluster_status(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Get comprehensive cluster status information.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_cluster_status('my-cluster');<br/>
                        -- Returns: node_id, state, term, commit_index, last_applied
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_node_info(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Get information about the current node.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_node_info('my-cluster');<br/>
                        -- Returns: node_id, state, term, vote_for, log_size
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_metrics(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Get performance metrics for the cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_metrics('my-cluster');<br/>
                        -- Returns: requests_per_sec, avg_latency_ms, errors_per_sec
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_config(cluster_name)</h3>
                    <p className="text-white/90 mb-3">Get current cluster configuration.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_get_config('my-cluster');<br/>
                        -- Returns: heartbeat_interval, election_timeout, snapshot_threshold
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_set_config(cluster_name, key, value)</h3>
                    <p className="text-white/90 mb-3">Update cluster configuration parameter.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_set_config('my-cluster', 'heartbeat_interval', '50ms');
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
