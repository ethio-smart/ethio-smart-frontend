import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Receipt,
  CheckCircle,
  Clock
} from "lucide-react";

const iconMap = {
  volume: DollarSign,
  fees: Receipt,
  completed: CheckCircle,
  pending: Clock,
};

type IconType = keyof typeof iconMap;

type PaymentStat = {
  type: IconType;
  label: string;
  bg: string;
  color: string;
  value: string | number;
};

type PaymentStatsProps = {
  stats: PaymentStat[];
};

export default function PaymentStats({ stats }: PaymentStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = iconMap[s.type];
        return (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex justify-between mb-3">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
              <p className="text-xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}