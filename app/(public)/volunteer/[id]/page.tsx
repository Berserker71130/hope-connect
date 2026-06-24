"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toast";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { dummyOpportunities, VolunteerOpportunity } from "@/lib/dummy-data";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  HelpCircle,
  Info,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";

// 1. STRICT SCHEMATIC REGISTRATION MATRIX ZOD
const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(64, "Name string limits exceeded for safety parameters"),
  email: z
    .string()
    .email("Please provide a valid diagnostic email address layout structure"),
  phone: z
    .string()
    .min(7, "Telephone numbers must map down to functional lengths")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-s./0-9]*$/,
      "Invalid telephone protocol characters detected",
    ),
  emergencyName: z
    .string()
    .min(
      2,
      "Emergency contact operational authority title is strictly mandatory",
    ),
  emergencyPhone: z
    .string()
    .min(
      7,
      "Emergency validation telephone structure must match target boundaries",
    ),
  skillsExperience: z
    .string()
    .min(
      10,
      "Please outline your background content (minimum 10 operational tokens)",
    ),
  availabilityConfirmation: z.boolean().refine((val) => val === true, {
    message: "Explicit synchronization parameter confirmation is missing",
  }),
  tShirtSize: z
    .string()
    .min(1, "Target apparel structural sizing alignment field is mandatory"),
  questions: z
    .string()
    .max(500, "Maximum limit bounds for auxiliary text tracks exceeded")
    .optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message:
      "Waiver agreements must be verified before field deployment is authorized",
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function VolunteerOpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Component Reactive States
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  //   Parse routing identifiers
  const opportunityId = params?.id as string;
  const opportunity = dummyOpportunities.find(
    (opp) => opp.id === opportunityId,
  );

  //   FORM ENGINE DEPLOYMENT & REACT HOOK FORM
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      emergencyName: "",
      emergencyPhone: "",
      skillsExperience: "",
      availabilityConfirmation: false,
      tShirtSize: "",
      questions: "",
      agreeTerms: false,
    },
  });

  //   Not found safe gaurd sync hook
  React.useEffect(() => {
    if (!opportunity && opportunityId) {
      toast.error(
        "Opportunity unresolved",
        "The track parameters specified do not map to active registries.",
      );
    }
  }, [opportunity, opportunityId]);

  //   Terminal Escape View if database lookup returns undefined
  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <AlertCircle className="w-14 h-14 text-orange-500 mb-4 animate-pulse" />
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Deployment File Broken
        </h1>
        <p className="text-sm text-slate-500 mt-2 m-w-sm text-center leading-relaxed">
          The requested opportunity sequence cannot be mapped within current
          active datasets.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          onClick={() => router.push("/volunteer")}
        >
          Return to Mission Hub
        </Button>
      </div>
    );
  }

  //   3. RECIPROCAL RECOMMENDATION ALGORITHM (RELATED WORK)
  const relatedOpportunities = dummyOpportunities
    .filter(
      (opp) =>
        opp.id !== opportunity.id &&
        (opp.category === opportunity.category ||
          opp.locationType === opportunity.locationType),
    )
    .slice(0, 2);

  // 4. ACTION INTERFACES & SUBMISSION LOOPS
  const onFormSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      // Native async processing delay simulation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Strict exact response code block alignment output match per Ticket #22
      toast.success(
        "You're registered!",
        "Check your email for details. Your field assignment tracks are provisioned.",
      );

      reset();
    } catch (error) {
      toast.error(
        "Registration Fault",
        "An exception occured within structural field mapping interfaces.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareSystem = (method: "clipboard" | "broadcast") => {
    const currentAbsoluteUrl =
      typeof window !== "undefined" ? window.location.href : "";

    if (method === "clipboard") {
      navigator.clipboard.writeText(currentAbsoluteUrl);
      toast.info(
        "Tracker Link Stored",
        "The complete path has been parsed cleanly into your execution clipboard.",
      );
    } else {
      const externalIntentUrl = `http://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Join me for structural community support at: ${opportunity.title}`,
      )}&url=${encodeURIComponent(currentAbsoluteUrl)}`;
      window.open(externalIntentUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Safe type conversion mappings for unique automatic BadgeCategory props interface
  const lowerCasedCategoryToken = opportunity.category.toLowerCase();
  const validCategoryRegistry = [
    "education",
    "healthcare",
    "environment",
    "poverty-relief",
    "emergency",
    "animal-welfare",
  ];
  const activeBadgeCategory = validCategoryRegistry.includes(
    lowerCasedCategoryToken,
  )
    ? (lowerCasedCategoryToken as any)
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50/30 pb-24 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* HEADER COMPONENT BAR */}
      <header className="bg-white border-b border-slate-200/60 sticky top-0 z-30 bckdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 group transition-colors uppercase tracking-wider mb-2 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Back to Opportunities
              </button>
              <div className="flex flex-wrap items-center gap-2">
                {activeBadgeCategory ? (
                  <Badge category={activeBadgeCategory} size="sm">
                    {opportunity.category}
                  </Badge>
                ) : (
                  <Badge variant="active" size="sm">
                    {opportunity.category}
                  </Badge>
                )}
                <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-md">
                  {opportunity.locationType}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {opportunity.title}
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Deployment Network Operations:{" "}
                <span className="text-blue-600 font-bold">
                  Alliance Logistics Core
                </span>
              </p>
            </div>

            {/* RECRUIT SHARING COMPONENT */}
            <div className="flex items-center gap-2 self-start md:self-center shrink-0">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Share2 className="w-3.5 h-3.5" />}
                onClick={() => handleShareSystem("clipboard")}
              >
                Copy URL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                onClick={() => handleShareSystem("broadcast")}
              >
                Recruit Friends
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* PRIMARY CONTENT LAYOUT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT CONTAINER LAYER: DETAIL GRAPH DISCLOSURES */}
          <div className="lg:col-span-2 space-y-8">
            {/* LARGE HERO FRAME GRAPH */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-sm border border-slate-200/50 bg-slate-100">
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 select-none"
              />
            </div>

            {/* KEY INFORMATION METRICS GRID SECTION */}
            <section
              className="grid grid-cols-2 sm:grid-cols-4"
              aria-label="Key Information metrics"
            >
              <Card
                padding="sm"
                variant="default"
                className="flex flex-col justify-between items-center text-center bg-white border-slate-100"
              >
                <Clock className="w-5 h-5 text-blue-600 mb-1.5" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Commitment
                </p>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {opportunity.timeCommitmentLabel}
                </p>
              </Card>

              <Card
                padding="sm"
                variant="default"
                className="flex flex-col justify-between items-center text-center bg-white border-slate-100"
              >
                <Users className="w-5 h-5 text-emerald-600 mb-1.5" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Spots Available
                </p>
                <p className="text-sm font-bold text-emerald-600 mt-1">
                  {opportunity.slotsAvailable} Open
                </p>
              </Card>

              <Card
                padding="sm"
                variant="default"
                className="flex flex-col justify-between items-center text-center bg-white border-slate-100"
              >
                <User className="w-5 h-5 text-orange-500 mb-1.5" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Age Limit
                </p>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {opportunity.ageRequirement}
                </p>
              </Card>

              <Card
                padding="sm"
                variant="default"
                className="flex flex-col justify-between items-center text-center bg-white border-slate-100"
              >
                <Briefcase className="w-5 h-5 text-purple-600 mb-1.5" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Target Skill
                </p>
                <p className="text-sm font-bold text-slate-900 mt-1 truncate max-w-full px-1">
                  {opportunity.skillsNeeded[0] || "Generalist"}
                </p>
              </Card>
            </section>

            {/* TEXT ANALYSIS DESCRIPTION BLOCKS CONTAINER */}
            <Card
              variant="default"
              padding="md"
              className="bg-white space-y-8 shadow-sm"
            >
              {/* SUB-SECTION 1: WHAT VOLUNTEERS WILL DO */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />{" "}
                  Detailed Mission Blueprint
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-body">
                  {opportunity.description}
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* SUB-SECTION 2: IMPACT STATEMENT */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Core Strategic Impact
                </h3>
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex gap-3">
                  <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed font-body">
                    {opportunity.impact}
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* SUB-SECTION 3: SKILLS MATRIX CLUSTER */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Prerequisite Skill Allocations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skillsNeeded.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-all hover:bg-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* SUB-SECTION 4: WHAT TO BRING MANIFEST */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Required Equipment Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {opportunity.whatToBring.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-slate-600 bg-slate-50/50 px-3 py-2 rounded-lg border border-slate-100"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* MAP LAYOUT SECTION CONTAINER */}
            <Card
              variant="default"
              padding="none"
              className="bg-white overflow-hidden shadow-sm border-slate-200/60"
            >
              <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" /> Deployment
                    Geolocation
                  </h3>
                  <p className="text-xs text-slate-400 pl-6">
                    {opportunity.location}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-white border rounded-md shadow-2xs">
                  {opportunity.date}
                </div>
              </div>

              {/* COMPREHENSIVE EMBEDDED MAP (GOOGLE MAPS) FIELD */}
              <div className="bg-slate-100 h-72 w-full relative flex items-center justify-center">
                {opportunity.coordinates.lat === 0 &&
                opportunity.coordinates.lng === 0 ? (
                  <div className="text-center p-6 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-500">
                      Virtual Mission Environment
                    </p>
                    <p className="text-xs text-slate-400">
                      Physical tracing frameworks are not required for this
                      node.
                    </p>
                  </div>
                ) : (
                  <iframe
                    title={`Map coordinate tracker for ${opportunity.title}`}
                    className="w-full h-full border-0 absolute inset-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${opportunity.coordinates.lat},${opportunity.coordinates.lng}&z=14&output=embed`}
                  />
                )}
              </div>
            </Card>

            {/* ASSIGNED COORDINATOR CARD TIERS */}
            <Card
              variant="default"
              padding="md"
              accentBar="blue"
              className="bg-white shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                    Authorized Controller
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {opportunity.coordinator.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Primary Field Resource Coordinator
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:text-right text-sm font-medium text-slate-600">
                  <a
                    href={`mailto:${opportunity.coordinator.email}`}
                    className="flex items-center sm:justify-end gap-2 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    {opportunity.coordinator.email}
                  </a>
                  <a
                    href={`tel:${opportunity.coordinator.phone}`}
                    className="flex items-center sm:justify-end gap-2 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    {opportunity.coordinator.phone}
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: REGISTRATION INPUT DESK */}
          <aside className="space-y-6 lg:sticky lg:top-[110px]">
            <Card
              variant="default"
              padding="md"
              className="bg-white border-t-4 border-t-blue-600 shadow-xl relative"
              isHoverable={false}
            >
              <CardHeader className="px-0 pt-0 pb-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Mission
                  Registration
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Fulfill registration metrics down to verification standards.
                </p>
              </CardHeader>

              {/* CORE ENTRY FORM TRACK */}
              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-4 mt-5"
              >
                {/* FIELD 1: PERSONAL NAME INPUT */}
                <Input
                  label="Full Volunteer Name"
                  placeholder="e.g Marcus Aurelius"
                  required
                  error={errors.name?.message}
                  isSuccess={touchedFields.name && !errors.name}
                  {...register("name")}
                />

                {/* FIELD 2: CORPORATE EMAIL CHANNEL */}
                <Input
                  label="Primary Email Address"
                  type="email"
                  placeholder="name@operationaldomain.com"
                  required
                  error={errors.email?.message}
                  isSuccess={touchedFields.email && !errors.email}
                  {...register("email")}
                />

                {/* FIELD 3: MOBILE TELEPHONY LINK */}
                <Input
                  label="Active Phone Number"
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  required
                  error={errors.phone?.message}
                  isSuccess={touchedFields.phone && !errors.phone}
                  {...register("phone")}
                />

                {/* COMPACT INNER GRID: EMERGENCY AUTHORIZATION RECORD */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3.5">
                  <div className="flex items-center gap-1.5 border-b border-slate-200/50 pb-1.5">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Emergency Contact Verification
                    </p>
                  </div>

                  <Input
                    label="Contact Authority Name"
                    placeholder="Full legal guardian title"
                    required
                    error={errors.emergencyName?.message}
                    isSuccess={
                      touchedFields.emergencyName && !errors.emergencyName
                    }
                    {...register("emergencyName")}
                  />

                  <Input
                    label="Contact Telephone Line"
                    type="tel"
                    placeholder="+1 (555) 014-9988"
                    required
                    error={errors.emergencyPhone?.message}
                    isSuccess={
                      touchedFields.emergencyPhone && !errors.emergencyPhone
                    }
                    {...register("emergencyPhone")}
                  />
                </div>

                {/* FIELD 4: OPERATIONAL HISTORY PROFILE TRACK */}
                <Textarea
                  label="Skills & Experience Analysis"
                  placeholder="Elaborate details mapping operational background histories or alignment capabilities..."
                  required
                  rows={4}
                  error={errors.skillsExperience?.message}
                  isSuccess={
                    touchedFields.skillsExperience && !errors.skillsExperience
                  }
                  {...register("skillsExperience")}
                />

                {/* FIELD 5: CONTROLLER SELECT FOR APPAREL ASSIGNMENT */}
                <Controller
                  control={control}
                  name="tShirtSize"
                  render={({ field }) => (
                    <Select
                      label="Apparel  Allocation Scale (T-Shirt)"
                      required
                      placeholder="Select tracking parameters sizing"
                      error={errors.tShirtSize?.message}
                      isSuccess={touchedFields.tShirtSize && !errors.tShirtSize}
                      options={[
                        { value: "S", label: "Small Operational Fit (S)" },
                        { value: "M", label: "Medium Operational Fit (M)" },
                        { value: "L", label: "Large Operational Fit (L)" },
                        { value: "XL", label: "Extra Large Scale (XL)" },
                        {
                          value: "XXL",
                          label: "Double Extra Large Scale (XXL)",
                        },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {/* FIELD 6: ADDITINAL INQUIRIES OPTIONAL GRID LINK */}
                <Textarea
                  label="Auxiliary Operational Inquiries"
                  placeholder="Detail queries regarding shifts, timings or parameters..."
                  rows={2}
                  error={errors.questions?.message}
                  {...register("questions")}
                />

                {/* REGULATORY CHECKBOX WAIVER MATRICES */}
                <div className="space-y-3.5 pt-2 border-t border-slate-100 mt-4">
                  <Controller
                    control={control}
                    name="availabilityConfirmation"
                    render={({ field }) => (
                      <Checkbox
                        id="availability-check"
                        label="I explicitly confirm scheduling alignment parameters matches target bounds"
                        required
                        error={errors.availabilityConfirmation?.message}
                        isSuccess={
                          touchedFields.availabilityConfirmation &&
                          !errors.availabilityConfirmation
                        }
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <Checkbox
                        id="terms-check"
                        label="I verify, coordinate, and execute corporate liability release waivers"
                        required
                        error={errors.agreeTerms?.message}
                        isSuccess={
                          touchedFields.agreeTerms && !errors.agreeTerms
                        }
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  {/* MODAL TRIGGER FOR TERMS PREVIEW */}
                  <div className="pl-8">
                    <button
                      type="button"
                      onClick={() => setIsTermsModalOpen(true)}
                      className="inline-flex items-center text-xs text-blue-600 font-bold hover:underline cursor-pointer gap-1"
                    >
                      <FileText className="w-3 h-3" /> Read Regulatory Volunteer
                      Terms
                    </button>
                  </div>
                </div>

                {/* TRANSACTION ACTION TERMINAL TRIGGER */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 font-sans uppercase text-xs font-bold tracking-wider py-3.5 shadow-sm"
                  isLoading={isSubmitting}
                >
                  Confirm Tactical Registration
                </Button>
              </form>
            </Card>
          </aside>
        </div>

        {/* RECIPROCAL NEWTWORK SIMILAR SELECTION PATHS */}
        {relatedOpportunities.length > 0 && (
          <section
            className="mt-20 border-t border-slate-200/80 pt-12"
            aria-label="Similar Operational Frameworks"
          >
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight mb-6">
              Reciprocal Alignment Alternatives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedOpportunities.map((opp) => (
                <Card
                  key={opp.id}
                  variant="default"
                  padding="none"
                  className="flex flex-col sm:flex-row h-full overflow-hidden cursor-pointer group bg-white hover:border-blue-500/40 hover:shadow-lg"
                  onClick={() => router.push(`/volunteer/${opp.id}`)}
                >
                  <div className="sm:w-1/3 h-44 sm:h-auto relative bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={opp.image}
                      alt={opp.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold tracking-widest text-blue-600 uppercase">
                        {opp.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {opp.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-50 pt-2.5">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-300" />{" "}
                        {opp.date}
                      </span>
                      <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        <Users className="w-3.5 h-3.5 mr-1" />{" "}
                        {opp.slotsAvailable} Spots Left
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 5. REGULATORY TERMS AND LIABILITIES DIALOG WINDOW (MODAL) */}
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        size="md"
      >
        <ModalHeader
          title="Volunteer Regulatory Framework & General Waiver Agreement"
          description="Please carefully evaluate the operational deployment policies and terms listed below before updating registration profiles."
        />

        <ModalBody>
          <div className="space-y-4 font-sans text-slate-600 text-xs leading-relaxed">
            <section className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                1. Operational Field Guidelines
              </h4>
              <p>
                Volunteers are expected to execute operational deployments in
                full adherence to the directives delivered by the assigned
                deployment coordinator or field managers.
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                2. Safety and General Liability Disclosures
              </h4>
              <p>
                By signing p, you explicitly waive individual liability
                parameters regarding unforseen structural changs or environment
                occurences on-site. Protective gear should be maintained as
                instructed in the required equipment matrix.
              </p>
            </section>

            <section className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                3. Media and Photographic Releases
              </h4>
              <p>
                Authorized field tracking representatives may record video
                fragments or capture pictures for campaign analytics or
                broadcast reporting objectives.
              </p>
            </section>

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl flex items-start gap-2.5 mt-2">
              <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <p className="text-[11px] leading-normal font-medium">
                <strong>Attention:</strong> Approving this box fulfills the
                criteria binding structural parameters required to lock down
                assignment tracking numbers safely.
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsTermsModalOpen(false)}
          >
            I Comprehend and Accept Terms
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
