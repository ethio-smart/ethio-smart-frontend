'use client'

import DashboardHeader from "@/app/components/common/DashboardHeader"

import { useAppSelector } from "@/app/hooks/hooks"
// import { Role } from "../types/types"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Role } from "@/app/types/types"
import Sidebar from "@/app/components/sidebar/SideBar"



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
 const router = useRouter()
  const role = useAppSelector((state) => state.auth.user?.role) as Role
  console.log('role 🎉🎉🎉',role)
  // if (!role) return router.push('/')
    useEffect(() => {
    if (!role) {
      router.push('/')
    }
  }, [role, router])

  if (!role) return null

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      <Sidebar role={role} />

      <div className="flex flex-1 flex-col">

        <div className="sticky top-0 z-50">
          <DashboardHeader/>
        </div>

        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>

      </div>

    </div>
  )
}