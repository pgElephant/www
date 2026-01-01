import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, User, Tag, Eye, ThumbsUp, MessageCircle, TrendingUp, BookOpen, Code, Database, Server, Zap, Award, Globe, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - pgElephant',
  description: 'Latest updates, tutorials, and technical insights from the pgElephant team',
}

// Use theme config colors
import { colors } from '@/config/theme'

const palette = {
  iconTeal: colors.secondary[700],
  iconTealLight: colors.secondary[600],
  iconTealMedium: colors.secondary[700],
  iconTealDark: colors.secondary[800],
  // Supporting colors from theme
  navy: colors.cool[800],
  navyDeep: colors.cool[900],
  slate: colors.cool[700],
  cyan: colors.secondary[500],
  cyanDeep: colors.secondary[600],
  teal: colors.accent[500],
  tealDeep: colors.accent[600],
  gray100: colors.cool[50],
  gray300: colors.cool[300],
  white: colors.white,
  orange: '#F97316', // Keep specific orange for blog page
  orangeDark: '#EA580C'
}

// Blog statistics
const blogStats = [
  { label: 'Total Articles', value: '16', icon: BookOpen, color: 'text-white' },
  { label: 'Monthly Readers', value: '4.2k', icon: Eye, color: 'text-white' },
  { label: 'Categories', value: '1', icon: Tag, color: 'text-white' },
  { label: 'Authors', value: '1', icon: Users, color: 'text-white' }
]


