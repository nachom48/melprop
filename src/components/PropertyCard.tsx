import React from 'react';
import '../styles/propertyCard.css';

export interface Property {
    id: number;
    image?: string;
    type?: string;
    price: string;
    address: string;
    location?: string;
    area: number;
    rooms: number;
    bathrooms: number;
    garage?: number;
    title?: string;
    main_image?: string;
    operation_type?: "Venta" | "Alquiler";
    neighborhood?: string;
    parking?: number;
}

export interface PropertyCardProps {
    property: Property;
    className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = "" }) => {
    return (
        <div className={`border-grey-border-light rounded-3xl border-1 overflow-hidden ${className}`.trim()}>
            <div className="image relative overflow-hidden rounded-tl-3xl rounded-tr-3xl">
                <img
                    className="w-full"
                    src={property.main_image || property.image || '/placeholder.jpg'}
                    alt={property.title || `${property.type || 'Propiedad'} en ${property.address}`}
                />
                <button
                    className="fav"
                    onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implementar lógica de favoritos
                    }}
                    style={{
                        color: 'var(--color-green-text)'
                    }}
                >
                    <i className="far fa-heart"></i>
                </button>
            </div>
            <div className="p-4">
                <span className="text-green-text-dark text-sm">
                    {property.operation_type || property.type || 'Venta'}
                </span>
                <h3 className="text-2xl marker mb-3" style={{
                    fontFamily: 'var(--font-larken)',
                    color: 'var(--color-green-menu)',
                    fontStyle: 'normal',
                    fontWeight: 700
                }}>{property.price}</h3>
                <div className="mb-3">
                    <strong style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontOpticalSizing: 'auto',
                        color: 'var(--color-green-text)',
                        fontStyle: 'normal',
                        fontWeight: 400
                    }}>{property.address}</strong>
                    <p className="text-sm" style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontOpticalSizing: 'auto',
                        color: 'var(--color-green-text)',
                        fontStyle: 'normal',
                        fontWeight: 400
                    }}>{property.neighborhood || property.location}</p>
                </div>
                <ul className="text-xxs flex flex-wrap gap-2">
                    <li style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontOpticalSizing: 'auto',
                        color: 'var(--color-green-text)',
                        fontStyle: 'normal',
                        fontWeight: 400
                    }}>{property.area} m<sup>2</sup></li>
                    <li style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontOpticalSizing: 'auto',
                        color: 'var(--color-green-text)',
                        fontStyle: 'normal',
                        fontWeight: 400
                    }}>{property.rooms} Ambientes</li>
                    <li style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontOpticalSizing: 'auto',
                        color: 'var(--color-green-text)',
                        fontStyle: 'normal',
                        fontWeight: 400
                    }}>{property.bathrooms} Baños</li>
                    {(property.garage || property.parking) &&
                        <li style={{
                            fontFamily: 'var(--font-jakarta)',
                            fontOpticalSizing: 'auto',
                            color: 'var(--color-green-text)',
                            fontStyle: 'normal',
                            fontWeight: 400
                        }}>{property.garage || property.parking} Cochera</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default PropertyCard;