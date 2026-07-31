"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
            Navigation
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#FBFAF7]">
            Page {currentPage}{" "}
            <span className="text-[#9EAEA7]">
              of {totalPages}
            </span>
          </h3>

          <p className="mt-1 text-sm text-[#82928B]">
            Browse all available housing listings.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="
              h-11
              w-11
              rounded-xl
              border-[#D4A34F]/20
              bg-[#071512]
              text-[#F0C86A]
              hover:bg-[#D4A34F]/10
              hover:text-[#F0C86A]
              disabled:opacity-40
            "
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() =>
              onPageChange(currentPage - 1)
            }
            className="
              h-11
              w-11
              rounded-xl
              border-[#D4A34F]/20
              bg-[#071512]
              text-[#F0C86A]
              hover:bg-[#D4A34F]/10
              hover:text-[#F0C86A]
              disabled:opacity-40
            "
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden items-center gap-2 md:flex">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() =>
                  onPageChange(page)
                }
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? "bg-[#D4A34F] text-[#10251D] shadow-[0_10px_25px_rgba(212,163,79,0.25)]"
                    : "border border-[#D4A34F]/12 bg-[#071512] text-[#C7D2CD] hover:border-[#D4A34F]/35 hover:bg-[#122A22] hover:text-[#FBFAF7]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[#D4A34F]/12 bg-[#071512] px-4 py-2 text-sm font-semibold text-[#FBFAF7] md:hidden">
            {currentPage} / {totalPages}
          </div>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            className="
              h-11
              w-11
              rounded-xl
              border-[#D4A34F]/20
              bg-[#071512]
              text-[#F0C86A]
              hover:bg-[#D4A34F]/10
              hover:text-[#F0C86A]
              disabled:opacity-40
            "
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() =>
              onPageChange(totalPages)
            }
            className="
              h-11
              w-11
              rounded-xl
              border-[#D4A34F]/20
              bg-[#071512]
              text-[#F0C86A]
              hover:bg-[#D4A34F]/10
              hover:text-[#F0C86A]
              disabled:opacity-40
            "
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}