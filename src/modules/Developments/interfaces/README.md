# Interfaces de Developments - Documentación

## 📋 Descripción General

Este directorio contiene todas las interfaces TypeScript necesarias para tipar correctamente los datos de desarrollos inmobiliarios en la aplicación. Las interfaces están organizadas por funcionalidad y nivel de detalle.

## 🗂️ Estructura de Archivos

```
interfaces/
├── index.ts                           # Exportaciones centralizadas
├── development.interface.ts           # Interfaces básicas de desarrollo
├── developmentResponse.interface.ts   # Interfaces de respuesta de listado
├── developmentSearchFilters.interface.ts # Interfaces de filtros de búsqueda
├── developmentDetailResponse.interface.ts # Interfaces de respuesta detallada
└── README.md                          # Este archivo de documentación
```

## 🔧 Interfaces Principales

### 1. Development (Desarrollo Básico)

```typescript
import { Development } from "../interfaces";

// Para listados y vistas generales
const development: Development = {
  id: 23,
  name: "Burela 2300",
  slug: "burela-2300-23",
  type: "emprendimiento",
  // ... otros campos básicos
};
```

### 2. DevelopmentDetailResponse (Desarrollo Detallado)

```typescript
import { DevelopmentDetailResponse } from '../interfaces';

// Para vistas detalladas y páginas individuales
const developmentDetail: DevelopmentDetailResponse = {
    // Información básica
    id: 23,
    name: "Burela 2300",

    // Contenido rico
    concept_title: "<h1>Invertí en tu futuro</h1>",
    concept_subtitle: "Un emprendimiento planteado...",

    // Ubicación
    location_text: "Ubicado en una zona estratégica...",
    location_map_url: "https://maps.google.com/...",

    // Unidades disponibles
    groups: [
        {
            m2: "47",
            rooms: "2",
            baths: "1",
            letter: "B",
            floors: "2",
            properties: [...]
        }
    ],

    // ... todos los demás campos
};
```

### 3. UnitGroup (Grupo de Unidades)

```typescript
import { UnitGroup } from '../interfaces';

// Para mostrar diferentes tipos de unidades disponibles
const unitGroup: UnitGroup = {
    m2: "52",
    rooms: "2",
    baths: "1",
    letter: "C",
    floors: "1",
    description: "Excelente 2 amb. al frente...",
    properties: [...]
};
```

### 4. Property (Propiedad Individual)

```typescript
import { Property } from "../interfaces";

// Para propiedades específicas dentro de un desarrollo
const property: Property = {
  id: 4118,
  type: "departamento",
  operation_type: "venta",
  name: "Burela 2300",
  address_floor: "1 C",
  covered_m2: 46.0,
  total_m2: 52.0,
  rooms: 2,
  bathrooms: 1,
  price: 145000,
  // ... otros campos
};
```

## 📱 Interfaces Simplificadas

### DevelopmentDetailBasic

```typescript
import { DevelopmentDetailBasic } from "../interfaces";

// Para componentes que solo necesitan información básica
const basicInfo: DevelopmentDetailBasic = {
  id: 23,
  name: "Burela 2300",
  slug: "burela-2300-23",
  description: "Unidades de 2 & 3 ambientes...",
  main_image: "http://...",
  min_price: 139000,
  status: "Disponible",
  neighborhood: "Villa Urquiza",
  city: "Ciudad Autónoma de Buenos Aires",
};
```

### DevelopmentDetailGallery

```typescript
import { DevelopmentDetailGallery } from '../interfaces';

// Para componentes de galería de imágenes
const gallery: DevelopmentDetailGallery = {
    id: 23,
    name: "Burela 2300",
    main_image: "http://...",
    media: { images: [...] },
    groups: [
        { main_image: "...", image2: "...", image3: "..." }
    ]
};
```

## 🎯 Casos de Uso Comunes

### 1. Listado de Desarrollos

```typescript
import { Development, DevelopmentsResponse } from "../interfaces";

const DevelopmentsList: React.FC = () => {
  const [developments, setDevelopments] = useState<Development[]>([]);

  // Usar Development para cada item del listado
  return (
    <div>
      {developments.map((dev: Development) => (
        <DevelopmentCard key={dev.id} development={dev} />
      ))}
    </div>
  );
};
```

### 2. Vista Detallada de Desarrollo

```typescript
import { DevelopmentDetailResponse } from "../interfaces";

const DevelopmentDetailPage: React.FC = () => {
  const [development, setDevelopment] =
    useState<DevelopmentDetailResponse | null>(null);

  if (!development) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{development.name}</h1>
      <p>{development.description}</p>

      {/* Mostrar grupos de unidades */}
      {development.groups.map((group, index) => (
        <UnitGroupCard key={index} group={group} />
      ))}
    </div>
  );
};
```

### 3. Filtros de Búsqueda

```typescript
import { DevelopmentSearchFilters } from "../interfaces";

const SearchFilters: React.FC = () => {
  const [filters, setFilters] = useState<DevelopmentSearchFilters>({});

  const handleFilterChange = (newFilters: DevelopmentSearchFilters) => {
    setFilters(newFilters);
    // Aplicar filtros...
  };

  return (
    <div>
      <input
        placeholder="Ubicación"
        onChange={(e) =>
          handleFilterChange({ ...filters, location: e.target.value })
        }
      />
      {/* Otros filtros... */}
    </div>
  );
};
```

