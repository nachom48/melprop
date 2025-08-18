// =====================================================
// PROPERTIES MODULE - REPOSITORY LAYER
// =====================================================

import axios from 'axios';
import {
    PropertySearchParamsDTO,
    PropertyFilterDTO,
    PropertyDTO,
    DevelopmentDTO,
    PropertiesResponseDTO,
    PropertyDetailResponseDTO
} from './Properties.dto';

const API_URI = process.env.REACT_APP_API_URI || 'http://backend-dev-melpropiedades.pre-produccion.com/api';

// Configurar Axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

export class PropertiesRepository {

    // =====================================================
    // PROPERTIES METHODS
    // =====================================================

    /**
     * Obtener lista de propiedades con filtros
     */
    async getProperties(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await axios.get(`${API_URI}/properties/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades');
        }
    }

    /**
     * Obtener propiedad específica por slug
     */
    async getProperty(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await axios.get(`${API_URI}/properties/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedad');
        }
    }

    /**
     * Obtener propiedades destacadas para home
     */
    async getFeaturedProperties(limit: number = 6): Promise<PropertiesResponseDTO> {
        try {
            const params: PropertySearchParamsDTO = {
                home: true,
                limit
            };
            const response = await axios.get(`${API_URI}/properties/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades destacadas');
        }
    }

    /**
     * Obtener propiedades por tipo
     */
    async getPropertiesByType(type: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                properties: [type]
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por tipo');
        }
    }

    /**
     * Obtener propiedades por operación
     */
    async getPropertiesByOperation(operation: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                operation: [operation]
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por operación');
        }
    }

    /**
     * Obtener propiedades por barrio
     */
    async getPropertiesByNeighborhood(neighborhood: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                locations: [neighborhood]
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por barrio');
        }
    }

    /**
     * Obtener propiedades por rango de precio
     */
    async getPropertiesByPriceRange(minPrice: number, maxPrice: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                min_price: minPrice,
                max_price: maxPrice
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por rango de precio');
        }
    }

    /**
     * Obtener propiedades por cantidad de habitaciones
     */
    async getPropertiesByRooms(rooms: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                rooms: [rooms.toString()]
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por habitaciones');
        }
    }

    /**
     * Obtener propiedades por metros cuadrados
     */
    async getPropertiesByM2(m2: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = {
                ...params,
                m2
            };
            const response = await axios.get(`${API_URI}/properties/`, { params: searchParams });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades por metros cuadrados');
        }
    }

    /**
     * Buscar propiedades por texto
     */
    async searchProperties(searchTerm: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            // Implementar búsqueda por texto si el backend lo soporta
            // Por ahora, usamos los filtros existentes
            const response = await axios.get(`${API_URI}/properties/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error buscando propiedades');
        }
    }

    /**
     * Obtener propiedades relacionadas
     */
    async getRelatedProperties(propertyId: number, limit: number = 4): Promise<PropertyDTO[]> {
        try {
            // Implementar lógica para obtener propiedades relacionadas
            // Por ahora, retornamos propiedades del mismo tipo
            const response = await axios.get(`${API_URI}/properties/`, {
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
    async getDevelopments(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await axios.get(`${API_URI}/developments/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo desarrollos');
        }
    }

    /**
     * Obtener desarrollo específico por slug
     */
    async getDevelopment(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await axios.get(`${API_URI}/developments/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo desarrollo');
        }
    }

    /**
     * Obtener banners de desarrollo
     */
    async getDevelopmentBanners(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await axios.get(`${API_URI}/banners_development/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo banners de desarrollo');
        }
    }

    /**
     * Obtener barrios de desarrollo
     */
    async getDevelopmentNeighborhoods(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await axios.get(`${API_URI}/developments/neighborhoods/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo barrios de desarrollo');
        }
    }

    /**
     * Obtener etapas de desarrollo
     */
    async getDevelopmentStages(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await axios.get(`${API_URI}/developments/stages/`, { params });
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
    async getPropertiesPaginated(page: number = 1, limit: number = 12, filters: PropertyFilterDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const params: PropertySearchParamsDTO = {
                ...filters,
                page,
                limit
            };
            const response = await axios.get(`${API_URI}/properties/`, { params });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades paginadas');
        }
    }

    /**
     * Obtener estadísticas de propiedades
     */
    async getPropertiesStats(): Promise<{
        total: number;
        byType: Record<string, number>;
        byOperation: Record<string, number>;
        byNeighborhood: Record<string, number>;
        byPriceRange: Record<string, number>;
    }> {
        try {
            const allProperties = await this.getProperties({ limit: 1000 });
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

// Exportar instancia singleton
export const propertiesRepository = new PropertiesRepository();
