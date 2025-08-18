// =====================================================
// MAIN CONFIGURATION - Always points to pre-production backend
// =====================================================

// Configuración principal para desarrollo local
export const CONFIG = {
    // Backend de pre-producción - SIEMPRE usado desde localhost
    API_BASE_URL: 'http://backend-dev-melpropiedades.pre-produccion.com',

    // Endpoints de la API (sin /api al final)
    ENDPOINTS: {
        // Autenticación
        LOGIN: '/login/',
        LOGIN_GOOGLE: '/login/google/',
        LOGIN_FACEBOOK: '/login/facebook/',
        LOGOUT: '/logout/',
        SIGNUP: '/signup/',
        ME: '/me/',
        CHANGE_PASSWORD: '/change_password/',
        FORGOT_PASSWORD: '/forgot-password/',
        SET_PASSWORD: '/set-password/',
        TOKEN_VALIDATOR: '/token-validator/',

        // Favoritos
        FAVORITES: '/favorites/',
        FAVORITES_DELETE: '/favorites/delete/',
        FAVORITES_DELETE_ID: '/favorites/delete/{id}/',

        // Propiedades
        PROPERTIES: '/properties/',
        PROPERTIES_DETAIL: '/properties/{slug}/',

        // Búsquedas
        SEARCHS: '/searchs/',
        SEARCHS_DELETE: '/searchs/delete/{id}/',
        SEARCH_NOTES: '/search_notes/',
        SEARCH_NOTES_DELETE: '/search_notes/delete/{id}/',

        // Emprendimientos
        DEVELOPMENTS: '/developments/',
        DEVELOPMENTS_DETAIL: '/developments/{slug}/',
        DEVELOPMENTS_FAVORITES: '/developments/favorites/',
        DEVELOPMENTS_NEIGHBORHOODS: '/developments/neighborhoods/',
        DEVELOPMENTS_STAGES: '/developments/stages/',

        // Otros
        NEIGHBORHOODS: '/neighborhoods/',
        CONTACT: '/contact/',
        BENEFITS: '/benefits/',
        BENEFITS_CATEGORIES: '/benefits/categories/',
        BENEFITS_DETAIL: '/benefits/{slug}/',
        BENEFITS_HOME: '/benefits/home/',
        ARTICLES: '/articles/',
        COVER_IMAGES: '/cover_images/',
        BANNER_IMAGES: '/banner_images/',
        BANNERS_DEVELOPMENT: '/banners_development/',
        ADA_SLIDERS_HOME: '/ada_sliders_home/',
        ADA_PLANS: '/ada_plans/',
        ADA_PLAN: '/ada_plan/',
        ADA_SUBMISSION: '/ada_submission/',
    },

    // Usuario maestro para desarrollo
    MASTER_USER: {
        email: 'vargues@gmail.com',
        password: '20230414',
        description: 'Usuario maestro para desarrollo y testing'
    },

    // Configuración de cookies para el dominio de pre-producción
    COOKIE_DOMAIN: '.pre-produccion.com',
    SECURE_COOKIES: false,

    // Modo debug activado para desarrollo
    DEBUG_MODE: true
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpointKey: keyof typeof CONFIG.ENDPOINTS, params?: Record<string, string | number>): string => {
    const endpoint = CONFIG.ENDPOINTS[endpointKey];
    // Agregar /api/ al principio para el backend de pre-producción
    let url = `${CONFIG.API_BASE_URL}/api${endpoint}`;

    // Reemplazar parámetros en la URL
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, String(value));
        });
    }

    return url;
};

// Función para obtener la URL base del backend
export const getBackendUrl = (): string => {
    console.log('🚀 Configuración local: SIEMPRE usando backend de pre-producción');
    console.log('🔗 URL:', CONFIG.API_BASE_URL);
    return CONFIG.API_BASE_URL;
};

// Función para mostrar información de la configuración
export const showConfigInfo = () => {
    console.group('🌍 Configuración de Desarrollo Local');
    console.log('Backend:', CONFIG.API_BASE_URL);
    console.log('Usuario maestro:', CONFIG.MASTER_USER.email);
    console.log('Dominio de cookies:', CONFIG.COOKIE_DOMAIN);
    console.log('Modo debug:', CONFIG.DEBUG_MODE);
    console.log('⚠️ Esta configuración SIEMPRE apunta al backend de pre-producción');
    console.groupEnd();
};

// Función para mostrar información del usuario maestro
export const showMasterUserInfo = () => {
    console.group('👑 Usuario Maestro para Desarrollo');
    console.log('Email:', CONFIG.MASTER_USER.email);
    console.log('Descripción:', CONFIG.MASTER_USER.description);
    console.log('🔗 Backend:', CONFIG.API_BASE_URL);
    console.log('⚠️ Este usuario es solo para desarrollo y testing');
    console.groupEnd();
};

export default CONFIG;
