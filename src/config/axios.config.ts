// =====================================================
// GLOBAL AXIOS CONFIGURATION
// =====================================================

import axios from 'axios';

// Si estás usando TypeScript y ves el error de declaración de tipos de axios,
// puedes instalar los tipos con: npm install --save-dev @types/axios
// Sin embargo, axios ya provee sus propios tipos desde la versión 0.14.0 en adelante.
// Si el error persiste, asegúrate de que tu versión de axios sea >=0.14.0
// o agrega una declaración temporal para evitar el error de tipado:

// @ts-ignore

// Configuración base de la API
const API_URI = 'http://backend-dev-melpropiedades.pre-produccion.com/api';

// Crear instancia de axios con configuración global
export const apiClient = axios.create({
    baseURL: API_URI,
    withCredentials: true,
    timeout: 20000, // Aumentado de 10000ms a 20000ms (20 segundos)
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para requests
apiClient.interceptors.request.use(
    (config: any) => {
        // Log de requests en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error: any) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
apiClient.interceptors.response.use(
    (response: { status: any; config: { url: any; }; data: any; statusText: any; headers: any; }) => {
        // Log de responses en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        }
        return response;
    },
    (error: { response: { status: any; data: any; }; request: any; message: any; }) => {
        // Log de errores
        console.error('❌ Response Error:', error);

        // Manejo específico de errores
        if (error.response) {
            // El servidor respondió con un status code fuera del rango 2xx
            console.error('📊 Error Status:', error.response.status);
            console.error('📋 Error Data:', error.response.data);
        } else if (error.request) {
            // La request fue hecha pero no se recibió respuesta
            console.error('🌐 No Response:', error.request);
        } else {
            // Algo más causó el error
            console.error('💥 Request Setup Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Exportar la configuración base para uso en otros lugares
export { API_URI };
