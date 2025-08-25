import { apiClient } from '../../config/axios.config';
import { DevelopmentResponse } from './interfaces/development.interface';

export interface DevelopmentSearchFilters {
    stage?: string;
    location?: string;
    rooms?: string;
    home?: boolean;
    limit?: number;
    order_by?: 'mayorPrecio' | 'menorPrecio' | 'masAmplio';
}

export namespace DevelopmentRepository {
    /**
     * Búsqueda de developments con filtros
     */
    export async function searchDevelopments(filters: DevelopmentSearchFilters): Promise<DevelopmentResponse> {
        try {
            console.log('🔍 Repository - Búsqueda de developments con filtros:', filters);

            // Convertir los filtros al formato esperado por el backend
            const backendFilters: any = {};

            if (filters.stage) backendFilters.stage = filters.stage;
            if (filters.location) backendFilters.location = filters.location;
            if (filters.rooms) backendFilters.rooms = filters.rooms;
            if (filters.home) backendFilters.home = filters.home;
            if (filters.limit) backendFilters.limit = filters.limit;
            if (filters.order_by) backendFilters.order_by = filters.order_by;

            console.log('📡 Repository - Filtros enviados al backend:', backendFilters);

            const response = await apiClient.get('/developments/', {
                params: backendFilters
            });

            console.log('✅ Repository - Búsqueda de developments exitosa');
            return response.data as DevelopmentResponse;

        } catch (error: any) {
            console.error('❌ Repository - Error en búsqueda de developments:', error);
            throw new Error(error.response?.data?.message || 'Error en búsqueda de developments');
        }
    }

    /**
     * Obtener development por slug
     */
    export async function getDevelopmentBySlug(slug: string): Promise<any> {
        try {
            console.log('🔍 Repository - Buscando development con slug:', slug);

            const response = await apiClient.get(`/developments/${slug}/`);
            console.log('✅ Repository - Development obtenido exitosamente');
            return response.data;

        } catch (error: any) {
            console.error('❌ Repository - Error al obtener development:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo development');
        }
    }

    /**
     * Obtener todas las etapas disponibles
     */
    export async function getAvailableStages(): Promise<any[]> {
        try {
            console.log('🔍 Repository - Obteniendo etapas disponibles');

            const response = await apiClient.get('/developments/stages/');
            console.log('✅ Repository - Etapas obtenidas exitosamente');
            return response.data;

        } catch (error: any) {
            console.error('❌ Repository - Error al obtener etapas:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo etapas');
        }
    }
}
