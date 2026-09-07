"use client";

import React from 'react';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TechnicalCodeBlock } from '@/components/TechnicalCodeBlock'

// Helper function to style arrows and numbered items in text
const styleSpecialChars = (text: string): React.ReactNode => {
  if (typeof text !== 'string') return text;

  // Check if text contains special characters
  if (!text.includes('→') && !/\[[0-9]+\]/.test(text)) {
    return text;
  }

  const parts = text.split(/(→|\[[0-9]+\])/);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (part === '→') {
          return <span key={`arrow-${index}`} className="text-cyan-400 font-bold">{part}</span>;
        }
        if (/^\[[0-9]+\]$/.test(part)) {
          return <span key={`num-${index}`} className="text-cyan-400 font-bold">{part}</span>;
        }
        return part;
      })}
    </>
  );
};

// Usage: <BlogMarkdown>{markdown}</BlogMarkdown>
export function BlogMarkdown({ children }: { children: string }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings with proper sizing and styling
          h1({ node, ...props }) {
            return <h1 className="mb-8 mt-14 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-50 first:mt-0 md:text-5xl" {...props} />;
          },
          h2({ node, ...props }) {
            return <h2 className="mb-6 mt-14 border-b border-white/[0.09] pb-4 font-serif text-3xl font-medium leading-tight tracking-tight text-stone-100 md:text-4xl" {...props} />;
          },
          h3({ node, ...props }) {
            return <h3 className="mb-4 mt-10 font-serif text-2xl font-medium leading-tight text-stone-100 md:text-3xl" {...props} />;
          },
          h4({ node, ...props }) {
            return <h4 className="mb-3 mt-8 text-xl font-semibold leading-tight text-stone-100 md:text-2xl" {...props} />;
          },
          h5({ node, ...props }) {
            return <h5 className="text-lg md:text-xl font-semibold text-white mb-3 mt-5 leading-tight drop-shadow-lg" {...props} />;
          },
          h6({ node, ...props }) {
            return <h6 className="text-base md:text-lg font-semibold text-white mb-2 mt-4 leading-tight drop-shadow-lg" {...props} />;
          },

          // Paragraphs with better spacing and readability
          p({ node, children, ...props }: any) {
            // Check if paragraph only contains an image - if so, unwrap it
            const hasOnlyImage = node?.children?.length === 1 &&
              node.children[0]?.type === 'element' &&
              node.children[0]?.tagName === 'img';

            if (hasOnlyImage) {
              // Return the image directly without paragraph wrapper
              return <>{children}</>;
            }

            // Process children to style special characters - only process string children
            const processChildren = (children: any): any => {
              if (typeof children === 'string') {
                return styleSpecialChars(children);
              }
              if (Array.isArray(children)) {
                return children.map((child, idx) => {
                  if (typeof child === 'string') {
                    const styled = styleSpecialChars(child);
                    return <React.Fragment key={`p-${idx}`}>{styled}</React.Fragment>;
                  }
                  // Don't process React elements, just return them
                  return child;
                });
              }
              // Don't process if it's already a React element
              return children;
            };

            return <p className="mb-6 text-[1.05rem] leading-[1.85] text-stone-300" {...props}>{processChildren(children)}</p>;
          },

          // Lists with proper styling
          ul({ node, ...props }) {
            return <ul className="mb-7 ml-5 list-disc space-y-2.5 text-[1.02rem] leading-relaxed text-stone-300 marker:text-[#c9b68e]" {...props} />;
          },
          ol({ node, ...props }) {
            return <ol className="mb-7 ml-5 list-decimal space-y-2.5 text-[1.02rem] leading-relaxed text-stone-300 marker:text-[#c9b68e]" {...props} />;
          },
          li({ node, ...props }) {
            return <li className="pl-2" {...props} />;
          },

          // Code blocks with syntax highlighting
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeText = String(children).replace(/\n$/, '');

            return match ? (
              <TechnicalCodeBlock code={codeText} language={match[1]} />
            ) : (
              <code className="border border-white/[0.09] bg-white/[0.055] px-1.5 py-0.5 font-mono text-[0.86em] text-[#e4c98f]" {...props}>
                {children}
              </code>
            );
          },

          // Tables with proper styling
          table({ node, ...props }) {
            return (
              <div
                className="my-8 w-full overflow-x-auto border border-white/[0.1]"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
                  maxWidth: '100%'
                }}
              >
                <table
                  className="bg-[#0b0b0b]"
                  style={{
                    width: 'max-content',
                    minWidth: '100%',
                    borderCollapse: 'collapse'
                  }}
                  {...props}
                />
              </div>
            );
          },
          thead({ node, ...props }) {
            return <thead className="border-b border-white/[0.1] bg-white/[0.035]" {...props} />;
          },
          tbody({ node, ...props }) {
            return <tbody className="divide-y divide-white/10" {...props} />;
          },
          tr({ node, ...props }) {
            return <tr className="border-b border-white/[0.07] transition-colors last:border-b-0 hover:bg-white/[0.025]" {...props} />;
          },
          th({ node, ...props }) {
            return <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-300" {...props} />;
          },
          td({ node, ...props }) {
            return <td className="px-5 py-4 text-sm leading-relaxed text-stone-400" {...props} />;
          },

          // Images with proper styling (use Next/Image to avoid lint warnings)
          // Note: Images are block-level elements, so we use a div wrapper
          img({ node, ...props }) {
            const src = (props as any).src as string | undefined
            const alt = ((props as any).alt as string | undefined) || 'Blog image'
            if (!src) return null

            // Keep SVGs unoptimized while retaining Next's image semantics.
            const isSvg = src.toLowerCase().includes('.svg')
            if (isSvg) {
              return (
                <div style={{ borderRadius: 12, marginBottom: 40, maxWidth: '100%', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'block', textAlign: 'center', backgroundColor: 'transparent' }}>
                  <Image
                    src={src}
                    alt={alt}
                    width={1280}
                    height={750}
                    unoptimized
                    style={{ width: '100%', height: 'auto', maxWidth: '100%', display: 'block' }}
                    loading="lazy"
                    onError={(e) => {
                      console.error('Failed to load SVG:', src);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )
            }

            // Return as a block-level element to prevent nesting in paragraphs
            return (
              <div style={{ borderRadius: 12, marginBottom: 40, maxWidth: '100%', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'block' }}>
                <Image
                  src={src}
                  alt={alt}
                  width={1280}
                  height={750}
                  style={{ width: '100%', height: 'auto' }}
                  unoptimized
                />
              </div>
            )
          },

          // Blockquotes with styling
          blockquote({ node, ...props }) {
            return <blockquote className="my-8 border-l-2 border-[#c9b68e] bg-white/[0.025] py-4 pl-6 pr-5 font-serif text-lg italic leading-relaxed text-stone-300" {...props} />;
          },

          // Strong and emphasis
          strong({ node, children, ...props }: any) {
            // Process children to style special characters - only process string children
            const processChildren = (children: any): any => {
              if (typeof children === 'string') {
                return styleSpecialChars(children);
              }
              if (Array.isArray(children)) {
                return children.map((child, idx) => {
                  if (typeof child === 'string') {
                    const styled = styleSpecialChars(child);
                    return <React.Fragment key={`strong-${idx}`}>{styled}</React.Fragment>;
                  }
                  // Don't process React elements, just return them
                  return child;
                });
              }
              // Don't process if it's already a React element
              return children;
            };

            return <strong className="font-semibold text-stone-100" {...props}>{processChildren(children)}</strong>;
          },
          em({ node, ...props }) {
            return <em className="italic text-stone-200" {...props} />;
          },

          // Links with proper styling - all links are yellow
          a({ node, className, ...props }: any) {
            const href = props.href || '';

            return (
              <a
                className="text-[#dfc58f] underline decoration-white/20 underline-offset-4 transition hover:text-[#f0d8a6] hover:decoration-current"
                target={href && (href.startsWith('http') || href.startsWith('mailto')) && !href.includes('pgelephant.com') ? '_blank' : undefined}
                rel={href && (href.startsWith('http') || href.startsWith('mailto')) && !href.includes('pgelephant.com') ? 'noopener noreferrer' : undefined}
                {...props}
              />
            );
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}
