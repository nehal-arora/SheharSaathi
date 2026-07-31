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

const suggestionIcons: Record<
  AISuggestionType,
  LucideIcon
> = {
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
      return "border-red-400/25 bg-red-400/10 text-red-300";

    case "Medium":
      return "border-amber-400/25 bg-amber-400/10 text-amber-300";

    case "Low":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";

    default:
      return "border-[#205C46]/40 bg-[#10271F] text-[#9EAEA7]";
  }
}

export default function SuggestionCard({
  suggestion,
}: SuggestionCardProps) {
  const Icon =
    suggestionIcons[suggestion.type] ??
    suggestionIcons.general;

  const title =
    suggestion.title ||
    "Relocation suggestion";

  const description =
    suggestion.description ||
    "No description was provided for this suggestion.";

  const actionLabel =
    suggestion.action_label ||
    "View details";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A34F]/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#D4A34F]/8 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-7 w-7" />
          </div>

          {suggestion.priority && (
            <span
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em]",
                getPriorityClasses(
                  suggestion.priority
                ),
              ].join(" ")}
            >
              {suggestion.priority} priority
            </span>
          )}
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
            {suggestion.type}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7] transition-colors group-hover:text-[#F0C86A]">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#B8C5BF]">
            {description}
          </p>
        </div>

        {suggestion.reason && (
          <div className="mt-6 rounded-[22px] border border-[#205C46]/35 bg-[#10271F] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Lightbulb className="h-4 w-4" />
              </div>

              <h3 className="text-sm font-bold text-[#FBFAF7]">
                Why this is recommended
              </h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-[#9EAEA7]">
              {suggestion.reason}
            </p>
          </div>
        )}

        {suggestion.action_url ? (
          <Link
            href={suggestion.action_url}
            className="mt-auto flex items-center justify-between border-t border-[#205C46]/30 pt-6 text-sm font-bold text-[#F0C86A]"
          >
            <span>{actionLabel}</span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 transition-all duration-200 group-hover:translate-x-1 group-hover:bg-[#D4A34F] group-hover:text-[#071512]">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        ) : (
          <div className="mt-auto border-t border-[#205C46]/30 pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#7F9189]">
              <Lightbulb className="h-4 w-4 text-[#D4A34F]" />
              Suggested by शहरSaathi AI
            </span>
          </div>
        )}
      </div>
    </article>
  );
}