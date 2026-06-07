import * as React from "react";
import { Loader2 } from "lucide-react";

//Define strict types for our variants, sizes, and states
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // 1. Base styles applied to All buttons
    const baseStyles =
      "inline-flex items-center justify-center font-body font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust disabled:cursor-not-allowed disabled:opacity-50 select-none";

    // 2. Variant Matrix matching Issue #3 specs perfectly
    const variants = {
      primary:
        "bg-primary text-background-default shadow-sm hover:bg-trust hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
      secondary:
        "bg-secondary text-background-default shadow-sm hover:bg-[#c2410c] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0", //Deepened orange on hover
      success:
        "bg-accent text-background-default shadow-sm hover:bg-[#047857] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
      outline:
        "border-text-light text-trust bg-transparent hover:bg-background-soft hover:border-primary hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "text-text-primary bg-transparent hover:bg-background-soft active:bg-background-muted",
    };

    // 3. Size Matrix mapped to design scales
    const sizes = {
      sm: "text-small px-3 py-1.5 rounded-sm",
      md: "text-body px-4 py-2 rounded-md", //Default
      lg: "text-h4 px-6 py-3 rounded-md",
      xl: "text-h3 px-8 py-4 rounded-lg shadow-md hover:shadow-lg", //Heavy CTA style
    };
    // Determine absolute disabled state
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {/* Loading state spinner & text override */}
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="font-sans">Processing...</span>
          </>
        ) : (
          <>
            {/* Render left icon if present */}
            {leftIcon && (
              <span className="mr-2 inline-flex items-center">{leftIcon}</span>
            )}
            <span>{children}</span>

            {/* Render right icon if present */}
            {rightIcon && (
              <span className="ml-2 inline-flex items-center">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
