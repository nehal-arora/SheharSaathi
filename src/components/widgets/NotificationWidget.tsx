import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bot,
  Building2,
  CalendarClock,
  CircleDollarSign,
  Info,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

import type { DashboardNotification } from "@/features/dashboard/types/dashboard.types";

interface NotificationWidgetProps {
  notifications: DashboardNotification[];
}

function formatNotificationDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

const notificationStyles = {
  housing: {
    icon: Building2,
    containerClass:
      "border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]",
    dotClass: "bg-[#8AB59C]",
  },
  roommate: {
    icon: UserRoundCheck,
    containerClass:
      "border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]",
    dotClass: "bg-[#8AB59C]",
  },
  expense: {
    icon: CircleDollarSign,
    containerClass:
      "border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]",
    dotClass: "bg-[#D4A34F]",
  },
  ai: {
    icon: Bot,
    containerClass:
      "border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]",
    dotClass: "bg-[#D4A34F]",
  },
  reminder: {
    icon: CalendarClock,
    containerClass:
      "border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]",
    dotClass: "bg-[#8AB59C]",
  },
  general: {
    icon: Info,
    containerClass:
      "border-white/[0.07] bg-white/[0.04] text-white/55",
    dotClass: "bg-white/60",
  },
} as const;

export default function NotificationWidget({
  notifications,
}: NotificationWidgetProps) {
  const sortedNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 4);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#D4A34F]/10 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0F251E] bg-[#D4A34F] px-1 text-[9px] font-bold text-[#10251D]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Notifications
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-white">
              Recent activity
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/38">
              Important updates from your relocation workspace.
            </p>
          </div>
        </div>

        <Link
          href="/notifications"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#F0C86A] transition hover:text-[#FFE19A]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-white/35">
            Latest updates
          </p>

          {unreadCount > 0 ? (
            <span className="rounded-full border border-[#D4A34F]/15 bg-[#D4A34F]/10 px-3 py-1.5 text-xs font-semibold text-[#F0C86A]">
              {unreadCount} unread
            </span>
          ) : (
            <span className="rounded-full border border-[#8AB59C]/10 bg-[#205C46]/35 px-3 py-1.5 text-xs font-semibold text-[#A5CEB5]">
              All read
            </span>
          )}
        </div>

        {sortedNotifications.length > 0 ? (
          <div className="mt-4 space-y-3">
            {sortedNotifications.map((notification) => {
              const style =
                notificationStyles[notification.type] ??
                notificationStyles.general;

              const Icon = style.icon;

              return (
                <div
                  key={notification.id}
                  className={
                    notification.is_read
                      ? "group flex gap-3 rounded-[16px] border border-white/[0.05] bg-white/[0.02] p-4 transition hover:border-white/[0.09] hover:bg-white/[0.035]"
                      : "group flex gap-3 rounded-[16px] border border-[#D4A34F]/10 bg-[#D4A34F]/[0.035] p-4 transition hover:border-[#D4A34F]/20 hover:bg-[#D4A34F]/[0.055]"
                  }
                >
                  <div
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.containerClass}`}
                  >
                    <Icon className="h-4 w-4" />

                    {!notification.is_read && (
                      <span
                        className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0F251E] ${style.dotClass}`}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className={
                            notification.is_read
                              ? "truncate text-sm font-semibold text-white/72"
                              : "truncate text-sm font-bold text-white"
                          }
                        >
                          {notification.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/35">
                          {notification.message}
                        </p>
                      </div>

                      <p className="shrink-0 text-right text-[10px] font-medium leading-4 text-white/24 sm:text-[11px]">
                        {formatNotificationDate(
                          notification.created_at
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A34F]">
              Inbox clear
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              You are all caught up
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/38">
              New housing, expense, roommate and AI updates will appear here.
            </p>
          </div>
        )}

        <div className="mt-auto pt-5">
          <Link
            href="/notifications"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A34F] px-5 text-sm font-bold text-[#10251D] transition hover:bg-[#E5B65B]"
          >
            View notifications

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}