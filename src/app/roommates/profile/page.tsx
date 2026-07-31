"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const data = await getMyRoommateProfile();

        setProfile(data);
        setImageFailed(false);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your roommate profile.";

        toast.error(message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const completion = useMemo(() => {
    if (!profile) {
      return {
        percentage: 0,
        missingFields: [] as string[],
      };
    }

    const requiredFields: {
      label: string;
      value: unknown;
    }[] = [
      { label: "Full name", value: profile.name },
      { label: "Age", value: profile.age },
      { label: "Gender", value: profile.gender },
      {
        label: "Occupation",
        value: profile.occupation,
      },
      {
        label: "Company or college",
        value: profile.company_or_college,
      },
      { label: "City", value: profile.city },
      {
        label: "Preferred locality",
        value: profile.preferred_locality,
      },
      {
        label: "Monthly budget",
        value: profile.budget,
      },
      { label: "Bio", value: profile.bio },
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
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <div className="mx-auto flex min-h-[520px] max-w-6xl items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <div className="relative text-center">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <Loader2
                size={38}
                className="animate-spin text-[#F0C86A]"
              />
            </div>

            <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
              Loading your profile
            </h1>

            <p className="mt-2 text-sm text-[#9EAEA7]">
              Preparing your roommate details and preferences...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <section className="relative mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-[#D4A34F]/20 bg-[#0D211B] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <UserRound
                size={34}
                className="text-[#F0C86A]"
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#D4A34F]">
              Start matching
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#FBFAF7] sm:text-4xl">
              Create Your Roommate Profile
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#9EAEA7]">
              Tell us about your lifestyle, budget, location and
              preferences to receive personalized roommate
              recommendations.
            </p>

            <Link
              href="/roommates/profile/create"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3.5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:bg-[#F0C86A]"
            >
              <Sparkles size={19} />
              Create Profile
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const profileImage = getProfileImage(profile);

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative mb-8 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-8">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#205C46]/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <UserRound size={15} />
                My Roommate Profile
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                Manage Your Profile
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#9EAEA7]">
                Keep your details updated to receive more accurate
                AI-powered roommate matches.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roommates/recommendations"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4A34F]/40 bg-[#D4A34F]/10 px-5 py-3.5 font-bold text-[#F0C86A] transition hover:bg-[#D4A34F]/15"
              >
                <Sparkles size={18} />
                View Matches
              </Link>

              <Link
                href="/roommates/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-5 py-3.5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A]"
              >
                <Edit3 size={18} />
                Edit Profile
              </Link>
            </div>
          </div>
        </section>

        <ProfileCompletionBar
          percentage={completion.percentage}
          missingFields={completion.missingFields}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="relative flex h-[390px] items-center justify-center overflow-hidden bg-[#10271F]">
                {!imageFailed && profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${profile.name}'s profile`}
                    className="h-full w-full object-cover"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <UserRound size={58} />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#071512] via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                    Roommate profile
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#FBFAF7]">
                    {profile.name}
                  </h2>

                  <p className="mt-1 text-[#B8C5BF]">
                    {profile.age} years • {profile.gender}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-6">
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
            </section>

            <section className="rounded-[28px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#D4A34F]" />

                <h2 className="text-lg font-bold text-[#FBFAF7]">
                  Looking For
                </h2>
              </div>

              <div className="mt-6 space-y-4">
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
            <ContentSection
              eyebrow="Introduction"
              title="About Me"
            >
              <p className="whitespace-pre-line leading-8 text-[#B8C5BF]">
                {profile.bio}
              </p>
            </ContentSection>

            <ContentSection
              eyebrow="Compatibility"
              title="Lifestyle Preferences"
            >
              <div className="grid gap-4 sm:grid-cols-2">
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
            </ContentSection>

            <ContentSection
              eyebrow="Profile details"
              title="Additional Information"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<Clock3 size={21} />}
                  label="Wake-up time"
                  value={profile.wake_up_time}
                />

                <InfoCard
                  icon={<Languages size={21} />}
                  label="Languages"
                  value={
                    profile.languages?.join(", ") ||
                    "Not provided"
                  }
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
            </ContentSection>

            <section className="rounded-[30px] border border-red-400/20 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                Danger Zone
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
                Delete Profile
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9EAEA7]">
                Deleting your profile will remove it from roommate
                searches and recommendations. This action cannot be
                undone.
              </p>

              <button
                type="button"
                onClick={handleDeleteProfile}
                disabled={deleting}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-3 font-bold text-red-300 transition hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-60"
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

interface ContentSectionProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function ContentSection({
  eyebrow,
  title,
  children,
}: ContentSectionProps) {
  return (
    <section className="rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
        {title}
      </h2>

      <div className="mt-6">
        {children}
      </div>
    </section>
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
    <div className="flex items-start gap-3 rounded-2xl border border-[#205C46]/30 bg-[#10271F] p-4">
      <span className="mt-0.5 shrink-0 text-[#F0C86A]">
        {icon}
      </span>

      <span className="text-sm leading-6 text-[#D6E0DB]">
        {text}
      </span>
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
    <div className="flex items-start justify-between gap-4 border-b border-[#205C46]/25 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-[#7F9189]">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-[#FBFAF7]">
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
    <div className="rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7F9189]">
        {title}
      </p>

      <p className="mt-2 font-semibold text-[#FBFAF7]">
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
    <div className="flex items-start gap-4 rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {label}
        </p>

        <p className="mt-1 font-semibold text-[#FBFAF7]">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}