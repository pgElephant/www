'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy } from 'lucide-react'

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
    typeSpeed: 100,
    commandDelay: 2000,
    outputDelay: 400,
    betweenCommands: 2000
  }

  // RALE-specific demo commands and their outputs
  const demoCommands = [
    {
      command: 'git clone https://github.com/pgelephant/rale.git && cd rale',
      output: [
        'Cloning into \'rale\'...',
        'remote: Enumerating objects: 3456, done.',
        'remote: Counting objects: 100% (3456/3456), done.',
        'remote: Compressing objects: 100% (1890/1890), done.',
        'remote: Total 3456 (delta 1234), reused 3200 (delta 1100)',
        'Receiving objects: 100% (3456/3456), done.',
        'Resolving deltas: 100% (1234/1234), done.'
      ]
    },
    {
      command: 'ls -la && ./configure --prefix=/usr/local/rale && make -j && sudo make install',
      output: [
        'total 156',
        'drwxr-xr-x  15 user user  4096 Oct 15 10:30 .',
        'drwxr-xr-x   3 user user  4096 Oct 15 10:30 ..',
        '-rw-r--r--   1 user user  1234 Oct 15 10:30 README.md',
        '-rw-r--r--   1 user user  5678 Oct 15 10:30 configure.ac',
        'drwxr-xr-x   8 user user  4096 Oct 15 10:30 src',
        'drwxr-xr-x   6 user user  4096 Oct 15 10:30 conf',
        'drwxr-xr-x   4 user user  4096 Oct 15 10:30 doc',
        '',
        'checking for gcc... gcc',
        'checking whether the C compiler works... yes',
        'checking for libraft... yes',
        'checking for PostgreSQL development headers... yes',
        'configure: creating ./config.status',
        'config.status: creating Makefile',
        '',
        'Building RALE distributed log engine...',
        'CC src/raled/raled_main.c',
        'CC src/raled/raled_raft.c',
        'CC src/raled/raled_storage.c',
        'CC src/raled/raled_replication.c',
        'CC src/raled/raled_wal.c',
        'CC src/ralectrl/ralectrl.c',
        'CC src/ralectrl/ralectrl_cluster.c',
        'LINK raled',
        'LINK ralectrl',
        '',
        'Installing RALE...',
        'cp raled /usr/local/rale/bin/',
        'cp ralectrl /usr/local/rale/bin/',
        'cp conf/rale.conf.example /usr/local/rale/etc/rale.conf'
      ]
    },
    {
      command: 'sudo systemctl start postgresql@16-main',
      output: [
        'Starting PostgreSQL cluster 16-main...',
        ' * Starting PostgreSQL 16 database server',
        '   ...done.'
      ]
    },
    {
      command: 'sudo systemctl start postgresql@17-main',
      output: [
        'Starting PostgreSQL cluster 17-main...',
        ' * Starting PostgreSQL 17 database server',
        '   ...done.'
      ]
    },
    {
      command: 'sudo systemctl start postgresql@18-main',
      output: [
        'Starting PostgreSQL cluster 18-main...',
        ' * Starting PostgreSQL 18 database server',
        '   ...done.'
      ]
    },
    {
      command: 'cat /usr/local/rale/etc/rale.conf',
      output: [
        '# RALE Configuration',
        'listen_addresses = \'0.0.0.0\'',
        'port = 7000',
        'data_dir = \'/var/lib/rale\'',
        'log_level = \'info\'',
        '',
        '# Cluster configuration',
        'cluster_id = \'rale-cluster\'',
        'node_id = 1',
        '',
        '# Raft configuration',
        'election_timeout = 1000',
        'heartbeat_interval = 100',
        'snapshot_threshold = 1000',
        'max_snapshot_size = 1048576',
        '',
        '# PostgreSQL integration',
        'postgresql_host = \'127.0.0.1\'',
        'postgresql_port = 5432',
        'postgresql_user = \'postgres\'',
        'postgresql_password = \'postgres\'',
        'postgresql_database = \'postgres\'',
        '',
        '# WAL configuration',
        'wal_buffer_size = 8192',
        'wal_flush_interval = 100',
        'wal_sync_method = \'fsync\''
      ]
    },
    {
      command: '/usr/local/rale/bin/raled -c /usr/local/rale/etc/rale.conf -d',
      output: [
        '[INFO] Starting RALE daemon...',
        '[INFO] RALE daemon started (PID: 23456)',
        '[INFO] Listening on 0.0.0.0:7000',
        '[INFO] Data directory: /var/lib/rale',
        '[INFO] Cluster ID: rale-cluster',
        '[INFO] Node ID: 1',
        '[INFO] Raft state: Candidate',
        '[INFO] Starting leader election...',
        '[INFO] Raft state: Leader',
        '[INFO] WAL engine initialized',
        '[INFO] PostgreSQL integration ready'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 status',
      output: [
        'RALE Cluster Status:',
        '===================',
        'Cluster ID: rale-cluster',
        'Node ID: 1',
        'State: Leader',
        'Term: 1',
        'Commit Index: 0',
        'Last Log Index: 0',
        'Peers: 0',
        'WAL Entries: 0',
        'Uptime: 00:00:15'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 add-peer 2 127.0.0.1 7001',
      output: [
        '[INFO] Adding peer node 2 (127.0.0.1:7001)...',
        '[INFO] Peer node 2 added successfully'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 add-peer 3 127.0.0.1 7002',
      output: [
        '[INFO] Adding peer node 3 (127.0.0.1:7002)...',
        '[INFO] Peer node 3 added successfully'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 status',
      output: [
        'RALE Cluster Status:',
        '===================',
        'Cluster ID: rale-cluster',
        'Node ID: 1',
        'State: Leader',
        'Term: 1',
        'Commit Index: 0',
        'Last Log Index: 0',
        'Peers: 2',
        '  - Node 2: 127.0.0.1:7001 (Follower)',
        '  - Node 3: 127.0.0.1:7002 (Follower)',
        'WAL Entries: 0',
        'Uptime: 00:00:45'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 append-log "CREATE TABLE users (id serial primary key, name text);"',
      output: [
        '[INFO] Appending log entry...',
        '[INFO] Log entry appended at index: 1',
        '[INFO] Replicating to 2 followers...',
        '[INFO] Entry committed to majority (3/3 nodes)',
        'Log Index: 1',
        'Entry: CREATE TABLE users (id serial primary key, name text);',
        'Status: Committed'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 append-log "INSERT INTO users (name) VALUES (\'Alice\'), (\'Bob\');"',
      output: [
        '[INFO] Appending log entry...',
        '[INFO] Log entry appended at index: 2',
        '[INFO] Replicating to 2 followers...',
        '[INFO] Entry committed to majority (3/3 nodes)',
        'Log Index: 2',
        'Entry: INSERT INTO users (name) VALUES (\'Alice\'), (\'Bob\');',
        'Status: Committed'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 append-log "UPDATE users SET name = \'Alice Smith\' WHERE name = \'Alice\';"',
      output: [
        '[INFO] Appending log entry...',
        '[INFO] Log entry appended at index: 3',
        '[INFO] Replicating to 2 followers...',
        '[INFO] Entry committed to majority (3/3 nodes)',
        'Log Index: 3',
        'Entry: UPDATE users SET name = \'Alice Smith\' WHERE name = \'Alice\';',
        'Status: Committed'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 get-log 1',
      output: [
        'Log Entry Details:',
        '==================',
        'Index: 1',
        'Term: 1',
        'Command: CREATE TABLE users (id serial primary key, name text);',
        'Committed: true',
        'Timestamp: 2025-10-15 10:35:12',
        'Replicated to: 3/3 nodes'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 get-log-range 1 3',
      output: [
        'Log Entries (1-3):',
        '==================',
        'Index 1: CREATE TABLE users (id serial primary key, name text);',
        'Index 2: INSERT INTO users (name) VALUES (\'Alice\'), (\'Bob\');',
        'Index 3: UPDATE users SET name = \'Alice Smith\' WHERE name = \'Alice\';',
        '',
        'Total entries: 3',
        'All entries committed: true'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 status',
      output: [
        'RALE Cluster Status:',
        '===================',
        'Cluster ID: rale-cluster',
        'Node ID: 1',
        'State: Leader',
        'Term: 1',
        'Commit Index: 3',
        'Last Log Index: 3',
        'Peers: 2',
        '  - Node 2: 127.0.0.1:7001 (Follower, match_index: 3)',
        '  - Node 3: 127.0.0.1:7002 (Follower, match_index: 3)',
        'WAL Entries: 3',
        'Uptime: 00:02:30'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name',
        '---+--------------',
        ' 1 | Alice Smith',
        ' 2 | Bob',
        '(2 rows)',
        '',
        '-- Data successfully replicated from RALE WAL'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 snapshot',
      output: [
        '[INFO] Creating snapshot...',
        '[INFO] Snapshot created at index: 3',
        '[INFO] Snapshot size: 2.5KB',
        '[INFO] Snapshot saved to: /var/lib/rale/snapshots/snapshot-3-1.ral',
        'Snapshot Index: 3',
        'Snapshot Term: 1',
        'Snapshot Size: 2.5KB',
        'Status: Success'
      ]
    },
    {
      command: 'ralectrl -h 127.0.0.1 -p 7000 status',
      output: [
        'RALE Cluster Status:',
        '===================',
        'Cluster ID: rale-cluster',
        'Node ID: 1',
        'State: Leader',
        'Term: 1',
        'Commit Index: 3',
        'Last Log Index: 3',
        'Peers: 2',
        '  - Node 2: 127.0.0.1:7001 (Follower, match_index: 3)',
        '  - Node 3: 127.0.0.1:7002 (Follower, match_index: 3)',
        'WAL Entries: 3',
        'Snapshots: 1',
        'Uptime: 00:03:15'
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

export default RaleDemoTerminal