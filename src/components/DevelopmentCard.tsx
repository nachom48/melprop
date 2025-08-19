import React from 'react';
import './DevelopmentCard.css';

export interface Development {
    id: number;
    name: string;
    slug: string;
    neighborhood: string;
    address: string;
    main_image: string;
    rooms: any[];
    amenities: any[];
    external_url?: string;
    possession_date?: string;
    price_from?: string;
    stage?: string;
}

export interface DevelopmentCardProps {
    development: Development;
    variant: 'XL' | 'L';
    className?: string;
}

const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
    development,
    variant,
    className = ""
}) => {
    const formatRooms = (rooms: any[]) => {
        if (!rooms || rooms.length === 0) return '';
        const roomTypes = rooms.map(room => room.type).join(', ');
        return `${roomTypes} ambientes`;
    };

    if (variant === 'XL') {
        // Versión XL: Imagen completa como card con precio arriba y info abajo (como en la maqueta)
        return (
            <div className={`slide development-card-xl ${className}`.trim()}>
                <div className="image relative overflow-hidden rounded-lg">
                    <img
                        src={development.main_image}
                        alt={development.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Precio y "VENTA" en la parte superior izquierda */}
                    <div className="absolute top-4 left-4 text-white">
                        <p className="text-sm uppercase mb-1">VENTA -</p>
                        <p className="text-2xl font-bold text-green-600 mb-2">
                            {development.price_from || 'Consultar'}
                        </p>
                        <div className="w-16 h-1 bg-yellow-400"></div>
                    </div>

                    {/* Información del desarrollo en la parte inferior */}
                    <div className="absolute bottom-0 z-2 w-full">
                        <h3 className="marker relative left-[-3px]">
                            <span className="block px-5 pb-2 text-2xl leading-7 text-white font-bold font-larken">
                                {development.name}
                            </span>
                        </h3>
                        <div className="p-4">
                            <p className="text-green-fluo font-bold uppercase text-sm font-jakarta">
                                {development.neighborhood}
                            </p>
                            <p className="text-white text-sm font-jakarta">
                                {formatRooms(development.rooms)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Versión L: Imagen arriba, información abajo (estilo similar pero más compacto)
    return (
        <div className={`slide development-card-l ${className}`.trim()}>
            <div className="image relative overflow-hidden rounded-lg">
                <img
                    src={development.main_image}
                    alt={development.name}
                    className="w-full h-48 object-cover"
                />

                {/* Precio y "VENTA" en la parte superior izquierda */}
                <div className="absolute top-4 left-4 text-white">
                    <p className="text-sm uppercase mb-1">VENTA -</p>
                    <p className="text-xl font-bold text-green-600 mb-2">
                        {development.price_from || 'Consultar'}
                    </p>
                    <div className="w-12 h-1 bg-yellow-400"></div>
                </div>

                {/* Información del desarrollo en la parte inferior */}
                <div className="absolute bottom-0 z-2 w-full">
                    <h3 className="marker relative left-[-3px]">
                        <span className="block px-5 pb-2 text-xl leading-6 text-white font-bold font-larken">
                            {development.name}
                        </span>
                    </h3>
                    <div className="p-4">
                        <p className="text-green-fluo font-bold uppercase text-sm font-jakarta">
                            {development.neighborhood}
                        </p>
                        <p className="text-white text-sm font-jakarta">
                            {formatRooms(development.rooms)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopmentCard;
