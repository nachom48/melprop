import React from 'react';

export interface BestProperty {
    id: number;
    image: string;
    title: string;
    neighborhood: string;
    roomsDescription: string;
    possessionDate: string;
    priceFrom: string;
}

export interface BestPropertyCardProps {
    property: BestProperty;
    className?: string;
}

const BestPropertyCard: React.FC<BestPropertyCardProps> = ({ property, className = "" }) => {
    return (
        <div className={`slide ${className}`.trim()}>
            <div className="image relative overflow-hidden rounded-lg">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 z-2">
                    <h3 className="marker relative left-[-3px]">
                        <span className="block px-5 pb-2 text-2xl leading-7 text-white font-bold font-larken">
                            {property.title}
                        </span>
                    </h3>
                    <div className="p-4">
                        <p className="text-green-fluo font-bold uppercase text-sm font-jakarta">
                            {property.neighborhood}
                        </p>
                        <p className="text-white text-sm font-jakarta">
                            {property.roomsDescription}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <p className="text-sm tracking-wide text-gray-600 font-jakarta">Posesión</p>
                    <p className="font-larken text-green-menu font-bold">
                        {property.possessionDate}
                    </p>
                </div>
                <div className="bg-green-highcontrast rounded-md p-2">
                    <p className="text-sm tracking-wide text-gray-600 font-jakarta">Desde</p>
                    <p className="font-larken text-green-text-dark font-bold">
                        {property.priceFrom}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BestPropertyCard;
