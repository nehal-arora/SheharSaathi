"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
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
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-10 rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <Heart
                size={28}
                className="text-red-500"
                fill="currentColor"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Favorite Roommates
              </h1>

              <p className="mt-2 text-gray-600">
                View and manage the roommate
                profiles you&apos;ve saved.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <ProfileSkeleton />
        ) : (
          <RoommateGrid
            roommates={favorites}
            onFavorite={handleRemoveFavorite}
            onInterest={handleInterest}
          />
        )}
      </section>
    </main>
  );
}