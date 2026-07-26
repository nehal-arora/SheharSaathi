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
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Roommate pagination"
    >
      {/* Previous */}

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-[#6B8E23] hover:bg-[#EEF2E4] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {/* Pages */}

      {pages.map((page, index) =>
        page === "..." ? (
          <div
            key={`ellipsis-${index}`}
            className="flex h-10 w-10 items-center justify-center text-gray-400"
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
            className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
              currentPage === page
                ? "bg-[#6B8E23] text-white"
                : "border border-gray-200 bg-white hover:border-[#6B8E23] hover:bg-[#EEF2E4]"
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
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-[#6B8E23] hover:bg-[#EEF2E4] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={16} />
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