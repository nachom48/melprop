// =====================================================
// FAVORITES MODULE - DATA TRANSFER OBJECTS
// =====================================================

// =====================================================
// REQUEST DTOs
// =====================================================

export interface AddFavoriteDTO {
    id: number;
}

export interface RemoveFavoriteDTO {
    id: number;
}

// =====================================================
// RESPONSE DTOs
// =====================================================

export interface FavoritePropertyDTO {
    id: number;
    title: string;
    address: string;
    price: string;
    type: string;
    bedrooms?: number;
    area?: string;
    image?: string;
    url: string;
    slug: string;
    neighborhood: string;
    city: string;
    covered_m2?: number;
    rooms?: number;
    bathrooms?: number;
    parking_lots?: number;
    main_image?: string;
    media?: {
        images: Array<{
            url: string;
            name: string;
        }>;
    };
}

export interface FavoritesResponseDTO {
    properties: FavoritePropertyDTO[];
    message?: string;
}

export interface AddFavoriteResponseDTO {
    success: boolean;
    isFavorite: boolean;
    message: string;
    properties: FavoritePropertyDTO[];
}

export interface RemoveFavoriteResponseDTO {
    success: boolean;
    message: string;
    properties: FavoritePropertyDTO[];
}

// =====================================================
// STORE DTOs
// =====================================================

export interface FavoritesStoreDTO {
    favorites: FavoritePropertyDTO[];
    isLoading: boolean;
    error: string | null;
}

// =====================================================
// UTILITY TYPES
// =====================================================

export type FavoritesStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FavoritesState {
    favorites: FavoritePropertyDTO[];
    status: FavoritesStatus;
    error: string | null;
}
