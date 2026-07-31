"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  type Control,
  useForm,
} from "react-hook-form";
import {
  Loader2,
  Save,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type {
  CreateRoommateProfileInput,
  RoommateProfile,
} from "@/types/roommates";

import {
  createRoommateProfile,
  updateRoommateProfile,
} from "@/features/roommates/services/roommate.service";

const roommateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must contain at least 2 characters."
    ),

  age: z
    .number({
      message: "Age is required.",
    })
    .int("Age must be a whole number.")
    .min(
      18,
      "You must be at least 18 years old."
    )
    .max(100, "Enter a valid age."),

  gender: z.enum([
    "Male",
    "Female",
    "Other",
  ]),

  occupation: z
    .string()
    .trim()
    .min(2, "Occupation is required."),

  company_or_college: z
    .string()
    .trim()
    .min(
      2,
      "Company or college is required."
    ),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  preferred_locality: z
    .string()
    .trim()
    .min(
      2,
      "Preferred locality is required."
    ),

  budget: z
    .number({
      message: "Budget is required.",
    })
    .positive(
      "Budget must be greater than zero."
    ),

  bio: z
    .string()
    .trim()
    .min(
      20,
      "Bio must contain at least 20 characters."
    )
    .max(
      500,
      "Bio cannot exceed 500 characters."
    ),

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
    .min(
      1,
      "Wake-up time is required."
    ),

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
    .min(
      2,
      "Enter at least one language."
    ),

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
    .min(
      1,
      "Move-in date is required."
    ),

  lease_duration: z
    .number({
      message:
        "Lease duration is required.",
    })
    .int(
      "Lease duration must be a whole number."
    )
    .min(
      1,
      "Lease duration must be at least one month."
    )
    .max(
      60,
      "Lease duration cannot exceed 60 months."
    ),
});

type RoommateProfileFormValues = z.infer<
  typeof roommateProfileSchema
>;

type SelectFieldName =
  | "food_preference"
  | "smoking"
  | "drinking"
  | "pets"
  | "sleep_schedule"
  | "cleanliness"
  | "guest_preference"
  | "work_schedule";

interface RoommateProfileFormProps {
  mode: "create" | "edit";
  initialProfile?: RoommateProfile;
}

