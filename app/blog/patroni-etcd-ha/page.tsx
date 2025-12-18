import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

export const metadata = {
  title: 'PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup',
  description: 'Complete guide to building a PostgreSQL high availability cluster with Patroni and etcd. Includes step-by-step setup, configuration, automatic failover, and best practices.',
  openGraph: {
    title: 'PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup',
    description: 'Complete guide: 3-node PostgreSQL HA cluster with Patroni leader election, etcd consensus, automatic failover, and zero-downtime operations.',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup',
    description: 'Complete guide: 3-node PostgreSQL HA cluster with Patroni and etcd, automatic failover, and leader election.',
    images: ['/blog/pgbalancer/og-image.jpg?v=8'],
  },
};

const markdown = `![PostgreSQL HA with Patroni and etcd 3-Node Setup](/blog/patroni-etcd-ha/header.svg)

# PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup

📦 **[View Patroni on GitHub](https://github.com/zalando/patroni)** | 📦 **[View etcd on GitHub](https://github.com/etcd-io/etcd)** | 📖 **[Patroni Documentation](https://patroni.readthedocs.io/)**

## Executive Summary

Building a PostgreSQL high availability cluster requires careful planning, proper configuration, and thorough testing. This guide covers setting up a PostgreSQL HA cluster with Patroni and etcd, providing automatic failover, leader election, and zero-downtime operations. The guide includes architecture design, step-by-step installation, configuration tuning, failover scenarios, monitoring setup, and best practices.

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
2. **Health Monitoring**: Patroni continuously monitors all nodes for availability and performance
3. **Failure Detection**: When a node fails, Patroni detects it within seconds through health checks
4. **Automatic Failover**: System automatically promotes a standby to primary using etcd consensus
5. **Service Continuity**: Applications continue operating with minimal interruption (typically < 30 seconds)
6. **Recovery**: Failed node can be repaired and rejoin the cluster as a standby
7. **Replication Sync**: New standby catches up with current primary through WAL streaming

This entire process happens automatically, without manual intervention, ensuring the database remains available even during failures.

### Architecture Overview

A high availability cluster balances redundancy, performance, and operational complexity. This architecture offers several advantages.

The architecture consists of three main components:

1. **etcd Cluster**: Provides distributed consensus and leader election coordination
2. **Patroni Agents**: Run on each PostgreSQL node, managing leader election and failover
3. **PostgreSQL Nodes**: Three database nodes with streaming replication

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
- **Load Distribution**: Applications can connect directly to standby nodes for read queries
- **Reduced Single Points of Failure**: No single node failure can bring down the cluster

### Operational Simplicity

Managing a high availability cluster requires balancing complexity with functionality. This configuration works well for most environments.

Compared to larger clusters (5+ nodes), a 3-node setup offers:

- **Lower Resource Requirements**: Fewer servers to provision and maintain
- **Simpler Configuration**: Less complex networking and coordination
- **Easier Troubleshooting**: Fewer moving parts to diagnose

### Component Roles

Each component in the high availability architecture has specific responsibilities that work together to ensure continuous database availability. Understanding these roles is essential for proper configuration and troubleshooting.

**etcd Cluster**: Provides distributed key-value store for cluster state and leader election. The etcd cluster must have an odd number of nodes (3, 5, 7) to maintain quorum.

**Patroni**: Runs as an agent on each PostgreSQL node. Patroni monitors PostgreSQL health, coordinates with etcd for leader election, and manages automatic failover.

**PostgreSQL Nodes**: Database servers running streaming replication. One node acts as primary (accepts writes), others act as standbys (receive replication).

### Network Topology

Proper network configuration is essential for high availability. The network topology determines how nodes communicate, how replication traffic flows, and how clients connect to the cluster.

All nodes must have:

- **Private Network**: For replication traffic (low latency, high bandwidth)
- **Public Network**: For client connections (optional, can use private)
- **Firewall Rules**: Allow PostgreSQL (5432), etcd (2379, 2380), and Patroni API (8008) ports
- **DNS/Service Discovery**: Optional but recommended for production

### Prerequisites and System Requirements

Before beginning the setup, ensure the necessary hardware, software, and network infrastructure is in place. Proper preparation makes the installation process smoother and helps avoid common issues.

### Software Requirements

Install the required software packages before starting the cluster setup. These packages provide the database server, development tools, and system utilities needed for the installation.

- **Operating System**: Linux (Ubuntu 22.04 LTS, RHEL 8+, or Debian 11+)
- **PostgreSQL**: Version 14, 15, 16, or 17 ([Download PostgreSQL](https://www.postgresql.org/download/))
- **Patroni**: Latest release from [GitHub](https://github.com/zalando/patroni/releases) or via pip
- **etcd**: Version 3.5+ from [GitHub](https://github.com/etcd-io/etcd/releases)
- **System Tools**: \`curl\`, \`wget\`, \`git\`, \`build-essential\`, \`python3\`, \`pip\`

### Network Configuration

Network connectivity between all nodes is critical for replication and failover. Proper network configuration ensures low-latency replication and reliable health checks.

Ensure all nodes can communicate:

\`\`\`bash
# From each node, test connectivity to others
ping 10.0.1.10  # Node 1
ping 10.0.1.11  # Node 2
ping 10.0.1.12  # Node 3
ping 10.0.1.20  # etcd Node 1
ping 10.0.1.21  # etcd Node 2
ping 10.0.1.22  # etcd Node 3

# Test PostgreSQL port
nc -zv 10.0.1.10 5432
nc -zv 10.0.1.11 5432
nc -zv 10.0.1.12 5432

# Test etcd ports
nc -zv 10.0.1.20 2379
nc -zv 10.0.1.21 2379
nc -zv 10.0.1.22 2379
\`\`\`

### User and Permissions

Setting up proper user accounts and permissions is a security best practice that also simplifies management. Dedicated users for different operations help with auditing and access control.

Create a dedicated user for PostgreSQL operations:

\`\`\`bash
# On all PostgreSQL nodes
sudo useradd -r -s /bin/bash postgres
sudo mkdir -p /var/lib/postgresql
sudo chown postgres:postgres /var/lib/postgresql
\`\`\`

### Step 1: etcd Cluster Setup

The etcd cluster provides distributed consensus for leader election. Setting up etcd correctly is critical for reliable failover. This step installs and configures a 3-node etcd cluster.

### Installing etcd

etcd must be installed on three dedicated nodes or co-located with PostgreSQL nodes. Use the official etcd releases for stability.

**Download and install etcd:**

\`\`\`bash
# On all etcd nodes
ETCD_VER=v3.5.10
curl -L https://github.com/etcd-io/etcd/releases/download/\${ETCD_VER}/etcd-\${ETCD_VER}-linux-amd64.tar.gz -o etcd-\${ETCD_VER}-linux-amd64.tar.gz
tar xzvf etcd-\${ETCD_VER}-linux-amd64.tar.gz
sudo mv etcd-\${ETCD_VER}-linux-amd64/etcd* /usr/local/bin/
sudo chmod +x /usr/local/bin/etcd*
\`\`\`

### Configuring etcd Cluster

Each etcd node requires unique configuration with cluster member information. The cluster must know about all members to form quorum.

**On etcd Node 1 (10.0.1.20):**

\`\`\`bash
# Create etcd user
sudo useradd -r -s /bin/bash etcd
sudo mkdir -p /var/lib/etcd
sudo chown etcd:etcd /var/lib/etcd

# Create systemd service
sudo nano /etc/systemd/system/etcd.service
\`\`\`

Create \`/etc/systemd/system/etcd.service\`:

\`\`\`ini
[Unit]
Description=etcd - distributed key-value store
After=network.target

[Service]
Type=notify
User=etcd
Group=etcd
ExecStart=/usr/local/bin/etcd \\
  --name=etcd1 \\
  --data-dir=/var/lib/etcd \\
  --listen-client-urls=https://10.0.1.20:2379 \\
  --advertise-client-urls=https://10.0.1.20:2379 \\
  --listen-peer-urls=https://10.0.1.20:2380 \\
  --initial-advertise-peer-urls=https://10.0.1.20:2380 \\
  --initial-cluster=etcd1=https://10.0.1.20:2380,etcd2=https://10.0.1.21:2380,etcd3=https://10.0.1.22:2380 \\
  --initial-cluster-token=etcd-cluster-1 \\
  --initial-cluster-state=new \\
  --client-cert-auth \\
  --trusted-ca-file=/etc/etcd/ca.crt \\
  --cert-file=/etc/etcd/etcd1.crt \\
  --key-file=/etc/etcd/etcd1.key \\
  --peer-client-cert-auth \\
  --peer-trusted-ca-file=/etc/etcd/ca.crt \\
  --peer-cert-file=/etc/etcd/etcd1.crt \\
  --peer-key-file=/etc/etcd/etcd1.key
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
\`\`\`

**On etcd Node 2 (10.0.1.21):**

\`\`\`ini
[Unit]
Description=etcd - distributed key-value store
After=network.target

[Service]
Type=notify
User=etcd
Group=etcd
ExecStart=/usr/local/bin/etcd \\
  --name=etcd2 \\
  --data-dir=/var/lib/etcd \\
  --listen-client-urls=https://10.0.1.21:2379 \\
  --advertise-client-urls=https://10.0.1.21:2379 \\
  --listen-peer-urls=https://10.0.1.21:2380 \\
  --initial-advertise-peer-urls=https://10.0.1.21:2380 \\
  --initial-cluster=etcd1=https://10.0.1.20:2380,etcd2=https://10.0.1.21:2380,etcd3=https://10.0.1.22:2380 \\
  --initial-cluster-token=etcd-cluster-1 \\
  --initial-cluster-state=new \\
  --client-cert-auth \\
  --trusted-ca-file=/etc/etcd/ca.crt \\
  --cert-file=/etc/etcd/etcd2.crt \\
  --key-file=/etc/etcd/etcd2.key \\
  --peer-client-cert-auth \\
  --peer-trusted-ca-file=/etc/etcd/ca.crt \\
  --peer-cert-file=/etc/etcd/etcd2.crt \\
  --peer-key-file=/etc/etcd/etcd2.key
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
\`\`\`

**On etcd Node 3 (10.0.1.22):**

\`\`\`ini
[Unit]
Description=etcd - distributed key-value store
After=network.target

[Service]
Type=notify
User=etcd
Group=etcd
ExecStart=/usr/local/bin/etcd \\
  --name=etcd3 \\
  --data-dir=/var/lib/etcd \\
  --listen-client-urls=https://10.0.1.22:2379 \\
  --advertise-client-urls=https://10.0.1.22:2379 \\
  --listen-peer-urls=https://10.0.1.22:2380 \\
  --initial-advertise-peer-urls=https://10.0.1.22:2380 \\
  --initial-cluster=etcd1=https://10.0.1.20:2380,etcd2=https://10.0.1.21:2380,etcd3=https://10.0.1.22:2380 \\
  --initial-cluster-token=etcd-cluster-1 \\
  --initial-cluster-state=new \\
  --client-cert-auth \\
  --trusted-ca-file=/etc/etcd/ca.crt \\
  --cert-file=/etc/etcd/etcd3.crt \\
  --key-file=/etc/etcd/etcd3.key \\
  --peer-client-cert-auth \\
  --peer-trusted-ca-file=/etc/etcd/ca.crt \\
  --peer-cert-file=/etc/etcd/etcd3.crt \\
  --peer-key-file=/etc/etcd/etcd3.key
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
\`\`\`

### Generating TLS Certificates for etcd

etcd requires TLS certificates for secure communication. Generate certificates for all etcd nodes and the CA.

\`\`\`bash
# Create CA
openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -subj "/CN=etcd-ca"

# Create certificates for each etcd node
for i in 1 2 3; do
  openssl genrsa -out etcd\${i}.key 2048
  openssl req -new -key etcd\${i}.key -out etcd\${i}.csr -subj "/CN=etcd\${i}"
  openssl x509 -req -days 3650 -in etcd\${i}.csr -CA ca.crt -CAkey ca.key -out etcd\${i}.crt -extensions v3_req -extfile <(echo -e "[v3_req]\nsubjectAltName=IP:10.0.1.2\${i}")
done

# Copy certificates to each node
sudo mkdir -p /etc/etcd
sudo cp ca.crt /etc/etcd/
sudo cp etcd1.* /etc/etcd/  # On node 1
sudo cp etcd2.* /etc/etcd/  # On node 2
sudo cp etcd3.* /etc/etcd/  # On node 3
sudo chown -R etcd:etcd /etc/etcd
sudo chmod 600 /etc/etcd/*.key
\`\`\`

### Starting etcd Cluster

Start all etcd nodes simultaneously to form the cluster. The cluster requires a majority of nodes to be available.

\`\`\`bash
# On all etcd nodes
sudo systemctl daemon-reload
sudo systemctl enable etcd
sudo systemctl start etcd
sudo systemctl status etcd
\`\`\`

### Verifying etcd Cluster

Verify the etcd cluster is healthy and all members are connected.

\`\`\`bash
# Check cluster health
ETCDCTL_API=3 /usr/local/bin/etcdctl --endpoints=https://10.0.1.20:2379,https://10.0.1.21:2379,https://10.0.1.22:2379 \\
  --cacert=/etc/etcd/ca.crt \\
  --cert=/etc/etcd/etcd1.crt \\
  --key=/etc/etcd/etcd1.key \\
  endpoint health

# Check cluster members
ETCDCTL_API=3 /usr/local/bin/etcdctl --endpoints=https://10.0.1.20:2379,https://10.0.1.21:2379,https://10.0.1.22:2379 \\
  --cacert=/etc/etcd/ca.crt \\
  --cert=/etc/etcd/etcd1.crt \\
  --key=/etc/etcd/etcd1.key \\
  member list
\`\`\`

### Step 2: PostgreSQL Installation and Configuration

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

### Configuring PostgreSQL for Replication

PostgreSQL must be configured to enable replication before standby nodes can connect. This involves setting WAL level, replication slots, and connection permissions.

**Edit \`postgresql.conf\` on all nodes:**

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

**Edit \`pg_hba.conf\` on all nodes:**

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
host    replication     replicator      10.0.1.0/24             md5
\`\`\`

**Create replication user:**

\`\`\`bash
# On primary node (will be managed by Patroni later)
sudo -u postgres psql -c "CREATE USER replicator WITH REPLICATION PASSWORD 'secure_replication_password';"
\`\`\`

### Step 3: Patroni Installation

Patroni serves as the leader election and failover manager for the cluster. Installing and configuring Patroni correctly is crucial for achieving high availability.

### Installing Dependencies

Patroni requires Python 3 and several Python packages. Install these packages before installing Patroni.

**On all PostgreSQL nodes:**

\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y python3 python3-pip python3-dev libpq-dev

# RHEL/CentOS
sudo dnf install -y python3 python3-pip python3-devel postgresql16-devel
\`\`\`

### Installing Patroni

Install Patroni using pip. Use a virtual environment for isolation.

\`\`\`bash
# Create virtual environment
sudo -u postgres python3 -m venv /opt/patroni
sudo -u postgres /opt/patroni/bin/pip install --upgrade pip
sudo -u postgres /opt/patroni/bin/pip install patroni[etcd] psycopg2-binary

# Create symlink for easy access
sudo ln -s /opt/patroni/bin/patroni /usr/local/bin/patroni
\`\`\`

### Step 4: Patroni Configuration

Proper configuration of Patroni ensures reliable leader election, automatic failover, and cluster management. This step creates the configuration files that define how Patroni manages the cluster.

### Creating Patroni Configuration File

The configuration file defines how Patroni connects to etcd, manages PostgreSQL, and handles failover. Use YAML format for readability.

Create \`/etc/patroni/postgresql.yml\` on Node 1:

\`\`\`yaml
scope: postgres
namespace: /db/
name: postgresql-node1

restapi:
  listen: 10.0.1.10:8008
  connect_address: 10.0.1.10:8008

etcd:
  hosts: 10.0.1.20:2379,10.0.1.21:2379,10.0.1.22:2379
  protocol: https
  cacert: /etc/patroni/etcd-ca.crt
  cert: /etc/patroni/etcd-client.crt
  key: /etc/patroni/etcd-client.key

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 30
    maximum_lag_on_failover: 1048576
    postgresql:
      use_pg_rewind: true
      use_slots: true
      parameters:
        wal_level: replica
        hot_standby: "on"
        wal_keep_segments: 8
        max_wal_senders: 10
        max_replication_slots: 10
        wal_log_hints: "on"
  initdb:
    - encoding: UTF8
    - data-checksums
  pg_hba:
    - host replication replicator 10.0.1.0/24 md5
    - host all all 10.0.1.0/24 md5
  users:
    replicator:
      password: secure_replication_password
      options:
        - replication

postgresql:
  listen: 10.0.1.10:5432
  connect_address: 10.0.1.10:5432
  data_dir: /var/lib/postgresql/16/main
  bin_dir: /usr/lib/postgresql/16/bin
  pgpass: /var/lib/postgresql/.pgpass
  parameters:
    max_connections: 200
    max_locks_per_transaction: 64
    max_worker_processes: 8
    wal_level: replica
    hot_standby: "on"
    wal_keep_segments: 8
    max_wal_senders: 10
    max_replication_slots: 10
    wal_log_hints: "on"
    shared_buffers: 4GB
    effective_cache_size: 12GB
    maintenance_work_mem: 1GB
    checkpoint_completion_target: 0.9
    wal_buffers: 16MB
    default_statistics_target: 100
    random_page_cost: 1.1
    effective_io_concurrency: 200
    work_mem: 20MB
    min_wal_size: 1GB
    max_wal_size: 4GB

tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
\`\`\`

Create \`/etc/patroni/postgresql.yml\` on Node 2:

\`\`\`yaml
scope: postgres
namespace: /db/
name: postgresql-node2

restapi:
  listen: 10.0.1.11:8008
  connect_address: 10.0.1.11:8008

etcd:
  hosts: 10.0.1.20:2379,10.0.1.21:2379,10.0.1.22:2379
  protocol: https
  cacert: /etc/patroni/etcd-ca.crt
  cert: /etc/patroni/etcd-client.crt
  key: /etc/patroni/etcd-client.key

postgresql:
  listen: 10.0.1.11:5432
  connect_address: 10.0.1.11:5432
  data_dir: /var/lib/postgresql/16/main
  bin_dir: /usr/lib/postgresql/16/bin
  pgpass: /var/lib/postgresql/.pgpass

tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
\`\`\`

Create \`/etc/patroni/postgresql.yml\` on Node 3:

\`\`\`yaml
scope: postgres
namespace: /db/
name: postgresql-node3

restapi:
  listen: 10.0.1.12:8008
  connect_address: 10.0.1.12:8008

etcd:
  hosts: 10.0.1.20:2379,10.0.1.21:2379,10.0.1.22:2379
  protocol: https
  cacert: /etc/patroni/etcd-ca.crt
  cert: /etc/patroni/etcd-client.crt
  key: /etc/patroni/etcd-client.key

postgresql:
  listen: 10.0.1.12:5432
  connect_address: 10.0.1.12:5432
  data_dir: /var/lib/postgresql/16/main
  bin_dir: /usr/lib/postgresql/16/bin
  pgpass: /var/lib/postgresql/.pgpass

tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
\`\`\`

### Copying etcd Certificates

Patroni needs etcd client certificates to connect to the etcd cluster. Copy the CA certificate and create client certificates.

\`\`\`bash
# Copy CA certificate
sudo cp /etc/etcd/ca.crt /etc/patroni/etcd-ca.crt

# Create client certificate for Patroni
openssl genrsa -out patroni-client.key 2048
openssl req -new -key patroni-client.key -out patroni-client.csr -subj "/CN=patroni-client"
openssl x509 -req -days 3650 -in patroni-client.csr -CA /etc/etcd/ca.crt -CAkey /etc/etcd/ca.key -out patroni-client.crt

# Copy to all PostgreSQL nodes
sudo cp patroni-client.crt /etc/patroni/etcd-client.crt
sudo cp patroni-client.key /etc/patroni/etcd-client.key
sudo chown -R postgres:postgres /etc/patroni
sudo chmod 600 /etc/patroni/etcd-client.key
\`\`\`

### Creating Systemd Service

A systemd service ensures Patroni starts automatically on boot and can be managed with standard systemctl commands. This provides reliable service management.

Create \`/etc/systemd/system/patroni.service\` on all nodes:

\`\`\`ini
[Unit]
Description=Patroni - PostgreSQL High Availability Manager
After=network.target etcd.service
Wants=etcd.service

[Service]
Type=simple
User=postgres
Group=postgres
ExecStart=/usr/local/bin/patroni /etc/patroni/postgresql.yml
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=10s
TimeoutStopSec=30s

[Install]
WantedBy=multi-user.target
\`\`\`

**Enable and start Patroni:**

\`\`\`bash
# On Node 1 (primary)
sudo systemctl daemon-reload
sudo systemctl enable patroni
sudo systemctl start patroni
sudo systemctl status patroni

# On Node 2 and Node 3 (standbys)
sudo systemctl daemon-reload
sudo systemctl enable patroni
sudo systemctl start patroni
\`\`\`

### Verifying Patroni Cluster

After starting Patroni, verify it is running correctly and can connect to etcd. Check logs for any connection errors.

**Check Patroni status:**

\`\`\`bash
# Check service status
sudo systemctl status patroni

# Check Patroni REST API
curl http://10.0.1.10:8008/patroni
curl http://10.0.1.11:8008/patroni
curl http://10.0.1.12:8008/patroni

# Check cluster status
curl http://10.0.1.10:8008/cluster
\`\`\`

**Verify leader election:**

\`\`\`bash
# Check which node is leader
curl http://10.0.1.10:8008/patroni | jq .role
curl http://10.0.1.11:8008/patroni | jq .role
curl http://10.0.1.12:8008/patroni | jq .role

# One should return "Leader", others "Replica"
\`\`\`

### Step 5: Testing Failover Scenarios

Thorough testing of failover scenarios is essential before deploying to production. Understanding how the system behaves during different failure modes helps ensure reliability and prepares teams for real-world incidents.

### Test 1: Primary Node Failure

Testing primary node failure verifies that the cluster can detect the failure and promote a standby node automatically. This is the most critical failover scenario.

**Simulate primary failure:**

\`\`\`bash
# On primary node
sudo systemctl stop patroni
\`\`\`

**Monitor failover:**

\`\`\`bash
# Watch Patroni logs on standby nodes
sudo journalctl -u patroni -f

# Check cluster status
curl http://10.0.1.11:8008/cluster | jq .
\`\`\`

**Verify new primary:**

\`\`\`bash
# Check which node is now leader
curl http://10.0.1.11:8008/patroni | jq .role
curl http://10.0.1.12:8008/patroni | jq .role

# Test writes on new primary
psql -h 10.0.1.11 -U postgres -d postgres -c "CREATE TABLE IF NOT EXISTS failover_test (id SERIAL PRIMARY KEY, data TEXT);"
psql -h 10.0.1.11 -U postgres -d postgres -c "INSERT INTO failover_test (data) VALUES ('Failover test successful');"
\`\`\`

### Test 2: Standby Node Failure

Standby node failures should not affect cluster operations. The cluster continues serving requests using the remaining nodes. This test confirms graceful degradation.

**Simulate standby failure:**

\`\`\`bash
# On a standby node
sudo systemctl stop patroni
\`\`\`

**Verify cluster continues operating:**

\`\`\`bash
# Writes should still work
psql -h 10.0.1.10 -U postgres -d postgres -c "INSERT INTO failover_test (data) VALUES ('Standby failure test');"

# Reads should still work
psql -h 10.0.1.10 -U postgres -d postgres -c "SELECT COUNT(*) FROM failover_test;"
\`\`\`

### Test 3: etcd Node Failure

etcd cluster can tolerate the failure of one node (out of three). If two etcd nodes fail, the cluster loses quorum and Patroni cannot elect a leader.

**Simulate etcd failure:**

\`\`\`bash
# Stop one etcd node
sudo systemctl stop etcd  # On etcd node 1
\`\`\`

**Verify cluster continues operating:**

\`\`\`bash
# Cluster should continue operating with 2 etcd nodes
curl http://10.0.1.10:8008/cluster | jq .

# Restart etcd node
sudo systemctl start etcd
\`\`\`

### Step 6: Monitoring and Observability

Effective monitoring and observability are critical for maintaining a healthy high availability cluster. Without proper monitoring, issues may go undetected and problems become difficult to diagnose. This section covers the essential monitoring tools and techniques.

### Patroni REST API Monitoring

Patroni exposes a REST API that provides real-time status information about the cluster. Enable this API to integrate with monitoring systems or check status programmatically.

**Key endpoints:**

\`\`\`bash
# Cluster status
curl http://10.0.1.10:8008/cluster

# Individual node status
curl http://10.0.1.10:8008/patroni
curl http://10.0.1.11:8008/patroni
curl http://10.0.1.12:8008/patroni

# Leader information
curl http://10.0.1.10:8008/leader

# History of leader changes
curl http://10.0.1.10:8008/history
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

### etcd Monitoring

Monitor etcd cluster health to ensure leader election continues working. etcd provides metrics and health endpoints.

\`\`\`bash
# Check etcd cluster health
ETCDCTL_API=3 /usr/local/bin/etcdctl --endpoints=https://10.0.1.20:2379,https://10.0.1.21:2379,https://10.0.1.22:2379 \\
  --cacert=/etc/etcd/ca.crt \\
  --cert=/etc/etcd/etcd1.crt \\
  --key=/etc/etcd/etcd1.key \\
  endpoint health

# Check etcd metrics
curl https://10.0.1.20:2379/metrics --cacert /etc/etcd/ca.crt --cert /etc/etcd/etcd1.crt --key /etc/etcd/etcd1.key
\`\`\`

### Production Best Practices

Following best practices is crucial for maintaining a stable, secure, and performant high availability cluster in production. These recommendations are based on real-world experience and industry standards.

### Security Hardening

Security measures protect the cluster from unauthorized access and data breaches. Implement these practices before deploying to any environment with sensitive data.

1. **Use Strong Passwords**: Generate secure passwords for all database users
2. **Encrypt Connections**: Enable SSL/TLS for PostgreSQL connections
3. **Firewall Rules**: Restrict access to PostgreSQL, Patroni API, and etcd ports
4. **Network Isolation**: Use private networks for replication traffic
5. **Regular Updates**: Keep PostgreSQL, Patroni, and etcd updated

### SSL/TLS Configuration

SSL/TLS encryption protects data in transit between clients and the database cluster. Generate certificates and configure PostgreSQL to require encrypted connections.

**On all PostgreSQL nodes, edit \`postgresql.conf\`:**

\`\`\`ini
ssl = on
ssl_cert_file = '/var/lib/postgresql/16/main/server.crt'
ssl_key_file = '/var/lib/postgresql/16/main/server.key'
ssl_ca_file = '/var/lib/postgresql/16/main/ca.crt'
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

# Get primary node from Patroni
PRIMARY=$(curl -s http://10.0.1.10:8008/cluster | jq -r '.members[] | select(.role=="Leader") | .name' | sed 's/postgresql-//')

# Perform backup
pg_basebackup -h 10.0.1.\${PRIMARY: -1} -D "\$BACKUP_DIR/backup_\$DATE" -U replicator -v -P -Ft -z -X stream

# Clean old backups
find "\$BACKUP_DIR" -type d -mtime +\$RETENTION_DAYS -exec rm -rf {} +
\`\`\`

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

### Issue 2: Patroni Cannot Connect to etcd

If Patroni cannot connect to etcd, leader election fails and the cluster cannot function.

**Symptoms:**
- Patroni logs show connection errors
- No leader elected
- Cluster status shows errors

**Diagnosis:**

\`\`\`bash
# Check Patroni logs
sudo journalctl -u patroni -n 100

# Test etcd connectivity
ETCDCTL_API=3 /usr/local/bin/etcdctl --endpoints=https://10.0.1.20:2379 \\
  --cacert=/etc/patroni/etcd-ca.crt \\
  --cert=/etc/patroni/etcd-client.crt \\
  --key=/etc/patroni/etcd-client.key \\
  endpoint health
\`\`\`

**Solutions:**

1. **Verify etcd cluster is running**
2. **Check certificate paths and permissions**
3. **Verify network connectivity**
4. **Check firewall rules**

### Issue 3: Split-Brain Scenario

Split-brain occurs when network partitions cause multiple nodes to act as primary simultaneously. Each primary accepts writes independently, creating data conflicts and corruption.

**Symptoms:**
- Multiple nodes acting as primary
- Data inconsistency across nodes
- Conflicting write operations

**Prevention:**

1. **Use quorum-based failover (3+ nodes)**
2. **Configure proper fencing mechanisms**
3. **Ensure etcd cluster has quorum**

**Recovery:**

\`\`\`bash
# Identify true primary (check etcd)
curl http://10.0.1.10:8008/leader

# Demote incorrect primary
curl -X POST http://10.0.1.11:8008/patroni -d '{"action": "reinitialize"}'
\`\`\`

## Conclusion

Building a 3-node PostgreSQL high availability cluster with Patroni and etcd provides a database infrastructure. This guide covers everything from initial setup to deployment, ensuring the database remains available even during failures.

**Key Points:**
- Automatic failover provides zero-downtime operations
- etcd provides distributed consensus for leader election
- Patroni manages PostgreSQL lifecycle and failover
- Quorum-based architecture prevents split-brain scenarios
- Real-time replication keeps data synchronized
- Configuration with monitoring and alerting
- Compatible with PostgreSQL 14, 15, 16, and 17

---

## Related Blog Posts

[pgraft: Raft-Based PostgreSQL Extension](/blog/pgraft) - Learn how pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters with mathematical guarantees using the Raft consensus protocol.

[pgbalancer: AI-Powered PostgreSQL Connection Pooler](/blog/pgbalancer) - Learn about AI-powered connection pooling with machine learning load balancing, REST API management, and distributed MQTT coordination for PostgreSQL clusters.

[PostgreSQL High Availability with pgBalancer: 3-Node Cluster Setup](/blog/pgbalancer-3-node-ha) - Complete guide to building a PostgreSQL high availability cluster with pgBalancer and 3 PostgreSQL nodes.

## Support

For questions, issues, or commercial support, contact [admin@pgelephant.com](mailto:admin@pgelephant.com)`;

