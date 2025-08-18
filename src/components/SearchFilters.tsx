import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export interface FilterValues {
    location: string;
    operation: string;
    propertyType: string;
    rooms: string;
    price: string;
    additionalFilters: string[];
}

interface SearchFiltersProps {
    onFiltersChange: (filters: FilterValues) => void;
    resultsCount?: number;
    resultsText?: string;
    className?: string;
    isMapView?: boolean;
    onToggleView?: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
    onFiltersChange,
    resultsCount = 0,
    resultsText = "Casas, Departamentos y PH en Oportunidad",
    className = "",
    isMapView = false,
    onToggleView
}) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUser();
    const [filters, setFilters] = useState<FilterValues>({
        location: '',
        operation: '',
        propertyType: '',
        rooms: '',
        price: '',
        additionalFilters: []
    });

    const handleFilterChange = (key: keyof FilterValues, value: string | string[]) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearLocation = () => {
        handleFilterChange('location', '');
    };

    const handleViewFavorites = () => {
        if (isLoggedIn) {
            navigate('/perfil/favoritos');
        } else {
            navigate('/login');
        }
    };

    const handleSaveSearch = () => {
        // TODO: Implementar lógica para guardar búsqueda
        console.log('Guardando búsqueda...');
    };

    const handleToggleView = () => {
        if (onToggleView) {
            onToggleView();
        }
    };

    return (
        <div className={`my-10 ${className}`}>
            <div className="container mx-auto px-4">
                {/* Barra de búsqueda principal */}
                <div className="mt-10 flex flex-col gap-4 md:flex-row">
                    {/* Input de búsqueda */}
                    <div className="wrapper-input-search flex-1">
                        <div className="relative">
                            {filters.location && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                                    <span className="bg-green-menu text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                                        {filters.location}
                                        <button
                                            onClick={clearLocation}
                                            className="text-white hover:text-gray-200 text-xs"
                                        >
                                            ×
                                        </button>
                                    </span>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Ingresá ciudades o barrios"
                                className="input w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                            />
                            {/* Icono de lupa */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Select de operación */}
                    <div>
                        <select
                            className="select rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.operation}
                            onChange={(e) => handleFilterChange('operation', e.target.value)}
                        >
                            <option value="">Comprar</option>
                            <option value="vender">Vender</option>
                            <option value="alquilar">Alquilar</option>
                        </select>
                    </div>

                    {/* Select de tipo de propiedad */}
                    <div>
                        <select
                            className="select rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.propertyType}
                            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        >
                            <option value="">Propiedades</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="ph">PH</option>
                            <option value="terreno">Terreno</option>
                        </select>
                    </div>

                    {/* Select de ambientes */}
                    <div>
                        <select
                            className="select rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.rooms}
                            onChange={(e) => handleFilterChange('rooms', e.target.value)}
                        >
                            <option value="">Amb | Dorm</option>
                            <option value="1">1 ambiente</option>
                            <option value="2">2 ambientes</option>
                            <option value="3">3 ambientes</option>
                            <option value="4+">4+ ambientes</option>
                        </select>
                    </div>

                    {/* Select de precio */}
                    <div>
                        <select
                            className="select rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filters.price}
                            onChange={(e) => handleFilterChange('price', e.target.value)}
                        >
                            <option value="">Precio</option>
                            <option value="50000">Mas de 50.000$</option>
                            <option value="100000">Mas de 100.000$</option>
                            <option value="200000">Mas de 200.000$</option>
                            <option value="500000">Mas de 500.000$</option>
                        </select>
                    </div>

                    {/* Botón de más filtros */}
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
                        <div className="text-green-menu text-sm font-bold">{resultsText}</div>
                        <div className="text-sm">{resultsCount.toLocaleString()} propiedades encontradas</div>
                    </div>
                    <div>
                        <ul className="flex flex-col items-center gap-6 md:flex-row">
                            <li className="flex gap-2">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-2 transition-all duration-200"
                                    onClick={handleToggleView}
                                >
                                    {isMapView ? 'Ver Listado' : 'Ver Mapa'}
                                    {/* Icono que cambia según la vista */}
                                    {isMapView ? (
                                        // Icono de listado cuando estamos en vista mapa
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    ) : (
                                        // Icono de mapa cuando estamos en vista listado
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    )}
                                </button>
                            </li>
                            <li className="flex gap-2">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-2"
                                    onClick={handleViewFavorites}
                                >
                                    Ver favoritos
                                    {/* Icono de corazón */}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </li>
                            <li className="flex gap-2">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-2"
                                    onClick={handleSaveSearch}
                                >
                                    Guardar búsqueda
                                    {/* Icono de diskette */}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <select className="select rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="">Bajaron de precio</option>
                                    <option value="precio">Por precio</option>
                                    <option value="fecha">Por fecha</option>
                                    <option value="ubicación">Por ubicación</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
