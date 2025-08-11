import React, { useState } from 'react';
import { Terreno } from '../types/terreno';
import { mockTerrenosResponse } from '../data/mockTerrenos';
import PropertyCard from '../components/PropertyCard';

const Terrenos: React.FC = () => {
    const [terrenos] = useState<Terreno[]>(mockTerrenosResponse.results);
    const [filters, setFilters] = useState({
        location: '',
        operation: '',
        propertyType: '',
        rooms: '',
        price: ''
    });

    const formatPrice = (price: number, currency: string) => {
        return `${currency} ${price.toLocaleString()}`;
    };

    const toggleFavorite = (id: string) => {
        // Aquí se implementaría la lógica para marcar/desmarcar favoritos
        console.log('Toggle favorite:', id);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Barra de búsqueda */}
            <div className="container mx-auto px-4">
                <div className="mt-10 flex flex-col gap-4 md:flex-row">
                    <div className="wrapper-input-search flex-1">
                        <input
                            type="text"
                            placeholder="Ingresá ciudades o barrios"
                            className="input w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="select rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.operation}
                            onChange={(e) => setFilters({ ...filters, operation: e.target.value })}
                        >
                            <option value="">Comprar</option>
                            <option value="vender">Vender</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="select rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.propertyType}
                            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                        >
                            <option value="">Propiedades</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="select rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.rooms}
                            onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
                        >
                            <option value="">Amb | Dorm</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="select rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.price}
                            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                        >
                            <option value="">Precio</option>
                            <option value="50000">Mas de 50.000$</option>
                            <option value="100000">Mas de 100.000$</option>
                        </select>
                    </div>
                    <div className="relative">
                        <div className="bg-green-menu text-small absolute top-[-10px] right-[-10px] z-4 flex h-8 w-8 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-white">
                            <span>3</span>
                        </div>
                        <button className="btn btn-white rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
                            Más filtros
                        </button>
                    </div>
                </div>

                {/* Barra de resultados */}
                <div className="mt-4 flex flex-col items-center justify-between rounded-lg bg-gray-100 p-4 md:flex-row">
                    <div>
                        <div className="text-green-menu text-sm font-bold">Casas, Departamentos y PH en Oportunidad</div>
                        <div className="text-sm">{mockTerrenosResponse.count} resultados</div>
                    </div>
                    <div>
                        <ul className="flex flex-col items-center gap-6 md:flex-row">
                            <li className="flex gap-2">
                                <button type="button" className="text-sm text-gray-600 hover:text-green-600">Ver mapa</button>
                                <img src="/img/map.svg" alt="" />
                            </li>
                            <li className="flex gap-2">
                                <button type="button" className="text-sm text-gray-600 hover:text-green-600">Ver favoritos</button>
                                <img src="/img/heart.svg" alt="" />
                            </li>
                            <li className="flex gap-2">
                                <button type="button" className="text-sm text-gray-600 hover:text-green-600">Guardar búsqueda</button>
                                <img src="/img/save.svg" alt="" />
                            </li>
                            <li>
                                <select name="" id="" className="select rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="">En oportunidad</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sección de oportunidades destacadas */}
            <div className="my-10">
                <div className="container mx-auto px-4">
                    <div className="grid-col-1 grid gap-6 md:grid-cols-2">
                        {terrenos.slice(0, 2).map((terreno) => (
                            <PropertyCard
                                key={terreno.id}
                                property={{
                                    id: parseInt(terreno.id),
                                    title: terreno.title,
                                    price: formatPrice(terreno.price, terreno.currency),
                                    address: terreno.address,
                                    rooms: 0,
                                    bathrooms: 0,
                                    parking: 0,
                                    area: 0,
                                    main_image: terreno.image,
                                    operation_type: terreno.operation,
                                    neighborhood: terreno.neighborhood
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
                                    id: parseInt(terreno.id),
                                    title: terreno.title,
                                    price: formatPrice(terreno.price, terreno.currency),
                                    address: terreno.address,
                                    rooms: 0,
                                    bathrooms: 0,
                                    parking: 0,
                                    area: 0,
                                    main_image: terreno.image,
                                    operation_type: terreno.operation,
                                    neighborhood: terreno.neighborhood
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