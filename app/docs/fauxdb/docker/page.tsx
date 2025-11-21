import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Docker Setup | Complete Deployment Guide',
  description:
    'Complete guide to deploying FauxDB MongoDB-compatible database using Docker and Docker Compose. Development, production, and monitoring setups.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/docker',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'docker-compose', title: 'Docker Compose Configuration' },
  { id: 'development', title: 'Development Environment' },
  { id: 'production', title: 'Production Environment' },
  { id: 'monitoring', title: 'Monitoring Setup' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/api',
  label: 'API Reference',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/configuration',
  label: 'Configuration',
}

export default function FauxDBDockerPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Docker Setup"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>Before starting, ensure you have:</p>
        <ul>
          <li>Docker 20.10+ installed</li>
          <li>Docker Compose 2.0+</li>
          <li>2GB+ RAM available</li>
          <li>5GB+ disk space</li>
          <li>Ports 27018, 5432, 9090 available</li>
        </ul>
      </section>

      <section id="quick-start">
        <h2>Quick Start</h2>
        <p>Get FauxDB running with Docker in minutes.</p>

        <BashCodeBlock
          title="Clone and setup"
          code={`# Clone the repository
git clone https://github.com/pgElephant/fauxdb.git
cd fauxdb

# Copy environment configuration
cp docker/config/docker.env.example .env

# Edit configuration (optional)
nano .env`}
        />

        <BashCodeBlock
          title="Start FauxDB"
          code={`# Quick setup and start
make setup
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f fauxdb`}
        />

        <BashCodeBlock
          title="Test MongoDB connection"
          code={`# Connect with mongosh
mongosh mongodb://localhost:27018

# Test basic operations
use testdb
db.runCommand({ping: 1})
db.test.insertOne({message: "Hello FauxDB!"})
db.test.find()`}
        />
      </section>

      <section id="docker-compose">
        <h2>Docker Compose Configuration</h2>
        <p>Complete docker-compose.yml configuration for FauxDB.</p>

        <BashCodeBlock
          title="docker-compose.yml"
          code={`version: '3.8'

services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: fauxdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - fauxdb-network

  fauxdb:
    build: .
    ports:
      - "27018:27018"
      - "9090:9090"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fauxdb
      - FAUXDB_PORT=27018
      - FAUXDB_MAX_CONNECTIONS=1000
    depends_on:
      - postgres
    volumes:
      - ./config:/app/config
    networks:
      - fauxdb-network

volumes:
  postgres_data:

networks:
  fauxdb-network:
    driver: bridge`}
        />

        <BashCodeBlock
          title="Environment Variables (.env)"
          code={`# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=fauxdb_prod

# FauxDB Server
FAUXDB_PORT=27018
FAUXDB_MAX_CONNECTIONS=1000
FAUXDB_WORKER_THREADS=4

# Security
FAUXDB_ENABLE_SSL=false
FAUXDB_ENABLE_AUTH=false

# Monitoring
GRAFANA_PASSWORD=admin123`}
        />
      </section>

      <section id="development">
        <h2>Development Environment</h2>
        <p>Hot reload development setup for FauxDB.</p>

        <BashCodeBlock
          title="Development commands"
          code={`# Start development environment
make dev

# View development logs
make dev-logs

# Open shell in container
make dev-shell

# Stop development environment
make dev-stop`}
        />
      </section>

      <section id="production">
        <h2>Production Environment</h2>
        <p>Production-ready Docker deployment with monitoring.</p>

        <BashCodeBlock
          title="Production commands"
          code={`# Start production environment
make prod

# Start with monitoring stack
make monitor

# View production logs
make prod-logs`}
        />
      </section>

      <section id="monitoring">
        <h2>Monitoring Setup</h2>
        <p>Prometheus metrics and health checks.</p>

        <BashCodeBlock
          title="Access metrics"
          code={`# Access metrics endpoint
curl http://localhost:9090/metrics

# Key metrics:
# - fauxdb_operations_total
# - fauxdb_operation_duration_seconds
# - fauxdb_connections_active
# - fauxdb_transactions_total`}
        />

        <BashCodeBlock
          title="Health checks"
          code={`# Basic health check
curl http://localhost:9090/health

# Detailed status
curl http://localhost:9090/status

# Database connectivity
curl http://localhost:9090/db/health`}
        />
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Common Docker deployment issues and solutions.</p>

        <h3>Container won't start</h3>
        <BashCodeBlock
          title="Check logs and ports"
          code={`# Check logs
docker-compose logs fauxdb

# Check port conflicts
netstat -tulpn | grep :27018`}
        />

        <h3>Database connection failed</h3>
        <BashCodeBlock
          title="Verify PostgreSQL"
          code={`# Check PostgreSQL status
docker-compose exec postgres psql -U postgres -c "SELECT version();"

# Check connection string
docker-compose exec fauxdb env | grep DATABASE_URL`}
        />

        <h3>MongoDB client can't connect</h3>
        <BashCodeBlock
          title="Test connection"
          code={`# Test connection
mongosh mongodb://localhost:27018 --eval "db.runCommand({ping: 1})"

# Check FauxDB status
curl http://localhost:9090/health`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration Guide</Link> - Advanced configuration options</li>
          <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link> - Comprehensive monitoring with Grafana</li>
          <li><Link href="/docs/fauxdb/production">Production Deployment</Link> - Production best practices</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
