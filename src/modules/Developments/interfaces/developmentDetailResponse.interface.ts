// =============================================================================
// INTERFACES PARA DEVELOPMENT DETAIL RESPONSE
// =============================================================================

// Interfaz para imágenes de medios
export interface MediaImage {
    url: string;
}

// Interfaz para medios
export interface Media {
    images: MediaImage[];
}

// Interfaz para coordenadas
export interface Coordinates {
    source?: string;
    parsedValue?: number;
}

// Interfaz para amenities
export interface Amenity {
    id: number;
    name: string;
    image: {
        name: string;
        url: string;
    };
}

// Interfaz para propiedades individuales
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
    media: {
        images: MediaImage[];
    };
    updated: string;
    price: number;
    guard_descripcion: string;
}

// Interfaz para grupos de unidades
export interface UnitGroup {
    m2: string;
    rooms: string;
    baths: string;
    letter: string;
    floors: string;
    description: string;
    last_units: boolean;
    is_local: boolean;
    sold: boolean;
    main_image: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    image8: string;
    properties: Property[];
}

// Interfaz para oficina
export interface Office {
    name: string;
    phone: string;
    business_time: string;
}

// Interfaz principal para la respuesta detallada del desarrollo
export interface DevelopmentDetailResponse {
    // Campos básicos
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
    latitude: number | Coordinates;
    longitude: number | Coordinates;
    reference_code: string;
    add_to_homepage: boolean;
    amenities: Amenity[];
    posesion: string;
    stage: string;
    media: Media;
    external_url: string;
    updated: string;
    min_price: number;
    rooms: number[];

    // Campos de header
    header_green: boolean;
    header_image: string;
    header_video: string;
    sello_cuotas: string;

    // Campos de concepto
    concept_title: string;
    concept_subtitle: string;
    render_vertical: boolean;
    render_image: string;
    render_image_2: string;
    render_text: string;
    amenities_title: string;
    amenities_text: string;
    unidades_title: string;

    // Campos de ubicación
    location_text: string;
    location_title: string;
    location_image: string;
    location_map: string;
    location_map_url: string;

    // Campos de detalles
    detail_title: string;
    detail_text: string;

    // Campos de pagos
    payment_title: string;
    payment_number_left: string;
    payment_text_left: string;
    payment_number_right: string;
    payment_text_right: string;
    payment_text_bottom: string;

    // Campos de footer
    footer_phone: string;
    footer_whatsapp: string;

    // Campos de medios
    brochure: string;
    vimeo_url: string;
    vimeo_url_2: string;
    vimeo_url_3: string;
    vimeo_url_4: string;
    vimeo_url_5: string;
    matterport_url: string;
    matterport_url_2: string;
    matterport_url_3: string;
    matterport_url_4: string;
    matterport_url_5: string;
    video_bg: string;

    // Objetos anidados
    office: Office;
    groups: UnitGroup[];
}
