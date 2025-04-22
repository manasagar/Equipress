import { toast } from "@/components/ui/use-toast"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  timestamp: Date
  read: boolean
}

// Mock notifications
let notifications: Notification[] = [
  {
    id: "1",
    title: "Article Verified",
    message: "Your article 'New Breakthrough in Renewable Energy Storage' has been verified.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "New Analysis Required",
    message: "A new article is waiting for your analysis: 'Global Economic Forum Announces New Climate Initiative'",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    title: "Reputation Increased",
    message: "Your reputation score has increased to 87 based on recent activity.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
]

// Get all notifications
export function getNotifications(): Notification[] {
  return [...notifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Get unread notifications count
export function getUnreadCount(): number {
  return notifications.filter((n) => !n.read).length
}

// Mark a notification as read
export function markAsRead(id: string): void {
  notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
}

// Mark all notifications as read
export function markAllAsRead(): void {
  notifications = notifications.map((n) => ({ ...n, read: true }))
}

// Add a new notification
export function addNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): void {
  const newNotification: Notification = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date(),
    read: false,
    ...notification,
  }

  notifications.unshift(newNotification)

  // Show toast for new notification
  toast({
    title: notification.title,
    description: notification.message,
    variant: notification.type === "error" ? "destructive" : "default",
  })
}
