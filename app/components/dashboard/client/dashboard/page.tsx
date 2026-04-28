'use client"'

import {
  ClipboardList,
  Activity,
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react"
import StatsCard from "../../../common/StatsCard"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { useEffect } from "react"
import { fetchClientOverview, selectClientOverview, selectOverviewLoading } from "@/app/store/slices/overviewSlice"

export default function StatsOverview() {
  const dispatch = useAppDispatch()
  const clientOverview = useAppSelector(selectClientOverview)
  const loading = useAppSelector(selectOverviewLoading)
console.log('🐰😭',clientOverview)
  useEffect(() => {
    dispatch(fetchClientOverview())
  }, [dispatch])

  if (loading) {
    return (
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-c">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </section>
    )
  }

  const stats = [
    {
      title: "Total Requests",
      value: clientOverview?.totals?.totalRequests || 0,
      description: "service requests sent",
      icon: ClipboardList,
    },
    {
      title: "Total Bookings",
      value: clientOverview?.totals?.totalBookings || 0,
      description: "services booked",
      icon: Activity,
    },
    {
      title: "Active Bookings",
      value: clientOverview?.totals?.activeBookings || 0,
      description: "currently in progress",
      icon: CheckCircle,
    },
    {
      title: "Earnings", 
      value: `ETB ${clientOverview?.totals?.earnings || 0}`,
      description: "total spent on services",
      icon: DollarSign,
    },
    {
      title: "Completion Rate",
      value: clientOverview?.totals?.totalBookings > 0 
        ? Math.round(((clientOverview?.totals?.totalBookings - clientOverview?.totals?.activeBookings) / clientOverview?.totals?.totalBookings) * 100)
        : 0,
      description: "services completed",
      icon: Clock,
    },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-c">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  )
}