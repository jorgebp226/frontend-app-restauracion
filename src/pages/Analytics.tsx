import React, { useState } from 'react';
import AIAssistantCard from '../analytics/AnalyticsDashboard';
import { MetricsSection } from '../analytics/MetricsSection';
import { RevenueChart } from '../analytics/RevenueChart';
import { ProductTable } from '../analytics/ProductTable';
//import { ProductDetail } from '../analytics/ProductDetail';
import { Product } from '../types/analytics';
import { ChevronRight } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  console.log('Selected product:', selectedProduct);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Sales Performance</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Sales</span>
            <ChevronRight size={16} />
            <span>Tech Products</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* AI Assistant */}
        <div className="col-span-4">
          <AIAssistantCard />
        </div>

        {/* Métricas principales */}
        <div className="col-span-8">
          <MetricsSection />
        </div>

        {/* Gráfico de comparación de ingresos */}
        <div className="col-span-12">
          <RevenueChart />
        </div>

        {/* Tabla de productos */}
        <div className="col-span-12">
          <ProductTable onProductClick={setSelectedProduct} />
        </div>
      </div>


    </div>
  );
};

export default Analytics;