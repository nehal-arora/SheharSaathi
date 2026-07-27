import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import {
  ArrowRight,
  BusFront,
  CircleDollarSign,
  House,
  Lightbulb,
  MapPinned,
  PiggyBank,
  ShieldCheck,
  Users,
} from "lucide-react";

import type {
  AISuggestionType,
  PersonalizedSuggestion,
} from "@/features/ai/types";

interface SuggestionCardProps {
  suggestion: PersonalizedSuggestion;
}

const suggestionIcons: Record<AISuggestionType, LucideIcon> = {
  housing: House,
  roommate: Users,
  expense: CircleDollarSign,
  budget: PiggyBank,
  locality: MapPinned,
  safety: ShieldCheck,
  transport: BusFront,
  general: Lightbulb,
};

function getPriorityClasses(
  priority?: PersonalizedSuggestion["priority"]
): string {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700 border-red-100";

    case "Medium":
      return "bg-amber-50 text-amber-700 border-amber-100";

    case "Low":
      return "bg-green-50 text-green-700 border-green-100";

    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
}

export default function SuggestionCard({
  suggestion,
}: SuggestionCardProps) {
  const Icon =
    suggestionIcons[suggestion.type] ??
    suggestionIcons.general;

  const title =
    suggestion.title || "Relocation suggestion";

  const description =
    suggestion.description ||
    "No description was provided for this suggestion.";

  const actionLabel =
    suggestion.action_label || "View details";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
          <Icon className="h-6 w-6" />
        </div>

        {suggestion.priority && (
          <span
            className={[
              "rounded-full border px-3 py-1 text-xs font-semibold",
              getPriorityClasses(suggestion.priority),
            ].join(" ")}
          >
            {suggestion.priority} priority
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6B8E23]">
          {suggestion.type}
        </p>

        <h2 className="mt-2 text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>

      {suggestion.reason && (
        <div className="mt-5 rounded-2xl border border-[#D6C7A1] bg-[#FBFAF5] p-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[#6B8E23]" />

            <h3 className="text-sm font-semibold text-gray-900">
              Why this is recommended
            </h3>
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {suggestion.reason}
          </p>
        </div>
      )}

      {suggestion.action_url ? (
        <Link
          href={suggestion.action_url}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#6B8E23] transition hover:gap-3"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400">
            Suggested by शहरSaathi AI
          </span>
        </div>
      )}
    </article>
  );
}