import Link from "next/link";
import {
  SearchX,
  SlidersHorizontal,
  Users,
  Sparkles,
} from "lucide-react";

interface RoommateEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  type?: "search" | "favorites" | "profile";
  onClearFilters?: () => void;
}

export default function RoommateEmptyState({
  title = "No roommate profiles found",
  description = "Try updating your search or filter preferences.",
  actionLabel,
  actionHref,
  type = "search",
  onClearFilters,
}: RoommateEmptyStateProps) {
  const Icon =
    type === "favorites"
      ? Users
      : type === "profile"
      ? Users
      : SearchX;

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] px-8 py-14 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      {/* Background Glow */}
      <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#205C46]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D4A34F]/30 bg-gradient-to-br from-[#D4A34F]/15 to-[#205C46]/20">
          <Icon
            size={42}
            className="text-[#F0C86A]"
          />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 py-1.5">
          <Sparkles
            size={14}
            className="text-[#F0C86A]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F0C86A]">
            AI Roommate Matching
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-[#FBFAF7]">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-base leading-7 text-[#AEBDB6]">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-6 py-3 font-semibold text-[#D6E0DB] transition-all duration-200 hover:border-[#D4A34F]/40 hover:text-[#F0C86A]"
            >
              <SlidersHorizontal size={18} />
              Clear Filters
            </button>
          )}

          {actionLabel && actionHref && (
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#071512] shadow-[0_10px_24px_rgba(212,163,79,0.18)] transition-all duration-200 hover:bg-[#F0C86A]"
            >
              {actionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}