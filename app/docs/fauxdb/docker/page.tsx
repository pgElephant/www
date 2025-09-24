import React from 'react';
import { CheckCircle, AlertCircle, Info, Terminal, Database, Settings, Monitor, Shield, Cloud, GitBranch, Zap, Globe } from 'lucide-react';

export default function FauxDBDockerSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">FauxDB Docker Setup</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Complete guide to deploying FauxDB MongoDB-compatible database using Docker and Docker Compose
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <AlertCircle className="w-8 h-8 mr-3" />
            Prerequisites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Docker Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Docker 20.10+ installed</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Docker Compose 2.0+</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />2GB+ RAM available</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />5GB+ disk space</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Ports 27018, 5432, 9090 available</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">System Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Linux, macOS, or Windows with WSL2</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Multi-core CPU recommended</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />SSD storage for better performance</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-400 mr-2" />Network access for MongoDB clients</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            Quick Start
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">1. Clone and Setup</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Clone the repository</div>
                <div className="text-slate-300 mb-2">git clone https://github.com/fauxdb/fauxdb.git</div>
                <div className="text-slate-300 mb-2">cd fauxdb</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Copy environment configuration</div>
                <div className="text-slate-300 mb-2">cp docker/config/docker.env.example .env</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Edit configuration (optional)</div>
                <div className="text-slate-300 mb-2">nano .env</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">2. Start FauxDB</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Quick setup and start</div>
                <div className="text-slate-300 mb-2">make setup</div>
                <div className="text-slate-300 mb-2">docker-compose up -d</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Check service status</div>
                <div className="text-slate-300 mb-2">docker-compose ps</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># View logs</div>
                <div className="text-slate-300 mb-2">docker-compose logs -f fauxdb</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">3. Test MongoDB Connection</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Connect with mongosh</div>
                <div className="text-slate-300 mb-2">mongosh mongodb://localhost:27018</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Test basic operations</div>
                <div className="text-slate-300 mb-2">use testdb</div>
                <div className="text-slate-300 mb-2">db.runCommand(&#123;ping: 1&#125;)</div>
                <div className="text-slate-300 mb-2">db.test.insertOne(&#123;message: "Hello FauxDB!"&#125;)</div>
                <div className="text-slate-300 mb-2">db.test.find()</div>
              </div>
            </div>
          </div>
        </div>

        {/* Docker Compose Configuration */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Docker Compose Configuration
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Basic docker-compose.yml</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-slate-300 mb-2">version: '3.8'</div>
                <div className="text-slate-300 mb-2">services:</div>
                <div className="text-slate-300 mb-2">  postgres:</div>
                <div className="text-slate-300 mb-2">    image: postgres:17</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      POSTGRES_DB: fauxdb</div>
                <div className="text-slate-300 mb-2">      POSTGRES_USER: postgres</div>
                <div className="text-slate-300 mb-2">      POSTGRES_PASSWORD: postgres</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "5432:5432"</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - postgres_data:/var/lib/postgresql/data</div>
                <div className="text-slate-300 mb-2">      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - fauxdb-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">  fauxdb:</div>
                <div className="text-slate-300 mb-2">    build: .</div>
                <div className="text-slate-300 mb-2">    ports:</div>
                <div className="text-slate-300 mb-2">      - "27018:27018"</div>
                <div className="text-slate-300 mb-2">      - "9090:9090"</div>
                <div className="text-slate-300 mb-2">    environment:</div>
                <div className="text-slate-300 mb-2">      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fauxdb</div>
                <div className="text-slate-300 mb-2">      - FAUXDB_PORT=27018</div>
                <div className="text-slate-300 mb-2">      - FAUXDB_MAX_CONNECTIONS=1000</div>
                <div className="text-slate-300 mb-2">    depends_on:</div>
                <div className="text-slate-300 mb-2">      - postgres</div>
                <div className="text-slate-300 mb-2">    volumes:</div>
                <div className="text-slate-300 mb-2">      - ./config:/app/config</div>
                <div className="text-slate-300 mb-2">    networks:</div>
                <div className="text-slate-300 mb-2">      - fauxdb-network</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">volumes:</div>
                <div className="text-slate-300 mb-2">  postgres_data:</div>
                <div className="text-slate-300 mb-4"></div>
                <div className="text-slate-300 mb-2">networks:</div>
                <div className="text-slate-300 mb-2">  fauxdb-network:</div>
                <div className="text-slate-300 mb-2">    driver: bridge</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Environment Variables (.env)</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># PostgreSQL Configuration</div>
                <div className="text-slate-300 mb-2">POSTGRES_USER=postgres</div>
                <div className="text-slate-300 mb-2">POSTGRES_PASSWORD=your_secure_password</div>
                <div className="text-slate-300 mb-2">POSTGRES_DB=fauxdb_prod</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># FauxDB Server</div>
                <div className="text-slate-300 mb-2">FAUXDB_PORT=27018</div>
                <div className="text-slate-300 mb-2">FAUXDB_MAX_CONNECTIONS=1000</div>
                <div className="text-slate-300 mb-2">FAUXDB_WORKER_THREADS=4</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Security</div>
                <div className="text-slate-300 mb-2">FAUXDB_ENABLE_SSL=false</div>
                <div className="text-slate-300 mb-2">FAUXDB_ENABLE_AUTH=false</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Monitoring</div>
                <div className="text-slate-300 mb-2">GRAFANA_PASSWORD=admin123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Environment */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Cloud className="w-8 h-8 mr-3" />
            Development Environment
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Hot Reload Development</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Start development environment</div>
                <div className="text-slate-300 mb-2">make dev</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># View development logs</div>
                <div className="text-slate-300 mb-2">make dev-logs</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Open shell in container</div>
                <div className="text-slate-300 mb-2">make dev-shell</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Stop development environment</div>
                <div className="text-slate-300 mb-2">make dev-stop</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Production Environment</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Start production environment</div>
                <div className="text-slate-300 mb-2">make prod</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Start with monitoring stack</div>
                <div className="text-slate-300 mb-2">make monitor</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># View production logs</div>
                <div className="text-slate-300 mb-2">make prod-logs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Monitor className="w-8 h-8 mr-3" />
            Testing & Validation
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Run Test Suite</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Run tests with Docker</div>
                <div className="text-slate-300 mb-2">make test</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Test with mongosh client</div>
                <div className="text-slate-300 mb-2">make test-mongosh</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Run performance tests</div>
                <div className="text-slate-300 mb-2">make perf-test</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Database Operations</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Open PostgreSQL shell</div>
                <div className="text-slate-300 mb-2">make db-shell</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Backup database</div>
                <div className="text-slate-300 mb-2">make db-backup</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Restore database</div>
                <div className="text-slate-300 mb-2">make db-restore</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            Monitoring Setup
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Prometheus Metrics</h3>
              <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Access metrics endpoint</div>
                <div className="text-slate-300 mb-2">curl http://localhost:9090/metrics</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Key metrics:</div>
                <div className="text-slate-300 mb-2"># - fauxdb_operations_total</div>
                <div className="text-slate-300 mb-2"># - fauxdb_operation_duration_seconds</div>
                <div className="text-slate-300 mb-2"># - fauxdb_connections_active</div>
                <div className="text-slate-300 mb-2"># - fauxdb_transactions_total</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Health Checks</h3>
              <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-blue-400 mb-4"># Basic health check</div>
                <div className="text-slate-300 mb-2">curl http://localhost:9090/health</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Detailed status</div>
                <div className="text-slate-300 mb-2">curl http://localhost:9090/status</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-blue-400 mb-4"># Database connectivity</div>
                <div className="text-slate-300 mb-2">curl http://localhost:9090/db/health</div>
              </div>
            </div>
          </div>
        </div>

        {/* Production Considerations */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
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
                <li>• Enable authentication and authorization</li>
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
                <li>• Monitor service health</li>
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
            <Info className="w-8 h-8 mr-3" />
            Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Container won't start</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-blue-400"># Check logs</div>
                    <div className="text-slate-300">docker-compose logs fauxdb</div>
                    <div className="text-slate-300"></div>
                    <div className="text-blue-400"># Check port conflicts</div>
                    <div className="text-slate-300">netstat -tulpn | grep :27018</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Database connection failed</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-blue-400"># Check PostgreSQL status</div>
                    <div className="text-slate-300">docker-compose exec postgres psql -U postgres -c "SELECT version();"</div>
                    <div className="text-slate-300"></div>
                    <div className="text-blue-400"># Check connection string</div>
                    <div className="text-slate-300">docker-compose exec fauxdb env | grep DATABASE_URL</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">MongoDB client can't connect</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-blue-400"># Test connection</div>
                    <div className="text-slate-300">mongosh mongodb://localhost:27018 --eval "db.runCommand(&#123;ping: 1&#125;)"</div>
                    <div className="text-slate-300"></div>
                    <div className="text-blue-400"># Check FauxDB status</div>
                    <div className="text-slate-300">curl http://localhost:9090/health</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/30">
          <h2 className="text-3xl font-bold text-blue-300 mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Cloud className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Kubernetes Deployment</h3>
              <p className="text-slate-300 text-sm">Deploy FauxDB on Kubernetes for production scalability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Monitor className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Monitoring</h3>
              <p className="text-slate-300 text-sm">Set up comprehensive monitoring with custom dashboards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Shield className="w-8 h-8 text-blue-400" />
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
