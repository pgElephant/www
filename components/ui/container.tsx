import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-8xl',
  full: 'max-w-full',
};

export function Container({
  children,
  as: Component = 'div',
  className = '',
  size = 'lg',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}