import React, { useState, useEffect, useRef } from 'react';
import AIAssistantCard from '../analytics/AIAssistantCard';
import { MetricsSection } from '../analytics/MetricsSection';
import { RevenueChart } from '../analytics/RevenueChart';
import { ProductTable } from '../analytics/ProductTable';
import { Product } from '../types/analytics';
import { ChevronRight } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  console.log('Selected product:', selectedProduct);

  useEffect(() => {
    // Verificar si el script ya existe
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      
      // Guardar referencia al script
      scriptRef.current = script;
      
      // Añadir el script al head en lugar del body
      document.head.appendChild(script);
    }

    return () => {
      // Limpiar el script solo si existe y fue creado por este componente
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

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

        {/* Widget de Eleven Labs */}
        <div className="col-span-12 h-96">
          <elevenlabs-convai 
            agent-id="lPO1BIgKKe78sqesK86E"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;