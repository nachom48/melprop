// =====================================================
// PROPERTIES MODULE - REPOSITORY LAYER
// =====================================================

import { apiClient } from '../../config/axios.config';
import {
    PropertySearchParamsDTO,
    PropertyFilterDTO,
    PropertyDTO,
    DevelopmentDTO,
    PropertiesResponseDTO,
    PropertyDetailResponseDTO
} from './interfaces';

export namespace PropertiesRepository {

    // =====================================================
    // PROPERTIES METHODS
    // =====================================================

    /**
     * Obtener lista de propiedades con filtros
     */
    export async function getProperties(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await apiClient.get('/properties/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades');
        }
    }

    /**
     * Obtener propiedad específica por slug
     */
    export async function getProperty(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await apiClient.get(`/properties/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedad');
        }
    }

    /**
     * Obtener propiedades destacadas para home
     */
    export async function getFeaturedProperties(limit: number = 6): Promise<PropertiesResponseDTO> {
        try {
            const params: PropertySearchParamsDTO = {
                home: true,
                limit
            };
            const response = await apiClient.get('/properties/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades destacadas');
        }
    }

    /**
     * Obtener propiedades por tipo
     */
    export async function getPropertiesByType(type: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                properties: [type]
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por tipo');
        }
    }

    /**
     * Obtener propiedades por operación
     */
    export async function getPropertiesByOperation(operation: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                operation: [operation]
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por operación');
        }
    }

    /**
     * Obtener propiedades por barrio
     */
    export async function getPropertiesByNeighborhood(neighborhood: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                locations: [neighborhood]
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por barrio');
        }
    }

    /**
     * Obtener propiedades por rango de precio
     */
    export async function getPropertiesByPriceRange(minPrice: number, maxPrice: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                min_price: minPrice,
                max_price: maxPrice
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por rango de precio');
        }
    }

    /**
     * Obtener propiedades por cantidad de habitaciones
     */
    export async function getPropertiesByRooms(rooms: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                rooms: [rooms.toString()]
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por habitaciones');
        }
    }

    /**
     * Obtener propiedades por metros cuadrados
     */
    export async function getPropertiesByM2(m2: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                m2
            };
            const response = await apiClient.get('/properties/', { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por metros cuadrados');
        }
    }

    /**
     * Buscar propiedades por texto
     */
    export async function searchProperties(searchTerm: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            // Implementar búsqueda por texto si el backend lo soporta
            // Por ahora, usamos los filtros existentes
            const response = await apiClient.get('/properties/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error buscando propiedades');
        }
    }

    /**
     * Obtener propiedades relacionadas
     */
    export async function getRelatedProperties(propertyId: number, limit: number = 4): Promise<PropertyDTO[]> {
        try {
            // Implementar lógica para obtener propiedades relacionadas
            // Por ahora, retornamos propiedades del mismo tipo
            const response = await apiClient.get('/properties/', {
                params: { limit, exclude: propertyId }
            });
            return response.data.properties || [];
        } catch (error: any) {
            console.error('Error obteniendo propiedades relacionadas:', error);
            return [];
        }
    }

    // =====================================================
    // DEVELOPMENTS METHODS
    // =====================================================

    /**
     * Obtener lista de desarrollos
     */
    export async function getDevelopments(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await apiClient.get('/developments/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo desarrollos');
        }
    }

    /**
     * Obtener desarrollo específico por slug
     */
    export async function getDevelopment(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await apiClient.get(`/developments/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo desarrollo');
        }
    }

    /**
     * Obtener banners de desarrollo
     */
    export async function getDevelopmentBanners(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await apiClient.get('/banners_development/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo banners de desarrollo');
        }
    }

    /**
     * Obtener barrios de desarrollo
     */
    export async function getDevelopmentNeighborhoods(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await apiClient.get('/developments/neighborhoods/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo barrios de desarrollo');
        }
    }

    /**
     * Obtener etapas de desarrollo
     */
    export async function getDevelopmentStages(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await apiClient.get('/developments/stages/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo etapas de desarrollo');
        }
    }

    // =====================================================
    // UTILITY METHODS
    // =====================================================

    /**
     * Obtener propiedades con paginación
     */
    export async function getPropertiesPaginated(page: number = 1, limit: number = 12, filters: PropertyFilterDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const params: PropertySearchParamsDTO = {
                page,
                limit,
                // Convertir tipos para que coincidan con PropertySearchParamsDTO
                ...(filters.type && { properties: filters.type }),
                ...(filters.operation && { operation: filters.operation }),
                ...(filters.location && { locations: filters.location }),
                ...(filters.priceFrom && { min_price: filters.priceFrom }),
                ...(filters.priceTo && { max_price: filters.priceTo }),
                ...(filters.rooms && { rooms: filters.rooms.map(r => r.toString()) }),
                ...(filters.m2 && { m2: filters.m2 }),
                ...(filters.characteristics && { characteristics: filters.characteristics }),
                ...(filters.status && { status: filters.status })
            };
            const response = await apiClient.get('/properties/', { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades paginadas');
        }
    }

    /**
     * Obtener estadísticas de propiedades
     */
    export async function getPropertiesStats(): Promise<{
        total: number;
        byType: Record<string, number>;
        byOperation: Record<string, number>;
        byNeighborhood: Record<string, number>;
        byPriceRange: Record<string, number>;
    }> {
        try {
            const allProperties = await getProperties({ limit: 1000 });
            const properties = allProperties.properties;

            const byType: Record<string, number> = {};
            const byOperation: Record<string, number> = {};
            const byNeighborhood: Record<string, number> = {};
            const byPriceRange: Record<string, number> = {};

            properties.forEach(property => {
                // Contar por tipo
                const type = property.type || 'sin-tipo';
                byType[type] = (byType[type] || 0) + 1;

                // Contar por operación
                const operation = property.operation_type || 'sin-operacion';
                byOperation[operation] = (byOperation[operation] || 0) + 1;

                // Contar por barrio
                const neighborhood = property.neighborhood || 'sin-barrio';
                byNeighborhood[neighborhood] = (byNeighborhood[neighborhood] || 0) + 1;

                // Contar por rango de precio
                if (property.price) {
                    let range = 'sin-precio';
                    if (property.price < 50000) range = '0-50k';
                    else if (property.price < 100000) range = '50k-100k';
                    else if (property.price < 200000) range = '100k-200k';
                    else range = '200k+';

                    byPriceRange[range] = (byPriceRange[range] || 0) + 1;
                }
            });

            return {
                total: properties.length,
                byType,
                byOperation,
                byNeighborhood,
                byPriceRange
            };
        } catch (error: any) {
            throw new Error(`Error obteniendo estadísticas de propiedades: ${error.message}`);
        }
    }
}
