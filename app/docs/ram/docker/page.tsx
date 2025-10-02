import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAM Docker Setup - Containerized Deployment | pgElephant',
  description: 'Complete Docker deployment guide for RAM PostgreSQL clustering. Docker Compose configurations and multi-node setups.',
}

export default function RamDockerPage() {
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
              RAM Docker Setup
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Containerized deployment guide for RAM PostgreSQL clustering with Docker Compose.
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
              {/* Single Node Setup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Single Node Setup</h2>
          
          <div className="space-y-6">
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Basic Docker Compose</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        version: '3.8'<br/><br/>
                        services:<br/>
                        &nbsp;&nbsp;postgres:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: postgres:16<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_DB: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_USER: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD: password<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "5432:5432"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- postgres_data:/var/lib/postgresql/data<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./postgresql.conf:/etc/postgresql/postgresql.conf<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./init.sql:/docker-entrypoint-initdb.d/init.sql<br/><br/>
                        &nbsp;&nbsp;ramd:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: pgelephant/ramd:latest<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "8080:8080"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "9090:9090"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RAM_CLUSTER_NAME: "single-cluster"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RAM_NODE_ID: "node1"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RAM_POSTGRES_HOST: "postgres"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RAM_POSTGRES_PORT: "5432"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;depends_on:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- postgres<br/><br/>
                        volumes:<br/>
                        &nbsp;&nbsp;postgres_data:
                      </code>
              </div>
            </div>
            
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">PostgreSQL Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # postgresql.conf<br/>
                        shared_preload_libraries = 'pgraft'<br/>
                        max_connections = 200<br/>
                        listen_addresses = '*'<br/>
                        wal_level = replica<br/>
                        max_wal_senders = 10<br/>
                        hot_standby = on
                      </code>
              </div>
            </div>
            
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Initialization Script</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        -- init.sql<br/>
                        CREATE EXTENSION IF NOT EXISTS pgraft;<br/>
                        SELECT pgraft_init_cluster('single-cluster');<br/>
                        SELECT pgraft_add_member('single-cluster', 'node1', 'host=postgres port=5432');
                      </code>
              </div>
            </div>
          </div>
        </div>

              {/* Multi-Node Cluster */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Multi-Node Cluster</h2>
          
          <div className="space-y-6">
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">3-Node Cluster Setup</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        version: '3.8'<br/><br/>
                        services:<br/>
                        &nbsp;&nbsp;postgres1:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: postgres:16<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_DB: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_USER: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD: password<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "5432:5432"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- postgres1_data:/var/lib/postgresql/data<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;command: ["postgres", "-c", "shared_preload_libraries=pgraft"]<br/><br/>
                        &nbsp;&nbsp;postgres2:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: postgres:16<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_DB: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_USER: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD: password<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "5433:5432"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- postgres2_data:/var/lib/postgresql/data<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;command: ["postgres", "-c", "shared_preload_libraries=pgraft"]<br/><br/>
                        &nbsp;&nbsp;postgres3:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: postgres:16<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_DB: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_USER: postgres<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD: password<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "5434:5432"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- postgres3_data:/var/lib/postgresql/data<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;command: ["postgres", "-c", "shared_preload_libraries=pgraft"]<br/><br/>
                        volumes:<br/>
                        &nbsp;&nbsp;postgres1_data:<br/>
                        &nbsp;&nbsp;postgres2_data:<br/>
                        &nbsp;&nbsp;postgres3_data:
                      </code>
              </div>
            </div>
            
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">RAM Daemon Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # ramd.conf for node1<br/>
                        [cluster]<br/>
                        name = "production-cluster"<br/>
                        node_id = "node1"<br/><br/>
                        [postgresql]<br/>
                        host = "postgres1"<br/>
                        port = 5432<br/>
                        user = "postgres"<br/>
                        password = "password"<br/><br/>
                        [raft]<br/>
                        listen_addr = "0.0.0.0:8080"<br/>
                        peers = ["node1:8080", "node2:8080", "node3:8080"]
                      </code>
              </div>
            </div>
          </div>
        </div>

              {/* Production Setup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Production Setup</h2>
          
          <div className="space-y-6">
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Production Docker Compose</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        {`version: '3.8'

services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: \${POSTGRES_DB}
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    ports:
      - "\${POSTGRES_PORT}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./config/postgresql.conf:/etc/postgresql/postgresql.conf
      - ./ssl:/etc/ssl/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER}"]
      interval: 30s
      timeout: 10s
      retries: 3

  ramd:
    image: pgelephant/ramd:latest
    restart: unless-stopped
    ports:
      - "\${RAM_PORT}:8080"
      - "\${METRICS_PORT}:9090"
    environment:
      RAM_CLUSTER_NAME: \${CLUSTER_NAME}
      RAM_NODE_ID: \${NODE_ID}
      RAM_POSTGRES_HOST: postgres
      RAM_POSTGRES_PORT: 5432
      RAM_LOG_LEVEL: info
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3`}
                      </code>
                    </div>
            </div>
            
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Environment Variables</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # .env file<br/>
                        POSTGRES_DB=production<br/>
                        POSTGRES_USER=postgres<br/>
                        POSTGRES_PASSWORD=secure_password<br/>
                        POSTGRES_PORT=5432<br/><br/>
                        CLUSTER_NAME=production-cluster<br/>
                        NODE_ID=node1<br/>
                        RAM_PORT=8080<br/>
                        METRICS_PORT=9090
                      </code>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Setup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Monitoring with Docker</h2>
          
          <div className="space-y-6">
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Prometheus & Grafana</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        &nbsp;&nbsp;prometheus:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: prom/prometheus:latest<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "9090:9090"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./config/prometheus.yml:/etc/prometheus/prometheus.yml<br/><br/>
                        &nbsp;&nbsp;grafana:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;image: grafana/grafana:latest<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;ports:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "3000:3000"<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;environment:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GF_SECURITY_ADMIN_PASSWORD: admin<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;volumes:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- grafana_data:/var/lib/grafana<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./config/grafana/dashboards:/etc/grafana/provisioning/dashboards<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ./config/grafana/datasources:/etc/grafana/provisioning/datasources
                      </code>
              </div>
            </div>
            
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Prometheus Configuration</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # prometheus.yml<br/>
                        global:<br/>
                        &nbsp;&nbsp;scrape_interval: 15s<br/><br/>
                        scrape_configs:<br/>
                        &nbsp;&nbsp;- job_name: 'ram-cluster'<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['ramd:9090']<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;scrape_interval: 5s<br/><br/>
                        &nbsp;&nbsp;- job_name: 'postgresql'<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['postgres:9187']
                      </code>
              </div>
            </div>
          </div>
        </div>

              {/* Deployment Commands */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-thin text-white mb-6">Deployment Commands</h2>
          
          <div className="space-y-6">
            <div>
                    <h3 className="text-lg font-thin text-white mb-3">Basic Deployment</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Start the cluster<br/>
                        docker-compose up -d<br/><br/>
                        # Check status<br/>
                        docker-compose ps<br/><br/>
                        # View logs<br/>
                        docker-compose logs -f ramd<br/><br/>
                        # Stop the cluster<br/>
                        docker-compose down<br/><br/>
                        # Stop and remove volumes<br/>
                        docker-compose down -v
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Cluster Management</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Check cluster status<br/>
                        docker exec -it ramd_ramd_1 ramctrl status --cluster production-cluster<br/><br/>
                        # Add node to cluster<br/>
                        docker exec -it ramd_ramd_1 ramctrl nodes add --cluster production-cluster --node node2:8080<br/><br/>
                        # Trigger failover<br/>
                        docker exec -it ramd_ramd_1 ramctrl failover --cluster production-cluster<br/><br/>
                        # View metrics<br/>
                        curl http://localhost:9090/metrics
                      </code>
                </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-thin text-white mb-3">Health Checks</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                      <code className="text-green-400 text-sm">
                        # Check PostgreSQL health<br/>
                        docker exec -it ramd_postgres_1 pg_isready -U postgres<br/><br/>
                        # Check RAM health<br/>
                        curl http://localhost:8080/api/v1/health<br/><br/>
                        # Check cluster health<br/>
                        docker exec -it ramd_ramd_1 ramctrl health --cluster production-cluster
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