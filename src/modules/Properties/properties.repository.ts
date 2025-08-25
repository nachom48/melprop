import { apiClient } from '../../config/axios.config';
import { PropertySearchFilters } from './interfaces/propertiesSearchFilters.interface';
import { PropertiesResponse } from './interfaces/propertiesResponse.interface';
import { Property, PropertyDetailResponse } from './interfaces/property.interface';
import { AdvancedPropertyFilters } from './interfaces/advancedPropertyFilters.interface';

export namespace PropertiesRepository {
    export async function getAllProperties(filters: PropertySearchFilters): Promise<PropertiesResponse> {
        try {
            console.log('📡 Repository - Filtros enviados al backend:', filters);
            console.log('📡 Repository - Ordenamiento:', filters.order_by);

            const response = await apiClient.get('/properties/', {
                params: filters
            });

            console.log('📡 Repository - URL de la petición:', response.config.url);
            console.log('📡 Repository - Parámetros de la petición:', response.config.params);

            return response.data as PropertiesResponse;
        } catch (error: any) {
            console.error('Error fetching properties:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedades');
        }
    }

    export async function getPropertyById(id: number): Promise<Property> {
        try {
            const response = await apiClient.get(`/properties/${id}/`);
            // Aseguramos que el tipo de dato retornado sea Property
            return response.data as Property;
        } catch (error: any) {
            console.error('Error fetching property:', error);
            throw new Error(error.response?.data?.message || 'Error obteniendo propiedad');
        }
    }

    export async function getPropertyBySlug(slug: string): Promise<PropertyDetailResponse> {
        try {
            console.log('🔍 Repository - Buscando propiedad con slug:', slug);

            // Primero obtenemos la lista de propiedades para encontrar la que tiene el slug
            const propertiesResponse = await apiClient.get('/properties/', {
                params: { no_pagination: true }
            });

            // Buscamos la propiedad por slug
            const propertiesData = propertiesResponse.data as { objects: Property[] };
            const property = propertiesData.objects.find((prop: Property) => prop.slug === slug);

            if (!property) {
                throw new Error(`Propiedad con slug "${slug}" no encontrada`);
            }

            console.log('✅ Repository - Propiedad encontrada en la lista:', property);

            // Ahora hacemos un GET directo a la URL de la propiedad para obtener el detalle completo
            if (property.url) {
                console.log('🔍 Repository - Obteniendo detalle completo desde:', property.url);

                // Hacemos la petición directamente a la URL de la propiedad
                const detailResponse = await apiClient.get(property.url);

                console.log('✅ Repository - Detalle completo obtenido exitosamente');
                return detailResponse.data as PropertyDetailResponse;
            } else {
                // Si no tiene URL, devolvemos la propiedad de la lista
                console.log('⚠️ Repository - La propiedad no tiene URL, devolviendo datos de la lista');
                return property as PropertyDetailResponse;
            }

        } catch (error: any) {
            console.error('❌ Repository - Error al obtener propiedad por slug:', error);

            if (error.message.includes('no encontrada')) {
                throw error;
            } else {
                throw new Error(`Error obteniendo propiedad: ${error.message}`);
            }
        }
    }

    // Método alternativo: obtener propiedad por ID si ya tenemos la propiedad básica
    export async function getPropertyDetail(property: Property): Promise<PropertyDetailResponse> {
        try {
            if (!property.url) {
                console.log('⚠️ Repository - La propiedad no tiene URL, devolviendo datos básicos');
                return property as PropertyDetailResponse;
            }

            console.log('🔍 Repository - Obteniendo detalle completo desde:', property.url);

            // Hacemos la petición directamente a la URL de la propiedad
            const detailResponse = await apiClient.get(property.url);

            console.log('✅ Repository - Detalle completo obtenido exitosamente');
            return detailResponse.data as PropertyDetailResponse;

        } catch (error: any) {
            console.error('❌ Repository - Error al obtener detalle de la propiedad:', error);
            console.log('⚠️ Repository - Devolviendo datos básicos de la propiedad');
            return property as PropertyDetailResponse; // Devolvemos la propiedad básica si falla el detalle
        }
    }

