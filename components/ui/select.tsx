"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, CheckCircle2 } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  isSuccess?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder = "Select an option",
      error,
      isSuccess,
      required,
      value,
      onChange,
      disabled,
      name,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = generatedId;
    const errorId = `${selectId}-error`;

    let borderStyles =
      "border-text-light/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20";
    if (error) {
      borderStyles =
        "border-orange-500 focus:border-orange-600 focus-ring-4 focus:ring-orange-500/20";
    } else if (isSuccess) {
      borderStyles =
        "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20";
    }

    return (
      <div className="w-full space-y-2 flex fex-col items-start">
        <label
          id={`${selectId}-label`}
          className="text-small font-bold text-text-primary flex items-center gap-1 select-none"
        >
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <SelectPrimitive.Root
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
        >
          <div className="relative w-full">
            <SelectPrimitive.Trigger
              ref={ref}
              id={selectId}
              aria-labelledby={`${selectId}-label`}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={error ? "true" : "false"}
              className={`flex w-full h-11 items-center justify-between rounded-lg border bg-background-default pl-3.5 pr-10 text-body text-text-primary outline-none transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-left ${borderStyles}`}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon asChild>
                {isSuccess && !error ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 absolute right-10 top-1/2 -translate-y-1/2 fill-current bg-background-default" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
          </div>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-text-light/10 bg-background-default text-text-primary shadow-lg animate-in fade-in-80 scale-in-95 duration-100">
              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-md py-2.5 pl-8 pr-3.5 text-body text-text-primary outline-none focus:bg-blue-50 focus:text-blue-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                  >
                    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 text-blue-600" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

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
Select.displayName = "Select";