export default function PatroniEtcdHaBlogPost() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup',
    description: 'Complete guide to building a PostgreSQL high availability cluster with Patroni and etcd. Includes step-by-step setup, configuration, automatic failover, and best practices.',
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
      '@id': 'https://www.pgelephant.com/blog/patroni-etcd-ha',
    },
    keywords: 'PostgreSQL, High Availability, Patroni, etcd, Database Clustering, Leader Election, Failover, PostgreSQL HA, Zero Downtime',
  };

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPageTracker
        slug="patroni-etcd-ha"
        title="PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup"
      />
      {/* Blog Content */}
      <div style={{ backgroundColor: '#1f2937' }}>
        <BlogMarkdown>{markdown}</BlogMarkdown>

        {/* Share Section */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
            <ShareOnLinkedIn
              url="https://www.pgelephant.com/blog/patroni-etcd-ha"
              title="PostgreSQL High Availability with Patroni and etcd: 3-Node Cluster Setup"
              summary="Complete guide to building a PostgreSQL high availability cluster with Patroni and etcd. Includes step-by-step setup, configuration, automatic failover, monitoring, and best practices."
              hashtags={[
                'PostgreSQL',
                'HighAvailability',
                'Patroni',
                'etcd',
                'DatabaseClustering',
                'LeaderElection',
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

