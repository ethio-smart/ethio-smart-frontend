"use client"

import { Bell, Search } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function DashboardHeader() {
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
      <div className="flex items-center gap-4">

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <div className="text-right">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-gray-500"> Client</p>
          </div>

          <Image
            src="/profile.png"
            alt="profile"
            width={36}
            height={36}
            className="rounded-full object-cover size-10"
          />
        </div>

      </div>
    </header>
  )
}