import React, { useState } from 'react';

interface PropertyActionButtonsProps {
    propertyName: string;
    propertyUrl: string;
    onToggleFavorite?: () => void;
    isFavorite?: boolean;
}

const PropertyActionButtons: React.FC<PropertyActionButtonsProps> = ({
    propertyName,
    propertyUrl,
    onToggleFavorite,
    isFavorite = false
}) => {
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    const handleWhatsApp = () => {
        const message = `Hola! Me interesa la propiedad: ${propertyName}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleFavorite = () => {
        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };

    const handleDownload = () => {
        // Aquí podrías implementar la descarga de la ficha
        console.log('Descargar ficha de la propiedad');
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(propertyUrl);
            // Mostrar mensaje de éxito
            alert('Enlace copiado al portapapeles');
        } catch (err) {
            console.error('Error al copiar enlace:', err);
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = propertyUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Enlace copiado al portapapeles');
        }
    };

    return (
        <div className="flex items-center space-x-3 mt-4">
            {/* Botón WhatsApp */}
            <div className="relative">
                <button
                    onClick={handleWhatsApp}
                    onMouseEnter={() => setShowTooltip('whatsapp')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="w-10 h-10 bg-green-text-dark rounded-full flex items-center justify-center hover:bg-green-text transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                    title="Compartir por WhatsApp"
                >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                </button>
                {showTooltip === 'whatsapp' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                        Compartir por WhatsApp
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>

            {/* Botón Favorito */}
            <div className="relative">
                <button
                    onClick={handleFavorite}
                    onMouseEnter={() => setShowTooltip('favorite')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2 ${isFavorite
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'border-2 border-green-text-dark text-green-text-dark hover:bg-green-text-dark hover:text-white'
                        }`}
                    title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                {showTooltip === 'favorite' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>

            {/* Botón Descargar */}
            <div className="relative">
                <button
                    onClick={handleDownload}
                    onMouseEnter={() => setShowTooltip('download')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="w-10 h-10 border-2 border-green-text-dark rounded-full flex items-center justify-center text-green-text-dark hover:bg-green-text-dark hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                    title="Descargar ficha"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </button>
                {showTooltip === 'download' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                        Descargar ficha
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>

            {/* Botón Imprimir */}
            <div className="relative">
                <button
                    onClick={handlePrint}
                    onMouseEnter={() => setShowTooltip('print')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="w-10 h-10 border-2 border-green-text-dark rounded-full flex items-center justify-center text-green-text-dark hover:bg-green-text-dark hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                    title="Imprimir"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                </button>
                {showTooltip === 'print' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                        Imprimir
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>

            {/* Botón Copiar Enlace */}
            <div className="relative">
                <button
                    onClick={handleCopyLink}
                    onMouseEnter={() => setShowTooltip('link')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="w-10 h-10 border-2 border-green-text-dark rounded-full flex items-center justify-center text-green-text-dark hover:bg-green-text-dark hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                    title="Copiar enlace"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </button>
                {showTooltip === 'link' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg whitespace-nowrap z-10">
                        Copiar enlace
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyActionButtons;
