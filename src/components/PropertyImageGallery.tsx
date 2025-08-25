import React, { useState, useEffect } from 'react';

interface PropertyImageGalleryProps {
    images: Array<{ url: string }>;
    mainImage: string;
    propertyName: string;
}

const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
    images,
    mainImage,
    propertyName
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Combinar la imagen principal con las imágenes adicionales
    const allImages = [mainImage, ...images.map(img => img.url)];

    // Mostrar solo las primeras 5 imágenes en la vista previa
    const previewImages = allImages.slice(0, 5);

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    const openModal = (index: number) => {
        console.log('Abriendo modal con índice:', index);
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('Cerrando modal');
        setIsModalOpen(false);
    };

    const goToImage = (index: number) => {
        setSelectedImageIndex(index);
    };

    const goToPrevious = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setSelectedImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    // Navegación por teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    // Contar tipos de media
    const imageCount = allImages.length;
    const videoCount = 0;

    return (
        <>
            {/* Galería principal */}
            <div className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Imagen principal */}
                    <div className="lg:col-span-2">
                        <div className="bg-white overflow-hidden shadow-lg relative cursor-pointer group">
                            <img
                                src={allImages[0]}
                                alt={`${propertyName} - Imagen principal`}
                                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                                onClick={() => openModal(0)}
                            />
                            {/* Overlay con icono de expandir */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imágenes secundarias en grid 2x2 */}
                    <div className="grid grid-cols-2 gap-3">
                        {previewImages.slice(1).map((image, index) => (
                            <div key={index + 1} className="bg-white overflow-hidden shadow-lg cursor-pointer group aspect-square relative">
                                <img
                                    src={image}
                                    alt={`${propertyName} - Imagen ${index + 2}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onClick={() => openModal(index + 1)}
                                />
                                {/* Overlay con icono de expandir */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contador de media */}
                <div className="mt-6 flex items-center space-x-4">
                    {/* Contador de fotos */}
                    <div className="flex items-center space-x-2 bg-green-text-dark text-white px-4 py-2 rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold">{imageCount}</span>
                    </div>

                    {/* Contador de videos */}
                    {videoCount > 0 && (
                        <div className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">{videoCount}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de imagen grande */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-black text-white">
                        <div>
                            <h3 className="text-lg font-semibold">{propertyName}</h3>
                            <p className="text-sm text-gray-300">
                                {selectedImageIndex + 1} de {allImages.length} imágenes
                            </p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="text-white hover:text-gray-300 p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1 flex">
                        {/* Miniaturas izquierda */}
                        <div className="w-24 bg-gray-900 p-2 overflow-y-auto">
                            <div className="space-y-2">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-full aspect-square overflow-hidden border-2 transition-all duration-200 ${index === selectedImageIndex
                                            ? 'border-green-text-dark scale-105'
                                            : 'border-transparent hover:border-green-text-dark'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Vista previa ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Imagen central con navegación */}
                        <div className="flex-1 flex items-center justify-center relative p-4">
                            {/* Botón anterior */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Imagen central */}
                            <img
                                src={allImages[selectedImageIndex]}
                                alt={`${propertyName} - Imagen ${selectedImageIndex + 1}`}
                                className="max-h-[70vh] max-w-full object-contain"
                            />

                            {/* Botón siguiente */}
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Miniaturas derecha */}
                        <div className="w-24 bg-gray-900 p-2 overflow-y-auto">
                            <div className="space-y-2">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-full aspect-square overflow-hidden border-2 transition-all duration-200 ${index === selectedImageIndex
                                            ? 'border-green-text-dark scale-105'
                                            : 'border-transparent hover:border-green-text-dark'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Vista previa ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Instrucciones */}
                    <div className="p-4 bg-black text-white text-center text-sm">
                        <p>Usa las flechas ← → para navegar • ESC para cerrar</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyImageGallery;
