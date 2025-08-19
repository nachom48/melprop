import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import DevelopmentCard, { Development } from '../components/DevelopmentCard';
import developmentService, { DevelopmentSearchFilters } from '../services/developmentService';
import Pagination from '../components/Pagination';

const EmprendimientosPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [developments, setDevelopments] = useState<Development[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Obtener filtros activos de la URL
    const getActiveFiltersFromURL = () => {
        const location = searchParams.get('location') || '';
        const operation = searchParams.get('operation') || '';
        const propertyType = searchParams.getAll('propertyType') || [];
        const rooms = searchParams.getAll('rooms') || [];
        const price = searchParams.get('price') || '';
        const priceFrom = searchParams.get('priceFrom') || '';
        const priceTo = searchParams.get('priceTo') || '';
        const currency = searchParams.get('currency') || '';
        const characteristics = searchParams.getAll('characteristics') || [];
        const status = searchParams.getAll('status') || [];
        const sortOrder = searchParams.get('sortOrder') || 'relevantes';

        return {
            location,
            operation,
            propertyType,
            rooms,
            price,
            priceFrom,
            priceTo,
            currency,
            characteristics,
            status,
            sortOrder,
            additionalFilters: []
        };
    };

    // Convertir filtros del frontend al formato del backend
    const convertFiltersForBackend = (filters: any): DevelopmentSearchFilters => {
        const converted: DevelopmentSearchFilters = {};

        if (filters.location) converted.locations = filters.location;
        if (filters.operation) converted.operation = filters.operation;
        if (filters.propertyType) converted.properties = filters.propertyType;
        if (filters.rooms) converted.rooms = filters.rooms;
        if (filters.priceFrom) converted.min_price = filters.priceFrom;
        if (filters.priceTo) converted.max_price = filters.priceTo;
        if (filters.currency) converted.currency = filters.currency;
        if (filters.characteristics && filters.characteristics.length > 0) {
            converted.characteristics = filters.characteristics.join(',');
        }
        if (filters.status && filters.status.length > 0) {
            converted.status = filters.status.join(',');
        }
        if (filters.sortOrder && filters.sortOrder !== 'relevantes') {
            converted.order_by = filters.sortOrder;
        }

        return converted;
    };

    // Cargar emprendimientos
    const loadDevelopments = async (filters: any = {}) => {
        setLoading(true);
        try {
            console.log('🔄 Cargando emprendimientos con filtros:', filters);

            const backendFilters = convertFiltersForBackend(filters);
            console.log('🔄 Filtros convertidos para backend:', backendFilters);

            const response = await developmentService.getAllDevelopments(backendFilters);

            setDevelopments(response.objects || []);
            setTotalPages(response.pages || 1);
            setCurrentPage(response.page || 1);
            setTotalResults(response.total || 0);

            console.log('✅ Emprendimientos cargados:', response);
        } catch (error) {
            console.error('❌ Error al cargar emprendimientos:', error);
            setDevelopments([]);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en los filtros
    const handleFiltersChange = (newFilters: any) => {
        console.log('🔄 Filtros cambiados:', newFilters);

        // Actualizar URL con los nuevos filtros
        const params = new URLSearchParams();

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.append(key, value.toString());
                }
            }
        });

        setSearchParams(params);

        // Cargar emprendimientos con los nuevos filtros
        loadDevelopments(newFilters);
    };

    // Cargar emprendimientos al montar el componente
    useEffect(() => {
        const activeFilters = getActiveFiltersFromURL();
        loadDevelopments(activeFilters);
    }, []);

    // Manejar cambio de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const activeFilters = getActiveFiltersFromURL();
        const filtersWithPage = { ...activeFilters, page };
        loadDevelopments(filtersWithPage);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando emprendimientos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-green-text">Emprendimientos</h1>
                    <p className="text-gray-600 mt-2">
                        Descubrí los mejores emprendimientos inmobiliarios
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filtros */}
                    <div className="lg:w-1/4">
                        <SearchFilters
                            onFiltersChange={handleFiltersChange}
                            activeFilters={getActiveFiltersFromURL()}
                        />
                    </div>

                    {/* Resultados */}
                    <div className="lg:w-3/4">
                        {/* Información de resultados */}
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {totalResults > 0
                                    ? `Se encontraron ${totalResults} emprendimientos`
                                    : 'No se encontraron emprendimientos'
                                }
                            </p>
                        </div>

                        {/* Grid de emprendimientos */}
                        {developments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {developments.map((development) => (
                                    <div key={development.id} className="h-[400px]">
                                        <DevelopmentCard
                                            development={development}
                                            variant="L"
                                            className="h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron emprendimientos con los filtros seleccionados
                                </p>
                            </div>
                        )}

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmprendimientosPage;
