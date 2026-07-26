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

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="grid md:grid-cols-[220px_1fr]">
        {/* Profile image */}

        <div className="relative min-h-[260px] bg-[#EEF2E4] md:min-h-full">
          <Image
            src={getProfileImage(roommate)}
            alt={`${roommate.name}'s roommate profile`}
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            className="object-cover"
          />

          <div className="absolute left-4 top-4">
            <CompatibilityBadge
              score={roommate.compatibility}
              size="sm"
            />
          </div>

          <button
            type="button"
            onClick={() => onFavorite?.(roommate.id)}
            disabled={favoriteLoading}
            className={[
              "absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition",
              roommate.is_favorite
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-white/80 bg-white/90 text-gray-600 hover:text-red-600",
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
        </div>

        {/* Main content */}

        <div className="flex flex-col p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {roommate.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {roommate.age} years • {roommate.gender}
              </p>
            </div>

            <div className="rounded-xl bg-[#EEF2E4] px-4 py-3 sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Monthly budget
              </p>

              <p className="mt-1 text-lg font-bold text-[#6B8E23]">
                {formatBudget(roommate.budget)}
              </p>
            </div>
          </div>

          {/* Basic details */}

          <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Briefcase
                size={17}
                className="shrink-0 text-[#6B8E23]"
              />

              <span className="truncate">
                {roommate.occupation}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin
                size={17}
                className="shrink-0 text-[#6B8E23]"
              />

              <span>
                {roommate.preferred_locality},{" "}
                {roommate.city}
              </span>
            </div>
          </div>

          {/* Lifestyle tags */}

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              roommate.food_preference,
              roommate.smoking,
              roommate.sleep_schedule,
              roommate.cleanliness,
              roommate.sharing_type,
            ].map((preference) => (
              <span
                key={preference}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {preference}
              </span>
            ))}
          </div>

          {/* AI explanation */}

          <div className="mt-5 rounded-2xl border border-[#D6C7A1] bg-[#FBFAF5] p-4">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-[#6B8E23]"
              />

              <h3 className="font-semibold text-[#6B8E23]">
                Why AI recommends this match
              </h3>
            </div>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {roommate.reason}
            </p>
          </div>

          {/* Shared preferences */}

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-900">
              Shared preferences
            </h3>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {roommate.shared_preferences.map(
                (preference) => (
                  <div
                    key={preference}
                    className="flex items-start gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{preference}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Actions */}

          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => onInterest?.(roommate.id)}
              disabled={
                interestLoading || interestAccepted
              }
              className={[
                "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition",
                interestAccepted
                  ? "cursor-default bg-green-100 text-green-700"
                  : interestPending
                    ? "border border-[#6B8E23] bg-[#EEF2E4] text-[#6B8E23]"
                    : "bg-[#6B8E23] text-white hover:opacity-90",
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
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#6B8E23] px-5 py-3 font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
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