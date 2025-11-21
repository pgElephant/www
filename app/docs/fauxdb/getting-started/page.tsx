import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Getting Started | Quick Setup Guide',
  description:
    'Get FauxDB up and running in minutes with PostgreSQL backend and MongoDB compatibility. Step-by-step installation and configuration guide.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/getting-started',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'install-fauxdb', title: 'Install FauxDB Binary' },
  { id: 'configure-database', title: 'Configure Database' },
  { id: 'start-services', title: 'Start FauxDB Server' },
  { id: 'verify-setup', title: 'Verify Setup' },
  { id: 'next-steps', title: 'Next Steps' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb',
  label: 'FauxDB Documentation',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/configuration',
  label: 'Configuration',
}

export default function FauxDBGettingStartedPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Getting Started"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>Before installing FauxDB, ensure you have:</p>
        <ul>
          <li>Rust toolchain (for building from source) or Docker</li>
          <li>PostgreSQL 16, 17, or 18 installed and running</li>
          <li>MongoDB client tools (mongosh) for testing</li>
          <li>System packages: libpq-dev, build-essential</li>
        </ul>
      </section>

      <section id="install-fauxdb">
        <h2>Install FauxDB Binary</h2>
        <p>Download and install the FauxDB binary on your system.</p>

        <BashCodeBlock
          title="Install from source"
          code={`# Prerequisites
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
sudo apt-get install -y postgresql-17 postgresql-client-17 libpq-dev

# Clone and build FauxDB from source
git clone https://github.com/pgElephant/fauxdb.git
cd fauxdb

# Build with optimizations
cargo build --release

# Or use Docker for quick start
docker-compose up -d`}
        />
      </section>

      <section id="configure-database">
        <h2>Configure Database</h2>
        <p>Set up PostgreSQL connection and FauxDB configuration.</p>

        <BashCodeBlock
          title="Configuration file (config/fauxdb.toml)"
          code={`[server]
host = "0.0.0.0"
port = 27018
max_connections = 10000
connection_timeout_ms = 30000
idle_timeout_ms = 60000
worker_threads = 4

[database]
uri = "postgresql://fauxdb:password@localhost:5432/fauxdb"
max_connections = 100
connection_timeout_ms = 5000
idle_timeout_ms = 60000
enable_jsonb_extensions = true

[logging]
level = "info"
format = "json"
output = "stdout"
log_file = "/var/log/fauxdb/fauxdb.log"

[metrics]
enabled = true
port = 9090
path = "/metrics"`}
        />
      </section>

      <section id="start-services">
        <h2>Start FauxDB Server</h2>
        <p>Launch FauxDB server and connect to PostgreSQL.</p>

        <BashCodeBlock
          title="Setup and start"
          code={`# Setup PostgreSQL database
sudo -u postgres createdb fauxdb
sudo -u postgres psql -d fauxdb -c "CREATE USER fauxdb WITH PASSWORD 'password';"
sudo -u postgres psql -d fauxdb -c "GRANT ALL PRIVILEGES ON DATABASE fauxdb TO fauxdb;"

# Start FauxDB server
./target/release/fauxdb --config config/fauxdb.toml

# Or use Docker
docker-compose up -d`}
        />
      </section>

      <section id="verify-setup">
        <h2>Verify Setup</h2>
        <p>Test MongoDB compatibility and database operations.</p>

        <BashCodeBlock
          title="Connect and test"
          code={`# Connect with MongoDB client
mongosh mongodb://localhost:27018

# Verify MongoDB compatibility
mongosh --host localhost --port 27018 --eval "db.runCommand({ping: 1})"

# Test CRUD operations
db.users.insertOne({name: "John", email: "john@example.com"})
db.users.find({name: "John"})
db.users.updateOne({name: "John"}, {$set: {age: 30}})
db.users.deleteOne({name: "John"})`}
        />
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration</Link> - Learn about advanced configuration options</li>
          <li><Link href="/docs/fauxdb/api">API Reference</Link> - Explore MongoDB-compatible API endpoints</li>
          <li><Link href="/docs/fauxdb/examples">Examples</Link> - See practical usage examples and integrations</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
