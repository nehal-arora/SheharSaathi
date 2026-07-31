"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Wallet,
} from "lucide-react";

import type { RoommateRecommendation } from "@/types/roommates";

import {
  formatBudget,
  getProfileImage,
} from "@/features/roommates/utils/roommate.utils";

import CompatibilityBadge from "./CompatibilityBadge";

interface RecommendationCardProps {
  roommate: RoommateRecommendation;
  onFavorite?: (id: number) => void;
  onInterest?: (id: number) => void;
  favoriteLoading?: boolean;
  interestLoading?: boolean;
}

export default function RecommendationCard({
  roommate,
  onFavorite,
  onInterest,
  favoriteLoading = false,
  interestLoading = false,
}: RecommendationCardProps) {
  const interestPending =
    roommate.interest_status === "pending";

  const interestAccepted =
    roommate.interest_status === "accepted";

  const sharedPreferences = Array.isArray(
    roommate.shared_preferences
  )
    ? roommate.shared_preferences
    : [];

  const lifestylePreferences = [
    roommate.food_preference,
    roommate.smoking,
    roommate.sleep_schedule,
    roommate.cleanliness,
    roommate.sharing_type,
  ].filter(
    (preference) =>
      typeof preference === "string" &&
      preference.trim().length > 0
  );

  return (
    <article className="group overflow-hidden rounded-[30px] border border-[#205C46]/45 bg-[#0D211B] shadow-[0_20px_55px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/45 hover:shadow-[0_28px_70px_rgba(0,0,0,0.34)]">
      <div className="grid md:grid-cols-[240px_1fr]">
        <div className="relative min-h-[290px] overflow-hidden bg-[#10271F] md:min-h-full">
          <Image
            src={getProfileImage(roommate)}
            alt={`${roommate.name}'s roommate profile`}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071512] via-[#071512]/15 to-transparent" />

          <div className="absolute left-4 top-4">
            <CompatibilityBadge
              score={roommate.compatibility}
              size="sm"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              onFavorite?.(roommate.id)
            }
            disabled={favoriteLoading}
            className={[
              "absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200",
              roommate.is_favorite
                ? "border-[#C96F65]/45 bg-[#C96F65]/18 text-[#F3A39A]"
                : "border-white/15 bg-[#071512]/70 text-[#D6E0DB] hover:border-[#D4A34F]/35 hover:text-[#F0C86A]",
              favoriteLoading
                ? "cursor-not-allowed opacity-60"
                : "",
            ].join(" ")}
            aria-label={
              roommate.is_favorite
                ? `Remove ${roommate.name} from favorites`
                : `Add ${roommate.name} to favorites`
            }
          >
            <Heart
              size={20}
              fill={
                roommate.is_favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="text-2xl font-bold tracking-tight text-[#FBFAF7]">
              {roommate.name}
            </h2>

            <p className="mt-1 text-sm text-[#C5D0CB]">
              {roommate.age} years • {roommate.gender}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9EAEA7]">
                Recommended match
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#FBFAF7]">
                Strong lifestyle compatibility
              </h3>
            </div>

            <div className="rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 py-3 sm:min-w-[170px] sm:text-right">
              <div className="flex items-center gap-2 text-[#F0C86A] sm:justify-end">
                <Wallet size={16} />

                <p className="text-xs font-medium uppercase tracking-[0.12em]">
                  Monthly budget
                </p>
              </div>

              <p className="mt-2 text-lg font-bold text-[#F0C86A]">
                {formatBudget(roommate.budget)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#205C46]/35 bg-[#10271F] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#205C46]/25 text-[#F0C86A]">
                <Briefcase size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#9EAEA7]">
                  Occupation
                </p>

                <p className="truncate text-sm font-semibold text-[#FBFAF7]">
                  {roommate.occupation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#205C46]/35 bg-[#10271F] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#205C46]/25 text-[#F0C86A]">
                <MapPin size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#9EAEA7]">
                  Preferred location
                </p>

                <p className="truncate text-sm font-semibold text-[#FBFAF7]">
                  {roommate.preferred_locality},{" "}
                  {roommate.city}
                </p>
              </div>
            </div>
          </div>

          {lifestylePreferences.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#9EAEA7]">
                Lifestyle preferences
              </p>

              <div className="flex flex-wrap gap-2">
                {lifestylePreferences.map(
                  (preference, index) => (
                    <span
                      key={`${preference}-${index}`}
                      className="rounded-full border border-[#205C46]/45 bg-[#10271F] px-3 py-1.5 text-xs font-medium text-[#D6E0DB]"
                    >
                      {preference}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-[#D4A34F]/30 bg-gradient-to-br from-[#D4A34F]/12 to-[#10271F] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4A34F]/15 text-[#F0C86A]">
                <Sparkles size={18} />
              </div>

              <h3 className="font-semibold text-[#F0C86A]">
                Why AI recommends this match
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#C5D0CB]">
              {roommate.reason ||
                "This profile matches several of your roommate preferences."}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#FBFAF7]">
              Shared preferences
            </h3>

            {sharedPreferences.length > 0 ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {sharedPreferences.map(
                  (preference, index) => (
                    <div
                      key={`${preference}-${index}`}
                      className="flex items-start gap-2 rounded-xl border border-[#205C46]/35 bg-[#10271F] px-3 py-2.5 text-sm text-[#D6E0DB]"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-[#F0C86A]"
                      />

                      <span>{preference}</span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#9EAEA7]">
                No shared preferences were returned.
              </p>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                onInterest?.(roommate.id)
              }
              disabled={
                interestLoading || interestAccepted
              }
              className={[
                "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200",
                interestAccepted
                  ? "cursor-default border border-[#4C8C68]/35 bg-[#205C46]/25 text-[#A8E6BD]"
                  : interestPending
                    ? "border border-[#D4A34F]/35 bg-[#D4A34F]/10 text-[#F0C86A] hover:bg-[#D4A34F]/15"
                    : "bg-[#D4A34F] text-[#071512] shadow-[0_10px_24px_rgba(212,163,79,0.18)] hover:bg-[#F0C86A]",
                interestLoading
                  ? "cursor-not-allowed opacity-60"
                  : "",
              ].join(" ")}
            >
              <MessageCircle size={18} />

              {interestLoading
                ? "Updating..."
                : interestAccepted
                  ? "Interest Accepted"
                  : interestPending
                    ? "Withdraw Interest"
                    : "Express Interest"}
            </button>

            <Link
              href={`/roommates/${roommate.id}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#D4A34F]/35 px-5 py-3 text-sm font-semibold text-[#F0C86A] transition-all duration-200 hover:bg-[#D4A34F]/10"
            >
              View Profile
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}