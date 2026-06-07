"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isSuccess?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, error, isSuccess, required, id, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    let borderStyles =
      "border-text-light/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20";
    if (error) {
      borderStyles =
        "border-orange-500 focus:border-orange-600 focus:ring-orange-500/20";
    } else if (isSuccess) {
      borderStyles =
        "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20";
    }

    return (
      <div className="w-full space-y-2 flex flex-col items-start">
        <label
          htmlFor={inputId}
          className="text-small font-bold text-text-primary flex items-center gap-1 select-none"
        >
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div className="relative w-full">
          <input
            id={inputId}
            ref={ref}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-11 px-3.5 bg-background-default text-body text-text-primary rounded-lg border outline-none font-body transition-all placeholder:text-text-muted ${borderStyles} ${className}`}
            {...props}
          />
          {isSuccess && !error && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
              <CheckCircle2 className="w-5 h-5 fill-current bg-background-default" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="text-small font-medium text-orange-600 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
