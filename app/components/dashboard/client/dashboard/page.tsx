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
      value: clientOverview?.totalRequests || 0,
      description: "+12% from last 30 days",
      icon: ClipboardList,
    },
    {
      title: "Active Services",
      value: clientOverview?.activeServices || 0,
      description: "currently in progress",
      icon: Activity,
    },
    {
      title: "Completed Services",
      value: clientOverview?.completedServices || 0,
      description: "successfully finished",
      icon: CheckCircle,
    },
    {
      title: "Pending Responses",
      value: clientOverview?.pendingResponses || 0,
      description: "waiting tasker action",
      icon: Clock,
    },
    {
      title: "Total Invested",
      value: `ETB ${clientOverview?.totalInvested || 0}`,
      description: "total platform spend",
      icon: DollarSign,
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