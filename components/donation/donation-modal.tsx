"use client";

import * as React from "react";
import { useState, useTransition, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ImpactBreakdown from "../campaigns/impact-breakdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  X,
} from "lucide-react";

// Atomic UI Stack Imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinearProgress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";

// Data Presets Matrix
const PRESET_TIERS = [
  {
    amount: 25,
    description: "Provides immediate medical checkups for 1 child.",
  },
  {
    amount: 50,
    description: "Supplies a full month of highly nutritious food kits.",
  },
  {
    amount: 100,
    description: "Funds primary educational learning kits and clean uniforms.",
  },
  {
    amount: 250,
    description: "Secures emergency shelter and clean drinking water lines.",
  },
];

const COUNTRIES = [
  { value: "US", label: "United States (Tax Deductible)" },
  { value: "GB", label: "United Kingdom (Gift Aid Eligible)" },
  { value: "CA", label: "Canada (Tax Deductible)" },
  { value: "NG", label: "Nigeria" },
  { value: "DE", label: "Germany" },
];

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit Card (Stripe)" },
  { value: "bank", label: "Direct Bank Wire Transfer" },
  { value: "ussd", label: "Instant USSD Code Dialing" },
];

// Step Validation Schemas
const step1Schema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(5, "Minimum donation amount is $5"),
  ),
  isRecurring: z.boolean().default(false),
  frequency: z.enum(["monthly", "yearly"]).default("monthly"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid contact phone number"),
  country: z.string().min(1, "Please select your country"),
  isAnonymous: z.boolean().default(false),
  dedication: z.string().optional(),
});

const step3Schema = z.object({
  paymentMethod: z.enum(["card", "bank", "ussd"]).default("card"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy to proceed",
  }),
});

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
  campaignCategory?:
    | "education"
    | "healthcare"
    | "environment"
    | "poverty-relief"
    | "emergency"
    | "animal-welfare";
  amount?: number;
  isRecurring?: boolean;
  name?: string;
  dedication?: string;
  paymentMethod?: string;
}

