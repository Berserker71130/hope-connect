"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";

// UI PRIMITIVES IMPORT LINKAGE
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// SEED ENGINE DATA STRUCTURE LINKAGE
// Imported directly from dummy-data mapping file
import {
  dummyOpportunities,
  dummyVolunteers,
  dummyLoggedHours,
  LoggedHourEntry,
} from "@/lib/dummy-data";
import {
  Award,
  CheckCircle,
  Clock,
  FileDown,
  FolderSync,
  ImageIcon,
  PlusCircle,
  TrendingUp,
  SlidersHorizontal,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
} from "lucide-react";

// CLIENT STATE LAYER CONTROL (ZUSTAND PATTERN MATCH)
// Establish an active, reactive runtime store layer inside the client controller context
interface VolunteerHoursState {
  entries: LoggedHourEntry[];
  addEntry: (entry: Omit<LoggedHourEntry, "id" | "status">) => void;
  getLifetimeHours: () => number;
}

const useVolunteerHoursStore = (() => {
  // A clean standard React state hook encapsulation mimicking custom Zustand actions natively
  return () => {
    const [entries, setEntries] = React.useState<LoggedHourEntry[]>(() => {
      return [...dummyLoggedHours];
    });

    const addEntry = React.useCallback(
      (newEntry: Omit<LoggedHourEntry, "id" | "status">) => {
        setEntries((prev) => [
          {
            ...newEntry,
            id: `log-${Date.now()}`,
            status: "Pending", //Default acceptance posture as per standard compliance tracking
          },
          ...prev,
        ]);
      },
      [],
    );

    const getLifetimeHours = React.useCallback(() => {
      // Calculate approved hours + pending hours to drive global metric displays dynamically
      const approvedCount = entries
        .filter((e) => e.status === "Approved")
        .reduce((sum, entry) => sum + entry.hours, 0);

      // Seed profile base hours represents base legacy history tracking loops
      const baseLegacyHours = dummyVolunteers[0]?.hoursTracked || 0;
      return baseLegacyHours + approvedCount;
    }, [entries]);

    return { entries, addEntry, getLifetimeHours };
  };
})();

// FORM INTEGRATION TYPE DEFINITIONS
interface LogHoursFormInput {
  date: string;
  opportunityId: string;
  hours: number;
  description: string;
  supervisorName?: string;
  photoEvidence?: FileList;
}

