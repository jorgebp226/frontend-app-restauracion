// src/analytics/AnalyticsDashboard.tsx
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot 
} from 'recharts';
import { MetricCardProps } from '../types/analytics';
import { 
  Brain, 
  TrendingUp, 
  DollarSign, 
  ChevronRight, 
  X,
  Download, // Cambiado de ArrowDownload
  RefreshCw, // Cambiado de RefreshCcw
  Share2, 
  MoreVertical 
} from 'lucide-react';
import { CustomTooltipProps } from '../types/analytics';
import { FC } from 'react';
import { useData } from '../context/DataContext';

const AIAssistantCard = () => (
  <div className="bg-emerald-50 rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold">AI Assistant</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
    </div>
    <div className="flex gap-4">
      <div className="flex-1">
        <Brain className="w-12 h-12 text-emerald-600 mb-4" />
        <p className="text-sm text-gray-600 mb-4">
          Analiza las ventas de productos del último año. Compara ingresos, 
          calidad y ventas por edad y género.
        </p>
        <button className="flex items-center text-sm text-emerald-600 hover:text-emerald-700">
          Ver análisis completo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const RevenueChart = () => {
  const data = [
    { month: 'Mar', revenue2022: 30, revenue2023: 32 },
    { month: 'Apr', revenue2022: 28, revenue2023: 31 },
    { month: 'May', revenue2022: 32, revenue2023: 35.4 },
    { month: 'Jun', revenue2022: 30, revenue2023: 34 },
    { month: 'Jul', revenue2022: 34, revenue2023: 37 },
    { month: 'Aug', revenue2022: 32, revenue2023: 36 }
  ];

  const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Compararción de ingresos</h2>
          <p className="text-sm text-gray-500">Desde el inicio</p>
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
          <h3 className="text-3xl font-semibold">1,40M</h3>
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
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                      style={{ stroke: '#94a3b8', strokeWidth: 1 }} />
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

const MetricCard: FC<MetricCardProps> = ({ title, value, trend, icon: Icon }: MetricCardProps) => (
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

export const AnalyticsDashboard: FC = () => {
  const { data, loading, error } = useData(); // Add the data context hook

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        {error || 'Data not available'}
      </div>
    );
  }

  // Get summary values from data
  const weightedAverage = data.summary_results?.["Media Ponderada"] || "0";
  const averageProfitability = data.summary_results?.["Rentabilidad Media"] || "0";

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ingeniería de Menus</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>Ventas</span>
          <ChevronRight size={16} />
          <span>Shawarma</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* AI Assistant Card */}
        <div className="col-span-4">
          <AIAssistantCard />
        </div>

        {/* Key Metrics */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
          <MetricCard 
            title="Media Ponderada" 
            value={`${Number(parseFloat(weightedAverage).toFixed(2))}%`}
            trend={5.2} 
            icon={TrendingUp}
          />
          <MetricCard 
            title="Rentabilidad Media" 
            value={`${Number(parseFloat(averageProfitability).toFixed(2))}%`}
            trend={3.8} 
            icon={DollarSign}
          />
        </div>

        {/* Revenue Chart */}
        <div className="col-span-12">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;