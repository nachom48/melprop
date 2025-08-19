# 🏗️ Sistema de Filtros para Emprendimientos

Este documento explica cómo funciona el sistema completo de filtros para emprendimientos/developments, similar al sistema de propiedades.

## 📋 Arquitectura Implementada

### **1. DevelopmentRepository**

- **Ubicación**: `src/repositories/developmentRepository.ts`
- **Función**: Capa de acceso a datos para emprendimientos
- **Métodos**:
  - `getAllDevelopments(filters)` - Obtener emprendimientos con filtros
  - `getDevelopmentById(id)` - Obtener por ID
  - `getDevelopmentBySlug(slug)` - Obtener por slug

### **2. DevelopmentService**

- **Ubicación**: `src/services/developmentService.ts`
- **Función**: Lógica de negocio y limpieza de filtros
- **Métodos**:
  - `getAllDevelopments(filters)` - Método principal con limpieza de filtros
  - `cleanFilters()` - Limpia filtros antes de enviar al backend

### **3. EmprendimientosPage**

- **Ubicación**: `src/pages/EmprendimientosPage.tsx`
- **Función**: Página principal con filtros y resultados
- **Características**:
  - Integra `SearchFilters` (mismo componente que propiedades)
  - Maneja URL parameters para filtros
  - Paginación
  - Layout responsive

## 🔧 Filtros Soportados

### **Filtros Básicos**

- **Ubicación** (`location`)
- **Operación** (`operation`) - Venta, Alquiler, etc.
- **Tipo de Propiedad** (`propertyType`) - Casa, Departamento, PH, etc.
- **Ambientes** (`rooms`) - 1, 2, 3, 4+ ambientes
- **Precio** (`price`) - Rangos predefinidos

### **Filtros Avanzados**

- **Rango de Precio** (`priceFrom`, `priceTo`)
- **Moneda** (`currency`)
- **Características** (`characteristics`) - Piscina, Gimnasio, etc.
- **Estado** (`status`) - En construcción, Terminado, etc.

### **Ordenamiento**

- **Orden** (`sortOrder`)
  - `relevantes` (por defecto)
  - `menorPrecio`
  - `mayorPrecio`
  - `masAmplio`

## 🚀 Cómo Usar

### **1. Importar Componentes**

```tsx
import { EmprendimientosPage } from "../pages/EmprendimientosPage";
import { developmentService } from "../services";
import { developmentRepository } from "../repositories";
```

### **2. Usar en Router**

```tsx
// En App.tsx o router
<Route path="/emprendimientos" element={<EmprendimientosPage />} />
```

### **3. Llamar al Servicio**

```tsx
// Obtener emprendimientos con filtros
const filters = {
  location: "Belgrano",
  operation: "venta",
  propertyType: ["casa", "departamento"],
  min_price: "100000",
  max_price: "500000",
};

const response = await developmentService.getAllDevelopments(filters);
```

## 📊 Estructura de Datos

### **Development Interface**

```typescript
interface Development {
  id: number;
  name: string;
  slug: string;
  neighborhood: string;
  address: string;
  main_image: string;
  rooms: any[];
  amenities: any[];
  external_url?: string;
  possession_date?: string;
  price_from?: string;
  stage?: string;
  price?: number;
  currency_symbol?: string;
  operation_type?: string;
  city?: string;
  covered_m2?: number;
  add_to_homepage?: boolean;
}
```

### **DevelopmentSearchFilters Interface**

```typescript
interface DevelopmentSearchFilters {
  operation?: string;
  properties?: string;
  page?: number;
  locations?: string;
  rooms?: string;
  min_price?: string;
  max_price?: string;
  currency?: string;
  characteristics?: string;
  status?: string;
  sort?: string;
  order_by?: string;
  [key: string]: any;
}
```

## 🔄 Flujo de Datos

### **1. Usuario Selecciona Filtros**

```
SearchFilters → handleFiltersChange → EmprendimientosPage
```

### **2. Conversión de Filtros**

```
Frontend Filters → convertFiltersForBackend → Backend Filters
```

### **3. Llamada al Backend**

```
EmprendimientosPage → DevelopmentService → DevelopmentRepository → API
```

### **4. Respuesta y Renderizado**

```
API Response → DevelopmentService → EmprendimientosPage → DevelopmentCard Grid
```

## 🎯 Características Principales

- ✅ **Filtros idénticos** a propiedades
- ✅ **URL parameters** para compartir búsquedas
- ✅ **Paginación** completa
- ✅ **Responsive design**
- ✅ **Integración** con SearchFilters existente
- ✅ **Manejo de errores** robusto
- ✅ **Logs detallados** para debugging

## 🔍 Endpoints del Backend

### **Obtener Emprendimientos**

```
GET /api/developments/?{filters}
```

### **Parámetros de Filtro**

- `locations` - Ubicaciones separadas por coma
- `operation` - Tipo de operación
- `properties` - Tipos de propiedad separados por coma
- `rooms` - Número de ambientes
- `min_price` - Precio mínimo
- `max_price` - Precio máximo
- `currency` - Moneda
- `characteristics` - Características separadas por coma
- `status` - Estados separados por coma
- `order_by` - Ordenamiento
- `page` - Número de página

## 🚨 Troubleshooting

### **Problema: Los filtros no se aplican**

- Verificar que `onFiltersChange` esté siendo llamado
- Revisar logs del servicio para ver filtros enviados
- Verificar que el backend esté recibiendo los parámetros

### **Problema: No se muestran resultados**

- Verificar respuesta del backend en logs
- Confirmar que los filtros no sean demasiado restrictivos
- Verificar que la API esté funcionando

### **Problema: Error en la conversión de filtros**

- Revisar tipos de datos en `convertFiltersForBackend`
- Verificar que los filtros coincidan con `DevelopmentSearchFilters`
- Revisar logs de conversión

## 🔮 Próximos Pasos

1. **Implementar backend** para `/api/developments/`
2. **Agregar más filtros** específicos de emprendimientos
3. **Implementar cache** para mejorar performance
4. **Agregar analytics** de búsquedas
5. **Implementar favoritos** para emprendimientos
