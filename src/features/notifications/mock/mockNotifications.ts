import type {
  Notification,
  NotificationListResponse,
} from "../types/notification.types";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    user_id: 1,
    title: "New roommate interested",
    message:
      "A new roommate has expressed interest in your profile.",
    type: "roommate",
    is_read: false,
    created_at: "2026-07-28T10:15:00Z",
  },
  {
    id: 2,
    user_id: 1,
    title: "Budget Alert",
    message:
      "You have used 80% of your monthly relocation budget.",
    type: "expense",
    is_read: false,
    created_at: "2026-07-28T08:30:00Z",
  },
  {
    id: 3,
    user_id: 1,
    title: "Housing Recommendation",
    message:
      "A new property matching your preferences is available.",
    type: "housing",
    is_read: true,
    created_at: "2026-07-27T16:45:00Z",
  },
  {
    id: 4,
    user_id: 1,
    title: "AI Suggestion",
    message:
      "Consider exploring GTB Nagar for lower commute times.",
    type: "ai",
    is_read: false,
    created_at: "2026-07-27T13:10:00Z",
  },
];

export const mockNotificationResponse: NotificationListResponse =
  {
    notifications: mockNotifications,
    total: mockNotifications.length,
    unread_count: mockNotifications.filter(
      (notification) => !notification.is_read
    ).length,
  };