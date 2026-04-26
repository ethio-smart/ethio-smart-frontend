/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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

interface EarningsDataPoint {
  month: string;
  earnings: number;
  bookings: number;
  forecast: number;
}

interface EarningsChartProps {
  data: EarningsDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-xs font-caption">
        <p className="font-semibold text-text-primary mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-text-secondary capitalize">{entry.name}:</span>
            <span className="font-medium text-text-primary">
              {entry.name === 'bookings' ? entry.value : `$${entry.value.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EarningsChart({ data }: EarningsChartProps) {
  return (
    <div className="w-full h-72" aria-label="Earnings trend and booking volume combination chart">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            width={48}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
          <Bar yAxisId="left" dataKey="earnings" fill="#0D7C66" radius={[4, 4, 0, 0]} name="earnings" maxBarSize={32} />
          <Bar yAxisId="left" dataKey="forecast" fill="#41B3A2" radius={[4, 4, 0, 0]} name="forecast" maxBarSize={32} opacity={0.5} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bookings"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 3, fill: '#F59E0B', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            name="bookings"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

