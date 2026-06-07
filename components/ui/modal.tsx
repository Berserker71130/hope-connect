"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

interface ModalHeaderProps {
  title: string;
  description?: string;
}

// 1. Core Modal Parent Wrapper Component
export const Modal = ({
  isOpen,
  onClose,
  size = "md",
  children,
}: ModalProps) => {
  // Mapping strict size tokens for desktop views
  const sizeClasses = {
    sm: "md:max-w-[400px]",
    md: "md:max-w-[600px]",
    lg: "md:max-w-[800px]",
    xl: "md:max-w-[1000px]",
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop: Semi-transparent dark overlay(not too heavy, professional blur) */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 pointer-events-auto"
              />
            </DialogPrimitive.Overlay>

            {/* Content Position Container */}
            <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-0 md:p-4 pointer-events-none">
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: window.innerWidth >= 768 ? 0.95 : 1,
                    y: window.innerWidth >= 768 ? 0 : "100%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: window.innerWidth >= 768 ? 0.955 : 1,
                    y: window.innerWidth >= 768 ? 0 : "100%",
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} //Gentle, non-bouncy easing curve
                  className={`
                    w-full bg-white shadow-xl pointer-events-auto overflow-hidden relative flex flex-col
                    ${sizeClasses[size]}
                    h-[92vh] md:h-auto rounded-t-2xl md:rounded-xl border border-gray-100`}
                >
                  {children}

                  {/* Close button: Subtle gray X icon in top-right */}
                  <DialogPrimitive.Close asChild>
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      aria-label="Close dialog"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </DialogPrimitive.Close>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};

// 2 Composable Header Block
export const ModalHeader = ({ title, description }: ModalHeaderProps) => {
  return (
    <div className="px-6 pt-6 pb-4 border-b border-gray-50">
      <DialogPrimitive.Title className="text-xl font-bold text-gray-900 tracking-tight">
        {title}
      </DialogPrimitive.Title>
      {description && (
        <DialogPrimitive.Description className="text-sm text-gray-500 mt-1.5 leading-normal">
          {description}
        </DialogPrimitive.Description>
      )}
    </div>
  );
};

// 3. Composable Body Block (Scrollable if content oveflows)
export const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 py-4 flex-1 overflow-y-auto min-h-[200px] text-sm text-gray-600 leading-relaxed">
      {children}
    </div>
  );
};

// 4. Composable Footer Block (Action control containment)
export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
      {children}
    </div>
  );
};
