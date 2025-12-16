'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  BarChart3, 
  Database, 
  Zap, 
  TrendingUp,
  Activity,
  FileText,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  Code,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Layers,
  RefreshCw
} from 'lucide-react'

interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  gradient: string
  sqlQuery?: string
  queryResult?: string
  metrics?: string[]
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'pg_stat_insights',
    subtitle: 'PostgreSQL Performance Analytics',
    description: '52 metrics across 11 pre-built views for query optimization, cache analysis, and WAL monitoring. Production-ready drop-in replacement for pg_stat_statements.',
    icon: <BarChart3 className="w-20 h-20" />,
    gradient: 'from-purple-600 via-blue-600 to-cyan-600',
    metrics: ['52 Metrics', '11 Views', 'PostgreSQL 16-18', '150+ TAP Tests']
  },
  {
    id: '2',
    title: 'Installation',
    subtitle: 'Quick Setup',
    description: 'Enable pg_stat_insights in minutes. Add to shared_preload_libraries and create the extension.',
    icon: <CheckCircle className="w-20 h-20" />,
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    sqlQuery: `-- Add to postgresql.conf
shared_preload_libraries = 'pg_stat_insights'

-- Restart PostgreSQL, then:
CREATE EXTENSION pg_stat_insights;

-- Verify installation
SELECT extname, extversion 
FROM pg_extension 
WHERE extname = 'pg_stat_insights';`,
    queryResult: ` extname          | extversion
------------------+------------
 pg_stat_insights | 3.0
(1 row)`
  },
  {
    id: '3',
    title: 'Main Statistics View',
    subtitle: '52 Columns of Metrics',
    description: 'The primary view containing all 52 metrics in one place. Comprehensive query performance data.',
    icon: <Database className="w-20 h-20" />,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    sqlQuery: `SELECT 
    queryid,
    LEFT(query, 80) AS query_preview,
    calls,
    total_exec_time,
    mean_exec_time,
    shared_blks_hit,
    shared_blks_read
FROM pg_stat_insights
ORDER BY total_exec_time DESC
LIMIT 10;`,
    queryResult: ` queryid | query_preview | calls | total_exec_time | mean_exec_time | shared_blks_hit | shared_blks_read
---------+---------------+-------+-----------------+----------------+-----------------+------------------
 1234567 | SELECT * FROM orders WHERE status = $1 | 1247 | 12456.78 | 9.99 | 5678 | 1234
 2345678 | UPDATE inventory SET quantity = $1 | 892 | 8934.12 | 10.02 | 2345 | 567`
  },
  {
    id: '4',
    title: 'Top Slow Queries',
    subtitle: 'Identify Performance Bottlenecks',
    description: 'Find queries consuming the most execution time. Prioritize optimization efforts.',
    icon: <Clock className="w-20 h-20" />,
    gradient: 'from-red-600 via-orange-600 to-yellow-600',
    sqlQuery: `SELECT 
    LEFT(query, 100) AS query_snippet,
    calls,
    ROUND(total_exec_time::numeric, 2) AS total_ms,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    rows
FROM pg_stat_insights_top_by_time
LIMIT 10;`,
    queryResult: ` query_snippet | calls | total_ms | avg_ms | rows
--------------+-------+----------+--------+------
 SELECT * FROM orders WHERE status | 1247 | 12456.78 | 9.99 | 15234
 UPDATE inventory SET quantity = | 892 | 8934.12 | 10.02 | 892`
  },
  {
    id: '5',
    title: 'Most Frequent Queries',
    subtitle: 'High-Frequency Operations',
    description: 'Identify queries executed most often. Optimize for caching and connection pooling.',
    icon: <Activity className="w-20 h-20" />,
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    ROUND((total_exec_time / calls)::numeric, 2) AS time_per_call
FROM pg_stat_insights_top_by_calls
LIMIT 10;`,
    queryResult: ` query_preview | calls | avg_ms | time_per_call
--------------+-------+--------+---------------
 SELECT * FROM users WHERE email = $1 | 15678 | 0.43 | 0.43
 INSERT INTO logs (timestamp, msg) VALUES | 12345 | 0.12 | 0.12`
  },
  {
    id: '6',
    title: 'I/O Intensive Queries',
    subtitle: 'Disk-Heavy Operations',
    description: 'Find queries causing excessive disk reads. Optimize with indexes or increase shared_buffers.',
    icon: <HardDrive className="w-20 h-20" />,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    shared_blks_read,
    temp_blks_read,
    shared_blks_read + temp_blks_read AS total_io
FROM pg_stat_insights_top_by_io
LIMIT 10;`,
    queryResult: ` query_preview | calls | shared_blks_read | temp_blks_read | total_io
--------------+-------+------------------+----------------+----------
 SELECT * FROM events ORDER BY timestamp | 1234 | 892345 | 123456 | 1015801
 CREATE INDEX CONCURRENTLY ON orders | 1 | 1234567 | 987654 | 2222221`
  },
  {
    id: '7',
    title: 'Cache Miss Analysis',
    subtitle: 'Buffer Optimization',
    description: 'Identify queries with poor cache performance. Calculate cache hit ratios for optimization.',
    icon: <Search className="w-20 h-20" />,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    shared_blks_hit,
    shared_blks_read,
    ROUND((shared_blks_hit::numeric / 
           NULLIF(shared_blks_hit + shared_blks_read, 0) * 100), 2) AS cache_hit_ratio
FROM pg_stat_insights_top_cache_misses
WHERE shared_blks_read > 100
LIMIT 10;`,
    queryResult: ` query_preview | calls | shared_blks_hit | shared_blks_read | cache_hit_ratio
--------------+-------+-----------------+------------------+----------------
 SELECT * FROM large_table WHERE id = $1 | 15234 | 892341 | 1081245 | 45.23
 SELECT * FROM archived_orders | 8923 | 234567 | 215678 | 52.17`
  },
  {
    id: '8',
    title: 'Slow Query Detection',
    subtitle: 'Automatic Performance Alerts',
    description: 'Filter queries exceeding 100ms mean execution time. Automatic slow query identification.',
    icon: <AlertTriangle className="w-20 h-20" />,
    gradient: 'from-orange-600 via-red-600 to-pink-600',
    sqlQuery: `SELECT 
    LEFT(query, 100) AS query_snippet,
    calls,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    ROUND(total_exec_time::numeric, 2) AS total_ms
FROM pg_stat_insights_slow_queries
ORDER BY mean_exec_time DESC
LIMIT 10;`,
    queryResult: ` query_snippet | calls | avg_ms | total_ms
--------------+-------+--------+----------
 SELECT * FROM orders WHERE status = $1 | 1247 | 999.12 | 1245678.9
 UPDATE inventory SET quantity = $1 | 892 | 567.23 | 505969.2`
  },
  {
    id: '9',
    title: 'Error Tracking',
    subtitle: 'Failed Query Analysis',
    description: 'Track queries with execution errors. Identify reliability issues and debugging opportunities.',
    icon: <AlertTriangle className="w-20 h-20" />,
    gradient: 'from-red-600 via-rose-600 to-pink-600',
    sqlQuery: `SELECT 
    LEFT(query, 100) AS query_snippet,
    calls,
    errors,
    ROUND((errors::numeric / calls * 100), 2) AS error_rate_pct
FROM pg_stat_insights_errors
ORDER BY errors DESC
LIMIT 10;`,
    queryResult: ` query_snippet | calls | errors | error_rate_pct
--------------+-------+--------+---------------
 INSERT INTO users (email) VALUES ($1) | 1234 | 45 | 3.65
 UPDATE orders SET status = $1 WHERE id = $2 | 567 | 12 | 2.12`
  },
  {
    id: '10',
    title: 'Plan Estimation Issues',
    subtitle: 'Query Planner Accuracy',
    description: 'Compare estimated vs actual rows. Identify queries with poor plan estimation.',
    icon: <Code className="w-20 h-20" />,
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    plans,
    ROUND((plans::numeric / NULLIF(calls, 0)), 3) AS plan_per_call_ratio
FROM pg_stat_insights
WHERE plans > 0
ORDER BY mean_plan_time DESC
LIMIT 10;`,
    queryResult: ` query_preview | calls | avg_ms | plans | plan_per_call_ratio
--------------+-------+--------+-------+-------------------
 SELECT * FROM complex_join WHERE | 234 | 234.56 | 234 | 1.000
 SELECT COUNT(*) FROM events WHERE | 5678 | 89.12 | 1234 | 0.217`
  },
  {
    id: '11',
    title: 'Response Time Histogram',
    subtitle: 'SLA Monitoring',
    description: 'Categorize queries into time buckets: <1ms, 1-10ms, 10-100ms, 100ms-1s, 1-10s, >10s.',
    icon: <BarChart3 className="w-20 h-20" />,
    gradient: 'from-cyan-600 via-blue-600 to-purple-600',
    sqlQuery: `SELECT 
    bucket_name,
    query_count,
    ROUND((query_count::numeric / SUM(query_count) OVER () * 100), 1) AS pct_queries,
    ROUND(total_time::numeric, 2) AS total_ms
FROM pg_stat_insights_histogram_summary
ORDER BY bucket_order;`,
    queryResult: ` bucket_name | query_count | pct_queries | total_ms
-------------+-------------+-------------+----------
 <1ms        | 45234 | 62.3 | 12.34
 1-10ms      | 18923 | 26.1 | 123.45
 10-100ms    | 5678 | 7.8 | 345.67
 100ms-1s    | 1892 | 2.6 | 678.90
 1-10s       | 567 | 0.8 | 2345.67
 >10s        | 123 | 0.4 | 12345.00`
  },
  {
    id: '12',
    title: 'Time-Series Aggregation',
    subtitle: 'Trend Analysis',
    description: 'Bucket-based aggregation for capacity planning and performance trend analysis.',
    icon: <TrendingUp className="w-20 h-20" />,
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    sqlQuery: `SELECT 
    bucket_start,
    COUNT(*) AS query_count,
    ROUND(AVG(mean_exec_time)::numeric, 2) AS avg_exec_time,
    SUM(calls) AS total_calls
FROM pg_stat_insights_by_bucket
WHERE bucket_start > NOW() - INTERVAL '24 hours'
GROUP BY bucket_start
ORDER BY bucket_start DESC;`,
    queryResult: ` bucket_start | query_count | avg_exec_time | total_calls
-------------+-------------+---------------+-------------
 2024-12-15 14:00:00 | 234 | 45.67 | 12345
 2024-12-15 13:00:00 | 198 | 42.34 | 10987`
  },
  {
    id: '13',
    title: 'WAL Generation Tracking',
    subtitle: 'Write-Ahead Log Analysis',
    description: 'Monitor WAL records, full page images, and bytes generated per query for replication optimization.',
    icon: <FileText className="w-20 h-20" />,
    gradient: 'from-orange-600 via-amber-600 to-yellow-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    wal_records,
    pg_size_pretty(wal_bytes::bigint) AS wal_size,
    wal_fpi AS full_page_images
FROM pg_stat_insights
WHERE wal_bytes > 0
ORDER BY wal_bytes DESC
LIMIT 10;`,
    queryResult: ` query_preview | calls | wal_records | wal_size | full_page_images
--------------+-------+-------------+----------+-----------------
 CREATE INDEX CONCURRENTLY ON orders | 1 | 234567 | 1178 MB | 12345
 INSERT INTO events VALUES ... | 98765 | 189234 | 900 MB | 8923`
  },
  {
    id: '14',
    title: 'JIT Compilation Stats',
    subtitle: 'Just-In-Time Performance',
    description: 'Track JIT functions, generation time, inlining, optimization, and emission operations.',
    icon: <Zap className="w-20 h-20" />,
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    jit_functions,
    ROUND(jit_generation_time::numeric, 2) AS gen_time_ms,
    ROUND(jit_inlining_time::numeric, 2) AS inline_time_ms,
    ROUND(mean_exec_time::numeric, 2) AS exec_time_ms
FROM pg_stat_insights
WHERE jit_functions > 0
ORDER BY jit_generation_time DESC
LIMIT 10;`,
    queryResult: ` query_preview | jit_functions | gen_time_ms | inline_time_ms | exec_time_ms
--------------+---------------+-------------+----------------+--------------
 SELECT * FROM large_join | 156 | 45.23 | 12.34 | 234.56
 SELECT COUNT(*) GROUP BY | 89 | 34.56 | 9.87 | 189.12`
  },
  {
    id: '15',
    title: 'Parallel Query Monitoring',
    subtitle: 'Worker Efficiency',
    description: 'Track planned vs actual parallel workers. Analyze parallel query efficiency.',
    icon: <Layers className="w-20 h-20" />,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    parallel_workers_to_launch,
    parallel_workers_launched,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms
FROM pg_stat_insights
WHERE parallel_workers_to_launch > 0
ORDER BY parallel_workers_launched DESC
LIMIT 10;`,
    queryResult: ` query_preview | calls | parallel_workers_to_launch | parallel_workers_launched | avg_ms
--------------+-------+--------------------------+-------------------------+--------
 SELECT COUNT(*) FROM large_table | 123 | 4 | 4 | 234.56
 SELECT SUM(amount) FROM orders | 456 | 2 | 2 | 123.45`
  },
  {
    id: '16',
    title: 'Replication Monitoring',
    subtitle: 'Standby Health',
    description: 'Track WAL sender/receiver stats, lag (write/flush/replay), and replication health.',
    icon: <Activity className="w-20 h-20" />,
    gradient: 'from-green-600 via-emerald-600 to-cyan-600',
    sqlQuery: `SELECT 
    application_name,
    client_addr,
    replay_lag_mb,
    replay_lag_seconds,
    sync_state,
    CASE 
        WHEN replay_lag_seconds < 1 THEN 'HEALTHY'
        WHEN replay_lag_seconds < 10 THEN 'WARNING'
        ELSE 'CRITICAL'
    END AS health_status
FROM pg_stat_insights_replication
ORDER BY replay_lag_seconds DESC NULLS LAST;`,
    queryResult: ` application_name | client_addr | replay_lag_mb | replay_lag_seconds | sync_state | health_status
------------------+-------------+---------------+--------------------+------------+---------------
 node2 | 10.0.1.12 | 0.12 | 0.12 | async | HEALTHY
 node3 | 10.0.1.13 | 0.09 | 0.09 | sync | HEALTHY`
  },
  {
    id: '17',
    title: 'Index Usage Statistics',
    subtitle: 'Index Monitoring',
    description: 'Track index scans, tuple reads, cache hit ratios, and index efficiency.',
    icon: <TrendingUp className="w-20 h-20" />,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    sqlQuery: `SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    ROUND(idx_cache_hit_ratio::numeric, 4) AS cache_hit_ratio
FROM pg_stat_insights_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC
LIMIT 10;`,
    queryResult: ` schemaname | tablename | indexname | idx_scan | idx_tup_read | idx_tup_fetch | cache_hit_ratio
------------+-----------+-----------+----------+--------------+---------------+----------------
 public | orders | orders_pkey | 12345 | 234567 | 123456 | 0.9856
 public | users | users_email_idx | 9876 | 87654 | 54321 | 0.9234`
  },
  {
    id: '18',
    title: 'Index Bloat Detection',
    subtitle: 'Maintenance Optimization',
    description: 'Detect bloated indexes by comparing actual vs expected size. Calculate bloat ratios.',
    icon: <AlertTriangle className="w-20 h-20" />,
    gradient: 'from-orange-600 via-red-600 to-pink-600',
    sqlQuery: `SELECT 
    schemaname,
    tablename,
    indexname,
    ROUND(actual_size_mb::numeric, 2) AS actual_size_mb,
    ROUND(estimated_bloat_size_mb::numeric, 2) AS bloat_mb,
    bloat_severity,
    needs_reindex
FROM pg_stat_insights_index_bloat
WHERE bloat_severity IN ('HIGH', 'MEDIUM')
ORDER BY estimated_bloat_size_mb DESC
LIMIT 10;`,
    queryResult: ` schemaname | tablename | indexname | actual_size_mb | bloat_mb | bloat_severity | needs_reindex
------------+-----------+-----------+---------------+----------+----------------+--------------
 public | orders | orders_status_idx | 234.5 | 89.2 | HIGH | t
 public | events | events_timestamp_idx | 123.4 | 45.6 | MEDIUM | t`
  },
  {
    id: '19',
    title: 'Missing Index Detection',
    subtitle: 'Optimization Opportunities',
    description: 'Identify tables with sequential scans that could benefit from indexes.',
    icon: <Search className="w-20 h-20" />,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    sqlQuery: `SELECT 
    schemaname,
    tablename,
    benefit_score,
    ROUND(estimated_index_size_mb::numeric, 2) AS est_index_size_mb,
    recommended_index_type,
    priority
FROM pg_stat_insights_missing_indexes
WHERE priority = 'HIGH'
ORDER BY benefit_score DESC
LIMIT 10;`,
    queryResult: ` schemaname | tablename | benefit_score | est_index_size_mb | recommended_index_type | priority
------------+-----------+---------------+------------------+-----------------------+----------
 public | orders | 1234567 | 12.3 | btree | HIGH
 public | events | 89234 | 8.9 | btree | HIGH`
  },
  {
    id: '20',
    title: 'Index Efficiency Rating',
    subtitle: 'Performance Analysis',
    description: 'Calculate efficiency ratings from excellent to unused. Get recommendations for optimization.',
    icon: <CheckCircle className="w-20 h-20" />,
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    sqlQuery: `SELECT 
    schemaname,
    tablename,
    indexname,
    efficiency_rating,
    ROUND(index_scan_ratio::numeric, 4) AS scan_ratio,
    recommendation
FROM pg_stat_insights_index_efficiency
WHERE efficiency_rating IN ('UNUSED', 'POOR')
ORDER BY index_scan_ratio ASC
LIMIT 10;`,
    queryResult: ` schemaname | tablename | indexname | efficiency_rating | scan_ratio | recommendation
------------+-----------+-----------+------------------+------------+------------------
 public | users | users_old_idx | UNUSED | 0.00 | Consider dropping this index
 public | logs | logs_temp_idx | POOR | 0.05 | Review index usage or consider removal`
  },
  {
    id: '21',
    title: 'Configuration Parameters',
    subtitle: 'Fine-Tune Monitoring',
    description: '11 configuration parameters to customize tracking behavior and resource usage.',
    icon: <Code className="w-20 h-20" />,
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    sqlQuery: `SELECT 
    name,
    setting,
    unit,
    source,
    pending_restart
FROM pg_settings
WHERE name LIKE 'pg_stat_insights%'
ORDER BY name;`,
    queryResult: ` name | setting | unit | source | pending_restart
------+---------+------+--------+----------------
 pg_stat_insights.histogram_buckets | 10 | | configuration file | f
 pg_stat_insights.max_queries | 5000 | | configuration file | f
 pg_stat_insights.track_io_timing | off | | configuration file | f`
  },
  {
    id: '22',
    title: 'Statistics Reset',
    subtitle: 'Maintenance Operations',
    description: 'Reset all statistics or specific queries. Useful for maintenance windows.',
    icon: <RefreshCw className="w-20 h-20" />,
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    sqlQuery: `-- Reset all statistics
SELECT pg_stat_insights_reset();

-- Reset specific query
SELECT pg_stat_insights_reset(
    (SELECT userid FROM pg_stat_insights WHERE queryid = 1234567890),
    (SELECT dbid FROM pg_stat_insights WHERE queryid = 1234567890),
    1234567890
);

-- Verify reset
SELECT COUNT(*) AS remaining_queries 
FROM pg_stat_insights;`,
    queryResult: ` remaining_queries
------------------
 0
(1 row)`
  },
  {
    id: '23',
    title: 'Export to CSV',
    subtitle: 'External Analysis',
    description: 'Export statistics to CSV for analysis in external tools like Excel or BI platforms.',
    icon: <FileText className="w-20 h-20" />,
    gradient: 'from-green-600 via-teal-600 to-cyan-600',
    sqlQuery: `COPY (
    SELECT 
        LEFT(query, 100) AS query_snippet,
        calls,
        ROUND(total_exec_time::numeric, 2) AS total_ms,
        ROUND(mean_exec_time::numeric, 2) AS avg_ms,
        shared_blks_read,
        shared_blks_hit
    FROM pg_stat_insights_top_by_time
    LIMIT 100
) TO '/tmp/slow_queries.csv' WITH CSV HEADER;`,
    queryResult: `COPY 100`
  },
  {
    id: '24',
    title: 'Query Utilization Check',
    subtitle: 'Capacity Planning',
    description: 'Monitor how many queries are tracked vs max_queries limit. Plan capacity.',
    icon: <BarChart3 className="w-20 h-20" />,
    gradient: 'from-purple-600 via-blue-600 to-cyan-600',
    sqlQuery: `SELECT 
    COUNT(*) AS tracked_queries,
    (SELECT setting::int FROM pg_settings 
     WHERE name = 'pg_stat_insights.max_queries') AS max_queries,
    ROUND((COUNT(*)::numeric / 
           (SELECT setting::int FROM pg_settings 
            WHERE name = 'pg_stat_insights.max_queries') * 100), 1) AS utilization_pct
FROM pg_stat_insights;`,
    queryResult: ` tracked_queries | max_queries | utilization_pct
-----------------+-------------+---------------
 3456 | 5000 | 69.1`
  },
  {
    id: '25',
    title: 'Statistics Age Analysis',
    subtitle: 'Data Freshness',
    description: 'Check how old statistics are. Determine when to reset during maintenance.',
    icon: <Clock className="w-20 h-20" />,
    gradient: 'from-orange-600 via-amber-600 to-yellow-600',
    sqlQuery: `SELECT 
    MIN(stats_since) AS oldest_stat,
    MAX(stats_since) AS newest_stat,
    COUNT(*) AS total_queries,
    NOW() - MIN(stats_since) AS stats_age
FROM pg_stat_insights;`,
    queryResult: ` oldest_stat | newest_stat | total_queries | stats_age
-------------+-------------+--------------+--------------
 2024-12-01 10:00:00 | 2024-12-15 14:30:00 | 3456 | 14 days 04:30:00`
  },
  {
    id: '26',
    title: 'Cache Hit Ratio Analysis',
    subtitle: 'Buffer Optimization',
    description: 'Calculate cache hit ratios for all queries. Identify optimization opportunities.',
    icon: <Search className="w-20 h-20" />,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    ROUND((shared_blks_hit::numeric / 
           NULLIF(shared_blks_hit + shared_blks_read, 0) * 100), 2) AS cache_hit_pct,
    shared_blks_hit,
    shared_blks_read
FROM pg_stat_insights
WHERE shared_blks_read > 0
ORDER BY cache_hit_pct ASC
LIMIT 10;`,
    queryResult: ` query_preview | calls | cache_hit_pct | shared_blks_hit | shared_blks_read
--------------+-------+---------------+-----------------+------------------
 SELECT * FROM large_table | 15234 | 45.23 | 892341 | 1081245
 SELECT * FROM archived_orders | 8923 | 52.17 | 234567 | 215678`
  },
  {
    id: '27',
    title: 'I/O Timing Analysis',
    subtitle: 'Storage Performance',
    description: 'When track_io_timing is enabled, analyze storage subsystem performance.',
    icon: <HardDrive className="w-20 h-20" />,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    shared_blks_read,
    ROUND(shared_blk_read_time::numeric, 2) AS read_time_ms,
    ROUND((shared_blk_read_time / NULLIF(shared_blks_read, 0))::numeric, 3) AS ms_per_block,
    CASE 
        WHEN shared_blk_read_time / NULLIF(shared_blks_read, 0) > 10 THEN '[SLOW] Very Slow Storage'
        WHEN shared_blk_read_time / NULLIF(shared_blks_read, 0) > 1 THEN '[WARNING] Slow Storage'
        WHEN shared_blk_read_time / NULLIF(shared_blks_read, 0) > 0.1 THEN '[OK] Normal (HDD)'
        ELSE '[FAST] Fast (SSD)'
    END AS storage_speed
FROM pg_stat_insights
WHERE shared_blks_read > 100
ORDER BY (shared_blk_read_time / NULLIF(shared_blks_read, 0)) DESC
LIMIT 10;`,
    queryResult: ` query_preview | shared_blks_read | read_time_ms | ms_per_block | storage_speed
--------------+------------------+--------------+--------------+----------------
 SELECT * FROM large_table | 123456 | 1234.56 | 0.010 | [FAST] Fast (SSD)
 SELECT * FROM archived_data | 56789 | 567.89 | 0.010 | [FAST] Fast (SSD)`
  },
  {
    id: '28',
    title: 'JIT Overhead Analysis',
    subtitle: 'Compilation Impact',
    description: 'Compare JIT generation time with execution time. Optimize JIT thresholds.',
    icon: <Zap className="w-20 h-20" />,
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    sqlQuery: `SELECT 
    LEFT(query, 80) AS query_preview,
    jit_functions,
    ROUND(jit_generation_time::numeric, 2) AS gen_time_ms,
    ROUND(mean_exec_time::numeric, 2) AS exec_time_ms,
    ROUND((jit_generation_time / NULLIF(mean_exec_time, 0) * 100)::numeric, 1) AS jit_overhead_pct
FROM pg_stat_insights
WHERE jit_functions > 0
ORDER BY jit_generation_time DESC
LIMIT 10;`,
    queryResult: ` query_preview | jit_functions | gen_time_ms | exec_time_ms | jit_overhead_pct
--------------+---------------+-------------+--------------+------------------
 SELECT * FROM large_join | 156 | 45.23 | 234.56 | 19.3
 SELECT COUNT(*) GROUP BY | 89 | 34.56 | 189.12 | 18.3`
  },
  {
    id: '29',
    title: 'Prometheus Integration',
    subtitle: 'Monitoring Export',
    description: 'Pre-built Prometheus queries and 11 alert rules for production monitoring.',
    icon: <Activity className="w-20 h-20" />,
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    sqlQuery: `-- Prometheus query example
SELECT 
    'pg_stat_insights_query_total_time' AS metric_name,
    queryid,
    total_exec_time AS value
FROM pg_stat_insights
WHERE total_exec_time > 10000;

-- Grafana dashboard integration
SELECT 
    bucket_start,
    AVG(mean_exec_time) AS avg_exec_time,
    COUNT(*) AS query_count
FROM pg_stat_insights_by_bucket
GROUP BY bucket_start
ORDER BY bucket_start DESC;`,
    queryResult: ` metric_name | queryid | value
------------+---------+--------
 pg_stat_insights_query_total_time | 1234567 | 12456.78
 pg_stat_insights_query_total_time | 2345678 | 8934.12`
  },
  {
    id: '30',
    title: 'Production Ready',
    subtitle: 'Enterprise Grade',
    description: 'PostgreSQL 16, 17, and 18 compatible. 150+ TAP tests. Drop-in replacement for pg_stat_statements.',
    icon: <Sparkles className="w-20 h-20" />,
    gradient: 'from-orange-600 via-purple-600 to-blue-600',
    metrics: ['PostgreSQL 16-18', '150+ TAP Tests', '100% Code Coverage', 'Production Ready', 'Drop-in Replacement']
  }
]

export default function PgStatInsightsProductSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | 'fade'>('fade')

  const goToSlide = useCallback((index: number) => {
    const newIndex = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index
    setTransitionDirection(index > currentIndex ? 'right' : index < currentIndex ? 'left' : 'fade')
    setCurrentIndex(newIndex)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    setTransitionDirection('left')
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setTransitionDirection('right')
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && !isFullscreen) {
      const interval = setInterval(() => {
        goToNext()
      }, 8000) // 8 seconds per slide for 30 slides
      return () => clearInterval(interval)
    }
  }, [isPlaying, isHovered, isFullscreen, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [goToPrevious, goToNext, isFullscreen])

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const currentSlide = slides[currentIndex]
  const progress = ((currentIndex + 1) / slides.length) * 100

  const slideContent = (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${
        transitionDirection === 'left' ? 'animate-slide-in-left' : 
        transitionDirection === 'right' ? 'animate-slide-in-right' : 
        'animate-fade-in'
      }`}
    >
      {/* Animated Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} opacity-30 transition-all duration-1000 ease-in-out animate-gradient-shift`}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Content Container - PowerPoint Style */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            {currentSlide.icon}
          </div>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl font-semibold text-purple-300 uppercase tracking-wider">
            {currentSlide.subtitle}
          </div>

          {/* Title - Large PowerPoint Style */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
            {currentSlide.title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-5xl drop-shadow-lg">
            {currentSlide.description}
          </p>

          {/* SQL Query - Code Block Style */}
          {currentSlide.sqlQuery && (
            <div className="w-full max-w-5xl mt-8">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold text-sm">SQL Query</span>
                </div>
                <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                  <code>{currentSlide.sqlQuery}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Query Result */}
          {currentSlide.queryResult && (
            <div className="w-full max-w-5xl mt-4">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">Query Result</span>
                </div>
                <pre className="text-sm text-white font-mono overflow-x-auto whitespace-pre-wrap">
                  <code>{currentSlide.queryResult}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Metrics List - PowerPoint Bullet Style */}
          {currentSlide.metrics && (
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {currentSlide.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-lg font-medium shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  • {metric}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Normal Mode */}
      {!isFullscreen && (
        <div
          className="relative w-full my-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-white/10 shadow-2xl min-h-[700px]">
            {slideContent}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl z-20 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl z-20 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>

            {/* Controls */}
            <div className="absolute top-6 right-6 flex gap-2 z-20">
              <button
                onClick={togglePlayPause}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 border border-white/30 shadow-xl group"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
                ) : (
                  <Play className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 border border-white/30 shadow-xl group"
                aria-label="Enter fullscreen"
              >
                <Maximize2 className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 shadow-xl z-20">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap max-w-4xl mx-auto">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 ${
                    isActive ? 'w-12' : 'w-3'
                  } h-3 rounded-full ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-600/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Presentation Mode */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-4">
              <div className="text-white font-semibold">pg_stat_insights</div>
              <div className="text-white/60 text-sm">Slide {currentIndex + 1} of {slides.length}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Exit fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slide Content - Fullscreen */}
          <div className="flex-1 pt-16 overflow-y-auto">
            {slideContent}
          </div>

          {/* Navigation Controls - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6 z-30">
            <button
              onClick={goToPrevious}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Progress Dots */}
            <div className="flex gap-1 max-w-2xl overflow-x-auto px-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-20 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Hint */}
      {!isFullscreen && (
        <div className="text-center mt-4 text-sm text-white/60">
          Press <kbd className="px-2 py-1 bg-white/10 rounded">F</kbd> for fullscreen • 
          <kbd className="px-2 py-1 bg-white/10 rounded ml-2">←</kbd> <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd> to navigate • 
          <kbd className="px-2 py-1 bg-white/10 rounded ml-2">Space</kbd> to pause
        </div>
      )}
    </>
  )
}

