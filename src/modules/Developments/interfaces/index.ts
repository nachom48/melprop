// =============================================================================
// EXPORTACIONES DE INTERFACES DE DEVELOPMENTS
// =============================================================================

// Interfaces básicas de desarrollo
export type { Development } from './development.interface';
export type { DevelopmentsResponse } from './developmentResponse.interface';
export type { DevelopmentSearchFilters } from './developmentSearchFilters.interface';

// Interfaces de respuesta detallada
export type {
    DevelopmentDetailResponse,
    UnitGroup,
    Property,
    Office,
    Amenity,
    Media,
    MediaImage,
    Coordinates
} from './developmentDetailResponse.interface';

// Re-exportar todas las interfaces para uso directo
export * from './development.interface';
export * from './developmentResponse.interface';
export * from './developmentSearchFilters.interface';
export * from './developmentDetailResponse.interface';
