import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Troubleshooting - Common Issues & Solutions | pgElephant',
  description: 'Complete troubleshooting guide for pgraft PostgreSQL Raft extension. Common issues, error codes, and step-by-step solutions.',
}

export default function PgraftTroubleshootingPage() {
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
              pgraft Troubleshooting
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Resolve common issues and errors with pgraft PostgreSQL Raft extension.
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
              {/* Common Issues */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Common Issues</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Extension Won't Load</h3>
                    <p className="text-white/90 mb-3">pgraft extension fails to load or initialize.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Symptoms:</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• Extension not found error</li>
                          <li>• PostgreSQL fails to start</li>
                          <li>• Shared library not found</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Solutions:</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # Check extension installation<br/>
                            ls -la /usr/lib/postgresql/16/lib/pgraft.so<br/><br/>
                            # Reinstall extension<br/>
                            make clean && make && sudo make install<br/><br/>
                            # Check PostgreSQL configuration<br/>
                            grep shared_preload_libraries postgresql.conf
                          </code>
            </pre></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">Cluster Split-Brain</h3>
                    <p className="text-white/90 mb-3">Multiple nodes think they are the leader.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Symptoms:</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• Multiple leaders reported</li>
                          <li>• Inconsistent cluster state</li>
                          <li>• Write conflicts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Solutions:</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # Check cluster status<br/>
                            SELECT * FROM pgraft_cluster_status('my-cluster');<br/><br/>
                            # Force new election<br/>
                            SELECT pgraft_force_election('my-cluster');<br/><br/>
                            # Check network connectivity<br/>
                            ping -c 3 node1 node2 node3
                          </code>
            </pre></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-thin text-white mb-2">High Replication Latency</h3>
                    <p className="text-white/90 mb-3">Slow log replication between nodes.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Symptoms:</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• Large commit index lag</li>
                          <li>• Slow failover times</li>
                          <li>• Inconsistent read results</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Solutions:</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # Reduce heartbeat interval<br/>
                            SELECT pgraft_set_config('my-cluster', 'heartbeat_interval', '50ms');<br/><br/>
                            # Check network latency<br/>
                            traceroute node1 node2 node3<br/><br/>
                            # Monitor replication metrics<br/>
                            SELECT * FROM pgraft_metrics('my-cluster');
                          </code>
            </pre></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Codes */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Error Codes and Messages</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">pgraft Error Codes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-400/30">
                            <th className="text-left py-2 text-white font-thin">Error Code</th>
                            <th className="text-left py-2 text-white font-thin">Description</th>
                            <th className="text-left py-2 text-white font-thin">Solution</th>
                          </tr>
                        </thead>
                        <tbody className="text-white/90">
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">PGR01</td>
                            <td className="py-2">Cluster not initialized</td>
                            <td className="py-2">Initialize cluster with pgraft_init_cluster()</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">PGR02</td>
                            <td className="py-2">Node not found in cluster</td>
                            <td className="py-2">Add node with pgraft_add_member()</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">PGR03</td>
                            <td className="py-2">Not the leader</td>
                            <td className="py-2">Wait for leader or check cluster status</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">PGR04</td>
                            <td className="py-2">Network timeout</td>
                            <td className="py-2">Check network connectivity and increase timeout</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">PGR05</td>
                            <td className="py-2">Configuration error</td>
                            <td className="py-2">Validate configuration parameters</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Commands */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Diagnostic Commands</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Health Checks</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Comprehensive cluster status<br/>
                        SELECT * FROM pgraft_cluster_status('my-cluster');<br/><br/>
                        # Check leader information<br/>
                        SELECT * FROM pgraft_leader('my-cluster');<br/><br/>
                        # Node-specific information<br/>
                        SELECT * FROM pgraft_node_info('my-cluster');<br/><br/>
                        # Performance metrics<br/>
                        SELECT * FROM pgraft_metrics('my-cluster');
                      </code>
            </pre></div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Configuration Validation</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # View current configuration<br/>
                        SELECT * FROM pgraft_get_config('my-cluster');<br/><br/>
                        # Check PostgreSQL settings<br/>
                        SHOW shared_preload_libraries;<br/>
                        SHOW max_connections;<br/><br/>
                        # Verify extension is loaded<br/>
                        SELECT * FROM pg_extension WHERE extname = 'pgraft';
                      </code>
            </pre></div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Network Diagnostics</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # Test connectivity to other nodes<br/>
                        telnet node1 5433<br/>
                        telnet node2 5433<br/>
                        telnet node3 5433<br/><br/>
                        # Check network latency<br/>
                        ping -c 10 node1<br/>
                        traceroute node1<br/><br/>
                        # Test PostgreSQL connectivity<br/>
                        psql -h node1 -p 5432 -U postgres -c "SELECT 1"
                      </code>
            </pre></div>
                  </div>
                </div>
              </div>

              {/* Recovery Procedures */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Recovery Procedures</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Node Recovery</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-green-400 text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Stop PostgreSQL</h4>
                          <p className="text-white/90 text-sm">Gracefully stop PostgreSQL on the failed node</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-green-400 text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Clean Up State</h4>
                          <p className="text-white/90 text-sm">Remove any corrupted state files or logs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-green-400 text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Restart Services</h4>
                          <p className="text-white/90 text-sm">Restart PostgreSQL and rejoin cluster</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-green-400 text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-1">Verify Recovery</h4>
                          <p className="text-white/90 text-sm">Check cluster status and node health</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Recovery</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                      <code className="text-green-400 text-sm">
                        # If cluster is completely down<br/>
                        # 1. Start majority of nodes<br/>
                        # 2. Reinitialize cluster<br/>
                        SELECT pgraft_init_cluster('my-cluster');<br/><br/>
                        # 3. Add remaining nodes<br/>
                        SELECT pgraft_add_member('my-cluster', 'node1', 'host=node1 port=5432');<br/>
                        SELECT pgraft_add_member('my-cluster', 'node2', 'host=node2 port=5432');<br/>
                        SELECT pgraft_add_member('my-cluster', 'node3', 'host=node3 port=5432');<br/><br/>
                        # 4. Verify cluster health<br/>
                        SELECT * FROM pgraft_cluster_status('my-cluster');
                      </code>
            </pre></div>
                  </div>
                </div>
              </div>

              {/* Performance Issues */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Troubleshooting</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Slow Operations</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Check Metrics:</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            SELECT * FROM pgraft_metrics('my-cluster');<br/>
                            SELECT * FROM pg_stat_activity;<br/>
                            SELECT * FROM pg_stat_database;
                          </code>
            </pre></div>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Common Solutions:</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• Increase heartbeat frequency</li>
                          <li>• Optimize network settings</li>
                          <li>• Check PostgreSQL configuration</li>
                          <li>• Monitor resource usage</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Memory Issues</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Symptoms:</h4>
                        <ul className="text-white/90 text-sm space-y-1 ml-4">
                          <li>• High memory usage</li>
                          <li>• Out of memory errors</li>
                          <li>• Slow garbage collection</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-thin text-white mb-1">Solutions:</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <pre className="text-sm overflow-x-auto">
                          <code className="text-green-400 text-sm">
                            # Reduce log entries<br/>
                            SELECT pgraft_set_config('my-cluster', 'max_log_entries', '5000');<br/><br/>
                            # Force snapshot<br/>
                            SELECT pgraft_snapshot('my-cluster');<br/><br/>
                            # Check PostgreSQL memory settings<br/>
                            SHOW shared_buffers;<br/>
                            SHOW work_mem;
                          </code>
            </pre></div>
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
