import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import developmentService from '../services/developmentService';
import { Development } from '../repositories/developmentRepository';
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

  const getActiveFiltersFromURL = (): FilterValues => {
    return {
      location: searchParams.get('locations') || '',
      operation: searchParams.get('operation') || '',
      propertyType: searchParams.get('properties') ? [searchParams.get('properties')!] : [],
      rooms: searchParams.getAll('rooms') || [],
      price: '',
      priceFrom: searchParams.get('min_price') || '',
      priceTo: searchParams.get('max_price') || '',
      currency: searchParams.get('currency') || '',
      characteristics: searchParams.getAll('characteristics') || [],
      status: searchParams.getAll('status') || [],
      additionalFilters: [],
      sortOrder: searchParams.get('sort') || 'relevantes'
    };
  };

  const convertFiltersForBackend = (filters: any): any => {
    const backendFilters: any = {};

    if (filters.operation) backendFilters.operation = filters.operation;
    if (filters.propertyType && filters.propertyType.length > 0) backendFilters.properties = filters.propertyType.join(',');
    if (filters.location) backendFilters.locations = filters.location;
    if (filters.rooms && filters.rooms.length > 0) backendFilters.rooms = filters.rooms.join(',');
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

      const response = await developmentService.getAllDevelopments(backendFilters);
      console.log('✅ Emprendimientos - Respuesta del servicio:', response);

      setDevelopments(response.objects);
      setTotalPages(response.pages);
      setTotalResults(response.total);
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
            isMapView={isMapView}
            onToggleView={handleToggleView}
            activeFilters={getActiveFiltersFromURL()}
          />
        </div>
      </div>

      {/* Layout completo de Emprendimientos con todos los componentes */}
      {!isMapView && (
        <div className="container mx-auto px-4 py-16">
          {/* Primera fila: 1 XL + 1 L */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="h-[500px]">
              <DevelopmentCard
                development={developments[0]}
                variant="XL"
                showAdditionalInfo={false}
                className="h-full"
              />
            </div>
            <div className="h-[400px]">
              <DevelopmentCard
                development={developments[1]}
                variant="L"
                showAdditionalInfo={false}
                className="h-full"
              />
            </div>
          </div>

          {/* Componente Conocé nuestros servicios */}
          <ServiciosExclusivos />

          {/* Segunda fila: 3 L (L L L) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {developments.slice(2, 5).map((development) => (
              <div key={development.id} className="h-[400px]">
                <DevelopmentCard
                  development={development}
                  variant="L"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Tercera fila: 1 L + 1 XL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="h-[400px]">
              <DevelopmentCard
                development={developments[5]}
                variant="L"
                showAdditionalInfo={false}
                className="h-full"
              />
            </div>
            <div className="h-[500px]">
              <DevelopmentCard
                development={developments[6]}
                variant="XL"
                showAdditionalInfo={false}
                className="h-full"
              />
            </div>
          </div>

          {/* Cuarta fila: 3 L (L L L) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {developments.slice(7, 10).map((development) => (
              <div key={development.id} className="h-[400px]">
                <DevelopmentCard
                  development={development}
                  variant="L"
                  showAdditionalInfo={false}
                  className="h-full"
                />
              </div>
            ))}
          </div>

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