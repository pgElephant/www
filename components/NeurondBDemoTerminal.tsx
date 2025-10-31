'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const NeurondBDemoTerminal = () => {
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

  // NeurondB-specific demo commands and their outputs
  const buildCommands = [
    {
      command: 'git clone https://github.com/pgelephant/neurondb.git && cd neurondb',
      output: [
        'Cloning into \'neurondb\'...',
        'remote: Enumerating objects: 2345, done.',
        'remote: Counting objects: 100% (2345/2345), done.',
        'remote: Compressing objects: 100% (1234/1234), done.',
        'remote: Total 2345 (delta 567), reused 2344 (delta 566)',
        'Receiving objects: 100% (2345/2345), done.',
        'Resolving deltas: 100% (567/567), done.'
      ]
    },
    {
      command: 'ls -R && make clean && make -j && sudo make install',
      output: [
        '.:',
        'Makefile         README.md        neurondb--1.0.sql  include/        src/',
        'neurondb.control FEATURE.md       sql/               expected/       t/',
        '',
        './include:',
        'neurondb.h              neurondb_bgworkers.h',
        'distance.h              index_hnsw.h',
        '',
        './src:',
        'neurondb.c              distance.c              quantization.c',
        'ml_inference.c          hybrid_search.c         vector_ops.c',
        'bgworker_queue.c        bgworker_tuner.c        bgworker_defrag.c',
        '',
        'Cleaning build files...',
        'rm -f neurondb.so',
        'rm -f src/*.o',
        '',
        'Building NeurondB extension...',
        'CC src/neurondb.c',
        'CC src/distance.c',
        'CC src/quantization.c',
        'CC src/ml_inference.c',
        'CC src/hybrid_search.c',
        'CC src/vector_ops.c',
        'CC src/bgworker_queue.c',
        'CC src/bgworker_tuner.c',
        'CC src/bgworker_defrag.c',
        'LINK neurondb.so',
        '',
        'Installing extension...',
        'cp neurondb.so /usr/local/pgsql/lib/',
        'cp neurondb.control /usr/local/pgsql/share/extension/',
        'cp neurondb--1.0.sql /usr/local/pgsql/share/extension/'
      ]
    },
    {
      command: 'cat postgresql.conf',
      output: [
        '# NeurondB configuration',
        'shared_preload_libraries = \'neurondb\'',
        '',
        '# Background workers',
        'neurondb.neuranq_enabled = on           # Queue executor',
        'neurondb.neuranmon_enabled = on         # Auto-tuner',
        'neurondb.neurandefrag_enabled = on      # Index maintenance',
        '',
        '# Performance tuning',
        'neurondb.ef_search = 40                 # HNSW search quality',
        'neurondb.m = 16                         # HNSW connections per node'
      ]
    },
    {
      command: 'psql -d mydb -c "CREATE EXTENSION neurondb;"',
      output: [
        'CREATE EXTENSION'
      ]
    }
  ]

  const usageCommands = [
    {
      command: 'psql -d mydb -c "CREATE EXTENSION neurondb;"',
      output: [
        'CREATE EXTENSION',
        '-- Extension loaded with 100+ SQL functions'
      ]
    },
    {
      command: 'psql -d mydb -c "CREATE TABLE docs (id SERIAL, content TEXT, embedding vector(384));"',
      output: [
        'CREATE TABLE'
      ]
    },
    {
      command: 'psql -d mydb -c "INSERT INTO docs VALUES (1, \'AI overview\', embed_text(\'AI overview\'));"',
      output: [
        'INSERT 0 1',
        '-- Automatic embedding generation'
      ]
    },
    {
      command: 'psql -d mydb -c "CREATE INDEX ON docs USING hnsw (embedding vector_l2_ops);"',
      output: [
        'CREATE INDEX',
        '-- HNSW index for fast vector search'
      ]
    },
    {
      command: 'psql -d mydb -c "SELECT * FROM hybrid_search(\'docs\', \'content\', \'embedding\', \'AI database\', 5);"',
      output: [
        'id | content     | similarity | hybrid_score',
        '---+-------------+------------+-------------',
        ' 1 | AI overview | 0.95       | 0.92',
        '(1 row)',
        '',
        '-- Hybrid search combines vector + text search'
      ]
    },
    {
      command: 'psql -d mydb -c "SELECT * FROM generate_embeddings(\'SELECT content FROM docs\', \'all-MiniLM-L6-v2\');"',
      output: [
        'embedding_id | model           | dimensions',
        '-------------+-----------------+-----------',
        '          1  | all-MiniLM-L6-v2| 384',
        '(1 row)',
        '',
        '-- ML inference with ONNX runtime'
      ]
    },
    {
      command: 'psql -d mydb -c "SELECT * FROM neurondb_index_stats WHERE index_name = \'docs_embedding_idx\';"',
      output: [
        'index_name          | vectors | levels | ef_construction | recall@10',
        '-------------------+---------+--------+----------------+----------',
        'docs_embedding_idx | 1       | 1      | 200            | 0.99',
        '(1 row)',
        '',
        '-- Index statistics and quality metrics'
      ]
    },
    {
      command: 'psql -d mydb -c "SELECT * FROM neurondb_worker_status();"',
      output: [
        'worker_name  | status  | last_run            | jobs_processed',
        '-------------+---------+--------------------+---------------',
        'neuranq      | running | 2025-10-31 12:30:00| 42',
        'neuranmon    | running | 2025-10-31 12:29:55| 15',
        'neurandefrag | running | 2025-10-31 12:25:00| 3',
        '(3 rows)',
        '',
        '-- Background worker monitoring'
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
            <span className="text-gray-300 text-sm ml-4 font-mono">neurondb-demo</span>
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

export default NeurondBDemoTerminal

