import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'GPU Accelerator | CUDA, ROCm & Metal Support | NeurondB',
  description: 'CUDA and ROCm support for parallel matrix operations with automatic fallback to CPU for maximum compatibility. Accelerate vector search, ML inference, and embedding generation with 10-100x speedup.',
  keywords: [
    'GPU accelerator',
    'CUDA support',
    'ROCm support',
    'Metal support',
    'GPU acceleration',
    'parallel matrix operations',
    'automatic CPU fallback',
    'GPU vector search',
    'GPU ML inference',
    'NVIDIA CUDA',
    'AMD ROCm',
    'Apple Metal'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/gpu',
  },
  openGraph: {
    title: 'GPU Accelerator | CUDA, ROCm & Metal Support',
    description: 'Accelerate vector operations and ML inference with GPU support. Automatic CPU fallback for maximum compatibility.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/gpu',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'gpu-operations', title: 'GPU-Accelerated Operations' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'sql-examples', title: 'SQL Examples' },
  { id: 'automatic-fallback', title: 'Automatic CPU Fallback' },
  { id: 'building', title: 'Building with GPU Support' },
  { id: 'performance-tuning', title: 'Performance Tuning' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/embedding-engine',
  label: 'Embedding Engine',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="GPU Accelerator"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          The <strong>GPU Accelerator</strong> provides optional GPU acceleration for compute-intensive operations 
          using <strong>NVIDIA CUDA</strong>, <strong>AMD ROCm</strong>, or <strong>Apple Metal</strong>. GPU support 
          is completely optional and automatically falls back to CPU when unavailable, ensuring maximum compatibility 
          across different hardware configurations.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Multi-Platform Support:</strong> CUDA (NVIDIA), ROCm (AMD), and Metal (Apple)</li>
          <li><strong>Automatic Fallback:</strong> Seamlessly falls back to CPU when GPU is unavailable</li>
          <li><strong>Parallel Operations:</strong> Batch processing with multiple GPU streams</li>
          <li><strong>Memory Management:</strong> Efficient GPU memory pooling and allocation</li>
          <li><strong>Zero Configuration:</strong> Works out of the box with automatic detection</li>
        </ul>

        <h3>Performance Improvements</h3>
        <ul>
          <li><strong>100x</strong> Batch Distance Speedup</li>
          <li><strong>23x</strong> K-Means Clustering</li>
          <li><strong>10-15x</strong> ONNX Model Inference</li>
          <li><strong>50x</strong> Quantization Operations</li>
          <li><strong>2.3ms</strong> Average GPU Latency</li>
        </ul>
      </section>

      <section id="gpu-operations">
        <h2>GPU-Accelerated Operations</h2>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>CUDA</th>
              <th>ROCm</th>
              <th>Metal</th>
              <th>Speedup</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>L2 Distance</td>
              <td>✓ cuBLAS</td>
              <td>✓ rocBLAS</td>
              <td>✓ MPS</td>
              <td>100x (batch)</td>
            </tr>
            <tr>
              <td>Cosine Distance</td>
              <td>✓ cuBLAS</td>
              <td>✓ rocBLAS</td>
              <td>✓ MPS</td>
              <td>100x (batch)</td>
            </tr>
            <tr>
              <td>Inner Product</td>
              <td>✓ GEMM</td>
              <td>✓ GEMM</td>
              <td>✓ GEMM</td>
              <td>100x (batch)</td>
            </tr>
            <tr>
              <td>K-Means Clustering</td>
              <td>✓ Custom</td>
              <td>✓ Custom</td>
              <td>✓ Custom</td>
              <td>23x</td>
            </tr>
            <tr>
              <td>Quantization (INT8/FP16)</td>
              <td>✓ Kernels</td>
              <td>✓ Kernels</td>
              <td>✓ Kernels</td>
              <td>50x</td>
            </tr>
            <tr>
              <td>ONNX Inference</td>
              <td>✓ CUDA EP</td>
              <td>Partial</td>
              <td>✓ CoreML</td>
              <td>10-15x</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <h3>PostgreSQL Configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`# Add to postgresql.conf
shared_preload_libraries = 'neurondb'

# GPU Configuration (all optional)
neurondb.gpu_enabled = off                    # Enable GPU (default: off)
neurondb.gpu_backend = 'cuda'                 # Backend: cuda, rocm, metal (default: cuda)
neurondb.gpu_device = 0                       # GPU device ID
neurondb.gpu_batch_size = 8192                # Batch size for GPU ops
neurondb.gpu_streams = 2                      # CUDA/HIP/Metal streams
neurondb.gpu_memory_pool_mb = 512             # Memory pool size
neurondb.gpu_fail_open = on                   # Fallback to CPU on error
neurondb.gpu_kernels = 'l2,cosine,ip'         # Enabled kernels
neurondb.gpu_timeout_ms = 30000               # Kernel timeout`}
        />
      </section>

      <section id="sql-examples">
        <h2>SQL Examples</h2>

        <h3>Enable GPU Acceleration</h3>
        <SqlCodeBlock
          title="Enable GPU via GUCs"
          code={`-- Enable GPU via GUCs (requires shared_preload_libraries='neurondb')
SET neurondb.gpu_enabled = on;
SET neurondb.gpu_device = 0;        -- select device
SET neurondb.gpu_batch_size = 8192;  -- tune for throughput`}
        />

        <h3>GPU-Accelerated Distance</h3>
        <SqlCodeBlock
          title="Batch GPU distance calculation"
          code={`-- Batch GPU distance calculation (100x faster)
SELECT vector_l2_distance_gpu(
  embedding, 
  '[0.1, 0.2, ...]'::vector
) FROM documents;

-- GPU cosine similarity
SELECT vector_cosine_distance_gpu(
  features, 
  query_vector
) FROM products
ORDER BY 1 LIMIT 10;`}
        />
      </section>

      <section id="automatic-fallback">
        <h2>Automatic CPU Fallback</h2>
        <p>
          NeurondB automatically falls back to CPU execution when GPU is unavailable, ensuring your application 
          continues to work regardless of hardware configuration. This provides maximum compatibility without 
          requiring separate builds or configurations.
        </p>

        <h3>Fallback Scenarios</h3>
        <ul>
          <li><strong>No GPU Available:</strong> Automatically uses CPU</li>
          <li><strong>GPU Out of Memory:</strong> Falls back to CPU for remaining operations</li>
          <li><strong>GPU Driver Issues:</strong> Gracefully degrades to CPU</li>
          <li><strong>Unsupported Operations:</strong> CPU execution for operations without GPU kernels</li>
        </ul>

        <SqlCodeBlock
          title="Check GPU status"
          code={`-- Check if GPU is available and enabled
SELECT * FROM neurondb_gpu_status();

-- Returns:
--  gpu_enabled | gpu_backend | gpu_device | gpu_memory_mb | fallback_count
-- -------------+-------------+------------+---------------+----------------
--  true        | cuda        | 0          | 8192          | 0`}
        />
      </section>

      <section id="building">
        <h2>Building with GPU Support</h2>

        <h3>Using build.sh (Recommended)</h3>
        <BashCodeBlock
          title="Build commands"
          code={`# CPU-only build (default)
./build.sh

# With GPU support (auto-detects CUDA/ROCm)
./build.sh --with-gpu

# With custom paths
./build.sh --with-gpu --cuda-path /opt/cuda --onnx-path /usr/local`}
        />

        <h3>NVIDIA GPU (CUDA)</h3>
        <BashCodeBlock
          title="Install CUDA Toolkit"
          code={`# Install CUDA Toolkit 12.6
# Ubuntu/Debian
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-toolkit-12-6

# Build NeuronDB with CUDA
./build.sh --with-gpu`}
        />

        <h3>AMD GPU (ROCm)</h3>
        <BashCodeBlock
          title="Install ROCm"
          code={`# Install ROCm 6.0
# Ubuntu
wget https://repo.radeon.com/rocm/rocm.gpg.key -O - | sudo apt-key add -
echo 'deb [arch=amd64] https://repo.radeon.com/rocm/apt/6.0/ jammy main' | sudo tee /etc/apt/sources.list.d/rocm.list
sudo apt-get update
sudo apt-get install -y rocm-dev

# Build NeuronDB with ROCm
./build.sh --with-gpu`}
        />

        <h3>Apple Metal (macOS)</h3>
        <BashCodeBlock
          title="Build with Metal"
          code={`# Metal support is automatically enabled on macOS
# No additional dependencies required

# Build NeuronDB with Metal
./build.sh --with-gpu`}
        />
      </section>

      <section id="performance-tuning">
        <h2>Performance Tuning</h2>

        <h3>Batch Size Optimization</h3>
        <p>
          Larger batch sizes improve GPU utilization but increase memory usage. Tune based on your GPU memory 
          and query patterns.
        </p>
        <SqlCodeBlock
          title="Optimize batch size"
          code={`-- Start with default (8192)
SET neurondb.gpu_batch_size = 8192;

-- Increase for high-throughput scenarios
SET neurondb.gpu_batch_size = 16384;

-- Decrease if running out of memory
SET neurondb.gpu_batch_size = 4096;`}
        />

        <h3>Memory Pool Configuration</h3>
        <p>
          Pre-allocate GPU memory to reduce allocation overhead and improve performance.
        </p>
        <SqlCodeBlock
          title="Configure memory pool"
          code={`-- Allocate 1GB memory pool (adjust based on GPU memory)
SET neurondb.gpu_memory_pool_mb = 1024;

-- For multi-GPU setups, configure per device
SET neurondb.gpu_device = 0;
SET neurondb.gpu_memory_pool_mb = 2048;`}
        />

        <h3>Stream Configuration</h3>
        <p>
          Multiple streams enable concurrent operations and better GPU utilization.
        </p>
        <SqlCodeBlock
          title="Configure streams"
          code={`-- Use 2 streams for concurrent operations
SET neurondb.gpu_streams = 2;

-- Increase for high-throughput scenarios
SET neurondb.gpu_streams = 4;`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/vector-engine">Vector Engine</a> - GPU-accelerated vector search</li>
          <li><a href="/docs/neurondb/ml-engine">ML Engine</a> - GPU-accelerated ML inference</li>
          <li><a href="/docs/neurondb/embedding-engine">Embedding Engine</a> - GPU-accelerated embeddings</li>
          <li><a href="/docs/neurondb/configuration">Configuration</a> - Complete GPU configuration reference</li>
          <li><a href="/docs/neurondb/performance">Performance Guide</a> - Benchmark GPU vs CPU</li>
          <li><a href="/docs/neurondb/troubleshooting">Troubleshooting</a> - Fix GPU issues</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
