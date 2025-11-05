import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Cluster Management - PostgreSQL Clusters with Raft | pgElephant',
  description: 'Complete guide to managing PostgreSQL clusters with pgraft. Cluster creation, node management, and operational procedures.',
}

export default function PgraftClusterManagementPage() {
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
              pgraft Cluster Management
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Managing PostgreSQL clusters with pgraft Raft consensus for high availability and automatic failover.
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
              {/* Cluster Lifecycle */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Lifecycle Management</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">1. Cluster Creation</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Create a new cluster<br/>
                        SELECT pgraft_init_cluster('production-cluster');<br/><br/>
                        # Verify cluster creation<br/>
                        SELECT * FROM pgraft_cluster_status('production-cluster');
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">2. Add Nodes</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Add primary node<br/>
                        SELECT pgraft_add_member('production-cluster', 'node1', 'host=192.168.1.10 port=5432');<br/><br/>
                        # Add replica nodes<br/>
                        SELECT pgraft_add_member('production-cluster', 'node2', 'host=192.168.1.11 port=5432');<br/>
                        SELECT pgraft_add_member('production-cluster', 'node3', 'host=192.168.1.12 port=5432');
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">3. Monitor Cluster Health</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Check cluster status<br/>
                        SELECT * FROM pgraft_cluster_status('production-cluster');<br/><br/>
                        # Check leader<br/>
                        SELECT * FROM pgraft_leader('production-cluster');<br/><br/>
                        # Get metrics<br/>
                        SELECT * FROM pgraft_metrics('production-cluster');
                      </code>
              </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node Operations */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Node Operations</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Adding New Nodes</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-400 text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Prepare New Node</h4>
                          <p className="text-white/90 text-sm">Install PostgreSQL and pgraft extension on the new node</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-400 text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Configure PostgreSQL</h4>
                          <p className="text-white/90 text-sm">Enable pgraft extension and configure cluster settings</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-400 text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Add to Cluster</h4>
                          <p className="text-white/90 text-sm">Use pgraft_add_member() to add the node to the cluster</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Removing Nodes</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Remove node from cluster<br/>
                        SELECT pgraft_remove_member('production-cluster', 'node3');<br/><br/>
                        # Verify removal<br/>
                        SELECT * FROM pgraft_cluster_status('production-cluster');
                      </code>
              </pre>
                    </div>
                    <p className="text-white/90 text-sm mt-2">Ensure cluster has majority (odd number of nodes) after removal.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Node Maintenance</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Check node health<br/>
                        SELECT * FROM pgraft_node_info('production-cluster');<br/><br/>
                        # Check if node is leader<br/>
                        SELECT pgraft_is_leader('production-cluster');<br/><br/>
                        # Force election if needed<br/>
                        SELECT pgraft_force_election('production-cluster');
                      </code>
              </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Failover Management */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Failover Management</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Automatic Failover</h3>
                    <p className="text-white/90 mb-4">
                      pgraft automatically handles failover when the leader becomes unavailable. The failover process:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-red-400 text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Leader Detection</h4>
                          <p className="text-white/90 text-sm">Followers detect leader unavailability through missed heartbeats</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-red-400 text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Election Process</h4>
                          <p className="text-white/90 text-sm">Follower becomes candidate and requests votes from other nodes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-red-400 text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">New Leader</h4>
                          <p className="text-white/90 text-sm">Candidate with majority votes becomes new leader</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-red-400 text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Service Continuation</h4>
                          <p className="text-white/90 text-sm">New leader takes over and continues serving requests</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Manual Failover</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Trigger manual failover<br/>
                        SELECT pgraft_force_election('production-cluster');<br/><br/>
                        # Check new leader<br/>
                        SELECT * FROM pgraft_leader('production-cluster');
                      </code>
              </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring and Maintenance */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring and Maintenance</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Health Monitoring</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Comprehensive cluster status<br/>
                        SELECT * FROM pgraft_cluster_status('production-cluster');<br/><br/>
                        # Individual node status<br/>
                        SELECT * FROM pgraft_node_info('production-cluster');<br/><br/>
                        # Performance metrics<br/>
                        SELECT * FROM pgraft_metrics('production-cluster');
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Configuration Management</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # View current configuration<br/>
                        SELECT * FROM pgraft_get_config('production-cluster');<br/><br/>
                        # Update configuration<br/>
                        SELECT pgraft_set_config('production-cluster', 'heartbeat_interval', '50ms');<br/>
                        SELECT pgraft_set_config('production-cluster', 'election_timeout', '500ms');
                      </code>
              </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Backup and Recovery</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Regular Backups</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # PostgreSQL backup<br/>
                            pg_dump -h leader-node -U postgres database_name &gt; backup.sql<br/><br/>
                            # Raft log backup<br/>
                            SELECT pgraft_backup_logs('production-cluster');
                          </code>
              </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Disaster Recovery</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # Restore from backup<br/>
                            psql -h new-node -U postgres database_name &lt; backup.sql<br/><br/>
                            # Rebuild cluster<br/>
                            SELECT pgraft_init_cluster('production-cluster');<br/>
                            SELECT pgraft_add_member('production-cluster', 'node1', 'host=new-node port=5432');
                          </code>
              </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Best Practices</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Cluster Design</h3>
                    <ul className="text-white/90 text-sm space-y-1 ml-4">
                      <li>• Use odd number of nodes (3, 5, 7) for proper majority voting</li>
                      <li>• Deploy nodes across different availability zones</li>
                      <li>• Ensure low latency network connectivity between nodes</li>
                      <li>• Monitor disk space for Raft logs and snapshots</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Performance Tuning</h3>
                    <ul className="text-white/90 text-sm space-y-1 ml-4">
                      <li>• Adjust heartbeat_interval based on network latency</li>
                      <li>• Set election_timeout to 3-5x heartbeat_interval</li>
                      <li>• Configure snapshot_threshold based on log growth</li>
                      <li>• Monitor and tune PostgreSQL settings for optimal performance</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-2">Operational Procedures</h3>
                    <ul className="text-white/90 text-sm space-y-1 ml-4">
                      <li>• Plan maintenance windows for non-leader nodes first</li>
                      <li>• Always verify cluster health after changes</li>
                      <li>• Keep detailed logs of cluster operations</li>
                      <li>• Test failover procedures regularly</li>
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
