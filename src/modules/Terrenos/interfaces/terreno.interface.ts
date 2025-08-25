export interface Terreno {
    id: number;
    name: string;
    description: string;
    address: string;
    address_floor?: string;
    between_streets_1?: string;
    between_streets_2?: string;
    neighborhood: string;
    city: string;
    country: string;
    province?: string;
    slug: string;
    body?: string;
    price: number;
    currency_symbol: string;
    operation_type: 'venta' | 'alquiler' | 'alquiler-temporario';
    type: 'terreno';
    subtype?: string;
    main_image: string;
    media: {
        images: Array<{ url: string }>;
        plans?: Array<{ url: string }>;
        matterport_url?: string;
        vimeo_url?: string;
    };
    status: string;
    add_to_homepage: boolean;
    updated: string;
    created: string;

    // Campos específicos de terrenos
    zone?: string;
    zonification_type?: string;
    lfi?: string;
    lb?: string;
    floors_develop?: string;
    typology_develop?: string;
    afectaciones_especiales?: boolean;
    asfalto?: boolean;
    orientation?: string;
    service_water?: string;
    service_gas?: string;
    service_toilets?: string;
    slope?: string;
    fot?: string;

    // Superficies
    total_m2: number;
    size_terreno?: number;
    size_field?: number;
    size_long_field?: number;
    size_front?: number;
    size_counter_front?: number;
    size_lateral_der?: number;
    size_lateral_izq?: number;

    // Ubicación
    latitude: number;
    longitude: number;

    // Referencias
    reference_code?: string;
    author?: {
        id: number;
        username: string;
    };
    producer?: {
        id: number;
        name: string;
        email?: string;
        phone?: string;
    };
    office?: {
        id: number;
        name: string;
        phone?: string;
        business_time?: string;
    };
}

export interface TerrenoResponse {
    limit: number;
    count: number;
    objects: Terreno[];
}

export interface TerrenoSearchFilters {
    // Filtros básicos
    type?: string;
    operation_type?: string;
    neighborhood?: string;
    city?: string;
    price_min?: number;
    price_max?: number;

    // Filtros específicos de terrenos
    zone?: string;
    zonification_type?: string;
    orientation?: string;
    service_water?: string;
    service_gas?: string;
    asfalto?: boolean;

    // Filtros de superficie
    surface_min?: number;
    surface_max?: number;

    // Filtros de ubicación
    latitude?: number;
    longitude?: number;
    radius?: number;

    // Paginación y ordenamiento
    limit?: number;
    offset?: number;
    page?: number;
    order_by?: 'precio_asc' | 'precio_desc' | 'superficie_asc' | 'superficie_desc' | 'fecha_desc';

    // Filtros especiales
    add_to_homepage?: boolean;
    guard?: boolean;
    no_pagination?: boolean;

    // Filtros adicionales
    currency?: string;
    characteristics?: string;
    status?: string;

    // Índice de string para permitir acceso dinámico
    [key: string]: any;
}
