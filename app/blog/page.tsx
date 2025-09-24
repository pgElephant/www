import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'

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

const blogPosts = [
  {
    slug: 'rale',
    title: 'RALE - Resilient Adaptive Leader Election',
    excerpt: 'Deep dive into how pgElephant uses RALE consensus algorithm for leader election and maintaining consistency across PostgreSQL nodes.',
    content: 'RALE (Resilient Adaptive Leader Election) is a distributed consensus protocol designed specifically for PostgreSQL clustering...',
    author: 'pgElephant Team',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Technical',
    featured: true,
    icon: 'RALE'
  },
  {
    slug: 'ram',
    title: 'RAM - Resilient Adaptive Manager',
    excerpt: 'Learn about RAM, the management layer that orchestrates PostgreSQL clusters using RALE consensus for automated failover and monitoring.',
    content: 'RAM (Resilient Adaptive Manager) is an enterprise-grade PostgreSQL clustering solution that provides automatic failover...',
    author: 'pgElephant Team',
    date: '2024-12-14',
    readTime: '6 min read',
    category: 'Technical',
    featured: true,
    icon: 'RAM'
  },
  {
    slug: 'fauxdb',
    title: 'FauxDB - MongoDB Compatible Document Database',
    excerpt: 'Discover FauxDB, a PostgreSQL-based document database that provides MongoDB API compatibility with ACID compliance and better reliability.',
    content: 'FauxDB is a high-performance, production-ready MongoDB-compatible database server built in Rust...',
    author: 'pgElephant Team',
    date: '2024-12-13',
    readTime: '7 min read',
    category: 'Technical',
    featured: true,
    icon: 'FauxDB'
  }
]

const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  const getIconGradient = (icon: string) => {
    switch (icon) {
      case 'RALE':
        return 'from-slate-600 to-slate-800'
      case 'RAM':
        return 'from-slate-600 to-slate-800'
      case 'FauxDB':
        return 'from-slate-600 to-slate-800'
      default:
        return 'from-slate-600 to-slate-800'
    }
  }

  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group-hover:border-gray-300 h-full flex flex-col">
          {/* Header with gradient background */}
          <div className={`h-32 bg-gradient-to-br ${getIconGradient(post.icon)} relative overflow-hidden flex-shrink-0`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-4xl opacity-80">{post.icon}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors flex-shrink-0">
              {post.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto flex-shrink-0">
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
              <div className="flex items-center gap-1 text-teal-600 group-hover:gap-2 transition-all">
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
      {/* Hero Section with gradient background */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
        }}
      >
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
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Blogs
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Technical insights, tutorials, and updates from our team building the future of PostgreSQL clustering
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
