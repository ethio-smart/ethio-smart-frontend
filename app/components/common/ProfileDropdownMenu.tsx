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

import { Loader2 } from "lucide-react"
import { useAppDispatch } from "@/app/hooks/hooks"
import { logout } from "@/app/store/slices/authSlice"
import { useRouter } from "next/navigation"
import { Role } from "@/app/types/types"
import { useLocale } from "next-intl"

interface Props {
  children: React.ReactNode
  role:Role
}

function ProfileDropdownMenu({ children,role }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const roleRouteMap: Record<string, string> = {
  user: "client",
  tasker: "tasker",
  admin: "admin",
}
  const normalizedRole = roleRouteMap[role.toLowerCase()] || role.toLowerCase()
     const locale=useLocale()
  const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      dispatch(logout())
      router.push("/")
    }, 200) 
  }

  return (
    <>
      {/* Full screen logout spinner */}
      {loggingOut && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-white">
          <Loader2 className="size-10 animate-spin text-primary" />
          <span>logging out...</span>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`${locale}/${normalizedRole}/dashboard`}>Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ProfileDropdownMenu