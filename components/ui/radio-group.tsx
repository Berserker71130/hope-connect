"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckCircle2 } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  error?: string;
  isSuccess?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      options,
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
    const groupLabelId = `${generatedId}-label`;
    const errorId = `${generatedId}-error`;

    return (
      <div className="w-full space-y-2 flex flex-col items-start" ref={ref}>
        <div className="flex items-center justify-between w-full">
          <label
            id={groupLabelId}
            className="text-small font-bold text-text-primary flex items-center gap-1 select-none"
          >
            {label}
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
          {isSuccess && !error && (
            <div className="text-emerald-500">
              <CheckCircle2 className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>

        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
          aria-labelledby={groupLabelId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? "true" : "false"}
          className="flex flex-col space-y-2 w-full"
        >
          {options.map((option) => {
            const itemId = `$generatedId-${option.value}`;
            let itemBorder =
              "border-text-light/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 data-[state=checked]:border-blue-600";
            if (error) {
              itemBorder =
                "border-orange-500 focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 data-[state=checked]:border-orange-600";
            } else if (isSuccess) {
              itemBorder =
                "border-emeraled-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 data-[state=checked]:border-emerald-600";
            }

            return (
              <div
                key={option.value}
                className="flex items-center space-x-3 py-1"
              >
                <RadioGroupPrimitive.Item
                  value={option.value}
                  id={itemId}
                  className={`peer h-5 w-5 rounded-full border bg-background-default outline-none transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center ${itemBorder}`}
                >
                  <RadioGroupPrimitive.Indicator className="flex items-center justify-center after:content-[' '] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-blue-600 data-[state=checked]:after:bg-blue-600 data-[state=checked]:after:data-[disabled]:bg-text-light/40" />
                </RadioGroupPrimitive.Item>
                <label
                  htmlFor={itemId}
                  className="text-body font-medium text-text-primary cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50 select-none"
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </RadioGroupPrimitive.Root>

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
RadioGroup.displayName = "RadioGroup";
