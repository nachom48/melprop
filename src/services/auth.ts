import axios from 'axios';

const API_URI = process.env.REACT_APP_API_URI || 'http://backend-dev-melpropiedades.pre-produccion.com/api';

axios.defaults.withCredentials = true;

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

// Funciones de favoritos
export const setFavorite = async (id: number | string) => {
    const response = await axios.post(`${API_URI}/favorites/`, { id });
    return response.data;
};

export const getFavorites = async () => {
    const response = await axios.get(`${API_URI}/favorites/`);
    return response.data;
};

export const removeFavorite = async (id: number | string) => {
    const response = await axios.get(`${API_URI}/favorites/delete/${id}/`);
    return response.data;
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