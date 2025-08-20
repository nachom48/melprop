import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export interface FilterValues {
    location: string;
    operation: string;
    propertyType: string[];
    rooms: string[];
    price: string;
    priceFrom: string;
    priceTo: string;
    currency: string;
    characteristics: string[];
    status: string[];
    additionalFilters: string[];
    sortOrder: string;
}

interface SearchFiltersProps {
    onFiltersChange: (filters: FilterValues) => void;
    resultsCount?: number;
    resultsText?: string;
    className?: string;
    isMapView?: boolean;
    onToggleView?: () => void;
    activeFilters?: FilterValues;
    filterType?: 'properties' | 'developments'; // Nueva prop para adaptar el componente
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
    onFiltersChange,
    resultsCount = 0,
    resultsText = "Casas, Departamentos y PH en Oportunidad",
    className = "",
    isMapView = false,
    onToggleView,
    activeFilters,
    filterType = 'properties' // Default a propiedades
}) => {
    // Debug: mostrar props recibidas
    console.log('🔍 SearchFilters - Props recibidas:', {
        resultsCount,
        resultsText,
        filterType,
        activeFilters
    });

    const navigate = useNavigate();
    const { isLoggedIn } = useUser();
    const [filters, setFilters] = useState<FilterValues>({
        location: '',
        operation: '',
        propertyType: filterType === 'developments' ? [] : [], // Para desarrollos, vacío por defecto
        rooms: filterType === 'developments' ? [] : [], // Para desarrollos, vacío por defecto
        price: '',
        priceFrom: '',
        priceTo: '',
        currency: '',
        characteristics: [],
        status: [],
        additionalFilters: [],
        sortOrder: 'relevantes' // Default sort order
    });

    // Estados para controlar los dropdowns
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [sortingLoading, setSortingLoading] = useState(false);

    // Opciones para propiedades
    const propertyTypeOptions = [
        { value: 'departamento', label: 'Departamento' },
        { value: 'casa', label: 'Casa' },
        { value: 'ph', label: 'PH' },
        { value: 'deposito', label: 'Depósito' },
        { value: 'oficina', label: 'Oficina' },
        { value: 'terreno', label: 'Terreno' },
        { value: 'local', label: 'Local' },
        { value: 'edificio', label: 'Edificio' }
    ];

    // Opciones para etapas de desarrollo
    const developmentStageOptions = [
        { value: 'En Pozo', label: 'En Pozo' },
        { value: 'En Demolicion', label: 'En Demolición' },
        { value: 'En Construccion', label: 'En Construcción' },
        { value: 'Finalizado', label: 'Finalizado' }
    ];

    // Determinar qué opciones usar según el tipo de filtro
    const currentOptions = filterType === 'developments' ? developmentStageOptions : propertyTypeOptions;
    const filterTitle = filterType === 'developments' ? 'Etapa de Emprendimiento' : 'Tipo de Propiedad';
    const filterPlaceholder = filterType === 'developments' ? 'Etapas' : 'Propiedades';

    // Sincronizar filtros locales con filtros activos
    useEffect(() => {
        if (activeFilters) {
            setFilters(activeFilters);
            // Resetear estado de carga cuando se reciban nuevos filtros
            setSortingLoading(false);
        }
    }, [activeFilters]);

    // Cerrar dropdowns al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
            if (showMoreFilters && !(event.target as Element).closest('.more-filters-container')) {
                setShowMoreFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown, showMoreFilters]);

    // Función para actualizar filtros locales (sin aplicar)
    const updateLocalFilters = (key: keyof FilterValues, value: string | string[]) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    };

    // Función para aplicar filtros (llama a onFiltersChange)
    const applyFilters = () => {
        console.log('🔍 Aplicando filtros:', filters);
        console.log('🔍 Ordenamiento seleccionado:', filters.sortOrder);
        console.log('🔍 Precio actual:', filters.price);

        // Si es un cambio de ordenamiento, mostrar estado de carga
        if (filters.sortOrder && filters.sortOrder !== 'relevantes') {
            setSortingLoading(true);
        }

        onFiltersChange(filters);
    };

    // Función para aplicar ordenamiento específico
    const applySorting = (sortValue: string) => {
        console.log('🔄 Aplicando ordenamiento específico:', sortValue);
        console.log('🔄 Estado actual de filters:', filters);

        const newFilters = { ...filters, sortOrder: sortValue };
        console.log('🔄 Nuevos filtros creados:', newFilters);

        setFilters(newFilters);

        // Si es un cambio de ordenamiento, mostrar estado de carga
        if (sortValue !== 'relevantes') {
            setSortingLoading(true);
            console.log('🔄 Activando estado de carga para ordenamiento');
        }

        // Aplicar filtros inmediatamente
        console.log('🔄 Llamando a onFiltersChange con:', newFilters);
        onFiltersChange(newFilters);
        closeDropdown();
    };

    // Función para manejar cambios en filtros locales
    const handleFilterChange = (key: keyof FilterValues, value: string | string[]) => {
        updateLocalFilters(key, value);
    };

    // Función para mostrar todos los filtros seleccionados
    const getFullFilterText = (filters: string[], defaultText: string): string => {
        if (filters.length === 0) return defaultText;
        return filters.map(filter => filter.charAt(0).toUpperCase() + filter.slice(1)).join(', ');
    };

    // Función para mostrar filtros truncados
    const getTruncatedFilterText = (filters: string[], defaultText: string, maxVisible: number = 2): string => {
        if (filters.length === 0) return defaultText;
        if (filters.length <= maxVisible) {
            return filters.map(filter => filter.charAt(0).toUpperCase() + filter.slice(1)).join(', ');
        }
        return `${filters.slice(0, maxVisible).map(filter => filter.charAt(0).toUpperCase() + filter.slice(1)).join(', ')}...`;
    };

    const clearLocation = () => {
        updateLocalFilters('location', '');
        // Aplicar inmediatamente el cambio de ubicación
        onFiltersChange({ ...filters, location: '' });
    };

    const clearFilter = (key: keyof FilterValues) => {
        if (key === 'propertyType' || key === 'rooms') {
            updateLocalFilters(key, []);
        } else {
            updateLocalFilters(key, '');
        }
        // No aplicar automáticamente, solo actualizar localmente
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

    const roomsOptions = [
        { value: '1', label: '1 ambiente' },
        { value: '2', label: '2 ambientes' },
        { value: '3', label: '3 ambientes' },
        { value: '4+', label: '4+ ambientes' }
    ];

    const priceOptions = [
        { value: 'min_50000', label: 'Mas de 50.000$' },
        { value: 'min_100000', label: 'Mas de 100.000$' },
        { value: 'min_200000', label: 'Mas de 200.000$' },
        { value: 'min_500000', label: 'Mas de 500.000$' }
    ];

    const characteristicsOptions = [
        { value: 'cochera', label: 'Cochera' },
        { value: 'vestidor', label: 'Vestidor' },
        { value: 'terraza', label: 'Terraza' },
        { value: 'piscina', label: 'Piscina' },
        { value: 'parrilla', label: 'Parrilla' },
        { value: 'toilette', label: 'Toilette' }
    ];

    const statusOptions = [
        { value: 'estrenar', label: 'A estrenar' },
        { value: 'hasta5', label: 'Hasta 5 años' },
        { value: 'hasta10', label: 'Hasta 10 años' },
        { value: 'masde10', label: '+ de 10 años' }
    ];

    const currencyOptions = [
        { value: 'usd', label: 'Dólares' },
        { value: 'ars', label: 'Pesos' }
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
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-h-[200px] transition-all duration-200 ease-in-out transform origin-top">
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
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            applyFilters();
                                            closeDropdown();
                                        }}
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
                            <div
                                className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white cursor-help"
                                title={`${filters.propertyType.length} tipo(s) seleccionado(s): ${getFullFilterText(filters.propertyType, '')}`}
                            >
                                <span>{filters.propertyType.length}</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('propertyType')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.propertyType.length > 0
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                            title={getFullFilterText(filters.propertyType, `Seleccionar ${filterTitle.toLowerCase()}`)}
                        >
                            <span className="truncate max-w-[120px]">
                                {getTruncatedFilterText(filters.propertyType, filterPlaceholder)}
                            </span>
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de tipo de propiedad/etapa */}
                        {openDropdown === 'propertyType' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-h-[280px] transition-all duration-200 ease-in-out transform origin-top">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-green-800 font-semibold text-sm">{filterTitle}</h3>
                                        {filters.propertyType.length > 0 && (
                                            <button
                                                onClick={() => {
                                                    handleFilterChange('propertyType', []);
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Limpiar
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {currentOptions.map((option) => (
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
                                        onClick={() => {
                                            applyFilters();
                                            closeDropdown();
                                        }}
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
                            <div
                                className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white cursor-help"
                                title={`${filters.rooms.length} ambiente(s) seleccionado(s): ${getFullFilterText(filters.rooms, '')}`}
                            >
                                <span>{filters.rooms.length}</span>
                            </div>
                        )}
                        <button
                            onClick={() => toggleDropdown('rooms')}
                            className={`flex items-center gap-2 rounded-md border px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 ${filters.rooms.length > 0
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300'
                                }`}
                            title={getFullFilterText(filters.rooms, 'Seleccionar ambientes')}
                        >
                            <span className="truncate max-w-[120px]">
                                {getTruncatedFilterText(filters.rooms, 'Amb | Dorm')}
                            </span>
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de ambientes */}
                        {openDropdown === 'rooms' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-h-[240px] transition-all duration-200 ease-in-out transform origin-top">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-green-800 font-semibold text-sm">Ambientes</h3>
                                        {filters.rooms.length > 0 && (
                                            <button
                                                onClick={() => {
                                                    handleFilterChange('rooms', []);
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
                                        onClick={() => {
                                            applyFilters();
                                            closeDropdown();
                                        }}
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
                            {filters.price ? (
                                <>
                                    <span>{priceOptions.find(opt => opt.value === filters.price)?.label}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('🔍 Limpiando filtro de precio desde icono X');
                                            console.log('🔍 Estado actual de price:', filters.price);
                                            // Limpiar el filtro y aplicar inmediatamente
                                            const newFilters = { ...filters, price: '' };
                                            setFilters(newFilters);
                                            console.log('🔍 Nuevos filtros:', newFilters);
                                            onFiltersChange(newFilters);
                                        }}
                                        className="ml-1 text-green-600 hover:text-green-800"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                'Precio'
                            )}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown de precio */}
                        {openDropdown === 'price' && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-h-[220px] transition-all duration-200 ease-in-out transform origin-top">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-green-800 font-semibold text-sm">Rango de precio</h3>
                                        {filters.price && (
                                            <button
                                                onClick={() => {
                                                    console.log('🔍 Limpiando filtro de precio desde botón Limpiar');
                                                    console.log('🔍 Estado actual de price:', filters.price);
                                                    // Limpiar el filtro y aplicar inmediatamente
                                                    const newFilters = { ...filters, price: '' };
                                                    setFilters(newFilters);
                                                    console.log('🔍 Nuevos filtros:', newFilters);
                                                    onFiltersChange(newFilters);
                                                    closeDropdown();
                                                }}
                                                className="text-xs text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Limpiar
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {/* Opción para limpiar el filtro */}
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                value=""
                                                checked={!filters.price}
                                                onChange={(e) => {
                                                    console.log('🔍 Seleccionando "Sin filtro"');
                                                    console.log('🔍 Estado actual de price:', filters.price);
                                                    // Limpiar el filtro y aplicar inmediatamente
                                                    const newFilters = { ...filters, price: '' };
                                                    setFilters(newFilters);
                                                    console.log('🔍 Nuevos filtros:', newFilters);
                                                    onFiltersChange(newFilters);
                                                    closeDropdown();
                                                }}
                                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                            />
                                            <span className="text-gray-700 text-sm font-medium">Sin filtro</span>
                                        </label>

                                        {/* Separador */}
                                        <div className="border-t border-gray-200 my-2"></div>

                                        {/* Opciones de precio */}
                                        {priceOptions.map((option) => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    value={option.value}
                                                    checked={filters.price === option.value}
                                                    onChange={(e) => {
                                                        handleFilterChange('price', e.target.value);
                                                    }}
                                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                />
                                                <span className="text-gray-700 text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            applyFilters();
                                            closeDropdown();
                                        }}
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
                    <div className="relative more-filters-container">
                        {(filters.characteristics.length > 0 || filters.status.length > 0 || filters.currency || filters.priceFrom || filters.priceTo) && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>{[filters.characteristics.length, filters.status.length, filters.currency, filters.priceFrom, filters.priceTo].filter(Boolean).length}</span>
                            </div>
                        )}
                        <button
                            onClick={() => setShowMoreFilters(!showMoreFilters)}
                            className="btn btn-white rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Más filtros
                        </button>

                        {/* Dropdown de más filtros */}
                        {showMoreFilters && (
                            <div className="absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform -translate-x-1/2 left-1/2">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-green-800 font-semibold text-lg">Filtros Avanzados</h3>
                                        <button
                                            onClick={() => setShowMoreFilters(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Moneda */}
                                    <div className="mb-4">
                                        <h4 className="text-green-700 font-semibold mb-2">Moneda</h4>
                                        <div className="flex gap-4">
                                            {currencyOptions.map((option) => (
                                                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="currency"
                                                        value={option.value}
                                                        checked={filters.currency === option.value}
                                                        onChange={(e) => handleFilterChange('currency', e.target.value)}
                                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                    />
                                                    <span className="text-gray-700 text-sm">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rango de precio */}
                                    <div className="mb-4">
                                        <h4 className="text-green-700 font-semibold mb-2">Rango de Precio</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Desde</label>
                                                <input
                                                    type="text"
                                                    placeholder="USD"
                                                    value={filters.priceFrom}
                                                    onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Hasta</label>
                                                <input
                                                    type="text"
                                                    placeholder="USD"
                                                    value={filters.priceTo}
                                                    onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Características */}
                                    <div className="mb-4">
                                        <h4 className="text-green-700 font-semibold mb-2">Características</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {characteristicsOptions.map((option) => (
                                                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={option.value}
                                                        checked={filters.characteristics.includes(option.value)}
                                                        onChange={(e) => {
                                                            const newCharacteristics = e.target.checked
                                                                ? [...filters.characteristics, option.value]
                                                                : filters.characteristics.filter(char => char !== option.value);
                                                            handleFilterChange('characteristics', newCharacteristics);
                                                        }}
                                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                    />
                                                    <span className="text-gray-700 text-sm">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Estado */}
                                    <div className="mb-4">
                                        <h4 className="text-green-700 font-semibold mb-2">Estado</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {statusOptions.map((option) => (
                                                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={option.value}
                                                        checked={filters.status.includes(option.value)}
                                                        onChange={(e) => {
                                                            const newStatus = e.target.checked
                                                                ? [...filters.status, option.value]
                                                                : filters.status.filter(status => status !== option.value);
                                                            handleFilterChange('status', newStatus);
                                                        }}
                                                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                    />
                                                    <span className="text-gray-700 text-sm">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setFilters({
                                                    location: filters.location,
                                                    operation: filters.operation,
                                                    propertyType: filters.propertyType,
                                                    rooms: filters.rooms,
                                                    price: '',
                                                    priceFrom: '',
                                                    priceTo: '',
                                                    currency: '',
                                                    characteristics: [],
                                                    status: [],
                                                    additionalFilters: [],
                                                    sortOrder: 'relevantes' // Reset sort order
                                                });
                                            }}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Limpiar Filtros
                                        </button>
                                        <button
                                            onClick={() => {
                                                applyFilters();
                                                setShowMoreFilters(false);
                                            }}
                                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón de aplicar filtros */}
                    <div className="relative">
                        {activeFiltersCount > 0 && (
                            <div className="bg-green-menu text-white text-xs absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
                                <span>{activeFiltersCount}</span>
                            </div>
                        )}
                        <button
                            onClick={applyFilters}
                            className={`btn btn-primary px-6 py-2 rounded-md transition-colors font-semibold ${activeFiltersCount > 0
                                ? 'bg-green-menu text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={activeFiltersCount === 0}
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>

                {/* Barra de resultados */}
                <div className="mt-4 flex flex-col items-center justify-between rounded-lg bg-gray-100 p-4 md:flex-row">
                    <div>
                        <div className="text-green-menu text-sm font-bold">{resultsText}</div>
                        <div className="text-sm">{resultsCount.toLocaleString()} {filterType === 'developments' ? 'emprendimientos' : 'propiedades'} encontrados</div>
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
                                <div className="relative dropdown-container">
                                    <button
                                        onClick={() => toggleDropdown('sort')}
                                        className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-50"
                                        disabled={sortingLoading}
                                    >
                                        {sortingLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                                                <span>Ordenando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{filters.sortOrder === 'relevantes' ? 'Ordenar' :
                                                    filters.sortOrder === 'menorPrecio' ? 'Menor precio' :
                                                        filters.sortOrder === 'mayorPrecio' ? 'Mayor precio' :
                                                            filters.sortOrder === 'masAmplio' ? 'Más amplio' : 'Ordenar'}</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    {/* Dropdown de ordenamiento */}
                                    {openDropdown === 'sort' && (
                                        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-h-[200px] transition-all duration-200 ease-in-out transform origin-top">
                                            <div className="p-4">
                                                <h3 className="text-green-800 font-semibold mb-3 text-sm">Ordenar por</h3>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sort"
                                                            value="relevantes"
                                                            checked={filters.sortOrder === 'relevantes'}
                                                            onChange={(e) => applySorting(e.target.value)}
                                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                        />
                                                        <span className="text-gray-700 text-sm">Relevantes</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sort"
                                                            value="menorPrecio"
                                                            checked={filters.sortOrder === 'menorPrecio'}
                                                            onChange={(e) => applySorting(e.target.value)}
                                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                        />
                                                        <span className="text-gray-700 text-sm">Menor precio</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sort"
                                                            value="mayorPrecio"
                                                            checked={filters.sortOrder === 'mayorPrecio'}
                                                            onChange={(e) => applySorting(e.target.value)}
                                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                        />
                                                        <span className="text-gray-700 text-sm">Mayor precio</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sort"
                                                            value="masAmplio"
                                                            checked={filters.sortOrder === 'masAmplio'}
                                                            onChange={(e) => applySorting(e.target.value)}
                                                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                                                        />
                                                        <span className="text-gray-700 text-sm">Más amplio (por m²)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
