"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import type { DashboardAISuggestion } from "@/features/dashboard/types/dashboard.types";

interface SuggestionWidgetProps {
  suggestions: DashboardAISuggestion[];
}

function getSuggestionLink(
  suggestion: DashboardAISuggestion
): string {
  if (suggestion.action_url) {
    return suggestion.action_url;
  }

  switch (suggestion.type) {
    case "housing":
      return "/housing";

    case "roommate":
      return "/roommates";

    case "expense":
      return "/expenses";

    case "budget":
      return "/budget-advisor";

    case "locality":
      return "/locality";

    case "safety":
      return "/scam-check";

    case "transport":
      return "/transport";

    default:
      return "/ai";
  }
}

export default function SuggestionWidget({
  suggestions,
}: SuggestionWidgetProps) {
  const visibleSuggestions = suggestions.slice(0, 3);

  return (
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#D4A34F]/10 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#205C46]/25 blur-[75px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              AI assistant
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Personalized suggestions
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Smart recommendations based on your relocation activity.
            </p>
          </div>
        </div>

        <Link
          href="/suggestions"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {visibleSuggestions.length > 0 ? (
          <div className="space-y-3">
            {visibleSuggestions.map((suggestion, index) => {
              const isGold = index % 2 === 0;

              return (
                <Link
                  key={suggestion.id}
                  href={getSuggestionLink(suggestion)}
                  className="group block rounded-[16px] border border-white/[0.06] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#D4A34F]/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={
                        isGold
                          ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]"
                          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]"
                      }
                    >
                      <Lightbulb className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 text-sm font-bold text-white">
                        {suggestion.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/35">
                        {suggestion.description}
                      </p>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/25 transition group-hover:border-[#D4A34F]/20 group-hover:text-[#F0C86A]">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
              <Bot className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              AI insights
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              No suggestions yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/38">
              Use शहरSaathi features to receive personalized relocation
              recommendations.
            </p>

            <Link
              href="/ai"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
            >
              Ask शहरSaathi AI

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {visibleSuggestions.length > 0 && (
          <div className="mt-auto pt-5">
            <Link
              href="/ai"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
            >
              Open AI assistant

              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}