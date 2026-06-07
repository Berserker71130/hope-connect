"use client";

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import * as React from "react";
import { toast as hotToast, Toast as HotToastProps } from "react-hot-toast";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface CustomToastProps {
  t: HotToastProps;
  type: ToastType;
  title: string;
  message: string;
  action?: ToastAction;
}

// 1. The Core UI Renderer Component
export const ToastNotification: React.FC<CustomToastProps> = ({
  t,
  type,
  title,
  message,
  action,
}) => {
  // Mapping out strict style tokens for left borders
  const borderStyles = {
    success: "border-l-4 border-emerald-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
    warning: "border-l-4 border-orange-500",
  };

  //   Mapping corresponding icons with perfect professional coloring
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-red-500 shrink-0" />,
    info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />,
  };

  return (
    <div
      className={`
    ${borderStyles[type]}
    ${t.visible ? "animate-in fade-in slide-in-from-top-4 duration-300" : "animate-out fade-out slide-out-to-top-2 duration-200"}
    max-w-md w-full bg-white shadow-lg rounded-r-xl pointer-events-auto flex ring-1 ring-black/5 overflow-hidden`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-1 p-4">
        <div className="flex items-start space-x-3">
          {/* Render Dynamic Icon Variant */}
          <div className="pt-0.5">{icons[type]}</div>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold text-gray-900 leading-none">
              {title}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">{message}</p>

            {/* Conditional Action Button Support */}
            {action && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    action.onClick();
                    hotToast.dismiss(t.id);
                  }}
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Persistent Manual Dismiss Cross Trigger */}
      <div className="flex border-l border-gray-100">
        <button
          type="button"
          onClick={() => hotToast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center ext-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// 2. Main Functional Export Triggers to call throughout the codebase
export const toast = {
  success: (title: string, message: string, action?: ToastAction) =>
    hotToast.custom((t) => (
      <ToastNotification
        t={t}
        type="success"
        title={title}
        message={message}
        action={action}
      />
    )),

  error: (title: string, message: string, action?: ToastAction) =>
    hotToast.custom((t) => (
      <ToastNotification
        t={t}
        type="error"
        title={title}
        message={message}
        action={action}
      />
    )),

  info: (title: string, message: string, action?: ToastAction) =>
    hotToast.custom((t) => (
      <ToastNotification
        t={t}
        type="info"
        title={title}
        message={message}
        action={action}
      />
    )),

  warning: (title: string, message: string, action?: ToastAction) =>
    hotToast.custom((t) => (
      <ToastNotification
        t={t}
        type="warning"
        title={title}
        message={message}
        action={action}
      />
    )),

  dismiss: (toastId?: string) => hotToast.dismiss(toastId),
};
