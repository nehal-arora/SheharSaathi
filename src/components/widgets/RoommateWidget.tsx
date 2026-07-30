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

import type {
  DashboardRoommateSummary,
} from "@/features/dashboard/types/dashboard.types";

interface Props {
  roommates: DashboardRoommateSummary;
}

export default function RoommateWidget({
  roommates,
}: Props) {
  const match = roommates.top_match;

  return (
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">

      {/* Header */}

      <div className="flex items-start justify-between border-b border-[#ECEDE7] px-6 py-5">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">

            <Users className="h-5 w-5"/>

          </div>

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">

              Roommates

            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">

              Best compatibility match

            </h2>

            <p className="mt-1 text-sm text-[#85887F]">

              Discover people who fit your lifestyle.

            </p>

          </div>

        </div>

        <Link
          href="/roommates"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >

          View all

          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5"/>

        </Link>

      </div>

      <div className="flex flex-1 flex-col p-6">

        {match ? (

          <>

            <div className="rounded-[20px] border border-[#E5E8DF] bg-[#F7F8F4] p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#6B8E23] text-xl font-bold text-white">

                  {match.name.charAt(0).toUpperCase()}

                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="truncate text-xl font-bold text-[#252820]">

                    {match.name}

                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-[#85887F]">

                    <MapPin className="h-4 w-4"/>

                    <span className="truncate">

                      {match.locality}

                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-semibold text-[#5E615A]">

                    Compatibility

                  </span>

                  <span className="text-lg font-bold text-[#6B8E23]">

                    {match.compatibility_score}%

                  </span>

                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#DDE3D4]">

                  <div
                    className="h-full rounded-full bg-[#6B8E23] transition-all duration-700"
                    style={{
                      width: `${Math.min(Math.max(match.compatibility_score,0),100)}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </>

        ) : (

          <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D7DACF] bg-[#FAFAF7] px-6 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E7] text-[#6B8E23]">

              <UserRound className="h-5 w-5"/>

            </div>

            <h3 className="mt-4 text-lg font-bold text-[#252820]">

              No roommate matches

            </h3>

            <p className="mt-2 text-sm leading-6 text-[#85887F]">

              Complete your roommate profile to receive personalized matches.

            </p>

            <Link
              href="/roommates"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
            >

              Explore roommates

            </Link>

          </div>

        )}

        <div className="mt-5 grid grid-cols-3 gap-3">

          <Stat
            icon={Users}
            label="Matches"
            value={roommates.total_matches}
          />

          <Stat
            icon={Heart}
            label="Saved"
            value={roommates.favorites}
          />

          <Stat
            icon={ArrowRight}
            label="Pending"
            value={roommates.pending_interests}
          />

        </div>

      </div>

    </section>
  );
}

interface StatProps{
  icon:ComponentType<{className?:string}>;
  label:string;
  value:number;
}

function Stat({
  icon:Icon,
  label,
  value,
}:StatProps){

  return(

    <div className="rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4">

      <div className="flex items-center gap-2 text-[#6B8E23]">

        <Icon className="h-4 w-4"/>

        <span className="text-[11px] font-bold uppercase tracking-[0.08em]">

          {label}

        </span>

      </div>

      <p className="mt-3 text-2xl font-bold tracking-[-0.025em] text-[#252820]">

        {value}

      </p>

    </div>

  );

}