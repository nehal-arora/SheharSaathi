import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  UserCheck,
  Star,
  MapPin,
} from "lucide-react";

import type { DashboardRoommateSummary } from "@/features/dashboard/types/dashboard.types";

interface RoommateWidgetProps {
  roommates: DashboardRoommateSummary;
}

export default function RoommateWidget({
  roommates,
}: RoommateWidgetProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Roommate Matches
            </h2>

            <p className="text-sm text-neutral-500">
              Find compatible roommates
            </p>
          </div>
        </div>

        <Link
          href="/roommates"
          className="flex items-center gap-1 text-sm font-medium text-[#6B8E23]"
        >
          View
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-neutral-50 p-3">
          <p className="text-2xl font-bold">
            {roommates.total_matches}
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Matches
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-[#6B8E23]" />

            <p className="text-2xl font-bold">
              {roommates.favorites}
            </p>
          </div>

          <p className="mt-1 text-xs text-neutral-500">
            Favorites
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="flex items-center gap-1">
            <UserCheck className="h-4 w-4 text-[#6B8E23]" />

            <p className="text-2xl font-bold">
              {roommates.pending_interests}
            </p>
          </div>

          <p className="mt-1 text-xs text-neutral-500">
            Pending
          </p>
        </div>
      </div>

      {roommates.top_match && (
        <div className="mt-5 rounded-xl border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Best Match
          </p>

          <h3 className="mt-2 font-semibold">
            {roommates.top_match.name}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-4 w-4" />
            {roommates.top_match.locality}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

            <span className="font-semibold text-[#6B8E23]">
              {roommates.top_match.compatibility_score}% Compatible
            </span>
          </div>
        </div>
      )}
    </section>
  );
}