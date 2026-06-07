"use client";

import React from "react";
import { ToastProvider } from "@/components/ui/toast-provider";
import { toast } from "@/components/ui/toast";

export default function ToastVerificationSandbox() {
  // Custom Action Callback Simulation
  const handleViewReceipt = () => {
    alert("System Route Action: Opening Transaction Receipt Ledger.");
  };

  const handleUndoAction = () => {
    alert("System Route Action: Form Submission Rolling Back.");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-16 w-full font-sans">
      {/* Toast Engine Global Mount Mount */}
      <ToastProvider />

      <div className="w-full space-y-8 max-w-4xl mx-auto">
        {/* Header Block Metadata */}
        <div className="border-b border-gray-200 pb-5 w-full">
          <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verification Sandbox — Issue UI-05 (#6)
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-3">
            Toast Notification System
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Testing entry animations, professional left-border colors, custom
            actions, and automatic 5s dimming.
          </p>
        </div>

        {/* Dashboard Auditing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* SUCCESS ROW */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">
                Celebratory Success Notifications
              </h3>
              <p className="text-xs text-gray-400">
                Triggered on successful donations and processed transactions.
              </p>
            </div>
            <button
              onClick={() =>
                toast.success(
                  "Donation Processed! 🎉",
                  "Thank you so much! Your contribution of $150.00 has safely cleared corporate processing layers.",
                  { label: "View Receipt", onClick: handleViewReceipt },
                )
              }
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
            >
              Fire Donation Success Toast
            </button>
          </div>

          {/* ERROR ROW */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">
                Helpful Error Controls
              </h3>
              <p className="text-xs text-gray-400">
                Non-scary messages focusing cleanly on explicit solutions.
              </p>
            </div>
            <button
              onClick={() =>
                toast.error(
                  "Transaction Interrupted",
                  "The payment processing secure pipeline timed out. Please verify your banking connection and try again.",
                )
              }
              className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
            >
              Fire Network Error Toast
            </button>
          </div>

          {/* INFO ROW */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">
                Informational Sync Notifications
              </h3>
              <p className="text-xs text-gray-400">
                Used for async actions like volunteer role distribution updates.
              </p>
            </div>
            <button
              onClick={() =>
                toast.info(
                  "Volunteer Sync Complete",
                  "Your user credentials have been mapped successfully to the upcoming Regional Summit event list.",
                  { label: "Undo Update", onClick: handleUndoAction },
                )
              }
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
            >
              Fire Volunteer Info Toast
            </button>
          </div>

          {/* WARNING ROW */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">
                Proactive System Warnings
              </h3>
              <p className="text-xs text-gray-400">
                Alerts users to impending thresholds or configuration
                dependencies.
              </p>
            </div>
            <button
              onClick={() =>
                toast.warning(
                  "Session Expiry Warning",
                  "Your active secure session will auto-terminate in 2 minutes due to compliance timeout rules.",
                )
              }
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
            >
              Fire System Warning Toast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
