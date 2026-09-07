#!/usr/bin/env node
/**
 * Build a searchable index of long-form channel projects from
 * /Users/ibrar/app/channels (postgres, ai, cybersecurity).
 * Skips shorts / tiktok / ultra-short packs.
 */
const fs = require('fs')
const path = require('path')

const CHANNELS_ROOT =
  process.env.CHANNELS_ROOT || path.resolve(process.cwd(), '../channels')
const OUT_PATH = path.join(process.cwd(), 'data/channel-index.json')

const TOPIC_DIRS = {
  postgresql: 'postgres',
  ai: 'ai',
  cybersecurity: 'cybersecurity',
}

const SKIP_NAME = /(shorts|tiktok|38s|45s|chinees)/i

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return null
  }
}

function listFilesRecursive(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth || !fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
      out.push(...listFilesRecursive(full, depth + 1, maxDepth))
    } else {
      out.push(full)
    }
  }
  return out
}

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function parseYoutubeMd(text) {
  if (!text) return { title: null, description: null, alts: [] }
  const titleMatch = text.match(/##\s*Title\s*\n+([^\n#]+)/i)
  const altSection = text.match(/##\s*Alternatives?\s*\n([\s\S]*?)(?=\n##\s|\n*$)/i)
  const descMatch = text.match(
    /##\s*Description(?:\s*\(paste\))?\s*\n+([\s\S]*?)(?=\n##\s|\n#\w|\n*$)/i
  )
  const alts = []
  if (altSection) {
    for (const line of altSection[1].split('\n')) {
      const cleaned = line.replace(/^\d+\.\s*/, '').replace(/^\*\*?/, '').trim()
      if (cleaned && cleaned.length > 8 && !cleaned.startsWith('Use ')) {
        alts.push(cleaned.replace(/\*\*/g, ''))
      }
    }
  }
  let description = descMatch?.[1]?.trim() || null
  if (description) {
    description = description
      .split(/\n/)
      .filter((line) => {
        const lower = line.trim().toLowerCase()
        return (
          line.trim() &&
          !/^https?:\/\//i.test(line.trim()) &&
          !lower.startsWith('chapters') &&
          !lower.startsWith('playlist') &&
          !lower.startsWith('previous:') &&
          !lower.startsWith('next:') &&
          !lower.startsWith('part of') &&
          !/^#\w/.test(line.trim()) &&
          !/^\d{1,2}:\d{2}/.test(line.trim())
        )
      })
      .join('\n')
      .trim()
  }
  return {
    title: titleMatch?.[1]?.trim() || null,
    description,
    alts,
  }
}

function extractNarrationFromJson(raw) {
  try {
    const data = JSON.parse(raw)
    const title =
      data.title || data.project?.title || data.alt_title || data.episode_title || null
    const slides = data.scenes || data.slides || []
    const parts = []
    const scenes = []
    for (const slide of slides) {
      const narration = (slide.narration || slide.text || '').trim()
      if (!narration) continue
      if (/scaffold deck/i.test(narration)) continue
      parts.push(narration)
      scenes.push({
        id: String(slide.id || slide.slide || '').trim(),
        chapter: String(
          slide.chapter_title ||
            slide.chapter ||
            slide.section ||
            slide.title ||
            ''
        ).trim(),
        title: String(slide.title || '').trim(),
        narration,
        terminalActions: Array.isArray(slide.terminal_actions)
          ? slide.terminal_actions
          : [],
        sources: Array.isArray(slide.sources) ? slide.sources : [],
      })
    }
    return { title, narration: parts.join('\n\n').trim(), scenes }
  } catch {
    return { title: null, narration: '', scenes: [] }
  }
}

function findBestNarration(projectRoot) {
  const candidates = [
    path.join(projectRoot, 'narration', 'narration.txt'),
    path.join(projectRoot, 'narration_script.txt'),
    path.join(projectRoot, 'description.txt'),
    path.join(projectRoot, 'narration', 'narration.json'),
    path.join(projectRoot, 'narration.json'),
  ]

  for (const file of listFilesRecursive(path.join(projectRoot, 'narration'), 0, 2)) {
    if (file.endsWith('.json') || file.endsWith('.txt')) {
      candidates.push(file)
    }
  }

  let best = { title: null, narration: '', scenes: [], source: null }
  let bestScenes = []
  let structuredTitle = null
  for (const file of candidates) {
    const text = readText(file)
    if (!text) continue
    if (file.endsWith('.json')) {
      const parsed = extractNarrationFromJson(text)
      if (parsed.scenes.length > bestScenes.length) {
        bestScenes = parsed.scenes
        structuredTitle = parsed.title || structuredTitle
      }
      if (parsed.narration.length > (best.narration?.length || 0)) {
        best = { ...parsed, source: path.relative(CHANNELS_ROOT, file) }
      }
    } else if (text.trim().length > (best.narration?.length || 0)) {
      best = {
        title: best.title,
        narration: text.trim(),
        scenes: best.scenes,
        source: path.relative(CHANNELS_ROOT, file),
      }
    }
  }
  if (bestScenes.length) best.scenes = bestScenes
  if (!best.title && structuredTitle) best.title = structuredTitle
  return best
}

function cleanHeading(value) {
  const cleaned = String(value || '')
    .replace(/^[A-Z]\d+\s*[:.-]?\s*/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/[\u2013\u2014\u2212_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const polish = (heading) =>
    heading
      .replace(/\bB[\s-]?tree\b/gi, 'B-tree')
      .replace(/\bMulti[\s-]?AZ\b/gi, 'Multi-AZ')
      .replace(/\bPostgresql\b/g, 'PostgreSQL')
      .replace(/\bDba\b/g, 'DBA')
      .replace(/\bZdp\b/g, 'ZDP')
      .replace(/\bPgbouncer\b/g, 'PgBouncer')
      .replace(/\bIt'S\b/g, "It's")
  if (cleaned && cleaned === cleaned.toUpperCase()) {
    return polish(
      cleaned
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
        .replace(/\bHa\b/g, 'HA')
        .replace(/\bWal\b/g, 'WAL')
    )
  }
  return polish(cleaned)
}

function humanizeId(value) {
  return cleanHeading(value)
    .split(' ')
    .map((word) => {
      if (/^(az|rds|pitr|ha|ssl|wal)$/i.test(word)) return word.toUpperCase()
      return word ? `${word[0].toUpperCase()}${word.slice(1)}` : word
    })
    .join(' ')
}

function takeawaysFromSections(sections) {
  return sections
    .map((section) => {
      const paragraph = section.paragraphs[0] || ''
      const sentences =
        paragraph.match(/(?:[^.!?]|\d\.\d)+[.!?]+|(?:[^.!?]|\d\.\d)+$/g) ||
        []
      const first = sentences[0]?.trim() || paragraph
      return first.length > 180 ? `${first.slice(0, 177).trim()}...` : first
    })
    .filter((takeaway) => takeaway.length >= 35)
    .slice(0, 5)
}

function referencesFromScenes(scenes) {
  const references = []
  const seen = new Set()
  for (const scene of scenes || []) {
    for (const source of scene.sources || []) {
      const claim = String(source.claim || '').trim()
      const reference = String(
        source.pg_doc ||
          source.aws_doc ||
          source.reference ||
          source.url ||
          source.source ||
          ''
      ).trim()
      const sourceText = `${claim} ${reference}`.toLowerCase()
      let url = String(
        source.url || source.pg_doc_url || source.aws_doc_url || ''
      ).trim()
      if (!url && source.aws_doc) {
        url = /aurora/i.test(sourceText)
          ? 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html'
          : 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html'
      }
      if (!url && source.pg_doc) {
        const docPath =
          /vacuum|autovacuum|bloat/.test(sourceText)
            ? 'routine-vacuuming.html'
            : /replication|standby|failover/.test(sourceText)
              ? 'warm-standby.html'
              : /parallel/.test(sourceText)
                ? 'how-parallel-query-works.html'
                : /explain|planner|plan |cost|scan/.test(sourceText)
                  ? 'using-explain.html'
                  : /index|btree|b-tree|gin|gist|brin|hash/.test(sourceText)
                    ? 'indexes.html'
                    : 'index.html'
        url = `https://www.postgresql.org/docs/current/${docPath}`
      }
      if (!claim || seen.has(normalizeTitle(claim))) continue
      seen.add(normalizeTitle(claim))
      references.push({
        claim: claim.replace(/[\u2013\u2014\u2212]/g, '-'),
        reference: reference.replace(/[\u2013\u2014\u2212]/g, '-'),
        classification: String(source.classification || '').trim(),
        url,
      })
      if (references.length >= 12) return references
    }
  }
  return references
}

function sectionsFromNarrationMarkers(text) {
  if (!text) return []
  const marker =
    /\[\s*(?:S\d+|Slide\s+\d+)[^\]·]*·\s*([^\]]+)\]|^Slide\s+\d+\s*(?:→[^·\n]*)?·\s*([^\n]+)$/gim
  const matches = [...text.matchAll(marker)]
  if (matches.length < 4) return []

  return matches
    .map((match, index) => {
      const start = (match.index || 0) + match[0].length
      const end =
        index + 1 < matches.length ? matches[index + 1].index : text.length
      let heading = cleanHeading(match[1] || match[2])
      if (/cold open|full screen camera/i.test(heading)) {
        heading = 'The production symptom'
      }
      const paragraphs = paragraphsFromText(text.slice(start, end), 3, heading)
      return { heading, paragraphs }
    })
    .filter(
      (section) =>
        section.paragraphs.length &&
        !/subscribe|next episode|delivery notes?|outro/i.test(section.heading)
    )
}

function sectionsFromScenes(scenes, fallbackParagraphs) {
  if (!Array.isArray(scenes) || scenes.length < 3) {
    const markerSections = sectionsFromNarrationMarkers(
      scenes?.map((scene) => scene.narration).join('\n\n') || ''
    )
    if (markerSections.length >= 4) return markerSections

    const chunkSize = Math.max(2, Math.ceil(fallbackParagraphs.length / 4))
    const fallbackHeadings = [
      'The production symptom',
      'What PostgreSQL is doing',
      'How to verify it',
      'The practical fix',
    ]
    return fallbackParagraphs
      .reduce((sections, paragraph, index) => {
        if (index % chunkSize === 0) {
          sections.push({
            heading:
              fallbackHeadings[sections.length] ||
              `Further analysis ${sections.length + 1}`,
            paragraphs: [],
          })
        }
        sections[sections.length - 1].paragraphs.push(paragraph)
        return sections
      }, [])
      .filter((section) => section.paragraphs.length)
  }

  const hasChapterMetadata = scenes.some((scene) => cleanHeading(scene.chapter))
  if (!hasChapterMetadata) {
    const sectionCount = Math.min(7, Math.max(4, Math.ceil(scenes.length / 4)))
    const chunkSize = Math.ceil(scenes.length / sectionCount)
    const headingOverrides = {
      'managed-fails': 'The failure model',
      'aurora-fails': 'The failure model',
      open: 'The architecture',
      proof: 'Proof before theory',
      'responsibility-matrix': 'What the service manages',
      'connect-prove': 'Connect and verify',
      backups: 'Backups and recovery',
      'single-az-failure': 'Test the failure path',
      'fail-multi-az-instance': 'Multi-AZ failover',
      'fail-writer': 'Writer failover',
      'global-database': 'Regional resilience',
      observe: 'Observe the system',
      'production-decision': 'Choose the production shape',
    }
    return scenes
      .reduce((sections, scene, index) => {
        if (index % chunkSize === 0) {
          const id = scene.id || ''
          sections.push({
            heading:
              headingOverrides[id] ||
              cleanHeading(scene.title) ||
              humanizeId(id) ||
              `Part ${sections.length + 1}`,
            paragraphs: [],
          })
        }
        const paragraph = String(scene.narration || '')
          .replace(/[\u2013\u2014\u2212]/g, '-')
          .replace(/\s+/g, ' ')
          .trim()
        if (paragraph.length >= 45) {
          sections[sections.length - 1].paragraphs.push(paragraph)
        }
        return sections
      }, [])
      .filter((section) => section.paragraphs.length)
  }

  const grouped = []
  for (const scene of scenes) {
    const rawHeading = cleanHeading(scene.chapter)
    const heading =
      !rawHeading || /^(open|hook|course open)$/i.test(rawHeading)
        ? 'The problem'
        : rawHeading
    const paragraph = String(scene.narration || '')
      .replace(/[\u2013\u2014\u2212]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()
    if (paragraph.length < 45) continue

    const last = grouped[grouped.length - 1]
    if (last && normalizeTitle(last.heading) === normalizeTitle(heading)) {
      if (last.paragraphs.length < 5) last.paragraphs.push(paragraph)
    } else {
      grouped.push({ heading, paragraphs: [paragraph] })
    }
  }

  // Merge tiny scene groups into the previous chapter and keep the article readable.
  const merged = []
  for (const section of grouped) {
    if (
      merged.length &&
      section.paragraphs.join(' ').length < 150 &&
      merged[merged.length - 1].paragraphs.length < 5
    ) {
      merged[merged.length - 1].paragraphs.push(...section.paragraphs)
      continue
    }
    merged.push(section)
  }

  return merged
    .filter((section) => section.heading && section.paragraphs.length)
}

function extractMarkdownCodeFences(text, source) {
  if (!text) return []
  const examples = []
  const pattern = /```([a-z0-9_-]*)\s*\n([\s\S]*?)```/gi
  let match
  while ((match = pattern.exec(text)) !== null) {
    const code = match[2].trim()
    if (code.length < 25 || code.length > 1400) continue
    if (
      /html-deck|localhost|http\.server|\bopen\s+["']?.*\.html|\?auto|render_deck|build\.py/i.test(
        code
      )
    ) {
      continue
    }
    if (
      source.startsWith('postgres/') &&
      !/\b(psql|createdb|postgres|pg_|select|show|set|vacuum|analyze|create\s+index|explain|patronictl|etcdctl|aws\s+rds|pgbouncer)\b/i.test(
        code
      )
    ) {
      continue
    }
    examples.push({
      title: source.startsWith('postgres/')
        ? 'PostgreSQL example'
        : 'Code example',
      language: match[1] || 'text',
      code,
      source,
    })
  }
  return examples
}

function splitSqlExamples(text, source) {
  if (!text) return []
  const withoutComments = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*--.*$/gm, '')
    .trim()
  const statements = withoutComments
    .split(/;\s*(?:\n|$)/)
    .map((statement) => statement.trim())
    .filter((statement) => statement.length >= 25 && statement.length <= 1200)
    .filter((statement) =>
      /\b(SELECT|EXPLAIN|CREATE|ALTER|SET|SHOW|INSERT|UPDATE|VACUUM|ANALYZE)\b/i.test(
        statement
      )
    )
  return statements.slice(0, 6).map((statement, index) => ({
    title: index === 0 ? 'Try it yourself' : `Example ${index + 1}`,
    language: 'sql',
    code: `${statement};`,
    source,
  }))
}

function extractShellExamples(text, source) {
  if (!text) return []
  const examples = []
  const heredocPattern = /cat\s+<<['"]?SQL['"]?\s*\n([\s\S]*?)\nSQL\b/g
  let match
  while ((match = heredocPattern.exec(text)) !== null) {
    const code = match[1].trim()
    if (code.length >= 25 && code.length <= 1400) {
      examples.push({
        title: 'SQL verification',
        language: 'sql',
        code,
        source,
      })
    }
  }

  const lines = text.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (
      !/(aws\s+(?:rds\s+(?:reboot|failover|describe)|cloudwatch\s+get)|PGCONNECT_TIMEOUT=.*psql|patronictl|etcdctl)/i.test(
        line
      )
    ) {
      continue
    }
    if (/create-|delete-|cleanup|deletion-protection/i.test(line)) continue
    const command = [line.replace(/^.*\{\s*/, '').trim()]
    while (
      command[command.length - 1].endsWith('\\') &&
      index + 1 < lines.length &&
      command.length < 8
    ) {
      index += 1
      command.push(lines[index].trim())
    }
    const code = command.join('\n').replace(/\s+#.*$/, '').trim()
    if (code.length < 20 || code.length > 1400) continue
    examples.push({
      title: /failover|reboot/i.test(code)
        ? 'Run the failure drill'
        : 'Observe and verify',
      language: 'bash',
      code,
      source,
    })
  }

  return examples.slice(0, 6)
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractHtmlCommands(text, source) {
  if (!text) return []
  const commands = []

  for (const line of text.split('\n')) {
    if (!/t-line t-cmd/.test(line)) continue
    const command = decodeHtml(line)
      .replace(/^(postgres|appdb|app|replica|pgbouncer)=#?\s*/i, '')
      .replace(/^\$\s*/, '')
      .replace(/\s*[→⇒]\s*.*$/, '')
    if (command.length >= 15 && command.length <= 500) commands.push(command)
  }

  const jsCommandPattern = /\["p","[^"]*","c","((?:\\.|[^"])*)"\]/g
  let match
  while ((match = jsCommandPattern.exec(text)) !== null) {
    const command = match[1]
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\s*[→⇒]\s*.*$/, '')
      .trim()
    if (command.length >= 15 && command.length <= 500) commands.push(command)
  }

  const compactJsCommandPattern =
    /\["p","[^"]*","((?:SELECT|EXPLAIN|SHOW|SET|VACUUM|ANALYZE|psql|aws rds|patronictl|etcdctl)(?:\\.|[^"])*)"\]/gi
  while ((match = compactJsCommandPattern.exec(text)) !== null) {
    const command = match[1]
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\s*[→⇒]\s*.*$/, '')
      .trim()
    if (command.length >= 15 && command.length <= 500) commands.push(command)
  }

  const catalogViews =
    text.match(
      /\b(?:pg_stat_[a-z_]+|pg_stats(?:_ext(?:_exprs)?)?)\b/gi
    ) || []
  for (const view of [...new Set(catalogViews.map((name) => name.toLowerCase()))]) {
    commands.push(`SELECT * FROM ${view} LIMIT 20;`)
  }

  const unique = [...new Set(commands)]
    .filter((command) => !command.endsWith('\\'))
    .filter((command) =>
      /\b(SELECT|EXPLAIN|SET|SHOW|VACUUM|ANALYZE|psql|aws rds|patronictl|etcdctl)\b/i.test(
        command
      )
    )
    .slice(0, 6)

  return unique.map((code, index) => ({
    title: index === 0 ? 'Inspect the system' : `Verification ${index + 1}`,
    language: /^(psql|aws |patronictl|etcdctl)/i.test(code)
      ? 'shell'
      : 'sql',
    code,
    source,
  }))
}

function indexesCompleteGuideExamples() {
  const source = 'postgres/indexes_complete_guide/demo.sql'
  return [
    {
      title: 'Establish the baseline',
      language: 'sql',
      sectionHint: 'problem sequential scan baseline',
      code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'cancelled'
  AND created_at >= now() - interval '7 days';`,
      result: `Seq Scan on orders
Rows returned: about 9,000
Rows inspected: 5,000,000
Shared blocks: about 19,000
Execution Time: 4821 ms`,
      resultLabel: 'Measured baseline',
      source,
    },
    {
      title: 'Shape the composite index to the predicate',
      language: 'sql',
      sectionHint: 'composite B-tree equality range',
      code: `CREATE INDEX CONCURRENTLY idx_orders_status_created
  ON orders (status, created_at);

ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'cancelled'
  AND created_at >= now() - interval '7 days';`,
      result: `Index Scan using idx_orders_status_created
Index Cond: status = 'cancelled'
            AND created_at >= now() - interval '7 days'
Shared blocks: about 110
Execution Time: 12 ms
Improvement: 399x`,
      resultLabel: 'Measured result',
      source,
    },
    {
      title: 'Prove a covering index is truly index-only',
      language: 'sql',
      sectionHint: 'covering index INCLUDE visibility map heap fetches',
      code: `CREATE INDEX idx_orders_status_inc
  ON orders (status, created_at)
  INCLUDE (customer_id, total_cents);

VACUUM orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT status, created_at, customer_id, total_cents
FROM orders
WHERE status = 'cancelled'
  AND created_at >= now() - interval '7 days';`,
      result: `Index Only Scan using idx_orders_status_inc
Heap Fetches: 0

Before VACUUM, the same plan recorded about 84,000 heap fetches.`,
      resultLabel: 'Verification',
      source,
    },
    {
      title: 'Index only the hot business slice',
      language: 'sql',
      sectionHint: 'partial index predicate unpaid',
      code: `CREATE INDEX idx_orders_unpaid
  ON orders (created_at)
  WHERE status = 'unpaid';

EXPLAIN (ANALYZE, BUFFERS)
SELECT id
FROM orders
WHERE status = 'unpaid'
  AND created_at >= now() - interval '30 days';`,
      result: `Index Scan using idx_orders_unpaid
Index Cond: created_at >= now() - interval '30 days'

Remove status = 'unpaid' and the planner cannot prove the partial-index predicate.`,
      resultLabel: 'Expected plan shape',
      source,
    },
    {
      title: 'Watch two indexes combine',
      language: 'sql',
      sectionHint: 'bitmap index scans BitmapAnd lossy recheck',
      code: `CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_created_at ON orders (created_at);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id
FROM orders
WHERE status = 'cancelled'
  AND created_at >= now() - interval '30 days';`,
      result: `Bitmap Heap Scan on orders
  -> BitmapAnd
       -> Bitmap Index Scan on idx_orders_status
       -> Bitmap Index Scan on idx_orders_created_at

With an undersized work_mem, the lab recorded about 800,000 rows removed by index recheck.`,
      resultLabel: 'Plan shape and caution',
      source,
    },
    {
      title: 'Match the JSONB operator with GIN',
      language: 'sql',
      sectionHint: 'GIN JSONB containment',
      code: `CREATE INDEX idx_products_attrs
  ON products USING gin (attrs);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id
FROM products
WHERE attrs @> '{"color":"red"}'::jsonb;`,
      result: `Bitmap Index Scan on idx_products_attrs
  -> Bitmap Heap Scan on products

Measured caution: about 80,000 matches, 12,000 disk blocks, and 780 ms.
A correct index cannot make a broad predicate selective.`,
      resultLabel: 'Measured result',
      source,
    },
    {
      title: 'Use GiST for range overlap',
      language: 'sql',
      sectionHint: 'GiST range overlap reservation',
      code: `CREATE INDEX idx_reservations_during
  ON reservations USING gist (during);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id
FROM reservations
WHERE during && tstzrange(
  timestamptz '2026-01-02',
  timestamptz '2026-01-03',
  '[)'
);`,
      result: `Index Scan using idx_reservations_during
Index Cond: during && tstzrange(...)

The overlap operator is supported by the range GiST operator class.`,
      resultLabel: 'Expected plan shape',
      source,
    },
    {
      title: 'Find indexes that cost space but serve no reads',
      language: 'sql',
      sectionHint: 'monitoring maintenance index usage size',
      code: `SELECT
  indexrelname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC, pg_relation_size(indexrelid) DESC
LIMIT 30;`,
      result: `Review large indexes with low idx_scan first.
Do not drop an index from one snapshot alone.
Compare over a representative workload window and check constraints before removal.`,
      resultLabel: 'Production interpretation',
      source,
    },
  ]
}

function examplesFromProject(projectRoot, variantHint = '') {
  if (path.basename(projectRoot) === 'indexes_complete_guide') {
    return indexesCompleteGuideExamples()
  }
  const allFiles = listFilesRecursive(projectRoot, 0, 3)
  const ranked = allFiles
    .filter((file) => /\.(sql|md|sh|conf|html)$/i.test(file))
    .filter((file) => !/node_modules|vendor|assets/i.test(file))
    .sort((a, b) => {
      const score = (file) => {
        const name = path.basename(file).toLowerCase()
        const hintTokens = normalizeTitle(variantHint)
          .split(' ')
          .filter((token) => token.length > 3 && !['postgres', 'postgresql', 'full'].includes(token))
        const hintMatch =
          hintTokens.length > 0 &&
          hintTokens.some((token) => normalizeTitle(name).includes(token))
        if (hintMatch && name.endsWith('.html')) return -2
        if (name === 'demo.sql') return 0
        if (name === 'example.sql' || name === 'examples.sql') return 1
        if (/demo[_-]commands\.sh$/.test(name)) return 1
        if (name === 'readme.md') return 2
        if (name === 'setup.sql') return 3
        if (name.endsWith('.sql')) return 4
        if (name.endsWith('.html')) return 5
        return 6
      }
      return score(a) - score(b)
    })

  const examples = []
  for (const file of ranked) {
    const source = path.relative(CHANNELS_ROOT, file)
    const text = readText(file)
    if (!text) continue
    const extracted = file.endsWith('.sql')
      ? splitSqlExamples(text, source)
      : file.endsWith('.sh')
        ? extractShellExamples(text, source)
      : file.endsWith('.html')
        ? extractHtmlCommands(text, source)
        : extractMarkdownCodeFences(text, source)
    for (const example of extracted) {
      if (examples.some((item) => item.code === example.code)) continue
      examples.push(example)
      if (examples.length >= 6) return examples
    }
  }
  return examples
}

function narrationVariantsFromProject(projectRoot, topicKey, projectSlug) {
  const narrationDir = path.join(projectRoot, 'narration')
  if (!fs.existsSync(narrationDir)) return []

  const jsonFiles = listFilesRecursive(narrationDir, 0, 2)
    .filter((file) => file.endsWith('.json'))
    .filter((file) => !/short|cue|measurement|voice_profile|manifest/i.test(file))

  const variants = []
  for (const file of jsonFiles) {
    const raw = readText(file)
    if (!raw) continue
    const parsed = extractNarrationFromJson(raw)
    if (
      !parsed.title ||
      parsed.narration.length < 500 ||
      /\bshort\b/i.test(parsed.title)
    ) {
      continue
    }
    const paragraphs = paragraphsFromText(parsed.narration, 20, parsed.title)
    if (paragraphs.length < 2) continue
    const sections = sectionsFromScenes(parsed.scenes, paragraphs)
    variants.push({
      topic: topicKey,
      slug: `${projectSlug}--${path.basename(file, '.json')}`,
      title: parsed.title,
      titles: [parsed.title],
      titleKeys: [normalizeTitle(parsed.title)],
      folderKey: normalizeTitle(
        `${projectSlug} ${path.basename(file, '.json')}`
      ),
      paragraphs,
      sections,
      examples:
        topicKey === 'postgresql'
          ? examplesFromProject(projectRoot, path.basename(file, '.json'))
          : [],
      takeaways: takeawaysFromSections(sections),
      references: referencesFromScenes(parsed.scenes),
      cover: null,
      source: path.relative(CHANNELS_ROOT, file),
    })
  }
  return variants
}

function findCover(projectRoot, topicKey, slug) {
  const patterns = [
    /thumbnail/i,
    /banner/i,
    /front_00/i,
    /co_00/i,
    /-4k\.png$/i,
    /viral-thumb/i,
    /_title_after/i,
    /scene_01_title/i,
  ]
  const imageDirs = [
    path.join(projectRoot, 'html-deck', 'image'),
    path.join(projectRoot, '_preview'),
    path.join(projectRoot, 'html-deck'),
    path.join(projectRoot, '.audit'),
    path.join(projectRoot, 'assets'),
  ]

  const images = []
  for (const dir of imageDirs) {
    if (!fs.existsSync(dir)) continue
    for (const file of listFilesRecursive(dir, 0, 2)) {
      if (!/\.(png|jpe?g|webp)$/i.test(file)) continue
      images.push(file)
    }
  }

  for (const pattern of patterns) {
    const hit = images.find((file) => pattern.test(path.basename(file)))
    if (hit) return hit
  }
  return images[0] || null
}

function copyCover(src, topicKey, slug) {
  if (!src) return null
  const ext = path.extname(src).toLowerCase() || '.png'
  const destDir = path.join(process.cwd(), 'public', 'video-covers', topicKey)
  fs.mkdirSync(destDir, { recursive: true })
  const destName = `${slug}${ext}`
  const dest = path.join(destDir, destName)
  try {
    fs.copyFileSync(src, dest)
    return `/video-covers/${topicKey}/${destName}`
  } catch {
    return null
  }
}

function parseNarrationTxt(text) {
  if (!text) return ''
  // Scene-script format: [001] 00:00-00:30  label
  const lines = text.replace(/\r/g, '').split('\n')
  const parts = []
  let buf = []

  const flush = () => {
    const block = buf.join(' ').replace(/\s+/g, ' ').trim()
    buf = []
    if (!block) return
    if (/^Narration:\s/i.test(block)) return
    if (/scaffold/i.test(block)) return
    if (block.length < 40) return
    parts.push(block)
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      flush()
      continue
    }
    if (/^\[?\d{3}\]/.test(trimmed)) {
      flush()
      continue
    }
    if (/^={5,}/.test(trimmed)) continue
    if (/^(PostgreSQL Indexes:|Channel:|Runtime|Build |Channel:)/i.test(trimmed)) continue
    if (/^https?:\/\//i.test(trimmed)) continue
    buf.push(trimmed)
  }
  flush()
  return parts.join('\n\n')
}

function paragraphsFromText(text, max = 20, title = '') {
  if (!text) return []
  let cleaned = text
    .replace(/\r/g, '')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .trim()

  // Prefer scene-parsed narration when markers exist
  if (/\[\d{3}\]/.test(cleaned) || /^\d{2}:\d{2}/m.test(cleaned)) {
    const parsed = parseNarrationTxt(cleaned)
    if (parsed.length > 200) cleaned = parsed
  }

  const normalize = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()

  const titleKey = normalize(title)
  const isEditorialNoise = (block) =>
    /html-deck|deck\.html|\?auto|render_deck|one clip per slide|delivery notes|recorded as \w+\.wav|open localhost|http\.server/i.test(
      block
    )

  let blocks = cleaned
    .split(/\n{2,}/)
    .map((b) => b.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((b) => b.length > 50)
    .filter((b) => !/^Narration:/i.test(b))
    .filter((b) => !/scaffold deck/i.test(b))
    .filter((b) => !isEditorialNoise(b))
    .filter((b) => !titleKey || normalize(b) !== titleKey)
    .filter((b) => !titleKey || !normalize(b).startsWith(titleKey.slice(0, Math.min(40, titleKey.length))))

  if (blocks.length < 3) {
    const sentences =
      cleaned.match(/(?:[^.!?]|\d\.\d)+[.!?]+|(?:[^.!?]|\d\.\d)+$/g) || [cleaned]
    blocks = []
    let buf = ''
    for (const sentence of sentences.map((s) => s.trim()).filter(Boolean)) {
      if (/^Narration:/i.test(sentence)) continue
      if (isEditorialNoise(sentence)) continue
      buf = buf ? `${buf} ${sentence}` : sentence
      if (buf.length > 280) {
        blocks.push(buf)
        buf = ''
        if (blocks.length >= max) break
      }
    }
    if (buf && blocks.length < max) blocks.push(buf)
  }

  // Keep a complete article feel without dumping a full hour transcript
  return blocks.slice(0, max)
}

function indexTopic(topicKey, dirName) {
  const root = path.join(CHANNELS_ROOT, dirName)
  if (!fs.existsSync(root)) {
    console.warn(`Missing topic dir: ${root}`)
    return []
  }

  const projects = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (SKIP_NAME.test(entry.name) || entry.name.startsWith('.')) continue

    const projectRoot = path.join(root, entry.name)
    const yt =
      parseYoutubeMd(readText(path.join(projectRoot, 'youtube.md'))) ||
      parseYoutubeMd(readText(path.join(projectRoot, 'youtube_metadata.md')))
    // parseYoutubeMd always returns object; fix dual read:
    const ytMd =
      readText(path.join(projectRoot, 'youtube.md')) ||
      readText(path.join(projectRoot, 'youtube_metadata.md'))
    const ytMeta = parseYoutubeMd(ytMd)
    const narr = findBestNarration(projectRoot)

    if (/scaffold deck/i.test(narr.narration) && narr.narration.length < 800) {
      continue
    }

    const title = ytMeta.title || narr.title || entry.name.replace(/[_-]+/g, ' ')

    // Prefer full lecture narration for the article body; youtube.md is secondary.
    const narrText = narr.narration || ''
    const isScaffold =
      /^Narration:\s/m.test(narrText) ||
      (/scaffold/i.test(narrText) && narrText.length < 1200)
    const bodySource = !isScaffold && narrText.length > 400 ? narrText : ytMeta.description || narrText
    if (!bodySource || bodySource.length < 120) continue

    const paragraphs = paragraphsFromText(bodySource, 20, title)
    if (paragraphs.length < 2) continue
    const sections = sectionsFromScenes(narr.scenes, paragraphs)
    const examples =
      topicKey === 'postgresql' ? examplesFromProject(projectRoot) : []
    const takeaways = takeawaysFromSections(sections)

    // Do not copy title-card stills into the site; they duplicate the article heading.
    const coverSrc = findCover(projectRoot, topicKey, entry.name)
    const looksLikeTitleCard =
      coverSrc && /title|thumbnail|_title_/i.test(path.basename(coverSrc))
    const cover = looksLikeTitleCard ? null : copyCover(coverSrc, topicKey, entry.name)

    const titles = [title, ...ytMeta.alts, narr.title].filter(Boolean)
    const uniqueTitles = [...new Set(titles.map((t) => t.trim()).filter(Boolean))]

    projects.push({
      topic: topicKey,
      slug: entry.name,
      title: uniqueTitles[0],
      titles: uniqueTitles,
      titleKeys: uniqueTitles.map(normalizeTitle),
      folderKey: normalizeTitle(entry.name),
      paragraphs,
      sections,
      examples,
      takeaways,
      references: referencesFromScenes(narr.scenes),
      cover,
      source: narr.source || (ytMd ? path.relative(CHANNELS_ROOT, path.join(projectRoot, 'youtube.md')) : null),
    })

    const variants = narrationVariantsFromProject(
      projectRoot,
      topicKey,
      entry.name
    )
    for (const variant of variants) {
      if (
        projects.some(
          (project) =>
            project.slug !== variant.slug &&
            project.titleKeys?.[0] === variant.titleKeys[0] &&
            project.source === variant.source
        )
      ) {
        continue
      }
      projects.push(variant)
    }
  }

  return projects
}

function main() {
  if (!fs.existsSync(CHANNELS_ROOT)) {
    console.warn(`CHANNELS_ROOT not found: ${CHANNELS_ROOT}`)
    if (fs.existsSync(OUT_PATH)) {
      console.warn(`Keeping existing index at ${OUT_PATH}`)
      process.exit(0)
    }
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
    fs.writeFileSync(
      OUT_PATH,
      JSON.stringify(
        { generatedAt: new Date().toISOString(), channelsRoot: CHANNELS_ROOT, count: 0, entries: [] },
        null,
        2
      )
    )
    process.exit(0)
  }

  const entries = []
  for (const [topicKey, dirName] of Object.entries(TOPIC_DIRS)) {
    const projects = indexTopic(topicKey, dirName)
    console.log(`${topicKey}: ${projects.length} long-form projects`)
    entries.push(...projects)
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        channelsRoot: CHANNELS_ROOT,
        count: entries.length,
        entries,
      },
      null,
      2
    )
  )
  console.log(`Wrote ${entries.length} entries -> ${OUT_PATH}`)
}

main()
