import api, { getCurrentUser } from "@/lib/api";

import type {
  Housing,
  HousingFilters,
  HousingListResponse,
} from "@/types/housing";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

interface GetHousingParams extends HousingFilters {
  page?: number;
  limit?: number;
  page_size?: number;
  min_rent?: number;
}

export interface HousingPayload {
  title: string;
  description: string;
  rent: number;
  deposit: number;
  city: string;
  locality: string;
  address: string;
  house_type: string;
  sharing_type: string;
  gender_preference: string;
  is_furnished: boolean;
  available_from: string | null;
  contact_number: string;
  images: string[];
  available?: boolean;
}

/* =========================================================
   GET ALL LISTINGS
========================================================= */

export async function getHousing(
  filters: GetHousingParams = {}
): Promise<HousingListResponse> {
  const params = new URLSearchParams();

  params.set("page", String(filters.page ?? 1));

  params.set(
    "limit",
    String(filters.limit ?? filters.page_size ?? 10)
  );

  if (filters.city?.trim()) {
    params.set("city", filters.city.trim());
  }

  if (filters.locality?.trim()) {
    params.set("locality", filters.locality.trim());
  }

  if (
    filters.min_rent !== undefined &&
    filters.min_rent !== null
  ) {
    params.set("min_rent", String(filters.min_rent));
  }

  if (
    filters.max_rent !== undefined &&
    filters.max_rent !== null
  ) {
    params.set("max_rent", String(filters.max_rent));
  }

  if (filters.house_type?.trim()) {
    params.set("house_type", filters.house_type.trim());
  }

  const response = await fetch(
    `${API_BASE_URL}/housing/?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch housing listings.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default message.
    }

    throw new Error(message);
  }

  const data: HousingListResponse = await response.json();

  return {
    items: Array.isArray(data.items) ? data.items : [],
    total: data.total ?? 0,
    total_pages: data.total_pages ?? 1,
  };
}

/* =========================================================
   GET SINGLE LISTING
========================================================= */

export async function getHousingDetails(
  id: string | number
): Promise<Housing> {
  const response = await fetch(
    `${API_BASE_URL}/housing/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Housing listing not found.");
    }

    let message = "Failed to fetch housing details.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default message.
    }

    throw new Error(message);
  }

  return response.json();
}

/* =========================================================
   CREATE LISTING
========================================================= */

export async function createHousing(
  payload: HousingPayload
): Promise<Housing> {
  const response = await api.post<Housing>(
    "/housing/",
    payload
  );

  return response.data;
}

/* =========================================================
   GET LOGGED-IN USER LISTINGS
========================================================= */

export async function getMyListings(): Promise<Housing[]> {
  const currentUser = await getCurrentUser();

  const firstPage = await getHousing({
    page: 1,
    limit: 100,
  });

  let allListings = [...firstPage.items];

  const totalPages = firstPage.total_pages ?? 1;

if (totalPages > 1) {
    const remainingRequests = [];

    for (
      let page = 2;
      page <= totalPages;
      page += 1
    ) {
      remainingRequests.push(
        getHousing({
          page,
          limit: 100,
        })
      );
    }

    const remainingPages =
      await Promise.all(remainingRequests);

    for (const pageData of remainingPages) {
      allListings = [
        ...allListings,
        ...pageData.items,
      ];
    }
  }

  return allListings.filter(
    (listing) =>
      Number(listing.owner_id) === Number(currentUser.id)
  );
}

/* =========================================================
   UPDATE LISTING
========================================================= */

export async function updateHousing(
  id: string | number,
  payload: HousingPayload
): Promise<Housing> {
  const response = await api.put<Housing>(
    `/housing/${id}`,
    payload
  );

  return response.data;
}

/* =========================================================
   DELETE LISTING
========================================================= */

export async function deleteHousing(
  id: string | number
): Promise<void> {
  await api.delete(`/housing/${id}`);
}

/* =========================================================
   TOGGLE AVAILABILITY
========================================================= */

export async function toggleHousingAvailability(
  listing: Housing
): Promise<Housing> {
  const payload: HousingPayload = {
    title: listing.title,
    description: listing.description,
    rent: Number(listing.rent),
    deposit: Number(listing.deposit ?? 0),
    city: listing.city,
    locality: listing.locality,
    address: listing.address,
    house_type: listing.house_type,
    sharing_type:
      listing.sharing_type || "Not specified",
    gender_preference:
      listing.gender_preference || "Any",
    is_furnished: Boolean(listing.is_furnished),
    available_from:
      listing.available_from || null,
    contact_number: listing.contact_number,
    images: Array.isArray(listing.images)
      ? listing.images
      : [],
    available: !listing.available,
  };

  return updateHousing(listing.id, payload);
}