"use client"

import { Bell, Search } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from "@/app/hooks/hooks"
import { RootState } from "@/app/store/store"


export default function DashboardHeader() {
  console.log('first')
    const user = useAppSelector((state: RootState) => state.auth.user)
  console.log('user from header',user)
//flallback profile name incase image is null
  const getInitials = () => {
    if (!user) return ""
    const first = user.firstName?.[0] || ""
    const last = user.lastName?.[0] || ""
    return `${first}${last}`.toUpperCase()
  }
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">

      {/* Search */}
      <div className="relative w-105">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <Input
          placeholder="Search workers or services..."
          className="pl-9"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <div className="text-right">
            <p className="text-xs font-meduim">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500"> {user?.role}</p>
          </div>

          <Avatar className="cursor-pointer size-10">
                <AvatarImage src={user.imageurl} alt={user.firstName}/>
                <AvatarFallback className="bg-gray-200 text-gray-700 font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
        </div>

      </div>
    </header>
  )
}