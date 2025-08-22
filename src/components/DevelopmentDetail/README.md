# DevelopmentDetail Component

## Descripción

El componente `DevelopmentDetail` muestra información detallada de un desarrollo inmobiliario con un diseño moderno y responsive.

## Características

- **Galería de imágenes**: Muestra la imagen principal y miniaturas navegables
- **Información completa**: Descripción, características, amenities y ubicación
- **Sidebar informativo**: Precio, código de referencia y botones de contacto
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- **Animaciones**: Efectos de entrada y transiciones suaves
- **Accesibilidad**: Soporte para navegación por teclado y lectores de pantalla

## Uso

### Importación

```tsx
import DevelopmentDetail from "../components/DevelopmentDetail";
```

### Uso básico

```tsx
import { Development } from "../modules/Developments/interfaces/development.interface";

const MyComponent = () => {
  const development: Development = {
    // ... datos del desarrollo
  };

  return (
    <DevelopmentDetail development={development} className="custom-class" />
  );
};
```

### Con navegación

```tsx
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/emprendimientos");
  };

  return (
    <div>
      <button onClick={handleBackClick}>Volver a Emprendimientos</button>
      <DevelopmentDetail development={development} />
    </div>
  );
};
```

## Props

| Prop          | Tipo          | Requerido | Descripción                              |
| ------------- | ------------- | --------- | ---------------------------------------- |
| `development` | `Development` | ✅        | Objeto con la información del desarrollo |
| `className`   | `string`      | ❌        | Clases CSS adicionales                   |

## Estructura de datos esperada

El componente espera un objeto `Development` con la siguiente estructura:

```tsx
interface Development {
  id: number;
  name: string;
  slug: string;
  type: string;
  operation_type: string;
  description: string;
  address: string;
  neighborhood: string;
  country: string;
  city: string;
  status: string;
  main_image: string;
  latitude: number | { source: string; parsedValue: number };
  longitude: number | { source: string; parsedValue: number };
  reference_code: string;
  add_to_homepage: boolean;
  amenities: Array<{
    id: number;
    name: string;
    image: {
      name: string;
      url: string;
    };
  }>;
  posesion: string;
  stage: string;
  media: {
    images: Array<{ url: string }>;
  };
  external_url: string;
  updated: string;
  min_price: number;
  rooms: number[];
  url?: string;
}
```

## Funcionalidades

### Galería de imágenes

- Navegación entre imágenes con miniaturas
- Imagen principal destacada
- Transiciones suaves entre imágenes

### Información del desarrollo

- **Descripción**: Texto descriptivo del desarrollo
- **Características**: Ambientes, etapa, posesión y estado
- **Amenities**: Lista de comodidades con iconos
- **Ubicación**: Dirección completa y coordenadas

### Sidebar

- **Precio**: Precio desde con formato de moneda
- **Información adicional**: Código de referencia y última actualización
- **Botones de acción**: Contactar y ver más información
- **Ubicación**: Detalles de la dirección

## Estilos

El componente utiliza:

- **Tailwind CSS**: Para estilos base y responsive
- **CSS personalizado**: Para animaciones y efectos especiales
- **Colores del tema**: Según la configuración de la aplicación
- **Tipografías**: Raleway para títulos y texto

## Responsive

- **Desktop**: Layout de 3 columnas con sidebar
- **Tablet**: Layout adaptativo con sidebar debajo
- **Mobile**: Layout de una columna optimizado para móviles

## Accesibilidad

- Navegación por teclado
- Indicadores de focus visibles
- Textos alternativos para imágenes
- Estructura semántica HTML
- Soporte para lectores de pantalla

## Dependencias

- React 18+
- Heroicons (para iconos)
- Tailwind CSS
- CSS personalizado

## Ejemplo completo

```tsx
import React from "react";
import { useParams } from "react-router-dom";
import { DevelopmentService } from "../modules/Developments/developmentService";
import DevelopmentDetail from "../components/DevelopmentDetail";

const DevelopmentPage = () => {
  const { slug } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopment = async () => {
      try {
        const data = await DevelopmentService.getDevelopmentBySlug(slug);
        setDevelopment(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDevelopment();
    }
  }, [slug]);

  if (loading) return <div>Cargando...</div>;
  if (!development) return <div>Desarrollo no encontrado</div>;

  return (
    <div className="container mx-auto px-4">
      <DevelopmentDetail development={development} />
    </div>
  );
};

export default DevelopmentPage;
```
