// =====================================================
// PROPERTIES MODULE - DATA TRANSFER OBJECTS
// =====================================================

// =====================================================
// REQUEST DTOs
// =====================================================

export interface PropertySearchParamsDTO {
  operation?: string[];
  orientation?: string[];
  properties?: string[];
  locations?: string[];
  rooms?: string[];
  min_parking_lots?: number;
  min_bathrooms?: number;
  currency?: string;
  min_price?: number;
  max_price?: number;
  amenities?: string[];
  balcon?: boolean;
  parking?: boolean;
  m2?: string;
  page?: number;
  order_by?: string;
  toilette?: boolean;
  age?: string;
  home?: boolean;
  limit?: number;
}

export interface PropertyFilterDTO {
  type?: string;
  operation_type?: string;
  price_min?: number;
  price_max?: number;
  rooms_min?: number;
  rooms_max?: number;
  m2_min?: number;
  m2_max?: number;
  neighborhood?: string;
  city?: string;
  province?: string;
  amenities?: string[];
  features?: string[];
}

// =====================================================
// RESPONSE DTOs
// =====================================================

export interface PropertyDTO {
  id: number;
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  address: string;
  type: string;
  operation_type?: string;
  rooms?: number;
  bathrooms?: number;
  parking_lots?: number;
  m2?: number;
  images?: string[];
  slug?: string;
  neighborhood?: string;
  city?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
  features?: string[];
  age?: string;
  orientation?: string;
  balcon?: boolean;
  parking?: boolean;
  toilette?: boolean;
  created_at?: string;
  updated_at?: string;
  is_favorite?: boolean;
  development?: DevelopmentDTO;
}

export interface DevelopmentDTO {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  province: string;
  images?: string[];
  slug?: string;
  stages?: DevelopmentStageDTO[];
  neighborhoods?: string[];
}

export interface DevelopmentStageDTO {
  id: number;
  name: string;
  description?: string;
  progress?: number;
  estimated_completion?: string;
}

export interface PropertiesResponseDTO {
  properties: PropertyDTO[];
  count: number;
  limit: number;
  page: number;
  total_pages: number;
  success: boolean;
  message?: string;
}

export interface PropertyDetailResponseDTO {
  property: PropertyDTO;
  related_properties?: PropertyDTO[];
  success: boolean;
  message?: string;
}

export interface PropertyImageDTO {
  id: number;
  url: string;
  alt?: string;
  is_primary?: boolean;
  order?: number;
}

export interface PropertyAmenityDTO {
  id: number;
  name: string;
  icon?: string;
  category?: string;
}

// =====================================================
// STORE DTOs
// =====================================================

export interface PropertiesStoreDTO {
  properties: PropertyDTO[];
  currentProperty: PropertyDTO | null;
  isLoading: boolean;
  error: string | null;
  filters: PropertyFilterDTO;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// =====================================================
// UTILITY TYPES
// =====================================================

export type PropertyStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PropertiesState {
  properties: PropertyDTO[];
  status: PropertyStatus;
  error: string | null;
  filters: PropertyFilterDTO;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type PropertyType = 'casa' | 'departamento' | 'ph' | 'local' | 'terreno' | 'galpon' | 'cochera';
export type OperationType = 'venta' | 'alquiler' | 'alquiler-temporario' | 'emprendimiento';
export type Currency = 'USD' | 'ARS' | 'EUR';
