# 🏗️ **ARQUITECTURA MODULAR - MELPROPV2**

## 📁 **ESTRUCTURA DE MÓDULOS**

```
src/modules/
├── User/
│   ├── User.dto.ts          # DTOs para el módulo de usuario
│   ├── UserRepository.ts    # Capa de acceso a datos
│   └── UserService.ts       # Capa de lógica de negocio
├── Favorites/
│   ├── Favorites.dto.ts     # DTOs para favoritos
│   ├── FavoritesRepository.ts
│   └── FavoritesService.ts
├── SavedSearches/
│   ├── SavedSearches.dto.ts # DTOs para búsquedas guardadas
│   ├── SavedSearchesRepository.ts
│   └── SavedSearchesService.ts
├── Properties/
│   ├── Properties.dto.ts    # DTOs para propiedades
│   ├── PropertiesRepository.ts
│   └── PropertiesService.ts
└── index.ts                 # Exporta todos los módulos
```

## 🎯 **FILOSOFÍA DE LA ARQUITECTURA**

### **1. Separación de Responsabilidades**

- **DTOs**: Definición de tipos y interfaces
- **Repository**: Acceso directo al backend
- **Service**: Lógica de negocio y validaciones

### **2. Patrón de Uso**

```typescript
// ❌ ANTES: Llamada directa al backend
const response = await axios.post("/api/login/", credentials);

// ✅ AHORA: Uso del servicio
const response = await UserService.login(credentials);
```

## 🚀 **EJEMPLOS DE USO**

### **MÓDULO USER**

#### **Login de Usuario**

```typescript
import { UserService, LoginUserDTO } from "modules";

const handleLogin = async (username: string, password: string) => {
  try {
    const credentials: LoginUserDTO = { username, password };
    const response = await UserService.login(credentials);

    if (response.success) {
      // Usuario logueado exitosamente
      console.log("Usuario:", response.user);
    }
  } catch (error) {
    console.error("Error en login:", error.message);
  }
};
```

#### **Registro de Usuario**

```typescript
import { UserService, CreateUserDTO } from "modules";

const handleSignup = async (userData: CreateUserDTO) => {
  try {
    const response = await UserService.signup(userData);

    if (response.success) {
      console.log("Usuario registrado:", response.user);
    }
  } catch (error) {
    console.error("Error en registro:", error.message);
  }
};
```

#### **Verificar Usuario Logueado**

```typescript
import { UserService } from "modules";

const checkUserStatus = async () => {
  try {
    const response = await UserService.checkUserLogged();

    if (response.user) {
      console.log("Usuario logueado:", response.user);
      return true;
    } else {
      console.log("No hay usuario logueado");
      return false;
    }
  } catch (error) {
    console.error("Error verificando usuario:", error.message);
    return false;
  }
};
```

#### **Actualizar Perfil**

```typescript
import { UserService, UpdateUserDTO } from "modules";

const updateProfile = async (profileData: UpdateUserDTO) => {
  try {
    const response = await UserService.updateProfile(profileData);

    if (response.success) {
      console.log("Perfil actualizado:", response.data);
    }
  } catch (error) {
    console.error("Error actualizando perfil:", error.message);
  }
};
```

### **MÓDULO FAVORITOS**

#### **Agregar a Favoritos**

```typescript
import { FavoritesService } from "modules";

const addToFavorites = async (propertyId: number) => {
  try {
    const response = await FavoritesService.addFavorite({ id: propertyId });

    if (response.success) {
      console.log("Propiedad agregada a favoritos");
      // Recargar lista de favoritos
      await loadFavorites();
    }
  } catch (error) {
    console.error("Error agregando a favoritos:", error.message);
  }
};
```

#### **Obtener Favoritos**

```typescript
import { FavoritesService } from "modules";

const loadFavorites = async () => {
  try {
    const response = await FavoritesService.getFavorites();

    if (response.success) {
      setFavorites(response.properties);
      console.log("Favoritos cargados:", response.count);
    }
  } catch (error) {
    console.error("Error cargando favoritos:", error.message);
  }
};
```

#### **Toggle Favorito**

```typescript
import { FavoritesService } from "modules";

const toggleFavorite = async (propertyId: number) => {
  try {
    const result = await FavoritesService.toggleFavorite(propertyId);

    if (result.success) {
      console.log("Favorito:", result.isFavorite ? "agregado" : "removido");
      // Actualizar UI
      setIsFavorite(result.isFavorite);
    }
  } catch (error) {
    console.error("Error en toggle de favorito:", error.message);
  }
};
```

### **MÓDULO BÚSQUEDAS GUARDADAS**

