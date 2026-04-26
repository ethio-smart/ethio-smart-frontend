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
import { Role } from "@/app/types/types"
import ThemeToggle from "./ThemeToggle"

interface Props {
  children: React.ReactNode
  role:Role
}

function ProfileDropdownMenu({ children,role }: Props) {
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.auth.user?.role)
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      dispatch(logout())
      router.push("/")
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
              {/* <Link href={resolveDashboardPath(userRole)}>
                <LayoutDashboard />
                Dashboard */}
              {/* </Link> */}
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/client/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              {/* <Link href={resolveSettingsPath(userRole)}>
                <Settings />
                Settings
              </Link> */}
            </DropdownMenuItem>
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