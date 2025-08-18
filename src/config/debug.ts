// =====================================================
// DEBUG CONFIGURATION - Para verificar configuración
// =====================================================

import { CONFIG, getApiUrl } from './index';

// Función para debuggear la configuración completa
export const debugConfig = () => {
    console.group('🔍 DEBUG: Configuración Completa');

    // Mostrar configuración base
    console.log('📍 Backend base:', CONFIG.API_BASE_URL);
    console.log('🍪 Dominio cookies:', CONFIG.COOKIE_DOMAIN);
    console.log('👤 Usuario maestro:', CONFIG.MASTER_USER.email);
    console.log('🔧 Modo debug:', CONFIG.DEBUG_MODE);

    // Probar construcción de URLs
    console.log('\n🌐 URLs de prueba:');
    const testEndpoints = ['LOGIN', 'FAVORITES', 'SIGNUP'] as const;

    testEndpoints.forEach(endpoint => {
        const url = getApiUrl(endpoint);
        console.log(`${endpoint}: ${url}`);

        // Verificar que la URL sea correcta
        if (url.includes('/api/')) {
            console.log(`  ✅ OK: Contiene /api/`);
        } else {
            console.error(`  ❌ ERROR: NO contiene /api/`);
        }

        if (url.includes('pre-produccion.com')) {
            console.log(`  ✅ OK: Apunta a pre-producción`);
        } else {
            console.error(`  ❌ ERROR: NO apunta a pre-producción`);
        }
    });

    console.groupEnd();

    return {
        baseUrl: CONFIG.API_BASE_URL,
        cookieDomain: CONFIG.COOKIE_DOMAIN,
        masterUser: CONFIG.MASTER_USER,
        testUrls: testEndpoints.map(endpoint => ({
            endpoint,
            url: getApiUrl(endpoint)
        }))
    };
};

// Función para probar una URL específica
export const testUrl = (endpoint: keyof typeof CONFIG.ENDPOINTS) => {
    const url = getApiUrl(endpoint);
    console.log(`🧪 Probando ${endpoint}: ${url}`);

    // Verificar estructura de la URL
    const urlParts = url.split('/');
    console.log('  📍 Partes de la URL:', urlParts);

    // Verificar que tenga la estructura correcta
    const expectedStructure = [
        'http:',
        '',
        'backend-dev-melpropiedades.pre-produccion.com',
        'api',
        endpoint.toLowerCase().replace('_', '-')
    ];

    console.log('  🎯 Estructura esperada:', expectedStructure);

    return {
        url,
        parts: urlParts,
        isValid: url.includes('/api/') && url.includes('pre-produccion.com')
    };
};

// Función para mostrar información del usuario maestro
export const showMasterUserCredentials = () => {
    console.group('👑 Credenciales del Usuario Maestro');
    console.log('📧 Email:', CONFIG.MASTER_USER.email);
    console.log('🔑 Password:', CONFIG.MASTER_USER.password);
    console.log('📝 Descripción:', CONFIG.MASTER_USER.description);
    console.log('🔗 Backend:', CONFIG.API_BASE_URL);
    console.log('⚠️ Solo para desarrollo y testing');
    console.groupEnd();

    return CONFIG.MASTER_USER;
};

export default {
    debugConfig,
    testUrl,
    showMasterUserCredentials
};