#### **Guardar Búsqueda**

```typescript
import { SavedSearchesService, CreateSavedSearchDTO } from "modules";

const saveSearch = async (name: string, alertType: string, url: string) => {
  try {
    const searchData: CreateSavedSearchDTO = {
      name,
      alert_type: alertType,
      url,
    };

    const response = await SavedSearchesService.createSavedSearchWithValidation(
      searchData
    );

    if (response.success) {
      console.log("Búsqueda guardada:", response.search);
      // Recargar lista
      await loadSavedSearches();
    }
  } catch (error) {
    console.error("Error guardando búsqueda:", error.message);
  }
};
```

#### **Obtener Búsquedas Guardadas**

```typescript
import { SavedSearchesService } from "modules";

const loadSavedSearches = async () => {
  try {
    const response = await SavedSearchesService.getSavedSearches();

    if (response.success) {
      setSavedSearches(response.searchs);
      console.log("Búsquedas guardadas:", response.count);
    }
  } catch (error) {
    console.error("Error cargando búsquedas:", error.message);
  }
};
```

### **MÓDULO PROPIEDADES**

#### **Obtener Propiedades Destacadas**

```typescript
import { PropertiesService } from "modules";

const loadFeaturedProperties = async () => {
  try {
    const response = await PropertiesService.getFeaturedProperties(6);

    if (response.success) {
      setProperties(response.properties);
      console.log("Propiedades destacadas:", response.count);
    }
  } catch (error) {
    console.error("Error cargando propiedades:", error.message);
  }
};
```

#### **Filtrar Propiedades**

```typescript
import { PropertiesService, PropertyFilterDTO } from "modules";

const filterProperties = async (filters: PropertyFilterDTO) => {
  try {
    const response = await PropertiesService.filterProperties(filters);

    if (response.success) {
      setProperties(response.properties);
      setPagination({
        page: response.page,
        total: response.count,
        totalPages: response.total_pages,
      });
    }
  } catch (error) {
    console.error("Error filtrando propiedades:", error.message);
  }
};
```

#### **Obtener Propiedad Específica**

```typescript
import { PropertiesService } from "modules";

const loadProperty = async (slug: string) => {
  try {
    const response = await PropertiesService.getProperty(slug);

    if (response.success) {
      setProperty(response.property);
      // Cargar propiedades relacionadas
      const related = await PropertiesService.getRelatedProperties(
        response.property.id
      );
      setRelatedProperties(related);
    }
  } catch (error) {
    console.error("Error cargando propiedad:", error.message);
  }
};
```

## 🔄 **MIGRACIÓN DESDE EL CÓDIGO ANTERIOR**

### **ANTES (UserContext)**

```typescript
// ❌ Código anterior
const addToFavorites = useCallback(
  async (id: number) => {
    try {
      const response = await setFavorite(id);
      if (response.success) {
        await loadFavorites();
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  },
  [loadFavorites]
);
```

### **DESPUÉS (Con Servicios)**

```typescript
// ✅ Código nuevo
const addToFavorites = useCallback(
  async (id: number) => {
    try {
      const response = await FavoritesService.addFavorite({ id });
      if (response.success) {
        await loadFavorites();
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  },
  [loadFavorites]
);
```

## 📚 **VENTAJAS DE LA NUEVA ARQUITECTURA**

### **1. Tipado Completo**

- Todos los DTOs están tipados
- IntelliSense completo en el IDE
- Errores de compilación tempranos

### **2. Separación de Responsabilidades**

- Repository: Solo acceso a datos
- Service: Solo lógica de negocio
- Componentes: Solo UI y estado

### **3. Reutilización**

- Los servicios se pueden usar en cualquier componente
- No hay duplicación de código
- Fácil testing unitario

### **4. Mantenibilidad**

- Cambios en un lugar afectan toda la aplicación
- Fácil debugging y logging
- Código más limpio y organizado

### **5. Escalabilidad**

- Fácil agregar nuevos módulos
- Fácil modificar endpoints
- Fácil agregar validaciones

## 🎉 **CONCLUSIÓN**

Esta nueva arquitectura modular te permite:

1. **Usar servicios tipados**: `UserService.login()`, `FavoritesService.addFavorite()`
2. **Tener separación clara**: Repository → Service → Component
3. **Mantener código limpio**: Sin llamadas directas a Axios en componentes
4. **Facilitar testing**: Cada capa se puede testear independientemente
5. **Mejorar mantenibilidad**: Cambios centralizados y organizados

¡Ahora puedes usar `UserService.createNewUser(body)` como querías! 🚀
