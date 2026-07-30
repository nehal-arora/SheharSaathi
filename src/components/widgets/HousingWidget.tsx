"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
} from "lucide-react";

import type { DashboardHousingSummary } from "@/features/dashboard/types/dashboard.types";

interface HousingWidgetProps {
  housing: DashboardHousingSummary;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export default function HousingWidget({
  housing,
}: HousingWidgetProps) {
  const listing = housing.recent_listing;

  return (
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#ECEDE7] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">
              Housing
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">
              Your property activity
            </h2>

            <p className="mt-1 text-sm text-[#85887F]">
              Review your latest listing and housing progress.
            </p>
          </div>
        </div>

        <Link
          href="/housing"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >
          View all
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {listing ? (
          <>
            <Link
              href={`/housing/${listing.id}`}
              className="group relative block overflow-hidden rounded-[20px] border border-[#E7E8E2]"
            >
              <div className="relative h-[190px] w-full sm:h-[210px]">
                <Image
                  src="/images/dashboard/property-placeholder.jpg"
                  alt={listing.title || "Property listing"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  <Home className="h-3.5 w-3.5" />
                  Recent listing
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="line-clamp-1 text-xl font-bold tracking-[-0.025em] text-white">
                    {listing.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
                    <MapPin className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      {listing.locality}, {listing.city}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-[#85887F]">
                  Monthly rent
                </p>

                <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#26311D]">
                  {formatCurrency(listing.rent)}
                </p>
              </div>

              <Link
                href={`/housing/${listing.id}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
              >
                View listing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D7DACF] bg-[#FAFAF7] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E7] text-[#6B8E23]">
              <Home className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#252820]">
              No property listed yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#85887F]">
              Add your first property to start managing listings from the
              dashboard.
            </p>

            <Link
              href="/housing/add"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
            >
              Add property
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-5 grid grid-cols-3 gap-3">
          <HousingStat
            icon={<Building2 className="h-4 w-4" />}
            label="Listings"
            value={housing.total_listings}
          />

          <HousingStat
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Active"
            value={housing.active_listings}
          />

          <HousingStat
            icon={<Bookmark className="h-4 w-4" />}
            label="Saved"
            value={housing.saved_listings}
          />
        </div>
      </div>
    </section>
  );
}

interface HousingStatProps {
  icon: ReactNode;
  label: string;
  value: number;
}

function HousingStat({
  icon,
  label,
  value,
}: HousingStatProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4">
      <div className="flex items-center gap-2 text-[#6B8E23]">
        {icon}

        <span className="truncate text-[11px] font-bold uppercase tracking-[0.08em]">
          {label}
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold tracking-[-0.025em] text-[#252820]">
        {value}
      </p>
    </div>
  );
}