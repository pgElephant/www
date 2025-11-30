-- Run all index monitoring queries and capture outputs
\c index_monitoring_test

-- Set output format
\pset format aligned
\pset tuples_only off

-- Query 1: Verify views exist
\echo '=== Query 1: Verify Index Monitoring Views ==='
SELECT viewname 
FROM pg_views 
WHERE viewname LIKE 'pg_stat_insights_index%'
ORDER BY viewname;

-- Query 2: pg_stat_insights_indexes - Top 10 by size
\echo ''
\echo '=== Query 2: pg_stat_insights_indexes - Top 10 by Size ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    ROUND(index_size_mb::numeric, 2) as index_size_mb,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    ROUND(idx_cache_hit_ratio::numeric, 4) as idx_cache_hit_ratio,
    index_type,
    is_unique,
    is_primary
FROM pg_stat_insights_indexes
WHERE schemaname = 'public'
ORDER BY index_size_mb DESC
LIMIT 10;

-- Query 3: pg_stat_insights_index_usage - Unused indexes
\echo ''
\echo '=== Query 3: pg_stat_insights_index_usage - Unused/Rare Indexes ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    total_scans,
    usage_status,
    ROUND(index_scan_ratio::numeric, 4) as index_scan_ratio,
    recommendation
FROM pg_stat_insights_index_usage
WHERE usage_status IN ('NEVER_USED', 'RARE')
ORDER BY total_scans
LIMIT 10;

-- Query 4: pg_stat_insights_index_bloat - Bloated indexes
\echo ''
\echo '=== Query 4: pg_stat_insights_index_bloat - Bloated Indexes ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    ROUND(actual_size_mb::numeric, 2) as actual_size_mb,
    ROUND(estimated_bloat_size_mb::numeric, 2) as estimated_bloat_size_mb,
    bloat_severity,
    needs_reindex
FROM pg_stat_insights_index_bloat
WHERE bloat_severity IN ('HIGH', 'MEDIUM')
ORDER BY estimated_bloat_size_mb DESC
LIMIT 10;

-- Query 5: pg_stat_insights_index_efficiency - Poor efficiency
\echo ''
\echo '=== Query 5: pg_stat_insights_index_efficiency - Poor Efficiency ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    index_scans,
    seq_scans,
    ROUND(index_scan_ratio::numeric, 4) as index_scan_ratio,
    efficiency_rating,
    recommendation
FROM pg_stat_insights_index_efficiency
WHERE efficiency_rating IN ('POOR', 'UNUSED')
ORDER BY index_scan_ratio
LIMIT 10;

-- Query 6: pg_stat_insights_index_maintenance - Maintenance recommendations
\echo ''
\echo '=== Query 6: pg_stat_insights_index_maintenance - Recommendations ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    maintenance_type,
    priority,
    reason,
    recommended_action,
    estimated_benefit
FROM pg_stat_insights_index_maintenance
WHERE maintenance_type != 'NONE'
ORDER BY 
    CASE priority 
        WHEN 'CRITICAL' THEN 1 
        WHEN 'HIGH' THEN 2 
        WHEN 'MEDIUM' THEN 3 
        ELSE 4 
    END,
    tablename
LIMIT 15;

-- Query 7: pg_stat_insights_index_summary
\echo ''
\echo '=== Query 7: pg_stat_insights_index_summary ==='
SELECT 
    total_indexes,
    ROUND(total_index_size_mb::numeric, 2) as total_index_size_mb,
    active_indexes,
    unused_indexes,
    bloated_indexes,
    indexes_needing_reindex,
    never_used_indexes,
    ROUND(avg_index_cache_hit_ratio::numeric, 4) as avg_index_cache_hit_ratio,
    ROUND(overall_index_usage_ratio::numeric, 4) as overall_index_usage_ratio
FROM pg_stat_insights_index_summary;

-- Query 8: pg_stat_insights_index_alerts
\echo ''
\echo '=== Query 8: pg_stat_insights_index_alerts ==='
SELECT 
    alert_type,
    severity,
    schemaname,
    tablename,
    indexname,
    alert_message,
    recommended_action
FROM pg_stat_insights_index_alerts
ORDER BY 
    CASE severity 
        WHEN 'CRITICAL' THEN 1 
        WHEN 'WARNING' THEN 2 
        ELSE 3 
    END
LIMIT 15;

-- Query 9: pg_stat_insights_index_dashboard - Summary
\echo ''
\echo '=== Query 9: pg_stat_insights_index_dashboard - Summary ==='
SELECT 
    section,
    name,
    details
FROM pg_stat_insights_index_dashboard
WHERE section = 'SUMMARY';

-- Query 10: pg_stat_insights_missing_indexes
\echo ''
\echo '=== Query 10: pg_stat_insights_missing_indexes ==='
SELECT 
    schemaname,
    tablename,
    occurrence_count,
    estimated_benefit,
    high_priority,
    recommended_index_def,
    ROUND(estimated_index_size_mb::numeric, 2) as estimated_index_size_mb,
    ROUND(benefit_score::numeric, 2) as benefit_score
FROM pg_stat_insights_missing_indexes
WHERE high_priority = true
ORDER BY benefit_score DESC
LIMIT 10;

