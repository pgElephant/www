import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Raft Protocol - Consensus Implementation | pgElephant',
  description: 'Understanding pgraft Raft consensus protocol implementation. Leader election, log replication, and distributed consensus in PostgreSQL.',
}

export default function PgraftRaftProtocolPage() {
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
              pgraft Raft Protocol
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Understanding Raft consensus protocol implementation in pgraft PostgreSQL extension.
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
              {/* Raft Overview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Raft Consensus Protocol</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    Raft is a consensus algorithm designed to be understandable and implementable. It ensures that a cluster of servers 
                    can agree on the same state even in the presence of failures. pgraft implements Raft as a PostgreSQL extension, 
                    providing distributed consensus capabilities directly within the database.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <span className="text-blue-400 text-2xl">👑</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Leader Election</h3>
                      <p className="text-white/90 text-sm">Automatic leader selection with term-based voting</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <span className="text-green-400 text-2xl">📋</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Log Replication</h3>
                      <p className="text-white/90 text-sm">Consistent log replication across all nodes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                        <span className="text-purple-400 text-2xl">🔒</span>
                      </div>
                      <h3 className="text-lg font-thin text-white mb-2">Safety</h3>
                      <p className="text-white/90 text-sm">Split-brain prevention and consistency guarantees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node States */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Node States</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Leader</h3>
                    <p className="text-white/90 mb-3">
                      The leader handles all client requests and manages log replication. It sends periodic heartbeats 
                      to maintain leadership and replicates log entries to followers.
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Check if node is leader<br/>
                        SELECT pgraft_is_leader('my-cluster');<br/>
                        -- Returns: true if leader, false otherwise
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Follower</h3>
                    <p className="text-white/90 mb-3">
                      Followers receive log entries from the leader and respond to heartbeats. They can become 
                      candidates if they don't receive heartbeats within the election timeout.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Candidate</h3>
                    <p className="text-white/90 mb-3">
                      Candidates request votes from other nodes during leader election. They become leaders if 
                      they receive votes from a majority of the cluster.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leader Election */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Leader Election Process</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    Leader election occurs when a follower doesn't receive heartbeats from the current leader 
                    within the election timeout period.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-1">Election Timeout</h4>
                        <p className="text-white/90 text-sm">Follower doesn't receive heartbeat within election timeout (default: 1000ms)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-1">Become Candidate</h4>
                        <p className="text-white/90 text-sm">Follower becomes candidate and increments term</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-1">Request Votes</h4>
                        <p className="text-white/90 text-sm">Candidate sends RequestVote RPCs to all other nodes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-400 text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-1">Become Leader</h4>
                        <p className="text-white/90 text-sm">Candidate becomes leader if it receives votes from majority</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Log Replication */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Log Replication</h2>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    The leader replicates log entries to all followers to maintain consistency across the cluster. 
                    Entries are committed when they are replicated to a majority of nodes.
                  </p>
                  
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <code className="text-green-400 text-sm">
                      # Leader receives client request<br/>
                      # 1. Append entry to leader's log<br/>
                      # 2. Send AppendEntries RPCs to all followers<br/>
                      # 3. Wait for majority acknowledgment<br/>
                      # 4. Apply entry to state machine<br/>
                      # 5. Respond to client
                    </code>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-thin text-white mb-3">Commit Index</h3>
                      <p className="text-white/90 text-sm">
                        The highest log entry that has been replicated to a majority of nodes and is safe to apply.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-thin text-white mb-3">Last Applied</h3>
                      <p className="text-white/90 text-sm">
                        The highest log entry that has been applied to the state machine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Properties */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Safety Properties</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Election Safety</h3>
                    <p className="text-white/90">
                      At most one leader can be elected in a given term. This prevents split-brain scenarios 
                      where multiple nodes think they are the leader.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Leader Append-Only</h3>
                    <p className="text-white/90">
                      A leader never overwrites or deletes entries in its log. It only appends new entries, 
                      ensuring log consistency.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Log Matching</h3>
                    <p className="text-white/90">
                      If two logs contain an entry with the same index and term, then the logs are identical 
                      in all preceding entries.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Leader Completeness</h3>
                    <p className="text-white/90">
                      If a log entry is committed in a given term, then that entry will be present in the 
                      logs of all leaders for higher-numbered terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Configuration Parameters */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration Parameters</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">heartbeat_interval</h3>
                      <p className="text-white/90 text-sm mb-2">How often the leader sends heartbeats (default: 100ms)</p>
                      <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <code className="text-green-400 text-sm">pgraft.heartbeat_interval = 50ms</code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">election_timeout</h3>
                      <p className="text-white/90 text-sm mb-2">Timeout before follower becomes candidate (default: 1000ms)</p>
                      <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <code className="text-green-400 text-sm">pgraft.election_timeout = 500ms</code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">snapshot_threshold</h3>
                      <p className="text-white/90 text-sm mb-2">Number of entries before taking snapshot (default: 1000)</p>
                      <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <code className="text-green-400 text-sm">pgraft.snapshot_threshold = 5000</code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-thin text-white mb-2">max_log_entries</h3>
                      <p className="text-white/90 text-sm mb-2">Maximum log entries before compaction (default: 10000)</p>
                      <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                        <code className="text-green-400 text-sm">pgraft.max_log_entries = 20000</code>
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
