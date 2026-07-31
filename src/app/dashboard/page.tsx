"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  ComponentType,
  ReactNode,
} from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Heart,
  MapPin,
  RefreshCw,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRoundCheck,
  Users,
  WalletCards,
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

const COLORS = {
  pine: "#205C46",
  pineDark: "#123B2D",
  pineDeep: "#071C17",
  gold: "#D4A34F",
  goldLight: "#F0C86A",
  green: "#8AB59C",
  background: "#071512",
  surface: "#0D211B",
  surfaceLight: "#122A22",
  border: "rgba(212, 163, 79, 0.18)",
  text: "#FBFAF7",
  muted: "#9EAEA7",
};

function getFirstName(fullName?: string | null): string {
  const trimmedName = fullName?.trim();

  if (!trimmedName) {
    return "there";
  }

  return trimmedName.split(/\s+/)[0];
}

function getInitials(fullName?: string | null): string {
  const parts = fullName
    ?.trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts?.length) {
    return "SS";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

function clampPercentage(value: number): number {
  return Math.min(
    Math.max(Number(value) || 0, 0),
    100
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#071512] text-white">
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-16 rounded-2xl bg-white/[0.05]" />

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="h-10 w-80 max-w-full rounded-xl bg-white/[0.05]" />
              <div className="mt-3 h-5 w-[420px] max-w-full rounded-lg bg-white/[0.05]" />
            </div>

            <div className="h-20 w-full rounded-2xl bg-white/[0.05] lg:w-[420px]" />
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[150px] rounded-2xl bg-white/[0.05]"
              />
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="h-[420px] rounded-2xl bg-white/[0.05]" />
            <div className="h-[420px] rounded-2xl bg-white/[0.05]" />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[430px] rounded-2xl bg-white/[0.05]"
              />
            ))}
          </div>
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
    <div className="min-h-screen bg-[#071512] text-white">
      <main className="mx-auto flex min-h-[85vh] w-full max-w-[1600px] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#0D211B] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-300">
            <AlertCircle className="h-6 w-6" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-red-300">
            Dashboard unavailable
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
            We could not load your workspace
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/55">
            {message}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
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

  const greeting = useMemo(() => getGreeting(), []);

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
    dashboard.user?.full_name
  );

  const initials = getInitials(
    dashboard.user?.full_name
  );

  const unreadNotifications =
    dashboard.notifications.filter(
      (notification) => !notification.is_read
    ).length;

  const city =
    dashboard.user.city?.trim() || "Location not added";

  const occupation =
    dashboard.user.occupation?.trim() ||
    "Complete your profile for better recommendations";

  const commute =
    dashboard.transport.estimated_commute ||
    "Not configured";

  const budgetProgress = clampPercentage(
    dashboard.expenses.budget_used_percentage
  );

  const taskItems = [
    {
      label: "Set your monthly budget",
      completed: dashboard.expenses.monthly_budget > 0,
    },
    {
      label: "Add or shortlist housing",
      completed:
        dashboard.housing.total_listings > 0 ||
        dashboard.housing.saved_listings > 0,
    },
    {
      label: "Explore roommate matches",
      completed:
        dashboard.roommates.total_matches > 0,
    },
    {
      label: "Add transport preferences",
      completed: Boolean(
        dashboard.transport.preferred_route ||
          dashboard.transport.nearest_metro ||
          dashboard.transport.estimated_commute
      ),
    },
    {
      label: "Review AI suggestions",
      completed:
        dashboard.aiSuggestions.length > 0,
    },
    {
      label: "Check recent notifications",
      completed:
        dashboard.notifications.length > 0,
    },
  ];

  const completedTasks = taskItems.filter(
    (task) => task.completed
  ).length;

  const taskProgress = Math.round(
    (completedTasks / taskItems.length) * 100
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071512] text-[#FBFAF7]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(32,92,70,0.24),transparent_34%),radial-gradient(circle_at_90%_12%,rgba(212,163,79,0.08),transparent_24%)]" />

      <main className="relative mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        {/* Top navigation bar */}

        <section className="flex flex-col gap-4 rounded-[20px] border border-white/[0.07] bg-[#0B1D18]/90 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

            <input
              type="search"
              placeholder="Search housing, roommates, expenses..."
              className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#D4A34F]/45 focus:bg-white/[0.055]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TopBarItem
              icon={MapPin}
              label={city}
            />

            <TopBarItem
              icon={Sun}
              label="Your workspace"
            />

            <Link
              href="/notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.035] text-white/65 transition hover:border-[#D4A34F]/35 hover:text-[#F0C86A]"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />

              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#D4A34F] px-1 text-[10px] font-black text-[#10251D]">
                  {unreadNotifications > 9
                    ? "9+"
                    : unreadNotifications}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => void loadDashboard(false)}
              disabled={refreshing}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.035] text-white/65 transition hover:border-[#D4A34F]/35 hover:text-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Refresh dashboard"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            <Link
              href="/settings"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.035] text-white/65 transition hover:border-[#D4A34F]/35 hover:text-[#F0C86A]"
              aria-label="Open settings"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Welcome section */}

        <section className="mt-8 grid gap-5 xl:grid-cols-[1fr_420px] xl:items-stretch">
          <div className="flex flex-col justify-center py-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
              शहरSaathi dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl lg:text-[42px]">
              {greeting}, {firstName}!{" "}
              <span aria-hidden="true">👋</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/52 sm:text-base">
              Here is your relocation overview for today.
              Track your search, spending, roommate matches
              and commute from one premium workspace.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-[#D4A34F]/20 bg-gradient-to-br from-[#11251F] to-[#0B1C17] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.22)]">
            <div className="pointer-events-none absolute -bottom-20 -right-12 h-52 w-52 rounded-full bg-[#205C46]/30 blur-[70px]" />

            <div className="relative flex h-full items-center gap-4">
              <div className="text-4xl font-black leading-none text-[#D4A34F]">
                “
              </div>

              <div>
                <p className="text-sm leading-6 text-white/75">
                  Every great move starts with the right
                  information.
                </p>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8AB59C]">
                  Your relocation companion
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main metrics */}

        <section
          aria-label="Dashboard overview"
          className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <PremiumMetricCard
            icon={Building2}
            label="Housing listings"
            value={dashboard.housing.total_listings}
            detail={`${dashboard.housing.active_listings} active listings`}
            href="/housing"
            variant="green"
          />

          <PremiumMetricCard
            icon={WalletCards}
            label="Monthly spending"
            value={formatCurrency(
              dashboard.expenses.total_expenses
            )}
            detail={`of ${formatCurrency(
              dashboard.expenses.monthly_budget
            )} budget`}
            href="/expenses"
            progress={budgetProgress}
            variant="gold"
          />

          <PremiumMetricCard
            icon={Users}
            label="Roommate matches"
            value={dashboard.roommates.total_matches}
            detail={`${dashboard.roommates.favorites} saved profiles`}
            href="/roommates"
            variant="green"
          />

          <PremiumMetricCard
            icon={Bell}
            label="Recent updates"
            value={dashboard.notifications.length}
            detail={`${unreadNotifications} unread notifications`}
            href="/notifications"
            variant="gold"
          />
        </section>

        {/* Main overview panels */}

        <section className="mt-5 grid items-stretch gap-5 xl:grid-cols-[1fr_0.95fr_0.9fr]">
          <Panel className="min-h-[370px]">
            <PanelHeader
              icon={CircleDollarSign}
              title="Budget overview"
              subtitle="Your monthly relocation spending"
            />

            <div className="mt-7 grid gap-7 sm:grid-cols-[170px_1fr] sm:items-center">
              <BudgetRing
                percentage={budgetProgress}
                value={formatCurrency(
                  dashboard.expenses.total_expenses
                )}
                total={formatCurrency(
                  dashboard.expenses.monthly_budget
                )}
              />

              <div className="space-y-3">
                <BudgetRow
                  label="Total spent"
                  value={formatCurrency(
                    dashboard.expenses.total_expenses
                  )}
                  tone="pine"
                />

                <BudgetRow
                  label="Remaining"
                  value={formatCurrency(
                    dashboard.expenses.remaining_budget
                  )}
                  tone="gold"
                />

                <BudgetRow
                  label="Top category"
                  value={
                    dashboard.expenses.top_category ||
                    "Not available"
                  }
                  tone="soft"
                />

                <BudgetRow
                  label="Budget used"
                  value={`${dashboard.expenses.budget_used_percentage}%`}
                  tone="muted"
                />
              </div>
            </div>

            <Link
              href="/expenses"
              className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 text-sm font-bold text-[#F0C86A] transition hover:bg-[#D4A34F] hover:text-[#10251D]"
            >
              View full budget
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Panel>

          <Panel className="min-h-[370px]">
            <PanelHeader
              icon={Bell}
              title="Recent activity"
              subtitle="Latest updates across your workspace"
            />

            <div className="mt-6 space-y-2.5">
              {dashboard.notifications.length > 0 ? (
                dashboard.notifications
                  .slice(0, 5)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#205C46]/35 text-[#8AB59C]">
                        <Bell className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white/85">
                          {notification.title}
                        </p>

                        <p className="mt-1 line-clamp-1 text-xs text-white/38">
                          {notification.message}
                        </p>
                      </div>

                      {!notification.is_read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4A34F]" />
                      )}
                    </div>
                  ))
              ) : (
                <EmptyPanelMessage
                  icon={Bell}
                  title="No recent activity"
                  message="New updates will appear here."
                />
              )}
            </div>

            <Link
              href="/notifications"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 text-sm font-semibold text-white/70 transition hover:border-[#D4A34F]/25 hover:text-[#F0C86A]"
            >
              View all activity
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Panel>

          <Panel className="min-h-[370px]">
            <PanelHeader
              icon={Sparkles}
              title="AI suggestion"
              subtitle="Based on your relocation activity"
              gold
            />

            {dashboard.aiSuggestions.length > 0 ? (
              <div className="mt-6 rounded-[18px] border border-[#8AB59C]/15 bg-gradient-to-br from-[#16382B] to-[#10271F] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A34F]/15 text-[#F0C86A]">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold text-white">
                  {dashboard.aiSuggestions[0].title}
                </h3>

                <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/50">
                  {dashboard.aiSuggestions[0].description}
                </p>

                <Link
                  href={
                    dashboard.aiSuggestions[0].action_url ||
                    "/suggestions"
                  }
                  className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-4 text-sm font-bold text-[#10251D] transition hover:bg-[#E7B65A]"
                >
                  Explore suggestion
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-6">
                <EmptyPanelMessage
                  icon={Sparkles}
                  title="No AI suggestions yet"
                  message="Continue using शहरSaathi to receive personalized insights."
                />
              </div>
            )}

            <div className="mt-5 flex justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A34F]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            </div>
          </Panel>
        </section>

        {/* Locality and task overview */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <PanelHeader
              icon={MapPin}
              title="Your relocation profile"
              subtitle="Current preferences and context"
            />

            <div className="mt-6">
              <p className="text-xl font-bold text-white">
                {city}
              </p>

              <p className="mt-1 text-sm text-[#8AB59C]">
                {occupation}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <ProfileInfo
                icon={ShieldCheck}
                label="Budget status"
                value={
                  dashboard.expenses.monthly_budget > 0
                    ? "Configured"
                    : "Not configured"
                }
              />

              <ProfileInfo
                icon={Heart}
                label="Saved homes"
                value={`${dashboard.housing.saved_listings}`}
              />

              <ProfileInfo
                icon={Route}
                label="Commute"
                value={commute}
              />

              <ProfileInfo
                icon={Users}
                label="Matches"
                value={`${dashboard.roommates.total_matches}`}
              />
            </div>
          </Panel>

          <Panel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <PanelHeader
                icon={CheckCircle2}
                title="Relocation checklist"
                subtitle={`${completedTasks} of ${taskItems.length} completed`}
              />

              <span className="rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 py-1.5 text-xs font-bold text-[#F0C86A]">
                {taskProgress}%
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#205C46] to-[#D4A34F] transition-all duration-700"
                style={{
                  width: `${taskProgress}%`,
                }}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {taskItems.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                >
                  <div
                    className={
                      task.completed
                        ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#205C46] text-[#B8D7C4]"
                        : "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/25"
                    }
                  >
                    {task.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-sm border border-current" />
                    )}
                  </div>

                  <span
                    className={
                      task.completed
                        ? "text-sm font-medium text-white/72"
                        : "text-sm font-medium text-white/40"
                    }
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        {/* Quick actions */}

        <div className="mt-5 dashboard-dark-widget">
          <QuickActionsWidget />
        </div>

        {/* Existing integrated widgets */}

        <section
          aria-label="Relocation information"
          className="mt-5 grid items-stretch gap-5 lg:grid-cols-2"
        >
          <WidgetCell>
            <HousingWidget housing={dashboard.housing} />
          </WidgetCell>

          <WidgetCell>
            <ExpenseWidget expenses={dashboard.expenses} />
          </WidgetCell>

          <WidgetCell>
            <RoommateWidget
              roommates={dashboard.roommates}
            />
          </WidgetCell>

          <WidgetCell>
            <NotificationWidget
              notifications={dashboard.notifications}
            />
          </WidgetCell>

          <WidgetCell>
            <TransportWidget
              transport={dashboard.transport}
            />
          </WidgetCell>

          <WidgetCell>
            <SuggestionWidget
              suggestions={dashboard.aiSuggestions}
            />
          </WidgetCell>
        </section>

        {/* Bottom profile banner */}

        <section className="relative mt-5 overflow-hidden rounded-[22px] border border-[#D4A34F]/25 bg-gradient-to-r from-[#10271F] via-[#132E25] to-[#0D211B] p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/10 blur-[70px]" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4A34F]/15 text-sm font-black text-[#F0C86A]">
                {initials}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
                  Complete your profile
                </p>

                <h2 className="mt-1.5 text-lg font-bold text-white">
                  Unlock better relocation recommendations
                </h2>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-white/45">
                  Keep your city, budget, occupation,
                  lifestyle and commute preferences updated
                  for more accurate results.
                </p>
              </div>
            </div>

            <Link
              href="/settings"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E6B458] lg:self-center"
            >
              Manage profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

interface TopBarItemProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
}

function TopBarItem({
  icon: Icon,
  label,
}: TopBarItemProps) {
  return (
    <div className="hidden h-11 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.035] px-3.5 text-sm font-medium text-white/60 sm:flex">
      <Icon className="h-4 w-4 text-[#D4A34F]" />
      <span className="max-w-[170px] truncate">
        {label}
      </span>
    </div>
  );
}

interface PremiumMetricCardProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string | number;
  detail: string;
  href: string;
  variant: "green" | "gold";
  progress?: number;
}

