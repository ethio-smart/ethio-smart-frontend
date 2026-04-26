'use client'
import NotificationCard from "@/app/components/cards/NotficationCard"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchNotifications } from "@/app/store/slices/notificationSlice"
import { useEffect } from "react"


export default function Notifications() {
  const dispatch=useAppDispatch()
  const {notifications}=useAppSelector(state=>state.notification)
  // console.log('notifications',notifications)
  useEffect(()=>{dispatch(fetchNotifications())},[dispatch])
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-4 ">
      <h1 className="text-xl font-semibold">Notifications</h1>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  )
}