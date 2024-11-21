// src/analytics/ProductTable.tsx
import React, { useState } from 'react';
import { ArrowUpDown, Package } from 'lucide-react';
import { Product, Column, ProductTableProps } from '../types/analytics';

interface ClassificationBadgeProps {
  classification: Product['classification'];
}

const CLASSIFICATION_COLORS: Record<Product['classification'], string> = {
  ESTRELLA: 'bg-yellow-100 text-yellow-800',
  PERRO: 'bg-red-100 text-red-800',
  PUZZLE: 'bg-blue-100 text-blue-800',
  VACA: 'bg-green-100 text-green-800'
};

const ClassificationBadge: React.FC<ClassificationBadgeProps> = ({ classification }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${CLASSIFICATION_COLORS[classification]}`}>
    {classification}
  </span>
);

export const ProductTable: React.FC<ProductTableProps> = ({ onProductClick }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sampleData: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro X',
      category: 'Electronics',
      price: 1299.99,
      sales: 450,
      stock: 75,
      trend: 12.5,
      status: 'In Stock'
    },
    // Agrega más productos aquí
  ];

  const handleSort = (data: Product[], key: keyof Product, direction: 'asc' | 'desc'): Product[] => {
    return [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
  };

  const getSortIcon = (key: keyof Product): JSX.Element => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={16} className="ml-1" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUpDown size={16} className="ml-1 text-blue-500" /> : 
      <ArrowUpDown size={16} className="ml-1 text-blue-500 transform rotate-180" />;
  };

  const columns: Column[] = [
    { key: 'name', title: 'Product Name', sortable: true },
    { key: 'category', title: 'Category', sortable: true },
    { key: 'price', title: 'Price', sortable: true },
    { key: 'sales', title: 'Sales', sortable: true },
    { key: 'stock', title: 'Stock', sortable: true }
  ];

  const sortedData = sortConfig ? 
    handleSort(sampleData, sortConfig.key as keyof Product, sortConfig.direction) : 
    sampleData;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500">A list of all products</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (column.sortable) {
                        setSortConfig({
                          key: column.key as keyof Product,
                          direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc'
                        });
                      }
                    }}
                  >
                    {column.title}
                    {column.sortable && getSortIcon(column.key as keyof Product)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((product) => (
              <tr 
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {product.sales.toLocaleString()}
                  </div>
                  {product.trend && (
                    <span className={`text-xs ${
                      product.trend > 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {product.trend > 0 ? '+' : ''}{product.trend}%
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${product.stock > 50 ? 'bg-green-100 text-green-800' : 
                      product.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {product.stock} units
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};