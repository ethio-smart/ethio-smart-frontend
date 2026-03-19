import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="bg-white border rounded-lg p-5 flex items-start justify-between">

      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>

        <h3 className="text-2xl font-semibold">{value}</h3>

        {description && (
          <p className="text-xs text-gray-400">{description}</p>
        )}
      </div>

      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>

    </div>
  )
}