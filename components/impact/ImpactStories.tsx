"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { dummyImpactStories } from "@/lib/dummy-data";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function ImpactStories() {
  // 1. Task: Auto platy with 7s interval (pause on hover) configured via standard plugin
  const autoPlayPlugin = React.useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // 2. Task: Carousel layout engine (3 visible on desktop, 1 on mobile via container styling)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      containScroll: "trimSnaps",
    },
    [autoPlayPlugin.current],
  );

  //   3. Accessibility & Interactive Navigation Sub-States
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-labelledby="stories-of-hope-heading"
      className="relative w-full py-28 bg-background-default overflow-hidden border-t border-text-light/10 group/carousel"
    >
      {/* Aesthetic Layer: Subtle radial glow to elevate white component tracks */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/[0.02] dark:bg-primary/[0.01] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/[0.02] dark:-secondary/[0.01] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TASK COMPLIANCE: Section: Stories of Hope */}
        <div className="flex flex-col space-y-4 max-w-3xl mb-16">
          <h2
            id="stories-of-hope-heading"
            className="text-4xl lg:text-5xl font-heading font-black text-gray-900 dark:text-white tracking-tight leading-none"
          >
            Stories Of Hope
          </h2>
          <div
            className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            aria-hidden="true"
          />
          <p className="text-base text-text-muted font-body leading-relaxed pt-2">
            Real, verified transformations from our field-level networks. Read
            direct first-hand accounts detailing how community actions are
            helping beneficiaries build independent, stable futures.
          </p>
        </div>

        {/* Carousel Window Frame wrapper container context */}
        <div className="relative w-full">
          {/* TASK COMPLIANCE: Navigation - Arrow on Hover / Keyboard Focus */}
          {/* Absolutely positioned within precise visual offsets; Opacity shifts safely on container hover states */}
          <div className="hidden md:block">
            <button
              onClick={scrollPrev}
              disabled={
                !canScrollPrev && !emblaApi?.internalEngine().options.loop
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-text-light/10 bg-white dark:bg-slate-900 text-text-primary hover:bg-background-soft hover:text-primary active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 shadow-md opacity-0 focus-within:opacity-100 group-hover/carousel:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust cursor-pointer"
              aria-label="Previous success story slide"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={scrollNext}
              disabled={
                !canScrollNext && !emblaApi?.internalEngine().options.loop
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-text-light/10 bg-white dark:bg-slate-900 text-text-primary hover:bg-background-soft hover:text-primary active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 shadow-md opacity-0 focus-within:opacity-100 group-hover/carousel:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust cursor-pointer"
              aria-label="Next success story slide"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* TASK COMPLIANCE: Mobile: Swipe gestures function natively via the embla viewport */}
          <div
            className="w-full overflow-hidden select-none"
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
          >
            {/* Slide Track Container */}
            <div className="flex gap-6 pl-[1px] py-2">
              {/* TASK COMPLIANCE: Stories derived safely from strongly typed dummy dataset */}
              {dummyImpactStories.map((story, index: number) => {
                return (
                  <div
                    key={story.id}
                    className="flex-none w-full md:w-[calc(50%-12px] lg:w-[calc(33.333%-16px)] flex flex-col"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Story ${index + 1} of ${dummyImpactStories.length}`}
                  >
                    {/* ACCEPTANCE CRITARIA: Dignified, professional, premium card component layout */}
                    {/* Embeds core Framer-Motion wrapper transitions automatically via isHoverable */}
                    <Card
                      variant="default"
                      padding="lg"
                      isHoverable={true}
                      className="flex flex-col h-full bg-white dark:bg-slate-900 border border-text-light/10 relative overflow-hidden group/card"
                    >
                      {/* TASK COMPLIANCE: Large, premium editorial quatation mamrk graphic decoration element */}
                      <div
                        className="absolute top-6 right-8 text-slate-100 dark:text-slate-800/40 pointer-events-none select-none transition-colors duration-300 group-hover/card:text-primary/10"
                        aria-hidden="true"
                      >
                        <Quote className="w-20 h-20 stroke-[1.2] fill-current transform rotate-180" />
                      </div>

                      <CardHeader className="p-0 pb-5 relative z-10">
                        {/* Interactive dynamic Badge mapping linking directly to badge.tsx category resolvers */}
                        <div className="mb-4">
                          <Badge category={story.category} size="sm">
                            {story.category.replace("-", " ")}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2 min-h-[3.5rem]">
                          {story.title}
                        </h3>
                      </CardHeader>

                      {/* TASK COMPLIANCE & ACCEPTANCE CRITERIA: Emotionally engaging yet honest narrative content */}
                      <CardContent className="p-0 flex flex-col flex-grow relative z-10">
                        {/* 2-3 sentence blockquote layout element */}
                        <blockquote className="text-[15px] font-body font-semibold italic text-slate-800 dark:text-slate-200 leading-relaxed mb-5 border-l-2 border-primary pl-4 py-0.5">
                          "{story.quote}"
                        </blockquote>

                        <p className="text-sm leading-relaxed text-text-muted font-body line-clamp-4 mb-6">
                          {story.narrative}
                        </p>
                      </CardContent>

                      {/* Profile Metrics and Deep-link Redirect Footer tracking */}
                      <CardFooter className="p-0 pt-5 mt-auto flex items-center justify-between gap-4 border-t border-text-light/10 relative z-10">
                        {/* Beneficiary Identity Stack */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Dignified, high-quality photograph container */}
                          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-background-soft shrink-0 border border-text-light/10 shadow-inner">
                            <img
                              src={story.image}
                              alt={`Dignified portrait of ${story.beneficiary}`}
                              className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 group-hover/card:scale-105"
                              loading="lazy"
                            />
                          </div>

                          {/* Beneficiary Name & Country/Regional Location parameters */}
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-heading font-black text-slate-900 dark:text-white truncate">
                              {story.beneficiary}
                            </span>
                            <span className="text-xs text-text-muted font-body truncate">
                              {story.location}
                            </span>
                          </div>
                        </div>
                        {/* Read full story deep-link link styled gracefully with button tokens */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-trust font-sans font-bold uppercase tracking-wider text-[11px] p-0 hover:bg-transparent transition-colors group/btn shrink-0"
                          rightIcon={
                            <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                          }
                        >
                          Read Full
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation - Dots directly below the carousel track frame */}
        <div className="mt-12 flex items-center justify-center gap-2.5">
          {scrollSnaps.map((_, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust ${
                  isSelected
                    ? "w-8 bg-primary shadow-sm"
                    : "w-2 bg-text-light/20 hover:bg-text-light/40 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
                role="button"
                aria-label={`Navigate directly to slide frame position ${index + 1}`}
                aria-current={isSelected ? "true" : "false"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
