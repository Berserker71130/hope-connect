"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
// Absolute UI Core Token Dependencies from checked files
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
// Single source of truth import straight from updated mock dataset
import { dummyOpportunities } from "@/lib/dummy-data";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";

export default function VolunteerTeaser() {
  // Initialize the premium carousel hook matching package-lock.json dependency specs
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  return (
    <section className="relative w-full py-24 bg-background-default overflow-hidden border-t border-text-light/5">
      {/* Premium background design layers to establish an expensive visual aesthetic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] dark:bg-indigo-500/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] dark:bg-emerald-500/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TASK COMPLIANCE - Section: Make a Difference heading */}
        <div className="flex flex-col md:flex-row md:item-end justify-between gap-6 pb-10 border-b border-text-light/10 mb-16">
          <div className="space-y-4 max-w-2xl">
            {/* The explicit requested callout label */}
            <div className="inline-flex items-center gap-2">
              <Badge
                variant="active"
                size="sm"
                icon={<Sparkles className="h-3 w-3" />}
              >
                Make a Difference
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-gray-900 dark:text-white tracking-tight leading-none">
              Volunteer Opportunities
            </h2>
            <p className="text-base text-text-muted font-body leading-relaxed">
              Join forces with specialized local operational teams. Track
              achievable commitments, self-select your skill alignments, and
              drive immediate progress.
            </p>
          </div>
        </div>

        {/* TASK COMPLIANCE - Horizontal Carousel Layout System via Embla */}
        {/* Embla Hierarchy Tier 1: Viewport Frame (The Mask) */}
        <div
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
          ref={emblaRef}
        >
          {/* Embla Hierarchy Tier 2: Container (The Horizontal Slide Track) */}
          <div className="flex gap-6">
            {/* Embla Hierarchy 3: Individual Slides (Mapping 3-4 items perfectly) */}
            {dummyOpportunities.map((opportunity) => {
              return (
                <div
                  key={opportunity.id}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
                >
                  {/* TASK COMPLIANCE & REFACTOR - Card using exact structural */}
                  {/* Passed pading ='none explicitly to let imagery sit beautifully flush */}
                  <Card
                    variant="default"
                    padding="none"
                    isHoverable={true}
                    className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    {/* TASK COMPLIANCE - Image: volunteers in action */}
                    <div className="relative w-full h-56 overflow-hidden bg-background-soft shrink-0">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        loading="lazy"
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* TASK COMPLIANCE - Automatic styling mapping from strict lowercase properties */}
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <Badge category={opportunity.category as any} size="sm">
                          {opportunity.category.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Unified Interior Layout Context Frame */}
                    <div className="flex flex-col flex-grow p-6">
                      {/* TASK COMPLIANCE - Opportunity title wrapped safely in a  structured header block */}
                      <CardHeader className="p-0 pb-3">
                        <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-snug min-h-[3.5rem] flex items-center">
                          {opportunity.title}
                        </h3>
                      </CardHeader>

                      {/* Content section container */}
                      <CardContent className="p-0 flex flex-col gap-5 flex-grow">
                        {/* Dynamic Core Meta Data Rows */}
                        <div className="space-y-2.5 text-sm text-text-muted font-body">
                          {/* TASK COMPLIANCE - Location */}
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary shrink-0 stroke-[2.5]" />
                            <span className="truncate max-w-[280px] font-medium text-slate-600 dark:text-slate-400">
                              {opportunity.location}
                            </span>
                          </div>

                          {/* TASK COMPLIANCE & ACCEPTANCE CRITERIA - Time commitments are clear */}
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {opportunity.timeCommitment}
                            </span>
                          </div>
                        </div>

                        {/* Informative description abstract layer */}
                        <p className="text-sm leading-relaxed text-text-muted font-body line-clamp-3 h-[4.5rem]">
                          {opportunity.description}
                        </p>

                        {/* TASK COMPLIANCE & ACCEPTANCE CRITERIA - Skills needed help people self-select */}
                        <div className="pt-2 border-t border-text-light/5">
                          <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-2.5 font-sans">
                            Required Skills
                          </div>
                          <div className="flex flex-wrap gap-1.5 min-h-[2.5rem] content-start">
                            {opportunity.skillsNeeded?.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="verified"
                                size="sm"
                                className="font-semibold text-[10px]"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>

                      {/* TASK COMPLIANCE - Sign Up button embedded securely inside layout footer */}
                      <CardFooter className="p-0 pt-4 mt-6">
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Sign Up
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* TASK COMPLIANCE - View All Opportunities Link sitting centrally underneath */}
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="font-sans font-bold uppercase tracking-wider min-w-[240px]"
          >
            View All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
