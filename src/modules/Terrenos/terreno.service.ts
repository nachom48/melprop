import { TerrenoRepository } from './terreno.repository';
import { Terreno, TerrenoResponse, TerrenoSearchFilters } from './interfaces/terreno.interface';

export namespace TerrenoService {
    /**
     * Buscar terrenos con filtros avanzados
     */
    export async function searchTerrenos(filters: TerrenoSearchFilters): Promise<TerrenoResponse> {
        try {
            console.log('🏞️ Service - Búsqueda de terrenos con filtros:', filters);
            
            // Asegurar que siempre se busquen terrenos
            const searchFilters = {
                ...filters,
                type: 'terreno'
            };
            
            const response = await TerrenoRepository.searchTerrenos(searchFilters);
            
            console.log('✅ Service - Terrenos encontrados:', response.objects.length);
            return response;
        } catch (error: any) {
            console.error('❌ Service - Error en búsqueda de terrenos:', error);
            throw error;
        }
    }

    /**
     * Obtener terreno por slug
     */
    export async function getTerrenoBySlug(slug: string): Promise<Terreno> {
        try {
            console.log('🏞️ Service - Obteniendo terreno por slug:', slug);
            
            const terreno = await TerrenoRepository.getTerrenoBySlug(slug);
            
            console.log('✅ Service - Terreno obtenido:', terreno.name);
            return terreno;
        } catch (error: any) {
            console.error('❌ Service - Error obteniendo terreno:', error);
            throw error;
        }
    }

    /**
     * Obtener terrenos destacados para la página principal
     */
    export async function getFeaturedTerrenos(limit: number = 11): Promise<Terreno[]> {
        try {
            console.log('🏞️ Service - Obteniendo terrenos destacados');
            
            const response = await TerrenoRepository.getFeaturedTerrenos(limit);
            
            console.log('✅ Service - Terrenos destacados obtenidos:', response.objects.length);
            return response.objects;
        } catch (error: any) {
            console.error('❌ Service - Error obteniendo terrenos destacados:', error);
            throw error;
        }
    }

    /**
     * Obtener terrenos por barrio
     */
    export async function getTerrenosByNeighborhood(neighborhood: string, limit: number = 11): Promise<Terreno[]> {
        try {
            console.log('🏞️ Service - Obteniendo terrenos por barrio:', neighborhood);
            
            const response = await TerrenoRepository.getTerrenosByNeighborhood(neighborhood, limit);
            
            console.log('✅ Service - Terrenos por barrio obtenidos:', response.objects.length);
            return response.objects;
        } catch (error: any) {
            console.error('❌ Service - Error obteniendo terrenos por barrio:', error);
            throw error;
        }
    }

    /**
     * Buscar terrenos con filtros básicos (para búsquedas simples)
     */
    export async function searchTerrenosBasic(filters: {
        neighborhood?: string;
        city?: string;
        price_min?: number;
        price_max?: number;
        surface_min?: number;
        surface_max?: number;
        limit?: number;
    }): Promise<Terreno[]> {
        try {
            console.log('🏞️ Service - Búsqueda básica de terrenos:', filters);
            
            const searchFilters: TerrenoSearchFilters = {
                type: 'terreno',
                limit: filters.limit || 11,
                order_by: 'fecha_desc',
                ...filters
            };
            
            const response = await TerrenoRepository.searchTerrenos(searchFilters);
            
            console.log('✅ Service - Búsqueda básica completada:', response.objects.length);
            return response.objects;
        } catch (error: any) {
            console.error('❌ Service - Error en búsqueda básica:', error);
            throw error;
        }
    }

    /**
     * Limpiar y validar filtros de búsqueda
     */
    export function cleanSearchFilters(filters: TerrenoSearchFilters): TerrenoSearchFilters {
        const cleanFilters: TerrenoSearchFilters = {};
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                (cleanFilters as any)[key] = value;
            }
        });
        
        // Asegurar que siempre se busquen terrenos
        cleanFilters.type = 'terreno';
        
        return cleanFilters;
    }
}
