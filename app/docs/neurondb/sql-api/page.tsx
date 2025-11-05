import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL API Reference | NeuronDB',
  description: 'Complete SQL API reference for NeuronDB functions, operators, and configuration parameters.'
};

export default function SqlApiPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">SQL API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for all NeuronDB SQL functions, operators, types, and configuration parameters.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Vector Types</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector(n)</code></h3>
            <p className="mb-2">A fixed-dimension vector of floating-point numbers.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Create table with vector column
CREATE TABLE embeddings (
  id SERIAL PRIMARY KEY,
  embedding vector(1536)  -- 1536-dimensional vector
);

-- Insert vectors
INSERT INTO embeddings (embedding) VALUES ('[1, 2, 3]');
INSERT INTO embeddings (embedding) VALUES (ARRAY[1.0, 2.0, 3.0]::vector);

-- Cast from array
SELECT ARRAY[1.0, 2.0, 3.0]::vector(3);`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Distance Operators</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Operator</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Return Type</th>
                <th className="text-left p-3">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>&lt;-&gt;</code></td>
                <td className="p-3">L2 (Euclidean) distance</td>
                <td className="p-3"><code>float</code></td>
                <td className="p-3"><code>embedding &lt;-&gt; '[1,2,3]'</code></td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>&lt;=&gt;</code></td>
                <td className="p-3">Cosine distance</td>
                <td className="p-3"><code>float</code></td>
                <td className="p-3"><code>embedding &lt;=&gt; '[1,2,3]'</code></td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>&lt;#&gt;</code></td>
                <td className="p-3">Inner product (negative dot product)</td>
                <td className="p-3"><code>float</code></td>
                <td className="p-3"><code>embedding &lt;#&gt; '[1,2,3]'</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Embedding Functions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_embed(text, model)</code></h3>
            <p className="mb-2">Generate embeddings using configured LLM providers.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> text (TEXT), model (TEXT)
              <br />
              <strong>Returns:</strong> vector
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Configure OpenAI provider
SET neurondb.llm_provider = 'openai';
SET neurondb.llm_api_key = 'sk-...';

-- Generate embedding
SELECT neurondb_embed('Hello world', 'text-embedding-ada-002');

-- Batch embeddings
INSERT INTO documents (content, embedding)
SELECT content, neurondb_embed(content, 'text-embedding-ada-002')
FROM source_documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_embed_batch(texts, model)</code></h3>
            <p className="mb-2">Generate embeddings for multiple texts in a single API call (more efficient).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> texts (TEXT[]), model (TEXT)
              <br />
              <strong>Returns:</strong> vector[]
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Batch embed multiple texts
SELECT neurondb_embed_batch(
  ARRAY['text1', 'text2', 'text3'],
  'text-embedding-ada-002'
);

-- Update embeddings in batch
UPDATE documents
SET embedding = batch.emb
FROM (
  SELECT id, unnest(neurondb_embed_batch(array_agg(content), 'text-embedding-ada-002')) AS emb
  FROM documents
  WHERE embedding IS NULL
  GROUP BY id
) batch
WHERE documents.id = batch.id;`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">GPU Distance Functions</h2>
        <p className="mb-4 text-muted-foreground">
          GPU-accelerated distance computation functions. Require <code>neurondb.gpu_enabled = true</code>.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_l2_distance_gpu(a, b)</code></h3>
            <p className="mb-2">Compute L2 distance on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> a (vector), b (vector)
              <br />
              <strong>Returns:</strong> float8
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SET neurondb.gpu_enabled = true;

