import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BellRing,
} from "lucide-react";

import type { DashboardNotification } from "@/features/dashboard/types/dashboard.types";

interface NotificationWidgetProps {
  notifications: DashboardNotification[];
}

export default function NotificationWidget({
  notifications,
}: NotificationWidgetProps) {
  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Notifications
            </h2>

            <p className="text-sm text-neutral-500">
              Stay updated
            </p>
          </div>
        </div>

        <Link
          href="/notifications"
          className="flex items-center gap-1 text-sm font-medium text-[#6B8E23]"
        >
          Open
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-neutral-50 p-4">
        <div>
          <p className="text-sm text-neutral-500">
            Unread Notifications
          </p>

          <p className="mt-1 text-3xl font-bold">
            {unreadCount}
          </p>
        </div>

        <BellRing className="h-8 w-8 text-[#6B8E23]" />
      </div>

      <div className="mt-5 space-y-3">
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className="rounded-xl border border-neutral-200 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {notification.title}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {notification.message}
                </p>
              </div>

              {!notification.is_read && (
                <span className="h-3 w-3 rounded-full bg-[#6B8E23]" />
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-5 text-center text-sm text-neutral-500">
            No notifications yet.
          </div>
        )}
      </div>
    </section>
  );
}