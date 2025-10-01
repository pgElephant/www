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
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{`git clone https://github.com/pgelephant/pgraft.git
cd pgraft
make && sudo make install`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Configure PostgreSQL</h3>
              <div className="bg-slate-900 rounded-lg p-4 mb-2">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{`shared_preload_libraries = 'pgraft'`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Initialize & Join Cluster</h3>
              <div className="bg-slate-900 rounded-lg p-4 mb-2">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{`CREATE EXTENSION pgraft;
SELECT pgraft_init();`}</pre>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 mb-2">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{`-- On leader, add nodes
SELECT pgraft_add_node(2, '127.0.0.1', 7002);
SELECT pgraft_add_node(3, '127.0.0.1', 7003);`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Check Cluster Status</h3>
              <div className="bg-slate-900 rounded-lg p-4 mb-2">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{`SELECT * FROM pgraft_get_cluster_status();`}</pre>
              </div>
            </div>
            <Link href="/docs/pgraft/getting-started" className="professional-button w-full mt-6 justify-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Full Getting Started Guide
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Architecture at a Glance</h3>
            <pre className="bg-slate-900 text-green-300 rounded-lg p-6 text-sm overflow-x-auto">{`PostgreSQL Background Worker (C)
make clean && make && sudo make install`}</pre>
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
);

export default PgraftPage;