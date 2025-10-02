import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM Monitoring - Prometheus Metrics & Grafana | pgElephant',
  description: 'Complete monitoring guide for RAM PostgreSQL clustering. Prometheus metrics, Grafana dashboards, and health monitoring.',
}

export default function RamMonitoringPage() {
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
              RAM Monitoring
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive monitoring solution for RAM PostgreSQL clustering with Prometheus metrics and Grafana dashboards.
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
              {/* Prometheus Integration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Prometheus Integration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Metrics Endpoint</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # RAM metrics endpoint<br/>
                        curl http://localhost:9090/metrics<br/><br/>
                        # Example metrics output<br/>
                        # HELP ram_cluster_nodes_total Total number of nodes in cluster<br/>
                        # TYPE ram_cluster_nodes_total gauge<br/>
                        ram_cluster_nodes_total&#123;cluster="production"&#125; 3<br/><br/>
                        # HELP ram_cluster_leader_term Current leader term<br/>
                        # TYPE ram_cluster_leader_term gauge<br/>
                        ram_cluster_leader_term&#123;cluster="production"&#125; 42<br/><br/>
                        # HELP ram_failover_events_total Total number of failover events<br/>
                        # TYPE ram_failover_events_total counter<br/>
                        ram_failover_events_total&#123;cluster="production"&#125; 5
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Prometheus Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # prometheus.yml<br/>
                        global:<br/>
                        &nbsp;&nbsp;scrape_interval: 15s<br/>
                        &nbsp;&nbsp;evaluation_interval: 15s<br/><br/>
                        scrape_configs:<br/>
                        &nbsp;&nbsp;- job_name: 'ram-cluster'<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['node1:9090', 'node2:9090', 'node3:9090']<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;metrics_path: '/metrics'<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;scrape_interval: 5s<br/><br/>
                        &nbsp;&nbsp;- job_name: 'postgresql'<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['node1:9187', 'node2:9187', 'node3:9187']
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Key Metrics</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Metrics</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-400/30">
                            <th className="text-left py-2 text-white font-thin">Metric</th>
                            <th className="text-left py-2 text-white font-thin">Type</th>
                            <th className="text-left py-2 text-white font-thin">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-white/90">
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_cluster_nodes_total</td>
                            <td className="py-2">Gauge</td>
                            <td className="py-2">Total number of nodes in cluster</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_cluster_leader_term</td>
                            <td className="py-2">Gauge</td>
                            <td className="py-2">Current leader term</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_cluster_commit_index</td>
                            <td className="py-2">Gauge</td>
                            <td className="py-2">Current commit index</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_failover_events_total</td>
                            <td className="py-2">Counter</td>
                            <td className="py-2">Total number of failover events</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_election_duration_seconds</td>
                            <td className="py-2">Histogram</td>
                            <td className="py-2">Leader election duration</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Node Metrics</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-400/30">
                            <th className="text-left py-2 text-white font-thin">Metric</th>
                            <th className="text-left py-2 text-white font-thin">Type</th>
                            <th className="text-left py-2 text-white font-thin">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-white/90">
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_node_state</td>
                            <td className="py-2">Gauge</td>
                            <td className="py-2">Node state (0=follower, 1=candidate, 2=leader)</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_node_log_size</td>
                            <td className="py-2">Gauge</td>
                            <td className="py-2">Size of node's log</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_node_uptime_seconds</td>
                            <td className="py-2">Counter</td>
                            <td className="py-2">Node uptime in seconds</td>
                          </tr>
                          <tr className="border-b border-slate-400/20">
                            <td className="py-2 font-mono">ram_node_requests_total</td>
                            <td className="py-2">Counter</td>
                            <td className="py-2">Total requests processed by node</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grafana Dashboards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Grafana Dashboards</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Overview Dashboard</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Key Panels</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Cluster health status</li>
                          <li>• Current leader and term</li>
                          <li>• Node count and status</li>
                          <li>• Failover events timeline</li>
                          <li>• Request rate and latency</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Alerts</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Cluster split-brain detection</li>
                          <li>• High failover frequency</li>
                          <li>• Node unreachable</li>
                          <li>• High replication lag</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Performance Dashboard</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Metrics</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Election duration histogram</li>
                          <li>• Log replication latency</li>
                          <li>• Commit index progression</li>
                          <li>• Network throughput</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Trends</h4>
                        <ul className="text-white/90 text-sm space-y-1">
                          <li>• Request rate over time</li>
                          <li>• Error rate trends</li>
                          <li>• Resource utilization</li>
                          <li>• Performance degradation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Monitoring */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Health Monitoring</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Health Check Endpoints</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Cluster health check<br/>
                        curl http://localhost:8080/api/v1/health<br/><br/>
                        # Node health check<br/>
                        curl http://localhost:8080/api/v1/health/node<br/><br/>
                        # PostgreSQL health check<br/>
                        curl http://localhost:8080/api/v1/health/postgres<br/><br/>
                        # Comprehensive health status<br/>
                        curl http://localhost:8080/api/v1/health/full
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Health Check Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [monitoring]<br/>
                        health_check_enabled = true<br/>
                        health_check_interval = 5s<br/>
                        health_check_timeout = 3s<br/>
                        health_check_retries = 3<br/><br/>
                        # Health check endpoints<br/>
                        health_check_endpoints = [<br/>
                        &nbsp;&nbsp;"http://localhost:8080/api/v1/health",<br/>
                        &nbsp;&nbsp;"http://localhost:8080/api/v1/health/postgres"<br/>
                        ]
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerting Rules */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Alerting Rules</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Prometheus Alert Rules</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        {`groups:
- name: ram-cluster
  rules:
  - alert: RAMClusterDown
    expr: up{job="ram-cluster"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "RAM cluster node is down"

  - alert: RAMHighFailoverRate
    expr: rate(ram_failover_events_total[5m]) > 0.1
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "High failover rate detected"`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Common Alerts</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-thin text-white mb-2">Critical Alerts</h4>
                          <ul className="text-white/90 text-sm space-y-1">
                            <li>• Cluster node down</li>
                            <li>• No leader elected</li>
                            <li>• Split-brain detected</li>
                            <li>• PostgreSQL connection lost</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-thin text-white mb-2">Warning Alerts</h4>
                          <ul className="text-white/90 text-sm space-y-1">
                            <li>• High failover rate</li>
                            <li>• Replication lag high</li>
                            <li>• High election duration</li>
                            <li>• Node resource usage high</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring Commands */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring Commands</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Real-time Monitoring</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Live cluster monitoring<br/>
                        ramctrl monitor --cluster production-cluster<br/><br/>
                        # Monitor with auto-refresh<br/>
                        ramctrl monitor --cluster production-cluster --refresh 5s<br/><br/>
                        # Monitor specific metrics<br/>
                        ramctrl metrics --cluster production-cluster --format prometheus<br/><br/>
                        # Health check all nodes<br/>
                        ramctrl health --cluster production-cluster --all
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Historical Analysis</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Export metrics for analysis<br/>
                        ramctrl metrics --cluster production-cluster --output metrics.json<br/><br/>
                        # Historical failover events<br/>
                        ramctrl failover history --cluster production-cluster<br/><br/>
                        # Performance trends<br/>
                        ramctrl metrics --cluster production-cluster --since 1h
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
