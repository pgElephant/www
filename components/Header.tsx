'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'AI', href: '/ai' },
  { name: 'PostgreSQL', href: '/postgresql' },
  { name: 'Cyber Security', href: '/cybersecurity' },
  { name: 'GitHub', href: '/github' },
  { name: 'About', href: '/about' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-stone-100 transition-colors hover:text-white"
        >
          Dr. Ibrar Ahmed
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? 'text-stone-100'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-stone-400 transition-colors hover:text-stone-100 md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className="border-t border-stone-800 bg-stone-950 px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive(item.href)
                      ? 'bg-stone-900 text-stone-100'
                      : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
