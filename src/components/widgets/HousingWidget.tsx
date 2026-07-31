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
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#205C46]/25 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Housing
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Your property activity
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Review your latest listing and housing progress.
            </p>
          </div>
        </div>

        <Link
          href="/housing"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {listing ? (
          <>
            <Link
              href={`/housing/${listing.id}`}
              className="group relative block overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.02]"
            >
              <div className="relative h-[190px] w-full sm:h-[210px]">
                <Image
                  src="/images/dashboard/property-placeholder.jpg"
                  alt={listing.title || "Property listing"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071512] via-[#071512]/20 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#071512]/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Home className="h-3.5 w-3.5 text-[#F0C86A]" />
                    Recent listing
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#071512]/60 text-white/65 backdrop-blur-md transition group-hover:border-[#D4A34F]/35 group-hover:text-[#F0C86A]">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="line-clamp-1 text-xl font-bold tracking-[-0.025em] text-white">
                    {listing.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-white/62">
                    <MapPin className="h-4 w-4 shrink-0 text-[#D4A34F]" />

                    <span className="truncate">
                      {listing.locality}, {listing.city}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.09em] text-white/35">
                  Monthly rent
                </p>

                <p className="mt-1.5 text-2xl font-bold tracking-[-0.03em] text-white">
                  {formatCurrency(listing.rent)}
                </p>
              </div>

              <Link
                href={`/housing/${listing.id}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
              >
                View listing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
              <Home className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Start your housing journey
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              No property listed yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/38">
              Add your first property to start managing listings directly from
              your dashboard.
            </p>

            <Link
              href="/housing/add"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
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
            accent="green"
          />

          <HousingStat
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Active"
            value={housing.active_listings}
            accent="gold"
          />

          <HousingStat
            icon={<Bookmark className="h-4 w-4" />}
            label="Saved"
            value={housing.saved_listings}
            accent="green"
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
  accent: "green" | "gold";
}

function HousingStat({
  icon,
  label,
  value,
  accent,
}: HousingStatProps) {
  const isGold = accent === "gold";

  return (
    <div className="min-w-0 rounded-[16px] border border-white/[0.06] bg-white/[0.025] p-3.5 sm:p-4">
      <div
        className={
          isGold
            ? "flex items-center gap-2 text-[#F0C86A]"
            : "flex items-center gap-2 text-[#A5CEB5]"
        }
      >
        {icon}

        <span className="truncate text-[10px] font-bold uppercase tracking-[0.08em] sm:text-[11px]">
          {label}
        </span>
      </div>

      <p className="mt-3 text-xl font-bold tracking-[-0.025em] text-white sm:text-2xl">
        {value}
      </p>
    </div>
  );
}