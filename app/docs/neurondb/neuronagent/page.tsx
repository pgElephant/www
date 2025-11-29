import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Code, Database, Zap, Server, Lock, Activity } from 'lucide-react'
import PostgresDocsLayout from '@/components/PostgresDocsLayout'
import { generateDocsMetadata } from '@/config/products'

export const metadata: Metadata = generateDocsMetadata('neurondb', 'NeuronAgent: AI Agent Runtime')

export default function NeuronAgentPage() {
  return (
    <PostgresDocsLayout
      title="NeuronAgent: AI Agent Runtime"
    >
      <div className="prose prose-invert max-w-none">
        <h1>NeuronAgent: AI Agent Runtime</h1>
        
        <p className="lead">
          NeuronAgent is an AI agent runtime system providing REST API and WebSocket endpoints for building applications with long-term memory, tool execution, and streaming responses. It integrates seamlessly with NeuronDB for vector search, embeddings, and LLM operations.
        </p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              GitHub Repository →
            </Link>
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/API.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              API Documentation →
            </Link>
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/ARCHITECTURE.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              Architecture Guide →
            </Link>
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/DEPLOYMENT.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              Deployment Guide →
            </Link>
          </div>
        </div>

        <h2>Overview</h2>
        <p>
          NeuronAgent integrates with NeuronDB PostgreSQL extension to provide agent runtime capabilities. Use it to build autonomous agent systems with persistent memory, tool execution, and streaming responses.
        </p>

        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Server className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Agent State Machine</h3>
            <p className="text-slate-300">Complete state machine for autonomous task execution with state persistence and recovery.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Database className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Long-term Memory</h3>
            <p className="text-slate-300">HNSW-based vector search for context retrieval from historical conversations and knowledge base.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Code className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tool System</h3>
            <p className="text-slate-300">Extensible tool registry with SQL, HTTP, Code, and Shell tools. Execute tools with timeout and validation.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Zap className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">REST API & WebSocket</h3>
            <p className="text-slate-300">Full CRUD API for agents, sessions, and messages. WebSocket support for streaming responses.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Lock className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authentication</h3>
            <p className="text-slate-300">API key-based authentication with rate limiting and role-based access control.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Activity className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Background Jobs</h3>
            <p className="text-slate-300">PostgreSQL-based job queue with worker pool, retries, and poison message handling.</p>
          </div>
        </div>

        <h2>Architecture</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`┌─────────────────────────────────────────────┐
│          NeuronAgent Service                │
├─────────────────────────────────────────────┤
│  REST API     │  WebSocket  │  Health      │
├─────────────────────────────────────────────┤
│  Agent State Machine │  Session Management  │
├─────────────────────────────────────────────┤
│  Tool Registry │  Memory Store │  Job Queue │
├─────────────────────────────────────────────┤
│          NeuronDB PostgreSQL                │
│  (Vector Search │  Embeddings │  LLM)       │
└─────────────────────────────────────────────┘`}
        </pre>

        <h2>Quick Start</h2>
        <h3>Prerequisites</h3>
        <ul>
          <li>PostgreSQL 16 or later</li>
          <li>NeuronDB extension installed</li>
          <li>Go 1.23 or later (for building from source)</li>
        </ul>

        <h3>Database Setup</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`createdb neurondb
psql -d neurondb -c "CREATE EXTENSION neurondb;"

# Run migrations
psql -d neurondb -f migrations/001_initial_schema.sql
psql -d neurondb -f migrations/002_add_indexes.sql
psql -d neurondb -f migrations/003_add_triggers.sql`}
        </pre>

        <h3>Configuration</h3>
        <p>Set environment variables or create <code>config.yaml</code>:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=neurondb
export DB_USER=neurondb
export DB_PASSWORD=neurondb
export SERVER_PORT=8080`}
        </pre>

        <h3>Run Service</h3>
        <p>From source:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`go run cmd/agent-server/main.go`}
        </pre>
        <p>Using Docker:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`cd docker
cp .env.example .env
# Edit .env with your configuration
docker compose up -d`}
        </pre>

        <h2>API Endpoints</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-700 rounded-lg">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Endpoint</th>
                <th className="px-4 py-3 text-left font-semibold">Method</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-4 py-3"><code>/health</code></td>
                <td className="px-4 py-3">GET</td>
                <td className="px-4 py-3">Health check endpoint</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/metrics</code></td>
                <td className="px-4 py-3">GET</td>
                <td className="px-4 py-3">Prometheus metrics</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/api/v1/agents</code></td>
                <td className="px-4 py-3">POST</td>
                <td className="px-4 py-3">Create new agent</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/api/v1/agents</code></td>
                <td className="px-4 py-3">GET</td>
                <td className="px-4 py-3">List all agents</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/api/v1/agents/{'{id}'}</code></td>
                <td className="px-4 py-3">GET</td>
                <td className="px-4 py-3">Get agent details</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/api/v1/sessions</code></td>
                <td className="px-4 py-3">POST</td>
                <td className="px-4 py-3">Create new session</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/api/v1/sessions/{'{id}'}/messages</code></td>
                <td className="px-4 py-3">POST</td>
                <td className="px-4 py-3">Send message to agent</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>/ws</code></td>
                <td className="px-4 py-3">WebSocket</td>
                <td className="px-4 py-3">Streaming agent responses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Usage Examples</h2>
        <h3>Create Agent</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`curl -X POST http://localhost:8080/api/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "research_agent",
    "profile": "research",
    "tools": ["sql", "http"]
  }'`}
        </pre>

        <h3>Create Session</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`curl -X POST http://localhost:8080/api/v1/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "agent_123"
  }'`}
        </pre>

        <h3>Send Message</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`curl -X POST http://localhost:8080/api/v1/sessions/SESSION_ID/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Find documents about machine learning"
  }'`}
        </pre>

        <h2>Integration with NeuronDB</h2>
        <p>
          NeuronAgent requires:
        </p>
        <ul>
          <li>PostgreSQL database with NeuronDB extension installed</li>
          <li>Database user with appropriate permissions</li>
          <li>Access to NeuronDB vector search and embedding functions</li>
        </ul>
        <p>
          See <Link href="/docs/neurondb" className="text-cyan-300 hover:text-cyan-200 hover:underline">NeuronDB documentation</Link> for installation instructions.
        </p>

        <h2>Documentation</h2>
        <ul>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/README.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">Component README</Link> - Overview and quick start</li>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/API.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">API Reference</Link> - Complete REST API documentation</li>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/ARCHITECTURE.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">Architecture</Link> - System design and structure</li>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronAgent/docs/DEPLOYMENT.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">Deployment Guide</Link> - Production deployment instructions</li>
        </ul>
      </div>
    </PostgresDocsLayout>
  )
}

