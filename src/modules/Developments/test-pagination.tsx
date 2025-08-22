import React from 'react';
import { useDevelopmentsPagination } from './hooks/useDevelopmentsPagination';
import DevelopmentCard from '../../components/DevelopmentCard';
import Pagination from '../../components/Pagination';

// ✅ Prueba simple de paginación
const TestPagination: React.FC = () => {
    const {
        developments,
        totalItems,
        currentPage,
        totalPages,
        loading,
        error,
        goToPage
    } = useDevelopmentsPagination();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Test Paginación</h1>

            {/* Info */}
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p><strong>Total:</strong> {totalItems} emprendimientos</p>
                <p><strong>Página:</strong> {currentPage} de {totalPages}</p>
                <p><strong>Mostrando:</strong> {developments.length} emprendimientos</p>
            </div>

            {/* Emprendimientos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {developments.map((dev) => (
                    <div key={dev.id} className="p-4 border rounded">
                        <h3 className="font-bold">{dev.name}</h3>
                        <p>ID: {dev.id}</p>
                        <p>Precio: ${dev.min_price}</p>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={10}
                onPageChange={goToPage}
            />
        </div>
    );
};

export default TestPagination;
