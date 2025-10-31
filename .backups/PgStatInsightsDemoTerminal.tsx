'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Play, Square, RotateCcw, Copy } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const PgStatInsightsDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [activeTab, setActiveTab] = useState<'build' | 'usage'>('build')
  const terminalRef = useRef<HTMLDivElement>(null)

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 100,
    commandDelay: 2000,
    outputDelay: 400,
    betweenCommands: 2000
  }

  // pg_stat_insights-specific demo commands
  const buildCommands = [
    {
      command: 'git clone https://github.com/pgelephant/pg_stat_insights.git && cd pg_stat_insights',
      output: [
        'Cloning into \'pg_stat_insights\'...',
        'remote: Enumerating objects: 456, done.',
        'remote: Total 456 (delta 234), done.',
        'Receiving objects: 100% (456/456), done.',
        'Resolving deltas: 100% (234/234), done.'
      ]
    },
    {
      command: 'make clean && make && sudo make install',
      output: [
        'rm -f pg_stat_insights.so *.o',
        '',
        'Building pg_stat_insights extension (PostgreSQL 16-18)...',
        'gcc -Wall -Wmissing-prototypes -Wpointer-arith -fPIC',
        '    -c -o pg_stat_insights.o pg_stat_insights.c',
        'gcc -shared -o pg_stat_insights.so pg_stat_insights.o',
        '',
        'Installing extension...',
        'install pg_stat_insights.so /usr/lib/postgresql/17/lib/',
        'install pg_stat_insights.control /usr/share/postgresql/17/extension/',
        'install pg_stat_insights--1.0.sql /usr/share/postgresql/17/extension/',
        '',
        'pg_stat_insights installed successfully!'
      ]
    },
    {
      command: 'echo "shared_preload_libraries = \'pg_stat_insights\'" >> /etc/postgresql/17/main/postgresql.conf',
      output: [
        '-- Added to postgresql.conf',
        '-- Restart PostgreSQL for changes to take effect'
      ]
    },
    {
      command: 'sudo systemctl restart postgresql@17-main',
      output: [
        'Restarting PostgreSQL 17...',
        'PostgreSQL 17 restarted successfully'
      ]
    },
    {
      command: 'psql -d postgres -c "CREATE EXTENSION pg_stat_insights;"',
      output: [
        'CREATE EXTENSION',
        '',
        '-- pg_stat_insights v1.0 loaded',
        '-- 52 metrics across 11 views available'
      ]
    }
  ]

  const usageCommands = [
    {
      command: 'psql -d postgres -c "SELECT query, calls, total_exec_time, mean_exec_time FROM pg_stat_insights_top_by_time LIMIT 5;"',
      output: [
        ' query                              | calls | total_exec_time | mean_exec_time',
        '------------------------------------+-------+-----------------+---------------',
        ' SELECT * FROM orders WHERE status  |  1247 |        12456.78 |           9.99',
        ' UPDATE inventory SET quantity =    |   892 |         8934.12 |          10.02',
        ' SELECT COUNT(*) FROM events WHERE  |  2341 |         7823.45 |           3.34',
        ' INSERT INTO logs (timestamp, msg)  | 15678 |         6712.34 |           0.43',
        ' DELETE FROM temp_data WHERE date   |   234 |         3421.56 |          14.62',
        '(5 rows)'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT query, calls, cache_hit_ratio FROM pg_stat_insights_top_cache_misses LIMIT 5;"',
      output: [
        ' query                              | calls | cache_hit_ratio',
        '------------------------------------+-------+----------------',
        ' SELECT * FROM large_table WHERE id | 15234 |          45.23%',
        ' SELECT * FROM archived_orders      |  8923 |          52.17%',
        ' SELECT data FROM cold_storage      |  3421 |          38.91%',
        ' SELECT * FROM historical_events    |  7234 |          61.45%',
        ' SELECT logs FROM old_logs WHERE    |  2341 |          54.32%',
        '(5 rows)',
        '',
        '-- Low cache hit ratio indicates need for more shared_buffers'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT query, shared_blks_read, temp_blks_read, total_io FROM pg_stat_insights_top_by_io LIMIT 5;"',
      output: [
        ' query                         | shared_blks_read | temp_blks_read | total_io',
        '-------------------------------+------------------+----------------+---------',
        ' CREATE INDEX CONCURRENTLY ON  |        1234567 |        987654 |  2222221',
        ' SELECT * FROM events ORDER BY |         892345 |        123456 |  1015801',
        ' VACUUM ANALYZE large_table    |         567890 |              0 |   567890',
        ' SELECT DISTINCT user_id FROM  |         345678 |         98765 |   444443',
        ' SELECT COUNT(*) GROUP BY date |         234567 |         12345 |   246912',
        '(5 rows)',
        '',
        '-- High I/O queries—consider indexing or query optimization'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT * FROM pg_stat_insights_histogram_summary;"',
      output: [
        ' bucket_name | query_count | total_time | avg_time | percentage',
        '-------------+-------------+------------+----------+-----------',
        ' <1ms        |       45234 |   12.34 ms |  0.27 ms |     62.3%',
        ' 1-10ms      |       18923 |  123.45 ms |  6.52 ms |     26.1%',
        ' 10-100ms    |        5678 |  345.67 ms | 60.89 ms |      7.8%',
        ' 100ms-1s    |        1892 |  678.90 ms |358.59 ms |      2.6%',
        ' 1-10s       |         567 | 2345.67 ms |4138.18 ms |      0.8%',
        ' >10s        |         123 |12345.00 ms|100365.8 ms|      0.4%',
        '(6 rows)',
        '',
        '-- Response time distribution for SLA monitoring'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT * FROM pg_stat_insights_slow_queries LIMIT 3;"',
      output: [
        ' query                              | calls | mean_exec_time | total_exec_time',
        '------------------------------------+-------+----------------+----------------',
        ' SELECT * FROM orders WHERE status  |  1247 |         999.12 |       1245678.9',
        ' UPDATE inventory SET quantity =    |   892 |         567.23 |        505969.2',
        ' SELECT COUNT(*) FROM events WHERE  |  2341 |         234.56 |        549089.0',
        '(3 rows)',
        '',
        '-- Queries with mean_exec_time > 100ms'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT queryid, wal_records, wal_bytes, wal_fpi FROM pg_stat_insights WHERE wal_bytes > 0 ORDER BY wal_bytes DESC LIMIT 5;"',
      output: [
        ' queryid      | wal_records | wal_bytes  | wal_fpi',
        '--------------+-------------+------------+--------',
        ' 123456789012 |      234567 | 1234567890 |   12345',
        ' 234567890123 |      189234 |  987654321 |    8923',
        ' 345678901234 |      145678 |  765432109 |    5678',
        ' 456789012345 |       98765 |  543210987 |    3421',
        ' 567890123456 |       67890 |  432109876 |    2345',
        '(5 rows)',
        '',
        '-- WAL generation tracking for write-heavy queries'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT * FROM pg_stat_insights_replication;"',
      output: [
        ' pid   | usename  | application_name | client_addr | repl_state | write_lag_bytes | flush_lag_bytes',
        '-------+----------+------------------+-------------+------------+-----------------+----------------',
        ' 12345 | postgres | node2            | 10.0.1.12   | streaming  |          123456 |          98765',
        ' 12346 | postgres | node3            | 10.0.1.13   | streaming  |           98765 |          87654',
        '(2 rows)',
        '',
        '-- Replication lag monitoring across all standbys'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT count(*) as total_views, count(DISTINCT queryid) as unique_queries FROM pg_stat_insights;"',
      output: [
        ' total_views | unique_queries',
        '-------------+---------------',
        '       72456 |           1892',
        '(1 row)',
        '',
        '-- All 52 metrics tracked for 1,892 unique queries'
      ]
    }
  ]

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
  }, [commandHistory])

  // Type command effect
  const typeCommand = (command: string, onComplete: () => void) => {
    setIsTyping(true)
    let index = 0
    const interval = setInterval(() => {
      setCurrentCommand(command.slice(0, index))
      index++
      if (index > command.length) {
        clearInterval(interval)
        setIsTyping(false)
        onComplete()
      }
    }, baseTimings.typeSpeed / speedMultiplier)
  }

  // Show output with delay
  const showOutput = (output: string[], onComplete: () => void) => {
    let outputIndex = 0
    const interval = setInterval(() => {
      const currentOutput = output.slice(0, outputIndex + 1)
      setCommandHistory(prev => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          output: currentOutput
        }
      ])
      outputIndex++
      if (outputIndex >= output.length) {
        clearInterval(interval)
        onComplete()
      }
    }, baseTimings.outputDelay / speedMultiplier)
  }

  // Run demo sequence
  const runDemo = () => {
    if (isRunning) return
    
    setIsRunning(true)
    setCommandHistory([])
    setCurrentCommand('')
    
    let commandIndex = 0
    const commands = activeTab === 'build' ? buildCommands : usageCommands
    
    const runNextCommand = () => {
      if (commandIndex >= commands.length) {
        setIsRunning(false)
        return
      }
      
      const cmd = commands[commandIndex]
      
      // Add command to history
      setCommandHistory(prev => [
        ...prev,
        {
          command: cmd.command,
          output: [],
          timestamp: new Date().toLocaleTimeString()
        }
      ])
      
      // Type the command
      typeCommand(cmd.command, () => {
        setTimeout(() => {
          showOutput(cmd.output, () => {
            commandIndex++
            setTimeout(runNextCommand, baseTimings.betweenCommands / speedMultiplier)
          })
        }, baseTimings.commandDelay / speedMultiplier)
      })
    }
    
    runNextCommand()
  }

  const stopDemo = () => {
    setIsRunning(false)
    setCurrentCommand('')
  }

  const resetDemo = () => {
    setIsRunning(false)
    setCommandHistory([])
    setCurrentCommand('')
    setActiveTab('build')
  }

  const copyToClipboard = () => {
    const text = commandHistory
      .map(cmd => `$ ${cmd.command}\n${cmd.output.join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
            <span className="text-gray-300 text-sm ml-4 font-mono">pg_stat_insights-demo</span>
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
            Installation
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
            52 Metrics & 11 Views
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

export default PgStatInsightsDemoTerminal

