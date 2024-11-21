// src/analytics/ProductTable.tsx
import { type FC, useState } from 'react';
import { ArrowUpDown, Package } from 'lucide-react';
import { Product, Column, ProductTableProps } from '../types/analytics';

const CLASSIFICATION_COLORS: Record<Product['classification'], string> = {
  ESTRELLA: 'bg-yellow-100 text-yellow-800',
  PERRO: 'bg-red-100 text-red-800',
  PUZZLE: 'bg-blue-100 text-blue-800',
  VACA: 'bg-green-100 text-green-800'
};

const getClassificationColor = (classification: Product['classification']): string => {
  return CLASSIFICATION_COLORS[classification];
};

export const ProductTable: FC<ProductTableProps> = ({ onProductClick }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sampleData: Product[] = [
    {
      code: 'C001',
      name: 'SHAWARMA POLLO NORMAL',
      cost: 3.45,
      price: 11.40,
      priceNoVAT: 10.26,
      popularityIndex: 7.40,
      foodCost: 33.53,
      profitability: 66.47,
      totalSales: 15528.99,
      totalContribution: 9290.15,
      totalCost: 4685.94,
      unitsSold: 1362,
      margin: 6.82,
      salesPercentage: 7.33,
      marginPercentage: 7.58,
      irp: 1.02,
      classification: 'VACA'
    },
    {
      code: 'C002',
      name: 'SHAWARMA MIXTO NORMAL',
      cost: 4.02,
      price: 11.40,
      priceNoVAT: 10.26,
      popularityIndex: 42.49,
      foodCost: 38.99,
      profitability: 61.01,
      totalSales: 88405.81,
      totalContribution: 44540.66,
      totalCost: 31019.59,
      unitsSold: 7755,
      margin: 6.26,
      salesPercentage: 42.22,
      marginPercentage: 39.60,
      irp: 0.94,
      classification: 'VACA'
    },
    {
      code: 'C003',
      name: 'SHAWARMA TERNERA NORMAL',
      cost: 5.13,
      price: 11.90,
      priceNoVAT: 10.71,
      popularityIndex: 4.75,
      foodCost: 47.90,
      profitability: 52.10,
      totalSales: 10328.13,
      totalContribution: 4842.94,
      totalCost: 4452.38,
      unitsSold: 868,
      margin: 5.58,
      salesPercentage: 4.94,
      marginPercentage: 3.95,
      irp: 0.80,
      classification: 'PERRO'
    },
    {
      code: 'C004',
      name: 'SHAWARMA POLLO MINI',
      cost: 2.35,
      price: 8.40,
      priceNoVAT: 7.56,
      popularityIndex: 3.22,
      foodCost: 31.08,
      profitability: 68.92,
      totalSales: 4935.65,
      totalContribution: 3061.28,
      totalCost: 1389.31,
      unitsSold: 588,
      margin: 5.21,
      salesPercentage: 2.36,
      marginPercentage: 2.50,
      irp: 1.06,
      classification: 'VACA'
    },
    {
      code: 'C005',
      name: 'SHAWARMA MIXTO MINI',
      cost: 2.62,
      price: 8.40,
      priceNoVAT: 7.56,
      popularityIndex: 18.33,
      foodCost: 34.66,
      profitability: 65.34,
      totalSales: 28098.44,
      totalContribution: 16524.58,
      totalCost: 8764.04,
      unitsSold: 3345,
      margin: 4.94,
      salesPercentage: 13.45,
      marginPercentage: 13.48,
      irp: 1.00,
      classification: 'VACA'
    },
    {
      code: 'C006',
      name: 'SHAWARMA TERNERA MINI',
      cost: 3.15,
      price: 8.90,
      priceNoVAT: 8.01,
      popularityIndex: 2.05,
      foodCost: 39.33,
      profitability: 60.67,
      totalSales: 3331.00,
      totalContribution: 1819.64,
      totalCost: 1177.27,
      unitsSold: 374,
      margin: 4.86,
      salesPercentage: 1.60,
      marginPercentage: 1.48,
      irp: 0.93,
      classification: 'PERRO'
    },
    {
      code: 'C007',
      name: 'SHAWARMA POLLO SUPREMO',
      cost: 3.64,
      price: 14.90,
      priceNoVAT: 14.31,
      popularityIndex: 2.27,
      foodCost: 25.48,
      profitability: 74.52,
      totalSales: 6170.81,
      totalContribution: 4413.51,
      totalCost: 1505.84,
      unitsSold: 414,
      margin: 10.67,
      salesPercentage: 3.15,
      marginPercentage: 3.60,
      irp: 1.14,
      classification: 'PUZZLE'
    },
    {
      code: 'C008',
      name: 'SHAWARMA MIXTO SUPREMO',
      cost: 3.99,
      price: 14.90,
      priceNoVAT: 14.31,
      popularityIndex: 12.20,
      foodCost: 27.89,
      profitability: 72.12,
      totalSales: 17443.04,
      totalContribution: 12301.71,
      totalCost: 9395.72,
      unitsSold: 2985,
      margin: 10.32,
      salesPercentage: 17.92,
      marginPercentage: 17.63,
      irp: 1.11,
      classification: 'ESTRELLA'
    },
    {
      code: 'C009',
      name: 'SHAWARMA TERNERA SUPREMO',
      cost: 4.72,
      price: 14.90,
      priceNoVAT: 14.31,
      popularityIndex: 2.87,
      foodCost: 32.98,
      profitability: 67.02,
      totalSales: 6512.55,
      totalContribution: 4051.32,
      totalCost: 2064.84,
      unitsSold: 524,
      margin: 9.59,
      salesPercentage: 2.87,
      marginPercentage: 3.31,
      irp: 1.15,
      classification: 'PUZZLE'
    },
    {
      code: 'C010',
      name: 'SHAWARMA FALAFEL',
      cost: 1.78,
      price: 10.50,
      priceNoVAT: 9.45,
      popularityIndex: 3.19,
      foodCost: 18.84,
      profitability: 81.16,
      totalSales: 6100.55,
      totalContribution: 4456.27,
      totalCost: 1034.18,
      unitsSold: 581,
      margin: 7.67,
      salesPercentage: 2.92,
      marginPercentage: 3.64,
      irp: 1.24,
      classification: 'PUZZLE'
    },
    {
      code: 'C011',
      name: 'SHAWARMA SIRHAN',
      cost: 2.18,
      price: 10.95,
      priceNoVAT: 9.86,
      popularityIndex: 1.91,
      foodCost: 22.12,
      profitability: 77.88,
      totalSales: 3810.60,
      totalContribution: 2670.90,
      totalCost: 758.64,
      unitsSold: 348,
      margin: 7.68,
      salesPercentage: 1.82,
      marginPercentage: 2.18,
      irp: 1.19,
      classification: 'PUZZLE'
    }
  ];

  const handleSort = (data: Product[], key: keyof Product, direction: 'asc' | 'desc'): Product[] => {
    return [...data].sort((a, b) => {
      const valueA = a[key] ?? 0;
      const valueB = b[key] ?? 0;
      
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
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
    { key: 'code', title: 'Código', sortable: true },
    { key: 'name', title: 'Nombre', sortable: true },
    { key: 'price', title: 'PVP', sortable: true },
    { key: 'totalSales', title: 'Ventas totales', sortable: true },
    { key: 'profitability', title: 'Rentabilidad', sortable: true },
    { key: 'classification', title: 'Clasificación', sortable: true }
  ];

  const sortedData = sortConfig ? 
    handleSort(sampleData, sortConfig.key as keyof Product, sortConfig.direction) : 
    sampleData;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500">Una lista de los shawarmas</p>
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
                key={product.code}
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
                        ID: {product.code}
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
                    {product.totalSales.toLocaleString()}
                  </div>
                  {product.trend !== undefined && (
                    <span className={`text-xs ${
                      product.trend > 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {product.trend > 0 ? '+' : ''}{product.trend}%
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${(product.stock || 0) > 50 ? 'bg-green-100 text-green-800' : 
                    (product.stock || 0) > 20 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {product.stock || 0} units
                </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(product.classification)}`}>
                    {product.classification}
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