"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import RoommateGrid from "@/components/roommates/RoommateGrid";
import RoommateSearchBar from "@/components/roommates/RoommateSearchBar";
import RoommateFilterSidebar from "@/components/roommates/RoommateFilterSidebar";
import RoommatePagination from "@/components/roommates/RoommatePagination";
import ProfileSkeleton from "@/components/roommates/ProfileSkeleton";

import {
  expressInterest,
  getRoommates,
  toggleFavoriteRoommate,
} from "@/features/roommates/services/roommate.service";

import type {
  RoommateFilters,
  RoommateProfile,
} from "@/types/roommates";

const initialFilters: RoommateFilters = {
  page: 1,
};

export default function RoommatesPage() {
  const [roommates, setRoommates] = useState<
    RoommateProfile[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filters, setFilters] =
    useState<RoommateFilters>(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  async function loadRoommates() {
    try {
      setLoading(true);

      const response = await getRoommates({
        ...filters,
        page: currentPage,
        search,
      });

      setRoommates(response.items);
      setTotalPages(response.total_pages);
    } catch {
      toast.error("Unable to load roommates.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRoommates();
  }, [filters, currentPage, search]);

  function handleClearFilters() {
    setCurrentPage(1);
    setFilters(initialFilters);
  }

  async function handleFavorite(id: number) {
    try {
      await toggleFavoriteRoommate(id);

      setRoommates((previous) =>
        previous.map((roommate) =>
          roommate.id === id
            ? {
                ...roommate,
                is_favorite: !roommate.is_favorite,
              }
            : roommate
        )
      );
    } catch {
      toast.error("Unable to update favorites.");
    }
  }

  async function handleInterest(id: number) {
    try {
      await expressInterest(id);

      setRoommates((previous) =>
        previous.map((roommate) =>
          roommate.id === id
            ? {
                ...roommate,
                interest_status: "pending",
              }
            : roommate
        )
      );

      toast.success("Interest sent successfully.");
    } catch {
      toast.error("Unable to send interest.");
    }
  }

  const hasResults = useMemo(
    () => roommates.length > 0,
    [roommates]
  );

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Perfect Roommate
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover compatible roommates using AI-powered
            lifestyle and preference matching.
          </p>
        </div>

        <RoommateSearchBar
          value={search}
          onChange={(value) => {
            setCurrentPage(1);
            setSearch(value);
          }}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside>
            <RoommateFilterSidebar
              filters={filters}
              onChange={(updated) => {
                setCurrentPage(1);
                setFilters(updated);
              }}
              onClear={handleClearFilters}
            />
          </aside>

          <section>
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <RoommateGrid
                  roommates={roommates}
                  onFavorite={handleFavorite}
                  onInterest={handleInterest}
                />

                {hasResults && (
                  <RoommatePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}