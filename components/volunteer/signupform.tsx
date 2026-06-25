"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileText,
  X,
  User,
  Heart,
  Calendar,
  Briefcase,
  ShieldCheck,
  Users,
} from "lucide-react";

// Absolute paths to match your internal design library configuration perfectly
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Select } from "../ui/select";

// E.164 Universal International phone verification pattern standard
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// -------------------------------------------------------------------------
// 1. ZOD DATA COMPLIANCE SCHEMA DEFINITION
// -------------------------------------------------------------------------
const volunteerSignupSchema = z.object({
  // Section 1: Personal Identification Fields
  name: z
    .string()
    .min(2, "Full legal name is required to initialize your registry file"),
  email: z
    .string()
    .email(
      "Please supply a valid standard email format (e.g., user@domain.com)",
    ),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Provide a valid international phone format (e.g., +1234567890)",
    ),
  dob: z
    .string()
    .min(1, "Date of birth is required for age bracket classification records"),
  address: z
    .string()
    .min(
      5,
      "Complete physical mailing address is required for geographic matching",
    ),

  // Section 2: Emergency Network Contact Linked Parameters
  emergencyName: z
    .string()
    .min(2, "Emergency contact's full legal name is required"),
  emergencyRelationship: z
    .string()
    .min(2, "Please state your relationship to this contact parameter"),
  emergencyPhone: z
    .string()
    .regex(
      phoneRegex,
      "Provide a valid emergency link contact phone formatting",
    ),

  // Section 3: Availability Matrix Data Mapping (Strict Checked Requirements)
  availability: z
    .array(z.string())
    .min(1, "Please select at least one core availability choice block"),

  // Section 4: Skills and Targeted Interest Core Options
  skills: z
    .array(z.string())
    .min(1, "Select at least one skill capability checkbox option"),

  // Section 5: Experience Narratives and ID Validation Fields
  experience: z
    .string()
    .min(
      10,
      "Provide a helpful narrative describing your historical background (minimum 10 characters)",
    )
    .max(
      2000,
      "Historical background narrative is limited to a maximum of 2,000 characters",
    ),
  photoId: z.any().optional(), // Marked explicit optional background track tag layer

  // Section 6: Direct Reference Character Validation Nodes (Double Reference Sets)
  ref1Name: z
    .string()
    .min(2, "First professional or character reference name is required"),
  ref1Relationship: z
    .string()
    .min(2, "State relationship configuration parameters for reference 1"),
  ref1Phone: z
    .string()
    .regex(phoneRegex, "Provide a valid phone format layout for reference 1"),
  ref1Email: z
    .string()
    .email("Please supply a valid validation email path for reference 1"),

  ref2Name: z
    .string()
    .min(2, "Second professional or character reference name is required"),
  ref2Relationship: z
    .string()
    .min(2, "State relationship configuration parameters for reference 2"),
  ref2Phone: z
    .string()
    .regex(phoneRegex, "Provide a valid phone format layout for reference 2"),
  ref2Email: z
    .string()
    .email("Please supply a valid validation email path for reference 2"),

  // Section 7: Discovery Tracking and Legal Consents
  referralSource: z
    .string()
    .min(
      1,
      "Please tell us how you discovered our volunteer network coordinates",
    ),
  backgroundConsent: z
    .boolean()
    .refine(
      (v) => v === true,
      "Background track check authorization is mandatory",
    ),
  termsAgreement: z
    .boolean()
    .refine(
      (v) => v === true,
      "You must review and agree to our legal terms framework",
    ),
});

type VolunteerSignupData = z.infer<typeof volunteerSignupSchema>;

// Static Array References for Safe Form Processing Arrays
const AVAILABILITY_CHECKBOXES = [
  "weekdays",
  "weekends",
  "mornings",
  "afternoons",
  "evenings",
];
const SKILLS_CHECKBOXES = [
  "teaching",
  "medical",
  "tech",
  "manual labor",
  "event planning",
  "disaster response",
  "animal welfare",
];

