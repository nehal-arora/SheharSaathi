"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Wallet,
} from "lucide-react";

import type { RoommateProfile } from "@/types/roommates";
import CompatibilityBadge from "./CompatibilityBadge";

interface RoommateCardProps {
  roommate: RoommateProfile;
  onFavorite?: (id: number) => void;
  onInterest?: (id: number) => void;
}

export default function RoommateCard({
  roommate,
  onFavorite,
  onInterest,
}: RoommateCardProps) {
  const isFavorite = Boolean(roommate.is_favorite);
  const isInterestPending =
    roommate.interest_status === "pending";

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#205C46]/45 bg-[#0D211B] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A34F]/50 hover:shadow-[0_24px_65px_rgba(0,0,0,0.32)]">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={
            roommate.profile_image ||
            "/placeholder-avatar.png"
          }
          alt={roommate.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071512] via-[#071512]/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full border border-white/15 bg-[#071512]/75 px-3 py-1.5 text-xs font-semibold text-[#FBFAF7] backdrop-blur-md">
            {roommate.age} yrs • {roommate.gender}
          </span>
        </div>

        <div className="absolute right-4 top-4">
          <CompatibilityBadge
            score={roommate.compatibility ?? 0}
            size="sm"
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#FBFAF7]">
            {roommate.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-[#D6E0DB]">
            <MapPin
              size={16}
              className="shrink-0 text-[#F0C86A]"
            />

            <span className="truncate">
              {roommate.preferred_locality},{" "}
              {roommate.city}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#205C46]/35 bg-[#10271F] p-4">
            <div className="flex items-center gap-2 text-[#9EAEA7]">
              <Briefcase size={16} />

              <span className="text-xs font-medium uppercase tracking-[0.14em]">
                Occupation
              </span>
            </div>

            <p className="mt-2 line-clamp-1 font-semibold text-[#FBFAF7]">
              {roommate.occupation}
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 p-4">
            <div className="flex items-center gap-2 text-[#F0C86A]">
              <Wallet size={16} />

              <span className="text-xs font-medium uppercase tracking-[0.14em]">
                Monthly Budget
              </span>
            </div>

            <p className="mt-2 text-lg font-bold text-[#F0C86A]">
              ₹{roommate.budget.toLocaleString()}
              <span className="ml-1 text-xs font-medium text-[#C8B98B]">
                /month
              </span>
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#9EAEA7]">
            Lifestyle preferences
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#205C46]/45 bg-[#10271F] px-3 py-1.5 text-xs font-medium text-[#D6E0DB]">
              {roommate.food_preference}
            </span>

            <span className="rounded-full border border-[#205C46]/45 bg-[#10271F] px-3 py-1.5 text-xs font-medium text-[#D6E0DB]">
              {roommate.sleep_schedule}
            </span>

            <span className="rounded-full border border-[#205C46]/45 bg-[#10271F] px-3 py-1.5 text-xs font-medium text-[#D6E0DB]">
              {roommate.cleanliness}
            </span>
          </div>
        </div>

        {roommate.reason && (
          <div className="rounded-2xl border border-[#D4A34F]/30 bg-gradient-to-br from-[#D4A34F]/12 to-[#10271F] p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A34F]/15">
                <Sparkles
                  size={16}
                  className="text-[#F0C86A]"
                />
              </div>

              <span className="text-sm font-semibold text-[#F0C86A]">
                AI Match Insight
              </span>
            </div>

            <p className="line-clamp-3 text-sm leading-6 text-[#C5D0CB]">
              {roommate.reason}
            </p>
          </div>
        )}

        {roommate.shared_preferences &&
          roommate.shared_preferences.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#9EAEA7]">
                Shared preferences
              </p>

              <div className="flex flex-wrap gap-2">
                {roommate.shared_preferences
                  .slice(0, 3)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-3 py-1.5 text-xs font-medium text-[#F0C86A]"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          )}

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() =>
              onFavorite?.(roommate.id)
            }
            aria-label={
              isFavorite
                ? `Remove ${roommate.name} from favorites`
                : `Add ${roommate.name} to favorites`
            }
            className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              isFavorite
                ? "border-[#C96F65]/45 bg-[#C96F65]/12 text-[#F3A39A] hover:bg-[#C96F65]/18"
                : "border-[#205C46]/45 bg-[#10271F] text-[#D6E0DB] hover:border-[#D4A34F]/35 hover:text-[#F0C86A]"
            }`}
          >
            <Heart
              size={18}
              fill={
                isFavorite
                  ? "currentColor"
                  : "none"
              }
            />

            {isFavorite ? "Saved" : "Favorite"}
          </button>

          <button
            type="button"
            onClick={() =>
              onInterest?.(roommate.id)
            }
            disabled={isInterestPending}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              isInterestPending
                ? "cursor-not-allowed border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#C8B98B]"
                : "bg-[#D4A34F] text-[#071512] shadow-[0_10px_24px_rgba(212,163,79,0.18)] hover:bg-[#F0C86A]"
            }`}
          >
            <MessageCircle size={18} />

            {isInterestPending
              ? "Pending"
              : "Interested"}
          </button>
        </div>

        <Link
          href={`/roommates/${roommate.id}`}
          className="block rounded-2xl border border-[#D4A34F]/35 bg-transparent py-3.5 text-center text-sm font-semibold text-[#F0C86A] transition-all duration-200 hover:bg-[#D4A34F]/10"
        >
          View Full Profile
        </Link>
      </div>
    </article>
  );
}