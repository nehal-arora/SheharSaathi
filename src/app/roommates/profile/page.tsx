"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Briefcase,
  CalendarDays,
  Clock3,
  Edit3,
  HeartHandshake,
  Home,
  Languages,
  Loader2,
  MapPin,
  Sparkles,
  Trash2,
  UserRound,
  Wallet,
} from "lucide-react";

import { toast } from "sonner";

import ProfileCompletionBar from "@/components/roommates/ProfileCompletionBar";

import {
  deleteRoommateProfile,
  getMyRoommateProfile,
} from "@/features/roommates/services/roommate.service";

import {
  formatBudget,
  formatLeaseDuration,
  formatMoveInDate,
  getProfileImage,
} from "@/features/roommates/utils/roommate.utils";

import type { RoommateProfile } from "@/types/roommates";

export default function MyRoommateProfilePage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<RoommateProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  async function loadProfile() {
    try {
      setLoading(true);

      const data = await getMyRoommateProfile();

      setProfile(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load your roommate profile.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const completion = useMemo(() => {
    if (!profile) {
      return {
        percentage: 0,
        missingFields: [],
      };
    }

    const requiredFields: {
      label: string;
      value: unknown;
    }[] = [
      {
        label: "Full name",
        value: profile.name,
      },
      {
        label: "Age",
        value: profile.age,
      },
      {
        label: "Gender",
        value: profile.gender,
      },
      {
        label: "Occupation",
        value: profile.occupation,
      },
      {
        label: "Company or college",
        value: profile.company_or_college,
      },
      {
        label: "City",
        value: profile.city,
      },
      {
        label: "Preferred locality",
        value: profile.preferred_locality,
      },
      {
        label: "Monthly budget",
        value: profile.budget,
      },
      {
        label: "Bio",
        value: profile.bio,
      },
      {
        label: "Food preference",
        value: profile.food_preference,
      },
      {
        label: "Smoking preference",
        value: profile.smoking,
      },
      {
        label: "Drinking preference",
        value: profile.drinking,
      },
      {
        label: "Pet preference",
        value: profile.pets,
      },
      {
        label: "Sleep schedule",
        value: profile.sleep_schedule,
      },
      {
        label: "Wake-up time",
        value: profile.wake_up_time,
      },
      {
        label: "Cleanliness",
        value: profile.cleanliness,
      },
      {
        label: "Guest preference",
        value: profile.guest_preference,
      },
      {
        label: "Work schedule",
        value: profile.work_schedule,
      },
      {
        label: "Languages",
        value: profile.languages,
      },
      {
        label: "Preferred gender",
        value: profile.preferred_gender,
      },
      {
        label: "Sharing type",
        value: profile.sharing_type,
      },
      {
        label: "Move-in date",
        value: profile.move_in_date,
      },
      {
        label: "Lease duration",
        value: profile.lease_duration,
      },
    ];

    const missingFields = requiredFields
      .filter(({ value }) => {
        if (Array.isArray(value)) {
          return value.length === 0;
        }

        if (typeof value === "string") {
          return value.trim().length === 0;
        }

        return value === null || value === undefined;
      })
      .map(({ label }) => label);

    const completedFields =
      requiredFields.length - missingFields.length;

    const percentage = Math.round(
      (completedFields / requiredFields.length) * 100
    );

    return {
      percentage,
      missingFields,
    };
  }, [profile]);

  async function handleDeleteProfile() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your roommate profile? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteRoommateProfile();

      toast.success(
        "Your roommate profile has been deleted."
      );

      router.push("/roommates/profile/create");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to delete your profile.";

      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBFAF5] px-4 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-3xl border border-gray-200 bg-white py-24 shadow-sm">
          <div className="text-center">
            <Loader2
              size={38}
              className="mx-auto animate-spin text-[#6B8E23]"
            />

            <p className="mt-4 text-gray-600">
              Loading your roommate profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#FBFAF5] px-4 py-12">
        <section className="mx-auto max-w-3xl rounded-3xl border border-dashed border-[#D6C7A1] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2E4]">
            <UserRound
              size={30}
              className="text-[#6B8E23]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Create Your Roommate Profile
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Tell us about your lifestyle, budget, location
            and preferences to receive personalized roommate
            recommendations.
          </p>

          <Link
            href="/roommates/profile/create"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Sparkles size={19} />
            Create Profile
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#6B8E23]">
              My roommate profile
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Manage Your Profile
            </h1>

            <p className="mt-2 text-gray-600">
              Keep your details updated for better AI matches.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/roommates/recommendations"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6B8E23] px-5 py-3 font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
            >
              <Sparkles size={18} />
              View Matches
            </Link>

            <Link
              href="/roommates/profile/edit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              <Edit3 size={18} />
              Edit Profile
            </Link>
          </div>
        </div>

        <ProfileCompletionBar
          percentage={completion.percentage}
          missingFields={completion.missingFields}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-80 bg-[#EEF2E4]">
                <Image
                  src={getProfileImage(profile)}
                  alt={`${profile.name}'s profile`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h2>

                <p className="mt-1 text-gray-500">
                  {profile.age} years • {profile.gender}
                </p>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <ProfileLine
                    icon={<Briefcase size={18} />}
                    text={profile.occupation}
                  />

                  <ProfileLine
                    icon={<Home size={18} />}
                    text={profile.company_or_college}
                  />

                  <ProfileLine
                    icon={<MapPin size={18} />}
                    text={`${profile.preferred_locality}, ${profile.city}`}
                  />

                  <ProfileLine
                    icon={<Wallet size={18} />}
                    text={`${formatBudget(
                      profile.budget
                    )} monthly budget`}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">
                Looking for
              </h2>

              <div className="mt-4 space-y-4">
                <ProfileDetail
                  label="Preferred gender"
                  value={profile.preferred_gender}
                />

                <ProfileDetail
                  label="Sharing type"
                  value={profile.sharing_type}
                />

                <ProfileDetail
                  label="Move-in date"
                  value={formatMoveInDate(
                    profile.move_in_date
                  )}
                />

                <ProfileDetail
                  label="Lease duration"
                  value={formatLeaseDuration(
                    profile.lease_duration
                  )}
                />
              </div>
            </section>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                About Me
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                {profile.bio}
              </p>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Lifestyle Preferences
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PreferenceCard
                  title="Food"
                  value={profile.food_preference}
                />

                <PreferenceCard
                  title="Smoking"
                  value={profile.smoking}
                />

                <PreferenceCard
                  title="Drinking"
                  value={profile.drinking}
                />

                <PreferenceCard
                  title="Pets"
                  value={profile.pets}
                />

                <PreferenceCard
                  title="Sleep schedule"
                  value={profile.sleep_schedule}
                />

                <PreferenceCard
                  title="Cleanliness"
                  value={profile.cleanliness}
                />

                <PreferenceCard
                  title="Guests"
                  value={profile.guest_preference}
                />

                <PreferenceCard
                  title="Work schedule"
                  value={profile.work_schedule}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Additional Details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoCard
                  icon={<Clock3 size={21} />}
                  label="Wake-up time"
                  value={profile.wake_up_time}
                />

                <InfoCard
                  icon={<Languages size={21} />}
                  label="Languages"
                  value={profile.languages.join(", ")}
                />

                <InfoCard
                  icon={<CalendarDays size={21} />}
                  label="Move-in"
                  value={formatMoveInDate(
                    profile.move_in_date
                  )}
                />

                <InfoCard
                  icon={<HeartHandshake size={21} />}
                  label="Room preference"
                  value={profile.sharing_type}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Delete Profile
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Deleting your profile will remove it from
                roommate searches and recommendations.
              </p>

              <button
                type="button"
                onClick={handleDeleteProfile}
                disabled={deleting}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Profile
                  </>
                )}
              </button>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ProfileLineProps {
  icon: React.ReactNode;
  text: string;
}

function ProfileLine({
  icon,
  text,
}: ProfileLineProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-[#6B8E23]">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

interface ProfileDetailProps {
  label: string;
  value: string;
}

function ProfileDetail({
  label,
  value,
}: ProfileDetailProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-gray-800">
        {value}
      </span>
    </div>
  );
}

interface PreferenceCardProps {
  title: string;
  value: string;
}

function PreferenceCard({
  title,
  value,
}: PreferenceCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#FBFAF5] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-[#EEF2E4] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#6B8E23]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-gray-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}