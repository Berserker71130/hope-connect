"use client";

import * as React from "react";
import Image from "next/image";
import { Campaign } from "@/lib/dummy-data";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  const displayCategory =
    campaign.category === "Disaster Response"
      ? "Emergency Response"
      : campaign.category;
  const isUrgent = campaign.status === "Urgent";

  return (
    <Card
      variant="default"
      padding="none"
      accentBar={isUrgent ? "blue" : "none"}
      className="flex flex-col h-[460px] group select-none"
    >
      {/* Header Banner Block Container */}
      <div className="relative w-full h-48 bg-background-muted overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        {/* Floating Meta Badges Layout Array */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          <Badge category={badgeCategoryMap[campaign.category]} size="sm">
            {displayCategory}
          </Badge>
          <Badge variant={badgeStatusMap[campaign.status]} size="sm">
            {campaign.status}
          </Badge>
        </div>
      </div>

      {/* Main Structural Typography Grid Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <h3 className="text-body font-sans font-extrabold text-text-primary line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
            {campaign.title}
          </h3>
          <p className="text-small font-body text-text-muted line-clamp-3 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Dynamic Financial Progress Engine Section */}
        <div className="space-y-3 pt-3">
          <LinearProgress
            value={campaign.currentAmount}
            max={campaign.targetAmount}
            isCurrency={true}
            variant={isUrgent ? "orange" : "blue"}
            showPercentText={true}
          />
          <Button
            variant={campaign.status === "Completed" ? "outline" : "primary"}
            size="md"
            className="w-full font-sans tracking-wide"
            disabled={campaign.status === "Completed"}
          >
            {campaign.status === "Completed"
              ? "Campaign Finished"
              : "Donate Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
