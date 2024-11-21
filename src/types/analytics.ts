
export interface Product {
    code: string;
    name: string;
    cost: number;
    price: number;
    priceNoVAT: number;
    popularityIndex: number;
    foodCost: number;
    profitability: number;
    totalSales: number;
    totalContribution: number;
    totalCost: number;
    unitsSold: number;
    margin: number;
    salesPercentage: number;
    marginPercentage: number;
    irp: number;
    classification: 'ESTRELLA' | 'PERRO' | 'PUZZLE' | 'VACA';
    category?: string;
    sales?: number;
    trend?: number;
    stock?: number;
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