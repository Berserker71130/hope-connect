"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isSuccess?: boolean;
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      label,
      error,
      isSuccess,
      required,
      id,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;

    let borderStyles =
      "border-text-light/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20";
    if (error) {
      borderStyles =
        "border-orange-500 focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20";
    } else if (isSuccess) {
      borderStyles =
        "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20";
    }

    return (
      <div className="w-full space-y-2 flex flex-col items-start">
        <label
          htmlFor={textareaId}
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
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            className={`w-full p-3.5 pr-11 bg-background-default text-body text-text-primary rounded-lg border outline-none font-body transition-all placeholder:text-text-muted resize-y min-h-[80px] ${borderStyles} ${className}`}
            {...props}
          />
          {isSuccess && !error && (
            <div className="absolute right-3.5 top-4 text-emerald-500">
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

Textarea.displayName = "Textarea";
