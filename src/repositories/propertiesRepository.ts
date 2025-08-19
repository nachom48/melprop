import axios from 'axios';
import { buildApiUrl } from '../config/api';

export interface Property {
    url: string;
    id: number;
    type: string;
    subtype: string;
    development_assigned: boolean;
    operation_type: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    address_floor: string;
    neighborhood: string;
    country: string;
    currency_symbol: string;
    city: string;
    covered_m2: number | { source: string; parsedValue: number };
    uncovered_m2: number | { source: string; parsedValue: number };
    total_m2: number | { source: string; parsedValue: number };
    rooms: number;
    bathrooms: number;
    parking_lots: number;
    status: string;
    substatus: string;
    main_image: string;
    latitude: number | { source: string; parsedValue: number };
    longitude: number | { source: string; parsedValue: number };
    reference_code: string;
    add_to_homepage: boolean;
    media: {
        images: Array<{ url: string }>;
    };
    updated: string;
    price: number;
    development?: Development;
    guard_descripcion?: string;
}

export interface Development {
    url: string;
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
}

export interface SearchFilters {
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

export interface PropertiesResponse {
    limit: number;
    count: number;
    objects: Property[];
}

class PropertiesRepository {
    async getAllProperties(filters: SearchFilters): Promise<PropertiesResponse> {
        try {
            console.log('📡 Repository - Filtros enviados al backend:', filters);
            console.log('📡 Repository - Ordenamiento:', filters.order_by);

            const response = await axios.get(buildApiUrl('/properties/'), {
                params: filters
            });

            console.log('📡 Repository - URL de la petición:', response.config.url);
            console.log('📡 Repository - Parámetros de la petición:', response.config.params);

            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    }

    async getPropertyById(id: number): Promise<Property> {
        try {
            const response = await axios.get(buildApiUrl(`/properties/${id}/`));
            return response.data;
        } catch (error) {
            console.error('Error fetching property:', error);
            throw error;
        }
    }
}

const propertiesRepository = new PropertiesRepository();

export default propertiesRepository;
