import React, { useState } from 'react';
import { PropertiesService } from '../modules/Properties/property.service';
import { PropertiesResponse } from '../modules/Properties/interfaces/propertiesResponse.interface';

const AdvancedPropertySearch: React.FC = () => {
    const [searchResults, setSearchResults] = useState<PropertiesResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Ejemplo 1: Búsqueda por características específicas
    const searchByFeatures = async () => {
        setLoading(true);
        setError(null);

        try {
            const results = await PropertiesService.searchPropertiesByFeatures({
                hasBalcony: true,
                hasParking: true,
                minRooms: 2,
                maxRooms: 4,
                minBathrooms: 2,
                minPrice: 100000,
                maxPrice: 500000,
                minM2: 80,
                maxM2: 150,
                type: ['departamento', 'casa'],
                operation: ['venta'],
                neighborhoods: ['Belgrano', 'Palermo'],
                no_pagination: true
            });

            setSearchResults(results);
            console.log('🔍 Resultados de búsqueda por características:', results);
        } catch (err: any) {
            setError(err.message);
            console.error('❌ Error en búsqueda por características:', err);
        } finally {
            setLoading(false);
        }
    };

    // Ejemplo 2: Búsqueda avanzada con filtros personalizados
    const searchAdvanced = async () => {
        setLoading(true);
        setError(null);

        try {
            const results = await PropertiesService.searchPropertiesAdvanced({
                type: 'departamento',
                operation: 'venta',
                locations: 'Belgrano,Palermo,Recoleta',
                min_price: 150000,
                max_price: 800000,
                rooms: '2,3,4',
                min_bathrooms: 2,
                parking: true,
                balcon: true,
                m2: '100-200',
                orientation: 'norte,sur',
                age: '0-20',
                amenities: 'piscina,gimnasio,seguridad',
                order_by: 'menorPrecio',
                no_pagination: true
            });

            setSearchResults(results);
            console.log('🔍 Resultados de búsqueda avanzada:', results);
        } catch (err: any) {
            setError(err.message);
            console.error('❌ Error en búsqueda avanzada:', err);
        } finally {
            setLoading(false);
        }
    };

    // Ejemplo 3: Búsqueda por ubicación (radio)
    const searchByLocation = async () => {
        setLoading(true);
        setError(null);

        try {
            const results = await PropertiesService.searchPropertiesAdvanced({
                lat_lng: '-34.6037,-58.3816', // Coordenadas de Buenos Aires
                type: 'departamento',
                operation: 'venta',
                min_price: 100000,
                max_price: 1000000,
                no_pagination: true
            });

            setSearchResults(results);
            console.log('🔍 Resultados de búsqueda por ubicación:', results);
        } catch (err: any) {
            setError(err.message);
            console.error('❌ Error en búsqueda por ubicación:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-green-menu mb-6">
                🔍 Búsqueda Avanzada de Propiedades
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button
                    onClick={searchByFeatures}
                    disabled={loading}
                    className="btn btn-green p-4 text-center hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? '🔍 Buscando...' : '🏠 Buscar por Características'}
                </button>

                <button
                    onClick={searchAdvanced}
                    disabled={loading}
                    className="btn btn-green p-4 text-center hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? '🔍 Buscando...' : '⚙️ Búsqueda Avanzada'}
                </button>

                <button
                    onClick={searchByLocation}
                    disabled={loading}
                    className="btn btn-green p-4 text-center hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? '🔍 Buscando...' : '📍 Buscar por Ubicación'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    ❌ Error: {error}
                </div>
            )}

            {searchResults && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-green-menu mb-4">
                        📊 Resultados de la Búsqueda
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-semibold">Total de propiedades:</span> {searchResults.count}
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <span className="font-semibold">Límite por página:</span> {searchResults.limit}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {searchResults.objects.map((property, index) => (
                            <div key={property.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg text-green-text">
                                            {property.name || `Propiedad ${property.id}`}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            {property.address} - {property.neighborhood}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                {property.type}
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {property.operation_type}
                                            </span>
                                            {property.rooms && (
                                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                                    {property.rooms} ambientes
                                                </span>
                                            )}
                                            {property.bathrooms && (
                                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                                    {property.bathrooms} baños
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-2xl font-bold text-green-menu">
                                            {property.currency_symbol} {property.price?.toLocaleString()}
                                        </div>
                                        {property.covered_m2 && (
                                            <div className="text-sm text-gray-600">
                                                {typeof property.covered_m2 === 'number'
                                                    ? `${property.covered_m2} m²`
                                                    : typeof property.covered_m2 === 'object' && property.covered_m2 !== null && 'parsedValue' in property.covered_m2
                                                        ? `${property.covered_m2.parsedValue} m²`
                                                        : ''}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-menu mb-4">
                    📚 Ejemplos de Uso
                </h3>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-green-text">1. Búsqueda por Características:</h4>
                        <p className="text-sm text-gray-600">
                            Busca propiedades con balcón, cochera, 2-4 habitaciones, 2+ baños, precio entre $100k-$500k, 80-150m²
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-green-text">2. Búsqueda Avanzada:</h4>
                        <p className="text-sm text-gray-600">
                            Filtros personalizados: tipo, operación, barrios, precio, habitaciones, amenities, orientación, edad
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-green-text">3. Búsqueda por Ubicación:</h4>
                        <p className="text-sm text-gray-600">
                            Busca propiedades en un radio específico usando coordenadas lat/lng
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedPropertySearch;
