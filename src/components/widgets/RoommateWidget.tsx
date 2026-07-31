"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Heart,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";

import type { DashboardRoommateSummary } from "@/features/dashboard/types/dashboard.types";

interface RoommateWidgetProps {
  roommates: DashboardRoommateSummary;
}

function clampPercentage(value: number): number {
  return Math.min(Math.max(Number(value) || 0, 0), 100);
}

function getInitial(name?: string | null): string {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return "R";
  }

  return trimmedName.charAt(0).toUpperCase();
}

export default function RoommateWidget({
  roommates,
}: RoommateWidgetProps) {
  const match = roommates.top_match;
  const compatibilityScore = match
    ? clampPercentage(match.compatibility_score)
    : 0;

  return (
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#205C46]/25 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
            <Users className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Roommates
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Best compatibility match
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Discover people who fit your lifestyle.
            </p>
          </div>
        </div>

        <Link
          href="/roommates"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {match ? (
          <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-5">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#D4A34F]/20 bg-gradient-to-br from-[#205C46] to-[#123B2D] text-xl font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,163,79,0.22),transparent_45%)]" />

                <span className="relative">
                  {getInitial(match.name)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold tracking-[-0.025em] text-white">
                      {match.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-white/42">
                      <MapPin className="h-4 w-4 shrink-0 text-[#D4A34F]" />

                      <span className="truncate">
                        {match.locality}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.05] bg-[#071512]/35 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.09em] text-white/35">
                    Compatibility
                  </p>

                  <p className="mt-1 text-sm font-medium text-white/62">
                    Lifestyle match score
                  </p>
                </div>

                <span className="text-2xl font-bold tracking-[-0.03em] text-[#F0C86A]">
                  {match.compatibility_score}%
                </span>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#205C46] via-[#8AB59C] to-[#D4A34F] transition-all duration-700"
                  style={{
                    width: `${compatibilityScore}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-white/25">
                <span>Low match</span>
                <span>Excellent match</span>
              </div>
            </div>

            <Link
              href="/roommates"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-5 text-sm font-bold text-[#F0C86A] transition hover:bg-[#D4A34F] hover:text-[#10251D]"
            >
              View roommate profile

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]">
              <UserRound className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Find your ideal match
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              No roommate matches
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/38">
              Complete your roommate profile to receive personalised
              compatibility matches.
            </p>

            <Link
              href="/roommates"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
            >
              Explore roommates

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-5 grid grid-cols-3 gap-3">
          <RoommateStat
            icon={Users}
            label="Matches"
            value={roommates.total_matches}
            accent="green"
          />

          <RoommateStat
            icon={Heart}
            label="Saved"
            value={roommates.favorites}
            accent="gold"
          />

          <RoommateStat
            icon={ArrowRight}
            label="Pending"
            value={roommates.pending_interests}
            accent="green"
          />
        </div>
      </div>
    </section>
  );
}

interface RoommateStatProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
  value: number;
  accent: "green" | "gold";
}

function RoommateStat({
  icon: Icon,
  label,
  value,
  accent,
}: RoommateStatProps) {
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
        <Icon className="h-4 w-4 shrink-0" />

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