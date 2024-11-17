// types/index.ts

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
  }
  
  export interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon?: React.ComponentType<{ size: number; className?: string }>;
  }
  
  export interface SalesData {
    month: string;
    value: number;
    previousYear?: number;
  }
  
  export interface ChannelData {
    name: string;
    value: number;
  }
  
  export interface ProductDetailProps {
    product: Product;
    onClose: () => void;
  }
  
  export interface SortConfig {
    key: keyof Product | null;
    direction: 'asc' | 'desc';
  }