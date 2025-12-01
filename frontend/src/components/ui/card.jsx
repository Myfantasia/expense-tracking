import React from "react";
import clsx from "clsx";

export const Card = ({ className, children, ...props }) => (
  <div
    className={clsx("rounded-lg border shadow-sm", className)}
    style={{
      backgroundColor: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      borderColor: "hsl(var(--border))",
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={clsx("text-2xl font-semibold leading-none tracking-tight", className)}
    style={{ color: "hsl(var(--foreground))" }}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p
    className={clsx("text-sm", className)}
    style={{ color: "hsl(var(--muted-foreground))" }}
    {...props}
  >
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={clsx("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={clsx("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
);
