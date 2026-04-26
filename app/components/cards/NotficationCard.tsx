

"use client"

import { notificationUIConfig } from "@/app/lib/constants/notificationUIConfig"
import { Notification } from "@/app/types/types"



export default function NotificationCard({
  notification,
}: {
  notification: Notification
}) {
  const config =
    notificationUIConfig[notification.type as keyof typeof notificationUIConfig]

  const Icon = config?.icon
  // console.log('mmm',config)

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border transition ${
        !notification.isRead ? config.bg : "opacity-70"
      }`}
    >
      {/* icon */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          !notification.isRead ? config.bg : "bg-muted"
        }`}
      >
        {Icon && <Icon className={`h-5 w-5 ${config.color}`} />}
      </div>

      {/* content */}
      <div className="flex-1">
        <h4 className="text-sm font-medium">{notification.title}</h4>

        <p className="text-sm text-muted-foreground">
          {notification.message}
        </p>

        <span className="text-xs text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>

      {/* unread dot */}
      {!notification.isRead && (
        <span className="h-2 w-2 mt-1 rounded-full bg-blue-500" />
      )}
    </div>
  )
}