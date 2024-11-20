// src/analytics/AIAssistantCard.tsx
import React from 'react';
import { Brain, ChevronRight, X } from 'lucide-react';

const AIAssistantCard: React.FC = () => {
  return (
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
};

export default AIAssistantCard;