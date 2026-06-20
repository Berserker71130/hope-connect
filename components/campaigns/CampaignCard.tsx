"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Globe } from "lucide-react";
import { Campaign } from "@/lib/dummy-data";
import { Card } from "@/components/ui/card";
import { Badge, BadgeCategory, BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinearProgress } from "@/components/ui/progress";

interface CampaignCardProps {
  campaign: Campaign;
}

// Domain-Driven presentation mappers isolating our core data types safely
const badgeCategoryMap: Record<Campaign["category"], BadgeCategory> = {
  Education: "education",
  Healthcare: "healthcare",
  Environment: "environment",
  "Poverty Relief": "poverty-relief",
  "Disaster Response": "emergency",
};

const badgeStatusMap: Record<Campaign["status"], BadgeVariant> = {
  Active: "active",
  Urgent: "urgent",
  Completed: "completed",
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  // SAFETY GUARD
  if (!campaign) {
    console.warn("CampaignCard was rendered without a valid campaign object.");
    return null;
  }
  const {
    id,
    title,
    description,
    image,
    status,
    currentAmount,
    targetAmount,
    organizationName = "HopeConnect Partner",
    daysRemaining,
  } = campaign;

  const displayCategory =
    campaign.category === "Disaster Response"
      ? "Emergency Response"
      : campaign.category;
  const isUrgent = status === "Urgent";

  // Gracefully render verification badge for criteria completion
  const isVerified = id !== "camp-6";

  return (
    <Link href={`/campaigns/${id}`} className="block w-full group">
      <Card
        variant="default"
        padding="none"
        accentBar={isUrgent ? "blue" : "none"}
        className="flex flex-col h-full bg-white dark:bg-gray-950 overflow-hidden select-none"
      >
        {/* 1. MEDIA HEADER: 16:9 Aspect ratio container */}
        <div className="relative w-full aspect-video bg-background-muted overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />

          {/* Floating Meta Badges Layout Array (Left & Right alignment) */}
          <div className="absolute top-3 inset-x-3 flex flex-wrap gap-1.5 justify-between items-start z-20 pointer-events-none">
            <div className="flex flex-col gap-1.5 items-start">
              <Badge category={badgeCategoryMap[campaign.category]} size="sm">
                {displayCategory}
              </Badge>
              <Badge variant={badgeStatusMap[campaign.status]} size="sm">
                {status}
              </Badge>
            </div>

            {isVerified && (
              <Badge variant="verified" size="sm" className="backdrop-blur-sm">
                Verified
              </Badge>
            )}
          </div>
        </div>

        {/* 2. CARD CONTENT METADATA ZONE */}
        <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
          <div className="space-y-2">
            {/* Organization Identifier Row */}
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold tracking-wide uppercase">
              <Globe className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span className="truncate max-w-[200px]">{organizationName}</span>
            </div>

            {/* Campaign Action Title: Clamped to 2 lines max */}
            <h3 className="text-body font-sans font-extrabold text-text-primary line-clamp-2 tracking-tight group-hover:text-primary transition-colors leading-snug">
              {title}
            </h3>

            {/* Contextual Narrative Description: Clamped to 3 lines max */}
            <p className="text-small font-body text-text-muted line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* 3. PERFORMANCE GOAL METRIC AND ACTION ROW */}
          <div className="space-y-4 pt-1 shrink-0">
            <LinearProgress
              value={currentAmount}
              max={targetAmount}
              isCurrency={true}
              variant={isUrgent ? "orange" : "blue"}
              showPercentText={true}
            />

            <div className="flex items-center justify-between gap-3 pt-0.5">
              {/* Optional Urgent Timer Display */}
              {isUrgent && daysRemaining ? (
                <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                  <span>{daysRemaining} Days Left</span>
                </div>
              ) : (
                <div className="text-[11px] text-text-muted font-medium">
                  Tax-Deductible
                </div>
              )}

              <Button
                variant={status === "Completed" ? "outline" : "primary"}
                size="md"
                className="font-sans tracking-wide shrink-0 pointer-events-none"
                disabled={status === "Completed"}
              >
                {status === "Completed" ? "Finished" : "Donate Now"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
