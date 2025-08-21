import { apiClient } from '../../config/axios.config';
import { Development } from './interfaces/development.interface';
import { DevelopmentSearchFilters } from './interfaces/developmentSearchFilters.interface';
import { DevelopmentsResponse } from './interfaces/developmentResponse.interface';

export namespace DevelopmentRepository {
    export async function getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            // Asegurar que siempre se envíe page=1 por defecto
            const filtersWithPage = { page: 1, ...filters };

            console.log('🔍 Repository - Filtros originales:', filters);
            console.log('🔍 Repository - Filtros con page por defecto:', filtersWithPage);
            console.log('🔍 Repository - Ordenamiento:', filtersWithPage.order_by);

            const response = await apiClient.get('/developments/', {
                params: filtersWithPage
            });

            console.log('🔍 Repository - URL de la petición:', response.config.url);
            console.log('🔍 Repository - Parámetros de la petición:', response.config.params);
            console.log('✅ Repository - Respuesta del backend:', response.data);

            // Mapear la respuesta del backend a nuestro formato
            const backendData = response.data;
            const currentPage = filtersWithPage.page || 1;
            const totalPages = Math.ceil(backendData.count / backendData.limit);

            const mappedResponse: DevelopmentsResponse = {
                objects: backendData.objects || [],
                total: backendData.count || 0,
                page: currentPage,
                pages: totalPages,
                limit: backendData.limit || 16,
                count: backendData.count || 0
            };

            console.log('🔄 Repository - Respuesta mapeada:', mappedResponse);

            return mappedResponse;
        } catch (error) {
            console.error('❌ Error al obtener developments:', error);
            throw error;
        }
    }

    export async function getDevelopmentById(id: number): Promise<Development> {
        try {
            const response = await apiClient.get(`/developments/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por ID:', error);
            throw error;
        }
    }

    export async function getDevelopmentBySlug(slug: string): Promise<Development> {
        try {
            const response = await apiClient.get(`/developments/${slug}/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por slug:', error);
            throw error;
        }
    }
}
