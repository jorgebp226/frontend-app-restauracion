import { type FC, useState } from 'react';
import { ArrowUpDown, Package } from 'lucide-react';
import { Product, Column, ProductTableProps } from '../types/analytics';
import { useData } from '../context/DataContext'; // Import the hook

const CLASSIFICATION_COLORS: Record<Product['classification'], string> = {
  ESTRELLA: 'bg-yellow-100 text-yellow-800',
  PERRO: 'bg-red-100 text-red-800',
  PUZZLE: 'bg-blue-100 text-blue-800',
  VACA: 'bg-green-100 text-green-800',
};

const getClassificationColor = (classification: Product['classification']): string => {
  return CLASSIFICATION_COLORS[classification];
};

const convertToEuros = (cents: number): number => {
  return cents / 100;
};

export const ProductTable: FC<ProductTableProps> = ({ onProductClick }) => {
  const { data, loading, error } = useData(); // Use the shared data hook
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center h-64 text-red-600">
          {error || 'Data not available'}
        </div>
      </div>
    );
  }

  // Transform API data
  const totalSales = data.product_results.reduce((sum: number, item: any) => sum + parseFloat(item.total_sales), 0);
  const totalMargin = data.product_results.reduce((sum: number, item: any) => sum + parseFloat(item.margin_contribution), 0);

  const products: Product[] = data.product_results.map((item: any) => {
    const totalSalesEuros = Number((convertToEuros(parseFloat(item.total_sales))).toFixed(2));
    const marginContribution = Number((convertToEuros(parseFloat(item.margin_contribution))).toFixed(2));
    const foodCostPercentage = Number(parseFloat(item.food_cost_percentage).toFixed(2));
    const popularityIndex = Number(parseFloat(item.popularity_index).toFixed(2));

    const salesPercentage = Number(((parseFloat(item.total_sales) / totalSales) * 100).toFixed(2));
    const marginPercentage = Number(((parseFloat(item.margin_contribution) / totalMargin) * 100).toFixed(2));
    const irp = Number((marginPercentage / salesPercentage).toFixed(2));

    return {
      code: item.name.substring(0, 4),
      name: item.modifier ? `${item.name} - ${item.modifier}` : item.name,
      cost: Number((convertToEuros(parseFloat(item.cost))).toFixed(2)),
      price: Number((convertToEuros(parseFloat(item.price))).toFixed(2)),
      priceNoVAT: Number((convertToEuros(parseFloat(item.pvp_sin_iva))).toFixed(2)),
      popularityIndex,
      foodCost: foodCostPercentage,
      profitability: Number(parseFloat(item.profitability).toFixed(2)),
      totalSales: totalSalesEuros,
      totalContribution: marginContribution,
      totalCost: Number((convertToEuros(parseFloat(item.total_cost))).toFixed(2)),
      unitsSold: parseInt(item.units_sold, 10),
      margin: Number((convertToEuros(parseFloat(item.margin))).toFixed(2)),
      salesPercentage,
      marginPercentage,
      irp,
      classification: item.classification as 'ESTRELLA' | 'PERRO' | 'PUZZLE' | 'VACA',
    };
  });

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
    return sortConfig.direction === 'asc' ? (
      <ArrowUpDown size={16} className="ml-1 text-blue-500" />
    ) : (
      <ArrowUpDown size={16} className="ml-1 text-blue-500 transform rotate-180" />
    );
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const columns: Column[] = [
    { key: 'name', title: 'Nombre', sortable: true },
    { key: 'price', title: 'PVP', sortable: true },
    { key: 'totalSales', title: 'Ventas totales', sortable: true },
    { key: 'profitability', title: 'Rentabilidad', sortable: true },
    { key: 'popularityIndex', title: 'Popularidad', sortable: true },
    { key: 'classification', title: 'Clasificación', sortable: true },
  ];

  const sortedData = sortConfig
    ? handleSort(products, sortConfig.key as keyof Product, sortConfig.direction)
    : products;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500">Análisis de rendimiento de productos</p>
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
                          direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc',
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
                key={product.name}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{formatCurrency(product.totalSales)}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="text-sm text-gray-900">{parseFloat(product.profitability.toFixed(2))}%</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {parseFloat(product.popularityIndex.toFixed(2))}%
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(
                      product.classification
                    )}`}
                  >
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

export default ProductTable;