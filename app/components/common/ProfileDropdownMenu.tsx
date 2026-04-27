
"use client"

import Link from "next/link"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LayoutDashboard, Loader2, LogOut, Settings, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { logout } from "@/app/store/slices/authSlice"
import { useRouter } from "next/navigation"
import { RootState } from "@/app/store/store"
import { Role } from "@/app/types/types"
import ThemeToggle from "@/app/components/common/ThemeToggle"
import { useLocale } from "next-intl"

interface Props {
  children: React.ReactNode
}

function ProfileDropdownMenu({ children }: Props) {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector((state: RootState) => state.auth)
  // console.log('user role💥💥💥💥💥💥',userRole)
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
const locale=useLocale()
  const resolveDashboardPath = (role?: Role) => {
    if (role === "TASKER") return `/tasker/dashboard`
    if (role === "SUPER_ADMIN" ) return `/admin/dashboard`
     if (role ===   "SYSTEM_ADMIN") return `/admin/tasker-admin`
    if (role === "USER"  ) return `/client/dashboard`
    return `/client/dashboard` // fallback
  }

  const resolveProfilePath = (role?: Role) => {
    if (role === "TASKER") return  `/tasker/profile`
    if (role === "SUPER_ADMIN" || role === "SYSTEM_ADMIN") return  `/admin/profile`
    return `/client/profile`
  }

  // const resolveSettingsPath = (role?: Role) => {
  //   if (role === "TASKER") return `${locale}/tasker/profile`
  //   if (role === "SUPER_ADMIN" || role === "SYSTEM_ADMIN" || role === "OFFICER") return `${locale}/admin/settings`
  //   return `${locale}/client/settings`
  // }

  const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      dispatch(logout())
      router.push("/sign-in")
    }, 800) 
  }

  return (
    <>
      {/* Full screen logout spinner */}
      {loggingOut && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <Loader2 className="size-10 animate-spin text-primary" />
          <span className="ml-2">Logging out...</span>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <div className="px-2 pb-2 pt-1">
              <ThemeToggle />
            </div>

            <DropdownMenuItem asChild>
              <Link href={resolveDashboardPath(user?.role)}>
                <LayoutDashboard />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={resolveProfilePath(user?.role)}>
                <User />
                Profile
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem asChild>
              <Link href={resolveSettingsPath(user?.role)}>
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ProfileDropdownMenu