import axios from 'axios';

export interface Development {
    id: number;
    name: string;
    slug: string;
    neighborhood: string;
    address: string;
    main_image: string;
    rooms: any[];
    amenities: any[];
    external_url?: string;
    possession_date?: string;
    price_from?: string;
    stage?: string;
    price?: number;
    currency_symbol?: string;
    operation_type?: string;
    city?: string;
    covered_m2?: number;
    add_to_homepage?: boolean;
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
    total: number;
    page: number;
    pages: number;
}

class DevelopmentRepository {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    }

    async getAllDevelopments(filters: DevelopmentSearchFilters = {}): Promise<DevelopmentsResponse> {
        try {
            console.log('🔍 Filtros enviados al backend:', filters);
            
            const params = new URLSearchParams();
            
            // Agregar filtros al query string
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, value.toString());
                    }
                }
            });

            const url = `${this.baseURL}/api/developments/?${params.toString()}`;
            console.log('🔍 URL de la petición:', url);
            console.log('🔍 Parámetros:', params.toString());

            const response = await axios.get(url);
            console.log('✅ Respuesta del backend:', response.data);
            
            return response.data;
        } catch (error) {
            console.error('❌ Error al obtener developments:', error);
            throw error;
        }
    }

    async getDevelopmentById(id: number): Promise<Development> {
        try {
            const response = await axios.get(`${this.baseURL}/api/developments/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por ID:', error);
            throw error;
        }
    }

    async getDevelopmentBySlug(slug: string): Promise<Development> {
        try {
            const response = await axios.get(`${this.baseURL}/api/developments/by-slug/${slug}/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener development por slug:', error);
            throw error;
        }
    }
}

export default new DevelopmentRepository();
