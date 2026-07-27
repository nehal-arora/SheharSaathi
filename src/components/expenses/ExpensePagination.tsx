"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExpensePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
): number[] {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}

export default function ExpensePagination({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  disabled = false,
}: ExpensePaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  const safeTotalPages = Math.max(
    totalPages,
    1
  );

  const safePage = Math.min(
    Math.max(page, 1),
    safeTotalPages
  );

  const firstItem =
    (safePage - 1) * limit + 1;

  const lastItem = Math.min(
    safePage * limit,
    totalItems
  );

  const visiblePages = getVisiblePages(
    safePage,
    safeTotalPages
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E7E2D5] bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-[#333333]">
          {firstItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#333333]">
          {lastItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#333333]">
          {totalItems}
        </span>{" "}
        expenses
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange(safePage - 1)
          }
          disabled={
            disabled || safePage <= 1
          }
          className="border-[#D8D1BF] text-[#333333] hover:bg-[#FBFAF5]"
        >
          <ChevronLeft
            size={16}
            className="mr-1"
          />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {visiblePages.map(
            (pageNumber) => {
              const isActive =
                pageNumber === safePage;

              return (
                <Button
                  key={pageNumber}
                  type="button"
                  variant={
                    isActive
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    onPageChange(
                      pageNumber
                    )
                  }
                  disabled={
                    disabled || isActive
                  }
                  className={
                    isActive
                      ? "bg-[#6B8E23] text-white hover:bg-[#5d7d1f]"
                      : "border-[#D8D1BF] text-[#333333] hover:bg-[#FBFAF5]"
                  }
                >
                  {pageNumber}
                </Button>
              );
            }
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange(safePage + 1)
          }
          disabled={
            disabled ||
            safePage >= safeTotalPages
          }
          className="border-[#D8D1BF] text-[#333333] hover:bg-[#FBFAF5]"
        >
          Next
          <ChevronRight
            size={16}
            className="ml-1"
          />
        </Button>
      </div>
    </div>
  );
}