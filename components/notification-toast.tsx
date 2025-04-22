"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"
import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
  type Notification,
} from "@/services/notification-service"
import { useWallet } from "@/hooks/use-wallet"
import { formatDistanceToNow } from "date-fns"

export function NotificationToast() {
  const { isConnected } = useWallet()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isConnected) {
      // Load notifications
      setNotifications(getNotifications())
      setUnreadCount(getUnreadCount())

      // Set up interval to check for new notifications
      const interval = setInterval(() => {
        setNotifications(getNotifications())
        setUnreadCount(getUnreadCount())
      }, 30000) // Check every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isConnected])

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    setNotifications(getNotifications())
    setUnreadCount(getUnreadCount())
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    setNotifications(getNotifications())
    setUnreadCount(getUnreadCount())
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setIsOpen(!isOpen)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>

        {isOpen && (
          <Card className="absolute bottom-12 right-0 w-80 md:w-96">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
              <CardDescription>You have {unreadCount} unread notifications</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">No notifications</p>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-3 ${notification.read ? "" : "bg-muted/50"}`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{notification.message}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-auto p-0 text-xs"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
