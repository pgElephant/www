import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pgbalancer Architecture & Internals',
  description: 'Learn about pgbalancer internals and architecture.'
};

export default function PgBalancerInternalsDocs() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'cyan',
        title: 'Architecture & Internals',
        description: 'Understand the core architecture, worker lifecycle, and performance model behind pgBalancer.'
      }}
      contentWidth="default"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 text-white/90 space-y-6">
              <p className="text-lg leading-relaxed">
                pgbalancer is built for performance and reliability with a modern, scalable architecture:
              </p>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">Core Architecture</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Written in C with PostgreSQL integration for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Event-driven, non-blocking I/O with epoll/kqueue support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Modular design with pluggable components for pooling, routing, and metrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Cloud-native architecture designed for container and Kubernetes environments</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">Worker Lifecycle</h2>
                <p className="mb-4">pgbalancer uses a multi-process architecture with specialized workers:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Main Process</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Configuration loading and validation</li>
                      <li>• Worker process management</li>
                      <li>• Signal handling and graceful shutdown</li>
                      <li>• Health monitoring and restart logic</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Worker Processes</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Client connection handling</li>
                      <li>• Backend connection pooling</li>
                      <li>• Query routing and load balancing</li>
                      <li>• Health checks and failover</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">Technical Details</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Connection Pooling</h3>
                    <p className="text-sm text-white/80">Intelligent connection management with automatic scaling and health monitoring.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Load Balancing</h3>
                    <p className="text-sm text-white/80">Multiple algorithms including round-robin, least connections, and weighted distribution.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Monitoring</h3>
                    <p className="text-sm text-white/80">Built-in metrics collection with Prometheus integration and REST API endpoints.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-white/80">
                  See the <a href="/docs/pgbalancer/configuration" className="text-blue-400 hover:text-blue-300 underline">Configuration</a> page for YAML options and setup details.
                </p>
              </div>
            </div>
    </DocsContentLayout>
  );
}
