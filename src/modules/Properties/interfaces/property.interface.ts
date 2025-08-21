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
