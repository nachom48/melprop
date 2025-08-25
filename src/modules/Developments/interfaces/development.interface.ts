export interface Development {
    id: number;
    name: string;
    description: string;
    address: string;
    neighborhood: string;
    city: string;
    country: string;
    slug: string;
    stage: string;
    posesion: string;
    min_price: number;
    currency_symbol: string;
    main_image: string;
    media: {
        images: Array<{ url: string }>;
    };
    amenities: Array<{
        id: number;
        name: string;
        image: {
            name: string;
            url: string;
        };
    }>;
    rooms: number[];
    add_to_homepage: boolean;
    status: string;
    updated: string;
}

export interface DevelopmentResponse {
    limit: number;
    count: number;
    objects: Development[];
}

export interface DevelopmentStage {
    stage: string;
    count: number;
}