import React from 'react';
import { CheckCircle, AlertCircle, Info, Terminal, Database, Settings, Monitor, Shield, Cloud, GitBranch, Zap, Globe } from 'lucide-react';

export default function RamDockerSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-teal-600 py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">RAM Docker Setup</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Complete guide to deploying RAM PostgreSQL clustering solution using Docker and Docker Compose
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <AlertCircle className="w-8 h-8 mr-3" />
            Prerequisites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Docker Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Docker 20.10+ installed</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Docker Compose 2.0+</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />4GB+ RAM available</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />10GB+ disk space</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Ports 5432-5435, 8080, 9090 available</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">System Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Linux, macOS, or Windows with WSL2</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Multi-core CPU recommended</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />SSD storage for better performance</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Network connectivity for cluster communication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            Quick Start
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">1. Clone and Setup</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Clone the repository</div>
                <div className="text-slate-300 mb-2">git clone https://github.com/pgElephant/ram.git</div>
                <div className="text-slate-300 mb-2">cd ram</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Copy environment configuration</div>
                <div className="text-slate-300 mb-2">cp docker/.env.example .env</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Edit configuration (optional)</div>
                <div className="text-slate-300 mb-2">nano .env</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">2. Start the Cluster</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Start all services</div>
                <div className="text-slate-300 mb-2">docker-compose up -d</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Check service status</div>
                <div className="text-slate-300 mb-2">docker-compose ps</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># View logs</div>
                <div className="text-slate-300 mb-2">docker-compose logs -f</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">3. Verify Installation</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Test PostgreSQL connections</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-primary psql -U postgres -c "SELECT version();"</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-standby1 psql -U postgres -c "SELECT pg_is_in_recovery();"</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Test RAM API</div>
                <div className="text-slate-300 mb-2">curl http://localhost:8080/health</div>
                <div className="text-slate-300 mb-2">curl http://localhost:8080/cluster/info</div>
              </div>
            </div>
          </div>
        </div>

        {/* Docker Compose Configuration */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Docker Compose Configuration
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Basic docker-compose.yml</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-slate-300 mb-2">version: '3.8'</div>
                <div className="text-slate-300 mb-2">services:</div>
                <div className="text-slate-300 mb-2">  postgres-primary:</div>
                <div className="text-slate-300 mb-2">    image: postgres:15</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      POSTGRES_DB: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_USER: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_PASSWORD: postgres</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_ID: 1</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_NAME: primary</div>
                <div className="text-slate-300 mb-2">      PGRaft_CLUSTER_NAME: docker-cluster</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "5432:5432"</div>
                <div className="text-slate-300 mb-2">      - "5433:5433"</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - postgres_primary_data:/var/lib/postgresql/data</div>
                <div className="text-slate-300 mb-2">      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">  ramd-primary:</div>
                <div className="text-slate-300 mb-2">    image: pgelephant/ramd:latest</div>
                <div className="text-slate-300 mb-2">    depends_on:</div>
                <div className="text-slate-300 mb-2">      - postgres-primary</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "8080:8080"</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      RAMD_NODE_ID: 1</div>
                <div className="text-slate-300 mb-2">      RAMD_CLUSTER_NAME: docker-cluster</div>
                <div className="text-slate-300 mb-2">      RAMD_DATABASE_URL: postgresql://postgres:postgres@postgres-primary:5432/postgres</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">volumes:</div>
                <div className="text-slate-300 mb-2">  postgres_primary_data:</div>
                <div className="text-slate-300 mb-2">  postgres_standby1_data:</div>
                <div className="text-slate-300 mb-2">  postgres_standby2_data:</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">networks:</div>
                <div className="text-slate-300 mb-2">  ram-network:</div>
                <div className="text-slate-300 mb-2">    driver: bridge</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Environment Variables (.env)</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># PostgreSQL Configuration</div>
                <div className="text-slate-300 mb-2">POSTGRES_DB=postgres</div>
                <div className="text-slate-300 mb-2">POSTGRES_USER=postgres</div>
                <div className="text-slate-300 mb-2">POSTGRES_PASSWORD=your_secure_password</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># RAM Configuration</div>
                <div className="text-slate-300 mb-2">RAMD_CLUSTER_NAME=docker-cluster</div>
                <div className="text-slate-300 mb-2">RAMD_API_PORT=8080</div>
                <div className="text-slate-300 mb-2">RAMD_METRICS_PORT=9090</div>
                <div className="text-slate-300 mb-2">RAMD_LOG_LEVEL=INFO</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Security</div>
                <div className="text-slate-300 mb-2">RAMD_AUTH_TOKEN=your-secure-token</div>
                <div className="text-slate-300 mb-2">RAMD_SSL_ENABLED=false</div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Node Setup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Database className="w-8 h-8 mr-3" />
            Multi-Node Cluster Setup
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">3-Node Cluster Configuration</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-slate-300 mb-2"># Add to docker-compose.yml</div>
                <div className="text-slate-300 mb-2">  postgres-standby1:</div>
                <div className="text-slate-300 mb-2">    image: postgres:15</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      POSTGRES_DB: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_USER: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_PASSWORD: postgres</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_ID: 2</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_NAME: standby1</div>
                <div className="text-slate-300 mb-2">      PGRaft_CLUSTER_NAME: docker-cluster</div>
                <div className="text-slate-300 mb-2">      PGRaft_PRIMARY_HOST: postgres-primary</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "5434:5432"</div>
                <div className="text-slate-300 mb-2">      - "5436:5433"</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - postgres_standby1_data:/var/lib/postgresql/data</div>
                <div className="text-slate-300 mb-2">    depends_on:</div>
                <div className="text-slate-300 mb-2">      - postgres-primary</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">  postgres-standby2:</div>
                <div className="text-slate-300 mb-2">    image: postgres:15</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      POSTGRES_DB: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_USER: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_PASSWORD: postgres</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_ID: 3</div>
                <div className="text-slate-300 mb-2">      PGRaft_NODE_NAME: standby2</div>
                <div className="text-slate-300 mb-2">      PGRaft_CLUSTER_NAME: docker-cluster</div>
                <div className="text-slate-300 mb-2">      PGRaft_PRIMARY_HOST: postgres-primary</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "5435:5432"</div>
                <div className="text-slate-300 mb-2">      - "5437:5433"</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - postgres_standby2_data:/var/lib/postgresql/data</div>
                <div className="text-slate-300 mb-2">    depends_on:</div>
                <div className="text-slate-300 mb-2">      - postgres-primary</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Initialize Cluster</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Start all nodes</div>
                <div className="text-slate-300 mb-2">docker-compose up -d</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Wait for all nodes to be ready</div>
                <div className="text-slate-300 mb-2">docker-compose logs -f</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Initialize cluster on primary</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-primary psql -U postgres -c "CREATE EXTENSION pgraft;"</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-primary psql -U postgres -c "SELECT pgraft_init_cluster('docker-cluster', 1, 'primary');"</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Add standby nodes</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-primary psql -U postgres -c "SELECT pgraft_add_node(2, 'standby1', 'postgres-standby1', 5432, 5433);"</div>
                <div className="text-slate-300 mb-2">docker-compose exec postgres-primary psql -U postgres -c "SELECT pgraft_add_node(3, 'standby2', 'postgres-standby2', 5432, 5433);"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Setup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Monitor className="w-8 h-8 mr-3" />
            Monitoring Setup
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Add Prometheus and Grafana</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-slate-300 mb-2"># Add to docker-compose.yml</div>
                <div className="text-slate-300 mb-2">  prometheus:</div>
                <div className="text-slate-300 mb-2">    image: prom/prometheus:latest</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "9090:9090"</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - ./docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml</div>
                <div className="text-slate-300 mb-2">      - prometheus_data:/prometheus</div>
                <div className="text-slate-300 mb-2">    command:</div>
                <div className="text-slate-300 mb-2">      - '--config.file=/etc/prometheus/prometheus.yml'</div>
                <div className="text-slate-300 mb-2">      - '--storage.tsdb.path=/prometheus'</div>
                <div className="text-slate-300 mb-2">      - '--web.console.libraries=/etc/prometheus/console_libraries'</div>
                <div className="text-slate-300 mb-2">      - '--web.console.templates=/etc/prometheus/consoles'</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">  grafana:</div>
                <div className="text-slate-300 mb-2">    image: grafana/grafana:latest</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "3000:3000"</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      - GF_SECURITY_ADMIN_PASSWORD=admin</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - grafana_data:/var/lib/grafana</div>
                <div className="text-slate-300 mb-2">      - ./docker/grafana/dashboards:/etc/grafana/provisioning/dashboards</div>
                <div className="text-slate-300 mb-2">      - ./docker/grafana/datasources:/etc/grafana/provisioning/datasources</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - ram-network</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Access Monitoring</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Start monitoring stack</div>
                <div className="text-slate-300 mb-2">docker-compose up -d prometheus grafana</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Access services</div>
                <div className="text-slate-300 mb-2"># Prometheus: http://localhost:9090</div>
                <div className="text-slate-300 mb-2"># Grafana: http://localhost:3000 (admin/admin)</div>
                <div className="text-slate-300 mb-2"># RAM API: http://localhost:8080/health</div>
                <div className="text-slate-300 mb-2"># RAM Metrics: http://localhost:8080/metrics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Production Considerations */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            Production Considerations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Security</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Use strong passwords and secrets</li>
                <li>• Enable SSL/TLS for all communications</li>
                <li>• Use Docker secrets for sensitive data</li>
                <li>• Implement network segmentation</li>
                <li>• Regular security updates</li>
                <li>• Backup encryption</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Use SSD storage for data volumes</li>
                <li>• Allocate sufficient CPU and memory</li>
                <li>• Configure PostgreSQL parameters</li>
                <li>• Monitor resource usage</li>
                <li>• Use connection pooling</li>
                <li>• Implement caching strategies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">High Availability</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Deploy across multiple hosts</li>
                <li>• Use Docker Swarm or Kubernetes</li>
                <li>• Implement health checks</li>
                <li>• Configure restart policies</li>
                <li>• Set up automated backups</li>
                <li>• Monitor cluster health</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Backup & Recovery</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Automated daily backups</li>
                <li>• Point-in-time recovery</li>
                <li>• Cross-region replication</li>
                <li>• Test restore procedures</li>
                <li>• Backup verification</li>
                <li>• Disaster recovery plan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Info className="w-8 h-8 mr-3" />
            Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Container won't start</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-green-400"># Check logs</div>
                    <div className="text-slate-300">docker-compose logs postgres-primary</div>
                    <div className="text-slate-300"></div>
                    <div className="text-green-400"># Check port conflicts</div>
                    <div className="text-slate-300">netstat -tulpn | grep :5432</div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Cluster formation fails</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-green-400"># Check network connectivity</div>
                    <div className="text-slate-300">docker-compose exec postgres-primary ping postgres-standby1</div>
                    <div className="text-slate-300"></div>
                    <div className="text-green-400"># Check pgraft status</div>
                    <div className="text-slate-300">docker-compose exec postgres-primary psql -U postgres -c "SELECT * FROM pgraft.cluster_overview;"</div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Performance issues</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-green-400"># Check resource usage</div>
                    <div className="text-slate-300">docker stats</div>
                    <div className="text-slate-300"></div>
                    <div className="text-green-400"># Check PostgreSQL performance</div>
                    <div className="text-slate-300">docker-compose exec postgres-primary psql -U postgres -c "SELECT * FROM pg_stat_activity;"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Cloud className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Kubernetes Deployment</h3>
              <p className="text-slate-300 text-sm">Deploy RAM cluster on Kubernetes for production scalability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Monitor className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Monitoring</h3>
              <p className="text-slate-300 text-sm">Set up comprehensive monitoring with custom dashboards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security Hardening</h3>
              <p className="text-slate-300 text-sm">Implement enterprise-grade security and compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
