import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SqlCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function SqlCodeBlock({ code, language = 'sql', title }: SqlCodeBlockProps) {
  // Custom dark theme matching your terminal aesthetic
  const customStyle = {
    ...vscDarkPlus,
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: '#000000',
      color: '#00ff00',
    },
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#000000',
      padding: '1rem',
      borderRadius: '0.375rem',
      overflow: 'auto',
    },
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
      {title && (
        <h3 className="text-lg font-semibold text-cyan-400 mb-3">{title}</h3>
      )}
      <SyntaxHighlighter
        language={language}
        style={customStyle}
        customStyle={{
          background: '#000000',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
