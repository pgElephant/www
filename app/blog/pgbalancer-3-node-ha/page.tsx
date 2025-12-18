import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

export const metadata = {
  title: 'PostgreSQL High Availability with pgBalancer',
  description: 'Complete guide to building a PostgreSQL high availability cluster with pgBalancer and 3 PostgreSQL nodes. Includes step-by-step setup, configuration, failover testing, and best practices.',
  openGraph: {
    title: 'PostgreSQL High Availability with pgBalancer',
    description: 'Complete guide: 3-node PostgreSQL HA cluster with pgBalancer, automatic failover, load balancing, and zero-downtime operations.',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostgreSQL High Availability with pgBalancer',
    description: 'Complete guide: 3-node PostgreSQL HA cluster with pgBalancer, automatic failover, and load balancing.',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
};

const markdown = `![PostgreSQL HA with pgBalancer 3-Node Setup](/blog/pgbalancer-3-node-ha/header.svg)

# PostgreSQL High Availability with pgBalancer

📦 **[View on GitHub](https://github.com/pgElephant/pgbalancer)** | 📥 **[Download Latest Release](https://github.com/pgElephant/pgbalancer/releases)** | 📖 **[Documentation](https://www.pgelephant.com/docs/pgbalancer)**

## Executive Summary

Building a PostgreSQL high availability cluster requires careful planning, proper configuration, and thorough testing. This guide covers setting up a PostgreSQL HA cluster with pgBalancer, providing automatic failover, intelligent load balancing, and zero-downtime operations. The guide includes architecture design, step-by-step installation, configuration tuning, failover scenarios, monitoring setup, and best practices.

## What is High Availability and Why Do We Need It?

High Availability (HA) is a system design approach that ensures continuous operation and minimal downtime, even when individual components fail. In the context of databases, HA means the database remains accessible and operational 24/7, regardless of hardware failures, network issues, or maintenance requirements.

### The Cost of Downtime

Database downtime causes immediate and long-term problems. Understanding these costs helps justify the investment in high availability infrastructure.

![The Cost of Downtime](/blog/pgbalancer-3-node-ha/diagrams/cost-of-downtime.svg)

**Figure: The Five Critical Costs of Database Downtime**

Database downtime can have severe consequences:

- **Financial Impact**: E-commerce sites can lose thousands of dollars per minute during outages
- **User Experience**: Applications become unusable, leading to frustrated users and lost trust
- **Data Loss Risk**: Without proper replication, hardware failures can result in permanent data loss
- **Compliance Issues**: Many industries require 99.9%+ uptime for regulatory compliance
- **Reputation Damage**: Extended outages can damage brand reputation and customer relationships

### Traditional Single-Node Limitations

A single PostgreSQL instance, while reliable, has critical limitations:

1. **Single Point of Failure**: If the server crashes, the entire database becomes unavailable
2. **No Automatic Recovery**: Manual intervention required for every failure
3. **Maintenance Windows**: Updates and backups require planned downtime
4. **No Load Distribution**: All queries hit a single server, limiting scalability
5. **Backup Dependency**: Recovery depends entirely on backups, which may be hours or days old

### High Availability Solutions

High Availability architectures solve these problems through:

- **Redundancy**: Multiple database nodes ensure service continues if one fails
- **Automatic Failover**: Systems automatically detect failures and switch to healthy nodes
- **Zero-Downtime Operations**: Maintenance can be performed without service interruption
- **Load Distribution**: Read queries can be distributed across multiple nodes
- **Real-Time Replication**: Data is continuously synchronized, minimizing data loss risk

### Why This Architecture?

This HA cluster configuration works well for most environments because it provides:

1. **Quorum-Based Consensus**: With three nodes, 2 out of 3 form a majority, preventing split-brain scenarios
2. **Cost-Performance Balance**: More cost-effective than 5+ node clusters while providing redundancy
3. **Simplified Operations**: Easier to manage than larger clusters while still providing HA
4. **Common Pattern**: Configuration used by cloud providers
5. **Flexible Scaling**: Can be expanded to 5+ nodes if needed without architectural changes

### The Complete High Availability Flow

High availability systems follow a predictable sequence when handling failures. Understanding this flow helps configure the system correctly and troubleshoot issues.

![The Complete High Availability Flow](/blog/pgbalancer-3-node-ha/diagrams/ha-flow.svg)

**Figure: Seven-Step Automated HA Process**

A properly configured HA system follows this flow:

1. **Normal Operation**: Primary node handles all writes, standbys replicate data and serve reads
2. **Health Monitoring**: pgBalancer continuously monitors all nodes for availability and performance
3. **Failure Detection**: When a node fails, pgBalancer detects it within seconds through health checks
4. **Automatic Failover**: System automatically promotes a standby to primary and routes traffic away from failed node
5. **Service Continuity**: Applications continue operating with minimal interruption (typically < 30 seconds)
6. **Recovery**: Failed node can be repaired and rejoin the cluster as a standby
7. **Replication Sync**: New standby catches up with current primary through WAL streaming

This entire process happens automatically, without manual intervention, ensuring the database remains available even during failures.

### Architecture Overview

A high availability cluster balances redundancy, performance, and operational complexity. This architecture offers several advantages.

![3-Node PostgreSQL HA Architecture with pgBalancer](/blog/pgbalancer-3-node-ha/diagrams/architecture.svg)

**Figure 1: Complete 3-Node High Availability Architecture**

### Quorum-Based Operations

Three nodes create a quorum system. Any two nodes form a quorum, allowing the cluster to continue operating when one node fails. This provides:

- **Automatic Failover**: When the primary node fails, the remaining two nodes can elect a new primary
- **Split-Brain Prevention**: The quorum requirement prevents conflicting writes from multiple primaries
- **Network Partition Tolerance**: The majority partition continues serving requests

![Split-Brain Scenario Explanation](/blog/pgbalancer-3-node-ha/diagrams/split-brain.svg)

**Figure: Split-Brain Problem and Quorum Solution**

Split-brain occurs when network partitions create multiple primary nodes. Each primary accepts writes independently, causing data conflicts. Quorum-based consensus requires a majority of nodes to agree before accepting writes, preventing split-brain scenarios.

### Performance Benefits

Three nodes enable:

- **Read Scaling**: Distribute read queries across all three nodes
- **Load Distribution**: pgBalancer intelligently routes queries based on node health and load
- **Reduced Single Points of Failure**: No single node failure can bring down the cluster

### Operational Simplicity

Managing a high availability cluster requires balancing complexity with functionality. This configuration works well for most environments.

Compared to larger clusters (5+ nodes), a 3-node setup offers:

- **Lower Resource Requirements**: Fewer servers to provision and maintain
- **Simpler Configuration**: Less complex networking and coordination
- **Easier Troubleshooting**: Fewer moving parts to diagnose

### Component Roles

Each component in the high availability architecture has specific responsibilities that work together to ensure continuous database availability. Understanding these roles is essential for proper configuration and troubleshooting.

![Component Roles and Responsibilities](/blog/pgbalancer-3-node-ha/diagrams/component-roles.svg)

**Figure 2: Component Roles and Responsibilities**

### Network Topology

Proper network configuration is essential for high availability. The network topology determines how nodes communicate, how replication traffic flows, and how clients connect to the cluster.

All nodes must have:

- **Private Network**: For replication traffic (low latency, high bandwidth)
- **Public Network**: For client connections (optional, can use private)
- **Firewall Rules**: Allow PostgreSQL (5432) and pgBalancer (9999) ports
- **DNS/Service Discovery**: Optional but recommended for production

### Prerequisites and System Requirements

Before beginning the setup, ensure the necessary hardware, software, and network infrastructure is in place. Proper preparation makes the installation process smoother and helps avoid common issues.

### Software Requirements

Install the required software packages before starting the cluster setup. These packages provide the database server, development tools, and system utilities needed for the installation.

- **Operating System**: Linux (Ubuntu 22.04 LTS, RHEL 8+, or Debian 11+)
- **PostgreSQL**: Version 14, 15, 16, or 17 ([Download PostgreSQL](https://www.postgresql.org/download/))
- **pgBalancer**: Latest release from [GitHub](https://github.com/pgElephant/pgbalancer/releases)
- **System Tools**: \`curl\`, \`wget\`, \`git\`, \`build-essential\`

### Network Configuration

Network connectivity between all nodes is critical for replication and failover. Proper network configuration ensures low-latency replication and reliable health checks.

Ensure all nodes can communicate:

\`\`\`bash
# From each node, test connectivity to others
ping 10.0.1.10  # Node 1
ping 10.0.1.11  # Node 2
ping 10.0.1.12  # Node 3
ping 10.0.1.5   # pgBalancer

# Test PostgreSQL port
nc -zv 10.0.1.10 5432
nc -zv 10.0.1.11 5432
nc -zv 10.0.1.12 5432

# Test pgBalancer port
nc -zv 10.0.1.5 9999
\`\`\`

### User and Permissions

Setting up proper user accounts and permissions is a security best practice that also simplifies management. Dedicated users for different operations help with auditing and access control.

Create a dedicated user for PostgreSQL operations:

\`\`\`bash
# On all nodes
sudo useradd -r -s /bin/bash postgres
sudo mkdir -p /var/lib/postgresql
sudo chown postgres:postgres /var/lib/postgresql
\`\`\`

### Step 1: PostgreSQL Installation and Configuration

The first step in building a high availability cluster is installing and configuring PostgreSQL on all database nodes. This involves setting up the database software, configuring replication parameters, and preparing the nodes for cluster membership.

### Installing PostgreSQL

PostgreSQL must be installed on all three database nodes. Use the official PostgreSQL repository to ensure the latest stable version.

**On Ubuntu/Debian:**

\`\`\`bash
# Add PostgreSQL APT repository
sudo apt update
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

# Install PostgreSQL 16 (or preferred version)
sudo apt install -y postgresql-16 postgresql-contrib-16
\`\`\`

**On RHEL/CentOS:**

\`\`\`bash
# Install PostgreSQL repository
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Install PostgreSQL 16
sudo dnf install -y postgresql16-server postgresql16-contrib
\`\`\`

### Initializing PostgreSQL

Initializing the PostgreSQL data directory creates the database cluster structure. This must be done on the primary node first, and the resulting data directory will be used as the source for standby nodes.

**On Node 1 (Primary):**

\`\`\`bash
# Initialize database cluster
sudo -u postgres /usr/pgsql-16/bin/initdb -D /var/lib/postgresql/16/main

# Start PostgreSQL
sudo systemctl start postgresql-16
sudo systemctl enable postgresql-16
\`\`\`

### Configuring PostgreSQL for Replication

PostgreSQL must be configured to enable replication before standby nodes can connect. This involves setting WAL level, replication slots, and connection permissions.

**Edit \`postgresql.conf\` on Node 1:**

\`\`\`bash
sudo -u postgres nano /var/lib/postgresql/16/main/postgresql.conf
\`\`\`

Add or modify these settings:

\`\`\`ini
# Network Configuration
listen_addresses = '*'
port = 5432
max_connections = 200

# Replication Settings
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10
hot_standby = on
hot_standby_feedback = on

# Performance Settings
shared_buffers = 4GB
effective_cache_size = 12GB
maintenance_work_mem = 1GB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 20MB
min_wal_size = 1GB
max_wal_size = 4GB

# Logging
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 0
log_autovacuum_min_duration = 0
log_error_verbosity = default
\`\`\`

**Edit \`pg_hba.conf\` on Node 1:**

\`\`\`bash
sudo -u postgres nano /var/lib/postgresql/16/main/pg_hba.conf
\`\`\`

Add replication and connection rules:

\`\`\`ini
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local connections
local   all             postgres                                peer
local   all             all                                     md5

# IPv4 local connections
host    all             all             127.0.0.1/32            md5
host    all             all             10.0.1.0/24             md5

# Replication connections
host    replication     replicator      10.0.1.11/32            md5
host    replication     replicator      10.0.1.12/32            md5

# pgBalancer connections
host    all             pgbalancer      10.0.1.5/32             md5
\`\`\`

**Create replication user:**

\`\`\`bash
sudo -u postgres psql -c "CREATE USER replicator WITH REPLICATION PASSWORD 'secure_replication_password';"
sudo -u postgres psql -c "CREATE USER pgbalancer WITH PASSWORD 'secure_pgbalancer_password';"
sudo -u postgres psql -c "GRANT CONNECT ON DATABASE postgres TO pgbalancer;"
\`\`\`

**Restart PostgreSQL:**

\`\`\`bash
sudo systemctl restart postgresql-16
\`\`\`

### Step 2: Streaming Replication Setup

Streaming replication is the foundation of high availability, ensuring that all standby nodes maintain an exact copy of the primary database. This step configures the replication mechanism that keeps data synchronized across all nodes.

### Setting Up Standby Nodes (Node 2 and Node 3)

Standby nodes start with a copy of the primary database. Use pg_basebackup to create an initial copy, then configure the nodes to receive ongoing replication.

**On Node 2 and Node 3, perform base backup:**

\`\`\`bash
# Stop PostgreSQL if running
sudo systemctl stop postgresql-16

# Remove existing data directory
sudo rm -rf /var/lib/postgresql/16/main

# Perform base backup from primary
sudo -u postgres pg_basebackup \
  -h 10.0.1.10 \
  -D /var/lib/postgresql/16/main \
  -U replicator \
  -v \
  -P \
  -W \
  -R \
  -S standby1 \
  -X stream

# For Node 3, use different slot name
# On Node 3:
sudo -u postgres pg_basebackup \
  -h 10.0.1.10 \
  -D /var/lib/postgresql/16/main \
  -U replicator \
  -v \
  -P \
  -W \
  -R \
  -S standby2 \
  -X stream
\`\`\`

**Configure \`postgresql.conf\` on standby nodes:**

\`\`\`bash
sudo -u postgres nano /var/lib/postgresql/16/main/postgresql.conf
\`\`\`

Use the same settings as primary, but ensure:

\`\`\`ini
hot_standby = on
hot_standby_feedback = on
\`\`\`

**Configure \`pg_hba.conf\` on standby nodes:**

Same configuration as primary for consistency.

**Create \`standby.signal\` file (if not auto-created):**

\`\`\`bash
sudo -u postgres touch /var/lib/postgresql/16/main/standby.signal
\`\`\`

**Start standby nodes:**

\`\`\`bash
sudo systemctl start postgresql-16
sudo systemctl enable postgresql-16
\`\`\`

### Understanding Replication Flow

Streaming replication sends Write-Ahead Log data from the primary to standby nodes in real-time. This keeps all nodes synchronized with minimal delay.

![Streaming Replication Flow Diagram](/blog/pgbalancer-3-node-ha/diagrams/replication-flow.svg)

**Figure 2: WAL Streaming Replication Flow**

The diagram above shows how Write-Ahead Log (WAL) data flows from the primary node to both standby nodes:

1. **Primary Node (Node 1)** generates WAL segments as transactions are committed
2. **WAL Streaming** sends these segments to both standby nodes in real-time
3. **Standby Nodes** receive and replay WAL, keeping data synchronized
4. **Read Queries** can be served from standby nodes (hot standby mode)
5. **Replication Slots** ensure WAL is retained until standby nodes have received it

### Verifying Replication

After setting up replication, it's essential to verify that data is flowing correctly from the primary to all standby nodes. Regular verification ensures the replication is healthy and helps catch issues early.

**On Primary (Node 1):**

\`\`\`bash
sudo -u postgres psql -c "SELECT * FROM pg_stat_replication;"
\`\`\`

Expected output shows both standby nodes:

\`\`\`text
 pid | usesysid | usename  | application_name | client_addr | state   | sync_state | sync_priority
-----+----------+----------+------------------+-------------+---------+-------------+---------------
 123 |    16384 | replicator | standby1        | 10.0.1.11   | streaming | async      | 0
 124 |    16384 | replicator | standby2        | 10.0.1.12   | streaming | async      | 0
\`\`\`

**Check replication slots:**

\`\`\`bash
sudo -u postgres psql -c "SELECT * FROM pg_replication_slots;"
\`\`\`

**Test replication lag:**

\`\`\`bash
# On primary
sudo -u postgres psql -c "SELECT pg_current_wal_lsn();"

# On standby (should be close to primary)
sudo -u postgres psql -c "SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn();"
\`\`\`

### Step 3: pgBalancer Installation

pgBalancer serves as the connection pooler and load balancer for the cluster. Installing and configuring pgBalancer correctly is crucial for achieving high availability and performance.

### Installing Dependencies

pgBalancer requires build tools and PostgreSQL development libraries. Install these packages before compiling.

**On pgBalancer node (10.0.1.5):**

\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y build-essential libpq-dev libyaml-dev git curl

# RHEL/CentOS
sudo dnf install -y gcc make postgresql16-devel libyaml-devel git curl
\`\`\`

### Building pgBalancer from Source

Compile pgBalancer from source to ensure compatibility with the PostgreSQL version. The build process generates the executable and installs it system-wide.

\`\`\`bash
# Clone repository
cd /opt
sudo git clone https://github.com/pgElephant/pgbalancer.git
cd pgbalancer

# Build pgBalancer
sudo make
sudo make install

# Verify installation
which pgbalancer
pgbalancer --version
\`\`\`

### Creating pgBalancer User and Directories

Create a dedicated system user for pgBalancer and set up directories for configuration, logs, and runtime data. This isolates pgBalancer processes and simplifies management.

\`\`\`bash
# Create system user
sudo useradd -r -s /bin/bash pgbalancer

# Create directories
sudo mkdir -p /etc/pgbalancer
sudo mkdir -p /var/log/pgbalancer
sudo mkdir -p /var/run/pgbalancer

# Set permissions
sudo chown -R pgbalancer:pgbalancer /etc/pgbalancer
sudo chown -R pgbalancer:pgbalancer /var/log/pgbalancer
sudo chown -R pgbalancer:pgbalancer /var/run/pgbalancer
\`\`\`

### Step 4: pgBalancer Configuration

Proper configuration of pgBalancer ensures connection pooling, load balancing, and reliable failover behavior. This step creates the configuration files that define how pgBalancer manages the cluster.

### Creating Configuration File

The configuration file defines how pgBalancer connects to PostgreSQL nodes, manages connection pools, and handles failover. Use YAML format for readability.

Create \`/etc/pgbalancer/pgbalancer.yml\`:

\`\`\`yaml
# pgBalancer Configuration for 3-Node PostgreSQL HA Cluster

# Listen configuration
listen_addresses: '*'
port: 9999

# Connection pool settings
num_init_children: 32
max_pool: 4
child_life_time: 300
child_max_connections: 0
connection_life_time: 0
client_idle_limit: 0

# Load balancing mode
load_balance_mode: on
ignore_leading_white_space: on

# Backend node configuration
backend_hostname0: '10.0.1.10'
backend_port0: 5432
backend_weight0: 1
backend_flag0: 'ALLOW_TO_FAILOVER'
backend_application_name0: 'node1-primary'

backend_hostname1: '10.0.1.11'
backend_port1: 5432
backend_weight1: 1
backend_flag1: 'ALLOW_TO_FAILOVER'
backend_application_name1: 'node2-standby'

backend_hostname2: '10.0.1.12'
backend_port2: 5432
backend_weight2: 1
backend_flag2: 'ALLOW_TO_FAILOVER'
backend_application_name2: 'node3-standby'

# Health check configuration
health_check_period: 30
health_check_timeout: 10
health_check_user: 'pgbalancer'
health_check_password: 'secure_pgbalancer_password'
health_check_database: 'postgres'
health_check_max_retries: 3

# Failover configuration
failover_on_backend_error: on
failover_command: '/usr/local/bin/pgbalancer_failover.sh'
failback_command: '/usr/local/bin/pgbalancer_failback.sh'

# AI Load Balancing
enable_ai_routing: on
ai_learning_rate: 0.1
ai_exploration_rate: 0.2
ai_health_score_threshold: 0.5

# Logging
log_destination: 'file'
log_directory: '/var/log/pgbalancer'
log_filename: 'pgbalancer-%Y-%m-%d.log'
log_rotation_age: '1d'
log_rotation_size: '100MB'
log_min_messages: 'info'
log_connections: on
log_hostname: on
log_line_prefix: '%t [%p]: [%l-1] '

# Performance tuning
statement_cache_size: 256
statement_cache_entries: 1000
\`\`\`

### Creating Database User for Health Checks

pgBalancer needs a database user to perform health checks. This user must exist on all PostgreSQL nodes with appropriate permissions.

**On all PostgreSQL nodes:**

\`\`\`bash
sudo -u postgres psql -c "CREATE USER pgbalancer WITH PASSWORD 'secure_pgbalancer_password';"
sudo -u postgres psql -c "GRANT CONNECT ON DATABASE postgres TO pgbalancer;"
\`\`\`

### Creating Systemd Service

A systemd service ensures pgBalancer starts automatically on boot and can be managed with standard systemctl commands. This provides reliable service management.

Create \`/etc/systemd/system/pgbalancer.service\`:

\`\`\`ini
[Unit]
Description=pgBalancer - PostgreSQL Connection Pooler and Load Balancer
After=network.target postgresql.service
Requires=network.target

[Service]
Type=forking
User=pgbalancer
Group=pgbalancer
ExecStart=/usr/local/bin/pgbalancer -D -f /etc/pgbalancer/pgbalancer.yml
ExecReload=/bin/kill -HUP $MAINPID
PIDFile=/var/run/pgbalancer/pgbalancer.pid
Restart=on-failure
RestartSec=5
TimeoutStopSec=30

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/pgbalancer /var/run/pgbalancer /etc/pgbalancer

[Install]
WantedBy=multi-user.target
\`\`\`

**Enable and start pgBalancer:**

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable pgbalancer
sudo systemctl start pgbalancer
sudo systemctl status pgbalancer
\`\`\`

### Verifying pgBalancer

After starting pgBalancer, verify it is running correctly and can connect to all PostgreSQL nodes. Check logs for any connection errors.

**Check if pgBalancer is running:**

\`\`\`bash
sudo systemctl status pgbalancer
sudo netstat -tlnp | grep 9999
\`\`\`

**Test connection:**

\`\`\`bash
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "SELECT version();"
\`\`\`

**Check backend status:**

\`\`\`bash
# Using REST API (if enabled)
curl http://10.0.1.5:9999/api/backend_status

# Or check logs
sudo tail -f /var/log/pgbalancer/pgbalancer-*.log
\`\`\`

### Step 5: High Availability Configuration

High availability requires more than just replication—it needs automatic failover mechanisms that can detect failures and recover without manual intervention. This step configures the failover automation.

### Configuring Automatic Failover

pgBalancer can detect backend failures and automatically route traffic away from failed nodes. For true high availability, automatic promotion of standby nodes must be configured.

### Creating Failover Script

The failover script automates the process of promoting a standby node to primary when the current primary fails. This script runs automatically when pgBalancer detects a failure.

Create \`/usr/local/bin/pgbalancer_failover.sh\`:

\`\`\`bash
#!/bin/bash
# pgBalancer Failover Script for 3-Node PostgreSQL Cluster

LOG_FILE="/var/log/pgbalancer/failover.log"
FAILED_NODE="$1"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

log_message() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

log_message "Failover triggered for node: $FAILED_NODE"

# Determine which node to promote
if [ "$FAILED_NODE" = "10.0.1.10" ]; then
    # Primary failed, promote Node 2 (first standby)
    PROMOTE_NODE="10.0.1.11"
    STANDBY_NODE="10.0.1.12"
elif [ "$FAILED_NODE" = "10.0.1.11" ]; then
    # Node 2 failed, no promotion needed (it's a standby)
    log_message "Standby node failed, no promotion needed"
    exit 0
elif [ "$FAILED_NODE" = "10.0.1.12" ]; then
    # Node 3 failed, no promotion needed (it's a standby)
    log_message "Standby node failed, no promotion needed"
    exit 0
else
    log_message "Unknown node: $FAILED_NODE"
    exit 1
fi

log_message "Promoting node: $PROMOTE_NODE to primary"

# Promote standby to primary
ssh postgres@$PROMOTE_NODE "sudo -u postgres /usr/pgsql-16/bin/pg_ctl promote -D /var/lib/postgresql/16/main"

if [ $? -eq 0 ]; then
    log_message "Successfully promoted $PROMOTE_NODE to primary"
    
    # Update remaining standby to replicate from new primary
    if [ -n "$STANDBY_NODE" ]; then
        log_message "Reconfiguring $STANDBY_NODE to replicate from new primary"
        ssh postgres@$STANDBY_NODE <<EOF
sudo -u postgres psql -c "SELECT pg_promote();"
EOF
    fi
    
    # Reload pgBalancer configuration
    systemctl reload pgbalancer
    log_message "pgBalancer configuration reloaded"
else
    log_message "Failed to promote $PROMOTE_NODE"
    exit 1
fi

log_message "Failover completed successfully"
exit 0
\`\`\`

**Make script executable:**

\`\`\`bash
sudo chmod +x /usr/local/bin/pgbalancer_failover.sh
sudo chown pgbalancer:pgbalancer /usr/local/bin/pgbalancer_failover.sh
\`\`\`

### Setting Up SSH Key Authentication

The failover script must execute commands on PostgreSQL nodes remotely. SSH key authentication allows passwordless access required for automated failover.

For automated failover, pgBalancer node needs passwordless SSH access to PostgreSQL nodes:

\`\`\`bash
# On pgBalancer node
sudo -u pgbalancer ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa

# Copy public key to all PostgreSQL nodes
sudo -u pgbalancer ssh-copy-id postgres@10.0.1.10
sudo -u pgbalancer ssh-copy-id postgres@10.0.1.11
sudo -u pgbalancer ssh-copy-id postgres@10.0.1.12

# Test SSH access
sudo -u pgbalancer ssh postgres@10.0.1.10 "echo 'SSH test successful'"
\`\`\`

### Configuring Watchdog (Optional but Recommended)

Watchdog mode provides an additional layer of protection by monitoring pgBalancer itself. If pgBalancer crashes, the watchdog can restart it automatically.

For production environments, consider running pgBalancer with watchdog mode for automatic recovery:

\`\`\`yaml
# Add to pgbalancer.yml
use_watchdog: on
wd_hostname: '10.0.1.5'
wd_port: 9000
wd_priority: 1
wd_authkey: 'secure_watchdog_key'
\`\`\`

### Step 6: Testing Failover Scenarios

Thorough testing of failover scenarios is essential before deploying to production. Understanding how the system behaves during different failure modes helps ensure reliability and prepares teams for real-world incidents. The following diagram illustrates a complete failover sequence:

![Failover Scenario: Primary Node Failure](/blog/pgbalancer-3-node-ha/diagrams/failover-scenario.svg)

**Figure 3: Complete Failover Sequence**

The diagram shows three stages:
1. **Before Failure**: Normal operation with all nodes healthy
2. **Failure Detection**: pgBalancer detects primary node failure
3. **After Failover**: New primary elected and cluster restored

### Test 1: Primary Node Failure

Testing primary node failure verifies that the cluster can detect the failure and promote a standby node automatically. This is the most critical failover scenario.

**Simulate primary failure:**

\`\`\`bash
# On Node 1 (primary)
sudo systemctl stop postgresql-16
\`\`\`

**Monitor pgBalancer logs:**

\`\`\`bash
sudo tail -f /var/log/pgbalancer/pgbalancer-*.log
\`\`\`

**Verify failover:**

\`\`\`bash
# Check which node is now primary
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "SELECT pg_is_in_recovery();"

# Should return 'f' (false) indicating connection to primary
# Check backend status
curl http://10.0.1.5:9999/api/backend_status
\`\`\`

**Test writes:**

\`\`\`bash
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres <<EOF
CREATE TABLE IF NOT EXISTS failover_test (
    id SERIAL PRIMARY KEY,
    test_data TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO failover_test (test_data) VALUES ('Failover test successful');
SELECT * FROM failover_test;
EOF
\`\`\`

### Test 2: Standby Node Failure

Standby node failures should not affect cluster operations. The cluster continues serving requests using the remaining nodes. This test confirms graceful degradation.

**Simulate standby failure:**

\`\`\`bash
# On Node 2 (standby)
sudo systemctl stop postgresql-16
\`\`\`

**Verify cluster continues operating:**

\`\`\`bash
# Writes should still work
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "INSERT INTO failover_test (test_data) VALUES ('Standby failure test');"

# Reads should still work (from remaining nodes)
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "SELECT COUNT(*) FROM failover_test;"
\`\`\`

### Test 3: Network Partition

Network partitions can split the cluster into isolated groups. Quorum-based systems ensure only the majority partition accepts writes, preventing split-brain scenarios.

**Simulate network partition:**

\`\`\`bash
# Block traffic to Node 1
sudo iptables -A INPUT -s 10.0.1.10 -j DROP
sudo iptables -A OUTPUT -d 10.0.1.10 -j DROP
\`\`\`

**Verify cluster behavior:**

\`\`\`bash
# pgBalancer should detect failure and route away
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "SELECT pg_is_in_recovery();"
\`\`\`

**Restore connectivity:**

\`\`\`bash
sudo iptables -D INPUT -s 10.0.1.10 -j DROP
sudo iptables -D OUTPUT -d 10.0.1.10 -j DROP
\`\`\`

### Test 4: Complete Failover and Recovery

A complete failover test simulates the full cycle: primary failure, standby promotion, service continuation, and recovery of the failed node. This validates the entire high availability process.

**Full failover test:**

\`\`\`bash
# 1. Stop primary
sudo systemctl stop postgresql-16  # On Node 1

# 2. Wait for failover (30-60 seconds)
sleep 60

# 3. Verify new primary
psql -h 10.0.1.5 -p 9999 -U postgres -d postgres -c "SELECT inet_server_addr(), pg_is_in_recovery();"

# 4. Restore old primary as standby
sudo systemctl start postgresql-16  # On Node 1
# Reconfigure as standby (see recovery section)

# 5. Verify cluster is healthy
curl http://10.0.1.5:9999/api/backend_status
\`\`\`

### Step 7: Monitoring and Observability

Effective monitoring and observability are critical for maintaining a healthy high availability cluster. Without proper monitoring, issues may go undetected and problems become difficult to diagnose. This section covers the essential monitoring tools and techniques.

### pgBalancer REST API Monitoring

pgBalancer exposes a REST API that provides real-time status information about the cluster. Enable this API to integrate with monitoring systems or check status programmatically.

pgBalancer provides a REST API for monitoring. Enable it in configuration:

\`\`\`yaml
# Add to pgbalancer.yml
enable_rest_api: on
rest_api_port: 9998
rest_api_user: 'monitoring'
rest_api_password: 'secure_monitoring_password'
\`\`\`

**Key endpoints:**

\`\`\`bash
# Backend status
curl -u monitoring:secure_monitoring_password http://10.0.1.5:9998/api/backend_status

# Connection pool statistics
curl -u monitoring:secure_monitoring_password http://10.0.1.5:9998/api/pool_stats

# Load balancing metrics
curl -u monitoring:secure_monitoring_password http://10.0.1.5:9998/api/load_balance_stats

# Health check results
curl -u monitoring:secure_monitoring_password http://10.0.1.5:9998/api/health_check
\`\`\`

### PostgreSQL Monitoring Queries

PostgreSQL provides system views and functions that show replication status, lag, and node health. Regular queries help identify issues before they cause problems.

**Replication status:**

\`\`\`bash
# On primary
sudo -u postgres psql -c "SELECT pid, usename, application_name, client_addr, state, sync_state, sync_priority, pg_wal_lsn_diff(pg_current_wal_lsn(), sent_lsn) AS sent_lag, pg_wal_lsn_diff(sent_lsn, write_lsn) AS write_lag, pg_wal_lsn_diff(write_lsn, flush_lsn) AS flush_lag, pg_wal_lsn_diff(flush_lsn, replay_lsn) AS replay_lag FROM pg_stat_replication;"
\`\`\`

**Replication slots:**

\`\`\`bash
sudo -u postgres psql -c "SELECT slot_name, slot_type, database, active, pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) AS lag_bytes FROM pg_replication_slots;"
\`\`\`

**On standby nodes:**

\`\`\`bash
# Check if in recovery
sudo -u postgres psql -c "SELECT pg_is_in_recovery();"

# Check replication lag
sudo -u postgres psql -c "SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn(), pg_wal_lsn_diff(pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn()) AS replay_lag_bytes;"
\`\`\`

### Setting Up Prometheus Monitoring

Prometheus provides time-series monitoring and alerting. Configure Prometheus to scrape metrics from pgBalancer and PostgreSQL nodes for centralized monitoring.

**Install Prometheus exporter (if available) or use custom metrics:**

\`\`\`yaml
# prometheus.yml
scrape_configs:
  - job_name: 'pgbalancer'
    static_configs:
      - targets: ['10.0.1.5:9998']
    basic_auth:
      username: 'monitoring'
      password: 'secure_monitoring_password'
  
  - job_name: 'postgresql'
    static_configs:
      - targets: ['10.0.1.10:9187', '10.0.1.11:9187', '10.0.1.12:9187']
\`\`\`

### Log Monitoring

Log files grow over time and can fill disk space. Configure log rotation to automatically archive and remove old logs while keeping recent logs for troubleshooting.

**Set up log rotation:**

\`\`\`bash
# /etc/logrotate.d/pgbalancer
/var/log/pgbalancer/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 pgbalancer pgbalancer
    sharedscripts
    postrotate
        systemctl reload pgbalancer > /dev/null 2>&1 || true
    endscript
}
\`\`\`

### Production Best Practices

Following best practices is crucial for maintaining a stable, secure, and performant high availability cluster in production. These recommendations are based on real-world experience and industry standards.

### Security Hardening

Security measures protect the cluster from unauthorized access and data breaches. Implement these practices before deploying to any environment with sensitive data.

1. **Use Strong Passwords**: Generate secure passwords for all database users
2. **Encrypt Connections**: Enable SSL/TLS for PostgreSQL connections
3. **Firewall Rules**: Restrict access to PostgreSQL and pgBalancer ports
4. **Network Isolation**: Use private networks for replication traffic
5. **Regular Updates**: Keep PostgreSQL and pgBalancer updated

### SSL/TLS Configuration

SSL/TLS encryption protects data in transit between clients and the database cluster. Generate certificates and configure PostgreSQL to require encrypted connections.

**On all PostgreSQL nodes, edit \`postgresql.conf\`:**

\`\`\`ini
ssl = on
ssl_cert_file = '/var/lib/postgresql/16/main/server.crt'
ssl_key_file = '/var/lib/postgresql/16/main/server.key'
ssl_ca_file = '/var/lib/postgresql/16/main/ca.crt'
\`\`\`

**Generate certificates:**

\`\`\`bash
# Create CA
openssl req -new -x509 -days 3650 -nodes -out ca.crt -keyout ca.key

# Create server certificate
openssl req -new -nodes -out server.csr -keyout server.key
openssl x509 -req -in server.csr -days 3650 -CA ca.crt -CAkey ca.key -out server.crt

# Set permissions
chmod 600 server.key
chown postgres:postgres server.* ca.*
\`\`\`

**Update pgBalancer configuration:**

\`\`\`yaml
ssl_mode: 'require'
ssl_cert: '/etc/pgbalancer/ssl/client.crt'
ssl_key: '/etc/pgbalancer/ssl/client.key'
ssl_ca: '/etc/pgbalancer/ssl/ca.crt'
\`\`\`

### Backup Strategy

Regular backups provide protection against data loss from corruption, accidental deletion, or catastrophic failures. Automate backups to ensure consistency and reduce manual work.

**Automated backups:**

\`\`\`bash
#!/bin/bash
# /usr/local/bin/pg_backup.sh

BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Perform backup
pg_basebackup -h 10.0.1.10 -D "$BACKUP_DIR/backup_$DATE" -U replicator -v -P -Ft -z -X stream

# Clean old backups
find "$BACKUP_DIR" -type d -mtime +$RETENTION_DAYS -exec rm -rf {} +
\`\`\`

**Schedule with cron:**

\`\`\`bash
# Add to crontab
0 2 * * * /usr/local/bin/pg_backup.sh
\`\`\`

### Performance Optimization

Performance tuning improves query response times and system throughput. Adjust configuration parameters based on workload patterns and available resources.

1. **Connection Pooling**: Tune \`max_pool\` and \`num_init_children\` based on workload
2. **Query Routing**: Enable load balancing for distribution
3. **Monitoring**: Track query performance and adjust accordingly
4. **Indexing**: Ensure proper indexes on frequently queried columns
5. **Vacuum**: Schedule regular VACUUM and ANALYZE operations

### Disaster Recovery Planning

Disaster recovery procedures ensure the team can restore service quickly after major failures. Document step-by-step recovery procedures and test them regularly.

1. **Document Procedures**: Maintain runbooks for common failure scenarios
2. **Regular Testing**: Test failover procedures monthly
3. **Backup Verification**: Regularly test backup restoration
4. **Monitoring Alerts**: Set up alerts for critical failures
5. **Recovery Time Objectives**: Define and test RTO/RPO requirements

### Troubleshooting Common Issues

Common issues can occur during cluster operation. This section describes symptoms, diagnostic steps, and solutions for typical problems.

### Issue 1: Replication Lag

Replication lag occurs when standby nodes cannot keep up with the primary node's write rate. High lag increases data loss risk during failover.

**Symptoms:**
- Standby nodes falling behind primary
- Large replication lag values

**Diagnosis:**

\`\`\`bash
# Check replication lag
sudo -u postgres psql -c "SELECT application_name, pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes FROM pg_stat_replication;"
\`\`\`

**Solutions:**

1. **Increase WAL sender processes:**
   \`\`\`ini
   max_wal_senders = 10
   \`\`\`

2. **Tune WAL settings:**
   \`\`\`ini
   wal_buffers = 16MB
   max_wal_size = 4GB
   \`\`\`

3. **Check network bandwidth between nodes**

4. **Consider synchronous replication for critical data**

### Issue 2: Connection Pool Exhaustion

Connection pool exhaustion happens when all available connections are in use. This prevents new connections and causes application timeouts.

**Symptoms:**
- "too many connections" errors
- Application connection timeouts

**Diagnosis:**

\`\`\`bash
# Check active connections
psql -h 10.0.1.5 -p 9999 -U postgres -c "SELECT count(*) FROM pg_stat_activity;"
\`\`\`

**Solutions:**

1. **Increase pool size in pgBalancer:**
   \`\`\`yaml
   max_pool: 8
   num_init_children: 64
   \`\`\`

2. **Increase PostgreSQL max_connections:**
   \`\`\`ini
   max_connections = 300
   \`\`\`

3. **Review application connection management**

### Issue 3: Failover Not Triggering

Failover should trigger automatically when a node fails. If failover does not occur, the cluster may be misconfigured or health checks may be failing.

**Symptoms:**
- Primary node fails but traffic not routed away
- Manual intervention required

**Diagnosis:**

\`\`\`bash
# Check pgBalancer logs
sudo tail -100 /var/log/pgbalancer/pgbalancer-*.log | grep -i failover

# Check health check configuration
grep -i health /etc/pgbalancer/pgbalancer.yml
\`\`\`

**Solutions:**

1. **Reduce health check timeout:**
   \`\`\`yaml
   health_check_timeout: 5
   health_check_max_retries: 2
   \`\`\`

2. **Enable failover on backend error:**
   \`\`\`yaml
   failover_on_backend_error: on
   \`\`\`

3. **Verify network connectivity**

### Issue 4: Split-Brain Scenario

Split-brain occurs when network partitions cause multiple nodes to act as primary simultaneously. Each primary accepts writes independently, creating data conflicts and corruption.

![Split-Brain Scenario Explanation](/blog/pgbalancer-3-node-ha/diagrams/split-brain.svg)

**Symptoms:**
- Multiple nodes acting as primary
- Data inconsistency across nodes
- Conflicting write operations

**Prevention:**

1. **Use quorum-based failover (3+ nodes)**
2. **Configure proper fencing mechanisms**
3. **Use pgraft for consensus-based leader election**

**Recovery:**

\`\`\`bash
# Identify true primary (check replication slots)
# Demote incorrect primary
sudo -u postgres /usr/pgsql-16/bin/pg_ctl stop -D /var/lib/postgresql/16/main
# Reconfigure as standby
\`\`\`

### Performance Tuning

Performance tuning adjusts configuration parameters to improve system performance. Tune pgBalancer, PostgreSQL, and network settings based on workload characteristics.

### pgBalancer Tuning

pgBalancer performance depends on connection pool sizing and load balancing algorithms. Adjust these settings to match application connection patterns.

**Connection pool sizing:**

\`\`\`yaml
# For high-traffic applications
num_init_children: 64
max_pool: 8
child_life_time: 600
connection_life_time: 3600

# For read-heavy workloads
load_balance_mode: on
statement_level_load_balance: on
\`\`\`

### PostgreSQL Tuning

PostgreSQL performance depends on memory allocation, disk I/O settings, and query planner configuration. Tune these based on available hardware and workload.

**Memory configuration:**

\`\`\`ini
# For 16GB RAM system
shared_buffers = 4GB
effective_cache_size = 12GB
work_mem = 20MB
maintenance_work_mem = 1GB
\`\`\`

**WAL and checkpoint tuning:**

\`\`\`ini
wal_buffers = 16MB
min_wal_size = 1GB
max_wal_size = 4GB
checkpoint_completion_target = 0.9
\`\`\`

### Network Optimization

Network performance directly affects replication speed and query latency. Optimize network settings to reduce latency and increase throughput for replication traffic.

1. **Use dedicated replication network**
2. **Enable jumbo frames if supported**
3. **Tune TCP parameters:**
   \`\`\`bash
   # /etc/sysctl.conf
   net.core.rmem_max = 16777216
   net.core.wmem_max = 16777216
   net.ipv4.tcp_rmem = 4096 87380 16777216
   net.ipv4.tcp_wmem = 4096 65536 16777216
   \`\`\`

## Conclusion

Building a 3-node PostgreSQL high availability cluster with pgBalancer provides a database infrastructure. This guide covers everything from initial setup to deployment, ensuring the database remains available even during failures.

**Key Points:**
- Automatic failover provides zero-downtime operations
- Intelligent load balancing distributes queries across nodes
- Quorum-based architecture prevents split-brain scenarios
- Real-time replication keeps data synchronized
- Configuration with monitoring and alerting
- Compatible with PostgreSQL 14, 15, 16, and 17

---

## Related Blog Posts

[pgraft: Raft-Based PostgreSQL Extension](/blog/pgraft) - Learn how pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters with mathematical guarantees using the Raft consensus protocol.

[pgbalancer: AI-Powered PostgreSQL Connection Pooler](/blog/pgbalancer) - Learn about AI-powered connection pooling with machine learning load balancing, REST API management, and distributed MQTT coordination for PostgreSQL clusters.

[pg_stat_insights: PostgreSQL Performance Monitoring Extension](/blog/pg-stat-insights) - Comprehensive guide to PostgreSQL performance monitoring with 52 metrics across 42 pre-built views for query analysis, replication monitoring, and index optimization.

## Support

For questions, issues, or commercial support, contact [admin@pgelephant.com](mailto:admin@pgelephant.com)`;

export default function Pgbalancer3NodeHaBlogPost() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'PostgreSQL High Availability with pgBalancer',
    description: 'Complete guide to building a PostgreSQL high availability cluster with pgBalancer and 3 PostgreSQL nodes. Includes step-by-step setup, configuration, failover testing, and best practices.',
    image: 'https://www.pgelephant.com/blog/pgbalancer/og-image.jpg',
    datePublished: '2025-02-25',
    dateModified: '2025-02-25',
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
      '@id': 'https://www.pgelephant.com/blog/pgbalancer-3-node-ha',
    },
    keywords: 'PostgreSQL, High Availability, pgBalancer, Database Clustering, Load Balancing, Failover, PostgreSQL HA, Zero Downtime',
  };

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPageTracker
        slug="pgbalancer-3-node-ha"
        title="PostgreSQL High Availability with pgBalancer"
      />
      {/* Blog Content */}
      <div style={{ backgroundColor: '#1f2937' }}>
        <BlogMarkdown>{markdown}</BlogMarkdown>

        {/* Share Section */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
            <ShareOnLinkedIn
              url="https://www.pgelephant.com/blog/pgbalancer-3-node-ha"
              title="PostgreSQL High Availability with pgBalancer"
              summary="Complete guide to building a PostgreSQL high availability cluster with pgBalancer and 3 PostgreSQL nodes. Includes step-by-step setup, configuration, failover testing, monitoring, and best practices."
              hashtags={[
                'PostgreSQL',
                'HighAvailability',
                'pgBalancer',
                'DatabaseClustering',
                'LoadBalancing',
                'Failover',
                'PostgreSQLHA',
                'DatabaseInfrastructure',
                'DevOps',
                'SRE',
                'DatabaseEngineering',
                'OpenSource',
                'CloudNative',
                'ZeroDowntime'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
