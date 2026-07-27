"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  Bot,
  Building2,
  Check,
  Loader2,
  ReceiptIndianRupee,
  RefreshCw,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  deleteNotification,
  getNotifications,
  markNotificationRead,
} from "@/features/notifications/services/notification.service";

import type {
  Notification,
  NotificationType,
} from "@/features/notifications/types/notification.types";

type NotificationFilter = "all" | "unread";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "housing":
      return Building2;

    case "roommate":
      return UserRound;

    case "expense":
      return ReceiptIndianRupee;

    case "ai":
      return Bot;

    default:
      return Bell;
  }
}

function getNotificationLabel(type: NotificationType): string {
  switch (type) {
    case "housing":
      return "Housing";

    case "roommate":
      return "Roommate";

    case "expense":
      return "Expense";

    case "ai":
      return "AI";

    case "reminder":
      return "Reminder";

    default:
      return "General";
  }
}

function formatNotificationDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <div className="flex gap-4">
            <div className="h-11 w-11 rounded-xl bg-neutral-200" />

            <div className="flex-1">
              <div className="h-4 w-44 rounded bg-neutral-200" />
              <div className="mt-3 h-3 w-full rounded bg-neutral-200" />
              <div className="mt-2 h-3 w-3/4 rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  busy: boolean;
  onMarkRead: (notificationId: number) => void;
  onDelete: (notificationId: number) => void;
}

function NotificationCard({
  notification,
  busy,
  onMarkRead,
  onDelete,
}: NotificationCardProps) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        notification.is_read
          ? "border-neutral-200"
          : "border-[#6B8E23]/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-neutral-900">
                  {notification.title}
                </h2>

                {!notification.is_read && (
                  <span className="rounded-full bg-[#EEF2E4] px-2 py-0.5 text-xs font-semibold text-[#6B8E23]">
                    New
                  </span>
                )}

                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                  {getNotificationLabel(notification.type)}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {notification.message}
              </p>

              <p className="mt-3 text-xs text-neutral-400">
                {formatNotificationDate(notification.created_at)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!notification.is_read && (
                <button
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-[#6B8E23] hover:text-[#6B8E23] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  Mark read
                </button>
              )}

              <button
                type="button"
                onClick={() => onDelete(notification.id)}
                disabled={busy}
                aria-label={`Delete ${notification.title}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [busyNotificationId, setBusyNotificationId] = useState<number | null>(
    null
  );

  const loadNotifications = useCallback(
    async (showFullLoader = true) => {
      if (showFullLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      try {
        const response = await getNotifications();
        setNotifications(response.notifications);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load notifications."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => !notification.is_read).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((notification) => !notification.is_read);
    }

    return notifications;
  }, [filter, notifications]);

  async function handleMarkRead(notificationId: number) {
    setBusyNotificationId(notificationId);
    setError("");

    try {
      await markNotificationRead(notificationId);

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to mark notification as read."
      );
    } finally {
      setBusyNotificationId(null);
    }
  }

  async function handleDelete(notificationId: number) {
    setBusyNotificationId(notificationId);
    setError("");

    try {
      await deleteNotification(notificationId);

      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to delete notification."
      );
    } finally {
      setBusyNotificationId(null);
    }
  }

  function handleMarkAllRead() {
    const unreadIds = notifications
      .filter((notification) => !notification.is_read)
      .map((notification) => notification.id);

    unreadIds.forEach((notificationId) => {
      void handleMarkRead(notificationId);
    });
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6B8E23]">
              Notification Center
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">
              Stay updated
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
              View housing, roommate, expense, AI and reminder updates in one
              place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadNotifications(false)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-[#6B8E23] hover:text-[#6B8E23] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing" : "Refresh"}
          </button>
        </header>

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
                <Bell className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-neutral-500">Unread notifications</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {unreadCount}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-2 self-start rounded-xl bg-[#6B8E23] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:self-center"
              >
                <Check className="h-4 w-4" />
                Mark all as read
              </button>
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === "all"
                ? "bg-[#6B8E23] text-white"
                : "border border-neutral-200 bg-white text-neutral-600 hover:border-[#6B8E23]"
            }`}
          >
            All ({notifications.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === "unread"
                ? "bg-[#6B8E23] text-white"
                : "border border-neutral-200 bg-white text-neutral-600 hover:border-[#6B8E23]"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <section className="mt-6">
          {loading ? (
            <NotificationSkeleton />
          ) : visibleNotifications.length > 0 ? (
            <div className="space-y-4">
              {visibleNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  busy={busyNotificationId === notification.id}
                  onMarkRead={(notificationId) =>
                    void handleMarkRead(notificationId)
                  }
                  onDelete={(notificationId) =>
                    void handleDelete(notificationId)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2E4] text-[#6B8E23]">
                <Bell className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-neutral-900">
                {filter === "unread"
                  ? "No unread notifications"
                  : "No notifications yet"}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {filter === "unread"
                  ? "You are all caught up."
                  : "New updates will appear here when they become available."}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}