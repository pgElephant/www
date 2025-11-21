import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Troubleshooting | Common Issues & Fixes',
  description:
    'Resolve FauxDB connection, authentication, protocol, and performance issues across PostgreSQL, MongoDB, and MySQL clients.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/troubleshooting',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'connection-issues', title: 'Connection & Authentication' },
  { id: 'protocol-translation', title: 'Protocol Translation Issues' },
  { id: 'performance-bottlenecks', title: 'Performance Bottlenecks' },
  { id: 'debug-logging', title: 'Debug Logging' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/production',
  label: 'Production',
}

export default function FauxDBTroubleshootingPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Troubleshooting"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
    >
      <section id="connection-issues">
        <h2>Connection & Authentication</h2>
        <p>Validate listener status, port exposure, and backend credentials.</p>

        <h3>Connection Diagnostics</h3>
        <BashCodeBlock
          title="Check connections and logs"
          code={`# Check if ports are listening
ss -ltn | egrep '27017|3306'

# Check FauxDB service logs
journalctl -u fauxdb -n 100 | grep ERROR

# Verify service is running
systemctl status fauxdb
# or
docker ps | grep fauxdb`}
        />

        <h3>Fix Authentication Failures</h3>
        <ul>
          <li>Ensure PostgreSQL backend users exist and have privileges for the FauxDB database</li>
          <li>Match FauxDB configuration <code>auth_mechanisms</code> with client expectations (e.g. SCRAM vs. plaintext)</li>
          <li>Review credentials stored in <code>/etc/fauxdb/fauxdb.toml</code> or secrets manager</li>
        </ul>
      </section>

      <section id="protocol-translation">
        <h2>Protocol Translation Issues</h2>
        <p>Address MongoDB/MySQL compatibility errors and schema mismatches.</p>

        <h3>Inspect Backend Schema</h3>
        <SqlCodeBlock
          title="Check PostgreSQL tables"
          code={`SELECT schemaname, relname
  FROM pg_catalog.pg_tables
 WHERE schemaname IN ('public', 'fauxdb');`}
        />

        <h3>Common Compatibility Fixes</h3>
        <ul>
          <li>Enable <code>convert_objectid_to_uuid</code> for MongoDB drivers expecting ObjectId types</li>
          <li>Set <code>mysql_collation</code> to match application expectations (e.g. <code>utf8mb4_general_ci</code>)</li>
          <li>Map JSON attributes to PostgreSQL columns using FauxDB mapping rules</li>
        </ul>
      </section>

      <section id="performance-bottlenecks">
        <h2>Performance Bottlenecks</h2>
        <p>Optimize caching, connection pools, and worker threads to prevent saturation.</p>

        <h3>MongoDB/SQL Query Latency</h3>
        <ul>
          <li>Enable query caching: set <code>query_cache.enabled = true</code> and tune <code>query_cache.max_items</code></li>
          <li>Create PostgreSQL indexes for frequent filters surfaced by <code>EXPLAIN (ANALYZE)</code></li>
          <li>Batch write-heavy workloads to reduce chattiness</li>
        </ul>

        <h3>High Memory or CPU Usage</h3>
        <ul>
          <li>Reduce <code>pool_max_size</code> or isolate noisy tenants into dedicated pools</li>
          <li>Lower <code>query_cache.max_bytes</code> for memory pressure</li>
          <li>Increase <code>worker_threads</code> when CPU is underutilized but worker queue grows</li>
        </ul>
      </section>

      <section id="debug-logging">
        <h2>Debug Logging</h2>
        <p>Collect detailed traces for troubleshooting and support.</p>

        <h3>Enable Debug Logging</h3>
        <BashCodeBlock
          title="fauxdb.toml snippet"
          code={`[logging]
level = "debug"
format = "json"
output = "file"
file_path = "/var/log/fauxdb/debug.log"`}
        />

        <h3>View Logs</h3>
        <BashCodeBlock
          title="Tail logs"
          code={`# View logs in real-time
tail -f /var/log/fauxdb/debug.log

# Search for errors
grep ERROR /var/log/fauxdb/debug.log

# View last 100 lines
tail -n 100 /var/log/fauxdb/debug.log`}
        />
      </section>

      <section>
        <h2>Related Resources</h2>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration Reference</Link> - View configuration guide</li>
          <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link> - View monitoring setup</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