## 🔄 Transformación de Datos

### DevelopmentDetailTransformed

```typescript
import { DevelopmentDetailTransformed } from "../interfaces";

// Para transformar datos de la API a un formato más usable
const transformDevelopmentData = (
  apiData: DevelopmentDetailResponse
): DevelopmentDetailTransformed => {
  return {
    basicInfo: {
      id: apiData.id,
      name: apiData.name,
      slug: apiData.slug,
      type: apiData.type,
      operationType: apiData.operation_type,
      status: apiData.status,
      stage: apiData.stage,
      possession: apiData.posesion,
    },
    location: {
      address: apiData.address,
      neighborhood: apiData.neighborhood,
      city: apiData.city,
      country: apiData.country,
      coordinates: {
        latitude:
          typeof apiData.latitude === "number"
            ? apiData.latitude
            : apiData.latitude.parsedValue,
        longitude:
          typeof apiData.longitude === "number"
            ? apiData.longitude
            : apiData.longitude.parsedValue,
      },
      mapUrl: apiData.location_map_url,
    },
    // ... transformar otros campos
  };
};
```

## 🚨 Manejo de Errores

### DevelopmentDetailError

```typescript
import { DevelopmentDetailError } from "../interfaces";

const handleApiError = (error: DevelopmentDetailError) => {
  console.error(`Error ${error.status}: ${error.message}`);

  if (error.status === 404) {
    return <div>Desarrollo no encontrado</div>;
  }

  if (error.status === 500) {
    return <div>Error del servidor. Inténtalo más tarde.</div>;
  }

  return <div>Error inesperado: {error.message}</div>;
};
```

## 📊 Estados de Carga

### DevelopmentDetailLoadingState

```typescript
import { DevelopmentDetailLoadingState } from "../interfaces";

const useDevelopmentDetail = (slug: string): DevelopmentDetailLoadingState => {
  const [state, setState] = useState<DevelopmentDetailLoadingState>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const data = await DevelopmentService.getDevelopmentBySlug(slug);
        setState({ isLoading: false, error: null, data });
      } catch (error) {
        setState({
          isLoading: false,
          error: {
            error: "FETCH_ERROR",
            message: "No se pudo cargar el desarrollo",
            status: 500,
            timestamp: new Date().toISOString(),
          },
          data: null,
        });
      }
    };

    fetchData();
  }, [slug]);

  return state;
};
```

## 🔍 Filtros y Búsqueda

### DevelopmentDetailFilters

```typescript
import { DevelopmentDetailFilters } from "../interfaces";

const applyFilters = (
  developments: DevelopmentDetailResponse[],
  filters: DevelopmentDetailFilters
) => {
  return developments.filter((dev) => {
    if (filters.type && dev.type !== filters.type) return false;
    if (filters.neighborhood && dev.neighborhood !== filters.neighborhood)
      return false;
    if (filters.min_price && dev.min_price < filters.min_price) return false;
    if (filters.rooms && !filters.rooms.includes(dev.rooms.length))
      return false;
    return true;
  });
};
```

## 📱 Responsive y Accesibilidad

### Uso en Componentes Responsive

```typescript
import {
  DevelopmentDetailResponse,
  DevelopmentDetailBasic,
} from "../interfaces";

const ResponsiveDevelopmentCard: React.FC<{
  development: DevelopmentDetailResponse;
}> = ({ development }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    // Usar solo información básica en móvil
    const basicInfo: DevelopmentDetailBasic = {
      id: development.id,
      name: development.name,
      slug: development.slug,
      description: development.description,
      main_image: development.main_image,
      min_price: development.min_price,
      status: development.status,
      neighborhood: development.neighborhood,
      city: development.city,
    };

    return <MobileDevelopmentCard development={basicInfo} />;
  }

  // Usar información completa en desktop
  return <DesktopDevelopmentCard development={development} />;
};
```

## 🧪 Testing

### Mocks para Testing

```typescript
import { DevelopmentDetailResponse } from "../interfaces";

export const mockDevelopmentDetail: DevelopmentDetailResponse = {
  id: 23,
  name: "Burela 2300",
  slug: "burela-2300-23",
  type: "emprendimiento",
  operation_type: "emprendimiento",
  description: "Unidades de 2 & 3 ambientes...",
  // ... completar con datos de prueba
};

// Usar en tests
test("should render development detail correctly", () => {
  render(<DevelopmentDetail development={mockDevelopmentDetail} />);
  expect(screen.getByText("Burela 2300")).toBeInTheDocument();
});
```

## 📚 Recursos Adicionales

- **TypeScript Handbook**: Para entender mejor las interfaces
- **React TypeScript Cheat Sheet**: Para patrones comunes
- **API Documentation**: Para entender la estructura de datos del backend

## 🤝 Contribuciones

Al agregar nuevas interfaces o modificar las existentes:

1. Mantener la consistencia de nomenclatura
2. Agregar documentación JSDoc
3. Actualizar este README
4. Agregar tests si es necesario
5. Verificar que las exportaciones estén correctas en `index.ts`

## 📞 Soporte

Si tienes dudas sobre el uso de estas interfaces:

1. Revisa esta documentación
2. Consulta los ejemplos de uso
3. Revisa los tests existentes
4. Contacta al equipo de desarrollo
