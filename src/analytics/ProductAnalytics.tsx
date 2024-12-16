import { type FC } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  X,
  ShoppingCart,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { Product, MetricCardProps } from '../types/analytics';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useData } from '../context/DataContext'; // Import the hook

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { data } = useData(); // Use shared data hook

  // Static monthly data
  const monthlyData = [
    { month: 'Ene', ventas2022: 580, ventas2023: 620 },
    { month: 'Feb', ventas2022: 540, ventas2023: 590 },
    { month: 'Mar', ventas2022: 620, ventas2023: 670 },
    { month: 'Abr', ventas2022: 590, ventas2023: 640 },
    { month: 'May', ventas2022: 610, ventas2023: 680 },
    { month: 'Jun', ventas2022: 580, ventas2023: 630 },
  ];

  const channelData = [
        { name: 'Restaurante', value: parseFloat(data.summary_results.sales_by_channel.restaurant_sales) },
        { name: 'Uber', value: parseFloat(data.summary_results.sales_by_channel.uber_sales) },
        { name: 'Glovo', value: parseFloat(data.summary_results.sales_by_channel.glovo_sales) },
        { name: 'Flipdish', value: parseFloat(data.summary_results.sales_by_channel.flipdish_sales) },
      ];

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#e11d48'];

  const MetricCard: FC<MetricCardProps> = ({ title, value, trend, icon: Icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-500 text-sm">{title}</span>
        <Icon className="text-emerald-600" size={20} />
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {trend && (
          <div className={`flex items-center text-sm ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-gray-50 m-4 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <span className="text-gray-500">Código: {product.code}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6">
            <MetricCard
              title="Ventas Totales"
              value={`${product.totalSales.toLocaleString('es-ES')} €`}
              trend={8.5}
              icon={ShoppingCart}
            />
            <MetricCard
              title="Rentabilidad"
              value={`${product.profitability}%`}
              trend={3.2}
              icon={TrendingUp}
            />
            <MetricCard
              title="Margen"
              value={`${product.margin.toFixed(2)} €`}
              trend={-2.1}
              icon={DollarSign}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Comparativa Ventas */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Comparativa Ventas 2022-2023</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventas2022" fill="#94a3b8" name="2022" />
                    <Bar dataKey="ventas2023" fill="#10b981" name="2023" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Canales de Venta */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Canales de Venta</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6">
                  {channelData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">
                      {entry.name}: {((entry.value / channelData.reduce((sum, source) => sum + source.value, 0)) * 100).toFixed(0)}%
                    </span>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detalles adicionales */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Detalles del Producto</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Costes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Coste del producto</span>
                    <span className="font-medium">{product.cost} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Food Cost</span>
                    <span className="font-medium">{product.foodCost}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Coste total</span>
                    <span className="font-medium">{product.totalCost} €</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Precios</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">PVP</span>
                    <span className="font-medium">{product.price} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">PVP (Sin IVA)</span>
                    <span className="font-medium">{product.priceNoVAT} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Margen unidad</span>
                    <span className="font-medium">{product.margin} €</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Métricas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Unidades vendidas</span>
                    <span className="font-medium">{product.unitsSold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">% Ventas</span>
                    <span className="font-medium">{product.salesPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">IRP</span>
                    <span className="font-medium">{product.irp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;