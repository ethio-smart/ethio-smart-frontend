import { Card, CardContent } from "@/components/ui/card"

interface Props {
  title: string
  value: string
  subtitle?: string
  trend?: string
  icon: React.ReactNode
}

export default function PaymentStatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
}: Props) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-start justify-between py-0">

        <div className="space-y-">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-semibold">{value}</h3>

          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          {icon}

          {trend && (
            <span className="text-xs text-green-600">
              {trend}
            </span>
          )}
        </div>

      </CardContent>
    </Card>
  )
}