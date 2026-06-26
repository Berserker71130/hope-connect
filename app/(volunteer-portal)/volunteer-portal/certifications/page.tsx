"use client";

import * as React from "react";
import {
  Award,
  Download,
  Share2,
  FileText,
  CheckCircle,
  Lock,
  Calendar,
  Clock,
  Send,
  // Linkedin,
  // Twitter,
  AwardIcon,
  HelpCircle,
  Info,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import jsPDF from "jspdf";

// --- DUMMY IMPLEMENTATIONS & IMPORTS FOR THE CONTEXT ---
import { dummyVolunteers, dummyLoggedHours } from "@/lib/dummy-data";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { LinearProgress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

// Ensure active volunteer user defaults safely to our core seed profile
const activeUser = dummyVolunteers[0] || {
  id: "vol-user-01",
  name: "Marcus Vance",
  email: "marcus.v@hopeconnect.org",
  hoursTracked: 54,
  joinedDate: "2025-02-14",
  certifications: ["First Aid Certified", "Community Team Leadership Core"],
};

// MILESTONE DATA STRUCTURE
interface MilestoneConfig {
  hours: number;
  id: string;
  title: string;
  description: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
}

const MILESTONES: MilestoneConfig[] = [
  {
    hours: 10,
    id: "m-10",
    title: "Bronze Tier Activist",
    description: "Initial operational baseline mobilization milestone.",
    color: "amber",
    badgeBg: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-900/50",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  {
    hours: 50,
    id: "m-50",
    title: "Silver Tier Vanguard",
    description: "Substantial field logistical deployment dedication.",
    color: "slate",
    badgeBg: "bg-slate-100 dark:bg-slate-800",
    borderColor: "border-slate-300 dark:border-slate-700",
    textColor: "text-slate-700 dark:text-slate-300",
  },
  {
    hours: 100,
    id: "m-100",
    title: "Gold Tier Guardian",
    description: "Exceptional multi-campaign community leadership excellence.",
    color: "yellow",
    badgeBg: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-900/50",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  {
    hours: 500,
    id: "m-500",
    title: "Elite Legacy Champion",
    description:
      "Lifelong transformative humanitarian engineering layout master.",
    color: "purple",
    badgeBg: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-900/50",
    textColor: "text-purple-700 dark:text-purple-400",
  },
];

export default function CertificationsPage() {
  // STATE LAYER
  const [isReferenceModalOpen, setIsReferenceModalOpen] = React.useState(false);
  const [referencePurpose, setReferencePurpose] = React.useState("");
  const [referenceError, setReferenceError] = React.useState("");
  const [isSubmittingReference, setIsSubmittingReference] =
    React.useState(false);
  const [downloadingCertificateId, setDownloadingCertificateId] =
    React.useState<string | null>(null);
  const [activeShareMilestone, setActiveShareMilestone] =
    React.useState<MilestoneConfig | null>(null);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // METRIC CALCULATIONS
  const totalHours = activeUser.hoursTracked;

  // Find the closest upcoming milestone
  const nextMilestone =
    MILESTONES.find((m) => totalHours < m.hours) ||
    MILESTONES[MILESTONES.length - 1];
  const previousMilestoneHours =
    [...MILESTONES].reverse().find((m) => totalHours >= m.hours)?.hours || 0;

  // Calculate relative progress values for linear track targeting
  const targetProgressMax = nextMilestone.hours;
  const progressPercentage = Math.min(
    Math.round((totalHours / targetProgressMax) * 100),
    100,
  );

  // --- RENDERING CANVAS BADGES ON-FLY ---
  const generateBadgeBlobUrl = (
    milestone: MilestoneConfig,
    isLocked: boolean,
  ): string => {
    if (typeof window === "undefined") return "";
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.clearRect(0, 0, 200, 200);

    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, 2 * Math.PI);
    ctx.fillStyle = isLocked
      ? "#f1f5f9"
      : milestone.hours === 500
        ? "#f3e8ff"
        : milestone.hours === 100
          ? "#fef9c3"
          : milestone.hours === 50
            ? "#e2e8f0"
            : "#fef3c7";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = isLocked
      ? "#cbd5e1"
      : milestone.hours === 500
        ? "#a855f7"
        : milestone.hours === 100
          ? "#eab308"
          : milestone.hours === 50
            ? "#64748b"
            : "#d97706";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 100, 65, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLocked ? "#e2e8f0" : "#f1f5f9";
    ctx.stroke();

    ctx.fillStyle = isLocked
      ? "#94a3b8"
      : milestone.hours === 500
        ? "#7e22ce"
        : milestone.hours === 100
          ? "#a16207"
          : milestone.hours === 50
            ? "#475569"
            : "#b45309";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${milestone.hours}HRS`, 100, 95);

    ctx.fillStyle = isLocked ? "#64748b" : "#0f172a";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(isLocked ? "LOCKED" : "UNLOCKED", 100, 130);

    return canvas.toDataURL("image/png");
  };

  // --- HARDWARE DEPLOYED JSPDF TEMPLATE GENERATION MOTOR ---
  const handleDownloadCertificate = async (milestone: MilestoneConfig) => {
    setDownloadingCertificateId(milestone.id);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      // 1. Background paint
      doc.setFillColor(252, 252, 253);
      doc.rect(0, 0, 297, 210, "F");

      // 2. Outer Slate Border
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 277, 190, "D");

      // 3. Inner Gold Accent Border
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.5);
      doc.rect(13, 13, 271, 184, "D");

      // 4. Corner Square Accents
      doc.setFillColor(217, 119, 6);
      doc.rect(9, 9, 6, 6, "F");
      doc.rect(282, 9, 6, 6, "F");
      doc.rect(9, 195, 6, 6, "F");
      doc.rect(282, 195, 6, 6, "F");

      doc.setFillColor(30, 41, 59);
      doc.rect(30, 13, 45, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.text("HOPECONNECT", 52.5, 24, { align: "center" });
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(6);
      doc.text("GLOBAL NGO NETWORK", 52.5, 29, { align: "center" });

      // 5. Main title Configuration
      doc.setTextColor(30, 41, 59);
      doc.setFont("Times-Bold", "italic");
      doc.setFontSize(28);
      doc.text("Certificate of Humanitarian Service", 148.5, 45, {
        align: "center",
      });

      // Decorative Separator Line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(80, 53, 217, 53);

      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);
      doc.text(
        "THIS ACKNOWLEDGMENT IS PROUDLY CONFERRED UPON THE INDIVIDUAL NAMED BELOW",
        148.5,
        63,
        { align: "center" },
      );

      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(32);
      doc.text(activeUser.name, 148.5, 82, { align: "center" });

      doc.setTextColor(71, 85, 105);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      const explanatoryText = `In recognition of outstanding civic service and humanitarian commitment, this certificate acknowledges the recipient's verified contribution of ${milestone.hours} volunteer hours toward environmental, healthcare, and educational initiatives that have created meaningful impact in communities around the world.`;

      const textLines = doc.splitTextToSize(explanatoryText, 210);
      doc.text(textLines, 148.5, 98, { align: "center" });

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(241, 245, 249);
      doc.rect(88.5, 122, 120, 20, "FD");

      doc.setTextColor(217, 119, 6);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.text(
        `VERIFIED MILESTONE RECORD LEVEL: ${milestone.title.toUpperCase()}`,
        148.5,
        130,
        { align: "center" },
      );
      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        `Total Authenticated Structural Logged Volume: ${milestone.hours}.00 Field Target Operations Hours`,
        148.5,
        137,
        { align: "center" },
      );
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(40, 175, 105, 175);

      doc.setTextColor(71, 85, 105);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.text("DATE OF SYSTEM GENERATION", 72.5, 181, { align: "center" });
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(115, 115, 115);
      doc.text("June 28, 2026 (Operational UTC)", 72.5, 187, {
        align: "center",
      });

      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(192, 175, 257, 175);

      doc.setDrawColor(29, 78, 216);
      doc.setLineWidth(0.75);
      doc.line(198, 170, 204, 164);
      doc.line(204, 164, 215, 172);
      doc.line(215, 172, 230, 162);
      doc.line(230, 162, 252, 169);

      doc.setTextColor(71, 85, 105);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.text("EXECUTIVE COMPLIANCE DIRECTOR", 224.5, 181, {
        align: "center",
      });
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(115, 115, 115);
      doc.text("Global HopeConnect Audit Secretariat", 224.5, 187, {
        align: "center",
      });

      doc.setFont("Courier", "normal");
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      const securityHash = `HC-VERIFY-ID:${activeUser.id}-M${milestone.hours}-SHA256:${Math.random().toString(16).substring(2, 10).toUpperCase()}${Math.random().toString(16).substring(2, 10).toUpperCase()}`;
      doc.text(securityHash, 148.5, 202, { align: "center" });

      doc.save(
        `Certificate_${milestone.hours}_Hours_${activeUser.name.replace(/\s+/g, "_")}.pdf`,
      );

      toast.success(
        "Download Successful",
        `Your premium ${milestone.hours}-hour printable certificate PDF has generated and saved correctly.`,
      );
    } catch (err) {
      console.error(err);
      toast.error(
        "Download Faulted",
        "A rendering error occurred during PDF generation. Please try again.",
      );
    } finally {
      setDownloadingCertificateId(null);
    }
  };

  // --- SOCIAL ACTION SYSTEM ---
  const handleOpenShareOptions = (milestone: MilestoneConfig) => {
    setActiveShareMilestone(milestone);
  };

  const executeSocialShare = (platform: "linkedin" | "twitter") => {
    if (!activeShareMilestone) return;

    const textContext = `I have unlocked the official ${activeShareMilestone.title} Milestone Badge by completing over ${activeShareMilestone.hours} hours of verified field service deployment tracks with HopeConnect!`;
    const shareUrl = "https://hopeconnect.org/impact/verification";

    let targetLink = "";
    if (platform === "linkedin") {
      targetLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(textContext)}`;
    } else {
      targetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textContext + " " + shareUrl)}`;
    }

    toast.info(
      "Share Portal Initiated",
      `Your milestone achievement metadata packet has been routed toward ${
        platform === "linkedin" ? "LinkedIn" : "Twitter"
      }.`,
    );

    setActiveShareMilestone(null);
  };

  // --- REFERENCE LETTER VALIDATION MOTOR ---
  const handleRequestReferenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReferenceError("");

    if (!referencePurpose.trim() || referencePurpose.trim().length < 15) {
      setReferenceError(
        "Please supply a valid explanation (minimum 15 characters) detailing where or to whom this reference should be addressed.",
      );
      return;
    }

    setIsSubmittingReference(true);

    // Simulate database update pipeline
    setTimeout(() => {
      setIsSubmittingReference(false);
      setIsReferenceModalOpen(false);
      setReferencePurpose("");

      toast.success(
        "Reference Request Logged",
        "Your official service file has been routed to the administrative compliance unit. Processing completes in 48-72 business hours.",
      );
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 bg-background-default text-text-primary min-h-screen">
      {/* HEADER SECTION LAYOUT MATRIX */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-text-light/10 pb-6 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-trust">
            <Award className="w-7 h-7 stroke-[2.2]" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-sans">
              Recognition &amp; Certifications
            </h1>
          </div>
          <p className="text-sm text-text-muted max-w-2xl font-body">
            Download your auto-generated milestone performance documents, review
            historical achievement badges, and request verified organizational
            performance profiles.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <Button
            variant="outline"
            leftIcon={<FileText className="w-4 h-4 text-primary" />}
            onClick={() => setIsReferenceModalOpen(true)}
            className="w-full md:w-auto shadow-sm"
          >
            Request Reference Letter
          </Button>
        </div>
      </div>

      {/* CORE PROGRESS HOOD METRIC SUMMARY BANNER */}
      <Card
        variant="featured"
        padding="lg"
        isHoverable={false}
        className="border-l-4 border-l-blue-600"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Block: Current Absolute Values */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-sans font-bold text-blue-600">
              Active Account Profile
            </p>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {activeUser.name}
            </h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="bg-blue-100 text-blue-700 font-mono text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {totalHours} Total Tracked Hours
              </div>
              <div className="bg-teal-50 text-teal-700 font-sans text-xs font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </div>
            </div>
          </div>

          {/* Middle Block: Next Target Linear Tracker Line */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-blue-100 shadow-xs">
            <LinearProgress
              value={totalHours}
              max={targetProgressMax}
              variant="blue"
              showPercentText={false}
              label={`Next Milestone Target: ${nextMilestone.title}`}
              milestones={[10, 50, 100, 500]}
            />
            <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 mt-2">
              <p>
                Completed {totalHours} hrs out of {targetProgressMax} hrs
                required
              </p>
              <p className="font-bold text-blue-600">
                {targetProgressMax - totalHours} hours remaining
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* DUAL CONTENT COLUMN STRUCTURE MAPS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT SECTION PANELS: EARNED PROGRESSIVE CERTIFICATES MATRIX (2 COLUMNS) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Your Auto-Generated Certificates
            </h2>
            <p className="text-xs text-text-muted font-body">
              Milestone authorization certificates decouple automatically as
              your logged service records pass target thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MILESTONES.map((milestone) => {
              const isUnlocked = totalHours >= milestone.hours;

              return (
                <Card
                  key={milestone.id}
                  variant={isUnlocked ? "default" : "default"}
                  accentBar={isUnlocked ? "blue" : "none"}
                  className={`flex flex-col h-full border ${isUnlocked ? "border-text-light/10" : "bg-gray-50/50 border-gray-100 opacity-80"}`}
                  isHoverable={isUnlocked}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${isUnlocked ? "bg-emerald-500" : "bg-gray-300"}`}
                        />
                        <h3 className="font-bold text-sm text-gray-900 tracking-tight">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-[11px] font-mono text-gray-400 font-bold uppercase">
                        {milestone.hours} Hours Milestone
                      </p>
                    </div>

                    <div
                      className={`p-2 rounded-lg ${isUnlocked ? milestone.badgeBg : "bg-gray-100"}`}
                    >
                      {isUnlocked ? (
                        <Award className={`w-5 h-5 ${milestone.textColor}`} />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 text-xs pt-1 text-gray-500 leading-normal font-body">
                    {milestone.description}
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-3 border-t border-text-light/10 mt-3">
                    {isUnlocked ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={
                            <Share2 className="w-3.5 h-3.5 text-gray-500" />
                          }
                          onClick={() => handleOpenShareOptions(milestone)}
                          className="text-xs hover:text-primary"
                        >
                          Share Badge
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<Download className="w-3.5 h-3.5" />}
                          isLoading={downloadingCertificateId === milestone.id}
                          onClick={() => handleDownloadCertificate(milestone)}
                          className="text-xs font-sans font-semibold shadow-xs"
                        >
                          Download PDF
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-between w-full text-[11px] text-gray-400 font-medium bg-gray-50 p-2 rounded-md border border-gray-100/70">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Progress Tracker Track:
                        </span>
                        <span className="font-mono font-bold text-gray-500">
                          {totalHours}/{milestone.hours} hrs
                        </span>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION PANEL: VISUAL GALLERY SYSTEM (1 COLUMN) */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Achievement Gallery
            </h2>
            <p className="text-xs text-text-muted font-body">
              Live visual rendering vectors of your authenticated organizational
              milestones.
            </p>
          </div>

          <Card
            variant="default"
            padding="md"
            isHoverable={false}
            className="border border-text-light/10 divide-y divide-text-light/5"
          >
            {MILESTONES.map((milestone) => {
              const isUnlocked = totalHours >= milestone.hours;
              const badgeSrc = generateBadgeBlobUrl(milestone, !isUnlocked);

              return (
                <div
                  key={`gallery-${milestone.id}`}
                  className="flex items-center space-x-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-gray-50 rounded-lg p-0.5 border border-gray-100 flex items-center justify-center">
                    {/* 👇 Check if mounted first to prevent server/client mismatches */}
                    {isMounted && badgeSrc ? (
                      <img
                        src={badgeSrc}
                        alt={milestone.title}
                        className={`w-full h-full object-contain ${!isUnlocked ? "grayscale opacity-40" : ""}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
                    )}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 rounded-lg">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 justify-between">
                      <p
                        className={`text-sm font-bold truncate ${isUnlocked ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {milestone.hours} Hrs Badge
                      </p>
                      {isUnlocked ? (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider font-sans">
                          Earned
                        </span>
                      ) : (
                        <span className="text-[10px] bg-gray-100 text-gray-400 font-medium px-1.5 py-0.5 rounded-full border border-transparent uppercase tracking-wider font-sans">
                          Locked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate font-body">
                      {milestone.title}
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 font-body">
                      <Calendar className="w-3 h-3 text-gray-300" />
                      {isUnlocked
                        ? `Authenticated: ${activeUser.joinedDate || "2025-02-14"}`
                        : "Operational Target Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      {/* --- REUSABLE INTERACTIVE COMPONENT MODALS LAYER --- */}

      {/* 1. REFERENCE LETTER REQUEST INPUT DIALOG MODAL FRAME */}
      <Modal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
        size="md"
      >
        <ModalHeader
          title="Request Official Reference Letter"
          description="Submit a verified request portfolio to the administrative secretariat team to generate an authorized corporate character or academic reference letter."
        />

        <form onSubmit={handleRequestReferenceSubmit}>
          <ModalBody>
            <div className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3 text-xs text-blue-800 leading-normal">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1 font-body">
                  <p className="font-bold">Credential Eligibility Confirmed</p>
                  <p>
                    Your record contains{" "}
                    <span className="font-mono font-bold">
                      {totalHours} verified structural hours
                    </span>
                    . The NGO secretariat will anchor the document layout on
                    your active data logs, community event attendances, and
                    leader feedback arrays.
                  </p>
                </div>
              </div>

              <Textarea
                label="Target Destination &amp; Letter Purpose"
                placeholder="E.g., Corporate Hiring Manager / University Admissions Desk. Please outline specific sub-campaign areas you would like highlighted in your background text..."
                value={referencePurpose}
                onChange={(e) => {
                  setReferencePurpose(e.target.value);
                  if (referenceError) setReferenceError("");
                }}
                error={referenceError}
                required
                rows={5}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsReferenceModalOpen(false)}
              disabled={isSubmittingReference}
              className="text-xs font-sans"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmittingReference}
              leftIcon={<Send className="w-3.5 h-3.5" />}
              className="text-xs font-sans font-semibold shadow-sm"
            >
              Submit Portfolio Request
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* 2. SOCIAL MEDIA BADGES SHARING ROUTER CHOICE MODAL */}
      <Modal
        isOpen={activeShareMilestone !== null}
        onClose={() => setActiveShareMilestone(null)}
        size="sm"
      >
        <ModalHeader
          title="Share Milestone Achievement"
          description="Route your verified milestone record data parameters toward social business directories."
        />

        <ModalBody>
          {activeShareMilestone && (
            <div className="space-y-4 text-center py-2">
              <div className="w-20 h-20 mx-auto bg-slate-50 border border-slate-100 p-1 rounded-full flex items-center justify-center shadow-xs">
                <Award className="w-10 h-10 text-blue-600 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-base text-gray-900 tracking-tight">
                  {activeShareMilestone.title}
                </p>
                <p className="text-xs text-gray-400 font-mono font-bold uppercase">
                  {activeShareMilestone.hours} Hours Service Record
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => executeSocialShare("linkedin")}
                  className="flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-600 bg-white hover:bg-blue-50/50 p-3 rounded-lg text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  <FaLinkedin className="w-4 h-4 text-[#0A66C2] fill-current" />
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={() => executeSocialShare("twitter")}
                  className="flex items-center justify-center gap-2 border border-gray-200 hover:border-slate-900 bg-white hover:bg-slate-50 p-3 rounded-lg text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  <FaSquareXTwitter className="w-4 h-4 text-[#1DA1F2] fill-current" />
                  X / Twitter
                </button>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setActiveShareMilestone(null)}
            className="w-full text-xs font-sans"
          >
            Dismiss Panel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
