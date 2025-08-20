import React, { useState } from 'react';
import DevelopmentCard from './DevelopmentCard';

// Interfaz local para los datos de ejemplo
interface BestDevelopment {
    id: number;
    main_image: string;
    name: string;
    neighborhood: string;
    rooms: number[];
    posesion?: string;
    min_price?: number;
}

const BestDevelopments: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    // Ejemplo de datos de emprendimientos (esto vendría de tu API)
    const bestDevelopments: BestDevelopment[] = [
        {
            id: 1,
            main_image: '/best_1.png',
            name: 'Sanchez de Bustamante 1745',
            neighborhood: 'Barrio Norte',
            rooms: [1, 2, 3, 4],
            posesion: 'Enero 2024',
            min_price: 88920
        },
        {
            id: 2,
            main_image: '/best_2.png',
            name: 'Mariano Acha 2002',
            neighborhood: 'Villa Úrquiza',
            rooms: [1, 2],
            posesion: 'Mayo 2026',
            min_price: 101250
        },
        {
            id: 3,
            main_image: '/best_3.png',
            name: 'Luis Maria Campos 346',
            neighborhood: 'Las Cañitas',
            rooms: [1, 2],
            posesion: 'Octubre 2025',
            min_price: 150480
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="my-2 flex flex-col justify-between md:my-20 md:flex-row md:gap-20">
                <div className="flex basis-full flex-col justify-center md:basis-[250px]">
                    <h2 className="!text-green-text mb-8 text-4xl font-larken">Los mejores emprendimientos</h2>
                    <div className="mb-8">
                        <a href="#" className="text-light-green flex justify-between leading-4 font-jakarta hover:text-green-text-dark transition-colors">
                            Encontralos en Mel <i className="fas fa-circle-chevron-right"></i>
                        </a>
                    </div>
                    <div className="mb-6">
                        <div className="swiper-best-nav">
                            <div className="swiper-wrapper flex flex-row gap-4 md:flex-col">
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long ${activeTab === 0
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
                                        className={`btn btn-long ${activeTab === 1
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
                                        className={`btn btn-long ${activeTab === 2
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

                <div className="flex-1">
                    <div className="swiper-best !m-0">
                        <div className="swiper-wrapper flex flex-row gap-4 md:gap-8 overflow-x-auto md:overflow-visible">
                            {bestDevelopments.map((development) => (
                                <div key={development.id} className="swiper-slide flex-shrink-0 min-w-[280px] md:min-w-0">
                                    <DevelopmentCard
                                        development={{
                                            id: development.id,
                                            main_image: development.main_image,
                                            name: development.name,
                                            neighborhood: development.neighborhood,
                                            rooms: development.rooms,
                                            posesion: development.posesion,
                                            min_price: development.min_price
                                        } as any}
                                        showAdditionalInfo={true} // Mostrar posesión y precio
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

export default BestDevelopments;
