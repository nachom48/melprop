import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserLogged, getFavorites, getSavedSearches } from '../services/auth';

interface User {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    mobile?: string;
    birthDate?: string;
    acceptPromotional?: boolean;
}

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    favorites: any[];
    savedSearches: any[];
    login: (userData: User) => void;
    logout: () => void;
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
    loadFavorites: () => void;
    loadSavedSearches: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [savedSearches, setSavedSearches] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsLoggedIn(true);

                    // Cargar favoritos y búsquedas guardadas
                    await loadFavorites();
                    await loadSavedSearches();
                } else {
                    // Verificar si el usuario está logueado en el servidor
                    const response = await checkUserLogged();
                    if (response.user) {
                        setUser(response.user);
                        setIsLoggedIn(true);
                        localStorage.setItem('user', JSON.stringify(response.user));

                        // Cargar favoritos y búsquedas guardadas
                        await loadFavorites();
                        await loadSavedSearches();
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                localStorage.removeItem('user');
            }
        };

        loadUserData();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/perfil');
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setFavorites([]);
        setSavedSearches([]);
        localStorage.removeItem('user');
        navigate('/');
    };

    const loadFavorites = async () => {
        try {
            const response = await getFavorites();
            if (response.properties) {
                setFavorites(response.properties);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const loadSavedSearches = async () => {
        try {
            const response = await getSavedSearches();
            if (response.searchs) {
                setSavedSearches(response.searchs);
            }
        } catch (error) {
            console.error('Error loading saved searches:', error);
        }
    };

    const addToFavorites = async (id: number) => {
        try {
            const response = await getFavorites();
            if (response.properties) {
                setFavorites(response.properties);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async (id: number) => {
        try {
            const response = await getFavorites();
            if (response.properties) {
                setFavorites(response.properties);
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const value: UserContextType = {
        user,
        isLoggedIn,
        favorites,
        savedSearches,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        loadFavorites,
        loadSavedSearches,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}; 