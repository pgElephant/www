'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, BookOpen, List } from 'lucide-react'
import { cn } from '../lib/utils'

export interface TocItem {
  id: string
  title: string
  level?: number
  children?: TocItem[]
}

export interface NavLink {
  href: string
  label: string
}

export interface PostgresDocsLayoutProps {
  title: string
  version?: string
  children: ReactNode
  tableOfContents?: TocItem[]
  prevLink?: NavLink
  nextLink?: NavLink
  showToc?: boolean
  className?: string
}

export default function PostgresDocsLayout({
  title,
  version,
  children,
  tableOfContents,
  prevLink,
  nextLink,
  showToc = true,
  className,
}: PostgresDocsLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-page-gradient', className)}>
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/docs"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Documentation</span>
              </Link>
              {version && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {version}
                </span>
              )}
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Page Title */}
            <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {title}
              </h1>
            </div>

            {/* Content */}
            <div className="postgres-docs-content">
              {children}
            </div>

            {/* Navigation Footer */}
            {(prevLink || nextLink) && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center gap-4">
                  {prevLink ? (
                    <Link
                      href={prevLink.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-500">Previous</span>
                        <span className="font-medium">{prevLink.label}</span>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextLink ? (
                    <Link
                      href={nextLink.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500 dark:text-slate-500">Next</span>
                        <span className="font-medium">{nextLink.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}
          </main>

          {/* Table of Contents Sidebar */}
          {showToc && tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Table of Contents
                    </h2>
                  </div>
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <TocItemComponent key={item.id} item={item} />
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

function TocItemComponent({ item }: { item: TocItem }) {
  const level = item.level ?? 1
  const indent = level > 1 ? `ml-${(level - 1) * 4}` : ''

  return (
    <div>
      <a
        href={`#${item.id}`}
        className={cn(
          'block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1 transition-colors',
          indent
        )}
      >
        {item.title}
      </a>
      {item.children && item.children.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <TocItemComponent key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}

