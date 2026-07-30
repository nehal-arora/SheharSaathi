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
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#ECEDE7] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">
              AI assistant
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">
              Personalized suggestions
            </h2>

            <p className="mt-1 text-sm text-[#85887F]">
              Smart recommendations based on your relocation activity.
            </p>
          </div>
        </div>

        <Link
          href="/suggestions"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >
          View all
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {visibleSuggestions.length > 0 ? (
          <div className="space-y-3">
            {visibleSuggestions.map((suggestion) => (
              <Link
                key={suggestion.id}
                href={getSuggestionLink(suggestion)}
                className="group block rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4 transition hover:border-[#CAD7B7] hover:bg-[#F6F8F2]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
                    <Lightbulb className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-sm font-bold text-[#30332D]">
                      {suggestion.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#7E8179]">
                      {suggestion.description}
                    </p>
                  </div>

                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#A0A39B] transition group-hover:translate-x-0.5 group-hover:text-[#6B8E23]" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D7DACF] bg-[#FAFAF7] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E7] text-[#6B8E23]">
              <Bot className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#252820]">
              No suggestions yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#85887F]">
              Use शहरSaathi features to receive personalized relocation
              recommendations.
            </p>

            <Link
              href="/ai"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
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
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
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