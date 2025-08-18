import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../repositories/propertiesRepository';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
    properties: Property[];
    className?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, className = "" }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Crear el mapa
        const map = L.map(mapRef.current).setView([-34.5627, -58.45829], 13);
        mapInstanceRef.current = map;

        // Agregar tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Filtrar propiedades que tengan coordenadas válidas
        const propertiesWithCoords = properties.filter(prop => {
            const lat = typeof prop.latitude === 'number' ? prop.latitude :
                (typeof prop.latitude === 'object' ? prop.latitude.parsedValue : null);
            const lng = typeof prop.longitude === 'number' ? prop.longitude :
                (typeof prop.longitude === 'object' ? prop.longitude.parsedValue : null);
            return lat && lng && !isNaN(lat) && !isNaN(lng);
        });

        // Crear marcadores personalizados para cada propiedad
        propertiesWithCoords.forEach((property) => {
            const lat = typeof property.latitude === 'number' ? property.latitude :
                (typeof property.latitude === 'object' ? property.latitude.parsedValue : 0);
            const lng = typeof property.longitude === 'number' ? property.longitude :
                (typeof property.longitude === 'object' ? property.longitude.parsedValue : 0);

            // Crear icono personalizado con el precio
            const customIcon = L.divIcon({
                className: 'custom-property-marker',
                html: `
                    <div style="background-color: #12782e; color: white; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap;">
                        U$S ${property.price?.toLocaleString() || 'N/A'}
                    </div>
                `,
                iconSize: [80, 30],
                iconAnchor: [40, 15],
                popupAnchor: [0, -15],
            });

            // Crear marcador
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

            // Crear contenido del popup
            const popupContent = `
                <div style="min-width: 250px;">
                    <div style="margin-bottom: 12px;">
                        <img src="${property.main_image || '/placeholder.jpg'}" alt="${property.name}" 
                             style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 8px;">
                        <span style="color: #12782e; font-weight: bold; font-size: 14px;">${property.operation_type} - ${property.type}</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <h3 style="font-size: 18px; font-weight: bold; color: #12782e; margin: 0;">U$S ${property.price?.toLocaleString() || 'N/A'}</h3>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>${property.address}</strong>
                        <p style="font-size: 14px; color: #666; margin: 4px 0 0 0;">${property.neighborhood}</p>
                    </div>
                    <div style="font-size: 12px; color: #888;">
                        ${property.rooms ? `${property.rooms} amb.` : ''} 
                        ${property.bathrooms ? `${property.bathrooms} baños` : ''} 
                        ${property.total_m2 ? `${property.total_m2} m²` : ''}
                    </div>
                </div>
            `;

            // Agregar popup al marcador
            marker.bindPopup(popupContent);
        });

        // Ajustar vista del mapa si hay propiedades
        if (propertiesWithCoords.length > 0) {
            // Crear un array de coordenadas para fitBounds
            const coordinates = propertiesWithCoords.map(prop => {
                const lat = typeof prop.latitude === 'number' ? prop.latitude :
                    (typeof prop.latitude === 'object' ? prop.latitude.parsedValue : 0);
                const lng = typeof prop.longitude === 'number' ? prop.longitude :
                    (typeof prop.longitude === 'object' ? prop.longitude.parsedValue : 0);
                return [lat, lng] as [number, number];
            });

            // Crear bounds manualmente
            if (coordinates.length > 0) {
                const bounds = L.latLngBounds(coordinates);
                map.fitBounds(bounds, { padding: [20, 20] });
            }
        }

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [properties]);

    return (
        <div className={`property-map ${className}`}>
            <div
                ref={mapRef}
                className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-200"
                style={{ minHeight: '600px' }}
            />
        </div>
    );
};

export default PropertyMap;
