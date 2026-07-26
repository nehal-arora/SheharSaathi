import axios from "axios";

import api from "@/lib/api";

import { getCompatibilityLabel } from "@/features/roommates/utils/roommate.utils";

import type {
  CreateRoommateProfileInput,
  ExpressInterestResponse,
  RoommateFilters,
  RoommateListResponse,
  RoommateProfile,
  RoommateRecommendation,
  RoommateRecommendationsResponse,
  UpdateRoommateProfileInput,
} from "@/types/roommates";

/* =========================================================
   BACKEND TYPES
========================================================= */

interface BackendRoommateProfile {
  id: number;
  user_id: number;

  name: string;
  age: number;
  gender: RoommateProfile["gender"];

  occupation: string;
  company_or_college: string;

  city: string;
  preferred_locality: string;
  budget: number;

  bio: string;
  profile_image: string;

  food_preference: RoommateProfile["food_preference"];

  smoking: boolean;
  drinking: boolean;
  pets: boolean;

  sleep_schedule: RoommateProfile["sleep_schedule"];
  wake_up_time: string;
  cleanliness: RoommateProfile["cleanliness"];
  guest_preference: RoommateProfile["guest_preference"];
  work_schedule: RoommateProfile["work_schedule"];

  languages: string[];

  preferred_gender: RoommateProfile["preferred_gender"];
  sharing_type: RoommateProfile["sharing_type"];
  move_in_date: string;
  lease_duration: number;

  compatibility?: number;
  compatibility_label?: RoommateProfile["compatibility_label"];
  shared_preferences?: string[];
  reason?: string;

  is_favorite?: boolean;

  created_at: string;
  updated_at: string;
}

interface BackendRoommatePayload {
  name: string;
  age: number;
  gender: CreateRoommateProfileInput["gender"];

  occupation: string;
  company_or_college: string;

  city: string;
  preferred_locality: string;
  budget: number;

  bio: string;
  profile_image: string;

  food_preference: CreateRoommateProfileInput["food_preference"];

  smoking: boolean;
  drinking: boolean;
  pets: boolean;

  sleep_schedule: CreateRoommateProfileInput["sleep_schedule"];
  wake_up_time: string;
  cleanliness: CreateRoommateProfileInput["cleanliness"];
  guest_preference: CreateRoommateProfileInput["guest_preference"];
  work_schedule: CreateRoommateProfileInput["work_schedule"];

  languages: string[];

  preferred_gender: CreateRoommateProfileInput["preferred_gender"];
  sharing_type: CreateRoommateProfileInput["sharing_type"];
  move_in_date: string;
  lease_duration: number;
}

interface BackendRoommateListResponse {
  items: BackendRoommateProfile[];
  total: number;
  total_pages: number;
  page?: number;
  limit?: number;
}

interface BackendMessageResponse {
  success?: boolean;
  message?: string;
}

/* =========================================================
   ERROR HANDLING
========================================================= */

function getErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData?.detail === "string") {
      return responseData.detail;
    }

    if (Array.isArray(responseData?.detail)) {
      const messages = responseData.detail
        .map((item: { msg?: string }) => item?.msg)
        .filter(
  (message: string | undefined): message is string =>
    typeof message === "string"
);

      if (messages.length > 0) {
        return messages.join(", ");
      }
    }

    if (typeof responseData?.message === "string") {
      return responseData.message;
    }

    if (error.response?.status === 401) {
      return "Your session has expired. Please log in again.";
    }

    if (error.response?.status === 403) {
      return "You are not allowed to perform this action.";
    }

    if (error.response?.status === 404) {
      return "The requested roommate profile was not found.";
    }

    if (error.response?.status === 409) {
      return "This action has already been completed.";
    }

    if (error.response?.status === 422) {
      return "Some submitted roommate details are invalid.";
    }

    if (error.response?.status === 500) {
      return "The roommate server encountered an error.";
    }

    if (!error.response) {
      return "Unable to connect to the backend server.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

/* =========================================================
   FRONTEND TO BACKEND CONVERSION
========================================================= */

function convertSmokingToBoolean(
  value: CreateRoommateProfileInput["smoking"]
): boolean {
  return value !== "Non-Smoker";
}

function convertDrinkingToBoolean(
  value: CreateRoommateProfileInput["drinking"]
): boolean {
  return value !== "Non-Drinker";
}

function convertPetsToBoolean(
  value: CreateRoommateProfileInput["pets"]
): boolean {
  return (
    value === "Have Pets" ||
    value === "Comfortable With Pets"
  );
}

function createBackendPayload(
  data: CreateRoommateProfileInput
): BackendRoommatePayload {
  return {
    name: data.name,
    age: data.age,
    gender: data.gender,

    occupation: data.occupation,
    company_or_college: data.company_or_college,

    city: data.city,
    preferred_locality: data.preferred_locality,
    budget: data.budget,

    bio: data.bio,
    profile_image: data.profile_image?.trim() ?? "",

    food_preference: data.food_preference,

    smoking: convertSmokingToBoolean(data.smoking),
    drinking: convertDrinkingToBoolean(data.drinking),
    pets: convertPetsToBoolean(data.pets),

    sleep_schedule: data.sleep_schedule,
    wake_up_time: data.wake_up_time,
    cleanliness: data.cleanliness,
    guest_preference: data.guest_preference,
    work_schedule: data.work_schedule,

    languages: data.languages,

    preferred_gender: data.preferred_gender,
    sharing_type: data.sharing_type,
    move_in_date: data.move_in_date,
    lease_duration: data.lease_duration,
  };
}

function createBackendUpdatePayload(
  data: UpdateRoommateProfileInput
): Partial<BackendRoommatePayload> {
  const payload: Partial<BackendRoommatePayload> = {};

  if (data.name !== undefined) {
    payload.name = data.name;
  }

  if (data.age !== undefined) {
    payload.age = data.age;
  }

  if (data.gender !== undefined) {
    payload.gender = data.gender;
  }

  if (data.occupation !== undefined) {
    payload.occupation = data.occupation;
  }

  if (data.company_or_college !== undefined) {
    payload.company_or_college =
      data.company_or_college;
  }

  if (data.city !== undefined) {
    payload.city = data.city;
  }

  if (data.preferred_locality !== undefined) {
    payload.preferred_locality =
      data.preferred_locality;
  }

  if (data.budget !== undefined) {
    payload.budget = data.budget;
  }

  if (data.bio !== undefined) {
    payload.bio = data.bio;
  }

  if (data.profile_image !== undefined) {
    payload.profile_image =
  data.profile_image?.trim() ?? "";
  }

  if (data.food_preference !== undefined) {
    payload.food_preference =
      data.food_preference;
  }

  if (data.smoking !== undefined) {
    payload.smoking =
      convertSmokingToBoolean(data.smoking);
  }

  if (data.drinking !== undefined) {
    payload.drinking =
      convertDrinkingToBoolean(data.drinking);
  }

  if (data.pets !== undefined) {
    payload.pets =
      convertPetsToBoolean(data.pets);
  }

  if (data.sleep_schedule !== undefined) {
    payload.sleep_schedule =
      data.sleep_schedule;
  }

  if (data.wake_up_time !== undefined) {
    payload.wake_up_time =
      data.wake_up_time;
  }

  if (data.cleanliness !== undefined) {
    payload.cleanliness = data.cleanliness;
  }

  if (data.guest_preference !== undefined) {
    payload.guest_preference =
      data.guest_preference;
  }

  if (data.work_schedule !== undefined) {
    payload.work_schedule =
      data.work_schedule;
  }

  if (data.languages !== undefined) {
    payload.languages = data.languages;
  }

  if (data.preferred_gender !== undefined) {
    payload.preferred_gender =
      data.preferred_gender;
  }

  if (data.sharing_type !== undefined) {
    payload.sharing_type =
      data.sharing_type;
  }

  if (data.move_in_date !== undefined) {
    payload.move_in_date =
      data.move_in_date;
  }

  if (data.lease_duration !== undefined) {
    payload.lease_duration = data.lease_duration;
  }

  return payload;
}

/* =========================================================
   BACKEND TO FRONTEND CONVERSION
========================================================= */

function parseLanguages(
  languages: string | string[] | null | undefined
): string[] {
  if (Array.isArray(languages)) {
    return languages
      .map((language) => language.trim())
      .filter(Boolean);
  }

  if (typeof languages !== "string") {
    return [];
  }

  return languages
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean);
}

function normalizeProfile(
  profile: BackendRoommateProfile
): RoommateProfile {
  return {
    ...profile,

    smoking: profile.smoking
      ? "Regularly"
      : "Non-Smoker",

    drinking: profile.drinking
      ? "Regularly"
      : "Non-Drinker",

    pets: profile.pets
      ? "Comfortable With Pets"
      : "Not Comfortable With Pets",

    languages: parseLanguages(profile.languages),

    is_favorite: Boolean(profile.is_favorite),

    interest_status: "none",

    compatibility:
      profile.compatibility ?? undefined,

    shared_preferences: Array.isArray(
      profile.shared_preferences
    )
      ? profile.shared_preferences
      : undefined,
  };
}

