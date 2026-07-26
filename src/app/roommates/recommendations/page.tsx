"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import RecommendationCard from "@/components/roommates/RecommendationCard";
import ProfileSkeleton from "@/components/roommates/ProfileSkeleton";

import {
  expressInterest,
  getRecommendedRoommates,
  toggleFavoriteRoommate,
} from "@/features/roommates/services/roommate.service";

import type {
  RoommateRecommendation,
} from "@/types/roommates";

export default function RoommateRecommendationsPage() {
  const [recommendations, setRecommendations] =
    useState<RoommateRecommendation[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadRecommendations() {
    try {
      setLoading(true);

      const response =
        await getRecommendedRoommates();

      setRecommendations(response.items);
    } catch {
      toast.error(
        "Unable to load AI recommendations."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRecommendations();
  }, []);

  async function handleFavorite(id: number) {
    try {
      await toggleFavoriteRoommate(id);

      setRecommendations((previous) =>
        previous.map((roommate) =>
          roommate.id === id
            ? {
                ...roommate,
                is_favorite:
                  !roommate.is_favorite,
              }
            : roommate
        )
      );
    } catch {
      toast.error(
        "Unable to update favorites."
      );
    }
  }

  async function handleInterest(id: number) {
    try {
      await expressInterest(id);

      setRecommendations((previous) =>
        previous.map((roommate) =>
          roommate.id === id
            ? {
                ...roommate,
                interest_status: "pending",
              }
            : roommate
        )
      );

      toast.success(
        "Interest sent successfully."
      );
    } catch {
      toast.error(
        "Unable to express interest."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-[#6B8E23] to-[#87A93A] p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <Sparkles size={32} />

            <h1 className="text-3xl font-bold">
              AI Roommate Recommendations
            </h1>
          </div>

          <p className="mt-4 max-w-3xl text-white/90">
            Based on your lifestyle,
            preferences, budget, location,
            and compatibility score, our AI
            recommends the roommates most
            likely to be a great match.
          </p>
        </div>

        {loading ? (
          <ProfileSkeleton />
        ) : recommendations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Sparkles
              size={48}
              className="mx-auto text-[#6B8E23]"
            />

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No recommendations available
            </h2>

            <p className="mt-3 text-gray-600">
              Complete your roommate profile
              to receive AI-powered matches.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {recommendations.map(
              (recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  roommate={recommendation}
                  onFavorite={
                    handleFavorite
                  }
                  onInterest={
                    handleInterest
                  }
                />
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}