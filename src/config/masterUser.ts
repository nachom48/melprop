// =====================================================
// MASTER USER CONFIGURATION FOR DEVELOPMENT
// =====================================================

// Usuario maestro para desarrollo - proporcionado por el backend
export const MASTER_USER_CONFIG = {
    email: 'vargues@gmail.com',
    password: '20230414',
    description: 'Usuario maestro para desarrollo y testing'
};

// Función para obtener las credenciales del usuario maestro
export const getMasterUserCredentials = () => {
    console.log('🔑 Usando usuario maestro para desarrollo:', MASTER_USER_CONFIG.email);
    return MASTER_USER_CONFIG;
};

// Función para verificar si estamos usando el usuario maestro
export const isUsingMasterUser = (email: string): boolean => {
    return email === MASTER_USER_CONFIG.email;
};

// Función para mostrar información del usuario maestro
export const showMasterUserInfo = () => {
    console.group('👑 Usuario Maestro de Desarrollo');
    console.log('Email:', MASTER_USER_CONFIG.email);
    console.log('Descripción:', MASTER_USER_CONFIG.description);
    console.log('⚠️ Este usuario es solo para desarrollo y testing');
    console.groupEnd();
};

// Exportar la configuración
export default MASTER_USER_CONFIG;