const REFERRAL_OPTIONS = [
  { value: "social-media", label: "Social Media Platform Tracking" },
  { value: "word-of-mouth", label: "Friend, Colleague or Family Network" },
  { value: "ngo-website", label: "Our Central Corporate Website Portal" },
  { value: "community-event", label: "Localized Community Outreach Event" },
  { value: "advertisement", label: "Digital or Print Media Advertisements" },
];

export default function VolunteerSignupForm() {
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] =
    React.useState<boolean>(false);

  // Initializing state with helpful interactive properties
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<VolunteerSignupData>({
    resolver: zodResolver(volunteerSignupSchema),
    mode: "onTouched", // Validates as they interact, making sure notifications are informative rather than punitive
    defaultValues: {
      availability: [],
      skills: [],
      backgroundConsent: false,
      termsAgreement: false,
      referralSource: "",
    },
  });

  const photoIdFile = watch("photoId");

  // React-Dropzone execution loop tracking
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setValue("photoId", acceptedFiles[0], { shouldValidate: true });
      }
    },
  });

  // Step validation engine for clean transition rules
  const validateFormStepSegment = async (
    currentStep: number,
  ): Promise<boolean> => {
    let inputsToTrigger: (keyof VolunteerSignupData)[] = [];

    switch (currentStep) {
      case 1:
        inputsToTrigger = [
          "name",
          "email",
          "phone",
          "dob",
          "address",
          "emergencyName",
          "emergencyRelationship",
          "emergencyPhone",
        ];
        break;
      case 2:
        inputsToTrigger = ["availability", "skills"];
        break;
      case 3:
        inputsToTrigger = ["experience", "photoId"];
        break;
      case 4:
        inputsToTrigger = [
          "ref1Name",
          "ref1Relationship",
          "ref1Phone",
          "ref1Email",
          "ref2Name",
          "ref2Relationship",
          "ref2Phone",
          "ref2Email",
          "referralSource",
          "backgroundConsent",
          "termsAgreement",
        ];
        break;
      default:
        return false;
    }

    return await trigger(inputsToTrigger);
  };

  const advanceStepFlow = async () => {
    const isStepValidated = await validateFormStepSegment(activeStep);
    if (isStepValidated && activeStep < 4) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const regressStepFlow = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submission handler mapping standard processing latency
  const processRegistrationSubmission = async (
    payload: VolunteerSignupData,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2200));
    console.log(
      "Structured Output Framework Verified for Production Delivery Payload:",
      payload,
    );
    setIsSuccessfullyRegistered(true);
  };

  // Rendering the final confirmation display component state
  if (isSuccessfullyRegistered) {
    return (
      <div className="w-full max-w-2xl mx-auto my-12 px-4 animate-fade-in">
        <Card
          variant="featured"
          padding="lg"
          accentBar="green"
          isHoverable={false}
          className="text-center"
        >
          <div className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 fill-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-h2 font-bold text-gray-900 tracking-tight">
                Registration Complete!
              </h2>
              <p className="text-body text-text-muted max-w-md mx-auto">
                Your high-fidelity application file has been saved to our nodes
                successfully. Our onboarding compliance staff will process your
                data maps shortly.
              </p>
            </div>
            <div className="w-full border-t border-text-light/10 pt-4 max-w-md text-left bg-background-soft p-4 rounded-xl">
              <span className="text-small font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                What happens next:
              </span>
              <ul className="list-disc pl-5 text-xs text-text-muted space-y-1">
                <li>
                  An operational coordinator will verify reference channels
                  manually.
                </li>
                <li>
                  Your profile token will be configured inside the direct
                  engagement dashboard interface.
                </li>
                <li>
                  You will receive login instructions via email within two
                  verification cycles.
                </li>
              </ul>
            </div>
            <Button
              variant="success"
              size="lg"
              className="w-full max-w-xs"
              onClick={() => (window.location.href = "/volunteer")}
            >
              Proceed to Volunteer Portal
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      {/* 🚀 STEPPER HEADLINE COMPONENT ELEMENT DISPLAY */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-small font-bold text-text-primary uppercase tracking-wider select-none">
          <span className="flex items-center gap-2 text-trust">
            {activeStep === 1 && <User className="w-4 h-4" />}
            {activeStep === 2 && <Calendar className="w-4 h-4" />}
            {activeStep === 3 && <Briefcase className="w-4 h-4" />}
            {activeStep === 4 && <ShieldCheck className="w-4 h-4" />}
            Section {activeStep} of 4:{" "}
            {activeStep === 1
              ? "Identity Profile"
              : activeStep === 2
                ? "Commitment Matrix"
                : activeStep === 3
                  ? "Capability Assets"
                  : "Clearance & Review"}
          </span>
          <span className="font-mono text-text-muted">
            {Math.round(((activeStep - 1) / 3) * 100)}% Complete
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-text-light/5">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* CORE ENTRY CONTROL CANVAS FORM PANEL LAYER */}
      <form onSubmit={handleSubmit(processRegistrationSubmission)} noValidate>
        <Card
          variant="default"
          padding="lg"
          accentBar="blue"
          isHoverable={false}
          className="shadow-lg bg-white"
        >
          {/* =================================================================
              LOGICAL SECTION 1: PERSONAL INFRASTRUCTURE AND EMERGENCY NETWORKS
          ================================================================= */}
          {activeStep === 1 && (
            <div className="space-y-6 transition-all duration-300">
              <CardHeader className="p-0">
                <h2 className="text-h2 font-bold text-gray-900 tracking-tight">
                  Personal Verification Parameters
                </h2>
                <p className="text-small text-text-muted">
                  Supply all essential identity validation tags required to set
                  up your profile node.
                </p>
              </CardHeader>

              <CardContent className="space-y-5 p-0 pt-2">
                <Input
                  label="Full Legal Name"
                  required
                  placeholder="Johnathan Doe"
                  {...register("name")}
                  error={errors.name?.message}
                  isSuccess={touchedFields.name && !errors.name}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Primary Email Address"
                    type="email"
                    required
                    placeholder="j.doe@example.com"
                    {...register("email")}
                    error={errors.email?.message}
                    isSuccess={touchedFields.email && !errors.email}
                  />
                  <Input
                    label="Contact Phone Number"
                    type="tel"
                    required
                    placeholder="+1234567890"
                    {...register("phone")}
                    error={errors.phone?.message}
                    isSuccess={touchedFields.phone && !errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <Input
                      label="Date of Birth"
                      type="date"
                      required
                      {...register("dob")}
                      error={errors.dob?.message}
                      isSuccess={touchedFields.dob && !errors.dob}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Full Mailing Address Location"
                      required
                      placeholder="123 Operational Lane, Suite 4B, Metropolis"
                      {...register("address")}
                      error={errors.address?.message}
                      isSuccess={touchedFields.address && !errors.address}
                    />
                  </div>
                </div>

                {/* EMERGENCY CONTACT MATRIX DESIGNED SEGMENT PANEL */}
                <div className="mt-8 pt-6 border-t border-text-light/10 space-y-4">
                  <div className="flex items-center gap-2 text-body font-bold text-gray-900 tracking-tight">
                    <Heart className="w-4 h-4 text-orange-500 fill-orange-50" />
                    <h3>Primary Emergency Contact Link</h3>
                  </div>
                  <p className="text-xs text-text-muted">
                    Specify an authorized alternative point-of-contact for field
                    engagement insurance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Emergency Contact Name"
                      required
                      placeholder="Jane Doe"
                      {...register("emergencyName")}
                      error={errors.emergencyName?.message}
                      isSuccess={
                        touchedFields.emergencyName && !errors.emergencyName
                      }
                    />
                    <Input
                      label="Relationship to Applicant"
                      required
                      placeholder="Spouse, Legal Guardian, Sibling"
                      {...register("emergencyRelationship")}
                      error={errors.emergencyRelationship?.message}
                      isSuccess={
                        touchedFields.emergencyRelationship &&
                        !errors.emergencyRelationship
                      }
                    />
                  </div>
                  <Input
                    label="Emergency Phone Record"
                    type="tel"
                    required
                    placeholder="+1987654321"
                    {...register("emergencyPhone")}
                    error={errors.emergencyPhone?.message}
                    isSuccess={
                      touchedFields.emergencyPhone && !errors.emergencyPhone
                    }
                  />
                </div>
              </CardContent>
            </div>
          )}

          {/* =================================================================
              LOGICAL SECTION 2: AVAILABILITY COMMITMENT MATRIX & INTERESTS
          ================================================================= */}
          {activeStep === 2 && (
            <div className="space-y-6 transition-all duration-300">
              <CardHeader className="p-0">
                <h2 className="text-h2 font-bold text-gray-900 tracking-tight">
                  Availability & Skills Matrix
                </h2>
                <p className="text-small text-text-muted">
                  Map your core schedules and baseline professional competencies
                  to project channels.
                </p>
              </CardHeader>

              <CardContent className="space-y-6 p-0 pt-2">
                {/* REQUIREMENT: AVAILABILITY CHECKBOX MATRIX GRID */}
                <div className="space-y-3">
                  <label className="text-small font-bold text-text-primary block select-none">
                    Select Availability Commitment Blocks{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-text-muted">
                    Check all operational frames matching your physical
                    availability tracks.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-background-soft p-5 rounded-xl border border-text-light/10">
                    {AVAILABILITY_CHECKBOXES.map((option) => (
                      <Controller
                        key={option}
                        name="availability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            label={
                              option.charAt(0).toUpperCase() + option.slice(1)
                            }
                            checked={field.value?.includes(option)}
                            onCheckedChange={(isChecked) => {
                              const updatedValue = isChecked
                                ? [...(field.value || []), option]
                                : field.value?.filter((v) => v !== option);
                              field.onChange(updatedValue);
                            }}
                            error={
                              errors.availability
                                ? "Invalid block selection"
                                : undefined
                            }
                          />
                        )}
                      />
                    ))}
                  </div>
                  {errors.availability && (
                    <p
                      className="text-small font-medium text-orange-600 mt-1"
                      role="alert"
                    >
                      {errors.availability.message}
                    </p>
                  )}
                </div>

                {/* REQUIREMENT: SKILLS AND INTERESTS CHECKS BLOCK ARRAY */}
                <div className="space-y-3 pt-4 border-t border-text-light/10">
                  <label className="text-small font-bold text-text-primary block select-none">
                    Skills & Interests Alignment Profiles{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-text-muted">
                    Identify your capability models to route tasks cleanly
                    across local sectors.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background-soft p-5 rounded-xl border border-text-light/10">
                    {SKILLS_CHECKBOXES.map((skill) => (
                      <Controller
                        key={skill}
                        name="skills"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            label={skill
                              .split(" ")
                              .map(
                                (w) => w.charAt(0).toUpperCase() + w.slice(1),
                              )
                              .join(" ")}
                            checked={field.value?.includes(skill)}
                            onCheckedChange={(isChecked) => {
                              const updatedValue = isChecked
                                ? [...(field.value || []), skill]
                                : field.value?.filter((v) => v !== skill);
                              field.onChange(updatedValue);
                            }}
                            error={
                              errors.skills
                                ? "Invalid configuration item"
                                : undefined
                            }
                          />
                        )}
                      />
                    ))}
                  </div>
                  {errors.skills && (
                    <p
                      className="text-small font-medium text-orange-600 mt-1"
                      role="alert"
                    >
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </div>
          )}

          {/* =================================================================
              LOGICAL SECTION 3: RELEVANT EXPERIENCE ANALYSIS & ID FILE ATTACH
          ================================================================= */}
          {activeStep === 3 && (
            <div className="space-y-6 transition-all duration-300">
              <CardHeader className="p-0">
                <h2 className="text-h2 font-bold text-gray-900 tracking-tight">
                  Experience & Verification Upload
                </h2>
                <p className="text-small text-text-muted">
                  Detail your core operational history logs and provide secure
                  asset confirmation tools.
                </p>
              </CardHeader>

              <CardContent className="space-y-6 p-0 pt-2">
                {/* REQUIREMENT: TEXTAREA DESCRIBING RELEVANT EXPERIENCE */}
                <Textarea
                  label="Relevant Volunteering or Professional Experience Statement"
                  required
                  rows={6}
                  placeholder="Provide details about past civic actions, technical skill application setups, or institutional projects you handled historically..."
                  {...register("experience")}
                  error={errors.experience?.message}
                  isSuccess={touchedFields.experience && !errors.experience}
                />

                {/* REQUIREMENT: PHOTO ID UPLOAD COMPONENT (OPTIONAL FOR SPECIAL OPPORTUNITIES) */}
                <div className="space-y-2">
                  <label className="text-small font-bold text-text-primary block select-none">
                    Government Issued Photo ID Verification{" "}
                    <span className="text-text-muted font-normal">
                      (Optional Framework)
                    </span>
                  </label>
                  <p className="text-xs text-text-muted">
                    Providing validation assets helps fast-track assignment
                    allocation tasks for restricted access zones or high-tier
                    project networks.
                  </p>

                  {!photoIdFile ? (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50/40"
                          : "border-text-light/20 hover:border-blue-500/40 bg-background-default"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-10 h-10 text-text-muted mb-3 animate-pulse" />
                      <p className="text-body font-bold text-text-primary text-center">
                        Drag & drop verification asset file here
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Accepts standard JPEG, PNG or digital PDF structural
                        matrices up to 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-blue-50/30 border border-blue-200/60 rounded-xl animate-scale-in">
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-bold text-text-primary truncate">
                            {photoIdFile.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {(photoIdFile.size / 1024 / 1024).toFixed(2)} MB •
                            Active Target Staged
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setValue("photoId", null, { shouldValidate: true })
                        }
                        className="p-2 bg-white hover:bg-red-50 rounded-full text-text-muted hover:text-red-600 border border-text-light/10 transition-colors shadow-sm"
                        title="Dismount uploaded metadata document matrix"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          )}

          {/* =================================================================
              LOGICAL SECTION 4: DOUBLE CHARACTER REFERENCES & LEGAL CONSENTS
          ================================================================= */}
          {activeStep === 4 && (
            <div className="space-y-6 transition-all duration-300">
              <CardHeader className="p-0">
                <h2 className="text-h2 font-bold text-gray-900 tracking-tight">
                  Validation Audit References & Consents
                </h2>
                <p className="text-small text-text-muted">
                  Supply validation endpoints to authorize legal processing
                  steps safely.
                </p>
              </CardHeader>

              <CardContent className="space-y-6 p-0 pt-2">
                {/* REQUIREMENT: TWO SEPARATE DETAILED REFERENCE GROUPS */}
                <div className="space-y-5 p-5 bg-background-soft rounded-xl border border-text-light/10">
                  <div className="flex items-center gap-2 text-small font-black tracking-wider text-blue-700 uppercase">
                    <Users className="w-4 h-4" />
                    <h3>Character Validation Reference Source 1</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name Reference 1"
                      required
                      placeholder="Alice Sterling"
                      {...register("ref1Name")}
                      error={errors.ref1Name?.message}
                    />
                    <Input
                      label="Professional Relationship 1"
                      required
                      placeholder="Department Supervisor, Professor"
                      {...register("ref1Relationship")}
                      error={errors.ref1Relationship?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Verification Route 1"
                      type="tel"
                      placeholder="+15550192"
                      required
                      {...register("ref1Phone")}
                      error={errors.ref1Phone?.message}
                    />
                    <Input
                      label="Email Destination 1"
                      type="email"
                      placeholder="alice@work.com"
                      required
                      {...register("ref1Email")}
                      error={errors.ref1Email?.message}
                    />
                  </div>
                </div>

                <div className="space-y-5 p-5 bg-background-soft rounded-xl border border-text-light/10">
                  <div className="flex items-center gap-2 text-small font-black tracking-wider text-blue-700 uppercase">
                    <Users className="w-4 h-4" />
                    <h3>Character Validation Reference Source 2</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name Reference 2"
                      required
                      placeholder="Robert Vance"
                      {...register("ref2Name")}
                      error={errors.ref2Name?.message}
                    />
                    <Input
                      label="Professional Relationship 2"
                      required
                      placeholder="Former Project Lead, Team Director"
                      {...register("ref2Relationship")}
                      error={errors.ref2Relationship?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Verification Route 2"
                      type="tel"
                      placeholder="+15550143"
                      required
                      {...register("ref2Phone")}
                      error={errors.ref2Phone?.message}
                    />
                    <Input
                      label="Email Destination 2"
                      type="email"
                      placeholder="r.vance@company.com"
                      required
                      {...register("ref2Email")}
                      error={errors.ref2Email?.message}
                    />
                  </div>
                </div>

                {/* REQUIREMENT: HOW DID YOU HEAR ABOUT US DROPDOWN CONTEXT */}
                <div className="pt-2">
                  <Controller
                    name="referralSource"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Discovery Tracker: How did you hear about us?"
                        required
                        options={REFERRAL_OPTIONS}
                        placeholder="Please choose a tracking channel location parameter"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.referralSource?.message}
                        isSuccess={!!field.value && !errors.referralSource}
                      />
                    )}
                  />
                </div>

                {/* REQUIREMENT: BACKGROUND CONSENT CHECKBOX WITH DESCRIPTION DETAIL */}
                <div className="pt-4 mt-6 border-t border-text-light/10 space-y-4">
                  <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-4 space-y-3.5">
                    <Controller
                      name="backgroundConsent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          label="Background Compliance Consent Authorization Declaration *"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          error={errors.backgroundConsent?.message}
                        />
                      )}
                    />
                    <p className="text-xs text-text-muted leading-relaxed pl-8">
                      <strong>Operational Explanation Disclosure:</strong> By
                      marking this mandatory framework agreement checkbox item,
                      you grant express structural authorization permissions
                      enabling our validation teams to process official records
                      inquiries, civil background history audits, and credential
                      registry tracks. This policy protects high-vulnerability
                      community channels, localized medical distribution
                      modules, and sensitive educational spaces.
                    </p>
                  </div>

                  {/* REQUIREMENT: TERMS AGREEMENT ACTION ELEMENT */}
                  <div className="bg-gray-50/50 border border-text-light/10 rounded-xl p-4 space-y-2">
                    <Controller
                      name="termsAgreement"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          label="Legal Terms, Confidentiality and Service Agreements Acknowledgment *"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          error={errors.termsAgreement?.message}
                        />
                      )}
                    />
                    <p className="text-xs text-text-muted leading-relaxed pl-8">
                      I certify that all identification logs, reference details,
                      and capability files supplied across this interface are
                      completely accurate and truthful to my knowledge.
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {/* =================================================================
              GLOBAL NAVIGATION ACTIONS FOOTER PANEL PLATFORM INTERFACE
          ================================================================= */}
          <CardFooter className="justify-between bg-background-soft/30 px-0 pb-0 pt-6 mt-8 border-t border-text-light/10">
            {activeStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={regressStepFlow}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="font-medium"
              >
                Back Section
              </Button>
            ) : (
              <div aria-hidden="true" className="w-1" /> // Structural spacer matching alignment requirements
            )}

            {activeStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                onClick={advanceStepFlow}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-medium"
              >
                Next Section
              </Button>
            ) : (
              <Button
                type="submit"
                variant="success"
                size="lg"
                isLoading={isSubmitting}
                className="font-bold tracking-tight px-8"
              >
                Submit Application
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
