import React from 'react';
import clsx from 'clsx';

const sizeClasses = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
  icon: 'h-10 w-10',
};

const variantStyles = {
  default: {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
  },
  outline: {
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    border: '1px solid hsl(var(--border))',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'hsl(var(--foreground))',
    border: 'none',
  },
  link: {
    backgroundColor: 'transparent',
    color: 'hsl(var(--primary))',
    textDecoration: 'underline',
    border: 'none',
  },
};

export function Button({ children, variant = 'default', size = 'default', className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        sizeClasses[size],
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

