// =====================================================
// PROPERTIES MODULE - SERVICE LAYER
// =====================================================

import { PropertiesRepository } from './PropertiesRepository';
import {
    PropertySearchParamsDTO,
    PropertyFilterDTO,
    PropertyDTO,
    DevelopmentDTO,
    PropertiesResponseDTO,
    PropertyDetailResponseDTO
} from './interfaces';

export namespace PropertiesService {

    // =====================================================
    // PROPERTIES METHODS
    // =====================================================

    /**
     * Obtener lista de propiedades con filtros
     */
    export async function getProperties(params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getProperties(params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getProperties:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedad específica por slug
     */
    export async function getProperty(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            return await PropertiesRepository.getProperty(slug);
        } catch (error: any) {
            console.error('Error en PropertiesService.getProperty:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades destacadas para home
     */
    export async function getFeaturedProperties(limit: number = 6): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getFeaturedProperties(limit);
        } catch (error: any) {
            console.error('Error en PropertiesService.getFeaturedProperties:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por tipo
     */
    export async function getPropertiesByType(type: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByType(type, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByType:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por operación
     */
    export async function getPropertiesByOperation(operation: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByOperation(operation, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByOperation:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por barrio
     */
    export async function getPropertiesByNeighborhood(neighborhood: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByNeighborhood(neighborhood, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByNeighborhood:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por rango de precio
     */
    export async function getPropertiesByPriceRange(minPrice: number, maxPrice: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByPriceRange(minPrice, maxPrice, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByPriceRange:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por cantidad de habitaciones
     */
    export async function getPropertiesByRooms(rooms: number, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByRooms(rooms, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByRooms:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades por metros cuadrados
     */
    export async function getPropertiesByM2(m2: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.getPropertiesByM2(m2, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesByM2:', error);
            throw error;
        }
    }

    /**
     * Buscar propiedades por texto
     */
    export async function searchProperties(searchTerm: string, params: PropertySearchParamsDTO = {}): Promise<PropertiesResponseDTO> {
        try {
            return await PropertiesRepository.searchProperties(searchTerm, params);
        } catch (error: any) {
            console.error('Error en PropertiesService.searchProperties:', error);
            throw error;
        }
    }

    /**
     * Obtener propiedades relacionadas
     */
    export async function getRelatedProperties(propertyId: number, limit: number = 4): Promise<PropertyDTO[]> {
        try {
            return await PropertiesRepository.getRelatedProperties(propertyId, limit);
        } catch (error: any) {
            console.error('Error en PropertiesService.getRelatedProperties:', error);
            throw error;
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
            return await PropertiesRepository.getDevelopments(params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getDevelopments:', error);
            throw error;
        }
    }

    /**
     * Obtener desarrollo específico por slug
     */
    export async function getDevelopment(slug: string): Promise<PropertyDetailResponseDTO> {
        try {
            return await PropertiesRepository.getDevelopment(slug);
        } catch (error: any) {
            console.error('Error en PropertiesService.getDevelopment:', error);
            throw error;
        }
    }

    /**
     * Obtener banners de desarrollo
     */
    export async function getDevelopmentBanners(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            return await PropertiesRepository.getDevelopmentBanners(params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getDevelopmentBanners:', error);
            throw error;
        }
    }

    /**
     * Obtener barrios de desarrollo
     */
    export async function getDevelopmentNeighborhoods(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            return await PropertiesRepository.getDevelopmentNeighborhoods(params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getDevelopmentNeighborhoods:', error);
            throw error;
        }
    }

    /**
     * Obtener etapas de desarrollo
     */
    export async function getDevelopmentStages(params: PropertySearchParamsDTO = {}): Promise<any> {
        try {
            return await PropertiesRepository.getDevelopmentStages(params);
        } catch (error: any) {
            console.error('Error en PropertiesService.getDevelopmentStages:', error);
            throw error;
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
            return await PropertiesRepository.getPropertiesPaginated(page, limit, filters);
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesPaginated:', error);
            throw error;
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
            return await PropertiesRepository.getPropertiesStats();
        } catch (error: any) {
            console.error('Error en PropertiesService.getPropertiesStats:', error);
            throw error;
        }
    }
}
