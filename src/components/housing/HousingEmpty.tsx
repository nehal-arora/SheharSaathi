"use client";

import Link from "next/link";
import {
  Home,
  Plus,
  SearchX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface HousingEmptyProps {
  title?: string;
  description?: string;
  showAddButton?: boolean;
}

export default function HousingEmpty({
  title = "No Housing Found",
  description = "No listings are available right now.",
  showAddButton = true,
}: HousingEmptyProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] px-6 py-14 text-center shadow-[0_20px_70px_rgba(0,0,0,0.30)]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#205C46]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#D4A34F]/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center">

        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D4A34F]/20 bg-[#205C46]/25 shadow-lg">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A34F]/10">
            <SearchX className="h-8 w-8 text-[#F0C86A]" />
          </div>

        </div>

        {/* Heading */}

        <h3 className="mt-8 text-3xl font-bold text-[#FBFAF7]">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-4 max-w-lg text-base leading-7 text-[#9EAEA7]">
          {description}
        </p>

        {/* Tips */}

        <div className="mt-8 w-full max-w-xl rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-5">

          <div className="flex items-center justify-center gap-2 text-[#F0C86A]">
            <Home className="h-5 w-5" />

            <span className="font-semibold">
              You can try
            </span>
          </div>

          <ul className="mt-4 space-y-3 text-sm text-[#C6D0CB]">

            <li>• Search in another city or locality.</li>

            <li>• Increase your budget range.</li>

            <li>• Remove some filters.</li>

            <li>• Check back later for new listings.</li>

          </ul>

        </div>

        {/* Button */}

        {showAddButton && (
          <Link
            href="/housing/add"
            className="mt-8"
          >
            <Button
              className="
                h-12
                rounded-xl
                bg-[#D4A34F]
                px-8
                font-semibold
                text-[#10251D]
                shadow-[0_12px_30px_rgba(212,163,79,0.25)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#E5B65B]
              "
            >
              <Plus className="mr-2 h-4 w-4" />

              Add New Listing
            </Button>
          </Link>
        )}

      </div>
    </div>
  );
}