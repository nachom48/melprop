import developmentRepository, { DevelopmentSearchFilters, DevelopmentsResponse } from '../repositories/developmentRepository';

// Re-exportar la interfaz para que esté disponible
export type { DevelopmentSearchFilters };

class DevelopmentService {
    async getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            console.log('🔍 DevelopmentService.getAllDevelopments - Filtros recibidos:', filters);

            // Limpiar filtros antes de enviarlos
            const cleanFilters = this.cleanFilters(filters);
            console.log('🔍 Filtros limpios:', cleanFilters);

            const response = await developmentRepository.getAllDevelopments(cleanFilters);
            console.log('✅ DevelopmentService - Respuesta del repository:', response);

            return response;
        } catch (error) {
            console.error('❌ DevelopmentService.getAllDevelopments - Error:', error);
            throw error;
        }
    }

    private cleanFilters(filters: DevelopmentSearchFilters): DevelopmentSearchFilters {
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

    async getDevelopmentById(id: number) {
        try {
            return await developmentRepository.getDevelopmentById(id);
        } catch (error) {
            console.error('Error en DevelopmentService.getDevelopmentById:', error);
            throw error;
        }
    }

    async getDevelopmentBySlug(slug: string) {
        try {
            return await developmentRepository.getDevelopmentBySlug(slug);
        } catch (error) {
            console.error('Error en DevelopmentService.getDevelopmentBySlug:', error);
            throw error;
        }
    }
}

export default new DevelopmentService();
