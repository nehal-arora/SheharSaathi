"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Building2,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  HousingFilters,
  Housing,
} from "@/types/housing";

import { getHousing } from "@/services/housing";

import HousingGrid from "@/components/housing/HousingGrid";
import HousingEmpty from "@/components/housing/HousingEmpty";
import SearchBar from "@/components/housing/SearchBar";
import FilterSidebar from "@/components/housing/FilterSidebar";
import Pagination from "@/components/housing/Pagination";

export default function HousingPage() {
  const [listings, setListings] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<HousingFilters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchHousing() {
    try {
      setLoading(true);

      const response = await getHousing({
        ...filters,
        page,
        page_size: 8,
      });

      setListings(response.items);
      setTotalPages(response.total_pages ?? 1);
    } catch (error) {
      console.error("Failed to fetch housing:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHousing();
  }, [filters, page]);

  function handleSearch(value: string) {
    setFilters((previous) => ({
      ...previous,
      city: value,
    }));

    setPage(1);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#071512]">
      <section className="relative border-b border-[#D4A34F]/15">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#205C46]/20 blur-[120px]" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#D4A34F]/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/8 px-4 py-2 text-sm font-semibold text-[#F0C86A]">
              <Home className="h-4 w-4" />
              Housing Marketplace
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
              Find a home that feels
              <span className="block text-[#D4A34F]">
                right from day one.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#9EAEA7] sm:text-lg">
              Discover verified rentals, PGs, shared spaces, and student-friendly
              homes across your city.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <FeaturePill
                icon={ShieldCheck}
                label="Verified listings"
              />

              <FeaturePill
                icon={Building2}
                label="Multiple property types"
              />

              <FeaturePill
                icon={Sparkles}
                label="Smart city search"
              />
            </div>
          </div>

          <div className="mt-10 max-w-3xl rounded-3xl border border-[#D4A34F]/18 bg-[#0D211B]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-5">
            <div className="mb-3 flex items-center gap-2 px-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4A34F] text-[#10251D]">
                <Search className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#FBFAF7]">
                  Search by city
                </p>

                <p className="text-xs text-[#9EAEA7]">
                  Find suitable homes near your preferred location.
                </p>
              </div>
            </div>

            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#205C46]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#D4A34F]">
                <MapPin className="h-4 w-4" />
                Explore listings
              </div>

              <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7] sm:text-3xl">
                Homes selected for your move
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                Use the filters to narrow your search by budget, location, and
                property preferences.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#D4A34F]/15 bg-[#0D211B] px-4 py-3 text-sm text-[#9EAEA7] sm:self-auto">
              <BadgeCheck className="h-4 w-4 text-[#D4A34F]" />
              {loading
                ? "Loading listings..."
                : `${listings.length} listing${
                    listings.length === 1 ? "" : "s"
                  } on this page`}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="self-start lg:sticky lg:top-24">
              <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] p-1 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                <FilterSidebar
                  filters={filters}
                  onChange={(updatedFilters) => {
                    setFilters(updatedFilters);
                    setPage(1);
                  }}
                />
              </div>
            </aside>

            <section className="min-w-0">
              <HousingGrid
                listings={listings}
                loading={loading}
              />

              {!loading && listings.length > 0 && (
                <div className="mt-10 rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}

              {!loading && listings.length === 0 && (
                <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.26)]">
                  <HousingEmpty />
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

interface FeaturePillProps {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
}

function FeaturePill({
  icon: Icon,
  label,
}: FeaturePillProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#D4A34F]/12 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-[#C4CEC9] backdrop-blur-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/40 text-[#A6CEB5]">
        <Icon className="h-[18px] w-[18px]" />
      </div>

      {label}
    </div>
  );
}