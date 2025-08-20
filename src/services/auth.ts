import axios from 'axios';

const API_URI = process.env.REACT_APP_API_URI || 'http://backend-dev-melpropiedades.pre-produccion.com/api';

axios.defaults.withCredentials = true;

// Configurar interceptor para incluir cookies en todas las requests
axios.interceptors.request.use(
    (config) => {
        // Asegurar que withCredentials esté habilitado para todas las requests
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Funciones de autenticación existentes
export const loginWithCredentials = async (username: string, password: string) => {
    const response = await axios.post(`${API_URI}/login/`, { username, password });
    return response.data;
};

export const registerUser = async (fullName: string, username: string, password: string, passwordB: string) => {
    const response = await axios.post(`${API_URI}/signup/`, { fullName, username, password, passwordB });
    return response.data;
};

export const checkUserLogged = async () => {
    const response = await axios.post(`${API_URI}/me/`, {});
    return response.data;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_URI}/logout/`, {});
    return response.data;
};

export const editProfileData = async (data: any) => {
    console.log('Llamando a endpoint:', `${API_URI}/me/`); // Debug log
    console.log('Método HTTP: PATCH'); // Debug log
    const response = await axios.patch(`${API_URI}/me/`, data);
    return response.data;
};

export const changePassword = async (data: any) => {
    const response = await axios.post(`${API_URI}/change_password/`, data);
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await axios.post(`${API_URI}/forgot_password/`, { email });
    return response.data;
};

export const resetPassword = async (data: any) => {
    const response = await axios.post(`${API_URI}/reset_password/`, data);
    return response.data;
};

// Funciones de OAuth
export const googleSignIn = async ({ token }: { token: string }) => {
    const response = await axios.post(`${API_URI}/login/google/`, { token });
    return response.data;
};

export const facebookSignIn = async (data: { email: string; name: string; id: string }) => {
    const response = await axios.post(`${API_URI}/login/facebook/`, data);
    return response.data;
};

// Funciones de favoritos (implementadas como en el repositorio original)
export const setFavorite = async (id: number | string) => {
    try {
        const response = await axios.post(`${API_URI}/favorites/`, { id });
        return response.data;
    } catch (error: any) {
        console.error('Error al agregar favorito:', error);
        // Si hay error de autenticación, intentar recargar el usuario
        if (error.response?.status === 400 && error.response?.data?.message === 'No hay usuario logueado') {
            throw new Error('Sesión expirada. Por favor, vuelve a iniciar sesión.');
        }
        throw error;
    }
};

export const getFavorites = async () => {
    try {
        const response = await axios.get(`${API_URI}/favorites/`);
        return response.data;
    } catch (error: any) {
        console.error('Error al obtener favoritos:', error);
        // Si hay error de autenticación, retornar array vacío
        if (error.response?.status === 400 && error.response?.data?.message === 'No hay usuario logueado') {
            return { properties: [] };
        }
        throw error;
    }
};

export const removeFavorite = async (id: number | string) => {
    try {
        const response = await axios.get(`${API_URI}/favorites/delete/${id}/`);
        return response.data;
    } catch (error: any) {
        console.error('Error al remover favorito:', error);
        // Si hay error de autenticación, intentar recargar el usuario
        if (error.response?.status === 400 && error.response?.data?.message === 'No hay usuario logueado') {
            throw new Error('Sesión expirada. Por favor, vuelve a iniciar sesión.');
        }
        throw error;
    }
};

export const removeAllFavorites = async () => {
    const response = await axios.get(`${API_URI}/favorites/delete/`);
    return response.data;
};

// Funciones de búsquedas guardadas
export const getSavedSearches = async () => {
    const response = await axios.get(`${API_URI}/searchs/`);
    return response.data;
};

export const saveSearch = async (data: { name: string, alert_type: string, url: string }) => {
    const response = await axios.post(`${API_URI}/searchs/`, data);
    return response.data;
};

export const removeSavedSearch = async (id: number | string) => {
    const response = await axios.get(`${API_URI}/searchs/delete/${id}/`);
    return response.data;
};

// Funciones de propiedades y emprendimientos
export const getProperties = async (params: any = {}) => {
    const response = await axios.get(`${API_URI}/properties/`, { params });
    return response.data;
};

export const getDevelopments = async (params: any = {}) => {
    const response = await axios.get(`${API_URI}/developments/`, { params });
    return response.data;
};

export const getDevelopmentBanners = async (params: any = {}) => {
    const response = await axios.get(`${API_URI}/banners_development/`, { params });
    return response.data;
}; 