"use client"
import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useMemo } from "react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { RootState } from "@/app/store/store"
import ProfileDropdownMenu from "@/app/components/common/ProfileDropdownMenu"
import { fetchNotifications } from "@/app/store/slices/notificationSlice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notificationUIConfig } from "@/app/lib/constants/notificationUIConfig"
import { getNotificationHref } from "@/app/lib/notificationRoute"



export default function DashboardHeader() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useAppSelector((state: RootState) => state.auth.user)
    const { notifications } = useAppSelector((state: RootState) => state.notification)
    const locale = useLocale()

    useEffect(() => {
      if (user) {
        dispatch(fetchNotifications())
      }
    }, [dispatch, user])

    const unreadCount = useMemo(
      () => notifications.filter((notification) => !notification.isRead).length,
      [notifications],
    )
   
  const getInitials = () => {
    if (!user) return ""
    const first = user.firstName?.[0] || ""
    const last = user.lastName?.[0] || ""
    return `${first}${last}`.toUpperCase()
  }
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      
      {/* Search */}
      <div className="relative w-105">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search taskers or services..."
          className="pl-9"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* {isAdmin ? <ThemeToggle /> : null} */}

        {/* Notification */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 top-1 min-h-4 min-w-4 rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-4 text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-96 p-0">
              <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                    {unreadCount} unread
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => {
                    const normalizedType = String(notification.type ?? "").trim().toUpperCase()
                    const config = notificationUIConfig[normalizedType as keyof typeof notificationUIConfig]
                    const Icon = config?.icon
                    const notificationHref = getNotificationHref(notification, locale, user?.role)

                    return (
                      <DropdownMenuItem
                        key={notification.id}
                        className="cursor-pointer px-4 py-3"
                        onClick={() => router.push(notificationHref)}
                      >
                        <div className="flex w-full items-start gap-3">
                          <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg ${config?.bg ?? "bg-muted"}`}>
                            {Icon ? <Icon className={`h-4 w-4 ${config?.color ?? "text-muted-foreground"}`} /> : <Bell className="h-4 w-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-sm font-medium">{notification.title}</p>
                              {!notification.isRead && <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />}
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{notification.message}</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    )
                  })
                )}
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="px-4 py-3">
                <Link href={`/${locale}/notifications`} className="w-full text-center font-medium text-primary">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Profile */}
        <ProfileDropdownMenu >
          <div className="flex items-center gap-3 cursor-pointer rounded-lg border border-transparent px-2 py-1 transition hover:border-border hover:bg-muted/40">
            <div className="text-right">
              <p className="text-xs font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>

            <Avatar className="cursor-pointer size-10">
              <AvatarImage src={user?.imageurl ?? undefined} alt={user?.firstName ?? "Profile"} />
              <AvatarFallback className="bg-gray-200 text-gray-700 font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
        </ProfileDropdownMenu>

      </div>
    </header>
  )
}