const blogPosts = [
  {
    slug: 'pgbalancer-3-node-ha',
    title: 'PostgreSQL High Availability with pgBalancer',
    excerpt: 'Complete guide to building a production-ready PostgreSQL high availability cluster with pgBalancer and 3 PostgreSQL nodes. Includes step-by-step setup, configuration, failover testing, and best practices.',
    content: 'Comprehensive production guide for setting up a 3-node PostgreSQL HA cluster with pgBalancer, covering architecture, installation, configuration, failover scenarios, monitoring, and production best practices.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-25',
    readTime: '35 min read',
    category: 'Technical',
    featured: true,
    icon: 'pgbalancer',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['PostgreSQL', 'High Availability', 'pgBalancer', 'Database Clustering', 'Load Balancing', 'Failover', 'Production Guide']
  },
  {
    slug: 'patroni-etcd-ha',
    title: 'PostgreSQL High Availability with Patroni and etcd',
    excerpt: 'Complete guide to building a PostgreSQL high availability cluster with Patroni and etcd. Includes step-by-step setup, configuration, automatic failover, leader election, and best practices.',
    content: 'Comprehensive production guide for setting up a PostgreSQL HA cluster with Patroni leader election and etcd consensus, covering architecture, installation, configuration, failover scenarios, monitoring, and production best practices.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-26',
    readTime: '38 min read',
    category: 'Technical',
    featured: true,
    icon: 'patroni',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['PostgreSQL', 'High Availability', 'Patroni', 'etcd', 'Database Clustering', 'Leader Election', 'Failover', 'Production Guide']
  },
  {
    slug: 'pg-stat-insights-index-monitoring',
    title: 'Index Monitoring with pg_stat_insights v3.0.0',
    excerpt: 'Monitor PostgreSQL indexes using pg_stat_insights v3.0.0. Track index usage, detect bloat, identify missing indexes, and optimize performance with 11 specialized views.',
    content: 'Complete guide to PostgreSQL index monitoring using pg_stat_insights v3.0.0. Includes real queries, outputs, and examples for all 11 index monitoring views.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-22',
    readTime: '18 min read',
    category: 'Technical',
    featured: true,
    icon: 'pg_stat_insights',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['PostgreSQL', 'Index Monitoring', 'Performance Optimization', 'Database Administration', 'pg_stat_insights']
  },
  {
    slug: 'pg-stat-insights-1-0-0',
    title: 'pg_stat_insights 1.0.0 Release Announcement',
    excerpt: 'pg_stat_insights 1.0.0 is a PostgreSQL performance monitoring extension. Provides 52 metrics across 11 views. Production-ready. Easy to install.',
    content: 'pg_stat_insights 1.0.0 provides query performance insights. Includes 52 metrics, 11 views, response-time categories. Works with PostgreSQL 16-17.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-21',
    readTime: '6 min read',
    category: 'Announcement',
    featured: true,
    icon: 'pg_stat_insights',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['PostgreSQL', 'Performance Monitoring', 'Release', 'pg_stat_insights']
  },
  {
    slug: 'neurondb',
    title: 'NeuronDB: PostgreSQL AI Vector Database Extension',
    excerpt: 'NeuronDB adds vector search, ML inference, and RAG capabilities to PostgreSQL. Includes HNSW indexing, GPU acceleration, 10 distance metrics, and pgvector compatibility.',
    content: 'NeuronDB is a PostgreSQL extension. Provides vector search, machine learning inference, GPU acceleration, and hybrid retrieval. For semantic search, RAG applications, and recommendation systems.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-20',
    readTime: '22 min read',
    category: 'Technical',
    featured: true,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['AI', 'Vector Database', 'Machine Learning', 'Semantic Search', 'RAG', 'PostgreSQL']
  },
  {
    slug: 'neurondb-semantic-search-guide',
    title: 'Semantic Search Over Text with NeuronDB',
    excerpt: 'Implement semantic search over text using NeuronDB. Includes examples, SQL queries, and code. Guide to building document search systems, RAG pipelines, and hybrid search.',
    content: 'Guide to implementing semantic search with NeuronDB. Includes examples, SQL queries, RAG pipeline construction, hybrid search techniques, and optimization strategies.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-19',
    readTime: '25 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['NeuronDB', 'Semantic Search', 'RAG', 'Vector Search', 'PostgreSQL', 'Tutorial', 'AI']
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI: Guide to Autonomous AI Agents',
    excerpt: 'Agentic AI systems guide. Explains agent architecture, planning, tool use, memory systems, and autonomous task execution. Includes implementation using NeuronDB and NeuronAgent with code examples.',
    content: 'Agentic AI architecture, planning systems, tool execution, memory management, state machines, and implementation patterns. Learn how to build autonomous agents using NeuronDB and NeuronAgent with code examples.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-24',
    readTime: '40 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['AgenticAI', 'AutonomousAgents', 'AIAgents', 'AgentArchitecture', 'ToolUse', 'Planning', 'MemorySystems', 'NeuronDB', 'NeuronAgent', 'PostgreSQL', 'LLM', 'RAG', 'VectorSearch', 'MachineLearning', 'AI']
  },
  {
    slug: 'ai-with-database-on-prem',
    title: 'AI With Data On-Premises',
    excerpt: 'Guide to deploying AI workloads with databases on-premises. Learn about on-premises AI infrastructure, data sovereignty, security, performance, and implementation with NeuronDB. Includes architecture patterns, deployment strategies, and examples.',
    content: 'On-premises AI infrastructure, data sovereignty, security architecture, performance optimization, deployment strategies, and implementation patterns. Learn how to deploy NeuronDB and AI workloads on-premises with control over data and infrastructure.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-26',
    readTime: '38 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['OnPremises', 'AIInfrastructure', 'DataSovereignty', 'PrivateAI', 'EnterpriseAI', 'SelfHosted', 'NeuronDB', 'PostgreSQL', 'Security', 'Compliance', 'EdgeAI', 'HybridCloud']
  },
  {
    slug: 'neurondb-mcp-server',
    title: 'MCP Server: Model Context Protocol Explained',
    excerpt: 'MCP Server (Model Context Protocol) guide. What it is, how it works, integration with Claude Desktop, known MCP servers, and NeuronMCP implementation. Learn how MCP enables AI assistants to access external tools and resources.',
    content: 'MCP Server architecture, protocol implementation, Claude Desktop integration, popular MCP servers, and NeuronMCP. Learn how the Model Context Protocol enables AI assistants to access external tools and data sources.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-22',
    readTime: '28 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['MCP', 'ModelContextProtocol', 'ClaudeDesktop', 'NeuronMCP', 'AI', 'PostgreSQL', 'VectorDatabase', 'MachineLearning', 'RAG', 'OpenSource', 'NeuronDB']
  },
  {
    slug: 'neurondb-vectors',
    title: 'Vectors in PostgreSQL',
    excerpt: 'Vector operations, indexing, and similarity search in PostgreSQL with NeuronDB. Guide with SQL queries and results. Learn HNSW indexing, distance metrics, quantization, and performance optimization.',
    content: 'Guide to working with vectors in PostgreSQL using NeuronDB. Covers vector types, operations, distance metrics, indexing strategies, quantization, and performance optimization with SQL queries and results.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-21',
    readTime: '30 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['NeuronDB', 'Vectors', 'Vector Search', 'HNSW', 'Distance Metrics', 'PostgreSQL', 'Tutorial', 'AI', 'Indexing']
  },
  {
    slug: 'postgresql-vector-database',
    title: 'PostgreSQL as a Vector Database',
    excerpt: 'Guide to using PostgreSQL as a vector database. Learn how PostgreSQL with NeuronDB extension works as a vector database with HNSW indexing, similarity search, and production capabilities.',
    content: 'PostgreSQL vector database architecture, performance benchmarks, indexing strategies, query patterns, and migration approaches. Learn how PostgreSQL with NeuronDB works as a vector database solution.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-25',
    readTime: '35 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['PostgreSQL', 'VectorDatabase', 'NeuronDB', 'VectorSearch', 'HNSW', 'SQL', 'Database', 'AI', 'SemanticSearch', 'Production', 'Indexing']
  },
  {
    slug: 'rag-architectures-ai-builders-should-understand',
    title: 'RAG Architectures AI Builders Should Understand',
    excerpt: 'Practical guide to the core RAG architecture patterns: basic, conversational, filtered, adaptive, hypothesis-driven, agent-driven, and graph-based RAG. Learn when to use each and what trade-offs matter in production.',
    content: 'Core RAG patterns and how to choose between them. Covers conversational RAG, filtering/reranking, adaptive retrieval, agent-driven workflows, graph-based retrieval, and operational realities.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2026-01-01',
    readTime: '18 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['RAG', 'RAGArchitectures', 'LLM', 'VectorSearch', 'SemanticSearch', 'GraphRAG', 'AgenticAI', 'ProductionAI']
  },
  {
    slug: 'rag-complete-guide',
    title: 'RAG: Retrieval-Augmented Generation With PostgreSQL',
    excerpt: 'RAG (Retrieval-Augmented Generation) guide with examples, SQL queries, and implementation patterns. Learn how to build RAG systems with document retrieval, context building, LLM integration, and response generation.',
    content: 'RAG architecture, implementation patterns, SQL examples, and NeuronDB integration. Learn how to build RAG systems with document processing, embedding generation, similarity search, context building, and response generation.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-23',
    readTime: '35 min read',
    category: 'Technical',
    featured: false,
    icon: 'neurondb',
    views: 0,
    likes: 0,
    comments: 0,
    tags: ['RAG', 'RetrievalAugmentedGeneration', 'LLM', 'VectorSearch', 'SemanticSearch', 'NeuronDB', 'PostgreSQL', 'AI', 'MachineLearning', 'DocumentRetrieval', 'KnowledgeBase']
  },
  {
    slug: 'pgbalancer',
    title: 'pgbalancer: PostgreSQL Connection Pooler',
    excerpt: 'PostgreSQL connection pooler with load balancing, automatic failover, and connection management optimization.',
    content: 'pgbalancer is a PostgreSQL connection pooler. Combines pooling with load balancing, REST API management, and MQTT clustering.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-02-15',
    readTime: '18 min read',
    category: 'Technical',
    featured: true,
    icon: 'pgbalancer',
    views: 856,
    likes: 67,
    comments: 19,
    tags: ['Connection Pooling', 'AI', 'Load Balancing', 'REST API', 'PostgreSQL']
  },
  {
    slug: 'pg-stat-insights',
    title: 'pg_stat_insights: PostgreSQL Performance Monitoring Extension',
    excerpt: 'PostgreSQL performance monitoring with 52 metrics, 11 views, and insights into query execution, cache efficiency, WAL generation, and JIT compilation.',
    content: 'pg_stat_insights replaces pg_stat_statements. Provides PostgreSQL performance monitoring with response time categorization, cache analysis, and query insights.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-01-29',
    readTime: '20 min read',
    category: 'Technical',
    featured: true,
    icon: 'pg_stat_insights',
    views: 1423,
    likes: 98,
    comments: 27,
    tags: ['Performance Monitoring', 'PostgreSQL', 'Query Analytics', 'Observability']
  },
  {
    slug: 'pgraft',
    title: 'pgraft: Raft-Based PostgreSQL Extension',
    excerpt: 'In distributed database systems, achieving consensus across multiple nodes while maintaining data consistency and preventing split-brain is challenging.',
    content: 'pgraft embeds the Raft consensus protocol into PostgreSQL as a native extension.',
    author: 'pgElephant Team',
    authorRole: 'Core Developers',
    date: '2025-01-15',
    readTime: '15 min read',
    category: 'Technical',
    featured: true,
    icon: 'pgraft',
    views: 2847,
    likes: 189,
    comments: 45,
    tags: ['Raft Consensus', 'PostgreSQL', 'High Availability', 'Distributed Systems']
  }
]