export default function VolunteerHoursPage() {
  const { entries, addEntry, getLifetimeHours } = useVolunteerHoursStore();
  const [isExporting, setIsExporting] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState(false);

  // COMPREHENSIVE FILTER SYSTEM STATES
  const [filterOpportunity, setFilterOpportunity] =
    React.useState<string>("all");
  const [filterStartDate, setFilterStartDate] = React.useState<string>("");
  const [filterEndDate, setFilterEndDate] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Build high-fidelity dropdown values mapping directly from active opportunity indices
  const opportunityOptions = React.useMemo(() => {
    return dummyOpportunities.map((opp) => ({
      value: opp.id,
      label: opp.title,
    }));
  }, []);

  const selectFilterOptions = React.useMemo(() => {
    return [
      { value: "all", label: "All Opportunities" },
      ...opportunityOptions,
    ];
  }, [opportunityOptions]);

  // FORM VALIDATION DEPLOYMENT HUB
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LogHoursFormInput>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0], //Intrinsic fallback to current local standard calendar date
      opportunityId: "",
      hours: undefined,
      description: "",
      supervisorName: "",
    },
  });

  // FILTER EXECUTION PIPELINE
  const filteredEntries = React.useMemo(() => {
    return entries.filter((entry) => {
      // 1. Opportunity select filter routing
      if (
        filterOpportunity !== "all" &&
        entry.opportunityId !== filterOpportunity
      ) {
        return false;
      }
      // 2. Chronological start-point bounding box test
      if (filterStartDate && entry.date < filterStartDate) {
        return false;
      }
      // 3. Chronological end point bounding box test
      if (filterEndDate && entry.date > filterEndDate) {
        return false;
      }
      // 4. Text query look ahead scan across dynamic fields
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesOpportunity = entry.opportunityTitle
          .toLowerCase()
          .includes(query);
        const matchesDescription = entry.description
          .toLowerCase()
          .includes(query);
        const matchesSupervisor =
          entry.supervisorName?.toLowerCase().includes(query) || false;
        if (!matchesOpportunity && !matchesDescription && !matchesSupervisor) {
          return false;
        }
      }
      return true;
    });
  }, [entries, filterOpportunity, filterStartDate, filterEndDate, searchQuery]);

  // SUBMISSION RECEPTABLE EXECUTOR
  const onFormSubmit = async (data: LogHoursFormInput) => {
    // Find matching title mapping pattern strings to append flat into structural storage matrices
    const targetOpp = dummyOpportunities.find(
      (o) => o.id === data.opportunityId,
    );
    const opportunityTitle = targetOpp
      ? targetOpp.title
      : "Special Custom Initiative Event";

    // Handle fake file persistence encoding layer mapping for mock data logs
    let photoEvidenceUrl = undefined;
    if (data.photoEvidence && data.photoEvidence.length > 0) {
      photoEvidenceUrl = `/images/evidence/${data.photoEvidence[0].name}`;
    }

    // Execute save operation straight into state layout
    addEntry({
      volunteerId: dummyVolunteers[0]?.id || "vol-user-01",
      date: data.date,
      opportunityId: data.opportunityId,
      opportunityTitle,
      hours: Number(data.hours),
      description: data.description,
      supervisorName: data.supervisorName || undefined,
      photoEvidenceUrl,
    });

    setFormSuccess(true);
    reset({
      date: new Date().toISOString().split("T")[0],
      opportunityId: "",
      hours: undefined,
      description: "",
      supervisorName: "",
    });

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // PROGRAMMATIC RESUME-GRADE CLIENT PDF COMPILATION ENGINE
  const handleExportPDF = async () => {
    setIsExporting(true);

    // Smooth operational timeout simulation to visually execute processing threads
    setTimeout(() => {
      try {
        const volunteerName = dummyVolunteers[0]?.name || "Active  Volunteer";
        const totalHoursCalculated = getLifetimeHours();

        // Establish programmatic document data compilation parameters
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
          alert(
            "Pop-up blocker detected. Please enable pop-ups to download your verified hours ledger.",
          );
          return;
        }

        // Construct complete high-fidelity system design print document programmatically
        let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Verified Service Hours Log - ${volunteerName}</title>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body{
        font-family:'Inter', sans-serif;
        color:#0f172a;
        margin:0;
        padding:40px;
        line-height:1.5;
        }
        .header{
        border-bottom:2px solid #e2e8f0;
        padding-bottom:24px;
        margin-bottom:32px;
        display:flex;
        justify-content:space-between;
        align-items:flex-end
        }
        .org-title{
        font-size:24px
        font-weight:700
        color:#2563eb;
        text-transform:uppercase;
        letter-spacing:0.5px;
        margin:0 0 4px 0
        }
        .doc-title{
        font-size:14px;
        font-weight:500
        color:#64748b
        margin:0
        }
        .meta-grid{
        display:grid
        grid-template-columns:repeat(2, 1fr)
        gap-24px
        margin-bottom:40px
        background-color:#f8fafc
        padding:20px
        border-radius:8px
        border:1px solid #f1f5f9
        }
        .meta-item label{
        display:block
        font-size:11px
        text-transform:uppercase
        font-weight-600
        color:#64748b
        letter-spacing: 0.5px
        margin-bottom:4px
        }
        .meta-item value{
        display:block
        font-size:16px
        font-weight:600
        color:#0f172a
        }
        .total-badge{
        background-color:#dbeafe
        color:#1e40af
        padding:12px 20px
        border-radius:6px
        display:inline-block
        margin-top:8px
        }
        .total-badge label{
        font-size:11px
        text-transform:uppercase
        font-weight:600
        display-block
        margin-bottom:2px
        }
        .total-badge value{
        font-size:24px
        font-weight:700
        }
        table{
        width:100%
        border-collapse:collapse
        margin-bottom:40px
        }
        th{
        background-color:#0f172a
        color:#ffffff
        font-size:12px
        font-weight:600
        text-transform:uppercase
        text-align:left
        padding:12px
        letter-spacing:0.5px
        }
        td{
        padding:14px 12px
        font-size:13px
        border-bottom:1px solid #e2e8f0
        color:#334155
        }
        tr:nth-child(even) td{
        background-color: #fafafa
        }
        .status-approved{
        color:#15803d
        font-weight:600
        }
        .status-pending{
        color:#b45309
        font-weight:600
        }
        .footer-note{
        margin-top:60px
        border-top:1px solid #e2e8f0
        padding-top:20px
        font-size:11px
        color:#94a3b8
        text-align:center
        }
        @media print{
        body{padding:0}
        button{display:none}}
        </style>
        </head>
        <body>
        <div>
        <h1 class='org-title'>HOPE CONNECT NETWORK</h1>
        <p class='doc-title'>Official Volunteer Service Ledger & Hour Verification Transcript</p>
        </div>
        <div style='text-align:right;'>
        <p style='font-size:12px; color:#64748b; margin: 0;'>Generated on: ${new Date().toLocaleDateString()}</p>
        <p style='font-size:12px; color:#64748b; margin:4px 0 0 0;'>Document Ref: HC-VOL-${Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        </div>
        
        <div class='meta-grid'>
        <div>
        <div class='meta-item'>
        <label>Volunteer Personnel Name</label>
        <value>${volunteerName}</value>
        </div>
        <div class='meta-item' style='margin-top:16px;'>
        <label>Associated Identity Routing</label>
        <value>${dummyVolunteers[0]?.email || "marcus.v@hopeconnect.org"}</value>
        </div>
        </div>
        <div style='display:flex; justify-content:flex-end; align-items:center;'>
        <div class='total-badge'>
        <label>Total Certified Lifetime Hours</label>
        <value>${totalHoursCalculated} Hours</value>
        </div>
        </div>
        </div>
        
        <h3 style='font-size: 16px; font-weight:600; margin-bottom: 16px; border-bottom:1px solid #cbd5e1; padding-bottom:6px;'>Logged Engagement Records</h3>
         <table>
          <thead>
            <tr>
              <th style='width: 12%;'>Date</th>
              <th style='width: 35%;'>Opportunity / Event Title</th>
              <th style='width: 35%;'>Description of Service Rendered</th>
              <th style='width: 8%;'>Hours</th>
              <th style='width: 10%;'>Status</th>
            </tr>
          </thead>
          <tbody>
          ${filteredEntries
            .map(
              (entry) => `
            <tr>
            <td>${entry.date}</td>
            <td style='font-weight:500; color:#0f172a;'>${entry.opportunityTitle}</td>
            <td>${entry.description}</td>
            <td style='font-weight:600;'>${entry.hours}</td>
            <td class='${entry.status === "Approved" ? "status-approved" : "status-pending"}'>${entry.status}</td>
            </tr>
            `,
            )
            .join("")}
            </tbody>
        </table>
        
        <div class='footer-note'>
        <p>This document constitutes an official ledger generated securely by the HopeConnect Volunteer Portal subsystem. All approved tracking hours correspond directly with parameters verified by assigned municipal coordinators and system operations personnel. Suitable for professional documentation, structural resumes, or institutional community service credits matching standard tracking arrays.</p>
        </div>
        
        <script>
        window.onload=function(){
        window.print();
        // Avoid leaving blank detached tabs hanging around afterwards
         setTimeout(function(){window.close();}, 500);
         };
         </script>
         </body>
        </html>
        `;

        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
      } catch (err) {
        console.error(
          "PDF generation compilation interrupt tracking error: ",
          err,
        );
      } finally {
        setIsExporting(false);
      }
    }, 1200);
  };

  const handleResetFilters = () => {
    setFilterOpportunity("all");
    setFilterStartDate("");
    setFilterEndDate("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background-soft/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER DASHBOARD ANCHOR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-text-light/10 pb-6">
          <div>
            <h1 className="text-h1 font-black text-text-primary tracking-tight font-sans">
              Service Tracking Ledger
            </h1>
            <p className="text-body text-text-muted mt-1 font-body">
              Log current operational service contributions, access legacy
              certified logs, and export validated transcripts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              leftIcon={<FileDown className="w-4 h-4" />}
              isLoading={isExporting}
              onClick={handleExportPDF}
              className="font-medium"
            >
              Export verified log (PDF)
            </Button>
          </div>
        </div>

        {/* PREMIUM DYNAMIC METRIC PACK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            variant="default"
            padding="md"
            accentBar="blue"
            className="bg-gradient-to-br from-background-default to-blue-50/20 shadow-sm"
          >
            <CardContent className="flex items-center gap-4 p-0">
              <div className="p-3.5 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-small font-bold tracking-wider text-text-muted uppercase">
                  Lifetime Verified Hours
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-h1 font-black text-text-primary font-sans">
                    {getLifetimeHours()}
                  </span>
                  <span className="text-small fot-medium text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Dynamic
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            variant="default"
            padding="md"
            accentBar="green"
            className="bg-gradient-to-br from-background-default to-emerald-50/20 shadow-sm"
          >
            <CardContent className="flex items-center gap-4 p-0">
              <div className="p-3.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-small font-bold tracking-wider text-text-muted uppercase">
                  Pending Verification
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-h1 font-black text-text-primary font-sans">
                    {entries
                      .filter((e) => e.status === "Pending")
                      .reduce((sum, e) => sum + e.hours, 0)}
                  </span>
                  <span className="text-body font-medium text-text-muted">
                    hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="md" className="shadow-sm">
            <CardContent className="flex items-center gap-4 p-0">
              <div className="p-3.5 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                <FolderSync className="w-6 h-6" />
              </div>
              <div>
                <p className="text-small font-bold tracking-wider text-text-muted uppercase">
                  Current Filter Count
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-h1 font-black text-text-primary font-sans">
                    {filteredEntries.length}
                  </span>
                  <span className="text-body font-medium text-text-muted">
                    records rendered
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAIN SPLIT DASHBOARD GRID CONTROLLER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANELS COLUMN:TRACKING ENGAGEMENT SUBMISSION FORM */}
          <div className="lg:col-span-5 space-y-6">
            <Card
              variant="default"
              padding="lg"
              className="shadow-md border border-text-light/10 relative"
            >
              <div className="absolute top-0 right-0 left-0 h-[4px] bg-primary" />

              <CardHeader className="px-0 pt-2">
                <div className="flex items-center gap-2 text-primary font-bold text-body">
                  <PlusCircle className="w-5 h-5" />
                  <span>Log Service Activity</span>
                </div>
                <p className="text-small text-text-muted">
                  Input required operational specifications below to queue
                  records for system verification checks.
                </p>
              </CardHeader>

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-5 mt-4"
              >
                {/* 1. Opportunity Dropdown Match System */}
                <Controller
                  name="opportunityId"
                  control={control}
                  rules={{
                    required:
                      "You must specify a matching registered opportunity event",
                  }}
                  render={({ field }) => (
                    <Select
                      label="Opportunity / Engagement Event"
                      required
                      placeholder="Choose active opportunity..."
                      options={opportunityOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.opportunityId?.message}
                      isSuccess={!!field.value && !errors.opportunityId}
                    />
                  )}
                />
                {/* 2. Double row grid layout for date picker and hour inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Date of Service"
                    required
                    error={errors.date?.message}
                    isSuccess={!errors.date}
                    {...register("date", {
                      required: "Date specification parameter is required",
                    })}
                  />

                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    label="Hours Completed"
                    placeholder="e.g. 4.5"
                    required
                    error={errors.hours?.message}
                    isSuccess={!errors.hours}
                    {...register("hours", {
                      required: "Completed hour tally parameter is required",
                      min: {
                        value: 0.5,
                        message: "Minimum valid track is 0.5 hours",
                      },
                      max: {
                        value: 24,
                        message: "Input caps at a maximum of 24 hours per file",
                      },
                    })}
                  />
                </div>

                {/* 3. Description Service Textarea */}
                <Textarea
                  label="Detailed Description of Service Rendered"
                  placeholder="Elaborate on tasks executed, milestones completed, or logistics handled..."
                  required
                  error={errors.description?.message}
                  isSuccess={!errors.description}
                  rows={4}
                  {...register("description", {
                    required:
                      "A granular breakdown of service rendered is required",
                    minLength: {
                      value: 10,
                      message:
                        "Please elaborate slightly more (minimum 10 characters)",
                    },
                  })}
                />

                {/* 4. Optional Fields Matrix Frame */}
                <div className="border-t border-text-light/10 pt-4 space-y-4">
                  <p className="text-small font-bold text-text-primary uppercase tracking-wide">
                    Verification Support Logs (Optional)
                  </p>

                  <Input
                    type="text"
                    label="Supervisor / Reference Name"
                    placeholder="e.g. Marcus Miller"
                    error={errors.supervisorName?.message}
                    {...register("supervisorName")}
                  />

                  <div className="w-full flex flex-col items-start space-y-2">
                    <label className="text-small font-bold text-text-primary flex items-center gap-1">
                      Photo Evidence Attachment
                    </label>
                    <div className="relative w-full border border-dashed border-text-light/30 rounded-lg p-4 bg-background-soft/20 hover:bg-background-soft/50 transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        {...register("photoEvidence")}
                      />
                      <ImageIcon className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
                      <span className="text-small font-semibold text-text-primary">
                        Click to upload file image
                      </span>
                      <span className="text-mini text-text-muted">
                        PNG, JPG, or WEBp formats accepted (Max 5MB)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Trigger Node Controls */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2 font-bold tracking-wide"
                  isLoading={isSubmitting}
                >
                  Submit Hours to Ledger
                </Button>

                {/* Success Banner Popup Messaging */}
                {formSuccess && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 animate-in fade-in-50 duration-200">
                    <CheckCircle className="w-5 h-5 shrink-0 text emerald-600" />
                    <p className="text-small font-medium">
                      Activity record filed securely! Logplaced in verification
                      queue buffer loops.
                    </p>
                  </div>
                )}
              </form>
            </Card>
          </div>

          {/* RIGHT PANELS COLUMN: ADVANCED INTERACTIVE HISTORY TRANSCRIPT MATRIX */}
          <div className="lg:col-span-7 space-y-6">
            <Card
              variant="default"
              padding="none"
              className="shadow-md border border-text-light/10 overflow-hidden"
            >
              {/* Dynamic Action Filter Bar Header Panel */}
              <div className="p-5 border-b border-text-light/10 bg-background-default space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-text-primary text-body">
                    <SlidersHorizontal className="w-4 h-4 text-text-muted" />
                    <span>Historical Archive Audit Ledger</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-small font-semibold text-primary hover:text-trust transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Clear filters
                  </button>
                </div>

                {/* Granular Filtering Control Interface Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-6 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted z-10">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search description, coordinator data..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-11 pl-9 pr-3.5 bg-background-soft/40 text-small text-text-primary rounded-lg border border-text-light/20 outline-none focus:border-blue-500 focus:bg-background-default focus:ring-4 focus:ring-blue-500/10 transition-all font-body"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <select
                      value={filterOpportunity}
                      onChange={(e) => setFilterOpportunity(e.target.value)}
                      className="w-full h-11 px-3 bg-background-soft/40 text-small text-text-primary rounded-lg border border-text-light/20 outline-none focus:border-blue-500 focus:bg-background-default focus:ring-4 focus:ring-blue-500/10 transition-all font-body cursor-pointer"
                    >
                      {selectFilterOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-mini font-bold text-text-muted uppercase w-12 shrink-0">
                      From
                    </span>
                    <input
                      type="date"
                      value={filterStartDate}
                      onChange={(e) => setFilterStartDate(e.target.value)}
                      className="w-full h-10 px-3 bg-background-soft/30 text-small text-text-primary rounded-md border border-text-light/20 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-mini font-bold text-text-muted uppercase w-12 shrink-0">
                      Until
                    </span>
                    <input
                      type="date"
                      value={filterEndDate}
                      onChange={(e) => setFilterEndDate(e.target.value)}
                      className="w-full h-10 px-3 bg-background-soft/30 text-small text-text-primary rounded-md border border-text-light/20 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Matrix Layout Output Body Node Container */}
              <div className="overflow-x-auto w-full">
                {filteredEntries.length === 0 ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center space-y-3 bg-background-soft/10">
                    <div className="p-4 bg-background-default border border-text-light/10 rounded-full text-text-muted shadow-sm">
                      <Filter className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-body font-bold text-text-primary">
                        No Matching Records Found
                      </h3>
                      <p className="text-small text-text-muted max-w-sm mt-0.5">
                        Adjust active range parameters or insert additional
                        submission records to build structural data logs.
                      </p>
                    </div>
                  </div>
                ) : (
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-text-light/10 bg-background-soft/40">
                        <th className="p-4 text-mini font-black text-text-primary uppercase tracking-wider font-sans">
                          Timeline Date
                        </th>
                        <th className="p-4 text-mini font-black text-text-primary uppercase tracking-wider font-sans">
                          Associated Opportunity
                        </th>
                        <th className="p-4 text-mini font-black text-text-primary uppercase tracking-wider font-sans">
                          Service Summary
                        </th>
                        <th className="p-4 text-mini font-black text-text-primary uppercase tracking-wider font-sans text-center">
                          Hours
                        </th>
                        <th className="p-4 text-mini font-black text-text-primary uppercase tracking-wider font-sans text-right">
                          Status State
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-text-light/5">
                      {filteredEntries.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-background-soft/30 transition-colors group duration-150"
                        >
                          <td className="p-4 whitespace-nowrap text-small font-medium text-text-muted">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-text-muted opacity-60" />
                              <span>{entry.date}</span>
                            </div>
                          </td>
                          <td className="p-4 max-w-[200px]">
                            <div className="text-small font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                              {entry.opportunityTitle}
                            </div>
                            {entry.supervisorName && (
                              <div className="text-mini text-text-muted mt-0.5 flex items-center gap-1">
                                <User className="w-3 h-3" /> Ref:{" "}
                                {entry.supervisorName}
                              </div>
                            )}
                          </td>
                          <td className="p-4 max-w-[240px]">
                            <div className="text-small text-text-muted font-body line-clamp-2 leading-relaxed">
                              {entry.description}
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap text-center text-small font-black font-sans text-text-primary">
                            {entry.hours}
                          </td>
                          <td className="p-4 whitespace-nowrap text-right">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-mini font-bold font-sans tracking-wide uppercase border ${
                                entry.status === "Approved"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                                  : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${entry.status === "Approved" ? "bg-emerald-500" : "bg-amber-500"}`}
                              />
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Table Footer Tracking Totals Information Matrix */}
              <div className="p-4 bg-background-soft/20 border-t border-text-light/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-mini font-medium text-text-muted">
                <div className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-text-muted" />
                  <span>
                    Showing {filteredEntries.length} of {entries.length} indexed
                    ledger entries
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    Approved Total:{" "}
                    <strong className="text-text-primary font-bold font-sans">
                      {entries
                        .filter((e) => e.status === "Approved")
                        .reduce((sum, e) => sum + e.hours, 0)}{" "}
                      hrs
                    </strong>
                  </span>
                  <span>
                    Pending Total:{" "}
                    <strong className="text-text-primary font-bold font-sans">
                      {entries
                        .filter((e) => e.status === "Pending")
                        .reduce((sum, e) => sum + e.hours, 0)}{" "}
                      hrs
                    </strong>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
