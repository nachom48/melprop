import { CONFIG } from './index';

// =====================================================
// ENVIRONMENT CONFIGURATION
// =====================================================

interface EnvironmentConfig {
    API_URI: string;
    AUTH_COOKIE_DOMAIN: string;
    AUTH_SECURE_COOKIES: boolean;
    DEBUG_MODE: boolean;
}

// Configuración para desarrollo local
const developmentConfig: EnvironmentConfig = {
    API_URI: 'http://localhost:8000',
    AUTH_COOKIE_DOMAIN: 'localhost',
    AUTH_SECURE_COOKIES: false,
    DEBUG_MODE: true
};

// Configuración para pre-producción
const stagingConfig: EnvironmentConfig = {
    API_URI: 'http://backend-dev-melpropiedades.pre-produccion.com',
    AUTH_COOKIE_DOMAIN: '.pre-produccion.com',
    AUTH_SECURE_COOKIES: false,
    DEBUG_MODE: true
};

// Configuración para producción
const productionConfig: EnvironmentConfig = {
    API_URI: 'https://melpropiedades.com.ar',
    AUTH_COOKIE_DOMAIN: '.melpropiedades.com.ar',
    AUTH_SECURE_COOKIES: true,
    DEBUG_MODE: false
};

// Determinar el entorno actual
const getCurrentEnvironment = (): EnvironmentConfig => {
    const hostname = window.location.hostname;

    // Para desarrollo local, SIEMPRE usar el backend de pre-producción
    if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
        console.log('🔄 Desarrollo local detectado, SIEMPRE usando backend de pre-producción');

        return {
            API_URI: CONFIG.API_BASE_URL,
            AUTH_COOKIE_DOMAIN: CONFIG.COOKIE_DOMAIN,
            AUTH_SECURE_COOKIES: CONFIG.SECURE_COOKIES,
            DEBUG_MODE: CONFIG.DEBUG_MODE
        };
    } else if (hostname.includes('pre-produccion.com') || hostname.includes('dev')) {
        return stagingConfig;
    } else if (hostname.includes('melpropiedades.com.ar') || hostname.includes('vercel.app')) {
        return productionConfig;
    }

    // Por defecto, usar staging (pre-producción)
    return stagingConfig;
};

// Exportar la configuración del entorno actual
export const env = getCurrentEnvironment();

// Configuración de Axios para el entorno actual
export const axiosConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
};

// Función para obtener la URL completa de la API
export const getApiUrl = (endpoint: string): string => {
    // Para el backend de pre-producción, no agregar /api
    if (env.API_URI.includes('pre-produccion.com')) {
        return `${env.API_URI}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    }
    // Para otros entornos, mantener la lógica original
    return `${env.API_URI}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Función para verificar si estamos en producción
export const isProduction = (): boolean => {
    return env === productionConfig;
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = (): boolean => {
    return env === developmentConfig;
};

// Función para logging condicional
export const log = (message: string, data?: any): void => {
    if (env.DEBUG_MODE) {
        console.log(`[${env.API_URI}] ${message}`, data);
    }
};

// Función para logging de errores
export const logError = (message: string, error?: any): void => {
    if (env.DEBUG_MODE) {
        console.error(`[${env.API_URI}] ${message}`, error);
    }
};
