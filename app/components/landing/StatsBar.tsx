import { MapPin, ShieldCheck, ThumbsUp, Users } from "lucide-react"
import StatItem from "./StatItem"

const stats = [
  {
    icon: Users,
    title: "500+",
    subtitle: "Verified Workers",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    subtitle: "Escrow Payments",
  },
  {
    icon: ThumbsUp,
    title: "4.9/5",
    subtitle: "Average Rating",
  },
  {
    icon: MapPin,
    title: "12+",
    subtitle: "Cities Covered",
  },
]

function StatsBar() {
  return (
 
    <div className="py-6 bg-white w-full mx-auto grid grid-cols-2 gap-3 md:grid-cols-4">
  {stats.map((stat, index) => (
    <div key={index} className="flex items-center justify-center  gap-10">
      <StatItem
        icon={stat.icon}
        title={stat.title}
        subtitle={stat.subtitle}
      />

      {index !== stats.length - 1 && (
        <div className="h-8 w-px bg-neutral-300 hidden md:block" />
      )}
    </div>
  ))}
</div>
  )
}


export default StatsBar