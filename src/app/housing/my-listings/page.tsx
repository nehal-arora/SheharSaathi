"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Edit3,
  Eye,
  Home,
  Loader2,
  MapPin,
  Plus,
  Power,
  RefreshCw,
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
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[500px] max-w-5xl items-center justify-center rounded-3xl border border-[#EEF2E4] bg-[#FBFAF5]">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2
              size={38}
              className="animate-spin text-[#6B8E23]"
            />

            <p className="font-medium text-gray-500">
              Loading your listings...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[500px] max-w-5xl items-center justify-center rounded-3xl border border-red-100 bg-[#FBFAF5] p-8">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-[#333333]">
              Unable to load listings
            </h1>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadListings()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              <RefreshCw size={18} />
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              My Listings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your uploaded housing properties.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/housing/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={19} />
            Add New Listing
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-[#EEF2E4] bg-[#FBFAF5] p-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EEF2E4] p-5 text-[#6B8E23]">
                <Home size={40} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#333333]">
                No listings yet
              </h2>

              <p className="mt-3 max-w-md text-gray-500">
                Create your first housing listing and it
                will appear here.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/housing/add")
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                <Plus size={19} />
                Create Listing
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {listings.map((listing) => {
              const isDeleting =
                deletingId === Number(listing.id);

              const isToggling =
                togglingId === Number(listing.id);

              return (
                <article
                  key={listing.id}
                  className="overflow-hidden rounded-3xl border border-[#EEF2E4] bg-[#FBFAF5] shadow-sm"
                >
                  <div className="relative h-56 bg-[#EEF2E4]">
                    <img
                      src={getPrimaryImage(listing)}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute left-4 top-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          listing.available
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {listing.available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    {listing.verified && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-[#6B8E23] px-3 py-1 text-xs font-bold text-white">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-[#333333]">
                          {listing.title}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={16} />

                          <span>
                            {listing.locality},{" "}
                            {listing.city}
                          </span>
                        </div>
                      </div>

                      <p className="shrink-0 text-lg font-bold text-[#6B8E23]">
                        {formatRent(listing.rent)}
                        <span className="text-xs font-medium text-gray-500">
                          /month
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#333333]">
                        {listing.house_type}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#333333]">
                        {listing.is_furnished
                          ? "Furnished"
                          : "Unfurnished"}
                      </span>

                      {listing.sharing_type && (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#333333]">
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-sm font-semibold text-[#333333] transition hover:bg-[#EEF2E4]"
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-sm font-semibold text-[#333333] transition hover:bg-[#EEF2E4]"
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6B8E23] bg-[#EEF2E4] px-4 py-3 text-sm font-semibold text-[#6B8E23] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
        )}
      </div>
    </main>
  );
}