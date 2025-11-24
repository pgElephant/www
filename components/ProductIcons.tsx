/**
 * Product Icons - Single Source of Truth
 * 
 * All product icons are defined here. Use theme configuration for colors.
 * Import from this file instead of defining icons elsewhere.
 */

import { Database, Loader2, Zap, Crown, Network, Shield, FileText, Layers, Activity, Monitor, Eye, Bell, Brain, Search, BarChart3 } from 'lucide-react'
import { getProductTheme, type ProductId } from '@/config/theme'

export interface ProductIconProps {
  size?: number
  className?: string
}

// Custom NeurondB icon component
export const NeurondBIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <Brain className="text-indigo-400" style={{ width: size * 0.7, height: size * 0.7 }} />
    <Database className="text-teal-400 absolute -bottom-1 -right-1" style={{ width: size * 0.35, height: size * 0.35 }} />
    <Zap className="text-yellow-400 absolute -top-1 -left-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Search className="text-purple-400 absolute -top-1 -right-1" style={{ width: size * 0.25, height: size * 0.25 }} />
  </div>
)

// Custom pgBalancer icon component
export const PgbalancerIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <Database className="text-cyan-400" style={{ width: size * 0.7, height: size * 0.7 }} />
    <Loader2 className="text-green-400 absolute -top-1 -right-1 animate-spin" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Zap className="text-yellow-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
  </div>
)

// Custom pgRaft icon component
export const PgraftIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <Database className="text-blue-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Network className="text-green-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Shield className="text-purple-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom FauxDB icon component
export const FauxDbIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <Database className="text-emerald-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <FileText className="text-orange-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Layers className="text-blue-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Activity className="text-red-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom pgSentinel icon component
export const PgSentinelIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <Monitor className="text-blue-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Eye className="text-green-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Bell className="text-yellow-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Activity className="text-red-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

// Custom pg_stat_insights icon component
export const PgStatInsightsIcon = ({ size = 24, className }: ProductIconProps) => (
  <div className={className || 'relative flex items-center justify-center'} style={{ width: size, height: size }}>
    <BarChart3 className="text-purple-400" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Database className="text-blue-400 absolute -top-1 -right-1" style={{ width: size * 0.3, height: size * 0.3 }} />
    <Activity className="text-green-400 absolute -bottom-1 -left-1" style={{ width: size * 0.25, height: size * 0.25 }} />
    <Eye className="text-orange-400 absolute -bottom-1 -right-1" style={{ width: size * 0.2, height: size * 0.2 }} />
  </div>
)

/**
 * Get product icon component by product ID
 */
export function getProductIcon(productId: ProductId) {
  const iconMap: Record<ProductId, React.ComponentType<ProductIconProps>> = {
    neurondb: NeurondBIcon,
    pgraft: PgraftIcon,
    pgbalancer: PgbalancerIcon,
    fauxdb: FauxDbIcon,
    pgsentinel: PgSentinelIcon,
    'pg-stat-insights': PgStatInsightsIcon,
  }
  return iconMap[productId]
}

