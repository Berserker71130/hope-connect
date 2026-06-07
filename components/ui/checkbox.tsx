"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, CheckCircle2 } from "lucide-react";

export interface CheckboxProps {
  label: string;
  error?: string;
  isSuccess?: boolean;
  required?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      error,
      isSuccess,
      required,
      checked,
      onCheckedChange,
      disabled,
      name,
      id,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;

    let borderStyles =
      "border-text-light/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600";
    if (error) {
      borderStyles =
        "border-orange-500 focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600";
    } else if (isSuccess) {
      borderStyles =
        "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600";
    }

    return (
      <div className="flex flex-col items-start space-y-1">
        <div className="flex items-center space-x-3 py-1 relative w-full">
          <CheckboxPrimitive.Root
            id={checkboxId}
            ref={ref}
            name={name}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            className={`peer h-5 w-5 shrink-0 rounded border bg-background-default outline-none transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center ${borderStyles}`}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          <label
            htmlFor={checkboxId}
            className="text-body font-medium text-text-primary cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 select-none flex items-center gap-1 pr-8"
          >
            {label}
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>

          {isSuccess && !error && (
            <div className="absolute right-0 text-emerald-500">
              <CheckCircle2 className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="text-small font-medium text-orange-600 pl-8"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
