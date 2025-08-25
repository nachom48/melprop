import React, { useState, useEffect, useRef } from 'react';
import { PropertyDetailResponse } from '../modules/Properties/interfaces/property.interface';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyInfoCardProps {
    property: PropertyDetailResponse;
}

const PropertyInfoCard: React.FC<PropertyInfoCardProps> = ({ property }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    // Función para remover etiquetas HTML
    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Inicializar mapa cuando el componente se monte
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || !property.latitude || !property.longitude) return;

        // Crear el mapa centrado en la propiedad
        const map = L.map(mapRef.current).setView([property.latitude, property.longitude], 15);
        mapInstanceRef.current = map;

        // Agregar tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Crear marcador para la propiedad
        const marker = L.marker([property.latitude, property.longitude]).addTo(map);

        // Crear popup con información de la propiedad
        const popup = L.popup({
            maxWidth: 300,
            className: 'property-location-popup'
        }).setContent(`
            <div style="text-align: center; padding: 8px;">
                <strong style="color: #12782e; font-size: 14px;">${property.name || property.address}</strong><br>
                <span style="color: #666; font-size: 12px;">${property.neighborhood}, ${property.city}</span>
            </div>
        `);

        marker.bindPopup(popup);

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [property.latitude, property.longitude]);

    // Construir las características clave
    const features = [];
    if (property.type && property.total_m2) {
        features.push(`${property.type.charAt(0).toUpperCase() + property.type.slice(1)} - ${property.total_m2} m²`);
    } else if (property.type) {
        features.push(property.type.charAt(0).toUpperCase() + property.type.slice(1));
    } else if (property.total_m2) {
        features.push(`${property.total_m2} m²`);
    }
    if (property.rooms) features.push(`${property.rooms} Ambientes`);
    if (typeof property.parking_lots === 'number' && property.parking_lots > 0) features.push('Garage');

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Tipo de operación y propiedad */}
            <p className="text-sm text-green-menu mb-2">
                {property.operation_type.charAt(0).toUpperCase() + property.operation_type.slice(1)} - {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </p>

            {/* Precio principal */}
            <div className="mb-2">
                <span className="text-3xl font-bold text-green-menu">
                    {property.currency_symbol} {property.price.toLocaleString()}
                </span>
                {/* Línea amarilla debajo del precio */}
                <div className="w-20 h-1 bg-theme-yellow mt-1"></div>
            </div>

            {/* Expensas */}
            {property.expenses && property.expenses > 0 && (
                <p className="text-green-menu text-lg mb-4">
                    + {property.currency_symbol} {property.expenses.toLocaleString()} Expensas
                </p>
            )}

            {/* Dirección */}
            <p className="text-green-text font-semibold text-lg mb-4">
                {property.address}, {property.neighborhood}, {property.city}
            </p>

            {/* Características clave */}
            <p className="text-green-text mb-4">
                {features.join(' | ')}
            </p>

            {/* Descripción */}
            <div className="text-gray-600 leading-relaxed mb-4">
                {isExpanded ? (
                    <p>{property.body ? stripHtml(property.body) : property.description}</p>
                ) : (
                    <p>{property.description}</p>
                )}
            </div>

            {/* Botón para expandir/contraer descripción */}
            {property.body && property.body.length > 0 && (
                <button
                    onClick={toggleExpanded}
                    className="text-light-green underline hover:text-green-text font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2 rounded-lg px-3 py-1"
                >
                    {isExpanded ? 'Ver menos' : 'Leer descripción completa'}
                </button>
            )}

            <div className="w-full h-px bg-light-green mt-6"></div>


            {/* Sección de Características */}
            {property.amenities && property.amenities.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-green-text-dark mb-4">Características</h3>

                    {/* Primera fila: Metros cuadrados */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {property.total_m2 && (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                    <img
                                        src="/src/img/icons/icon_superficie.svg"
                                        alt="Superficie total"
                                        className="w-full h-full text-green-menu"
                                    />
                                </div>
                                <span className="text-xs text-green-menu font-medium leading-tight">
                                    {property.total_m2} m² totales
                                </span>
                            </div>
                        )}
                        {property.covered_m2 && (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                    <img
                                        src="/src/img/icons/icon_superficie.svg"
                                        alt="Superficie cubierta"
                                        className="w-full h-full text-green-menu"
                                    />
                                </div>
                                <span className="text-xs text-green-menu font-medium leading-tight">
                                    {property.covered_m2} m² cubiertos
                                </span>
                            </div>
                        )}
                        {property.uncovered_m2 && (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                    <img
                                        src="/src/img/icons/icon_superficie.svg"
                                        alt="Superficie descubierta"
                                        className="w-full h-full text-green-menu"
                                    />
                                </div>
                                <span className="text-xs text-green-menu font-medium leading-tight">
                                    {property.uncovered_m2} m² descubiertos
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Filas de amenities con máximo 6 por fila */}
                    <div className="space-y-4">
                        {Array.from({ length: Math.ceil(property.amenities.length / 6) }, (_, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-6 gap-4">
                                {property.amenities.slice(rowIndex * 6, (rowIndex + 1) * 6).map((amenity) => (
                                    <div key={amenity.id} className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                            <img
                                                src={amenity.image.url}
                                                alt={amenity.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs text-green-menu font-medium leading-tight">
                                            {amenity.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Nueva sección: Generales, Servicios y Ambientes */}
                    <div className="mt-8 space-y-6">
                        {/* Generales */}
                        <div>
                            <h4 className="text-base font-semibold text-green-text-dark mb-3">Generales</h4>
                            <div className="space-y-2">
                                {property.total_m2 && (
                                    <p className="text-sm text-gray-700">Superficie Total (m²): {property.total_m2}</p>
                                )}
                                {property.covered_m2 && (
                                    <p className="text-sm text-gray-700">Superficie Cubierta (m²): {property.covered_m2}</p>
                                )}
                                {property.uncovered_m2 && (
                                    <p className="text-sm text-gray-700">Superficie Descubierta (m²): {property.uncovered_m2}</p>
                                )}
                                {property.rooms && (
                                    <p className="text-sm text-gray-700">Cantidad de Ambientes: {property.rooms}</p>
                                )}
                                {property.parking_lots && (
                                    <p className="text-sm text-gray-700">Cantidad de Cochera: {property.parking_lots}</p>
                                )}
                                {property.bathrooms && (
                                    <p className="text-sm text-gray-700">Cantidad de Baños: {property.bathrooms}</p>
                                )}
                                {property.bedrooms && (
                                    <p className="text-sm text-gray-700">Cantidad de Dormitorios: {property.bedrooms}</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-px bg-light-green mt-6"></div>

                        {/* Dirección con icono de mapa */}
                        <div>
                            <h4 className="text-base font-semibold text-green-text-dark mb-3">Ubicación</h4>
                            <div className="flex items-center space-x-2 mb-3">
                                <svg className="w-5 h-5 text-green-menu" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-sm text-gray-700">
                                    {property.address}, {property.neighborhood}, {property.city}
                                </p>
                            </div>

                            {/* Mapa de Google con pin de la propiedad */}
                            {property.latitude && property.longitude && (
                                <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                                    <div
                                        ref={mapRef}
                                        className="w-full h-full"
                                        style={{ minHeight: '256px' }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full h-px bg-light-green mt-6"></div>

                        {/* Servicios */}
                        <div>
                            <h4 className="text-base font-semibold text-green-text-dark mb-3">Servicios</h4>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-700">Internet/WiFi</p>
                                {/* Aquí puedes agregar más servicios si los tienes disponibles */}
                            </div>
                        </div>

                        {/* Ambientes */}
                        <div>
                            <h4 className="text-base font-semibold text-green-text-dark mb-3">Ambientes</h4>
                            <div className="space-y-2">
                                {property.kitchen && (
                                    <p className="text-sm text-gray-700">Cocina {property.kitchen.toLowerCase()}</p>
                                )}
                                {property.balcony_type && (
                                    <p className="text-sm text-gray-700">Balcón {property.balcony_type.toLowerCase()}</p>
                                )}
                                {property.laundry && (
                                    <p className="text-sm text-gray-700">Lavadero {property.laundry.toLowerCase()}</p>
                                )}
                                <p className="text-sm text-gray-700">Living comedor</p>
                                {property.sizes?.terraza && (
                                    <p className="text-sm text-gray-700">Terraza</p>
                                )}
                                {property.sizes?.jardin && (
                                    <p className="text-sm text-gray-700">Jardín</p>
                                )}
                                {property.sizes?.patio && (
                                    <p className="text-sm text-gray-700">Patio</p>
                                )}
                                {property.sizes?.balcon && (
                                    <p className="text-sm text-gray-700">Balcón</p>
                                )}
                                {property.sizes?.comedor && (
                                    <p className="text-sm text-gray-700">Comedor</p>
                                )}
                                {property.sizes?.cocina && (
                                    <p className="text-sm text-gray-700">Cocina</p>
                                )}
                                {property.sizes?.dormitorios && (
                                    <p className="text-sm text-gray-700">Dormitorios</p>
                                )}
                                {property.sizes?.living && (
                                    <p className="text-sm text-gray-700">Living</p>
                                )}
                                {property.sizes?.escritorio && (
                                    <p className="text-sm text-gray-700">Escritorio</p>
                                )}
                                {property.sizes?.playroom && (
                                    <p className="text-sm text-gray-700">Playroom</p>
                                )}
                                {property.sizes?.comedor_diario && (
                                    <p className="text-sm text-gray-700">Comedor diario</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Línea separadora */}
            <div className="w-full h-px bg-light-green mt-6"></div>
        </div>
    );
};

export default PropertyInfoCard;
