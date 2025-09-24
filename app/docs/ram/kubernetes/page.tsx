import React from 'react';
import { CheckCircle, AlertCircle, Info, Terminal, Database, Settings, Monitor, Shield, Cloud, GitBranch, Zap, Globe } from 'lucide-react';

export default function RamKubernetesSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-teal-600 py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">RAM Kubernetes Setup</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Complete guide to deploying RAM PostgreSQL clustering solution on Kubernetes for production environments
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <AlertCircle className="w-8 h-8 mr-3" />
            Prerequisites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Kubernetes Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Kubernetes 1.20+ cluster</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />kubectl configured</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Helm 3.0+ installed</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />Storage class configured</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />LoadBalancer or Ingress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Resource Requirements</h3>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />3+ worker nodes</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />4GB+ RAM per node</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />2+ CPU cores per node</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" />50GB+ storage per node</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Helm Installation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Cloud className="w-8 h-8 mr-3" />
            Helm Installation
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">1. Add Helm Repository</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Add pgElephant Helm repository</div>
                <div className="text-slate-300 mb-2">helm repo add pgelephant https://charts.pgelephant.com</div>
                <div className="text-slate-300 mb-2">helm repo update</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Search available charts</div>
                <div className="text-slate-300 mb-2">helm search repo pgelephant/ram</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">2. Create Namespace</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Create dedicated namespace</div>
                <div className="text-slate-300 mb-2">kubectl create namespace ram-cluster</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Set as default namespace</div>
                <div className="text-slate-300 mb-2">kubectl config set-context --current --namespace=ram-cluster</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">3. Install RAM Cluster</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Install with default values</div>
                <div className="text-slate-300 mb-2">helm install ram-cluster pgelephant/ram \</div>
                <div className="text-slate-300 mb-2">  --namespace ram-cluster \</div>
                <div className="text-slate-300 mb-2">  --set cluster.name=production-cluster \</div>
                <div className="text-slate-300 mb-2">  --set cluster.nodeCount=3 \</div>
                <div className="text-slate-300 mb-2">  --set postgresql.auth.postgresPassword=secure-password</div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Configuration */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Custom Configuration
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">values.yaml Configuration</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-slate-300 mb-2"># values.yaml</div>
                <div className="text-slate-300 mb-2">cluster:</div>
                <div className="text-slate-300 mb-2">  name: "production-cluster"</div>
                <div className="text-slate-300 mb-2">  nodeCount: 3</div>
                <div className="text-slate-300 mb-2"></div>
                <div className="text-slate-300 mb-2">postgresql:</div>
                <div className="text-slate-300 mb-2">  auth:</div>
                <div className="text-slate-300 mb-2">    postgresPassword: "secure-password"</div>
                <div className="text-slate-300 mb-2">  primary:</div>
                <div className="text-slate-300 mb-2">    persistence:</div>
                <div className="text-slate-300 mb-2">      size: 50Gi</div>
                <div className="text-slate-300 mb-2">      storageClass: "fast-ssd"</div>
                <div className="text-slate-300 mb-2"></div>
                <div className="text-slate-300 mb-2">ramd:</div>
                <div className="text-slate-300 mb-2">  replicaCount: 3</div>
                <div className="text-slate-300 mb-2">  service:</div>
                <div className="text-slate-300 mb-2">    type: LoadBalancer</div>
                <div className="text-slate-300 mb-2">    port: 8080</div>
                <div className="text-slate-300 mb-2"></div>
                <div className="text-slate-300 mb-2">monitoring:</div>
                <div className="text-slate-300 mb-2">  prometheus:</div>
                <div className="text-slate-300 mb-2">    enabled: true</div>
                <div className="text-slate-300 mb-2">  grafana:</div>
                <div className="text-slate-300 mb-2">    enabled: true</div>
                <div className="text-slate-300 mb-2">    adminPassword: "admin-password"</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Install with Custom Values</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Install with custom configuration</div>
                <div className="text-slate-300 mb-2">helm install ram-cluster pgelephant/ram \</div>
                <div className="text-slate-300 mb-2">  --namespace ram-cluster \</div>
                <div className="text-slate-300 mb-2">  --values values.yaml</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Check installation status</div>
                <div className="text-slate-300 mb-2">helm status ram-cluster -n ram-cluster</div>
                <div className="text-slate-300 mb-2">kubectl get pods -n ram-cluster</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Setup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Monitor className="w-8 h-8 mr-3" />
            Monitoring Setup
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Access Monitoring Services</h3>
              <div className="bg-slate-800/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4"># Get service URLs</div>
                <div className="text-slate-300 mb-2">kubectl get svc -n ram-cluster</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Port forward for local access</div>
                <div className="text-slate-300 mb-2">kubectl port-forward -n ram-cluster svc/ram-cluster-ramd 8080:8080</div>
                <div className="text-slate-300 mb-2">kubectl port-forward -n ram-cluster svc/ram-cluster-prometheus 9090:9090</div>
                <div className="text-slate-300 mb-2">kubectl port-forward -n ram-cluster svc/ram-cluster-grafana 3000:3000</div>
                <div className="text-slate-300 mb-4"></div>
                
                <div className="text-green-400 mb-4"># Access services</div>
                <div className="text-slate-300 mb-2"># RAM API: http://localhost:8080/health</div>
                <div className="text-slate-300 mb-2"># Prometheus: http://localhost:9090</div>
                <div className="text-slate-300 mb-2"># Grafana: http://localhost:3000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Production Deployment */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            Production Deployment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">High Availability</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Deploy across multiple availability zones</li>
                <li>• Use anti-affinity rules for pod distribution</li>
                <li>• Configure pod disruption budgets</li>
                <li>• Implement health checks and readiness probes</li>
                <li>• Use persistent volumes with replication</li>
                <li>• Set up automated backups</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Security</h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Use Kubernetes secrets for passwords</li>
                <li>• Enable RBAC and network policies</li>
                <li>• Use TLS certificates for encryption</li>
                <li>• Implement pod security standards</li>
                <li>• Regular security scanning</li>
                <li>• Audit logging enabled</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
            <Info className="w-8 h-8 mr-3" />
            Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Pods not starting</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-green-400"># Check pod status</div>
                    <div className="text-slate-300">kubectl describe pod -n ram-cluster</div>
                    <div className="text-slate-300"></div>
                    <div className="text-green-400"># Check logs</div>
                    <div className="text-slate-300">kubectl logs -n ram-cluster -l app=postgresql</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Storage issues</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm mt-2">
                    <div className="text-green-400"># Check persistent volumes</div>
                    <div className="text-slate-300">kubectl get pv,pvc -n ram-cluster</div>
                    <div className="text-slate-300"></div>
                    <div className="text-green-400"># Check storage class</div>
                    <div className="text-slate-300">kubectl get storageclass</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
          <h2 className="text-3xl font-bold text-green-300 mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Database className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cluster Management</h3>
              <p className="text-slate-300 text-sm">Learn advanced cluster operations and maintenance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Monitor className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Monitoring</h3>
              <p className="text-slate-300 text-sm">Set up comprehensive monitoring and alerting</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security Hardening</h3>
              <p className="text-slate-300 text-sm">Implement enterprise security and compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
