import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PropertiesService } from '../modules/Properties/property.service';
import { PropertyDetailResponse } from '../modules/Properties/interfaces/property.interface';
import { NeighborhoodService, NeighborhoodInfo } from '../modules/Barrio/neighborhood.service';
import PropertyActionButtons from '../components/PropertyActionButtons';
import PropertyImageGallery from '../components/PropertyImageGallery';
import PropertyInfoCard from '../components/PropertyInfoCard';
import PropertyContactForm from '../components/PropertyContactForm';
import NeighborhoodInfoComponent from '../components/NeighborhoodInfo';

const PropertyDetailPage = () => {

    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [property, setProperty] = useState<PropertyDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [neighborhoodInfo, setNeighborhoodInfo] = useState<NeighborhoodInfo | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!slug) {
                setError('Slug no válido');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                console.log('🔍 Buscando propiedad con slug:', slug);
                const propertyData = await PropertiesService.getPropertyBySlug(slug);
                console.log('✅ Propiedad encontrada:', propertyData);
                setProperty(propertyData);

                // Obtener información del barrio
                if (propertyData.neighborhood) {
                    try {
                        const neighborhoodData = await NeighborhoodService.getNeighborhoodInfo(propertyData.neighborhood);
                        setNeighborhoodInfo(neighborhoodData);
                    } catch (err) {
                        console.error('❌ Error al obtener información del barrio:', err);
                        // No es crítico, continuamos sin la info del barrio
                    }
                }
            } catch (err: any) {
                console.error('❌ Error al obtener la propiedad:', err);
                console.error('❌ Error details:', err.response?.data);
                console.error('❌ Error status:', err.response?.status);
                console.error('❌ Error URL:', err.config?.url);

                if (err.response?.status === 404) {
                    setError('La propiedad no fue encontrada. Verifica que la URL sea correcta.');
                } else if (err.response?.status === 500) {
                    setError('Error del servidor. Inténtalo de nuevo más tarde.');
                } else {
                    setError(`Error: ${err.message || 'No se pudo cargar la propiedad. Inténtalo de nuevo más tarde.'}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [slug]);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Aquí podrías implementar la lógica para agregar/quitar de favoritos
        console.log('Toggle favorite:', !isFavorite);
    };

    const formatOperationType = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    const formatPropertyType = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Cargando propiedad...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-yellow hover:bg-yellow-medium text-black font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-gray-600">No se encontró la propiedad</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con información de la propiedad y botones de acción */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-start">
                        {/* Información de la propiedad - Lado izquierdo */}
                        <div className="flex-1">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                            >
                                <span className="mr-2">←</span>
                                Volver
                            </button>

                            {/* Operation Type - Type */}
                            <h1 className="text-l text-green-dark mb-2">
                                {formatOperationType(property.operation_type)} - {formatPropertyType(property.type)}
                            </h1>

                            {/* Neighborhood - City */}
                            <p className="text-l text-green-dark ">
                                {property.neighborhood}, {property.city}
                            </p>
                        </div>

                        {/* Botones de acción - Lado derecho */}
                        <div className="ml-8">
                            <PropertyActionButtons
                                propertyName={property.name}
                                propertyUrl={property.url}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={isFavorite}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Galería de imágenes */}
                <PropertyImageGallery
                    images={property.media.images}
                    mainImage={property.main_image}
                    propertyName={property.name}
                />

                {/* Información de la propiedad */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tarjeta de información principal */}
                        <PropertyInfoCard
                            property={property}
                        />
                    </div>

                    {/* Barra lateral */}
                    <div className="space-y-6">
                        {/* Formulario de contacto */}
                        <PropertyContactForm
                            propertyName={property.name}
                        />
                        <div className="w-full h-px bg-light-green mt-6"></div>

                        {/* Información del barrio */}
                        <NeighborhoodInfoComponent
                            neighborhoodInfo={neighborhoodInfo}
                            neighborhoodName={property.neighborhood}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetailPage    