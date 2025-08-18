// =====================================================
// AXIOS CONFIGURATION - CENTRALIZED
// =====================================================

import axios from 'axios';
import { log, logError } from './environment';

// Configuración global de Axios
axios.defaults.withCredentials = true;

// Crear instancia base de Axios con configuración común
export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
});

// Interceptor para agregar headers de autenticación
axiosInstance.interceptors.request.use(
    (config) => {
        // Log de la petición en modo debug
        log(`Enviando petición a: ${config.url}`, {
            method: config.method,
            withCredentials: config.withCredentials,
            headers: config.headers
        });

        // Agregar token de autenticación si existe en localStorage
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                if (userData.id) {
                    config.headers['X-User-ID'] = userData.id;
                    log(`Usuario autenticado: ${userData.id}`);
                }
            } catch (error) {
                logError('Error parsing user data', error);
            }
        } else {
            log('No hay usuario autenticado en localStorage');
        }

        return config;
    },
    (error) => {
        logError('Error en interceptor de request', error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
    (response) => {
        log(`Respuesta exitosa de: ${response.config.url}`, {
            status: response.status,
            statusText: response.statusText
        });
        return response;
    },
    (error) => {
        logError(`Error en respuesta de: ${error.config?.url}`, {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error
        });

        // NO limpiar localStorage automáticamente - dejar que el componente maneje los errores
        if (error.response?.status === 401 ||
            error.response?.data?.message?.includes('No hay usuario logueado')) {

            log('Error de autenticación detectado - NO limpiando localStorage automáticamente');
        }

        // Si es un error de CORS, mostrar mensaje más claro
        if (error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
            log('Error de CORS detectado - El backend no permite peticiones desde este dominio');
            throw new Error('Error de conexión: El servidor no permite peticiones desde este dominio. Contacta al administrador.');
        }

        return Promise.reject(error);
    }
);

// Función para crear instancias específicas para diferentes módulos
export const createAxiosInstance = (moduleName: string) => {
    const instance = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Module': moduleName
        },
        timeout: 10000,
    });

    // Aplicar los mismos interceptores manualmente
    instance.interceptors.request.use(
        (config) => {
            // Agregar token de autenticación si existe en localStorage
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    if (userData.id) {
                        config.headers['X-User-ID'] = userData.id;
                    }
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // NO limpiar localStorage automáticamente
            return Promise.reject(error);
        }
    );

    return instance;
};

// Exportar la instancia por defecto
export default axiosInstance;