const BlogCard = ({ post, index }: { post: typeof blogPosts[0], index: number }) => {
  const isAnnouncement = post.category === 'Announcement'
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full" aria-label={`Read ${post.title}`}>
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:border-white/30 h-full flex flex-col">
          {/* Large Stock Image */}
          <div className={`relative w-full aspect-[3/2] overflow-hidden flex-shrink-0 border border-white/20 flex items-center justify-center ${isAnnouncement ? 'bg-slate-900' : 'bg-slate-800/50'}`}>
            {post.slug === 'pgraft' ? (
              <Image
                src="/blog/pgraft/header.svg?v=7"
                alt="pgraft blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'pg-stat-insights' ? (
              <Image
                src="/blog/pg-stat-insights/header.svg?v=7"
                alt="pg_stat_insights blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'pgbalancer' ? (
              <Image
                src="/blog/pgbalancer/header.svg?v=7"
                alt="pgbalancer blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'pgbalancer-3-node-ha' ? (
              <Image
                src="/blog/pgbalancer-3-node-ha/header.svg?v=2"
                alt="PostgreSQL High Availability with pgBalancer"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'patroni-etcd-ha' ? (
              <Image
                src="/blog/patroni-etcd-ha/header.svg?v=1"
                alt="PostgreSQL High Availability with Patroni and etcd"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'pg-stat-insights-1-0-0' ? (
              <Image
                src="/blog/pg-stat-insights/header.svg?v=7"
                alt="pg_stat_insights release blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'pg-stat-insights-index-monitoring' ? (
              <Image
                src="/blog/pg-stat-insights/header.svg?v=7"
                alt="pg_stat_insights index monitoring blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'neurondb' ? (
              <Image
                src="/blog/neurondb/header.svg?v=7"
                alt="NeuronDB blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'neurondb-semantic-search-guide' ? (
              <Image
                src="/blog/neurondb-semantic-search-guide/header.svg?v=7"
                alt="NeuronDB Semantic Search Guide blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'agentic-ai' ? (
              <Image
                src="/blog/agentic-ai/header.svg?v=7"
                alt="Agentic AI blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'ai-with-database-on-prem' ? (
              <Image
                src="/blog/ai-with-database-on-prem/header.svg?v=12"
                alt="AI With Data On-Premises blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'neurondb-mcp-server' ? (
              <Image
                src="/blog/neurondb-mcp-server/header.svg?v=7"
                alt="MCP Server blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'neurondb-vectors' ? (
              <Image
                src="/blog/neurondb-vectors/header.svg?v=7"
                alt="NeuronDB Vectors Guide blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'postgresql-vector-database' ? (
              <Image
                src="/blog/postgresql-vector-database/header.svg?v=8"
                alt="PostgreSQL as Vector Database blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'rag-architectures-ai-builders-should-understand' ? (
              <Image
                src="/blog/rag-architectures-ai-builders-should-understand/header.svg?v=1"
                alt="RAG Architectures blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : post.slug === 'rag-complete-guide' ? (
              <Image
                src="/blog/rag-complete-guide/header.svg?v=7"
                alt="RAG Complete Guide blog header"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="text-center p-6">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-white/80 text-sm font-thin">{post.category}</div>
              </div>
            )}
            {isAnnouncement && <div className="absolute inset-0 bg-black/30" />}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm/80 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg drop-shadow-lg">
              {post.category}
            </div>
          </div>
          {/* Content */}
          <div className="p-7 flex flex-col flex-1">
            <h3 className="text-2xl font-thin text-white mb-2 group-hover:text-primary-300 transition-colors flex-shrink-0 leading-tight drop-shadow-2xl shadow-2xl">
              {post.title}
            </h3>
            <p className="text-white/90 mb-4 line-clamp-3 flex-1 text-lg font-thin drop-shadow-2xl shadow-2xl">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-white/80 mt-auto flex-shrink-0 font-thin drop-shadow-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary-300 group-hover:gap-2 transition-all font-thin drop-shadow-2xl shadow-2xl">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}


export default function BlogPage() {
  return (
    <div className="pt-0">
      {/* Unified Professional Hero */}
      <section
        className="relative text-center overflow-hidden flex items-center h-[400px] pt-20"
        style={{
          backgroundColor: '#111827'
        }}
      >
        <div className="container-extra-wide mx-auto relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Blog</h1>
            <p className="text-lg md:text-xl font-normal text-white mb-6 max-w-2xl mx-auto drop-shadow-lg">
              Technical insights, tutorials, and updates about PostgreSQL extensions
            </p>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {blogStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-thin text-white drop-shadow-2xl shadow-2xl drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm text-white drop-shadow-2xl shadow-2xl/80 drop-shadow-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Articles - Split by Category */}
      <div className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-extra-wide">
          <div className="max-w-7xl mx-auto">
            {/* Technical Blogs */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-2 tracking-tight">Technical Blogs</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Tutorials and technical notes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
              {blogPosts.filter(p => p.category === 'Technical').map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>

            {/* Announcements */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-2 tracking-tight">Announcements</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Releases and product updates.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.filter(p => p.category === 'Announcement').map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
