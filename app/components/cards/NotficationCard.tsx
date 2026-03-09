/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  CheckCircle,
  CreditCard,
  MessageSquare,
  UserCheck,
  Star,
} from "lucide-react"

const iconMap = {
  check: CheckCircle,
  payment: CreditCard,
  message: MessageSquare,
  assigned: UserCheck,
  rating: Star,
}

export default function NotificationCard({ notification }: any) {
  const Icon = iconMap[notification.icon as keyof typeof iconMap]

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border hover:bg-muted/40">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${notification.iconColor}`}>
        {Icon && <Icon className="h-5 w-5" />}
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium">{notification.title}</h4>

        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>

        <span className="text-xs text-muted-foreground">
          {notification.time}
        </span>
      </div>

      {notification.unread && (
        <span className="h-2 w-2 mt-1 rounded-full bg-blue-500"></span>
      )}
    </div>
  )
}