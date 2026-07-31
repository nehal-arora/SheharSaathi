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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-8 shadow-[0_26px_80px_rgba(0,0,0,0.32)]">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-[#D4A34F]/30 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
              AI Compatibility Matching
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] md:text-5xl">
              Find Your
              <span className="block text-[#D4A34F]">
                Perfect Roommate
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#B8C8C1]">
              Discover compatible roommate profiles
              using lifestyle, budget, location and
              personality preferences to make moving
              to a new city easier and safer.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#205C46]/40 bg-[#0F251E]/70 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-[#D4A34F]">
                  {roommates.length}
                </p>

                <p className="mt-1 text-sm text-[#A8B6B0]">
                  Profiles Found
                </p>
              </div>

              <div className="rounded-2xl border border-[#205C46]/40 bg-[#0F251E]/70 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-[#D4A34F]">
                  AI
                </p>

                <p className="mt-1 text-sm text-[#A8B6B0]">
                  Smart Matching
                </p>
              </div>

              <div className="rounded-2xl border border-[#205C46]/40 bg-[#0F251E]/70 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-[#D4A34F]">
                  Smart
                </p>

                <p className="mt-1 text-sm text-[#A8B6B0]">
                  Compatibility Scoring
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}

        <section className="mt-8">
          <RoommateSearchBar
            value={search}
            onChange={(value) => {
              setCurrentPage(1);
              setSearch(value);
            }}
          />
        </section>

        {/* Content */}

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6">
            <RoommateFilterSidebar
              filters={filters}
              onChange={(updated) => {
                setCurrentPage(1);
                setFilters(updated);
              }}
              onClear={handleClearFilters}
            />
          </aside>

          <section className="min-w-0">
            <div className="rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <>
                  <RoommateGrid
                    roommates={roommates}
                    onFavorite={handleFavorite}
                    onInterest={handleInterest}
                  />

                  {hasResults && totalPages > 1 && (
                    <div className="mt-8 flex justify-center border-t border-[#205C46]/30 pt-8">
                      <RoommatePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}