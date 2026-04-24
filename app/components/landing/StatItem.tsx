import { LucideIcon } from "lucide-react"

type StatItemProps = {
  icon: LucideIcon
  title: string
  subtitle: string
}

function StatItem({ icon: Icon, title, subtitle }: StatItemProps) {
  return (
    <div className="flex gap-4">
      <div className="p-3 size-10 md:size-12 rounded-xl bg-secondary flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export default StatItem