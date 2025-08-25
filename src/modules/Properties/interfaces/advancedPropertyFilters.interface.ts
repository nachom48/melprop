export interface AdvancedPropertyFilters {
    // Filtros básicos
    type?: string; // tipo de propiedad (departamento, casa, etc.)
    operation?: string; // operación (venta, alquiler, etc.)
    locations?: string; // barrios separados por coma
    currency?: string; // moneda
    min_price?: number; // precio mínimo
    max_price?: number; // precio máximo

    // Filtros de habitaciones y baños
    rooms?: string; // habitaciones separadas por coma (ej: "1,2,3,+4")
    min_bathrooms?: number; // baños mínimos
    max_bathrooms?: number; // baños máximos

    // Filtros de estacionamiento
    min_parking_lots?: number; // cocheras mínimas
    max_parking_lots?: number; // cocheras máximas
    parking?: boolean; // si tiene cochera (true = al menos 1)

    // Filtros de metros cuadrados
    m2?: string; // rango de m2 cubiertos (ej: "50-100")
    min_covered_m2?: number; // m2 cubiertos mínimos
    max_covered_m2?: number; // m2 cubiertos máximos
    min_uncovered_m2?: number; // m2 descubiertos mínimos
    max_uncovered_m2?: number; // m2 descubiertos máximos

    // Filtros de orientación y edad
    orientation?: string; // orientación separada por coma
    age?: string; // rango de edad (ej: "0-10")

    // Filtros de balcón
    balcon?: boolean; // si tiene balcón

    // Filtros de amenities
    amenities?: string; // amenities separados por coma (slugs)

    // Filtros de etapa del desarrollo
    stage?: string; // etapa del desarrollo (En construcción, Terminado, En pozo)
    development__stage?: string; // etapa del desarrollo a través de la relación development

    // Filtros de ubicación
    lat_lng?: string; // coordenadas lat,lng para búsqueda por radio

    // Filtros especiales
    home?: boolean; // propiedades destacadas en homepage (backend filtra por add_to_homepage=True)
    guard?: boolean; // propiedades con guardia
    properties?: string; // tipos especiales (ph, emprendimientos)
    development_assigned?: boolean; // propiedades que tengan desarrollo asignado

    // Ordenamiento
    order_by?: 'menorPrecio' | 'mayorPrecio' | 'masAmplio';

    // Paginación
    page?: number;
    limit?: number;

    // Sin paginación (para obtener todas las propiedades)
    no_pagination?: boolean;
}
