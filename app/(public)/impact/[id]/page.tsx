"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge, BadgeCategory, BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LinearProgress } from "@/components/ui/progress";
import { dummyImpactStories, dummyCampaigns } from "@/lib/dummy-data";
import {
  ArrowLeft,
  BookmarkCheck,
  Calendar,
  Compass,
  Heart,
  Link2,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

export default function ImpactStoryDetailPage() {
  const router = useRouter();
  const params = useParams();

  // Safe normalization handling for route parameters
  const storyId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  //1. Core Data Retrieval Layer
  const story = dummyImpactStories.find((item) => item.id === storyId);

  // 2. Related Content Filtering Engine (Find 3 contextual success stories)
  const finalRelatedStories = React.useMemo(() => {
    if (!story) return [];

    // First group: matching categories
    const matchingCategory = dummyImpactStories.filter(
      (item) => item.id != story.id && item.category === story.category,
    );

    // Second group: remaining stories to fill exactly 3 slots
    const alternativeCategory = dummyImpactStories.filter(
      (item) => item.id !== story.id && item.category !== story.category,
    );

    return [...matchingCategory, ...alternativeCategory].slice(0, 3);
  }, [story]);

  // 3. Crosslinked Campaign Call to action mapping
  const linkedCampaign = React.useMemo(() => {
    if (!story) return null;
    return (
      dummyCampaigns.find((c) => c.id === story.relatedCampaignId) ||
      dummyCampaigns[0]
    );
  }, [story]);

  // Client mounting tracking for hydration security
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Exception  handling for unrecorded ledger nodes
  if (!story) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8 text-center space-y-6 font-sans">
        <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center text-red-600">
          <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900">
            Record Registry Absent
          </h1>
          <p className="text-neutral-500 max-w-md text-sm font-body">
            The target impact tracking profile code cannot be validated inside
            our seed file configurations.
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          onClick={() => router.push("/impact")}
        >
          Return to Registry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 antialiased selection:bg-blue-50 selection:text-blue-900 pb-32">
      {/* STICKY TOP NAVIGATION ARCHITECTURE */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 py-3.5 px-4 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/impact")}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Back to Overview
          </Button>

          {/* CRITERIA: SHARE BUTTON WITH MICRO INTERACTIONS */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold text-gray-400 uppercase tracking-widest mr-1">
              Share Story:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}`,
                  "_blank",
                )
              }
              className="h-9 w-9 p-0 rounded-full border-gray-200"
              title="Share on X"
            >
              <FaSquareXTwitter className="w-4 -4 text-gray-500 hover:text-blue-400 transition-colors" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
              className="h-9 w-9 p-0 rounded-full border-gray-200"
              title="Share on Facebook"
            >
              <FaFacebook className="w-4 h-4 text-gray-500 hover:text-blue-600 transition-colors" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Story clipboard target generated safely");
              }}
              className="h-9 w-9 p-0 rounded-full border-gray-200"
              title="Copy System Link"
            >
              <Link2 className="w-4 h-4 text-gray-500 hover:text-emerald-600 transition-colors" />
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. PREMIUM STORY HEADER EDITORIAL HERO */}
      <header className="relative bg-white border-b border-gray-100 overflow-hidden mb-16">
        <div className="max-w-6xl mx-auto pt-14 pb-14 px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Metadata String Layers */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Badge category={story.category as BadgeCategory} size="md">
              {story.category}
            </Badge>
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="inline-flex items-center gap-1.55 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" /> Field
              Term {story.year}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />{" "}
              {story.location}
            </span>
          </div>

          {/* Large Scale Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tet-gray-900 tracking-tight leading-[1.12] max-w-5xl">
            {story.title}
          </h1>

          {/* Credibility Verified Sub-Banner Frame */}
          <div className="inline-flex items-center gap-3 bg-emerald-50/70 border border-emerald-100 px-5 py-3 rounded-2xl max-w-3xl shadow-xs">
            <div className="h-6 w-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
              <BookmarkCheck className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm font-body font-semibold text-emerald-800 leading-tight">
              <span className="font-sans font-black uppercase text-[10px] tracking-widest text-emerald-600 block mb-0.5">
                Verified Structural Outcome
                {story.outcome}
              </span>
            </p>
          </div>
        </div>

        {/* Hero Visual Frame (Dignified representation alignment) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-950 group">
            <img
              src={story.image}
              alt={`${story.beneficiary}'s field environment documentation background context`}
              className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-[1.005]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-transparent" />
          </div>
        </div>
      </header>

      {/* 3. CORE MATRIX COLUMN CONFIGURATION PLATFORM */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COMPARTMENT: CHRONOLOGICAL PROCESS SPLITS & NARRATIVES (8 COLS) */}
        <div className="lg:col-span-8 space-y-14">
          {/* CRITERIA: BENEFICIARY PROFILE LAYER */}
          <Card
            variant="default"
            padding="lg"
            accentBar="blue"
            isHoverable={false}
            className="bg-white border-gray-100 shadow-sm rounded-2xl"
          >
            <CardHeader className="p-0 pb-4 border-b border-gray-100 flex flex-row items- center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-sans font-black uppercase tracking-wider text-gray-900">
                  Beneficiary Ledger Dossier
                </h2>
                <p className="text-[11px] text-gray-400 font-medium font-body">
                  Dignified Profile Documentation Transparency
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body">
              <div className="space-y-1">
                <span className="text-xs uppercase font-black text-gray-400 tracking-wide block">
                  Legal Name / Handle
                </span>
                <p className="font-bold text-gray-800 text-base">
                  {story.beneficiary}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-black text-gray-400 tracking-wide block">
                  Identified Age Status
                </span>
                <p className="font-bold text-gray-700 text-base">
                  {story.beneficiaryAge || "Anonymous Profile Option Verified"}
                </p>
              </div>
              <div className="sm:col-span-3 space-y-1.5 pt-2 border-t border-gray-50">
                <span className="text-xs uppercase font-black text-gray-400 tracking-wide block">
                  Socio-Economic Background Framework
                </span>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {story.beneficiaryBackground ||
                    "No previous records historical entry declared."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CRITERIA: CLEAR BEFORE / OUR WORK / AFTER CHRONOLOGICAL NARRATIVE PIPELINE */}
          <div className="space-y-10 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {/* A. THE BEFORE SECTION */}
            <div className="space-y-3 relative pl-10 group">
              <div className="absolute left-[3px] top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-4 ring-white transition-transform group-hover:scale-125 duration-300" />
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Baseline Challenge Status
                </span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  The Situation Before NGO Intervention
                </h3>
              </div>
              <p className="text-gray-600 font-body text-base leading-relaxed whitespace-pre-line bg-white border border-gray-100/50 p-5 rounded-2xl shadow-2xs">
                {story.beforeSituation}
              </p>
            </div>

            {/* B. THE OUR WORK SECTION */}
            <div className="space-y-3 relative pl-10 group">
              <div className="absolute left-[3px] top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-white transition-transform group-hover:scale-125 duration-300" />
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Operational Deployment Strategy
                </span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Our Work & Provided Infrastructure Resources
                </h3>
              </div>
             <p className="text-gray-600 font-body text-base leading-relaxed whitespace-pre-line bg-white border border-gray-100/50 p-5 rounded-2xl shadow-2xs">
                {story.ourWork}
              </p>
            </div>

            {/* C. THE AFTER SECTION */}
            <div className="space-y-3 relative pl-10 group">
              <div className="absolute left-[3px] top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-white transition-transform group-hover:scale-125 duration-300" />
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Optimized Current Status
                </span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Current Outlook, Outcomes & Future Outlook
                </h3>
              </div>
              <p className="text-gray-600 font-body text-base leading-relaxed whitespace-pre-line bg-white border border-gray-100/50 p-5 rounded-2xl shadow-2xs">
                {story.afterSituation}
              </p>
            </div>
          </div>

          {/* CRITERIA: PHOTO GALLERY / BEFORE & AFTER VISUAL EVIDENCE GRID */}
          {story.gallery && story.gallery.length >= 2 ? (
            <div className="space-y-5 pt-4">
              <div className="space-y-1">
                <h3 className="text-sm font-sans font-black uppercase tracking-wider text-gray-900">
                  Before & After Comparative Ledger
                </h3>
                <p className="text-xs text-gray-400 font-body">
                  Audited photographic evidence tracking the baseline scenario transformation against implemented infrastructure configurations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Baseline Snapshot (Before) */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-100 group">
                  <img
                    src={story.gallery[0]}
                    alt="Historical baseline condition pre-intervention"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute bottom-3 left-3 bg-amber-600 backdrop-blur-md text-white font-sans text-[10px] px-2.5 py-1 rounded-lg uppercase font-bold tracking-widest border border-white/10 shadow-sm">
                    Baseline Condition
                  </div>
                </div>

                {/* Modern Operational State (After) */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border border-emerald-100 bg-gray-100 group">
                  <img
                    src={story.gallery[1]}
                    alt="Modern operational state deployment transformation"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute bottom-3 left-3 bg-emerald-600 backdrop-blur-md text-white font-sans text-[10px] px-2.5 py-1 rounded-lg uppercase font-bold tracking-widest border border-white/10 shadow-sm">
                    Post-Deployment Output
                  </div>
                </div>
              </div>
            </div>
          ) : story.gallery && story.gallery.length === 1 ? (
            /* Fallback single asset container alignment */
            <div className="space-y-5 pt-4">
              <div className="space-y-1">
                <h3 className="text-sm font-sans font-black uppercase tracking-wider text-gray-900">
                  Field Photography & Verification Capture Logs
                </h3>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-100">
                <img
                  src={story.gallery[0]}
                  alt="Field validation tracking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : null}

          {/* CRITERIA: EMOTIONALLY ENGAGING IMPACT PULL QUOTE */}
          <div className="relative py-12 px-8 sm:px-12 rounded-3xl bg-gradient-to-br from-gray-900 to-slate-950 text-white shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            <Quote className="absolute right-8 top-6 h-28 w-28 text-white/5 pointer-events-none select-none stroke-[1]" />

            <div className="relative space-y-6 z-10 text-center sm:text-left">
              <span className="inline-flex h-7 w-7 rounded-lg bg-blue-500/10 text-blue-400 items-center justify-center border border-blue-500/20 text-xs font-bold">
                "
              </span>
              <blockquote className="font-serif italic text-xl sm:text-3xl text-slate-100 leading-relaxed">
                {story.quote}
              </blockquote>
              <div className="h-[1px] w-12 bg-blue-500/50 mx-auto sm:mx-0" />
              <p className="text-xs font-sans font-black uppercase text-blue-400 tracking-widest">
                - Signed Declaration / Direct Account From {story.beneficiary}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COMPARTMENT: COMPONENT METRIC PROGRESS & ACTIVE DONATE PIPELINES (4 COLS) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          {/* CRITERIA: AUDITED PROGRESS METRICS BAR (ADD CREDIBILITY) */}
          <Card
            variant="default"
            padding="md"
            isHoverable={false}
            className="bg-white border-gray-100 shadow-sm rounded-2xl space-y-6"
          >
            <div className="space-y-1 pb-3 border-b border-gray-50">
              <h3 className="text-xs font-sans font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Audited Target Metrics
              </h3>
              <p className="text-[11px] text-gray-400 font-body">
                Quantifiable tracking indices mapped from sector ledger loops
              </p>
            </div>

            <div className="space-y-5">
              {story.metricsProgress?.map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-sans">
                    <span className="text-gray-500 truncate max-w-[160px]">
                      {metric.label}
                    </span>
                    <span className="text-emerald-700 font-mono bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                      {metric.displayValue}
                    </span>
                  </div>
                  <LinearProgress
                    value={metric.percentageValue}
                    max={100}
                    variant="green"
                    showPercentText={false}
                    label=""
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* CRITERIA: HOW YOU CAN HELP ACTION PATH PIPELINE CARD */}
          {linkedCampaign && (
            <Card
              variant="featured"
              padding="lg"
              isHoverable={false}
              className="bg-gradient-to-br from-blue-50/60 via-indigo-50/20 to-transparent border border-blue-100/70 shadow-md rounded-2xl space-y-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-3">
                <div className="inline-flex h-8 w-8 rounded-xl bg-blue-600 text-white items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-sans font-black text-gray-900 tracking-tight">
                    How You Can Help
                  </h3>
                  <p className="text-xs text-gray-500 font-body leading-relaxed">
                    Transformative tracking arrays rely directly on ongoing infrastructure investments. Fund expansion allocations today to secure more stories like {story.beneficiary}'s.
                  </p>
                </div>
              </div>

              {/* Connected Funding Track Connected Infrastructure Target Snapshot Block */}
              <div className="p-4 bg-white border border-blue-100 rounded-xl space-y-3 shadow-2xs">
                <span className="text-[9px] font-sans font-black uppercase tracking-widest text-blue-600 block">
                  Connected Funding Track
                </span>
                <p className="text-xs font-bold tracking-tight text-gray-900 line-clamp-2">
                  {linkedCampaign.title}
                </p>

                <div className="pt-1">
                  <LinearProgress
                    value={linkedCampaign.currentAmount}
                    max={linkedCampaign.targetAmount}
                    variant="blue"
                    isCurrency={true}
                    showPercentText={true}
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="xl"
                rightIcon={<Compass className="w-4 h-4" />}
                className="w-full text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-3 shadow-sm rounded-xl"
              >
                Sponsor Active Pipeline Track
              </Button>
            </Card>
          )}
        </div>
      </main>

      {/* CRITERIA $: RELATED SUCCESS STORIES REGISTER FOOTER DRAWER GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 pt-14 border-t border-gray-100 space-y-8">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-blue-600">
            Continuous Evaluation Index
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            Explore Related Transformations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finalRelatedStories.map((storyItem) => (
            <Card
              key={storyItem.id}
              variant="default"
              padding="none"
              className="group flex flex-col justify-between h-full bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-lg transition-all overflow-hidden cursor-pointer"
              onClick={() => router.push(`/impact/${storyItem.id}`)}
            >
              <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                <img
                  src={storyItem.image}
                  alt={storyItem.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <Badge category={storyItem.category as BadgeCategory} size="sm">
                    {storyItem.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <span className="text-[9px] font-sans font-black text-gray-400 uppercase tracking-widest block">
                    <MapPin className="w-2.5 h-2.5 inline mr-1" /> {storyItem.location}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">
                    {storyItem.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-body line-clamp-2 leading-relaxed">
                    {storyItem.narrative}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] font-sans font-bold text-gray-600">
                  <span className="truncate max-w-[130px] font-medium text-gray-400 font-body">
                    Recipient: <span className="font-bold text-gray-700">{storyItem.beneficiary}</span>
                  </span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300 shrink-0 font-bold flex items-center gap-1">
                    Read Log &rarr;
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