-- Query 11: pg_stat_insights_index_duplicates
\echo ''
\echo '=== Query 11: pg_stat_insights_index_duplicates ==='
SELECT 
    schemaname,
    tablename,
    index1_name,
    index2_name,
    duplicate_type,
    severity,
    ROUND(index1_size_mb::numeric, 2) as index1_size_mb,
    ROUND(index2_size_mb::numeric, 2) as index2_size_mb,
    recommendation
FROM pg_stat_insights_index_duplicates
ORDER BY 
    CASE severity 
        WHEN 'CRITICAL' THEN 1 
        WHEN 'HIGH' THEN 2 
        ELSE 3 
    END
LIMIT 10;

-- Query 12: pg_stat_insights_index_maintenance_history
\echo ''
\echo '=== Query 12: pg_stat_insights_index_maintenance_history ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    days_since_vacuum,
    days_since_analyze,
    maintenance_status
FROM pg_stat_insights_index_maintenance_history
WHERE maintenance_status != 'CURRENT'
ORDER BY days_since_analyze DESC NULLS LAST
LIMIT 10;

-- Practical Examples

-- Example 1: Find unused indexes
\echo ''
\echo '=== Practical Example 1: Find Unused Indexes ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    ROUND((SELECT pg_relation_size(indexrelid)::numeric / 1024 / 1024 FROM pg_stat_user_indexes WHERE schemaname = iu.schemaname AND relname = iu.tablename AND indexrelname = iu.indexname), 2) as index_size_mb,
    total_scans
FROM pg_stat_insights_index_usage iu
WHERE usage_status = 'NEVER_USED'
ORDER BY (SELECT pg_relation_size(indexrelid) FROM pg_stat_user_indexes WHERE schemaname = iu.schemaname AND relname = iu.tablename AND indexrelname = iu.indexname) DESC
LIMIT 10;

-- Example 2: Identify bloated indexes
\echo ''
\echo '=== Practical Example 2: Identify Bloated Indexes ==='
SELECT 
    b.schemaname || '.' || b.indexname AS index_full_name,
    ROUND(b.actual_size_mb::numeric, 2) as actual_size_mb,
    ROUND(b.estimated_bloat_size_mb::numeric, 2) as estimated_bloat_size_mb,
    ROUND((b.estimated_bloat_size_mb / NULLIF(b.actual_size_mb, 0) * 100)::numeric, 2) AS bloat_percentage,
    m.recommended_action
FROM pg_stat_insights_index_bloat b
JOIN pg_stat_insights_index_maintenance m 
    ON b.schemaname = m.schemaname 
    AND b.tablename = m.tablename 
    AND b.indexname = m.indexname
WHERE b.bloat_severity = 'HIGH'
ORDER BY b.estimated_bloat_size_mb DESC
LIMIT 10;

-- Example 3: Detect missing indexes
\echo ''
\echo '=== Practical Example 3: Detect Missing Indexes ==='
SELECT 
    t.schemaname,
    t.relname as tablename,
    t.seq_scan,
    COALESCE(SUM(i.idx_scan), 0) AS total_index_scans,
    ROUND((t.seq_scan::numeric / NULLIF(COALESCE(SUM(i.idx_scan), 0) + t.seq_scan, 0))::numeric, 4) AS seq_scan_ratio,
    m.estimated_benefit,
    m.recommended_index_def
FROM pg_stat_user_tables t
LEFT JOIN pg_stat_user_indexes i ON i.relid = t.relid
LEFT JOIN pg_stat_insights_missing_indexes m 
    ON m.schemaname = t.schemaname 
    AND m.tablename = t.relname
WHERE t.seq_scan > 100
GROUP BY t.schemaname, t.relname, t.seq_scan, m.estimated_benefit, m.recommended_index_def
HAVING t.seq_scan > COALESCE(SUM(i.idx_scan), 0) * 5
ORDER BY t.seq_scan DESC
LIMIT 10;

-- Example 4: Analyze index efficiency
\echo ''
\echo '=== Practical Example 4: Analyze Index Efficiency ==='
SELECT 
    schemaname,
    tablename,
    indexname,
    index_scans,
    seq_scans,
    ROUND((index_scans::numeric / NULLIF(index_scans + seq_scans, 0) * 100)::numeric, 2) AS index_usage_percent,
    efficiency_rating
FROM pg_stat_insights_index_efficiency
WHERE index_scans + seq_scans > 100
ORDER BY index_usage_percent
LIMIT 10;

-- Example 5: Generate maintenance plan
\echo ''
\echo '=== Practical Example 5: Generate Maintenance Plan ==='
SELECT 
    maintenance_type,
    priority,
    COUNT(*) AS index_count,
    STRING_AGG(schemaname || '.' || indexname, ', ' ORDER BY schemaname, indexname) AS indexes
FROM pg_stat_insights_index_maintenance
WHERE maintenance_type != 'NONE'
GROUP BY maintenance_type, priority
ORDER BY 
    CASE priority 
        WHEN 'CRITICAL' THEN 1 
        WHEN 'HIGH' THEN 2 
        WHEN 'MEDIUM' THEN 3 
        ELSE 4 
    END,
    maintenance_type;

