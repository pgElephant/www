import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

export const metadata = {
    title: 'pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack',
    description: 'How pgBalancer and pg_stat_insights work together to provide intelligent connection pooling, AI-powered load balancing, and comprehensive performance monitoring for PostgreSQL clusters.',
    openGraph: {
        title: 'pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack',
        description: 'AI Load Balancing Meets Performance Analytics - Intelligent Pooling with 52 Metrics Monitoring',
        images: ['/blog/pgbalancer-pg-stat-insights/og-image.jpg?v=1'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack',
        description: 'AI Load Balancing Meets Performance Analytics - Intelligent Pooling with 52 Metrics Monitoring',
        images: ['/blog/pgbalancer-pg-stat-insights/og-image.jpg?v=1'],
    },
};

const markdown = `![pgBalancer + pg_stat_insights blog header](/blog/pgbalancer-pg-stat-insights/header.svg?v=1)

# pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack

📦 **[pgBalancer on GitHub](https://github.com/pgElephant/pgbalancer)** | 📦 **[pg_stat_insights on GitHub](https://github.com/pgElephant/pg_stat_insights)** | 📖 **[pgBalancer Documentation](https://www.pgelephant.com/docs/pgbalancer)** | 📖 **[pg_stat_insights Documentation](https://www.pgelephant.com/docs/pg-stat-insights)**

## Executive Summary

Modern PostgreSQL deployments require both intelligent connection management and comprehensive performance visibility. **pgBalancer** provides AI-powered connection pooling with machine learning load balancing, while **pg_stat_insights** delivers deep performance analytics with 52 metrics across 42 pre-built views. Together, they form a complete performance stack that optimizes connection routing in real-time while providing unprecedented visibility into database performance, query patterns, and resource utilization.

## Introduction: The Performance Challenge

PostgreSQL applications face two fundamental challenges in production environments: efficiently managing thousands of concurrent connections and maintaining comprehensive visibility into database performance. Traditional connection poolers distribute load using simple round-robin or weighted algorithms, but they lack the intelligence to adapt to changing query patterns, backend health conditions, and workload characteristics. Similarly, while PostgreSQL provides basic statistics through pg_stat_statements and system catalogs, these native views lack the depth, categorization, and actionable insights needed for modern performance optimization.

This dual challenge creates a significant gap in production PostgreSQL deployments. Administrators struggle to understand why queries slow down during peak hours, cannot identify which backend nodes are optimal for specific query types, and lack the granular metrics needed to make data-driven optimization decisions. The absence of integrated monitoring and intelligent routing means that performance problems are discovered reactively rather than proactively, leading to degraded user experiences and costly incident response.

pgBalancer and pg_stat_insights solve these challenges by providing complementary capabilities that work seamlessly together. pgBalancer's machine learning algorithms continuously analyze query patterns, backend health, and response times to route queries optimally, while pg_stat_insights collects comprehensive performance data that enables administrators to understand query behavior, identify optimization opportunities, and validate that routing decisions are effective. This integration creates a feedback loop where routing intelligence improves over time based on actual performance data, and performance insights inform routing strategies.

## The Synergy: How They Work Together

The combination of pgBalancer and pg_stat_insights creates a powerful feedback loop that continuously optimizes database performance. pgBalancer makes intelligent routing decisions based on real-time health metrics, query complexity analysis, and historical patterns. pg_stat_insights collects detailed performance data from all backend nodes, providing the analytics needed to validate routing effectiveness and identify optimization opportunities.

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Client Applications                          │
│              (PostgreSQL wire protocol clients)                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    pgBalancer Layer                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         AI Load Balancing Engine                         │  │
│  │  • Query complexity analysis (0-100 scale)               │  │
│  │  • Backend health scoring (0.0-1.0)                      │  │
│  │  • Response time prediction                              │  │
│  │  • Adaptive learning (10% learning rate)                 │  │
│  │  • Exploration vs exploitation (20% exploration)         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Connection Pool Management                       │  │
│  │  • Session/transaction/statement pooling                 │  │
│  │  • 32 init children × 4 connections per child           │  │
│  │  • Automatic connection lifecycle management             │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Intelligent Query Routing
                         │ Based on ML Predictions
                         ▼
         ┌───────────────────────────────────────┐
         │                                       │
         ▼                                       ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  PostgreSQL      │  │  PostgreSQL      │  │  PostgreSQL      │
│  Primary (RW)    │  │  Standby 1 (RO)  │  │  Standby 2 (RO)  │
│                  │  │                  │  │                  │
│  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │
│  │ pg_stat_   │  │  │  │ pg_stat_   │  │  │  │ pg_stat_   │  │
│  │ insights   │  │  │  │ insights   │  │  │  │ insights   │  │
│  │ Extension  │  │  │  │ Extension  │  │  │  │ Extension  │  │
│  │            │  │  │  │            │  │  │  │            │  │
│  │ • 52       │  │  │  │ • 52       │  │  │  │ • 52       │  │
│  │   metrics  │  │  │  │   metrics  │  │  │  │   metrics  │  │
│  │ • 42 views │  │  │  │ • 42 views │  │  │  │ • 42 views │  │
│  │ • Query    │  │  │  │ • Query    │  │  │  │ • Query    │  │
│  │   analysis │  │  │  │   analysis │  │  │  │   analysis │  │
│  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                               ▼
         ┌───────────────────────────────────────┐
         │   Performance Data Aggregation        │
         │   • Query execution times             │
         │   • Cache hit ratios                  │
         │   • I/O patterns                      │
         │   • Replication lag                   │
         │   • Index usage statistics            │
         └───────────────────────────────────────┘
                               │
                               ▼
         ┌───────────────────────────────────────┐
         │   Analytics Feedback Loop             │
         │   • Validate routing effectiveness    │
         │   • Identify optimization opportunities│
         │   • Update ML model parameters        │
         │   • Adjust health scoring algorithms  │
         └───────────────────────────────────────┘
\`\`\`

### The Intelligent Feedback Loop

1. **Query Routing**: pgBalancer's AI engine analyzes incoming queries, predicts execution complexity, and selects optimal backends based on current health scores and predicted response times.

2. **Query Execution**: Selected backend nodes execute queries while pg_stat_insights tracks comprehensive performance metrics including execution time, I/O operations, cache efficiency, and WAL generation.

3. **Data Collection**: pg_stat_insights aggregates performance data across all backend nodes, providing unified visibility into query patterns, resource utilization, and optimization opportunities.

4. **Analytics**: Administrators query pg_stat_insights views to understand which queries are slow, which backends handle different query types best, and where optimization opportunities exist.

5. **Model Refinement**: pgBalancer's machine learning algorithms use actual performance data to refine predictions, adjust health scores, and improve routing decisions over time.

This feedback loop ensures that routing intelligence continuously improves based on real-world performance data, while performance insights guide strategic optimization decisions.

## pgBalancer: AI-Powered Connection Intelligence

pgBalancer transforms connection pooling from a simple resource management task into an intelligent routing system that adapts to workload characteristics and backend conditions in real-time. The machine learning engine at its core analyzes query patterns, predicts execution times, and continuously refines routing decisions based on actual performance outcomes.

### Machine Learning Load Balancing

pgBalancer's AI engine employs sophisticated algorithms to optimize query routing:

**Query Complexity Analysis**: The system parses incoming SQL queries to assess complexity on a 0-100 scale, considering factors such as the number of joins, subqueries, aggregation functions, and table sizes. Complex analytical queries that might benefit from specific backend characteristics are identified and routed accordingly.

**Health Scoring System**: Each backend node receives a continuous health score ranging from 0.0 to 1.0, calculated from multiple factors including average response time, current query count, success rate, error frequency, and predicted load. This score updates after every query execution, providing real-time adaptation to changing conditions.

**Response Time Prediction**: The AI engine uses historical data to predict query execution times for different backends, enabling proactive routing decisions that minimize latency. Predictions account for query complexity, current backend load, and historical performance patterns.

**Adaptive Learning**: The system employs a learning rate of 10% for continuous model refinement, meaning that 10% of routing decisions incorporate new information while 90% rely on established patterns. This balance prevents overfitting to recent anomalies while maintaining responsiveness to genuine changes in workload or backend characteristics.

**Exploration vs Exploitation**: pgBalancer uses a 20% exploration rate, meaning that 20% of queries are routed to explore alternative backends even when the current optimal choice seems clear. This exploration ensures that the system discovers new optimal routing patterns as workloads evolve and prevents getting trapped in local optima.

### REST API for Automation

pgBalancer's REST API provides programmatic access to cluster state and management functions, enabling automation and integration with monitoring systems. The API runs as a dedicated child process with sub-10ms response times, ensuring that monitoring and automation overhead remains minimal.

\`\`\`bash
# Get cluster status via REST API
curl -H "Authorization: Bearer \${JWT_TOKEN}" \\
     http://pgbalancer:8080/api/v1/status

{
  "cluster": {
    "total_nodes": 3,
    "healthy_nodes": 3,
    "primary_node": 0,
    "standby_nodes": [1, 2]
  },
  "connection_pools": {
    "active_connections": 124,
    "idle_connections": 45,
    "total_capacity": 128
  },
  "load_balancing": {
    "queries_routed": 1234567,
    "avg_routing_time_ms": 0.5,
    "exploration_rate": 0.2
  },
  "backend_health": [
    {
      "node_id": 0,
      "host": "primary.example.com",
      "port": 5432,
      "health_score": 0.98,
      "current_queries": 45,
      "avg_response_time_ms": 12.3,
      "status": "up"
    },
    {
      "node_id": 1,
      "host": "standby1.example.com",
      "port": 5432,
      "health_score": 0.95,
      "current_queries": 38,
      "avg_response_time_ms": 15.7,
      "status": "up"
    },
    {
      "node_id": 2,
      "host": "standby2.example.com",
      "port": 5432,
      "health_score": 0.97,
      "current_queries": 41,
      "avg_response_time_ms": 13.9,
      "status": "up"
    }
  ]
}
\`\`\`

The REST API enables monitoring systems to track cluster health, automation tools to adjust configuration dynamically, and alerting systems to detect anomalies and trigger responses.

### MQTT Event Streaming

For distributed deployments, pgBalancer publishes real-time events via MQTT, enabling integration with observability platforms and event-driven architectures. Events include node status changes, failover notifications, health check results, and routing decisions, providing comprehensive visibility into cluster operations.

\`\`\`yaml
MQTT Topics:
  pgbalancer/cluster/{node_id}/health     # Health check broadcasts
  pgbalancer/cluster/failover             # Failover event notifications
  pgbalancer/cluster/routing              # Query routing decisions
  pgbalancer/cluster/performance          # Performance metrics
\`\`\`

This event streaming capability enables real-time dashboards, automated alerting, and integration with existing MQTT-based infrastructure for comprehensive observability.

## pg_stat_insights: Comprehensive Performance Analytics

pg_stat_insights extends PostgreSQL's native statistics capabilities with 52 detailed metrics organized across 42 specialized views, providing unprecedented visibility into query execution, resource utilization, and optimization opportunities. The extension operates as a drop-in replacement for pg_stat_statements while providing significantly more depth and actionable insights.

### The 52 Metrics Architecture

pg_stat_insights tracks comprehensive metrics organized into eight major categories:

**Execution Metrics**: Detailed timing information including total, mean, min, max, and standard deviation for both planning and execution times, along with call counts, rows processed, and statistical distributions. This depth enables administrators to understand not just average performance but also variability and consistency.

**Buffer I/O Metrics**: Complete visibility into how queries interact with PostgreSQL's shared buffer cache, local buffers, and temporary files. The extension tracks hits, reads, dirtied blocks, and writes across all three buffer types, along with precise timing when I/O timing is enabled.

**WAL Statistics**: Write-ahead log generation tracked at the query level, including WAL records created, full page images written, total bytes generated, and instances where WAL buffers became full. This information is crucial for replication monitoring and capacity planning.

**JIT Compilation Metrics**: Detailed insights into PostgreSQL's Just-In-Time compilation system, tracking function compilation counts, generation time, inlining operations, optimization passes, code emission, and tuple deforming operations.

**Parallel Execution Metrics**: Tracking of planned versus actual parallel workers launched, enabling analysis of parallel query efficiency and identification of opportunities for parallelization.

**Metadata and Timestamps**: Query identification by user, database, and query ID, along with timestamps tracking when statistics collection began for each query pattern.

### Pre-Built Views for Instant Insights

The 42 specialized views are organized into distinct categories, each designed to answer specific performance questions without requiring complex SQL queries:

**Query Performance Views**: 
- \`pg_stat_insights\` - Main statistics view with all 52 metrics
- \`pg_stat_insights_top_by_time\` - Slowest queries by cumulative execution time
- \`pg_stat_insights_top_by_calls\` - Most frequently executed queries
- \`pg_stat_insights_slow_queries\` - Queries exceeding performance thresholds
- \`pg_stat_insights_cache_misses\` - Queries with poor cache performance
- \`pg_stat_insights_io_heavy\` - Highest I/O consumers
- \`pg_stat_insights_error_queries\` - Queries encountering execution errors

**Replication Monitoring Views**: 17 comprehensive views covering physical and logical replication scenarios, including health monitoring, bottleneck detection, performance ratings, WAL tracking, and threshold-based alerting.

**Index Analytics Views**: 11 specialized views tracking index usage, bloat detection, efficiency ratings, maintenance recommendations, missing index detection, and historical growth trends.

**Time-Series Views**: Hourly and daily bucket views enabling trend analysis, performance pattern identification, and anomaly detection over time.

### Response Time Categorization

pg_stat_insights automatically categorizes queries into six execution time buckets, enabling automatic SLA monitoring without custom queries:

- **Ultra-Fast** (<1ms): Simple indexed lookups and cached operations
- **Fast** (1-10ms): Basic joins and small aggregations
- **Normal** (10-100ms): Complex queries and medium aggregations
- **Slow** (100ms-1s): Large joins or full table scans
- **Very Slow** (1-10s): Heavy analytics or batch operations
- **Critical** (>10s): Queries requiring immediate attention

This categorization system provides instant visibility into query performance distribution and enables automatic alerting for queries violating performance thresholds.

## Integration Architecture: Complete Performance Stack

Combining pgBalancer and pg_stat_insights creates a unified performance management system where intelligent routing and comprehensive monitoring work together to optimize database performance continuously.

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    Production Architecture                      │
└─────────────────────────────────────────────────────────────────┘

Client Applications
       │
       │ PostgreSQL Protocol
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  pgBalancer (Port 5432)                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Connection Pooler (128 connections)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AI Load Balancer                                        │  │
│  │  • Query analysis → Backend selection                    │  │
│  │  • Health scoring → Routing optimization                 │  │
│  │  • Learning feedback → Model refinement                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  REST API (Port 8080)                                    │  │
│  │  • Cluster status                                        │  │
│  │  • Node management                                       │  │
│  │  • Health metrics                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MQTT Event Stream                                       │  │
│  │  • Routing decisions                                     │  │
│  │  • Health changes                                        │  │
│  │  • Performance events                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────┬──────────────┬──────────────┬───────────────────┘
              │              │              │
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ PostgreSQL  │  │ PostgreSQL  │  │ PostgreSQL  │
    │  Primary    │  │  Standby 1  │  │  Standby 2  │
    │  (RW)       │  │  (RO)       │  │  (RO)       │
    │             │  │             │  │             │
    │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
    │ │pg_stat_ │ │  │ │pg_stat_ │ │  │ │pg_stat_ │ │
    │ │insights │ │  │ │insights │ │  │ │insights │ │
    │ │         │ │  │ │         │ │  │ │         │ │
    │ │52       │ │  │ │52       │ │  │ │52       │ │
    │ │metrics  │ │  │ │metrics  │ │  │ │metrics  │ │
    │ │42 views │ │  │ │42 views │ │  │ │42 views │ │
    │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
           ┌────────────────────────────────┐
           │  Unified Performance Dashboard │
           │  • Aggregate metrics           │
           │  • Cross-node analytics        │
           │  • Routing validation          │
           │  • Optimization insights       │
           └────────────────────────────────┘
\`\`\`

### Query Flow with Integrated Monitoring

1. **Client Connection**: Application connects to pgBalancer on port 5432 using standard PostgreSQL protocol.

2. **Query Analysis**: pgBalancer's AI engine analyzes query complexity, predicts execution time, and evaluates backend health scores.

3. **Intelligent Routing**: Query is routed to optimal backend based on ML predictions, current load, and historical patterns.

4. **Query Execution**: Selected backend executes query while pg_stat_insights collects comprehensive performance metrics.

5. **Performance Tracking**: pg_stat_insights tracks execution time, I/O operations, cache efficiency, WAL generation, and all 52 metrics.

6. **Feedback Loop**: Performance data informs pgBalancer's learning algorithms, refining health scores and improving future routing decisions.

7. **Analytics**: Administrators query pg_stat_insights views across all backends to understand query patterns, validate routing effectiveness, and identify optimization opportunities.

## Installation and Configuration

### Installing pgBalancer

pgBalancer requires PostgreSQL 13+ with standard build tools. The installation process compiles both the connection pooler and AI engine components:

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pgbalancer.git
cd pgbalancer

# Generate configure script
autoreconf -fi

# Configure with SSL and PAM support
./configure --with-openssl --with-pam

# Build and install
make
sudo make install
\`\`\`

### Installing pg_stat_insights

pg_stat_insights requires PostgreSQL 14+ with development headers:

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pg_stat_insights.git
cd pg_stat_insights

# Build and install
make clean && make
sudo make install
\`\`\`

### Configuration: Complete Stack Setup

**Step 1: Configure pg_stat_insights on All Backends**

On each PostgreSQL backend node, add to \`postgresql.conf\`:

\`\`\`ini
# Load pg_stat_insights extension
shared_preload_libraries = 'pg_stat_insights'

# Configure monitoring parameters
pg_stat_insights.max_queries = 10000
pg_stat_insights.track_planning = on
pg_stat_insights.track_wal = on
pg_stat_insights.track_jit = on
pg_stat_insights.track_io_timing = on
pg_stat_insights.track_parallel_queries = on
pg_stat_insights.track_replication = on
pg_stat_insights.histogram_buckets = 10
\`\`\`

Restart PostgreSQL and create the extension on each backend:

\`\`\`sql
CREATE EXTENSION pg_stat_insights;
\`\`\`

**Step 2: Configure pgBalancer**

Create \`/etc/pgbalancer/pgbalancer.conf\`:

\`\`\`ini
# Connection settings
listen_addresses = '*'
port = 5432
socket_dir = '/tmp'

# Backend PostgreSQL servers with pg_stat_insights
backend_hostname0 = 'primary.example.com'
backend_port0 = 5432
backend_weight0 = 1
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = 'standby1.example.com'
backend_port1 = 5432
backend_weight1 = 1
backend_flag1 = 'ALLOW_TO_FAILOVER'

backend_hostname2 = 'standby2.example.com'
backend_port2 = 5432
backend_weight2 = 1
backend_flag2 = 'ALLOW_TO_FAILOVER'

# Connection pooling
num_init_children = 32
max_pool = 4
connection_cache = on

# AI Load Balancing
ai_load_balancing = on
ai_learning_rate = 0.01
ai_exploration_rate = 0.2
ai_health_weight = 0.4
ai_response_time_weight = 0.3
ai_load_weight = 0.3

# REST API
rest_api_enabled = on
rest_api_port = 8080
rest_api_jwt_secret = 'your-secret-key-change-this'

# MQTT Event Streaming
mqtt_enabled = on
mqtt_broker = 'mqtt.example.com'
mqtt_port = 1883
mqtt_topic_prefix = 'pgbalancer'

# Health checking
health_check_period = 30
health_check_timeout = 20
health_check_user = 'postgres'
health_check_database = 'postgres'
\`\`\`

**Step 3: Start pgBalancer**

\`\`\`bash
# Start pgBalancer
pgbalancer -D /etc/pgbalancer -f /etc/pgbalancer/pgbalancer.conf

# Verify it's running
psql -h localhost -p 5432 -U postgres -d postgres -c "SELECT version();"
\`\`\`

**Step 4: Verify Integration**

Check that pgBalancer can route queries and that pg_stat_insights is collecting data:

\`\`\`sql
-- Connect through pgBalancer
psql -h pgbalancer.example.com -p 5432 -U postgres -d mydb

-- Verify pg_stat_insights is collecting data
SELECT count(*) as tracked_queries 
FROM pg_stat_insights;

-- Check query routing via pgBalancer REST API
curl -H "Authorization: Bearer \${JWT_TOKEN}" \\
     http://pgbalancer.example.com:8080/api/v1/status | jq '.backend_health'
\`\`\`

## Practical Use Cases

### Use Case 1: Optimizing Query Routing Based on Performance Data

pg_stat_insights data can directly inform pgBalancer routing strategies. For example, if analytics reveal that complex analytical queries perform better on standby nodes with more memory, you can adjust pgBalancer's health scoring algorithm to weight memory utilization more heavily for such queries.

**Step 1: Identify Query Performance Patterns**

\`\`\`sql
-- Query executed on all backends to identify performance patterns
SELECT 
    query,
    mean_exec_time,
    shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0) as cache_hit_ratio,
    CASE 
        WHEN mean_exec_time > 1000 THEN 'analytical'
        WHEN mean_exec_time > 100 THEN 'complex'
        ELSE 'simple'
    END as query_type
FROM pg_stat_insights
WHERE calls > 100
ORDER BY mean_exec_time DESC
LIMIT 20;
\`\`\`

**Step 2: Adjust pgBalancer Configuration**

Based on insights, adjust AI parameters to optimize routing for identified patterns:

\`\`\`ini
# Increase response time weight for analytical queries
ai_response_time_weight = 0.5
ai_health_weight = 0.3
ai_load_weight = 0.2

# Enable query type detection for specialized routing
ai_query_complexity_threshold = 50
\`\`\`

**Step 3: Monitor Routing Effectiveness**

Use pg_stat_insights to validate that routing improvements are effective:

\`\`\`sql
-- Compare query performance before and after routing adjustments
SELECT 
    query,
    calls,
    mean_exec_time,
    stddev_exec_time,
    min_exec_time,
    max_exec_time
FROM pg_stat_insights
WHERE query LIKE '%SELECT COUNT%'  -- Analytical query pattern
ORDER BY mean_exec_time;
\`\`\`

### Use Case 2: Automated Health Scoring Based on Real Metrics

pg_stat_insights provides the actual performance data needed to validate and refine pgBalancer's health scoring system. Instead of relying solely on response times, you can incorporate cache hit ratios, I/O patterns, and replication lag into health calculations.

**Creating a Health Score Function**

\`\`\`sql
-- Create a function that calculates backend health based on pg_stat_insights data
CREATE OR REPLACE FUNCTION calculate_backend_health_score()
RETURNS TABLE (
    metric_category TEXT,
    score NUMERIC,
    recommendation TEXT
) AS \$\$
BEGIN
    RETURN QUERY
    SELECT 
        'Cache Efficiency'::TEXT,
        AVG(CASE 
            WHEN shared_blks_hit + shared_blks_read > 0 
            THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) 
            ELSE 0.5 
        END) * 100,
        CASE 
            WHEN AVG(CASE 
                WHEN shared_blks_hit + shared_blks_read > 0 
                THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) 
                ELSE 0.5 
            END) < 0.8 THEN 'Consider increasing shared_buffers'
            ELSE 'Cache efficiency is good'
        END
    FROM pg_stat_insights
    WHERE calls > 50;
    
    RETURN QUERY
    SELECT 
        'Query Performance'::TEXT,
        CASE 
            WHEN AVG(mean_exec_time) < 10 THEN 100
            WHEN AVG(mean_exec_time) < 50 THEN 80
            WHEN AVG(mean_exec_time) < 100 THEN 60
            WHEN AVG(mean_exec_time) < 500 THEN 40
            ELSE 20
        END,
        CASE 
            WHEN AVG(mean_exec_time) > 100 THEN 'Investigate slow queries'
            ELSE 'Query performance is acceptable'
        END
    FROM pg_stat_insights
    WHERE calls > 50;
END;
\$\$ LANGUAGE plpgsql;

-- Use the function to get health insights
SELECT * FROM calculate_backend_health_score();
\`\`\`

**Integrating Health Scores with pgBalancer**

The health scores calculated from pg_stat_insights can be periodically updated in pgBalancer's configuration or used to adjust AI algorithm parameters:

\`\`\`bash
# Script to update pgBalancer health weights based on pg_stat_insights data
#!/bin/bash

CACHE_SCORE=\$(psql -h localhost -p 5432 -U postgres -d mydb -t -c \\
    "SELECT AVG(CASE WHEN shared_blks_hit + shared_blks_read > 0 \\
    THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) \\
    ELSE 0.5 END) FROM pg_stat_insights WHERE calls > 50;")

# Adjust pgBalancer AI weights based on cache efficiency
if (( \$(echo "\$CACHE_SCORE < 0.8" | bc -l) )); then
    # Increase cache efficiency weight in routing decisions
    echo "Updating pgBalancer to prioritize cache-efficient backends"
    # Use pgBalancer REST API or configuration reload
fi
\`\`\`

### Use Case 3: Cross-Node Performance Comparison

With pg_stat_insights installed on all backend nodes, you can compare query performance across different nodes to validate that pgBalancer's routing decisions are optimal and identify nodes that excel at specific query types.

\`\`\`sql
-- Compare query performance across all backends
-- This query would be run on each backend and results aggregated

-- On Primary Node
SELECT 
    'primary' as node,
    query,
    calls,
    mean_exec_time,
    (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) as cache_hit_ratio
FROM pg_stat_insights
WHERE calls > 100
ORDER BY mean_exec_time DESC
LIMIT 10;

-- On Standby Nodes (similar queries)
-- Results can be compared to identify routing optimization opportunities

-- Aggregate comparison across all nodes
SELECT 
    query,
    COUNT(DISTINCT node) as nodes_executing,
    AVG(mean_exec_time) as avg_exec_time,
    MIN(mean_exec_time) as best_exec_time,
    MAX(mean_exec_time) as worst_exec_time,
    MAX(mean_exec_time) - MIN(mean_exec_time) as performance_variance
FROM (
    -- Results from each backend would be unioned here
    SELECT 'primary' as node, query, mean_exec_time FROM pg_stat_insights WHERE calls > 100
    UNION ALL
    SELECT 'standby1' as node, query, mean_exec_time FROM pg_stat_insights WHERE calls > 100
    UNION ALL
    SELECT 'standby2' as node, query, mean_exec_time FROM pg_stat_insights WHERE calls > 100
) combined_results
GROUP BY query
HAVING COUNT(DISTINCT node) > 1
ORDER BY performance_variance DESC;
\`\`\`

This analysis reveals which queries benefit from routing to specific backends, enabling pgBalancer's AI engine to make more informed routing decisions.

### Use Case 4: Real-Time Performance Dashboard Integration

Combining pgBalancer's REST API with pg_stat_insights data enables comprehensive real-time dashboards that show both routing decisions and actual query performance.

**Dashboard Query Combining Both Systems**

\`\`\`sql
-- Comprehensive performance dashboard query
WITH routing_stats AS (
    -- This would be populated from pgBalancer REST API or MQTT events
    SELECT 
        backend_node_id,
        queries_routed,
        avg_routing_time_ms,
        health_score
    FROM (
        VALUES 
            (0, 45231, 0.5, 0.98),
            (1, 38921, 0.6, 0.95),
            (2, 41234, 0.55, 0.97)
    ) AS t(backend_node_id, queries_routed, avg_routing_time_ms, health_score)
),
performance_stats AS (
    SELECT 
        query,
        calls,
        mean_exec_time,
        total_exec_time,
        (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) as cache_hit_ratio
    FROM pg_stat_insights
    WHERE calls > 50
)
SELECT 
    'Overall Performance' as metric_category,
    jsonb_build_object(
        'total_queries', (SELECT SUM(calls) FROM performance_stats),
        'avg_exec_time_ms', (SELECT AVG(mean_exec_time) FROM performance_stats),
        'total_exec_time_s', (SELECT SUM(total_exec_time) / 1000 FROM performance_stats),
        'avg_cache_hit_ratio', (SELECT AVG(cache_hit_ratio) FROM performance_stats),
        'routing_overhead_ms', (SELECT AVG(avg_routing_time_ms) FROM routing_stats),
        'backend_health_scores', (SELECT jsonb_agg(jsonb_build_object(
            'node_id', backend_node_id,
            'health_score', health_score,
            'queries_routed', queries_routed
        )) FROM routing_stats)
    ) as metrics;
\`\`\`

This query provides a unified view of both routing intelligence and actual performance, enabling administrators to validate that intelligent routing is delivering expected performance improvements.

## Advanced Integration Patterns

### Pattern 1: Dynamic Health Score Adjustment

pg_stat_insights can drive dynamic adjustment of pgBalancer's health scoring algorithm based on actual performance patterns:

\`\`\`sql
-- Function to calculate dynamic health weights based on performance data
CREATE OR REPLACE FUNCTION calculate_dynamic_health_weights()
RETURNS TABLE (
    health_weight NUMERIC,
    response_time_weight NUMERIC,
    load_weight NUMERIC
) AS \$\$
DECLARE
    cache_efficiency NUMERIC;
    avg_exec_time NUMERIC;
    query_variance NUMERIC;
BEGIN
    -- Calculate cache efficiency
    SELECT AVG(CASE 
        WHEN shared_blks_hit + shared_blks_read > 0 
        THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) 
        ELSE 0.5 
    END) INTO cache_efficiency
    FROM pg_stat_insights
    WHERE calls > 50;
    
    -- Calculate average execution time
    SELECT AVG(mean_exec_time) INTO avg_exec_time
    FROM pg_stat_insights
    WHERE calls > 50;
    
    -- Calculate query performance variance
    SELECT STDDEV(mean_exec_time) INTO query_variance
    FROM pg_stat_insights
    WHERE calls > 50;
    
    -- Adjust weights based on performance characteristics
    -- If cache efficiency is low, increase health weight (which considers cache)
    -- If execution times are high and variable, increase response time weight
    -- If variance is low, increase load weight for better distribution
    
    RETURN QUERY SELECT 
        CASE 
            WHEN cache_efficiency < 0.8 THEN 0.5
            ELSE 0.4
        END,
        CASE 
            WHEN avg_exec_time > 100 AND query_variance > 50 THEN 0.4
            ELSE 0.3
        END,
        CASE 
            WHEN query_variance < 20 THEN 0.3
            ELSE 0.2
        END;
END;
\$\$ LANGUAGE plpgsql;
\`\`\`

### Pattern 2: Query-Type-Specific Routing Rules

Using pg_stat_insights to identify query patterns, you can configure pgBalancer to apply specialized routing rules:

\`\`\`sql
-- Identify query types and their optimal backends
WITH query_analysis AS (
    SELECT 
        query,
        CASE 
            WHEN query ILIKE '%SELECT COUNT%' OR query ILIKE '%SUM%' OR query ILIKE '%AVG%' THEN 'analytical'
            WHEN query ILIKE '%INSERT%' OR query ILIKE '%UPDATE%' OR query ILIKE '%DELETE%' THEN 'write'
            WHEN query ILIKE '%SELECT%' AND mean_exec_time < 10 THEN 'simple_read'
            ELSE 'complex_read'
        END as query_type,
        mean_exec_time,
        calls,
        (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) as cache_hit_ratio
    FROM pg_stat_insights
    WHERE calls > 50
)
SELECT 
    query_type,
    COUNT(*) as query_count,
    AVG(mean_exec_time) as avg_exec_time,
    AVG(cache_hit_ratio) as avg_cache_hit,
    CASE 
        WHEN query_type = 'analytical' AND avg_cache_hit < 0.7 THEN 'Route to node with more memory'
        WHEN query_type = 'write' THEN 'Route to primary only'
        WHEN query_type = 'simple_read' THEN 'Route to any healthy standby'
        ELSE 'Use standard AI routing'
    END as routing_recommendation
FROM query_analysis
GROUP BY query_type;
\`\`\`

### Pattern 3: Automated Alerting Based on Performance Degradation

Combine pgBalancer's MQTT events with pg_stat_insights data to create automated alerting for performance issues:

\`\`\`sql
-- Function to detect performance degradation
CREATE OR REPLACE FUNCTION detect_performance_degradation()
RETURNS TABLE (
    alert_level TEXT,
    metric TEXT,
    current_value NUMERIC,
    threshold NUMERIC,
    recommendation TEXT
) AS \$\$
BEGIN
    -- Check for slow queries
    RETURN QUERY
    SELECT 
        CASE 
            WHEN mean_exec_time > 1000 THEN 'CRITICAL'
            WHEN mean_exec_time > 500 THEN 'WARNING'
            ELSE 'INFO'
        END,
        'Slow Query Detected'::TEXT,
        mean_exec_time,
        CASE 
            WHEN mean_exec_time > 1000 THEN 1000::NUMERIC
            ELSE 500::NUMERIC
        END,
        'Query: ' || LEFT(query, 100) || ' - Consider optimization or index creation'
    FROM pg_stat_insights
    WHERE calls > 10 
      AND mean_exec_time > 500
    ORDER BY mean_exec_time DESC
    LIMIT 5;
    
    -- Check for cache efficiency issues
    RETURN QUERY
    SELECT 
        CASE 
            WHEN cache_hit < 0.7 THEN 'WARNING'
            ELSE 'INFO'
        END,
        'Low Cache Hit Ratio'::TEXT,
        cache_hit * 100,
        70.0,
        'Consider increasing shared_buffers or optimizing query patterns'
    FROM (
        SELECT AVG(CASE 
            WHEN shared_blks_hit + shared_blks_read > 0 
            THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) 
            ELSE 0.5 
        END) as cache_hit
        FROM pg_stat_insights
        WHERE calls > 50
    ) cache_stats
    WHERE cache_hit < 0.7;
END;
\$\$ LANGUAGE plpgsql;
\`\`\`

## Performance Optimization Strategies

### Strategy 1: Cache-Aware Routing

Use pg_stat_insights cache hit ratio data to inform pgBalancer routing, prioritizing backends with better cache efficiency for frequently accessed data:

\`\`\`sql
-- Identify queries with poor cache performance that might benefit from different routing
SELECT 
    query,
    calls,
    mean_exec_time,
    (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) as cache_hit_ratio,
    shared_blks_read,
    CASE 
        WHEN (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) < 0.8 
             AND shared_blks_read > 1000 
        THEN 'Route to backend with larger shared_buffers'
        ELSE 'Current routing is acceptable'
    END as routing_suggestion
FROM pg_stat_insights
WHERE calls > 50
ORDER BY shared_blks_read DESC
LIMIT 20;
\`\`\`

### Strategy 2: Load-Based Backend Selection

Combine pg_stat_insights data with pgBalancer's load metrics to optimize routing for balanced resource utilization:

\`\`\`bash
# Script that combines pgBalancer REST API data with pg_stat_insights
#!/bin/bash

# Get current load from pgBalancer
BALANCER_STATUS=\$(curl -s -H "Authorization: Bearer \${JWT_TOKEN}" \\
    http://pgbalancer:8080/api/v1/status)

# Extract backend loads
BACKEND_LOADS=\$(echo "\$BALANCER_STATUS" | jq '.backend_health[] | {node_id, current_queries, health_score}')

# Get query execution times from pg_stat_insights
# (This would query each backend)
EXEC_TIMES=\$(psql -h localhost -p 5432 -U postgres -d mydb -t -c \\
    "SELECT AVG(mean_exec_time) FROM pg_stat_insights WHERE calls > 50;")

# Use this data to adjust pgBalancer's load weight parameter
# If execution times are high and loads are uneven, increase load_weight
\`\`\`

### Strategy 3: Query Complexity-Based Routing

Use pg_stat_insights to identify query complexity patterns and configure pgBalancer to route complex queries to backends optimized for analytical workloads:

\`\`\`sql
-- Analyze query complexity based on execution characteristics
SELECT 
    query,
    calls,
    mean_exec_time,
    stddev_exec_time,
    plans,
    CASE 
        WHEN plans::numeric / NULLIF(calls, 0) > 0.5 THEN 'High Planning Cost'
        WHEN mean_exec_time > 100 AND stddev_exec_time / NULLIF(mean_exec_time, 0) > 0.5 THEN 'Variable Performance'
        WHEN mean_exec_time > 500 THEN 'Heavy Computation'
        ELSE 'Standard Query'
    END as complexity_category,
    CASE 
        WHEN mean_exec_time > 500 THEN 'Consider routing to dedicated analytical backend'
        WHEN plans::numeric / NULLIF(calls, 0) > 0.5 THEN 'Consider connection pooling optimization'
        ELSE 'Current routing is appropriate'
    END as optimization_suggestion
FROM pg_stat_insights
WHERE calls > 20
ORDER BY mean_exec_time DESC
LIMIT 15;
\`\`\`

## Monitoring and Observability

### Comprehensive Monitoring Query

A unified query that combines pgBalancer routing metrics with pg_stat_insights performance data:

\`\`\`sql
-- Comprehensive monitoring dashboard
WITH performance_summary AS (
    SELECT 
        COUNT(*) as total_query_patterns,
        SUM(calls) as total_query_executions,
        AVG(mean_exec_time) as avg_execution_time,
        PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY mean_exec_time) as p95_execution_time,
        PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY mean_exec_time) as p99_execution_time,
        AVG(CASE 
            WHEN shared_blks_hit + shared_blks_read > 0 
            THEN (shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) 
            ELSE NULL 
        END) as avg_cache_hit_ratio,
        SUM(total_exec_time) / 1000 as total_execution_time_seconds
    FROM pg_stat_insights
    WHERE calls > 0
),
query_categories AS (
    SELECT 
        CASE 
            WHEN mean_exec_time < 1 THEN 'Ultra-Fast'
            WHEN mean_exec_time < 10 THEN 'Fast'
            WHEN mean_exec_time < 100 THEN 'Normal'
            WHEN mean_exec_time < 1000 THEN 'Slow'
            WHEN mean_exec_time < 10000 THEN 'Very Slow'
            ELSE 'Critical'
        END as category,
        COUNT(*) as query_count,
        SUM(calls) as total_calls,
        SUM(total_exec_time) / 1000 as total_time_seconds
    FROM pg_stat_insights
    WHERE calls > 0
    GROUP BY category
)
SELECT 
    'Performance Summary' as report_section,
    jsonb_build_object(
        'total_query_patterns', ps.total_query_patterns,
        'total_executions', ps.total_query_executions,
        'avg_execution_time_ms', ROUND(ps.avg_execution_time::numeric, 2),
        'p95_execution_time_ms', ROUND(ps.p95_execution_time::numeric, 2),
        'p99_execution_time_ms', ROUND(ps.p99_execution_time::numeric, 2),
        'avg_cache_hit_ratio', ROUND((ps.avg_cache_hit_ratio * 100)::numeric, 2),
        'total_execution_time_seconds', ROUND(ps.total_execution_time_seconds::numeric, 2),
        'query_categories', (
            SELECT jsonb_agg(jsonb_build_object(
                'category', category,
                'query_count', query_count,
                'total_calls', total_calls,
                'total_time_seconds', ROUND(total_time_seconds::numeric, 2)
            ))
            FROM query_categories
        )
    ) as metrics
FROM performance_summary ps;
\`\`\`

### Integration with Prometheus and Grafana

Both pgBalancer and pg_stat_insights can be integrated with Prometheus for comprehensive time-series monitoring:

**pgBalancer Metrics Export:**

\`\`\`bash
# pgBalancer exports metrics via REST API that can be scraped by Prometheus
# Example Prometheus scrape config:
scrape_configs:
  - job_name: 'pgbalancer'
    metrics_path: '/api/v1/metrics'
    static_configs:
      - targets: ['pgbalancer:8080']
    bearer_token: '\${JWT_TOKEN}'
\`\`\`

**pg_stat_insights Metrics Export:**

\`\`\`sql
-- Create a view that exports pg_stat_insights data in Prometheus format
CREATE OR REPLACE VIEW pg_stat_insights_prometheus AS
SELECT 
    'pg_stat_insights_calls' as metric_name,
    queryid::text as labels,
    calls::numeric as value,
    NOW() as timestamp
FROM pg_stat_insights
UNION ALL
SELECT 
    'pg_stat_insights_mean_exec_time_ms',
    queryid::text,
    mean_exec_time,
    NOW()
FROM pg_stat_insights
UNION ALL
SELECT 
    'pg_stat_insights_cache_hit_ratio',
    queryid::text,
    (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) * 100,
    NOW()
FROM pg_stat_insights
WHERE shared_blks_hit + shared_blks_read > 0;
\`\`\`

## Production Deployment Best Practices

### 1. Configuration Tuning for Production

**pgBalancer Production Configuration:**

\`\`\`ini
# Production-optimized pgBalancer configuration
num_init_children = 64              # Increased for higher concurrency
max_pool = 8                        # More connections per child
connection_cache = on
child_life_time = 300
child_max_connections = 0

# AI parameters tuned for production workloads
ai_load_balancing = on
ai_learning_rate = 0.01             # Conservative learning rate
ai_exploration_rate = 0.15          # Reduced exploration in production
ai_health_weight = 0.4
ai_response_time_weight = 0.35
ai_load_weight = 0.25

# Aggressive health checking for fast failover
health_check_period = 10
health_check_timeout = 5
health_check_max_retries = 3
health_check_retry_delay = 1

# REST API with proper security
rest_api_enabled = on
rest_api_port = 8080
rest_api_jwt_secret = '\${SECURE_RANDOM_SECRET}'
rest_api_jwt_expiry = 3600

# MQTT for observability
mqtt_enabled = on
mqtt_broker = 'mqtt.production.internal'
mqtt_port = 1883
mqtt_qos = 1                        # At-least-once delivery
mqtt_topic_prefix = 'pgbalancer/prod'
\`\`\`

**pg_stat_insights Production Configuration:**

\`\`\`ini
# Production-optimized pg_stat_insights configuration
pg_stat_insights.max_queries = 20000      # Higher limit for busy databases
pg_stat_insights.track_planning = on      # Enable for query optimization
pg_stat_insights.track_wal = on           # Essential for replication monitoring
pg_stat_insights.track_jit = on           # Monitor JIT effectiveness
pg_stat_insights.track_io_timing = off    # Disable if overhead is significant
pg_stat_insights.track_parallel_queries = on
pg_stat_insights.track_replication = on
pg_stat_insights.track_minmax_time = on
pg_stat_insights.track_level = 'top'      # Track only top-level queries
pg_stat_insights.histogram_buckets = 20   # More granular distribution
\`\`\`

### 2. Monitoring and Alerting Setup

**Key Metrics to Monitor:**

1. **pgBalancer Metrics:**
   - Query routing distribution across backends
   - Average routing decision time
   - Connection pool utilization
   - Backend health scores
   - Failover events

2. **pg_stat_insights Metrics:**
   - P95 and P99 query execution times
   - Cache hit ratios
   - Slow query counts
   - I/O-heavy queries
   - Replication lag

**Alerting Rules:**

\`\`\`yaml
# Example Prometheus alerting rules
groups:
  - name: pgbalancer
    rules:
      - alert: HighRoutingTime
        expr: pgbalancer_avg_routing_time_ms > 5
        for: 5m
        annotations:
          summary: "pgBalancer routing time is high"
      
      - alert: UnhealthyBackend
        expr: pgbalancer_backend_health_score < 0.7
        for: 2m
        annotations:
          summary: "Backend health score below threshold"
  
  - name: pg_stat_insights
    rules:
      - alert: SlowQueries
        expr: pg_stat_insights_mean_exec_time_ms > 1000
        for: 10m
        annotations:
          summary: "Queries exceeding 1 second execution time"
      
      - alert: LowCacheHitRatio
        expr: pg_stat_insights_cache_hit_ratio < 80
        for: 15m
        annotations:
          summary: "Cache hit ratio below 80%"
\`\`\`

### 3. Capacity Planning

Use pg_stat_insights data to plan pgBalancer capacity:

\`\`\`sql
-- Capacity planning query
SELECT 
    'Connection Pool Sizing' as planning_category,
    jsonb_build_object(
        'current_max_connections', (
            SELECT SUM(max_pool * num_init_children) 
            FROM pgbalancer_config  -- Hypothetical config table
        ),
        'recommended_connections', (
            SELECT CEIL(MAX(concurrent_queries) * 1.2)
            FROM (
                SELECT 
                    COUNT(*) as concurrent_queries,
                    time_bucket('1 minute', query_start_time) as minute
                FROM pg_stat_activity
                WHERE state = 'active'
                GROUP BY minute
                ORDER BY concurrent_queries DESC
                LIMIT 1
            ) peak_concurrency
        ),
        'current_peak_utilization', (
            SELECT MAX(concurrent_queries)::numeric / 
                   (SELECT SUM(max_pool * num_init_children) FROM pgbalancer_config) * 100
            FROM (
                SELECT COUNT(*) as concurrent_queries
                FROM pg_stat_activity
                WHERE state = 'active'
                GROUP BY time_bucket('1 minute', query_start_time)
            ) utilization
        )
    ) as recommendations;
\`\`\`

## Troubleshooting Common Issues

### Issue 1: Queries Routed to Suboptimal Backends

**Symptoms:** Some queries perform poorly even though other backends might handle them better.

**Diagnosis:**

\`\`\`sql
-- Compare query performance across backends
-- Run this query on each backend and compare results
SELECT 
    query,
    calls,
    mean_exec_time,
    (shared_blks_hit::numeric / NULLIF(shared_blks_hit + shared_blks_read, 0)) as cache_hit_ratio
FROM pg_stat_insights
WHERE query LIKE '%problematic_query_pattern%'
ORDER BY mean_exec_time DESC;
\`\`\`

**Solution:** Adjust pgBalancer's AI parameters or increase exploration rate to discover better routing patterns:

\`\`\`ini
# Increase exploration to discover optimal routing
ai_exploration_rate = 0.25
ai_learning_rate = 0.015
\`\`\`

### Issue 2: High Connection Pool Utilization

**Symptoms:** Connection pool frequently exhausted, causing connection errors.

**Diagnosis:**

\`\`\`bash
# Check pgBalancer connection pool status
curl -H "Authorization: Bearer \${JWT_TOKEN}" \\
     http://pgbalancer:8080/api/v1/health/stats | jq '.connection_pools'
\`\`\`

**Solution:** Increase pool size or optimize connection lifecycle:

\`\`\`ini
# Increase connection pool capacity
num_init_children = 64    # Increase from 32
max_pool = 8              # Increase from 4

# Optimize connection lifecycle
child_life_time = 600     # Keep connections longer
connection_cache = on
reset_query_list = 'ABORT; DISCARD ALL'
\`\`\`

### Issue 3: Performance Degradation Over Time

**Symptoms:** Query performance gradually degrades despite no schema or workload changes.

**Diagnosis:**

\`\`\`sql
-- Check for query plan instability
SELECT 
    query,
    plans,
    calls,
    (plans::numeric / NULLIF(calls, 0)) as plan_ratio,
    mean_exec_time,
    stddev_exec_time
FROM pg_stat_insights
WHERE plans > 0
  AND (plans::numeric / NULLIF(calls, 0)) > 0.1
ORDER BY plan_ratio DESC
LIMIT 20;
\`\`\`

**Solution:** Address plan instability and consider pgBalancer configuration adjustments:

\`\`\`sql
-- Enable plan stability features
ALTER SYSTEM SET plan_cache_mode = 'force_custom_plan';
-- Or force generic plans for stable queries
ALTER SYSTEM SET plan_cache_mode = 'force_generic_plan';

SELECT pg_reload_conf();
\`\`\`

## Conclusion

The combination of pgBalancer and pg_stat_insights creates a complete PostgreSQL performance stack that provides both intelligent connection management and comprehensive performance visibility. pgBalancer's AI-powered routing continuously optimizes query distribution based on real-time backend health and predicted performance, while pg_stat_insights delivers deep analytics that enable administrators to understand query behavior, validate routing effectiveness, and identify optimization opportunities.

### Key Advantages of the Integrated Stack

**Intelligent Routing**: pgBalancer's machine learning algorithms adapt to workload patterns, backend health, and query characteristics, ensuring optimal query distribution without manual intervention.

**Comprehensive Monitoring**: pg_stat_insights provides 52 metrics across 42 specialized views, delivering unprecedented visibility into query execution, resource utilization, and optimization opportunities.

**Feedback Loop**: The integration creates a continuous improvement cycle where routing intelligence improves based on actual performance data, and performance insights inform routing strategies.

**Production Ready**: Both tools are battle-tested in production environments, providing reliability, performance, and comprehensive documentation for successful deployment.

**Unified Observability**: REST API, MQTT events, and SQL views provide multiple integration points for monitoring systems, dashboards, and automation tools.

### Getting Started

1. **Install pg_stat_insights** on all PostgreSQL backend nodes
2. **Install and configure pgBalancer** with AI load balancing enabled
3. **Verify integration** by checking that queries route correctly and metrics collect properly
4. **Monitor performance** using pg_stat_insights views to validate routing effectiveness
5. **Iterate and optimize** based on performance insights to continuously improve routing decisions

Whether you're running a small PostgreSQL cluster or managing enterprise-scale database infrastructure, pgBalancer and pg_stat_insights provide the intelligent routing and comprehensive monitoring needed to achieve optimal performance, reliability, and operational efficiency.

## Resources and Community

- **pgBalancer GitHub**: https://github.com/pgElephant/pgbalancer
- **pg_stat_insights GitHub**: https://github.com/pgElephant/pg_stat_insights
- **pgBalancer Documentation**: https://www.pgelephant.com/docs/pgbalancer
- **pg_stat_insights Documentation**: https://www.pgelephant.com/docs/pg-stat-insights
- **Website**: https://pgelephant.com
- **License**: MIT (Open Source)

Join the community and start building more performant PostgreSQL infrastructure today!

---

*pgBalancer and pg_stat_insights are developed with care for the PostgreSQL community. pgBalancer: PostgreSQL 13-18 supported | pg_stat_insights: PostgreSQL 14-18 supported*

## Related Blog Posts

- [pgbalancer: AI-Powered PostgreSQL Connection Pooler](/blog/pgbalancer) - Learn about AI-powered connection pooling with machine learning load balancing, REST API management, and distributed MQTT coordination for PostgreSQL clusters.
- [pg_stat_insights: PostgreSQL Performance Monitoring Extension](/blog/pg-stat-insights) - Comprehensive guide to PostgreSQL performance monitoring with 52 metrics across 42 pre-built views for query analysis, replication monitoring, and index optimization.

## Support

For questions, issues, or commercial support, contact [admin@pgelephant.com](mailto:admin@pgelephant.com)`;

export default function PgbalancerPgStatInsightsBlogPost() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack',
        description: 'How pgBalancer and pg_stat_insights work together to provide intelligent connection pooling, AI-powered load balancing, and comprehensive performance monitoring for PostgreSQL clusters.',
        image: 'https://www.pgelephant.com/blog/pgbalancer-pg-stat-insights/og-image.jpg',
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
            '@id': 'https://www.pgelephant.com/blog/pgbalancer-pg-stat-insights',
        },
        keywords: 'PostgreSQL, Connection Pooling, Load Balancing, Performance Monitoring, AI, Machine Learning, pgBalancer, pg_stat_insights, Database Analytics',
    };

    return (
        <div className="pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BlogPageTracker
                slug="pgbalancer-pg-stat-insights"
                title="pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack"
            />
            {/* Blog Content */}
            <div style={{ backgroundColor: '#1f2937' }}>
                <BlogMarkdown>{markdown}</BlogMarkdown>

                {/* Share Section */}
                <div className="max-w-7xl mx-auto px-6 pb-12">
                    <div className="border-t border-white/10 pt-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
                        <ShareOnLinkedIn
                            url="https://pgelephant.com/blog/pgbalancer-pg-stat-insights"
                            title="🚀 pgBalancer + pg_stat_insights: Complete PostgreSQL Performance Stack"
                            summary="Combine AI-powered connection pooling with comprehensive performance analytics. Intelligent routing meets deep monitoring for optimal PostgreSQL performance. Production-ready stack with 52 metrics and machine learning load balancing."
                            hashtags={[
                                'PostgreSQL',
                                'ConnectionPooling',
                                'LoadBalancing',
                                'PerformanceMonitoring',
                                'MachineLearning',
                                'DatabaseAnalytics',
                                'pgBalancer',
                                'pg_stat_insights',
                                'pgElephant',
                                'DevOps',
                                'DatabaseEngineering',
                                'OpenSource',
                                'CloudNative',
                                'Observability',
                                'DatabasePerformance'
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
