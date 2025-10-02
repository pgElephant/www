import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User, Tag, Eye, ThumbsUp, MessageCircle, TrendingUp, BookOpen, Code, Database, Server, Zap, Award, Globe, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - pgElephant',
  description: 'Latest updates, tutorials, and technical insights from the pgElephant team',
}

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

// Blog statistics
const blogStats = [
  { label: 'Total Articles', value: '47', icon: BookOpen, color: 'text-blue-600' },
  { label: 'Monthly Readers', value: '2.1k', icon: Eye, color: 'text-green-600' },
  { label: 'Categories', value: '8', icon: Tag, color: 'text-purple-600' },
  { label: 'Authors', value: '12', icon: Users, color: 'text-yellow-500' }
]

// Blog categories
const blogCategories = [
  { name: 'Technical', icon: Code, count: 18, color: 'bg-blue-100 text-blue-800' },
  { name: 'Tutorials', icon: BookOpen, count: 12, color: 'bg-green-100 text-green-800' },
  { name: 'Updates', icon: TrendingUp, count: 8, color: 'bg-purple-100 text-purple-800' },
  { name: 'Performance', icon: Zap, count: 5, color: 'bg-orange-100 text-orange-800' },
  { name: 'Security', icon: Award, count: 4, color: 'bg-red-100 text-red-800' }
]

const blogPosts = [
  {
    slug: 'rale',
    title: 'RALE - Resilient Adaptive Leader Election',
    excerpt: 'Deep dive into how pgElephant uses RALE consensus algorithm for leader election and maintaining consistency across PostgreSQL nodes.',
    content: 'RALE (Resilient Adaptive Leader Election) is a distributed consensus protocol designed specifically for PostgreSQL clustering...',
    author: 'Dr. Sarah Chen',
    authorRole: 'Lead Database Engineer',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Technical',
    featured: true,
    icon: 'RALE',
    views: 1247,
    likes: 89,
    comments: 23,
    tags: ['Consensus', 'PostgreSQL', 'Distributed Systems']
  },
  {
    slug: 'ram',
    title: 'RAM - Resilient Adaptive Manager',
    excerpt: 'Learn about RAM, the management layer that orchestrates PostgreSQL clusters using RALE consensus for automated failover and monitoring.',
    content: 'RAM (Resilient Adaptive Manager) is an enterprise-grade PostgreSQL clustering solution that provides automatic failover...',
    author: 'Marcus Rodriguez',
    authorRole: 'Senior Systems Architect',
    date: '2024-12-14',
    readTime: '6 min read',
    category: 'Technical',
    featured: true,
    icon: 'RAM',
    views: 892,
    likes: 67,
    comments: 15,
    tags: ['Clustering', 'Failover', 'Monitoring']
  },
  {
    slug: 'fauxdb',
    title: 'FauxDB - MongoDB Compatible Document Database',
    excerpt: 'Discover FauxDB, a PostgreSQL-based document database that provides MongoDB API compatibility with ACID compliance and better reliability.',
    content: 'FauxDB is a high-performance, production-ready MongoDB-compatible database server built in Rust...',
    author: 'Alex Kim',
    authorRole: 'Database Developer',
    date: '2024-12-13',
    readTime: '7 min read',
    category: 'Technical',
    featured: true,
    icon: 'FauxDB',
    views: 1567,
    likes: 124,
    comments: 31,
    tags: ['MongoDB', 'Document Database', 'Compatibility']
  },
  {
    slug: 'performance-optimization',
    title: 'PostgreSQL Performance Optimization Techniques',
    excerpt: 'Essential techniques for optimizing PostgreSQL performance in production environments, including indexing, query optimization, and configuration tuning.',
    content: 'PostgreSQL performance optimization is crucial for maintaining high-throughput applications...',
    author: 'Emma Thompson',
    authorRole: 'Performance Engineer',
    date: '2024-12-12',
    readTime: '12 min read',
    category: 'Performance',
    featured: false,
    icon: 'Performance',
    views: 2103,
    likes: 156,
    comments: 42,
    tags: ['Performance', 'Optimization', 'PostgreSQL']
  },
  {
    slug: 'security-best-practices',
    title: 'Database Security Best Practices for Enterprise',
    excerpt: 'Comprehensive guide to securing PostgreSQL databases in enterprise environments, covering authentication, encryption, and access control.',
    content: 'Database security is paramount in enterprise environments where sensitive data must be protected...',
    author: 'Dr. Michael Zhang',
    authorRole: 'Security Specialist',
    date: '2024-12-11',
    readTime: '10 min read',
    category: 'Security',
    featured: false,
    icon: 'Security',
    views: 1789,
    likes: 98,
    comments: 27,
    tags: ['Security', 'Enterprise', 'Best Practices']
  },
  {
    slug: 'docker-deployment',
    title: 'Deploying PostgreSQL Clusters with Docker',
    excerpt: 'Step-by-step guide to deploying high-availability PostgreSQL clusters using Docker and Docker Compose for development and production.',
    content: 'Docker has revolutionized how we deploy and manage database clusters...',
    author: 'Jennifer Lee',
    authorRole: 'DevOps Engineer',
    date: '2024-12-10',
    readTime: '9 min read',
    category: 'Tutorials',
    featured: false,
    icon: 'Docker',
    views: 1345,
    likes: 87,
    comments: 19,
    tags: ['Docker', 'Deployment', 'Tutorial']
  }
]


// Stock images for blog cards (Unsplash)
const stockImages = [
  '/stock/unsplash-1.jpg',
  '/stock/unsplash-2.jpg',
  '/stock/unsplash-3.jpg',
  '/stock/unsplash-4.jpg',
  '/stock/unsplash-5.jpg',
]

import Image from 'next/image'

const BlogCard = ({ post, index }: { post: typeof blogPosts[0], index: number }) => {
  // Cycle through stock images for demo
  const imageUrl = stockImages[index % stockImages.length] || stockImages[0]
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:border-white/30 h-full flex flex-col">
          {/* Large Stock Image */}
          <div className="relative w-full aspect-[3/2] bg-gray-200 overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 3}
            />
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
    <div className="pt-16">
      {/* Hero Section with elegant gradient background - same as main page */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)`,
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
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-thin text-white drop-shadow-2xl shadow-2xl mb-6 drop-shadow-lg">
              Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white drop-shadow-2xl shadow-2xl/90 drop-shadow-md max-w-4xl mx-auto">
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
      </div>

      {/* Blog Categories */}
      <div className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)' }}>
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-thin text-white drop-shadow-2xl shadow-2xl mb-4">Categories</h2>
              <p className="text-lg text-white/80 drop-shadow-2xl shadow-2xl">Explore our content by topic and expertise area</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {blogCategories.map((category, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm border border-white/20 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-white drop-shadow-2xl shadow-2xl" />
                  </div>
                  <h3 className="font-thin text-white drop-shadow-2xl shadow-2xl mb-2">{category.name}</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-thin ${category.color}`}>
                    {category.count} articles
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Blog Articles - Clean Modern Grid */}
      <div className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)' }}>
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-thin text-white drop-shadow-2xl shadow-2xl mb-4 tracking-tight">Articles</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-2xl shadow-2xl">Insights, tutorials, and updates from the pgElephant team. Explore all our technical content in one place.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
