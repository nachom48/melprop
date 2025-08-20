// =====================================================
// PROPERTIES MODULE - INTERFACES
// =====================================================

export interface PropertySearchParamsDTO {
    home?: boolean;
    limit?: number;
    page?: number;
    properties?: string[];
    operation?: string[];
    locations?: string[];
    min_price?: number;
    max_price?: number;
    rooms?: string[];
    m2?: string;
    exclude?: number;
    characteristics?: string[];
    status?: string[];
    order_by?: string;
    [key: string]: any;
}

export interface PropertyFilterDTO {
    type?: string[];
    operation?: string[];
    location?: string[];
    priceFrom?: number;
    priceTo?: number;
    rooms?: number[];
    m2?: string;
    characteristics?: string[];
    status?: string[];
    [key: string]: any;
}

export interface PropertyDTO {
    id: number;
    title: string;
    description?: string;
    price: number;
    currency: string;
    type: string;
    operation_type: string;
    neighborhood?: string;
    rooms?: number;
    m2?: number;
    main_image?: string;
    images?: string[];
    slug: string;
    [key: string]: any;
}

export interface DevelopmentDTO {
    id: number;
    title: string;
    description?: string;
    price: number;
    currency: string;
    stage: string;
    neighborhood?: string;
    rooms?: number;
    m2?: number;
    main_image?: string;
    images?: string[];
    slug: string;
    [key: string]: any;
}

export interface PropertiesResponseDTO {
    properties: PropertyDTO[];
    total: number;
    page: number;
    pages: number;
    limit: number;
    [key: string]: any;
}

export interface PropertyDetailResponseDTO {
    property: PropertyDTO;
    related_properties?: PropertyDTO[];
    [key: string]: any;
}
