# Configuración del Proyecto MelProp v2

## 🌍 Configuración de Entornos

### Desarrollo Local (localhost:3000)

- **SIEMPRE** apunta al backend de pre-producción
- **URL**: `http://backend-dev-melpropiedades.pre-produccion.com`
- **Usuario maestro**: `vargues@gmail.com` / `20230414`

### Pre-producción

- **URL**: `http://backend-dev-melpropiedades.pre-produccion.com`
- Mismo backend que desarrollo local

### Producción

- **URL**: `https://melpropiedades.com.ar`
- Solo usado cuando el frontend está desplegado en producción

## 🔧 Archivos de Configuración

### `src/config/index.ts` - Configuración Principal

- Configuración centralizada para desarrollo local
- Siempre apunta al backend de pre-producción
- Contiene todos los endpoints de la API
- Configuración del usuario maestro

### `src/config/environment.ts` - Configuración de Entorno

- Detecta automáticamente el entorno
- Configura cookies y modo debug
- Usa la configuración principal

### `src/config/axios.ts` - Configuración de Axios

- Interceptores para autenticación
- Manejo de errores CORS
- Headers automáticos

## 🚀 Uso

### Importar configuración

```typescript
import { CONFIG, getApiUrl, showConfigInfo } from "../config";

// Mostrar información de configuración
showConfigInfo();

// Obtener URL de un endpoint
const loginUrl = getApiUrl("LOGIN");
const favoritesUrl = getApiUrl("FAVORITES");
```

### Usuario Maestro para Desarrollo

```typescript
import { CONFIG, showMasterUserInfo } from "../config";

// Mostrar información del usuario maestro
showMasterUserInfo();

// Usar credenciales
const { email, password } = CONFIG.MASTER_USER;
```

## 📝 Endpoints Disponibles

### Autenticación

- `LOGIN` - `/login/`
- `LOGIN_GOOGLE` - `/login/google/`
- `SIGNUP` - `/signup/`
- `ME` - `/me/`

### Favoritos

- `FAVORITES` - `/favorites/`
- `FAVORITES_DELETE` - `/favorites/delete/`
- `FAVORITES_DELETE_ID` - `/favorites/delete/{id}/`

### Propiedades

- `PROPERTIES` - `/properties/`
- `PROPERTIES_DETAIL` - `/properties/{slug}/`

## ⚠️ Importante

- **Desde localhost SIEMPRE se usa el backend de pre-producción**
- **No hay opción de cambiar a backend local**
- **El usuario maestro es solo para desarrollo**
- **Las cookies se configuran para el dominio `.pre-produccion.com`**

## 🔍 Debug

Para ver la configuración actual en la consola:

```typescript
import { showConfigInfo, showMasterUserInfo } from "../config";

showConfigInfo(); // Muestra configuración general
showMasterUserInfo(); // Muestra información del usuario maestro
```

## 🌐 URLs Generadas

La función `getApiUrl()` automáticamente agrega `/api/` al principio de cada endpoint:

- **LOGIN**: `http://backend-dev-melpropiedades.pre-produccion.com/api/login/`
- **FAVORITES**: `http://backend-dev-melpropiedades.pre-produccion.com/api/favorites/`
- **PROPERTIES**: `http://backend-dev-melpropiedades.pre-produccion.com/api/properties/`
