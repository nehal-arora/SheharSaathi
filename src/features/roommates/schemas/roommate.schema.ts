import { z } from "zod";

export const roommateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters."),

  age: z
    .number({
      message: "Age is required.",
    })
    .int("Age must be a whole number.")
    .min(18, "You must be at least 18 years old.")
    .max(100, "Enter a valid age."),

  gender: z.enum(["Male", "Female", "Other"]),

  occupation: z
    .string()
    .trim()
    .min(2, "Occupation is required."),

  company_or_college: z
    .string()
    .trim()
    .min(2, "Company or college is required."),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  preferred_locality: z
    .string()
    .trim()
    .min(2, "Preferred locality is required."),

  budget: z
    .number({
      message: "Budget is required.",
    })
    .positive("Budget must be greater than zero."),

  bio: z
    .string()
    .trim()
    .min(20, "Bio must contain at least 20 characters.")
    .max(500, "Bio cannot exceed 500 characters."),

  profile_image: z
    .string()
    .trim()
    .url("Enter a valid image URL.")
    .or(z.literal(""))
    .optional(),

  food_preference: z.enum([
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Eggetarian",
    "No Preference",
  ]),

  smoking: z.enum([
    "Non-Smoker",
    "Occasionally",
    "Regularly",
  ]),

  drinking: z.enum([
    "Non-Drinker",
    "Occasionally",
    "Regularly",
  ]),

  pets: z.enum([
    "Have Pets",
    "Comfortable With Pets",
    "Not Comfortable With Pets",
    "No Preference",
  ]),

  sleep_schedule: z.enum([
    "Early Sleeper",
    "Night Owl",
    "Flexible",
  ]),

  wake_up_time: z
    .string()
    .min(1, "Wake-up time is required."),

  cleanliness: z.enum([
    "Very Clean",
    "Moderately Clean",
    "Relaxed",
  ]),

  guest_preference: z.enum([
    "No Guests",
    "Occasional Guests",
    "Guests Welcome",
  ]),

  work_schedule: z.enum([
    "Day Shift",
    "Night Shift",
    "Hybrid",
    "Remote",
    "Student",
    "Flexible",
  ]),

  languages: z
    .string()
    .trim()
    .min(2, "Enter at least one language."),

  preferred_gender: z.enum([
    "Male",
    "Female",
    "Other",
    "Any",
  ]),

  sharing_type: z.enum([
    "Single Room",
    "Double Sharing",
    "Triple Sharing",
    "Any",
  ]),

  move_in_date: z
    .string()
    .min(1, "Move-in date is required."),

  lease_duration: z
    .number({
      message: "Lease duration is required.",
    })
    .int("Lease duration must be a whole number.")
    .min(1, "Lease duration must be at least one month.")
    .max(60, "Lease duration cannot exceed 60 months."),
});

export type RoommateProfileFormValues = z.infer<
  typeof roommateProfileSchema
>;