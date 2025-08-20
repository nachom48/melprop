import React from 'react';

interface BarrioCardProps {
    barrio: {
        neighborhood: string;
        count?: number;
        description?: string;
        img?: string;
        title?: string;
    };
}

const BarriosCard: React.FC<BarrioCardProps> = ({ barrio }) => {
    // Valores por defecto
    const defaultImage = '/best_1.png';
    const defaultTitle = 'C. A. B. A.';
    const defaultDescription = 'Nació como pueblo, pero hoy es una de las principales zonas comerciales.';

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Imagen - ocupa todo el ancho de la tarjeta */}
            <div className="w-full h-48 overflow-hidden">
                <img
                    src={barrio.img || defaultImage}
                    alt={barrio.neighborhood}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Contenido - fondo gris */}
            <div className="bg-gray-100 p-4">
                {/* Título C.A.B.A. */}
                <div className="text-sm text-gray-500 mb-2">
                    {barrio.title || defaultTitle}
                </div>

                {/* Nombre del barrio */}
                <h3 className="text-green-text-dark text-xl font-bold mb-3">
                    {barrio.neighborhood}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">
                    {barrio.description || defaultDescription}
                </p>

                {/* Contador de propiedades (opcional) */}
                {barrio.count && (
                    <div className="mt-3 text-xs text-gray-500">
                        {barrio.count} {barrio.count === 1 ? 'propiedad' : 'propiedades'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarriosCard;
