import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM Configuration - Advanced Settings | pgElephant',
  description: 'Complete configuration guide for RAM PostgreSQL clustering. Advanced settings, cluster configuration, and optimization parameters.',
}

export default function RamConfigurationPage() {
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
              RAM Configuration
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Advanced configuration options for RAM PostgreSQL clustering and high availability.
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
              {/* Cluster Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Cluster Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">ramd.conf Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [cluster]<br/>
                        name = "production-cluster"<br/>
                        node_id = "node1"<br/>
                        data_dir = "/var/lib/ram"<br/><br/>
                        [postgresql]<br/>
                        host = "localhost"<br/>
                        port = 5432<br/>
                        user = "postgres"<br/>
                        password = "secure_password"<br/>
                        database = "postgres"<br/><br/>
                        [raft]<br/>
                        listen_addr = "0.0.0.0:8080"<br/>
                        heartbeat_interval = 100ms<br/>
                        election_timeout = 1000ms<br/>
                        snapshot_threshold = 1000<br/><br/>
                        [monitoring]<br/>
                        metrics_port = 9090<br/>
                        health_check_interval = 5s<br/>
                        log_level = "info"
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Environment Variables</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        export RAM_CLUSTER_NAME="production-cluster"<br/>
                        export RAM_NODE_ID="node1"<br/>
                        export RAM_LISTEN_ADDR="0.0.0.0:8080"<br/>
                        export RAM_METRICS_PORT="9090"<br/>
                        export RAM_LOG_LEVEL="info"<br/>
                        export RAM_DATA_DIR="/var/lib/ram"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">PostgreSQL Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">postgresql.conf Settings</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Required for pgraft extension<br/>
                        shared_preload_libraries = 'pgraft'<br/><br/>
                        # Connection settings<br/>
                        max_connections = 200<br/>
                        listen_addresses = '*'<br/>
                        port = 5432<br/><br/>
                        # Memory settings<br/>
                        shared_buffers = 256MB<br/>
                        effective_cache_size = 1GB<br/>
                        work_mem = 4MB<br/><br/>
                        # WAL settings<br/>
                        wal_level = replica<br/>
                        max_wal_senders = 10<br/>
                        wal_keep_size = 1GB<br/><br/>
                        # Replication settings<br/>
                        hot_standby = on<br/>
                        max_standby_streaming_delay = 30s<br/>
                        max_standby_archive_delay = 30s
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">pg_hba.conf Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Local connections<br/>
                        local   all             postgres                        peer<br/>
                        local   all             all                             md5<br/><br/>
                        # Host connections<br/>
                        host    all             all             127.0.0.1/32    md5<br/>
                        host    all             all             ::1/128         md5<br/><br/>
                        # Replication connections<br/>
                        local   replication     postgres                        peer<br/>
                        host    replication     postgres        127.0.0.1/32    md5<br/>
                        host    replication     postgres        ::1/128         md5<br/><br/>
                        # Cluster internal connections<br/>
                        host    all             all             192.168.1.0/24  md5
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* pgraft Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">pgraft Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">pgraft Parameters</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # pgraft configuration in postgresql.conf<br/>
                        pgraft.listen_address = '0.0.0.0:5433'<br/>
                        pgraft.heartbeat_interval = 100ms<br/>
                        pgraft.election_timeout = 1000ms<br/>
                        pgraft.snapshot_threshold = 1000<br/>
                        pgraft.max_log_entries = 10000<br/>
                        pgraft.batch_size = 100<br/><br/>
                        # Network settings<br/>
                        pgraft.network_buffer_size = 1MB<br/>
                        pgraft.max_connections_per_node = 100<br/>
                        pgraft.connection_timeout = 30s<br/><br/>
                        # Performance settings<br/>
                        pgraft.compaction_interval = 5m<br/>
                        pgraft.gc_interval = 1m
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Runtime Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # View current configuration<br/>
                        SELECT * FROM pgraft_get_config('production-cluster');<br/><br/>
                        # Update configuration<br/>
                        SELECT pgraft_set_config('production-cluster', 'heartbeat_interval', '50ms');<br/>
                        SELECT pgraft_set_config('production-cluster', 'election_timeout', '500ms');<br/>
                        SELECT pgraft_set_config('production-cluster', 'batch_size', '500');
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Security Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">TLS/SSL Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [security]<br/>
                        tls_enabled = true<br/>
                        tls_cert_file = "/etc/ram/tls/server.crt"<br/>
                        tls_key_file = "/etc/ram/tls/server.key"<br/>
                        tls_ca_file = "/etc/ram/tls/ca.crt"<br/>
                        tls_min_version = "1.2"<br/><br/>
                        # PostgreSQL SSL settings<br/>
                        ssl = on<br/>
                        ssl_cert_file = '/etc/postgresql/ssl/server.crt'<br/>
                        ssl_key_file = '/etc/postgresql/ssl/server.key'<br/>
                        ssl_ca_file = '/etc/postgresql/ssl/ca.crt'
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Authentication</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [authentication]<br/>
                        auth_enabled = true<br/>
                        auth_method = "token"<br/>
                        token_secret = "your-secret-token"<br/>
                        token_expiry = "24h"<br/><br/>
                        # Rate limiting<br/>
                        rate_limit_enabled = true<br/>
                        rate_limit_requests = 1000<br/>
                        rate_limit_window = "1m"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring Configuration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Prometheus Metrics</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [monitoring]<br/>
                        metrics_enabled = true<br/>
                        metrics_port = 9090<br/>
                        metrics_path = "/metrics"<br/>
                        metrics_interval = 30s<br/><br/>
                        # Custom metrics<br/>
                        custom_metrics_enabled = true<br/>
                        business_metrics_enabled = true<br/><br/>
                        # Health checks<br/>
                        health_check_enabled = true<br/>
                        health_check_interval = 5s<br/>
                        health_check_timeout = 3s
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Logging Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        [logging]<br/>
                        log_level = "info"<br/>
                        log_file = "/var/log/ram/ramd.log"<br/>
                        log_max_size = 100MB<br/>
                        log_max_files = 10<br/>
                        log_compress = true<br/><br/>
                        # Structured logging<br/>
                        structured_logging = true<br/>
                        log_format = "json"<br/><br/>
                        # Audit logging<br/>
                        audit_log_enabled = true<br/>
                        audit_log_file = "/var/log/ram/audit.log"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Tuning */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Performance Tuning</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">High Throughput Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # RAM performance settings<br/>
                        heartbeat_interval = 50ms<br/>
                        election_timeout = 500ms<br/>
                        batch_size = 1000<br/>
                        network_buffer_size = 2MB<br/><br/>
                        # PostgreSQL performance<br/>
                        shared_buffers = 512MB<br/>
                        effective_cache_size = 2GB<br/>
                        work_mem = 8MB<br/>
                        maintenance_work_mem = 128MB<br/><br/>
                        # Connection pooling<br/>
                        max_connections = 300<br/>
                        connection_pool_size = 100
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Low Latency Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # RAM latency settings<br/>
                        heartbeat_interval = 25ms<br/>
                        election_timeout = 250ms<br/>
                        batch_size = 100<br/>
                        network_buffer_size = 512KB<br/><br/>
                        # PostgreSQL latency<br/>
                        shared_buffers = 128MB<br/>
                        effective_cache_size = 1GB<br/>
                        work_mem = 2MB<br/>
                        synchronous_commit = on<br/><br/>
                        # Fast failover<br/>
                        failover_timeout = 1s<br/>
                        health_check_interval = 2s
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation and Testing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Configuration Validation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Validation Commands</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Validate RAM configuration<br/>
                        ramd --config-check<br/><br/>
                        # Test PostgreSQL connectivity<br/>
                        ramctrl health --cluster production-cluster<br/><br/>
                        # Validate pgraft configuration<br/>
                        SELECT * FROM pgraft_get_config('production-cluster');<br/><br/>
                        # Test cluster operations<br/>
                        ramctrl status --cluster production-cluster
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Configuration Testing</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Load Testing</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            # Generate test load<br/>
                            pgbench -h leader-node -p 5432 -U postgres -T 300 -c 10 -j 2 postgres<br/><br/>
                            # Monitor performance<br/>
                            ramctrl metrics --cluster production-cluster --format prometheus
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-thin text-white mb-2">Failover Testing</h4>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          <code className="text-green-400 text-sm">
                            # Test manual failover<br/>
                            ramctrl failover --cluster production-cluster<br/><br/>
                            # Test automatic failover<br/>
                            # Stop leader PostgreSQL service<br/>
                            sudo systemctl stop postgresql<br/><br/>
                            # Monitor failover<br/>
                            ramctrl status --cluster production-cluster
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
    </div>
  )
}
