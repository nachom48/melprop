# 🏗️ Componentes de Emprendimientos

Este documento explica cómo usar los nuevos componentes para mostrar emprendimientos/developments en la aplicación.

## 📋 Componentes Disponibles

### 1. `DevelopmentCard`

Componente reutilizable para mostrar tarjetas de emprendimientos con dos variantes:

- **XL**: Imagen completa como card con overlay de texto
- **L**: Imagen arriba, información abajo

#### Props

```typescript
interface DevelopmentCardProps {
  development: Development;
  variant: "XL" | "L";
  className?: string;
}
```

#### Uso

```tsx
import DevelopmentCard from "../components/DevelopmentCard";

<DevelopmentCard
  development={developmentData}
  variant="XL"
  className="h-full"
/>;
```

### 2. `EmprendimientosSection`

Componente que muestra los emprendimientos en el layout específico solicitado:

- **Primera fila**: 1XL + 1L
- **Segunda fila**: 3L
- **Tercera fila**: 1L + 1XL
- **Cuarta fila**: 3XL

#### Uso

```tsx
import EmprendimientosSection from "../components/EmprendimientosSection";

<EmprendimientosSection />;
```

### 3. `HomeLayout`

Componente principal que organiza todo el contenido del home en el orden correcto:

1. **Nuestros Servicios**
2. **Emprendimientos**
3. **Oportunidades**
4. **Barrios y Lugares**

#### Uso

```tsx
import HomeLayout from "../components/HomeLayout";

<HomeLayout />;
```

## 🎨 Estilos

Los estilos están definidos en `DevelopmentCard.css` e incluyen:

- **Hover effects** con transformaciones y sombras
- **Animaciones** de entrada (fadeInUp)
- **Responsive design** para móvil y desktop
- **Gradientes** y colores consistentes con el diseño
- **Transiciones suaves** para mejor UX

## 📱 Layout Responsive

### Desktop (lg+)

- **XL**: Imagen completa con overlay
- **L**: Imagen arriba, info abajo
- **Grid**: 2-3 columnas según el layout

### Tablet (md)

- **Grid**: 2 columnas
- **Cards**: Mantienen proporciones

### Móvil (sm)

- **Grid**: 1 columna
- **Cards**: Stack vertical
- **Texto**: Tamaños ajustados

## 🔧 Personalización

### Cambiar Colores

```css
/* En DevelopmentCard.css */
.development-card-xl {
  --primary-color: #059669;
  --secondary-color: #047857;
  --accent-color: #f59e0b;
}
```

### Cambiar Tamaños

```tsx
// En EmprendimientosSection.tsx
<div className="h-96">
  {" "}
  {/* Altura fija */}
  <DevelopmentCard variant="XL" />
</div>
```

### Cambiar Espaciado

```tsx
// En EmprendimientosSection.tsx
<div className="gap-8 mb-12">
  {" "}
  {/* Gap y margin */}
  {/* Cards */}
</div>
```

## 📊 Estructura de Datos

### Interface Development

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
}
```

## 🚀 Implementación

### 1. Importar Componentes

```tsx
import {
  DevelopmentCard,
  EmprendimientosSection,
  HomeLayout,
} from "../components";
```

### 2. Usar en Página

```tsx
const EmprendimientosPage = () => {
  return (
    <div>
      <HomeLayout />
    </div>
  );
};
```

### 3. Agregar a Router

```tsx
// En App.tsx o router
<Route path="/emprendimientos" element={<EmprendimientosPage />} />
```

## 🎯 Características Principales

- ✅ **Dos variantes de tarjetas** (XL y L)
- ✅ **Layout responsivo** y adaptativo
- ✅ **Animaciones suaves** y efectos hover
- ✅ **Componentes reutilizables** y modulares
- ✅ **Estilos consistentes** con el diseño actual
- ✅ **Integración completa** con el sistema existente

## 🔍 Troubleshooting

### Problema: Las tarjetas no se muestran

- Verificar que `getDevelopments()` retorne datos
- Revisar la consola para errores de API
- Verificar que las imágenes existan

### Problema: Layout no se ve correcto

- Verificar que haya suficientes emprendimientos (mínimo 10)
- Revisar CSS y Tailwind classes
- Verificar responsive breakpoints

### Problema: Estilos no se aplican

- Verificar que `DevelopmentCard.css` esté importado
- Revisar que no haya conflictos con otros estilos
- Verificar que las clases CSS estén correctas