function normalizeProfiles(
  profiles: BackendRoommateProfile[]
): RoommateProfile[] {
  return profiles.map(normalizeProfile);
}

/* =========================================================
   QUERY PARAMETERS
========================================================= */

function buildRoommateQuery(
  filters: RoommateFilters
): Record<string, string | number | boolean> {
  const params: Record<
    string,
    string | number | boolean
  > = {};

  if (filters.page !== undefined) {
    params.page = filters.page;
  }

  if (filters.limit !== undefined) {
    params.limit = filters.limit;
  }

  if (filters.city?.trim()) {
    params.city = filters.city.trim();
  }

  if (filters.preferred_locality?.trim()) {
    params.preferred_locality =
      filters.preferred_locality.trim();
  }

  if (filters.min_budget !== undefined) {
    params.min_budget = filters.min_budget;
  }

  if (filters.max_budget !== undefined) {
    params.max_budget = filters.max_budget;
  }

  if (filters.gender) {
    params.gender = filters.gender;
  }

  if (filters.food_preference) {
    params.food_preference =
      filters.food_preference;
  }

  if (filters.smoking) {
    params.smoking =
      convertSmokingToBoolean(filters.smoking);
  }

  if (filters.drinking) {
    params.drinking =
      convertDrinkingToBoolean(filters.drinking);
  }

  if (filters.pets) {
    params.pets =
      convertPetsToBoolean(filters.pets);
  }

  if (filters.sharing_type) {
    params.sharing_type =
      filters.sharing_type;
  }

  return params;
}

/* =========================================================
   FRONTEND-ONLY FILTERS
========================================================= */

function matchesFrontendFilters(
  profile: RoommateProfile,
  filters: RoommateFilters
): boolean {
  const searchValue = filters.search
    ?.trim()
    .toLowerCase();

  if (searchValue) {
    const searchableText = [
      profile.name,
      profile.city,
      profile.preferred_locality,
      profile.occupation,
      profile.company_or_college,
      profile.bio,
      ...profile.languages,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (!searchableText.includes(searchValue)) {
      return false;
    }
  }

  if (
    filters.preferred_gender &&
    profile.preferred_gender !==
      filters.preferred_gender
  ) {
    return false;
  }

  if (
    filters.sleep_schedule &&
    profile.sleep_schedule !==
      filters.sleep_schedule
  ) {
    return false;
  }

  if (
    filters.cleanliness &&
    profile.cleanliness !==
      filters.cleanliness
  ) {
    return false;
  }

  if (
    filters.work_schedule &&
    profile.work_schedule !==
      filters.work_schedule
  ) {
    return false;
  }

  if (
    filters.move_in_date &&
    profile.move_in_date &&
    profile.move_in_date >
      filters.move_in_date
  ) {
    return false;
  }

  return true;
}

/* =========================================================
   GET ALL ROOMMATES
========================================================= */

export async function getRoommates(
  filters: RoommateFilters = {}
): Promise<RoommateListResponse> {
  try {
    const response =
      await api.get<BackendRoommateListResponse>(
        "/roommates",
        {
          params: buildRoommateQuery(filters),
        }
      );

    const backendData = response.data;

    const profiles = normalizeProfiles(
      backendData.items ?? []
    ).filter((profile) =>
      matchesFrontendFilters(profile, filters)
    );

    return {
      items: profiles,

      page:
        backendData.page ??
        filters.page ??
        1,

      limit:
        backendData.limit ??
        filters.limit ??
        (profiles.length || 6),

      total:
        backendData.total ??
        profiles.length,

      total_pages:
        backendData.total_pages ?? 1,
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to load roommate profiles."
      )
    );
  }
}

/* =========================================================
   GET ROOMMATE BY ID
========================================================= */

export async function getRoommateById(
  id: number
): Promise<RoommateProfile> {
  try {
    const response =
      await api.get<BackendRoommateProfile>(
        `/roommates/${id}`
      );

    return normalizeProfile(response.data);
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to load the roommate profile."
      )
    );
  }
}

/* =========================================================
   GET CURRENT PROFILE
========================================================= */

export async function getMyRoommateProfile(): Promise<
  RoommateProfile | null
> {
  try {
    const response =
      await api.get<BackendRoommateProfile>(
        "/roommates/me"
      );

    return normalizeProfile(response.data);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      return null;
    }

    throw new Error(
      getErrorMessage(
        error,
        "Unable to load your roommate profile."
      )
    );
  }
}

