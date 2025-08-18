import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import propertiesService from '../services/propertiesService';
import { Property, SearchFilters as PropertySearchFilters } from '../repositories/propertiesRepository';
import PropertyCard from '../components/PropertyCard';
import SearchFilters, { FilterValues } from '../components/SearchFilters';
import PropertyMap from '../components/PropertyMap';
import styled from 'styled-components';

const ResultadosContainer = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .loading {
    text-align: center;
    padding: 3rem;
    font-size: 1.125rem;
    color: #666;
  }

  .error {
    text-align: center;
    padding: 3rem;
    font-size: 1.125rem;
    color: #DE1E1E;
    background: #ffebee;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
    font-size: 1.125rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 3rem 0;
  }

  .pagination button {
    padding: 0.5rem 1rem;
    border: 1px solid #12782e;
    background: white;
    color: #12782e;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pagination button:hover:not(:disabled) {
    background: #12782e;
    color: white;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination .current-page {
    background: #12782e;
    color: white;
  }
`;

const Resultados: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isMapView, setIsMapView] = useState(false);

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

        if (filters.location) converted.location = filters.location;
        if (filters.operation) converted.operation = filters.operation;
        if (filters.propertyType) converted.properties = filters.propertyType;
        if (filters.rooms) converted.rooms = filters.rooms;
        if (filters.price) converted.price = filters.price;

        return converted;
    };

    // Manejador de cambios de filtros
    const handleFiltersChange = (newFilters: FilterValues) => {
        console.log('🔍 Filtros actualizados:', newFilters);

        // Convertir filtros y actualizar URL
        const convertedFilters = convertFilters(newFilters);
        const newSearchParams = new URLSearchParams();

        // Agregar filtros activos a la URL
        Object.entries(convertedFilters).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value.toString());
            }
        });

        // Mantener la página actual si existe
        if (searchParams.get('page')) {
            newSearchParams.set('page', searchParams.get('page')!);
        }

        // Actualizar URL
        setSearchParams(newSearchParams);
    };

    // Toggle entre vista de listado y mapa
    const handleToggleView = () => {
        setIsMapView(!isMapView);
        console.log('🔄 Cambiando vista:', !isMapView ? 'Mapa' : 'Listado');
    };

    // Cargar propiedades
    const loadProperties = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = getFiltersFromURL();
            console.log('🔍 Filtros extraídos de URL:', filters);

            const response = await propertiesService.getAllProperties(filters);

            setProperties(response.objects);
            setTotal(response.count);
            setCurrentPage(1); // La API no devuelve página actual
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
            text += ` en ${filters.operation}`;
        }

        if (filters.properties) {
            text += ` - ${filters.properties}`;
        }

        if (filters.location) {
            text += ` en ${filters.location}`;
        }

        return text;
    };

    if (loading) {
        return (
            <ResultadosContainer>
                <div className="container">
                    <div className="loading">
                        <div>🔍 Buscando propiedades...</div>
                    </div>
                </div>
            </ResultadosContainer>
        );
    }

    if (error) {
        return (
            <ResultadosContainer>
                <div className="container">
                    <div className="error">
                        <div>❌ {error}</div>
                        <button onClick={loadProperties} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
                            Reintentar
                        </button>
                    </div>
                </div>
            </ResultadosContainer>
        );
    }

    return (
        <ResultadosContainer>
            {/* Componente de filtros reutilizable */}
            <SearchFilters
                onFiltersChange={handleFiltersChange}
                resultsCount={total}
                resultsText={getResultsText()}
                isMapView={isMapView}
                onToggleView={handleToggleView}
            />

            <div className="container">
                {/* Vista de Mapa */}
                {isMapView ? (
                    <div className="my-6">
                        <PropertyMap properties={properties} />
                    </div>
                ) : (
                    /* Vista de Listado */
                    <>
                        {/* Grid de propiedades */}
                        {properties.length > 0 ? (
                            <>
                                <div className="properties-grid">
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
                                    <div className="pagination">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage <= 1}
                                        >
                                            ← Anterior
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={page === currentPage ? 'current-page' : ''}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage >= totalPages}
                                        >
                                            Siguiente →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-results">
                                <div>🏠 No se encontraron propiedades con los filtros seleccionados</div>
                                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
                                    Intenta ajustar los filtros de búsqueda
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </ResultadosContainer>
    );
};

export default Resultados;
