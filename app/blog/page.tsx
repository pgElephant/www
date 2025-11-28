import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, User, Tag, Eye, ThumbsUp, MessageCircle, TrendingUp, BookOpen, Code, Database, Server, Zap, Award, Globe, Users } from 'lucide-react'
import HeroTemplate from '@/components/templates/HeroTemplate'
import PageTemplate from '@/components/templates/PageTemplate'

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
  { label: 'Total Articles', value: '5', icon: BookOpen, color: 'text-white' },
  { label: 'Monthly Readers', value: '4.2k', icon: Eye, color: 'text-white' },
  { label: 'Categories', value: '1', icon: Tag, color: 'text-white' },
  { label: 'Authors', value: '1', icon: Users, color: 'text-white' }
]


const blogPosts = [
  {
    slug: 'pg-stat-insights-1-0-0',
    title: 'pg_stat_insights 1.0.0 Release Announcement',
    excerpt: 'pg_stat_insights 1.0.0 is a PostgreSQL performance monitoring extension. It provides 52 metrics across 11 views. Production-ready and easy to install.',
    content: 'pg_stat_insights 1.0.0 delivers comprehensive query performance insights with 52 metrics, 11 pre-built views, response-time categories, and PostgreSQL 16–17 compatibility.',
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
    excerpt: 'NeuronDB adds vector search, ML inference, and RAG capabilities to PostgreSQL. It includes HNSW indexing, GPU acceleration, 10+ distance metrics, and full pgvector compatibility.',
    content: 'NeuronDB is a production-ready PostgreSQL extension that provides vector search, machine learning inference, GPU acceleration, and hybrid retrieval capabilities for building semantic search, RAG applications, and recommendation systems.',
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
    excerpt: 'Learn how to implement semantic search over text using NeuronDB with real-world examples, SQL queries, and production-ready code. Complete guide to building document search systems, RAG pipelines, and hybrid search.',
    content: 'Comprehensive guide to implementing semantic search with NeuronDB. Includes real-world examples, step-by-step SQL queries, RAG pipeline construction, hybrid search techniques, and production optimization strategies.',
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
    slug: 'pgbalancer',
    title: 'pgbalancer: PostgreSQL Connection Pooler',
    excerpt: 'PostgreSQL connection pooler with load balancing, automatic failover, and optimization for connection management.',
    content: 'pgbalancer is a PostgreSQL connection pooler that combines pooling capabilities with load balancing, REST API management, and MQTT clustering for cloud-native applications.',
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
    excerpt: 'PostgreSQL performance monitoring with 52 metrics, 11 pre-built views, and insights into query execution, cache efficiency, WAL generation, and JIT compilation.',
    content: 'pg_stat_insights is a drop-in replacement for pg_stat_statements that provides PostgreSQL performance monitoring with response time categorization, cache analysis, and query insights.',
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
    excerpt: 'Executive Summary: In distributed database systems, achieving consensus across multiple nodes while maintaining data consistency and preventing split-brain scenarios is one of the most challenging engineering problems.',
    content: 'pgraft addresses this challenge by embedding the battle-tested Raft consensus protocol directly into PostgreSQL as a native extension.',
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
      <Link href={`/blog/${post.slug}`} className="block h-full">
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
            ) : post.slug === 'pg-stat-insights-1-0-0' ? (
              <Image
                src="/blog/pg-stat-insights/header.svg?v=7"
                alt="pg_stat_insights release blog header"
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
    <PageTemplate className="pt-16">
      {/* Hero Section */}
      <HeroTemplate overlay={true}>
        <div className="container-wide py-28 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white max-w-4xl mx-auto">
              Technical insights, tutorials, and updates from our team building the future of PostgreSQL clustering
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
      </HeroTemplate>

      {/* Blog Articles - Split by Category */}
      <div className="py-24 relative overflow-hidden bg-page-gradient">
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            {/* Technical Blogs */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-2 tracking-tight">Technical Blogs</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Deep dives, tutorials, and engineering notes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
              {blogPosts.filter(p => p.category === 'Technical').map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>

            {/* Announcements */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-thin text-white mb-2 tracking-tight">Announcements</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Releases, product updates, and news.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.filter(p => p.category === 'Announcement').map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
