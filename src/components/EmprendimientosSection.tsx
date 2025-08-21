import React, { useEffect, useState } from 'react';
import DevelopmentCard from './DevelopmentCard';
import NuestrosServicios from './NuestrosServicios';
import Oportunidades from './Oportunidades';
import BarriosSection from './BarriosSection';
import { DevelopmentService } from '../modules/Developments/developmentService';

const EmprendimientosSection: React.FC = () => {
    const [developments, setDevelopments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDevelopments = async () => {
            try {
                setLoading(true);
                const response = await DevelopmentService.getAllDevelopments({ add_to_homepage: true });
                setDevelopments(response.objects);
            } catch (error) {
                console.error('Error al cargar emprendimientos:', error);
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

    if (developments.length === 0) {
        return null;
    }

    // Dividir developments en grupos según el layout requerido
    const firstRow = developments.slice(0, 2); // 1 XL + 1 L
    const secondRow = developments.slice(2, 5); // 3 L
    const thirdRow = developments.slice(5, 7); // 1 L + 1 XL
    const fourthRow = developments.slice(7, 10); // 3 L

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-green-text">Emprendimientos</h2>
                <p className="text-lg text-gray-600">Descubrí los mejores emprendimientos inmobiliarios</p>
            </div>

            {/* Primera fila: 1 XL + 1 L */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="h-[500px]">
                    <DevelopmentCard
                        development={firstRow[0]}
                        variant="XL"
                        showAdditionalInfo={false}
                        className="h-full"
                    />
                </div>
                <div className="h-[400px]">
                    <DevelopmentCard
                        development={firstRow[1]}
                        variant="L"
                        showAdditionalInfo={false}
                        className="h-full"
                    />
                </div>
            </div>

            {/* Componente Conocé nuestros servicios */}
            <NuestrosServicios />

            {/* Segunda fila: 3 L */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {secondRow.map((development) => (
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
                        development={thirdRow[0]}
                        variant="L"
                        showAdditionalInfo={false}
                        className="h-full"
                    />
                </div>
                <div className="h-[500px]">
                    <DevelopmentCard
                        development={thirdRow[1]}
                        variant="XL"
                        showAdditionalInfo={false}
                        className="h-full"
                    />
                </div>
            </div>

            {/* Cuarta fila: 3 L */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {fourthRow.map((development) => (
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
            <Oportunidades />

            {/* Componente Barrios y lugares */}
            <BarriosSection />
        </div>
    );
};

export default EmprendimientosSection;
