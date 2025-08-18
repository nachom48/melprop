// =====================================================
// FAVORITES MODULE - SERVICE LAYER
// =====================================================

import { favoritesRepository } from './FavoritesRepository';
import {
    AddFavoriteDTO,
    RemoveFavoriteDTO,
    FavoritesResponseDTO,
    AddFavoriteResponseDTO,
    RemoveFavoriteResponseDTO,
    FavoritePropertyDTO
} from './Favorites.dto';

export class FavoritesService {

    // =====================================================
    // FAVORITES METHODS
    // =====================================================

    /**
     * Agregar propiedad a favoritos
     */
    async addFavorite(favoriteData: AddFavoriteDTO): Promise<AddFavoriteResponseDTO> {
        try {
            const response = await favoritesRepository.addFavorite(favoriteData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de favoritos - agregar: ${error.message}`);
        }
    }

    /**
     * Obtener lista de favoritos del usuario
     */
    async getFavorites(): Promise<FavoritesResponseDTO> {
        try {
            const response = await favoritesRepository.getFavorites();
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de favoritos - obtener: ${error.message}`);
        }
    }

    /**
     * Remover propiedad específica de favoritos
     */
    async removeFavorite(favoriteData: RemoveFavoriteDTO): Promise<RemoveFavoriteResponseDTO> {
        try {
            const response = await favoritesRepository.removeFavorite(favoriteData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de favoritos - remover: ${error.message}`);
        }
    }

    /**
     * Toggle favorito (agregar/remover) - usa el endpoint del backend
     */
    async toggleFavorite(propertyId: number): Promise<{ success: boolean; isFavorite: boolean; message: string }> {
        try {
            // Hacer la petición al backend directamente sin verificar estado previo
            const response = await favoritesRepository.toggleFavorite(propertyId);

            // El backend devuelve la lista actualizada de favoritos
            // Verificar si la propiedad está en la nueva lista
            const isNowFavorite = response.properties.some((prop: any) => prop.id === propertyId);

            return {
                success: true,
                isFavorite: isNowFavorite,
                message: response.message || 'Estado de favorito actualizado'
            };
        } catch (error: any) {
            throw new Error(`Error en el servicio de favoritos - toggle: ${error.message}`);
        }
    }

    /**
     * Remover todos los favoritos del usuario
     */
    async removeAllFavorites(): Promise<RemoveFavoriteResponseDTO> {
        try {
            const response = await favoritesRepository.removeAllFavorites();
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de favoritos - remover todos: ${error.message}`);
        }
    }

    /**
     * Verificar si una propiedad está en favoritos
     */
    async isFavorite(propertyId: number): Promise<boolean> {
        try {
            const isFav = await favoritesRepository.isFavorite(propertyId);
            return isFav;
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

    // =====================================================
    // UTILITY METHODS
    // =====================================================

    /**
     * Normalizar datos de propiedad favorita
     */
    normalizeFavoriteProperty(rawProperty: any): FavoritePropertyDTO {
        return {
            id: rawProperty.id || 0,
            title: rawProperty.name || rawProperty.title || '',
            address: rawProperty.address || '',
            price: rawProperty.price?.toString() || 'Consultar',
            type: rawProperty.type || '',
            bedrooms: rawProperty.rooms ? parseInt(rawProperty.rooms) : undefined,
            area: rawProperty.covered_m2 ? `${rawProperty.covered_m2}m²` : undefined,
            image: rawProperty.main_image || '',
            url: rawProperty.url || '',
            slug: rawProperty.slug || '',
            neighborhood: rawProperty.neighborhood || '',
            city: rawProperty.city || '',
            covered_m2: rawProperty.covered_m2 ? parseFloat(rawProperty.covered_m2) : undefined,
            rooms: rawProperty.rooms ? parseInt(rawProperty.rooms) : undefined,
            bathrooms: rawProperty.bathrooms ? parseInt(rawProperty.bathrooms) : undefined,
            parking_lots: rawProperty.parking_lots ? parseInt(rawProperty.parking_lots) : undefined,
            main_image: rawProperty.main_image || '',
            media: rawProperty.media || { images: [] }
        };
    }

    /**
     * Obtener estadísticas de favoritos
     */
    async getFavoritesStats(): Promise<{
        total: number;
        byType: Record<string, number>;
        byNeighborhood: Record<string, number>;
    }> {
        try {
            const favorites = await this.getFavorites();
            const stats = {
                total: favorites.properties.length,
                byType: {} as Record<string, number>,
                byNeighborhood: {} as Record<string, number>
            };

            favorites.properties.forEach((property: any) => {
                // Contar por tipo
                const type = property.type || 'Sin tipo';
                stats.byType[type] = (stats.byType[type] || 0) + 1;

                // Contar por barrio
                const neighborhood = property.neighborhood || 'Sin barrio';
                stats.byNeighborhood[neighborhood] = (stats.byNeighborhood[neighborhood] || 0) + 1;
            });

            return stats;
        } catch (error: any) {
            console.error('Error obteniendo estadísticas de favoritos:', error);
            return { total: 0, byType: {}, byNeighborhood: {} };
        }
    }

    /**
     * Obtener favoritos paginados
     */
    async getFavoritesPaginated(page: number = 1, limit: number = 10): Promise<{
        properties: FavoritePropertyDTO[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }> {
        try {
            const favorites = await this.getFavorites();
            const totalItems = favorites.properties.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedProperties = favorites.properties.slice(startIndex, endIndex);

            return {
                properties: paginatedProperties.map(prop => this.normalizeFavoriteProperty(prop)),
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        } catch (error: any) {
            throw new Error(`Error obteniendo favoritos paginados: ${error.message}`);
        }
    }

    /**
     * Filtrar favoritos por criterios
     */
    async filterFavorites(filters: {
        type?: string;
        neighborhood?: string;
        minPrice?: number;
        maxPrice?: number;
        minM2?: number;
        maxM2?: number;
    }): Promise<FavoritePropertyDTO[]> {
        try {
            const favorites = await this.getFavorites();
            let filteredProperties = favorites.properties;

            if (filters.type) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.type?.toLowerCase().includes(filters.type!.toLowerCase())
                );
            }

            if (filters.neighborhood) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.neighborhood?.toLowerCase().includes(filters.neighborhood!.toLowerCase())
                );
            }

            if (filters.minPrice) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.price && parseInt(prop.price) >= filters.minPrice!
                );
            }

            if (filters.maxPrice) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.price && parseInt(prop.price) <= filters.maxPrice!
                );
            }

            if (filters.minM2) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.covered_m2 && parseFloat(prop.covered_m2) >= filters.minM2!
                );
            }

            if (filters.maxM2) {
                filteredProperties = filteredProperties.filter((prop: any) =>
                    prop.covered_m2 && parseFloat(prop.covered_m2) <= filters.maxM2!
                );
            }

            return filteredProperties.map(prop => this.normalizeFavoriteProperty(prop));
        } catch (error: any) {
            throw new Error(`Error filtrando favoritos: ${error.message}`);
        }
    }
}

// Exportar instancia singleton
export const favoritesService = new FavoritesService();
