import { BarChart3, Target, Zap, Brain, Scale, AlertTriangle } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata = {
  title: 'Load Balancing - pgBalancer',
  description: 'Configure AI-powered load balancing and monitor query distribution across PostgreSQL backends.'
}

export default function LoadBalancingPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'purple',
        title: 'AI-Powered Load Balancing',
        description: 'Configure intelligent query routing and monitor load distribution across PostgreSQL backends.'
      }}
      contentWidth="wide"
    >
      <div className="space-y-12 text-slate-200">
        {/* Step 1: Load Balancing Configuration */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 1: Configure Load Balancing</h2>
          </div>

          <p>pgBalancer supports multiple load balancing modes with AI-powered routing:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">pgbalancer.conf Load Balancing Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Enable load balancing for SELECT queries
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
            </pre>
          </div>
        </section>

        {/* Step 2: Routing Strategies */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Brain className="w-6 h-6 text-purple-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 2: Pick a routing strategy</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
              <h3 className="text-lg font-semibold text-purple-200">Predictive</h3>
              <p className="text-sm text-purple-100">Uses historical query latencies to forecast the best backend.</p>
            </div>
            <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4">
              <h3 className="text-lg font-semibold text-indigo-200">Adaptive</h3>
              <p className="text-sm text-indigo-100">Real-time feedback loop adjusts weights every 5 seconds.</p>
            </div>
            <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
              <h3 className="text-lg font-semibold text-cyan-200">Classic</h3>
              <p className="text-sm text-cyan-100">Traditional round-robin / least-connections policy.</p>
            </div>
          </div>
        </section>

        {/* Step 3: Query Classification */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Target className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 3: Query Classification</h2>
          </div>

          <SqlCodeBlock
            title="Tag workloads with routing hints"
            code={`SELECT pgbalancer_set_query_class('analytics');
SELECT * FROM large_fact_table WHERE ...;

SELECT pgbalancer_set_query_class('oltp');
UPDATE orders SET status = 'shipped' WHERE id = 42;`}
          />
        </section>

        {/* Step 4: Weighted Balancing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-500/20 rounded-lg">
              <Scale className="w-6 h-6 text-slate-200" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 4: Weighted read distribution</h2>
          </div>

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

        {/* Step 5: Monitoring */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 5: Monitor distribution</h2>
          </div>

          <SqlCodeBlock
            title="AI routing metrics"
            code={`SELECT *
FROM pgbalancer_ai_metrics
ORDER BY sample_time DESC
LIMIT 20;`}
          />
        </section>

        {/* Step 6: Alerts */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 6: Alerting</h2>
          </div>

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
      </div>
    </DocsContentLayout>
  )
}