export default function RoommateProfileForm({
  mode,
  initialProfile,
}: RoommateProfileFormProps) {
  const router = useRouter();

  const [submitting, setSubmitting] =
    useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RoommateProfileFormValues>({
    resolver: zodResolver(
      roommateProfileSchema
    ),

    defaultValues: {
      name: initialProfile?.name ?? "",

      age:
        initialProfile?.age ?? 18,

      gender:
        initialProfile?.gender ??
        "Male",

      occupation:
        initialProfile?.occupation ??
        "",

      company_or_college:
        initialProfile
          ?.company_or_college ?? "",

      city:
        initialProfile?.city ?? "",

      preferred_locality:
        initialProfile
          ?.preferred_locality ?? "",

      budget:
        initialProfile?.budget ??
        10000,

      bio:
        initialProfile?.bio ?? "",

      profile_image:
        initialProfile
          ?.profile_image ?? "",

      food_preference:
        initialProfile
          ?.food_preference ??
        "No Preference",

      smoking:
        initialProfile?.smoking ??
        "Non-Smoker",

      drinking:
        initialProfile?.drinking ??
        "Non-Drinker",

      pets:
        initialProfile?.pets ??
        "No Preference",

      sleep_schedule:
        initialProfile
          ?.sleep_schedule ??
        "Flexible",

      wake_up_time:
        initialProfile
          ?.wake_up_time ??
        "07:00",

      cleanliness:
        initialProfile
          ?.cleanliness ??
        "Moderately Clean",

      guest_preference:
        initialProfile
          ?.guest_preference ??
        "Occasional Guests",

      work_schedule:
        initialProfile
          ?.work_schedule ??
        "Flexible",

      languages:
        initialProfile?.languages?.join(
          ", "
        ) ?? "",

      preferred_gender:
        initialProfile
          ?.preferred_gender ??
        "Any",

      sharing_type:
        initialProfile
          ?.sharing_type ??
        "Any",

      move_in_date:
        initialProfile
          ?.move_in_date ?? "",

      lease_duration:
        initialProfile
          ?.lease_duration ?? 12,
    },
  });

  async function onSubmit(
    values: RoommateProfileFormValues
  ) {
    try {
      setSubmitting(true);

      const payload: CreateRoommateProfileInput =
        {
          ...values,

          profile_image:
            values.profile_image?.trim() ||
            "",

          languages: values.languages
            .split(",")
            .map((language) =>
              language.trim()
            )
            .filter(Boolean),
        };

      if (mode === "create") {
        await createRoommateProfile(
          payload
        );

        toast.success(
          "Roommate profile created successfully."
        );
      } else {
        await updateRoommateProfile(
          payload
        );

        toast.success(
          "Roommate profile updated successfully."
        );
      }

      router.push(
        "/roommates/profile"
      );

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save roommate profile.";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10"
    >
      <FormSection
        title="Basic Information"
        description="Introduce yourself to potential roommates."
      >
        <FormGrid>
          <FormField
            label="Full name"
            error={errors.name?.message}
          >
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Age"
            error={errors.age?.message}
          >
            <input
              {...register("age", {
                valueAsNumber: true,
              })}
              type="number"
              min={18}
              max={100}
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Gender"
            error={
              errors.gender?.message
            }
          >
            <select
              {...register("gender")}
              className={inputClasses}
            >
              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </FormField>

          <FormField
            label="Profile image URL"
            error={
              errors.profile_image
                ?.message
            }
          >
            <input
              {...register(
                "profile_image"
              )}
              type="url"
              placeholder="https://example.com/photo.jpg"
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Occupation"
            error={
              errors.occupation
                ?.message
            }
          >
            <input
              {...register(
                "occupation"
              )}
              placeholder="Student, Engineer..."
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Company or college"
            error={
              errors
                .company_or_college
                ?.message
            }
          >
            <input
              {...register(
                "company_or_college"
              )}
              placeholder="Enter institution name"
              className={inputClasses}
            />
          </FormField>
        </FormGrid>

        <FormField
          label="Bio"
          error={errors.bio?.message}
        >
          <textarea
            {...register("bio")}
            rows={5}
            placeholder="Describe your lifestyle and what you expect from a roommate..."
            className={inputClasses}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Location and Budget"
        description="Tell us where and when you want to move."
      >
        <FormGrid>
          <FormField
            label="City"
            error={errors.city?.message}
          >
            <input
              {...register("city")}
              placeholder="Delhi"
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Preferred locality"
            error={
              errors
                .preferred_locality
                ?.message
            }
          >
            <input
              {...register(
                "preferred_locality"
              )}
              placeholder="Saket, Dwarka..."
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Monthly budget"
            error={
              errors.budget?.message
            }
          >
            <input
              {...register("budget", {
                valueAsNumber: true,
              })}
              type="number"
              min={1}
              placeholder="12000"
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Move-in date"
            error={
              errors.move_in_date
                ?.message
            }
          >
            <input
              {...register(
                "move_in_date"
              )}
              type="date"
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Lease duration in months"
            error={
              errors.lease_duration
                ?.message
            }
          >
            <input
              {...register(
                "lease_duration",
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              min={1}
              max={60}
              className={inputClasses}
            />
          </FormField>

          <FormField
            label="Sharing type"
            error={
              errors.sharing_type
                ?.message
            }
          >
            <select
              {...register(
                "sharing_type"
              )}
              className={inputClasses}
            >
              <option value="Single Room">
                Single Room
              </option>

              <option value="Double Sharing">
                Double Sharing
              </option>

              <option value="Triple Sharing">
                Triple Sharing
              </option>

              <option value="Any">
                Any
              </option>
            </select>
          </FormField>

          <FormField
            label="Preferred roommate gender"
            error={
              errors.preferred_gender
                ?.message
            }
          >
            <select
              {...register(
                "preferred_gender"
              )}
              className={inputClasses}
            >
              <option value="Any">
                Any
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Lifestyle Preferences"
        description="These preferences help calculate compatibility."
      >
        <FormGrid>
          <SelectField
            label="Food preference"
            name="food_preference"
            control={control}
            error={
              errors.food_preference
                ?.message
            }
            options={[
              "Vegetarian",
              "Non-Vegetarian",
              "Vegan",
              "Eggetarian",
              "No Preference",
            ]}
          />

          <SelectField
            label="Smoking"
            name="smoking"
            control={control}
            error={
              errors.smoking?.message
            }
            options={[
              "Non-Smoker",
              "Occasionally",
              "Regularly",
            ]}
          />

          <SelectField
            label="Drinking"
            name="drinking"
            control={control}
            error={
              errors.drinking?.message
            }
            options={[
              "Non-Drinker",
              "Occasionally",
              "Regularly",
            ]}
          />

          <SelectField
            label="Pets"
            name="pets"
            control={control}
            error={
              errors.pets?.message
            }
            options={[
              "Have Pets",
              "Comfortable With Pets",
              "Not Comfortable With Pets",
              "No Preference",
            ]}
          />

          <SelectField
            label="Sleep schedule"
            name="sleep_schedule"
            control={control}
            error={
              errors.sleep_schedule
                ?.message
            }
            options={[
              "Early Sleeper",
              "Night Owl",
              "Flexible",
            ]}
          />

          <FormField
            label="Wake-up time"
            error={
              errors.wake_up_time
                ?.message
            }
          >
            <input
              {...register(
                "wake_up_time"
              )}
              type="time"
              className={inputClasses}
            />
          </FormField>

          <SelectField
            label="Cleanliness"
            name="cleanliness"
            control={control}
            error={
              errors.cleanliness
                ?.message
            }
            options={[
              "Very Clean",
              "Moderately Clean",
              "Relaxed",
            ]}
          />

          <SelectField
            label="Guest preference"
            name="guest_preference"
            control={control}
            error={
              errors.guest_preference
                ?.message
            }
            options={[
              "No Guests",
              "Occasional Guests",
              "Guests Welcome",
            ]}
          />

          <SelectField
            label="Work schedule"
            name="work_schedule"
            control={control}
            error={
              errors.work_schedule
                ?.message
            }
            options={[
              "Day Shift",
              "Night Shift",
              "Hybrid",
              "Remote",
              "Student",
              "Flexible",
            ]}
          />

          <FormField
            label="Languages"
            error={
              errors.languages?.message
            }
          >
            <input
              {...register("languages")}
              placeholder="Hindi, English, Punjabi"
              className={inputClasses}
            />

            <p className="mt-2 text-xs leading-5 text-[#9EAEA7]">
              Separate multiple languages
              using commas.
            </p>
          </FormField>
        </FormGrid>
      </FormSection>

      <div className="rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:flex sm:items-center sm:justify-end sm:gap-3">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#205C46]/45 bg-[#10271F] px-6 py-3 font-semibold text-[#D6E0DB] transition-all duration-200 hover:border-[#D4A34F]/40 hover:text-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#071512] shadow-[0_10px_24px_rgba(212,163,79,0.20)] transition-all duration-200 hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />

              Saving Profile...
            </>
          ) : (
            <>
              {mode === "create" ? (
                <UserRound size={19} />
              ) : (
                <Save size={19} />
              )}

              {mode === "create"
                ? "Create Profile"
                : "Save Changes"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 py-3 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10 [&>option]:bg-[#10271F] [&>option]:text-[#FBFAF7]";

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#D4A34F]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#205C46]/15 blur-3xl" />

      <div className="relative mb-7 border-b border-[#205C46]/30 pb-5">
        <h2 className="text-xl font-bold text-[#FBFAF7]">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
          {description}
        </p>
      </div>

      <div className="relative space-y-6">
        {children}
      </div>
    </section>
  );
}

interface FormGridProps {
  children: React.ReactNode;
}

function FormGrid({
  children,
}: FormGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-sm font-semibold text-[#D6E0DB]">
        {label}
      </span>

      {children}

      {error && (
        <span className="mt-2 block text-sm font-medium text-[#F3A39A]">
          {error}
        </span>
      )}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  name: SelectFieldName;
  control: Control<RoommateProfileFormValues>;
  options: readonly string[];
  error?: string;
}

function SelectField({
  label,
  name,
  control,
  options,
  error,
}: SelectFieldProps) {
  return (
    <FormField
      label={label}
      error={error}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={inputClasses}
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        )}
      />
    </FormField>
  );
}