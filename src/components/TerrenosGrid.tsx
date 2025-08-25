import React, { useState, useEffect } from 'react';
import TerrenoCard from './TerrenoCard';
import { TerrenoService } from '../modules/Terrenos/terreno.service';
import { Terreno } from '../modules/Terrenos/interfaces/terreno.interface';

interface TerrenosGridProps {
    title?: string;
    neighborhood?: string;
    city?: string;
    limit?: number;
    showFilters?: boolean;
    className?: string;
}

const TerrenosGrid: React.FC<TerrenosGridProps> = ({
    title = "Terrenos Disponibles",
    neighborhood,
    city,
    limit = 11,
    showFilters = false,
    className = ""
}) => {
    const [terrenos, setTerrenos] = useState<Terreno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTerrenos = async () => {
            try {
                setLoading(true);
                setError(null);

                let terrenosData: Terreno[];

                if (neighborhood) {
                    terrenosData = await TerrenoService.getTerrenosByNeighborhood(neighborhood, limit);
                } else {
                    terrenosData = await TerrenoService.getFeaturedTerrenos(limit);
                }

                setTerrenos(terrenosData);
                console.log('✅ Terrenos cargados:', terrenosData.length);
            } catch (err: any) {
                console.error('❌ Error cargando terrenos:', err);
                setError(err.message || 'Error al cargar terrenos');
            } finally {
                setLoading(false);
            }
        };

        fetchTerrenos();
    }, [neighborhood, city, limit]);

    if (loading) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-menu mx-auto mb-4"></div>
                <p className="text-green-text">Cargando terrenos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="text-red-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Error al cargar terrenos</h3>
                <p className="text-dark-medium-grey">{error}</p>
            </div>
        );
    }

    if (terrenos.length === 0) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">No hay terrenos disponibles</h3>
                <p className="text-dark-medium-grey">
                    {neighborhood ? `No se encontraron terrenos en ${neighborhood}` : 'No se encontraron terrenos destacados'}
                </p>
            </div>
        );
    }

    return (
        <div className={className}>
            {title && (
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-black mb-2">{title}</h2>
                    <p className="text-dark-medium-grey">
                        {neighborhood ? `Terrenos disponibles en ${neighborhood}` : 'Terrenos destacados'}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {terrenos.map((terreno) => (
                    <TerrenoCard
                        key={terreno.id}
                        terreno={terreno}
                        variant="default"
                    />
                ))}
            </div>

            {terrenos.length === limit && (
                <div className="text-center mt-8">
                    <button className="bg-green-menu text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Ver más terrenos
                    </button>
                </div>
            )}
        </div>
    );
};

export default TerrenosGrid;
