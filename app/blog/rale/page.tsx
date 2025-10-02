import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Code, Database, Network, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RALE - Resilient Adaptive Leader Election | pgElephant Blog',
  description: 'Deep dive into RALE, a distributed consensus algorithm for leader election and maintaining consistency in any distributed system.',
}

const palette = {
  iconTeal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e'
  }
}

export default function RALEBlogPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      {/* Header */}
      <div className="relative overflow-hidden py-16" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        {/* Elegant overlay gradient - same as Hero */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
          }}
        />
        
        {/* Elegant floating elements - same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white mb-4">
              Technical Deep Dive
            </div>
            <h1 className="text-4xl md:text-5xl font-thin text-white mb-6">
              RALE - Resilient Adaptive Leader Election
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Deep dive into RALE, a distributed consensus algorithm for leader election and maintaining consistency in any distributed system.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>pgElephant Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>December 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-thin text-white mb-6">Introduction</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              RALE (Resilient Adaptive Leader Election) is a distributed consensus and key-value store system built with modern C engineering practices. 
              It provides reliable distributed coordination and persistent storage for distributed applications with strong consistency guarantees.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Unlike traditional consensus algorithms that focus solely on leader election, RALE combines consensus with a distributed key-value store, 
              making it particularly well-suited for PostgreSQL clustering scenarios where both coordination and state management are critical.
            </p>
          </div>

          {/* Architecture Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-thin text-white mb-6 flex items-center gap-3">
              <Network className="w-8 h-8 text-white/80" />
              System Architecture
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Core Components</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">
                      <strong className="text-white">librale</strong> - Core consensus and distributed store library
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">
                      <strong className="text-white">raled</strong> - Daemon process for cluster management
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">
                      <strong className="text-white">ralectrl</strong> - Command-line interface for operations
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">Thread-safe operations with proper synchronization</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">Memory-safe allocation/deallocation</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">TCP/UDP communication with failover</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90">Unified cluster database storage</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 border border-white/20">
              <h4 className="text-lg font-thin text-white mb-4">Cluster Architecture</h4>
              <div className="text-sm text-white/90 font-mono">
                <pre className="whitespace-pre-wrap">{`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   (Node 1)      │◄──►│   (Node 2)      │◄──►│   (Node 3)      │
│   raled         │    │   raled         │    │   raled         │
│   + librale     │    │   + librale     │    │   + librale     │
│   + cluster.db  │    │   + cluster.db  │    │   + cluster.db  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       ▲                        ▲                        ▲
       │                        │                        │
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│  ralectrl   │        │  ralectrl   │        │  ralectrl   │
│    (CLI)    │        │    (CLI)    │        │    (CLI)    │
└─────────────┘        └─────────────┘        └─────────────┘`}</pre>
              </div>
            </div>
          </div>

          {/* Consensus Algorithm */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-thin text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-white/80" />
              RALE Consensus Protocol
            </h2>
            
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              The RALE consensus protocol ensures distributed agreement and consistency across cluster nodes. 
              It implements a variant of the Raft algorithm optimized for PostgreSQL clustering scenarios.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Leader Election Process</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-white/90">
                    <strong className="text-white">Candidate Selection:</strong> Nodes transition to candidate state during leader timeout
                  </li>
                  <li className="text-white/90">
                    <strong className="text-white">Vote Collection:</strong> Candidates request votes from cluster members
                  </li>
                  <li className="text-white/90">
                    <strong className="text-white">Majority Decision:</strong> Node with majority votes becomes leader
                  </li>
                  <li className="text-white/90">
                    <strong className="text-white">Heartbeat Maintenance:</strong> Leader sends regular heartbeats to maintain authority
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Safety Properties</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Election Safety:</strong> At most one leader per term</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Leader Append-Only:</strong> Leaders never overwrite log entries</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Log Matching:</strong> Consistent log replication across nodes</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Leader Completeness:</strong> Leader contains all committed entries</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-thin text-white mb-4">Log Replication Mechanism</h4>
              <ol className="space-y-3 list-decimal list-inside text-white/90">
                <li><strong className="text-white">Client Request:</strong> Application submits operation to leader</li>
                <li><strong className="text-white">Log Append:</strong> Leader appends entry to local log</li>
                <li><strong className="text-white">Replication:</strong> Leader replicates entry to follower nodes</li>
                <li><strong className="text-white">Commit:</strong> Entry committed when majority acknowledges</li>
                <li><strong className="text-white">Application:</strong> State machine applies committed entries</li>
              </ol>
            </div>
          </div>

          {/* Distributed Store */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-thin text-white mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-white/80" />
              Distributed Store (DStore)
            </h2>
            
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              The DStore provides a distributed key-value storage layer with strong consistency guarantees. 
              It uses a unified cluster database approach for efficient state management.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Storage Architecture</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Hash Table:</strong> In-memory hash table for fast key lookups</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Persistence:</strong> File-based storage for durability</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Replication:</strong> Automatic replication across cluster nodes</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Atomic Operations:</strong> Consistent read/write operations</div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Unified Database Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Faster Startup:</strong> Single file load vs multiple file parsing</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Consistent State:</strong> No race conditions between components</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Efficient Storage:</strong> Binary format vs text parsing</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-white/90"><strong className="text-white">Data Integrity:</strong> Atomic operations with mutex protection</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* API and Usage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 mb-8">
            <h2 className="text-3xl font-thin text-white mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-white/80" />
              API Design and Usage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-thin text-white mb-4">Core API Functions</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <pre className="text-sm text-white/90 font-mono">{`/* Core RALE API */
int rale_init(const config_t *config);
int rale_finit(void);
int rale_process_command(const char *command, 
                         char *response,
                         size_t response_size);
int rale_get_status(char *status, 
                    size_t status_size);
int rale_quram_process(void);`}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-thin text-white mb-4">RALE State Structure</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <pre className="text-sm text-white/90 font-mono">{`typedef struct rale_state_t {
  int32_t current_term;
  int32_t voted_for;
  int32_t leader_id;
  rale_role_t role;
  int32_t last_log_index;
  int32_t last_log_term;
  int32_t commit_index;
  int32_t last_applied;
  time_t last_heartbeat;
  time_t election_deadline;
} rale_state_t;`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-thin text-white mb-4">Quick Start Example</h4>
              <pre className="text-sm text-white/90 font-mono">{`# Clone and build
git clone https://github.com/pgElephant/rale.git
cd rale && ./build.sh

# Start single node
raled --config conf/raled1.conf

# Use CLI to add nodes
ralectrl ADD --node-id 1 --node-name "node1" \\
  --node-ip "127.0.0.1" --rale-port 7400 \\
  --dstore-port 7401`}</pre>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
            <h2 className="text-3xl font-thin text-white mb-6">Conclusion</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              RALE represents a significant advancement in distributed consensus systems, specifically designed for PostgreSQL clustering scenarios. 
              By combining robust leader election with a distributed key-value store, RALE provides the foundation for highly available PostgreSQL deployments.
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              The unified database approach, thread-safe operations, and memory management make RALE suitable for production environments where 
              reliability and performance are paramount. Its clean API design and comprehensive documentation make it accessible for developers 
              building distributed PostgreSQL solutions.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6">
              <h3 className="text-lg font-thin text-white mb-2">Next Steps</h3>
              <p className="text-white/90 mb-4">
                Ready to implement RALE in your PostgreSQL cluster? Check out our comprehensive documentation and examples.
              </p>
              <div className="flex gap-4">
                <Link href="/docs/rale/getting-started" className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors border border-white/30">
                  Getting Started Guide
                </Link>
                <Link href="/rale" className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                  Learn More About RALE
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
