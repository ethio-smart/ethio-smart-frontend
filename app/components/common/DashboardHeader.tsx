"use client"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from "@/app/hooks/hooks"
import { RootState } from "@/app/store/store"
import ProfileDropdownMenu from "@/app/components/common/ProfileDropdownMenu"



export default function DashboardHeader() {

    const user = useAppSelector((state: RootState) => state.auth.user)
   
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
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </Button>

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