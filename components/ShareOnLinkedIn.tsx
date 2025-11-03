'use client'

import { Linkedin } from 'lucide-react'

interface ShareOnLinkedInProps {
  url: string
  title: string
  summary: string
  hashtags: string[]
}

export default function ShareOnLinkedIn({ url, title, summary, hashtags }: ShareOnLinkedInProps) {
  const handleShare = () => {
    // Construct the LinkedIn share text with hashtags
    const hashtagString = hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')
    const fullText = `${title}\n\n${summary}\n\n${hashtagString}`
    
    // LinkedIn share URL
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    
    // Open LinkedIn share dialog
    window.open(
      linkedInUrl,
      'linkedin-share-dialog',
      'width=626,height=436'
    )
  }

  return (
    <div className="my-8">
      <button
        onClick={handleShare}
        className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0077B5] hover:bg-[#005885] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Linkedin className="w-5 h-5" />
        <span>Share on LinkedIn</span>
      </button>
      
      {/* Suggested hashtags display */}
      <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-sm text-white/60 mb-2 font-semibold">Suggested hashtags:</p>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30"
            >
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>
      
      {/* Copy-ready text for manual posting */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-white/60 hover:text-white/80 transition-colors">
          📋 View copy-ready text for manual posting
        </summary>
        <div className="mt-3 p-4 bg-black/20 rounded-lg border border-white/10">
          <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
            {title}{'\n\n'}
            {summary}{'\n\n'}
            {hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}{'\n\n'}
            {url}
          </pre>
          <button
            onClick={() => {
              const text = `${title}\n\n${summary}\n\n${hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}\n\n${url}`
              navigator.clipboard.writeText(text)
              alert('Copied to clipboard!')
            }}
            className="mt-3 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 rounded-lg text-sm font-medium transition-colors border border-primary-500/30"
          >
            📋 Copy to Clipboard
          </button>
        </div>
      </details>
    </div>
  )
}
