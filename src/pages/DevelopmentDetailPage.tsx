import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DevelopmentService } from '../modules/Developments/developmentService';
import { DevelopmentDetailResponse } from '../modules/Developments/interfaces/developmentDetailResponse.interface';
import DevelopmentDetail from '../components/DevelopmentDetail';
import DevelopmentNavbar from '../components/DevelopmentNavbar';

const DevelopmentDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [development, setDevelopment] = useState<DevelopmentDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevelopment = async () => {
            if (!slug) {
                setError('Slug no válido');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const developmentData = await DevelopmentService.getDevelopmentBySlug(slug);
                setDevelopment(developmentData);
            } catch (err) {
                console.error('Error al obtener el desarrollo:', err);
                setError('No se pudo cargar el desarrollo. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchDevelopment();
    }, [slug]);

    const handleBackToEmprendimientos = () => {
        navigate('/emprendimientos');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <DevelopmentNavbar developmentName="Cargando..." />
                <main className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow mx-auto mb-4"></div>
                        <p className="text-font-size-16 text-dark-medium-grey font-raleway">
                            Cargando desarrollo...
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !development) {
        return (
            <div className="min-h-screen bg-white">
                <DevelopmentNavbar developmentName="Error" />
                <main className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md mx-auto px-4">
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-16 w-16 text-red"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-font-size-24 font-raleway font-bold text-black mb-4 leading-line-height-28">
                            Error al cargar el desarrollo
                        </h1>
                        <p className="text-font-size-16 text-dark-medium-grey font-raleway mb-6 leading-line-height-24">
                            {error || 'No se pudo encontrar el desarrollo solicitado.'}
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={handleBackToEmprendimientos}
                                className="w-full bg-gradient-btn-primary py-3 px-6 rounded-lg text-font-size-16 text-black font-raleway font-bold hover:bg-gradient-btn-primary-hover transition-all duration-200 shadow-button"
                            >
                                Volver a Emprendimientos
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gradient-btn-secondary py-3 px-6 rounded-lg text-font-size-16 text-black font-raleway font-semibold hover:bg-gradient-btn-secondary-2 transition-all duration-200 shadow-button"
                            >
                                Ir al Inicio
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <DevelopmentNavbar developmentName={development.name} />
            <main>
                {/* Componente de detalle del desarrollo */}
                <DevelopmentDetail development={development} />
            </main>
        </div>
    );
};

export default DevelopmentDetailPage;
