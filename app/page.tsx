"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";

export default function ModalVerificationSandbox() {
  // Separate modal display state switches
  const [activeModal, setActiveModal] = useState<
    "sm" | "md" | "lg" | "xl" | null
  >(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-16 w-full font-sans">
      <div className="w-full space-y-8 max-w-4xl mx-auto">
        {/* Header Block Metadata */}
        <div className="border-b border-gray-200 pb-5 w-full">
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verification Sandbox — Issue UI-06 (#7)
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-3">
            Modal Dialog System
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Testing focus traps, escape key dismissal, light backdrop masks, and
            slide-up mobile transitions.
          </p>
        </div>

        {/* Action Testing Array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <button
            onClick={() => setActiveModal("sm")}
            className="h-12 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
          >
            Open Small Modal (400px)
          </button>

          <button
            onClick={() => setActiveModal("md")}
            className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
          >
            Open Medium Modal (600px)
          </button>

          <button
            onClick={() => setActiveModal("lg")}
            className="h-12 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
          >
            Open Large Modal (800px)
          </button>

          <button
            onClick={() => setActiveModal("xl")}
            className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
          >
            Open Extra Large (1000px)
          </button>
        </div>

        {/* ========================================================= */}
        {/* 1. SMALL MODAL: TRANSACTION CONFIRMATIONS                 */}
        {/* ========================================================= */}
        <Modal isOpen={activeModal === "sm"} onClose={closeModal} size="sm">
          <ModalHeader
            title="Confirm Action"
            description="Are you absolutely sure you want to log out of your system workspace profile?"
          />
          <ModalBody>
            Logging out will interrupt any active async background processing
            workflows and draft NGO database queries currently staged in local
            memory buffers.
          </ModalBody>
          <ModalFooter>
            <button
              onClick={closeModal}
              className="h-10 px-4 border border-gray-200 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Logged out.");
                closeModal();
              }}
              className="h-10 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Confirm Logout
            </button>
          </ModalFooter>
        </Modal>

        {/* ========================================================= */}
        {/* 2. MEDIUM MODAL: CELEBRATORY DONATION FORM                */}
        {/* ========================================================= */}
        <Modal isOpen={activeModal === "md"} onClose={closeModal} size="md">
          <ModalHeader
            title="Make a Secure Donation 🎉"
            description="Your direct contribution helps fund medical distributions and critical clean water supply networks."
          />
          <ModalBody>
            <div className="space-y-4 py-2">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Selected Mission Fund
                  </p>
                  <p className="text-md font-extrabold text-emerald-950 mt-0.5">
                    Clean Water Infrastructure Initiative
                  </p>
                </div>
                <span className="text-xl font-black text-emerald-600">
                  $150
                </span>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 block">
                  Dummy Payment Information Input
                </label>
                <input
                  type="text"
                  placeholder="4111 •••• •••• 1111"
                  className="w-full h-11 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={closeModal}
              className="h-10 px-4 border border-gray-200 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Donation Sent!");
                closeModal();
              }}
              className="h-10 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              Process Secure Donation
            </button>
          </ModalFooter>
        </Modal>

        {/* ========================================================= */}
        {/* 3. LARGE MODAL: VOLUNTEER REGISTRATION SHEET              */}
        {/* ========================================================= */}
        <Modal isOpen={activeModal === "lg"} onClose={closeModal} size="lg">
          <ModalHeader
            title="Volunteer Deployment Enrollment"
            description="Please complete your regional availability configuration parameters below."
          />
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full h-11 px-3 border border-gray-200 rounded-lg bg-gray-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full h-11 px-3 border border-gray-200 rounded-lg bg-gray-50/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-700 block">
                  Deployment Area Statement of Purpose
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you want to join this initiative..."
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={closeModal}
              className="h-10 px-4 border border-gray-200 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                alert("Registered!");
                closeModal();
              }}
              className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              Submit Registration
            </button>
          </ModalFooter>
        </Modal>

        {/* ========================================================= */}
        {/* 4. EXTRA LARGE MODAL: COMPREHENSIVE TERMS ARCHIVE          */}
        {/* ========================================================= */}
        <Modal isOpen={activeModal === "xl"} onClose={closeModal} size="xl">
          <ModalHeader
            title="Global Compliance Ledger & Operational Framework Agreements"
            description="Last Updated: June 2026. Please read this multi-layered framework policy thoroughly."
          />
          <ModalBody>
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">
                1. Core Allocation Transparency Transparency
              </h4>
              <p>
                Every dollar assigned to our NGO pipeline registers directly
                onto an open ledger. Over 94% of gross transactional volume
                flows straight into active equipment purchasing, regional
                logistical transport, and immediate personnel field deployment
                infrastructure.
              </p>
              <h4 className="font-bold text-gray-900">
                2. Data Sovereignty & Contributor Privacy Protection
              </h4>
              <p>
                We do not store plain-text payment parameters or sell identity
                logs to secondary marketing corporations. All secure connections
                route exclusively through TLS 1.3 pipelines directly to our
                corporate banking providers.
              </p>
              <p>
                By executing any action button sequences within this digital
                workspace ecosystem, you confirm absolute compliance with
                international philanthropic governance guidelines and domestic
                revenue collection rules.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={closeModal}
              className="w-full sm:w-auto h-10 px-6 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              I Accept the Terms & Conditions
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
