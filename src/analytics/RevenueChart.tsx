// src/analytics/RevenueChart.tsx
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot 
} from 'recharts';
import { 
  MoreVertical, 
  Share2, 
  Download, 
  RefreshCw 
} from 'lucide-react';
import { RevenueData, CustomTooltipProps } from '../types/analytics';

const data: RevenueData[] = [
  { month: 'Mar', revenue2022: 30, revenue2023: 32 },
  { month: 'Apr', revenue2022: 28, revenue2023: 31 },
  { month: 'May', revenue2022: 32, revenue2023: 35.4 },
  { month: 'Jun', revenue2022: 30, revenue2023: 34 },
  { month: 'Jul', revenue2022: 34, revenue2023: 37 },
  { month: 'Aug', revenue2022: 32, revenue2023: 36 }
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900">
          {payload[0].payload.month}
        </p>
        <p className="text-sm text-gray-600">
          2023: {payload[1].value}M
        </p>
        <p className="text-sm text-gray-600">
          2022: {payload[0].value}M
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Comparison of Revenue</h2>
          <p className="text-sm text-gray-500">For all time</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <MoreVertical size={18} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <Share2 size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-semibold">35,40M</h3>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
            +5%
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path 
                  d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  style={{ stroke: '#94a3b8', strokeWidth: 1 }} 
                />
              </pattern>
            </defs>

            <Line 
              type="monotone" 
              dataKey="revenue2022" 
              stroke="#94a3b8"
              strokeWidth={2}
              dot={false}
              fill="url(#diagonalHatch)"
              fillOpacity={0.2}
            />
            <Line 
              type="monotone" 
              dataKey="revenue2023" 
              stroke="#94a3b8"
              strokeWidth={2}
              dot={false}
              fill="url(#diagonalHatch)"
              fillOpacity={0.2}
            />

            <ReferenceDot
              x="May"
              y={35.4}
              r={4}
              fill="#fde047"
              stroke="#fff"
              strokeWidth={2}
            />

            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <RefreshCw size={16} className="text-gray-600" />
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Download size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};