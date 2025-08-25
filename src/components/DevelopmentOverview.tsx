import React from 'react';
import { DevelopmentDetailResponse } from '../modules/Developments/developmentService';

interface DevelopmentOverviewProps {
    development: DevelopmentDetailResponse;
    className?: string;
}

const DevelopmentOverview: React.FC<DevelopmentOverviewProps> = ({
    development,
    className = ""
}) => {
    const handleDownloadBrochure = () => {
        if (development.brochure) {
            // Crear un enlace temporal para descarga directa
            const link = document.createElement('a');
            link.href = development.brochure;
            link.download = `Brochure_${development.name}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Función para limpiar HTML y convertir a texto plano
    const cleanHtmlText = (htmlString: string) => {
        if (!htmlString) return '';

        // Crear un elemento temporal para parsear el HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        // Obtener solo el texto, sin etiquetas
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    return (
        <section className={`bg-dark-medium-grey py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Lado izquierdo - Imagen */}
                    <div className="relative">
                        <img
                            src={development.groups[0].main_image}
                            alt={`${development.name} - Vista del emprendimiento`}
                            className="w-full h-auto shadow-custom"
                        />

                        {/* Estadísticas superpuestas en la imagen - Layout en L con bordes completos */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3">
                            {/* Contenedor principal con borde completo */}
                            <div className="flex w-full h-full bg-black bg-opacity-20">
                                <div className="bg-danger flex w-full">
                                    {/* Lado izquierdo: 40 DEPARTAMENTOS | 15 PISOS */}
                                    <div className="flex h-full w-1/2">
                                        <div className="text-center w-full flex flex-col justify-center items-center border border-white">
                                            <div className="text-6xl font-bold text-white">40</div>
                                            <div className=" text-white text-xxs uppercase">DEPARTAMENTOS</div>
                                        </div>
                                        <div className="text-center w-full flex flex-col justify-center items-center border border-white">
                                            <div className="text-6xl font-bold text-white">15</div>
                                            <div className="text-xxs text-white uppercase">PISOS</div>
                                        </div>
                                    </div>

                                    {/* Lado derecho: Dos rectángulos horizontales apilados */}
                                    <div className="flex flex-col w-1/2">
                                        {/* Rectángulo superior: +100m² DE AMENITIES */}
                                        <div className="w-full h-1/2 flex justify-start pl-4 items-center text-center border border-white">
                                            <div className="text-3xl font-bold text-white">+100m²</div>
                                            <div className="text-xs text-white uppercase pl-2">DE AMENITIES</div>
                                        </div>

                                        {/* Rectángulo inferior: 37 COCHERAS */}
                                        <div className="w-full flex h-1/2 justify-start pl-4 items-center text-center border border-white">
                                            <div className="text-2xl font-bold text-white">37</div>
                                            <div className="text-xs text-white uppercase pl-2">COCHERAS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado derecho - Texto y botón */}
                    <div className="text-white space-y-6">
                        {/* Título */}
                        <div>
                            <h3 className="text-white text-2xl font-semibold mb-2">
                                Descubrí
                            </h3>
                            <h2 className="text-green-text text-3xl md:text-4xl font-bold">
                                {development.name}
                            </h2>
                        </div>

                        {/* Descripción */}
                        <div>
                            <h2 className="text-white text-xl font-semibold mb-3">
                                {development.description}
                            </h2>
                        </div>

                        {/* Texto de amenities - LIMPIO DE HTML */}
                        <div>
                            <p className="text-white text-base leading-relaxed">
                                {cleanHtmlText(development.amenities_text)}
                            </p>
                        </div>

                        {/* Botón de descarga */}
                        {development.brochure && (
                            <button
                                onClick={handleDownloadBrochure}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
                            >
                                Descargar brochure
                            </button>
                        )}
                    </div>
                </div>

                {/* Galería de 4 fotos */}
                <div className="mt-16">
                    <div className="grid grid-cols-12 gap-6 h-96">
                        {/* Columna izquierda - Imagen larga y fina */}
                        <div className="col-span-3">
                            <img
                                src={development.media.images[0].url}
                                alt={`${development.name} - Vista interior`}
                                className="w-full h-full object-cover  shadow-custom"
                            />
                        </div>

                        {/* Columna central - Dos imágenes cuadradas apiladas */}
                        <div className="col-span-2 flex flex-col gap-6">
                            {/* Imagen superior */}
                            <div className="flex-1">
                                <img
                                    src={development.media.images[1].url}
                                    alt={`${development.name} - Cocina`}
                                    className="w-full h-full object-cover  shadow-custom"
                                />
                            </div>
                            {/* Imagen inferior */}
                            <div className="flex-1">
                                <img
                                    src={development.media.images[2].url}
                                    alt={`${development.name} - Dormitorio`}
                                    className="w-full h-full object-cover  shadow-custom"
                                />
                            </div>
                        </div>

                        {/* Columna derecha - Imagen más grande */}
                        <div className="col-span-7">
                            <img
                                src={development.media.images[3].url}
                                alt={`${development.name} - Vista exterior`}
                                className="w-full h-full object-cover  shadow-custom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevelopmentOverview;