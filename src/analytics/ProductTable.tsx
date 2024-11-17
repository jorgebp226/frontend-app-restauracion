import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const ProductClassificationBadge = ({ classification }) => {
  const colors = {
    'ESTRELLA': 'bg-yellow-100 text-yellow-800',
    'PERRO': 'bg-red-100 text-red-800',
    'PUZZLE': 'bg-purple-100 text-purple-800',
    'VACA': 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[classification]}`}>
      {classification}
    </span>
  );
};

const ProductTable = ({ onProductClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      code: 'D001',
      name: 'HUMMUS',
      cost: 1.52,
      price: 7.99,
      priceNoVAT: 7.19,
      popularityIndex: 7.86,
      foodCost: 21.14,
      profitability: 78.86,
      totalSales: 7302.86,
      totalContribution: 5183.29,
      totalCost: 1389.28,
      unitsSold: 914,
      margin: 5.67,
      salesPercentage: 6.57,
      marginPercentage: 6.90,
      irp: 1.05,
      classification: 'ESTRELLA'
    },
    // Add more products here...
  ];

  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = sortConfig.key
    ? sortData(filteredProducts, sortConfig.key, sortConfig.direction)
    : filteredProducts;

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Productos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort('code')}
                >
                  <div className="flex items-center gap-1">
                    Código
                    <SortIcon column="code" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Nombre
                    <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end gap-1">
                    PVP
                    <SortIcon column="price" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort('popularityIndex')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Popularidad
                    <SortIcon column="popularityIndex" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right text-sm font-semibold text-gray-600 cursor-pointer"
                  onClick={() => handleSort('profitability')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Rentabilidad
                    <SortIcon column="profitability" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Clasificación
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr 
                  key={product.code}
                  onClick={() => onProductClick(product)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-4 text-sm text-gray-600">{product.code}</td>
                  <td className="px-4 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-4 text-sm text-right">{product.price.toFixed(2)} €</td>
                  <td className="px-4 py-4 text-sm text-right">{product.popularityIndex}%</td>
                  <td className="px-4 py-4 text-sm text-right">{product.profitability}%</td>
                  <td className="px-4 py-4">
                    <ProductClassificationBadge classification={product.classification} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;