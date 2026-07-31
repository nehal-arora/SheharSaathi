"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  BadgeCheck,
  Building2,
  Edit3,
  Eye,
  Home,
  Loader2,
  MapPin,
  Plus,
  Power,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  deleteHousing,
  getMyListings,
  toggleHousingAvailability,
} from "@/services/housing";

import type { Housing } from "@/types/housing";

function formatRent(value: number | string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function getPrimaryImage(listing: Housing) {
  if (
    Array.isArray(listing.images) &&
    listing.images.length > 0
  ) {
    return listing.images[0];
  }

  return "/placeholder-property.jpg";
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (error.response?.status === 401) {
      return "Your session has expired. Please log in again.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

export default function MyListingsPage() {
  const router = useRouter();

  const [listings, setListings] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] =
    useState<number | null>(null);
  const [togglingId, setTogglingId] =
    useState<number | null>(null);

  const loadListings = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please log in to view your listings.");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getMyListings();

      setListings(data);
    } catch (loadError) {
      const message = getErrorMessage(loadError);

      setError(message);

      if (
        axios.isAxiosError(loadError) &&
        loadError.response?.status === 401
      ) {
        localStorage.removeItem("access_token");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  async function handleDelete(listing: Housing) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${listing.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(Number(listing.id));

      await deleteHousing(listing.id);

      setListings((currentListings) =>
        currentListings.filter(
          (item) =>
            Number(item.id) !== Number(listing.id)
        )
      );

      toast.success("Listing deleted successfully.");
    } catch (deleteError) {
      toast.error(getErrorMessage(deleteError));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleAvailability(
    listing: Housing
  ) {
    try {
      setTogglingId(Number(listing.id));

      const updatedListing =
        await toggleHousingAvailability(listing);

      setListings((currentListings) =>
        currentListings.map((item) =>
          Number(item.id) === Number(listing.id)
            ? updatedListing
            : item
        )
      );

      toast.success(
        updatedListing.available
          ? "Listing marked as available."
          : "Listing marked as unavailable."
      );
    } catch (toggleError) {
      toast.error(getErrorMessage(toggleError));
    } finally {
      setTogglingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[520px] max-w-6xl items-center justify-center rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#122A22]">
              <Loader2 className="h-8 w-8 animate-spin text-[#F0C86A]" />
            </div>

            <div>
              <p className="text-lg font-semibold text-[#FBFAF7]">
                Loading your listings
              </p>

              <p className="mt-1 text-sm text-[#9EAEA7]">
                Fetching your uploaded properties...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[520px] max-w-6xl items-center justify-center rounded-[32px] border border-red-400/20 bg-[#0D211B] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
              <RefreshCw className="h-8 w-8 text-red-300" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#FBFAF7]">
              Unable to load listings
            </h1>

            <p className="mt-3 text-[#9EAEA7]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadListings()}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#10251D] transition hover:bg-[#E5B65B]"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[32px] border border-[#D4A34F]/15 bg-gradient-to-br from-[#0D211B] via-[#143126] to-[#205C46] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-8 px-6 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#071512]/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles size={14} />
                Property Management
              </div>

              <h1 className="mt-5 text-4xl font-bold text-[#FBFAF7] sm:text-5xl">
                My Listings
              </h1>

              <p className="mt-3 max-w-2xl text-[#C5D0CB]">
                Manage, update, and track all your uploaded housing properties from one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-2xl border border-[#D4A34F]/15 bg-[#071512]/45 px-5 py-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                  Total Listings
                </p>

                <p className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                  {listings.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/housing/add")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-4 font-semibold text-[#10251D] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[#E5B65B]"
              >
                <Plus size={19} />
                Add New Listing
              </button>
            </div>
          </div>
        </section>

        {listings.length === 0 ? (
          <section className="mt-8 rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#D4A34F]/20 bg-[#122A22] text-[#F0C86A]">
                <Home size={38} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#FBFAF7]">
                No listings yet
              </h2>

              <p className="mt-3 max-w-md text-[#9EAEA7]">
                Create your first housing listing and it will appear here.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/housing/add")
                }
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#10251D] transition hover:bg-[#E5B65B]"
              >
                <Plus size={19} />
                Create Listing
              </button>
            </div>
          </section>
        ) : (
          <section className="mt-8 grid gap-7 md:grid-cols-2">
            {listings.map((listing) => {
              const isDeleting =
                deletingId === Number(listing.id);

              const isToggling =
                togglingId === Number(listing.id);

              return (
                <article
                  key={listing.id}
                  className="group overflow-hidden rounded-[30px] border border-[#D4A34F]/12 bg-[#0D211B] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-[#D4A34F]/25"
                >
                  <div className="relative h-60 overflow-hidden bg-[#122A22]">
                    <img
                      src={getPrimaryImage(listing)}
                      alt={listing.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071512]/85 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur ${
                          listing.available
                            ? "border-emerald-300/20 bg-emerald-400/15 text-emerald-200"
                            : "border-white/15 bg-black/30 text-[#D5DDD9]"
                        }`}
                      >
                        {listing.available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    {listing.verified && (
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A34F]/25 bg-[#071512]/70 px-3 py-1.5 text-xs font-bold text-[#F0C86A] backdrop-blur">
                          <BadgeCheck size={14} />
                          Verified
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate text-2xl font-bold text-white">
                          {listing.title}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-sm text-[#D3DDD8]">
                          <MapPin size={16} className="text-[#F0C86A]" />

                          <span className="truncate">
                            {listing.locality}, {listing.city}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-2xl border border-[#D4A34F]/20 bg-[#071512]/70 px-4 py-3 text-right backdrop-blur">
                        <p className="text-lg font-bold text-[#F0C86A]">
                          {formatRent(listing.rent)}
                        </p>

                        <p className="text-xs text-[#9EAEA7]">
                          per month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A34F]/12 bg-[#122A22] px-3 py-2 text-xs font-semibold text-[#DCE5E0]">
                        <Building2 size={14} className="text-[#F0C86A]" />
                        {listing.house_type}
                      </span>

                      <span className="rounded-full border border-[#D4A34F]/12 bg-[#122A22] px-3 py-2 text-xs font-semibold text-[#DCE5E0]">
                        {listing.is_furnished
                          ? "Furnished"
                          : "Unfurnished"}
                      </span>

                      {listing.sharing_type && (
                        <span className="rounded-full border border-[#D4A34F]/12 bg-[#122A22] px-3 py-2 text-xs font-semibold text-[#DCE5E0]">
                          {listing.sharing_type}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/housing/${listing.id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 py-3 text-sm font-semibold text-[#FBFAF7] transition hover:bg-[#122A22]"
                      >
                        <Eye size={17} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/housing/edit/${listing.id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 py-3 text-sm font-semibold text-[#FBFAF7] transition hover:bg-[#122A22]"
                      >
                        <Edit3 size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleToggleAvailability(
                            listing
                          )
                        }
                        disabled={
                          isToggling || isDeleting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 py-3 text-sm font-semibold text-[#F0C86A] transition hover:bg-[#D4A34F]/15 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isToggling ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Power size={17} />
                        )}

                        {listing.available
                          ? "Mark Unavailable"
                          : "Mark Available"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDelete(listing)
                        }
                        disabled={
                          isDeleting || isToggling
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={17} />
                        )}

                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}