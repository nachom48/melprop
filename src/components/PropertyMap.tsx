import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../modules/Properties/interfaces/property.interface';

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
    onOpenLoginModal?: () => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, className = "", onOpenLoginModal }) => {
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

        // Función para capitalizar primera letra
        const capitalizeFirst = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        // Función para manejar el clic en el corazón
        const handleHeartClick = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            // Verificar si el usuario está logueado (simulado)
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (!isLoggedIn) {
                // Abrir modal de login en lugar de redirigir
                if (onOpenLoginModal) {
                    onOpenLoginModal();
                } else {
                    // Fallback: mostrar alerta
                    alert('Debes iniciar sesión para agregar favoritos');
                }
            } else {
                // Toggle del corazón
                const heartIcon = e.currentTarget as HTMLElement;
                const isActive = heartIcon.classList.contains('active');

                if (isActive) {
                    heartIcon.classList.remove('active');
                    heartIcon.innerHTML = '<i class="far fa-heart"></i>';
                } else {
                    heartIcon.classList.add('active');
                    heartIcon.innerHTML = '<i class="fas fa-heart"></i>';
                }
            }
        };

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

            // Crear contenido del popup con EXACTAMENTE el mismo estilo que PropertyCard
            const popupContent = `
                <div style="min-width: 320px; max-width: 320px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <!-- Imagen con botón de corazón -->
                    <div style="position: relative; overflow: hidden;">
                        <img src="${property.main_image || '/placeholder.jpg'}" alt="${property.name || `Propiedad en ${property.address}`}" 
                             style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        
                        <!-- Botón de corazón -->
                        <button class="heart-button" style="position: absolute; top: 12px; right: 12px; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: all 0.2s;">
                            <i class="far fa-heart" style="color: #12782e; font-size: 18px;"></i>
                        </button>
                    </div>
                    
                    <!-- Contenido -->
                    <div style="padding: 16px;">
                        <!-- Badge de operación -->
                        <div style="color: #12782e; font-size: 14px; font-weight: 600; margin-bottom: 8px;">
                            ${capitalizeFirst(property.operation_type || '')} - ${property.neighborhood || ''}
                        </div>
                        
                        <!-- Precio -->
                        <div style="color: #12782e; font-size: 24px; font-weight: 700; margin-bottom: 12px;">
                            ${property.currency_symbol || 'U$S'} ${property.price?.toLocaleString() || 'N/A'}
                        </div>
                        
                        <!-- Dirección -->
                        <div style="margin-bottom: 12px;">
                            <strong style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; color: #333;">
                                ${property.name || property.address}
                            </strong>
                            <p style="font-size: 14px; color: #666; margin: 0;">
                                ${property.neighborhood}, ${property.city}
                            </p>
                        </div>
                        
                        <!-- Características -->
                        <ul style="display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none;">
                            ${property.total_m2 ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${typeof property.total_m2 === 'number' ? property.total_m2 : property.total_m2.parsedValue} m²
                            </li>` : ''}
                            ${property.rooms ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${property.rooms} Ambientes
                            </li>` : ''}
                            ${property.bathrooms ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${property.bathrooms} Baños
                            </li>` : ''}
                            ${property.parking_lots > 0 ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${property.parking_lots} Cochera
                            </li>` : ''}
                        </ul>
                    </div>
                </div>
            `;

            // Crear el popup
            const popup = L.popup({
                maxWidth: 320,
                className: 'property-card-popup'
            }).setContent(popupContent);

            // Agregar popup al marcador
            marker.bindPopup(popup);

            // Agregar event listener al botón de corazón cuando se abra el popup
            marker.on('popupopen', () => {
                const heartButton = document.querySelector('.heart-button');
                if (heartButton) {
                    heartButton.addEventListener('click', handleHeartClick);
                }
            });
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
    }, [properties, onOpenLoginModal]);

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
