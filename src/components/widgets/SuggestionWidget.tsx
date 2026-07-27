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
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              AI Suggestions
            </h2>

            <p className="text-sm text-neutral-500">
              Personalized relocation insights
            </p>
          </div>
        </div>

        <Link
          href="/suggestions"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6B8E23] transition hover:opacity-75"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {suggestions.slice(0, 3).map((suggestion) => (
          <Link
            key={suggestion.id}
            href={getSuggestionLink(suggestion)}
            className="block rounded-xl border border-neutral-200 p-4 transition hover:border-[#6B8E23] hover:bg-[#FBFAF5]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2E4] text-[#6B8E23]">
                <Lightbulb className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-900">
                  {suggestion.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-neutral-500">
                  {suggestion.description}
                </p>
              </div>

              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400" />
            </div>
          </Link>
        ))}

        {suggestions.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-5 text-center">
            <Bot className="mx-auto h-8 w-8 text-neutral-400" />

            <p className="mt-3 text-sm text-neutral-500">
              No personalized suggestions available yet.
            </p>

            <Link
              href="/ai"
              className="mt-3 inline-flex text-sm font-medium text-[#6B8E23]"
            >
              Ask शहरSaathi AI
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}