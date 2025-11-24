import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Ensemble Reranking in NeurondB | MMR, RRF, Weighted & Borda Count',
  description: 'Complete guide to ensemble reranking in NeurondB: MMR (Maximal Marginal Relevance), RRF (Reciprocal Rank Fusion), weighted ensemble, and Borda count methods. Learn how to combine multiple reranking models for optimal search relevance and diversity.',
  keywords: [
    'ensemble reranking',
    'MMR reranking',
    'Reciprocal Rank Fusion',
    'RRF reranking',
    'Borda count',
    'weighted ensemble',
    'maximal marginal relevance',
    'diversity reranking',
    'multi-model reranking',
    'rerank_ensemble_weighted',
    'rerank_ensemble_borda',
    'mmr_rerank function'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/reranking/ensemble',
  },
  openGraph: {
    title: 'Ensemble Reranking in NeurondB | MMR, RRF, Weighted Methods',
    description: 'Combine multiple reranking models in NeurondB using MMR, RRF, weighted ensemble, and Borda count methods.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/reranking/ensemble',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'ensemble-reranking', title: 'Ensemble Reranking' },
  { id: 'mmr-reranking', title: 'MMR (Maximal Marginal Relevance)' },
  { id: 'rrf-reranking', title: 'RRF (Reciprocal Rank Fusion)' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/reranking/colbert',
  label: 'ColBERT',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/rag/overview',
  label: 'RAG Overview',
}

