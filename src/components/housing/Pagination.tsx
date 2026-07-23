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

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[#E8DFC8] bg-white p-6 shadow-sm sm:flex-row">

      <div>
        <p className="text-sm text-gray-500">
          Showing page
        </p>

        <p className="text-lg font-semibold text-[#333333]">
          {currentPage} of {totalPages}
        </p>
      </div>


      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="rounded-xl border-[#D6C7A1]"
        >
          <ChevronsLeft size={18}/>
        </Button>


        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-xl border-[#D6C7A1]"
        >
          <ChevronLeft size={18}/>
        </Button>


        <div className="hidden gap-2 sm:flex">

          {pages.map((page)=>(
            <button
              key={page}
              onClick={()=>onPageChange(page)}
              className={`h-10 w-10 rounded-xl font-medium transition ${
                currentPage === page
                  ? "bg-[#6B8E23] text-white"
                  : "bg-[#FBFAF5] text-[#333333] hover:bg-[#EEF2E4]"
              }`}
            >
              {page}
            </button>
          ))}

        </div>


        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-xl border-[#D6C7A1]"
        >
          <ChevronRight size={18}/>
        </Button>


        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="rounded-xl border-[#D6C7A1]"
        >
          <ChevronsRight size={18}/>
        </Button>

      </div>

    </div>
  );
}