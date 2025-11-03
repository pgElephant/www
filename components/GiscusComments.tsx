'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
  theme?: string;
  lang?: string;
  loading?: 'lazy' | 'eager';
}

export default function GiscusComments({
  repo = 'pgelephant/pgelephant.github.io',
  repoId,
  category = 'Blog Comments',
  categoryId,
  mapping = 'pathname',
  term,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'bottom',
  theme = 'dark',
  lang = 'en',
  loading = 'lazy',
}: GiscusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current || !repoId || !categoryId) return;

    const container = commentsRef.current;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (term) script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', emitMetadata ? '1' : '0');
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [repo, repoId, category, categoryId, mapping, term, reactionsEnabled, emitMetadata, inputPosition, theme, lang, loading]);

  if (!repoId || !categoryId) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
        <p className="text-yellow-200 mb-4">
          <strong>Comments Configuration Required</strong>
        </p>
        <p className="text-yellow-200/80 text-sm mb-4">
          To enable comments, you need to:
        </p>
        <ol className="text-left text-yellow-200/70 text-sm space-y-2 max-w-2xl mx-auto">
          <li>1. Enable GitHub Discussions on your repository</li>
          <li>2. Visit <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-100">giscus.app</a></li>
          <li>3. Enter your repository name: <code className="bg-yellow-900/30 px-2 py-1 rounded">pgelephant/pgelephant.github.io</code></li>
          <li>4. Copy the <code className="bg-yellow-900/30 px-2 py-1 rounded">data-repo-id</code> and <code className="bg-yellow-900/30 px-2 py-1 rounded">data-category-id</code> values</li>
          <li>5. Add them to the component props</li>
        </ol>
      </div>
    );
  }

  return <div ref={commentsRef} className="giscus" />;
}

