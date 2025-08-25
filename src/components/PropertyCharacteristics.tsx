import React from 'react';

interface PropertyCharacteristicsProps {
    totalM2?: number;
    coveredM2?: number;
    uncoveredM2?: number;
    amenities: Array<{ id: number; name: string; image: { url: string } }>;
}

const PropertyCharacteristics: React.FC<PropertyCharacteristicsProps> = ({
    totalM2,
    coveredM2,
    uncoveredM2,
    amenities
}) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-green-dark mb-6">Características</h2>

            <div className="grid grid-cols-3 gap-6">
                {/* Primera fila - Medidas */}
                {totalM2 && (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-full h-full text-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-green-dark font-semibold">{totalM2} m² totales</p>
                    </div>
                )}

                {coveredM2 && (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-full h-full text-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-green-dark font-semibold">{coveredM2} m² cubiertos</p>
                    </div>
                )}

                {uncoveredM2 && (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-full h-full text-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-green-dark font-semibold">{uncoveredM2} m² descubiertos</p>
                    </div>
                )}
            </div>

            {/* Amenities en grid de 6 columnas */}
            <div className="mt-8">
                <div className="grid grid-cols-6 gap-4">
                    {amenities.map((amenity) => (
                        <div key={amenity.id} className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                <img
                                    src={amenity.image.url}
                                    alt={amenity.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-green-dark text-sm font-medium">{amenity.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyCharacteristics;
