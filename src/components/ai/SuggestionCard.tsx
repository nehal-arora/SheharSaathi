import Link from "next/link";
import {
  ArrowRight,
  Bus,
  CircleDollarSign,
  House,
  Lightbulb,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";

import type {
  AISuggestionType,
  PersonalizedSuggestion,
} from "@/features/ai/types";

interface SuggestionCardProps {
  suggestion: PersonalizedSuggestion;
}

const suggestionIcons: Record<AISuggestionType, typeof Lightbulb> = {
  housing: House,
  roommate: UserRoundSearch,
  expense: CircleDollarSign,
  budget: CircleDollarSign,
  safety: ShieldCheck,
  transport: Bus,
  general: Lightbulb,
};

export default function SuggestionCard({
  suggestion,
}: SuggestionCardProps) {
  const Icon = suggestionIcons[suggestion.type];

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-[#FBFAF5] px-3 py-1 text-xs font-medium capitalize text-[#6B8E23]">
            {suggestion.type}
          </span>

          <h3 className="mt-3 text-lg font-semibold text-gray-900">
            {suggestion.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {suggestion.description}
          </p>

          {suggestion.action_label && suggestion.action_url ? (
            <Link
              href={suggestion.action_url}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6B8E23] transition hover:gap-3"
            >
              {suggestion.action_label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}