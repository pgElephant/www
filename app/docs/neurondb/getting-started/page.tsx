import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with NeurondB | PostgreSQL AI Vector Extension',
  description: 'Install NeurondB, configure PostgreSQL, and run your first vector-search queries with embeddings, semantic search, and RAG workflows.',
}

const tableOfContents: TocItem[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'requirements', title: 'Requirements' },
  { id: 'installation', title: 'Installation' },
  { id: 'quick-start', title: 'Quick Start Checklist' },
  { id: 'configuration', title: 'Configure PostgreSQL' },
  { id: 'initialize-and-query', title: 'Initialize and Query' },
]

const prevLink: NavLink | undefined = undefined
const nextLink: NavLink = {
  href: '/docs/neurondb/installation',
  label: 'Installation',
}

export default function NeurondBGettingStarted() {
  return (
    <PostgresDocsLayout
      title="Getting Started with NeurondB"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          NeurondB is an AI-capable PostgreSQL extension that provides GPU-accelerated vector search, ONNX model inference, and hybrid retrieval. This guide covers installation, configuration, and your first semantic search queries.
        </p>
        <p>
          NeurondB enables you to:
        </p>
        <ul>
          <li>Perform fast similarity search on high-dimensional vectors</li>
          <li>Run ONNX model inference directly in PostgreSQL</li>
          <li>Combine vector, keyword, and metadata filters for hybrid retrieval</li>
          <li>Build RAG (Retrieval Augmented Generation) pipelines with SQL workflows</li>
        </ul>
      </section>

      <section id="requirements">
        <h2>Requirements</h2>
        <p>Before installing NeurondB, ensure you have:</p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 (server + development headers)</li>
          <li>Build toolchain: gcc/clang, make, autoconf, libtool</li>
          <li>Optional: CUDA-enabled GPU for accelerated search and inference</li>
          <li>Internet access for downloading models or dependencies</li>
        </ul>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <p>
          Build NeurondB from source on your platform of choice. Each snippet installs prerequisites, clones the repository, and compiles the extension.
        </p>

        <h3>Ubuntu / Debian</h3>
        <BashCodeBlock
          title="Install packages & build"
          code={`sudo apt-get update
sudo apt-get install -y postgresql-17 postgresql-server-dev-17 build-essential \\
    libcurl4-openssl-dev libssl-dev zlib1g-dev

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
        />

        <h3>macOS (Homebrew)</h3>
        <BashCodeBlock
          title="Install packages & build"
          code={`brew install postgresql@17

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
./build.sh                    # Prepare build environment
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
        />

        <h3>Rocky Linux / RHEL</h3>
        <BashCodeBlock
          title="Install packages & build"
          code={`sudo dnf install -y postgresql17-server postgresql17-devel gcc make \\
    curl-devel openssl-devel zlib-devel

git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
./build.sh                    # Prepare build environment
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
        />
      </section>

      <section id="quick-start">
        <h2>Quick Start Checklist</h2>
        <p>Validate your installation and run the core NeurondB commands in minutes.</p>

        <h3>Verify Extension</h3>
        <SqlCodeBlock
          title="Verify extension"
          code={`-- Ensure extension is available
SELECT extname, extversion
FROM   pg_extension
WHERE  extname = 'neurondb';

-- Check GPU support (if available)
SELECT * FROM neurondb_gpu_info();

-- List available vector functions
SELECT proname, pronargs
FROM   pg_proc
WHERE  proname LIKE 'vector_%' OR proname LIKE 'neurondb_%'
ORDER  BY proname
LIMIT  15;`}
        />

        <h3>Create Sample Data</h3>
        <SqlCodeBlock
          title="Create test table and insert vectors"
          code={`-- Create a simple documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(384)
);

-- Insert sample documents with manual vectors
INSERT INTO documents (title, content, embedding) VALUES
    ('PostgreSQL Guide', 'Introduction to PostgreSQL database', 
     '[' || array_to_string((SELECT array_agg(random()::float4) FROM generate_series(1, 384)), ',') || ']'::vector),
    ('Vector Search', 'Understanding vector similarity search', 
     '[' || array_to_string((SELECT array_agg(random()::float4) FROM generate_series(1, 384)), ',') || ']'::vector),
    ('Machine Learning', 'ML algorithms and neural networks', 
     '[' || array_to_string((SELECT array_agg(random()::float4) FROM generate_series(1, 384)), ',') || ']'::vector);`}
        />

        <h3>Run First Vector Search</h3>
        <SqlCodeBlock
          title="Basic vector similarity search"
          code={`-- Create a query vector
WITH query_vec AS (
    SELECT '[' || array_to_string((SELECT array_agg(random()::float4) FROM generate_series(1, 384)), ',') || ']'::vector(384) AS qv
)
SELECT 
    d.id,
    d.title,
    d.content,
    vector_l2_distance(d.embedding, qv.qv) AS distance
FROM documents d, query_vec qv
ORDER BY distance
LIMIT 5;`}
        />
      </section>

      <section id="configuration">
        <h2>Configure PostgreSQL</h2>
        <p>Load NeurondB at startup and adjust optional GPU settings in postgresql.conf.</p>
        <BashCodeBlock
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
        />
      </section>

      <section id="initialize-and-query">
        <h2>Initialize and Query</h2>
        <p>Create the extension, define your vector schema, and run the first semantic search query.</p>

        <h3>Create Extension</h3>
        <SqlCodeBlock title="Enable NeurondB" code={`CREATE EXTENSION neurondb;`} />

        <h3>Create a Vector Table</h3>
        <SqlCodeBlock
          title="Sample schema"
          code={`CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(384)
);`}
        />

        <h3>Insert & Search</h3>
        <SqlCodeBlock
          title="Vector operations and similarity search"
          code={`-- Insert documents with vector embeddings
INSERT INTO documents (title, content, embedding) VALUES
    ('Machine Learning', 'Introduction to ML', 
     '[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]'::vector(384)),
    ('Deep Learning', 'Neural networks and backpropagation', 
     '[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]'::vector(384));

-- Query similar documents using L2 distance
SELECT 
    title, 
    content,
    vector_l2_distance(embedding, '[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]'::vector(384)) AS distance
FROM documents
ORDER BY distance
LIMIT 10;

-- Alternative: Use distance operator <-> (L2) or <=> (cosine)
SELECT 
    title,
    embedding <-> '[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]'::vector(384) AS l2_distance,
    embedding <=> '[0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]'::vector(384) AS cosine_distance
FROM documents
ORDER BY l2_distance
LIMIT 10;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Vector Indexing</a> - Configure HNSW, IVF, and quantization strategies for large-scale search.</li>
          <li><a href="/docs/neurondb/ml/inference">ONNX Inference</a> - Deploy ONNX models and batch infer directly in PostgreSQL.</li>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Retrieval</a> - Combine vector, keyword, and metadata filters for production search.</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - Build retrieval augmented generation pipelines with SQL workflows.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
