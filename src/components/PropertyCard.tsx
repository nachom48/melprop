import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
//import '../styles/propertyCard.css';

export interface Property {
    url: string;
    id: number;
    type: string;
    subtype: string;
    development_assigned: boolean;
    operation_type: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    address_floor: string;
    neighborhood: string;
    country: string;
    currency_symbol: string;
    city: string;
    covered_m2: number | { source: string; parsedValue: number };
    uncovered_m2: number | { source: string; parsedValue: number };
    total_m2: number | { source: string; parsedValue: number };
    rooms: number;
    bathrooms: number;
    parking_lots: number;
    status: string;
    substatus: string;
    main_image: string;
    latitude: number | { source: string; parsedValue: number };
    longitude: number | { source: string; parsedValue: number };
    reference_code: string;
    add_to_homepage: boolean;
    media: {
        images: Array<{ url: string }>;
    };
    updated: string;
    price: number;
}

export interface PropertyCardProps {
    property: Property;
    className?: string;
    showFavoriteButton?: boolean;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    property,
    className = "",
    showFavoriteButton = true,
    isFavorite: externalIsFavorite,
    onToggleFavorite
}) => {
    const { isLoggedIn, favorites, addToFavorites, removeFromFavorites } = useUser();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Verificar si la propiedad está en favoritos
    useEffect(() => {
        if (externalIsFavorite !== undefined) {
            setIsFavorite(externalIsFavorite);
        } else if (favorites && favorites.length > 0) {
            const isInFavorites = favorites.some(fav => fav.id === property.id);
            setIsFavorite(isInFavorites);
        } else {
            setIsFavorite(false);
        }
    }, [favorites, property.id, externalIsFavorite]);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn) {
            alert('Debes iniciar sesión para agregar favoritos');
            return;
        }

        if (isLoading) return;

        setIsLoading(true);
        try {
            if (isFavorite) {
                // Remover de favoritos
                if (onToggleFavorite) {
                    onToggleFavorite();
                } else {
                    await removeFromFavorites(property.id);
                }
                setIsFavorite(false);
            } else {
                // Agregar a favoritos
                if (onToggleFavorite) {
                    onToggleFavorite();
                } else {
                    await addToFavorites(property.id);
                }
                setIsFavorite(true);
            }

            // Mostrar animación de éxito
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 600);
        } catch (error) {
            console.error('Error al manejar favoritos:', error);
            // Revertir el estado en caso de error
            setIsFavorite(!isFavorite);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`border-grey-border-light rounded-3xl border-1 overflow-hidden ${className}`.trim()}>
            <div className="image relative overflow-hidden rounded-tl-3xl rounded-tr-3xl">
                <img
                    className="w-full"
                    src={property.main_image || '/placeholder.jpg'}
                    alt={property.name || `Propiedad en ${property.address}`}
                />
                {showFavoriteButton && (
                    <button
                        className={`fav ${isLoading ? 'loading' : ''} ${isFavorite ? 'active' : ''} ${showSuccess ? 'success' : ''}`}
                        onClick={handleFavoriteClick}
                        disabled={isLoading}
                        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
                    </button>
                )}
            </div>
            <div className="content p-4">
                <div className="operation-badge text-green-menu text-sm font-semibold mb-2">
                    {property.operation_type} - {property.neighborhood}
                </div>
                <div className="price text-green-menu text-2xl font-bold mb-3">
                    {property.currency_symbol} {property.price ? property.price.toLocaleString() : 'Consultar'}
                </div>
                <div className="address mb-3">
                    <strong className="block text-sm font-semibold mb-1">
                        {property.name || property.address}
                    </strong>
                    <p className="text-sm text-gray-600">
                        {property.neighborhood}, {property.city}
                    </p>
                </div>
                <ul className="features flex flex-wrap gap-2 text-xs">
                    {property.total_m2 && <li className="bg-gray-100 px-2 py-1 rounded">
                        {typeof property.total_m2 === 'number' ? property.total_m2 : property.total_m2.parsedValue} m²
                    </li>}
                    {property.rooms && <li className="bg-gray-100 px-2 py-1 rounded">{property.rooms} Ambientes</li>}
                    {property.bathrooms && <li className="bg-gray-100 px-2 py-1 rounded">{property.bathrooms} Baños</li>}
                    {property.parking_lots > 0 && <li className="bg-gray-100 px-2 py-1 rounded">{property.parking_lots} Cochera</li>}
                </ul>
            </div>
        </div>
    );
};

export default PropertyCard;