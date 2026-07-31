"use client";

import {
  AlertCircle,
  Building2,
} from "lucide-react";

import HousingCard from "@/components/housing/HousingCard";
import HousingSkeleton from "@/components/housing/HousingSkeleton";
import HousingEmpty from "@/components/housing/HousingEmpty";

import type { Housing } from "@/types/housing";

interface HousingGridProps {
  listings: Housing[];
  loading?: boolean;
  error?: boolean;
}

export default function HousingGrid({
  listings,
  loading = false,
  error = false,
}: HousingGridProps) {
  if (loading) {
    return (
      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#D4A34F]">
              Loading homes
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#FBFAF7]">
              Finding suitable listings for you
            </h3>
          </div>

          <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#0D211B] text-[#D4A34F] sm:flex">
            <Building2 className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <HousingSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-400/15 bg-red-500/[0.04] p-2">
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-400/15 bg-red-500/[0.06] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <p className="font-semibold text-red-200">
              Unable to load listings
            </p>

            <p className="mt-1 text-sm leading-6 text-red-200/70">
              Please refresh the page and try again.
            </p>
          </div>
        </div>

        <HousingEmpty
          title="Something went wrong"
          description="We couldn't load the housing listings. Please refresh the page and try again."
          showAddButton={false}
        />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <HousingEmpty
        title="No Listings Found"
        description="Try changing your search filters or add a new property."
      />
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#D4A34F]">
            Available homes
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#FBFAF7]">
            {listings.length} listing
            {listings.length === 1 ? "" : "s"} found
          </h3>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl border border-[#D4A34F]/15 bg-[#0D211B] px-4 py-2.5 text-sm text-[#9EAEA7] sm:flex">
          <Building2 className="h-4 w-4 text-[#D4A34F]" />

          Updated results
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((housing) => (
          <HousingCard
            key={housing.id}
            housing={housing}
          />
        ))}
      </div>
    </section>
  );
}