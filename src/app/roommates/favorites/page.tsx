"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

import RoommateGrid from "@/components/roommates/RoommateGrid";
import ProfileSkeleton from "@/components/roommates/ProfileSkeleton";

import {
  expressInterest,
  getFavoriteRoommates,
  removeFavoriteRoommate,
} from "@/features/roommates/services/roommate.service";

import type { RoommateProfile } from "@/types/roommates";

export default function FavoriteRoommatesPage() {
  const [favorites, setFavorites] = useState<
    RoommateProfile[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    try {
      setLoading(true);

      const data = await getFavoriteRoommates();

      setFavorites(data);
    } catch {
      toast.error(
        "Unable to load favorite roommates."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFavorites();
  }, []);

  async function handleRemoveFavorite(
    id: number
  ) {
    try {
      await removeFavoriteRoommate(id);

      setFavorites((previous) =>
        previous.filter(
          (roommate) => roommate.id !== id
        )
      );

      toast.success(
        "Removed from favorites."
      );
    } catch {
      toast.error(
        "Unable to remove favorite."
      );
    }
  }

  async function handleInterest(id: number) {
    try {
      await expressInterest(id);

      setFavorites((previous) =>
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
        <section className="relative mb-10 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-rose-400/25 bg-rose-400/10">
                <Heart
                  size={30}
                  className="text-rose-300"
                  fill="currentColor"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Saved profiles
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#FBFAF7] sm:text-4xl">
                  Favorite Roommates
                </h1>

                <p className="mt-3 max-w-2xl leading-7 text-[#9EAEA7]">
                  View and manage the roommate
                  profiles you&apos;ve saved for
                  later.
                </p>
              </div>
            </div>

            {!loading && (
              <div className="flex items-center gap-3 rounded-[22px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A34F]/15">
                  <Sparkles
                    size={19}
                    className="text-[#F0C86A]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9EAEA7]">
                    Saved profiles
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#F0C86A]">
                    {favorites.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {loading ? (
          <ProfileSkeleton />
        ) : (
          <RoommateGrid
            roommates={favorites}
            onFavorite={handleRemoveFavorite}
            onInterest={handleInterest}
            emptyTitle="No favorite roommates yet"
            emptyDescription="Save profiles you like, and they will appear here for quick access."
          />
        )}
      </section>
    </main>
  );
}