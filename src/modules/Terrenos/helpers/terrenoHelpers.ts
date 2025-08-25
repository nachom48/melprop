import { Terreno } from '../interfaces/terreno.interface';
import { Property } from '../../Properties/interfaces/property.interface';

/**
 * Convierte un Terreno a Property para compatibilidad con componentes que esperan Property
 */
export function convertTerrenoToProperty(terreno: Terreno): Property {
    return {
        id: terreno.id,
        url: `/terreno/${terreno.slug}`,
        type: 'terreno',
        subtype: 'terreno',
        development_assigned: false,
        operation_type: terreno.operation_type,
        name: terreno.name,
        slug: terreno.slug,
        description: terreno.description,
        address: terreno.address,
        address_floor: terreno.address_floor || '',
        neighborhood: terreno.neighborhood,
        country: terreno.country,
        city: terreno.city,
        price: terreno.price,
        currency_symbol: terreno.currency_symbol,
        covered_m2: terreno.total_m2,
        uncovered_m2: 0,
        total_m2: terreno.total_m2,
        rooms: 0,
        bathrooms: 0,
        parking_lots: 0,
        status: terreno.status,
        substatus: 'activo',
        main_image: terreno.main_image,
        latitude: terreno.latitude,
        longitude: terreno.longitude,
        reference_code: terreno.reference_code || '',
        add_to_homepage: terreno.add_to_homepage,
        media: terreno.media,
        updated: terreno.updated
    };
}

/**
 * Convierte un array de Terrenos a Properties
 */
export function convertTerrenosToProperties(terrenos: Terreno[]): Property[] {
    return terrenos.map(convertTerrenoToProperty);
}
