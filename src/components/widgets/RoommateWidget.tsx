"use client";

import Link from "next/link";
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
    <section className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#F5F0FA] via-[#F8F4FC] to-white border border-[#E5DDF0] shadow-[0_25px_70px_rgba(86,62,122,.08)]">

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#A78BC8]/20 blur-[90px]" />

      <div className="relative p-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#7A63A2] text-white shadow-lg">

              <Users className="h-5 w-5"/>

            </div>

            <div>

              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#7A63A2]">

                Roommate Matching

              </p>

              <h2 className="mt-2 text-2xl font-black text-[#2E2739]">

                Your Best Match

              </h2>

            </div>

          </div>

          <Link
            href="/roommates"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-[#7A63A2] hover:text-white"
          >

            <ArrowRight className="h-4 w-4"/>

          </Link>

        </div>

        {/* Match */}

        <div className="mt-7 rounded-[28px] bg-white p-6 shadow-sm">

          {match ? (

            <>

              <div className="flex items-center gap-4">

                {/* Avatar */}

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#7A63A2] text-white text-3xl font-black">

                  {match.name.charAt(0).toUpperCase()}

                </div>

                <div>

                  <h3 className="text-2xl font-black text-[#2E2739]">

                    {match.name}

                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-[#746F7F]">

                    <MapPin className="h-4 w-4"/>

                    {match.locality}

                  </div>

                </div>

              </div>

              <div className="mt-7 rounded-2xl bg-[#F4EFF9] p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold">

                    Compatibility

                  </span>

                  <span className="text-2xl font-black text-[#7A63A2]">

                    {match.compatibility_score}%

                  </span>

                </div>

                <div className="mt-4 h-3 rounded-full bg-[#DDD4EA] overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7A63A2] to-[#B69AD7]"
                    style={{
                      width: `${Math.min(
                        Math.max(
                          match.compatibility_score,
                          0
                        ),
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </>

          ) : (

            <div className="py-10 text-center">

              <UserRound className="mx-auto h-14 w-14 text-[#A28BBF]" />

              <h3 className="mt-4 text-xl font-black">

                No matches yet

              </h3>

              <p className="mt-2 text-sm text-[#726D7A]">

                Complete your roommate profile to receive
                recommendations.

              </p>

              <Link
                href="/roommates"
                className="mt-6 inline-flex rounded-xl bg-[#7A63A2] px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.03]"
              >

                Explore Roommates

              </Link>

            </div>

          )}

        </div>

        {/* Stats */}

        <div className="mt-5 grid grid-cols-3 gap-3">

          <Stat
            icon={<Users size={18}/>}
            label="Matches"
            value={roommates.total_matches}
          />

          <Stat
            icon={<Heart size={18}/>}
            label="Saved"
            value={roommates.favorites}
          />

          <Stat
            icon={<ArrowRight size={18}/>}
            label="Pending"
            value={roommates.pending_interests}
          />

        </div>

      </div>

    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}:{
  icon:React.ReactNode;
  label:string;
  value:number;
}){

return(

<div className="rounded-2xl bg-white p-5 shadow-sm">

<div className="flex items-center gap-2 text-[#7A63A2]">

{icon}

<span className="text-xs font-bold uppercase">

{label}

</span>

</div>

<p className="mt-3 text-3xl font-black">

{value}

</p>

</div>

);

}