'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface KPICard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
  bgColor: string;
  sparkline: number[];
}

const kpiData: KPICard[] = [
  {
    id: 'earnings',
    title: 'Total Earnings',
    value: '$12,847.50',
    change: 18.4,
    changeLabel: 'vs last period',
    icon: 'BanknotesIcon',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    sparkline: [40, 55, 48, 62, 70, 65, 80, 75, 90, 85, 95, 100],
  },
  {
    id: 'bookings',
    title: 'Active Bookings',
    value: '34',
    change: 7.2,
    changeLabel: 'vs last period',
    icon: 'CalendarDaysIcon',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    sparkline: [20, 28, 25, 32, 30, 38, 35, 40, 38, 42, 40, 45],
  },
  {
    id: 'requests',
    title: 'active requests',
    value: '96',
    change: 3.5,
    changeLabel: 'vs last period',
    icon: 'CheckCircleIcon',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    sparkline: [88, 90, 89, 91, 92, 91, 93, 94, 93, 95, 96, 96],
  },
  {
    id: 'rating',
    title: 'Average Rating',
    value: '4.87',
    change: 2.1,
    changeLabel: 'vs last period',
    icon: 'StarIcon',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    sparkline: [4.5, 4.6, 4.55, 4.7, 4.65, 4.75, 4.8, 4.78, 4.82, 4.85, 4.87, 4.87],
  },

];

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  const isGreen = color.includes('emerald') || color.includes('green');
  const strokeColor = isGreen ? '#059669' : color.includes('blue') ? '#2563eb' : '#d97706';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function KPICards() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 animate-pulse">
            <div className="h-4 bg-muted rounded w-24 mb-3" />
            <div className="h-8 bg-muted rounded w-32 mb-2" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiData.map((card) => (
        <div
          key={card.id}
          className="bg-card rounded-xl border border-border p-5 hover:shadow-warm-md transition-standard hover-lift"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-foreground font-heading">{card.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={card.icon as any} size={20} variant="solid" className={card.color} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1">
              <Icon
                name={card.change >= 0 ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'}
                size={14}
                variant="solid"
                className={card.change >= 0 ? 'text-emerald-600' : 'text-red-500'}
              />
              <span
                className={`text-xs font-semibold ${card.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}
              >
                {card.change >= 0 ? '+' : ''}{card.change}%
              </span>
              <span className="text-xs text-muted-foreground">{card.changeLabel}</span>
            </div>
            <MiniSparkline data={card.sparkline} color={card.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