export default function EnsemblePage() {
  return (
    <PostgresDocsLayout
      title="Ensemble Reranking"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Combine multiple reranking strategies for best results.</p>
      </section>

      <section id="ensemble-reranking">
        <h2>Ensemble Reranking</h2>
        <p>Combine multiple reranking models for improved accuracy. NeuronDB supports weighted ensemble and Borda count methods.</p>
        
        <h3>Weighted Ensemble</h3>
        <p>Combine multiple reranking models with custom weights. Each model's scores are weighted and summed to produce final scores.</p>
        <SqlCodeBlock
          title="Weighted ensemble reranking"
          code={`-- Prepare scored results from multiple models
CREATE TABLE model1_scores (
    id INT,
    score REAL
);

CREATE TABLE model2_scores (
    id INT,
    score REAL
);

CREATE TABLE model3_scores (
    id INT,
    score REAL
);

-- Insert scores from different models
INSERT INTO model1_scores (id, score) VALUES
    (1, 0.95), (2, 0.90), (3, 0.85), (4, 0.60), (7, 0.70);

INSERT INTO model2_scores (id, score) VALUES
    (1, 0.80), (2, 0.70), (4, 0.95), (6, 0.75), (7, 0.85);

INSERT INTO model3_scores (id, score) VALUES
    (1, 0.88), (3, 0.82), (4, 0.90), (7, 0.92), (8, 0.65);

-- Weighted ensemble with equal weights
SELECT 
    d.id,
    d.content,
    e.final_score
FROM neurondb.rerank_ensemble_weighted(
    ARRAY['model1_scores', 'model2_scores', 'model3_scores']::text[],
    ARRAY[1.0, 1.0, 1.0]::real[],  -- Equal weights
    'id',                           -- ID column name
    'score'                         -- Score column name
) e
JOIN documents d ON d.id = e.id
ORDER BY e.final_score DESC;

-- Weighted ensemble with custom weights (prioritize model 1)
SELECT 
    d.id,
    d.content,
    e.final_score
FROM neurondb.rerank_ensemble_weighted(
    ARRAY['model1_scores', 'model2_scores', 'model3_scores']::text[],
    ARRAY[2.0, 1.0, 1.0]::real[],  -- Model 1 has 2x weight
    'id',
    'score'
) e
JOIN documents d ON d.id = e.id
ORDER BY e.final_score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.rerank_ensemble_weighted(
    score_tables TEXT[],    -- Array of table names with scores
    weights REAL[],         -- Array of weights (one per table)
    id_column TEXT,         -- ID column name in score tables
    score_column TEXT       -- Score column name in score tables
) RETURNS TABLE (
    id INTEGER,            -- Document ID
    final_score REAL        -- Weighted combined score
)</code></pre>

        <h3>Borda Count Ensemble</h3>
        <p>Use Borda count voting to combine rankings. Each model votes for documents based on rank, and votes are summed.</p>
        <SqlCodeBlock
          title="Borda count ensemble"
          code={`-- Borda count ensemble reranking
SELECT 
    d.id,
    d.content,
    e.borda_score
FROM neurondb.rerank_ensemble_borda(
    ARRAY['model1_scores', 'model2_scores', 'model3_scores']::text[],
    'id',                   -- ID column
    'score'                 -- Score column (used for ranking)
) e
JOIN documents d ON d.id = e.id
ORDER BY e.borda_score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.rerank_ensemble_borda(
    score_tables TEXT[],
    id_column TEXT,
    score_column TEXT
) RETURNS TABLE (
    id INTEGER,
    borda_score REAL       -- Borda count score (higher = better)
)</code></pre>
        <p><strong>How Borda Count Works:</strong></p>
        <ul>
          <li>Each model ranks documents by score (highest score = rank 1)</li>
          <li>Documents receive points based on rank: rank 1 gets N points, rank 2 gets N-1 points, etc.</li>
          <li>Points from all models are summed to get final Borda score</li>
          <li>Higher Borda score = better overall ranking across all models</li>
        </ul>
      </section>

      <section id="mmr-reranking">
        <h2>MMR (Maximal Marginal Relevance) Reranking</h2>
        <p>Balance relevance and diversity using MMR. Higher lambda values prioritize relevance, lower values prioritize diversity.</p>
        <SqlCodeBlock
          title="MMR reranking"
          code={`-- MMR reranking with scores
SELECT 
    id,
    content,
    score
FROM neurondb.mmr_rerank_with_scores(
    'documents',            -- table name
    'embedding',            -- vector column
    '[0.1, 0.2, 0.3]'::vector,  -- query vector
    5,                      -- top_k
    0.7                     -- lambda: 0.7 = more relevance, 0.3 = more diversity
)
ORDER BY score DESC;

-- MMR without scores (just IDs)
SELECT id, content
FROM neurondb.mmr_rerank(
    'documents',
    'embedding',
    '[0.1, 0.2, 0.3]'::vector,
    5,
    0.7
);`}
        />
        <p><strong>Function Signatures:</strong></p>
        <pre><code>neurondb.mmr_rerank(
    table_name TEXT,
    vector_column TEXT,
    query_vector VECTOR,
    top_k INTEGER,
    lambda REAL            -- 0.0-1.0: 1.0 = pure relevance, 0.0 = pure diversity
) RETURNS TABLE (id INTEGER)

neurondb.mmr_rerank_with_scores(
    table_name TEXT,
    vector_column TEXT,
    query_vector VECTOR,
    top_k INTEGER,
    lambda REAL
) RETURNS TABLE (id INTEGER, score REAL)</code></pre>
      </section>

      <section id="rrf-reranking">
        <h2>RRF (Reciprocal Rank Fusion)</h2>
        <p>Combine multiple ranking lists using Reciprocal Rank Fusion. RRF is robust to outliers and works well with heterogeneous ranking sources.</p>
        <SqlCodeBlock
          title="Reciprocal Rank Fusion"
          code={`-- Create ranking lists from different sources
CREATE TABLE semantic_ranking (
    id INT,
    rank INT
);

CREATE TABLE keyword_ranking (
    id INT,
    rank INT
);

-- Insert rankings
INSERT INTO semantic_ranking (id, rank) VALUES
    (1, 1), (2, 2), (3, 3), (7, 4), (4, 5);

INSERT INTO keyword_ranking (id, rank) VALUES
    (4, 1), (1, 2), (7, 3), (6, 4), (2, 5);

-- RRF fusion
SELECT 
    d.id,
    d.content,
    rrf.score
FROM neurondb.reciprocal_rank_fusion(
    ARRAY['semantic_ranking', 'keyword_ranking']::text[],
    'id',                   -- ID column name
    'rank',                 -- Rank column name
    60                      -- k parameter (typically 60)
) rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf.score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.reciprocal_rank_fusion(
    ranking_tables TEXT[],  -- Array of table names with rankings
    id_column TEXT,         -- ID column name
    rank_column TEXT,       -- Rank column name
    k INTEGER               -- RRF constant (typically 60)
) RETURNS TABLE (
    id INTEGER,
    score REAL              -- RRF score (higher = better)
)</code></pre>
        <p><strong>RRF Formula:</strong> <code>score = Σ(1 / (k + rank))</code> across all ranking lists. The k parameter (typically 60) prevents division by very small numbers.</p>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on ensemble strategies, weight optimization, and combining rerankers, visit:{' '}
          <a href="https://pgelephant.com/neurondb/reranking/ensemble/" target="_blank" rel="noopener noreferrer">
            Ensemble Reranking Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/reranking/cross-encoder">Cross-Encoder</a> - Neural reranking</li>
          <li><a href="/docs/neurondb/reranking/llm-reranking">LLM Reranking</a> - LLM-powered reranking</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

