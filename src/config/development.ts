// =====================================================
// DEVELOPMENT CONFIGURATION
// =====================================================

// Cambia esta variable para usar diferentes entornos durante desarrollo
export const DEVELOPMENT_MODE = 'staging'; // 'local' | 'staging' | 'production'

// Configuraciones para diferentes entornos
export const DEV_CONFIGS = {
    local: {
        API_URI: 'http://localhost:8000',
        name: 'Backend Local',
        description: 'Backend corriendo en tu máquina local (sin /api)'
    },
    staging: {
        API_URI: 'http://backend-dev-melpropiedades.pre-produccion.com',
        name: 'Pre-producción',
        description: 'Backend de desarrollo/pre-producción (sin /api)'
    },
    production: {
        API_URI: 'http://backend-dev-melpropiedades.pre-produccion.com/api',
        name: 'Producción',
        description: 'Backend de producción (sin /api)'
    }
};

// Función para obtener la configuración actual
export const getDevConfig = () => {
    const config = DEV_CONFIGS[DEVELOPMENT_MODE as keyof typeof DEV_CONFIGS];
    if (!config) {
        console.warn(`⚠️ Configuración '${DEVELOPMENT_MODE}' no encontrada, usando producción`);
        return DEV_CONFIGS.production;
    }

    console.log(`🚀 Usando backend: ${config.name} - ${config.description}`);
    console.log(`🔗 URL: ${config.API_URI}`);

    return config;
};

// Función para cambiar el modo de desarrollo
export const setDevelopmentMode = (mode: keyof typeof DEV_CONFIGS) => {
    console.log(`🔄 Cambiando modo de desarrollo a: ${mode}`);
    // En un entorno real, esto se guardaría en localStorage o en una variable de entorno
    // Por ahora, solo actualiza la consola
    console.log(`📝 Para cambiar permanentemente, edita 'DEVELOPMENT_MODE' en este archivo`);
};

// Función para mostrar información del entorno actual
export const showEnvironmentInfo = () => {
    const config = getDevConfig();
    console.group('🌍 Información del Entorno de Desarrollo');
    console.log(`Modo actual: ${DEVELOPMENT_MODE}`);
    console.log(`Backend: ${config.name}`);
    console.log(`URL: ${config.API_URI}`);
    console.log(`Descripción: ${config.description}`);
    console.groupEnd();

    return config;
};
