"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

import { IoIosNotificationsOutline } from "react-icons/io"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import ProfileDropdownMenu from "../common/ProfileDropdownMenu"
import { RootState } from "@/app/store/store"


function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const user = useSelector((state: RootState) => state.auth.user)
 
  const getInitials = () => {
    if (!user) return ""
    const first = user.firstName?.[0] || ""
    const last = user.lastName?.[0] || ""
    return `${first}${last}`.toUpperCase()
  }

  return (
    <header className="flex items-center justify-between h-20 px-6 md:px-10 bg-white border-b">

      {/* Logo */}
      <Link href="/">
        <Image
          src="/seralink-removebg-preview.png"
          alt="logo"
          width={120}
          height={40}
          className="h-14 w-auto"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">

        {!user && (
          <>
            <nav className="flex gap-8 text-sm">
              <Link href="/">Home</Link>
              <Link href="#how-it-work">How It Works</Link>
              <Link href="#about">About</Link>
              <Link href="#categories">Categories</Link>
            </nav>

            <span className="h-6 w-px bg-neutral-300" />
          </>
        )}

        {user ? (
          <div className="flex items-center gap-4">

            {/* Notification */}
            <Link href="/notifications">
              <div className="relative cursor-pointer">
                <span className="bg-red-600 absolute left-3 -top-1 text-white text-[8px] size-3 rounded-full flex items-center justify-center">
                  2
                </span>
                <IoIosNotificationsOutline size={20} />
              </div>
            </Link>

            {/* Profile */}
            <ProfileDropdownMenu>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.imageurl} alt={user.firstName}/>
                <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </ProfileDropdownMenu>

          </div>
        ) : (
          <>
            <Link href="/sign-in">Login</Link>

            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </>
        )}

      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <Menu size={28} />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white p-6 z-50">

          <div className="flex justify-between mb-8">
            <Image
              src="/seralink-removebg-preview.png"
              alt="logo"
              width={100}
              height={40}
            />

            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-lg">

            {!user && (
              <>
                <Link href="#how-it-work">How It Works</Link>
                <Link href="#about">About</Link>
                <Link href="#categories">Categories</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4">

                <IoIosNotificationsOutline size={22} />

                <Avatar size="lg" className="size-44 w-20">
                  <AvatarImage src={user.imageurl}  />
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>

              </div>
            ) : (
              <>
                <Link href="/sign-in">Login</Link>

                <Button asChild>
                  <Link href="/sign-up">Get Started</Link>
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