
import {
  ClipboardList,
  Activity,
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react"
import StatsCard from "../../../common/StatsCard"

const stats = [
  {
    title: "Total Requests",
    value: 24,
    description: "+12% from last 30 days",
    icon: ClipboardList,
  },
  {
    title: "Active Services",
    value: "03",
    description: "currently in progress",
    icon: Activity,
  },
    {
    title: "Completed Services",
    value: 17,
    description: "successfully finished",
    icon: CheckCircle,
  },
  {
    title: "Pending Responses",
    value: "08",
    description: "waiting worker action",
    icon: Clock,
  },
  {
    title: "Total Invested",
    value: "$4,285",
    description: "total platform spend",
    icon: DollarSign,
  },
]

export default function StatsOverview() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-c">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  )
}