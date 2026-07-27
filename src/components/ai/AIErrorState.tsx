"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface AIErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retrying?: boolean;
}

export default function AIErrorState({
  title = "Unable to generate AI insights",
  message = "Something went wrong while processing your request. Please try again.",
  onRetry,
  retrying = false,
}: AIErrorStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-red-200 bg-red-50/50 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
        {message}
      </p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#58751d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              retrying ? "animate-spin" : ""
            }`}
          />

          {retrying ? "Trying again..." : "Try again"}
        </button>
      ) : null}
    </div>
  );
}