"use client";

import { useEffect, useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  Stars,
} from "lucide-react";
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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/30 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
              <Sparkles size={15} />
              Personalized AI Matches
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
                  Your Best
                  <span className="block text-[#D4A34F]">
                    Roommate Matches
                  </span>
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C8C1] sm:text-lg">
                  These recommendations are selected
                  using your lifestyle, budget,
                  location and roommate preferences
                  to help you find stronger matches.
                </p>
              </div>

              <div className="flex w-fit items-center gap-4 rounded-[22px] border border-[#205C46]/40 bg-[#0F251E]/75 px-5 py-4 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <BrainCircuit size={25} />
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#FBFAF7]">
                    {recommendations.length}
                  </p>

                  <p className="text-sm text-[#9EAEA7]">
                    Recommended matches
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6">
              <ProfileSkeleton />
            </div>
          ) : recommendations.length === 0 ? (
            <div className="relative overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/30 bg-[#0D211B] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-12">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Stars size={36} />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-[#FBFAF7]">
                  No recommendations available
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-[#9EAEA7]">
                  Complete or update your roommate
                  profile so the matching system can
                  generate more relevant
                  recommendations for you.
                </p>
              </div>
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
      </section>
    </main>
  );
}