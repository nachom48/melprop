import React from 'react';
import { Development } from '../repositories/developmentRepository';
import './DevelopmentCard.css';

export interface DevelopmentCardProps {
    development: Development;
    variant?: 'L' | 'XL';
    showAdditionalInfo?: boolean;
    className?: string;
}

const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
    development,
    variant = 'L',
    showAdditionalInfo = false,
    className = ""
}) => {
    const formatRooms = (rooms: number[]) => {
        if (!rooms || rooms.length === 0) return '';
        if (rooms.length > 1) {
            const lastRoom = rooms[rooms.length - 1];
            const otherRooms = rooms.slice(0, -1);
            return `${otherRooms.join(', ')} y ${lastRoom} ambientes`;
        }
        return `${rooms[0]} ambiente${rooms[0] !== 1 ? 's' : ''}`;
    };

    const renderAmenitiesIcons = () => {
        if (variant !== 'XL' || !development.amenities || development.amenities.length === 0) {
            return null;
        }

        return (
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[120px] justify-end">
                {development.amenities.slice(0, 6).map((amenity) => (
                    <div
                        key={amenity.id}
                        className="w-10 h-10 bg-green-text-dark rounded-md flex items-center justify-center shadow-lg"
                        title={amenity.name}
                    >
                        <img
                            src={amenity.image.url}
                            alt={amenity.name}
                            className="w-8 h-8 object-contain filter brightness-0 invert"
                        />
                    </div>
                ))}
            </div>
        );
    };

    if (variant === 'XL') {
        return (
            <div className={`slide ${className}`.trim()}>
                <div className="relative overflow-hidden rounded-lg h-full">
                    <img
                        className="w-full h-full object-cover"
                        src={development.main_image}
                        alt={development.name}
                    />

                    {/* Overlay oscuro para mejor contraste */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Iconos de amenities en la esquina superior derecha */}
                    {renderAmenitiesIcons()}

                    {/* Contenido superior */}
                    <div className="absolute top-0 p-8">
                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white font-larken">
                            {development.name}
                        </h3>
                        <h4 className="text-green-fluo font-bold uppercase font-jakarta">
                            {development.neighborhood}
                        </h4>
                        <div className="text-white font-jakarta">
                            {formatRooms(development.rooms)}
                        </div>
                    </div>

                    {/* Contenido inferior */}
                    <div className="absolute bottom-0 p-8">
                        <div className="text-white font-jakarta">Desde</div>
                        <h3 className="!text-green-fluo text-4xl font-larken font-bold">
                            {development.min_price ? `U$S ${development.min_price.toLocaleString()}` : 'Consultar'}
                        </h3>
                        <div className="mt-4 flex gap-4">
                            <div>
                                <div className="text-white font-jakarta">Estado</div>
                                <h4 className="text-warning uppercase font-jakarta font-bold">
                                    {development.status || 'Consultar'}
                                </h4>
                            </div>
                            <div>
                                <div className="text-white font-jakarta">Posesión</div>
                                <h4 className="text-warning uppercase font-jakarta font-bold">
                                    {development.posesion || 'Consultar'}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variante L (mantiene el diseño original pero con estructura unificada)
    return (
        <div className={`slide ${className}`.trim()}>
            <div className="relative overflow-hidden rounded-lg h-full">
                <img
                    src={development.main_image}
                    alt={development.name}
                    className="w-full h-full object-cover"
                />
                {/* Overlay oscuro para mejor contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 z-2">
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

                {/* Información adicional integrada en la imagen para L */}
                {showAdditionalInfo && (
                    <div className="absolute top-0 right-0 p-4">
                        <div className="bg-green-highcontrast/90 rounded-md p-3 backdrop-blur-sm">
                            <div className="text-right">
                                <p className="text-xs text-gray-600 font-jakarta">Posesión</p>
                                <p className="font-larken text-green-menu font-bold text-sm">
                                    {development.posesion || 'Consultar'}
                                </p>
                            </div>
                            <div className="mt-2 text-right">
                                <p className="text-xs text-gray-600 font-jakarta">Desde</p>
                                <p className="font-larken text-green-text-dark font-bold text-sm">
                                    {development.min_price ? `U$S ${development.min_price.toLocaleString()}` : 'Consultar'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevelopmentCard;
