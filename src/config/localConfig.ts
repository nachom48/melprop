// =====================================================
// LOCAL DEVELOPMENT CONFIGURATION
// =====================================================

// Configuración SIMPLIFICADA para desarrollo local
// Siempre apunta al backend de pre-producción

export const LOCAL_CONFIG = {
    // Backend de pre-producción - SIEMPRE usado desde localhost
    BACKEND_URL: 'http://backend-dev-melpropiedades.pre-produccion.com',

    // Usuario maestro para desarrollo
    MASTER_USER: {
        email: 'vargues@gmail.com',
        password: '20230414'
    },

    // Configuración de cookies para el dominio de pre-producción
    COOKIE_DOMAIN: '.pre-produccion.com',
    SECURE_COOKIES: false,

    // Modo debug activado para desarrollo
    DEBUG_MODE: true
};

// Función para obtener la URL base del backend
export const getBackendUrl = (): string => {
    console.log('🚀 Configuración local: SIEMPRE usando backend de pre-producción');
    console.log('🔗 URL:', LOCAL_CONFIG.BACKEND_URL);
    return LOCAL_CONFIG.BACKEND_URL;
};

// Función para obtener la configuración completa
export const getLocalConfig = () => {
    console.group('🌍 Configuración de Desarrollo Local');
    console.log('Backend:', LOCAL_CONFIG.BACKEND_URL);
    console.log('Usuario maestro:', LOCAL_CONFIG.MASTER_USER.email);
    console.log('Dominio de cookies:', LOCAL_CONFIG.COOKIE_DOMAIN);
    console.log('Modo debug:', LOCAL_CONFIG.DEBUG_MODE);
    console.groupEnd();

    return LOCAL_CONFIG;
};

// Función para mostrar información del usuario maestro
export const showMasterUserInfo = () => {
    console.group('👑 Usuario Maestro para Desarrollo');
    console.log('Email:', LOCAL_CONFIG.MASTER_USER.email);
    console.log('⚠️ Este usuario es solo para desarrollo y testing');
    console.log('🔗 Backend:', LOCAL_CONFIG.BACKEND_URL);
    console.groupEnd();
};

export default LOCAL_CONFIG;
