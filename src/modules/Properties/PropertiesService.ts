// =====================================================
// PROPERTIES MODULE - SERVICE LAYER
// =====================================================

import { propertiesRepository } from './PropertiesRepository';
import {
    PropertyDTO,
    PropertiesResponseDTO,
    PropertySearchParamsDTO,
    PropertyFilterDTO,
    DevelopmentDTO,
    PropertyDetailResponseDTO
} from './Properties.dto';

export class PropertiesService {

    // =====================================================
    // PROPERTIES METHODS
    // =====================================================

    /**
     * Obtener lista de propiedades con filtros
     */
    async getProperties(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getProperties(params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener: ${error.message}`);
        }
    }

    /**
     * Obtener propiedad específica por slug
     */
    async getProperty(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await propertiesRepository.getProperty(slug);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por slug: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades destacadas para home
     */
    async getFeaturedProperties(limit: number = 6): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getFeaturedProperties(limit);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener destacadas: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por tipo
     */
    async getPropertiesByType(type: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByType(type, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por tipo: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por operación
     */
    async getPropertiesByOperation(operation: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByOperation(operation, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por operación: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por barrio
     */
    async getPropertiesByNeighborhood(neighborhood: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByNeighborhood(neighborhood, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por barrio: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por rango de precio
     */
    async getPropertiesByPriceRange(minPrice: number, maxPrice: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByPriceRange(minPrice, maxPrice, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por precio: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por cantidad de habitaciones
     */
    async getPropertiesByRooms(rooms: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByRooms(rooms, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por habitaciones: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por metros cuadrados
     */
    async getPropertiesByM2(m2: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.getPropertiesByM2(m2, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por metros cuadrados: ${error.message}`);
        }
    }

    /**
     * Buscar propiedades por texto
     */
    async searchProperties(searchTerm: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const response = await propertiesRepository.searchProperties(searchTerm, params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - buscar: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades relacionadas
     */
    async getRelatedProperties(propertyId: number, limit: number = 4): Promise<PropertyDTO[]> {
        try {
            const properties = await propertiesRepository.getRelatedProperties(propertyId, limit);
            return properties;
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
            const response = await propertiesRepository.getDevelopments(params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de desarrollos - obtener: ${error.message}`);
        }
    }

    /**
     * Obtener desarrollo específico por slug
     */
    async getDevelopment(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            const response = await propertiesRepository.getDevelopment(slug);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener desarrollo: ${error.message}`);
        }
    }

    /**
     * Obtener banners de desarrollo
     */
    async getDevelopmentBanners(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await propertiesRepository.getDevelopmentBanners(params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de desarrollos - obtener banners: ${error.message}`);
        }
    }

    /**
     * Obtener barrios de desarrollo
     */
    async getDevelopmentNeighborhoods(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await propertiesRepository.getDevelopmentNeighborhoods(params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de desarrollos - obtener barrios: ${error.message}`);
        }
    }

    /**
     * Obtener etapas de desarrollo
     */
    async getDevelopmentStages(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            const response = await propertiesRepository.getDevelopmentStages(params);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de desarrollos - obtener etapas: ${error.message}`);
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
            const response = await propertiesRepository.getPropertiesPaginated(page, limit, filters);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener paginadas: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de propiedades
     */
    async getPropertiesStats(): Promise<any> {
        try {
            const stats = await propertiesRepository.getPropertiesStats();
            return stats;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener estadísticas: ${error.message}`);
        }
    }

    /**
     * Filtrar propiedades por múltiples criterios
     */
    async filterProperties(filters: PropertyFilterDTO, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            const searchParams: PropertySearchParamsDTO = { ...params };

            // Aplicar filtros
            if (filters.type) {
                searchParams.properties = [filters.type];
            }

            if (filters.operation_type) {
                searchParams.operation = [filters.operation_type];
            }

            if (filters.price_min !== undefined) {
                searchParams.min_price = filters.price_min;
            }

            if (filters.price_max !== undefined) {
                searchParams.max_price = filters.price_max;
            }

            if (filters.rooms_min !== undefined) {
                searchParams.rooms = [filters.rooms_min.toString()];
            }

            if (filters.m2_min !== undefined) {
                searchParams.m2 = filters.m2_min.toString();
            }

            if (filters.neighborhood) {
                searchParams.locations = [filters.neighborhood];
            }

            const response = await this.getProperties(searchParams);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - filtrar: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades para mapa
     */
    async getPropertiesForMap(bounds: { north: number; south: number; east: number; west: number }): Promise<PropertyDTO[]> {
        try {
            // Implementar lógica para obtener propiedades dentro de los límites del mapa
            const response = await this.getProperties({ limit: 100 });
            return response.properties.filter(property =>
                property.latitude && property.longitude &&
                property.latitude <= bounds.north && property.latitude >= bounds.south &&
                property.longitude <= bounds.east && property.longitude >= bounds.west
            );
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener para mapa: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades similares
     */
    async getSimilarProperties(property: PropertyDTO, limit: number = 4): Promise<PropertyDTO[]> {
        try {
            const similarParams: PropertySearchParamsDTO = {
                properties: [property.type],
                operation: property.operation_type ? [property.operation_type] : undefined,
                locations: property.neighborhood ? [property.neighborhood] : undefined,
                limit
            };

            const response = await this.getProperties(similarParams);
            return response.properties.filter(p => p.id !== property.id);
        } catch (error: any) {
            console.error('Error obteniendo propiedades similares:', error);
            return [];
        }
    }

    /**
     * Obtener propiedades recientes
     */
    async getRecentProperties(limit: number = 8): Promise<PropertyDTO[]> {
        try {
            const response = await this.getProperties({ limit, order_by: 'created_at' });
            return response.properties.sort((a, b) =>
                new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
            );
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener recientes: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades por precio
     */
    async getPropertiesByPrice(price: number, currency: string = 'ARS', tolerance: number = 0.1): Promise<PropertyDTO[]> {
        try {
            const minPrice = price * (1 - tolerance);
            const maxPrice = price * (1 + tolerance);

            const response = await this.getPropertiesByPriceRange(minPrice, maxPrice);
            return response.properties.filter(property =>
                property.currency === currency
            );
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener por precio: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades exclusivas
     */
    async getExclusiveProperties(limit: number = 6): Promise<PropertyDTO[]> {
        try {
            // Implementar lógica para propiedades exclusivas
            const response = await this.getProperties({ limit });
            return response.properties.filter(property =>
                property.price && property.price > 100000 // Ejemplo: propiedades de alto valor
            );
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener exclusivas: ${error.message}`);
        }
    }

    /**
     * Obtener propiedades con descuento
     */
    async getDiscountedProperties(limit: number = 6): Promise<PropertyDTO[]> {
        try {
            // Implementar lógica para propiedades con descuento
            const response = await this.getProperties({ limit });
            return response.properties.filter(property =>
                property.features?.includes('descuento') ||
                property.features?.includes('oferta')
            );
        } catch (error: any) {
            throw new Error(`Error en el servicio de propiedades - obtener con descuento: ${error.message}`);
        }
    }
}

// Exportar instancia singleton
export const propertiesService = new PropertiesService();
