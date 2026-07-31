"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Sparkles, UsersRound } from "lucide-react";
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

      toast.success(
        "Interest sent successfully."
      );
    } catch {
      toast.error(
        "Unable to send interest."
      );
    }
  }

  const hasResults = useMemo(
    () => roommates.length > 0,
    [roommates]
  );

  const verifiedProfiles = useMemo(
    () =>
      roommates.filter(
        (roommate) => roommate.verified
      ).length,
    [roommates]
  );

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/30 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
              <Sparkles size={15} />
              AI Compatibility Matching
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
              Find Your
              <span className="block text-[#D4A34F]">
                Perfect Roommate
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C8C1] sm:text-lg">
              Discover compatible roommate
              profiles using lifestyle, budget,
              location and personality preferences
              to make moving to a new city easier.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={<UsersRound size={20} />}
                value={roommates.length.toString()}
                label="Profiles Found"
              />

              <StatCard
                icon={<Sparkles size={20} />}
                value="AI"
                label="Smart Matching"
              />

              <StatCard
                icon={<ShieldCheck size={20} />}
                value={verifiedProfiles.toString()}
                label="Verified Profiles"
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <RoommateSearchBar
            value={search}
            onChange={(value) => {
              setCurrentPage(1);
              setSearch(value);
            }}
          />
        </section>

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
            <div className="rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <>
                  <RoommateGrid
                    roommates={roommates}
                    onFavorite={handleFavorite}
                    onInterest={handleInterest}
                  />

                  {hasResults &&
                    totalPages > 1 && (
                      <div className="mt-10 flex justify-center border-t border-[#205C46]/30 pt-8">
                        <RoommatePagination
                          currentPage={
                            currentPage
                          }
                          totalPages={totalPages}
                          onPageChange={
                            setCurrentPage
                          }
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

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({
  icon,
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-[22px] border border-[#205C46]/40 bg-[#0F251E]/75 p-5 backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <p className="mt-4 text-3xl font-bold text-[#D4A34F]">
        {value}
      </p>

      <p className="mt-1 text-sm text-[#A8B6B0]">
        {label}
      </p>
    </div>
  );
}