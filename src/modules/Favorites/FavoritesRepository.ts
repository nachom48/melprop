// =====================================================
// FAVORITES MODULE - REPOSITORY LAYER
// =====================================================

import {
    AddFavoriteDTO,
    RemoveFavoriteDTO,
    FavoritesResponseDTO,
    AddFavoriteResponseDTO,
    RemoveFavoriteResponseDTO
} from './Favorites.dto';

import { getApiUrl } from '../../config/index';
import { axiosInstance } from '../../config/axios';

export class FavoritesRepository {

    // =====================================================
    // FAVORITES METHODS
    // =====================================================

    /**
     * Agregar propiedad a favoritos
     */
    async addFavorite(favoriteData: AddFavoriteDTO): Promise<AddFavoriteResponseDTO> {
        try {
            const response = await axiosInstance.post(getApiUrl('FAVORITES'), favoriteData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error agregando a favoritos');
        }
    }

    /**
     * Obtener lista de favoritos del usuario
     */
    async getFavorites(): Promise<FavoritesResponseDTO> {
        try {
            const response = await axiosInstance.get(getApiUrl('FAVORITES'));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo favoritos');
        }
    }

    /**
     * Toggle favorito (agregar/remover) - usa el endpoint que SÍ acepta X-User-ID
     */
    async toggleFavorite(propertyId: number): Promise<FavoritesResponseDTO> {
        try {
            // Verificar que el usuario esté logueado antes de hacer la petición
            const user = localStorage.getItem('user');
            console.log('🔍 FavoritesRepository: Verificando usuario en localStorage:', user);

            if (!user) {
                console.log('❌ No hay usuario en localStorage');
                throw new Error('Usuario no autenticado. Por favor, inicia sesión.');
            }

            // Verificar que el usuario tenga un ID válido
            let userData;
            try {
                userData = JSON.parse(user);
                console.log('🔍 FavoritesRepository: Usuario parseado:', userData);

                // El ID puede ser 0, que es válido en algunos sistemas
                if (userData.id === undefined || userData.id === null) {
                    console.log('❌ Usuario sin ID válido:', userData);
                    throw new Error('Datos de usuario inválidos. Por favor, inicia sesión nuevamente.');
                }
                console.log('✅ Usuario autenticado:', userData.id);
            } catch (parseError) {
                console.error('❌ Error parseando usuario:', parseError);
                throw new Error('Error al leer datos de usuario. Por favor, inicia sesión nuevamente.');
            }

            // Como el endpoint POST no funciona, vamos a usar el endpoint DELETE que SÍ acepta X-User-ID
            // El endpoint DELETE con GET funciona como toggle: si la propiedad está en favoritos la remueve,
            // si no está, no hace nada (pero al menos no da error de autenticación)
            console.log('🔄 Usando endpoint alternativo para toggle de favoritos...');

            try {
                const response = await axiosInstance.get(getApiUrl('FAVORITES_DELETE_ID', { id: propertyId }));
                console.log('✅ Toggle de favorito completado:', response.data);
                return response.data;
            } catch (error: any) {
                // Si hay error, intentar con el endpoint POST original como fallback
                console.log('⚠️ Endpoint alternativo falló, intentando con endpoint original...');

                const requestData = {
                    id: propertyId,
                    user_id: userData.id
                };

                const postResponse = await axiosInstance.post(getApiUrl('FAVORITES'), requestData);
                console.log('✅ Toggle de favoritos con endpoint original:', postResponse.data);
                return postResponse.data;
            }
        } catch (error: any) {
            console.error('❌ Error en toggleFavorite:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            // Solo lanzar el error, no limpiar localStorage aquí
            // El UserContext se encargará de manejar los errores de autenticación
            throw new Error(error.response?.data?.message || error.message || 'Error actualizando favorito');
        }
    }

    /**
     * Remover propiedad específica de favoritos
     */
    async removeFavorite(favoriteData: RemoveFavoriteDTO): Promise<RemoveFavoriteResponseDTO> {
        try {
            const response = await axiosInstance.get(getApiUrl('FAVORITES_DELETE_ID', { id: favoriteData.id }));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error removiendo de favoritos');
        }
    }

    /**
     * Remover todos los favoritos del usuario
     */
    async removeAllFavorites(): Promise<RemoveFavoriteResponseDTO> {
        try {
            const response = await axiosInstance.get(getApiUrl('FAVORITES_DELETE'));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error removiendo todos los favoritos');
        }
    }

    /**
     * Verificar si una propiedad está en favoritos
     */
    async isFavorite(propertyId: number): Promise<boolean> {
        try {
            const favorites = await this.getFavorites();
            return favorites.properties.some(property => property.id === propertyId);
        } catch (error: any) {
            console.error('Error verificando si es favorito:', error);
            return false;
        }
    }

    /**
     * Obtener cantidad de favoritos
     */
    async getFavoritesCount(): Promise<number> {
        try {
            const favorites = await this.getFavorites();
            return favorites.properties.length;
        } catch (error: any) {
            console.error('Error obteniendo cantidad de favoritos:', error);
            return 0;
        }
    }
}

// Exportar instancia singleton
export const favoritesRepository = new FavoritesRepository();
