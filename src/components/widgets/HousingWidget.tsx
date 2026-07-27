import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
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
  }).format(amount);
}

export default function HousingWidget({
  housing,
}: HousingWidgetProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Housing
              </h2>
              <p className="text-sm text-neutral-500">
                Manage your listings and saved homes
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/housing"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6B8E23] transition hover:opacity-75"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-neutral-50 p-3">
          <p className="text-2xl font-bold text-neutral-900">
            {housing.total_listings}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Total listings
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-[#6B8E23]" />
            <p className="text-2xl font-bold text-neutral-900">
              {housing.active_listings}
            </p>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Active
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="flex items-center gap-1">
            <Bookmark className="h-4 w-4 text-[#6B8E23]" />
            <p className="text-2xl font-bold text-neutral-900">
              {housing.saved_listings}
            </p>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Saved
          </p>
        </div>
      </div>

      {housing.recent_listing ? (
        <div className="mt-5 rounded-xl border border-neutral-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Recent listing
          </p>

          <h3 className="mt-2 font-semibold text-neutral-900">
            {housing.recent_listing.title}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-4 w-4" />
            <span>
              {housing.recent_listing.locality},{" "}
              {housing.recent_listing.city}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-semibold text-[#6B8E23]">
              {formatCurrency(housing.recent_listing.rent)}
              <span className="text-sm font-normal text-neutral-500">
                /month
              </span>
            </p>

            <Link
              href={`/housing/${housing.recent_listing.id}`}
              className="text-sm font-medium text-neutral-700 hover:text-[#6B8E23]"
            >
              View details
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-neutral-300 p-5 text-center">
          <p className="text-sm text-neutral-500">
            No recent housing activity.
          </p>

          <Link
            href="/housing/add"
            className="mt-3 inline-flex text-sm font-medium text-[#6B8E23]"
          >
            Add a listing
          </Link>
        </div>
      )}
    </section>
  );
}