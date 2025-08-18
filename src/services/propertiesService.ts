import propertiesRepository, { SearchFilters, PropertiesResponse, Property } from '../repositories/propertiesRepository';

class PropertiesService {
    async getAllProperties(filters: SearchFilters): Promise<PropertiesResponse> {
        try {
            // Validar y limpiar filtros
            const cleanFilters = this.cleanFilters(filters);

            // Llamar al repository
            const response = await propertiesRepository.getAllProperties(cleanFilters);

            return response;
        } catch (error) {
            console.error('Error in PropertiesService.getAllProperties:', error);
            throw error;
        }
    }

    async getPropertyById(id: number): Promise<Property> {
        try {
            const property = await propertiesRepository.getPropertyById(id);
            return property;
        } catch (error) {
            console.error('Error in PropertiesService.getPropertyById:', error);
            throw error;
        }
    }

    private cleanFilters(filters: SearchFilters): SearchFilters {
        const cleanFilters: SearchFilters = {};

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

export default new PropertiesService();
