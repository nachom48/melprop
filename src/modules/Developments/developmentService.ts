import { DevelopmentRepository } from './developmentRepository';
import { DevelopmentSearchFilters } from './interfaces/developmentSearchFilters.interface';
import { DevelopmentsResponse } from './interfaces/developmentResponse.interface';

// Re-exportar la interfaz para que esté disponible
export type { DevelopmentSearchFilters };

export namespace DevelopmentService {
    export async function getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            console.log('🔍 DevelopmentService.getAllDevelopments - Filtros recibidos:', filters);

            // Limpiar filtros antes de enviarlos
            const cleanFilters = cleanFiltersInternal(filters);
            console.log('🔍 Filtros limpios:', cleanFilters);

            const response = await DevelopmentRepository.getAllDevelopments(cleanFilters);
            console.log('✅ DevelopmentService - Respuesta del repository:', response);

            return response;
        } catch (error) {
            console.error('❌ DevelopmentService.getAllDevelopments - Error:', error);
            throw error;
        }
    }

    function cleanFiltersInternal(filters: DevelopmentSearchFilters): DevelopmentSearchFilters {
        const cleanFilters: DevelopmentSearchFilters = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '' && value !== 'relevantes') {
                if (Array.isArray(value) && value.length > 0) {
                    cleanFilters[key] = value;
                } else if (!Array.isArray(value)) {
                    cleanFilters[key] = value;
                }
            }
        });

        return cleanFilters;
    }

    export async function getDevelopmentById(id: number) {
        try {
            return await DevelopmentRepository.getDevelopmentById(id);
        } catch (error) {
            console.error('Error en DevelopmentService.getDevelopmentById:', error);
            throw error;
        }
    }

    export async function getDevelopmentBySlug(slug: string) {
        try {
            return await DevelopmentRepository.getDevelopmentBySlug(slug);
        } catch (error) {
            console.error('Error en DevelopmentService.getDevelopmentBySlug:', error);
            throw error;
        }
    }
}
