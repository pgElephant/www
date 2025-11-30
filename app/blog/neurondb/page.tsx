import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';

export const metadata = {
  title: 'NeuronDB: PostgreSQL AI Vector Database Extension',
  description: 'Transform PostgreSQL into an AI platform with vector search, ML inference, and RAG capabilities. HNSW indexing, GPU acceleration, 10+ distance metrics, and pgvector compatibility.',
  openGraph: {
    title: 'NeuronDB: PostgreSQL AI Vector Database Extension',
    description: 'Vector Search, ML Inference, GPU Acceleration - Transform PostgreSQL into an AI Platform',
    images: ['/blog/neurondb/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuronDB: PostgreSQL AI Vector Database Extension',
    description: 'Vector Search, ML Inference, GPU Acceleration - Transform PostgreSQL into an AI Platform',
    images: ['/blog/neurondb/og-image.svg'],
  },
};

const markdown = `![NeuronDB header](/blog/neurondb/header.svg?v=7)

# NeuronDB: PostgreSQL AI Vector Database Extension

**[View on GitHub](https://github.com/pgElephant/NeurondB)** | **[Download Latest Release](https://github.com/pgElephant/NeurondB/releases)** | **[Documentation](https://www.pgelephant.com/docs/neurondb)**

## Executive Summary

AI applications need vector similarity search, semantic retrieval, and machine learning inference in the database. NeuronDB is a PostgreSQL extension. It adds vector search, ML inference, GPU acceleration, and hybrid retrieval to PostgreSQL. It maintains full pgvector compatibility.

## Introduction

Building AI applications with PostgreSQL requires multiple tools. You use pgvector for vectors. You use separate ML frameworks for embeddings. You use external services for GPU acceleration. You write custom code for hybrid search. This creates complexity, latency, and operational overhead.

NeuronDB unifies these capabilities in one PostgreSQL extension. You get semantic search, RAG, recommendation systems, and ML inference in your database.

## What Makes NeuronDB Different

### Vector Search Capabilities

NeuronDB provides vector search with advanced indexing:

**Indexing Algorithms**
- **HNSW** (Hierarchical Navigable Small World) - Sub-10ms queries on 100M+ vectors
- **IVFFlat** - Memory-efficient approximate nearest neighbor search
- **Flat** - Exact nearest neighbor for small datasets
- **DiskANN** - Billion-scale vectors with SSD storage

**Distance Metrics (10+ supported)**
- L2 distance (Euclidean)
- Inner product (dot product)
- Cosine similarity
- Hamming distance
- Jaccard distance
- Manhattan (L1)
- Chebyshev
- Minkowski
- Canberra
- Braycurtis

**Vector Optimization**
- Scalar quantization (4x memory reduction)
- Product quantization (8-16x reduction)
- Binary quantization for Hamming distance
- GPU-accelerated search (10-100x faster)

### ML Inference Engine

Built-in machine learning eliminates external API dependencies:

**Embedding Generation**
- 50+ pre-trained models (BERT, sentence-transformers, OpenAI-compatible)
- Automatic text-to-vector conversion
- Batch processing for high throughput
- Multi-modal embeddings (text, image, audio)

**Model Formats**
- ONNX runtime integration
- Hugging Face model support
- Custom model loading
- GPU inference acceleration

**Inference Modes**
- Real-time embedding generation
- Batch background processing
- Streaming inference
- Multi-model support

### Hybrid Search

Combine vector similarity with traditional search:

**Search Types**
- Vector similarity search
- Full-text search (PostgreSQL FTS)
- BM25 ranking
- Multi-vector search
- Faceted filtering

**Fusion Algorithms**
- Reciprocal Rank Fusion (RRF)
- Weighted scoring
- Custom rank aggregation
- Score normalization

### GPU Acceleration

Optional CUDA support for performance improvements:

**GPU Features**
- CUDA kernel optimization
- Batch query processing
- Multi-GPU support
- Automatic CPU/GPU switching

**Performance**
- 100M vectors: <10ms search latency
- 1B vectors with DiskANN: <50ms
- 10,000+ QPS on single GPU
- Linear scaling with multiple GPUs

**Supported Hardware**
- NVIDIA RTX series (RTX 3090, 4090, A6000)
- Data center GPUs (A100, H100, V100)
- CUDA 11.0+ compatibility

## Installation and Configuration

### Prerequisites

- PostgreSQL 12, 13, 14, 15, 16, or 17
- Linux (Ubuntu 20.04+, Rocky 8+), macOS, or Windows (WSL2)
- Optional: NVIDIA GPU with CUDA 11.0+ for GPU acceleration

### Quick Installation

**Ubuntu/Debian**
\`\`\`bash
# Install dependencies
sudo apt-get install -y postgresql-server-dev-all build-essential

# Download and install NeuronDB
wget https://github.com/pgElephant/NeurondB/releases/latest/download/neurondb-pg16-ubuntu.tar.gz
tar -xzf neurondb-pg16-ubuntu.tar.gz
cd neurondb
sudo make install

# Enable extension
psql -c "CREATE EXTENSION neurondb;"
\`\`\`

**macOS**
\`\`\`bash
# Install with Homebrew
brew install pgelephant/tap/neurondb

# Enable extension
psql -c "CREATE EXTENSION neurondb;"
\`\`\`

**Build from Source**
\`\`\`bash
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/path/to/pg_config
sudo make install
\`\`\`

### GPU Support (Optional)

\`\`\`bash
# Install CUDA toolkit
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.0-1_all.deb
sudo dpkg -i cuda-keyring_1.0-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda

# Build NeuronDB with GPU support
make USE_CUDA=1
sudo make install
\`\`\`

## Real-World Use Cases

### Semantic Search

Build Google-like semantic search over your documents:

\`\`\`sql
-- Create table with embeddings
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(768)
);

-- Auto-generate embeddings
INSERT INTO documents (content, embedding) VALUES
    ('PostgreSQL is a powerful relational database',
     neurondb.embed_text('all-MiniLM-L6-v2', 'PostgreSQL is a powerful relational database'));

-- Create HNSW index
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantic search
SELECT content, 
       1 - (embedding <=> neurondb.embed_text('all-MiniLM-L6-v2', 'database system')) AS similarity
FROM documents
ORDER BY embedding <=> neurondb.embed_text('all-MiniLM-L6-v2', 'database system')
LIMIT 10;
\`\`\`

### RAG (Retrieval Augmented Generation)

Power ChatGPT-like applications with your own data:

\`\`\`sql
-- Store knowledge base with embeddings
CREATE TABLE knowledge_base (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(1536)  -- OpenAI ada-002 dimensions
);

-- Create function for RAG retrieval
CREATE FUNCTION get_context(query_text TEXT, top_k INT DEFAULT 5)
RETURNS TABLE(content TEXT, score FLOAT) AS $$
    SELECT content,
           1 - (embedding <=> neurondb.embed_text('text-embedding-ada-002', query_text)) AS score
    FROM knowledge_base
    ORDER BY embedding <=> neurondb.embed_text('text-embedding-ada-002', query_text)
    LIMIT top_k;
$$ LANGUAGE SQL;

-- Retrieve context for LLM
SELECT * FROM get_context('How does PostgreSQL handle transactions?');
\`\`\`

### Recommendation System

Build Netflix-style recommendations:

\`\`\`sql
-- User preference vectors
CREATE TABLE user_preferences (
    user_id INT PRIMARY KEY,
    preference_vector vector(128)
);

-- Item embeddings
CREATE TABLE items (
    item_id INT PRIMARY KEY,
    title TEXT,
    item_vector vector(128)
);

-- Get personalized recommendations
SELECT i.title,
       1 - (i.item_vector <=> u.preference_vector) AS match_score
FROM user_preferences u
CROSS JOIN items i
WHERE u.user_id = 12345
ORDER BY i.item_vector <=> u.preference_vector
LIMIT 20;
\`\`\`

### Image Search

Find similar images by visual features:

\`\`\`sql
-- Image embeddings from CLIP
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    filename TEXT,
    image_embedding vector(512)
);

-- Text-to-image search
SELECT filename,
       1 - (image_embedding <=> neurondb.embed_text('clip-vit-base', 'sunset over ocean')) AS similarity
FROM images
ORDER BY image_embedding <=> neurondb.embed_text('clip-vit-base', 'sunset over ocean')
LIMIT 50;
\`\`\`

## Performance and Benchmarks

### Query Performance

**100M Vector Dataset (768 dimensions)**
- HNSW index: 5-8ms average latency
- IVFFlat index: 15-25ms average latency
- GPU HNSW: 0.5-2ms average latency

**1 Billion Vector Dataset (DiskANN)**
- SSD-backed index: 30-50ms average latency
- 95th percentile: <100ms
- Memory usage: <16GB

### Throughput

**Single PostgreSQL Instance**
- CPU-only: 1,000-2,000 queries/second
- Single GPU: 10,000-15,000 queries/second
- Multi-GPU: 50,000+ queries/second

### Accuracy

**Recall@10 on Standard Benchmarks**
- HNSW (ef_search=100): 98-99%
- IVFFlat (nprobe=20): 95-97%
- DiskANN: 96-98%

## Configuration Options

### Vector Index Tuning

\`\`\`sql
-- HNSW parameters
CREATE INDEX ON vectors USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Query-time tuning
SET neurondb.hnsw_ef_search = 100;  -- Higher = better recall, slower

-- IVFFlat parameters
CREATE INDEX ON vectors USING ivfflat (embedding vector_l2_ops)
WITH (lists = 1000);

SET neurondb.ivfflat_probes = 20;  -- Higher = better recall
\`\`\`

### GPU Configuration

\`\`\`sql
-- Enable GPU acceleration
SET neurondb.use_gpu = on;

-- GPU device selection
SET neurondb.gpu_device_id = 0;  -- Use first GPU

-- Batch size for GPU queries
SET neurondb.gpu_batch_size = 1000;
\`\`\`

### Embedding Models

\`\`\`sql
-- List available models
SELECT * FROM neurondb.list_models();

-- Load custom model
SELECT neurondb.load_model('custom-bert', '/path/to/model.onnx');

-- Set default embedding model
SET neurondb.default_model = 'all-MiniLM-L6-v2';
\`\`\`

## Integration Examples

### Python with psycopg2

\`\`\`python
import psycopg2
import numpy as np

conn = psycopg2.connect("dbname=mydb")
cur = conn.cursor()

# Create table
cur.execute("""
    CREATE TABLE IF NOT EXISTS embeddings (
        id SERIAL PRIMARY KEY,
        text TEXT,
        vector vector(768)
    )
""")

# Insert with auto-embedding
cur.execute("""
    INSERT INTO embeddings (text, vector)
    VALUES (%s, neurondb.embed_text('all-MiniLM-L6-v2', %s))
""", ("Hello world", "Hello world"))

# Semantic search
query = "greeting message"
cur.execute("""
    SELECT text, 
           1 - (vector <=> neurondb.embed_text('all-MiniLM-L6-v2', %s)) AS similarity
    FROM embeddings
    ORDER BY vector <=> neurondb.embed_text('all-MiniLM-L6-v2', %s)
    LIMIT 5
""", (query, query))

results = cur.fetchall()
for text, similarity in results:
    print(f"{text}: {similarity:.4f}")
\`\`\`

### Node.js with pg

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://localhost/mydb'
});

async function semanticSearch(query) {
  const result = await pool.query(\`
    SELECT content,
           1 - (embedding <=> neurondb.embed_text('all-MiniLM-L6-v2', $1)) AS score
    FROM documents
    ORDER BY embedding <=> neurondb.embed_text('all-MiniLM-L6-v2', $1)
    LIMIT 10
  \`, [query]);
  
  return result.rows;
}

semanticSearch('database performance').then(results => {
  results.forEach(row => {
    console.log(\`\${row.content}: \${row.score}\`);
  });
});
\`\`\`

### LangChain Integration

\`\`\`python
from langchain.vectorstores import NeuronDB
from langchain.embeddings import HuggingFaceEmbeddings

# Initialize embeddings
embeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')

# Create vector store
vectorstore = NeuronDB(
    connection_string="postgresql://localhost/mydb",
    table_name="documents",
    embeddings=embeddings
)

# Add documents
texts = ["PostgreSQL is powerful", "Vector search is fast"]
vectorstore.add_texts(texts)

# Similarity search
results = vectorstore.similarity_search("database system", k=5)
for doc in results:
    print(doc.page_content)
\`\`\`

## Monitoring and Observability

### Performance Views

\`\`\`sql
-- Index statistics
SELECT * FROM neurondb.index_stats;

-- Query performance
SELECT * FROM neurondb.query_stats
ORDER BY avg_latency DESC;

-- GPU utilization
SELECT * FROM neurondb.gpu_stats;

-- Embedding cache hits
SELECT * FROM neurondb.cache_stats;
\`\`\`

### Maintenance

\`\`\`sql
-- Rebuild HNSW index
REINDEX INDEX CONCURRENTLY vectors_hnsw_idx;

-- Vacuum embedding cache
SELECT neurondb.vacuum_cache();

-- Update index statistics
ANALYZE embeddings;
\`\`\`

## Migration from pgvector

NeuronDB is designed as a drop-in replacement for pgvector:

\`\`\`sql
-- Works with existing pgvector tables
CREATE TABLE vectors (
    id SERIAL PRIMARY KEY,
    embedding vector(1536)
);

-- Use NeuronDB indexes for better performance
CREATE INDEX ON vectors USING hnsw (embedding vector_cosine_ops);

-- All pgvector operators work
SELECT * FROM vectors ORDER BY embedding <=> '[1,2,3...]' LIMIT 10;
\`\`\`

**Migration Benefits**
- 10-100x faster queries with HNSW
- GPU acceleration option
- Built-in embedding generation
- Hybrid search capabilities
- No query changes required

## Roadmap

**Upcoming Features**
- HNSW and IVFFlat indexing
- GPU acceleration (CUDA)
- 50+ embedding models
- Hybrid search
- Quantization improvements
- Distributed indexing
- Multi-modal search (image + text)
- Sparse vector support
- Graph-based retrieval

## Community and Support

**Get Involved**
- [Report Issues](https://github.com/pgElephant/NeurondB/issues)
- [Discussions](https://github.com/pgElephant/NeurondB/discussions)
- [Documentation](https://www.pgelephant.com/docs/neurondb)
- [Contributing Guide](https://github.com/pgElephant/NeurondB/blob/main/CONTRIBUTING.md)

**Commercial Support**
For production deployments, enterprise support, and custom features, contact [support@pgelephant.com](mailto:support@pgelephant.com)

## Conclusion

NeuronDB adds AI capabilities to PostgreSQL. You do not need separate vector databases, ML services, or complex integrations. NeuronDB provides performance, GPU acceleration, and AI capabilities. You build semantic search, RAG applications, and recommendation systems in PostgreSQL.

**Get Started**
- [Download NeuronDB](https://github.com/pgElephant/NeurondB/releases)
- [Read the Docs](https://www.pgelephant.com/docs/neurondb)
- [Quick Start Guide](https://www.pgelephant.com/docs/neurondb/getting-started)

---

**About pgElephant**

pgElephant builds PostgreSQL extensions for data workloads. We extend PostgreSQL's capabilities while maintaining reliability, simplicity, and open-source philosophy.

Other projects: [pg_stat_insights](https://www.pgelephant.com/docs/pg-stat-insights) | [pgBalancer](https://www.pgelephant.com/docs/pgbalancer) | [pgRaft](https://www.pgelephant.com/docs/pgraft)
`;

export default function BlogPost() {
  return (
    <div className="pt-16">
      {/* Blog Content */}
      <div style={{ backgroundColor: '#1f2937' }}>
        <BlogMarkdown>{markdown}</BlogMarkdown>
        
        {/* Share Section */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
            <ShareOnLinkedIn
              url="https://www.pgelephant.com/blog/neurondb"
              title="🧠 NeuronDB: PostgreSQL AI Vector Database Extension"
              summary="Transform PostgreSQL into an AI platform with vector search, ML inference, and GPU acceleration. HNSW indexing, 10+ distance metrics, RAG capabilities, and full pgvector compatibility. Build semantic search, recommendation systems, and AI applications directly in PostgreSQL."
              hashtags={[
                'PostgreSQL',
                'AI',
                'VectorDatabase',
                'MachineLearning',
                'SemanticSearch',
                'RAG',
                'GPU',
                'NeuronDB',
                'pgElephant',
                'OpenSource',
                'DeepLearning',
                'NLP'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
