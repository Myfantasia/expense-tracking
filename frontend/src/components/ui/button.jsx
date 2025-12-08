import React from 'react';
import clsx from 'clsx';

const sizeClasses = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
  icon: 'h-10 w-10',
};

const variantClasses = {
  default: 'bg-violet-700 hover:bg-violet-800 text-white border-none',
  outline: 'bg-transparent text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
  ghost: 'bg-transparent text-gray-800 dark:text-gray-200 border-none hover:bg-gray-100 dark:hover:bg-gray-800',
  link: 'bg-transparent text-violet-600 dark:text-violet-400 underline border-none',
};

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  loading, 
  className, 
  disabled,
  ...props 
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </div>
      ) : children}
    </button>
  );
}

