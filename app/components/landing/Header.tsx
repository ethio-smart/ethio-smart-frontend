
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation"

import { IoIosNotificationsOutline } from "react-icons/io"
import { Menu, X, Globe, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import ProfileDropdownMenu from "../common/ProfileDropdownMenu"
import { RootState } from "@/app/store/store"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchNotifications } from "@/app/store/slices/notificationSlice"

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const user = useSelector((state: RootState) => state.auth.user)

  const router = useRouter()
  const pathname = usePathname()

  const locales = [
    { code: "en", label: "English" },
    { code: "am", label: "አማርኛ" },
    { code: "om", label: "Afaan Oromo" },
  ]
//notification
 const dispatch=useAppDispatch()
  const {notifications}=useAppSelector(state=>state.notification)
  // console.log('notifications',notifications)
  useEffect(()=>{dispatch(fetchNotifications())},[dispatch])
const unreadCount = notifications.filter(
  (n) => !n.isRead
).length

  const supportedLocales = locales.map((l) => l.code)

  // detect locale safely
  const segments = pathname.split("/").filter(Boolean)
  const currentLocale = supportedLocales.includes(segments[0])
    ? segments[0]
    : "en"

  const changeLocale = (nextLocale: string) => {
    const newSegments = [...segments]

    if (supportedLocales.includes(newSegments[0])) {
      newSegments[0] = nextLocale
    } else {
      newSegments.unshift(nextLocale)
    }

    router.push("/" + newSegments.join("/"))
  }

  const getInitials = () => {
    if (!user) return ""
    const first = user.firstName?.[0] || ""
    const last = user.lastName?.[0] || ""
    return `${first}${last}`.toUpperCase()
  }

  return (
    <header className="flex items-center justify-between h-20 px-6 md:px-10 bg-white border-b">

      {/* Logo */}
      <Link href={`/${currentLocale}`}>
        <Image
          src="/seralink-removebg-preview.png"
          alt="logo"
          width={120}
          height={40}
          className="h-14 w-auto"
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1">
              <Globe size={20} />
              <span className="text-sm uppercase">{currentLocale}</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            {locales.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                className="flex items-center justify-between cursor-pointer"
              >
                {lang.label}
                {currentLocale === lang.code && <Check size={16} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/*  nav */}
        {!user && (
          <>
            <nav className="flex gap-8 text-sm">
              <Link href={`/${currentLocale}`}>Home</Link>
              <Link href={`/${currentLocale}#how-it-work`}>How It Works</Link>
              <Link href={`/${currentLocale}#about`}>About</Link>
              <Link href={`/${currentLocale}#categories`}>Categories</Link>
            </nav>

            <span className="h-6 w-px bg-neutral-300" />
          </>
        )}

        {/* User */}
        {user ? (
          <div className="flex items-center gap-4">

            <Link href={`/${currentLocale}/notifications`}>
              <div className="relative cursor-pointer">
                <span className="bg-red-600 absolute left-3 -top-1 text-white text-[8px] size-3 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
                <IoIosNotificationsOutline size={20} />
              </div>
            </Link>

            <ProfileDropdownMenu role={user.role}>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.imageurl} alt={user.firstName} />
                <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </ProfileDropdownMenu>

          </div>
        ) : (
          <>
            <Link href={`/${currentLocale}/sign-in`}>Login</Link>

            <Button asChild>
              <Link href={`/${currentLocale}/sign-up`}>Get Started</Link>
            </Button>
          </>
        )}
      </div>

      {/* Mobile button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <Menu size={28} />
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white p-6 z-50">

          <div className="flex justify-between mb-8">
            <Image
              src="/seralink-removebg-preview.png"
              alt="logo"
              width={20}
              height={20}
            />

            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-lg">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <Globe size={20} />
                  <span className="uppercase">{currentLocale}</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                {locales.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLocale(lang.code)}
                    className="flex justify-between cursor-pointer"
                  >
                    {lang.label}
                    {currentLocale === lang.code && <Check size={16} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {!user && (
              <>
                <Link href={`/${currentLocale}#how-it-work`}>How It Works</Link>
                <Link href={`/${currentLocale}#about`}>About</Link>
                <Link href={`/${currentLocale}#categories`}>Categories</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                <IoIosNotificationsOutline size={22} />

                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.imageurl} />
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                m
              </div>
            ) : (
              <>
                <Link href={`/${currentLocale}/sign-in`}>Login</Link>

                <Button asChild>
                  <Link href={`/${currentLocale}/sign-up`}>Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header