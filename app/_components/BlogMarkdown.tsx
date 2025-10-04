import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Highlight, themes } from 'prism-react-renderer';

// Usage: <BlogMarkdown>{markdown}</BlogMarkdown>
export function BlogMarkdown({ children }: { children: string }) {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <ReactMarkdown
        components={{
          code({node, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <Highlight
                theme={themes.vsDark}
                code={String(children).replace(/\n$/, '')}
                language={match[1]}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className + ' rounded-lg text-sm my-6'} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => <span key={key} {...getTokenProps({ token, key })} />)}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({node, ...props}) {
            return <img style={{ borderRadius: 12, marginBottom: 40, maxWidth: 900, width: '100%' }} {...props} />;
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}
