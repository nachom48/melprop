import React from 'react';
import { NeighborhoodInfo } from '../modules/Barrio/neighborhood.service';

interface NeighborhoodInfoProps {
    neighborhoodInfo: NeighborhoodInfo | null;
    neighborhoodName: string;
    className?: string;
}

const NeighborhoodInfoComponent: React.FC<NeighborhoodInfoProps> = ({
    neighborhoodInfo,
    neighborhoodName,
    className = ""
}) => {
    return (
        <div className={`p-6`}>
            {/* El barrio */}
            <div className="mb-6">
                <h3 className="text-l font-bold text-green-text-dark mb-4">El barrio</h3>
                <div className="flex items-start space-x-4">
                    <div className="flex-1">
                        {neighborhoodInfo?.description ? (
                            <p className="text-green-text leading-relaxed">
                                {neighborhoodInfo.description}
                            </p>
                        ) : (
                            <p className="text-gray-700 leading-relaxed">
                                Barrio residencial tranquilo y arbolado. Conocido por sus calles amplias,
                                plazas pintorescas y arquitectura ecléctica.
                            </p>
                        )}
                    </div>
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medios de transporte */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-theme-yello mb-3">Medios de transporte</h4>
                <div className="space-y-2">
                    {neighborhoodInfo?.transport_info ? (
                        <p className="text-gray-700">{neighborhoodInfo.transport_info}</p>
                    ) : (
                        <>
                            <p className="text-gray-700">Subte Línea B</p>
                            <p className="text-gray-700">Estación "Urquiza" del Ferrocarril Mitre</p>
                            <p className="text-gray-700">Líneas de Colectivo 71, 76, 80, 87, 90, 93, 107, 108, 112 entre otras.</p>
                        </>
                    )}
                </div>
            </div>

            {/* Link para conocer más */}
            <div className="text-center">
                <a
                    href="#"
                    className="text-green-text-dark underline hover:text-green-text transition-colors font-medium"
                >
                    Conocer más
                </a>
            </div>
        </div>
    );
};

export default NeighborhoodInfoComponent;
