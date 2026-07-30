import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Route,
  TrainFront,
} from "lucide-react";

import type {
  DashboardTransportSummary,
} from "@/features/dashboard/types/dashboard.types";

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

  if (!hasTransportDetails) {
    return (
      <section className="relative overflow-hidden rounded-[36px] border border-[#CFE0E9] bg-[#EDF5F8] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#7EABC1]/20 blur-3xl" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#5686A0] text-white shadow-[0_14px_35px_rgba(86,134,160,0.22)]">
            <TrainFront className="h-6 w-6" />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-[#426D86]">
            Transport
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#213846]">
            Plan your daily commute
          </h2>

          <p className="mt-3 max-w-md text-sm leading-7 text-[#607A89]">
            Add your preferred route and transport details to
            receive more relevant commute recommendations.
          </p>

          <Link
            href="/transport"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#426D86] px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#365B70]"
          >
            Add transport details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-[#CFE0E9] bg-[#EDF5F8] shadow-[0_24px_70px_rgba(66,109,134,0.12)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#7EABC1]/20 blur-[90px]" />

      <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#B7D2DE]/30 blur-[90px]" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#5686A0] text-white shadow-[0_14px_35px_rgba(86,134,160,0.22)]">
              <TrainFront className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#426D86]">
                Transport planner
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#213846]">
                Your commute overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#607A89]">
                Key transport details for your current relocation
                plan.
              </p>
            </div>
          </div>

          <Link
            href="/transport"
            className="group hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#426D86] shadow-sm transition hover:-translate-y-0.5 sm:flex"
            aria-label="Open transport"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[28px] bg-[#28485A] px-5 py-7 text-white">
          <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#78A5BC]/25 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-white/55">
                  Preferred route
                </p>

                <p className="mt-2 text-xl font-black tracking-[-0.025em]">
                  {transport.preferred_route || "Route not selected"}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white/10 text-[#B8D8E7]">
                <Route className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full border-[3px] border-[#B8D8E7] bg-[#28485A]" />
              <div className="h-0.5 flex-1 bg-white/20" />
              <Navigation className="h-5 w-5 text-[#B8D8E7]" />
              <div className="h-0.5 flex-1 bg-white/20" />
              <div className="h-3 w-3 rounded-full bg-[#B8D8E7] shadow-[0_0_20px_rgba(184,216,231,0.7)]" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

        <Link
          href="/transport"
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#426D86] transition hover:text-[#213846]"
        >
          View complete transport plan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

interface TransportInfoCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}

function TransportInfoCard({
  label,
  value,
  icon: Icon,
}: TransportInfoCardProps) {
  return (
    <div className="rounded-[22px] border border-white/70 bg-white/65 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#DCEAF0] text-[#426D86]">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#6C8795]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-black text-[#213846]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}