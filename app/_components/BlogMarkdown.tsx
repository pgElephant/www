"use client";

import React, { useState } from 'react';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Highlight, themes } from 'prism-react-renderer';

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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <article className="prose dark:prose-invert max-w-7xl mx-auto py-12 px-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings with proper sizing and styling
          h1({ node, ...props }) {
            return <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-12 first:mt-0 leading-tight drop-shadow-lg" {...props} />;
          },
          h2({ node, ...props }) {
            return <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 mt-10 leading-tight drop-shadow-lg" {...props} />;
          },
          h3({ node, ...props }) {
            return <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 mt-8 leading-tight drop-shadow-lg" {...props} />;
          },
          h4({ node, ...props }) {
            return <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 mt-6 leading-tight drop-shadow-lg" {...props} />;
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

            return <p className="text-white/90 text-lg leading-relaxed mb-6 drop-shadow-sm" {...props}>{processChildren(children)}</p>;
          },

          // Lists with proper styling
          ul({ node, ...props }) {
            return <ul className="list-disc text-white/90 text-lg leading-relaxed mb-6 space-y-2 ml-6" {...props} />;
          },
          ol({ node, ...props }) {
            return <ol className="list-decimal text-white/90 text-lg leading-relaxed mb-6 space-y-2 ml-6" {...props} />;
          },
          li({ node, ...props }) {
            return <li className="mb-2 drop-shadow-sm pl-2" {...props} />;
          },

          // Code blocks with syntax highlighting
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeText = String(children).replace(/\n$/, '');

            // Check if this contains both query and output (has "Output:" or table-like content)
            const hasOutput = codeText.includes('Output:') || codeText.includes('---') ||
              (codeText.includes('SELECT') && codeText.includes('log_size'));
            const isLongContent = codeText.split('\n').length > 10;

            return match ? (
              <div className="my-8 relative group">
                {/* Copy button */}
                <button
                  onClick={() => copyToClipboard(codeText)}
                  className="absolute top-3 right-3 z-10 p-2 bg-gray-700/80 hover:bg-gray-600/90 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Copy code"
                >
                  {copiedCode === codeText ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                <Highlight
                  theme={themes.vsDark}
                  code={codeText}
                  language={match[1]}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <div className="w-full max-w-full overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)' }}>
                      <pre className={`${className} rounded-lg text-sm shadow-2xl ${hasOutput ? 'min-h-[72px]' : 'min-h-[48px]'} flex flex-col justify-start border border-gray-600/30 overflow-x-auto`} style={style}>
                        <div className="flex-1 p-4 min-w-max">
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })} className="min-h-[1.5rem] whitespace-pre">
                              {line.map((token, tokenKey) => (
                                <span key={tokenKey} {...getTokenProps({ token })} />
                              ))}
                            </div>
                          ))}
                        </div>
                        {/* Fill remaining space if content is short */}
                        {tokens.length < (hasOutput ? 5 : 2) && !isLongContent && (
                          <div className="flex-1" style={{ minHeight: `${((hasOutput ? 5 : 2) - tokens.length) * 1.5}rem` }}></div>
                        )}
                      </pre>
                    </div>
                  )}
                </Highlight>
              </div>
            ) : (
              <code className="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm font-mono inline-block" {...props}>
                {children}
              </code>
            );
          },

          // Tables with proper styling
          table({ node, ...props }) {
            return (
              <div
                className="overflow-x-auto my-8 w-full"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
                  maxWidth: '100%'
                }}
              >
                <table
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl"
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
            return <thead className="bg-white/20" {...props} />;
          },
          tbody({ node, ...props }) {
            return <tbody className="divide-y divide-white/10" {...props} />;
          },
          tr({ node, ...props }) {
            return <tr className="hover:bg-white/5 transition-colors" {...props} />;
          },
          th({ node, ...props }) {
            return <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider" {...props} />;
          },
          td({ node, ...props }) {
            return <td className="px-6 py-4 text-sm text-white/90" {...props} />;
          },

          // Images with proper styling (use Next/Image to avoid lint warnings)
          // Note: Images are block-level elements, so we use a div wrapper
          img({ node, ...props }) {
            const src = (props as any).src as string | undefined
            const alt = ((props as any).alt as string | undefined) || 'Blog image'
            if (!src) return null

            // For SVG files, use img tag directly for better compatibility
            const isSvg = src.toLowerCase().includes('.svg')
            if (isSvg) {
              return (
                <div style={{ borderRadius: 12, marginBottom: 40, maxWidth: '100%', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', overflow: 'hidden', display: 'block', textAlign: 'center', backgroundColor: 'transparent' }}>
                  <img
                    src={src}
                    alt={alt}
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
            return <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-6 bg-white/5 rounded-r-lg italic text-white/80" {...props} />;
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

            return <strong className="font-semibold text-white" {...props}>{processChildren(children)}</strong>;
          },
          em({ node, ...props }) {
            return <em className="italic text-white/95" {...props} />;
          },

          // Links with proper styling - all links are yellow
          a({ node, className, ...props }: any) {
            const href = props.href || '';

            return (
              <a
                className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors duration-200"
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
