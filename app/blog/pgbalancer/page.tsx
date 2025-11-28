import { BlogMarkdown } from '../../_components/BlogMarkdown';
import GiscusComments from '../../../components/GiscusComments';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';

export const metadata = {
  title: 'pgbalancer: AI-Powered PostgreSQL Connection Pooler',
  description: 'How pgbalancer brings intelligent load balancing, automatic failover, and modern API management to PostgreSQL connection pooling with machine learning optimization.',
  openGraph: {
    title: 'pgbalancer: AI-Powered PostgreSQL Connection Pooler',
    description: 'AI Load Balancing, REST API, MQTT Clustering - Modern PostgreSQL Connection Pooling',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgbalancer: AI-Powered PostgreSQL Connection Pooler',
    description: 'AI Load Balancing, REST API, MQTT Clustering - Modern PostgreSQL Connection Pooling',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
};

const markdown = `![pgbalancer blog header](/blog/pgbalancer/header.svg?v=7)

# pgbalancer: AI-Powered PostgreSQL Connection Pooler

📦 **[View on GitHub](https://github.com/pgElephant/pgbalancer)** | 📥 **[Download Latest Release](https://github.com/pgElephant/pgbalancer/releases)** | 📖 **[Documentation](https://www.pgelephant.com/docs/pgbalancer)**

## Executive Summary

PostgreSQL applications need efficient connection pooling to handle thousands of concurrent clients without overwhelming database servers. **pgbalancer** solves this by providing AI-powered connection pooling with machine learning load balancing, REST API management, and distributed MQTT coordination. Built as a modern evolution of pgpool-II, it adds intelligent query routing and contemporary DevOps-friendly tooling.

## Introduction

Database connections are expensive. Each connection consumes memory, CPU, and file descriptors. Applications scale to thousands of concurrent users. Direct database connections become a bottleneck.

Traditional connection poolers manage resources. They lack intelligence in query distribution. pgbalancer combines connection pooling with machine learning. It learns query patterns and optimizes backend selection in real-time.

## What Makes pgbalancer Different

### AI-Powered Load Balancing

pgbalancer uses machine learning to route queries:

- **Adaptive Learning**: Learns from query execution patterns and response times
- **Health Scoring**: Real-time backend scoring based on performance (0.0-1.0 scale)
- **Predictive Routing**: Forecasts query execution time and optimal backend selection
- **Weighted Selection**: Exploration vs exploitation strategy (20% exploration rate)

The AI engine tracks metrics for each backend node:
- Average response time
- Current load and query count
- Success/failure rates and error tracking
- Predicted load based on historical patterns
- Health scores updated after each query

### REST API

pgbalancer provides an HTTP/JSON API:

\`\`\`
POST   /api/v1/auth/login           # JWT authentication
GET    /api/v1/status               # Cluster status
GET    /api/v1/nodes                # Backend node list
POST   /api/v1/nodes/{id}/attach    # Node management
GET    /api/v1/health/stats         # Health metrics
POST   /api/v1/control/reload       # Configuration reload
\`\`\`

The REST API runs as a dedicated child process with under 10ms response time. It provides access to cluster state and management functions.

### MQTT Distributed Coordination

For multi-node deployments, pgbalancer uses MQTT for distributed coordination:

\`\`\`yaml
Topics:
  pgbalancer/cluster/health     # Health check broadcasts
  pgbalancer/cluster/failover   # Failover event notifications
  pgbalancer/cluster/config     # Configuration updates
\`\`\`

This enables:
- Automatic node discovery
- Coordinated failover across instances
- Real-time event streaming for monitoring
- Integration with existing MQTT infrastructure

### Professional CLI Tool (bctl)

The \`bctl\` command-line tool replaces multiple legacy pcp_* commands with a single unified interface:

\`\`\`bash
# Modern table output with box-drawing
bctl --table nodes

┌────┬──────────┬───────┬────────┬────────┬─────────┐
│ ID │ Host     │ Port  │ Status │ Weight │ Role    │
├────┼──────────┼───────┼────────┼────────┼─────────┤
│ 0  │ localhost│ 5433  │ up     │ 1.0    │ primary │
│ 1  │ localhost│ 5434  │ up     │ 1.0    │ standby │
│ 2  │ localhost│ 5435  │ up     │ 1.0    │ standby │
└────┴──────────┴───────┴────────┴────────┴─────────┘

# JSON output for scripting
bctl --json nodes | jq '.nodes[] | select(.status=="up")'

# Real-time cluster monitoring
bctl --verbose health
\`\`\`

## Core Architecture

### The Intelligence Layer

pgbalancer's machine learning engine sits between the connection pooler and backend databases:

\`\`\`
┌─────────────────────────────────────────┐
│         Client Applications             │
│      (PostgreSQL wire protocol)         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│         pgbalancer Main Process         │
│  ┌────────────────────────────────────┐ │
│  │    Connection Pool Management      │ │
│  │  • 32 init children (configurable) │ │
│  │  • 4 connections per child         │ │
│  │  • Session/transaction pooling     │ │
│  └────────────────────────────────────┘ │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│      AI Load Balancing Engine           │
│  ┌────────────────────────────────────┐ │
│  │  Query Analysis                    │ │
│  │  • Parse complexity (0-100 scale)  │ │
│  │  • Detect read/write operations    │ │
│  │  • Estimate row count              │ │
│  │  • Predict execution time          │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Backend Selection                 │ │
│  │  • Health scoring (0.0-1.0)        │ │
│  │  • Weighted random selection       │ │
│  │  • Exploration vs exploitation     │ │
│  │  • Load prediction                 │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Adaptive Learning                 │ │
│  │  • Learning rate: 10%              │ │
│  │  • Metric decay for freshness      │ │
│  │  • Continuous model updates        │ │
│  │  • Success rate tracking           │ │
│  └────────────────────────────────────┘ │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│       PostgreSQL Backend Nodes          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Primary  │  │ Standby 1│  │Standby2││
│  │ RW       │  │ RO       │  │ RO     ││
│  │ Health:1.0│ │Health:0.98│ │ Health:││
│  │          │  │          │  │  0.99  ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘

       ┌────────────┬────────────┐
       │            │            │
       ▼            ▼            ▼
  ┌─────────┐  ┌────────┐  ┌─────────┐
  │REST API │  │ MQTT   │  │ bctl    │
  │Port 8080│  │Events  │  │ CLI     │
  └─────────┘  └────────┘  └─────────┘
\`\`\`

### How It Works: The Query Lifecycle

1. **Connection Acceptance**: Client connects via PostgreSQL protocol
2. **Connection Pooling**: Reuse existing backend connection or create new
3. **Query Analysis**: AI parses query complexity and type (read/write)
4. **Backend Selection**: ML algorithm selects optimal backend based on:
   - Current health scores
   - Predicted response time
   - Backend load levels
   - Historical success rates
5. **Query Execution**: Forward query to selected backend
6. **Feedback Learning**: Update backend metrics based on actual performance
7. **Response Return**: Stream results back to client
8. **Connection Return**: Release connection back to pool

This cycle continuously improves routing decisions through machine learning feedback.

## Installation and Configuration

### Prerequisites

- PostgreSQL 13, 14, 15, 16, 17, or 18
- C compiler (gcc/clang)
- Standard build tools (autoconf, automake, libtool, make)

### Installation Steps

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pgbalancer.git
cd pgbalancer

# Generate configure script
autoreconf -fi

# Configure with options
./configure --with-openssl --with-pam

# Build and install
make
sudo make install
\`\`\`

### Basic Configuration

Create \`/etc/pgbalancer/pgbalancer.conf\`:

\`\`\`ini
# Connection settings
listen_addresses = '*'
port = 5432
socket_dir = '/tmp'
pcp_listen_addresses = '*'
pcp_port = 9898

# Backend PostgreSQL servers
backend_hostname0 = 'localhost'
backend_port0 = 5433
backend_weight0 = 1
backend_data_directory0 = '/usr/local/pgsql/data1'
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = 'localhost'
backend_port1 = 5434
backend_weight1 = 1
backend_data_directory1 = '/usr/local/pgsql/data2'
backend_flag1 = 'ALLOW_TO_FAILOVER'

backend_hostname2 = 'localhost'
backend_port2 = 5435
backend_weight2 = 1
backend_data_directory2 = '/usr/local/pgsql/data3'
backend_flag2 = 'ALLOW_TO_FAILOVER'

# Connection pooling
num_init_children = 32
max_pool = 4
child_life_time = 300
child_max_connections = 0
connection_cache = on
reset_query_list = 'ABORT; DISCARD ALL'

# Load balancing
load_balance_mode = on
ignore_leading_white_space = on

# Health checking
health_check_period = 30
health_check_timeout = 20
health_check_user = 'postgres'
health_check_password = 'postgres'
health_check_database = 'postgres'
health_check_max_retries = 3

# AI Load Balancing (NEW)
ai_load_balancing = on
ai_learning_rate = 0.01
ai_exploration_rate = 0.1
ai_health_weight = 0.4
ai_response_time_weight = 0.3
ai_load_weight = 0.3

# REST API Server (NEW)
rest_api_enabled = on
rest_api_port = 8080
rest_api_jwt_secret = 'your-secret-key-here'
rest_api_jwt_expiry = 3600

# MQTT Event Publishing (NEW)
mqtt_enabled = on
mqtt_broker = 'localhost'
mqtt_port = 1883
mqtt_client_id = 'pgbalancer'
mqtt_topic_prefix = 'pgbalancer'

# Watchdog
use_watchdog = on
wd_hostname = 'localhost'
wd_port = 9000
\`\`\`

### AI Configuration Parameters

The AI load balancing engine can be tuned via configuration:

**Learning Rate (0.0-1.0)**: Controls how quickly the model adapts to new data
- Default: \`0.01\` (1% adjustment per query)
- Higher values: Faster adaptation, less stability
- Lower values: More stability, slower adaptation

**Exploration Rate (0.0-1.0)**: Balances exploration vs exploitation
- Default: \`0.1\` (10% random selection for exploration)
- Higher values: More experimentation with different backends
- Lower values: More focus on best-performing backends

**Health Weight (0.0-1.0)**: Importance of backend health in selection
- Default: \`0.4\` (40% weight)
- Combined with response_time_weight and load_weight (must sum to 1.0)

## Additional Features

### Intelligent Query Cache

pgbalancer includes ML-driven query caching:

\`\`\`ini
# Query cache configuration
memory_cache_enabled = on
memqcache_method = 'shmem'
memqcache_total_size = 64MB
memqcache_max_num_cache = 1000000
memqcache_expire = 0
memqcache_cache_block_size = 1MB

# AI cache warming
ai_cache_warming = on
ai_cache_prefetch = on
\`\`\`

The AI engine:
- Learns which queries benefit from caching
- Predicts cache hit probability
- Automatically warms frequently accessed data
- Prefetches based on query patterns

### Automatic Failover

When a backend fails, pgbalancer handles it automatically:

\`\`\`ini
failover_on_backend_error = off
detach_false_primary = on
auto_failover = on
failover_command = '/usr/local/bin/failover.sh %d %h %p %D %M'
\`\`\`

Failover process:
1. **Detection**: Health check detects failed backend
2. **AI Updates**: AI immediately adjusts health score to 0.0
3. **Routing**: New queries automatically routed to healthy backends
4. **MQTT Event**: Publishes failover event to MQTT broker
5. **Recovery**: When backend returns, health gradually improves
6. **Reintegration**: Backend automatically rejoins rotation

### Watchdog Clustering

For multi-pgbalancer deployments:

\`\`\`ini
# Watchdog configuration
use_watchdog = on
wd_hostname = 'pgbalancer1'
wd_port = 9000
wd_priority = 1

# Other pgbalancer nodes
other_pgpool_hostname0 = 'pgbalancer2'
other_pgpool_port0 = 9999
other_wd_port0 = 9000

other_pgpool_hostname1 = 'pgbalancer3'
other_pgpool_port1 = 9999
other_wd_port1 = 9000

# Virtual IP
delegate_ip = '192.168.1.100'
if_up_cmd = '/usr/local/bin/if_up.sh'
if_down_cmd = '/usr/local/bin/if_down.sh'
\`\`\`

## REST API Usage

### Authentication (Optional JWT)

\`\`\`bash
# Get JWT token
curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"secret"}'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}

# Use token for authenticated requests
curl -H "Authorization: Bearer YOUR_TOKEN" \\
  http://localhost:8080/api/v1/status
\`\`\`

### Cluster Management

\`\`\`bash
# Get cluster status
curl http://localhost:8080/api/v1/status

# Response
{
  "status": "running",
  "uptime": 86400,
  "connections": 45,
  "nodes": 3,
  "healthy_nodes": 3,
  "ai_enabled": true
}

# List backend nodes
curl http://localhost:8080/api/v1/nodes | jq '.'

# Response
{
  "nodes": [
    {
      "id": 0,
      "host": "localhost",
      "port": 5433,
      "status": "up",
      "role": "primary",
      "weight": 1.0,
      "health_score": 1.0,
      "connections": 15,
      "queries": 1250,
      "avg_response_ms": 2.5
    },
    {
      "id": 1,
      "host": "localhost",
      "port": 5434,
      "status": "up",
      "role": "standby",
      "weight": 1.0,
      "health_score": 0.98,
      "connections": 12,
      "queries": 980,
      "avg_response_ms": 2.8
    },
    {
      "id": 2,
      "host": "localhost",
      "port": 5435,
      "status": "up",
      "role": "standby",
      "weight": 1.0,
      "health_score": 0.99,
      "connections": 13,
      "queries": 1050,
      "avg_response_ms": 2.6
    }
  ]
}

# Get health statistics
curl http://localhost:8080/api/v1/health/stats | jq '.'

# Attach a node
curl -X POST http://localhost:8080/api/v1/nodes/1/attach

# Reload configuration
curl -X POST http://localhost:8080/api/v1/control/reload
\`\`\`

### AI Statistics

\`\`\`bash
# Get AI model statistics
curl http://localhost:8080/api/v1/ai/stats | jq '.'

# Response
{
  "enabled": true,
  "learning_rate": 0.01,
  "exploration_rate": 0.1,
  "total_queries": 15280,
  "ai_routed_queries": 14752,
  "exploration_queries": 1528,
  "backends": [
    {
      "id": 0,
      "avg_response_time": 2.5,
      "current_load": 0.35,
      "total_queries": 5120,
      "successful_queries": 5098,
      "failed_queries": 22,
      "error_rate": 0.0043,
      "predicted_load": 0.33,
      "health_score": 1.0
    }
  ]
}
\`\`\`

## CLI Tool Usage

### Installation

The \`bctl\` tool is built with the main project:

\`\`\`bash
# Already installed with 'make install'
which bctl
# /usr/local/bin/bctl

# Check version
bctl --version
\`\`\`

### Basic Commands

\`\`\`bash
# Check cluster status
bctl status

# List nodes (default format)
bctl nodes

# List nodes with table format
bctl --table nodes

# List nodes with JSON output
bctl --json nodes

# Get node count
bctl nodes-count

# Attach a node
bctl nodes-attach 1

# Detach a node
bctl nodes-detach 1

# Promote a node to primary
bctl nodes-promote 2

# List processes
bctl processes

# Get health status
bctl health

# Reload configuration
bctl reload

# Watchdog status
bctl watchdog-status
\`\`\`

### Remote Management

\`\`\`bash
# Connect to remote pgbalancer instance
bctl -H pgbalancer1.example.com -p 8080 -U admin status

# Verbose output
bctl -v --table nodes

# JSON output for scripting
bctl --json nodes | jq '.nodes[] | select(.health_score > 0.9)'
\`\`\`

## MQTT Integration

### Subscribing to Events

\`\`\`bash
# Subscribe to all pgbalancer events
mosquitto_sub -h localhost -t 'pgbalancer/#' -v

# Subscribe to node status changes
mosquitto_sub -h localhost -t 'pgbalancer/nodes/status' -v

# Subscribe to failover events
mosquitto_sub -h localhost -t 'pgbalancer/cluster/failover' -v

# Subscribe to health checks
mosquitto_sub -h localhost -t 'pgbalancer/health' -v
\`\`\`

### Event Examples

**Node Status Change:**
\`\`\`json
{
  "event": "node_status_change",
  "timestamp": "2025-11-03T10:30:45Z",
  "node_id": 1,
  "old_status": "up",
  "new_status": "down",
  "reason": "health_check_timeout",
  "health_score": 0.0
}
\`\`\`

**Failover Event:**
\`\`\`json
{
  "event": "failover",
  "timestamp": "2025-11-03T10:30:46Z",
  "failed_node_id": 1,
  "new_primary_id": 2,
  "promotion_reason": "primary_failure",
  "cluster_status": "degraded"
}
\`\`\`

**Health Check Result:**
\`\`\`json
{
  "event": "health_check",
  "timestamp": "2025-11-03T10:31:00Z",
  "node_id": 0,
  "status": "healthy",
  "response_time_ms": 2.3,
  "health_score": 1.0,
  "connections": 15,
  "load": 0.35
}
\`\`\`

## Performance Optimization

### Connection Pool Tuning

\`\`\`ini
# Number of pre-forked child processes
num_init_children = 32

# Connections per child process
max_pool = 4

# Total connections = num_init_children × max_pool
# Example: 32 × 4 = 128 total backend connections

# Child process lifetime (seconds)
child_life_time = 300

# Maximum connections per child (0 = unlimited)
child_max_connections = 0

# Connection cache
connection_cache = on
\`\`\`

**Sizing Guidelines:**
- \`num_init_children\`: Set to expected concurrent sessions
- \`max_pool\`: Typically 2-4 connections per child
- Total connections should be < \`max_connections\` on PostgreSQL

### AI Performance Tuning

\`\`\`ini
# Fast adaptation for dynamic workloads
ai_learning_rate = 0.05
ai_exploration_rate = 0.15

# Stable performance for consistent workloads
ai_learning_rate = 0.01
ai_exploration_rate = 0.05

# Balanced (recommended starting point)
ai_learning_rate = 0.01
ai_exploration_rate = 0.1
\`\`\`

### Query Cache Optimization

\`\`\`ini
# Large cache for read-heavy workloads
memqcache_total_size = 128MB
memqcache_max_num_cache = 2000000

# Smaller cache for write-heavy workloads
memqcache_total_size = 32MB
memqcache_max_num_cache = 500000
\`\`\`

## Monitoring and Observability

### Prometheus Integration

pgbalancer exposes Prometheus metrics:

\`\`\`yaml
# Prometheus scrape configuration
scrape_configs:
  - job_name: 'pgbalancer'
    static_configs:
      - targets: ['localhost:9191']
\`\`\`

**Key Metrics:**
- \`pgbalancer_connections_total\`: Total active connections
- \`pgbalancer_queries_total\`: Total queries processed
- \`pgbalancer_backend_health_score\`: Backend health scores
- \`pgbalancer_query_response_time\`: Query response time histogram
- \`pgbalancer_ai_routing_decisions\`: AI routing decisions
- \`pgbalancer_cache_hits_total\`: Query cache hit rate

### Grafana Dashboard

Example Grafana queries:

\`\`\`promql
# Average response time per backend
avg(pgbalancer_query_response_time) by (backend_id)

# Health score over time
pgbalancer_backend_health_score

# Cache hit rate
rate(pgbalancer_cache_hits_total[5m]) / 
rate(pgbalancer_queries_total[5m])

# AI exploration vs exploitation ratio
rate(pgbalancer_ai_exploration_queries[5m]) / 
rate(pgbalancer_ai_routing_decisions[5m])
\`\`\`

## Comparison with Other Poolers

### pgbalancer vs pgpool-II

| Feature | pgbalancer | pgpool-II |
|---------|-----------|-----------|
| AI Load Balancing | ✅ Machine learning | ❌ Static algorithms |
| REST API | ✅ Full HTTP/JSON API | ⚠️ Binary PCP protocol |
| MQTT Clustering | ✅ Distributed events | ❌ None |
| CLI Tool | ✅ Unified bctl | ⚠️ Multiple pcp_* tools |
| JWT Authentication | ✅ HMAC-SHA256 | ❌ Password only |
| Predictive Routing | ✅ AI-powered | ❌ None |
| Health Scoring | ✅ 0.0-1.0 continuous | ⚠️ Binary up/down |
| Query Cache | ✅ AI-driven | ✅ Static |
| Performance | <0.5ms routing | ~1ms routing |

### pgbalancer vs PgBouncer

| Feature | pgbalancer | PgBouncer |
|---------|-----------|-----------|
| Connection Pooling | ✅ Advanced | ✅ Excellent |
| Load Balancing | ✅ AI-powered | ❌ None |
| Query Routing | ✅ Intelligent | ❌ None |
| Health Monitoring | ✅ Comprehensive | ⚠️ Basic |
| Failover | ✅ Automatic | ❌ Manual |
| REST API | ✅ Full API | ❌ None |
| Query Cache | ✅ AI-driven | ❌ None |
| Use Case | Full cluster | Connection pooling only |

### pgbalancer vs HAProxy

| Feature | pgbalancer | HAProxy |
|---------|-----------|----------|
| PostgreSQL Protocol | ✅ Native | ⚠️ TCP only |
| Load Balancing | ✅ AI query-aware | ⚠️ TCP-level |
| Connection Pooling | ✅ Built-in | ❌ None |
| Session Management | ✅ PostgreSQL-aware | ❌ Generic |
| Health Checks | ✅ PostgreSQL-specific | ⚠️ TCP/HTTP |
| Configuration | ✅ PostgreSQL-focused | ⚠️ Generic |

## Production Deployment

### High Availability Setup

Three-pgbalancer cluster with watchdog:

\`\`\`
                  ┌─────────────────┐
                  │  Virtual IP     │
                  │ 192.168.1.100   │
                  └────────┬────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐
    │pgbalancer1│    │pgbalancer2│    │pgbalancer3│
    │ Primary   │    │ Standby   │    │ Standby   │
    │ Priority:1│    │ Priority:2│    │ Priority:3│
    └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┬─────▼─────┬─────▼─────┐
        │ PostgreSQL│ PostgreSQL│ PostgreSQL│
        │  Primary  │ Standby 1 │ Standby 2 │
        └───────────┴───────────┴───────────┘
\`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM postgres:17

# Install dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    autoconf \\
    automake \\
    libtool \\
    postgresql-server-dev-17

# Build pgbalancer
COPY . /usr/src/pgbalancer
WORKDIR /usr/src/pgbalancer
RUN autoreconf -fi && \\
    ./configure --with-openssl && \\
    make && \\
    make install

# Copy configuration
COPY pgbalancer.conf /etc/pgbalancer/pgbalancer.conf

EXPOSE 5432 8080 9898 9000

CMD ["pgbalancer", "-f", "/etc/pgbalancer/pgbalancer.conf", "-n"]
\`\`\`

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  pgbalancer:
    build: .
    ports:
      - "5432:5432"   # PostgreSQL protocol
      - "8080:8080"   # REST API
      - "9898:9898"   # PCP protocol
      - "9000:9000"   # Watchdog
    environment:
      - AI_LEARNING_RATE=0.01
      - AI_EXPLORATION_RATE=0.1
      - MQTT_BROKER=mqtt-broker
    depends_on:
      - pg-primary
      - pg-replica1
      - pg-replica2
      - mqtt-broker
  
  pg-primary:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
      - "5433:5432"
  
  pg-replica1:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
      - "5434:5432"
  
  pg-replica2:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
      - "5435:5432"
  
  mqtt-broker:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
\`\`\`

## Troubleshooting

### Common Issues

**Connection Refused:**
\`\`\`bash
# Check if pgbalancer is running
ps aux | grep pgbalancer

# Check listen address configuration
grep listen_addresses /etc/pgbalancer/pgbalancer.conf

# Verify port is listening
netstat -tlnp | grep 5432
\`\`\`

**Backend Connection Failures:**
\`\`\`bash
# Check backend health
bctl --table nodes

# View health check logs
tail -f /var/log/pgbalancer/pgbalancer.log | grep health_check

# Test direct backend connection
psql -h localhost -p 5433 -U postgres
\`\`\`

**AI Not Working:**
\`\`\`bash
# Verify AI is enabled
grep ai_load_balancing /etc/pgbalancer/pgbalancer.conf

# Check AI statistics via REST API
curl http://localhost:8080/api/v1/ai/stats | jq '.enabled'

# View AI routing decisions in logs
tail -f /var/log/pgbalancer/pgbalancer.log | grep "AI routing"
\`\`\`

**REST API Not Responding:**
\`\`\`bash
# Check if REST API child process is running
ps aux | grep pgbalancer | grep "PT_REST_API"

# Verify REST API is enabled
grep rest_api_enabled /etc/pgbalancer/pgbalancer.conf

# Test REST API
curl -v http://localhost:8080/api/v1/status
\`\`\`

**MQTT Connection Issues:**
\`\`\`bash
# Test MQTT broker connectivity
mosquitto_pub -h localhost -t 'test' -m 'hello'

# Check pgbalancer MQTT configuration
grep mqtt_ /etc/pgbalancer/pgbalancer.conf

# Monitor MQTT messages
mosquitto_sub -h localhost -t 'pgbalancer/#' -v
\`\`\`

## Security Considerations

### JWT Authentication

\`\`\`ini
# Generate strong secret
rest_api_jwt_secret = 'your-256-bit-secret-key-here'

# Set appropriate expiry
rest_api_jwt_expiry = 3600  # 1 hour

# Use HTTPS in production
# Configure nginx/HAProxy to terminate SSL
\`\`\`

### Network Security

\`\`\`ini
# Restrict API access
rest_api_listen_addresses = '127.0.0.1'

# Restrict PCP access
pcp_listen_addresses = '127.0.0.1'

# Use SSL for backend connections
backend_flag0 = 'ALLOW_TO_FAILOVER|SSL'
\`\`\`

### MQTT Security

\`\`\`ini
# Use MQTT with TLS
mqtt_broker = 'mqtts://secure-broker:8883'

# MQTT authentication
mqtt_username = 'pgbalancer'
mqtt_password = 'secure-password'
\`\`\`

## Best Practices

### Configuration Management

1. **Version Control**: Store \`pgbalancer.conf\` in git
2. **Environment Variables**: Use different configs per environment
3. **Automated Testing**: Test configuration changes before deployment
4. **Gradual Rollout**: Update one node at a time in multi-node setups

### AI Model Training

1. **Initial Training Period**: Allow 1-2 weeks for AI to learn patterns
2. **Monitor Metrics**: Track health scores and query distribution
3. **Tune Gradually**: Adjust learning/exploration rates incrementally
4. **Document Changes**: Record parameter changes and their effects

### Capacity Planning

1. **Connection Limits**: \`num_init_children × max_pool < PostgreSQL max_connections\`
2. **Memory**: ~10MB per child process + cache size
3. **CPU**: AI routing adds ~0.1-0.5ms per query
4. **Network**: Ensure low latency between pgbalancer and backends

### Monitoring Checklist

- ✅ Prometheus metrics scraping
- ✅ Grafana dashboards for visualization
- ✅ MQTT event monitoring
- ✅ Log aggregation (ELK/Loki)
- ✅ Alerting on health score degradation
- ✅ Alerting on failover events
- ✅ Regular health check validation

## Roadmap

### Upcoming Features

- **Enhanced AI Models**: Deep learning for complex query patterns
- **Kubernetes Operator**: Native Kubernetes deployment
- **GraphQL API**: Alternative API interface
- **WebAssembly Plugins**: Custom routing logic via WASM
- **Multi-Region Support**: Geographic load distribution
- **Cost Optimization**: Cloud cost-aware routing decisions

## Conclusion

pgbalancer combines pooling technologies with machine learning, APIs, and distributed coordination. Whether you scale a single application or manage PostgreSQL clusters, pgbalancer provides the tools needed for production deployments.

**Key Points:**
- Load balancing learns and adapts to your workload
- REST API enables DevOps workflows
- MQTT clustering provides distributed coordination
- CLI tool simplifies management
- Built on pgpool-II foundation
- Compatible with PostgreSQL 13-18

Ready to deploy? Check out the **[Getting Started Guide](https://www.pgelephant.com/docs/pgbalancer/getting-started)** or explore the **[GitHub repository](https://github.com/pgElephant/pgbalancer)**.

---

## Resources

- **[Official Documentation](https://www.pgelephant.com/docs/pgbalancer)**
- **[GitHub Repository](https://github.com/pgElephant/pgbalancer)**
- **[Installation Guide](https://www.pgelephant.com/docs/pgbalancer/getting-started)**
- **[Configuration Reference](https://www.pgelephant.com/docs/pgbalancer/configuration)**
- **[REST API Documentation](https://www.pgelephant.com/docs/pgbalancer/api)**
- **[CLI Tool (bctl) Guide](https://www.pgelephant.com/docs/pgbalancer/bctl)**

## About pgElephant

pgbalancer is part of the pgElephant suite of PostgreSQL tools designed for modern cloud-native deployments. Explore our other projects:

- **[pgraft](https://www.pgelephant.com/pgraft)**: Raft-based consensus for PostgreSQL
- **[pg_stat_insights](https://www.pgelephant.com/pg-stat-insights)**: Performance monitoring
- **[neurondb](https://www.pgelephant.com/neurondb)**: GPU-accelerated PostgreSQL for ML

`;

export default function PgbalancerBlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <BlogMarkdown>{markdown}</BlogMarkdown>
        </div>

        {/* LinkedIn Share */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <ShareOnLinkedIn
            title="pgbalancer: AI-Powered PostgreSQL Connection Pooler"
            summary="AI Load Balancing, REST API, MQTT Clustering - Modern PostgreSQL Connection Pooling with Machine Learning Optimization"
            url="https://www.pgelephant.com/blog/pgbalancer"
            hashtags={['PostgreSQL', 'AI', 'LoadBalancing', 'DevOps', 'Database', 'MachineLearning', 'ConnectionPooling', 'RESTAPI']}
          />
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Comments
            </h2>

            {/* Giscus Comments - Persistent GitHub Discussions */}
            <GiscusComments
              repo="pgElephant/www"
              repoId="R_kgDONWqK3A"
              category="Blog Comments"
              categoryId="DIC_kwDONWqK3M4ClOuv"
              mapping="pathname"
              reactionsEnabled={true}
              theme="dark"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
