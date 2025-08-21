import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DevelopmentService } from '../modules/Developments/developmentService';
import { Development } from '../modules/Developments/interfaces/development.interface';
import DevelopmentCard from '../components/DevelopmentCard';
import DevelopmentMap from '../components/DevelopmentMap';
import ServiciosExclusivos from '../components/ServiciosExclusivos';
import BarriosSection from '../components/BarriosSection';
import SearchFilters, { FilterValues } from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/LoginModal';
import OpportunitiesSlider from '../components/OpportunitiesSlider';

const Emprendimientos: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMapView, setIsMapView] = useState(false);

  // Obtener texto de resultados personalizado para emprendimientos
  const getResultsText = () => {
    const filters = getActiveFiltersFromURL();
    let text = "Emprendimientos";

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
    if (filters.propertyType && filters.propertyType.length > 0) {
      const propertyTypes = filters.propertyType.map((prop: string) =>
        prop.charAt(0).toUpperCase() + prop.slice(1)
      ).join(' y ');
      text += ` - ${propertyTypes}`;
    }
    if (filters.location) {
      text += ` en ${filters.location}`;
    }
    return text;
  };

  const getActiveFiltersFromURL = (): FilterValues => {
    return {
      location: searchParams.get('location') || '',
      operation: searchParams.get('operation') || '',
      propertyType: searchParams.getAll('propertyType'),
      rooms: searchParams.getAll('rooms'),
      price: searchParams.get('price') || '',
      priceFrom: searchParams.get('priceFrom') || '',
      priceTo: searchParams.get('priceTo') || '',
      currency: searchParams.get('currency') || '',
      characteristics: searchParams.getAll('characteristics'),
      status: searchParams.getAll('status'),
      additionalFilters: [],
      sortOrder: searchParams.get('sort') || 'relevantes'
    };
  };

  const convertFiltersForBackend = (filters: any): any => {
    const backendFilters: any = {};

    // Para desarrollos, respetar el orden de producción: rooms, location, stage
    // rooms: enviar "Todos" si está vacío
    if (filters.rooms && filters.rooms.length > 0) {
      backendFilters.rooms = filters.rooms.join(',');
    } else {
      backendFilters.rooms = 'Todos';
    }

    // location: enviar "Todas" si está vacío
    if (filters.location && filters.location.trim() !== '') {
      backendFilters.location = filters.location;
    } else {
      backendFilters.location = 'Todas';
    }

    // stage: enviar "Todas" si está vacío
    if (filters.propertyType && filters.propertyType.length > 0) {
      backendFilters.stage = filters.propertyType.join(',');
    } else {
      backendFilters.stage = 'Todas';
    }

    // Otros filtros
    if (filters.operation) backendFilters.operation = filters.operation;
    if (filters.priceFrom) backendFilters.min_price = filters.priceFrom;
    if (filters.priceTo) backendFilters.max_price = filters.priceTo;
    if (filters.currency) backendFilters.currency = filters.currency;
    if (filters.characteristics && filters.characteristics.length > 0) backendFilters.characteristics = filters.characteristics.join(',');
    if (filters.status && filters.status.length > 0) backendFilters.status = filters.status.join(',');
    if (filters.sortOrder && filters.sortOrder !== 'relevantes') backendFilters.order_by = filters.sortOrder;

    // Siempre enviar page, incluso cuando es 1
    backendFilters.page = filters.page || currentPage;

    return backendFilters;
  };

  const loadDevelopments = async (filters: any = {}) => {
    try {
      setLoading(true);
      const backendFilters = convertFiltersForBackend(filters);
      console.log('🔍 Emprendimientos - Filtros originales:', filters);
      console.log('🔍 Emprendimientos - Filtros convertidos para backend:', backendFilters);
      console.log('🔍 Emprendimientos - Página actual:', currentPage);

      const response = await DevelopmentService.getAllDevelopments(backendFilters);
      console.log('✅ Emprendimientos - Respuesta del servicio:', response);
      console.log('📊 Emprendimientos - Total de resultados:', response.total);

      setDevelopments(response.objects);
      setTotalPages(response.pages);
      setTotalResults(response.total);

      console.log('📊 Emprendimientos - totalResults actualizado a:', response.total);
    } catch (error) {
      console.error('❌ Error al cargar emprendimientos:', error);
      setDevelopments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    console.log('🔄 Emprendimientos - Filtros cambiados:', newFilters);

    // Actualizar URL con nuevos filtros
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    // Resetear a página 1 cuando cambian los filtros
    params.delete('page');
    setCurrentPage(1);

    setSearchParams(params);
    loadDevelopments(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const activeFilters = getActiveFiltersFromURL();
    loadDevelopments({ ...activeFilters, page });

    // Actualizar URL con la nueva página
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
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

  useEffect(() => {
    const activeFilters = getActiveFiltersFromURL();
    loadDevelopments(activeFilters);
  }, []);

  // Debug: mostrar totalResults
  console.log('🔍 Emprendimientos - totalResults en render:', totalResults);
  console.log('🔍 Emprendimientos - developments.length:', developments.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando emprendimientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con título */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-green-text">Emprendimientos</h1>
          <p className="text-gray-600 mt-2">
            Descubrí los mejores emprendimientos inmobiliarios
          </p>
        </div>
      </div>

      {/* Filtros arriba */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            resultsCount={totalResults}
            resultsText={getResultsText()}
            isMapView={isMapView}
            onToggleView={handleToggleView}
            activeFilters={getActiveFiltersFromURL()}
            filterType="developments"
          />
        </div>
      </div>

      {/* Vista de Listado */}
      {!isMapView && (
        <div className="container mx-auto px-4 py-8">
          {/* Mensaje cuando no hay desarrollos */}
          {developments.length === 0 && !loading && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No se encontraron emprendimientos
              </h2>
              <p className="text-gray-600 mb-6">
                Intenta ajustar los filtros de búsqueda para encontrar más resultados.
              </p>
              <button
                onClick={() => {
                  // Limpiar todos los filtros
                  const params = new URLSearchParams();
                  setSearchParams(params);
                  loadDevelopments({});
                }}
                className="btn btn-primary px-6 py-2 rounded-md"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Mensaje de carga */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando emprendimientos...</p>
            </div>
          )}

          {/* Primera fila: 1 XL + 1 L */}
          {developments.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
              <div className="md:col-span-2 h-[500px]">
                <DevelopmentCard
                  development={developments[0]}
                  variant="XL"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
              <div className="h-[500px]">
                <DevelopmentCard
                  development={developments[1]}
                  variant="L"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
            </div>
          )}

          {/* Componente Conocé nuestros servicios */}
          <ServiciosExclusivos />

          {/* Segunda fila: 3 L (L L L) */}
          {developments.length >= 5 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
              {developments.slice(2, 5).map((development) => (
                <div key={development.id} className="h-[500px]">
                  <DevelopmentCard
                    development={development}
                    variant="L"
                    showAdditionalInfo={false}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tercera fila: 1 L + 1 XL */}
          {developments.length >= 7 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
              <div className="h-[500px]">
                <DevelopmentCard
                  development={developments[5]}
                  variant="L"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
              <div className="md:col-span-2 h-[500px]">
                <DevelopmentCard
                  development={developments[6]}
                  variant="XL"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
            </div>
          )}

          {/* Cuarta fila: 3 L (L L L) */}
          {developments.length >= 10 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
              {developments.slice(7, 10).map((development) => (
                <div key={development.id} className="h-[500px]">
                  <DevelopmentCard
                    development={development}
                    variant="L"
                    showAdditionalInfo={false}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Componente Oportunidades */}
          <OpportunitiesSlider />

          {/* Componente Barrios y lugares */}
          <BarriosSection />
        </div>
      )}

      {/* Vista de Mapa */}
      {isMapView && (
        <div className="container mx-auto px-4 py-8">
          <div className="my-6">
            <DevelopmentMap
              developments={developments}
              onOpenLoginModal={handleOpenLoginModal}
            />
          </div>
        </div>
      )}

      {/* Resultados filtrados - SOLO cuando NO está en vista de mapa */}
      {!isMapView && developments.length > 0 && (
        <div className="container mx-auto px-4 py-8">

          {/* Paginación */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          isShown={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Emprendimientos; 