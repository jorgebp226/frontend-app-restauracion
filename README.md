# Dashboard de Analytics para Restaurante 🍽️

Hola! Si estás leyendo esto, probablemente seas parte del equipo de desarrollo. Este documento te ayudará a entender rápidamente la estructura del frontend y cómo conectar los datos del backend.

## 🚀 Empezando

```bash
# Instalar todo lo necesario
npm install

# Arrancar el proyecto
npm run dev
```

## 📁 Estructura Simple del Proyecto

```
src/
├── analytics/
│   ├── AnalyticsDashboard.tsx    # Dashboard principal con gráficos y métricas
│   ├── ProductTable.tsx          # Tabla de productos
│   └── ProductDetail.tsx         # Modal con detalles del producto
└── layout/
    └── Sidebar.tsx              # Menú lateral
```

## 🔌 Puntos de Conexión con Backend

### 1. Dashboard Principal (AnalyticsDashboard.tsx)
```typescript
// Aquí es donde necesitarás conectar los datos en tiempo real
const AnalyticsDashboard = () => {
  // ACTUAL: Datos de ejemplo
  const data = [
    { month: 'Mar', revenue2022: 30, revenue2023: 32 },
    // ...
  ];

  // TODO: Implementar conexión real
  // Ejemplo de cómo conectarlo:
  const [revenueData, setRevenueData] = useState([]);
  
  useEffect(() => {
    // Aquí conectarías tu endpoint
    // Ejemplo:
    // const fetchData = async () => {
    //   const response = await fetch('tu-api/revenue');
    //   const data = await response.json();
    //   setRevenueData(data);
    // };
    // 
    // fetchData();
    // Opcional: Configurar websocket para datos en tiempo real
  }, []);
}
```

### 2. Tabla de Productos (ProductTable.tsx)
```typescript
// Los datos de productos vienen actualmente de un array estático
// Necesitarás conectar esto con tu API

// ACTUAL:
const products = [
  {
    code: 'D001',
    name: 'HUMMUS',
    cost: 1.52,
    // ...
  }
];

// TODO: Implementar esto
const fetchProducts = async () => {
  // const response = await fetch('tu-api/products');
  // const data = await response.json();
  // setProducts(data);
};
```

### 3. Detalles del Producto (ProductDetail.tsx)
```typescript
// Cuando se hace click en un producto, se muestra su detalle
// Necesitarás implementar:

const ProductDetail = ({ productId }) => {
  // ACTUAL: Datos de ejemplo
  const monthlyData = [/*...*/];

  // TODO: Implementar
  const fetchProductDetails = async (id) => {
    // const response = await fetch(`tu-api/products/${id}`);
    // const data = await response.json();
    // setProductData(data);
  };
};
```

## 📊 Estructura de Datos Esperada

### Para el Gráfico de Ingresos
```typescript
interface RevenueData {
  month: string;
  revenue2022: number;
  revenue2023: number;
}
```

### Para Productos
```typescript
interface Product {
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
```

## 🔄 Implementando Datos en Tiempo Real

1. **Usando WebSocket**
```typescript
// En AnalyticsDashboard.tsx
useEffect(() => {
  const ws = new WebSocket('tu-websocket-url');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Actualizar el estado correspondiente
    setRevenueData(data.revenue);
    setMetrics(data.metrics);
  };

  return () => ws.close();
}, []);
```

2. **Usando Polling (alternativa)**
```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    const response = await fetch('tu-api/metrics');
    const data = await response.json();
    setMetrics(data);
  }, 30000); // Cada 30 segundos

  return () => clearInterval(interval);
}, []);
```

## 🎯 Próximos Pasos para Integración

1. **Backend Endpoints Necesarios:**
   - GET /api/revenue-comparison
   - GET /api/products
   - GET /api/products/:id
   - GET /api/metrics

2. **Websocket Events Necesarios:**
   - revenue_update
   - metrics_update
   - product_update

3. **Métricas en Tiempo Real Prioritarias:**
   - Ventas totales
   - Media ponderada
   - Rentabilidad media
   - Índices de popularidad

## 💡 Tips

- Los componentes están preparados para recibir datos dinámicos
- Usa el hook useState para manejar el estado de los datos
- Implementa manejo de errores y estados de carga
- Considera usar React Query o SWR para el manejo de datos

## 🚨 Consideraciones de Rendimiento

- Implementa paginación en la tabla de productos
- Agrupa las actualizaciones en tiempo real (no más frecuente que cada 5 segundos)
- Considera implementar memoización para cálculos pesados

## ❓ Necesitas Ayuda?

1. Para dudas sobre la UI: [nombre del responsable de frontend]
2. Para conexión con backend: [nombre del responsable de backend]
3. Para acceso a APIs: [nombre del responsable de infraestructura]

## 📝 Notas Adicionales

- La UI está construida con Tailwind CSS
- Usamos Recharts para los gráficos
- Los iconos son de Lucide React
- Todo está tipado con TypeScript

¿Preguntas? ¡No dudes en contactar al equipo! 👋