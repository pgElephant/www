'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Server, Activity, Users } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const RamDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 80,
    commandDelay: 1500,
    outputDelay: 300,
    betweenCommands: 1800
  }

  // RAM-specific demo commands and their outputs
  const demoCommands = [
    {
      command: 'ramd start --config /etc/ram/ramd.conf',
      output: [
        '[INFO] RAMD daemon starting...',
        '[INFO] PostgreSQL connection established',
        '[INFO] pgraft extension loaded',
        '[INFO] Raft consensus initialized',
        '[INFO] HTTP API listening on :8080',
        '[INFO] Prometheus metrics on :9090',
        '[INFO] Cluster health check: PASS',
        '[INFO] Ready to serve requests',
        '',
        'RAM daemon started successfully'
      ]
    },
    {
      command: 'psql -c "SELECT * FROM pgraft_status();"',
      output: [
        ' node_id | role    | term | commit_index',
        '---------+---------+------+-------------',
        '       1 | leader  |   15 |         1024',
        '       2 | follower|   15 |         1024',
        '       3 | follower|   15 |         1024',
        '(3 rows)'
      ]
    },
    {
      command: 'ramctrl status',
      output: [
        'Cluster State: Healthy',
        'Leader: node1 (192.168.1.10:5432)',
        'Followers: 2',
        '  - node2 (192.168.1.11:5432)',
        '  - node3 (192.168.1.12:5432)',
        '',
        'RAM daemon status: ACTIVE',
        'Health checks: PASSING',
        'Last failover: Never'
      ]
    },
    {
      command: 'psql -c "CREATE TABLE users (id serial primary key, name text);"',
      output: [
        'CREATE TABLE',
        '',
        '-- Table created on leader, will be replicated via pgraft'
      ]
    },
    {
      command: 'psql -c "INSERT INTO users (name) VALUES (\'alice\'), (\'bob\'), (\'charlie\');"',
      output: [
        'INSERT 0 3',
        '',
        '-- Data inserted on leader, replicated to followers'
      ]
    },
    {
      command: 'psql -c "SELECT * FROM users;"',
      output: [
        ' id |  name',
        '----+----------',
        '  1 | alice',
        '  2 | bob',
        '  3 | charlie',
        '(3 rows)'
      ]
    },
    {
      command: 'curl http://localhost:8080/health',
      output: [
        '{',
        '  "status": "healthy",',
        '  "leader": "node1",',
        '  "nodes": 3,',
        '  "uptime": "2h 15m 30s",',
        '  "last_heartbeat": "2025-10-01T10:30:15Z"',
        '}'
      ]
    },
    {
      command: 'ramctrl failover',
      output: [
        'Initiating failover...',
        'Checking cluster health...',
        'Selecting new leader...',
        'New Leader: node2',
        'Updating routing tables...',
        'Failover completed in 1.2s',
        '',
        'Cluster is now healthy with new leader'
      ]
    },
    {
      command: 'psql -c "SELECT * FROM pgraft_status();"',
      output: [
        ' node_id | role    | term | commit_index',
        '---------+---------+------+-------------',
        '       1 | follower|   16 |         1025',
        '       2 | leader  |   16 |         1025',
        '       3 | follower|   16 |         1025',
        '(3 rows)',
        '',
        '-- Leader changed from node1 to node2 after failover'
      ]
    },
    {
      command: 'psql -c "SELECT * FROM users;"',
      output: [
        ' id |  name',
        '----+----------',
        '  1 | alice',
        '  2 | bob',
        '  3 | charlie',
        '(3 rows)',
        '',
        '-- Data still available on new leader'
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
    <div className="bg-black rounded-lg  border border-white/30 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-white/20 px-4 py-3 flex items-center justify-between border-b border-white/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4 font-mono">ram-demo</span>
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
      <div className="bg-white/20 px-4 py-3 border-t border-white/30">
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

export default RamDemoTerminal
