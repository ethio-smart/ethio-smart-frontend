'use client';

import Icon from '@/components/ui/AppIcon';

interface SparklinePoint {
  value: number;
}

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  iconName: string;
  sparklineData: SparklinePoint[];
  accentColor: string;
  prefix?: string;
  suffix?: string;
}

function Sparkline({ data, color }: { data: SparklinePoint[]; color: string }) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KPICard({
  title,
  value,
  change,
  changeLabel,
  iconName,
  sparklineData,
  accentColor,
  prefix = '',
  suffix = '',
}: KPICardProps) {
  const isPositive = change >= 0;
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-250">
      <div className="flex items-center justify-between">
        <span className="text-xs font-caption font-medium text-text-secondary uppercase tracking-wide">{title}</span>
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <Icon name={iconName as any} size={18} variant="outline" style={{ color: accentColor } as React.CSSProperties} className="" />
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-heading font-bold text-text-primary data-value">
            {prefix}{value}{suffix}
          </p>
          <div className={`flex items-center gap-1 mt-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
            <Icon name={isPositive ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={14} variant="outline" />
            <span className="text-xs font-caption font-medium">
              {isPositive ? '+' : ''}{change}% {changeLabel}
            </span>
          </div>
        </div>
        <Sparkline data={sparklineData} color={accentColor} />
      </div>
    </div>
  );
}