/* =========================================================
   CREATE PROFILE
========================================================= */

export async function createRoommateProfile(
  data: CreateRoommateProfileInput
): Promise<RoommateProfile> {
  try {
    const payload =
      createBackendPayload(data);

    const response =
      await api.post<BackendRoommateProfile>(
        "/roommates/profile",
        payload
      );

    return normalizeProfile(response.data);
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to create your roommate profile."
      )
    );
  }
}

/* =========================================================
   UPDATE PROFILE
========================================================= */

export async function updateRoommateProfile(
  data: UpdateRoommateProfileInput
): Promise<RoommateProfile> {
  try {
    const payload =
      createBackendUpdatePayload(data);

    const response =
      await api.put<BackendRoommateProfile>(
        "/roommates/me",
        payload
      );

    return normalizeProfile(response.data);
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to update your roommate profile."
      )
    );
  }
}

/* =========================================================
   DELETE PROFILE
========================================================= */

export async function deleteRoommateProfile(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response =
      await api.delete<BackendMessageResponse>(
        "/roommates/me"
      );

    return {
      success: response.data.success ?? true,

      message:
        response.data.message ??
        "Roommate profile deleted successfully.",
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to delete your roommate profile."
      )
    );
  }
}

/* =========================================================
   RECOMMENDATIONS
========================================================= */

export async function getRecommendedRoommates(): Promise<RoommateRecommendationsResponse> {
  try {
    const response =
      await api.get<BackendRoommateListResponse>(
        "/roommates/recommendations"
      );

    const profiles = normalizeProfiles(
      response.data.items ?? []
    );

    const recommendations: RoommateRecommendation[] =
      profiles.map((profile) => {
        const compatibility =
          profile.compatibility ?? 0;

        return {
          ...profile,

          compatibility,

          compatibility_label:
            profile.compatibility_label ??
            getCompatibilityLabel(compatibility),

          shared_preferences:
            profile.shared_preferences ?? [],

          reason:
            profile.reason ??
            "Recommended based on your roommate preferences.",
        };
      });

    return {
      items: recommendations,

      total:
        response.data.total ??
        recommendations.length,
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to load roommate recommendations."
      )
    );
  }
}

/* =========================================================
   GET FAVORITES
========================================================= */

export async function getFavoriteRoommates(): Promise<
  RoommateProfile[]
> {
  try {
    const response = await api.get<
      | BackendRoommateProfile[]
      | BackendRoommateListResponse
    >("/roommates/favorites");

    if (Array.isArray(response.data)) {
      return normalizeProfiles(response.data);
    }

    return normalizeProfiles(
      response.data.items ?? []
    );
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to load favorite roommates."
      )
    );
  }
}

/* =========================================================
   ADD FAVORITE
========================================================= */

export async function addFavoriteRoommate(
  roommateId: number
): Promise<RoommateProfile> {
  try {
    await api.post(
      `/roommates/favorites/${roommateId}`
    );

    const profile =
      await getRoommateById(roommateId);

    return {
      ...profile,
      is_favorite: true,
    };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 409
    ) {
      const profile =
        await getRoommateById(roommateId);

      return {
        ...profile,
        is_favorite: true,
      };
    }

    throw new Error(
      getErrorMessage(
        error,
        "Unable to add the roommate to favorites."
      )
    );
  }
}

/* =========================================================
   REMOVE FAVORITE
========================================================= */

export async function removeFavoriteRoommate(
  roommateId: number
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response =
      await api.delete<BackendMessageResponse>(
        `/roommates/favorites/${roommateId}`
      );

    return {
      success: response.data.success ?? true,

      message:
        response.data.message ??
        "Roommate removed from favorites.",
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to remove the roommate from favorites."
      )
    );
  }
}

/* =========================================================
   TOGGLE FAVORITE
========================================================= */

export async function toggleFavoriteRoommate(
  roommateId: number
): Promise<RoommateProfile> {
  try {
    const profile =
      await getRoommateById(roommateId);

    if (profile.is_favorite) {
      await removeFavoriteRoommate(roommateId);

      return {
        ...profile,
        is_favorite: false,
      };
    }

    return await addFavoriteRoommate(
      roommateId
    );
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Unable to update favorite status."
      )
    );
  }
}

/* =========================================================
   EXPRESS INTEREST
========================================================= */

export async function expressInterest(
  roommateId: number
): Promise<ExpressInterestResponse> {
  return {
    success: false,
    roommate_id: roommateId,
    interest_status: "none",
    message:
      "Express Interest is unavailable because its backend endpoint has not been implemented.",
  };
}