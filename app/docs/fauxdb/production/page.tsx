import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Production Deployment | Best Practices Guide',
  description:
    'Production deployment guide for FauxDB with high availability, security, and performance best practices. TLS/SSL, Docker, Kubernetes, and monitoring.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/production',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'production-checklist', title: 'Production Checklist' },
  { id: 'tls-configuration', title: 'TLS/SSL Configuration' },
  { id: 'docker-deployment', title: 'Docker Deployment' },
  { id: 'kubernetes-deployment', title: 'Kubernetes Deployment' },
  { id: 'high-availability', title: 'High Availability' },
  { id: 'backup-recovery', title: 'Backup & Recovery' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/examples',
  label: 'Examples',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/troubleshooting',
  label: 'Troubleshooting',
}

export default function FauxDBProductionPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Production Deployment"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="production-checklist">
        <h2>Production Checklist</h2>
        <p>Essential items to configure before deploying to production:</p>

        <h3>Critical</h3>
        <ul>
          <li>Enable TLS/SSL - Encrypt all client connections</li>
          <li>Configure Authentication - Enable and enforce user authentication</li>
          <li>Backup Strategy - Regular PostgreSQL backups</li>
        </ul>

        <h3>Important</h3>
        <ul>
          <li>Set Resource Limits - Configure connection and memory limits</li>
          <li>Enable Monitoring - Set up Prometheus metrics and alerts</li>
          <li>Configure Logging - Set up structured JSON logging</li>
          <li>Performance Tuning - Optimize connection pool and caching</li>
        </ul>

        <h3>Optional</h3>
        <ul>
          <li>High Availability - Deploy with load balancer and replicas</li>
        </ul>
      </section>

      <section id="tls-configuration">
        <h2>TLS/SSL Configuration</h2>
        <p>Secure client connections with TLS/SSL encryption.</p>

        <h3>Generate Certificates</h3>
        <BashCodeBlock
          title="Generate SSL certificates"
          code={`# Generate CA key and certificate
openssl genrsa -out ca-key.pem 4096
openssl req -new -x509 -days 3650 -key ca-key.pem -out ca-cert.pem

# Generate server key and certificate
openssl genrsa -out server-key.pem 4096
openssl req -new -key server-key.pem -out server-req.pem
openssl x509 -req -days 3650 -in server-req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem

# Set permissions
chmod 600 server-key.pem
chmod 644 server-cert.pem ca-cert.pem`}
        />

        <h3>Configure FauxDB</h3>
        <BashCodeBlock
          title="TLS configuration"
          code={`[security]
tls_enabled = true
tls_cert = "/etc/fauxdb/certs/server-cert.pem"
tls_key = "/etc/fauxdb/certs/server-key.pem"
client_ca = "/etc/fauxdb/certs/ca-cert.pem"
require_client_cert = false  # Set to true for mutual TLS`}
        />
      </section>

      <section id="docker-deployment">
        <h2>Docker Deployment</h2>
        <p>Production-ready Docker Compose configuration.</p>

        <BashCodeBlock
          title="docker-compose.yml"
          code={`version: '3.8'

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
  postgres_data:`}
        />
      </section>

      <section id="kubernetes-deployment">
        <h2>Kubernetes Deployment</h2>
        <p>Deploy FauxDB on Kubernetes for production scalability.</p>

        <BashCodeBlock
          title="deployment.yaml"
          code={`apiVersion: apps/v1
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
    targetPort: 3306`}
        />
      </section>

      <section id="high-availability">
        <h2>High Availability</h2>
        <p>Deploy FauxDB with redundancy and failover capabilities.</p>

        <h3>PostgreSQL Replication</h3>
        <ul>
          <li>Primary-replica setup with synchronous replication</li>
          <li>Configure FauxDB to use read replicas for queries</li>
          <li>Use pgpool-II or pgbouncer for connection pooling</li>
        </ul>

        <h3>Load Balancing</h3>
        <ul>
          <li>3+ FauxDB instances for redundancy</li>
          <li>HAProxy or NGINX for TCP load balancing</li>
          <li>Health checks on /health endpoint</li>
        </ul>
      </section>

      <section id="backup-recovery">
        <h2>Backup & Recovery</h2>
        <p>Implement backup strategies for data protection.</p>

        <h3>Backup Strategy</h3>
        <ul>
          <li>Automated daily backups</li>
          <li>Point-in-time recovery</li>
          <li>Cross-region replication</li>
          <li>Test restore procedures</li>
          <li>Backup verification</li>
          <li>Disaster recovery plan</li>
        </ul>

        <BashCodeBlock
          title="PostgreSQL backup example"
          code={`# Automated backup script
pg_dump -h localhost -U fauxdb -d fauxdb -F c -f /backups/fauxdb_$(date +%Y%m%d_%H%M%S).dump

# Restore from backup
pg_restore -h localhost -U fauxdb -d fauxdb -c /backups/fauxdb_20240101_120000.dump`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration Guide</Link></li>
          <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link></li>
          <li><Link href="/docs/fauxdb/troubleshooting">Troubleshooting</Link></li>
          <li><Link href="/docs/fauxdb/docker">Docker Setup</Link></li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
