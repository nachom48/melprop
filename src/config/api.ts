// =====================================================
// API CONFIGURATION - Similar to melprop-front
// =====================================================

// Configuración de la API
export const API_CONFIG = {
    // URLs base para diferentes entornos
    STAGING: 'http://backend-dev-melpropiedades.pre-produccion.com',
    PRODUCTION: 'https://melpropiedades.com.ar',
    LOCAL: 'http://localhost:8000',

    // Endpoints de autenticación
    ENDPOINTS: {
        LOGIN: '/login/',
        LOGIN_GOOGLE: '/login/google/',
        LOGIN_FACEBOOK: '/login/facebook/',
        LOGOUT: '/logout/',
        SIGNUP: '/signup/',
        ME: '/me/',
        CHANGE_PASSWORD: '/change_password/',
        FORGOT_PASSWORD: '/forgot-password/',

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
    }
};

// Función para obtener la URL base según el entorno
export const getApiBaseUrl = (): string => {
    const hostname = window.location.hostname;

    // Para desarrollo local, SIEMPRE usar staging (backend de pre-producción)
    if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
        console.log('🚀 Desarrollo local detectado, SIEMPRE usando backend de pre-producción');
        return API_CONFIG.STAGING;
    } else if (hostname.includes('pre-produccion.com') || hostname.includes('dev')) {
        return API_CONFIG.STAGING;
    } else if (hostname.includes('melpropiedades.com.ar') || hostname.includes('vercel.app')) {
        return API_CONFIG.PRODUCTION;
    }

    // Por defecto, usar staging (pre-producción)
    return API_CONFIG.STAGING;
};

// Función para construir URLs completas
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
    const baseUrl = getApiBaseUrl();
    let url = `${baseUrl}${endpoint}`;

    // Reemplazar parámetros en la URL
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, String(value));
        });
    }

    return url;
};

// Función para obtener la URL de un endpoint específico
export const getApiUrl = (endpointKey: keyof typeof API_CONFIG.ENDPOINTS, params?: Record<string, string | number>): string => {
    const endpoint = API_CONFIG.ENDPOINTS[endpointKey];
    return buildApiUrl(endpoint, params);
};

// Exportar la configuración completa
export default API_CONFIG;
