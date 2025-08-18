import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import propertiesService from '../services/propertiesService';
import { Property, SearchFilters } from '../repositories/propertiesRepository';
import PropertyCard from '../components/PropertyCard';
import styled from 'styled-components';

const ResultadosContainer = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .results-header {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #12782e;
  }

  .results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #12782e;
    margin-bottom: 0.5rem;
  }

  .filters-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .filter-tag {
    background: #12782e;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
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

  .results-count {
    text-align: center;
    color: #666;
    margin: 1rem 0;
    font-size: 0.875rem;
  }
`;

const Resultados: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Extraer filtros de la URL
    const getFiltersFromURL = (): SearchFilters => {
        const filters: SearchFilters = {};

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
            window.history.pushState({}, '', `?${newParams.toString()}`);
            setCurrentPage(newPage);
        }
    };

    // Obtener filtros activos para mostrar
    const getActiveFilters = () => {
        const filters = getFiltersFromURL();
        const activeFilters: string[] = [];

        if (filters.operation) {
            activeFilters.push(`Operación: ${filters.operation}`);
        }
        if (filters.properties) {
            activeFilters.push(`Tipo: ${filters.properties}`);
        }

        return activeFilters;
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
            <div className="container">
                {/* Header con resumen de resultados */}
                <div className="results-header">
                    <h1 className="results-title">
                        Resultados de búsqueda
                    </h1>
                    <div className="results-count">
                        {total > 0 ? `${total} propiedades encontradas` : 'No se encontraron propiedades'}
                    </div>

                    {/* Mostrar filtros activos */}
                    {getActiveFilters().length > 0 && (
                        <div className="filters-summary">
                            {getActiveFilters().map((filter, index) => (
                                <span key={index} className="filter-tag">
                                    {filter}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

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
            </div>
        </ResultadosContainer>
    );
};

export default Resultados;
