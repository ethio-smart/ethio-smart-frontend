import { Wallet, ShieldCheck, RotateCcw, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Spent",
    value: "ETB 45,200",
    icon: Wallet,
    trend: "+12%",
  },
  {
    title: "Escrow Balance",
    value: "ETB 12,500",
    icon: ShieldCheck,
    subtitle: "Pending release",
  },
  {
    title: "Refunded Amount",
    value: "ETB 1,200",
    icon: RotateCcw,
    trend: "-5%",
  },
  {
    title: "Pending Payouts",
    value: "ETB 1,800",
    icon: Clock,
    subtitle: "Processing",
  },
]

export default function PaymentStats() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon

        return (
          <Card key={i}>
            <CardContent className="flex justify-between p-4">

              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h3 className="text-xl font-bold">
                  {stat.value}
                </h3>

                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end">
                <Icon className="w-5 h-5 text-primary" />

                {stat.trend && (
                  <span className="text-xs text-green-600">
                    {stat.trend}
                  </span>
                )}
              </div>

            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}