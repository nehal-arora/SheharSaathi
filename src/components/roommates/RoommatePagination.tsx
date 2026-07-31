"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface RoommatePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function RoommatePagination({
  currentPage,
  totalPages,
  onPageChange,
}: RoommatePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-3"
      aria-label="Roommate pagination"
    >
      {/* Previous */}

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="inline-flex items-center gap-2 rounded-2xl border border-[#205C46]/40 bg-[#0D211B] px-5 py-3 text-sm font-semibold text-[#D6E0DB] shadow-lg transition-all duration-200 hover:border-[#D4A34F]/40 hover:bg-[#10271F] hover:text-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      {/* Pages */}

      {pages.map((page, index) =>
        page === "..." ? (
          <div
            key={`ellipsis-${index}`}
            className="flex h-12 w-12 items-center justify-center text-[#7C8E86]"
          >
            <MoreHorizontal size={18} />
          </div>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() =>
              onPageChange(page)
            }
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold transition-all duration-200 ${
              currentPage === page
                ? "bg-[#D4A34F] text-[#071512] shadow-[0_10px_25px_rgba(212,163,79,0.30)]"
                : "border border-[#205C46]/40 bg-[#0D211B] text-[#D6E0DB] hover:border-[#D4A34F]/40 hover:bg-[#10271F] hover:text-[#F0C86A]"
            }`}
            aria-current={
              currentPage === page
                ? "page"
                : undefined
            }
          >
            {page}
          </button>
        )
      )}

      {/* Next */}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="inline-flex items-center gap-2 rounded-2xl border border-[#205C46]/40 bg-[#0D211B] px-5 py-3 text-sm font-semibold text-[#D6E0DB] shadow-lg transition-all duration-200 hover:border-[#D4A34F]/40 hover:bg-[#10271F] hover:text-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

function getVisiblePages(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from(
      { length: total },
      (_, index) => index + 1
    );
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [
      1,
      "...",
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total,
    ];
  }

  return [
    1,
    "...",
    current - 1,
    current,
    current + 1,
    "...",
    total,
  ];
}