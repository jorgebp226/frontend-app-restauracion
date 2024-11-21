import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import AnalyticsDashboard from './analytics/AnalyticsDashboard';
import ProductDetail from './analytics/ProductAnalytics';
import { ProductTable } from './analytics/ProductTable';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-16">
          <Routes>
            <Route 
              path="/analytics" 
              element={
                <div className="space-y-6 p-6">
                  <AnalyticsDashboard />
                  <ProductTable onProductClick={setSelectedProduct} />
                  {selectedProduct && (
                    <ProductDetail 
                      product={selectedProduct} 
                      onClose={() => setSelectedProduct(null)} 
                    />
                  )}
                </div>
              } 
            />
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/invoices" element={<div>Facturas</div>} />
            <Route path="/talkiers" element={<div>Talkiers</div>} />
            <Route path="/reservations" element={<div>Gestión Reservas</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;