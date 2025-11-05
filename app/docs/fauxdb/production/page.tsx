import React from 'react'
import { Server, Shield, Zap, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'FauxDB Production Deployment | Documentation',
  description: 'Production deployment guide for FauxDB with high availability, security, and performance best practices',
}

const FauxDBProductionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link 
            href="/docs/fauxdb" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to FauxDB Documentation
          </Link>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
            Production Deployment
          </h1>
          <p className="text-xl text-slate-300">
            Deploy FauxDB in production with high availability and security
          </p>
        </div>

        {/* Production Checklist */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
            Production Checklist
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Enable TLS/SSL', desc: 'Encrypt all client connections', status: 'critical' },
              { title: 'Configure Authentication', desc: 'Enable and enforce user authentication', status: 'critical' },
              { title: 'Set Resource Limits', desc: 'Configure connection and memory limits', status: 'important' },
              { title: 'Enable Monitoring', desc: 'Set up Prometheus metrics and alerts', status: 'important' },
              { title: 'Configure Logging', desc: 'Set up structured JSON logging', status: 'important' },
              { title: 'Backup Strategy', desc: 'Regular PostgreSQL backups', status: 'critical' },
              { title: 'High Availability', desc: 'Deploy with load balancer and replicas', status: 'optional' },
              { title: 'Performance Tuning', desc: 'Optimize connection pool and caching', status: 'important' }
            ].map((item, i) => (
              <div key={i} className={`bg-white/5 rounded-xl p-6 border ${item.status === 'critical' ? 'border-red-400/30' : item.status === 'important' ? 'border-yellow-400/30' : 'border-green-400/30'}`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-6 h-6 mt-1 ${item.status === 'critical' ? 'text-red-400' : item.status === 'important' ? 'text-yellow-400' : 'text-green-400'}`} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TLS Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            TLS/SSL Configuration
          </h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <h3 className="text-xl font-bold text-purple-300 mb-4">Generate Certificates</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Generate CA key and certificate
openssl genrsa -out ca-key.pem 4096
openssl req -new -x509 -days 3650 -key ca-key.pem -out ca-cert.pem

# Generate server key and certificate
openssl genrsa -out server-key.pem 4096
openssl req -new -key server-key.pem -out server-req.pem
openssl x509 -req -days 3650 -in server-req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem

# Set permissions
chmod 600 server-key.pem
chmod 644 server-cert.pem ca-cert.pem`}</code></pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-300 mb-4">Configure FauxDB</h3>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`[security]
tls_enabled = true
tls_cert = "/etc/fauxdb/certs/server-cert.pem"
tls_key = "/etc/fauxdb/certs/server-key.pem"
client_ca = "/etc/fauxdb/certs/ca-cert.pem"
require_client_cert = false  # Set to true for mutual TLS`}</code></pre>
            </div>
          </div>
        </section>

        {/* Docker Deployment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Server className="w-8 h-8 text-cyan-400" />
            Docker Deployment
          </h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">docker-compose.yml</h3>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: fauxdb
      POSTGRES_USER: fauxdb
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U fauxdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  fauxdb:
    image: pgelephant/fauxdb:latest
    ports:
      - "27017:27017"  # MongoDB
      - "3306:3306"    # MySQL
      - "9090:9090"    # Prometheus metrics
    environment:
      FAUXDB_PG_CONNECTION_STRING: "postgresql://fauxdb:\${POSTGRES_PASSWORD}@postgres:5432/fauxdb"
      FAUXDB_LOG_LEVEL: "info"
      FAUXDB_PROMETHEUS_ENABLED: "true"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:`}</code></pre>
            </div>
          </div>
        </section>

        {/* Kubernetes Deployment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Kubernetes Deployment</h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <h3 className="text-xl font-bold text-blue-300 mb-4">deployment.yaml</h3>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: fauxdb
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fauxdb
  template:
    metadata:
      labels:
        app: fauxdb
    spec:
      containers:
      - name: fauxdb
        image: pgelephant/fauxdb:latest
        ports:
        - containerPort: 27017
          name: mongodb
        - containerPort: 3306
          name: mysql
        - containerPort: 9090
          name: metrics
        env:
        - name: FAUXDB_PG_CONNECTION_STRING
          valueFrom:
            secretKeyRef:
              name: fauxdb-secrets
              key: postgres-connection
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 9090
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 9090
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: fauxdb
spec:
  type: LoadBalancer
  selector:
    app: fauxdb
  ports:
  - name: mongodb
    port: 27017
    targetPort: 27017
  - name: mysql
    port: 3306
    targetPort: 3306`}</code></pre>
            </div>
          </div>
        </section>

        {/* High Availability */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            High Availability
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">PostgreSQL Replication</h3>
              <p className="text-slate-300 text-sm mb-4">
                Set up PostgreSQL streaming replication for high availability:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>Primary-replica setup with synchronous replication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>Configure FauxDB to use read replicas for queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>Use pgpool-II or pgbouncer for connection pooling</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Load Balancing</h3>
              <p className="text-slate-300 text-sm mb-4">
                Deploy multiple FauxDB instances behind a load balancer:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>3+ FauxDB instances for redundancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>HAProxy or NGINX for TCP load balancing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                  <span>Health checks on /health endpoint</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Documentation */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/fauxdb/configuration"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/monitoring"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Monitoring Setup</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/troubleshooting"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Troubleshooting</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/docker"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Docker Setup</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FauxDBProductionPage
