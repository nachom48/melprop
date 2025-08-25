import { Development } from "../../Developments/interfaces/development.interface";

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

// Nueva interfaz para la respuesta de detalle de propiedad (estructura real del backend)
export interface PropertyDetailResponse {
    // Información básica de la propiedad
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
    covered_m2: number;
    uncovered_m2: number;
    total_m2: number;
    rooms: number;
    bathrooms: number;
    parking_lots: number;
    status: string;
    substatus: string;
    main_image: string;
    latitude: number;
    longitude: number;
    reference_code: string;
    add_to_homepage: boolean;
    updated: string;
    price: number;

    // Media y contenido
    media: {
        matterport_url: string;
        images: Array<{ url: string }>;
        vimeo_url: string;
        vimeo_url_2: string;
        vimeo_url_3: string;
        vimeo_url_4: string;
        vimeo_url_5: string;
        matterport_url_2: string;
        matterport_url_3: string;
        matterport_url_4: string;
        matterport_url_5: string;
        planos: Array<{ url: string }>;
    };

    // Información adicional
    between_streets_1: string;
    between_streets_2: string;
    body: string;
    abl: number;
    expenses: number;

    // Oficina
    office: {
        name: string;
        phone: string;
        business_time: string;
    };

    // Amenities
    amenities: Array<{
        id: number;
        name: string;
        image: {
            name: string;
            url: string;
        };
    }>;

    // Configuración del chatbot
    chatbot_enabled: boolean;
    chatbot_trigger: string;
    created: string;

    // Características específicas
    property_floors: string | null;
    palier_type: string;
    kitchen: string;
    laundry: string;
    bedrooms: number;
    suites: number;
    toilette: number;
    service: boolean;
    service_bathroom: boolean;
    service_entrance: boolean;
    double_circulation: boolean;
    professional_use: boolean;
    location: string;
    orientation: string;
    floor_type: string | null;
    balcony_type: string;
    balconies: string | null;
    hot_water: string;
    heating: string;
    air_conditioners_type: string | null;
    air_conditioners: string | null;
    recycled_ago: string | null;
    parking_type: string;

    // Información del edificio
    building: {
        building_type: string;
        building_category: string;
        age: number;
        building_floors: string;
        units_per_floor: string;
        building_elevator: boolean;
        building_service_elevator: boolean;
        building_parking: boolean;
        storage: boolean;
    };

    // Tamaños de habitaciones
    sizes: {
        living: string | null;
        comedor: string | null;
        escritorio: string | null;
        cocina: string | null;
        dormitorios: string | null;
        balcon: string | null;
        comedor_diario: string | null;
        playroom: string | null;
        terraza: string | null;
        jardin: string | null;
        patio: string | null;
    };
}
