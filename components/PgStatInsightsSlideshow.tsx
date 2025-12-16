'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  BarChart3, 
  Database, 
  Zap, 
  TrendingUp,
  Activity,
  FileText,
  ArrowRight,
  Sparkles,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react'

interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  gradient: string
  blogLink?: string
  blogTitle?: string
  metrics?: string[]
  image?: string
}

const slides: Slide[] = [
  {
    id: '1',
    title: '52 Comprehensive Metrics',
    subtitle: 'Complete Performance Visibility',
    description: 'Track execution time, plan time, cache hits, WAL generation, JIT stats, buffer I/O, parallel workers, and timing data all in one extension.',
    icon: <BarChart3 className="w-20 h-20" />,
    gradient: 'from-purple-600 via-blue-600 to-cyan-600',
    blogLink: '/blog/pg-stat-insights',
    blogTitle: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    metrics: ['Execution Metrics', 'Buffer I/O', 'WAL Statistics', 'JIT Compilation', 'Parallel Workers']
  },
  {
    id: '2',
    title: '42 Pre-Built Views',
    subtitle: 'Instant Insights Without Complex Queries',
    description: 'Access specialized views for slow queries, cache misses, I/O intensive operations, errors, histogram summaries, and time-series aggregation.',
    icon: <Database className="w-20 h-20" />,
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
    blogLink: '/blog/pg-stat-insights',
    blogTitle: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    metrics: ['Query Performance Views', 'Replication Monitoring', 'Index Analytics', 'Time-Series Buckets']
  },
  {
    id: '3',
    title: 'Response Time Categories',
    subtitle: 'Automatic SLA Monitoring',
    description: 'Categorize queries by execution time: ultra-fast (<1ms), fast (1-10ms), normal (10-100ms), slow (100ms-1s), very slow (1-10s), and critical (>10s).',
    icon: <Zap className="w-20 h-20" />,
    gradient: 'from-cyan-600 via-blue-600 to-purple-600',
    blogLink: '/blog/pg-stat-insights',
    blogTitle: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    metrics: ['Ultra-Fast Queries', 'Fast Queries', 'Normal Queries', 'Slow Queries', 'Critical Queries']
  },
  {
    id: '4',
    title: 'Index Monitoring',
    subtitle: '11 Specialized Index Views',
    description: 'Track index usage, detect bloat, identify missing indexes, calculate efficiency ratings, and generate maintenance recommendations with priority levels.',
    icon: <TrendingUp className="w-20 h-20" />,
    gradient: 'from-purple-600 via-pink-600 to-orange-600',
    blogLink: '/blog/pg-stat-insights-index-monitoring',
    blogTitle: 'Index Monitoring with pg_stat_insights v3.0.0',
    metrics: ['Index Usage Stats', 'Bloat Detection', 'Efficiency Ratings', 'Maintenance Recommendations', 'Missing Index Detection']
  },
  {
    id: '5',
    title: 'Replication Monitoring',
    subtitle: '17 Comprehensive Views',
    description: 'Monitor physical and logical replication with health status, bottleneck detection, performance ratings, WAL tracking, and threshold-based alerting.',
    icon: <Activity className="w-20 h-20" />,
    gradient: 'from-green-600 via-cyan-600 to-blue-600',
    blogLink: '/blog/pg-stat-insights',
    blogTitle: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    metrics: ['Physical Replication', 'Logical Replication', 'Health Monitoring', 'Bottleneck Detection', 'WAL Tracking']
  },
  {
    id: '6',
    title: 'Production Ready',
    subtitle: 'Release v1.0.0 Available',
    description: 'PostgreSQL 16, 17, and 18 compatible. Fully tested with 150+ TAP tests. Drop-in replacement for pg_stat_statements with enhanced capabilities.',
    icon: <Sparkles className="w-20 h-20" />,
    gradient: 'from-orange-600 via-purple-600 to-blue-600',
    blogLink: '/blog/pg-stat-insights-1-0-0',
    blogTitle: 'pg_stat_insights 1.0.0 Release Announcement',
    metrics: ['PostgreSQL 16-18', '150+ TAP Tests', 'Production Ready', 'Drop-in Replacement']
  }
]

export default function PgStatInsightsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | 'fade'>('fade')

  const goToSlide = useCallback((index: number) => {
    const newIndex = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index
    setTransitionDirection(index > currentIndex ? 'right' : index < currentIndex ? 'left' : 'fade')
    setCurrentIndex(newIndex)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    setTransitionDirection('left')
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setTransitionDirection('right')
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && !isFullscreen) {
      const interval = setInterval(() => {
        goToNext()
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isHovered, isFullscreen, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [goToPrevious, goToNext, isFullscreen])

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const currentSlide = slides[currentIndex]
  const progress = ((currentIndex + 1) / slides.length) * 100

  const slideContent = (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${
        transitionDirection === 'left' ? 'animate-slide-in-left' : 
        transitionDirection === 'right' ? 'animate-slide-in-right' : 
        'animate-fade-in'
      }`}
    >
      {/* Animated Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} opacity-30 transition-all duration-1000 ease-in-out animate-gradient-shift`}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Content Container - PowerPoint Style */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            {currentSlide.icon}
          </div>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl font-semibold text-purple-300 uppercase tracking-wider">
            {currentSlide.subtitle}
          </div>

          {/* Title - Large PowerPoint Style */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {currentSlide.title}
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl drop-shadow-lg">
            {currentSlide.description}
          </p>

          {/* Metrics List - PowerPoint Bullet Style */}
          {currentSlide.metrics && (
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {currentSlide.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-lg font-medium shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  • {metric}
                </div>
              ))}
            </div>
          )}

          {/* Blog Link - CTA Button */}
          {currentSlide.blogLink && (
            <Link
              href={currentSlide.blogLink}
              className="inline-flex items-center gap-3 group mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50"
            >
              <FileText className="w-6 h-6" />
              <span>Read: {currentSlide.blogTitle}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Normal Mode */}
      {!isFullscreen && (
        <div
          className="relative w-full my-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-white/10 shadow-2xl min-h-[600px]">
            {slideContent}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl z-20 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl z-20 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>

            {/* Controls */}
            <div className="absolute top-6 right-6 flex gap-2 z-20">
              <button
                onClick={togglePlayPause}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 border border-white/30 shadow-xl group"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
                ) : (
                  <Play className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 border border-white/30 shadow-xl group"
                aria-label="Enter fullscreen"
              >
                <Maximize2 className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 shadow-xl z-20">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 ${
                    isActive ? 'w-12' : 'w-3'
                  } h-3 rounded-full ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-600/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Presentation Mode */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-4">
              <div className="text-white font-semibold">pg_stat_insights</div>
              <div className="text-white/60 text-sm">Slide {currentIndex + 1} of {slides.length}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlayPause}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Exit fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slide Content - Fullscreen */}
          <div className="flex-1 pt-16">
            {slideContent}
          </div>

          {/* Navigation Controls - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6 z-30">
            <button
              onClick={goToPrevious}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-20 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Hint */}
      {!isFullscreen && (
        <div className="text-center mt-4 text-sm text-white/60">
          Press <kbd className="px-2 py-1 bg-white/10 rounded">F</kbd> for fullscreen • 
          <kbd className="px-2 py-1 bg-white/10 rounded ml-2">←</kbd> <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd> to navigate • 
          <kbd className="px-2 py-1 bg-white/10 rounded ml-2">Space</kbd> to pause
        </div>
      )}
    </>
  )
}
