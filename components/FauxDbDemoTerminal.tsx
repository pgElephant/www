'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Code, Database, Cpu, Server, Cloud, HardDrive, Settings } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
}

const FauxdbDemoTerminal = () => {
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

  // FauxDB-specific demo commands and their outputs
  const buildCommands = [
    {
      command: 'git clone https://github.com/pgelephant/fauxdb.git && cd fauxdb',
      output: [
        'Cloning into \'fauxdb\'...',
        'remote: Enumerating objects: 1234, done.',
        'remote: Counting objects: 100% (1234/1234), done.',
        'remote: Compressing objects: 100% (567/567), done.',
        'remote: Total 1234 (delta 445), reused 1100 (delta 400)',
        'Receiving objects: 100% (1234/1234), done.',
        'Resolving deltas: 100% (445/445), done.'
      ]
    },
    {
      command: 'cargo build --release',
      output: [
        '   Compiling proc-macro2 v1.0.70',
        '   Compiling quote v1.0.33',
        '   Compiling syn v2.0.39',
        '   Compiling serde_derive v1.0.193',
        '   Compiling serde v1.0.193',
        '   Compiling tokio v1.35.1',
        '   Compiling postgres v0.19.7',
        '   Compiling bson v2.9.0',
        '   Compiling mongodb v2.8.0',
        '   Compiling fauxdb v0.1.0 (/home/user/fauxdb)',
        '    Finished release [optimized] target/release in 45.67s'
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
      command: 'cat config/fauxdb.toml',
      output: [
        '# FauxDB Configuration',
        '[server]',
        'host = "127.0.0.1"',
        'port = 27017',
        'max_connections = 100',
        'worker_threads = 4',
        '',
        '[postgresql]',
        'host = "127.0.0.1"',
        'port = 5432',
        'database = "fauxdb"',
        'username = "fauxdb_user"',
        'password = "fauxdb_password"',
        'pool_size = 20',
        '',
        '[logging]',
        'level = "info"',
        'format = "json"',
        '',
        '[features]',
        'enable_geospatial = true',
        'enable_aggregation = true',
        'enable_transactions = true',
        'enable_change_streams = false'
      ]
    },
    {
      command: 'sudo -u postgres createdb fauxdb',
      output: [
        'CREATE DATABASE'
      ]
    },
    {
      command: 'sudo -u postgres psql -d fauxdb -c "CREATE USER fauxdb_user WITH PASSWORD \'fauxdb_password\';"',
      output: [
        'CREATE ROLE'
      ]
    },
    {
      command: 'sudo -u postgres psql -d fauxdb -c "GRANT ALL PRIVILEGES ON DATABASE fauxdb TO fauxdb_user;"',
      output: [
        'GRANT'
      ]
    },
    {
      command: './target/release/fauxdb --config config/fauxdb.toml',
      output: [
        '[INFO] Starting FauxDB server...',
        '[INFO] FauxDB version 0.1.0',
        '[INFO] Listening on 127.0.0.1:27017',
        '[INFO] Connected to PostgreSQL at 127.0.0.1:5432/fauxdb',
        '[INFO] Connection pool initialized (20 connections)',
        '[INFO] MongoDB wire protocol enabled',
        '[INFO] Geospatial features enabled',
        '[INFO] Aggregation pipeline enabled',
        '[INFO] Transaction support enabled',
        '[INFO] Server ready to accept connections'
      ]
    },
    {
      command: 'mongosh --port 27017',
      output: [
        'Current Mongosh Log ID: 64f1c2e1a1b2c3d4e5f6a7b8',
        'Connecting to: mongodb://127.0.0.1:27017/',
        'Using MongoDB: 6.0.0 (compatible)',
        'Using Mongosh: 1.10.0',
        '',
        'For mongosh info see: https://docs.mongodb.com/mongodb-shell/',
        '',
        'To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).',
        'You can opt-out by running disableTelemetry() from within the shell or by setting the environment variable MONGOSH_DISABLE_TELEMETRY=1.',
        '',
        '---',
        '   The server generated these startup warnings when booting: ',
        '   2025-10-15T10:30:00.000Z: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine',
        '   2025-10-15T10:30:00.000Z: Access control is not enabled for the database',
        '',
        '---',
        'test>'
      ]
    },
    {
      command: 'use ecommerce',
      output: [
        'switched to db ecommerce'
      ]
    },
    {
      command: 'db.products.insertOne({ name: "Laptop", price: 999.99, category: "Electronics", inStock: true, tags: ["computer", "laptop", "electronics"] })',
      output: [
        '{',
        '  acknowledged: true,',
        '  insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8")',
        '}'
      ]
    },
    {
      command: 'db.products.insertMany([{ name: "Smartphone", price: 699.99, category: "Electronics", inStock: true, tags: ["phone", "mobile", "electronics"] }, { name: "Coffee Mug", price: 12.99, category: "Home", inStock: true, tags: ["kitchen", "drinkware"] }])',
      output: [
        '{',
        '  acknowledged: true,',
        '  insertedIds: {',
        '    "0": ObjectId("64f1c2e1a1b2c3d4e5f6a7b9"),',
        '    "1": ObjectId("64f1c2e1a1b2c3d4e5f6a7ba")',
        '  }',
        '}'
      ]
    },
    {
      command: 'db.products.find({})',
      output: [
        '[',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"),',
        '    name: "Laptop",',
        '    price: 999.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "computer", "laptop", "electronics" ]',
        '  },',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b9"),',
        '    name: "Smartphone",',
        '    price: 699.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "phone", "mobile", "electronics" ]',
        '  },',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7ba"),',
        '    name: "Coffee Mug",',
        '    price: 12.99,',
        '    category: "Home",',
        '    inStock: true,',
        '    tags: [ "kitchen", "drinkware" ]',
        '  }',
        ']'
      ]
    },
    {
      command: 'db.products.find({ category: "Electronics" })',
      output: [
        '[',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"),',
        '    name: "Laptop",',
        '    price: 999.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "computer", "laptop", "electronics" ]',
        '  },',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b9"),',
        '    name: "Smartphone",',
        '    price: 699.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "phone", "mobile", "electronics" ]',
        '  }',
        ']'
      ]
    },
    {
      command: 'db.products.updateOne({ name: "Laptop" }, { $set: { price: 899.99 } })',
      output: [
        '{',
        '  acknowledged: true,',
        '  modifiedCount: 1,',
        '  upsertedId: null,',
        '  upsertedCount: 0,',
        '  matchedCount: 1',
        '}'
      ]
    },
    {
      command: 'db.products.aggregate([{ $group: { _id: "$category", totalProducts: { $sum: 1 }, avgPrice: { $avg: "$price" } } }])',
      output: [
        '[',
        '  { _id: "Electronics", totalProducts: 2, avgPrice: 799.99 },',
        '  { _id: "Home", totalProducts: 1, avgPrice: 12.99 }',
        ']'
      ]
    },
    {
      command: 'db.products.createIndex({ "location": "2dsphere" })',
      output: [
        '{',
        '  createdCollectionAutomatically: false,',
        '  numIndexesBefore: 1,',
        '  numIndexesAfter: 2,',
        '  ok: 1',
        '}'
      ]
    },
    {
      command: 'db.products.insertOne({ name: "Store Location", location: { type: "Point", coordinates: [-122.4194, 37.7749] } })',
      output: [
        '{',
        '  acknowledged: true,',
        '  insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7bb")',
        '}'
      ]
    },
    {
      command: 'db.products.find({ location: { $near: { $geometry: { type: "Point", coordinates: [-122.4194, 37.7749] }, $maxDistance: 1000 } } })',
      output: [
        '[',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7bb"),',
        '    name: "Store Location",',
        '    location: {',
        '      type: "Point",',
        '      coordinates: [ -122.4194, 37.7749 ]',
        '    }',
        '  }',
        ']'
      ]
    },
    {
      command: 'db.stats()',
      output: [
        '{',
        '  db: "ecommerce",',
        '  collections: 1,',
        '  views: 0,',
        '  objects: 4,',
        '  avgObjSize: 156.25,',
        '  dataSize: 625,',
        '  storageSize: 4096,',
        '  totalSize: 45056,',
        '  indexes: 2,',
        '  indexSize: 8192,',
        '  scaleFactor: 1,',
        '  fsUsedSize: 1048576,',
        '  fsTotalSize: 1073741824,',
        '  ok: 1',
        '}'
      ]
    },
    {
      command: 'exit',
      output: [
        'Goodbye'
      ]
    },
    {
      command: 'psql -h 127.0.0.1 -p 5432 -U fauxdb_user -d fauxdb -c "SELECT * FROM ecommerce_products;"',
      output: [
        'id | name           | price  | category   | in_stock | tags                           | location',
        '---+----------------+--------+------------+----------+--------------------------------+----------',
        ' 1 | Laptop         | 899.99 | Electronics| t        | ["computer","laptop","electronics"] | NULL',
        ' 2 | Smartphone     | 699.99 | Electronics| t        | ["phone","mobile","electronics"]   | NULL',
        ' 3 | Coffee Mug     |  12.99 | Home       | t        | ["kitchen","drinkware"]            | NULL',
        ' 4 | Store Location |    NULL| NULL       | NULL     | NULL                              | {"type":"Point","coordinates":[-122.4194,37.7749]}',
        '(4 rows)',
        '',
        '-- Data stored in PostgreSQL, accessed via MongoDB protocol'
      ]
    }
  ]

  const usageCommands = [
    {
      command: 'fauxdb --version',
      output: [
        'FauxDB v1.0.0',
        'MongoDB-compatible document database',
        'Built with Rust for high performance'
      ]
    },
    {
      command: 'fauxdb --config config/fauxdb.toml --daemon',
      output: [
        '[INFO] Starting FauxDB server...',
        '[INFO] Loading configuration from config/fauxdb.toml',
        '[INFO] Connecting to PostgreSQL backend at 127.0.0.1:5432',
        '[INFO] MongoDB wire protocol enabled on port 27017',
        '[INFO] REST API enabled on port 8080',
        '[INFO] Server started successfully',
        '[INFO] Ready to accept connections'
      ]
    },
    {
      command: 'mongosh --host 127.0.0.1 --port 27017',
      output: [
        'Current Mongosh Log ID: 64f1c2e1a1b2c3d4e5f6a7b8',
        'Connecting to: mongodb://127.0.0.1:27017/',
        'Using MongoDB: 6.0.0',
        'Using Mongosh: 1.8.2',
        '',
        'For mongosh info see: https://docs.mongodb.com/mongodb-shell/',
        '',
        'To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).',
        'You can opt-out by running db.disableFreeMonitoring().',
        '',
        '---',
        'The server generated these startup warnings when booting:',
        '2025-01-15T10:30:45.123Z: FauxDB is running in compatibility mode',
        '2025-01-15T10:30:45.124Z: Backend: PostgreSQL 17.0',
        '---'
      ]
    },
    {
      command: 'show dbs',
      output: [
        'admin      40.00 KiB',
        'config     72.00 KiB',
        'ecommerce  2.31 KiB',
        'local      72.00 KiB'
      ]
    },
    {
      command: 'use ecommerce',
      output: [
        'switched to db ecommerce'
      ]
    },
    {
      command: 'db.products.find({}).limit(3)',
      output: [
        '[',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"),',
        '    name: "Laptop",',
        '    price: 899.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "computer", "laptop", "electronics" ]',
        '  },',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b9"),',
        '    name: "Smartphone",',
        '    price: 699.99,',
        '    category: "Electronics",',
        '    inStock: true,',
        '    tags: [ "phone", "mobile", "electronics" ]',
        '  },',
        '  {',
        '    _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7ba"),',
        '    name: "Coffee Mug",',
        '    price: 12.99,',
        '    category: "Home",',
        '    inStock: true,',
        '    tags: [ "kitchen", "drinkware" ]',
        '  }',
        ']'
      ]
    },
    {
      command: 'db.products.aggregate([{ $group: { _id: "$category", count: { $sum: 1 }, avgPrice: { $avg: "$price" } } }])',
      output: [
        '[',
        '  { _id: "Electronics", count: 2, avgPrice: 799.99 },',
        '  { _id: "Home", count: 1, avgPrice: 12.99 }',
        ']'
      ]
    },
    {
      command: 'db.products.createIndex({ "name": "text", "category": "text" })',
      output: [
        '{',
        '  createdCollectionAutomatically: false,',
        '  numIndexesBefore: 1,',
        '  numIndexesAfter: 2,',
        '  ok: 1',
        '}'
      ]
    },
    {
      command: 'curl -X GET http://localhost:8080/api/v1/stats',
      output: [
        '{',
        '  "server": "FauxDB v1.0.0",',
        '  "uptime": "00:05:23",',
        '  "connections": {',
        '    "active": 3,',
        '    "total": 15',
        '  },',
        '  "databases": 4,',
        '  "collections": 12,',
        '  "operations": {',
        '    "reads": 1247,',
        '    "writes": 89,',
        '    "errors": 0',
        '  },',
        '  "backend": {',
        '    "type": "PostgreSQL",',
        '    "version": "17.0",',
        '    "status": "connected"',
        '  }',
        '}'
      ]
    },
    {
      command: 'exit',
      output: [
        'Goodbye'
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
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
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

      {/* EDB-Style Tabs */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
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

export default FauxdbDemoTerminal