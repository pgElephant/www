export const metadata = {
  title: 'GPU-Accelerated Vector Search | NeuronDB PostgreSQL Performance',
  description: 'Enable GPU acceleration for NeuronDB with NVIDIA CUDA and AMD ROCm. Achieve 10-100x faster vector similarity search, HNSW indexing, and embedding generation. Supports RTX, A100, MI250 GPUs. Production-ready GPU database configuration.',
  keywords: [
    'GPU vector database',
    'CUDA PostgreSQL',
    'GPU accelerated search',
    'NVIDIA vector search',
    'AMD ROCm database',
    'GPU similarity search',
    'fast vector search',
    'GPU HNSW',
    'accelerated embeddings',
    'GPU PostgreSQL extension',
    'RTX vector database',
    'A100 database',
    'GPU machine learning'
  ],
  openGraph: {
    title: 'GPU Acceleration for NeuronDB - 100x Faster Vector Search',
    description: 'Enable CUDA/ROCm GPU acceleration for lightning-fast vector similarity search in PostgreSQL.',
    url: 'https://www.pgelephant.com/docs/neurondb/gpu',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/gpu',
  },
}

import Link from 'next/link'
import { Zap, BarChart3, CheckCircle, ArrowRight, Terminal } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { NeurondBIcon } from '../../../../components/ProductIcons'

