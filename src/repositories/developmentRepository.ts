import axios from 'axios';
import { buildApiUrl } from '../config/api';

export interface Development {
    id: number;
    name: string;
    slug: string;
    type: string;
    operation_type: string;
    description: string;
    address: string;
    neighborhood: string;
    country: string;
    city: string;
    status: string;
    main_image: string;
    latitude: number | { source: string; parsedValue: number };
    longitude: number | { source: string; parsedValue: number };
    reference_code: string;
    add_to_homepage: boolean;
    amenities: Array<{
        id: number;
        name: string;
        image: {
            name: string;
            url: string;
        };
    }>;
    posesion: string;
    stage: string;
    media: {
        images: Array<{ url: string }>;
    };
    external_url: string;
    updated: string;
    min_price: number;
    rooms: number[];
    url?: string;
}

export interface DevelopmentSearchFilters {
    operation?: string;
    properties?: string;
    page?: number;
    locations?: string;
    rooms?: string;
    min_price?: string;
    max_price?: string;
    currency?: string;
    characteristics?: string;
    status?: string;
    sort?: string;
    order_by?: string;
    [key: string]: any;
}

export interface DevelopmentsResponse {
    objects: Development[];
    total: number;        // Mapeado desde "count" del backend
    page: number;         // Calculado desde la respuesta
    pages: number;        // Calculado desde "count" y "limit"
    limit: number;        // Agregado para cálculos
    count: number;        // Original del backend
}

class DevelopmentRepository {
    async getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            // Asegurar que siempre se envíe page=1 por defecto
            const filtersWithPage = { page: 1, ...filters };

            console.log('🔍 Repository - Filtros originales:', filters);
            console.log('🔍 Repository - Filtros con page por defecto:', filtersWithPage);
            console.log('🔍 Repository - Ordenamiento:', filtersWithPage.order_by);

            const response = await axios.get(buildApiUrl('/developments/'), {
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

    async getDevelopmentById(id: number): Promise<Development> {
        try {
            const response = await axios.get(buildApiUrl(`/developments/${id}/`));
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por ID:', error);
            throw error;
        }
    }

    async getDevelopmentBySlug(slug: string): Promise<Development> {
        try {
            const response = await axios.get(buildApiUrl(`/developments/by-slug/${slug}/`));
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por slug:', error);
            throw error;
        }
    }
}

export default new DevelopmentRepository();
