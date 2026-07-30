import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Route,
  TrainFront,
} from "lucide-react";

import type { DashboardTransportSummary } from "@/features/dashboard/types/dashboard.types";

interface TransportWidgetProps {
  transport: DashboardTransportSummary;
}

export default function TransportWidget({
  transport,
}: TransportWidgetProps) {
  const hasTransportDetails = Boolean(
    transport.nearest_metro ||
      transport.estimated_commute ||
      transport.preferred_route ||
      transport.metro_distance_km !== null
  );

  return (
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#ECEDE7] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
            <TrainFront className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">
              Transport
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">
              Commute overview
            </h2>

            <p className="mt-1 text-sm text-[#85887F]">
              Review your preferred route and nearby transport.
            </p>
          </div>
        </div>

        <Link
          href="/transport"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >
          View all
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {hasTransportDetails ? (
          <>
            <div className="rounded-[20px] border border-[#E4E8DC] bg-[#F5F7F1] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#7A7D75]">
                    Preferred route
                  </p>

                  <h3 className="mt-2 truncate text-xl font-bold tracking-[-0.025em] text-[#26311D]">
                    {transport.preferred_route || "Route not selected"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#85887F]">
                    Your current commute preference for relocation planning.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E7EEDB] text-[#6B8E23]">
                  <Route className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full border-[3px] border-[#6B8E23] bg-white" />
                <div className="h-px flex-1 bg-[#CED8C0]" />
                <Navigation className="h-4 w-4 text-[#6B8E23]" />
                <div className="h-px flex-1 bg-[#CED8C0]" />
                <div className="h-3 w-3 rounded-full bg-[#6B8E23]" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TransportInfoCard
                label="Nearest metro"
                value={transport.nearest_metro || "Not available"}
                icon={MapPin}
              />

              <TransportInfoCard
                label="Estimated commute"
                value={transport.estimated_commute || "Not available"}
                icon={Clock3}
              />

              <TransportInfoCard
                label="Metro distance"
                value={
                  transport.metro_distance_km !== null &&
                  transport.metro_distance_km !== undefined
                    ? `${transport.metro_distance_km} km`
                    : "Not available"
                }
                icon={Navigation}
              />

              <TransportInfoCard
                label="Route preference"
                value={transport.preferred_route || "Not available"}
                icon={Route}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D7DACF] bg-[#FAFAF7] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E7] text-[#6B8E23]">
              <TrainFront className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#252820]">
              No commute details yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#85887F]">
              Add your preferred route and transport details to receive better
              commute recommendations.
            </p>

            <Link
              href="/transport"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
            >
              Add transport details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {hasTransportDetails && (
          <div className="mt-auto pt-5">
            <Link
              href="/transport"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
            >
              Manage transport plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

interface TransportInfoCardProps {
  label: string;
  value: string;
  icon: ComponentType<{
    className?: string;
  }>;
}

function TransportInfoCard({
  label,
  value,
  icon: Icon,
}: TransportInfoCardProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4">
      <div className="flex items-center gap-2 text-[#6B8E23]">
        <Icon className="h-4 w-4 shrink-0" />

        <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em]">
          {label}
        </p>
      </div>

      <p className="mt-3 truncate text-sm font-bold text-[#252820]">
        {value}
      </p>
    </div>
  );
}