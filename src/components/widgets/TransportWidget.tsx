"use client";

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
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#205C46]/25 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
            <TrainFront className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Transport
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Commute overview
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Review your preferred route and nearby transport.
            </p>
          </div>
        </div>

        <Link
          href="/transport"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {hasTransportDetails ? (
          <>
            <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/35">
                    Preferred route
                  </p>

                  <h3 className="mt-2 truncate text-2xl font-bold tracking-[-0.03em] text-white">
                    {transport.preferred_route ||
                      "Route not selected"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/38">
                    Your current commute preference for relocation
                    planning.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Route className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full border-[3px] border-[#8AB59C] bg-[#0F251E]" />

                <div className="h-px flex-1 bg-gradient-to-r from-[#205C46] to-[#D4A34F]" />

                <Navigation className="h-4 w-4 text-[#D4A34F]" />

                <div className="h-px flex-1 bg-gradient-to-r from-[#205C46] to-[#D4A34F]" />

                <div className="h-3 w-3 rounded-full bg-[#D4A34F]" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TransportInfoCard
                label="Nearest metro"
                value={
                  transport.nearest_metro ||
                  "Not available"
                }
                icon={MapPin}
                accent="green"
              />

              <TransportInfoCard
                label="Estimated commute"
                value={
                  transport.estimated_commute ||
                  "Not available"
                }
                icon={Clock3}
                accent="gold"
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
                accent="green"
              />

              <TransportInfoCard
                label="Route preference"
                value={
                  transport.preferred_route ||
                  "Not available"
                }
                icon={Route}
                accent="gold"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
              <TrainFront className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Plan your commute
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              No commute details yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/38">
              Add your preferred route and transport details to
              receive better commute recommendations.
            </p>

            <Link
              href="/transport"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
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
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
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
  accent: "green" | "gold";
}

function TransportInfoCard({
  label,
  value,
  icon: Icon,
  accent,
}: TransportInfoCardProps) {
  const isGold = accent === "gold";

  return (
    <div className="rounded-[16px] border border-white/[0.06] bg-white/[0.025] p-4">
      <div
        className={
          isGold
            ? "flex items-center gap-2 text-[#F0C86A]"
            : "flex items-center gap-2 text-[#A5CEB5]"
        }
      >
        <Icon className="h-4 w-4 shrink-0" />

        <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em]">
          {label}
        </p>
      </div>

      <p className="mt-3 truncate text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}