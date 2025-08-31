import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-cool-200 border-t-accent-600 rounded-full animate-spin"></div>
    </div>
  )
}

export default LoadingSpinner 