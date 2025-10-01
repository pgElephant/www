import React from 'react'
import { BookOpen, Github, ExternalLink, Link as LucideLink } from 'lucide-react'
import Link from 'next/link'

const PgraftPage = () => (
  <div>
    {/* Quick Start & Architecture Section */}
    <div className="py-28 bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Quick Start</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Get a pgraft cluster running in minutes. See the full docs for advanced setup.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Install & Build</h3>
                <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
{`git clone https://github.com/pgelephant/pgraft.git
                      </p>
                    </div>
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure PostgreSQL</h3>
                <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
{`shared_preload_libraries = 'pgraft'
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Install & Build</h3>
                          <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Initialize & Join Cluster</h3>
                <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
{`CREATE EXTENSION pgraft;
                            <code className="text-green-400 text-sm">
                  </pre>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
{`-- On leader, add nodes
                              git clone https://github.com/pgelephant/pgraft.git<br/>
                              cd pgraft<br/>
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Check Cluster Status</h3>
                <div className="bg-slate-900 rounded-lg p-4 mb-2">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
{`SELECT * FROM pgraft_get_cluster_status();`}
                  </pre>
                </div>
              </div>
              <Link href="/docs/pgraft/getting-started" className="professional-button w-full mt-6 justify-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Full Getting Started Guide
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Architecture at a Glance</h3>
              <pre className="bg-slate-900 text-green-300 rounded-lg p-6 text-sm overflow-x-auto whitespace-pre-wrap">
{`PostgreSQL Background Worker (C)
                              make clean && make && sudo make install
                            </code>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure PostgreSQL</h3>
                          <div className="bg-slate-900 rounded-lg p-4 mb-2">
                            <code className="text-green-400 text-sm">
          {`shared_preload_libraries = 'pgraft'
              pgraft implements the Raft consensus algorithm directly in PostgreSQL
              </pre>
            </div>
          </div>
        </div>
      </div>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                            </code>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Initialize & Join Cluster</h3>
                          <div className="bg-slate-900 rounded-lg p-4 mb-2">
                            <code className="text-green-400 text-sm">
                              CREATE EXTENSION pgraft;<br/>
                              SELECT pgraft_init();
                            </code>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-4 mb-2">
                            <code className="text-green-400 text-sm">
                              -- On leader, add nodes<br/>
                              SELECT pgraft_add_node(2, '127.0.0.1', 7002);<br/>
                              SELECT pgraft_add_node(3, '127.0.0.1', 7003);
                            </code>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">Check Cluster Status</h3>
                          <div className="bg-slate-900 rounded-lg p-4 mb-2">
                            <code className="text-green-400 text-sm">
                              SELECT * FROM pgraft_get_cluster_status();
                            </code>
                          </div>
                        </div>
                        <Link href="/docs/pgraft/getting-started" className="professional-button w-full mt-6 justify-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Full Getting Started Guide
                        </Link>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-6">Architecture at a Glance</h3>
                        <pre className="bg-slate-900 text-green-300 rounded-lg p-6 text-sm overflow-x-auto">
          {`PostgreSQL Background Worker (C)
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Leader Election
                  </h3>
                  <p className="text-slate-600">
                    Nodes automatically elect a leader using the Raft algorithm, ensuring only one node accepts writes at a time.
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Log Replication
                  </h3>
                  <p className="text-slate-600">
                    The leader replicates all changes to follower nodes, ensuring consistency across the cluster.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Consensus & Commit
                  </h3>
                  <p className="text-slate-600">
                    Changes are committed only after a majority of nodes acknowledge receipt, guaranteeing durability.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="premium-card p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Quick Start
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Install pgraft extension<br/>
                    CREATE EXTENSION pgraft;
                  </code>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Initialize cluster<br/>
                    SELECT pgraft_init_cluster();
                  </code>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Check status<br/>
                    SELECT * FROM pgraft_cluster_status();
                  </code>
                </div>
              </div>
              <Link href="/docs/pgraft/getting-started" className="professional-button w-full mt-6 justify-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Full Getting Started Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="container-wide">
          <div className="premium-cta text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Distributed PostgreSQL Clusters?
            </h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Get started with pgraft today and build highly available, fault-tolerant PostgreSQL systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/pgraft/getting-started" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Started
              </Link>
              <a 
                href="https://github.com/pgElephant/pgraft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                View Source
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* CTA Section */}
    <div className="py-24">
      <div className="container-wide">
        <div className="premium-cta text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Distributed PostgreSQL Clusters?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Get started with pgraft today and build highly available, fault-tolerant PostgreSQL systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/pgraft/getting-started" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Get Started
            </Link>
            <a 
              href="https://github.com/pgElephant/pgraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              View Source
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default PgraftPage