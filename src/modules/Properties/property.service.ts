import { PropertiesRepository } from './properties.repository';
import { PropertySearchFilters } from './interfaces/propertiesSearchFilters.interface';
import { PropertiesResponse } from './interfaces/propertiesResponse.interface';
import { Property, PropertyDetailResponse } from './interfaces/property.interface';
import { AdvancedPropertyFilters } from './interfaces/advancedPropertyFilters.interface';

export namespace PropertiesService {
    export async function getAllProperties(filters: PropertySearchFilters): Promise<PropertiesResponse> {
        try {
            // Validar y limpiar filtros
            const cleanFilters = cleanFiltersInternal(filters);

            // Llamar al repository
            const response = await PropertiesRepository.getAllProperties(cleanFilters);

            return response;
        } catch (error) {
            console.error('Error in PropertiesService.getAllProperties:', error);
            throw error;
        }
    }

    export async function getPropertyById(id: number): Promise<Property> {
        try {
            const property = await PropertiesRepository.getPropertyById(id);
            return property;
        } catch (error) {
            console.error('Error in PropertiesService.getPropertyById:', error);
            throw error;
        }
    }

    function cleanFiltersInternal(filters: PropertySearchFilters): PropertySearchFilters {
        const cleanFilters: PropertySearchFilters = {};

        // Solo incluir filtros que tengan valor
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                (cleanFilters as any)[key] = value;
            }
        });

        // Convertir page a número si existe
        if (cleanFilters.page) {
            cleanFilters.page = Number(cleanFilters.page);
        }

        return cleanFilters;
    }

    export async function getPropertyBySlug(slug: string): Promise<PropertyDetailResponse> {
        try {
            const property = await PropertiesRepository.getPropertyBySlug(slug);
            return property;
        } catch (error) {
            console.error('Error in PropertiesService.getPropertyBySlug:', error);
            throw error;
        }
    }

    export async function getPropertyDetail(property: Property): Promise<PropertyDetailResponse> {
        try {
            const detailedProperty = await PropertiesRepository.getPropertyDetail(property);
            return detailedProperty;
        } catch (error) {
            console.error('Error in PropertiesService.getPropertyDetail:', error);
            throw error;
        }
    }

    /**
     * Búsqueda avanzada de propiedades con múltiples filtros
     * Utiliza el endpoint /api/properties/ con filtros avanzados del backend
     */
    export async function searchPropertiesAdvanced(filters: AdvancedPropertyFilters): Promise<PropertiesResponse> {
        try {
            console.log('🔍 Service - Búsqueda avanzada con filtros:', filters);

            // Validar y limpiar filtros
            const cleanFilters = cleanAdvancedFiltersInternal(filters);

            // Llamar al repository
            const response = await PropertiesRepository.searchPropertiesAdvanced(cleanFilters);

            return response;
        } catch (error) {
            console.error('Error in PropertiesService.searchPropertiesAdvanced:', error);
            throw error;
        }
    }

    /**
     * Buscar propiedades que tengan ciertas características específicas
     * Método de conveniencia para búsquedas comunes
     */
    export async function searchPropertiesByFeatures(features: {
        hasBalcony?: boolean;
        hasParking?: boolean;
        hasAmenities?: string[];
        minRooms?: number;
        maxRooms?: number;
        minBathrooms?: number;
        maxBathrooms?: number;
        minPrice?: number;
        maxPrice?: number;
        minM2?: number;
        maxM2?: number;
        orientation?: string[];
        age?: { min?: number; max?: number };
        type?: string[];
        operation?: string[];
        neighborhoods?: string[];
        no_pagination?: boolean;
    }): Promise<PropertiesResponse> {
        try {
            console.log('🔍 Service - Búsqueda por características:', features);

            // Llamar al repository
            const response = await PropertiesRepository.searchPropertiesByFeatures(features);

            return response;
        } catch (error) {
            console.error('Error in PropertiesService.searchPropertiesByFeatures:', error);
            throw error;
        }
    }

    /**
     * Limpiar y validar filtros avanzados
     */
    function cleanAdvancedFiltersInternal(filters: AdvancedPropertyFilters): AdvancedPropertyFilters {
        const cleanFilters: AdvancedPropertyFilters = {};

        // Solo incluir filtros que tengan valor
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                (cleanFilters as any)[key] = value;
            }
        });

        // Convertir page a número si existe
        if (cleanFilters.page) {
            cleanFilters.page = Number(cleanFilters.page);
        }

        // Convertir limit a número si existe
        if (cleanFilters.limit) {
            cleanFilters.limit = Number(cleanFilters.limit);
        }

        // Convertir precios a números si existen
        if (cleanFilters.min_price) {
            cleanFilters.min_price = Number(cleanFilters.min_price);
        }
        if (cleanFilters.max_price) {
            cleanFilters.max_price = Number(cleanFilters.max_price);
        }

        // Convertir metros cuadrados a números si existen
        if (cleanFilters.min_covered_m2) {
            cleanFilters.min_covered_m2 = Number(cleanFilters.min_covered_m2);
        }
        if (cleanFilters.max_covered_m2) {
            cleanFilters.max_covered_m2 = Number(cleanFilters.max_covered_m2);
        }
        if (cleanFilters.min_uncovered_m2) {
            cleanFilters.min_uncovered_m2 = Number(cleanFilters.min_uncovered_m2);
        }
        if (cleanFilters.max_uncovered_m2) {
            cleanFilters.max_uncovered_m2 = Number(cleanFilters.max_uncovered_m2);
        }

        // Convertir habitaciones y baños a números si existen
        if (cleanFilters.min_bathrooms) {
            cleanFilters.min_bathrooms = Number(cleanFilters.min_bathrooms);
        }
        if (cleanFilters.max_bathrooms) {
            cleanFilters.max_bathrooms = Number(cleanFilters.max_bathrooms);
        }
        if (cleanFilters.min_parking_lots) {
            cleanFilters.min_parking_lots = Number(cleanFilters.min_parking_lots);
        }
        if (cleanFilters.max_parking_lots) {
            cleanFilters.max_parking_lots = Number(cleanFilters.max_parking_lots);
        }

        return cleanFilters;
    }
}
