'use client'

import {
  Highlight,
  themes,
  type Language,
} from 'prism-react-renderer'

interface TechnicalCodeBlockProps {
  code: string
  language?: string
  title?: string
  result?: string
  resultLabel?: string
}

const LANGUAGE_ALIASES: Record<string, Language> = {
  bash: 'bash',
  shell: 'bash',
  sh: 'bash',
  sql: 'sql',
  json: 'json',
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'tsx',
  jsx: 'jsx',
  python: 'python',
  py: 'python',
  yaml: 'yaml',
  yml: 'yaml',
  markup: 'markup',
  html: 'markup',
  text: 'plain',
  plaintext: 'plain',
}

export function TechnicalCodeBlock({
  code,
  language = 'text',
  title,
  result,
  resultLabel = 'Result',
}: TechnicalCodeBlockProps) {
  const normalizedLanguage = language.toLowerCase()
  const prismLanguage =
    LANGUAGE_ALIASES[normalizedLanguage] || (normalizedLanguage as Language)

  return (
    <figure className="my-8 overflow-hidden border border-white/[0.11] bg-[#070707] shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
      <figcaption className="flex min-h-11 items-center justify-between gap-4 border-b border-white/[0.09] bg-white/[0.025] px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
          </span>
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500">
            {title || normalizedLanguage}
          </span>
        </div>
        {title ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-stone-600">
            {normalizedLanguage}
          </span>
        ) : null}
      </figcaption>

      <Highlight
        theme={themes.nightOwl}
        code={code.replace(/\n$/, '')}
        language={prismLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto py-5 text-[0.82rem] leading-6`}
            style={{ ...style, background: 'transparent', margin: 0 }}
          >
            <code>
              {tokens.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  {...getLineProps({ line })}
                  className="table-row"
                >
                  <span
                    className="table-cell select-none border-r border-white/[0.06] px-4 text-right font-mono text-[10px] text-stone-700"
                    aria-hidden="true"
                  >
                    {lineIndex + 1}
                  </span>
                  <span className="table-cell whitespace-pre px-5">
                    {line.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        {...getTokenProps({ token })}
                      />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>

      {result ? (
        <div className="border-t border-white/[0.09] bg-emerald-950/[0.12]">
          <p className="border-b border-white/[0.06] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-400/70">
            {resultLabel}
          </p>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.78rem] leading-6 text-emerald-100/80">
            <code>{result}</code>
          </pre>
        </div>
      ) : null}

    </figure>
  )
}
