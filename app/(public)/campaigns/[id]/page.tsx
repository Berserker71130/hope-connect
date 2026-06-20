"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// Import the true global seed data array directly
import { dummyCampaigns } from "@/lib/dummy-data";

// Import all audited design system components
import { Badge, type BadgeCategory } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { LinearProgress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { DonationModal } from "@/components/donation/donation-modal";
import {
  Bird,
  Book,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  Users,
} from "lucide-react";

// IMMUTABLE BACKUP CONSTANTS FOR DATA FIELDS NOT DEFINED ON ALL CAMPAIGN SEED OBJECTS
const IMMUTABLE_IMPACT_PRESETS = {
  "5000": "Provides 1 foundational offline curriculum textbook package.",
  "10000": "Provides 1 modern digital accessory kit (headset + optical mouse).",
  "25000":
    "Provides uninterrupted high-speed internet access for 1 classroom for 3 months.",
  "50000":
    "Procures 1 durable, energy-efficient educational tablet preloaded with software.",
};

export default function CampaignDetailPage() {
  const { id } = useParams();

  // DYNAMIC LOOKUP MATRIX: Extracts parameter context strings safely
  const campaign = React.useMemo(() => {
    return dummyCampaigns.find((item) => item.id === id) || dummyCampaigns[0];
  }, [id]);

  // FORMS STATES
  const [selectedAmount, setSelectedAmount] = React.useState<string>("10000");
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] = React.useState<string>("card");
  const [isRecurring, setIsRecurring] = React.useState<boolean>(false);
  const [donorName, setDonorName] = React.useState<string>("");
  const [donorMessage, setDonorMessage] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  // DERIVED METRICS
  const activeAmount =
    selectedAmount === "custom" ? Number(customAmount) : Number(selectedAmount);

  // Dynamic descriptive impact string based on selected amount context
  const getDynamicImpactText = (amount: number) => {
    if (!amount || amount <= 0)
      return "Please choose or enter a valid amount to see your direct impact statement.";
    if (amount >= 500000)
      return `Your custom gift of ₦${amount.toLocaleString()} fully funds an entire solar micro-inverter or multiple core workstation deployments.`;
    if (amount >= 100000)
      return `Your custom gift of ₦${amount.toLocaleString()} procures 2 complete workstation laptops for a rural school hub`;
    if (amount >= 50000)
      return "Your contribution funds a high-speed educational tablet and directly sponsors localized teacher tech modules.";
    if (amount >= 25000)
      return "Your contribution shields a classroom from network deficits by covering 3 months of uninterrupted grid data links.";
    if (amount >= 10000)
      return "Your contribution provides structural utility layout upgrades, supplying clean digital peripherals (headsets/mice).";
    return `Your contribution of ₦${amount.toLocaleString()} fuels general hardware shipping and localized technical installation pools.`;
  };

  // INTERACTION HANDLERS
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info(
      "Link Copied",
      "The campaign reference URL is now safely on your clipboard.",
    );
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Guard against invalid custom amount entries
    if (
      selectedAmount === "custom" &&
      (!customAmount || Number(customAmount) < 500)
    ) {
      toast.error(
        "Invalid Amount",
        "Please input a minimum custom configuration of ₦500 to proceed.",
      );
      return;
    }

    // 2. Clear to go! Slide open the modal with all data pre-loaded
    setIsModalOpen(true);
  };

  // Safe fallback processing defaults for sub-nested structures
  const defaultStory = [
    "Our mission is simple but urgent: deployment of sustainable field assets addressing immediate gaps.",
    "Every contribution goes directly to structural layout deployment across regional coordinates.",
  ];

  const defaultUpdates = [
    {
      title: "Initial Tactical Review Complete",
      time: "June 21, 2026",
      content:
        "Operational requirements verified. Site configurations mapped successfully.",
    },
  ];

  const defaultDonors = [
    {
      name: "Anonymous Donor",
      amount: 25000,
      message: "Supporting great work!",
      time: "Recently",
    },
  ];

  // Helper calculation filter for bottom related sections
  const relatedCampaigns = React.useMemo(() => {
    return dummyCampaigns.filter((item) => item.id !== campaign.id).slice(0, 2);
  }, [campaign.id]);

  return (
    <main className="min-h-screen bg-background-soft/30 font-sans text-text-primary antialiased pb-24">
      {/* 1. HERO GRAPHIC BANNER AREA */}
      <section className="relative w-full h-[460px] md:h-[540px] bg-black overflow-hidden select-none">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover opacity-80 scale-100 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        {/* Floating Contextual Badges Container */}
        <div className="absolute top-6 left-4 md:left-12 flex flex-wrap gap-2.5 z-20">
          <Badge
            category={campaign.category.toLowerCase() as BadgeCategory}
            size="md"
          >
            {campaign.category}
          </Badge>
          {campaign.status === "Urgent" && (
            <Badge variant="urgent" size="md">
              URGENT FUNDRAISER
            </Badge>
          )}
        </div>

        {/* Core floating metadata heading block */}
        <div className="absolute bottom-8 left-4 right-4 md:left-12 md:right-12 z-20 max-w-5xl space-y-4">
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {campaign.title}
          </h1>
          <div className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>{campaign.organizationName || "HopeConnect Partner"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{campaign.location || "Global Outpost"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL COLUMN GRID STRUCTURAL CANVAS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: NARRATIVE, MEDIA, UPDATES, LOGS (8 / 12 spans) */}
        <div className="lg:col-span-7 space-y-10">
          {/* PROGRESS INSIGHT PANEL CARD */}
          <Card
            padding="md"
            variant="default"
            isHoverable={false}
            className="border-text-light/20 shadow-sm"
          >
            <div className="p-2 space-y-6">
              <LinearProgress
                value={campaign.currentAmount}
                max={campaign.targetAmount}
                variant="blue"
                showPercentText={true}
                milestones={[25, 50, 75, 100]}
                label={`₦${campaign.currentAmount.toLocaleString()} funded`}
              />

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-text-light/10 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-text-muted">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Donors
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-gray-900">
                    {campaign.donorCount || 128}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-text-muted">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Days Left
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-gray-900">
                    {campaign.daysRemaining || 14}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Target Goal
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-gray-900">
                    ₦{campaign.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* CAMPAIGN STORY NARRATIVE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 border-b pb-2 border-gray-200">
              Campaign Story
            </h2>
            <div className="text-base text-gray-700 leading-relaxed space-y-4 font-normal">
              {campaign.storyRichText ? (
                <p>{campaign.storyRichText}</p>
              ) : (
                (campaign.description
                  ? [campaign.description]
                  : defaultStory
                ).map((paragraph, index) => <p key={index}>{paragraph}</p>)
              )}
            </div>
          </section>

          {/* VIDEO EMBED CONTAINER */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Campaign Video Brief
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md border border-text-light/10 bg-neutral-900">
              <iframe
                src={`https://www.youtube.com/embed/${campaign.youtubeEmbedUrl || "dQw4w9WgXcQ"}`}
                title="Campaign video clip showcase"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          {/* DYNAMIC IMPACT PRESET INSIGHT DISPLAY */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 border-b pb-2 border-gray-200">
              Impact Breakdown
            </h2>
            <Card
              variant="featured"
              padding="md"
              isHoverable={false}
              accentBar="blue"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full p-2.5 shrink-0 shadow-sm mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-blue-800">
                    Your Current Funding Impact
                  </h4>
                  <p className="text-base font-medium text-blue-950 leading-relaxed">
                    {getDynamicImpactText(activeAmount)}
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* TIME LINE OF ORGANIZER PROGRESS UPDATES */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 border-b pb-2 border-gray-200">
              Campaign Updates
            </h2>
            <div className="relative border-l-2 border-gray-200 pl-6 ml-3 space-y-8">
              {(campaign.updates || defaultUpdates).map((update, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 bg-white border-2 border-blue-600 rounded-full w-4 h-4 transition-transform group-hover:scale-125 z-10" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {(update as any).date || (update as any).time}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {update.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT DONORS RECONCILIATION FEED */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 border-b pb-2 border-gray-200 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <span>Recent Donors ({campaign.donorCount || 128})</span>
            </h2>
            <div className="space-y-3">
              {(campaign.recentDonors || defaultDonors).map((donor, index) => (
                <Card
                  key={index}
                  padding="sm"
                  variant="default"
                  isHoverable={true}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-100 to-indigo-100 flex items-center justify-center font-bold text-sm text-indigo-700 font-mono uppercase shrink-0 border border-indigo-200/40">
                      {donor.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-gray-900">
                          {donor.name}
                        </h4>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          +₦{donor.amount.toLocaleString()}
                        </span>
                      </div>
                      {donor.message && (
                        <p className="text-sm text-gray-600 italic font-body">
                          '{donor.message}'
                        </p>
                      )}
                      <span className="text-[11px] text-gray-400 block pt-0.5 font-medium">
                        {(donor as any).date || (donor as any).time}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* IMMUTABLE UTILITY SHARE ACTION BAR */}
          <section className="pt-4 border-t border-gray-200 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Spread the Word & Support</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => window.open("https://wa.me", "_blank")}
              >
                Whatsapp
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Bird className="w-3.5 h-3.5" />}
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Book className="w-3.5 h-3.5" />}
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Copy className="w-3.5 h-3.5" />}
                onClick={handleCopyLink}
              >
                Copy Link
              </Button>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY DONATION ACTION CONTROL PANEL SIDEBAR (4 / 12 spans) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          <Card
            padding="md"
            variant="default"
            isHoverable={false}
            className="shadow-md border border-text-light/10"
          >
            <CardHeader className="border-b pb-4 mb-4 border-text-light/10">
              <h2 className="text-xl font-black tracking-tight text-gray-900">
                Empower this Campaign
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Select your parameter scale and wire support securely instantly.
              </p>
            </CardHeader>

            <form onSubmit={handleDonationSubmit} className="space-y-6">
              {/* PRESET RADIO AMOUNT SELECTOR */}
              <div className="space-y-2">
                <span className="text-small font-bold text-text-primary block">
                  Select Contribution Target
                </span>
                <RadioGroup
                  label="Available Funding Presets"
                  options={[
                    { value: "5000", label: "₦5,000" },
                    { value: "10000", label: "₦10,000" },
                    { value: "25000", label: "₦25,000" },
                    { value: "50000", label: "₦50,000" },
                    { value: "custom", label: "Custom Specified Amount" },
                  ]}
                  value={selectedAmount}
                  onChange={(val) => {
                    setSelectedAmount(val);
                    if (val !== "custom") setCustomAmount("");
                  }}
                />
              </div>

              {/* RENDER CONDITIONAL CUSTOM FIELD INPUT NODE */}
              {selectedAmount === "custom" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <Input
                    label="Enter Custom Amount (₦)"
                    type="number"
                    placeholder="Minimum 500"
                    required
                    min="500"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>
              )}

              {/* DYNAMIC SIDEBAR PRESET IMPACT BRIEF CONTEXT */}
              {selectedAmount !== "custom" && (
                <div className="bg-background-soft p-3 rounded-lg border border-text-light/5 text-xs text-gray-600 leading-relaxed font-medium">
                  <span className="font-bold text-gray-900 block uppercase tracking-wide text-[10px] mb-0.5">
                    Preset Objective
                  </span>
                  {
                    IMMUTABLE_IMPACT_PRESETS[
                      selectedAmount as keyof typeof IMMUTABLE_IMPACT_PRESETS
                    ]
                  }
                </div>
              )}

              {/* METRIC OPTION RECURRING TOGGLE CHECKBOX */}
              <div className="bg-background-soft/40 p-1.5 rounded-lg border border-dashed border-text-light/10">
                <Checkbox
                  label="Automate this gift monthly (Recurring Donation)"
                  checked={isRecurring}
                  onCheckedChange={(checked) => setIsRecurring(!!checked)}
                />
              </div>

              <hr className="border-text-light/10" />

              {/* OPTIONAL DONOR IDENTIFICATION DATA */}
              <div className="space-y-3">
                <Input
                  label="Your Name (Optional)"
                  placeholder="Leaving blank marks as Anonymous"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
                <Textarea
                  label="Words of Encouragement (Optional)"
                  placeholder="Type a support message or prayer..."
                  rows={3}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                />
              </div>

              {/* PAYMENT RAILS STRATEGY INPUT SELECTOR */}
              <div className="space-y-2">
                <span className="text-small font-bold text-text-primary block">
                  Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "card", label: "Debit Card" },
                    { id: "bank", label: "Transfer" },
                    { id: "ussd", label: "USSD Code" },
                  ].map((m) => {
                    const isActive = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all text-center select-none cursor-pointer ${
                          isActive
                            ? "bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-500/10"
                            : "bg-white border-text-light/20 text-text-primary hover:bg-background-soft"
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PROMINENT ACTION TRIGGER COMPONENT */}
              <Button
                type="submit"
                variant="secondary"
                size="xl"
                className="w-full uppercase font-sans tracking-wide text-sm font-black shadow-md mt-2"
                isLoading={isSubmitting}
              >
                Donate Now (₦{activeAmount.toLocaleString()})
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* EXPLORE RE-ROUTE MATRIX CANVAS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-10 border-t border-gray-200 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            Explore Urgent Fundraisers
          </h2>
          <p className="text-sm text-text-muted font-medium">
            Support matching verified missions currently running against intense
            deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedCampaigns.map((rc) => (
            <Card
              key={rc.id}
              variant="default"
              padding="none"
              isHoverable={true}
              className="flex flex-col md:flex-row h-full"
            >
              <div className="w-full md:w-44 h-40 md:h-full relative overflow-hidden shrink-0">
                <img
                  src={rc.image}
                  alt={rc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    category={rc.category.toLowerCase() as BadgeCategory}
                    size="sm"
                  >
                    {rc.category}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight leading-snug line-clamp-2">
                    {rc.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    Target:{" "}
                    <span className="font-bold text-gray-700">
                      ₦{rc.targetAmount.toLocaleString()}
                    </span>
                  </p>
                </div>
                <Link href={`/campaigns/${rc.id}`} className="w-full md:w-max">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full md:w-max px-4 cursor-pointer"
                  >
                    View Fundraiser
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Dynamic Multi-Step Secure Checkout Overlay */}
      {/* Dynamic Multi-Step Secure Checkout Overlay */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaignId={campaign.id}
        campaignTitle={campaign.title}
        campaignCategory={campaign.category.toLowerCase() as any}
        // Pass individual flat properties instead of defaultValues object
        amount={activeAmount}
        isRecurring={isRecurring}
        name={donorName}
        dedication={donorMessage}
        paymentMethod={paymentMethod}
      />
    </main>
  );
}
