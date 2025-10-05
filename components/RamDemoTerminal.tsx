'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'build' | 'usage'>('build')
  const terminalRef = useRef<HTMLDivElement>(null)

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 100,
    commandDelay: 2000,
    outputDelay: 400,
    betweenCommands: 2000
  }

  // RAM-specific demo commands and their outputs
  const buildCommands = [
    {
      command: 'git clone https://github.com/pgelephant/ram.git && cd ram',
      output: [
        'Cloning into \'ram\'...',
        'remote: Enumerating objects: 2156, done.',
        'remote: Counting objects: 100% (2156/2156), done.',
        'remote: Compressing objects: 100% (1234/1234), done.',
        'remote: Total 2156 (delta 789), reused 2100 (delta 756)',
        'Receiving objects: 100% (2156/2156), done.',
        'Resolving deltas: 100% (789/789), done.'
      ]
    },
    {
      command: './configure --prefix=/usr/local/ram && make -j && sudo make install',
      output: [
        'checking for gcc... gcc',
        'checking whether the C compiler works... yes',
        'checking for C compiler default output file name... a.out',
        'checking for suffix of executables...',
        'checking whether we are cross compiling... no',
        'checking for suffix of object files... o',
        'checking whether the compiler supports GNU C... yes',
        'checking for pg_config... /usr/local/pgsql/bin/pg_config',
        'configure: creating ./config.status',
        'config.status: creating Makefile',
        '',
        'Building RAM daemon and control tools...',
        'CC src/ramd/ramd_main.c',
        'CC src/ramd/ramd_cluster.c',
        'CC src/ramd/ramd_watchdog.c',
        'CC src/ramd/ramd_failover.c',
        'CC src/ramctrl/ramctrl.c',
        'CC src/ramctrl/ramctrl_cluster.c',
        'LINK ramd',
        'LINK ramctrl',
        '',
        'Installing RAM...',
        'cp ramd /usr/local/ram/bin/',
        'cp ramctrl /usr/local/ram/bin/',
        'cp conf/ram.conf.example /usr/local/ram/etc/ram.conf'
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
      command: 'cat /usr/local/ram/etc/ram.conf',
      output: [
        '# RAM Configuration',
        'ram_port = 6432',
        'backend_host0 = \'127.0.0.1\'',
        'backend_port0 = 5432',
        'backend_weight0 = 1',
        'backend_flag0 = \'ALLOW_TO_FAILOVER\'',
        '',
        'backend_host1 = \'127.0.0.1\'',
        'backend_port1 = 5433',
        'backend_weight1 = 1',
        'backend_flag1 = \'ALLOW_TO_FAILOVER\'',
        '',
        'backend_host2 = \'127.0.0.1\'',
        'backend_port2 = 5434',
        'backend_weight2 = 1',
        'backend_flag2 = \'ALLOW_TO_FAILOVER\'',
        '',
        'failover_on_backend_error = on',
        'health_check_period = 10',
        'health_check_user = \'postgres\'',
        'health_check_password = \'postgres\'',
        'health_check_database = \'postgres\'',
        'failover_command = \'/usr/local/ram/bin/failover.sh\'',
        'failback_command = \'/usr/local/ram/bin/failback.sh\'',
        '',
        'recovery_user = \'postgres\'',
        'recovery_password = \'postgres\'',
        'recovery_1st_stage_command = \'pg_basebackup -D /var/lib/postgresql/16/main -Ft -z -P -v\'',
        'recovery_2nd_stage_command = \'echo \'recovery_target_timeline = latest\' >> /var/lib/postgresql/16/main/recovery.conf\'',
        'recovery_timeout = 90'
      ]
    }
  ]

  const usageCommands = [
    {
      command: '/usr/local/ram/bin/ramd -f /usr/local/ram/etc/ram.conf',
      output: [
        '[INFO] Starting RAM daemon...',
        '[INFO] RAM daemon started (PID: 12345)',
        '[INFO] Listening on 0.0.0.0:6432',
        '[INFO] Backend node 0 (127.0.0.1:5432) is in recovery',
        '[INFO] Backend node 1 (127.0.0.1:5433) is in recovery',
        '[INFO] Backend node 2 (127.0.0.1:5434) is in recovery',
        '[INFO] Backend node 0 (127.0.0.1:5432) is up',
        '[INFO] Backend node 1 (127.0.0.1:5433) is up',
        '[INFO] Backend node 2 (127.0.0.1:5434) is up',
        '[INFO] Load balancing pool is ready'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres show status',
      output: [
        'RAM Status:',
        '===========',
        'RAM daemon: 127.0.0.1:6432',
        'Backend node 0: 127.0.0.1:5432 (weight: 1, status: up, role: master)',
        'Backend node 1: 127.0.0.1:5433 (weight: 1, status: up, role: slave)',
        'Backend node 2: 127.0.0.1:5434 (weight: 1, status: up, role: slave)',
        'Total connections: 0',
        'Active connections: 0',
        'Idle connections: 0',
        'Health check period: 10 seconds'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "CREATE TABLE users (id serial primary key, name text);"',
      output: [
        'CREATE TABLE'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "INSERT INTO users (name) VALUES (\'Alice\'), (\'Bob\'), (\'Charlie\');"',
      output: [
        'INSERT 0 3'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name',
        '---+----------',
        ' 1 | Alice',
        ' 2 | Bob',
        ' 3 | Charlie',
        '(3 rows)'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres show pool',
      output: [
        'RAM Connection Pool:',
        '===================',
        'Backend node 0: 127.0.0.1:5432',
        '  - Active connections: 1',
        '  - Idle connections: 2',
        '  - Total connections: 3',
        '  - Connection pool size: 10',
        '  - Connection pool available: 7',
        '',
        'Backend node 1: 127.0.0.1:5433',
        '  - Active connections: 0',
        '  - Idle connections: 1',
        '  - Total connections: 1',
        '  - Connection pool size: 10',
        '  - Connection pool available: 9',
        '',
        'Backend node 2: 127.0.0.1:5434',
        '  - Active connections: 0',
        '  - Idle connections: 1',
        '  - Total connections: 1',
        '  - Connection pool size: 10',
        '  - Connection pool available: 9'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres detach node 0',
      output: [
        '[INFO] Detaching backend node 0 (127.0.0.1:5432)...',
        '[INFO] Backend node 0 detached successfully'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres show status',
      output: [
        'RAM Status:',
        '===========',
        'RAM daemon: 127.0.0.1:6432',
        'Backend node 0: 127.0.0.1:5432 (weight: 1, status: detached, role: master)',
        'Backend node 1: 127.0.0.1:5433 (weight: 1, status: up, role: slave)',
        'Backend node 2: 127.0.0.1:5434 (weight: 1, status: up, role: slave)',
        'Total connections: 0',
        'Active connections: 0',
        'Idle connections: 0',
        'Health check period: 10 seconds'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 6432 -U postgres -d postgres -c "SELECT * FROM users;"',
      output: [
        'id | name',
        '---+----------',
        ' 1 | Alice',
        ' 2 | Bob',
        ' 3 | Charlie',
        '(3 rows)',
        '',
        '-- Query successfully routed to healthy backend node'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres attach node 0',
      output: [
        '[INFO] Attaching backend node 0 (127.0.0.1:5432)...',
        '[INFO] Backend node 0 attached successfully'
      ]
    },
    {
      command: 'ramctrl -h 127.0.0.1 -p 6432 -u postgres -w postgres -d postgres show status',
      output: [
        'RAM Status:',
        '===========',
        'RAM daemon: 127.0.0.1:6432',
        'Backend node 0: 127.0.0.1:5432 (weight: 1, status: up, role: master)',
        'Backend node 1: 127.0.0.1:5433 (weight: 1, status: up, role: slave)',
        'Backend node 2: 127.0.0.1:5434 (weight: 1, status: up, role: slave)',
        'Total connections: 0',
        'Active connections: 0',
        'Idle connections: 0',
        'Health check period: 10 seconds'
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
        
        {/* Tabs */}
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('build')}
            disabled={isRunning}
            className={`px-3 py-1 text-sm font-mono rounded-t-md transition-colors ${
              activeTab === 'build'
                ? 'bg-gray-700 text-white border-b-2 border-cyan-400'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-650'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Building & Installation
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            disabled={isRunning}
            className={`px-3 py-1 text-sm font-mono rounded-t-md transition-colors ${
              activeTab === 'usage'
                ? 'bg-gray-700 text-white border-b-2 border-cyan-400'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-650'
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

export default RamDemoTerminal