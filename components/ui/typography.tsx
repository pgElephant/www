import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className = '' }: TextProps) {
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-thin text-white ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TextProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-thin text-white ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = '' }: TextProps) {
  return (
    <h3 className={`text-2xl md:text-3xl font-thin text-white ${className}`}>
      {children}
    </h3>
  );
}

export function H4({ children, className = '' }: TextProps) {
  return (
    <h4 className={`text-xl md:text-2xl font-thin text-white ${className}`}>
      {children}
    </h4>
  );
}

export function Paragraph({ children, className = '' }: TextProps) {
  return (
    <p className={`text-base md:text-lg text-white/90 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function SmallText({ children, className = '' }: TextProps) {
  return (
    <p className={`text-sm text-white/80 ${className}`}>
      {children}
    </p>
  );
}

export function Code({ children, className = '' }: TextProps) {
  return (
    <code className={`font-mono text-sm bg-white/10 backdrop-blur-sm px-1.5 py-0.5 rounded text-white border border-white/20 ${className}`}>
      {children}
    </code>
  );
}