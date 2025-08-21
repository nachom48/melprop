import { PropertiesRepository } from './properties.repository';
import { PropertySearchFilters } from './interfaces/propertiesSearchFilters.interface';
import { PropertiesResponse } from './interfaces/propertiesResponse.interface';
import { Property } from './interfaces/property.interface';

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
                cleanFilters[key] = value;
            }
        });

        // Convertir page a número si existe
        if (cleanFilters.page) {
            cleanFilters.page = Number(cleanFilters.page);
        }

        return cleanFilters;
    }
}
