import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Vector Database Performance Tuning | Optimize NeuronDB PostgreSQL',
  description: 'Complete performance optimization guide for NeuronDB PostgreSQL vector database. HNSW tuning, recall optimization, latency reduction, memory management, and production scaling. Handle 100M+ vectors with sub-10ms queries.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/performance',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'benchmarks', title: 'Performance Benchmarks' },
  { id: 'optimization-techniques', title: 'Optimization Techniques' },
  { id: 'best-practices', title: 'Best Practices' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers',
}

const nextLink: NavLink | undefined = undefined

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Performance"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="benchmarks">
        <h2>Performance Benchmarks</h2>
        <p><strong>Test Environment:</strong> AWS r6i.2xlarge (8 vCPU, 64GB RAM), 10M vectors, 768 dimensions</p>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Throughput</th>
              <th>Latency (p95)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vector Insert</td>
              <td>50K/sec</td>
              <td>2ms</td>
              <td>Bulk COPY</td>
            </tr>
            <tr>
              <td>HNSW Search (k=10)</td>
              <td>10K QPS</td>
              <td>5ms</td>
              <td>ef_search=40</td>
            </tr>
            <tr>
              <td>Embedding Generation</td>
              <td>1K/sec</td>
              <td>10ms</td>
              <td>Batch size 32</td>
            </tr>
            <tr>
              <td>Hybrid Search</td>
              <td>5K QPS</td>
              <td>8ms</td>
              <td>Vector+FTS</td>
            </tr>
            <tr>
              <td>Reranking</td>
              <td>2K/sec</td>
              <td>15ms</td>
              <td>Cross-encoder</td>
            </tr>
            <tr>
              <td>GPU K-Means</td>
              <td>55K vectors/sec</td>
              <td>18ms</td>
              <td>10 clusters</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="optimization-techniques">
        <h2>Optimization Techniques</h2>

        <h3>1. SIMD Acceleration</h3>
        <p>Automatic SIMD (Single Instruction Multiple Data) optimization for distance calculations using AVX2, AVX-512 (x86) or NEON (ARM).</p>
        <ul>
          <li><strong>AVX2 Speedup:</strong> 4-8x</li>
          <li><strong>AVX-512 Speedup:</strong> 8-16x</li>
          <li><strong>Auto Detection:</strong> Automatically enabled when available</li>
        </ul>

        <h3>2. Intelligent Caching</h3>
        <ul>
          <li><strong>Embedding Cache:</strong> 95%+ hit rate, 50x faster than generation</li>
          <li><strong>Model Cache:</strong> Models loaded in shared memory, 99.8% hit rate</li>
          <li><strong>ANN Buffer:</strong> Hot centroids and entry points cached</li>
          <li><strong>Index Page Cache:</strong> 92%+ hit rate for frequently accessed vectors</li>
        </ul>

        <h3>3. Query Planning</h3>
        <p>Intelligent cost-based query planning chooses optimal execution paths:</p>
        <ul>
          <li>Small result sets → Sequential scan</li>
          <li>Medium result sets → IVF index</li>
          <li>Large result sets → HNSW index</li>
          <li>GPU available + large batch → GPU acceleration</li>
          <li>Hybrid query → Parallel vector + FTS execution</li>
        </ul>
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>

        <h3>1. Index Selection</h3>
        <table>
          <thead>
            <tr>
              <th>Dataset Size</th>
              <th>Recommended Index</th>
              <th>Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; 100K vectors</td>
              <td>HNSW</td>
              <td>m=16, ef=200</td>
            </tr>
            <tr>
              <td>100K - 10M vectors</td>
              <td>HNSW or IVF</td>
              <td>m=32, ef=400 or nlist=sqrt(n)</td>
            </tr>
            <tr>
              <td>&gt; 10M vectors</td>
              <td>IVF + PQ</td>
              <td>nlist=4000, PQ compression</td>
            </tr>
          </tbody>
        </table>

        <h3>2. Use Batch Operations</h3>
        <SqlCodeBlock
          title="Batch embedding generation"
          code={`-- Good: Batch embedding generation (5x faster)
UPDATE docs SET embedding = batch.emb
FROM (
  SELECT id, unnest(embed_text_batch(array_agg(content))) AS emb
  FROM docs GROUP BY id % 100
) batch WHERE docs.id = batch.id;

-- Bad: Individual calls
UPDATE docs SET embedding = embed_text(content);  -- Slow!`}
        />

        <h3>3. Monitor Cache Hit Rates</h3>
        <SqlCodeBlock
          title="Cache statistics"
          code={`SELECT * FROM neurondb_cache_stats();

-- Target hit rates:
--   Embeddings: > 50%
--   Models: > 95%
--   Index pages: > 90%`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Indexing Guide</a> - Learn about HNSW and IVF indexes</li>
          <li><a href="/docs/neurondb/gpu">GPU Acceleration</a> - Enable GPU for 100x speedup</li>
          <li><a href="/docs/neurondb/configuration">Configuration</a> - Tune GUC parameters</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
