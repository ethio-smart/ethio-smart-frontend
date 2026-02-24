import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

function Header() {
  return (
    <header className="flex items-center justify-between h-20 px-10 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/seralink-removebg-preview.png"
          alt="logo"
          width={100}
          height={100}
          className="h-14 w-auto"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* Nav */}
        <nav className="flex gap-10 text-sm text-[#343841]">
          <Link className="hover:text-primary" href="#how-it-work">
            How It Works
          </Link>
          <Link className="hover:text-primary" href="#about">
            About
          </Link>
          <Link className="hover:text-primary" href="#categories">
            Categories
          </Link>
        </nav>
        <span className="h-6 w-px bg-neutral-300" />
        {/* Login */}
        <Link
          className="text-sm text-[#343841] hover:text-primary"
          href="/sign-in">
          Login
        </Link>

        {/* signup */}
        <Button className="bg-primary text-white font-medium px-6">
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}

export default Header
