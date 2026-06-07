"use client";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { useState } from "react";

export default function ButtonTestPage() {
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const triggerLoadingDemo = () => {
    setIsDemoLoading(true);
    setTimeout(() => setIsDemoLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background-muted p-8 space-y-12">
      {/* Header */}
      <div className="border-b border-text-light/10 pb-6">
        <p className="text-small uppercase tracking-widest text-secondary font-semibold">
          Epic 1 — Ticket #3 Verification
        </p>
        <h1 className="text-h1 text-trust mt-2 font-black">
          Button Component Matrix
        </h1>
      </div>

      {/* 1. Core Variants */}
      <section className="bg-background-default p-6 rounded-md shadow-sm space-y-4">
        <h2 className="text-h3 text-text-primary border-b pb-2">
          1. Required Variants
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Donate Now (Secondary)</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="outline">Outline Style</Button>
          <Button variant="ghost">Ghost Style</Button>
        </div>
      </section>

      {/* 2. Explicit Sizing Scale */}
      <section className="bg-background-default p-6 rounded-md shadow-sm space-y-4">
        <h2 className="text-h3 text-text-primary border-b pb-2">
          2. Sizing Scale
        </h2>
        <div className="flex flex-wrap gap-4 items-baseline">
          <Button size="sm">Small (sm)</Button>
          <Button size="md">Medium / Default (md)</Button>
          <Button size="lg">Large (lg)</Button>
          <Button size="xl">Extra Large CTA (xl)</Button>
        </div>
      </section>

      {/* 3. Icon Support Integration */}
      <section className="bg-background-default p-6 rounded-md shadow-md space-y-4">
        <h2 className="text-h3 text-text-primary border-b pb-2">
          3. Icon Support (Lucide React)
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            variant="secondary"
            leftIcon={<Heart className="w-4 h-4 fill-current" />}
          >
            Donate Now
          </Button>
          <Button
            variant="primary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Learn More
          </Button>
          <Button
            variant="success"
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            Secure Gateway
          </Button>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Download Report
          </Button>
        </div>
      </section>

      {/* 4. State Verification (Hover, Active, Disabled, Loading) */}
      <section className="bg-background-default p-6 rounded-lg shadow-professional space-y-4">
        <h2 className="text-h3 text-text-primary border-b pb-2">
          4. State Controls & Feedback
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          {/* Static Disabled State */}
          <div className="space-y-1">
            <span className="text-xs text-text-muted block font-mono">
              Disabled State
            </span>
            <Button variant="primary" disabled>
              Unavailable Action
            </Button>
          </div>

          {/* Interactive Loading Demo */}
          <div className="space-y-1">
            <span className="text-xs text-text-muted block font-mono">
              Interactive Loading State
            </span>
            <Button
              variant="primary"
              isLoading={isDemoLoading}
              onClick={triggerLoadingDemo}
            >
              {isDemoLoading ? "Processing..." : "Click to Test Loader"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
