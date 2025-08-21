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