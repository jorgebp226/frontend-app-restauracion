import React, { useState } from 'react';
import { AIAssistantCard } from '../analytics/AIAssistantCard';
import { MetricsSection } from '../analytics/MetricsSection';
import RevenueChart from '../analytics/RevenueChart';
import ProductTable from '../analytics/ProductTable';
import ProductDetail from '../analytics/ProductAnalytics';
const Analytics = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Sales Performance</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Sales</span>
            <span className="mx-2">→</span>
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

      {/* Modal de detalle del producto */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Analytics;