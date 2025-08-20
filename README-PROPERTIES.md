# Sistema de Filtros y Búsqueda de Propiedades

Este documento describe la implementación del sistema de filtros y búsqueda de propiedades en `melpropv2`, siguiendo la arquitectura de `melprop-front`.

## Arquitectura

El sistema está organizado en capas siguiendo el patrón de Clean Architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Componentes (UI)                        │
├─────────────────────────────────────────────────────────────┤
│                    Contexto (Estado)                       │
├─────────────────────────────────────────────────────────────┤
│                    Servicios (Lógica)                      │
├─────────────────────────────────────────────────────────────┤
│                  Repositorios (Datos)                      │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. SearchForm

Componente principal para la búsqueda de propiedades con filtros.

**Características:**

- Filtros de operación (Comprar, Alquilar, Emprendimientos)
- Filtros de ubicación, tipo de propiedad, ambientes
- Filtros de precio y moneda
- Tags visuales para filtros activos
- Integración con el contexto de properties

**Uso:**

```tsx
import SearchForm from "./components/SearchForm";

<SearchForm
  onSearch={handleSearch}
  initialFilters={{ operation: ["venta"] }}
/>;
```

### 2. PropertyCard

Componente para mostrar información de una propiedad.

**Características:**

- Imagen de la propiedad
- Información básica (precio, dirección, características)
- Botón de favoritos
- Diseño responsive

**Uso:**

```tsx
import PropertyCard from "./components/PropertyCard";

<PropertyCard
  property={property}
  isFavorite={isFavorite}
  onToggleFavorite={handleToggleFavorite}
/>;
```

## Contexto de Properties

### PropertiesContext

Maneja el estado global de las propiedades y filtros.

**Estado:**

- `properties`: Lista de propiedades
- `filters`: Filtros aplicados
- `unsentFilters`: Filtros no enviados
- `loading`: Estado de carga
- `error`: Mensajes de error
- `count`: Total de propiedades

**Acciones principales:**

- `getProperties(params)`: Obtener propiedades con filtros
- `setFilters(filters)`: Establecer filtros
- `setUnsentFilters(filters)`: Establecer filtros no enviados
- `clearFilters()`: Limpiar filtros
- `removeFilter(key, value)`: Remover filtro específico

**Uso:**

```tsx
import { useProperties } from "./context/PropertiesContext";

const {
  state: { properties, loading, error, count },
  getProperties,
  setFilters,
  clearFilters,
} = useProperties();
```

## Servicios

### PropertiesService

Capa de servicio que maneja la lógica de negocio.

**Métodos principales:**

- `getProperties(params)`: Obtener propiedades
- `getFeaturedProperties()`: Obtener propiedades destacadas
- `getPropertyById(id)`: Obtener propiedad por ID
- `prepareFilters(filters)`: Preparar filtros para la API
- `filtersToUrl(filters)`: Convertir filtros a URL

**Uso:**

```tsx
import { PropertiesService } from "./services/properties";

const properties = await PropertiesService.getProperties({
  operation: ["venta"],
  locations: ["Palermo", "Belgrano"],
});
```

## Repositorios

### PropertiesRepository

Capa de acceso a datos que se comunica con la API.

**Métodos principales:**

- `fetchProperties(params)`: Obtener propiedades desde la API
- `fetchFeaturedProperties()`: Obtener propiedades destacadas
- `fetchPropertyById(id)`: Obtener propiedad por ID
- `getMockProperties(params)`: Obtener datos mock para desarrollo

**Características:**

- Manejo automático de errores
- Conversión de parámetros para la API
- Fallback a datos mock en desarrollo
- Configuración centralizada de endpoints

## Tipos y Interfaces

### SearchProps

Interfaz principal para los filtros de búsqueda:

```typescript
interface SearchProps {
  operation?: string[]; // venta, alquiler, emprendimientos
  properties?: string[]; // tipos de propiedades
  locations?: string[]; // ubicaciones
  rooms?: string[]; // ambientes
  amenities?: string[]; // amenidades
  min_price?: number; // precio mínimo
  max_price?: number; // precio máximo
  currency?: string; // moneda
  page?: number; // página
  order_by?: string; // ordenamiento
  // ... más filtros
}
```

### Property

Interfaz para las propiedades:

```typescript
interface Property {
  id: number;
  title: string;
  price: string;
  address: string;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  main_image: string;
  operation_type: "Alquiler" | "Venta";
  neighborhood: string;
  // ... más campos
}
```

## Implementación en Páginas

### Página de Compra

```tsx
import React, { useEffect } from "react";
import { useProperties } from "../context/PropertiesContext";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";

const Compra: React.FC = () => {
  const {
    state: { properties, loading, error, count },
    getProperties,
    setUnsentFilters,
  } = useProperties();

  useEffect(() => {
    const initialFilters = {
      operation: ["venta"],
      page: 1,
    };

    setUnsentFilters(initialFilters);
    getProperties(initialFilters);
  }, [getProperties, setUnsentFilters]);

  return (
    <div>
      <SearchForm
        onSearch={handleSearch}
        initialFilters={{ operation: ["venta"] }}
      />

      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};
```

### Página de Alquiler

Similar a la página de compra, pero con `operation: ['alquiler']`.

## Filtros Disponibles

### Operaciones

- `venta`: Propiedades en venta
- `alquiler`: Propiedades en alquiler
- `emprendimientos`: Emprendimientos

### Tipos de Propiedades

- `departamento`
- `casa`
- `ph`
- `deposito`
- `oficina`
- `terreno`
- `local`
- `edificio`

### Ubicaciones

- Barrios de Buenos Aires
- Ciudades del GBA
- Otras localidades

### Ambientes

- `1`: 1 ambiente
- `2`: 2 ambientes
- `3`: 3 ambientes
- `4`: 4 ambientes
- `4+`: 4+ ambientes

### Precios

- Precio mínimo
- Precio máximo
- Moneda (USD/ARS)

## Configuración

### Variables de Entorno

```bash
REACT_APP_API_URI=http://localhost:8000/api
```

### Endpoints de la API

- `GET /api/properties/` - Listar propiedades
- `GET /api/properties/{id}/` - Obtener propiedad por ID
- `GET /api/neighborhoods/` - Listar barrios

## Características del Sistema

### 1. Filtros Inteligentes

- Los filtros se aplican en tiempo real
- Persistencia del estado de filtros
- Limpieza automática de filtros vacíos

### 2. Paginación

- Carga automática de más propiedades
- Manejo de estado de carga
- Botón "Cargar más" inteligente

### 3. Manejo de Errores

- Fallback a datos mock en desarrollo
- Mensajes de error amigables
- Estados de carga apropiados

### 4. Responsive Design

- Diseño adaptativo para móviles
- Grid responsive para propiedades
- Formularios optimizados para touch

### 5. Integración con Favoritos

- Sistema de favoritos integrado
- Persistencia del estado
- Animaciones de feedback

## Migración desde el Sistema Anterior

### Cambios Principales

1. **Estado centralizado**: Uso de Context API en lugar de estado local
2. **Arquitectura en capas**: Separación clara de responsabilidades
3. **Tipos TypeScript**: Interfaces bien definidas
4. **Manejo de errores**: Sistema robusto de fallbacks
5. **Componentes reutilizables**: SearchForm y PropertyCard modulares

### Beneficios

- **Mantenibilidad**: Código más organizado y fácil de mantener
- **Reutilización**: Componentes que se pueden usar en múltiples páginas
- **Performance**: Estado global optimizado
- **Testing**: Componentes más fáciles de testear
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Próximos Pasos

### Funcionalidades Futuras

1. **Filtros avanzados**: Más opciones de filtrado
2. **Búsqueda guardada**: Guardar y reutilizar búsquedas
3. **Comparador**: Comparar múltiples propiedades
4. **Mapa interactivo**: Visualización en mapa
5. **Notificaciones**: Alertas de nuevas propiedades

### Mejoras Técnicas

1. **Caché**: Implementar sistema de caché
2. **Lazy loading**: Carga diferida de imágenes
3. **Optimización**: Mejorar performance de filtros
4. **Testing**: Agregar tests unitarios y de integración
5. **Documentación**: Mejorar documentación de componentes

## Soporte

Para dudas o problemas con la implementación, revisar:

1. Los tipos TypeScript en `src/types/properties.ts`
2. La implementación del contexto en `src/context/PropertiesContext.tsx`
3. Los ejemplos de uso en las páginas de Compra y Alquiler
4. La documentación de los componentes individuales
