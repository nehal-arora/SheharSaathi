"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Settings,
  Sparkles,
} from "lucide-react";

import ExpenseWidget from "@/components/widgets/ExpenseWidget";
import HousingWidget from "@/components/widgets/HousingWidget";
import NotificationWidget from "@/components/widgets/NotificationWidget";
import QuickActionsWidget from "@/components/widgets/QuickActionsWidget";
import RoommateWidget from "@/components/widgets/RoommateWidget";
import SuggestionWidget from "@/components/widgets/SuggestionWidget";
import TransportWidget from "@/components/widgets/TransportWidget";

import { getDashboardData } from "@/features/dashboard/services/dashboard.service";
import type { DashboardData } from "@/features/dashboard/types/dashboard.types";

function getFirstName(fullName: string): string {
  const trimmedName = fullName.trim();

  if (!trimmedName) {
    return "there";
  }

  return trimmedName.split(/\s+/)[0];
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#FBFAF5]">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-56 rounded-lg bg-neutral-200" />
          <div className="mt-3 h-4 w-80 max-w-full rounded bg-neutral-200" />

          <div className="mt-8 h-40 rounded-2xl bg-neutral-200" />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-2xl bg-neutral-200"
              />
            ))}
          </div>

          <div className="mt-6 h-72 rounded-2xl bg-neutral-200" />
        </div>
      </main>
    </div>
  );
}

interface DashboardErrorProps {
  message: string;
  onRetry: () => void;
}

function DashboardError({
  message,
  onRetry,
}: DashboardErrorProps) {
  return (
    <div className="min-h-screen bg-[#FBFAF5]">
      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-neutral-900">
            Unable to load dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {message}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(
    async (showFullLoader = true) => {
      if (showFullLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError(null);

      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong while loading the dashboard.";

        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !dashboard) {
    return (
      <DashboardError
        message={
          error ??
          "Dashboard information is currently unavailable."
        }
        onRetry={() => void loadDashboard()}
      />
    );
  }

  const firstName = getFirstName(
    dashboard.user.full_name
  );

  const unreadNotifications =
    dashboard.notifications.filter(
      (notification) => !notification.is_read
    ).length;

  return (
    <div className="min-h-screen bg-[#FBFAF5]">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6B8E23]">
              Relocation Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Welcome back, {firstName}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
              Manage housing, roommates, expenses,
              transport and personalized recommendations
              from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void loadDashboard(false)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-[#6B8E23] hover:text-[#6B8E23] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              {refreshing ? "Refreshing" : "Refresh"}
            </button>

            <Link
              href="/settings"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-2xl bg-[#6B8E23] p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white/75">
                  शहरSaathi AI Insight
                </p>

                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  Your relocation journey is on track
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
                  You have{" "}
                  {dashboard.roommates.total_matches} roommate
                  matches,{" "}
                  {dashboard.housing.saved_listings} saved
                  housing options and{" "}
                  {unreadNotifications} unread notifications.
                  Review your personalized recommendations for
                  the next best action.
                </p>
              </div>
            </div>

            <Link
              href="/suggestions"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#6B8E23] transition hover:bg-[#FBFAF5] lg:self-center"
            >
              View recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-6">
          <QuickActionsWidget />
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <HousingWidget housing={dashboard.housing} />

          <ExpenseWidget expenses={dashboard.expenses} />

          <RoommateWidget roommates={dashboard.roommates} />

          <NotificationWidget
            notifications={dashboard.notifications}
          />

          <TransportWidget
            transport={dashboard.transport}
          />

          <SuggestionWidget
            suggestions={dashboard.aiSuggestions}
          />
        </div>

        <footer className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-neutral-900">
                Complete your profile
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Keep your city, occupation, budget and
                preferences updated for better recommendations.
              </p>
            </div>

            <Link
              href="/settings"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#6B8E23] transition hover:opacity-75 sm:self-center"
            >
              Manage profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}