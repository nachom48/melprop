import React from 'react';
import { useDevelopmentsPagination } from './hooks/useDevelopmentsPagination';
import DevelopmentCard from '../../components/DevelopmentCard';
import Pagination from '../../components/Pagination';

// ✅ Ejemplo usando el componente Pagination oficial (mismo estilo que Resultados)
const DevelopmentsList: React.FC = () => {
    const {
        developments,    // Solo los 10 de la página actual
        totalItems,     // Total de emprendimientos (60)
        currentPage,    // Página actual
        totalPages,     // Total de páginas (6)
        loading,
        error,
        goToPage        // Función para cambiar página
    } = useDevelopmentsPagination();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow mx-auto mb-4"></div>
                    <p className="text-font-size-16 text-dark-medium-grey font-raleway">
                        Cargando emprendimientos...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red font-raleway">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-yellow px-6 py-2 rounded-lg text-black font-semibold"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (!developments || developments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-dark-medium-grey font-raleway">
                    No se encontraron emprendimientos
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* ✅ Información de resultados */}
            <div className="text-center">
                <h2 className="text-font-size-24 font-raleway font-bold text-black mb-2">
                    Emprendimientos Disponibles
                </h2>
                <p className="text-font-size-16 text-dark-medium-grey font-raleway">
                    {totalItems} emprendimientos encontrados
                </p>
                <p className="text-font-size-14 text-yellow font-raleway mt-1">
                    Página {currentPage} de {totalPages} • Mostrando {developments.length} emprendimientos
                </p>
            </div>

            {/* ✅ Lista de emprendimientos (10 por página) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {developments.map((development) => (
                    <DevelopmentCard
                        key={development.id}
                        development={development}
                        variant="L"
                    />
                ))}
            </div>

            {/* ✅ Paginación oficial (mismo estilo que Resultados) */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={10}
                onPageChange={goToPage}
                className="mt-8"
            />

            {/* ✅ Debug info */}
            <div className="text-center text-font-size-12 text-light-medium-grey font-raleway">
                <p>Debug: {totalItems} total • 10 por página • {totalPages} páginas calculadas</p>
                <p>Página actual: {currentPage} • Elementos mostrados: {developments.length}</p>
                <p>IDs mostrados: {developments.map(d => d.id).join(', ')}</p>
            </div>
        </div>
    );
};

export default DevelopmentsList;
