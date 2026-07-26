import {
  mockCurrentRoommateProfile,
  mockRoommates,
} from "@/features/roommates/mock/mockRoommates";

import {
  getCompatibilityLabel,
  matchesSearch,
  sortByCompatibility,
} from "@/features/roommates/utils/roommate.utils";

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

let roommateProfiles: RoommateProfile[] = [
  ...mockRoommates,
];

let currentUserProfile: RoommateProfile | null = {
  ...mockCurrentRoommateProfile,
};

const delay = (milliseconds = 400) =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );

function cloneProfile(
  profile: RoommateProfile
): RoommateProfile {
  return {
    ...profile,
    languages: [...profile.languages],
    shared_preferences: profile.shared_preferences
      ? [...profile.shared_preferences]
      : undefined,
  };
}

function cloneProfiles(
  profiles: RoommateProfile[]
): RoommateProfile[] {
  return profiles.map(cloneProfile);
}

function applyFilters(
  profiles: RoommateProfile[],
  filters: RoommateFilters
): RoommateProfile[] {
  return profiles.filter((profile) => {
    if (
      filters.search &&
      !matchesSearch(profile, filters.search)
    ) {
      return false;
    }

    if (
      filters.city &&
      profile.city.toLowerCase() !==
        filters.city.toLowerCase()
    ) {
      return false;
    }

    if (
      filters.preferred_locality &&
      profile.preferred_locality
        .toLowerCase()
        .includes(
          filters.preferred_locality.toLowerCase()
        ) === false
    ) {
      return false;
    }

    if (
      filters.min_budget !== undefined &&
      profile.budget < filters.min_budget
    ) {
      return false;
    }

    if (
      filters.max_budget !== undefined &&
      profile.budget > filters.max_budget
    ) {
      return false;
    }

    if (
      filters.gender &&
      profile.gender !== filters.gender
    ) {
      return false;
    }

    if (
      filters.preferred_gender &&
      profile.preferred_gender !==
        filters.preferred_gender
    ) {
      return false;
    }

    if (
      filters.food_preference &&
      profile.food_preference !==
        filters.food_preference
    ) {
      return false;
    }

    if (
      filters.smoking &&
      profile.smoking !== filters.smoking
    ) {
      return false;
    }

    if (
      filters.drinking &&
      profile.drinking !== filters.drinking
    ) {
      return false;
    }

    if (
      filters.pets &&
      profile.pets !== filters.pets
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
      profile.cleanliness !== filters.cleanliness
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
      filters.sharing_type &&
      profile.sharing_type !== filters.sharing_type
    ) {
      return false;
    }

    if (
      filters.move_in_date &&
      profile.move_in_date > filters.move_in_date
    ) {
      return false;
    }

    return true;
  });
}

export async function getRoommates(
  filters: RoommateFilters = {}
): Promise<RoommateListResponse> {
  await delay();

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 6;

  const filteredProfiles = applyFilters(
    roommateProfiles,
    filters
  );

  const sortedProfiles =
    sortByCompatibility(filteredProfiles);

  const total = sortedProfiles.length;

  const totalPages = Math.max(
    1,
    Math.ceil(total / limit)
  );

  const safePage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    items: cloneProfiles(
      sortedProfiles.slice(startIndex, endIndex)
    ),
    page: safePage,
    limit,
    total,
    total_pages: totalPages,
  };
}

export async function getRoommateById(
  id: number
): Promise<RoommateProfile> {
  await delay();

  const profile = roommateProfiles.find(
    (roommate) => roommate.id === id
  );

  if (!profile) {
    throw new Error("Roommate profile not found.");
  }

  return cloneProfile(profile);
}

export async function getMyRoommateProfile(): Promise<
  RoommateProfile | null
> {
  await delay();

  return currentUserProfile
    ? cloneProfile(currentUserProfile)
    : null;
}

export async function createRoommateProfile(
  data: CreateRoommateProfileInput
): Promise<RoommateProfile> {
  await delay();

  if (currentUserProfile) {
    throw new Error(
      "You already have a roommate profile."
    );
  }

  const timestamp = new Date().toISOString();

  const newProfile: RoommateProfile = {
    id: Date.now(),
    user_id: 999,

    ...data,

    profile_image: data.profile_image ?? null,

    is_favorite: false,
    interest_status: "none",

    created_at: timestamp,
    updated_at: timestamp,
  };

  currentUserProfile = newProfile;

  return cloneProfile(newProfile);
}

