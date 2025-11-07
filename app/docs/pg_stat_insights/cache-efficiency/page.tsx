import { Metadata } from 'next'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · Cache Efficiency Analysis',
  description: 'Analyze PostgreSQL buffer cache performance, identify cache misses, and apply tuning recommendations using pg_stat_insights views.',
}

export default function CacheEfficiencyPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Cache Efficiency Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Measure buffer cache hit ratios, surface queries driving disk reads, and tune PostgreSQL memory settings using
          pg_stat_insights. The following playbook provides production-ready SQL diagnostics and actionable steps to
          improve cache performance.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Measure Database-Wide Cache Hit Ratio</h2>
        <p className="text-muted-foreground mb-4">
          Start with the overall hit ratio to understand whether shared buffers are sized appropriately. Aim for ≥95% in OLTP
          systems; spikes below that threshold usually signal working set pressure or missing indexes.
        </p>
        <SqlCodeBlock
          title="Database cache hit ratio"
          code={`SELECT
    SUM(shared_blks_hit)            AS total_cache_hits,
    SUM(shared_blks_read)           AS total_disk_reads,
    SUM(shared_blks_hit + shared_blks_read) AS total_blocks_accessed,
    ROUND((SUM(shared_blks_hit)::numeric /
          NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100)::numeric, 2) AS cache_hit_ratio_pct,
    CASE
        WHEN SUM(shared_blks_hit)::numeric /
             NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) >= 0.99 THEN '🟢 excellent'
        WHEN SUM(shared_blks_hit)::numeric /
             NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) >= 0.95 THEN '✅ good'
        WHEN SUM(shared_blks_hit)::numeric /
             NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) >= 0.90 THEN '⚠️ fair'
        ELSE '🔴 poor'
    END AS status
FROM pg_stat_insights;`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Ratios below 95% warrant deeper investigation. Drill into individual queries next to see which workloads trigger
          disk reads.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Identify Queries with Poor Cache Performance</h2>
        <p className="text-muted-foreground mb-4">
          Highlight queries that miss cache frequently or pull large volumes from disk. Triage the result set by frequency,
          disk reads, and severity.
        </p>
        <SqlCodeBlock
          title="Queries with low cache hit ratio"
          code={`SELECT
    queryid,
    LEFT(query, 100) AS query_preview,
    calls,
    shared_blks_hit,
    shared_blks_read,
    (shared_blks_hit + shared_blks_read) AS total_blocks,
    ROUND((shared_blks_hit::numeric /
          NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 2) AS cache_hit_ratio_pct,
    ROUND((shared_blks_read::numeric / NULLIF(calls, 0))::numeric, 2) AS avg_disk_reads_per_call,
    CASE
        WHEN shared_blks_hit::numeric /
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.50 THEN '🔴 critical'
        WHEN shared_blks_hit::numeric /
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.70 THEN '🟠 poor'
        WHEN shared_blks_hit::numeric /
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.90 THEN '🟡 fair'
        ELSE '✅ acceptable'
    END AS status
FROM pg_stat_insights
WHERE (shared_blks_hit + shared_blks_read) > 1000
  AND calls > 10
ORDER BY cache_hit_ratio_pct ASC, shared_blks_read DESC
LIMIT 20;`}
        />
        <SqlCodeBlock
          title="Top disk I/O consumers"
          code={`SELECT
    queryid,
    LEFT(query, 100) AS query_preview,
    calls,
    shared_blks_read,
    shared_blks_hit,
    ROUND(shared_blks_read::numeric * 8 / 1024, 2) AS disk_read_mb,
    ROUND(shared_blks_read::numeric / NULLIF(calls, 0), 2) AS avg_blocks_per_call,
    ROUND((shared_blks_hit::numeric /
          NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 2) AS cache_hit_pct
FROM pg_stat_insights
WHERE shared_blks_read > 0
ORDER BY shared_blks_read DESC
LIMIT 20;`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Follow-up actions include adding selective indexes, refactoring scans, or increasing shared buffers if the working
          set is larger than available memory.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Inspect Temporary and Local Buffer Usage</h2>
        <p className="text-muted-foreground mb-4">
          Local buffers and temporary files highlight operations spilling from memory. Excessive usage indicates the need for
          higher <code>work_mem</code> or query rewrites.
        </p>
        <SqlCodeBlock
          title="Local buffer activity"
          code={`SELECT
    queryid,
    LEFT(query, 100) AS query_preview,
    calls,
    local_blks_hit,
    local_blks_read,
    local_blks_written,
    ROUND(((local_blks_hit + local_blks_read + local_blks_written)::numeric * 8 / 1024)::numeric, 2) AS total_local_mb,
    CASE WHEN local_blks_read > 0 OR local_blks_written > 0
         THEN 'temp objects in use'
         ELSE 'no temp usage'
    END AS temp_usage
FROM pg_stat_insights
WHERE (local_blks_hit + local_blks_read + local_blks_written) > 0
ORDER BY total_local_mb DESC
LIMIT 20;`}
        />
        <SqlCodeBlock
          title="Temp file spills"
          code={`SELECT
    queryid,
    LEFT(query, 100) AS query_preview,
    calls,
    temp_blks_read,
    temp_blks_written,
    ROUND(temp_blks_written::numeric * 8 / 1024, 2) AS temp_written_mb,
    ROUND((temp_blks_written::numeric * 8 / 1024) / NULLIF(calls, 0), 2) AS avg_temp_mb_per_call,
    CASE
        WHEN temp_blks_written * 8 / 1024 > 1024 THEN '🔴 >1GB temp files'
        WHEN temp_blks_written * 8 / 1024 > 100  THEN '🟠 >100MB temp files'
        WHEN temp_blks_written * 8 / 1024 > 10   THEN '🟡 >10MB temp files'
        ELSE '✅ minimal temp usage'
    END AS severity
FROM pg_stat_insights
WHERE temp_blks_written > 0
ORDER BY temp_blks_written DESC
LIMIT 20;`}
        />
        <SqlCodeBlock
          title="Session-level work_mem override"
          code={`-- Increase work_mem for a heavy query, then reset
SET work_mem = '256MB';
-- run your workload
RESET work_mem;`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Track Write-Heavy Workloads</h2>
        <p className="text-muted-foreground mb-4">
          Dirty and written buffers highlight workloads that apply pressure on checkpoints or autovacuum. Investigate bulk loads
          and hot update patterns when these metrics surge.
        </p>
        <SqlCodeBlock
          title="Shared buffer writes"
          code={`SELECT
    queryid,
    LEFT(query, 100) AS query_preview,
    calls,
    shared_blks_written,
    shared_blks_dirtied,
    local_blks_written,
    ROUND(shared_blks_written::numeric * 8 / 1024, 2) AS shared_written_mb,
    ROUND(shared_blks_written::numeric / NULLIF(calls, 0), 2) AS avg_written_blocks_per_call
FROM pg_stat_insights
WHERE shared_blks_written > 0 OR local_blks_written > 0
ORDER BY shared_blks_written DESC
LIMIT 20;`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Generate Automated Recommendations</h2>
        <p className="text-muted-foreground mb-4">
          Combine cache metrics with temp usage to triage the loudest offenders first. The CASE expression below produces
          prioritized remediation hints per query.
        </p>
        <SqlCodeBlock
          title="Cache tuning recommendations"
          code={`SELECT
    queryid,
    LEFT(query, 80) AS query_preview,
    calls,
    ROUND((shared_blks_hit::numeric /
          NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 2) AS cache_hit_pct,
    shared_blks_read,
    temp_blks_written,
    CASE
        WHEN temp_blks_written * 8 / 1024 > 100 THEN '🔴 increase work_mem'
        WHEN shared_blks_hit::numeric /
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.70
             AND shared_blks_read > 10000 THEN '🟠 add index or enlarge shared_buffers'
        WHEN local_blks_written > 1000 THEN '🟡 review temp table usage'
        WHEN shared_blks_read / NULLIF(calls, 0) > 1000 THEN '📊 investigate large scans'
        ELSE '✅ cache performance acceptable'
    END AS recommendation
FROM pg_stat_insights
WHERE calls > 10
  AND (shared_blks_hit + shared_blks_read) > 100
ORDER BY recommendation, shared_blks_read DESC
LIMIT 25;`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PostgreSQL Configuration Checklist</h2>
        <p className="text-muted-foreground mb-4">
          Keep shared buffers, work memory, and related knobs aligned with your hardware footprint. Apply changes in maintenance
          windows because many require restarts.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <BashCodeBlock
            title="postgresql.conf excerpts"
            code={`shared_buffers = 8GB          # ~25% of RAM
work_mem = 64MB             # global default, raise cautiously
effective_cache_size = 24GB # planner hint (~60% RAM)
temp_buffers = 32MB         # per-session temp space
wal_compression = on`}
          />
          <SqlCodeBlock
            title="Session overrides"
            code={`-- Tailor per-session settings when needed
SET work_mem = '256MB';
SET temp_buffers = '64MB';
-- Reset after workload completes
RESET work_mem;
RESET temp_buffers;`}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Reference SQL samples on GitHub for reproducible workloads: <a className="text-blue-600 hover:underline" href="https://github.com/pgelephant/pg_stat_insights/tree/main/sql" target="_blank" rel="noopener noreferrer">pg_stat_insights/sql</a>
        </p>
      </section>
    </div>
  )
}
