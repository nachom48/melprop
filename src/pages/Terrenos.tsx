import React, { useState } from 'react';
import { Terreno } from '../types/terreno';
import { mockTerrenosResponse } from '../data/mockTerrenos';
import PropertyCard from '../components/PropertyCard';
import SearchFilters, { FilterValues } from '../components/SearchFilters';

const Terrenos: React.FC = () => {
    const [terrenos] = useState<Terreno[]>(mockTerrenosResponse.results);
    const [filters, setFilters] = useState<FilterValues>({
        location: '',
        operation: '',
        propertyType: '',
        rooms: '',
        price: '',
        additionalFilters: []
    });

    const formatPrice = (price: number, currency: string) => {
        return `${currency} ${price.toLocaleString()}`;
    };

    const handleFiltersChange = (newFilters: FilterValues) => {
        setFilters(newFilters);
        console.log('Filtros actualizados:', newFilters);
        // Aquí puedes implementar la lógica de filtrado
    };

    const toggleFavorite = (id: string) => {
        // Aquí se implementaría la lógica para marcar/desmarcar favoritos
        console.log('Toggle favorite:', id);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Componente de filtros reutilizable */}
            <SearchFilters
                onFiltersChange={handleFiltersChange}
                resultsCount={mockTerrenosResponse.count}
                resultsText="Terrenos en Oportunidad"
            />

            {/* Sección de oportunidades destacadas */}
            <div className="my-10">
                <div className="container mx-auto px-4">
                    <div className="grid-col-1 grid gap-6 md:grid-cols-2">
                        {terrenos.slice(0, 2).map((terreno) => (
                            <PropertyCard
                                key={terreno.id}
                                property={{
                                    url: `/terrenos/${terreno.id}`,
                                    id: parseInt(terreno.id),
                                    type: 'terreno',
                                    subtype: 'terreno',
                                    development_assigned: false,
                                    operation_type: terreno.operation,
                                    name: terreno.title,
                                    slug: terreno.title.toLowerCase().replace(/\s+/g, '-'),
                                    description: `Terreno en ${terreno.neighborhood}`,
                                    address: terreno.address,
                                    address_floor: '',
                                    neighborhood: terreno.neighborhood,
                                    country: 'Argentina',
                                    currency_symbol: terreno.currency,
                                    city: terreno.neighborhood,
                                    covered_m2: 0,
                                    uncovered_m2: 0,
                                    total_m2: 0,
                                    rooms: 0,
                                    bathrooms: 0,
                                    parking_lots: 0,
                                    status: 'disponible',
                                    substatus: 'activo',
                                    main_image: terreno.image,
                                    latitude: 0,
                                    longitude: 0,
                                    reference_code: `T${terreno.id}`,
                                    add_to_homepage: false,
                                    media: {
                                        images: [{ url: terreno.image }]
                                    },
                                    updated: new Date().toISOString(),
                                    price: terreno.price
                                }}
                                className="large"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid principal de terrenos */}
            <div className="my-10">
                <div className="container mx-auto px-4">
                    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {terrenos.slice(0, 3).map((terreno) => (
                            <PropertyCard
                                key={terreno.id}
                                property={{
                                    url: `/terrenos/${terreno.id}`,
                                    id: parseInt(terreno.id),
                                    type: 'terreno',
                                    subtype: 'terreno',
                                    development_assigned: false,
                                    operation_type: terreno.operation,
                                    name: terreno.title,
                                    slug: terreno.title.toLowerCase().replace(/\s+/g, '-'),
                                    description: `Terreno en ${terreno.neighborhood}`,
                                    address: terreno.address,
                                    address_floor: '',
                                    neighborhood: terreno.neighborhood,
                                    country: 'Argentina',
                                    currency_symbol: terreno.currency,
                                    city: terreno.neighborhood,
                                    covered_m2: 0,
                                    uncovered_m2: 0,
                                    total_m2: 0,
                                    rooms: 0,
                                    bathrooms: 0,
                                    parking_lots: 0,
                                    status: 'disponible',
                                    substatus: 'activo',
                                    main_image: terreno.image,
                                    latitude: 0,
                                    longitude: 0,
                                    reference_code: `T${terreno.id}`,
                                    add_to_homepage: false,
                                    media: {
                                        images: [{ url: terreno.image }]
                                    },
                                    updated: new Date().toISOString(),
                                    price: terreno.price
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner promocional */}
            <div className="my-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col overflow-hidden md:h-[250px] md:flex-row">
                        <div className="bg-green-text-dark flex flex-1 flex-col justify-center px-8 py-6 md:px-10">
                            <h3 className="mb-4 text-3xl font-bold" style={{ color: 'var(--color-green-social)' }}>La propiedad que soñás, existe en Mel</h3>
                            <p className="mb-4 text-white">
                                Increíbles promociones de reconocidas marcas pensados para acompañarte en cada etapa de tu proyecto de
                                adquisición de su propiedad.
                            </p>
                            <button type="button" className="btn btn-plain w-fit !px-10 bg-white text-green-600 px-6 py-2 rounded-md hover:bg-gray-100">
                                Ver más
                            </button>
                        </div>
                        <div className="h-full basis-full md:basis-[300px] lg:basis-[498px]">
                            <img className="h-full w-full object-cover" src="/banner_img_1.png" alt="Banner" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terrenos; 