export async function updateRoommateProfile(
  data: UpdateRoommateProfileInput
): Promise<RoommateProfile> {
  await delay();

  if (!currentUserProfile) {
    throw new Error(
      "Create a roommate profile before editing it."
    );
  }

  currentUserProfile = {
    ...currentUserProfile,
    ...data,
    updated_at: new Date().toISOString(),
  };

  return cloneProfile(currentUserProfile);
}

export async function deleteRoommateProfile(): Promise<{
  success: boolean;
  message: string;
}> {
  await delay();

  if (!currentUserProfile) {
    throw new Error(
      "No roommate profile exists to delete."
    );
  }

  currentUserProfile = null;

  return {
    success: true,
    message: "Roommate profile deleted successfully.",
  };
}

export async function getRecommendedRoommates(): Promise<RoommateRecommendationsResponse> {
  await delay();

  const recommendations =
    sortByCompatibility(roommateProfiles)
      .filter(
        (
          profile
        ): profile is RoommateRecommendation =>
          profile.compatibility !== undefined &&
          profile.reason !== undefined &&
          profile.shared_preferences !== undefined
      )
      .slice(0, 10)
      .map((profile) => ({
        ...cloneProfile(profile),
        compatibility: profile.compatibility,
        compatibility_label:
          profile.compatibility_label ??
          getCompatibilityLabel(
            profile.compatibility
          ),
        shared_preferences: [
          ...profile.shared_preferences,
        ],
        reason: profile.reason,
      }));

  return {
    items: recommendations,
    total: recommendations.length,
  };
}

export async function getFavoriteRoommates(): Promise<
  RoommateProfile[]
> {
  await delay();

  return cloneProfiles(
    roommateProfiles.filter(
      (profile) => profile.is_favorite
    )
  );
}

export async function toggleFavoriteRoommate(
  roommateId: number
): Promise<RoommateProfile> {
  await delay(250);

  const index = roommateProfiles.findIndex(
    (profile) => profile.id === roommateId
  );

  if (index === -1) {
    throw new Error("Roommate profile not found.");
  }

  roommateProfiles[index] = {
    ...roommateProfiles[index],
    is_favorite:
      !roommateProfiles[index].is_favorite,
    updated_at: new Date().toISOString(),
  };

  return cloneProfile(roommateProfiles[index]);
}

export async function expressInterest(
  roommateId: number
): Promise<ExpressInterestResponse> {
  await delay(300);

  const index = roommateProfiles.findIndex(
    (profile) => profile.id === roommateId
  );

  if (index === -1) {
    throw new Error("Roommate profile not found.");
  }

  const currentStatus =
    roommateProfiles[index].interest_status ??
    "none";

  const nextStatus =
    currentStatus === "pending"
      ? "none"
      : "pending";

  roommateProfiles[index] = {
    ...roommateProfiles[index],
    interest_status: nextStatus,
    updated_at: new Date().toISOString(),
  };

  return {
    success: true,
    roommate_id: roommateId,
    interest_status: nextStatus,
    message:
      nextStatus === "pending"
        ? "Interest expressed successfully."
        : "Interest withdrawn successfully.",
  };
}

export async function removeFavoriteRoommate(
  roommateId: number
): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(250);

  const index = roommateProfiles.findIndex(
    (profile) => profile.id === roommateId
  );

  if (index === -1) {
    throw new Error("Roommate profile not found.");
  }

  roommateProfiles[index] = {
    ...roommateProfiles[index],
    is_favorite: false,
    updated_at: new Date().toISOString(),
  };

  return {
    success: true,
    message: "Roommate removed from favorites.",
  };
}

export async function resetMockRoommateData(): Promise<void> {
  await delay(150);

  roommateProfiles = cloneProfiles(mockRoommates);
  currentUserProfile = cloneProfile(
    mockCurrentRoommateProfile
  );
}