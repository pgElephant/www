import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Load Balancing - pgBalancer',
  description: 'Configure AI-powered load balancing and monitor query distribution across PostgreSQL backends.',
}

const tableOfContents: TocItem[] = [
  { id: 'configure-load-balancing', title: 'Configure Load Balancing' },
  { id: 'routing-strategies', title: 'Routing Strategies' },
  { id: 'query-classification', title: 'Query Classification' },
  { id: 'weighted-balancing', title: 'Weighted Read Distribution' },
  { id: 'monitor-distribution', title: 'Monitor Distribution' },
  { id: 'alerting', title: 'Alerting' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/connection-pooling',
  label: 'Connection Pooling Setup',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/rest-api',
  label: 'REST API Usage',
}

export default function LoadBalancingPage() {
  return (
    <PostgresDocsLayout
      title="AI-Powered Load Balancing"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="configure-load-balancing">
        <h2>Configure Load Balancing</h2>
        <p>pgBalancer supports multiple load balancing modes with AI-powered routing:</p>

        <BashCodeBlock
          title="pgbalancer.conf Load Balancing Settings"
          code={`# Enable load balancing for SELECT queries
load_balance_mode = auto
load_balance_weight_primary = 1.0
load_balance_weight_replicas = 1.5

# AI routing mode: predictive, adaptive, or classic
ai_routing_strategy = adaptive

# Response time prediction learning rate
ai_learning_rate = 0.08
ai_decay_factor = 0.92

# Promote replicas when healthy
auto_promote_replicas = on
replica_health_threshold = 0.85`}
        />
      </section>

      <section id="routing-strategies">
        <h2>Pick a Routing Strategy</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
            <h3>Predictive</h3>
            <p className="text-sm">Uses historical query latencies to forecast the best backend.</p>
          </div>
          <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4">
            <h3>Adaptive</h3>
            <p className="text-sm">Real-time feedback loop adjusts weights every 5 seconds.</p>
          </div>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <h3>Classic</h3>
            <p className="text-sm">Traditional round-robin / least-connections policy.</p>
          </div>
        </div>
      </section>

      <section id="query-classification">
        <h2>Query Classification</h2>
        <SqlCodeBlock
          title="Tag workloads with routing hints"
          code={`SELECT pgbalancer_set_query_class('analytics');
SELECT * FROM large_fact_table WHERE ...;

SELECT pgbalancer_set_query_class('oltp');
UPDATE orders SET status = 'shipped' WHERE id = 42;`}
        />
      </section>

      <section id="weighted-balancing">
        <h2>Weighted Read Distribution</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <BashCodeBlock
            title="Assign replica weights"
            code={`# Heavier weight -> receives more traffic
backend_weight0 = 1.0  # primary
backend_weight1 = 1.4  # replica 1
backend_weight2 = 1.2  # replica 2`}
          />
          <BashCodeBlock
            title="Promote healthy replicas"
            code={`# Replica health threshold for promotion
replica_health_threshold = 0.85
replica_sync_window = 5`}
          />
        </div>
      </section>

      <section id="monitor-distribution">
        <h2>Monitor Distribution</h2>
        <SqlCodeBlock
          title="AI routing metrics"
          code={`SELECT *
FROM pgbalancer_ai_metrics
ORDER BY sample_time DESC
LIMIT 20;`}
        />
      </section>

      <section id="alerting">
        <h2>Alerting</h2>
        <BashCodeBlock
          title="Prometheus alert example"
          code={`ALERT PgbalancerSkew
  IF max_over_time(pgbalancer_backend_qps{backend="replica1"}[5m])
     > 2 * max_over_time(pgbalancer_backend_qps{backend="replica2"}[5m])
  FOR 10m
  LABELS { severity = "warning" }
  ANNOTATIONS {
    summary = "pgBalancer traffic skew detected"
  }`}
        />
      </section>
    </PostgresDocsLayout>
  )
}
