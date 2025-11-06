import React from 'react';
import { BarChart3, Target, Zap, Brain, Scale, AlertTriangle } from 'lucide-react';
import BashCodeBlock from '../../../../components/BashCodeBlock';
import SqlCodeBlock from '../../../../components/SqlCodeBlock';

export const metadata = {
  title: 'Load Balancing - pgBalancer',
  description: 'Configure AI-powered load balancing and monitor query distribution across PostgreSQL backends.'
};

export default function LoadBalancingPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
          AI-Powered Load Balancing
        </h1>
        <p className="text-xl text-gray-300">
          Configure intelligent query routing and monitor load distribution across PostgreSQL backends
        </p>
      </div>

      {/* Step 1: Load Balancing Configuration */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Configure Load Balancing</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer supports multiple load balancing modes with AI-powered routing:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">pgbalancer.conf Load Balancing Settings</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Enable load balancing for SELECT queries
load_balance_mode = on

# Backend configuration with weights
backend_hostname0 = 'db-primary.internal'
backend_port0 = 5432
backend_weight0 = 1              # Primary: lower weight for writes
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = 'db-replica1.internal'
backend_port1 = 5432
backend_weight1 = 2              # Replica 1: higher weight for reads
backend_flag1 = 'ALLOW_TO_FAILOVER'

backend_hostname2 = 'db-replica2.internal'
backend_port2 = 5432
backend_weight2 = 2              # Replica 2: higher weight for reads
backend_flag2 = 'ALLOW_TO_FAILOVER'

# AI Load Balancing (NEW in pgbalancer)
enable_ai_load_balancing = on    # Enable machine learning routing
ai_learning_rate = 0.01          # How quickly AI adapts (0.001-0.1)
ai_exploration_rate = 0.1        # Random exploration vs learned routing
ai_health_weight = 0.7           # Weight given to health metrics

# Traditional load balancing options
black_function_list = ''         # Functions that don't load balance
white_function_list = ''         # Only these functions load balance
database_redirect_preference_list = ''  # Route specific DBs to backends

# Statement-level load balancing
statement_level_load_balance = off
sr_check_period = 10             # Streaming replication check interval
sr_check_user = 'replicator'
delay_threshold = 10000000       # Max replication lag (10MB)`}
          </pre>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-200 m-0">
            <strong>💡 AI Load Balancing:</strong> pgBalancer uses machine learning to route queries based on 
            historical response times, server health, and current load. The AI continuously learns and optimizes routing decisions.
          </p>
        </div>
      </section>

      {/* Step 2: Query Routing Behavior */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-500/20 rounded-lg">
            <Target className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: Understanding Query Routing</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer routes queries intelligently based on query type and transaction state:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Query Routing Rules</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Connect to pgBalancer
psql -h localhost -p 9999 -U postgres testdb

-- Rule 1: Writes always go to PRIMARY
BEGIN;
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
-- ✓ Routed to: db-primary (backend 0)
COMMIT;

-- Rule 2: Reads in transaction go to PRIMARY (transaction consistency)
BEGIN;
SELECT * FROM users WHERE id = 1;
-- ✓ Routed to: db-primary (backend 0)
-- Reason: Inside transaction, stick to one backend
COMMIT;

-- Rule 3: Standalone reads load balance across replicas
SELECT * FROM users WHERE active = true;
-- ✓ Routed to: db-replica1 or db-replica2 (AI decides based on health/load)
-- AI considers: response time history, current connections, replication lag

-- Rule 4: Functions in black_function_list don't load balance
SELECT * FROM get_user_count();
-- ✓ Routed to: db-primary (if function in black_function_list)

-- Rule 5: High replication lag disqualifies backend
-- If db-replica1 lag > delay_threshold (10MB)
SELECT * FROM orders WHERE status = 'pending';
-- ✓ Routed to: db-primary or db-replica2 (replica1 excluded)`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Show Backend Connection Distribution</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Use SHOW POOL_NODES to see backend status and selection
SHOW POOL_NODES;

-- Output:
-- node_id | hostname              | port | status | role    | select_cnt | load_balance_node | replication_delay
-- --------+-----------------------+------+--------+---------+------------+-------------------+------------------
-- 0       | db-primary.internal   | 5432 | up     | primary | 1523       | false             | 0
-- 1       | db-replica1.internal  | 5432 | up     | standby | 4501       | true              | 0
-- 2       | db-replica2.internal  | 5432 | up     | standby | 4389       | true              | 0

-- select_cnt = Number of times backend was selected for queries
-- load_balance_node = Whether backend is used for load balancing (true for replicas)
-- Replica1 and Replica2 have similar select_cnt (balanced distribution)`}
          </pre>
        </div>
      </section>

      {/* Step 3: Monitor Load Distribution */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: Monitor Load Distribution</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Track query distribution and identify load imbalances:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Query Distribution via REST API</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get backend query statistics
curl -s http://localhost:8080/api/v1/nodes | jq

# Response:
{
  "nodes": [
    {
      "node_id": 0,
      "hostname": "db-primary.internal",
      "port": 5432,
      "status": "up",
      "role": "primary",
      "select_cnt": 1523,
      "weight": 1,
      "queries_per_second": 15.2
    },
    {
      "node_id": 1,
      "hostname": "db-replica1.internal",
      "port": 5432,
      "status": "up",
      "role": "standby",
      "select_cnt": 4501,
      "weight": 2,
      "queries_per_second": 45.8
    },
    {
      "node_id": 2,
      "hostname": "db-replica2.internal",
      "port": 5432,
      "status": "up",
      "role": "standby",
      "select_cnt": 4389,
      "weight": 2,
      "queries_per_second": 44.1
    }
  ]
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Prometheus Metrics for Load Balance</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Query distribution by backend
curl -s http://localhost:8080/metrics | grep pgbalancer_backend_queries

pgbalancer_backend_queries_total{node_id="0"} 1523
pgbalancer_backend_queries_total{node_id="1"} 4501
pgbalancer_backend_queries_total{node_id="2"} 4389

# Queries per second rate
rate(pgbalancer_backend_queries_total[5m])

# Load balance ratio (should match weight ratio)
pgbalancer_backend_weight{node_id="0"} 1
pgbalancer_backend_weight{node_id="1"} 2
pgbalancer_backend_weight{node_id="2"} 2

# AI health scores (0.0 - 1.0)
pgbalancer_backend_health_score{node_id="0"} 0.95
pgbalancer_backend_health_score{node_id="1"} 0.88
pgbalancer_backend_health_score{node_id="2"} 0.91`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Calculate Load Distribution Balance</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Use bctl to check load distribution
bctl nodes list --format table

┌─────────┬────────────────────────┬──────┬────────┬─────────┬────────────┬────────┬──────────────┐
│ Node ID │ Hostname               │ Port │ Status │ Role    │ Select Cnt │ Weight │ QPS          │
├─────────┼────────────────────────┼──────┼────────┼─────────┼────────────┼────────┼──────────────┤
│ 0       │ db-primary.internal    │ 5432 │ up     │ primary │ 1,523      │ 1      │ 15.2         │
│ 1       │ db-replica1.internal   │ 5432 │ up     │ standby │ 4,501      │ 2      │ 45.8         │
│ 2       │ db-replica2.internal   │ 5432 │ up     │ standby │ 4,389      │ 2      │ 44.1         │
└─────────┴────────────────────────┴──────┴────────┴─────────┴────────────┴────────┴──────────────┘

# Expected ratio (based on weights): 1:2:2
# Actual ratio: 1523:4501:4389 = 1:2.95:2.88 ✓ Well balanced

# Deviation formula:
# expected_ratio = weight / sum(weights)
# Node 1: weight 2 / (1+2+2) = 0.4 (40% expected)
# Node 1 actual: 4501 / (1523+4501+4389) = 0.438 (43.8%)
# Deviation: 3.8% ✓ Acceptable (<10%)`}
          </pre>
        </div>
      </section>

      {/* Step 4: AI Load Balancing Monitoring */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: AI Load Balancing Insights</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Monitor AI learning progress and routing decisions:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">AI Health Scoring Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# AI assigns health scores based on multiple factors
curl -s http://localhost:8080/api/v1/ai/health | jq

{
  "ai_enabled": true,
  "learning_rate": 0.01,
  "exploration_rate": 0.1,
  "backends": [
    {
      "node_id": 1,
      "health_score": 0.88,
      "factors": {
        "avg_response_time_ms": 12.5,
        "active_connections": 15,
        "replication_lag_bytes": 0,
        "error_rate": 0.001,
        "uptime_percent": 99.98
      },
      "routing_probability": 0.46  # 46% of reads go here
    },
    {
      "node_id": 2,
      "health_score": 0.91,
      "factors": {
        "avg_response_time_ms": 10.2,
        "active_connections": 12,
        "replication_lag_bytes": 0,
        "error_rate": 0.0005,
        "uptime_percent": 99.99
      },
      "routing_probability": 0.54  # 54% of reads go here
    }
  ]
}

# Node 2 gets more traffic because:
# - Lower response time (10.2ms vs 12.5ms)
# - Fewer active connections (12 vs 15)
# - Lower error rate`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">AI Learning Progress</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Monitor AI learning over time
curl -s http://localhost:8080/metrics | grep pgbalancer_ai

pgbalancer_ai_enabled 1
pgbalancer_ai_learning_rate 0.01
pgbalancer_ai_exploration_rate 0.1
pgbalancer_ai_total_decisions 15420
pgbalancer_ai_exploration_decisions 1542  # 10% exploration
pgbalancer_ai_exploitation_decisions 13878  # 90% learned routing

# Response time tracking per backend
pgbalancer_ai_response_time_ms{node_id="1"} 12.5
pgbalancer_ai_response_time_ms{node_id="2"} 10.2

# AI continuously updates these based on actual query performance`}
          </pre>
        </div>
      </section>

      {/* Step 5: Weight Tuning */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Scale className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Backend Weight Tuning</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Adjust backend weights to control query distribution:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Manual Weight Adjustment</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Scenario 1: High-performance replica gets more traffic
# db-replica2 has faster CPU/SSD than replica1

# pgbalancer.conf:
backend_weight0 = 1    # Primary (writes only)
backend_weight1 = 2    # Standard replica
backend_weight2 = 4    # High-performance replica (2x faster)

# Expected distribution: 1:2:4
# Replica2 will receive 2x more SELECT queries than Replica1

# Scenario 2: Drain backend for maintenance
# Edit pgbalancer.conf:
backend_weight1 = 0    # Drain replica1 (no new queries)
# Reload configuration:
pgbalancer reload

# Check new distribution
bctl nodes list
# Node 1 weight = 0, no new SELECT queries routed there
# Existing connections drain naturally`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Dynamic Weight via REST API</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Temporarily adjust weight without config file edit
curl -X POST http://localhost:8080/api/v1/nodes/1/weight \
  -H "Content-Type: application/json" \
  -d '{"weight": 0}'

# Response:
{
  "node_id": 1,
  "hostname": "db-replica1.internal",
  "old_weight": 2,
  "new_weight": 0,
  "message": "Weight updated successfully"
}

# Restore original weight
curl -X POST http://localhost:8080/api/v1/nodes/1/weight \
  -d '{"weight": 2}'`}
          </pre>
        </div>
      </section>

      {/* Step 6: Load Imbalance Detection */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Detect Load Imbalances</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Identify and resolve load distribution issues:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Unbalanced Load Detection Query</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Use Prometheus to detect skewed load
# PromQL query:
# Coefficient of variation (CV) > 0.3 indicates imbalance
stddev(rate(pgbalancer_backend_queries_total[5m])) / 
avg(rate(pgbalancer_backend_queries_total[5m])) > 0.3

# Example metrics:
# Node 1: 50 QPS
# Node 2: 48 QPS  
# CV = 1 / 49 = 0.02 ✓ Well balanced

# Imbalanced example:
# Node 1: 80 QPS
# Node 2: 20 QPS
# CV = 30 / 50 = 0.6 ⚠️ Imbalanced!

# Causes of imbalance:
# 1. Weights not matching capacity
# 2. One backend has high replication lag
# 3. Connection pooling issues
# 4. AI exploration rate too high (random routing)`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Troubleshoot Imbalance</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Step 1: Check replication lag
SHOW POOL_NODES;
-- If replication_delay > delay_threshold, backend excluded from load balancing

# Step 2: Verify weights
bctl nodes list
-- Ensure weights match backend capacity

# Step 3: Check AI exploration rate
curl -s http://localhost:8080/api/v1/ai/health | jq '.exploration_rate'
-- If exploration_rate > 0.2 (20%), too much random routing
-- Reduce to 0.05-0.1 for more consistent distribution

# Step 4: Check for connection saturation
curl -s http://localhost:8080/metrics | grep pgbalancer_backend_connections
-- If one backend at max_connections, queries route to others

# Step 5: Verify load_balance_mode enabled
SHOW load_balance_mode;
-- Should return: on`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Force Rebalance</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Option 1: Reload configuration (preserves connections)
pgbalancer reload

# Option 2: Reset AI learning state
curl -X POST http://localhost:8080/api/v1/ai/reset

# Response:
{
  "message": "AI learning state reset",
  "backends_reset": 2,
  "decisions_cleared": 15420
}

# Option 3: Restart pgBalancer (drops connections)
systemctl restart pgbalancer

# After restart, monitor distribution:
watch -n 5 'bctl nodes list --format table'`}
          </pre>
        </div>
      </section>

      {/* Configuration Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Load Balancing Parameters</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyan-400">Parameter</th>
                <th className="text-left py-2 text-cyan-400">Default</th>
                <th className="text-left py-2 text-cyan-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">load_balance_mode</td>
                <td className="py-2">off</td>
                <td className="py-2">Enable load balancing for SELECT</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">backend_weight</td>
                <td className="py-2">1</td>
                <td className="py-2">Load distribution weight (0=drain)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">enable_ai_load_balancing</td>
                <td className="py-2">off</td>
                <td className="py-2">Enable ML-based routing</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">ai_learning_rate</td>
                <td className="py-2">0.01</td>
                <td className="py-2">AI adaptation speed (0.001-0.1)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">ai_exploration_rate</td>
                <td className="py-2">0.1</td>
                <td className="py-2">Random routing percentage</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">delay_threshold</td>
                <td className="py-2">10000000</td>
                <td className="py-2">Max replication lag (bytes)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-green-400">statement_level_load_balance</td>
                <td className="py-2">off</td>
                <td className="py-2">Balance within transactions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✓ DO</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Enable <strong>AI load balancing</strong> for adaptive routing</li>
              <li>• Set <code>backend_weight</code> proportional to hardware capacity</li>
              <li>• Monitor replication lag and exclude lagging replicas</li>
              <li>• Use <code>delay_threshold</code> to prevent stale reads</li>
              <li>• Track load distribution metrics via Prometheus</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">✗ DON'T</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Don't set all backends to same weight if capacity differs</li>
              <li>• Don't disable replication lag checks (<code>sr_check_period = 0</code>)</li>
              <li>• Don't use <code>statement_level_load_balance</code> without understanding implications</li>
              <li>• Don't ignore load imbalance alerts (CV &gt; 0.3)</li>
              <li>• Don't set <code>ai_exploration_rate</code> &gt; 0.2 in production</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <ul className="space-y-2 text-gray-300 mb-0">
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer" className="text-cyan-400 hover:text-cyan-300">
                pgBalancer GitHub Repository
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/connection-pooling" className="text-cyan-400 hover:text-cyan-300">
                Connection Pooling Guide
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/high-availability" className="text-cyan-400 hover:text-cyan-300">
                High Availability & Failover
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/monitoring" className="text-cyan-400 hover:text-cyan-300">
                Monitoring & Metrics Guide
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
