'use client'

import React, { useState } from 'react'
import { BookOpen, ArrowRight, Code, Download, ExternalLink, Play, Container, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const DocsPage = () => {
  // State for active documentation section
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  // Ensure clean state on mount
  React.useEffect(() => {
    setActiveProduct(null)
    setActiveSection(null)
  }, [])

  // Function to get appropriate icon for documentation type
  const getDocIcon = (type: string) => {
    switch (type) {
      case 'Guide':
        return BookOpen
      case 'Tutorial':
        return Container
      case 'Reference':
        return FileText
      default:
        return BookOpen
    }
  }

  // Function to handle sidebar link clicks
  const handleSidebarClick = (productId: string, docTitle: string) => {
    setActiveProduct(productId)
    setActiveSection(docTitle)
    
    // Scroll to top of content area
    setTimeout(() => {
      const contentElement = document.getElementById('docs-content')
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Function to render actual documentation content
  const renderDocumentationContent = (productId: string, docTitle: string) => {
    return (
      <div className="space-y-8">
        {/* Full documentation content based on the section */}
        {getFullDocumentationContent(productId, docTitle)}
      </div>
    )
  }

  // Function to render formatted content with proper syntax highlighting
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\w]*\n[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // Check if this is a code block
      const codeBlockMatch = part.match(/```(\w+)?\n([\s\S]*?)```/);
      if (codeBlockMatch) {
        const language = codeBlockMatch[1] || 'text';
        const code = codeBlockMatch[2].trim();
        
        return (
          <pre key={index} className="bg-gray-100 text-gray-900 p-4 rounded-lg overflow-x-auto text-sm border font-mono">
            <code className={`language-${language}`}>
              {renderHighlightedCode(code, language)}
            </code>
          </pre>
        );
      }
      
      // Regular text content
      const formattedText = part
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-thin">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
        .replace(/\n/g, '<br/>');
      
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: formattedText }} />
      );
    });
  }

  // Function to render highlighted code as React elements
  const renderHighlightedCode = (code: string, language: string) => {
    if (language === 'bash' || language === 'sh') {
      return code.split('\n').map((line, lineIndex) => {
        const parts = line.split(/(#.*$|\$\s|git|make|sudo|cd|ls|cat|echo|export|curl|wget|npm|yarn|--\w+|".*?")/);
        return (
          <div key={lineIndex}>
            {parts.map((part, partIndex) => {
              if (part.match(/^#.*$/)) {
                return <span key={partIndex} className="text-green-600">{part}</span>;
              } else if (part.match(/^\$\s/)) {
                return <span key={partIndex} className="text-blue-600">{part}</span>;
              } else if (part.match(/^(git|make|sudo|cd|ls|cat|echo|export|curl|wget|npm|yarn)$/)) {
                return <span key={partIndex} className="text-purple-600 font-thin">{part}</span>;
              } else if (part.match(/^--\w+/)) {
                return <span key={partIndex} className="text-orange-600">{part}</span>;
              } else if (part.match(/^".*"$/)) {
                return <span key={partIndex} className="text-red-600">{part}</span>;
              }
              return <span key={partIndex}>{part}</span>;
            })}
          </div>
        );
      });
    } else if (language === 'sql') {
      return code.split('\n').map((line, lineIndex) => {
        const parts = line.split(/(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|GRANT|REVOKE|COMMIT|ROLLBACK|BEGIN|END|--.*$|\/\*[\s\S]*?\*\/|".*?"|'.*?'|\d+)/gi);
        return (
          <div key={lineIndex}>
            {parts.map((part, partIndex) => {
              if (part.match(/^(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|GRANT|REVOKE|COMMIT|ROLLBACK|BEGIN|END)$/i)) {
                return <span key={partIndex} className="text-blue-600 font-thin">{part}</span>;
              } else if (part.match(/^--.*$/)) {
                return <span key={partIndex} className="text-green-600">{part}</span>;
              } else if (part.match(/^\/\*[\s\S]*?\*\/$/)) {
                return <span key={partIndex} className="text-green-600">{part}</span>;
              } else if (part.match(/^".*"$|^'.*'$/)) {
                return <span key={partIndex} className="text-red-600">{part}</span>;
              } else if (part.match(/^\d+$/)) {
                return <span key={partIndex} className="text-orange-600">{part}</span>;
              }
              return <span key={partIndex}>{part}</span>;
            })}
          </div>
        );
      });
    }
    
    // Default: return plain text
    return code.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  }

  // Function to apply basic syntax highlighting
  const applySyntaxHighlighting = (code: string, language: string) => {
    if (language === 'bash' || language === 'sh') {
      return code
        .replace(/(#.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(\$\s)/g, '<span class="text-blue-600">$1</span>') // Command prompt
        .replace(/(git|make|sudo|cd|ls|cat|echo|export|curl|wget|npm|yarn)\b/g, '<span class="text-purple-600 font-thin">$1</span>') // Commands
        .replace(/(--\w+)/g, '<span class="text-orange-600">$1</span>') // Options
        .replace(/(".*?")/g, '<span class="text-red-600">$1</span>'); // Strings
    } else if (language === 'sql') {
      return code
        .replace(/(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|GRANT|REVOKE|COMMIT|ROLLBACK|BEGIN|END)\b/gi, '<span class="text-blue-600 font-thin">$1</span>') // Keywords
        .replace(/(--.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-600">$1</span>') // Block comments
        .replace(/(".*?"|'.*?')/g, '<span class="text-red-600">$1</span>') // Strings
        .replace(/(\d+)/g, '<span class="text-orange-600">$1</span>'); // Numbers
    } else if (language === 'c' || language === 'cpp') {
      return code
        .replace(/(#include|#define|#ifdef|#ifndef|#endif|#if|#else|#elif)\b/g, '<span class="text-purple-600">$1</span>') // Preprocessor
        .replace(/(int|char|float|double|void|struct|typedef|enum|const|static|extern|volatile|register|auto|signed|unsigned|long|short)\b/g, '<span class="text-blue-600 font-thin">$1</span>') // Types
        .replace(/(if|else|while|for|do|switch|case|default|break|continue|return|goto)\b/g, '<span class="text-orange-600 font-thin">$1</span>') // Keywords
        .replace(/(\/\/.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-600">$1</span>') // Block comments
        .replace(/(".*?")/g, '<span class="text-red-600">$1</span>'); // Strings
    } else if (language === 'javascript' || language === 'js') {
      return code
        .replace(/(function|const|let|var|if|else|while|for|do|switch|case|default|break|continue|return|try|catch|finally|throw|new|this|class|extends|import|export|from|async|await)\b/g, '<span class="text-blue-600 font-thin">$1</span>') // Keywords
        .replace(/(\/\/.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-600">$1</span>') // Block comments
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-red-600">$1</span>') // Strings
        .replace(/(\d+)/g, '<span class="text-orange-600">$1</span>'); // Numbers
    } else if (language === 'yaml' || language === 'yml') {
      return code
        .replace(/(version|services|ports|environment|volumes|networks|depends_on|build|image|command|restart|healthcheck)\b/g, '<span class="text-blue-600 font-thin">$1</span>') // Keywords
        .replace(/(#.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(".*?"|'.*?')/g, '<span class="text-red-600">$1</span>') // Strings
        .replace(/(\d+)/g, '<span class="text-orange-600">$1</span>'); // Numbers
    } else if (language === 'toml') {
      return code
        .replace(/(\[.*?\])/g, '<span class="text-blue-600 font-thin">$1</span>') // Sections
        .replace(/(#.*$)/gm, '<span class="text-green-600">$1</span>') // Comments
        .replace(/(".*?"|'.*?')/g, '<span class="text-red-600">$1</span>') // Strings
        .replace(/(\d+)/g, '<span class="text-orange-600">$1</span>'); // Numbers
    }
    return code;
  }

  // Function to get full documentation content
  const getFullDocumentationContent = (productId: string, docTitle: string) => {
    const content: { [key: string]: { [key: string]: any } } = {
      rale: {
        'Getting Started': {
          sections: [
            {
              title: 'Installation',
              content: `RALE (Resilient Adaptive Leader Election) is a distributed consensus system written in C. To get started:

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/pgElephant/rale.git
   cd rale
   \`\`\`

2. **Build and install**:
   \`\`\`bash
   make && sudo make install
   sudo ldconfig
   \`\`\`

3. **Verify installation**:
   \`\`\`bash
   ralectrl --version
   \`\`\``
            },
            {
              title: 'Components',
              content: `RALE consists of three main components:

- **librale**: Core C library providing consensus algorithms and distributed key-value store
- **raled**: Cluster management daemon that runs on each node
- **ralectrl**: Command-line interface for cluster management

Each component serves a specific role in the distributed system architecture.`
            }
          ]
        },
        'librale Documentation': {
          sections: [
            {
              title: 'Core Library Architecture',
              content: `The librale C library provides the foundation for distributed consensus and key-value storage. It implements the Raft consensus algorithm with optimizations for high availability and performance.

**Architecture Overview:**
librale is built with a modular architecture consisting of several key components:

1. **Consensus Engine**: Implements the Raft consensus algorithm with leader election, log replication, and safety guarantees
2. **State Machine**: Manages the distributed key-value store state and applies committed log entries
3. **Network Layer**: Handles inter-node communication with TCP connections and message serialization
4. **Storage Engine**: Persists log entries and snapshots to disk for durability
5. **Membership Manager**: Handles cluster membership changes and node addition/removal

**Key Features:**
- **Raft Consensus**: Full implementation of the Raft consensus algorithm
- **Distributed Key-Value Store**: High-performance distributed storage with ACID properties
- **Network Communication**: Efficient TCP-based communication with message batching
- **State Machine Replication**: Consistent state replication across all nodes
- **Membership Management**: Dynamic cluster membership with safe node addition/removal
- **Snapshot Support**: Periodic snapshots for log compaction and recovery
- **Leader Election**: Automatic leader election with configurable timeouts
- **Log Replication**: Optimized log replication with pipelining and flow control

**Performance Characteristics:**
- **Throughput**: Up to 100,000 operations per second on modern hardware
- **Latency**: Sub-millisecond latency for local operations, <10ms for distributed operations
- **Scalability**: Supports clusters up to 100 nodes
- **Durability**: All operations are persisted to disk before acknowledgment`
            },
            {
              title: 'Installation and Setup',
              content: `**Prerequisites:**
- C compiler (GCC 7.0+ or Clang 6.0+)
- CMake 3.12+
- OpenSSL 1.1.1+ (for TLS support)
- zlib (for compression)

**Building from Source:**
\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/rale.git
cd rale

# Create build directory
mkdir build && cd build

# Configure with CMake
cmake .. -DCMAKE_BUILD_TYPE=Release \\
         -DRALE_ENABLE_TLS=ON \\
         -DRALE_ENABLE_METRICS=ON

# Build the library
make -j$(nproc)

# Install system-wide
sudo make install

# Update library cache
sudo ldconfig
\`\`\`

**Verification:**
\`\`\`bash
# Check library installation
pkg-config --modversion librale

# Verify symbols
nm -D /usr/local/lib/librale.so | grep rale_init
\`\`\``
            },
            {
              title: 'Basic Usage and Examples',
              content: `**Initialization:**
\`\`\`c
#include <librale.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Initialize RALE context
    rale_context_t *ctx = rale_init();
    if (!ctx) {
        fprintf(stderr, "Failed to initialize RALE context\\n");
        return 1;
    }

    // Configure the node
    rale_config_t config = {
        .node_id = "node1",
        .cluster_id = "my-cluster",
        .listen_addr = "0.0.0.0:8080",
        .data_dir = "/var/lib/rale",
        .heartbeat_interval_ms = 100,
        .election_timeout_ms = 1000,
        .max_log_entries = 10000,
        .snapshot_threshold = 1000
    };

    // Start the consensus node
    int result = rale_start(ctx, &config);
    if (result != RALE_SUCCESS) {
        fprintf(stderr, "Failed to start RALE node: %s\\n", rale_error_string(result));
        rale_destroy(ctx);
        return 1;
    }

    printf("RALE node started successfully\\n");
    
    // Cleanup
    rale_stop(ctx);
    rale_destroy(ctx);
    return 0;
}
\`\`\`

**Key-Value Operations:**
\`\`\`c
// Store a key-value pair
const char *key = "user:123";
const char *value = "{\\"name\\": \\"John Doe\\", \\"email\\": \\"john@example.com\\"}";

rale_result_t result = rale_put(ctx, key, strlen(key), value, strlen(value));
if (result != RALE_SUCCESS) {
    fprintf(stderr, "Failed to store key-value pair: %s\\n", rale_error_string(result));
}

// Retrieve a value
char *retrieved_value = NULL;
size_t value_len = 0;
result = rale_get(ctx, key, strlen(key), (void**)&retrieved_value, &value_len);
if (result == RALE_SUCCESS) {
    printf("Retrieved value: %.*s\\n", (int)value_len, retrieved_value);
    free(retrieved_value);
} else {
    fprintf(stderr, "Failed to retrieve value: %s\\n", rale_error_string(result));
}

// Delete a key
result = rale_delete(ctx, key, strlen(key));
if (result != RALE_SUCCESS) {
    fprintf(stderr, "Failed to delete key: %s\\n", rale_error_string(result));
}
\`\`\``
            },
            {
              title: 'Complete API Reference',
              content: `**Context Management:**
\`\`\`c
// Initialize a new RALE context
rale_context_t* rale_init(void);

// Destroy a RALE context and free all resources
void rale_destroy(rale_context_t *ctx);

// Start the consensus node with given configuration
rale_result_t rale_start(rale_context_t *ctx, const rale_config_t *config);

// Stop the consensus node gracefully
rale_result_t rale_stop(rale_context_t *ctx);

// Check if the node is running
bool rale_is_running(const rale_context_t *ctx);
\`\`\`

**Key-Value Store Operations:**
\`\`\`c
// Store a key-value pair (synchronous)
rale_result_t rale_put(rale_context_t *ctx, const void *key, size_t key_len,
                      const void *value, size_t value_len);

// Store a key-value pair (asynchronous with callback)
rale_result_t rale_put_async(rale_context_t *ctx, const void *key, size_t key_len,
                            const void *value, size_t value_len,
                            rale_callback_t callback, void *user_data);

// Retrieve a value by key
rale_result_t rale_get(rale_context_t *ctx, const void *key, size_t key_len,
                      void **value, size_t *value_len);

// Delete a key and its value
rale_result_t rale_delete(rale_context_t *ctx, const void *key, size_t key_len);

// Check if a key exists
rale_result_t rale_exists(rale_context_t *ctx, const void *key, size_t key_len, bool *exists);

// Get all keys matching a prefix
rale_result_t rale_list_keys(rale_context_t *ctx, const void *prefix, size_t prefix_len,
                            rale_key_iterator_t **iterator);
\`\`\`

**Cluster Management:**
\`\`\`c
// Add a new node to the cluster
rale_result_t rale_add_node(rale_context_t *ctx, const char *node_id, const char *address);

// Remove a node from the cluster
rale_result_t rale_remove_node(rale_context_t *ctx, const char *node_id);

// Get cluster membership information
rale_result_t rale_get_cluster_info(rale_context_t *ctx, rale_cluster_info_t **info);

// Get current leader information
rale_result_t rale_get_leader(rale_context_t *ctx, char **leader_id, char **leader_addr);

// Get current node state
rale_result_t rale_get_state(rale_context_t *ctx, rale_node_state_t *state);
\`\`\`

**Configuration and Monitoring:**
\`\`\`c
// Get node statistics
rale_result_t rale_get_stats(rale_context_t *ctx, rale_stats_t **stats);

// Trigger a snapshot
rale_result_t rale_trigger_snapshot(rale_context_t *ctx);

// Set log level
void rale_set_log_level(rale_log_level_t level);

// Set custom logger
void rale_set_logger(rale_logger_t logger, void *user_data);

// Get error string for error code
const char* rale_error_string(rale_result_t result);
\`\`\``
            },
            {
              title: 'Advanced Configuration',
              content: `**Configuration Structure:**
\`\`\`c
typedef struct {
    char node_id[64];              // Unique node identifier
    char cluster_id[64];           // Cluster identifier
    char listen_addr[256];         // Address to listen on
    char data_dir[256];            // Data directory for persistence
    uint32_t heartbeat_interval_ms; // Heartbeat interval in milliseconds
    uint32_t election_timeout_ms;   // Election timeout in milliseconds
    uint32_t max_log_entries;      // Maximum log entries before snapshot
    uint32_t snapshot_threshold;   // Number of entries for snapshot trigger
    bool enable_tls;               // Enable TLS encryption
    char tls_cert_file[256];       // TLS certificate file
    char tls_key_file[256];        // TLS private key file
    char tls_ca_file[256];         // TLS CA certificate file
    bool enable_metrics;           // Enable Prometheus metrics
    uint16_t metrics_port;         // Metrics server port
    uint32_t max_connections;      // Maximum concurrent connections
    uint32_t send_buffer_size;     // Network send buffer size
    uint32_t recv_buffer_size;     // Network receive buffer size
} rale_config_t;
\`\`\`

**Performance Tuning:**
\`\`\`c
// Optimize for high throughput
rale_config_t config = {
    .heartbeat_interval_ms = 50,    // Faster heartbeats
    .election_timeout_ms = 500,     // Shorter election timeout
    .max_log_entries = 50000,       // Larger log before snapshot
    .max_connections = 1000,        // More concurrent connections
    .send_buffer_size = 1024 * 1024, // 1MB send buffer
    .recv_buffer_size = 1024 * 1024  // 1MB receive buffer
};

// Optimize for low latency
rale_config_t config = {
    .heartbeat_interval_ms = 25,    // Very fast heartbeats
    .election_timeout_ms = 250,     // Very short election timeout
    .max_log_entries = 1000,        // Frequent snapshots
    .send_buffer_size = 64 * 1024,  // Smaller buffers
    .recv_buffer_size = 64 * 1024
};
\`\`\``
            },
            {
              title: 'Error Handling and Debugging',
              content: `**Error Codes:**
\`\`\`c
typedef enum {
    RALE_SUCCESS = 0,              // Operation successful
    RALE_ERROR_INVALID_ARG,        // Invalid argument
    RALE_ERROR_OUT_OF_MEMORY,      // Memory allocation failed
    RALE_ERROR_IO_ERROR,           // I/O operation failed
    RALE_ERROR_NETWORK_ERROR,      // Network operation failed
    RALE_ERROR_NOT_LEADER,         // Operation requires leader
    RALE_ERROR_NOT_FOUND,          // Key not found
    RALE_ERROR_ALREADY_EXISTS,     // Key already exists
    RALE_ERROR_CLUSTER_NOT_READY,  // Cluster not ready
    RALE_ERROR_TIMEOUT,            // Operation timeout
    RALE_ERROR_INTERNAL            // Internal error
} rale_result_t;
\`\`\`

**Error Handling Best Practices:**
\`\`\`c
rale_result_t result = rale_put(ctx, key, key_len, value, value_len);
switch (result) {
    case RALE_SUCCESS:
        printf("Operation successful\\n");
        break;
    case RALE_ERROR_NOT_LEADER:
        printf("Node is not the leader, retrying...\\n");
        // Wait and retry
        usleep(100000); // 100ms
        result = rale_put(ctx, key, key_len, value, value_len);
        break;
    case RALE_ERROR_TIMEOUT:
        printf("Operation timed out, increasing timeout...\\n");
        // Increase timeout and retry
        break;
    default:
        fprintf(stderr, "Operation failed: %s\\n", rale_error_string(result));
        break;
}
\`\`\`

**Debugging and Logging:**
\`\`\`c
// Set debug logging
rale_set_log_level(RALE_LOG_DEBUG);

// Custom logger
void my_logger(rale_log_level_t level, const char *file, int line, const char *msg) {
    const char *level_str[] = {"DEBUG", "INFO", "WARN", "ERROR"};
    printf("[%s] %s:%d %s\\n", level_str[level], file, line, msg);
}

rale_set_logger(my_logger, NULL);
\`\`\``
            }
          ]
        },
        'raled Documentation': {
          sections: [
            {
              title: 'Daemon Process',
              content: `raled is the cluster management daemon that runs on each node in the RALE cluster.

**Configuration:**
\`\`\`toml
[cluster]
name = "my-cluster"
node_id = "node1"

[raft]
listen_addr = "0.0.0.0:8080"
heartbeat_interval = 100ms
election_timeout = 1000ms

[storage]
data_dir = "/var/lib/rale"
\`\`\`

**Starting the daemon:**
\`\`\`bash
raled --config /etc/rale/raled.conf
\`\`\``
            },
            {
              title: 'Cluster Management',
              content: `raled handles:

- **Leader Election**: Participates in Raft leader election
- **Log Replication**: Replicates log entries across cluster
- **Membership Changes**: Handles node addition/removal
- **Network Communication**: Manages inter-node communication
- **State Persistence**: Persists cluster state to disk

The daemon automatically handles failover and recovery scenarios.`
            }
          ]
        },
        'ralectrl Documentation': {
          sections: [
            {
              title: 'Command Line Interface Overview',
              content: `ralectrl is the command-line interface for managing RALE clusters. It provides comprehensive cluster management, monitoring, and administrative capabilities through an intuitive CLI.

**Key Features:**
- **Cluster Management**: Create, configure, and manage RALE clusters
- **Node Operations**: Add, remove, and monitor cluster nodes
- **Key-Value Operations**: Store, retrieve, and manage distributed data
- **Health Monitoring**: Real-time cluster health and performance monitoring
- **Configuration Management**: Dynamic cluster configuration updates
- **Backup and Recovery**: Cluster backup and disaster recovery operations
- **Security Management**: Authentication, authorization, and TLS configuration

**Architecture:**
ralectrl communicates with RALE clusters through:
1. **Direct Connection**: Connects to cluster nodes via TCP
2. **Leader Discovery**: Automatically discovers and connects to the current leader
3. **Failover Handling**: Automatically reconnects to new leader during failover
4. **Batch Operations**: Supports batch operations for efficiency
5. **Interactive Mode**: Provides interactive shell for complex operations`
            },
            {
              title: 'Installation and Setup',
              content: `**Installation:**
ralectrl is installed as part of the RALE package:

\`\`\`bash
# Install RALE (includes ralectrl)
git clone https://github.com/pgElephant/rale.git
cd rale
make && sudo make install

# Verify installation
ralectrl --version
\`\`\`

**Configuration:**
\`\`\`bash
# Set default cluster connection
export RALE_CLUSTER="my-cluster"
export RALE_NODE="node1:8080"

# Or use configuration file
cat > ~/.ralectrl.conf << EOF
[default]
cluster = my-cluster
node = node1:8080
timeout = 30s
tls_enabled = false

[clusters]
my-cluster = node1:8080,node2:8080,node3:8080
test-cluster = test1:8080,test2:8080
EOF
\`\`\`

**Authentication:**
\`\`\`bash
# Set authentication credentials
export RALE_USER="admin"
export RALE_PASSWORD="secret"

# Or use key file
ralectrl auth login --username admin --password secret
\`\`\``
            },
            {
              title: 'Cluster Management Commands',
              content: `**Cluster Creation and Configuration:**
\`\`\`bash
# Create a new cluster
ralectrl cluster create --name my-cluster \\
  --node node1:8080 \\
  --replication-factor 3 \\
  --heartbeat-interval 100ms \\
  --election-timeout 1000ms

# Get cluster information
ralectrl cluster info --cluster my-cluster

# List all clusters
ralectrl cluster list

# Delete a cluster
ralectrl cluster delete --cluster my-cluster --force
\`\`\`

**Node Management:**
\`\`\`bash
# Add a node to cluster
ralectrl cluster add-node --cluster my-cluster \\
  --node node4:8080 \\
  --data-dir /var/lib/rale/node4

# Remove a node from cluster
ralectrl cluster remove-node --cluster my-cluster \\
  --node node4:8080 \\
  --force

# List cluster nodes
ralectrl cluster nodes --cluster my-cluster

# Get node status
ralectrl cluster node-status --cluster my-cluster --node node1
\`\`\`

**Cluster Status and Health:**
\`\`\`bash
# Get cluster status
ralectrl cluster status --cluster my-cluster

# Get detailed cluster health
ralectrl cluster health --cluster my-cluster --verbose

# Monitor cluster in real-time
ralectrl cluster monitor --cluster my-cluster --interval 5s

# Get cluster statistics
ralectrl cluster stats --cluster my-cluster
\`\`\``
            },
            {
              title: 'Key-Value Store Operations',
              content: `**Basic Data Operations:**
\`\`\`bash
# Store a key-value pair
ralectrl kv put --cluster my-cluster \\
  --key "user:123" \\
  --value '{"name": "John Doe", "email": "john@example.com", "age": 30}'

# Store with TTL (time-to-live)
ralectrl kv put --cluster my-cluster \\
  --key "session:abc123" \\
  --value "user_data" \\
  --ttl 3600s

# Retrieve a value
ralectrl kv get --cluster my-cluster --key "user:123"

# Retrieve with JSON formatting
ralectrl kv get --cluster my-cluster --key "user:123" --format json

# Delete a key
ralectrl kv delete --cluster my-cluster --key "user:123"

# Check if key exists
ralectrl kv exists --cluster my-cluster --key "user:123"
\`\`\`

**Batch Operations:**
\`\`\`bash
# Batch put operations
ralectrl kv batch-put --cluster my-cluster --file data.json

# Batch get operations
ralectrl kv batch-get --cluster my-cluster --keys key1,key2,key3

# Batch delete operations
ralectrl kv batch-delete --cluster my-cluster --keys key1,key2,key3
\`\`\`

**Key Listing and Searching:**
\`\`\`bash
# List all keys
ralectrl kv list --cluster my-cluster

# List keys with prefix
ralectrl kv list --cluster my-cluster --prefix "user:"

# List keys with pattern matching
ralectrl kv list --cluster my-cluster --pattern "user:*"

# Search keys with regex
ralectrl kv search --cluster my-cluster --regex "user:[0-9]+"
\`\`\``
            },
            {
              title: 'Advanced Operations',
              content: `**Snapshot and Backup:**
\`\`\`bash
# Create a cluster snapshot
ralectrl snapshot create --cluster my-cluster \\
  --output /backup/cluster-snapshot-$(date +%Y%m%d).tar.gz

# Restore from snapshot
ralectrl snapshot restore --cluster my-cluster \\
  --input /backup/cluster-snapshot-20240101.tar.gz

# List available snapshots
ralectrl snapshot list --cluster my-cluster
\`\`\`

**Configuration Management:**
\`\`\`bash
# Get cluster configuration
ralectrl config get --cluster my-cluster

# Update cluster configuration
ralectrl config set --cluster my-cluster \\
  --heartbeat-interval 50ms \\
  --election-timeout 500ms

# Reset configuration to defaults
ralectrl config reset --cluster my-cluster
\`\`\`

**Performance and Monitoring:**
\`\`\`bash
# Get performance metrics
ralectrl metrics --cluster my-cluster

# Monitor performance in real-time
ralectrl metrics --cluster my-cluster --watch --interval 1s

# Get detailed performance report
ralectrl performance --cluster my-cluster --duration 60s
\`\`\`

**Security Operations:**
\`\`\`bash
# Enable TLS for cluster
ralectrl security enable-tls --cluster my-cluster \\
  --cert-file /etc/ssl/certs/rale.crt \\
  --key-file /etc/ssl/private/rale.key

# Add user authentication
ralectrl security add-user --cluster my-cluster \\
  --username admin \\
  --password secret \\
  --role administrator

# List users
ralectrl security list-users --cluster my-cluster
\`\`\``
            },
            {
              title: 'Interactive Mode and Scripting',
              content: `**Interactive Mode:**
\`\`\`bash
# Start interactive mode
ralectrl interactive --cluster my-cluster

# In interactive mode:
> cluster status
> kv put user:456 '{"name": "Jane"}'
> kv get user:456
> exit
\`\`\`

**Scripting and Automation:**
\`\`\`bash
#!/bin/bash
# Example automation script

CLUSTER="my-cluster"

# Check cluster health
if ! ralectrl cluster health --cluster $CLUSTER --quiet; then
    echo "Cluster is unhealthy!"
    exit 1
fi

# Backup data
ralectrl snapshot create --cluster $CLUSTER \\
  --output "/backup/backup-$(date +%Y%m%d-%H%M%S).tar.gz"

# Cleanup old keys
ralectrl kv list --cluster $CLUSTER --prefix "temp:" | \\
  xargs -I {} ralectrl kv delete --cluster $CLUSTER --key {}
\`\`\`

**Output Formatting:**
\`\`\`bash
# JSON output
ralectrl cluster status --cluster my-cluster --format json

# YAML output
ralectrl cluster status --cluster my-cluster --format yaml

# Table output (default)
ralectrl cluster status --cluster my-cluster --format table

# Custom output
ralectrl kv list --cluster my-cluster --format custom \\
  --template "{{.Key}}: {{.Value}}"
\`\`\``
            },
            {
              title: 'Troubleshooting and Debugging',
              content: `**Common Issues and Solutions:**

**1. Connection Issues:**
\`\`\`bash
# Test connectivity
ralectrl cluster ping --cluster my-cluster

# Check network connectivity
ralectrl debug network --cluster my-cluster

# Verbose connection logging
ralectrl cluster status --cluster my-cluster --verbose --debug
\`\`\`

**2. Performance Issues:**
\`\`\`bash
# Check cluster performance
ralectrl performance --cluster my-cluster --duration 60s

# Monitor resource usage
ralectrl metrics --cluster my-cluster --watch

# Check for bottlenecks
ralectrl debug bottlenecks --cluster my-cluster
\`\`\`

**3. Data Consistency Issues:**
\`\`\`bash
# Check data consistency
ralectrl debug consistency --cluster my-cluster

# Verify replication
ralectrl debug replication --cluster my-cluster

# Check for split-brain
ralectrl debug split-brain --cluster my-cluster
\`\`\`

**Debug Commands:**
\`\`\`bash
# Enable debug logging
ralectrl --debug cluster status --cluster my-cluster

# Get detailed logs
ralectrl logs --cluster my-cluster --node node1 --lines 100

# Trace operations
ralectrl trace --cluster my-cluster --operation kv-put --key test
\`\`\``
            }
          ]
        }
      },
      ram: {
        'Getting Started': {
          sections: [
            {
              title: 'Installation',
              content: `RAM (Resilient Adaptive Manager) provides PostgreSQL clustering with automatic failover.

1. **Install PostgreSQL** (version 12+)
2. **Build and install RAM components**:
   \`\`\`bash
   git clone https://github.com/pgElephant/ram.git
   cd ram
   make && sudo make install
   \`\`\`

3. **Install pgraft extension**:
   \`\`\`sql
   CREATE EXTENSION pgraft;
   \`\`\``
            },
            {
              title: 'Components',
              content: `RAM consists of three main components:

- **pgraft**: PostgreSQL extension implementing Raft consensus
- **ramd**: Cluster management daemon
- **ramctrl**: Command-line control utility

These work together to provide automatic failover for PostgreSQL clusters.`
            }
          ]
        },
        'pgraft Documentation': {
          sections: [
            {
              title: 'PostgreSQL Extension Overview',
              content: `pgraft is a PostgreSQL extension that implements Raft consensus for PostgreSQL clusters, providing automatic failover and high availability capabilities.

**Architecture:**
pgraft integrates directly into PostgreSQL as a shared library extension, providing:

1. **Raft Consensus Engine**: Implements the Raft consensus algorithm within PostgreSQL
2. **Leader Election**: Automatic leader election with configurable timeouts
3. **Log Replication**: Replicates PostgreSQL WAL (Write-Ahead Log) entries across cluster
4. **Failover Management**: Automatic failover when primary node becomes unavailable
5. **Membership Management**: Dynamic cluster membership with safe node addition/removal
6. **Health Monitoring**: Continuous monitoring of cluster health and node status

**Key Features:**
- **Native PostgreSQL Integration**: Runs as a PostgreSQL extension, not external process
- **WAL-based Replication**: Uses PostgreSQL's native WAL for consistency
- **Automatic Failover**: Sub-second failover detection and promotion
- **Split-brain Prevention**: Raft consensus prevents split-brain scenarios
- **Configuration Management**: PostgreSQL-native configuration using GUC parameters
- **Monitoring Integration**: Exposes metrics via PostgreSQL's statistics views

**Performance Characteristics:**
- **Failover Time**: < 1 second detection, < 5 seconds total failover
- **Replication Latency**: < 10ms for local network, < 100ms for WAN
- **Throughput Impact**: < 5% overhead on normal operations
- **Memory Usage**: ~50MB per node for consensus state`
            },
            {
              title: 'Installation and Setup',
              content: `**Prerequisites:**
- PostgreSQL 12+ (tested up to PostgreSQL 17)
- C compiler (GCC 7.0+ or Clang 6.0+)
- PostgreSQL development headers
- OpenSSL 1.1.1+ (for TLS support)

**Building from Source:**
\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/ram.git
cd ram/pgraft

# Build the extension
make USE_PGXS=1

# Install the extension
sudo make USE_PGXS=1 install

# Verify installation
ls -la $(pg_config --pkglibdir)/pgraft.so
\`\`\`

**Database Setup:**
\`\`\`sql
-- Connect to your PostgreSQL database
\\c mydatabase

-- Create the extension
CREATE EXTENSION pgraft;

-- Verify installation
SELECT pgraft_version();
\`\`\`

**Initial Configuration:**
\`\`\`sql
-- Set cluster configuration
ALTER SYSTEM SET pgraft.cluster_id = 'postgres-cluster';
ALTER SYSTEM SET pgraft.node_id = 'node1';
ALTER SYSTEM SET pgraft.listen_addr = '0.0.0.0:8080';
ALTER SYSTEM SET pgraft.data_dir = '/var/lib/postgresql/pgraft';

-- Set consensus parameters
ALTER SYSTEM SET pgraft.heartbeat_interval = '100ms';
ALTER SYSTEM SET pgraft.election_timeout = '1000ms';
ALTER SYSTEM SET pgraft.max_log_entries = 10000;

-- Enable TLS (optional)
ALTER SYSTEM SET pgraft.enable_tls = on;
ALTER SYSTEM SET pgraft.tls_cert_file = '/etc/ssl/certs/pgraft.crt';
ALTER SYSTEM SET pgraft.tls_key_file = '/etc/ssl/private/pgraft.key';

-- Reload configuration
SELECT pg_reload_conf();
\`\`\``
            },
            {
              title: 'Complete Function Reference',
              content: `**Cluster Management Functions:**
\`\`\`sql
-- Get pgraft version information
SELECT pgraft_version();

-- Get current node state (LEADER, FOLLOWER, CANDIDATE)
SELECT pgraft_get_state();

-- Get current leader node information
SELECT pgraft_get_leader();

-- Get cluster membership
SELECT * FROM pgraft_get_cluster_info();

-- Add a new node to the cluster
SELECT pgraft_add_node('node2', '192.168.1.102:8080');

-- Remove a node from the cluster
SELECT pgraft_remove_node('node2');

-- Get cluster statistics
SELECT * FROM pgraft_get_stats();
\`\`\`

**Configuration Functions:**
\`\`\`sql
-- Get current configuration
SELECT * FROM pgraft_get_config();

-- Update configuration parameters
SELECT pgraft_set_config('heartbeat_interval', '50ms');
SELECT pgraft_set_config('election_timeout', '500ms');

-- Trigger a manual snapshot
SELECT pgraft_trigger_snapshot();

-- Get log information
SELECT * FROM pgraft_get_log_info();
\`\`\`

**Monitoring and Diagnostics:**
\`\`\`sql
-- Get detailed cluster status
SELECT * FROM pgraft_cluster_status();

-- Get node health information
SELECT * FROM pgraft_node_health();

-- Get replication lag information
SELECT * FROM pgraft_replication_lag();

-- Get consensus metrics
SELECT * FROM pgraft_consensus_metrics();

-- Get network statistics
SELECT * FROM pgraft_network_stats();
\`\`\`

**Administrative Functions:**
\`\`\`sql
-- Force a leader election (use with caution)
SELECT pgraft_force_election();

-- Pause consensus (for maintenance)
SELECT pgraft_pause_consensus();

-- Resume consensus
SELECT pgraft_resume_consensus();

-- Get consensus log entries
SELECT * FROM pgraft_get_log_entries(100, 200);
\`\`\``
            },
            {
              title: 'Configuration Parameters',
              content: `**Core Configuration:**
\`\`\`sql
-- Cluster identification
pgraft.cluster_id = 'my-cluster'           -- Unique cluster identifier
pgraft.node_id = 'node1'                   -- Unique node identifier
pgraft.listen_addr = '0.0.0.0:8080'       -- Address to listen on
pgraft.data_dir = '/var/lib/pgraft'       -- Data directory for consensus state

-- Consensus parameters
pgraft.heartbeat_interval = '100ms'        -- Heartbeat interval
pgraft.election_timeout = '1000ms'         -- Election timeout
pgraft.max_log_entries = 10000            -- Max log entries before snapshot
pgraft.snapshot_threshold = 1000          -- Entries to trigger snapshot
\`\`\`

**Network Configuration:**
\`\`\`sql
-- Network settings
pgraft.max_connections = 100               -- Maximum concurrent connections
pgraft.send_buffer_size = 1048576         -- Send buffer size (1MB)
pgraft.recv_buffer_size = 1048576         -- Receive buffer size (1MB)
pgraft.connection_timeout = '30s'         -- Connection timeout
pgraft.keepalive_interval = '10s'         -- TCP keepalive interval
\`\`\`

**TLS Configuration:**
\`\`\`sql
-- TLS settings
pgraft.enable_tls = off                    -- Enable TLS encryption
pgraft.tls_cert_file = ''                 -- TLS certificate file
pgraft.tls_key_file = ''                  -- TLS private key file
pgraft.tls_ca_file = ''                   -- TLS CA certificate file
pgraft.tls_verify_mode = 'require'        -- TLS verification mode
\`\`\`

**Performance Tuning:**
\`\`\`sql
-- Performance settings
pgraft.batch_size = 100                   -- Batch size for log replication
pgraft.pipeline_size = 10                 -- Pipeline size for replication
pgraft.compression_enabled = on           -- Enable log compression
pgraft.async_replication = on             -- Enable asynchronous replication
pgraft.wal_sync_method = 'fsync'          -- WAL sync method
\`\`\``
            },
            {
              title: 'Advanced Usage Examples',
              content: `**Setting up a 3-node cluster:**
\`\`\`sql
-- On node1 (initial setup)
CREATE EXTENSION pgraft;
ALTER SYSTEM SET pgraft.cluster_id = 'prod-cluster';
ALTER SYSTEM SET pgraft.node_id = 'node1';
ALTER SYSTEM SET pgraft.listen_addr = '0.0.0.0:8080';
SELECT pg_reload_conf();

-- Start the cluster
SELECT pgraft_start_cluster();

-- On node2
CREATE EXTENSION pgraft;
ALTER SYSTEM SET pgraft.cluster_id = 'prod-cluster';
ALTER SYSTEM SET pgraft.node_id = 'node2';
ALTER SYSTEM SET pgraft.listen_addr = '0.0.0.0:8080';
SELECT pg_reload_conf();

-- Add node2 to the cluster (from node1)
SELECT pgraft_add_node('node2', '192.168.1.102:8080');

-- On node3
CREATE EXTENSION pgraft;
ALTER SYSTEM SET pgraft.cluster_id = 'prod-cluster';
ALTER SYSTEM SET pgraft.node_id = 'node3';
ALTER SYSTEM SET pgraft.listen_addr = '0.0.0.0:8080';
SELECT pg_reload_conf();

-- Add node3 to the cluster (from any existing node)
SELECT pgraft_add_node('node3', '192.168.1.103:8080');
\`\`\`

**Monitoring cluster health:**
\`\`\`sql
-- Create a monitoring view
CREATE VIEW cluster_health AS
SELECT 
    node_id,
    state,
    is_leader,
    last_heartbeat,
    replication_lag,
    connection_count
FROM pgraft_cluster_status();

-- Monitor cluster health
SELECT * FROM cluster_health ORDER BY is_leader DESC, node_id;

-- Check for replication lag
SELECT 
    node_id,
    replication_lag,
    CASE 
        WHEN replication_lag > '1s' THEN 'WARNING'
        WHEN replication_lag > '5s' THEN 'CRITICAL'
        ELSE 'OK'
    END as status
FROM pgraft_replication_lag();
\`\`\`

**Handling failover scenarios:**
\`\`\`sql
-- Check current leader
SELECT pgraft_get_leader();

-- Monitor for leader changes
CREATE OR REPLACE FUNCTION monitor_leader_changes()
RETURNS void AS $$
DECLARE
    current_leader text;
    previous_leader text := '';
BEGIN
    LOOP
        SELECT pgraft_get_leader() INTO current_leader;
        
        IF current_leader != previous_leader THEN
            RAISE NOTICE 'Leader changed from % to %', previous_leader, current_leader;
            previous_leader := current_leader;
        END IF;
        
        PERFORM pg_sleep(1);
    END LOOP;
END;
$$ LANGUAGE plpgsql;
\`\`\``
            },
            {
              title: 'Troubleshooting and Diagnostics',
              content: `**Common Issues and Solutions:**

**1. Node not joining cluster:**
\`\`\`sql
-- Check node state
SELECT pgraft_get_state();

-- Check network connectivity
SELECT * FROM pgraft_network_stats();

-- Verify configuration
SELECT * FROM pgraft_get_config();
\`\`\`

**2. High replication lag:**
\`\`\`sql
-- Check replication lag
SELECT * FROM pgraft_replication_lag();

-- Optimize network settings
ALTER SYSTEM SET pgraft.send_buffer_size = 2097152;  -- 2MB
ALTER SYSTEM SET pgraft.recv_buffer_size = 2097152;  -- 2MB
ALTER SYSTEM SET pgraft.batch_size = 200;
SELECT pg_reload_conf();
\`\`\`

**3. Frequent leader elections:**
\`\`\`sql
-- Check election metrics
SELECT * FROM pgraft_consensus_metrics();

-- Adjust timeouts
ALTER SYSTEM SET pgraft.heartbeat_interval = '50ms';
ALTER SYSTEM SET pgraft.election_timeout = '500ms';
SELECT pg_reload_conf();
\`\`\`

**Diagnostic Queries:**
\`\`\`sql
-- Get comprehensive cluster status
SELECT 
    c.node_id,
    c.state,
    c.is_leader,
    h.last_heartbeat,
    h.connection_count,
    r.replication_lag,
    m.election_count,
    m.heartbeat_count
FROM pgraft_cluster_status() c
LEFT JOIN pgraft_node_health() h ON c.node_id = h.node_id
LEFT JOIN pgraft_replication_lag() r ON c.node_id = r.node_id
LEFT JOIN pgraft_consensus_metrics() m ON c.node_id = m.node_id;

-- Check for split-brain conditions
SELECT 
    node_id,
    state,
    last_heartbeat,
    CASE 
        WHEN last_heartbeat < NOW() - INTERVAL '5 seconds' THEN 'STALE'
        ELSE 'ACTIVE'
    END as heartbeat_status
FROM pgraft_node_health();
\`\`\``
            }
          ]
        },
        'ramd Documentation': {
          sections: [
            {
              title: 'Cluster Daemon',
              content: `ramd is the cluster management daemon that monitors PostgreSQL instances and coordinates failover.

**Configuration:**
\`\`\`toml
[cluster]
name = "postgres-cluster"
node_id = "node1"

[postgresql]
host = "localhost"
port = 5432
database = "postgres"
user = "postgres"

[raft]
listen_addr = "0.0.0.0:8080"
heartbeat_interval = "100ms"
election_timeout = "1000ms"

[monitoring]
prometheus_port = 9090
\`\`\``
            },
            {
              title: 'HTTP API',
              content: `ramd provides a REST API for cluster management:

**Endpoints:**
- \`GET /api/v1/status\`: Get cluster status
- \`GET /api/v1/nodes\`: List all nodes
- \`POST /api/v1/failover\`: Trigger manual failover
- \`GET /api/v1/metrics\`: Prometheus metrics

**Example:**
\`\`\`bash
curl http://localhost:8080/api/v1/status
\`\`\``
            }
          ]
        }
      },
      fauxdb: {
        'Getting Started': {
          sections: [
            {
              title: 'Installation',
              content: `FauxDB is a MongoDB-compatible document database built in Rust with PostgreSQL backend.

1. **Install Rust** (latest stable version)
2. **Install PostgreSQL** (version 12+)
3. **Clone and build FauxDB**:
   \`\`\`bash
   git clone https://github.com/pgElephant/fauxdb.git
   cd fauxdb
   cargo build --release
   \`\`\``
            },
            {
              title: 'Quick Start',
              content: `**Start FauxDB server:**
\`\`\`bash
./target/release/fauxdb --config fauxdb.toml
\`\`\`

**Connect with MongoDB client:**
\`\`\`javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
\`\`\``
            }
          ]
        },
        'Docker Setup': {
          sections: [
            {
              title: 'Docker Compose',
              content: `**docker-compose.yml:**
\`\`\`yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: fauxdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  fauxdb:
    build: .
    ports:
      - "27017:27017"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://postgres:password@postgres:5432/fauxdb

volumes:
  postgres_data:
\`\`\``
            },
            {
              title: 'Running with Docker',
              content: `**Start the stack:**
\`\`\`bash
docker-compose up -d
\`\`\`

**Connect to FauxDB:**
\`\`\`bash
docker exec -it fauxdb_fauxdb_1 mongosh
\`\`\``
            }
          ]
        }
      }
    }

    const docContent = content[productId]?.[docTitle]
    if (!docContent) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <p className="text-gray-600">
            Documentation content for "{docTitle}" is being prepared. 
            Please check back soon or visit the full documentation page.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {docContent.sections.map((section: any, index: number) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-thin text-gray-900 mb-4">
              {section.title}
            </h3>
            <div className="prose prose-sm max-w-none">
              {renderFormattedContent(section.content)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Function to get quick overview content
  const getQuickOverview = (productId: string, docTitle: string) => {
    const overviews: { [key: string]: { [key: string]: string } } = {
      rale: {
        'Getting Started': 'RALE (Resilient Adaptive Leader Election) is a distributed consensus system. Start by installing the core components: librale (C library), raled (daemon), and ralectrl (CLI tool).',
        'librale Documentation': 'The librale C library provides the core consensus algorithms and distributed key-value store functionality. It implements Raft consensus with optimizations for high availability.',
        'raled Documentation': 'raled is the cluster management daemon that runs on each node. It handles network communication, state management, and coordinates with other nodes in the cluster.',
        'ralectrl Documentation': 'ralectrl is the command-line interface for managing RALE clusters. Use it to create clusters, add/remove nodes, and monitor cluster health.',
        'Architecture Guide': 'RALE uses a distributed architecture with leader election, log replication, and membership management. The system is designed for high availability and fault tolerance.',
        'API Reference': 'Complete API documentation for all RALE components including C library functions, daemon configuration, and CLI commands.',
        'Examples': 'Code examples and use cases showing how to integrate RALE into your applications, from simple key-value operations to complex distributed systems.',
        'Troubleshooting': 'Common issues and solutions for RALE deployment, including network problems, node failures, and configuration errors.'
      },
      ram: {
        'Getting Started': 'RAM (Resilient Adaptive Manager) provides PostgreSQL clustering with automatic failover. Install pgraft extension, ramd daemon, and ramctrl CLI tool.',
        'pgraft Documentation': 'pgraft is a PostgreSQL extension that implements Raft consensus for PostgreSQL clusters. It provides automatic leader election and failover capabilities.',
        'ramd Documentation': 'ramd is the cluster management daemon that monitors PostgreSQL instances and coordinates failover operations using Raft consensus.',
        'ramctrl Documentation': 'ramctrl is the command-line tool for managing RAM clusters. Use it to create clusters, monitor status, and perform administrative operations.',
        'Docker Setup': 'Deploy RAM using Docker containers. Includes docker-compose configurations for multi-node PostgreSQL clusters with automatic failover.',
        'Kubernetes': 'Deploy RAM on Kubernetes using Helm charts. Provides high availability PostgreSQL clusters with automatic failover in containerized environments.',
        'Configuration': 'Advanced configuration options for RAM components including cluster settings, PostgreSQL parameters, and monitoring configuration.',
        'Monitoring': 'Monitor RAM clusters using Prometheus metrics. Track cluster health, failover events, and performance metrics.',
        'API Reference': 'REST API documentation for ramd daemon. Programmatically manage clusters, query status, and perform administrative operations.',
        'Troubleshooting': 'Common issues and solutions for RAM deployment including PostgreSQL connection problems, failover failures, and cluster split-brain scenarios.'
      },
      fauxdb: {
        'Getting Started': 'FauxDB is a MongoDB-compatible document database built in Rust with PostgreSQL backend. Install Rust, PostgreSQL, and configure FauxDB server.',
        'Docker Setup': 'Deploy FauxDB using Docker containers. Includes docker-compose configurations for development and production environments.',
        'Configuration': 'Configure FauxDB server using TOML configuration files. Set up database connections, authentication, and performance tuning.',
        'MongoDB Compatibility': 'FauxDB implements MongoDB wire protocol for seamless compatibility with existing MongoDB drivers and applications.',
        'API Reference': 'Complete API documentation for FauxDB including MongoDB-compatible operations, custom extensions, and administrative functions.',
        'Performance Tuning': 'Optimize FauxDB performance including connection pooling, query optimization, and PostgreSQL backend tuning.',
        'Security': 'Configure authentication, authorization, and encryption for FauxDB deployments. Includes SSL/TLS setup and user management.',
        'Troubleshooting': 'Common issues and solutions for FauxDB deployment including connection problems, performance issues, and compatibility problems.'
      }
    }

  return (
      <p className="text-gray-700 leading-relaxed">
        {overviews[productId]?.[docTitle] || `This section covers ${docTitle} for ${productId.toUpperCase()}. Click "View Full Documentation" to see the complete guide.`}
      </p>
    )
  }

  const products = [
    {
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      icon: '/ico/RALE_HD.ico',
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      description: 'Distributed consensus and key-value store system for high availability',
      docs: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Guide', description: 'Install and configure RALE components' },
        { title: 'librale Documentation', href: '/docs/rale/librale', type: 'Reference', description: 'Core C library API reference' },
        { title: 'raled Documentation', href: '/docs/rale/raled', type: 'Reference', description: 'Daemon process configuration and management' },
        { title: 'ralectrl Documentation', href: '/docs/rale/ralectrl', type: 'Reference', description: 'Command-line interface reference' },
        { title: 'Architecture Guide', href: '/docs/rale/architecture', type: 'Guide', description: 'Understanding RALE architecture and design' },
        { title: 'API Reference', href: '/docs/rale/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Examples', href: '/docs/rale/examples', type: 'Tutorial', description: 'Code examples and use cases' },
        { title: 'Troubleshooting', href: '/docs/rale/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      icon: '/ico/RAM_HD.ico',
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      description: 'PostgreSQL clustering solution with automatic failover and Raft consensus',
      docs: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Guide', description: 'Install and configure RAM components' },
        { title: 'ramd Documentation', href: '/docs/ram/ramd', type: 'Reference', description: 'Cluster management daemon' },
        { title: 'ramctrl Documentation', href: '/docs/ram/ramctrl', type: 'Reference', description: 'Command-line control utility' },
        { title: 'Docker Setup', href: '/docs/ram/docker', type: 'Tutorial', description: 'Containerized deployment guide' },
        { title: 'Kubernetes', href: '/docs/ram/kubernetes', type: 'Tutorial', description: 'Kubernetes deployment with Helm' },
        { title: 'Configuration', href: '/docs/ram/configuration', type: 'Guide', description: 'Advanced configuration options' },
        { title: 'Monitoring', href: '/docs/ram/monitoring', type: 'Guide', description: 'Prometheus metrics and monitoring' },
        { title: 'API Reference', href: '/docs/ram/api', type: 'Reference', description: 'REST API documentation' },
        { title: 'Troubleshooting', href: '/docs/ram/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'PostgreSQL Raft Extension',
      icon: '/ico/pgsql_raft_leader_HD.ico',
      bg: { from: palette.tealDeep, via: palette.teal, to: palette.cyan },
      description: 'PostgreSQL extension implementing Raft consensus protocol for distributed database systems',
      docs: [
        { title: 'Getting Started', href: '/docs/pgraft/getting-started', type: 'Guide', description: 'Install and configure pgraft extension' },
        { title: 'Installation', href: '/docs/pgraft/installation', type: 'Guide', description: 'Build and install from source' },
        { title: 'Configuration', href: '/docs/pgraft/configuration', type: 'Guide', description: 'PostgreSQL configuration settings' },
        { title: 'SQL Functions', href: '/docs/pgraft/sql-functions', type: 'Reference', description: 'PostgreSQL SQL function reference' },
        { title: 'Raft Protocol', href: '/docs/pgraft/raft-protocol', type: 'Guide', description: 'Understanding Raft consensus implementation' },
        { title: 'Cluster Management', href: '/docs/pgraft/cluster-management', type: 'Guide', description: 'Managing PostgreSQL clusters with Raft' },
        { title: 'Performance Tuning', href: '/docs/pgraft/performance', type: 'Guide', description: 'Optimization and performance considerations' },
        { title: 'Troubleshooting', href: '/docs/pgraft/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      description: 'MongoDB-compatible document database built in Rust with PostgreSQL backend',
      docs: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Guide', description: 'Install and configure FauxDB' },
        { title: 'Docker Setup', href: '/docs/fauxdb/docker', type: 'Tutorial', description: 'Containerized deployment guide' },
        { title: 'Configuration', href: '/docs/fauxdb/configuration', type: 'Guide', description: 'Configuration file reference' },
        { title: 'MongoDB Compatibility', href: '/docs/fauxdb/mongodb-compatibility', type: 'Guide', description: 'MongoDB wire protocol support' },
        { title: 'API Reference', href: '/docs/fauxdb/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Performance Tuning', href: '/docs/fauxdb/performance', type: 'Guide', description: 'Optimization and tuning guide' },
        { title: 'Security', href: '/docs/fauxdb/security', type: 'Guide', description: 'Authentication and authorization' },
        { title: 'Troubleshooting', href: '/docs/fauxdb/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    }
  ]

  // Function to render content based on active section
  const renderContent = () => {
    if (!activeProduct || !activeSection) {
      return (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-thin text-gray-900 mb-4">
              Product Documentation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive documentation for all pgElephant products. Each product includes guides, API references, and tutorials to help you get started and master advanced features.
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-thin">
              👈 Click on any documentation link in the sidebar to get started
            </div>
          </div>

          {/* All Documentation Links - Simple List Layout */}
          <div className="space-y-16">
            {products.map((product) => (
              <div key={product.id} className="border-b border-gray-200 pb-16 last:border-b-0">
                {/* Product Header */}
                <div className="flex items-center mb-6">
                  <Image 
                    src={product.icon} 
                    alt={`${product.name} icon`}
                    width={48}
                    height={48}
                    className="w-12 h-12 mr-4 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-thin text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {product.title}
                    </p>
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Documentation Links - Simple Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {product.docs.map((doc, index) => (
                    <button
                      key={index}
                      onClick={() => handleSidebarClick(product.id, doc.title)}
                      className="flex items-start gap-4 p-4 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-thin"
                              style={{
                                backgroundColor: doc.type === 'Guide' ? '#E0F2FE' : 
                                               doc.type === 'Reference' ? '#F0FDF4' : '#FEF3C7',
                                color: doc.type === 'Guide' ? '#0369A1' : 
                                      doc.type === 'Reference' ? '#166534' : '#92400E'
                              }}>
                          {doc.type}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-thin text-gray-900 group-hover:text-blue-700 mb-1">
                          {doc.title}
                        </div>
                        <p className="text-sm text-gray-600">
                          {doc.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4">
                  <Link
                    href={`/${product.id}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-thin"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/download"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors font-thin"
                    style={{ backgroundColor: palette.cyan }}
                  >
                    Download
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Find the active product and documentation
    const product = products.find(p => p.id === activeProduct)
    const doc = product?.docs.find(d => d.title === activeSection)

    if (!product || !doc) return null

  return (
      <div>
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button
                onClick={() => { 
                  setActiveProduct(null); 
                  setActiveSection(null);
                  setTimeout(() => {
                    const contentElement = document.getElementById('docs-content')
                    if (contentElement) {
                      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                }}
                className="inline-flex items-center text-sm font-thin text-gray-700 hover:text-blue-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                <button
                  onClick={() => {
                    setActiveSection(null);
                    setTimeout(() => {
                      const contentElement = document.getElementById('docs-content')
                      if (contentElement) {
                        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }, 100)
                  }}
                  className="ml-1 text-sm font-thin text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  {product.name}
                </button>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="ml-1 text-sm font-thin text-gray-500 md:ml-2">
                  {doc.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Content Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Image 
              src={product.icon} 
              alt={`${product.name} icon`}
              width={32}
              height={32}
              className="w-8 h-8 mr-3 object-contain"
            />
            <h1 className="text-3xl font-thin text-gray-900">
              {doc.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-thin"
                  style={{
                    backgroundColor: doc.type === 'Guide' ? '#E0F2FE' : 
                                   doc.type === 'Reference' ? '#F0FDF4' : '#FEF3C7',
                    color: doc.type === 'Guide' ? '#0369A1' : 
                          doc.type === 'Reference' ? '#166534' : '#92400E'
                  }}>
              {doc.type}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">{product.name}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            {doc.description}
          </p>
          
          {/* Dynamic content based on documentation type */}
          {renderDocumentationContent(product.id, doc.title)}
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section with elegant gradient background - same as main page */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
          position: 'relative'
        }}
      >
        {/* Elegant overlay gradient - same as Hero */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
          }}
        />
        
        {/* Elegant floating elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/15 to-accent-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="container-wide py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-thin text-white mb-6 drop-shadow-lg">
              Documentation
            </h1>
            <p className="text-xl mb-8 leading-relaxed text-white/90 drop-shadow-md">
              Complete guides and references for pgElephant products. Professional documentation following enterprise standards.
            </p>
            
            {/* Documentation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-thin text-white mb-2 drop-shadow-sm">3</div>
                <div className="text-sm text-white/80 drop-shadow-sm">Products</div>
          </div>
              <div className="text-center">
                <div className="text-3xl font-thin text-white mb-2 drop-shadow-sm">26</div>
                <div className="text-sm text-white/80 drop-shadow-sm">Documentation Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-thin text-white mb-2 drop-shadow-sm">100%</div>
                <div className="text-sm text-white/80 drop-shadow-sm">Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Overview */}
      <div 
        className="py-16"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-gray-900 mb-8 text-center">
              Documentation Structure
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our documentation follows enterprise standards with comprehensive guides, API references, and tutorials for each product.
            </p>
            
            {/* Documentation Categories - Simple List */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" style={{ color: palette.cyan }} />
                <div>
                  <h3 className="font-thin text-gray-900">Guides</h3>
                  <p className="text-gray-600 text-sm">Step-by-step installation and configuration</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" style={{ color: palette.teal }} />
                <div>
                  <h3 className="font-thin text-gray-900">Reference</h3>
                  <p className="text-gray-600 text-sm">Complete API documentation and functions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Container className="w-6 h-6" style={{ color: palette.orange }} />
                <div>
                  <h3 className="font-thin text-gray-900">Tutorials</h3>
                  <p className="text-gray-600 text-sm">Docker, Kubernetes, and deployment guides</p>
                </div>
              </div>
            </div>
          </div>
                    </div>
                  </div>

      {/* Two-Column Documentation Layout */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
              
              {/* Left Sidebar - Navigation */}
              <div className="lg:col-span-2">
            <div className="sticky top-24">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-thin text-gray-900 mb-4">Documentation</h3>
                    
                    {/* Navigation Menu */}
                    <nav className="space-y-2">
                      {products.map((product) => (
                        <div key={product.id} className="mb-6">
                          {/* Product Header */}
                          <div className="flex items-center mb-3">
                            <Image 
                              src={product.icon} 
                              alt={`${product.name} icon`}
                              width={24}
                              height={24}
                              className="w-6 h-6 mr-2 object-contain"
                            />
                            <h4 className="text-sm font-thin text-gray-900">
                              {product.name}
                            </h4>
          </div>

                                {/* Product Documentation Links */}
                                <div className="ml-8 space-y-1">
                                  {product.docs.map((doc, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleSidebarClick(product.id, doc.title)}
                                      className={`block w-full py-2 px-3 text-sm text-left rounded-md transition-colors group ${
                                        activeProduct === product.id && activeSection === doc.title
                                          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                                      }`}
                  >
                    <div className="flex items-center justify-between">
                                        <span className="flex-1">{doc.title}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          activeProduct === product.id && activeSection === doc.title
                                            ? 'bg-blue-200 text-blue-600'
                                            : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                                        }`}>
                                          {doc.type}
                      </span>
                    </div>
                                    </button>
                ))}
                                </div>
                        </div>
                    ))}
                    </nav>
              </div>
            </div>
          </div>

              {/* Right Content - Dynamic Documentation */}
              <div className="lg:col-span-4">
                <div id="docs-content" className="max-w-6xl">
                  {renderContent()}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-thin text-gray-900 mb-6">
              Quick Start
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Get up and running with pgElephant in minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8" style={{ color: palette.cyan }} />
                    </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">
                  Download
                </h3>
                <p className="text-gray-600">
                  Get the latest version of pgElephant products.
                </p>
                    </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">
                  Install
                </h3>
                <p className="text-gray-600">
                  Follow our installation guides for your platform.
                </p>
                  </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">
                  Deploy
                </h3>
                <p className="text-gray-600">
                  Deploy to production with confidence.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-thin text-white transition-all duration-200 shadow-lg"
                style={{ backgroundColor: palette.orange }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
                        </div>
                  </div>
                </div>
            </div>

            {/* Additional Resources */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-gray-900 mb-12 text-center">
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">GitHub</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Source code, issues, and contributions
                </p>
                <Link
                  href="https://github.com/pgElephant"
                  className="text-sm font-thin"
                  style={{ color: palette.cyan }}
                >
                  View on GitHub →
                </Link>
                  </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our community for support
                </p>
                <Link
                  href="/community"
                  className="text-sm font-thin"
                  style={{ color: palette.cyan }}
                >
                  Join Community →
                </Link>
                  </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Latest updates and tutorials
                </p>
                <Link
                  href="/blog"
                  className="text-sm font-thin"
                  style={{ color: palette.cyan }}
                >
                  Read Blog →
                </Link>
                  </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-600" />
              </div>
                <h3 className="text-lg font-thin text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get help and technical support
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-thin"
                  style={{ color: palette.cyan }}
                >
                  Contact Support →
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DocsPage 