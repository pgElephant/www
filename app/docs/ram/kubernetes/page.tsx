"use client"

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Info, Terminal, Database, Settings, Monitor, Shield, Cloud, GitBranch, Zap, Globe, Copy } from 'lucide-react';

export default function RamKubernetesSetup() {
  const [copiedCode, setCopiedCode] = useState<string>('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  // Define consistent color palette
  const palette = {
    teal: '#0D9488',
    tealDeep: '#134E4A',
    tealLight: '#14B8A6',
    navy: '#1E3A8A',
    navyDeep: '#1E40AF',
    slate: '#475569',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    iconTeal: {
      light: '#5EEAD4',
      medium: '#14B8A6',
      dark: '#0F766E'
    }
  }

  const codeBlocks = {
    helmRepo: `# Add pgElephant Helm repository
helm repo add pgelephant https://charts.pgelephant.com
helm repo update

# Search available charts
helm search repo pgelephant/ram`,

    namespace: `# Create dedicated namespace
kubectl create namespace ram-cluster

# Set as default namespace
kubectl config set-context --current --namespace=ram-cluster`,

    install: `# Install with default values
helm install ram-cluster pgelephant/ram \\
  --namespace ram-cluster \\
  --set cluster.name=production-cluster \\
  --set cluster.nodeCount=3 \\
  --set postgresql.auth.postgresPassword=secure-password

# Check installation status
helm status ram-cluster -n ram-cluster
kubectl get pods -n ram-cluster`,

    values: `# values.yaml
cluster:
  name: "production-cluster"
  nodeCount: 3

postgresql:
  auth:
    postgresPassword: "secure-password"
  primary:
    persistence:
      size: 50Gi
      storageClass: "fast-ssd"

ramd:
  replicaCount: 3
  service:
    type: LoadBalancer
    port: 8080

monitoring:
  prometheus:
    enabled: true
  grafana:
    enabled: true
    adminPassword: "admin-password"`,

    customInstall: `# Install with custom configuration
helm install ram-cluster pgelephant/ram \\
  --namespace ram-cluster \\
  --values values.yaml

# Check installation status
helm status ram-cluster -n ram-cluster
kubectl get pods -n ram-cluster`,

    monitoring: `# Get service URLs
kubectl get svc -n ram-cluster

# Port forward for local access
kubectl port-forward -n ram-cluster svc/ram-cluster-ramd 8080:8080
kubectl port-forward -n ram-cluster svc/ram-cluster-prometheus 9090:9090
kubectl port-forward -n ram-cluster svc/ram-cluster-grafana 3000:3000

# Access services
# RAM API: http://localhost:8080/health
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000`,

    troubleshooting: `# Check pod status
kubectl describe pod -n ram-cluster

# Check logs
kubectl logs -n ram-cluster -l app=postgresql

# Check persistent volumes
kubectl get pv,pvc -n ram-cluster

# Check storage class
kubectl get storageclass`
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div 
        className="py-20 text-center"
        style={{
          background: `linear-gradient(135deg, ${palette.tealDeep} 0%, ${palette.teal} 50%, ${palette.navy} 100%)`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              RAM Kubernetes Setup
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete guide to deploying RAM PostgreSQL clustering solution on Kubernetes for production environments
            </p>
          </div>
        </div>
      </div>
      {/* Prerequisites */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Prerequisites
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Cloud className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Kubernetes Requirements</h3>
                  </div>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Kubernetes 1.20+ cluster</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>kubectl configured and authenticated</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Helm 3.0+ installed</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Storage class configured</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>LoadBalancer or Ingress controller</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Monitor className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Resource Requirements</h3>
                  </div>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>3+ worker nodes for high availability</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>4GB+ RAM per node</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>2+ CPU cores per node</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>50GB+ storage per node</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helm Installation */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Helm Installation
            </h2>
            
            <div className="space-y-12">
              {/* Step 1: Add Helm Repository */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Cloud className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">1. Add Helm Repository</h3>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 relative">
                  <button
                    onClick={() => copyToClipboard(codeBlocks.helmRepo, 'helmRepo')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'helmRepo' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{codeBlocks.helmRepo}</code>
                  </pre>
                </div>
              </div>

              {/* Step 2: Create Namespace */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">2. Create Namespace</h3>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 relative">
                  <button
                    onClick={() => copyToClipboard(codeBlocks.namespace, 'namespace')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'namespace' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{codeBlocks.namespace}</code>
                  </pre>
                </div>
              </div>

              {/* Step 3: Install RAM Cluster */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">3. Install RAM Cluster</h3>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 relative">
                  <button
                    onClick={() => copyToClipboard(codeBlocks.install, 'install')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'install' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{codeBlocks.install}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Configuration */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Custom Configuration
            </h2>
            
            <div className="space-y-12">
              {/* values.yaml Configuration */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Settings className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">values.yaml Configuration</h3>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 relative">
                  <button
                    onClick={() => copyToClipboard(codeBlocks.values, 'values')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'values' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{codeBlocks.values}</code>
                  </pre>
                </div>
              </div>

              {/* Install with Custom Values */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Terminal className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Install with Custom Values</h3>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 relative">
                  <button
                    onClick={() => copyToClipboard(codeBlocks.customInstall, 'customInstall')}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'customInstall' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="text-gray-100 text-sm overflow-x-auto">
                    <code>{codeBlocks.customInstall}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Setup */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Monitoring Setup
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Monitor className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Access Monitoring Services</h3>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <button
                  onClick={() => copyToClipboard(codeBlocks.monitoring, 'monitoring')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'monitoring' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.monitoring}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Deployment */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Production Deployment
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">High Availability</h3>
                </div>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Deploy across multiple availability zones</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Use anti-affinity rules for pod distribution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Configure pod disruption budgets</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Implement health checks and readiness probes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Use persistent volumes with replication</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Set up automated backups</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Security</h3>
                </div>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Use Kubernetes secrets for passwords</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Enable RBAC and network policies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Use TLS certificates for encryption</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Implement pod security standards</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Regular security scanning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Audit logging enabled</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Troubleshooting
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Common Issues</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Pods not starting</h4>
                    <div className="bg-gray-900 rounded-lg p-4 relative">
                      <button
                        onClick={() => copyToClipboard(codeBlocks.troubleshooting, 'troubleshooting')}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedCode === 'troubleshooting' ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <pre className="text-gray-100 text-xs overflow-x-auto">
                        <code>{codeBlocks.troubleshooting}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Storage issues</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• Check persistent volume claims (PVC)</li>
                      <li>• Verify storage class configuration</li>
                      <li>• Ensure sufficient storage capacity</li>
                      <li>• Check node disk space</li>
                      <li>• Verify storage permissions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-gray-900 mb-6">
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cluster Management</h3>
                <p className="text-gray-600 text-sm">Learn advanced cluster operations and maintenance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Monitoring</h3>
                <p className="text-gray-600 text-sm">Set up comprehensive monitoring and alerting</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Hardening</h3>
                <p className="text-gray-600 text-sm">Implement enterprise security and compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
