"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";

const testSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  bio: z.string().min(15, "Bio must be a descriptive block (min 15 chars)."),
  framework: z
    .string()
    .min(1, "You must select a primary architecture framework."),
  environment: z.string().min(1, "Please pick a deployment runtime target."),
  terms: z
    .boolean()
    .refine((val) => val === true, "Acknowledge compliance to proceed."),
});

type TestFormValues = z.infer<typeof testSchema>;

export default function CompleteFormTestPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      username: "",
      bio: "",
      framework: "",
      environment: "",
      terms: false,
    },
  });

  const onSubmit = (data: TestFormValues) => {
    console.log("Verified System State Matrix:", data);
    alert("Form Submitted Successfully!");
  };

  return (
    // EXPANDED: Changed to w-full and maximum screen padding for desktop optimization
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-16 w-full font-sans">
      <div className="w-full space-y-8">
        {/* Full Width Header */}
        <div className="border-b border-gray-200 pb-5 w-full">
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verification Sandbox — Issue UI-04 (#5)
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-3">
            Form Primitive Audit Environment
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Testing focus rings, error validations, success checkmarks, and WCAG
            accessibility loops across a full desktop canvas.
          </p>
        </div>

        {/* EXPANDED: Swapped to a 2-column wide grid for desktop layout */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white p-10 rounded-xl shadow-md border border-gray-100 w-full grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column Group */}
          <div className="space-y-6">
            <Input
              label="System Operator Alias"
              placeholder="e.g., dev_alpha"
              required
              error={errors.username?.message}
              isSuccess={touchedFields.username && !errors.username}
              {...register("username")}
            />

            <Controller
              name="framework"
              control={control}
              render={({ field }) => (
                <Select
                  label="Primary Architecture Framework"
                  placeholder="Select core package..."
                  required
                  error={errors.framework?.message}
                  isSuccess={touchedFields.framework && !errors.framework}
                  options={[
                    { value: "next", label: "Next.js Core SSR Engine" },
                    { value: "remix", label: "Remix Data Router Kit" },
                    { value: "vite", label: "Vanilla React Bundle (Vite)" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  ref={field.ref}
                />
              )}
            />

            <Controller
              name="environment"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Deployment Target Zone"
                  required
                  error={errors.environment?.message}
                  isSuccess={touchedFields.environment && !errors.environment}
                  options={[
                    {
                      value: "edge",
                      label: "Global Edge Clusters (Zero Latency)",
                    },
                    {
                      value: "origin",
                      label: "Centralized Dedicated Origin Servers",
                    },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  ref={field.ref}
                />
              )}
            />
          </div>

          {/* Right Column Group */}
          <div className="space-y-6 flex flex-col justify-between">
            <Textarea
              label="Operational Environment Scope"
              placeholder="Describe your runtime clustering strategies and configuration mappings..."
              required
              error={errors.bio?.message}
              isSuccess={touchedFields.bio && !errors.bio}
              className="min-h-[150px]"
              {...register("bio")}
            />

            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="I authorize runtime cluster reconfiguration parameters and state definitions."
                  required
                  error={errors.terms?.message}
                  isSuccess={touchedFields.terms && !errors.terms}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
                  name={field.name}
                />
              )}
            />

            {/* Form Actions spanning full width of its column */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-all focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center cursor-pointer text-sm"
              >
                Verify Core Systems & Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
