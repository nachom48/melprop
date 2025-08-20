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
    withBoxes?: boolean; // Nuevo prop para mostrar/ocultar los recuadros
    boxesOnTop?: boolean; // Nuevo prop para mostrar los recuadros por encima de la imagen
}

const BestPropertyCard: React.FC<BestPropertyCardProps> = ({ property, className = "", withBoxes = false, boxesOnTop = false }) => {
    return (
        <div className={`w-full h-full flex flex-col ${className}`}>
            {/* Recuadros de Posesión y Desde por encima de la imagen - Solo si withBoxes y boxesOnTop son true */}
            {withBoxes && boxesOnTop && (
                <div className="mb-3 md:mb-4 flex items-center justify-between px-2 md:px-0 flex-shrink-0 z-20 relative">
                    <div>
                        <p className="text-xs md:text-sm tracking-wide text-gray-600 font-jakarta">Posesión</p>
                        <p className="font-larken text-green-menu font-bold text-sm md:text-base">
                            {property.possessionDate}
                        </p>
                    </div>
                    <div className="bg-green-highcontrast rounded-md p-2">
                        <p className="text-xs md:text-sm tracking-wide text-gray-600 font-jakarta">Desde</p>
                        <p className="font-larken text-green-text-dark font-bold text-sm md:text-base">
                            {property.priceFrom}
                        </p>
                    </div>
                </div>
            )}

            {/* Imagen con altura flexible para ocupar el espacio disponible */}
            <div className="relative overflow-hidden rounded-lg flex-1 min-h-0">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <h3 className="relative">
                        <span className="block px-5 pb-2 text-lg md:text-2xl leading-7 text-white font-bold font-larken">
                            {property.title}
                        </span>
                        {/* Línea naranja debajo de la dirección */}
                        <div className="w-[10%] h-1 bg-orange-400 rounded-sm ml-5 mb-2"></div>
                    </h3>
                    <div className="p-3 md:p-4">
                        <p className="text-green-fluo font-bold uppercase text-xs md:text-sm font-jakarta">
                            {property.neighborhood}
                        </p>
                        <p className="text-white text-xs md:text-sm font-jakarta">
                            {property.roomsDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recuadros de Posesión y Desde por debajo de la imagen - Solo si withBoxes es true y boxesOnTop es false */}
            {withBoxes && !boxesOnTop && (
                <div className="mt-3 md:mt-4 flex items-center justify-between px-2 md:px-0 flex-shrink-0">
                    <div>
                        <p className="text-xs md:text-sm tracking-wide text-gray-600 font-jakarta">Posesión</p>
                        <p className="font-larken text-green-menu font-bold text-sm md:text-base">
                            {property.possessionDate}
                        </p>
                    </div>
                    <div className="bg-green-highcontrast rounded-md p-2">
                        <p className="text-xs md:text-sm tracking-wide text-gray-600 font-jakarta">Desde</p>
                        <p className="font-larken text-green-text-dark font-bold text-sm md:text-base">
                            {property.priceFrom}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BestPropertyCard;
