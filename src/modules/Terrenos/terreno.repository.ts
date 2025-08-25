import { apiClient } from '../../config/axios.config';
import { TerrenoResponse, TerrenoSearchFilters } from './interfaces/terreno.interface';

export namespace TerrenoRepository {
    /**
     * Buscar terrenos con filtros
     */
    export async function searchTerrenos(filters: TerrenoSearchFilters): Promise<TerrenoResponse> {
        try {
            console.log('🏞️ Repository - Búsqueda de terrenos con filtros:', filters);
            
            const backendFilters: any = {};
            
            // Filtros básicos
            if (filters.type) backendFilters.type = filters.type;
            if (filters.operation_type) backendFilters.operation_type = filters.operation_type;
            if (filters.neighborhood) backendFilters.neighborhood = filters.neighborhood;
            if (filters.city) backendFilters.city = filters.city;
            if (filters.price_min) backendFilters.price_min = filters.price_min;
            if (filters.price_max) backendFilters.price_max = filters.price_max;
            
            // Filtros específicos de terrenos
            if (filters.zone) backendFilters.zone = filters.zone;
            if (filters.zonification_type) backendFilters.zonification_type = filters.zonification_type;
            if (filters.orientation) backendFilters.orientation = filters.orientation;
            if (filters.service_water) backendFilters.service_water = filters.service_water;
            if (filters.service_gas) backendFilters.service_gas = filters.service_gas;
            if (filters.asfalto !== undefined) backendFilters.asfalto = filters.asfalto;
            
            // Filtros de superficie
            if (filters.surface_min) backendFilters.surface_min = filters.surface_min;
            if (filters.surface_max) backendFilters.surface_max = filters.surface_max;
            
            // Filtros de ubicación
            if (filters.latitude) backendFilters.latitude = filters.latitude;
            if (filters.longitude) backendFilters.longitude = filters.longitude;
            if (filters.radius) backendFilters.radius = filters.radius;
            
            // Paginación y ordenamiento
            if (filters.limit) backendFilters.limit = filters.limit;
            if (filters.offset) backendFilters.offset = filters.offset;
            if (filters.order_by) backendFilters.order_by = filters.order_by;
            
            // Filtros especiales
            if (filters.add_to_homepage !== undefined) backendFilters.add_to_homepage = filters.add_to_homepage;
            if (filters.guard !== undefined) backendFilters.guard = filters.guard;
            if (filters.no_pagination !== undefined) backendFilters.no_pagination = filters.no_pagination;
            
            console.log('📡 Repository - Filtros enviados al backend:', backendFilters);
            
            const response = await apiClient.get('/properties/', {
                params: backendFilters
            });
            
            console.log('✅ Repository - Búsqueda de terrenos exitosa');
            return response.data as TerrenoResponse;
        } catch (error: any) {
            console.error('❌ Repository - Error en búsqueda de terrenos:', error);
            throw new Error(error.response?.data?.message || 'Error en búsqueda de terrenos');
        }
    }

    /**
     * Obtener terreno por slug
     */
    export async function getTerrenoBySlug(slug: string): Promise<any> {
        try {
            console.log('🏞️ Repository - Obteniendo terreno por slug:', slug);
            
            const response = await apiClient.get(`/properties/${slug}/`);
            
            console.log('✅ Repository - Terreno obtenido exitosamente');
            return response.data;
        } catch (error: any) {
            console.error('❌ Repository - Error obteniendo terreno:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo terreno');
        }
    }

    /**
     * Obtener terrenos destacados (add_to_homepage)
     */
    export async function getFeaturedTerrenos(limit: number = 11): Promise<TerrenoResponse> {
        try {
            console.log('🏞️ Repository - Obteniendo terrenos destacados');
            
            const response = await searchTerrenos({
                type: 'terreno',
                add_to_homepage: true,
                limit: limit,
                order_by: 'fecha_desc'
            });
            
            console.log('✅ Repository - Terrenos destacados obtenidos:', response.objects.length);
            return response;
        } catch (error: any) {
            console.error('❌ Repository - Error obteniendo terrenos destacados:', error);
            throw error;
        }
    }

    /**
     * Obtener terrenos por barrio
     */
    export async function getTerrenosByNeighborhood(neighborhood: string, limit: number = 11): Promise<TerrenoResponse> {
        try {
            console.log('🏞️ Repository - Obteniendo terrenos por barrio:', neighborhood);
            
            const response = await searchTerrenos({
                type: 'terreno',
                neighborhood: neighborhood,
                limit: limit,
                order_by: 'fecha_desc'
            });
            
            console.log('✅ Repository - Terrenos por barrio obtenidos:', response.objects.length);
            return response;
        } catch (error: any) {
            console.error('❌ Repository - Error obteniendo terrenos por barrio:', error);
            throw error;
        }
    }
}
