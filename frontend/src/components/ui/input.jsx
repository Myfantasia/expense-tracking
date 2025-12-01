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
            className="block text-sm font-medium"
            style={{
              color: "hsl(var(--foreground))", // uses your Tailwind config foreground
            }}
          >
            {label}
          </label>
        )}

        {/* Input */}
        <input
          id={id}
          ref={ref}
          className={clsx(
            "block w-full rounded-md shadow-sm border outline-none",
            sizeClasses[size],
            className
          )}
          style={{
            backgroundColor: "hsl(var(--input))",
            borderColor: "hsl(var(--border))",
            color: "hsl(var(--foreground))",
            // Placeholder color (works for Tailwind CDN)
            "--tw-placeholder-color": "hsl(var(--muted-foreground))",
          }}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            className="mt-2 text-sm"
            style={{ color: "hsl(var(--destructive))" }} // error color
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

