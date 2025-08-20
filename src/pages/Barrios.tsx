import React, { useEffect, useState } from 'react';
import { BarrioService } from '../modules/Barrio/barrio.service';
import { BarrioDTO } from '../modules/Barrio/interfaces';
import BarriosGrid from '../components/BarriosGrid';
import LosMejores from '../components/LosMejores';

const Barrios: React.FC = () => {
    const [barrios, setBarrios] = useState<BarrioDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBarrios = async () => {
            try {
                setLoading(true);
                setError(null);
                const barrios = await BarrioService.getBarrios();
                setBarrios(barrios);
            } catch (err) {
                console.error('Error loading barrios:', err);
                setError('Error al cargar los barrios');
                setBarrios([]);
            } finally {
                setLoading(false);
            }
        };
        loadBarrios();
    }, []);

    console.log('Barrios cargados:', barrios);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con imagen de fondo */}
            <div className="relative h-[50vh] w-full">
                {/* Imagen de fondo */}
                <img
                    src="/tasaciones.png"
                    alt="Barrios y Lugares"
                    className="w-full h-full object-cover"
                />

                {/* Overlay oscuro para mejor contraste del texto */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Contenido del header */}
                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-2xl px-10 ml-10">
                        {/* Título principal */}
                        <h3 className="text-white text-lg md:text-xl font-semibold mb-3">
                            Barrios & Lugares
                        </h3>

                        {/* Subtítulo */}
                        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4">
                            Explorá los distintos barrios<br />
                            emblemáticos que hacen vibrar<br />
                            la ciudad de Buenos Aires
                        </h2>

                        {/* Descripción */}
                        <p className="text-light-green text-sm md:text-base leading-relaxed">
                            Conocé su historia, lugares destacados, medios de transporte y todo lo<br />
                            que necesitas para encontrar tu lugar en el mundo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 py-16">
                <h3 className="title-with-lines mb-8">
                    <span>Barrios & Lugares</span>
                </h3>

                {/* Estado de carga */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando barrios...</p>
                    </div>
                )}

                {/* Estado de error */}
                {error && (
                    <div className="text-center py-16">
                        <div className="text-red-600 text-xl mb-4">⚠️</div>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary px-6 py-2 rounded-md"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Grid de barrios */}
                {!loading && !error && barrios.length > 0 && (
                    <BarriosGrid barrios={barrios} />
                )}

                {/* Sin barrios */}
                {!loading && !error && barrios.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-600">No se encontraron barrios disponibles.</p>
                    </div>
                )}
            </div>

            {/* Componente Los Mejores en versión reversed */}
            <LosMejores variant="reversed" />
        </div>
    );
};

export default Barrios;
