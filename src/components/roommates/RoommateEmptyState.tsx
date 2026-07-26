import Link from "next/link";
import {
  SearchX,
  SlidersHorizontal,
  Users,
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
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D6C7A1] bg-[#FBFAF5] px-6 py-12 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2E4] text-[#6B8E23]">
        <Icon size={30} aria-hidden="true" />
      </div>

      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-[#6B8E23] px-5 py-2.5 font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
          >
            <SlidersHorizontal size={17} />
            Clear filters
          </button>
        )}

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="rounded-xl bg-[#6B8E23] px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}