'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const PgraftDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 100,
    commandDelay: 2000,
    outputDelay: 400,
    betweenCommands: 2000
  }

  // Pgraft-specific demo commands and their outputs
  const demoCommands = [
    {
      command: 'git clone https://github.com/pgelephant/pgraft.git && cd pgraft',
      output: [
        'Cloning into \'pgraft\'...',
        'remote: Enumerating objects: 1234, done.',
        'remote: Counting objects: 100% (1234/1234), done.',
        'remote: Compressing objects: 100% (789/789), done.',
        'remote: Total 1234 (delta 445), reused 1233 (delta 444)',
        'Receiving objects: 100% (1234/1234), done.',
        'Resolving deltas: 100% (445/445), done.'
      ]
    },
    {
      command: 'ls -R && make clean && make -j && sudo make install',
      output: [
        '.:',
        'ARCHITECTURE.md  Makefile         README.md        examples/        pgraft--1.0.sql  src/',
        'go.mod          pgraft.control    TUTORIAL.md      include/',
        '',
        './include:',
        'pgraft.h        raft.h           worker.h',
        '',
        './src:',
        'pgraft.c        raft.c           worker.c',
        'raft_helpers.c  raft_protocol.c  worker_queue.c',
        '',
        './examples:',
        'basic_cluster/  failover/        scale_out/',
        '',
        'Cleaning build files...',
        'rm -f pgraft.so',
        'rm -f src/*.o',
        '',
        'Building pgraft extension...',
        'CC src/pgraft.c',
        'CC src/raft.c',
        'CC src/raft_helpers.c',
        'CC src/raft_protocol.c',
        'CC src/worker.c',
        'CC src/worker_queue.c',
        'LINK pgraft.so',
        '',
        'Installing extension...',
        'cp pgraft.so /usr/local/pgsql/lib/',
        'cp pgraft.control /usr/local/pgsql/share/extension/',
        'cp pgraft--1.0.sql /usr/local/pgsql/share/extension/'
      ]
    },
    {
      command: 'cat postgresql.conf',
      output: [
        '# pgraft configuration',
        'shared_preload_libraries = \'pgraft\'',
        'pgraft.cluster_id = \'prod-cluster\'',
        'pgraft.node_id = 1',
        'pgraft.address = \'127.0.0.1\'',
        'pgraft.port = 7000                  # pgraft protocol port',
        'port = 5431                         # PostgreSQL port',
        'pgraft.election_timeout = 1000',
        'pgraft.heartbeat_interval = 100'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "CREATE EXTENSION pgraft;"',
      output: [
        'CREATE EXTENSION'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT pgraft_init();"',
      output: [
        'pgraft_init',
        '------------',
        't',
        '(1 row)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT pgraft_is_leader(), pgraft_get_term(), pgraft_get_leader();"',
      output: [
        'pgraft_is_leader | pgraft_get_term | pgraft_get_leader',
        '-----------------+----------------+------------------',
        't                |              1 |                1',
        '(1 row)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT pgraft_add_node(2, \'127.0.0.1\', 7001);"',
      output: [
        'pgraft_add_node',
        '----------------',
        't',
        '(1 row)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT pgraft_add_node(3, \'127.0.0.1\', 7002);"',
      output: [
        'pgraft_add_node',
        '----------------',
        't',
        '(1 row)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT * FROM pgraft_get_cluster_status();"',
      output: [
        'node_id | state    | leader_id | current_term | last_heartbeat',
        '--------+----------+-----------+--------------+---------------',
        '1       | leader   | 1         | 1            | 2025-10-02 10:30:15',
        '2       | follower | 1         | 1            | 2025-10-02 10:30:14',
        '3       | follower | 1         | 1            | 2025-10-02 10:30:13',
        '(3 rows)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT * FROM pgraft_get_nodes();"',
      output: [
        'node_id | address    | port | is_leader',
        '--------+------------+------+----------',
        '1       | 127.0.0.1  | 7000 | t',
        '2       | 127.0.0.1  | 7001 | f',
        '3       | 127.0.0.1  | 7002 | f',
        '(3 rows)'
      ]
    },
    // Log Replication Example
    {
      command: 'psql -p 5431 -d postgres -c "CREATE TABLE users (id serial primary key, name text);"',
      output: [
        'CREATE TABLE'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "INSERT INTO users (name) VALUES (\'alice\'), (\'bob\'), (\'charlie\');"',
      output: [
        'INSERT 0 3'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name',
        '---+----------',
        ' 1 | alice',
        ' 2 | bob',
        ' 3 | charlie',
        '(3 rows)'
      ]
    },
    {
      command: 'psql -p 5432 -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name',
        '---+----------',
        ' 1 | alice',
        ' 2 | bob',
        ' 3 | charlie',
        '(3 rows)',
        '',
        '-- Data replicated to follower node (5432)'
      ]
    },
    {
      command: 'psql -p 5431 -d postgres -c "SELECT log_index, command, committed FROM pgraft_get_log_entries();"',
      output: [
        'log_index | command                        | committed',
        '----------+-------------------------------+----------',
        '       10 | CREATE TABLE users ...         | t',
        '       11 | INSERT INTO users ...          | t',
        '(2 rows)',
        '',
        '-- Log entries on leader (5431)'
      ]
    },
    {
      command: 'psql -p 5432 -d postgres -c "SELECT log_index, command, committed FROM pgraft_get_log_entries();"',
      output: [
        'log_index | command                        | committed',
        '----------+-------------------------------+----------',
        '       10 | CREATE TABLE users ...         | t',
        '       11 | INSERT INTO users ...          | t',
        '(2 rows)',
        '',
        '-- Log entries on follower (5432)'
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
    
    const runNextCommand = () => {
      if (commandIndex >= demoCommands.length) {
        setIsRunning(false)
        return
      }
      
      const cmd = demoCommands[commandIndex]
      
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
        // Show output only (do not echo command again)
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
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4 font-mono">pgraft-demo</span>
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

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black text-secondary-400 text-left whitespace-pre"
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

export default PgraftDemoTerminal