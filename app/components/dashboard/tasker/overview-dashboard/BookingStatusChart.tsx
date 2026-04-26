'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BookingStatusData {
  name: string;
  value: number;
  color: string;
}

interface BookingStatusChartProps {
  data: BookingStatusData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-xs font-caption">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.color }} />
          <span className="font-semibold text-text-primary">{item.name}</span>
        </div>
        <p className="text-text-secondary mt-1">
          Count: <span className="font-medium text-text-primary">{item.value}</span>
        </p>
        <p className="text-text-secondary">
          Share: <span className="font-medium text-text-primary">{item.payload.percent}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function BookingStatusChart({ data }: BookingStatusChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const dataWithPercent = data.map((d) => ({ ...d, percent: ((d.value / total) * 100).toFixed(1) }));

  return (
    <div className="w-full h-56" aria-label="Booking status distribution donut chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {dataWithPercent.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

