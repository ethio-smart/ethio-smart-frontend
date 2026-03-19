"use client"

import { navigation } from "@/app/config/navigation"
import { Role } from "@/app/types/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface SidebarProps {
  role: Role
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const navItems = navigation[role]

  return (
    <aside className="w-64 h-screen border-r flex flex-col bg-white">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/dashboard" className="text-lg font-semibold text-primary">
          Ethio Smart
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
        console.log('current route',isActive)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-primary text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-white" : "text-primary"
                }`}
              />
              {item.name}
            </Link>
          )
        })}

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t text-sm">
        <button className="w-full text-left text-red-500 hover:text-red-600">
          Sign Out
        </button>
      </div>

    </aside>
  )
}