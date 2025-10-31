'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Check, Download } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const LiveDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Demo commands and their outputs
  const demoCommands = [
    {
      command: './run.sh init',
      output: [
        'Starting pgraft cluster initialization...',
        '✓ Node 1 (primary1): Starting on port 7001',
        '✓ Node 2 (replica1): Starting on port 7002', 
        '✓ Node 3 (replica2): Starting on port 7003',
        '✓ All nodes started successfully',
        'Waiting for cluster to stabilize...',
        '✓ Cluster initialization complete!'
      ]
    },
    {
      command: 'psql -h localhost -p 7001 -d postgres -c "SELECT pgraft_get_leader();"',
      output: [
        ' pgraft_get_leader ',
        '------------------',
        '                1 ',
        '(1 row)',
        '',
        'Leader: Node 1 (Term 2)'
      ]
    },
    {
      command: 'psql -h localhost -p 7002 -d postgres -c "SELECT pgraft_get_term();"',
      output: [
        ' pgraft_get_term ',
        '----------------',
        '              2 ',
        '(1 row)',
        '',
        'Current Term: 2'
      ]
    },
    {
      command: 'psql -h localhost -p 7001 -d postgres -c "SELECT * FROM pgraft_cluster_status();"',
      output: [
        ' node_id | state    | leader_id | current_term | last_heartbeat ',
        '---------+----------+-----------+--------------+----------------',
        '       1 | leader   |         1 |            2 | 2024-01-15 10:30:15',
        '       2 | follower |         1 |            2 | 2024-01-15 10:30:14',
        '       3 | follower |         1 |            2 | 2024-01-15 10:30:13',
        '(3 rows)',
        '',
        'Cluster Status: HEALTHY - All nodes synchronized'
      ]
    },
    {
      command: './run.sh stop primary1',
      output: [
        'Stopping primary node (leader)...',
        '✓ Node 1 stopped',
        'Triggering leader election...',
        '✓ New leader elected: Node 2',
        'Cluster continues with 2 nodes'
      ]
    },
    {
      command: 'psql -h localhost -p 7002 -d postgres -c "SELECT pgraft_get_leader();"',
      output: [
        ' pgraft_get_leader ',
        '------------------',
        '                2 ',
        '(1 row)',
        '',
        'New Leader: Node 2 (Term 3)'
      ]
    },
    {
      command: './run.sh start primary1',
      output: [
        'Starting primary node...',
        '✓ Node 1 rejoined cluster',
        '✓ Node 1 synchronized to current term (3)',
        '✓ Node 1 is now follower',
        'Cluster fully operational with 3 nodes'
      ]
    }
  ]

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
    }, 50)
    
    intervalRef.current = interval
  }, [])

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
    }, 200)
    
    intervalRef.current = interval
  }, [])

  // Run demo sequence with proper cleanup
  const runDemo = useCallback(() => {
    if (isRunning) return
    
    cleanup()
    
    setIsRunning(true)
    setCommandHistory([])
    setCurrentCommand('')
    
    let commandIndex = 0
    
    const runNextCommand = () => {
      if (commandIndex >= demoCommands.length) {
        setIsRunning(false)
        cleanup()
        return
      }
      
      const cmd = demoCommands[commandIndex]
      
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
            }, 1000)
            timeoutRefs.current.push(timeout2)
          })
        }, 500)
        timeoutRefs.current.push(timeout1)
      })
    }
    
    runNextCommand()
  }, [isRunning, demoCommands, typeCommand, showOutput, cleanup])

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
    <section className="section-padding bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      <div className="container-extra-wide">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-accent-400/10 to-secondary-400/10 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-secondary-300/30 rounded-full text-sm font-semibold text-secondary-200 mb-6 ">
            <Terminal className="w-4 h-4" />
            Live Demo Terminal
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Try pgraft
            </span>
            <br />
            <span className="text-secondary-300">
              Live in Your Browser
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Watch pgraft in action with real commands and responses. See leader election, failover, and cluster management.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-black rounded-lg  border border-white/30 overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-white/20 px-4 py-3 flex items-center justify-between border-b border-white/30">
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
              className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black text-secondary-400"
            >
              {/* Command History */}
              {commandHistory.map((cmd, index) => (
                <div key={index} className="mb-2">
                  <div className="text-blue-400 mb-1">
                    <span className="text-gray-500">[{cmd.timestamp}]</span> $ {cmd.command}
                  </div>
                  <div className="ml-4">
                    {cmd.output.map((line, lineIndex) => (
                      <div key={lineIndex} className="text-secondary-400">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Current Command */}
              {isTyping && (
                <div className="text-blue-400 mb-2">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> $ {currentCommand}
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
                </div>

                <div className="text-gray-400 text-sm">
                  {isRunning ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                      Demo Running
                    </span>
                  ) : (
                    <span>Ready to run</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Description */}
        <div className="mt-12 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/30/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              What This Demo Shows
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-secondary-400 mb-2">Cluster Initialization</h4>
                <p className="text-sm text-gray-300">Watch as pgraft starts a 3-node cluster with automatic leader election.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-primary-400 mb-2">Failover & Recovery</h4>
                <p className="text-sm text-gray-300">See how the cluster handles leader failure and automatic recovery.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-accent-400 mb-2">Real-time Status</h4>
                <p className="text-sm text-gray-300">Monitor cluster health, terms, and node synchronization.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveDemoTerminal
