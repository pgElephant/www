import React from 'react';
import Header from './Header';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withHeader?: boolean;
  withFooter?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function Layout({
  children,
  className,
  containerSize = 'lg',
  withHeader = true,
  withFooter = true,
  as: Component = 'div',
}: LayoutProps) {
  return (
    <>
      {withHeader && <Header />}
      <Component
        className={cn(
          'min-h-screen pt-20',  // pt-20 accounts for fixed header
          className
        )}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </Component>
      {withFooter && (
        <footer className="bg-slate-900 text-white py-12 mt-20">
          <Container size={containerSize}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">About</h3>
                <p className="text-slate-300 text-sm">
                  PostgreSQL High Availability Made Easy
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Projects</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><a href="/rale" className="hover:text-white">RALE</a></li>
                  <li><a href="/ram" className="hover:text-white">RAM</a></li>
                  <li><a href="/pgraft" className="hover:text-white">pgraft</a></li>
                  <li><a href="/fauxdb" className="hover:text-white">FauxDB</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><a href="/docs" className="hover:text-white">Documentation</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/community" className="hover:text-white">Community</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><a href="https://github.com/pgElephant" className="hover:text-white">GitHub</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-slate-400">
              <p>&copy; {new Date().getFullYear()} pgElephant. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      )}
    </>
  );
}