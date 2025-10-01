import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}