SELECT vector_l2_distance_gpu(embedding, '[1,2,3]'::vector)
FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_cosine_distance_gpu(a, b)</code></h3>
            <p className="mb-2">Compute cosine distance on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> a (vector), b (vector)
              <br />
              <strong>Returns:</strong> float8
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT vector_cosine_distance_gpu(embedding, '[1,2,3]'::vector)
FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_inner_product_gpu(a, b)</code></h3>
            <p className="mb-2">Compute inner product on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> a (vector), b (vector)
              <br />
              <strong>Returns:</strong> float8
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT vector_inner_product_gpu(embedding, '[1,2,3]'::vector)
FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_to_int8_gpu(v)</code></h3>
            <p className="mb-2">Quantize vector to int8 on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> v (vector)
              <br />
              <strong>Returns:</strong> vector
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT vector_to_int8_gpu(embedding) FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_to_fp16_gpu(v)</code></h3>
            <p className="mb-2">Quantize vector to fp16 on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> v (vector)
              <br />
              <strong>Returns:</strong> vector
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT vector_to_fp16_gpu(embedding) FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>vector_to_binary_gpu(v)</code></h3>
            <p className="mb-2">Quantize vector to binary on GPU.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> v (vector)
              <br />
              <strong>Returns:</strong> vector
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT vector_to_binary_gpu(embedding) FROM documents;`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">ML Analytics Functions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>cluster_kmeans(data, k, max_iter, tol)</code></h3>
            <p className="mb-2">K-Means clustering aggregate function.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> data (vector), k (int), max_iter (int, default 100), tol (float8, default 0.0001)
              <br />
              <strong>Returns:</strong> TABLE(cluster_id int, centroid vector, size bigint)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT * FROM cluster_kmeans(
  (SELECT embedding FROM documents),
  5,  -- 5 clusters
  100,  -- max iterations
  0.0001  -- tolerance
);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>cluster_minibatch_kmeans(data, k, batch_size, max_iter)</code></h3>
            <p className="mb-2">Mini-batch K-Means for large datasets.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> data (vector), k (int), batch_size (int, default 100), max_iter (int, default 100)
              <br />
              <strong>Returns:</strong> TABLE(cluster_id int, centroid vector, size bigint)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT * FROM cluster_minibatch_kmeans(
  (SELECT embedding FROM documents),
  10,  -- 10 clusters
  1000,  -- batch size
  50  -- max iterations
);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>cluster_gmm(data, k, max_iter, tol)</code></h3>
            <p className="mb-2">Gaussian Mixture Model clustering with soft assignments.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> data (vector), k (int), max_iter (int, default 100), tol (float8, default 0.0001)
              <br />
              <strong>Returns:</strong> TABLE(cluster_id int, mean vector, covariance vector, weight float8)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- GMM clustering
SELECT * FROM cluster_gmm(
  (SELECT embedding FROM documents),
  3,  -- 3 components
  100,
  0.001
);

-- Convert soft assignments to hard clusters with helper function
SELECT gmm_to_clusters(
  embedding,
  ARRAY(SELECT mean FROM cluster_gmm(...)),
  ARRAY(SELECT covariance FROM cluster_gmm(...)),
  ARRAY(SELECT weight FROM cluster_gmm(...))
) AS cluster_id
FROM documents;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>detect_outliers_zscore(data, threshold)</code></h3>
            <p className="mb-2">Detect outliers using Z-score method.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> data (vector), threshold (float8, default 3.0)
              <br />
              <strong>Returns:</strong> TABLE(vector_data vector, is_outlier boolean, z_score float8)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Detect outliers with Z-score > 3
SELECT 
  id,
  (stats).is_outlier,
  (stats).z_score
FROM (
  SELECT 
    id,
    detect_outliers_zscore(embedding, 3.0) AS stats
  FROM documents
) sub
WHERE (stats).is_outlier;`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">ML Project Management</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_create_ml_project(name, description)</code></h3>
            <p className="mb-2">Create a new ML project for model management.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> name (TEXT), description (TEXT)
              <br />
              <strong>Returns:</strong> int (project_id)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT neurondb_create_ml_project(
  'customer_segments',
  'K-means clustering of customer embeddings'
);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_train_kmeans_project(project_id, data, k, max_iter)</code></h3>
            <p className="mb-2">Train a K-Means model within a project.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> project_id (int), data (vector[]), k (int), max_iter (int)
              <br />
              <strong>Returns:</strong> int (model_id)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT neurondb_train_kmeans_project(
  1,  -- project_id
  ARRAY(SELECT embedding FROM train_data),
  5,  -- k clusters
  100  -- max iterations
);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_list_project_models(project_id)</code></h3>
            <p className="mb-2">List all models in a project.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> project_id (int)
              <br />
              <strong>Returns:</strong> TABLE(model_id int, model_type text, created_at timestamp, metrics jsonb)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT * FROM neurondb_list_project_models(1);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_deploy_model(model_id, deployment_name)</code></h3>
            <p className="mb-2">Deploy a model for inference.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> model_id (int), deployment_name (TEXT)
              <br />
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT neurondb_deploy_model(42, 'production_clusters');`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_get_deployed_model(deployment_name)</code></h3>
            <p className="mb-2">Retrieve deployed model metadata.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> deployment_name (TEXT)
              <br />
              <strong>Returns:</strong> jsonb
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT neurondb_get_deployed_model('production_clusters');`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_get_project_info(project_id)</code></h3>
            <p className="mb-2">Get project information and statistics.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> project_id (int)
              <br />
              <strong>Returns:</strong> jsonb
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT neurondb_get_project_info(1);`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hybrid Search Functions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_hybrid_search(query, vector_weight, fts_weight)</code></h3>
            <p className="mb-2">Combine vector similarity and full-text search scores.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> query (TEXT), vector_weight (float8), fts_weight (float8)
              <br />
              <strong>Returns:</strong> TABLE(id int, score float8)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Hybrid search: 70% vector, 30% full-text
WITH vector_results AS (
  SELECT id, 1.0 / (1.0 + (embedding <=> query_emb)) AS vec_score
  FROM documents, (SELECT neurondb_embed('search query', 'ada-002') AS query_emb) q
),
fts_results AS (
  SELECT id, ts_rank(to_tsvector(content), plainto_tsquery('search query')) AS fts_score
  FROM documents
)
SELECT 
  COALESCE(v.id, f.id) AS id,
  (COALESCE(v.vec_score, 0) * 0.7 + COALESCE(f.fts_score, 0) * 0.3) AS hybrid_score
FROM vector_results v
FULL OUTER JOIN fts_results f ON v.id = f.id
ORDER BY hybrid_score DESC
LIMIT 10;`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_rerank(results, query, model)</code></h3>
            <p className="mb-2">Rerank search results using a cross-encoder model.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> results (TABLE), query (TEXT), model (TEXT)
              <br />
              <strong>Returns:</strong> TABLE(id int, rerank_score float8)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Configure reranking model
