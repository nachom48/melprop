import { apiClient } from '../../config/axios.config';
import { PropertySearchFilters } from './interfaces/propertiesSearchFilters.interface';
import { PropertiesResponse } from './interfaces/propertiesResponse.interface';
import { Property } from './interfaces/property.interface';

export namespace PropertiesRepository {
    export async function getAllProperties(filters: PropertySearchFilters): Promise<PropertiesResponse> {
        try {
            console.log('📡 Repository - Filtros enviados al backend:', filters);
            console.log('📡 Repository - Ordenamiento:', filters.order_by);

            const response = await apiClient.get('/properties/', {
                params: filters
            });

            console.log('📡 Repository - URL de la petición:', response.config.url);
            console.log('📡 Repository - Parámetros de la petición:', response.config.params);

            return response.data;
        } catch (error: any) {
            console.error('Error fetching properties:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades');
        }
    }

    export async function getPropertyById(id: number): Promise<Property> {
        try {
            const response = await apiClient.get(`/properties/${id}/`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching property:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedad');
        }
    }
}