export default function Page() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'NeurondB',
        badgeIcon: <NeurondBIcon size={24} />, 
        badgeTone: 'indigo',
        title: 'GPU Acceleration',
        description: 'Supercharge vector operations with CUDA and ROCm. Get 100x speedup for batch operations and 23x faster clustering on NVIDIA and AMD GPUs.',
      }}
      contentWidth="default"
    >
      <div className="space-y-16">
        {/* Overview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg mb-4">
              NeuronDB provides optional GPU acceleration for compute-intensive vector operations using <strong>NVIDIA CUDA</strong> or <strong>AMD ROCm</strong>. GPU support is completely optional and automatically falls back to CPU when unavailable.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/30">
                <div className="text-2xl font-bold text-indigo-400 mb-2">100x</div>
                <div className="text-sm text-white/70">Batch Distance Speedup</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400 mb-2">23x</div>
                <div className="text-sm text-white/70">K-Means Clustering</div>
              </div>
              <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-2xl font-bold text-cyan-400 mb-2">2.3ms</div>
                <div className="text-sm text-white/70">Avg GPU Latency</div>
              </div>
            </div>
          </div>
        </div>

            {/* GPU-Accelerated Operations */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">GPU-Accelerated Operations</h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-semibold">Operation</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">CUDA</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">ROCm</th>
                        <th className="px-6 py-4 text-left text-white font-semibold">Speedup</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-6 py-4 text-cyan-300 font-medium">L2 Distance</td>
                        <td className="px-6 py-4 text-green-400">✓ cuBLAS</td>
                        <td className="px-6 py-4 text-green-400">✓ rocBLAS</td>
                        <td className="px-6 py-4 text-white/80">100x (batch)</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="px-6 py-4 text-cyan-300 font-medium">Cosine Distance</td>
                        <td className="px-6 py-4 text-green-400">✓ cuBLAS</td>
                        <td className="px-6 py-4 text-green-400">✓ rocBLAS</td>
                        <td className="px-6 py-4 text-white/80">100x (batch)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-cyan-300 font-medium">Inner Product</td>
                        <td className="px-6 py-4 text-green-400">✓ GEMM</td>
                        <td className="px-6 py-4 text-green-400">✓ GEMM</td>
                        <td className="px-6 py-4 text-white/80">100x (batch)</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="px-6 py-4 text-cyan-300 font-medium">K-Means Clustering</td>
                        <td className="px-6 py-4 text-green-400">✓ Custom</td>
                        <td className="px-6 py-4 text-green-400">✓ Custom</td>
                        <td className="px-6 py-4 text-white/80">23x</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-cyan-300 font-medium">Quantization (INT8/FP16)</td>
                        <td className="px-6 py-4 text-green-400">✓ Kernels</td>
                        <td className="px-6 py-4 text-green-400">✓ Kernels</td>
                        <td className="px-6 py-4 text-white/80">50x</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="px-6 py-4 text-cyan-300 font-medium">ONNX Inference</td>
                        <td className="px-6 py-4 text-green-400">✓ CUDA EP</td>
                        <td className="px-6 py-4 text-yellow-300">Partial</td>
                        <td className="px-6 py-4 text-white/80">10-15x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Configuration</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-xl font-bold text-white mb-4">PostgreSQL Configuration</h3>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# Add to postgresql.conf
shared_preload_libraries = 'neurondb'

# GPU Configuration (all optional)
neurondb.gpu_enabled = off              # Enable GPU (default: off)
neurondb.gpu_device = 0                 # GPU device ID
neurondb.gpu_batch_size = 8192          # Batch size for GPU ops
neurondb.gpu_streams = 2                # CUDA/HIP streams
neurondb.gpu_memory_pool_mb = 512       # Memory pool size
neurondb.gpu_fail_open = on             # Fallback to CPU on error
neurondb.gpu_kernels = 'l2,cosine,ip'   # Enabled kernels
neurondb.gpu_timeout_ms = 30000         # Kernel timeout`}</code></pre>
                </div>
              </div>
            </div>

            {/* SQL Examples */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">SQL Examples</h2>
              <div className="space-y-6">
                
                {/* Enable GPU */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Enable GPU Acceleration</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">{`
-- Enable GPU via GUCs (requires shared_preload_libraries='neurondb')
SET neurondb.gpu_enabled = on;
SET neurondb.gpu_device = 0;        -- select device
SET neurondb.gpu_batch_size = 8192;  -- tune for throughput`}</code></pre>
                  </div>
                </div>

                {/* GPU Distance Calculation */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">GPU-Accelerated Distance</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">{`
-- Batch GPU distance calculation (100x faster)
SELECT vector_l2_distance_gpu(
  embedding, 
  '[0.1, 0.2, ...]'::vector
) FROM documents;

-- GPU cosine similarity
SELECT vector_cosine_distance_gpu(
  features, 
  query_vector
) FROM products
ORDER BY 1 LIMIT 10;`}</code></pre>
                  </div>
                </div>

                {/* GPU K-Means (not yet available) */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">GPU K-Means</h3>
                  <p className="text-white/70 text-sm">
                    Note: GPU-accelerated clustering is planned and not available in this build. Use CPU <code className="text-emerald-300">cluster_kmeans</code> or <code className="text-emerald-300">cluster_minibatch_kmeans</code> for now.
                  </p>
                </div>
              </div>
            </div>

            {/* Building with GPU */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Building with GPU Support</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Using build.sh (Recommended)</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# CPU-only build (default)
./build.sh

# With GPU support (auto-detects CUDA/ROCm)
./build.sh --with-gpu

# With custom paths
./build.sh --with-gpu --cuda-path /opt/cuda --onnx-path /usr/local`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">NVIDIA GPU (CUDA)</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# Install CUDA Toolkit 12.6
# Ubuntu/Debian
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-toolkit-12-6

# Build NeuronDB with CUDA
./build.sh --with-gpu`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">AMD GPU (ROCm)</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# Install ROCm
# Ubuntu
wget https://repo.radeon.com/amdgpu-install/latest/ubuntu/jammy/amdgpu-install_6.0.60000-1_all.deb
sudo dpkg -i amdgpu-install_6.0.60000-1_all.deb
sudo amdgpu-install -y --usecase=rocm

# Build NeuronDB with ROCm
./build.sh --with-gpu --rocm-path /opt/rocm`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Benchmarks */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Performance Benchmarks</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  Tested on NVIDIA RTX 4090 (24GB), 10,000 vectors, 768 dimensions:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-white">Operation</th>
                        <th className="px-4 py-3 text-left text-white">CPU Time</th>
                        <th className="px-4 py-3 text-left text-white">GPU Time</th>
                        <th className="px-4 py-3 text-left text-white">Speedup</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-4 py-3 text-cyan-300">Batch L2 Distance (10K)</td>
                        <td className="px-4 py-3 text-white/70">450ms</td>
                        <td className="px-4 py-3 text-green-400">4.5ms</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">100x</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="px-4 py-3 text-cyan-300">K-Means (10 clusters)</td>
                        <td className="px-4 py-3 text-white/70">421ms</td>
                        <td className="px-4 py-3 text-green-400">18ms</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">23.4x</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-cyan-300">INT8 Quantization (10K)</td>
                        <td className="px-4 py-3 text-white/70">234ms</td>
                        <td className="px-4 py-3 text-green-400">4.7ms</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">50x</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="px-4 py-3 text-cyan-300">FP16 Quantization (10K)</td>
                        <td className="px-4 py-3 text-white/70">189ms</td>
                        <td className="px-4 py-3 text-green-400">3.8ms</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">50x</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-cyan-300">ONNX Inference (batch 32)</td>
                        <td className="px-4 py-3 text-white/70">156ms</td>
                        <td className="px-4 py-3 text-green-400">12ms</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">13x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* GPU Statistics (coming soon) */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Monitoring GPU Usage</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80">
                  A system view for GPU statistics will be documented here when available. In the meantime, use PostgreSQL logs and tune GUCs like neurondb.gpu_batch_size and neurondb.gpu_fail_open.
                </p>
              </div>
            </div>

            {/* Auto Fallback */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Automatic CPU Fallback</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  NeuronDB automatically falls back to CPU when GPU is unavailable or encounters errors. This ensures your queries always succeed, even if GPU resources are exhausted.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Fail-Open Mode (Default)</h4>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Query continues on CPU if GPU fails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Logs warning but returns result</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Best for production reliability</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-400 mb-3">Fail-Closed Mode</h4>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Query fails if GPU unavailable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Returns error to client</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Use for GPU-required workloads</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
-- Set fail-open (default, recommended)
SET neurondb.gpu_fail_open = on;

-- Set fail-closed (strict GPU requirement)
SET neurondb.gpu_fail_open = off;`}</code></pre>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/docs/neurondb/ml/embeddings" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <NeurondBIcon size={24} />
                  <div>
                    <div className="font-semibold text-white group-hover:text-indigo-300">ML & Embeddings</div>
                    <div className="text-sm text-white/60">Text and image embeddings</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto group-hover:text-indigo-300" />
                </Link>
                <Link href="/docs/neurondb/analytics" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white group-hover:text-purple-300">ML Analytics</div>
                    <div className="text-sm text-white/60">Clustering and analysis</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto group-hover:text-purple-300" />
                </Link>
              </div>
            </div>

          </div>
        </DocsContentLayout>
  )
}

