import { useState, useEffect, useMemo } from 'react';
import { DevelopmentService } from '../developmentService';
import { DevelopmentsResponse } from '../interfaces/developmentResponse.interface';

export const useDevelopmentsPagination = () => {
    const [allDevelopments, setAllDevelopments] = useState<DevelopmentsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10; // ✅ 10 por página (como el layout)

    // ✅ Cargar todos los emprendimientos
    useEffect(() => {
        const loadDevelopments = async () => {
            try {
                setLoading(true);
                const response = await DevelopmentService.getAllDevelopments();
                setAllDevelopments(response);
                console.log('✅ Hook - Emprendimientos cargados:', {
                    total: response.total,
                    objectsLength: response.objects?.length,
                    calculatedPages: Math.ceil(response.total / itemsPerPage)
                });
            } catch (err) {
                setError('Error al cargar emprendimientos');
                console.error('❌ Hook - Error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDevelopments();
    }, []);

    // ✅ Calcular páginas
    const totalPages = useMemo(() => {
        if (!allDevelopments?.total) return 0;
        return Math.ceil(allDevelopments.total / itemsPerPage);
    }, [allDevelopments?.total, itemsPerPage]);

    // ✅ Obtener emprendimientos de la página actual
    const currentPageDevelopments = useMemo(() => {
        if (!allDevelopments?.objects) return [];

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const pageDevelopments = allDevelopments.objects.slice(start, end);
        console.log(`🔄 Hook - Página ${currentPage}:`, {
            start,
            end,
            total: allDevelopments.objects.length,
            pageItems: pageDevelopments.length,
            firstItem: pageDevelopments[0]?.id,
            lastItem: pageDevelopments[pageDevelopments.length - 1]?.id
        });

        return pageDevelopments;
    }, [allDevelopments?.objects, currentPage, itemsPerPage]);

    // ✅ Cambiar página
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            console.log(`🔄 Hook - Cambiando a página ${page}`);
            setCurrentPage(page);
        }
    };

    // ✅ Siguiente página
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // ✅ Página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        // ✅ Datos
        developments: currentPageDevelopments,
        totalItems: allDevelopments?.total || 0,
        currentPage,
        totalPages,
        itemsPerPage,

        // ✅ Estado
        loading,
        error,

        // ✅ Funciones
        goToPage,
        nextPage,
        prevPage,

        // ✅ Estados de navegación
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
};