function PremiumMetricCard({
  icon: Icon,
  label,
  value,
  detail,
  href,
  variant,
  progress,
}: PremiumMetricCardProps) {
  const isGold = variant === "gold";

  return (
    <Link
      href={href}
      className="group relative min-h-[148px] overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-br from-[#10271F] to-[#0C1F19] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/28"
    >
      <div
        className={
          isGold
            ? "pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#D4A34F]/10 blur-[45px]"
            : "pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#205C46]/25 blur-[45px]"
        }
      />

      <div className="relative flex items-start gap-4">
        <div
          className={
            isGold
              ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4A34F]/15 text-[#F0C86A]"
              : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/45 text-[#A6CEB5]"
          }
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/70">
            {label}
          </p>

          <p className="mt-1 truncate text-2xl font-bold tracking-[-0.035em] text-white">
            {value}
          </p>

          <p className="mt-1 truncate text-xs text-white/35">
            {detail}
          </p>
        </div>

        <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-[#F0C86A]" />
      </div>

      {typeof progress === "number" && (
        <div className="relative mt-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D4A34F] to-[#F0C86A]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}

interface PanelProps {
  children: ReactNode;
  className?: string;
}

function Panel({
  children,
  className = "",
}: PanelProps) {
  return (
    <section
      className={`rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.2)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

interface PanelHeaderProps {
  icon: ComponentType<{
    className?: string;
  }>;
  title: string;
  subtitle: string;
  gold?: boolean;
}

function PanelHeader({
  icon: Icon,
  title,
  subtitle,
  gold = false,
}: PanelHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={
          gold
            ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A34F]/15 text-[#F0C86A]"
            : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/40 text-[#9CC5AC]"
        }
      >
        <Icon className="h-4.5 w-4.5" />
      </div>

      <div>
        <h2 className="text-base font-bold text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-white/35">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

interface BudgetRingProps {
  percentage: number;
  value: string;
  total: string;
}

function BudgetRing({
  percentage,
  value,
  total,
}: BudgetRingProps) {
  return (
    <div
      className="relative mx-auto flex h-[164px] w-[164px] items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${COLORS.gold} ${
          percentage * 3.6
        }deg, ${COLORS.pine} ${
          percentage * 3.6
        }deg, rgba(255,255,255,0.06) 0deg)`,
      }}
    >
      <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-[#0D211B] text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <p className="max-w-[100px] truncate text-lg font-bold text-white">
          {value}
        </p>

        <p className="mt-1 max-w-[90px] text-[10px] leading-4 text-white/35">
          of {total}
        </p>
      </div>
    </div>
  );
}

interface BudgetRowProps {
  label: string;
  value: string;
  tone: "pine" | "gold" | "soft" | "muted";
}

function BudgetRow({
  label,
  value,
  tone,
}: BudgetRowProps) {
  const toneClass = {
    pine: "bg-[#205C46]",
    gold: "bg-[#D4A34F]",
    soft: "bg-[#8AB59C]",
    muted: "bg-white/25",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-sm ${toneClass}`}
        />

        <span className="truncate text-xs font-medium text-white/48">
          {label}
        </span>
      </div>

      <span className="max-w-[130px] truncate text-xs font-semibold text-white/76">
        {value}
      </span>
    </div>
  );
}

interface ProfileInfoProps {
  icon: ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
}

function ProfileInfo({
  icon: Icon,
  label,
  value,
}: ProfileInfoProps) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
      <div className="flex items-center gap-2 text-[#8AB59C]">
        <Icon className="h-4 w-4 shrink-0" />

        <p className="truncate text-[11px] font-semibold">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-white/78">
        {value}
      </p>
    </div>
  );
}

interface EmptyPanelMessageProps {
  icon: ComponentType<{
    className?: string;
  }>;
  title: string;
  message: string;
}

function EmptyPanelMessage({
  icon: Icon,
  title,
  message,
}: EmptyPanelMessageProps) {
  return (
    <div className="flex min-h-[190px] flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#205C46]/35 text-[#8AB59C]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-white/75">
        {title}
      </h3>

      <p className="mt-2 max-w-xs text-xs leading-5 text-white/35">
        {message}
      </p>
    </div>
  );
}

interface WidgetCellProps {
  children: ReactNode;
}

function WidgetCell({
  children,
}: WidgetCellProps) {
  return (
    <div className="min-w-0 [&>section]:h-full">
      {children}
    </div>
  );
}