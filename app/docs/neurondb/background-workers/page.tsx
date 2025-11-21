import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Background Workers',
  description: 'Asynchronous job execution, auto-tuning, and index maintenance with NeuronDB background workers.',
}

const tableOfContents: TocItem[] = [
  { id: 'neuranq', title: 'neuranq - Async Job Queue' },
  { id: 'neuranmon', title: 'neuranmon - Auto-Tuner' },
  { id: 'neurandefrag', title: 'neurandefrag - Index Maintenance' },
  { id: 'monitoring', title: 'Monitor Workers' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/indexing',
  label: 'Indexing',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/performance',
  label: 'Performance',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Background Workers"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="neuranq">
        <h2>neuranq - Async Job Queue</h2>
        <p>Asynchronous job queue executor with SKIP LOCKED, rate limits, retries, and poison job handling. Perfect for batch embedding generation, model inference, and long-running operations.</p>

        <h3>Features</h3>
        <ul>
          <li><strong>SKIP LOCKED Queuing:</strong> Concurrent job processing without lock contention</li>
          <li><strong>Rate Limiting:</strong> Per-tenant QPS and token budgets</li>
          <li><strong>Auto Retry:</strong> Exponential backoff for transient failures</li>
          <li><strong>Poison Jobs:</strong> Dead letter queue for failed jobs</li>
        </ul>

        <h3>Configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`# postgresql.conf
neurondb.neuranq_enabled = on
neurondb.neuranq_naptime = 1000        # Check queue every 1 second
neurondb.neuranq_batch_size = 100      # Process 100 jobs per cycle
neurondb.neuranq_max_retries = 3       # Retry failed jobs 3 times`}
        />
      </section>

      <section id="neuranmon">
        <h2>neuranmon - Auto-Tuner</h2>
        <p>Automatically tunes index parameters based on query performance and SLO targets. Adjusts ef_search, rotates caches, and tracks recall@k metrics.</p>

        <h3>What It Does</h3>
        <ul>
          <li>Monitors query latency and adjusts ef_search for HNSW indexes</li>
          <li>Tracks recall@10 and recall@100 to measure search quality</li>
          <li>Rotates embedding and model caches based on access patterns</li>
          <li>Records performance metrics for trend analysis</li>
        </ul>

        <h3>Configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`# postgresql.conf
neurondb.neuranmon_enabled = on
neurondb.neuranmon_naptime = 60000     # Check every 60 seconds
neurondb.neuranmon_target_latency_ms = 10  # Target latency SLO
neurondb.neuranmon_min_recall = 0.95   # Minimum 95% recall`}
        />
      </section>

      <section id="neurandefrag">
        <h2>neurandefrag - Index Maintenance</h2>
        <p>Automatic index maintenance: compacts HNSW graphs, re-levels layers, prunes tombstones, and schedules rebuilds for optimal performance.</p>

        <h3>Maintenance Tasks</h3>
        <ul>
          <li><strong>Graph Compaction:</strong> Removes fragmentation from HNSW graphs after deletes and updates</li>
          <li><strong>Layer Re-leveling:</strong> Rebalances hierarchical layers for optimal search performance</li>
          <li><strong>Tombstone Pruning:</strong> Removes deleted vector markers to reclaim space</li>
          <li><strong>Rebuild Scheduling:</strong> Automatically rebuilds indexes when fragmentation exceeds threshold</li>
        </ul>

        <h3>Configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`# postgresql.conf
neurondb.neurandefrag_enabled = on
neurondb.neurandefrag_naptime = 300000     # Check every 5 minutes
neurondb.neurandefrag_fragmentation_threshold = 0.30  # Rebuild at 30%`}
        />
      </section>

      <section id="monitoring">
        <h2>Monitor Workers</h2>
        <SqlCodeBlock
          title="View all worker status"
          code={`-- View all worker status
SELECT * FROM neurondb_worker_status();

-- Returns:
--  worker_name  | status  |      last_run       | jobs_processed | avg_runtime_ms
-- --------------+---------+---------------------+----------------+---------------
--  neuranq      | running | 2025-11-03 12:30:15 |      427       |      12.3
--  neuranmon    | running | 2025-11-03 12:30:10 |       89       |      45.7
--  neurandefrag | running | 2025-11-03 12:28:00 |       23       |     234.8`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/configuration">Configuration</a> - Worker settings</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimization tips</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
