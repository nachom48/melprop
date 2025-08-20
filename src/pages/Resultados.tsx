import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import propertiesService from '../services/propertiesService';
import { Property, SearchFilters as PropertySearchFilters } from '../repositories/propertiesRepository';
import PropertyCard from '../components/PropertyCard';
import SearchFilters, { FilterValues } from '../components/SearchFilters';
import PropertyMap from '../components/PropertyMap';
import Pagination from '../components/Pagination';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/LoginModal';

const Resultados: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isMapView, setIsMapView] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Extraer filtros de la URL
    const getFiltersFromURL = (): PropertySearchFilters => {
        const filters: PropertySearchFilters = {};

        // Parámetros principales
        const operation = searchParams.get('operation');
        const properties = searchParams.get('properties');
        const page = searchParams.get('page');

        if (operation) filters.operation = operation;
        if (properties) filters.properties = properties;
        if (page) filters.page = Number(page);

        // Otros filtros que puedan venir en la URL
        searchParams.forEach((value, key) => {
            if (!['operation', 'properties', 'page'].includes(key)) {
                filters[key] = value;
            }
        });

        return filters;
    };

    // Convertir filtros del componente SearchFilters a PropertySearchFilters
    const convertFilters = (filters: FilterValues): PropertySearchFilters => {
        const converted: PropertySearchFilters = {};

        if (filters.location) {
            // Convertir ubicación a formato del backend (locations)
            converted.locations = filters.location.toLowerCase().replace(/\s+/g, '-');
        }

        if (filters.operation) {
            converted.operation = filters.operation;
        }

        if (filters.propertyType && filters.propertyType.length > 0) {
            // Convertir tipos de propiedad a formato del backend (properties)
            converted.properties = filters.propertyType.join(',');
        }

        if (filters.rooms && filters.rooms.length > 0) {
            // Convertir ambientes a formato del backend (rooms)
            if (filters.rooms.includes('4+')) {
                // Si incluye 4+, agregar todos los ambientes de 4 en adelante
                const roomsArray = filters.rooms.filter(room => room !== '4+');
                if (roomsArray.length > 0) {
                    converted.rooms = [...roomsArray, '4', '5', '6', '7', '8', '9', '10'].join(',');
                } else {
                    converted.rooms = '4,5,6,7,8,9,10';
                }
            } else {
                converted.rooms = filters.rooms.join(',');
            }
        }

        if (filters.price) {
            // Convertir precio a formato del backend (min_price)
            if (filters.price.startsWith('min_')) {
                const priceValue = filters.price.replace('min_', '');
                converted.min_price = priceValue;
            }
        }

        // Nuevos campos de filtros avanzados
        if (filters.priceFrom) {
            converted.min_price = filters.priceFrom;
        }

        if (filters.priceTo) {
            converted.max_price = filters.priceTo;
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
                converted.order_by = 'menorPrecio';
                console.log('✅ Ordenamiento: menorPrecio');
            } else if (filters.sortOrder === 'mayorPrecio') {
                converted.order_by = 'mayorPrecio';
                console.log('✅ Ordenamiento: mayorPrecio');
            } else if (filters.sortOrder === 'masAmplio') {
                converted.order_by = 'masAmplio';
                console.log('✅ Ordenamiento: masAmplio');
            }
            // Los otros valores no están implementados en el backend
        } else {
            console.log('🔄 Sin ordenamiento específico, usando relevantes por defecto');
        }

        return converted;
    };

    // Manejador de cambios de filtros
    const handleFiltersChange = (newFilters: FilterValues) => {
        console.log('🔍 Filtros actualizados:', newFilters);
        console.log('🔍 Ordenamiento en filtros:', newFilters.sortOrder);
        console.log('🔍 Tipo de ordenamiento:', typeof newFilters.sortOrder);

        // Convertir filtros y actualizar URL
        const convertedFilters = convertFilters(newFilters);
        console.log('🔄 Filtros convertidos para backend:', convertedFilters);
        console.log('🔄 Ordenamiento convertido:', convertedFilters.order_by);

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
        console.log('🔄 ANTES del toggle - isMapView:', isMapView);
        setIsMapView(!isMapView);
        console.log('🔄 DESPUÉS del toggle - isMapView:', !isMapView);
        console.log('🔄 Cambiando vista:', !isMapView ? 'Mapa' : 'Listado');
    };

    // Abrir modal de login
    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    // Cargar propiedades
    const loadProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = getFiltersFromURL();
            console.log('🔍 Filtros extraídos de URL:', filters);
            console.log('🔍 Ordenamiento en URL:', filters.order_by);
            console.log('🔍 URL completa:', window.location.href);

            const response = await propertiesService.getAllProperties(filters);
            console.log('📡 Respuesta de la API:', response);

            setProperties(response.objects);
            setTotal(response.count);
            setCurrentPage(filters.page || 1);
            setTotalPages(Math.ceil(response.count / response.limit));

            console.log('✅ Propiedades cargadas:', response);
        } catch (err) {
            console.error('❌ Error cargando propiedades:', err);
            setError('Error al cargar las propiedades. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // Cargar propiedades cuando cambien los parámetros de la URL
    useEffect(() => {
        loadProperties();
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
        let text = "Propiedades";

        if (filters.operation) {
            // Mapear los valores del backend a texto legible
            let operationText = '';
            if (filters.operation === 'venta') {
                operationText = 'Venta';
            } else if (filters.operation === 'alquiler') {
                operationText = 'Alquiler';
            } else {
                operationText = filters.operation;
            }
            text += ` en ${operationText}`;
        }
        if (filters.properties) {
            const propertyTypes = filters.properties.split(',').map((prop: string) =>
                prop.charAt(0).toUpperCase() + prop.slice(1)
            ).join(' y ');
            text += ` - ${propertyTypes}`;
        }
        if (filters.locations) {
            text += ` en ${filters.locations}`;
        }
        return text;
    };

    // Convertir filtros de URL a FilterValues para SearchFilters
    const getActiveFiltersForUI = (): FilterValues => {
        const urlFilters = getFiltersFromURL();

        // Convertir locations del backend a location para UI
        let location = '';
        if (urlFilters.locations) {
            location = urlFilters.locations.split(',').map((loc: string) =>
                loc.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
            ).join(', ');
        }

        // Convertir rooms del backend a rooms para UI
        let rooms: string[] = [];
        if (urlFilters.rooms) {
            const roomsArray = urlFilters.rooms.split(',');
            if (roomsArray.includes('4') && roomsArray.includes('5') && roomsArray.includes('6')) {
                // Si hay múltiples ambientes incluyendo 4+, usar lógica especial
                const basicRooms = roomsArray.filter((room: string) => !['4', '5', '6', '7', '8', '9', '10'].includes(room));
                if (basicRooms.length > 0) {
                    rooms = [...basicRooms, '4+'];
                } else {
                    rooms = ['4+'];
                }
            } else {
                rooms = roomsArray;
            }
        }

        // Convertir properties del backend a propertyType para UI
        let propertyType: string[] = [];
        if (urlFilters.properties) {
            propertyType = urlFilters.properties.split(',');
        }

        // Convertir min_price del backend a price para UI
        let price = '';
        if (urlFilters.min_price) {
            price = `min_${urlFilters.min_price}`;
        }

        // Mapear operation del backend a la UI
        let operation = '';
        if (urlFilters.operation) {
            if (urlFilters.operation === 'venta') {
                operation = 'venta'; // Mantener 'venta' para que se muestre como "Comprar" en la UI
            } else if (urlFilters.operation === 'alquiler') {
                operation = 'alquiler';
            } else {
                operation = urlFilters.operation;
            }
        }

        return {
            location: location,
            operation: operation,
            propertyType: propertyType,
            rooms: rooms,
            price: price,
            priceFrom: '',
            priceTo: '',
            currency: '',
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
                    <div className="text-xl text-gray-600 mb-4">🔍 Buscando propiedades...</div>
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
                        onClick={loadProperties}
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
                            properties={properties}
                            onOpenLoginModal={handleOpenLoginModal}
                        />
                    </div>
                ) : (
                    /* Vista de Listado */
                    <>
                        {/* Grid de propiedades */}
                        {properties.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                                    {properties.map((property) => (
                                        <PropertyCard
                                            key={property.id}
                                            property={property}
                                            showFavoriteButton={true}
                                        />
                                    ))}
                                </div>

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-xl text-gray-600 mb-4">🏠 No se encontraron propiedades con los filtros seleccionados</div>
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

export default Resultados;
