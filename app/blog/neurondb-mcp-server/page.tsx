import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Server: Model Context Protocol Explained',
  description: 'MCP Server (Model Context Protocol) guide. What it is, how it works, integration with Claude Desktop, known MCP servers, and NeuronMCP implementation.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/neurondb-mcp-server',
  },
}

export default function NeuronDBMCPServerRedirect() {
  redirect('https://neurondb.ai/blog/neurondb-mcp-server')
}

