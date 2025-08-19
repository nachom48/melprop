import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export interface FilterValues {
    location: string;
    operation: string;
    propertyType: string[];
    rooms: string[];
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
    activeFilters?: FilterValues;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
    onFiltersChange,
    resultsCount = 0,
    resultsText = "Casas, Departamentos y PH en Oportunidad",
    className = "",
    isMapView = false,
    onToggleView,
    activeFilters
}) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUser();
    const [filters, setFilters] = useState<FilterValues>({
        location: '',
        operation: '',
        propertyType: [],
        rooms: [],
        price: '',
        additionalFilters: []
    });

    // Estados para controlar los dropdowns
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Sincronizar filtros locales con filtros activos
    useEffect(() => {
        if (activeFilters) {
            setFilters(activeFilters);
        }
    }, [activeFilters]);

    // Cerrar dropdowns al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    const handleFilterChange = (key: keyof FilterValues, value: string | string[]) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearLocation = () => {
        handleFilterChange('location', '');
    };

    const clearFilter = (key: keyof FilterValues) => {
        if (key === 'propertyType' || key === 'rooms') {
            handleFilterChange(key, []);
        } else {
            handleFilterChange(key, '');
        }
    };

    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const closeDropdown = () => {
        setOpenDropdown(null);
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

    // Contar filtros activos
    const activeFiltersCount = Object.values(filters).filter(value =>
        value && (
            Array.isArray(value) ? value.length > 0 :
                typeof value === 'string' ? value.trim() !== '' :
                    value.length > 0
        )
    ).length;

    // Opciones para los dropdowns
    const operationOptions = [
        { value: 'venta', label: 'Comprar' },
        { value: 'venta', label: 'Vender' },
        { value: 'alquiler', label: 'Alquilar' }
    ];

    const propertyTypeOptions = [
        { value: 'casa', label: 'Casa' },
        { value: 'departamento', label: 'Departamento' },
        { value: 'ph', label: 'PH' },
        { value: 'terreno', label: 'Terreno' },
        { value: 'local-comercial', label: 'Local comercial' }
    ];

    const roomsOptions = [
        { value: '1', label: '1 ambiente' },
        { value: '2', label: '2 ambientes' },
        { value: '3', label: '3 ambientes' },
        { value: '4+', label: '4+ ambientes' }
    ];

    const priceOptions = [
        { value: '50000', label: 'Mas de 50.000$' },
        { value: '100000', label: 'Mas de 100.000$' },
        { value: '200000', label: 'Mas de 200.000$' },
        { value: '500000', label: 'Mas de 500.000$' }
    ];

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

                    {/* Dropdown de operación */}
                    <div className="relative dropdown-container">
                        {filters.operation && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>1</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('operation')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.operation
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                        >
                            {filters.operation ? (filters.operation === 'venta' ? 'Comprar' : 'Alquilar') : 'Comprar'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de operación */}
                        {openDropdown === 'operation' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4">
                                    <h3 className="text-green-800 font-semibold mb-3 text-sm">Tipo de operación</h3>
                                    <div className="space-y-2">
                                        {operationOptions.map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="operation"
                                                    value={option.value}
                                                    checked={filters.operation === option.value}
                                                    onChange={(e) => {
                                                        console.log('🎯 Operación seleccionada:', e.target.value, 'Label:', option.label);
                                                        handleFilterChange('operation', e.target.value);
                                                        closeDropdown();
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={closeDropdown}
                                        className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dropdown de tipo de propiedad */}
                    <div className="relative dropdown-container">
                        {filters.propertyType && filters.propertyType.length > 0 && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>{filters.propertyType.length}</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('propertyType')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.propertyType.length > 0
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                        >
                            {filters.propertyType.length > 0 ? filters.propertyType.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ') : 'Propiedades'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de tipo de propiedad */}
                        {openDropdown === 'propertyType' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-green-800 font-semibold text-sm">Tipo de propiedad</h3>
                                        {filters.propertyType.length > 0 && (
                                            <button
                                                onClick={() => {
                                                    handleFilterChange('propertyType', []);
                                                    closeDropdown();
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Limpiar
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {propertyTypeOptions.map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="propertyType"
                                                    value={option.value}
                                                    checked={filters.propertyType.includes(option.value)}
                                                    onChange={(e) => {
                                                        const newPropertyTypes = e.target.checked
                                                            ? [...filters.propertyType, option.value]
                                                            : filters.propertyType.filter(type => type !== option.value);
                                                        handleFilterChange('propertyType', newPropertyTypes);
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={closeDropdown}
                                        className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dropdown de ambientes */}
                    <div className="relative dropdown-container">
                        {filters.rooms && filters.rooms.length > 0 && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>{filters.rooms.length}</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('rooms')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.rooms.length > 0
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                        >
                            {filters.rooms.length > 0 ? filters.rooms.map(room => room.charAt(0).toUpperCase() + room.slice(1)).join(', ') : 'Amb | Dorm'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de ambientes */}
                        {openDropdown === 'rooms' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-green-800 font-semibold text-sm">Ambientes</h3>
                                        {filters.rooms.length > 0 && (
                                            <button
                                                onClick={() => {
                                                    handleFilterChange('rooms', []);
                                                    closeDropdown();
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Limpiar
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {roomsOptions.map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="rooms"
                                                    value={option.value}
                                                    checked={filters.rooms.includes(option.value)}
                                                    onChange={(e) => {
                                                        const newRooms = e.target.checked
                                                            ? [...filters.rooms, option.value]
                                                            : filters.rooms.filter(room => room !== option.value);
                                                        handleFilterChange('rooms', newRooms);
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={closeDropdown}
                                        className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dropdown de precio */}
                    <div className="relative dropdown-container">
                        {filters.price && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>1</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('price')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.price
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                        >
                            {filters.price ? priceOptions.find(opt => opt.value === filters.price)?.label : 'Precio'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de precio */}
                        {openDropdown === 'price' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4">
                                    <h3 className="text-green-800 font-semibold mb-3 text-sm">Rango de precio</h3>
                                    <div className="space-y-2">
                                        {priceOptions.map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    value={option.value}
                                                    checked={filters.price === option.value}
                                                    onChange={(e) => {
                                                        handleFilterChange('price', e.target.value);
                                                        closeDropdown();
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={closeDropdown}
                                        className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón de más filtros */}
                    <div className="relative">
                        {activeFiltersCount > 0 && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>{activeFiltersCount}</span>
                            </div>
                        )}
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
