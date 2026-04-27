'use client'
import NotificationCard from "@/app/components/cards/NotficationCard"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchNotifications } from "@/app/store/slices/notificationSlice"
import { getNotificationHref } from "@/app/lib/notificationRoute"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Notifications() {
  const dispatch=useAppDispatch()
  const router = useRouter()
  const locale = useLocale()
  const { notifications } = useAppSelector(state=>state.notification)
  const userRole = useAppSelector((state) => state.auth.user?.role)
  // console.log('notifications',notifications)
  useEffect(()=>{dispatch(fetchNotifications())},[dispatch])

  const handleNotificationClick = (notification: (typeof notifications)[number]) => {
    const href = getNotificationHref(notification, locale, userRole)
    router.push(href)
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-4 ">
      <h1 className="text-xl font-semibold">Notifications</h1>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClick={handleNotificationClick}
        />
      ))}
    </div>
  )
}