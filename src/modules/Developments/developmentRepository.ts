import { apiClient } from '../../config/axios.config';
import { Development } from './interfaces/development.interface';
import { DevelopmentSearchFilters } from './interfaces/developmentSearchFilters.interface';
import { DevelopmentsResponse } from './interfaces/developmentResponse.interface';
import { DevelopmentDetailResponse } from './interfaces/developmentDetailResponse.interface';

export namespace DevelopmentRepository {
    export async function getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            const response = await apiClient.get('/developments/', {
                params: filters
            });

            // ✅ Simplemente devolver lo que viene del backend
            return response.data as DevelopmentsResponse;
        } catch (error) {
            console.error('❌ Error al obtener developments:', error);
            throw error;
        }
    }

    export async function getDevelopmentById(id: number): Promise<Development> {
        try {
            const response = await apiClient.get(`/developments/${id}/`);
            return response.data as Development;
        } catch (error) {
            console.error('Error al obtener development por ID:', error);
            throw error;
        }
    }

    export async function getDevelopmentBySlug(slug: string): Promise<DevelopmentDetailResponse> {
        try {
            const response = await apiClient.get(`/developments/${slug}/`);
            return response.data as DevelopmentDetailResponse;
        } catch (error) {
            console.error('Error al obtener development por slug:', error);
            throw error;
        }
    }
}
