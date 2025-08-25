import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TerrenoService } from '../modules/Terrenos/terreno.service';
import { Terreno } from '../modules/Terrenos/interfaces/terreno.interface';
import { TerrenoSearchFilters } from '../modules/Terrenos/interfaces/terreno.interface';
import { convertTerrenosToProperties } from '../modules/Terrenos/helpers/terrenoHelpers';
import TerrenoCard from '../components/TerrenoCard';
import SearchFilters, { FilterValues } from '../components/SearchFilters';
import PropertyMap from '../components/PropertyMap';
import Pagination from '../components/Pagination';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/LoginModal';
import PropiedadQueSoñas from '../components/PropiedadQueSoñas';

const Terrenos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [terrenos, setTerrenos] = useState<Terreno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isMapView, setIsMapView] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Extraer filtros de la URL
    const getFiltersFromURL = (): TerrenoSearchFilters => {
        const filters: TerrenoSearchFilters = {};

        // Parámetros principales
        const operation = searchParams.get('operation');
        const page = searchParams.get('page');
        const locations = searchParams.get('locations');

        if (operation) filters.operation_type = operation;
        if (page) filters.page = Number(page);
        if (locations) filters.neighborhood = locations.toLowerCase().replace(/\s+/g, '-');

        // Otros filtros que puedan venir en la URL
        searchParams.forEach((value, key) => {
            if (!['operation', 'page', 'locations'].includes(key)) {
                filters[key] = value;
            }
        });

        return filters;
    };

    // Convertir filtros del componente SearchFilters a TerrenoSearchFilters
    const convertFilters = (filters: FilterValues): TerrenoSearchFilters => {
        const converted: TerrenoSearchFilters = {};

        if (filters.location) {
            // Convertir ubicación a formato del backend (locations)
            converted.neighborhood = filters.location.toLowerCase().replace(/\s+/g, '-');
        }

        if (filters.operation) {
            converted.operation_type = filters.operation;
        }

        if (filters.priceFrom) {
            converted.price_min = Number(filters.priceFrom);
        }

        if (filters.priceTo) {
            converted.price_max = Number(filters.priceTo);
        }

        if (filters.currency) {
            converted.currency = filters.currency;
        }

        if (filters.characteristics && filters.characteristics.length > 0) {
            converted.characteristics = filters.characteristics.join(',');
        }

        if (filters.status && filters.status.length > 0) {
            converted.status = filters.status.join(',');
        }

        if (filters.sortOrder && filters.sortOrder !== 'relevantes') {
            console.log('🔄 Aplicando ordenamiento:', filters.sortOrder);
            if (filters.sortOrder === 'menorPrecio') {
                converted.order_by = 'precio_asc';
                console.log('✅ Ordenamiento: precio_asc');
            } else if (filters.sortOrder === 'mayorPrecio') {
                converted.order_by = 'precio_desc';
                console.log('✅ Ordenamiento: precio_desc');
            } else if (filters.sortOrder === 'masAmplio') {
                converted.order_by = 'superficie_desc';
                console.log('✅ Ordenamiento: superficie_desc');
            }
        } else {
            console.log('🔄 Sin ordenamiento específico, usando relevantes por defecto');
        }

        return converted;
    };

    // Manejador de cambios de filtros
    const handleFiltersChange = (newFilters: FilterValues) => {
        console.log('🔍 Filtros actualizados:', newFilters);

        // Convertir filtros y actualizar URL
        const convertedFilters = convertFilters(newFilters);
        console.log('🔄 Filtros convertidos para backend:', convertedFilters);

        const newSearchParams = new URLSearchParams();

        // Agregar filtros activos a la URL
        Object.entries(convertedFilters).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value.toString());
                console.log(`📝 Agregando filtro a URL: ${key} = ${value}`);
            }
        });

        // Mantener la página actual si existe
        if (searchParams.get('page')) {
            newSearchParams.set('page', searchParams.get('page')!);
        }

        // Actualizar URL
        setSearchParams(newSearchParams);
        console.log('🌐 Nueva URL:', newSearchParams.toString());
    };

    // Toggle entre vista de listado y mapa
    const handleToggleView = () => {
        console.log('🔄 Cambiando vista:', !isMapView ? 'Mapa' : 'Listado');
        setIsMapView(!isMapView);
    };

    // Abrir modal de login
    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    // Cargar terrenos
    const loadTerrenos = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = getFiltersFromURL();
            console.log('🔍 Filtros extraídos de URL:', filters);

            // Siempre asegurar que se busquen solo terrenos
            const searchFilters: TerrenoSearchFilters = {
                ...filters,
                type: 'terreno',
                limit: 11,
                offset: ((filters.page || 1) - 1) * 11
            };

            const response = await TerrenoService.searchTerrenos(searchFilters);
            console.log('📡 Respuesta de la API:', response);

            setTerrenos(response.objects);
            setTotal(response.count);
            setCurrentPage(filters.page || 1);
            setTotalPages(Math.ceil(response.count / 11));

            console.log('✅ Terrenos cargados:', response);
        } catch (err) {
            console.error('❌ Error cargando terrenos:', err);
            setError('Error al cargar los terrenos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // Cargar terrenos cuando cambien los parámetros de la URL
    useEffect(() => {
        loadTerrenos();
    }, [searchParams]);

    // Cambiar página
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', newPage.toString());
            setSearchParams(newParams);
            setCurrentPage(newPage);
        }
    };

    // Obtener texto de resultados personalizado
    const getResultsText = () => {
        const filters = getFiltersFromURL();
        let text = "Terrenos";

        if (filters.operation_type) {
            let operationText = '';
            if (filters.operation_type === 'venta') {
                operationText = 'Venta';
            } else if (filters.operation_type === 'alquiler') {
                operationText = 'Alquiler';
            } else {
                operationText = filters.operation_type;
            }
            text += ` en ${operationText}`;
        }

        if (filters.neighborhood) {
            text += ` en ${filters.neighborhood.replace(/-/g, ' ')}`;
        }

        return text;
    };

    // Convertir filtros de URL a FilterValues para SearchFilters
    const getActiveFiltersForUI = (): FilterValues => {
        const urlFilters = getFiltersFromURL();

        // Convertir neighborhood del backend a location para UI
        let location = '';
        if (urlFilters.neighborhood) {
            location = urlFilters.neighborhood.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        }

        // Mapear operation_type del backend a la UI
        let operation = '';
        if (urlFilters.operation_type) {
            if (urlFilters.operation_type === 'venta') {
                operation = 'venta';
            } else if (urlFilters.operation_type === 'alquiler') {
                operation = 'alquiler';
            } else {
                operation = urlFilters.operation_type;
            }
        }

        return {
            location: location,
            operation: operation,
            propertyType: ['terreno'], // Siempre terreno
            rooms: [],
            price: '',
            priceFrom: urlFilters.price_min?.toString() || '',
            priceTo: urlFilters.price_max?.toString() || '',
            currency: urlFilters.currency || '',
            characteristics: [],
            status: [],
            additionalFilters: [],
            sortOrder: urlFilters.order_by || 'relevantes'
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl text-gray-600 mb-4">🏞️ Buscando terrenos...</div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-xl text-red-600 mb-4">❌ {error}</div>
                    <button
                        onClick={loadTerrenos}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con filtros */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <SearchFilters
                        onFiltersChange={handleFiltersChange}
                        resultsCount={total}
                        resultsText={getResultsText()}
                        isMapView={isMapView}
                        onToggleView={handleToggleView}
                        activeFilters={getActiveFiltersForUI()}
                    />
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 py-8">
                {/* Vista de Mapa */}
                {isMapView ? (
                    <div className="my-6">
                        <PropertyMap
                            properties={convertTerrenosToProperties(terrenos)}
                            onOpenLoginModal={handleOpenLoginModal}
                        />
                    </div>
                ) : (
                    /* Vista de Listado */
                    <>
                        {/* Grid de terrenos */}
                        {terrenos.length > 0 ? (
                            <>
                                {/* Primera fila: 2 terrenos que ocupan la mitad cada uno */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {terrenos.slice(0, 2).map((terreno) => (
                                        <TerrenoCard
                                            key={terreno.id}
                                            terreno={terreno}
                                        />
                                    ))}
                                </div>

                                {/* Resto de terrenos: 3 por fila */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                                    {/* Segunda fila: 3 terrenos */}
                                    {terrenos.slice(2, 5).map((terreno) => (
                                        <TerrenoCard
                                            key={terreno.id}
                                            terreno={terreno}
                                        />
                                    ))}

                                    {/* Tercera fila: 3 terrenos */}
                                    {terrenos.slice(5, 8).map((terreno) => (
                                        <TerrenoCard
                                            key={terreno.id}
                                            terreno={terreno}
                                        />
                                    ))}

                                    {/* Cuarta fila: 3 terrenos */}
                                    {terrenos.slice(8, 11).map((terreno) => (
                                        <TerrenoCard
                                            key={terreno.id}
                                            terreno={terreno}
                                        />
                                    ))}
                                </div>

                                <PropiedadQueSoñas />

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                            totalItems={total}
                                            itemsPerPage={11}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-xl text-gray-600 mb-4">🏞️ No se encontraron terrenos con los filtros seleccionados</div>
                                <div className="text-gray-500">
                                    Intenta ajustar los filtros de búsqueda
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal de Login */}
            <LoginModal
                isShown={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>
    );
};

export default Terrenos; 