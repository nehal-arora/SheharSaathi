import type {
  RoommateProfile,
  RoommateRecommendation,
} from "@/types/roommates";

export const mockRoommates: RoommateProfile[] = [
  {
    id: 1,
    user_id: 101,
    name: "Aarav Mehta",
    age: 22,
    gender: "Male",

    occupation: "Software Engineering Intern",
    company_or_college: "Delhi Technological University",

    city: "Delhi",
    preferred_locality: "Saket",
    budget: 12000,

    bio: "Friendly, organized and looking for a peaceful shared apartment near the metro.",

    profile_image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",

    food_preference: "Vegetarian",
    smoking: "Non-Smoker",
    drinking: "Non-Drinker",
    pets: "Comfortable With Pets",

    sleep_schedule: "Early Sleeper",
    wake_up_time: "07:00",
    cleanliness: "Very Clean",
    guest_preference: "Occasional Guests",
    work_schedule: "Student",

    languages: ["Hindi", "English"],

    preferred_gender: "Male",
    sharing_type: "Double Sharing",
    move_in_date: "2026-08-15",
    lease_duration: 12,

    compatibility: 94,
    compatibility_label: "Excellent Match",
    shared_preferences: [
      "Similar monthly budget",
      "Vegetarian",
      "Non-smoker",
      "Early morning routine",
    ],
    reason:
      "You both prefer a quiet and clean living environment, have similar budgets and follow compatible daily routines.",

    is_favorite: true,
    interest_status: "none",

    created_at: "2026-07-20T10:00:00.000Z",
    updated_at: "2026-07-20T10:00:00.000Z",
  },

  {
    id: 2,
    user_id: 102,
    name: "Riya Kapoor",
    age: 21,
    gender: "Female",

    occupation: "B.Tech Student",
    company_or_college: "Vivekananda Institute of Professional Studies",

    city: "Delhi",
    preferred_locality: "Pitampura",
    budget: 10000,

    bio: "A focused student who enjoys reading, cooking and maintaining a clean home.",

    profile_image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",

    food_preference: "Vegetarian",
    smoking: "Non-Smoker",
    drinking: "Non-Drinker",
    pets: "No Preference",

    sleep_schedule: "Early Sleeper",
    wake_up_time: "06:30",
    cleanliness: "Very Clean",
    guest_preference: "Occasional Guests",
    work_schedule: "Student",

    languages: ["Hindi", "English", "Punjabi"],

    preferred_gender: "Female",
    sharing_type: "Double Sharing",
    move_in_date: "2026-08-01",
    lease_duration: 10,

    compatibility: 91,
    compatibility_label: "Excellent Match",
    shared_preferences: [
      "Vegetarian food preference",
      "Non-smoking lifestyle",
      "Clean living habits",
      "Similar study schedule",
    ],
    reason:
      "Your food preferences, cleanliness expectations and study-focused lifestyles are strongly aligned.",

    is_favorite: false,
    interest_status: "pending",

    created_at: "2026-07-21T09:30:00.000Z",
    updated_at: "2026-07-21T09:30:00.000Z",
  },

  {
    id: 3,
    user_id: 103,
    name: "Kabir Sharma",
    age: 24,
    gender: "Male",

    occupation: "Product Designer",
    company_or_college: "PixelCraft Studios",

    city: "Gurugram",
    preferred_locality: "Sector 43",
    budget: 18000,

    bio: "Easy-going designer who works hybrid and enjoys music, movies and weekend outings.",

    profile_image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",

    food_preference: "Non-Vegetarian",
    smoking: "Occasionally",
    drinking: "Occasionally",
    pets: "Comfortable With Pets",

    sleep_schedule: "Night Owl",
    wake_up_time: "09:00",
    cleanliness: "Moderately Clean",
    guest_preference: "Guests Welcome",
    work_schedule: "Hybrid",

    languages: ["Hindi", "English"],

    preferred_gender: "Any",
    sharing_type: "Single Room",
    move_in_date: "2026-09-01",
    lease_duration: 12,

    compatibility: 78,
    compatibility_label: "Good Match",
    shared_preferences: [
      "Flexible work schedule",
      "Comfortable with pets",
      "Long-term lease preference",
    ],
    reason:
      "You share similar flexibility around work and pets, although your sleep and guest preferences may differ slightly.",

    is_favorite: false,
    interest_status: "none",

    created_at: "2026-07-21T12:15:00.000Z",
    updated_at: "2026-07-21T12:15:00.000Z",
  },

  {
    id: 4,
    user_id: 104,
    name: "Ananya Verma",
    age: 23,
    gender: "Female",

    occupation: "Marketing Associate",
    company_or_college: "BrightWave Media",

    city: "Noida",
    preferred_locality: "Sector 62",
    budget: 15000,

    bio: "Working professional looking for a respectful and organized roommate near the office.",

    profile_image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",

    food_preference: "Eggetarian",
    smoking: "Non-Smoker",
    drinking: "Occasionally",
    pets: "Not Comfortable With Pets",

    sleep_schedule: "Flexible",
    wake_up_time: "07:30",
    cleanliness: "Very Clean",
    guest_preference: "Occasional Guests",
    work_schedule: "Day Shift",

    languages: ["Hindi", "English"],

    preferred_gender: "Female",
    sharing_type: "Double Sharing",
    move_in_date: "2026-08-20",
    lease_duration: 11,

    compatibility: 86,
    compatibility_label: "Good Match",
    shared_preferences: [
      "Clean living habits",
      "Daytime work schedule",
      "Similar budget range",
      "Occasional guest preference",
    ],
    reason:
      "Your budgets and cleanliness expectations are closely matched, and both of you prefer a structured weekday routine.",

    is_favorite: true,
    interest_status: "accepted",

    created_at: "2026-07-22T08:45:00.000Z",
    updated_at: "2026-07-22T08:45:00.000Z",
  },

  {
    id: 5,
    user_id: 105,
    name: "Dev Malhotra",
    age: 25,
    gender: "Male",

    occupation: "Data Analyst",
    company_or_college: "Insight Labs",

    city: "Delhi",
    preferred_locality: "Dwarka",
    budget: 14000,

    bio: "Calm working professional who prefers a quiet home, healthy food and a predictable routine.",

    profile_image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",

    food_preference: "Vegetarian",
    smoking: "Non-Smoker",
    drinking: "Non-Drinker",
    pets: "No Preference",

    sleep_schedule: "Early Sleeper",
    wake_up_time: "06:45",
    cleanliness: "Moderately Clean",
    guest_preference: "No Guests",
    work_schedule: "Day Shift",

    languages: ["Hindi", "English"],

    preferred_gender: "Male",
    sharing_type: "Double Sharing",
    move_in_date: "2026-08-10",
    lease_duration: 12,

    compatibility: 88,
    compatibility_label: "Good Match",
    shared_preferences: [
      "Vegetarian",
      "Non-smoking lifestyle",
      "Early sleeper",
      "Similar lease duration",
    ],
    reason:
      "You both value a quiet home and follow similar food, smoking and sleeping preferences.",

    is_favorite: false,
    interest_status: "none",

    created_at: "2026-07-22T11:20:00.000Z",
    updated_at: "2026-07-22T11:20:00.000Z",
  },

  {
    id: 6,
    user_id: 106,
    name: "Meera Nair",
    age: 22,
    gender: "Female",

    occupation: "UX Design Student",
    company_or_college: "National Institute of Design",

    city: "Delhi",
    preferred_locality: "Lajpat Nagar",
    budget: 13000,

    bio: "Creative, friendly and respectful. I enjoy cooking, sketching and exploring new cafés.",

    profile_image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",

    food_preference: "Vegan",
    smoking: "Non-Smoker",
    drinking: "Non-Drinker",
    pets: "Have Pets",

    sleep_schedule: "Night Owl",
    wake_up_time: "08:30",
    cleanliness: "Very Clean",
    guest_preference: "Occasional Guests",
    work_schedule: "Student",

    languages: ["English", "Hindi", "Malayalam"],

    preferred_gender: "Female",
    sharing_type: "Double Sharing",
    move_in_date: "2026-09-05",
    lease_duration: 9,

    compatibility: 72,
    compatibility_label: "Good Match",
    shared_preferences: [
      "Student lifestyle",
      "Non-smoking preference",
      "High cleanliness expectations",
    ],
    reason:
      "Your cleanliness and smoking preferences align, but your food and sleep routines may require some adjustment.",

    is_favorite: false,
    interest_status: "none",

    created_at: "2026-07-23T07:50:00.000Z",
    updated_at: "2026-07-23T07:50:00.000Z",
  },

  {
    id: 7,
    user_id: 107,
    name: "Arjun Singh",
    age: 26,
    gender: "Male",

    occupation: "Consultant",
    company_or_college: "NorthBridge Consulting",

    city: "Gurugram",
    preferred_locality: "DLF Phase 3",
    budget: 22000,

    bio: "Professional with a busy schedule, looking for a responsible flatmate who respects privacy.",

    profile_image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",

    food_preference: "Non-Vegetarian",
    smoking: "Non-Smoker",
    drinking: "Occasionally",
    pets: "Not Comfortable With Pets",

    sleep_schedule: "Flexible",
    wake_up_time: "07:00",
    cleanliness: "Moderately Clean",
    guest_preference: "Occasional Guests",
    work_schedule: "Hybrid",

    languages: ["Hindi", "English"],

    preferred_gender: "Male",
    sharing_type: "Single Room",
    move_in_date: "2026-08-25",
    lease_duration: 12,

    compatibility: 65,
    compatibility_label: "Fair Match",
    shared_preferences: [
      "Non-smoking lifestyle",
      "Long-term lease preference",
      "Occasional guests",
    ],
    reason:
      "You agree on smoking and lease preferences, but your budget and room-sharing expectations are different.",

    is_favorite: false,
    interest_status: "none",

    created_at: "2026-07-23T14:10:00.000Z",
    updated_at: "2026-07-23T14:10:00.000Z",
  },

  {
    id: 8,
    user_id: 108,
    name: "Simran Kaur",
    age: 24,
    gender: "Female",

    occupation: "Content Strategist",
    company_or_college: "Storyline Digital",

    city: "Delhi",
    preferred_locality: "Rajouri Garden",
    budget: 16000,

    bio: "Sociable but mindful of personal space. Looking for a friendly and dependable roommate.",

    profile_image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",

    food_preference: "Eggetarian",
    smoking: "Non-Smoker",
    drinking: "Occasionally",
    pets: "Comfortable With Pets",

    sleep_schedule: "Flexible",
    wake_up_time: "08:00",
    cleanliness: "Very Clean",
    guest_preference: "Guests Welcome",
    work_schedule: "Remote",

    languages: ["Hindi", "English", "Punjabi"],

    preferred_gender: "Female",
    sharing_type: "Double Sharing",
    move_in_date: "2026-08-18",
    lease_duration: 12,

    compatibility: 82,
    compatibility_label: "Good Match",
    shared_preferences: [
      "Clean living habits",
      "Flexible schedule",
      "Comfortable with pets",
      "Similar budget",
    ],
    reason:
      "Your budgets, cleanliness standards and flexible schedules align well, making daily living easier.",

    is_favorite: true,
    interest_status: "pending",

    created_at: "2026-07-24T09:00:00.000Z",
    updated_at: "2026-07-24T09:00:00.000Z",
  },
];

