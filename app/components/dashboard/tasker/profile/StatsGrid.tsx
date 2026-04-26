
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';


type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

interface statProps {
  stats: readonly Stat[];
}

export default function StatsGrid({ stats }: statProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="text-center shadow-2xs  ">
          <CardContent className="p-1">
            <div className={`mx-auto mb-3 w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}