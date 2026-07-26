import type {
  CompatibilityLabel,
  RoommateProfile,
} from "@/types/roommates";

export function formatBudget(budget: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(budget);
}

export function formatMoveInDate(date: string): string {
  if (!date) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatLeaseDuration(months: number): string {
  if (months === 1) {
    return "1 month";
  }

  return `${months} months`;
}

export function getProfileImage(
  profile: RoommateProfile
): string {
  return (
    profile.profile_image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.name
    )}&background=EEF2E4&color=333333&size=512`
  );
}

export function getCompatibilityLabel(
  score: number
): CompatibilityLabel {
  if (score >= 90) {
    return "Excellent Match";
  }

  if (score >= 75) {
    return "Good Match";
  }

  if (score >= 60) {
    return "Fair Match";
  }

  return "Low Match";
}

export function getCompatibilityDescription(
  score: number
): string {
  if (score >= 90) {
    return "Your lifestyles and roommate preferences are highly compatible.";
  }

  if (score >= 75) {
    return "You share several important lifestyle and living preferences.";
  }

  if (score >= 60) {
    return "You have some matching preferences but may need a few compromises.";
  }

  return "Your lifestyle preferences differ in several important areas.";
}

export function getCompatibilityStyles(score: number): {
  badge: string;
  text: string;
  background: string;
} {
  if (score >= 90) {
    return {
      badge:
        "border-green-200 bg-green-50 text-green-700",
      text: "text-green-700",
      background: "bg-green-50",
    };
  }

  if (score >= 75) {
    return {
      badge:
        "border-[#D6C7A1] bg-[#FBFAF5] text-[#6B8E23]",
      text: "text-[#6B8E23]",
      background: "bg-[#FBFAF5]",
    };
  }

  if (score >= 60) {
    return {
      badge:
        "border-yellow-200 bg-yellow-50 text-yellow-700",
      text: "text-yellow-700",
      background: "bg-yellow-50",
    };
  }

  return {
    badge: "border-red-200 bg-red-50 text-red-700",
    text: "text-red-700",
    background: "bg-red-50",
  };
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getLanguagesLabel(
  languages: string[]
): string {
  if (!languages.length) {
    return "Not specified";
  }

  return languages.join(", ");
}

export function calculateProfileCompletion(
  profile: Partial<RoommateProfile>
): {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
} {
  const fields: Array<{
    key: keyof RoommateProfile;
    label: string;
  }> = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "occupation", label: "Occupation" },
    {
      key: "company_or_college",
      label: "Company or college",
    },
    { key: "city", label: "City" },
    {
      key: "preferred_locality",
      label: "Preferred locality",
    },
    { key: "budget", label: "Budget" },
    { key: "bio", label: "Bio" },
    {
      key: "food_preference",
      label: "Food preference",
    },
    { key: "smoking", label: "Smoking preference" },
    { key: "drinking", label: "Drinking preference" },
    { key: "pets", label: "Pet preference" },
    {
      key: "sleep_schedule",
      label: "Sleep schedule",
    },
    { key: "wake_up_time", label: "Wake-up time" },
    { key: "cleanliness", label: "Cleanliness" },
    {
      key: "guest_preference",
      label: "Guest preference",
    },
    {
      key: "work_schedule",
      label: "Work schedule",
    },
    { key: "languages", label: "Languages" },
    {
      key: "preferred_gender",
      label: "Preferred gender",
    },
    { key: "sharing_type", label: "Sharing type" },
    { key: "move_in_date", label: "Move-in date" },
    {
      key: "lease_duration",
      label: "Lease duration",
    },
  ];

  const missingFields = fields
    .filter(({ key }) => {
      const value = profile[key];

      if (Array.isArray(value)) {
        return value.length === 0;
      }

      if (typeof value === "string") {
        return value.trim() === "";
      }

      return value === undefined || value === null;
    })
    .map(({ label }) => label);

  const totalFields = fields.length;
  const completedFields =
    totalFields - missingFields.length;

  return {
    percentage: Math.round(
      (completedFields / totalFields) * 100
    ),
    completedFields,
    totalFields,
    missingFields,
  };
}

export function matchesSearch(
  profile: RoommateProfile,
  search: string
): boolean {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchableValues = [
    profile.name,
    profile.occupation,
    profile.company_or_college,
    profile.city,
    profile.preferred_locality,
    profile.bio,
    ...profile.languages,
  ];

  return searchableValues.some((value) =>
    value.toLowerCase().includes(normalizedSearch)
  );
}

export function sortByCompatibility(
  profiles: RoommateProfile[]
): RoommateProfile[] {
  return [...profiles].sort(
    (first, second) =>
      (second.compatibility ?? 0) -
      (first.compatibility ?? 0)
  );
}