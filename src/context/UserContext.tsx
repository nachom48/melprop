import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    CreateUserDTO,
    UpdateUserDTO,
} from '../modules';
import { UserService } from '../modules/User/UserService';
import { CreateSavedSearchDTO } from '../modules/SavedSearches/SavedSearches.dto';
import { SavedSearchesService } from '../modules/SavedSearches/SavedSearchesService';
import { FavoritesService } from '../modules/Favorites/FavoritesService';

interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    birth_date: string;
    email_subscription: boolean; // Backend field name
    username: string;
    first_name: string;
    last_name: string;
    type_id: string;
    gender: string;
    location: string;
    dni: string;
    subscription: boolean; // Alias for email_subscription
}

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    favorites: any[];
    savedSearches: any[];
    login: (email: string, password: string) => Promise<void>;
    register: (userData: CreateUserDTO) => Promise<void>;
    googleLogin: (googleUser: any) => Promise<void>;
    logout: () => void;
    updateUser: (userData: UpdateUserDTO) => Promise<void>;
    addToFavorites: (propertyId: number) => Promise<void>;
    removeFromFavorites: (propertyId: number) => Promise<void>;
    saveSearch: (searchData: CreateSavedSearchDTO) => Promise<void>;
    removeSavedSearch: (searchId: number) => Promise<void>;
    loadFavorites: () => Promise<void>;
    loadSavedSearches: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [savedSearches, setSavedSearches] = useState<any[]>([]);

    // Normalizar usuario del backend al formato esperado por UserContext
    const normalizeUser = (rawUser: any): User => {
        console.log('🔍 Contexto: Usuario raw del backend:', JSON.stringify(rawUser, null, 2));

        // Como el backend no devuelve ID, usamos el email como identificador único
        // El email es único para cada usuario
        const userEmail = rawUser.email || rawUser.username;

        if (!userEmail) {
            console.error('❌ Contexto: NO se encontró email de usuario válido en:', rawUser);
            throw new Error('El backend no devolvió un email de usuario válido');
        }

        // Generar un ID único basado en el email (hash simple)
        const userId = userEmail.split('').reduce((acc: number, char: string) => {
            return acc + char.charCodeAt(0);
        }, 0);

        console.log('🔍 Contexto: Generando ID único basado en email:', userEmail, '→ ID:', userId);

        const normalizedUser = {
            id: userId,
            full_name: rawUser.full_name || '',
            email: userEmail,
            phone: rawUser.phone || '',
            birth_date: rawUser.birth_date || '',
            email_subscription: rawUser.email_subscription || false,
            username: rawUser.username || '',
            first_name: rawUser.first_name || '',
            last_name: rawUser.last_name || '',
            type_id: rawUser.type_id || '',
            gender: rawUser.gender || '',
            location: rawUser.location || '',
            dni: rawUser.dni || '',
            subscription: rawUser.email_subscription || false, // Mapear desde email_subscription
        };

        console.log('🔍 Contexto: Usuario normalizado final:', JSON.stringify(normalizedUser, null, 2));
        return normalizedUser;
    };

    // Verificar si el usuario está logueado
    const isLogged = async (): Promise<boolean> => {
        try {
            const response = await UserService.checkUserLogged();
            if (response.isLogged) {
                const normalizedUser = normalizeUser(response.user);
                setUser(normalizedUser);
                setIsLoggedIn(true);
                return true;
            } else {
                setUser(null);
                setIsLoggedIn(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking user session:', error);
            setUser(null);
            setIsLoggedIn(false);
            return false;
        }
    };

    // Cargar favoritos
    const loadFavorites = async () => {
        try {
            const response = await FavoritesService.getFavorites();
            // El backend devuelve { properties: [...] }
            setFavorites(response.properties || []);
        } catch (error) {
            console.error('Error loading favorites:', error);
            setFavorites([]);
        }
    };

    // Cargar búsquedas guardadas
    const loadSavedSearches = async () => {
        try {
            const response = await SavedSearchesService.getSavedSearches();
            // El backend devuelve { searchs: [...] }
            setSavedSearches(response.searchs || []);
        } catch (error) {
            console.error('Error loading saved searches:', error);
            setSavedSearches([]);
        }
    };

    // Login
    const login = async (email: string, password: string) => {
        try {
            console.log('🔐 Contexto: Iniciando login para:', email);

            const response = await UserService.login({ username: email, password }); // Backend espera 'username'
            console.log('🔐 Contexto: Respuesta completa del backend:', JSON.stringify(response, null, 2));

            const normalizedUser = normalizeUser(response.user);
            console.log('🔐 Contexto: Usuario normalizado:', JSON.stringify(normalizedUser, null, 2));

            setUser(normalizedUser);
            setIsLoggedIn(true);

            // Guardar en localStorage inmediatamente
            localStorage.setItem('user', JSON.stringify(normalizedUser));
            console.log('🔐 Contexto: Usuario guardado en localStorage');

            console.log('🔐 Contexto: Login completado exitosamente');
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    // Registro
    const register = async (userData: CreateUserDTO) => {
        try {
            const response = await UserService.signup(userData);
            const normalizedUser = normalizeUser(response.user);
            setUser(normalizedUser);
            setIsLoggedIn(true);

            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(normalizedUser));
            console.log('🔐 Contexto: Registro completado exitosamente');
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    // Login con Google
    const googleLogin = async (googleUser: any) => {
        try {
            const response = await UserService.googleLogin(googleUser);
            const normalizedUser = normalizeUser(response.user);
            setUser(normalizedUser);
            setIsLoggedIn(true);

            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(normalizedUser));
            console.log('🔐 Contexto: Login con Google completado exitosamente');
        } catch (error) {
            console.error('Error during Google login:', error);
            throw error;
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setFavorites([]);
        setSavedSearches([]);
        localStorage.removeItem('user');
    };

    // Actualizar usuario
    const updateUser = async (userData: UpdateUserDTO) => {
        try {
            const response = await UserService.updateProfile(userData);
            // El backend devuelve { user: {...} }
            if (response.user) {
                const normalizedUser = normalizeUser(response.user);
                setUser(normalizedUser);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    // Agregar a favoritos
    const addToFavorites = async (propertyId: number) => {
        try {
            const result = await FavoritesService.toggleFavorite(propertyId);
            if (result.success) {
                // Solo recargar si realmente cambió el estado
                if (result.isFavorite) {
                    await loadFavorites();
                }
            }
        } catch (error: any) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    };

    // Remover de favoritos
    const removeFromFavorites = async (propertyId: number) => {
        try {
            const result = await FavoritesService.toggleFavorite(propertyId);
            if (result.success) {
                // Solo recargar si realmente cambió el estado
                if (!result.isFavorite) {
                    await loadFavorites();
                }
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
            throw error;
        }
    };

    // Guardar búsqueda
    const saveSearch = async (searchData: CreateSavedSearchDTO) => {
        try {
            await SavedSearchesService.createSavedSearch(searchData);
            // Recargar la lista de búsquedas guardadas
            await loadSavedSearches();
        } catch (error) {
            console.error('Error saving search:', error);
            throw error;
        }
    };

    // Remover búsqueda guardada
    const removeSavedSearch = async (searchId: number) => {
        try {
            await SavedSearchesService.removeSavedSearch({ id: searchId }); // Pasar objeto con id
            // Recargar la lista de búsquedas guardadas
            await loadSavedSearches();
        } catch (error) {
            console.error('Error removing saved search:', error);
            throw error;
        }
    };

    // Cargar datos iniciales al montar el componente
    useEffect(() => {
        console.log('🔄 Contexto: Montando componente, cargando datos iniciales...');

        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                console.log('🔄 Contexto: Usuario encontrado en localStorage:', userData);
                const parsedUser = JSON.parse(userData);
                const normalizedUser = normalizeUser(parsedUser);
                console.log('🔄 Contexto: Usuario normalizado de localStorage:', normalizedUser);
                setUser(normalizedUser);
                setIsLoggedIn(true);
                console.log('🔄 Contexto: Estado restaurado del localStorage');
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
            }
        } else {
            console.log('🔄 Contexto: No hay usuario en localStorage');
        }
    }, []); // Solo al montar, sin dependencias

    const value: UserContextType = {
        user,
        isLoggedIn,
        favorites,
        savedSearches,
        login,
        register,
        googleLogin,
        logout,
        updateUser,
        addToFavorites,
        removeFromFavorites,
        saveSearch,
        removeSavedSearch,
        loadFavorites,
        loadSavedSearches,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}; 