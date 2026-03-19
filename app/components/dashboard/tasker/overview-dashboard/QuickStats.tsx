interface QuickStatItem {
  label: string;
  value: string;
  sub: string;
}

interface QuickStatsProps {
  stats: QuickStatItem[];
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-heading font-bold text-text-primary data-value">{stat.value}</p>
          <p className="text-xs font-caption font-medium text-text-secondary mt-0.5">{stat.label}</p>
          <p className="text-[11px] font-caption text-muted-foreground mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}

