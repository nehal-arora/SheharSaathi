export type NotificationType =
  | "housing"
  | "roommate"
  | "expense"
  | "ai"
  | "reminder"
  | "general";

export interface Notification {
  id: number;
  user_id?: number;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  unread_count: number;
}

export interface MarkNotificationReadRequest {
  notification_id: number;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
  updated_count: number;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}