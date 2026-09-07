interface TechnicalDiagramProps {
  title: string
  topic: string
}

type DiagramKind = 'index' | 'architecture' | 'memory'

function diagramKind(title: string): DiagramKind | null {
  const value = title.toLowerCase()
  if (/work[_ ]mem|memory/.test(value)) return 'memory'
  if (/index|planner|query/.test(value)) return 'index'
  if (/aurora|rds|high availability|active-active|region|patroni/.test(value)) {
    return 'architecture'
  }
  return null
}

const diagrams = {
  index: {
    label: 'How PostgreSQL chooses an access path',
    nodes: [
      { x: 30, width: 140, title: 'SQL query', note: 'Predicates and order' },
      { x: 230, width: 150, title: 'Planner', note: 'Cost and statistics' },
      { x: 440, width: 150, title: 'Access path', note: 'Index or seq scan' },
    ],
  },
  architecture: {
    label: 'The production request path',
    nodes: [
      { x: 30, width: 140, title: 'Application', note: 'Retry-aware client' },
      { x: 230, width: 150, title: 'Stable endpoint', note: 'Routing layer' },
      { x: 440, width: 150, title: 'PostgreSQL', note: 'Writer and replicas' },
    ],
  },
  memory: {
    label: 'Why per-operation memory multiplies',
    nodes: [
      { x: 30, width: 140, title: 'Connections', note: 'Concurrent sessions' },
      { x: 230, width: 150, title: 'Operations', note: 'Sorts and hashes' },
      { x: 440, width: 150, title: 'Memory risk', note: 'Peak, not average' },
    ],
  },
}

export function TechnicalDiagram({ title, topic }: TechnicalDiagramProps) {
  if (topic !== 'postgresql') return null
  const kind = diagramKind(title)
  if (!kind) return null
  const diagram = diagrams[kind]

  return (
    <figure className="my-12 border border-white/[0.1] bg-black/25 p-5 sm:p-7">
      <figcaption className="mb-6 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-stone-300">
          {diagram.label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-stone-600">
          System sketch
        </span>
      </figcaption>
      <svg
        viewBox="0 0 620 132"
        role="img"
        aria-label={diagram.label}
        className="h-auto w-full"
      >
        <defs>
          <marker
            id={`arrow-${kind}`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#78716c" />
          </marker>
        </defs>
        {diagram.nodes.slice(0, -1).map((node, index) => (
          <line
            key={`line-${node.x}`}
            x1={node.x + node.width}
            y1="60"
            x2={diagram.nodes[index + 1].x - 14}
            y2="60"
            stroke="#57534e"
            strokeWidth="1.5"
            markerEnd={`url(#arrow-${kind})`}
          />
        ))}
        {diagram.nodes.map((node, index) => (
          <g key={node.title}>
            <rect
              x={node.x}
              y="26"
              width={node.width}
              height="68"
              rx="2"
              fill={index === 1 ? '#14120e' : '#101010'}
              stroke={index === 1 ? '#9a8358' : '#3f3f46'}
            />
            <text
              x={node.x + node.width / 2}
              y="55"
              textAnchor="middle"
              fill="#f5f5f4"
              fontSize="13"
              fontWeight="600"
            >
              {node.title}
            </text>
            <text
              x={node.x + node.width / 2}
              y="76"
              textAnchor="middle"
              fill="#78716c"
              fontSize="10"
            >
              {node.note}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
