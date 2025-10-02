'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Database, Activity, Users } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const RaleDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 90,
    commandDelay: 1600,
    outputDelay: 350,
    betweenCommands: 2000
  }

  // RALE-specific demo commands and their outputs
  const demoCommands = [
    {
      command: 'raled --config conf/raled1.conf',
      output: [
        '[INFO] RALE daemon starting...',
        '[INFO] Node ID: 1, Name: node1',
        '[INFO] RALE port: 7400, DStore port: 7401',
        '[INFO] Data directory: ./data',
        '[INFO] Consensus initialized',
        '[INFO] Distributed store ready',
        '[INFO] Listening on 127.0.0.1:7400',
        '[INFO] Cluster ready'
      ]
    },
    {
      command: 'raled --config conf/raled2.conf &',
      output: [
        '[INFO] RALE daemon starting...',
        '[INFO] Node ID: 2, Name: node2',
        '[INFO] RALE port: 7402, DStore port: 7403',
        '[INFO] Data directory: ./data2',
        '[INFO] Consensus initialized',
        '[INFO] Connecting to leader...',
        '[INFO] Follower role established',
        '[INFO] Cluster ready'
      ]
    },
    {
      command: 'raled --config conf/raled3.conf &',
      output: [
        '[INFO] RALE daemon starting...',
        '[INFO] Node ID: 3, Name: node3',
        '[INFO] RALE port: 7404, DStore port: 7405',
        '[INFO] Data directory: ./data3',
        '[INFO] Consensus initialized',
        '[INFO] Connecting to leader...',
        '[INFO] Follower role established',
        '[INFO] Cluster ready'
      ]
    },
    {
      command: 'ralectrl STATUS',
      output: [
        'Cluster State: Healthy',
        'Leader: node1 (127.0.0.1:7400)',
        'Term: 15',
        'Nodes: 3',
        '  - node1 (Leader)',
        '  - node2 (Follower)',
        '  - node3 (Follower)',
        '',
        'Consensus: ACTIVE',
        'Log replication: HEALTHY'
      ]
    },
    {
      command: 'ralectrl ADD --node-id 4 --node-name "node4"',
      output: [
        'Adding node4 to cluster...',
        'Node node4 added to cluster',
        'Cluster size: 4 nodes',
        'Starting replication to new node...',
        'Node4 is now following leader',
        '',
        'Cluster expansion completed successfully'
      ]
    },
    {
      command: 'ralectrl LIST',
      output: [
        'Node ID | Name  | IP         | RALE Port | DStore Port',
        '--------|-------|------------|-----------|------------',
        '       1 | node1 | 127.0.0.1  | 7400      | 7401',
        '       2 | node2 | 127.0.0.1  | 7402      | 7403',
        '       3 | node3 | 127.0.0.1  | 7404      | 7405',
        '       4 | node4 | 127.0.0.1  | 7406      | 7407'
      ]
    },
    {
      command: './benchmark_tool',
      output: [
        'RALE Performance Benchmark',
        '==========================',
        'Consensus Operations: 1000 ops/sec',
        'Storage Operations: 10000 ops/sec',
        'Write Latency: <10ms',
        'Read Latency: <1ms',
        '',
        'Memory Usage: 45MB',
        'CPU Usage: 12%',
        'Network I/O: 2.3MB/s'
      ]
    },
    {
      command: 'librale_dstore_put("key1", "value1", 6)',
      output: [
        'Success: Entry stored at index 1024',
        'Replication status: COMPLETED',
        'Consensus term: 15',
        'Commit index: 1025'
      ]
    },
    {
      command: 'librale_dstore_get("key1", buffer, &len)',
      output: [
        'Success: Retrieved "value1" (6 bytes)',
        'Read from: Leader node',
        'Consistency: Strong',
        'Latency: 0.8ms'
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
    <div className="bg-black rounded-lg border border-white/30 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-white/20 px-4 py-3 flex items-center justify-between border-b border-white/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4 font-mono">rale-demo</span>
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

export default RaleDemoTerminal