export const mockRecommendations: RoommateRecommendation[] =
  mockRoommates
    .filter(
      (
        roommate
      ): roommate is RoommateRecommendation =>
        roommate.compatibility !== undefined &&
        roommate.compatibility_label !== undefined &&
        roommate.shared_preferences !== undefined &&
        roommate.reason !== undefined
    )
    .sort((a, b) => b.compatibility - a.compatibility);

export const mockFavoriteRoommates: RoommateProfile[] =
  mockRoommates.filter((roommate) => roommate.is_favorite);

export const mockCurrentRoommateProfile: RoommateProfile = {
  id: 100,
  user_id: 999,
  name: "Nehal Arora",
  age: 19,
  gender: "Male",

  occupation: "B.Tech CSE Student",
  company_or_college:
    "Vivekananda Institute of Professional Studies",

  city: "Delhi",
  preferred_locality: "Pitampura",
  budget: 12000,

  bio: "Computer Science student looking for a clean, friendly and responsible roommate near college.",

  profile_image: null,

  food_preference: "Vegetarian",
  smoking: "Non-Smoker",
  drinking: "Non-Drinker",
  pets: "Comfortable With Pets",

  sleep_schedule: "Flexible",
  wake_up_time: "07:30",
  cleanliness: "Very Clean",
  guest_preference: "Occasional Guests",
  work_schedule: "Student",

  languages: ["Hindi", "English"],

  preferred_gender: "Male",
  sharing_type: "Double Sharing",
  move_in_date: "2026-08-15",
  lease_duration: 12,

  is_favorite: false,
  interest_status: "none",

  created_at: "2026-07-25T10:00:00.000Z",
  updated_at: "2026-07-25T10:00:00.000Z",
};