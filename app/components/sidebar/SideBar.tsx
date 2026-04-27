"use client"
import { navigation } from "@/app/config/navigation"
import { useAppDispatch } from "@/app/hooks/hooks"
import { logout } from "@/app/store/slices/authSlice"
import { Role } from "@/app/types/types"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
  role: Role
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const navItems = navigation[role]
  const router=useRouter()
  const dispatch = useAppDispatch()
    const [loggingOut, setLoggingOut] = useState(false)
    
    // Get current locale from pathname
    const getCurrentLocale = () => {
      const segments = pathname.split("/").filter(Boolean)
      return segments[0] || "en"
    }
    
    const currentLocale = getCurrentLocale()
    
    //handle logout
   const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      dispatch(logout())
      router.push(`/${currentLocale}`)
    }, 800) 
  }

  return (
    <>
    {/* Logout Spinner */}
      {loggingOut && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <Loader2 className="size-10 animate-spin text-primary" />
          <span>logging out...</span>
        </div>
      )}
      {/* Sidebar Content  */}

    <aside className="flex h-screen w-64 flex-col border-r bg-card">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <Link href={`/${currentLocale}`}>
        <Image
          src="/seralink-logo-removebg-preview.png"
          alt="logo"
          width={120}
          height={40}
          className="h-14 w-auto"
        />
      </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(`/${currentLocale}${item.href}`)
        // console.log('current route',isActive)
          return (
            <Link
              key={item.name}
              href={`/${currentLocale}${item.href}`}
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
      <div className="border-t p-4 text-sm">
        <button className="w-full text-left text-red-500 hover:text-red-600" onClick={handleLogout} disabled={loggingOut}>
          Sign Out
        </button>
      </div>

    </aside>
    </>
  )
}