import React, { useState } from 'react';

interface PropertyDescriptionProps {
    description: string;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Función para truncar el texto a aproximadamente 2 líneas
    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>

            <div className="text-gray-600 leading-relaxed">
                {isExpanded ? (
                    <p>{description}</p>
                ) : (
                    <p>{truncateText(description)}</p>
                )}
            </div>

            {description.length > 150 && (
                <button
                    onClick={toggleExpanded}
                    className="mt-4 text-green-text-dark hover:text-green-text font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2 rounded-lg px-3 py-1"
                >
                    {isExpanded ? 'Ver menos' : 'Leer descripción completa'}
                </button>
            )}
        </div>
    );
};

export default PropertyDescription;
