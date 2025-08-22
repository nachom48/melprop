import React, { useState } from 'react';
import { DevelopmentDetailResponse } from '../modules/Developments/interfaces/developmentDetailResponse.interface';
import { MapPinIcon, HomeIcon, CurrencyDollarIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import './DevelopmentDetail.css';

export interface DevelopmentDetailProps {
    development: DevelopmentDetailResponse;
    className?: string;
}

const DevelopmentDetail: React.FC<DevelopmentDetailProps> = ({
    development,
    className = ""
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showAllAmenities, setShowAllAmenities] = useState(false);

    const formatRooms = (rooms: number[]) => {
        if (!rooms || rooms.length === 0) return 'Consultar';
        if (rooms.length > 1) {
            const lastRoom = rooms[rooms.length - 1];
            const otherRooms = rooms.slice(0, -1);
            return `${otherRooms.join(', ')} y ${lastRoom} ambientes`;
        }
        return `${rooms[0]} ambiente${rooms[0] !== 1 ? 's' : ''}`;
    };

    const formatPrice = (price: number) => {
        return price ? `U$S ${price.toLocaleString()}` : 'Consultar';
    };

    const handleImageChange = (index: number) => {
        setSelectedImageIndex(index);
    };

    const toggleAmenities = () => {
        setShowAllAmenities(!showAllAmenities);
    };

    const displayedAmenities = showAllAmenities
        ? development.amenities
        : development.amenities?.slice(0, 6);

    return (
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {/* Header del desarrollo */}
            <div className="mb-8 development-detail-header">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-font-size-32 lg:text-font-size-40 font-raleway font-bold text-black leading-line-height-36 lg:leading-line-height-48">
                            {development.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <MapPinIcon className="w-5 h-5 text-dark-medium-grey" />
                            <span className="text-font-size-17 text-dark-medium-grey font-raleway">
                                {development.neighborhood}, {development.city}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="bg-gradient-btn-primary px-6 py-3 rounded-lg shadow-button">
                            <span className="text-font-size-14 text-black font-raleway font-semibold uppercase">
                                {development.operation_type}
                            </span>
                        </div>
                        <div className="bg-gradient-btn-secondary px-6 py-3 rounded-lg shadow-button">
                            <span className="text-font-size-14 text-black font-raleway font-semibold uppercase">
                                {development.type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Galería de imágenes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 development-detail-gallery">
                <div className="lg:col-span-2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-custom">
                        <img
                            src={development.media?.images?.[selectedImageIndex]?.url || development.main_image}
                            alt={development.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>

                <div className="space-y-3">
                    {development.media?.images?.slice(0, 4).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleImageChange(index)}
                            className={`w-full aspect-video rounded-lg overflow-hidden image-thumbnail ${selectedImageIndex === index
                                ? 'selected'
                                : ''
                                }`}
                        >
                            <img
                                src={image.url}
                                alt={`${development.name} - Imagen ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Información principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6 development-detail-content">
                    {/* Descripción */}
                    <div className="bg-white rounded-2xl p-6 shadow-custom">
                        <h2 className="text-font-size-24 font-raleway font-bold text-black mb-4 leading-line-height-28">
                            Descripción
                        </h2>
                        <p className="text-font-size-16 text-dark-medium-grey font-raleway leading-line-height-24">
                            {development.description || 'Descripción no disponible'}
                        </p>
                    </div>

                    {/* Características principales */}
                    <div className="bg-white rounded-2xl p-6 shadow-custom">
                        <h2 className="text-font-size-24 font-raleway font-bold text-black mb-4 leading-line-height-28">
                            Características
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="text-center">
                                <HomeIcon className="w-8 h-8 mx-auto mb-2 text-yellow" />
                                <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                    {formatRooms(development.rooms)}
                                </p>
                            </div>
                            <div className="text-center">
                                <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2 text-yellow" />
                                <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                    {development.stage || 'Consultar'}
                                </p>
                            </div>
                            <div className="text-center">
                                <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-yellow" />
                                <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                    {development.posesion || 'Consultar'}
                                </p>
                            </div>
                            <div className="text-center">
                                <CurrencyDollarIcon className="w-8 h-8 mx-auto mb-2 text-yellow" />
                                <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                    {development.status || 'Consultar'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    {development.amenities && development.amenities.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-custom">
                            <h2 className="text-font-size-24 font-raleway font-bold text-black mb-4 leading-line-height-28">
                                Amenities
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {displayedAmenities.map((amenity) => (
                                    <div key={amenity.id} className="flex items-center gap-3 p-3 bg-light-grey rounded-lg">
                                        <img
                                            src={amenity.image.url}
                                            alt={amenity.name}
                                            className="w-8 h-8 object-contain"
                                        />
                                        <span className="text-font-size-14 text-black font-raleway">
                                            {amenity.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {development.amenities.length > 6 && (
                                <button
                                    onClick={toggleAmenities}
                                    className="mt-4 w-full py-3 bg-gradient-btn-secondary rounded-lg text-font-size-14 text-black font-raleway font-semibold hover:bg-gradient-btn-secondary-2 transition-all duration-200 shadow-button"
                                >
                                    {showAllAmenities ? 'Ver menos' : `Ver ${development.amenities.length - 6} más`}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar con información de contacto y precio */}
                <div className="space-y-6 development-detail-sidebar">
                    {/* Tarjeta de precio */}
                    <div className="bg-gradient-container rounded-2xl p-6 text-white shadow-custom">
                        <h3 className="text-font-size-20 font-raleway font-bold mb-4 leading-line-height-24">
                            Precio desde
                        </h3>
                        <div className="text-font-size-32 lg:text-font-size-40 font-raleway font-bold text-yellow mb-4 leading-line-height-36 lg:leading-line-height-48">
                            {formatPrice(development.min_price)}
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-font-size-14 text-light-grey font-raleway">Código de referencia:</span>
                                <span className="text-font-size-14 text-white font-raleway font-semibold">
                                    {development.reference_code}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-font-size-14 text-light-grey font-raleway">Última actualización:</span>
                                <span className="text-font-size-14 text-white font-raleway font-semibold">
                                    {new Date(development.updated).toLocaleDateString('es-ES')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Botón de contacto */}
                    <div className="bg-white rounded-2xl p-6 shadow-custom">
                        <button className="w-full bg-gradient-btn-primary py-4 rounded-lg text-font-size-16 text-black font-raleway font-bold hover:bg-gradient-btn-primary-hover transition-all duration-200 shadow-button">
                            Contactar
                        </button>
                        {development.external_url && (
                            <button className="w-full mt-3 bg-gradient-btn-secondary py-4 rounded-lg text-font-size-16 text-black font-raleway font-semibold hover:bg-gradient-btn-secondary-2 transition-all duration-200 shadow-button">
                                Ver más información
                            </button>
                        )}
                    </div>

                    {/* Información de ubicación */}
                    <div className="bg-white rounded-2xl p-6 shadow-custom">
                        <h3 className="text-font-size-20 font-raleway font-bold text-black mb-4 leading-line-height-24">
                            Ubicación
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-yellow mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-font-size-14 text-black font-raleway font-semibold">
                                        {development.address}
                                    </p>
                                    <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                        {development.neighborhood}, {development.city}
                                    </p>
                                    <p className="text-font-size-14 text-dark-medium-grey font-raleway">
                                        {development.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapa (opcional) */}
            {development.latitude && development.longitude && (
                <div className="bg-white rounded-2xl p-6 shadow-custom mb-8">
                    <h2 className="text-font-size-24 font-raleway font-bold text-black mb-4 leading-line-height-28">
                        Ubicación en el mapa
                    </h2>
                    <div className="aspect-video bg-light-grey rounded-lg flex items-center justify-center">
                        <span className="text-font-size-16 text-dark-medium-grey font-raleway">
                            Mapa interactivo (implementar con librería de mapas)
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevelopmentDetail;
