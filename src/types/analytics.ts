export interface Product {
    id: string;
    name: string;
    code: string;
    totalSales: number;
    profitability: number;
    cost: number;
    price: number;
    priceNoVAT: number;
    foodCost: number;
    totalCost: number;
    unitsSold: number;
    margin: number;
    salesPercentage: number;
    irp: number;
    classification: 'ESTRELLA' | 'PERRO' | 'PUZZLE' | 'VACA';
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
    icon: React.ComponentType<{ size?: string | number; className?: string }>;
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
    payload?: Array<{
      value: number;
      payload: {
        month: string;
      };
    }>;
  }
  
  export interface ProductTableProps {
    onProductClick: (product: Product) => void;
  }