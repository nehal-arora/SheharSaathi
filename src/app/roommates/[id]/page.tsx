"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  HeartHandshake,
  Home,
  Languages,
  Loader2,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";

import { toast } from "sonner";

import CompatibilityBadge from "@/components/roommates/CompatibilityBadge";

import {
  expressInterest,
  getRoommateById,
  toggleFavoriteRoommate,
} from "@/features/roommates/services/roommate.service";

import {
  formatBudget,
  formatLeaseDuration,
  formatMoveInDate,
  getProfileImage,
} from "@/features/roommates/utils/roommate.utils";

import type { RoommateProfile } from "@/types/roommates";

export default function RoommateDetailsPage() {
  const params = useParams<{ id: string }>();

  const roommateId = Number(params.id);

  const [roommate, setRoommate] =
    useState<RoommateProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [favoriteLoading, setFavoriteLoading] =
    useState(false);
  const [interestLoading, setInterestLoading] =
    useState(false);

  useEffect(() => {
    async function loadRoommate() {
      try {
        setLoading(true);

        if (
          Number.isNaN(roommateId) ||
          roommateId <= 0
        ) {
          throw new Error(
            "Invalid roommate profile ID."
          );
        }

        const data =
          await getRoommateById(roommateId);

        setRoommate(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load roommate profile.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadRoommate();
  }, [roommateId]);

  async function handleFavorite() {
    if (!roommate) {
      return;
    }

    try {
      setFavoriteLoading(true);

      await toggleFavoriteRoommate(roommate.id);

      setRoommate((previous) =>
        previous
          ? {
              ...previous,
              is_favorite:
                !previous.is_favorite,
            }
          : previous
      );

      toast.success(
        roommate.is_favorite
          ? "Removed from favorites."
          : "Added to favorites."
      );
    } catch {
      toast.error(
        "Unable to update favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  }

  async function handleInterest() {
    if (!roommate) {
      return;
    }

    try {
      setInterestLoading(true);

      await expressInterest(roommate.id);

      setRoommate((previous) => {
  if (!previous) {
    return previous;
  }

  const updatedProfile: RoommateProfile = {
    ...previous,
    interest_status:
      previous.interest_status === "pending"
        ? undefined
        : "pending",
  };

  return updatedProfile;
});

      toast.success(
        roommate.interest_status === "pending"
          ? "Interest withdrawn."
          : "Interest sent successfully."
      );
    } catch {
      toast.error(
        "Unable to update interest."
      );
    } finally {
      setInterestLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBFAF5] px-4 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-3xl border border-gray-200 bg-white py-24 shadow-sm">
          <div className="text-center">
            <Loader2
              size={40}
              className="mx-auto animate-spin text-[#6B8E23]"
            />

            <p className="mt-4 text-gray-600">
              Loading roommate profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!roommate) {
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
            Roommate Profile Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The profile may have been removed
            or the link may be incorrect.
          </p>

          <Link
            href="/roommates"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Browse Roommates
          </Link>
        </section>
      </main>
    );
  }

  const interestPending =
    roommate.interest_status === "pending";

  const interestAccepted =
    roommate.interest_status === "accepted";

  const sharedPreferences =
    roommate.shared_preferences ?? [];

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <Link
          href="/roommates"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B8E23] transition hover:opacity-75"
        >
          <ArrowLeft size={17} />
          Back to Roommates
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[380px_1fr]">
            <div className="relative min-h-[420px] bg-[#EEF2E4] lg:min-h-full">
              <Image
                src={getProfileImage(roommate)}
                alt={`${roommate.name}'s roommate profile`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />

              <div className="absolute left-5 top-5">
                <CompatibilityBadge
  score={roommate.compatibility ?? 0}
  size="lg"
/>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="font-semibold text-[#6B8E23]">
                    Roommate profile
                  </p>

                  <h1 className="mt-1 text-4xl font-bold text-gray-900">
                    {roommate.name}
                  </h1>

                  <p className="mt-2 text-gray-500">
                    {roommate.age} years •{" "}
                    {roommate.gender}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#EEF2E4] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Monthly budget
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#6B8E23]">
                    {formatBudget(
                      roommate.budget
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <HeaderDetail
                  icon={<Briefcase size={19} />}
                  label="Occupation"
                  value={roommate.occupation}
                />

                <HeaderDetail
                  icon={<Home size={19} />}
                  label="Company or college"
                  value={
                    roommate.company_or_college
                  }
                />

                <HeaderDetail
                  icon={<MapPin size={19} />}
                  label="Preferred locality"
                  value={`${roommate.preferred_locality}, ${roommate.city}`}
                />

                <HeaderDetail
                  icon={<CalendarDays size={19} />}
                  label="Move-in date"
                  value={formatMoveInDate(
                    roommate.move_in_date
                  )}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  roommate.food_preference,
                  roommate.smoking,
                  roommate.sleep_schedule,
                  roommate.cleanliness,
                  roommate.sharing_type,
                ].map((preference) => (
                  <span
                    key={preference}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {preference}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={handleFavorite}
                  disabled={favoriteLoading}
                  className={[
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold transition",
                    roommate.is_favorite
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-600",
                    favoriteLoading
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(" ")}
                >
                  {favoriteLoading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Heart
                      size={18}
                      fill={
                        roommate.is_favorite
                          ? "currentColor"
                          : "none"
                      }
                    />
                  )}

                  {roommate.is_favorite
                    ? "Saved"
                    : "Add to Favorites"}
                </button>

                <button
                  type="button"
                  onClick={handleInterest}
                  disabled={
                    interestLoading ||
                    interestAccepted
                  }
                  className={[
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition",
                    interestAccepted
                      ? "cursor-default bg-green-100 text-green-700"
                      : interestPending
                        ? "border border-[#6B8E23] bg-[#EEF2E4] text-[#6B8E23]"
                        : "bg-[#6B8E23] text-white hover:opacity-90",
                    interestLoading
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(" ")}
                >
                  {interestLoading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : interestAccepted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <MessageCircle size={18} />
                  )}

                  {interestLoading
                    ? "Updating..."
                    : interestAccepted
                      ? "Interest Accepted"
                      : interestPending
                        ? "Withdraw Interest"
                        : "Express Interest"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                About {roommate.name}
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                {roommate.bio}
              </p>
            </section>

            <section className="rounded-3xl border border-[#D6C7A1] bg-[#FBFAF5] p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2E4]">
                  <Sparkles
                    size={22}
                    className="text-[#6B8E23]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#6B8E23]">
                    AI compatibility insight
                  </p>

                  <h2 className="text-xl font-bold text-gray-900">
                    Why this could be a good match
                  </h2>
                </div>
              </div>

              <p className="mt-5 leading-7 text-gray-600">
                {roommate.reason ??
                  "Your location, budget and lifestyle preferences show strong compatibility with this roommate."}
              </p>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Lifestyle Preferences
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PreferenceCard
                  title="Food preference"
                  value={
                    roommate.food_preference
                  }
                />

                <PreferenceCard
                  title="Smoking"
                  value={roommate.smoking}
                />

                <PreferenceCard
                  title="Drinking"
                  value={roommate.drinking}
                />

                <PreferenceCard
                  title="Pets"
                  value={roommate.pets}
                />

                <PreferenceCard
                  title="Sleep schedule"
                  value={
                    roommate.sleep_schedule
                  }
                />

                <PreferenceCard
                  title="Cleanliness"
                  value={roommate.cleanliness}
                />

                <PreferenceCard
                  title="Guests"
                  value={
                    roommate.guest_preference
                  }
                />

                <PreferenceCard
                  title="Work schedule"
                  value={
                    roommate.work_schedule
                  }
                />
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Shared Preferences
              </h2>

              {sharedPreferences.length > 0 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {sharedPreferences.map(
                    (preference) => (
                      <div
                        key={preference}
                        className="flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-green-700"
                      >
                        <CheckCircle2
                          size={19}
                          className="mt-0.5 shrink-0"
                        />

                        <span className="font-medium">
                          {preference}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-3 text-gray-600">
                  Shared preference details are
                  not available yet.
                </p>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Housing Preferences
              </h2>

              <div className="mt-5 space-y-4">
                <SidebarDetail
                  icon={<Wallet size={19} />}
                  label="Budget"
                  value={formatBudget(
                    roommate.budget
                  )}
                />

                <SidebarDetail
                  icon={
                    <HeartHandshake size={19} />
                  }
                  label="Sharing type"
                  value={roommate.sharing_type}
                />

                <SidebarDetail
                  icon={<UserRound size={19} />}
                  label="Preferred gender"
                  value={
                    roommate.preferred_gender
                  }
                />

                <SidebarDetail
                  icon={
                    <CalendarDays size={19} />
                  }
                  label="Move-in date"
                  value={formatMoveInDate(
                    roommate.move_in_date
                  )}
                />

                <SidebarDetail
                  icon={<Clock3 size={19} />}
                  label="Lease duration"
                  value={formatLeaseDuration(
                    roommate.lease_duration
                  )}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Additional Information
              </h2>

              <div className="mt-5 space-y-4">
                <SidebarDetail
                  icon={<Clock3 size={19} />}
                  label="Wake-up time"
                  value={roommate.wake_up_time}
                />

                <SidebarDetail
                  icon={<Languages size={19} />}
                  label="Languages"
                  value={
                    roommate.languages.join(", ") ||
                    "Not provided"
                  }
                />

                <SidebarDetail
                  icon={<MapPin size={19} />}
                  label="City"
                  value={roommate.city}
                />
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

interface HeaderDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function HeaderDetail({
  icon,
  label,
  value,
}: HeaderDetailProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#FBFAF5] p-4">
      <div className="mt-0.5 shrink-0 text-[#6B8E23]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-gray-900">
          {value}
        </p>
      </div>
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

interface SidebarDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SidebarDetail({
  icon,
  label,
  value,
}: SidebarDetailProps) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}