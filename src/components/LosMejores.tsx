import React, { useState } from 'react';
import BestPropertyCard, { BestProperty } from './BestPropertyCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface LosMejoresProps {
    variant?: 'default' | 'reversed'; // Nueva prop para variantes
}

const LosMejores: React.FC<LosMejoresProps> = ({ variant = 'default' }) => {
    const [activeTab, setActiveTab] = useState(0);

    const bestProperties: BestProperty[] = [
        {
            id: 1,
            image: '/best_1.png',
            title: 'Sanchez de Bustamante 1745',
            neighborhood: 'Barrio Norte',
            roomsDescription: '1, 2, 3, y 4 ambientes',
            possessionDate: 'Enero 2024',
            priceFrom: 'U$S 88.920'
        },
        {
            id: 2,
            image: '/best_2.png',
            title: 'Mariano Acha 2002',
            neighborhood: 'Villa Úrquiza',
            roomsDescription: '1 y 2 ambientes',
            possessionDate: 'Mayo 2026',
            priceFrom: 'U$S 101.250'
        },
        {
            id: 3,
            image: '/best_3.png',
            title: 'Luis Maria Campos 346',
            neighborhood: 'Las Cañitas',
            roomsDescription: '1 y 2 ambientes',
            possessionDate: 'Octubre 2025',
            priceFrom: 'U$S 150.480'
        }
    ];

    // Determinar el layout según la variante
    const isReversed = variant === 'reversed';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`my-2 flex flex-col justify-between md:my-20 md:flex-row md:gap-20 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                {/* Panel izquierdo - Controles */}
                <div className={`flex basis-full flex-col justify-center md:basis-[250px] ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
                    <h2 className="!text-green-text mb-6 md:mb-8 text-2xl md:text-4xl font-larken">
                        {isReversed ? 'Los mejores emprendimientos' : 'Los mejores'}
                    </h2>
                    <div className="mb-6 md:mb-8">
                        <a href="#" className="text-light-green flex justify-between leading-4 font-jakarta hover:text-green-text-dark transition-colors text-sm md:text-base">
                            Encontralos en Mel <i className="fas fa-circle-chevron-right"></i>
                        </a>
                    </div>
                    <div className="mb-4 md:mb-6">
                        <div className="swiper-best-nav">
                            <div className="swiper-wrapper flex flex-row gap-2 md:gap-4 md:flex-col">
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long text-xs md:text-sm ${activeTab === 0
                                            ? 'btn-green'
                                            : 'btn-white'
                                            }`}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        En construcción
                                    </button>
                                </div>
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long text-xs md:text-sm ${activeTab === 1
                                            ? 'btn-green'
                                            : 'btn-white'
                                            }`}
                                        onClick={() => setActiveTab(1)}
                                    >
                                        Terminado
                                    </button>
                                </div>
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long text-xs md:text-sm ${activeTab === 2
                                            ? 'btn-green'
                                            : 'btn-white'
                                            }`}
                                        onClick={() => setActiveTab(2)}
                                    >
                                        En pozo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel derecho - Tarjetas */}
                <div className={`flex-1 ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="swiper-best !m-0">
                        <div className="swiper-wrapper flex flex-row gap-3 md:gap-8 overflow-x-auto md:overflow-visible">
                            {bestProperties.map((property, index) => (
                                <div key={property.id} className="swiper-slide flex-shrink-0 min-w-[282px] md:min-w-0">
                                    {/* Tarjeta de imagen con recuadros de Posesión y Desde */}
                                    <BestPropertyCard
                                        property={property}
                                        withBoxes={true}
                                        boxesOnTop={isReversed && index === 1} // Solo la tarjeta del medio (índice 1) cuando es reversed
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LosMejores; 