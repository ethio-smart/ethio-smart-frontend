'use client';

import { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


interface ChartDataPoint {
  date: string;
  earnings: number;
  bookings: number;
  cleaning: number;
  moving: number;
  handyman: number;
}

const chartData: ChartDataPoint[] = [
  { date: 'Feb 10', earnings: 320, bookings: 8, cleaning: 150, moving: 100, handyman: 70 },
  { date: 'Feb 11', earnings: 480, bookings: 12, cleaning: 200, moving: 180, handyman: 100 },
  { date: 'Feb 12', earnings: 290, bookings: 7, cleaning: 120, moving: 90, handyman: 80 },
  { date: 'Feb 13', earnings: 560, bookings: 14, cleaning: 250, moving: 200, handyman: 110 },
  { date: 'Feb 14', earnings: 420, bookings: 10, cleaning: 180, moving: 150, handyman: 90 },
  { date: 'Feb 15', earnings: 380, bookings: 9, cleaning: 160, moving: 130, handyman: 90 },
  { date: 'Feb 16', earnings: 610, bookings: 15, cleaning: 280, moving: 210, handyman: 120 },
  { date: 'Feb 17', earnings: 520, bookings: 13, cleaning: 230, moving: 180, handyman: 110 },
  { date: 'Feb 18', earnings: 445, bookings: 11, cleaning: 190, moving: 160, handyman: 95 },
  { date: 'Feb 19', earnings: 680, bookings: 17, cleaning: 300, moving: 240, handyman: 140 },
  { date: 'Feb 20', earnings: 590, bookings: 15, cleaning: 260, moving: 200, handyman: 130 },
  { date: 'Feb 21', earnings: 430, bookings: 10, cleaning: 180, moving: 150, handyman: 100 },
  { date: 'Feb 22', earnings: 720, bookings: 18, cleaning: 320, moving: 260, handyman: 140 },
  { date: 'Feb 23', earnings: 650, bookings: 16, cleaning: 290, moving: 220, handyman: 140 },
];

type ServiceFilter = 'all' | 'cleaning' | 'moving' | 'handyman';

const serviceFilters: { label: string; value: ServiceFilter; color: string }[] = [
  { label: 'All Services', value: 'all', color: '#059669' },
  { label: 'Cleaning', value: 'cleaning', color: '#2563eb' },
  { label: 'Moving', value: 'moving', color: '#7c3aed' },
  { label: 'Handyman', value: 'handyman', color: '#d97706' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-warm-lg text-sm">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.name === 'bookings' ? entry.value : `$${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EarningsChart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>('all');
  const [activeBar, setActiveBar] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getBarDataKey = () => {
    if (activeFilter === 'all') return 'earnings';
    return activeFilter;
  };

  const getBarColor = () => {
    const f = serviceFilters.find((s) => s.value === activeFilter);
    return f?.color ?? '#059669';
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-4" />
        <div className="h-64 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-foreground font-heading">Earnings &amp; Booking Volume</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Daily breakdown with service type drill-down</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {serviceFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-standard ${
                activeFilter === f.value
                  ? 'bg-primary text-primary-foreground shadow-warm-sm'
                  : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-64" aria-label="Daily earnings bar chart with booking volume line overlay">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
              width={48}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              formatter={(value) => <span className="text-muted-foreground capitalize">{value}</span>}
            />
            <Bar
              yAxisId="left"
              dataKey={getBarDataKey()}
              fill={getBarColor()}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              opacity={0.9}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bookings"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ r: 3, fill: '#DC2626' }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

