'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Point = { day: string; count: number };

export default function ActivityChart({ data }: { data: Point[] }) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="ac" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#005691" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#005691" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#D9E6EE" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: '#5a6b7a' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#5a6b7a' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #D9E6EE',
              fontSize: 12,
              fontWeight: 700,
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#005691"
            strokeWidth={2}
            fill="url(#ac)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}