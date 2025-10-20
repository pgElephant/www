import React from 'react';
import { Metadata } from 'next';
import { 
  AlertTriangle, Database, Activity, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap, Globe, CheckCircle, 
  LineChart, BookOpen, Code, Settings, Monitor, Download, Terminal, 
  Container, ArrowRight, Copy, Shield, XCircle, RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgSentinel Troubleshooting - Common Issues and Solutions',
  description: 'Complete troubleshooting guide for pgSentinel monitoring platform. Solutions for common issues, error messages, and performance problems.',
  keywords: [
    'pgSentinel troubleshooting', 'monitoring issues', 'Docker problems',
    'PostgreSQL connection issues', 'Grafana problems', 'Prometheus errors'
  ].join(', '),
  openGraph: {
    title: 'pgSentinel Troubleshooting - Common Issues and Solutions',
    description: 'Complete troubleshooting guide for pgSentinel monitoring platform.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgsentinel/troubleshooting',
    siteName: 'pgElephant',
  },
};

const PgSentinelTroubleshootingPage = () => {
  const commonIssues = [
    {
      category: 'Docker & Services',
      icon: <Container className="w-6 h-6" />,
      issues: [
        {
          problem: 'Services not starting',
          symptoms: ['docker-compose ps shows Exited status', 'Port conflicts', 'Permission denied errors'],
          solutions: [
            'Check if ports are already in use: lsof -i :3000, :8000, :9090',
            'Stop conflicting services: docker-compose down',
            'Check Docker daemon is running: docker info',
            'Verify docker-compose.yml syntax: docker-compose config',
            'Check system resources: docker system df'
          ],
          commands: [
            'docker-compose down --remove-orphans',
            'docker system prune -f',
            'docker-compose up -d --force-recreate'
          ]
        },
        {
          problem: 'Container build failures',
          symptoms: ['Build errors in Docker logs', 'npm install failures', 'Permission errors'],
          solutions: [
            'Clear Docker build cache: docker builder prune -a',
            'Check Dockerfile syntax and dependencies',
            'Verify all required files are present',
            'Check available disk space',
            'Update Docker to latest version'
          ],
          commands: [
            'docker-compose build --no-cache',
            'docker system prune -a',
            'docker-compose up -d --build'
          ]
        },
        {
          problem: 'Volume mount issues',
          symptoms: ['Files not updating', 'Permission denied', 'Empty directories'],
          solutions: [
            'Check volume mount paths are correct',
            'Verify file permissions on host system',
            'Use absolute paths for volume mounts',
            'Check Docker volume driver compatibility'
          ],
          commands: [
            'docker volume ls',
            'docker volume inspect <volume_name>',
            'chmod -R 755 ./monitoring'
          ]
        }
      ]
    },
    {
      category: 'Database Connection',
      icon: <Database className="w-6 h-6" />,
      issues: [
        {
          problem: 'PostgreSQL connection failed',
          symptoms: ['Connection refused', 'Authentication failed', 'Database does not exist'],
          solutions: [
            'Verify DATABASE_URL in .env file',
            'Check PostgreSQL is running: systemctl status postgresql',
            'Test connection: psql $DATABASE_URL',
            'Verify user permissions and database exists',
            'Check firewall and network connectivity'
          ],
          commands: [
            'psql -h localhost -U postgres -d postgres',
            'systemctl status postgresql',
            'netstat -tlnp | grep 5432'
          ]
        },
        {
          problem: 'pg_stat_statements not enabled',
          symptoms: ['No query data in dashboard', 'Extension not found errors'],
          solutions: [
            'Enable extension: CREATE EXTENSION pg_stat_statements;',
            'Add to postgresql.conf: shared_preload_libraries = \'pg_stat_statements\'',
            'Restart PostgreSQL after configuration changes',
            'Grant permissions: GRANT pg_monitor TO your_user;'
          ],
          commands: [
            'psql -c "CREATE EXTENSION IF NOT EXISTS pg_stat_statements;"',
            'psql -c "GRANT pg_monitor TO postgres;"',
            'systemctl restart postgresql'
          ]
        },
        {
          problem: 'Permission denied errors',
          symptoms: ['Access denied to system catalogs', 'Insufficient privileges'],
          solutions: [
            'Grant pg_monitor role: GRANT pg_monitor TO your_user;',
            'Grant specific table permissions',
            'Check user role membership',
            'Verify database user has necessary privileges'
          ],
          commands: [
            'GRANT pg_monitor TO your_user;',
            'GRANT SELECT ON pg_stat_statements TO your_user;',
            '\\du your_user'
          ]
        }
      ]
    },
    {
      category: 'Frontend Issues',
      icon: <Monitor className="w-6 h-6" />,
      issues: [
        {
          problem: 'Dashboard not loading',
          symptoms: ['Blank page', 'Loading spinner forever', 'JavaScript errors'],
          solutions: [
            'Check browser console for errors',
            'Verify API endpoints are accessible',
            'Check CORS configuration',
            'Clear browser cache and cookies',
            'Verify WebSocket connection'
          ],
          commands: [
            'curl http://localhost:8000/api/v1/health',
            'curl http://localhost:3000',
            'docker-compose logs frontend'
          ]
        },
        {
          problem: 'WebSocket connection failed',
          symptoms: ['Real-time updates not working', 'Connection errors in console'],
          solutions: [
            'Check WebSocket URL configuration',
            'Verify backend is running on correct port',
            'Check firewall blocking WebSocket connections',
            'Test WebSocket connection manually'
          ],
          commands: [
            'wscat -c ws://localhost:8000/ws/live',
            'netstat -tlnp | grep 8000',
            'docker-compose logs backend'
          ]
        },
        {
          problem: 'API calls failing',
          symptoms: ['Network errors', 'CORS errors', '404 Not Found'],
          solutions: [
            'Check API base URL configuration',
            'Verify backend service is running',
            'Check CORS origins configuration',
            'Test API endpoints directly'
          ],
          commands: [
            'curl -X GET http://localhost:8000/api/v1/health',
            'curl -X GET http://localhost:8000/api/v1/status',
            'docker-compose logs backend'
          ]
        }
      ]
    },
    {
      category: 'Monitoring Stack',
      icon: <BarChart3 className="w-6 h-6" />,
      issues: [
        {
          problem: 'Prometheus not collecting metrics',
          symptoms: ['No metrics in Prometheus UI', 'Targets showing as down'],
          solutions: [
            'Check Prometheus configuration file',
            'Verify target endpoints are accessible',
            'Check Prometheus logs for errors',
            'Verify scrape intervals and timeouts'
          ],
          commands: [
            'curl http://localhost:9090/api/v1/targets',
            'docker-compose logs prometheus',
            'curl http://localhost:8000/metrics'
          ]
        },
        {
          problem: 'Grafana dashboards not loading',
          symptoms: ['Empty dashboards', 'Data source errors', 'Login issues'],
          solutions: [
            'Check Grafana data source configuration',
            'Verify Prometheus is accessible from Grafana',
            'Check dashboard JSON syntax',
            'Reset Grafana admin password if needed'
          ],
          commands: [
            'docker-compose exec grafana grafana-cli admin reset-admin-password admin',
            'curl http://localhost:3001/api/health',
            'docker-compose logs grafana'
          ]
        },
        {
          problem: 'No data in dashboards',
          symptoms: ['Empty charts', 'No time series data', 'Query errors'],
          solutions: [
            'Check Prometheus is collecting metrics',
            'Verify time range in Grafana',
            'Check query syntax in dashboard panels',
            'Verify data source is properly configured'
          ],
          commands: [
            'curl "http://localhost:9090/api/v1/query?query=up"',
            'curl "http://localhost:9090/api/v1/query_range?query=up&start=2024-01-01T00:00:00Z&end=2024-01-01T23:59:59Z&step=1m"'
          ]
        }
      ]
    }
  ];

  const errorMessages = [
    {
      error: 'Connection refused',
      description: 'Cannot connect to PostgreSQL database',
      icon: <XCircle className="w-6 h-6" />,
      causes: [
        'PostgreSQL service not running',
        'Wrong host or port in connection string',
        'Firewall blocking connection',
        'Database server not accepting connections'
      ],
      solutions: [
        'Start PostgreSQL service: systemctl start postgresql',
        'Check connection string in .env file',
        'Verify PostgreSQL is listening on correct port',
        'Check firewall rules and network connectivity'
      ],
      commands: [
        'systemctl status postgresql',
        'netstat -tlnp | grep 5432',
        'psql -h localhost -U postgres -d postgres'
      ]
    },
    {
      error: 'Permission denied',
      description: 'Insufficient privileges to access database',
      icon: <Shield className="w-6 h-6" />,
      causes: [
        'User lacks pg_monitor role',
        'Missing table-level permissions',
        'Database user not properly configured',
        'Role membership issues'
      ],
      solutions: [
        'Grant pg_monitor role: GRANT pg_monitor TO your_user;',
        'Grant specific table permissions',
        'Check user role membership',
        'Verify database user configuration'
      ],
      commands: [
        'GRANT pg_monitor TO your_user;',
        'GRANT SELECT ON pg_stat_statements TO your_user;',
        '\\du your_user'
      ]
    },
    {
      error: 'Extension not found',
      description: 'Required PostgreSQL extensions are missing',
      icon: <Database className="w-6 h-6" />,
      causes: [
        'pg_stat_statements extension not installed',
        'Extension not enabled in database',
        'PostgreSQL version incompatibility',
        'Missing extension files'
      ],
      solutions: [
        'Install extension: CREATE EXTENSION pg_stat_statements;',
        'Check PostgreSQL version compatibility',
        'Verify extension files are present',
        'Restart PostgreSQL after installation'
      ],
      commands: [
        'CREATE EXTENSION IF NOT EXISTS pg_stat_statements;',
        '\\dx pg_stat_statements',
        'SELECT version();'
      ]
    },
    {
      error: 'Port already in use',
      description: 'Required ports are occupied by other services',
      icon: <Network className="w-6 h-6" />,
      causes: [
        'Another service using the same port',
        'Previous Docker containers not stopped',
        'System service using the port',
        'Port conflict in docker-compose.yml'
      ],
      solutions: [
        'Stop conflicting services',
        'Change port in docker-compose.yml',
        'Kill processes using the port',
        'Use different port numbers'
      ],
      commands: [
        'lsof -i :3000',
        'docker-compose down',
        'kill -9 <PID>',
        'netstat -tlnp | grep :3000'
      ]
    }
  ];

  const performanceIssues = [
    {
      issue: 'Slow dashboard loading',
      description: 'Dashboard takes too long to load or refresh',
      icon: <Clock className="w-6 h-6" />,
      causes: [
        'Large amount of historical data',
        'Inefficient database queries',
        'Network latency issues',
        'Insufficient system resources'
      ],
      solutions: [
        'Optimize database queries and add indexes',
        'Implement data pagination and limits',
        'Use caching for frequently accessed data',
        'Increase system resources (CPU, RAM)',
        'Consider data retention policies'
      ],
      monitoring: [
        'Check database query performance',
        'Monitor system resource usage',
        'Review network latency',
        'Analyze API response times'
      ]
    },
    {
      issue: 'High memory usage',
      description: 'Services consuming excessive memory',
      icon: <Cpu className="w-6 h-6" />,
      causes: [
        'Memory leaks in application code',
        'Large dataset processing',
        'Insufficient garbage collection',
        'Too many concurrent connections'
      ],
      solutions: [
        'Implement proper memory management',
        'Add memory limits to Docker containers',
        'Optimize data processing algorithms',
        'Implement connection pooling',
        'Regular garbage collection'
      ],
      monitoring: [
        'Monitor container memory usage',
        'Check for memory leaks',
        'Review garbage collection logs',
        'Analyze memory allocation patterns'
      ]
    },
    {
      issue: 'WebSocket disconnections',
      description: 'Real-time updates frequently disconnect',
      icon: <RefreshCw className="w-6 h-6" />,
      causes: [
        'Network instability',
        'WebSocket timeout issues',
        'Load balancer configuration',
        'Firewall or proxy issues'
      ],
      solutions: [
        'Implement WebSocket reconnection logic',
        'Adjust timeout settings',
        'Check network stability',
        'Configure load balancer for WebSockets',
        'Implement heartbeat mechanism'
      ],
      monitoring: [
        'Monitor WebSocket connection stability',
        'Check network latency and packet loss',
        'Review connection timeout logs',
        'Analyze reconnection patterns'
      ]
    }
  ];

  const diagnosticCommands = [
    {
      category: 'System Health',
      icon: <Activity className="w-6 h-6" />,
      commands: [
        {
          command: 'docker-compose ps',
          description: 'Check status of all services',
          output: 'Shows running/stopped status of containers'
        },
        {
          command: 'docker-compose logs --tail=50',
          description: 'View recent logs from all services',
          output: 'Shows last 50 lines of logs from each service'
        },
        {
          command: 'docker system df',
          description: 'Check Docker disk usage',
          output: 'Shows space used by Docker images, containers, volumes'
        },
        {
          command: 'docker stats --no-stream',
          description: 'Check resource usage of containers',
          output: 'Shows CPU, memory, and network usage per container'
        }
      ]
    },
    {
      category: 'Database Diagnostics',
      icon: <Database className="w-6 h-6" />,
      commands: [
        {
          command: 'psql $DATABASE_URL -c "SELECT version();"',
          description: 'Check PostgreSQL version and connection',
          output: 'Shows PostgreSQL version and confirms connection'
        },
        {
          command: 'psql $DATABASE_URL -c "\\dx"',
          description: 'List installed extensions',
          output: 'Shows all installed PostgreSQL extensions'
        },
        {
          command: 'psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements LIMIT 1;"',
          description: 'Test pg_stat_statements access',
          output: 'Shows if pg_stat_statements is working and accessible'
        },
        {
          command: 'psql $DATABASE_URL -c "\\du"',
          description: 'List database users and roles',
          output: 'Shows all database users and their role memberships'
        }
      ]
    },
    {
      category: 'API Testing',
      icon: <Globe className="w-6 h-6" />,
      commands: [
        {
          command: 'curl http://localhost:8000/api/v1/health',
          description: 'Test backend health endpoint',
          output: 'Returns system health status and service states'
        },
        {
          command: 'curl http://localhost:8000/api/v1/status',
          description: 'Get detailed system status',
          output: 'Returns detailed system metrics and status'
        },
        {
          command: 'curl http://localhost:8000/metrics',
          description: 'Check Prometheus metrics endpoint',
          output: 'Returns raw Prometheus metrics in text format'
        },
        {
          command: 'curl http://localhost:9090/api/v1/targets',
          description: 'Check Prometheus targets',
          output: 'Shows status of all monitored targets'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
                <Database className="w-6 h-6 text-orange-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1" />
                <Shield className="w-5 h-5 text-red-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Troubleshooting
              <span className="block text-3xl md:text-4xl text-red-300 font-light mt-2">
                Common Issues & Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete troubleshooting guide for pgSentinel monitoring platform. 
              Solutions for common issues, error messages, and performance problems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-lg text-red-300">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Common issues
              </div>
              <div className="bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-lg text-orange-300">
                <Database className="w-4 h-4 inline mr-2" />
                Database problems
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-lg text-yellow-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Quick fixes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Issues */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Common Issues</h2>
          <p className="text-slate-300 text-lg">Solutions for the most frequently encountered problems</p>
        </div>

        <div className="space-y-12">
          {commonIssues.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-8">
                <div className="text-red-400 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-8">
                {category.issues.map((issue, issueIndex) => (
                  <div key={issueIndex} className="border-l-4 border-slate-700 pl-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {issue.problem}
                    </h4>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-orange-300 mb-2">Symptoms</h5>
                      <ul className="space-y-1">
                        {issue.symptoms.map((symptom, symptomIndex) => (
                          <li key={symptomIndex} className="text-slate-300 text-sm flex items-start">
                            <ArrowRight className="w-3 h-3 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold text-green-300 mb-2">Solutions</h5>
                      <ul className="space-y-1">
                        {issue.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="text-slate-300 text-sm flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-blue-300 mb-2">Commands</h5>
                      <div className="space-y-2">
                        {issue.commands.map((command, commandIndex) => (
                          <div key={commandIndex} className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                            <div className="text-slate-300">$ {command}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Messages */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Error Messages</h2>
            <p className="text-slate-300 text-lg">Understanding and resolving specific error messages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {errorMessages.map((error, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-red-400 mr-3">
                    {error.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {error.error}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {error.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-orange-300 mb-2">Common Causes</h4>
                  <ul className="space-y-1">
                    {error.causes.map((cause, causeIndex) => (
                      <li key={causeIndex} className="text-slate-300 text-sm flex items-start">
                        <ArrowRight className="w-3 h-3 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-green-300 mb-2">Solutions</h4>
                  <ul className="space-y-1">
                    {error.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="text-slate-300 text-sm flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Diagnostic Commands</h4>
                  <div className="space-y-2">
                    {error.commands.map((command, commandIndex) => (
                      <div key={commandIndex} className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                        <div className="text-slate-300">$ {command}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Issues */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Performance Issues</h2>
          <p className="text-slate-300 text-lg">Troubleshooting performance and optimization problems</p>
        </div>

        <div className="space-y-8">
          {performanceIssues.map((issue, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 mr-3">
                  {issue.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {issue.issue}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {issue.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-300 mb-2">Possible Causes</h4>
                  <ul className="space-y-1">
                    {issue.causes.map((cause, causeIndex) => (
                      <li key={causeIndex} className="text-slate-300 text-sm flex items-start">
                        <ArrowRight className="w-3 h-3 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Solutions</h4>
                  <ul className="space-y-1">
                    {issue.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="text-slate-300 text-sm flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-blue-300 mb-2">Monitoring Points</h4>
                <ul className="space-y-1">
                  {issue.monitoring.map((monitor, monitorIndex) => (
                    <li key={monitorIndex} className="text-slate-300 text-sm flex items-start">
                      <Eye className="w-3 h-3 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                      {monitor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Commands */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Diagnostic Commands</h2>
            <p className="text-slate-300 text-lg">Essential commands for troubleshooting and diagnostics</p>
          </div>

          <div className="space-y-8">
            {diagnosticCommands.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <div className="text-blue-400 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.commands.map((cmd, cmdIndex) => (
                    <div key={cmdIndex} className="bg-slate-800 p-4 rounded-lg">
                      <div className="font-mono text-sm text-white mb-2">
                        $ {cmd.command}
                      </div>
                      <p className="text-slate-300 text-sm mb-2">
                        {cmd.description}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {cmd.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Getting Help */}
      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Still Need Help?</h2>
          <p className="text-slate-300 text-lg mb-8">
            If you're still experiencing issues, here are additional resources to help you resolve them.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/pgsentinel/configuration"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Settings className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Configuration Guide</h3>
              <p className="text-slate-300 text-sm">Review configuration options and settings</p>
            </a>
            
            <a
              href="/docs/pgsentinel/api"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-green-400 mb-4 group-hover:text-green-300" />
              <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
              <p className="text-slate-300 text-sm">Check API endpoints and responses</p>
            </a>
            
            <a
              href="https://github.com/pgelephant/pgsentinel/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <AlertTriangle className="w-8 h-8 text-red-400 mb-4 group-hover:text-red-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Report Issue</h3>
              <p className="text-slate-300 text-sm">Open an issue on GitHub</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgSentinelTroubleshootingPage;
