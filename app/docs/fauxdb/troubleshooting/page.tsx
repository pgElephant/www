import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { FauxDbIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'FauxDB Troubleshooting | Common Issues & Fixes',
  description:
    'Resolve FauxDB connection, authentication, protocol, and performance issues across PostgreSQL, MongoDB, and MySQL clients.',
}

const requirements = [
  'Verify the FauxDB service is running (`systemctl status fauxdb` or `docker ps`)',
  'Confirm PostgreSQL backend credentials and databases exist for each FauxDB namespace',
  'Open required ports (default MongoDB 27017 and MySQL 3306) through firewalls and security groups',
  'Enable debug logging temporarily when reproducing protocol translation issues',
]

export default function FauxDBTroubleshootingPage() {
  return (
    <GettingStartedLayout
      product="FauxDB"
      hero={{
        label: 'FauxDB',
        labelIcon: <FauxDbIcon size={20} />, 
        labelAccent: 'emerald',
        title: 'Restore FauxDB Connectivity & Performance',
        description:
          'Use these cards to diagnose listener failures, authentication errors, protocol mismatches, and resource exhaustion. Each remediation includes ready-to-run SQL or configuration changes.',
        cta: {
          href: '/docs/fauxdb/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950',
        heroOverlay: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 dark:from-emerald-500/10 dark:to-green-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: requirements,
        note: 'Revert temporary logging or permissive settings after the incident is resolved.',
      }}
      sections={[
        {
          title: 'Connection & authentication',
          description: 'Validate listener status, port exposure, and backend credentials.',
          cards: [
            {
              id: 'connection',
              title: 'Connection diagnostics',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Connection checks"
                  code={`ss -ltn | egrep '27017|3306'
journalctl -u fauxdb -n 100 | grep ERROR`}
                />
              ),
            },
            {
              id: 'auth',
              title: 'Fix authentication failures',
              accent: 'cyan',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Ensure PostgreSQL backend users exist and have privileges for the FauxDB database.</li>
                  <li>Match FauxDB configuration <code>auth_mechanisms</code> with client expectations (e.g. SCRAM vs. plaintext).</li>
                  <li>Review credentials stored in <code>/etc/fauxdb/fauxdb.toml</code> or secrets manager.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Protocol translation issues',
          description: 'Address MongoDB/MySQL compatibility errors and schema mismatches.',
          cards: [
            {
              id: 'schema-introspection',
              title: 'Inspect backend schema',
              accent: 'blue',
              content: (
                <SqlCodeBlock
                  title="Check tables"
                  code={`SELECT schemaname, relname
  FROM pg_catalog.pg_tables
 WHERE schemaname IN ('public', 'fauxdb');`}
                />
              ),
            },
            {
              id: 'compatibility',
              title: 'Common compatibility fixes',
              accent: 'indigo',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Enable <code>convert_objectid_to_uuid</code> for MongoDB drivers expecting ObjectId types.</li>
                  <li>Set <code>mysql_collation</code> to match application expectations (e.g. <code>utf8mb4_general_ci</code>).</li>
                  <li>Map JSON attributes to PostgreSQL columns using FauxDB mapping rules.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Performance bottlenecks',
          description: 'Optimize caching, connection pools, and worker threads to prevent saturation.',
          cards: [
            {
              id: 'slow-queries',
              title: 'MongoDB/SQL query latency',
              accent: 'amber',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Enable query caching: set <code>query_cache.enabled = true</code> and tune <code>query_cache.max_items</code>.</li>
                  <li>Create PostgreSQL indexes for frequent filters surfaced by <code>EXPLAIN (ANALYZE)</code>.</li>
                  <li>Batch write-heavy workloads to reduce chattiness.</li>
                </ul>
              ),
            },
            {
              id: 'resource-usage',
              title: 'High memory or CPU usage',
              accent: 'rose',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Reduce <code>pool_max_size</code> or isolate noisy tenants into dedicated pools.</li>
                  <li>Lower <code>query_cache.max_bytes</code> for memory pressure.</li>
                  <li>Increase <code>worker_threads</code> when CPU is underutilized but worker queue grows.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Debug logging',
          description: 'Collect detailed traces for pgElephant support.',
          cards: [
            {
              id: 'logging',
              title: 'Enable debug logging',
              accent: 'slate',
              content: (
                <BashCodeBlock
                  title="fauxdb.toml snippet"
                  code={`[logging]
level = "debug"
format = "json"
output = "file"
file_path = "/var/log/fauxdb/debug.log"`}
                />
              ),
            },
            {
              id: 'log-tail',
              title: 'Tail logs',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="View logs"
                  code={`tail -f /var/log/fauxdb/debug.log`}
                />
              ),
            },
          ],
        },
        {
          title: 'Related resources',
          description: 'Jump to configuration and monitoring guides for additional tuning.',
          cards: [
            {
              id: 'config-guide',
              title: 'Configuration reference',
              accent: 'emerald',
              content: (
                <a className="text-sm font-semibold text-emerald-600 dark:text-emerald-400" href="/docs/fauxdb/configuration">
                  View configuration guide →
                </a>
              ),
            },
            {
              id: 'monitoring',
              title: 'Monitoring setup',
              accent: 'cyan',
              content: (
                <a className="text-sm font-semibold text-emerald-600 dark:text-emerald-400" href="/docs/fauxdb/monitoring">
                  View monitoring setup →
                </a>
              ),
            },
          ],
        },
      ]}
    />
  )
}
