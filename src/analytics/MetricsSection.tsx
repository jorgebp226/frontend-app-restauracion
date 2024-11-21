// src/analytics/MetricsSection.tsx
import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MetricCardProps } from '../types/analytics';

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon: Icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-gray-500 text-sm">{title}</span>
      <Icon className="text-emerald-600" size={20} />
    </div>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-semibold">{value}</h3>
      {trend && (
        <span className={`text-sm ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
  </div>
);

export const MetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <MetricCard 
        title="Media Ponderada" 
        value="24.68%" 
        trend={5.2} 
        icon={TrendingUp}
      />
      <MetricCard 
        title="Rentabilidad Media" 
        value="75%" 
        trend={3.8} 
        icon={DollarSign}
      />
    </div>
  );
};