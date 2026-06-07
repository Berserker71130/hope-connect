"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type CardProps = HTMLMotionProps<"div"> & {
  variant?: "default" | "elevated" | "bordered" | "featured";
  padding?: "none" | "sm" | "md" | "lg";
  accentBar?: "none" | "blue" | "green";
  isHoverable?: boolean;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      padding = "md",
      accentBar = "none",
      isHoverable = true,
      children,
      ...props
    },
    ref,
  ) => {
    // REMOVED generic 'border' here so variants can explicitly apply their unique borders cleanly
    const baseStyles =
      "relative bg-background-default rounded-xl overflow-hidden transition-all duration-200";

    // FIXED: Borders are now isolated so they don't clash, using vivid blue fallback colors for instant verification
    const variants = {
      default: "border border-text-light/10 shadow-sm",
      elevated: "shadow-md border border-transparent",
      bordered: "border-2 border-blue-500 shadow-sm", // Clean, explicit solid blue border
      featured: "bg-blue-50/70 border border-blue-200 shadow-sm", // Explicit subtle blue background tint and border
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    // FIXED: Ensured background accent bars use clear, high-visibility theme tokens
    const accentBars = {
      none: "",
      blue: "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-blue-600 before:z-10",
      green:
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-emerald-500 before:z-10",
    };

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${accentBars[accentBar]} ${className}`}
        whileHover={
          isHoverable
            ? {
                y: -2,
                boxShadow:
                  "0 10px 25px -5px rgba(15,32,67,0.08), 0 8px 10px -6px rgba(15,32,67,0.08)",
              }
            : undefined
        }
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 pb-4 ${className}`}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`text-body text-text-muted font-body ${className}`}
    {...props}
  />
));

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center pt-4 border-t border-text-light/10 mt-4 ${className}`}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";
