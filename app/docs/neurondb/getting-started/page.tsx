import { Metadata } from 'next'
import { Gauge } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with NeurondB | PostgreSQL AI Vector Extension',
  description: 'Install NeurondB, configure PostgreSQL, and run your first vector-search queries with embeddings, semantic search, and RAG workflows.',
}

export default function NeurondBGettingStarted() {
  return (
    <GettingStartedLayout
      product="NeurondB"
      hero={{
        label: 'NeurondB',
        labelIcon: <Gauge className="h-4 w-4" />, 
        labelAccent: 'indigo',
        title: 'Getting Started with NeurondB',
        description:
          'Deploy the AI-capable PostgreSQL extension with GPU-accelerated vector search, ONNX model inference, and hybrid retrieval. This quick start covers installation, configuration, and your first semantic search queries.',
        cta: {
          href: '/docs/neurondb',
          label: 'View documentation hub',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900',
        heroOverlay:
          'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-500/10 dark:to-purple-500/10',
        requirementsBorder: 'indigo',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Requirements',
        items: [
          'PostgreSQL 16, 17, or 18 (server + development headers)',
          'Build toolchain: gcc/clang, make, autoconf, libtool',
          'Optional: CUDA-enabled GPU for accelerated search and inference',
          'Internet access for downloading models or dependencies',
        ],
      }}
      sections={[
        {
          title: 'Install NeurondB',
          description:
            'Build from source on your platform of choice. Each snippet installs prerequisites, clones the repository, and compiles the extension.',
          cards: [
            {
              id: 'install-ubuntu',
              title: 'Ubuntu / Debian',
              accent: 'indigo',
              content: (
                <BashCodeBlock
                  title="Install packages & build"
                  code={`sudo apt-get update
sudo apt-get install -y postgresql-17 postgresql-server-dev-17 build-essential \
    libcurl4-openssl-dev libssl-dev zlib1g-dev

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
                />
              ),
            },
            {
              id: 'install-macos',
              title: 'macOS (Homebrew)',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Install packages & build"
                  code={`brew install postgresql@17

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
                />
              ),
            },
            {
              id: 'install-rhel',
              title: 'Rocky Linux / RHEL',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Install packages & build"
                  code={`sudo dnf install -y postgresql17-server postgresql17-devel gcc make \
    curl-devel openssl-devel zlib-devel

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
                />
              ),
            },
          ],
        },
        {
          title: 'Configure PostgreSQL',
          description: 'Load NeurondB at startup and adjust optional GPU settings in postgresql.conf.',
          content: [
            <BashCodeBlock
              key="configure-postgres"
              title="postgresql.conf"
              code={`shared_preload_libraries = 'neurondb'

# Optional GPU settings
neurondb.gpu_enabled = on
neurondb.gpu_backend = 'cuda'
neurondb.gpu_memory_pool_mb = 2048
neurondb.gpu_fail_open = on

# Apply and restart PostgreSQL
ALTER SYSTEM SET shared_preload_libraries = 'neurondb';
# sudo systemctl restart postgresql`}
            />,
          ],
        },
        {
          title: 'Initialize and Query',
          description: 'Create the extension, define your vector schema, and run the first semantic search query.',
          cards: [
            {
              id: 'create-extension',
              title: 'Create Extension',
              accent: 'cyan',
              content: <SqlCodeBlock title="Enable NeurondB" code={`CREATE EXTENSION neurondb;`} />,
            },
            {
              id: 'vector-table',
              title: 'Create a Vector Table',
              accent: 'blue',
              content: (
                <SqlCodeBlock
                  title="Sample schema"
                  code={`CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(384)
);`}
                />
              ),
            },
            {
              id: 'semantic-search',
              title: 'Insert & Search',
              accent: 'rose',
              content: (
                <SqlCodeBlock
                  title="Semantic search"
                  code={`-- Insert a document with generated embedding
INSERT INTO documents (title, content, embedding)
VALUES (
    'Machine Learning',
    'Introduction to ML',
    embed_text('Introduction to Machine Learning')
);

-- Query similar documents
SELECT title, content,
       embedding <-> embed_text('artificial intelligence') AS distance
FROM   documents
ORDER  BY distance
LIMIT  10;`}
                />
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/neurondb/features/indexing',
          title: '🧮 Vector Indexing',
          description: 'Configure HNSW, IVF, and quantization strategies for large-scale search.',
        },
        {
          href: '/docs/neurondb/ml/inference',
          title: '⚡ ONNX Inference',
          description: 'Deploy ONNX models and batch infer directly in PostgreSQL.',
        },
        {
          href: '/docs/neurondb/hybrid/overview',
          title: '🔎 Hybrid Retrieval',
          description: 'Combine vector, keyword, and metadata filters for production search.',
        },
        {
          href: '/docs/neurondb/rag/page',
          title: '🤖 RAG Pipelines',
          description: 'Build retrieval augmented generation pipelines with SQL workflows.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/NeurondB/issues',
          label: 'GitHub Issues',
          description: 'Report bugs or request features',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/NeurondB/discussions',
          label: 'GitHub Discussions',
          description: 'Share experiences and ask questions',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/NeurondB',
          label: 'Repository README',
          description: 'Latest release notes and roadmap',
          external: true,
        },
      ]}
    />
  )
}

