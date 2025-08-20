// =====================================================
// GLOBAL AXIOS CONFIGURATION
// =====================================================

import axios from 'axios';

// Configuración base de la API
const API_URI = 'http://backend-dev-melpropiedades.pre-produccion.com/api';

// Crear instancia de axios con configuración global
export const apiClient = axios.create({
    baseURL: API_URI,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para requests
apiClient.interceptors.request.use(
    (config) => {
        // Log de requests en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
apiClient.interceptors.response.use(
    (response) => {
        // Log de responses en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        }
        return response;
    },
    (error) => {
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
