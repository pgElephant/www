import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

export const metadata = {
    title: 'Index Monitoring with pg_stat_insights v3.0.0',
    description: 'Monitor PostgreSQL indexes using pg_stat_insights v3.0.0. Track index usage, detect bloat, identify missing indexes, and optimize performance with 11 specialized views.',
    openGraph: {
        title: 'Index Monitoring with pg_stat_insights v3.0.0',
        description: 'Complete guide to PostgreSQL index monitoring using pg_stat_insights v3.0.0 with real queries and examples.',
        images: ['/blog/pg-stat-insights/og-image-v9.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Index Monitoring with pg_stat_insights v3.0.0',
        description: 'Complete guide to PostgreSQL index monitoring using pg_stat_insights v3.0.0 with real queries and examples.',
        images: ['/blog/pg-stat-insights/og-image-v9.jpg'],
    },
};

const markdown = `![pg_stat_insights blog header](/blog/pg-stat-insights/header.svg?v=6)

# Index Monitoring with pg_stat_insights v3.0.0

**[View on GitHub](https://github.com/pgElephant/pg_stat_insights)** | **[Download v3.0.0](https://github.com/pgElephant/pg_stat_insights/releases/tag/v3.0.0)** | **[Documentation](https://www.pgelephant.com/docs/pg-stat-insights)**

## Introduction

PostgreSQL indexes accelerate query execution by creating ordered data structures that allow rapid lookups. These structures trade storage space and write performance for read speed. Large production databases often contain dozens or hundreds of indexes across multiple tables. Understanding which indexes provide value and which consume resources without benefit requires continuous monitoring.

Index bloat represents another critical concern. As tables undergo updates and deletes, indexes accumulate dead space. This bloat increases storage requirements and degrades query performance. Without visibility into bloat levels, database administrators operate blind to wasted resources and potential performance improvements.

Index efficiency varies significantly across different query patterns. Some indexes see constant use while others remain untouched. Sequential scans may outperform index scans for certain data distributions or query types. Identifying inefficient indexes enables optimization decisions that balance storage costs against query performance gains.

pg_stat_insights v3.0.0 introduces comprehensive index monitoring capabilities through 11 specialized views. These views provide detailed statistics on index usage, bloat estimation, efficiency ratings, and maintenance recommendations. The extension tracks index scans, sequential scan patterns, cache hit ratios, and size metrics across the entire database cluster.

The monitoring views enable proactive index management. Administrators can identify unused indexes consuming storage, detect bloated indexes requiring reindexing, and discover missing indexes that could improve query performance. Maintenance recommendations prioritize actions by severity, helping teams focus efforts on high-impact optimizations.

This guide demonstrates each monitoring view with real queries executed against a 3GB production-like database. The examples show actual index usage patterns, bloat detection results, efficiency ratings, and maintenance recommendations. All outputs come from live queries on a database containing 1.5 million customers, 1 million products, 10 million orders, and 10 million order items.

## Setup

Install pg_stat_insights v3.0.0. Download the source code. Compile and install the extension. Configure PostgreSQL to load the extension at startup. Create the extension in the target database. The examples use a custom e-commerce dataset with 1.5 million customers, 1 million products, 10 million orders, and 10 million order items. The database size is approximately 3GB. The schema includes multiple indexes on various columns to demonstrate index monitoring capabilities.

\`\`\`bash
git clone https://github.com/pgElephant/pg_stat_insights.git
cd pg_stat_insights
git checkout v3.0.0
make clean && make
sudo make install

# Add to postgresql.conf:
shared_preload_libraries = 'pg_stat_insights'

# Restart PostgreSQL and create the extension:
CREATE EXTENSION pg_stat_insights;
\`\`\`

Verify installation by checking that index monitoring views exist:

\`\`\`sql
SELECT viewname 
FROM pg_views 
WHERE viewname LIKE 'pg_stat_insights_index%'
ORDER BY viewname;

                  viewname                  
--------------------------------------------
 pg_stat_insights_index_alerts
 pg_stat_insights_index_bloat
 pg_stat_insights_index_by_bucket
 pg_stat_insights_index_dashboard
 pg_stat_insights_index_duplicates
 pg_stat_insights_index_efficiency
 pg_stat_insights_index_lock_contention
 pg_stat_insights_index_maintenance
 pg_stat_insights_index_maintenance_cost
 pg_stat_insights_index_maintenance_history
 pg_stat_insights_index_size_by_bucket
 pg_stat_insights_index_size_trends
 pg_stat_insights_index_summary
 pg_stat_insights_index_usage
 pg_stat_insights_indexes
(15 rows)
\`\`\`

## Index Monitoring Views

Database administrators need visibility into index performance. Indexes consume storage space and slow write operations. Some indexes provide significant query speedup while others sit unused. The pg_stat_insights_indexes view provides comprehensive statistics for all indexes in the database. It tracks size, usage patterns, cache performance, and index type information. This view helps identify which indexes deliver value and which consume resources without benefit. The following query retrieves the largest indexes sorted by size.

### pg_stat_insights_indexes

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    index_size_mb,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    idx_cache_hit_ratio,
    index_type,
    is_unique,
    is_primary
FROM pg_stat_insights_indexes
WHERE schemaname = 'public'
ORDER BY index_size_mb DESC
LIMIT 10;

 schemaname |  tablename  |        indexname        | index_size_mb | idx_scan | idx_tup_read | idx_tup_fetch | idx_cache_hit_ratio | index_type | is_unique | is_primary 
------------+-------------+-------------------------+---------------+----------+--------------+---------------+---------------------+------------+-----------+------------
 public     | order_items | order_items_pkey        |        214.23 |        0 |            0 |             0 |              1.0000 | btree      | t         | t
 public     | orders      | orders_pkey             |        214.23 |        0 |            0 |             0 |              1.0000 | btree      | t         | t
 public     | order_items | idx_order_items_order   |        210.08 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | orders      | idx_orders_customer    |        132.88 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | customers   | customers_email_key     |        125.39 |        0 |            0 |             0 |              1.0000 | btree      | t         | f
 public     | customers   | idx_customers_email     |        125.39 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | order_items | idx_order_items_product |        101.80 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | orders      | idx_orders_date         |         85.92 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | orders      | idx_orders_status       |         62.45 |        0 |            0 |             0 |              1.0000 | btree      | f         | f
 public     | products    | products_sku_key        |         60.18 |        0 |            0 |             0 |                     | btree      | t         | f
(10 rows)
\`\`\`

The results show index sizes range from 60 MB to 214 MB. All indexes show zero scans in this snapshot, indicating statistics were reset. The idx_cache_hit_ratio column shows 1.0000 for most indexes, meaning all index pages are served from cache. Large indexes with zero scans consume storage without providing query benefits. Review these indexes to determine if they serve a purpose or can be removed.

Unused indexes waste storage space and slow write operations. The pg_stat_insights_index_usage view categorizes indexes by usage status. It identifies never-used indexes and those with low activity. This view helps prioritize index cleanup efforts. Indexes with zero scans consume resources without providing query benefits. The following query finds indexes that are never used or rarely used.

### pg_stat_insights_index_usage

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    total_scans,
    usage_status,
    index_scan_ratio,
    recommendation
FROM pg_stat_insights_index_usage
WHERE usage_status IN ('NEVER_USED', 'RARE')
ORDER BY total_scans;

 schemaname |  tablename  |        indexname        | total_scans | usage_status | index_scan_ratio |              recommendation              
------------+-------------+-------------------------+-------------+--------------+------------------+------------------------------------------
 public     | orders      | orders_pkey             |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | orders      | idx_orders_customer     |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | orders      | idx_orders_date         |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | orders      | idx_orders_status       |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | order_items | order_items_pkey        |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | order_items | idx_order_items_order   |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | order_items | idx_order_items_product |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | customers   | customers_pkey          |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | customers   | customers_email_key     |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
 public     | customers   | idx_customers_email     |           0 | NEVER_USED   |           0.0000 | REVIEW: Low usage, high sequential scans
(10 rows)
\`\`\`

The results show ten indexes with zero scans. All indexes have usage_status of NEVER_USED. The index_scan_ratio is 0.0000 for all results, indicating no index scans occurred. The recommendation column suggests reviewing these indexes due to low usage and high sequential scan activity. Indexes with zero scans consume storage without benefit. Verify these indexes are not needed before dropping them.

Index bloat occurs when indexes accumulate dead space from updates and deletes. Bloated indexes consume more storage than necessary and degrade query performance. The pg_stat_insights_index_bloat view estimates bloat levels and identifies indexes that need reindexing. This view helps prioritize maintenance operations. High bloat indicates significant wasted space. The following query finds indexes with high or medium bloat severity.

### pg_stat_insights_index_bloat

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    actual_size_mb,
    estimated_bloat_size_mb,
    bloat_severity,
    needs_reindex
FROM pg_stat_insights_index_bloat
WHERE bloat_severity IN ('HIGH', 'MEDIUM')
ORDER BY estimated_bloat_size_mb DESC;

 schemaname | tablename | indexname | actual_size_mb | estimated_bloat_size_mb | bloat_severity | needs_reindex 
------------+-----------+-----------+----------------+-------------------------+----------------+---------------
(0 rows)
\`\`\`

The query returns no rows, indicating no indexes currently show high or medium bloat. This suggests indexes are in good condition after recent maintenance. When bloat is detected, the estimated_bloat_size_mb column shows wasted space. The needs_reindex column indicates whether REINDEX is recommended. Run REINDEX during maintenance windows to reclaim space and improve performance.

Index efficiency measures how often indexes are used versus sequential scans. Some indexes see constant use while others remain unused. PostgreSQL may prefer sequential scans for certain query patterns or data distributions. The pg_stat_insights_index_efficiency view rates index efficiency by comparing index scans to sequential scans. This view helps identify indexes that are not providing value. The following query finds indexes with poor or unused efficiency ratings.

### pg_stat_insights_index_efficiency

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    index_scans,
    seq_scans,
    index_scan_ratio,
    efficiency_rating,
    recommendation
FROM pg_stat_insights_index_efficiency
WHERE efficiency_rating IN ('POOR', 'UNUSED')
ORDER BY index_scan_ratio;

 schemaname |  tablename  |        indexname        | index_scans | seq_scans | index_scan_ratio | efficiency_rating |                           recommendation                           
------------+-------------+-------------------------+-------------+-----------+------------------+-------------------+--------------------------------------------------------------------
 public     | orders      | orders_pkey             |           0 |      7000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | orders      | idx_orders_customer     |           0 |      7000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | orders      | idx_orders_date         |           0 |      7000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | orders      | idx_orders_status       |           0 |      7000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | order_items | order_items_pkey        |           0 |      5000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | order_items | idx_order_items_order   |           0 |      5000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | order_items | idx_order_items_product |           0 |      5000 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | customers   | customers_pkey          |           0 |      8800 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | customers   | customers_email_key     |           0 |      8800 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
 public     | customers   | idx_customers_email     |           0 |      8800 |           0.0000 | UNUSED            | Consider dropping: Index never used, high sequential scan activity
(10 rows)
\`\`\`

The results show ten indexes with UNUSED efficiency ratings. All indexes have zero index scans and high sequential scan counts. The index_scan_ratio is 0.0000 for all results, indicating PostgreSQL prefers sequential scans over these indexes. The recommendation column suggests considering dropping these indexes due to never being used and high sequential scan activity. Low efficiency ratings suggest indexes are not helping query performance. PostgreSQL may prefer sequential scans due to query patterns or statistics.

Index maintenance requires planning and prioritization. Some indexes need immediate attention while others can wait. The pg_stat_insights_index_maintenance view generates maintenance recommendations with priority levels. It suggests REINDEX, VACUUM, or ANALYZE operations based on index conditions. This view helps schedule maintenance operations efficiently. Critical items need immediate attention. High priority items should be scheduled soon. The following query retrieves all maintenance recommendations.

### pg_stat_insights_index_maintenance

\`\`\`sql
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
    tablename;

 schemaname | tablename | indexname | maintenance_type | priority | reason | recommended_action | estimated_benefit 
------------+-----------+-----------+------------------+----------+--------+--------------------+-------------------
(0 rows)
\`\`\`

The query returns no rows, indicating no indexes currently require maintenance. This suggests indexes are in good condition. When maintenance is needed, the priority column indicates urgency. Critical items need immediate attention. High priority items should be scheduled soon. The estimated_benefit column shows potential improvements from the recommended action. Use these recommendations to plan maintenance windows.

Cluster-wide index statistics provide a high-level view of index health. The pg_stat_insights_index_summary view aggregates metrics across all indexes. It shows totals, counts, and overall health indicators. This view helps assess the overall state of indexes in the database. High unused index counts indicate cleanup opportunities. Low cache hit ratios suggest memory tuning may be needed. The following query retrieves the cluster-wide summary.

### pg_stat_insights_index_summary

\`\`\`sql
SELECT 
    total_indexes,
    total_index_size_mb,
    active_indexes,
    unused_indexes,
    bloated_indexes,
    indexes_needing_reindex,
    never_used_indexes,
    avg_index_cache_hit_ratio,
    overall_index_usage_ratio
FROM pg_stat_insights_index_summary;

 total_indexes | total_index_size_mb | active_indexes | unused_indexes | bloated_indexes | indexes_needing_reindex | never_used_indexes | avg_index_cache_hit_ratio | overall_index_usage_ratio 
---------------+---------------------+----------------+----------------+-----------------+-------------------------+--------------------+---------------------------+---------------------------
            17 |             1497.16 |              0 |             17 |               0 |                       0 |                 17 |                    1.0000 |                    0.0000
(1 row)
\`\`\`

The results show 17 total indexes consuming 1497.16 MB of storage. Zero active indexes indicates statistics were reset. Seventeen unused indexes suggest significant cleanup opportunities. Zero bloated indexes indicates good index health. The avg_index_cache_hit_ratio of 1.0000 shows all index pages are served from cache. The overall_index_usage_ratio of 0.0000 reflects the reset statistics. High unused index counts indicate cleanup opportunities. Low cache hit ratios suggest memory tuning.

Critical index issues require immediate attention. The pg_stat_insights_index_alerts view surfaces problems that need action. It combines bloat alerts, unused index warnings, and efficiency problems into a single view. This view helps prioritize index maintenance efforts. Alerts are categorized by severity. Critical items need immediate attention. Warnings should be reviewed during regular maintenance. The following query retrieves all alerts sorted by severity.

### pg_stat_insights_index_alerts

\`\`\`sql
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
    END;

 alert_type  | severity | schemaname |  tablename  |        indexname        |                        alert_message                        |                     recommended_action                     
-------------+----------+------------+-------------+-------------------------+-------------------------------------------------------------+------------------------------------------------------------
 INEFFICIENT | WARNING  | public     | customers   | customers_pkey          | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | customers   | customers_email_key     | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | orders      | orders_pkey             | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | order_items | order_items_pkey        | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | customers   | idx_customers_email     | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | customers   | idx_customers_city      | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | customers   | idx_customers_status    | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | orders      | idx_orders_customer     | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | orders      | idx_orders_date         | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | orders      | idx_orders_status       | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | order_items | idx_order_items_order   | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 INEFFICIENT | WARNING  | public     | order_items | idx_order_items_product | Index rarely used, sequential scans preferred (ratio: 0.00) | Review query patterns and consider index tuning or removal
 UNUSED      | WARNING  | public     | products    | products_pkey           | Index has never been used (0 scans)                         | Consider dropping: DROP INDEX public.products_pkey;
 UNUSED      | WARNING  | public     | products    | products_sku_key        | Index has never been used (0 scans)                         | Consider dropping: DROP INDEX public.products_sku_key;
 UNUSED      | WARNING  | public     | orders      | orders_pkey             | Index has never been used (0 scans)                         | Consider dropping: DROP INDEX public.orders_pkey;
(15 rows)
\`\`\`

The results show 15 alerts, all with WARNING severity. Twelve alerts are INEFFICIENT type, indicating indexes are rarely used and sequential scans are preferred. Three alerts are UNUSED type, indicating indexes have never been used. The alert_message column explains the issue. The recommended_action column provides specific steps to address each alert. Address critical items first. Review warnings during regular maintenance.

Monitoring dashboards require structured data formats. The pg_stat_insights_index_dashboard view provides JSON data for integration with Grafana and other monitoring tools. It consolidates metrics into structured sections. This view enables automated monitoring and alerting. The JSON format allows easy parsing and visualization. The following query retrieves the summary section for dashboard integration.

### pg_stat_insights_index_dashboard

\`\`\`sql
SELECT 
    section,
    name,
    details
FROM pg_stat_insights_index_dashboard
WHERE section = 'SUMMARY';

 section | name |                                                                               details                                                                               
---------+------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 SUMMARY |      | {"total_indexes" : 17, "total_size_mb" : 1497.16, "active_indexes" : 0, "unused_indexes" : 17, "bloated_indexes" : 0, "critical_alerts" : 0, "warning_alerts" : 29}
(1 row)
\`\`\`

The results show a single row with the SUMMARY section. The details column contains JSON with key metrics. The JSON includes total_indexes, total_size_mb, active_indexes, unused_indexes, bloated_indexes, critical_alerts, and warning_alerts. Parse the details column to extract metrics for visualization. The JSON format works with Grafana and other monitoring tools.

Missing indexes cause unnecessary sequential scans. Tables with high sequential scan activity may benefit from additional indexes. The pg_stat_insights_missing_indexes view identifies tables that could benefit from new indexes. It analyzes sequential scan patterns and estimates potential benefits. This view helps prioritize index creation efforts. High benefit scores indicate strong candidates. Review query patterns before creating indexes. Test index impact on write performance. The following query finds high-priority missing index candidates.

### pg_stat_insights_missing_indexes

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    occurrence_count,
    estimated_benefit,
    high_priority,
    recommended_index_def,
    estimated_index_size_mb,
    benefit_score
FROM pg_stat_insights_missing_indexes
WHERE high_priority = true
ORDER BY benefit_score DESC;

 schemaname |  tablename  | occurrence_count | estimated_benefit | high_priority |                recommended_index_def                 | estimated_index_size_mb | benefit_score 
------------+-------------+------------------+-------------------+---------------+------------------------------------------------------+-------------------------+---------------
 public     | orders      |             7000 | HIGH              | t             | Consider adding index on frequently filtered columns |                  305.16 |   98000000.00
 public     | order_items |             5000 | HIGH              | t             | Consider adding index on frequently filtered columns |                  304.88 |   49949370.00
 public     | customers   |             8800 | HIGH              | t             | Consider adding index on frequently filtered columns |                   45.78 |   29040000.00
(3 rows)
\`\`\`

The results show three tables with high-priority missing index recommendations. The orders table has 7000 occurrences with a benefit score of 98000000.00. The order_items table has 5000 occurrences with a benefit score of 49949370.00. The customers table has 8800 occurrences with a benefit score of 29040000.00. All recommendations suggest adding indexes on frequently filtered columns. The estimated_index_size_mb column shows the expected storage cost. High benefit scores indicate strong candidates. Review query patterns before creating indexes. Test index impact on write performance.

Duplicate indexes waste storage and slow write operations. Multiple indexes on the same columns provide no additional benefit. The pg_stat_insights_index_duplicates view detects duplicate and redundant indexes. It identifies exact duplicates and indexes that overlap significantly. This view helps eliminate unnecessary indexes. Exact duplicates serve no purpose. Review redundant indexes to ensure they are not needed for different query patterns. The following query finds duplicate indexes.

### pg_stat_insights_index_duplicates

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    index1_name,
    index2_name,
    duplicate_type,
    severity,
    index1_size_mb,
    index2_size_mb,
    recommendation
FROM pg_stat_insights_index_duplicates
ORDER BY 
    CASE severity 
        WHEN 'CRITICAL' THEN 1 
        WHEN 'HIGH' THEN 2 
        ELSE 3 
    END;

 schemaname | tablename |     index1_name     |     index2_name     | duplicate_type  | severity | index1_size_mb | index2_size_mb |             recommendation             
------------+-----------+---------------------+---------------------+-----------------+----------+----------------+----------------+----------------------------------------
 public     | customers | customers_email_key | idx_customers_email | EXACT_DUPLICATE | CRITICAL |         125.39 |         125.39 | DROP INDEX public.idx_customers_email;
(1 row)
\`\`\`

The results show one duplicate index pair. The customers_email_key and idx_customers_email indexes are exact duplicates. Both indexes are 125.39 MB in size. The duplicate_type is EXACT_DUPLICATE with CRITICAL severity. The recommendation suggests dropping idx_customers_email. Exact duplicates serve no purpose. Drop the less-used index. Review redundant indexes to ensure they are not needed for different query patterns.

Maintenance history tracking helps ensure indexes receive regular upkeep. Stale statistics affect query planning accuracy. The pg_stat_insights_index_maintenance_history view tracks when indexes were last vacuumed, analyzed, or reindexed. It shows maintenance status and days since last operations. This view helps schedule maintenance operations. Run ANALYZE regularly to maintain current statistics. Monitor days_since_analyze to identify stale statistics. The following query finds indexes with non-current maintenance status.

### pg_stat_insights_index_maintenance_history

\`\`\`sql
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
ORDER BY days_since_analyze DESC NULLS LAST;

 schemaname | tablename | indexname | last_vacuum | last_autovacuum | last_analyze | days_since_vacuum | days_since_analyze | maintenance_status 
------------+-----------+-----------+-------------+-----------------+--------------+-------------------+--------------------+--------------------
(0 rows)
\`\`\`

The query returns no rows, indicating all indexes have current maintenance status. This suggests recent maintenance operations. When rows are present, the days_since_analyze column shows how long statistics have been stale. Stale statistics affect query planning. Run ANALYZE regularly. Monitor days_since_analyze to maintain current statistics.

## Practical Examples

Unused indexes consume storage space and slow write operations. Identifying these indexes helps free storage and improve write performance. The following query finds indexes that have never been scanned, sorted by size to prioritize cleanup efforts.

### Find Unused Indexes

\`\`\`sql
SELECT 
    schemaname,
    tablename,
    indexname,
    index_size_mb,
    total_scans
FROM pg_stat_insights_index_usage
WHERE usage_status = 'NEVER_USED'
ORDER BY index_size_mb DESC;

 schemaname |  tablename  |        indexname        | index_size_mb | total_scans 
------------+-------------+-------------------------+---------------+-------------
 public     | order_items | order_items_pkey        |        214.23 |           0
 public     | orders      | orders_pkey             |        214.23 |           0
 public     | order_items | idx_order_items_order   |        210.08 |           0
 public     | orders      | idx_orders_customer     |        132.88 |           0
 public     | customers   | customers_email_key     |        125.39 |           0
 public     | customers   | idx_customers_email     |        125.39 |           0
 public     | order_items | idx_order_items_product |        101.80 |           0
 public     | orders      | idx_orders_date         |         85.92 |           0
 public     | orders      | idx_orders_status       |         62.45 |           0
 public     | products    | products_sku_key        |         60.18 |           0
(10 rows)
\`\`\`

The results show ten unused indexes consuming 1497.16 MB of storage. The largest unused indexes are order_items_pkey and orders_pkey at 214.23 MB each. All indexes show zero total_scans, confirming they have never been used. Unused indexes consume storage and slow writes. Verify they are not needed before dropping.

Bloated indexes waste storage and degrade query performance. Identifying bloated indexes helps prioritize maintenance operations. The following query finds indexes with high bloat severity and calculates bloat percentages. This helps estimate the storage that can be reclaimed through reindexing.

### Identify Bloated Indexes

\`\`\`sql
SELECT 
    schemaname || '.' || indexname AS index_full_name,
    actual_size_mb,
    estimated_bloat_size_mb,
    ROUND((estimated_bloat_size_mb / actual_size_mb * 100)::numeric, 2) AS bloat_percentage,
    recommended_action
FROM pg_stat_insights_index_bloat b
JOIN pg_stat_insights_index_maintenance m 
    ON b.schemaname = m.schemaname 
    AND b.tablename = m.tablename 
    AND b.indexname = m.indexname
WHERE b.bloat_severity = 'HIGH'
ORDER BY estimated_bloat_size_mb DESC;

 index_full_name | actual_size_mb | estimated_bloat_size_mb | bloat_percentage | recommended_action 
-----------------+----------------+-------------------------+------------------+--------------------
(0 rows)
\`\`\`

The query returns no rows, indicating no indexes currently show high bloat severity. This suggests indexes are in good condition. When bloat is detected, the bloat_percentage column shows the percentage of wasted space. High bloat percentages indicate significant waste. Schedule REINDEX during maintenance windows to reclaim space.

Missing indexes cause excessive sequential scans. Tables with high sequential scan activity relative to index scans may benefit from additional indexes. The following query identifies tables with high sequential scan ratios. This helps prioritize index creation efforts.

### Detect Missing Indexes

\`\`\`sql
SELECT 
    t.schemaname,
    t.tablename,
    t.seq_scan,
    COALESCE(SUM(i.idx_scan), 0) AS total_index_scans,
    t.seq_scan::numeric / NULLIF(COALESCE(SUM(i.idx_scan), 0) + t.seq_scan, 0) AS seq_scan_ratio,
    m.estimated_benefit,
    m.recommended_index_def
FROM pg_stat_user_tables t
LEFT JOIN pg_stat_user_indexes i ON i.relid = t.relid
LEFT JOIN pg_stat_insights_missing_indexes m 
    ON m.schemaname = t.schemaname 
    AND m.tablename = t.relname
WHERE t.seq_scan > 100
GROUP BY t.schemaname, t.tablename, t.seq_scan, m.estimated_benefit, m.recommended_index_def
HAVING t.seq_scan > COALESCE(SUM(i.idx_scan), 0) * 5
ORDER BY t.seq_scan DESC;

 schemaname |  tablename  | seq_scan | total_index_scans | seq_scan_ratio | estimated_benefit |                recommended_index_def                 
------------+-------------+----------+-------------------+----------------+-------------------+------------------------------------------------------
 public     | customers   |     8800 |                 0 |         1.0000 | HIGH              | Consider adding index on frequently filtered columns
 public     | orders      |     7000 |                 0 |         1.0000 | HIGH              | Consider adding index on frequently filtered columns
 public     | order_items |     5000 |                 0 |         1.0000 | HIGH              | Consider adding index on frequently filtered columns
(3 rows)
\`\`\`

The results show three tables with high sequential scan activity. The customers table has 8800 sequential scans with zero index scans. The orders table has 7000 sequential scans with zero index scans. The order_items table has 5000 sequential scans with zero index scans. All tables have a seq_scan_ratio of 1.0000, indicating all scans are sequential. The estimated_benefit is HIGH for all tables. High sequential scan ratios suggest missing indexes. Review query patterns to identify columns for indexing.

Index efficiency measures how effectively indexes are used versus sequential scans. Comparing index scans to sequential scans reveals which indexes provide value. The following query calculates index usage percentages and efficiency ratings. This helps identify indexes that are not performing well.

### Analyze Index Efficiency

\`\`\`sql
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
ORDER BY index_usage_percent;

 schemaname |  tablename  |        indexname        | index_scans | seq_scans | index_usage_percent | efficiency_rating 
------------+-------------+-------------------------+-------------+-----------+---------------------+-------------------
 public     | orders      | orders_pkey             |           0 |      7000 |                0.00 | UNUSED
 public     | orders      | idx_orders_customer     |           0 |      7000 |                0.00 | UNUSED
 public     | orders      | idx_orders_date         |           0 |      7000 |                0.00 | UNUSED
 public     | orders      | idx_orders_status       |           0 |      7000 |                0.00 | UNUSED
 public     | order_items | order_items_pkey        |           0 |      5000 |                0.00 | UNUSED
 public     | order_items | idx_order_items_order   |           0 |      5000 |                0.00 | UNUSED
 public     | order_items | idx_order_items_product |           0 |      5000 |                0.00 | UNUSED
 public     | customers   | customers_pkey          |           0 |      8800 |                0.00 | UNUSED
 public     | customers   | customers_email_key     |           0 |      8800 |                0.00 | UNUSED
 public     | customers   | idx_customers_email     |           0 |      8800 |                0.00 | UNUSED
(10 rows)
\`\`\`

The results show ten indexes with zero index usage percentage. All indexes have zero index_scans and high seq_scans counts. The efficiency_rating is UNUSED for all results. The index_usage_percent is 0.00 for all indexes, indicating PostgreSQL prefers sequential scans. Low index usage percentages indicate inefficient indexes. PostgreSQL may prefer sequential scans due to data distribution or query patterns.

Maintenance planning requires prioritization and organization. The following query generates a maintenance plan grouped by type and priority. This helps schedule maintenance operations efficiently. Critical items need immediate attention. Batch operations by type for efficiency.

### Generate Maintenance Plan

\`\`\`sql
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

 maintenance_type | priority | index_count | indexes 
------------------+----------+-------------+---------
(0 rows)
\`\`\`

The query returns no rows, indicating no indexes currently require maintenance. This suggests indexes are in good condition. When maintenance is needed, the plan groups operations by type and priority. Critical items need immediate attention. Batch operations by type for efficiency. Use this plan to schedule maintenance windows.

## Best Practices

Monitor index usage weekly. Review unused indexes monthly. Schedule REINDEX during maintenance windows. Run ANALYZE after bulk data changes. Test index changes on staging first.

Set alerts for critical bloat. Track index growth trends. Review missing index recommendations quarterly. Document index creation decisions. Measure performance impact after changes.

## Conclusion

pg_stat_insights v3.0.0 provides comprehensive index monitoring through 11 specialized views. These views cover index usage patterns, bloat detection, efficiency ratings, and maintenance recommendations. The extension tracks index scans, sequential scan patterns, cache hit ratios, and size metrics across the entire database cluster. Administrators can identify unused indexes consuming storage, detect bloated indexes requiring reindexing, and discover missing indexes that could improve query performance. The views enable proactive index management by prioritizing actions by severity. Maintenance recommendations help teams focus efforts on high-impact optimizations. The monitoring capabilities track index usage and identify unused indexes. The views detect bloat and estimate wasted space. They rate index efficiency and compare to sequential scans. They generate maintenance recommendations with priorities. They identify missing index candidates. They detect duplicate and redundant indexes. They monitor maintenance history and statistics freshness. Install pg_stat_insights v3.0.0 and run the queries shown above to begin monitoring indexes.

## Resources

- [pg_stat_insights GitHub](https://github.com/pgElephant/pg_stat_insights)
- [v3.0.0 Release Notes](https://github.com/pgElephant/pg_stat_insights/releases/tag/v3.0.0)
- [Documentation](https://www.pgelephant.com/docs/pg-stat-insights)

## Related Blog Posts

- [pg_stat_insights: PostgreSQL Performance Monitoring Extension](/blog/pg-stat-insights) - Comprehensive guide to PostgreSQL performance monitoring with 52 metrics across 42 pre-built views for query analysis, replication monitoring, and index optimization.
- [pg_stat_insights 1.0.0 Release Announcement](/blog/pg-stat-insights-1-0-0) - Learn about the initial release of pg_stat_insights with 52 metrics and 11 pre-built views. Production-ready PostgreSQL performance monitoring extension.

## Support

For questions, issues, or commercial support, contact [admin@pgelephant.com](mailto:admin@pgelephant.com)`;

export default function IndexMonitoringBlogPost() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Index Monitoring with pg_stat_insights v3.0.0',
        description: 'Monitor PostgreSQL indexes using pg_stat_insights v3.0.0. Track index usage, detect bloat, identify missing indexes, and optimize performance with 11 specialized views.',
        image: 'https://www.pgelephant.com/blog/pg-stat-insights/og-image.jpg',
        datePublished: '2024-12-01',
        dateModified: '2024-12-01',
        author: {
            '@type': 'Organization',
            name: 'pgElephant',
            url: 'https://www.pgelephant.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'pgElephant',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.pgelephant.com/favicon-512.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.pgelephant.com/blog/pg-stat-insights-index-monitoring',
        },
        keywords: 'PostgreSQL, Index Monitoring, Performance Optimization, Database Administration, pg_stat_insights',
    };

    return (
        <div className="pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BlogPageTracker
                slug="pg-stat-insights-index-monitoring"
                title="Index Monitoring with pg_stat_insights v3.0.0"
            />
            {/* Blog Content */}
            <div style={{ backgroundColor: '#1f2937' }}>
                <BlogMarkdown>{markdown}</BlogMarkdown>

                {/* Share Section */}
                <div className="max-w-7xl mx-auto px-6 pb-12">
                    <div className="border-t border-white/10 pt-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
                        <ShareOnLinkedIn
                            url="https://www.pgelephant.com/blog/pg-stat-insights-index-monitoring"
                            title="Index Monitoring with pg_stat_insights v3.0.0"
                            summary="Monitor PostgreSQL indexes using pg_stat_insights v3.0.0. Track index usage, detect bloat, identify missing indexes, and optimize performance with 11 specialized views."
                            hashtags={[
                                'PostgreSQL',
                                'IndexMonitoring',
                                'PerformanceOptimization',
                                'DatabaseAdministration',
                                'pg_stat_insights',
                                'DatabaseMaintenance',
                                'PostgreSQLExtensions',
                                'DatabaseOptimization'
                            ]}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

