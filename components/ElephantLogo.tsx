'use client'
import React from 'react'


interface ElephantLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

const ElephantLogo: React.FC<ElephantLogoProps> = ({ 
  size = 'md', 
  className = '', 
  animated = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const strokeWidth = {
    sm: 2,
    md: 2.5,
    lg: 3
  }

  const LogoComponent = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Elephant head */}
      <path
        d="M25 60 Q20 50 25 40 Q30 35 35 40 Q40 45 45 50 Q50 55 55 50 Q60 45 65 40 Q70 35 75 40 Q80 50 75 60 Q70 65 65 60 Q60 55 55 60 Q50 65 45 60 Q40 55 35 60 Q30 65 25 60 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Trunk */}
      <path
        d="M50 60 Q50 70 50 80 Q45 85 40 80 Q35 75 30 80 Q25 85 20 80"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Eye */}
      <circle
        cx="35"
        cy="45"
        r="3"
        fill="currentColor"
      />
      
      {/* Ear */}
      <path
        d="M20 35 Q15 25 20 15 Q25 10 30 15 Q35 20 40 15 Q45 10 50 15 Q55 20 60 15 Q65 10 70 15 Q75 25 70 35"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Database symbol overlay */}
      <rect
        x="40"
        y="70"
        width="20"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        fill="none"
      />
      
      <line
        x1="42"
        y1="75"
        x2="58"
        y2="75"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
      />
      
      <line
        x1="42"
        y1="78"
        x2="58"
        y2="78"
        stroke="currentColor"
        strokeWidth={strokeWidth[size]}
        strokeLinecap="round"
      />
    </svg>
  )

  return <LogoComponent />
}

export default ElephantLogo 