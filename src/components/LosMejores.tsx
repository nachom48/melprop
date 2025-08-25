import React, { useState, useEffect } from 'react';
import BestPropertyCard, { BestProperty } from './BestPropertyCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { DevelopmentService } from '../modules/Developments/development.service';
import { Development } from '../modules/Developments/interfaces/development.interface';

interface LosMejoresProps {
    variant?: 'default' | 'reversed'; // Nueva prop para variantes
}

const LosMejores: React.FC<LosMejoresProps> = ({ variant = 'default' }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [bestProperties, setBestProperties] = useState<BestProperty[]>([]);
    const [allDevelopmentsByStage, setAllDevelopmentsByStage] = useState<{
        'En Pozo': BestProperty[];
        'En Construcción': BestProperty[];
        'Finalizado': BestProperty[];
    }>({
        'En Pozo': [],
        'En Construcción': [],
        'Finalizado': []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para convertir Development a BestProperty
    const convertDevelopmentToBestProperty = (development: Development): BestProperty => {
        // Obtener fecha de posesión del desarrollo
        let possessionDate = 'Consultar';
        if (development.posesion) {
            possessionDate = development.posesion;
        } else if (development.stage) {
            possessionDate = development.stage;
        }

        // Obtener descripción de habitaciones
        let roomsDescription = 'Consultar';
        if (development.rooms && development.rooms.length > 0) {
            if (development.rooms.length === 1) {
                roomsDescription = `${development.rooms[0]} ambiente`;
            } else {
                const minRooms = Math.min(...development.rooms);
                const maxRooms = Math.max(...development.rooms);
                roomsDescription = `${minRooms}-${maxRooms} ambientes`;
            }
        }

        // Manejar el caso donde min_price puede ser undefined
        let priceFrom = 'Consultar';
        if (development.min_price && development.min_price > 0) {
            priceFrom = `${development.currency_symbol || 'U$S'} ${development.min_price.toLocaleString()}`;
        }

        return {
            id: development.id,
            image: development.main_image,
            title: development.name,
            neighborhood: development.neighborhood,
            roomsDescription: roomsDescription,
            possessionDate: possessionDate,
            priceFrom: priceFrom,
            slug: development.slug
        };
    };

    // Función para obtener los mejores developments de cada etapa desde el backend
    const fetchBestDevelopments = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener los mejores developments de cada etapa
            const developmentsByStage = await DevelopmentService.getBestDevelopmentsByStages();

            console.log('🏗️ Developments obtenidos por etapa:', developmentsByStage);

            // Convertir developments a BestProperty y guardarlos organizados por etapa
            const convertedDevelopmentsByStage: any = {};
            Object.keys(developmentsByStage).forEach(stage => {
                const developments = developmentsByStage[stage as keyof typeof developmentsByStage];
                console.log(`🏗️ Convirtiendo etapa "${stage}":`, developments.length, 'developments');
                console.log(`🏗️ Detalles de la etapa "${stage}":`, developments);
                convertedDevelopmentsByStage[stage] = developments.map(convertDevelopmentToBestProperty);
                console.log(`✅ Etapa "${stage}" convertida:`, convertedDevelopmentsByStage[stage].length, 'BestProperty');
            });

            // Guardar todos los developments convertidos organizados por etapa
            setAllDevelopmentsByStage(convertedDevelopmentsByStage);

            // Mostrar por defecto los developments de "En Pozo" (tab 0)
            setBestProperties(convertedDevelopmentsByStage['En Pozo'] || []);

            console.log('✅ Todos los developments por etapa cargados:', developmentsByStage);

        } catch (err: any) {
            console.error('❌ Error general obteniendo developments:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para cambiar entre etapas
    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);

        // Mapear el índice del tab a la etapa correspondiente
        const stages = ['En Pozo', 'En Construcción', 'Finalizado'];
        const selectedStage = stages[tabIndex];

        // Cambiar los developments mostrados según la etapa seleccionada
        setBestProperties(allDevelopmentsByStage[selectedStage as keyof typeof allDevelopmentsByStage] || []);

        console.log(`🔄 Cambiando a etapa: ${selectedStage}`, allDevelopmentsByStage[selectedStage as keyof typeof allDevelopmentsByStage]);
    };

    // Cargar developments al montar el componente
    useEffect(() => {
        fetchBestDevelopments();
    }, []);

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
                                        onClick={() => handleTabChange(0)}
                                    >
                                        En Pozo
                                    </button>
                                </div>
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long text-xs md:text-sm ${activeTab === 1
                                            ? 'btn-green'
                                            : 'btn-white'
                                            }`}
                                        onClick={() => handleTabChange(1)}
                                    >
                                        En Construcción
                                    </button>
                                </div>
                                <div className="swiper-slide">
                                    <button
                                        className={`btn btn-long text-xs md:text-sm ${activeTab === 2
                                            ? 'btn-green'
                                            : 'btn-white'
                                            }`}
                                        onClick={() => handleTabChange(2)}
                                    >
                                        Finalizado
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel derecho - Tarjetas */}
                <div className={`flex-1 ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="swiper-best !m-0">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-menu mx-auto mb-4"></div>
                                    <p className="text-green-text">Cargando mejores emprendimientos por etapa...</p>
                                    <p className="text-green-text text-sm mt-2">Buscando los más destacados de cada categoría</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-red-500 mb-2">Error al cargar emprendimientos</p>
                                    <p className="text-gray-600 text-sm">{error}</p>
                                    <button
                                        onClick={fetchBestDevelopments}
                                        className="mt-4 px-4 py-2 bg-green-menu text-white rounded hover:bg-green-700 transition-colors"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            </div>
                        ) : bestProperties.length === 0 ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-gray-500">No hay emprendimientos destacados disponibles</p>
                                </div>
                            </div>
                        ) : (
                            <div className="swiper-wrapper flex flex-row gap-3 md:gap-8 overflow-x-auto md:overflow-visible">
                                {bestProperties.map((property, index) => (
                                    <div key={property.id} className="swiper-slide flex-shrink-0 min-w-[282px] md:min-w-0 h-[400px] md:h-[450px]">
                                        {/* Tarjeta de emprendimiento con recuadros de Posesión y Desde */}
                                        <BestPropertyCard
                                            property={property}
                                            withBoxes={true}
                                            boxesOnTop={isReversed && index === 1} // Solo la tarjeta del medio (índice 1) cuando es reversed
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LosMejores; 