export const DonationModal = ({
  isOpen,
  onClose,
  campaignId,
  campaignTitle,
  campaignCategory = "environment",
  amount,
  isRecurring,
  name,
  dedication,
  paymentMethod,
}: DonationModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isPending, startTransition] = useTransition();
  const [copiedText, setCopiedText] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema,
    ),
    defaultValues: {
      amount: amount ?? 50,
      isRecurring: isRecurring ?? false,
      frequency: "monthly" as const,
      name: name ?? "",
      email: "",
      phone: "",
      country: "NG",
      isAnonymous: false,
      dedication: dedication ?? "",
      paymentMethod: (paymentMethod as "card" | "bank" | "ussd") ?? "card",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = form;

  const currentAmount = Number(watch("amount") || 0);
  const watchedisRecurring = Boolean(watch("isRecurring"));
  const frequency = watch("frequency");
  const selectedPaymentMethod = watch("paymentMethod");

  const calculatedImpactText = useMemo(() => {
    if (!currentAmount || currentAmount < 5)
      return "Enter an amount to view your micro-impact tracking overview.";

    if (currentAmount < 25)
      return `Your custom donation of $${currentAmount} directly fuels emergency distribution site logistics.`;

    if (currentAmount < 50)
      return `With $${currentAmount}, you provide standard clinical medical supplies to children in crisis zones.`;

    if (currentAmount < 100)
      return `Your $${currentAmount} allocation secures safe food kits and clean survival rations for entire families.`;

    if (currentAmount < 250)
      return `A magnificent $${currentAmount} investment delivers complete primary school supplies and textbooks.`;

    return `An incredible $${currentAmount} handles complete clean sanitation pipeline systems and permanent village filtration.`;
  }, [currentAmount]);

  const handleNextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? ["amount", "isRecurring", "frequency"]
        : step === 2
          ? ["name", "email", "phone", "country", "isAnonymous", "dedication"]
          : [];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep((prev) => (prev + 1) as any);
  };

  const handleBackStep = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const onFormSubmit = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep(4);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadReceipt = () => {
    const printableContent = `
==============================================
OFFICIAL DIGITAL DONATION RECEIPT
==============================================
Campaign: ${campaignTitle}
Transaction Reference ID: TXN-${Math.random().toString(36).substring(2, 11).toUpperCase()}
Donor: ${watch("isAnonymous") ? "Anonymous Supporter" : watch("name")}
Country: ${watch("country")}
Amount Authenticated: $${watch("amount")}.00 USD
Frequency Metric: ${watch("isRecurring") ? watch("frequency") : "One-Time Donation"}
Payment Gateway Vector: ${String(watch("paymentMethod") || "").toUpperCase()} (Stripe Verified)
Status Flag: Settled & Disbursed
Thank you for your generous dedication. Your tax-deductible token is authenticated.
==============================================
    `;
    const blob = new Blob([printableContent.trim()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt-${campaignId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleModalClose = () => {
    form.reset();
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative my-8">
        {/* Close Button Anchor Node */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Header Panel */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge category={campaignCategory} size="sm">
                Live Campaign
              </Badge>
              {step === 1 && (
                <Badge variant="urgent" size="sm">
                  Urgent Gap
                </Badge>
              )}
            </div>
            <span className="text-xs font-mono font-black text-gray-400 uppercase tracking-wider pr-8">
              Step {step} of 4
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight line-clamp-1 pr-6">
            {campaignTitle}
          </h1>
          <LinearProgress
            value={step * 25}
            max={100}
            variant="orange"
            showPercentText={false}
          />
        </div>

        {/* Interactive Step Manager */}
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white"
        >
          <AnimatePresence mode="wait">
            {/* Step 1 Content */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Select Donation Amount
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose a preset funding tier or input a custom allocation
                    value.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {PRESET_TIERS.map((tier) => (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() =>
                        setValue("amount", tier.amount, {
                          shouldValidate: true,
                        })
                      }
                      className={`p-4 text-left border rounded-xl transition-all flex flex-col justify-between cursor-pointer group hover:border-orange-500 ${
                        currentAmount === tier.amount
                          ? "border-orange-600 bg-orange-50/30 ring-2 ring-orange-500/20"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span className="text-xl font-mono font-black group-hover:text-orange-600 transition-colors">
                        ${tier.amount}
                      </span>
                      <span className="text-xs text-gray-500 mt-2 line-clamp-2 leading-snug">
                        {tier.description}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <Input
                    label="Custom Donation Amount ($USD)"
                    type="number"
                    placeholder="Enter explicit allocation value"
                    // onError={(errors as any).amount?.message}
                    {...form.register("amount")}
                  />
                </div>

                <div className="pt-2">
                  <ImpactBreakdown
                    currentAmount={currentAmount}
                    onSelectAmount={(selectedAmount) =>
                      setValue("amount", selectedAmount, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">
                        Make this a recurring donation
                      </span>
                      <span className="text-xs text-gray-500">
                        Automate your support infrastructure frequency.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={watchedisRecurring}
                        onChange={(e) =>
                          setValue("isRecurring", e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  {watchedisRecurring && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="grid grid-cols-2 gap-2 pt-2"
                    >
                      {["monthly", "yearly"].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setValue("frequency", freq as any)}
                          className={`py-2 text-center text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                            frequency === freq
                              ? "bg-orange-600 text-white border-orange-600"
                              : "bg-white text-gray-800 border-gray-200"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2 Content */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Your Personal Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter credentials to process the digital secure receipt
                    ledger.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={(errors as any).name?.message}
                    {...form.register("name")}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="johndoe@example.com"
                    error={(errors as any).email?.message}
                    {...form.register("email")}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    error={(errors as any).phone?.message}
                    {...form.register("phone")}
                    required
                  />
                  <div className="w-full space-y-2 flex flex-col items-start">
                    <label className="text-xs font-bold text-gray-900">
                      Country (Tax Residence)
                    </label>
                    <select
                      {...form.register("country")}
                      className="w-full h-11 px-3.5 bg-white text-gray-900 rounded-lg border border-gray-200 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Controller
                    name="isAnonymous"
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        label="Hide my details (Donate completely anonymously)"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <Textarea
                  label="Optional Dedication Note"
                  placeholder="In honor of... / In memoriam of... (Your words will stand on our donor wall logs)"
                  error={(errors as any).dedication?.message}
                  {...form.register("dedication")}
                />
              </motion.div>
            )}

            {/* Step 3 Content */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Secure Checkout Protocol
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose your preferred transaction engine pipeline channel.
                  </p>
                </div>

                <div className="w-full">
                  <Controller
                    name="paymentMethod"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup
                        label="Select Gateway Vector"
                        options={PAYMENT_METHODS}
                        value={field.value}
                        onChange={field.onChange}
                        error={(errors as any).paymentMethod?.message}
                      />
                    )}
                  />
                </div>

                <div className="border border-gray-100 p-5 rounded-xl bg-gray-50">
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-blue-600" />{" "}
                          Stripe Sandbox Elements Frame
                        </span>
                        <Badge variant="active" size="sm">
                          Test Mode Active
                        </Badge>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg text-xs font-mono tracking-wide text-gray-500 text-center">
                        🔒 Card input field secured via tokenized execution.
                      </div>
                      <Input
                        label="Dummy Card Details"
                        placeholder="4242 •••• •••• 4242"
                        disabled
                      />
                    </div>
                  )}

                  {selectedPaymentMethod === "bank" && (
                    <div className="space-y-3 font-mono text-xs text-gray-700">
                      <div className="flex items-center gap-1.5 text-orange-700 font-sans font-bold text-sm mb-1">
                        <Building2 className="w-4 h-4" /> Settlement Wire
                        Coordinates
                      </div>
                      <div className="p-3.5 bg-white border border-gray-200 rounded-lg space-y-1.5 relative">
                        <p>
                          <strong>Bank:</strong> Escrow Trust Infrastructure
                          Bank
                        </p>
                        <p>
                          <strong>Account:</strong> 9012-4412-8821-001
                        </p>
                        <p>
                          <strong>Routing Transit:</strong> RTN-021000021
                        </p>
                        <p>
                          <strong>Reference Hook:</strong> WATER-ID-
                          {campaignId.substring(0, 5).toUpperCase()}
                        </p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("9012-4412-8821-001")}
                          className="absolute right-3 top-3 p-1.5 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
                        >
                          {copiedText ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                        Please execute the transfer via your external banking
                        system. Once sent, click submission to finalize
                        reporting records.
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "ussd" && (
                    <div className="space-y-3 text-center py-2">
                      <div className="inline-flex p-3 bg-orange-50 rounded-full text-orange-600 mb-1">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-gray-900">
                        Instant Dialing String
                      </h4>
                      <p className="text-xl font-mono font-black text-gray-800">
                        *737*1*2*DONATE#
                      </p>
                      <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                        Dial the network sequence listed above on your mobile
                        terminal matching your bank profile records to validate
                        confirmation.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Controller
                    name="agreeToTerms"
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        label="I explicitly certify authorization and agree to the general Terms and Privacy Policies"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        error={(errors as any).agreeToTerms?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-emerald-700 bg-emerald-50/50 py-2 border border-emerald-100 rounded-lg">
                  <ShieldCheck className="w-4 h-4 fill-emerald-600/10" />{" "}
                  Guaranteed 256-Bit SSL Enterprise Level Security Architecture.
                </div>
              </motion.div>
            )}

            {/* Step 4 Content */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative p-4 bg-emerald-100 rounded-full text-emerald-600">
                    <CheckCircle2 className="w-12 h-12 fill-emerald-500/10 stroke-[2.5]" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 text-orange-500 w-5 h-5 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Thank you for your donation!
                  </h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Your financial allocation has successfully processed. A
                    digital confirmation receipt has been authorized.
                  </p>
                </div>

                <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50 text-left space-y-3 font-mono text-xs text-gray-700 max-w-md mx-auto shadow-inner">
                  <div className="flex justify-between border-b pb-2 text-gray-400 font-sans font-bold uppercase tracking-wider text-[10px]">
                    <span>Receipt Summary</span>
                    <span>Verified Block</span>
                  </div>
                  <div className="flex justify-between font-sans">
                    <span className="text-gray-500">Allocation Amount:</span>
                    <span className="font-mono font-bold text-gray-900 text-sm">
                      ${currentAmount}.00 USD
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Donor Record:</span>
                    <span className="text-gray-900">
                      {watch("isAnonymous") ? "Anonymous" : watch("name")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Billing Vector:</span>
                    <span className="text-gray-900 uppercase">
                      {watch("paymentMethod")} Portal
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Receipt Hash:</span>
                    <span className="text-gray-900 font-bold">
                      #RC-
                      {Math.random().toString(36).substring(7).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                  <Button
                    type="button"
                    variant="success"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleDownloadReceipt}
                  >
                    <span className="flex items-center gap-1.5 justify-center">
                      <Download className="w-4 h-4" /> Download Receipt
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-orange-500/20 text-orange-600 hover:bg-orange-50/30"
                    onClick={() => {
                      const shareText = encodeURIComponent(
                        `I just donated $${currentAmount} to the ${campaignTitle} campaign! Join me in driving global impact transformations. 🌍✨`,
                      );

                      window.open(
                        `https://twitter.com/intent/tweet?text=${shareText}`,
                        "_blank",
                      );
                    }}
                  >
                    <span className="flex items-center gap-1.5 justify-center">
                      <Share2 className="w-4 h-4" />
                      Share Impact Post
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Control Panel */}
          {step < 4 && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
              <div>
                {step > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBackStep}
                  >
                    <span className="flex items-center gap-1.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </span>
                  </Button>
                )}
              </div>

              <div>
                {step < 3 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleNextStep}
                  >
                    <span className="flex items-center gap-1.5">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" isLoading={isPending}>
                    <span className="flex items-center gap-1.5">
                      Authorize Donation{" "}
                      <Heart className="w-4 h-4 fill-current" />
                    </span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
