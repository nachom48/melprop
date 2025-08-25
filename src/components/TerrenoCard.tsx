import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terreno } from '../modules/Terrenos/interfaces/terreno.interface';

interface TerrenoCardProps {
    terreno: Terreno;
    className?: string;
    showFavoriteButton?: boolean;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const TerrenoCard: React.FC<TerrenoCardProps> = ({
    terreno,
    className = "",
    showFavoriteButton = true,
    isFavorite: externalIsFavorite,
    onToggleFavorite
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        console.log('🏞️ Terreno clickeado:', terreno.name, 'Slug:', terreno.slug);
        navigate(`/terreno/${terreno.slug}`);
    };

    const formatPrice = (price: number, currency: string) => {
        if (currency === 'dolares') {
            return `U$S ${price.toLocaleString()}`;
        } else if (currency === 'euros') {
            return `€ ${price.toLocaleString()}`;
        } else {
            return `$ ${price.toLocaleString()}`;
        }
    };

    return (
        <div
            className={`hover:cursor-pointer border border-[#b7b7b7] rounded-3xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg ${className}`.trim()}
            onClick={handleCardClick}
        >
            <div className="image relative overflow-hidden rounded-tl-3xl rounded-tr-3xl">
                <img
                    className="w-full h-64 object-cover"
                    src={terreno.main_image || '/placeholder.jpg'}
                    alt={terreno.name || `Terreno en ${terreno.address}`}
                />
                {/* Badge de Terreno en la esquina superior izquierda */}
                <div className="absolute top-3 left-3">
                    <span className="bg-green-menu text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Terreno
                    </span>
                </div>
                {/* Badge de operación en la esquina superior derecha */}
                <div className="absolute top-3 right-3">
                    <span className="bg-white text-black text-xs px-2 py-1 rounded-full font-medium">
                        {terreno.operation_type === 'venta' ? 'Venta' : 'Alquiler'}
                    </span>
                </div>
            </div>
            <div className="content p-4">
                <div className="operation-badge text-green-menu text-sm font-semibold mb-2">
                    {terreno.operation_type === 'venta' ? 'Venta' : terreno.operation_type === 'alquiler' ? 'Alquiler' : terreno.operation_type} - {terreno.neighborhood}
                </div>
                <div className="price text-green-menu text-2xl font-bold mb-3 price-with-line">
                    {formatPrice(terreno.price, terreno.currency_symbol)}
                </div>
                <div className="address mb-3">
                    <strong className="block text-sm text-green-text font-semibold mb-1">
                        {terreno.name || terreno.address}
                    </strong>
                    <p className="text-sm text-green-text">
                        {terreno.neighborhood}, {terreno.city}
                    </p>
                </div>
                {/* Solo mostrar la superficie del terreno */}
                <ul className="features flex flex-wrap gap-2 text-xs">
                    {terreno.total_m2 && (
                        <li className="px-2 py-1">
                            {terreno.total_m2} m²
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TerrenoCard;
