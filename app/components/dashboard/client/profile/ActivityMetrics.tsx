
import { CardTitle, Card,
  CardContent,
  CardHeader,} from "@/components/ui/card";

export default function ActivityMetrics() {
  return (
    <Card className="shadow-none space-y-">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground uppercase">
          Activity Metrics
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <Metric value="28" label="Requests Sent" />
        <Metric value="3" label="Active Jobs" />
        <Metric value="$12,450" label="Total Spent" />
        <Metric value="4.9" label="Avg Rating Given" />
      </CardContent>
    </Card>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}