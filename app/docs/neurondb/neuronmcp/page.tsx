import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Code, Database, Zap, Server, Terminal, Settings } from 'lucide-react'
import PostgresDocsLayout from '@/components/PostgresDocsLayout'
import { generateDocsMetadata } from '@/config/products'

export const metadata: Metadata = generateDocsMetadata('neurondb', 'NeuronMCP: Model Context Protocol Server')

export default function NeuronMCPPage() {
  return (
    <PostgresDocsLayout
      title="NeuronMCP: Model Context Protocol Server"
    >
      <div className="prose prose-invert max-w-none">
        <h1>NeuronMCP: Model Context Protocol Server</h1>
        
        <p className="lead">
          NeuronMCP is a Model Context Protocol server for NeuronDB PostgreSQL extension, implemented in Go. It enables MCP-compatible clients (like Claude Desktop) to access NeuronDB vector search, ML algorithms, and RAG capabilities through stdio communication.
        </p>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronMCP" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              GitHub Repository →
            </Link>
            <Link href="https://modelcontextprotocol.io/" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              MCP Specification →
            </Link>
            <Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronMCP/docker/README.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">
              Docker Guide →
            </Link>
          </div>
        </div>

        <h2>Overview</h2>
        <p>
          NeuronMCP implements the Model Context Protocol using JSON-RPC 2.0 over stdio. It provides tools and resources for MCP clients to interact with NeuronDB, including vector operations, ML model training, and database schema management.
        </p>

        <h2>Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Server className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">MCP Protocol</h3>
            <p className="text-slate-300">Full JSON-RPC 2.0 implementation with stdio transport for MCP-compatible clients.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Database className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vector Operations</h3>
            <p className="text-slate-300">Search, embedding generation, and indexing tools for vector similarity search.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Code className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">ML Tools</h3>
            <p className="text-slate-300">Training and prediction for various machine learning algorithms.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Settings className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resources</h3>
            <p className="text-slate-300">Schema, models, indexes, config, workers, and stats management.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Terminal className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Middleware</h3>
            <p className="text-slate-300">Validation, logging, timeout, and error handling for robust operation.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <Zap className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Claude Desktop</h3>
            <p className="text-slate-300">Ready-to-use configuration for Claude Desktop integration.</p>
          </div>
        </div>

        <h2>Architecture</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`┌─────────────────────────────────────────────┐
│          MCP Client                         │
│  (Claude Desktop, etc.)                     │
└──────────────┬──────────────────────────────┘
               │ stdio (JSON-RPC 2.0)
┌──────────────▼──────────────────────────────┐
│          NeuronMCP Server                   │
├─────────────────────────────────────────────┤
│  MCP Protocol Handler                       │
├─────────────────────────────────────────────┤
│  Tools │  Resources │  Middleware           │
├─────────────────────────────────────────────┤
│          NeuronDB PostgreSQL                │
│  (Vector Search │  ML │  Embeddings)        │
└─────────────────────────────────────────────┘`}
        </pre>

        <h2>Quick Start</h2>
        <h3>Prerequisites</h3>
        <ul>
          <li>PostgreSQL 16 or later</li>
          <li>NeuronDB extension installed</li>
          <li>Go 1.23 or later (for building from source)</li>
          <li>MCP-compatible client (e.g., Claude Desktop)</li>
        </ul>

        <h3>Database Setup</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`createdb neurondb
psql -d neurondb -c "CREATE EXTENSION neurondb;"`}
        </pre>

        <h3>Configuration</h3>
        <p>Create <code>mcp-config.json</code>:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`{
  "database": {
    "host": "localhost",
    "port": 5432,
    "database": "neurondb",
    "user": "neurondb",
    "password": "neurondb"
  },
  "server": {
    "name": "neurondb-mcp-server",
    "version": "1.0.0"
  },
  "logging": {
    "level": "info",
    "format": "text"
  },
  "features": {
    "vector": { "enabled": true },
    "ml": { "enabled": true },
    "analytics": { "enabled": true }
  }
}`}
        </pre>
        <p>Or use environment variables:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`export NEURONDB_HOST=localhost
export NEURONDB_PORT=5432
export NEURONDB_DATABASE=neurondb
export NEURONDB_USER=neurondb
export NEURONDB_PASSWORD=neurondb`}
        </pre>

        <h3>Build and Run</h3>
        <p>From source:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`go build ./cmd/neurondb-mcp
./neurondb-mcp`}
        </pre>
        <p>Using Docker:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`cd docker
cp .env.example .env
# Edit .env with your configuration
docker compose up -d`}
        </pre>

        <h2>Using with Claude Desktop</h2>
        <p>Create Claude Desktop configuration file:</p>
        <ul>
          <li><strong>macOS:</strong> <code>~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
          <li><strong>Windows:</strong> <code>%APPDATA%\Claude\claude_desktop_config.json</code></li>
          <li><strong>Linux:</strong> <code>~/.config/Claude/claude_desktop_config.json</code></li>
        </ul>
        <p>Example configuration:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`{
  "mcpServers": {
    "neurondb": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--network", "neurondb-network",
        "-e", "NEURONDB_HOST=neurondb-cpu",
        "-e", "NEURONDB_PORT=5432",
        "-e", "NEURONDB_DATABASE=neurondb",
        "-e", "NEURONDB_USER=neurondb",
        "-e", "NEURONDB_PASSWORD=neurondb",
        "neurondb-mcp:latest"
      ]
    }
  }
}`}
        </pre>
        <p>Or use local binary:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`{
  "mcpServers": {
    "neurondb": {
      "command": "/path/to/neurondb-mcp",
      "env": {
        "NEURONDB_HOST": "localhost",
        "NEURONDB_PORT": "5432",
        "NEURONDB_DATABASE": "neurondb",
        "NEURONDB_USER": "neurondb",
        "NEURONDB_PASSWORD": "neurondb"
      }
    }
  }
}`}
        </pre>
        <p>Restart Claude Desktop after configuration changes.</p>

        <h2>Tools</h2>
        <p>NeuronMCP provides the following tools:</p>
        <div className="overflow-x-auto">
          <table className="w-full border border-slate-700 rounded-lg">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Tool Category</th>
                <th className="px-4 py-3 text-left font-semibold">Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-4 py-3 font-medium">Vector Operations</td>
                <td className="px-4 py-3"><code>vector_search</code>, <code>vector_similarity</code>, <code>generate_embedding</code>, <code>create_vector_index</code></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">ML Operations</td>
                <td className="px-4 py-3"><code>train_model</code>, <code>predict</code>, <code>evaluate_model</code>, <code>list_models</code></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Analytics</td>
                <td className="px-4 py-3"><code>analyze_data</code>, <code>cluster_data</code>, <code>reduce_dimensionality</code></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">RAG Operations</td>
                <td className="px-4 py-3"><code>process_document</code>, <code>retrieve_context</code>, <code>generate_response</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Resources</h2>
        <p>NeuronMCP exposes the following resources:</p>
        <ul>
          <li><code>schema</code> - Database schema information</li>
          <li><code>models</code> - Available ML models</li>
          <li><code>indexes</code> - Vector index configurations</li>
          <li><code>config</code> - Server configuration</li>
          <li><code>workers</code> - Background worker status</li>
          <li><code>stats</code> - Database and system statistics</li>
        </ul>

        <h2>MCP Protocol</h2>
        <p>NeuronMCP uses Model Context Protocol over stdio:</p>
        <ul>
          <li>Communication via stdin and stdout</li>
          <li>Messages follow JSON-RPC 2.0 format</li>
          <li>Clients initiate all requests</li>
          <li>Server responds with results or errors</li>
        </ul>
        <p>Example request:</p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "vector_search",
    "arguments": {
      "query_vector": [0.1, 0.2, 0.3],
      "table": "documents",
      "limit": 10
    }
  }
}`}
        </pre>

        <h2>Integration with NeuronDB</h2>
        <p>
          NeuronMCP requires:
        </p>
        <ul>
          <li>PostgreSQL database with NeuronDB extension installed</li>
          <li>Database user with appropriate permissions</li>
          <li>Access to NeuronDB vector search, ML, and embedding functions</li>
        </ul>
        <p>
          See <Link href="/docs/neurondb" className="text-cyan-300 hover:text-cyan-200 hover:underline">NeuronDB documentation</Link> for installation instructions.
        </p>

        <h2>Documentation</h2>
        <ul>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronMCP/README.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">Component README</Link> - Overview and usage</li>
          <li><Link href="https://github.com/pgElephant/NeurondB/tree/main/NeuronMCP/docker/README.md" className="text-cyan-300 hover:text-cyan-200 hover:underline">Docker Guide</Link> - Container deployment guide</li>
          <li><Link href="https://modelcontextprotocol.io/" className="text-cyan-300 hover:text-cyan-200 hover:underline">MCP Specification</Link> - Model Context Protocol documentation</li>
        </ul>
      </div>
    </PostgresDocsLayout>
  )
}

