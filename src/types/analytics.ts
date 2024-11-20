export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    sales: number;
    stock: number;
    trend?: number;
    status?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  }
  
  export interface Column {
    key: string;
    title: string;
    sortable?: boolean;
  }
  
  export interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
  
  export interface ProductDetailProps {
    product: Product;
    onClose: () => void;
  }
  
  export interface RevenueData {
    month: string;
    revenue2022: number;
    revenue2023: number;
  }
  
  export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  
  export interface ProductTableProps {
    onProductClick: (product: Product) => void;
  }