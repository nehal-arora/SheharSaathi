export type Gender = "Male" | "Female" | "Other";

export type FoodPreference =
  | "Vegetarian"
  | "Non-Vegetarian"
  | "Vegan"
  | "Eggetarian"
  | "No Preference";

export type SmokingPreference =
  | "Non-Smoker"
  | "Occasionally"
  | "Regularly";

export type DrinkingPreference =
  | "Non-Drinker"
  | "Occasionally"
  | "Regularly";

export type PetPreference =
  | "Have Pets"
  | "Comfortable With Pets"
  | "Not Comfortable With Pets"
  | "No Preference";

export type SleepSchedule =
  | "Early Sleeper"
  | "Night Owl"
  | "Flexible";

export type CleanlinessLevel =
  | "Very Clean"
  | "Moderately Clean"
  | "Relaxed";

export type GuestPreference =
  | "No Guests"
  | "Occasional Guests"
  | "Guests Welcome";

export type WorkSchedule =
  | "Day Shift"
  | "Night Shift"
  | "Hybrid"
  | "Remote"
  | "Student"
  | "Flexible";

export type SharingType =
  | "Single Room"
  | "Double Sharing"
  | "Triple Sharing"
  | "Any";

export type InterestStatus = "none" | "pending" | "accepted" | "rejected";

export type CompatibilityLabel =
  | "Excellent Match"
  | "Good Match"
  | "Fair Match"
  | "Low Match";

export interface RoommateProfile {
  id: number;
  user_id: number;

  name: string;
  age: number;
  gender: Gender;

  occupation: string;
  company_or_college: string;

  city: string;
  preferred_locality: string;
  budget: number;

  bio: string;
  profile_image: string;

  food_preference: FoodPreference;
  smoking: SmokingPreference;
  drinking: DrinkingPreference;
  pets: PetPreference;

  sleep_schedule: SleepSchedule;
  wake_up_time: string;
  cleanliness: CleanlinessLevel;
  guest_preference: GuestPreference;
  work_schedule: WorkSchedule;

  languages: string[];

  preferred_gender: Gender | "Any";
  sharing_type: SharingType;
  move_in_date: string;
  lease_duration: number;

  compatibility?: number;
  compatibility_label?: CompatibilityLabel;
  shared_preferences?: string[];
  reason?: string;

  is_favorite?: boolean;
  interest_status?: InterestStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateRoommateProfileInput {
  name: string;
  age: number;
  gender: Gender;

  occupation: string;
  company_or_college: string;

  city: string;
  preferred_locality: string;
  budget: number;

  bio: string;
  profile_image?: string | null;

  food_preference: FoodPreference;
  smoking: SmokingPreference;
  drinking: DrinkingPreference;
  pets: PetPreference;

  sleep_schedule: SleepSchedule;
  wake_up_time: string;
  cleanliness: CleanlinessLevel;
  guest_preference: GuestPreference;
  work_schedule: WorkSchedule;

  languages: string[];

  preferred_gender: Gender | "Any";
  sharing_type: SharingType;
  move_in_date: string;
  lease_duration: number;
}

export type UpdateRoommateProfileInput =
  Partial<CreateRoommateProfileInput>;

export interface RoommateFilters {
  search?: string;
  city?: string;
  preferred_locality?: string;

  min_budget?: number;
  max_budget?: number;

  gender?: Gender;
  preferred_gender?: Gender | "Any";

  food_preference?: FoodPreference;
  smoking?: SmokingPreference;
  drinking?: DrinkingPreference;
  pets?: PetPreference;

  sleep_schedule?: SleepSchedule;
  cleanliness?: CleanlinessLevel;
  work_schedule?: WorkSchedule;
  sharing_type?: SharingType;

  move_in_date?: string;

  page?: number;
  limit?: number;
}

export interface RoommateListResponse {
  items: RoommateProfile[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface RoommateRecommendation extends RoommateProfile {
  compatibility: number;
  compatibility_label: CompatibilityLabel;
  shared_preferences: string[];
  reason: string;
}

export interface RoommateRecommendationsResponse {
  items: RoommateRecommendation[];
  total: number;
}

export interface FavoriteRoommate {
  id: number;
  roommate_id: number;
  user_id: number;
  roommate: RoommateProfile;
  created_at: string;
}

export interface ExpressInterestResponse {
  success: boolean;
  message: string;
  roommate_id: number;
  interest_status: InterestStatus;
}

export interface RoommateProfileCompletion {
  percentage: number;
  completed_fields: number;
  total_fields: number;
  missing_fields: string[];
}