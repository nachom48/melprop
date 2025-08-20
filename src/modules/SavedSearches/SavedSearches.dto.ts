// =====================================================
// SAVED SEARCHES MODULE - DATA TRANSFER OBJECTS
// =====================================================

// =====================================================
// REQUEST DTOs
// =====================================================

export interface CreateSavedSearchDTO {
    name: string;
    alert_type: string;
    url: string;
}

export interface UpdateSavedSearchDTO {
    id: number;
    name?: string;
    alert_type?: string;
    url?: string;
}

export interface RemoveSavedSearchDTO {
    id: number;
}

// =====================================================
// RESPONSE DTOs
// =====================================================

export interface SavedSearchDTO {
    id: number;
    name: string;
    alert_type: string;
    url: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}

export interface SavedSearchesResponseDTO {
    searchs: SavedSearchDTO[];
    count: number;
    success: boolean;
    message?: string;
}

export interface CreateSavedSearchResponseDTO {
    success: boolean;
    message?: string;
    search?: SavedSearchDTO;
}

export interface UpdateSavedSearchResponseDTO {
    success: boolean;
    message?: string;
    search?: SavedSearchDTO;
}

export interface RemoveSavedSearchResponseDTO {
    success: boolean;
    message?: string;
    searchs?: SavedSearchDTO[];
}

// =====================================================
// STORE DTOs
// =====================================================

export interface SavedSearchesStoreDTO {
    savedSearches: SavedSearchDTO[];
    isLoading: boolean;
    error: string | null;
}

// =====================================================
// UTILITY TYPES
// =====================================================

export type SavedSearchesStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SavedSearchesState {
    savedSearches: SavedSearchDTO[];
    status: SavedSearchesStatus;
    error: string | null;
}

export type AlertType = 'email' | 'sms' | 'push' | 'all';