SET neurondb.rerank_model = 'cross-encoder/ms-marco-MiniLM-L-12-v2';

-- Rerank top results
SELECT * FROM neurondb_rerank(
  (SELECT id, content FROM documents ORDER BY embedding <=> query_emb LIMIT 100),
  'user query text',
  'cross-encoder/ms-marco-MiniLM-L-12-v2'
)
ORDER BY rerank_score DESC
LIMIT 10;`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Background Worker Functions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_schedule_embedding_update(table_name, content_col, embedding_col, model)</code></h3>
            <p className="mb-2">Schedule automatic embedding updates via background worker.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> table_name (TEXT), content_col (TEXT), embedding_col (TEXT), model (TEXT)
              <br />
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Enable background workers
SET neurondb.enable_background_workers = true;
SET neurondb.worker_batch_size = 100;

-- Schedule embedding updates
SELECT neurondb_schedule_embedding_update(
  'documents',
  'content',
  'embedding',
  'text-embedding-ada-002'
);`}</code></pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>neurondb_worker_status()</code></h3>
            <p className="mb-2">Check background worker status and metrics.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(worker_id int, status text, tasks_processed bigint, last_run timestamp)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
SELECT * FROM neurondb_worker_status();`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Configuration Parameters (GUCs)</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">LLM Provider Settings</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Parameter</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.llm_provider</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">'openai'</td>
                    <td className="p-3">LLM provider (openai, cohere, huggingface)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.llm_api_key</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">NULL</td>
                    <td className="p-3">API key for LLM provider</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.llm_endpoint</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">NULL</td>
                    <td className="p-3">Custom API endpoint URL</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.llm_timeout_ms</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">30000</td>
                    <td className="p-3">API call timeout (milliseconds)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.llm_max_retries</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">3</td>
                    <td className="p-3">Max retry attempts for failed API calls</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">GPU Settings</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Parameter</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_enabled</code></td>
                    <td className="p-3">bool</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enable GPU acceleration</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_device</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">0</td>
                    <td className="p-3">GPU device ID to use</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_batch_size</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">1000</td>
                    <td className="p-3">Batch size for GPU operations</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_streams</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">4</td>
                    <td className="p-3">Number of CUDA streams</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_memory_pool_mb</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">512</td>
                    <td className="p-3">GPU memory pool size (MB)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_fail_open</code></td>
                    <td className="p-3">bool</td>
                    <td className="p-3">true</td>
                    <td className="p-3">Fallback to CPU on GPU error</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_kernels</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">'auto'</td>
                    <td className="p-3">GPU kernel selection (auto, cuda, rocm)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_backend</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">'cuda'</td>
                    <td className="p-3">GPU backend (cuda, rocm)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.gpu_timeout_ms</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">5000</td>
                    <td className="p-3">GPU operation timeout (ms)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Background Worker Settings</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Parameter</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.enable_background_workers</code></td>
                    <td className="p-3">bool</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Enable background embedding workers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.worker_batch_size</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">100</td>
                    <td className="p-3">Batch size for worker tasks</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.worker_interval_sec</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">60</td>
                    <td className="p-3">Worker polling interval (seconds)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.worker_max_concurrent</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">4</td>
                    <td className="p-3">Max concurrent worker tasks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Monitoring and Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Parameter</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.enable_metrics</code></td>
                    <td className="p-3">bool</td>
                    <td className="p-3">true</td>
                    <td className="p-3">Enable performance metrics collection</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.metrics_retention_days</code></td>
                    <td className="p-3">int</td>
                    <td className="p-3">7</td>
                    <td className="p-3">Metric retention period</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>neurondb.log_level</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">'info'</td>
                    <td className="p-3">Logging level (debug, info, warning, error)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Index Types and Operator Classes</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Index Types</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><code>hnsw</code> - Hierarchical Navigable Small World graph index</li>
            <li><code>ivfflat</code> - Inverted File with Flat quantization</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Operator Classes</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><code>vector_l2_ops</code> - L2 (Euclidean) distance operations</li>
            <li><code>vector_cosine_ops</code> - Cosine distance operations</li>
            <li><code>vector_ip_ops</code> - Inner product operations</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/neurondb/indexing" className="text-blue-600 hover:underline">
              Indexing and Distance Metrics
            </a> - Learn about index tuning and distance functions
          </li>
          <li>
            <a href="/docs/neurondb/gpu" className="text-blue-600 hover:underline">
              GPU Acceleration
            </a> - Configure and optimize GPU operations
          </li>
          <li>
            <a href="/docs/neurondb/analytics" className="text-blue-600 hover:underline">
              ML Analytics
            </a> - Use clustering and outlier detection
          </li>
          <li>
            <a href="/docs/neurondb/configuration" className="text-blue-600 hover:underline">
              Configuration Guide
            </a> - Detailed GUC reference
          </li>
        </ul>
      </section>
    </div>
  );
}
