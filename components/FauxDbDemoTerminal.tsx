'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
  terminal: 'mongosh' | 'fauxdb-proxy' | 'postgresql' | 'postgresql.log'
}

const FauxDbDemoTerminal = () => {
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
    betweenCommands: 2000
  }

  // FauxDB-specific demo commands and their outputs
  const demoCommands = [
    {
      terminal: 'mongosh' as const,
      command: 'db.users.insertOne({ name: "Alice", age: 27 })',
      output: [
        '{ acknowledged: true, insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8") }'
      ]
    },
    {
      terminal: 'fauxdb-proxy' as const,
      command: 'Query Translation',
      output: [
        '[INFO] MongoDB wire protocol request received',
        '[TRANSLATE] insertOne() → INSERT INTO users (name, age) VALUES (\'Alice\', 27)',
        '[INFO] Query translation completed',
        '[INFO] Forwarding to PostgreSQL backend'
      ]
    },
    {
      terminal: 'postgresql' as const,
      command: 'INSERT INTO users (name, age) VALUES (\'Alice\', 27);',
      output: [
        'INSERT 0 1'
      ]
    },
    {
      terminal: 'postgresql.log' as const,
      command: 'Log Entry',
      output: [
        '2025-10-01 10:30:15.125 UTC [1234] LOG:  statement: INSERT INTO users (name, age) VALUES (\'Alice\', 27);'
      ]
    },
    {
      terminal: 'mongosh' as const,
      command: 'db.users.find({ age: { $gt: 20 } })',
      output: [
        '[',
        '  { _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"), name: "Alice", age: 27 }',
        ']'
      ]
    },
    {
      terminal: 'fauxdb-proxy' as const,
      command: 'Query Translation',
      output: [
        '[INFO] MongoDB wire protocol request received',
        '[TRANSLATE] find({age: {$gt: 20}}) → SELECT * FROM users WHERE age > 20',
        '[INFO] Query translation completed',
        '[INFO] Forwarding to PostgreSQL backend'
      ]
    },
    {
      terminal: 'postgresql' as const,
      command: 'SELECT * FROM users WHERE age > 20;',
      output: [
        ' id |  name  | age ',
        '----+--------+-----',
        '  1 | Alice  |  27 ',
        '(1 row)'
      ]
    },
    {
      terminal: 'postgresql.log' as const,
      command: 'Log Entry',
      output: [
        '2025-10-01 10:30:15.126 UTC [1234] LOG:  statement: SELECT * FROM users WHERE age > 20;'
      ]
    },
    {
      terminal: 'mongosh' as const,
      command: 'db.stats()',
      output: [
        '{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }'
      ]
    },
    {
      terminal: 'fauxdb-proxy' as const,
      command: 'Query Translation',
      output: [
        '[INFO] MongoDB wire protocol request received',
        '[TRANSLATE] stats() → SELECT COUNT(*) FROM users; SELECT pg_total_relation_size(\'users\')',
        '[INFO] Query translation completed',
        '[INFO] Forwarding to PostgreSQL backend'
      ]
    },
    {
      terminal: 'postgresql' as const,
      command: 'SELECT COUNT(*) FROM users;',
      output: [
        ' count ',
        '-------',
        '     1 ',
        '(1 row)'
      ]
    },
    {
      terminal: 'postgresql.log' as const,
      command: 'Log Entry',
      output: [
        '2025-10-01 10:30:15.127 UTC [1234] LOG:  statement: SELECT COUNT(*) FROM users;'
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
          timestamp: new Date().toLocaleTimeString(),
          terminal: cmd.terminal
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
      .map(cmd => `${cmd.terminal}: $ ${cmd.command}\n${cmd.output.join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
  }

  const getTerminalColor = (terminal: string) => {
    switch (terminal) {
      case 'mongosh': return 'text-green-400'
      case 'fauxdb-proxy': return 'text-cyan-400'
      case 'postgresql': return 'text-yellow-400'
      case 'postgresql.log': return 'text-purple-400'
      default: return 'text-white'
    }
  }

  return (
    <div className="bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4 font-mono">fauxdb-demo</span>
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
        className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black text-left"
      >
        {/* Command History */}
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className={`${getTerminalColor(cmd.terminal)} flex items-center gap-2`}>
              <span className="text-xs opacity-70">[{cmd.terminal}]</span>
              <span>$ {cmd.command}</span>
            </div>
            {cmd.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-gray-300 font-mono text-left">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Current Command */}
        {isTyping && (
          <div className={`${getTerminalColor(commandHistory[commandHistory.length - 1]?.terminal || 'mongosh')} flex items-center gap-2`}>
            <span className="text-xs opacity-70">[{commandHistory[commandHistory.length - 1]?.terminal || 'mongosh'}]</span>
            <span>$ {currentCommand}</span>
            <span className={`inline-block w-2 h-4 bg-gray-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        )}

        {/* Prompt */}
        {!isRunning && (
          <div className="flex items-center">
            <span className="text-green-400">[mongosh] $ </span>
            <span className={`inline-block w-2 h-4 bg-gray-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
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
                  : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
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
                        ? 'bg-green-600 text-white'
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
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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

export default FauxDbDemoTerminal
