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

import type {
  DashboardNotification,
} from "@/features/dashboard/types/dashboard.types";

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
    iconClass: "bg-[#EEF4E3] text-[#668326]",
    lineClass: "bg-[#C9DAA8]",
  },
  roommate: {
    icon: UserRoundCheck,
    iconClass: "bg-[#F2ECF8] text-[#7A63A2]",
    lineClass: "bg-[#D8CBE8]",
  },
  expense: {
    icon: CircleDollarSign,
    iconClass: "bg-[#FFF2DE] text-[#B4741E]",
    lineClass: "bg-[#E9C98E]",
  },
  ai: {
    icon: Bot,
    iconClass: "bg-[#202918] text-[#C8E894]",
    lineClass: "bg-[#9DBE61]",
  },
  reminder: {
    icon: CalendarClock,
    iconClass: "bg-[#EAF3F7] text-[#4F8099]",
    lineClass: "bg-[#BCD4DF]",
  },
  general: {
    icon: Info,
    iconClass: "bg-[#F1F1ED] text-[#666B62]",
    lineClass: "bg-[#D8D9D2]",
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
    .slice(0, 5);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[#E6E2D8] bg-[#FFFEFA] shadow-[0_26px_70px_rgba(42,45,34,0.07)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D9D2EE]/25 blur-[90px]" />

      <div className="relative p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#6F5A91] text-white shadow-[0_12px_30px_rgba(111,90,145,0.2)]">
              <Bell className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#765F99]">
                Activity centre
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#2C2930]">
                Recent updates
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-[#77727B]">
                Stay updated on important relocation activity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#765F99]/10 px-3 py-1.5 text-xs font-extrabold text-[#765F99]">
                {unreadCount} unread
              </span>
            )}

            <Link
              href="/notifications"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DDEC] bg-white text-[#765F99] shadow-sm transition hover:bg-[#765F99] hover:text-white"
              aria-label="View all notifications"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {sortedNotifications.length > 0 ? (
          <div className="mt-7">
            {sortedNotifications.map(
              (notification, index) => {
                const style =
                  notificationStyles[
                    notification.type
                  ] ?? notificationStyles.general;

                const Icon = style.icon;

                return (
                  <div
                    key={notification.id}
                    className="relative flex gap-4"
                  >
                    <div className="relative flex shrink-0 flex-col items-center">
                      <div
                        className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-[16px] ${style.iconClass}`}
                      >
                        <Icon className="h-4.5 w-4.5" />

                        {!notification.is_read && (
                          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#FFFEFA] bg-[#E06C55]" />
                        )}
                      </div>

                      {index <
                        sortedNotifications.length - 1 && (
                        <div
                          className={`my-2 h-full min-h-14 w-px ${style.lineClass}`}
                        />
                      )}
                    </div>

                    <div
                      className={`min-w-0 flex-1 ${
                        index <
                        sortedNotifications.length - 1
                          ? "pb-6"
                          : "pb-1"
                      }`}
                    >
                      <div className="rounded-[22px] border border-black/[0.05] bg-white p-4 shadow-[0_8px_24px_rgba(40,42,34,0.035)]">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate font-black text-[#302E31]">
                                {notification.title}
                              </h3>

                              {!notification.is_read && (
                                <span className="shrink-0 rounded-full bg-[#FDEBE6] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#BC5F49]">
                                  New
                                </span>
                              )}
                            </div>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#77727B]">
                              {notification.message}
                            </p>
                          </div>

                          <p className="shrink-0 text-xs font-semibold text-[#A09BA3]">
                            {formatNotificationDate(
                              notification.created_at
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="mt-7 rounded-[28px] border border-dashed border-[#DCD5E5] bg-[#F8F5FB] px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-[#8068A0] shadow-sm">
              <Sparkles className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-xl font-black tracking-[-0.02em] text-[#302A38]">
              You are all caught up
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A7282]">
              New housing, roommate, expense and AI updates
              will appear here.
            </p>
          </div>
        )}

        {notifications.length > 5 && (
          <Link
            href="/notifications"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#F2EDF7] px-4 text-sm font-extrabold text-[#765F99] transition hover:bg-[#765F99] hover:text-white"
          >
            View all {notifications.length} notifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </section>
  );
}