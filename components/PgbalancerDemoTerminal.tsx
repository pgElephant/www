'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Check, Code, Database, Cpu, Server, Settings, Loader2, Zap } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const PgbalancerDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [activeTab, setActiveTab] = useState<'build' | 'usage' | 'ai'>('build')
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Base timing values (in ms)
  const baseTimings = useMemo(() => ({
    typeSpeed: 100,
    commandDelay: 2000,
    outputDelay: 400,
    betweenCommands: 2000
  }), [])

  // pgbalancer-specific demo commands and their outputs
  const buildCommands = useMemo(() => [
    {
      command: 'git clone https://github.com/pgelephant/pgbalancer.git && cd pgbalancer',
      output: [
        'Cloning into \'pgbalancer\'...',
        'remote: Enumerating objects: 4567, done.',
        'remote: Total 4567 (delta 1890), done.',
        'Receiving objects: 100% (4567/4567), done.',
        'Resolving deltas: 100% (1890/1890), done.'
      ]
    },
    {
      command: './configure --with-openssl --with-pam --with-ldap && make -C src && make -C bctl',
      output: [
        'checking for gcc... gcc',
        'checking for PostgreSQL 13+ dev headers... yes',
        'checking for json-c... yes',
        'checking for libyaml... yes',
        'configure: creating ./config.status',
        '',
        'Building pgbalancer with AI load balancing...',
        'CC src/main/pgbalancer_main.c',
        'CC src/ai/pool_ai_load_balancer.c',
        'CC src/mqtt/pgbalancer_mqtt.c',
        'CC src/rest_api/pgbalancer_rest_api.c',
        'CC src/auth/jwt/jwt_auth.c',
        'CC src/protocol/pool_process_query.c',
        'LINK pgbalancer',
        '',
        'Building bctl CLI tool...',
        'CC bctl/bctl.c',
        'CC bctl/bctl_mqtt.c',
        'LINK bctl'
      ]
    },
    {
      command: 'sudo make install',
      output: [
        'Installing pgbalancer...',
        'install -m 755 src/pgbalancer /usr/local/bin/',
        'install -m 755 bctl/bctl /usr/local/bin/',
        'install -m 644 src/sample/pgbalancer.conf.sample /etc/pgbalancer/',
        'pgbalancer installation complete!'
      ]
    },
    {
      command: 'cat /etc/pgbalancer/pgbalancer.conf',
      output: [
        '# pgbalancer Configuration (pgpool-II fork with REST API & AI)',
        'listen_addresses = \'*\'',
        'port = 5432',
        'socket_dir = \'/tmp\'',
        'pcp_listen_addresses = \'*\'',
        'pcp_port = 9898',
        '',
        '# Backend PostgreSQL Servers',
        'backend_hostname0 = \'localhost\'',
        'backend_port0 = 5433',
        'backend_weight0 = 1',
        'backend_data_directory0 = \'/var/lib/postgresql/16/data1\'',
        '',
        'backend_hostname1 = \'localhost\'',
        'backend_port1 = 5434',
        'backend_weight1 = 1',
        'backend_data_directory1 = \'/var/lib/postgresql/16/data2\'',
        '',
        '# Connection Pooling',
        'num_init_children = 32',
        'max_pool = 4',
        'child_life_time = 300',
        'child_max_connections = 0',
        '',
        '# Load Balancing (AI-Powered)',
        'load_balance_mode = on',
        'ai_load_balancing = on              # Enable AI algorithm',
        'ai_learning_rate = 0.1',
        'ai_exploration_rate = 0.2',
        '',
        '# Health Check',
        'health_check_period = 30',
        'health_check_timeout = 20',
        'health_check_user = \'postgres\'',
        'health_check_database = \'postgres\'',
        '',
        '# REST API (Integrated child process)',
        'rest_api_enabled = on',
        'rest_api_port = 8080',
        'jwt_auth_enabled = off              # Optional JWT authentication'
      ]
    },
    {
      command: 'pgbalancer -f /etc/pgbalancer/pgbalancer.conf -D',
      output: [
        '2025-10-29 12:00:00: pid 12345: LOG:  pgbalancer: Version 4.5.0 (sugoikame) starting',
        '2025-10-29 12:00:00: pid 12345: LOG:  AI Load Balancer initialized with 2 nodes',
        '2025-10-29 12:00:00: pid 12345: LOG:  REST API child process starting on port 8080',
        '2025-10-29 12:00:00: pid 12345: LOG:  Mongoose HTTP server listening on 0.0.0.0:8080',
        '[INFO] Backend server 127.0.0.1:5432 is up',
        '[INFO] Backend server 127.0.0.1:5433 is up',
        '[INFO] Backend server 127.0.0.1:5434 is up',
        '[INFO] Connection pools initialized',
        '[INFO] Health checker started',
        '[INFO] Load balancer ready'
      ]
    }
  ], [])

  const usageCommands = useMemo(() => [
    {
      command: '/usr/local/pgbalancer/bin/pgbalancer -c /usr/local/pgbalancer/etc/pgbalancer.yaml -d',
      output: [
        '[INFO] Starting pgbalancer...',
        '[INFO] pgbalancer started (PID: 34567)',
        '[INFO] Listening on 0.0.0.0:6432',
        '[INFO] REST API enabled on 127.0.0.1:8080',
        '[INFO] Backend server 127.0.0.1:5432 is up',
        '[INFO] Backend server 127.0.0.1:5433 is up',
        '[INFO] Backend server 127.0.0.1:5434 is up',
        '[INFO] Connection pools initialized',
        '[INFO] Health checker started',
        '[INFO] Load balancer ready'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 status',
      output: [
        'pgbalancer Status:',
        '==================',
        'Server: 127.0.0.1:6432',
        'REST API: 127.0.0.1:8080',
        'Uptime: 00:00:15',
        'Total connections: 0',
        'Active connections: 0',
        'Idle connections: 0',
        '',
        'Backend Servers:',
        '  - 127.0.0.1:5432 (weight: 1, status: up, connections: 0/25)',
        '  - 127.0.0.1:5433 (weight: 1, status: up, connections: 0/25)',
        '  - 127.0.0.1:5434 (weight: 1, status: up, connections: 0/25)',
        '',
        'Pool Statistics:',
        '  - Total pool size: 75',
        '  - Available connections: 75',
        '  - Pool utilization: 0%'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "CREATE TABLE users (id serial primary key, name text, email text);"',
      output: [
        'CREATE TABLE'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "INSERT INTO users (name, email) VALUES (\'Alice\', \'alice@example.com\'), (\'Bob\', \'bob@example.com\'), (\'Charlie\', \'charlie@example.com\');"',
      output: [
        'INSERT 0 3'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name    | email',
        '---+---------+-------------------',
        ' 1 | Alice   | alice@example.com',
        ' 2 | Bob     | bob@example.com',
        ' 3 | Charlie | charlie@example.com',
        '(3 rows)'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 status',
      output: [
        'pgbalancer Status:',
        '==================',
        'Server: 127.0.0.1:6432',
        'REST API: 127.0.0.1:8080',
        'Uptime: 00:01:30',
        'Total connections: 3',
        'Active connections: 1',
        'Idle connections: 2',
        '',
        'Backend Servers:',
        '  - 127.0.0.1:5432 (weight: 1, status: up, connections: 1/25)',
        '  - 127.0.0.1:5433 (weight: 1, status: up, connections: 1/25)',
        '  - 127.0.0.1:5434 (weight: 1, status: up, connections: 1/25)',
        '',
        'Pool Statistics:',
        '  - Total pool size: 75',
        '  - Available connections: 72',
        '  - Pool utilization: 4%'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 pool-stats',
      output: [
        'Connection Pool Statistics:',
        '==========================',
        'Backend 127.0.0.1:5432:',
        '  - Pool size: 25',
        '  - Active connections: 1',
        '  - Idle connections: 1',
        '  - Available: 23',
        '  - Utilization: 8%',
        '',
        'Backend 127.0.0.1:5433:',
        '  - Pool size: 25',
        '  - Active connections: 1',
        '  - Idle connections: 1',
        '  - Available: 23',
        '  - Utilization: 8%',
        '',
        'Backend 127.0.0.1:5434:',
        '  - Pool size: 25',
        '  - Active connections: 1',
        '  - Idle connections: 0',
        '  - Available: 24',
        '  - Utilization: 4%'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 reload-config',
      output: [
        '[INFO] Reloading configuration...',
        '[INFO] Configuration reloaded successfully',
        '[INFO] All backend servers verified',
        '[INFO] Connection pools updated'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 backend-disable 127.0.0.1 5432',
      output: [
        '[INFO] Disabling backend server 127.0.0.1:5432...',
        '[INFO] Backend server 127.0.0.1:5432 disabled',
        '[INFO] Existing connections will be gracefully closed'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 status',
      output: [
        'pgbalancer Status:',
        '==================',
        'Server: 127.0.0.1:6432',
        'REST API: 127.0.0.1:8080',
        'Uptime: 00:02:15',
        'Total connections: 2',
        'Active connections: 1',
        'Idle connections: 1',
        '',
        'Backend Servers:',
        '  - 127.0.0.1:5432 (weight: 1, status: disabled, connections: 0/0)',
        '  - 127.0.0.1:5433 (weight: 1, status: up, connections: 1/25)',
        '  - 127.0.0.1:5434 (weight: 1, status: up, connections: 1/25)',
        '',
        'Pool Statistics:',
        '  - Total pool size: 50',
        '  - Available connections: 48',
        '  - Pool utilization: 4%'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name    | email',
        '---+---------+-------------------',
        ' 1 | Alice   | alice@example.com',
        ' 2 | Bob     | bob@example.com',
        ' 3 | Charlie | charlie@example.com',
        '(3 rows)',
        '',
        '-- Query successfully routed to available backend'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 backend-enable 127.0.0.1 5432',
      output: [
        '[INFO] Enabling backend server 127.0.0.1:5432...',
        '[INFO] Backend server 127.0.0.1:5432 enabled',
        '[INFO] Connection pool initialized'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 status',
      output: [
        'pgbalancer Status:',
        '==================',
        'Server: 127.0.0.1:6432',
        'REST API: 127.0.0.1:8080',
        'Uptime: 00:03:00',
        'Total connections: 3',
        'Active connections: 1',
        'Idle connections: 2',
        '',
        'Backend Servers:',
        '  - 127.0.0.1:5432 (weight: 1, status: up, connections: 1/25)',
        '  - 127.0.0.1:5433 (weight: 1, status: up, connections: 1/25)',
        '  - 127.0.0.1:5434 (weight: 1, status: up, connections: 1/25)',
        '',
        'Pool Statistics:',
        '  - Total pool size: 75',
        '  - Available connections: 72',
        '  - Pool utilization: 4%'
      ]
    }
  ], [])

  const aiCommands = useMemo(() => [
    {
      command: '/usr/local/pgbalancer/bin/pgbalancer -c /usr/local/pgbalancer/etc/pgbalancer.yaml -d --enable-ai',
      output: [
        '[INFO] Starting pgbalancer with AI Intelligence...',
        '[INFO] Loading machine learning models...',
        '[AI] Query pattern recognition model loaded',
        '[AI] Connection optimization model loaded',
        '[AI] Predictive scaling model loaded',
        '[INFO] pgbalancer started (PID: 34567)',
        '[INFO] Listening on 0.0.0.0:6432',
        '[INFO] REST API enabled on 127.0.0.1:8080',
        '[AI] ML inference engine initialized',
        '[AI] Starting pattern analysis...',
        '[INFO] Backend server 127.0.0.1:5432 is up',
        '[INFO] Backend server 127.0.0.1:5433 is up',
        '[INFO] Backend server 127.0.0.1:5434 is up',
        '[AI] Building initial workload profile...',
        '[INFO] Connection pools initialized',
        '[INFO] Health checker started',
        '[INFO] Load balancer ready',
        '[AI] AI Intelligence Engine: ACTIVE'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 ai-status',
      output: [
        'pgbalancer AI Intelligence Status:',
        '=================================',
        'AI Engine Status: ACTIVE',
        'Model Version: v2.1.4',
        'Learning Mode: ENABLED',
        'Inference Latency: 0.15ms',
        '',
        'Active ML Models:',
        '  - Query Pattern Recognition: 94.7% accuracy',
        '  - Connection Optimization: 97.2% efficiency',
        '  - Predictive Scaling: 91.8% accuracy',
        '  - Workload Classification: 96.1% accuracy',
        '',
        'Current Insights:',
        '  - Detected 3 query patterns',
        '  - Optimal pool size: 28 (vs configured 25)',
        '  - Predicted load increase in 15 minutes',
        '  - Recommended backend redistribution: 40/30/30'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 ai-insights',
      output: [
        'AI Performance Insights:',
        '========================',
        'Analysis Period: Last 5 minutes',
        'Queries Analyzed: 15,847',
        '',
        'Query Patterns Detected:',
        '  Pattern A (Read-Heavy): 67% of traffic',
        '    - Optimal backend: 127.0.0.1:5433',
        '    - Avg response time: 12.3ms',
        '    - Cache hit rate: 89%',
        '',
        '  Pattern B (Write-Heavy): 23% of traffic',
        '    - Optimal backend: 127.0.0.1:5432',
        '    - Avg response time: 8.7ms',
        '    - Transaction success: 99.9%',
        '',
        '  Pattern C (Analytics): 10% of traffic',
        '    - Optimal backend: 127.0.0.1:5434',
        '    - Avg response time: 245ms',
        '    - Resource usage: HIGH',
        '',
        'AI Recommendations:',
        '  1. Increase read replica connections by 15%',
        '  2. Pre-warm cache for Pattern A queries',
        '  3. Schedule analytics queries during low traffic'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 ai-predict',
      output: [
        'AI Predictive Analysis:',
        '======================',
        'Prediction Window: Next 30 minutes',
        'Confidence Level: 94.3%',
        '',
        'Traffic Forecast:',
        '  +5 min:  Current load (baseline)',
        '  +10 min: 15% increase expected',
        '  +15 min: 35% increase expected (PEAK)',
        '  +20 min: 25% increase expected',
        '  +25 min: 10% increase expected',
        '  +30 min: Return to baseline',
        '',
        'Resource Recommendations:',
        '  - Pre-scale connection pools by 20%',
        '  - Increase cache allocation by 512MB',
        '  - Alert standby servers for activation',
        '',
        'Auto-Scaling Actions:',
        '  - Pool size adjustment: SCHEDULED (+8 min)',
        '  - Cache optimization: SCHEDULED (+5 min)',
        '  - Load redistribution: SCHEDULED (+10 min)'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "SELECT * FROM users ORDER BY created_at DESC LIMIT 10;"',
      output: [
        'id | name      | email                 | created_at',
        '---+-----------+-----------------------+------------------------',
        ' 8 | Hannah    | hannah@example.com    | 2024-10-10 14:23:15',
        ' 7 | George    | george@example.com    | 2024-10-10 14:22:45',
        ' 6 | Fiona     | fiona@example.com     | 2024-10-10 14:21:30',
        ' 5 | Ethan     | ethan@example.com     | 2024-10-10 14:20:12',
        ' 4 | Diana     | diana@example.com     | 2024-10-10 14:19:55',
        ' 3 | Charlie   | charlie@example.com   | 2024-10-10 14:18:20',
        ' 2 | Bob       | bob@example.com       | 2024-10-10 14:17:10',
        ' 1 | Alice     | alice@example.com     | 2024-10-10 14:16:00',
        '(8 rows)',
        '',
        '[AI] Query pattern recognized: READ_RECENT_DATA',
        '[AI] Routed to optimized read replica: 127.0.0.1:5433',
        '[AI] Cache strategy: TEMPORAL_LOCALITY applied',
        '[AI] Execution time: 8.2ms (15% faster than baseline)'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 ai-optimize',
      output: [
        '[AI] Running intelligent optimization...',
        '[AI] Analyzing current workload patterns...',
        '[AI] Evaluating connection pool efficiency...',
        '',
        'Optimization Results:',
        '====================',
        'Connection Pool Adjustments:',
        '  - 127.0.0.1:5432: 25 → 28 connections (+12%)',
        '  - 127.0.0.1:5433: 25 → 32 connections (+28%)',
        '  - 127.0.0.1:5434: 25 → 22 connections (-12%)',
        '',
        'Query Cache Optimization:',
        '  - Cache size increased: 256MB → 384MB',
        '  - TTL adjusted for temporal patterns',
        '  - Prefetch enabled for Pattern A queries',
        '',
        'Load Balancing Weights:',
        '  - Read traffic: 45% → 5433, 35% → 5432, 20% → 5434',
        '  - Write traffic: 80% → 5432, 20% → 5433',
        '  - Analytics: 100% → 5434',
        '',
        '[AI] Optimization complete. Performance improvement: +22%'
      ]
    },
    {
      command: 'bctl -h 127.0.0.1 -p 8080 ai-learn',
      output: [
        'AI Learning & Training Status:',
        '==============================',
        'Learning Mode: ACTIVE',
        'Training Dataset: 2.4M queries (last 7 days)',
        '',
        'Model Performance:',
        '  Query Pattern Recognition:',
        '    - Accuracy: 94.7% (+2.1% from last week)',
        '    - Precision: 96.2%',
        '    - Recall: 93.8%',
        '',
        '  Connection Optimization:',
        '    - Efficiency gain: 97.2%',
        '    - Pool utilization: 89.4% (optimal range)',
        '    - Latency reduction: 31.5%',
        '',
        '  Predictive Scaling:',
        '    - Forecast accuracy: 91.8%',
        '    - False positives: 4.2%',
        '    - Resource waste reduction: 26.7%',
        '',
        'Recent Learning Updates:',
        '  - New query pattern identified: BULK_ANALYTICS',
        '  - Updated connection timeout predictions',
        '  - Improved weekend traffic forecasting',
        '',
        '[AI] Continuous learning active. Next model update in 2.3 hours.'
      ]
    }
  ], [])

  const getCommands = useCallback(() => {
    if (activeTab === 'build') return buildCommands
    if (activeTab === 'usage') return usageCommands
    return aiCommands
  }, [activeTab, buildCommands, usageCommands, aiCommands])

  // Cleanup all intervals and timeouts
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory, currentCommand])

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  // Type command effect with cleanup
  const typeCommand = useCallback((command: string, onComplete: () => void) => {
    setIsTyping(true)
    setCurrentCommand('')
    let index = 0
    
    const interval = setInterval(() => {
      index++
      setCurrentCommand(command.slice(0, index))
      
      if (index > command.length) {
        clearInterval(interval)
        setIsTyping(false)
        onComplete()
      }
    }, baseTimings.typeSpeed / speedMultiplier)
    
    intervalRef.current = interval
  }, [speedMultiplier, baseTimings])

  // Show output with delay and cleanup
  const showOutput = useCallback((output: string[], onComplete: () => void) => {
    let outputIndex = 0
    
    const interval = setInterval(() => {
      outputIndex++
      const currentOutput = output.slice(0, outputIndex)
      
      setCommandHistory(prev => {
        if (prev.length === 0) return prev
        return [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            output: currentOutput
          }
        ]
      })
      
      if (outputIndex >= output.length) {
        clearInterval(interval)
        onComplete()
      }
    }, baseTimings.outputDelay / speedMultiplier)
    
    intervalRef.current = interval
  }, [speedMultiplier, baseTimings])

  // Run demo sequence with proper cleanup
  const runDemo = useCallback(() => {
    if (isRunning) return
    
    cleanup()
    
    setIsRunning(true)
    setCommandHistory([])
    setCurrentCommand('')
    
    let commandIndex = 0
  const commands = getCommands()
    
    const runNextCommand = () => {
      if (commandIndex >= commands.length) {
        setIsRunning(false)
        cleanup()
        return
      }
      
      const cmd = commands[commandIndex]
      
      // Type the command first (no history entry yet for cleaner UX)
      typeCommand(cmd.command, () => {
        // After typing completes, add to history
        setCommandHistory(prev => [
          ...prev,
          {
            command: cmd.command,
            output: [],
            timestamp: new Date().toLocaleTimeString()
          }
        ])
        
        const timeout1 = setTimeout(() => {
          showOutput(cmd.output, () => {
            const timeout2 = setTimeout(() => {
              commandIndex++
              runNextCommand()
            }, baseTimings.betweenCommands / speedMultiplier)
            timeoutRefs.current.push(timeout2)
          })
        }, baseTimings.commandDelay / speedMultiplier)
        timeoutRefs.current.push(timeout1)
      })
    }
    
    runNextCommand()
  }, [isRunning, getCommands, typeCommand, showOutput, cleanup, speedMultiplier, baseTimings])

  const stopDemo = useCallback(() => {
    cleanup()
    setIsRunning(false)
    setCurrentCommand('')
    setIsTyping(false)
  }, [cleanup])

  const resetDemo = useCallback(() => {
    cleanup()
    setIsRunning(false)
    setCommandHistory([])
    setCurrentCommand('')
    setIsTyping(false)
  }, [cleanup])

  const copyToClipboard = useCallback(() => {
    const text = commandHistory
      .map(cmd => `$ ${cmd.command}\n${cmd.output.join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [commandHistory])

  return (
    <div className="bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4 font-mono">pgbalancer-demo</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={resetDemo}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Reset demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('build')}
            disabled={isRunning}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'build'
                ? 'bg-white text-gray-900 border border-gray-300'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-700 border border-transparent'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Building & Installation
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            disabled={isRunning}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'usage'
                ? 'bg-white text-gray-900 border border-gray-300'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-700 border border-transparent'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Usage & Operations
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            disabled={isRunning}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white border border-purple-500'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-purple-700 border border-transparent'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            🧠 AI Intelligence
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-[500px] overflow-y-auto p-4 font-mono text-sm bg-black text-secondary-400 text-left whitespace-pre"
      >
        {/* Command History */}
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="text-blue-400">
              $ {cmd.command}
            </div>
            {cmd.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-secondary-400 font-mono">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Current Command */}
        {isTyping && (
          <div className="text-blue-400">
            $ {currentCommand}
            <span className={`inline-block w-2 h-4 bg-secondary-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        )}

        {/* Prompt */}
        {!isRunning && (
          <div className="flex items-center">
            <span className="text-blue-400">$ </span>
            <span className={`inline-block w-2 h-4 bg-secondary-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        )}
      </div>

      {/* Terminal Controls */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={runDemo}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isRunning 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-secondary-600 hover:bg-secondary-700 text-white hover:scale-105'
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Demo'}
            </button>
            
            <button
              onClick={stopDemo}
              disabled={!isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                !isRunning 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
              }`}
            >
              <Square className="w-4 h-4" />
              Stop
            </button>

            <div className="flex items-center gap-2 ml-4">
              <span className="text-gray-400 text-sm">Speed:</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setSpeedMultiplier(speed)}
                    disabled={isRunning}
                    className={`px-2 py-1 rounded text-sm font-mono transition-all ${
                      speedMultiplier === speed
                        ? 'bg-secondary-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            {isRunning ? (
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                Demo Running ({speedMultiplier}x)
              </span>
            ) : (
              <span>Ready to run</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PgbalancerDemoTerminal
