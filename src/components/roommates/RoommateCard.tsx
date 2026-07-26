"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Heart,
  MapPin,
  MessageCircle,
  Utensils,
  Sparkles,
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
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}

      <div className="relative h-60 w-full">
        <Image
          src={
            roommate.profile_image ||
            "/placeholder-avatar.png"
          }
          alt={roommate.name}
          fill
          className="object-cover"
        />

        <div className="absolute right-3 top-3">
          <CompatibilityBadge
            score={roommate.compatibility ?? 0}
            size="sm"
          />
        </div>
      </div>

      {/* Content */}

      <div className="space-y-4 p-5">
        {/* Name */}

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {roommate.name}
          </h2>

          <p className="text-sm text-gray-500">
            {roommate.age} yrs • {roommate.gender}
          </p>
        </div>

        {/* Occupation */}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase size={16} />

          <span>{roommate.occupation}</span>
        </div>

        {/* Locality */}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />

          <span>
            {roommate.preferred_locality},{" "}
            {roommate.city}
          </span>
        </div>

        {/* Budget */}

        <div className="rounded-lg bg-[#EEF2E4] p-3">
          <p className="text-xs text-gray-500">
            Monthly Budget
          </p>

          <p className="text-lg font-bold text-[#6B8E23]">
            ₹{roommate.budget.toLocaleString()}/month
          </p>
        </div>

        {/* Lifestyle */}

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
            {roommate.food_preference}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
            {roommate.sleep_schedule}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
            {roommate.cleanliness}
          </span>
        </div>

        {/* AI Reason */}

        {roommate.reason && (
          <div className="rounded-xl border border-[#D6C7A1] bg-[#FBFAF5] p-3">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles
                size={16}
                className="text-[#6B8E23]"
              />

              <span className="text-sm font-semibold text-[#6B8E23]">
                AI Match Insight
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {roommate.reason}
            </p>
          </div>
        )}

        {/* Shared Preferences */}

        {roommate.shared_preferences &&
          roommate.shared_preferences.length >
            0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">
                Shared Preferences
              </p>

              <div className="flex flex-wrap gap-2">
                {roommate.shared_preferences
                  .slice(0, 3)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          )}

        {/* Buttons */}

        <div className="flex gap-2 pt-2">
          <button
            onClick={() =>
              onFavorite?.(roommate.id)
            }
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 transition ${
              roommate.is_favorite
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Heart
              size={18}
              fill={
                roommate.is_favorite
                  ? "currentColor"
                  : "none"
              }
            />

            Favorite
          </button>

          <button
            onClick={() =>
              onInterest?.(roommate.id)
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-4 py-3 font-medium text-white transition hover:opacity-90"
          >
            <MessageCircle size={18} />

            {roommate.interest_status ===
            "pending"
              ? "Pending"
              : "Interested"}
          </button>
        </div>

        {/* View Profile */}

        <Link
          href={`/roommates/${roommate.id}`}
          className="block rounded-xl border border-[#6B8E23] py-3 text-center font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}