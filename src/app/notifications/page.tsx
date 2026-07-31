"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  Bell,
  Bot,
  Building2,
  Check,
  Loader2,
  ReceiptIndianRupee,
  RefreshCw,
  Sparkles,
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

function getNotificationIcon(
  type: NotificationType
) {
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

function getNotificationLabel(
  type: NotificationType
): string {
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

function formatNotificationDate(
  date: string
): string {
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
      {Array.from({ length: 4 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[26px] border border-[#205C46]/30 bg-[#0D211B] p-5"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-[16px] bg-[#163329]" />

              <div className="flex-1">
                <div className="h-4 w-44 rounded bg-[#163329]" />

                <div className="mt-4 h-3 w-full rounded bg-[#163329]" />

                <div className="mt-2 h-3 w-3/4 rounded bg-[#163329]" />

                <div className="mt-4 h-3 w-28 rounded bg-[#163329]" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  busy: boolean;
  onMarkRead: (
    notificationId: number
  ) => void;
  onDelete: (
    notificationId: number
  ) => void;
}

function NotificationCard({
  notification,
  busy,
  onMarkRead,
  onDelete,
}: NotificationCardProps) {
  const Icon = getNotificationIcon(
    notification.type
  );

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[26px] border bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)]",
        notification.is_read
          ? "border-[#205C46]/30"
          : "border-[#D4A34F]/35",
      ].join(" ")}
    >
      {!notification.is_read && (
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#F0C86A] to-[#B27B2D]" />
      )}

      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#D4A34F]/8 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border",
            notification.is_read
              ? "border-[#205C46]/35 bg-[#10271F] text-[#8FA59B]"
              : "border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-[#FBFAF7]">
                  {notification.title}
                </h2>

                {!notification.is_read && (
                  <span className="rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F0C86A]">
                    New
                  </span>
                )}

                <span className="rounded-full border border-[#205C46]/35 bg-[#10271F] px-2.5 py-1 text-[11px] font-semibold text-[#9EAEA7]">
                  {getNotificationLabel(
                    notification.type
                  )}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-[#B8C5BF]">
                {notification.message}
              </p>

              <p className="mt-3 text-xs font-medium text-[#6F8179]">
                {formatNotificationDate(
                  notification.created_at
                )}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!notification.is_read && (
                <button
                  type="button"
                  onClick={() =>
                    onMarkRead(notification.id)
                  }
                  disabled={busy}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 text-xs font-bold text-[#F0C86A] transition hover:bg-[#D4A34F]/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}

                  Mark Read
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  onDelete(notification.id)
                }
                disabled={busy}
                aria-label={`Delete ${notification.title}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300 transition hover:bg-red-400/15 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
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
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [filter, setFilter] =
    useState<NotificationFilter>("all");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    busyNotificationId,
    setBusyNotificationId,
  ] = useState<number | null>(null);

  const [markingAll, setMarkingAll] =
    useState(false);

  const loadNotifications = useCallback(
    async (showFullLoader = true) => {
      if (showFullLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      try {
        const response =
          await getNotifications();

        setNotifications(
          response.notifications
        );
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
      notifications.filter(
        (notification) =>
          !notification.is_read
      ).length,
    [notifications]
  );

  const visibleNotifications =
    useMemo(() => {
      if (filter === "unread") {
        return notifications.filter(
          (notification) =>
            !notification.is_read
        );
      }

      return notifications;
    }, [filter, notifications]);

  async function handleMarkRead(
    notificationId: number
  ) {
    setBusyNotificationId(
      notificationId
    );

    setError("");

    try {
      await markNotificationRead(
        notificationId
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (notification) =>
              notification.id ===
              notificationId
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

  async function handleDelete(
    notificationId: number
  ) {
    setBusyNotificationId(
      notificationId
    );

    setError("");

    try {
      await deleteNotification(
        notificationId
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.filter(
            (notification) =>
              notification.id !==
              notificationId
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

  async function handleMarkAllRead() {
    const unreadIds = notifications
      .filter(
        (notification) =>
          !notification.is_read
      )
      .map(
        (notification) =>
          notification.id
      );

    if (unreadIds.length === 0) {
      return;
    }

    try {
      setMarkingAll(true);
      setError("");

      await Promise.all(
        unreadIds.map(
          (notificationId) =>
            markNotificationRead(
              notificationId
            )
        )
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (notification) => ({
              ...notification,
              is_read: true,
            })
          )
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to mark all notifications as read."
      );
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-9">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles className="h-4 w-4" />
                Notification Center
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                Stay
                <span className="block text-[#F0C86A]">
                  Updated
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B8C5BF] sm:text-base">
                View housing, roommate, expense,
                AI and reminder updates from one
                place.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                void loadNotifications(false)
              }
              disabled={refreshing}
              className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-5 text-sm font-bold text-[#F0C86A] transition hover:bg-[#D4A34F]/15 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
            >
              <RefreshCw
                className={[
                  "h-4 w-4",
                  refreshing
                    ? "animate-spin"
                    : "",
                ].join(" ")}
              />

              {refreshing
                ? "Refreshing"
                : "Refresh"}
            </button>
          </div>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-[28px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4A34F]/8 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Bell className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  Unread Notifications
                </p>

                <p className="mt-1 text-3xl font-bold text-[#FBFAF7]">
                  {unreadCount}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() =>
                  void handleMarkAllRead()
                }
                disabled={markingAll}
                className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-2xl bg-[#D4A34F] px-5 text-sm font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
              >
                {markingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}

                {markingAll
                  ? "Marking..."
                  : "Mark All as Read"}
              </button>
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <FilterButton
            active={filter === "all"}
            onClick={() =>
              setFilter("all")
            }
          >
            All ({notifications.length})
          </FilterButton>

          <FilterButton
            active={filter === "unread"}
            onClick={() =>
              setFilter("unread")
            }
          >
            Unread ({unreadCount})
          </FilterButton>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />

            <p>{error}</p>
          </div>
        )}

        <section className="mt-6">
          {loading ? (
            <NotificationSkeleton />
          ) : visibleNotifications.length >
            0 ? (
            <div className="space-y-4">
              {visibleNotifications.map(
                (notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={
                      notification
                    }
                    busy={
                      busyNotificationId ===
                      notification.id
                    }
                    onMarkRead={(
                      notificationId
                    ) =>
                      void handleMarkRead(
                        notificationId
                      )
                    }
                    onDelete={(
                      notificationId
                    ) =>
                      void handleDelete(
                        notificationId
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <section className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

              <div className="relative flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Bell className="h-10 w-10" />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                  Notification Center
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                  {filter === "unread"
                    ? "No Unread Notifications"
                    : "No Notifications Yet"}
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
                  {filter === "unread"
                    ? "You are all caught up. New unread updates will appear here."
                    : "Housing, roommate, expense, AI and reminder updates will appear here when available."}
                </p>
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({
  active,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-5 py-2.5 text-sm font-bold transition",
        active
          ? "border-[#D4A34F] bg-[#D4A34F] text-[#071512]"
          : "border-[#205C46]/40 bg-[#0D211B] text-[#9EAEA7] hover:border-[#D4A34F]/30 hover:text-[#F0C86A]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}