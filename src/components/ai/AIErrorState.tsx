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
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/30 bg-red-500/10 text-red-400">
          <AlertTriangle className="h-9 w-9" />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
          AI Assistant
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
          {title}
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[#B8C5BF]">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={retrying}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#071512] transition hover:bg-[#E4B861] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                retrying ? "animate-spin" : ""
              }`}
            />

            {retrying ? "Trying again..." : "Try Again"}
          </button>
        )}
      </div>
    </section>
  );
}