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
  const terminalRef = useRef<HTMLDivElement>(null)

  // Pgraft-specific demo commands and their outputs
  const demoCommands = [
    {
      command: 'make && make install',
      output: [
        'Building pgraft...',
        'CC pgraft.o',
        'CC worker.o',
        'CC raft_integration.o',
        'LINK pgraft.so',
        '✓ Build successful',
        'Installing pgraft...',
        '✓ Extension installed to PostgreSQL'
      ]
    },
    {
      command: 'psql -d postgres -c "CREATE EXTENSION pgraft;"',
      output: [
        'CREATE EXTENSION',
        '✓ pgraft extension created'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT pgraft_init();"',
      output: [
        ' pgraft_init ',
        '------------',
        ' t',
        '(1 row)',
        '',
        '✓ pgraft initialized successfully'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT pgraft_get_cluster_status();"',
      output: [
        ' node_id | state  | leader_id | current_term | last_heartbeat ',
        '---------+--------+-----------+--------------+----------------',
        '       1 | leader |         1 |            1 | now()',
        '(1 row)',
        '',
        'Initial cluster state: Single node, Term 1'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT pgraft_add_node(2, \'127.0.0.1\', 7002);"',
      output: [
        ' pgraft_add_node ',
        '----------------',
        ' t',
        '(1 row)',
        '',
        '✓ Node 2 added to cluster'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT * FROM pgraft_cluster_status();"',
      output: [
        ' node_id | state    | leader_id | current_term | last_heartbeat ',
        '---------+----------+-----------+--------------+----------------',
        '       1 | leader   |         1 |            1 | now()',
        '       2 | follower |         1 |            1 | now()',
        '(2 rows)',
        '',
        'Cluster Status: HEALTHY'
      ]
    },
    {
      command: 'psql -d postgres -c "SELECT pgraft_is_leader();"',
      output: [
        ' pgraft_is_leader ',
        '-----------------',
        ' t',
        '(1 row)',
        '',
        'Current node is the leader'
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
    }, 50)
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
    }, 200)
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
        // Execute command (show prompt)
        setCommandHistory(prev => [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            output: ['$ ' + cmd.command, '']
          }
        ])
        
        // Show output
        setTimeout(() => {
          showOutput(cmd.output, () => {
            commandIndex++
            setTimeout(runNextCommand, 1000) // Pause between commands
          })
        }, 500)
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
  )
}

export default PgraftDemoTerminal