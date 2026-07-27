import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPinned,
  Navigation,
  TrainFront,
} from "lucide-react";

import type { DashboardTransportSummary } from "@/features/dashboard/types/dashboard.types";

interface TransportWidgetProps {
  transport: DashboardTransportSummary;
}

export default function TransportWidget({
  transport,
}: TransportWidgetProps) {
  const hasTransportData =
    transport.nearest_metro ||
    transport.metro_distance_km !== undefined ||
    transport.estimated_commute ||
    transport.preferred_route;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <TrainFront className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Transport
            </h2>

            <p className="text-sm text-neutral-500">
              Nearby routes and commute details
            </p>
          </div>
        </div>

        <Link
          href="/transport"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#6B8E23] transition hover:opacity-75"
        >
          Explore
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {hasTransportData ? (
        <>
          <div className="mt-5 rounded-xl border border-neutral-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Nearest metro
            </p>

            <div className="mt-3 flex items-start gap-3">
              <MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-[#6B8E23]" />

              <div>
                <p className="font-semibold text-neutral-900">
                  {transport.nearest_metro ?? "Not available"}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {transport.metro_distance_km !== undefined
                    ? `${transport.metro_distance_km} km away`
                    : "Distance unavailable"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Navigation className="h-4 w-4" />
                <span className="text-xs font-medium">
                  Preferred route
                </span>
              </div>

              <p className="mt-2 font-semibold text-neutral-900">
                {transport.preferred_route ?? "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Clock3 className="h-4 w-4" />
                <span className="text-xs font-medium">
                  Estimated commute
                </span>
              </div>

              <p className="mt-2 font-semibold text-neutral-900">
                {transport.estimated_commute ?? "Not available"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-neutral-300 p-5 text-center">
          <p className="text-sm text-neutral-500">
            No transport information available yet.
          </p>

          <Link
            href="/transport"
            className="mt-3 inline-flex text-sm font-medium text-[#6B8E23]"
          >
            Search a route
          </Link>
        </div>
      )}
    </section>
  );
}