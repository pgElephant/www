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
              Complete reference for all pgraft SQL functions. pgraft provides a comprehensive set of functions for cluster management, leader election, log operations, and monitoring.
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
              {/* Core Initialization Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Core Initialization Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_init() → boolean</h3>
                    <p className="text-white/90 mb-3">Initialize the pgraft node using GUC configuration variables. Must be called after CREATE EXTENSION.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_init();<br/>
                        -- Returns: true on success, false on failure<br/>
                        -- Uses: pgraft.cluster_id, pgraft.node_id, pgraft.address, pgraft.port, etc.
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_init_guc(cluster_id, node_id, address, port) → boolean</h3>
                    <p className="text-white/90 mb-3">Initialize pgraft with explicit parameters instead of GUC variables.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_init_guc('prod-cluster', 1, '127.0.0.1', 7001);
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_version() → text</h3>
                    <p className="text-white/90 mb-3">Get the current pgraft version information.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_get_version();<br/>
                        -- Returns: "pgraft 1.0.0"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cluster Management Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Management Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_add_node(node_id int, address text, port int) → boolean</h3>
                    <p className="text-white/90 mb-3">Add a new node to the cluster. Must be called on the leader node.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_add_node(2, '127.0.0.1', 7002);<br/>
                        SELECT pgraft_add_node(3, '127.0.0.1', 7003);
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_remove_node(node_id int) → boolean</h3>
                    <p className="text-white/90 mb-3">Remove a node from the cluster. Must be called on the leader node.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_remove_node(3);
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_cluster_status() → TABLE(...)</h3>
                    <p className="text-white/90 mb-3">Get comprehensive cluster status information including all nodes.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_get_cluster_status();<br/>
                        -- Returns: node_id, address, port, is_leader, term, state
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_nodes() → TABLE(node_id, address, port, is_leader)</h3>
                    <p className="text-white/90 mb-3">Get information about all nodes in the cluster.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_get_nodes();
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Functions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Leadership Functions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_is_leader() → boolean</h3>
                    <p className="text-white/90 mb-3">Check if the current node is the cluster leader.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_is_leader();<br/>
                        -- Returns: true if current node is leader, false otherwise
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_leader() → bigint</h3>
                    <p className="text-white/90 mb-3">Get the ID of the current cluster leader.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_get_leader();<br/>
                        -- Returns: leader node ID, or 0 if no leader
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_term() → bigint</h3>
                    <p className="text-white/90 mb-3">Get the current Raft term number.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_get_term();<br/>
                        -- Returns: current term number
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Log Operations */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Log Operations</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_log_append(data text) → boolean</h3>
                    <p className="text-white/90 mb-3">Append a new entry to the Raft log. Only works on leader.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_log_append('"user_created"');<br/>
                        -- Returns: true on success
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_log_commit(log_index int) → boolean</h3>
                    <p className="text-white/90 mb-3">Commit a log entry at the specified index.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_log_commit(1);
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_log_apply(log_index int) → boolean</h3>
                    <p className="text-white/90 mb-3">Apply a committed log entry to the state machine.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_log_apply(1);
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_log_get_stats() → TABLE(log_size, last_index, commit_index, last_applied)</h3>
                    <p className="text-white/90 mb-3">Get statistics about the Raft log.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_log_get_stats();
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_log_get_entry_sql(log_index int) → TABLE(index, term, data)</h3>
                    <p className="text-white/90 mb-3">Retrieve a specific log entry by index.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_log_get_entry_sql(1);
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring and Debugging */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring and Debugging</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_worker_state() → text</h3>
                    <p className="text-white/90 mb-3">Get the current state of the pgraft background worker.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_get_worker_state();<br/>
                        -- Returns: "RUNNING", "STOPPED", "INITIALIZING", etc.
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_get_queue_status() → TABLE(command_type, status, count)</h3>
                    <p className="text-white/90 mb-3">Get status of the command queue.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT * FROM pgraft_get_queue_status();
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_set_debug(enabled boolean) → boolean</h3>
                    <p className="text-white/90 mb-3">Enable or disable debug logging.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_set_debug(true);<br/>
                        -- Returns: true on success
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">pgraft_test() → boolean</h3>
                    <p className="text-white/90 mb-3">Run basic functionality tests.</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        SELECT pgraft_test();<br/>
                        -- Returns: true if all tests pass
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
