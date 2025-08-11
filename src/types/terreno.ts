export interface Terreno {
    id: string;
    title: string;
    price: number;
    currency: string;
    address: string;
    neighborhood: string;
    city: string;
    surface: number;
    operation: 'Venta' | 'Alquiler';
    type: 'Terreno' | 'Casa';
    image: string;
    isFavorite: boolean;
    features: string[];
    description?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface TerrenosResponse {
    count: number;
    results: Terreno[];
    filters?: {
        neighborhoods: string[];
        priceRanges: string[];
        surfaceRanges: string[];
    };
} 