    /**
     * Búsqueda avanzada de propiedades con múltiples filtros
     * Utiliza el endpoint /api/properties/ con filtros avanzados del backend
     */
    export async function searchPropertiesAdvanced(filters: AdvancedPropertyFilters): Promise<PropertiesResponse> {
        try {
            console.log('🔍 Repository - Búsqueda avanzada con filtros:', filters);

            // Convertir los filtros al formato esperado por el backend
            const backendFilters: any = {};

            // Mapear filtros básicos
            if (filters.type) backendFilters.type = filters.type;
            if (filters.operation) backendFilters.operation = filters.operation;
            if (filters.locations) backendFilters.locations = filters.locations;
            if (filters.currency) backendFilters.currency = filters.currency;
            if (filters.min_price) backendFilters.min_price = filters.min_price;
            if (filters.max_price) backendFilters.max_price = filters.max_price;

            // Mapear filtros de habitaciones y baños
            if (filters.rooms) backendFilters.rooms = filters.rooms;
            if (filters.min_bathrooms) backendFilters.min_bathrooms = filters.min_bathrooms;
            if (filters.max_bathrooms) backendFilters.max_bathrooms = filters.max_bathrooms;

            // Mapear filtros de estacionamiento
            if (filters.min_parking_lots) backendFilters.min_parking_lots = filters.min_parking_lots;
            if (filters.max_parking_lots) backendFilters.max_parking_lots = filters.max_parking_lots;
            if (filters.parking) backendFilters.parking = filters.parking;

            // Mapear filtros de metros cuadrados
            if (filters.m2) backendFilters.m2 = filters.m2;
            if (filters.min_covered_m2) backendFilters.min_covered_m2 = filters.min_covered_m2;
            if (filters.max_covered_m2) backendFilters.max_covered_m2 = filters.max_covered_m2;
            if (filters.min_uncovered_m2) backendFilters.min_uncovered_m2 = filters.min_uncovered_m2;
            if (filters.max_uncovered_m2) backendFilters.max_uncovered_m2 = filters.max_uncovered_m2;

            // Mapear filtros de orientación y edad
            if (filters.orientation) backendFilters.orientation = filters.orientation;
            if (filters.age) backendFilters.age = filters.age;

            // Mapear filtros de balcón
            if (filters.balcon) backendFilters.balcon = filters.balcon;

            // Mapear filtros de amenities
            if (filters.amenities) backendFilters.amenities = filters.amenities;

            // Mapear filtros de etapa del desarrollo
            if (filters.stage) backendFilters.stage = filters.stage;
            if (filters.development__stage) backendFilters.development__stage = filters.development__stage;

            // Mapear filtros de ubicación
            if (filters.lat_lng) backendFilters.lat_lng = filters.lat_lng;

            // Mapear filtros especiales
            if (filters.home) backendFilters.home = filters.home; // Backend espera 'home' pero filtra por add_to_homepage
            if (filters.guard) backendFilters.guard = filters.guard;
            if (filters.properties) backendFilters.properties = filters.properties;
            if (filters.development_assigned) backendFilters.development_assigned = filters.development_assigned;

            // Mapear ordenamiento
            if (filters.order_by) backendFilters.order_by = filters.order_by;

            // Mapear paginación
            if (filters.page) backendFilters.page = filters.page;
            if (filters.page) backendFilters.page = filters.page;
            if (filters.limit) backendFilters.limit = filters.limit;
            if (filters.no_pagination) backendFilters.no_pagination = filters.no_pagination;

            console.log('📡 Repository - Filtros enviados al backend:', backendFilters);

            const response = await apiClient.get('/properties/', {
                params: backendFilters
            });

            console.log('✅ Repository - Búsqueda avanzada exitosa');
            return response.data as PropertiesResponse;

        } catch (error: any) {
            console.error('❌ Repository - Error en búsqueda avanzada:', error);
            throw new Error(error.response?.data?.message || 'Error en búsqueda avanzada de propiedades');
        }
    }

    /**
     * Buscar propiedades que tengan ciertas características específicas
     * Método de conveniencia para búsquedas comunes
     */
    export async function searchPropertiesByFeatures(features: {
        hasBalcony?: boolean;
        hasParking?: boolean;
        hasAmenities?: string[];
        minRooms?: number;
        maxRooms?: number;
        minBathrooms?: number;
        maxBathrooms?: number;
        minPrice?: number;
        maxPrice?: number;
        minM2?: number;
        maxM2?: number;
        orientation?: string[];
        age?: { min?: number; max?: number };
        type?: string[];
        operation?: string[];
        neighborhoods?: string[];
        no_pagination?: boolean;
    }): Promise<PropertiesResponse> {
        try {
            console.log('🔍 Repository - Búsqueda por características:', features);

            const filters: AdvancedPropertyFilters = {};

            // Mapear características a filtros
            if (features.hasBalcony) filters.balcon = true;
            if (features.hasParking) filters.parking = true;
            if (features.hasAmenities && features.hasAmenities.length > 0) {
                filters.amenities = features.hasAmenities.join(',');
            }
            if (features.minRooms && features.maxRooms) {
                const rooms = [];
                for (let i = features.minRooms; i <= features.maxRooms; i++) {
                    rooms.push(i.toString());
                }
                filters.rooms = rooms.join(',');
            } else if (features.minRooms) {
                filters.rooms = `${features.minRooms},+${features.minRooms + 1}`;
            } else if (features.maxRooms) {
                const rooms = [];
                for (let i = 1; i <= features.maxRooms; i++) {
                    rooms.push(i.toString());
                }
                filters.rooms = rooms.join(',');
            }

            if (features.minBathrooms) filters.min_bathrooms = features.minBathrooms;
            if (features.maxBathrooms) filters.max_bathrooms = features.maxBathrooms;
            if (features.minPrice) filters.min_price = features.minPrice;
            if (features.maxPrice) filters.max_price = features.maxPrice;
            if (features.minM2) filters.min_covered_m2 = features.minM2;
            if (features.maxM2) filters.max_covered_m2 = features.maxM2;
            if (features.orientation && features.orientation.length > 0) {
                filters.orientation = features.orientation.join(',');
            }
            if (features.age) {
                if (features.age.min !== undefined && features.age.max !== undefined) {
                    filters.age = `${features.age.min}-${features.age.max}`;
                } else if (features.age.min !== undefined) {
                    filters.age = `${features.age.min}-`;
                } else if (features.age.max !== undefined) {
                    filters.age = `-${features.age.max}`;
                }
            }
            if (features.type && features.type.length > 0) {
                filters.type = features.type.join(',');
            }
            if (features.operation && features.operation.length > 0) {
                filters.operation = features.operation.join(',');
            }
            if (features.neighborhoods && features.neighborhoods.length > 0) {
                filters.locations = features.neighborhoods.join(',');
            }
            if (features.no_pagination) filters.no_pagination = true;

            console.log('🔍 Repository - Filtros generados:', filters);

            // Usar el método de búsqueda avanzada
            return await searchPropertiesAdvanced(filters);

        } catch (error: any) {
            console.error('❌ Repository - Error en búsqueda por características:', error);
            throw new Error(error.response?.data?.message || 'Error en búsqueda por características');
        }
    }
}
