import React, { useState, useEffect } from 'react';
import developmentService from '../services/developmentService';
import DevelopmentCard, { Development } from './DevelopmentCard';

const EmprendimientosSection: React.FC = () => {
    const [developments, setDevelopments] = useState<Development[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDevelopments = async () => {
            try {
                const developmentsData = await developmentService.getAllDevelopments();
                setDevelopments(developmentsData.objects || []);
            } catch (error) {
                console.error('Error loading developments:', error);
                setDevelopments([]);
            } finally {
                setLoading(false);
            }
        };

        loadDevelopments();
    }, []);

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

    // Dividir los emprendimientos en grupos para el layout
    const firstRow = developments.slice(0, 2); // 1XL + 1L
    const secondRow = developments.slice(2, 5); // 3L
    const thirdRow = developments.slice(5, 7); // 1L + 1XL
    const fourthRow = developments.slice(7, 10); // 3XL

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-green-text mb-4 font-larken">Emprendimientos</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Descubrí los mejores emprendimientos inmobiliarios con las mejores ubicaciones y amenidades
                </p>
            </div>

            {/* Primera fila: 1XL + 1L */}
            {firstRow.length >= 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="h-[500px]">
                        <DevelopmentCard
                            development={firstRow[0]}
                            variant="XL"
                            className="h-full"
                        />
                    </div>
                    <div className="h-[400px]">
                        <DevelopmentCard
                            development={firstRow[1]}
                            variant="L"
                            className="h-full"
                        />
                    </div>
                </div>
            )}

            {/* Segunda fila: 3L */}
            {secondRow.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {secondRow.slice(0, 3).map((development) => (
                        <div key={development.id} className="h-[400px]">
                            <DevelopmentCard
                                development={development}
                                variant="L"
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Tercera fila: 1L + 1XL */}
            {thirdRow.length >= 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="h-[400px]">
                        <DevelopmentCard
                            development={thirdRow[0]}
                            variant="L"
                            className="h-full"
                        />
                    </div>
                    <div className="h-[500px]">
                        <DevelopmentCard
                            development={thirdRow[1]}
                            variant="XL"
                            className="h-full"
                        />
                    </div>
                </div>
            )}

            {/* Cuarta fila: 3XL */}
            {fourthRow.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {fourthRow.slice(0, 3).map((development) => (
                        <div key={development.id} className="h-[500px]">
                            <DevelopmentCard
                                development={development}
                                variant="XL"
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Botón para ver más emprendimientos */}
            <div className="text-center">
                <a
                    href="/emprendimientos"
                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
                >
                    Ver todos los emprendimientos
                </a>
            </div>
        </div>
    );
};

export default EmprendimientosSection;
