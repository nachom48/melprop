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

    const getCardHeight = () => {
        return variant === 'XL' ? 'h-[500px]' : 'h-[400px]';
    };

    return (
        <div className={`slide ${getCardHeight()} ${className}`.trim()}>
            <div className="image relative overflow-hidden rounded-lg h-full">
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
            </div>

            {showAdditionalInfo && (
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm tracking-wide text-gray-600 font-jakarta">Posesión</p>
                        <p className="font-larken text-green-menu font-bold">
                            {development.posesion || 'Consultar'}
                        </p>
                    </div>
                    <div className="bg-green-highcontrast rounded-md p-2">
                        <p className="text-sm tracking-wide text-gray-600 font-jakarta">Desde</p>
                        <p className="font-larken text-green-text-dark font-bold">
                            {development.min_price ? `U$S ${development.min_price.toLocaleString()}` : 'Consultar'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevelopmentCard;
