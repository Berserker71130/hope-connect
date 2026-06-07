"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, ExternalLink } from "lucide-react";

// Mocking data using strict 'image' key parameter matching glowhaus configurations
const dummyCampaignData = {
  id: "campaign-1",
  title: "Clean Water Infrastructure Initiative",
  description:
    "Providing sustainable solar-powered water filtration installations across high-need rural medical stations.",
  image:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80",
  raised: "₦4,500,000",
  target: "₦6,000,000",
};

export default function CardTestPage() {
  return (
    <div className="min-h-screen bg-background-muted p-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-text-light/10 pb-6">
        <p className="text-small uppercase tracking-widest text-secondary font-semibold">
          Epic 1 — Ticket #4 Verification
        </p>
        <h1 className="text-h1 text-trust mt-2 font-black">
          Professional Card Matrix
        </h1>
      </div>

      {/* 1. VARIANT TESTING GRID */}
      <section className="space-y-4">
        <h2 className="text-h3 text-text-primary font-bold">
          1. Core Design System Variants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="default">
            <CardHeader>
              <h3 className="text-h4 text-trust font-bold">Default Style</h3>
            </CardHeader>
            <CardContent>
              Standard fallback configuration with light shadows and crisp
              borders.
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-h4 text-trust font-bold">Elevated Style</h3>
            </CardHeader>
            <CardContent>
              No visible outer borders, using an increased premium drop shadow
              array.
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <h3 className="text-h4 text-trust font-bold">Bordered Style</h3>
            </CardHeader>
            <CardContent>
              Explicit brand color outlines suited for structural sections or
              callouts.
            </CardContent>
          </Card>

          <Card variant="featured">
            <CardHeader>
              <h3 className="text-h4 text-trust font-bold">Featured Style</h3>
            </CardHeader>
            <CardContent>
              Infused with a subtle blue tint layout to draw native user
              tracking eyes immediately.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. ACCENT BARS & PADDING VARIATIONS */}
      <section className="space-y-4">
        <h2 className="text-h3 text-text-primary font-bold">
          2. Accent Edge Bars & Padding Control
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card accentBar="blue" padding="md">
            <CardHeader>
              <h3 className="text-h4 text-text-primary font-bold">
                Blue Accent Bar
              </h3>
            </CardHeader>
            <CardContent>
              Generous spacing utilizing default padding parameters.
            </CardContent>
          </Card>

          <Card accentBar="green" padding="lg">
            <CardHeader>
              <h3 className="text-h4 text-text-primary font-bold">
                Green Accent Bar (LG)
              </h3>
            </CardHeader>
            <CardContent>
              Expanded white space buffer limits for heavy corporate content
              blocks.
            </CardContent>
          </Card>

          <Card padding="sm" variant="bordered">
            <CardHeader>
              <h3 className="text-h4 text-text-primary font-bold">
                Compact Layout (SM)
              </h3>
            </CardHeader>
            <CardContent className="text-small">
              Tightened text and structure heights for metadata or sidebars.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. REAL CAMPAIGN INTEGRATION (CRITICAL CRITERIA CHECK) */}
      <section className="space-y-4 max-w-md">
        <h2 className="text-h3 text-text-primary font-bold">
          3. Production Campaign Context Integration
        </h2>

        {/* Card wrapper uses 'padding="none"' to allow the campaign image to flush cleanly against borders */}
        <Card variant="default" padding="none" className="group">
          {/* Strict image paradigm mapping */}
          <div className="relative h-48 w-full overflow-hidden bg-background-muted">
            <img
              src={dummyCampaignData.image}
              alt={dummyCampaignData.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content Wrapper injects the necessary inner padding block context */}
          <div className="p-6 space-y-4">
            <CardHeader>
              <div className="text-xs font-mono text-secondary uppercase font-semibold">
                Active Infrastructure
              </div>
              <h3 className="text-h3 text-trust font-bold mt-1 line-clamp-1">
                {dummyCampaignData.title}
              </h3>
            </CardHeader>

            <CardContent>
              <p className="line-clamp-2 text-body">
                {dummyCampaignData.description}
              </p>

              {/* Dummy Progress Indicators */}
              <div className="mt-4 space-y-1">
                <div className="w-full bg-text-light/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[75%]" />
                </div>
                <div className="flex justify-between text-small font-medium mt-1">
                  <span className="text-text-primary">
                    {dummyCampaignData.raised} raised
                  </span>
                  <span className="text-text-muted">
                    Target: {dummyCampaignData.target}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink className="w-3 h-3" />}
              >
                Details
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Heart className="w-3.5 h-3.5 fill-current" />}
              >
                Donate
              </Button>
            </CardFooter>
          </div>
        </Card>
      </section>
    </div>
  );
}
