"use client";

import * as React from "react";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
      }}
      toastOptions={{
        // Default duration set strictly to 5 seconds (5000ms)
        duration: 5000,
      }}
    />
  );
}
