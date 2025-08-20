// =====================================================
// API CONFIGURATION - Siempre la misma API del backend
// =====================================================

// Configuración de la API
export const API_CONFIG = {
    // URL base de la API - SIEMPRE la misma
    BASE_URL: 'http://backend-dev-melpropiedades.pre-produccion.com/api',

    // Endpoints
    ENDPOINTS: {
        PROPERTIES: '/properties/',
        PROPERTY_BY_ID: (id: number) => `/properties/${id}/`,
        DEVELOPMENTS: '/developments/',
        DEVELOPMENT_BY_ID: (id: number) => `/developments/${id}/`,
        DEVELOPMENT_BY_SLUG: (slug: string) => `/developments/by-slug/${slug}/`,
    }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Exportar la configuración completa
export default API_CONFIG;
