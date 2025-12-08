import React, { forwardRef } from "react";
import clsx from "clsx";

const sizeClasses = {
  default: "h-10 px-3 py-2",
  sm: "h-9 px-3 py-1",
  lg: "h-11 px-4 py-3",
};

const Input = forwardRef(
  ({ id, label, error, size = "default", className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-800"
          >
            {label}
          </label>
        )}

        {/* Input - IMPORTANT: Removed CSS variables */}
        <input
          id={id}
          ref={ref}
          className={clsx(
            "block w-full rounded-md shadow-sm",
            "bg-transparent border border-gray-300 dark:border-gray-800",
            "text-gray-700 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-600",
            "focus:ring-1 focus:ring-blue-500 outline-none",
            "text-sm md:text-base", // Responsive text
            sizeClasses[size],
            className
          )}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;