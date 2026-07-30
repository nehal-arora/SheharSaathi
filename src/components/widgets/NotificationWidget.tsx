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
    className: "bg-[#EEF2E7] text-[#6B8E23]",
  },
  roommate: {
    icon: UserRoundCheck,
    className: "bg-[#EEF2E7] text-[#6B8E23]",
  },
  expense: {
    icon: CircleDollarSign,
    className: "bg-[#EEF2E7] text-[#6B8E23]",
  },
  ai: {
    icon: Bot,
    className: "bg-[#26311D] text-white",
  },
  reminder: {
    icon: CalendarClock,
    className: "bg-[#EEF2E7] text-[#6B8E23]",
  },
  general: {
    icon: Info,
    className: "bg-[#F0F1EC] text-[#64685F]",
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
    <section className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-[#E4E5DE] bg-white shadow-[0_12px_34px_rgba(36,43,29,0.045)]">
      {/* Header */}

      <div className="flex items-start justify-between gap-4 border-b border-[#ECEDE7] px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E7] text-[#6B8E23]">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8E23]">
              Notifications
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-[#252820]">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-[#85887F]">
              Important updates from your relocation workspace.
            </p>
          </div>
        </div>

        <Link
          href="/notifications"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5F7E20] transition hover:text-[#486317]"
        >
          View all

          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-[#85887F]">
            Latest updates
          </p>

          {unreadCount > 0 && (
            <span className="rounded-full bg-[#E7EEDB] px-3 py-1.5 text-xs font-semibold text-[#5F7E20]">
              {unreadCount} unread
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
                  className="flex gap-3 rounded-2xl border border-[#E8E9E3] bg-[#FAFAF7] p-4"
                >
                  <div
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.className}`}
                  >
                    <Icon className="h-4 w-4" />

                    {!notification.is_read && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#6B8E23]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#30332D]">
                          {notification.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#7E8179]">
                          {notification.message}
                        </p>
                      </div>

                      <p className="shrink-0 text-[11px] font-medium text-[#9A9D95]">
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
          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D7DACF] bg-[#FAFAF7] px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E7] text-[#6B8E23]">
              <Sparkles className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#252820]">
              You are all caught up
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#85887F]">
              New housing, expense, roommate and AI updates will appear here.
            </p>
          </div>
        )}

        <div className="mt-auto pt-5">
          <Link
            href="/notifications"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26311D] px-5 text-sm font-semibold text-white transition hover:bg-[#354329]"
          >
            View notifications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}