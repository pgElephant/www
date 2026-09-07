import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Youtube } from 'lucide-react'

const social = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DrIbrarAhmed',
    icon: Youtube,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/pgElephant',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ibrarahmed74/',
    icon: Linkedin,
  },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="mt-auto border-t border-stone-800/80 bg-stone-950"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="text-sm font-medium text-stone-200">Dr. Ibrar Ahmed</p>
          <p className="mt-1 text-sm text-stone-500">© {year}</p>
        </div>

        <div className="flex items-center gap-4" aria-label="Social links">
          {social.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-stone-500 transition-colors hover:text-stone-200"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <nav className="flex gap-4 text-sm text-stone-500" aria-label="Legal">
          <Link href="/privacy" className="hover:text-stone-300">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-stone-300">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
