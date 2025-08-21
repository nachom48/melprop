import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Development } from '../modules/Developments/interfaces/development.interface';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DevelopmentMapProps {
    developments: Development[];
    className?: string;
    onOpenLoginModal?: () => void;
}

const DevelopmentMap: React.FC<DevelopmentMapProps> = ({ developments, className = "", onOpenLoginModal }) => {
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

        // Filtrar developments que tengan coordenadas válidas
        const developmentsWithCoords = developments.filter(dev => {
            const lat = typeof dev.latitude === 'number' ? dev.latitude :
                (typeof dev.latitude === 'object' ? dev.latitude.parsedValue : null);
            const lng = typeof dev.longitude === 'number' ? dev.longitude :
                (typeof dev.longitude === 'object' ? dev.longitude.parsedValue : null);
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

        // Crear marcadores personalizados para cada development
        developmentsWithCoords.forEach((development) => {
            const lat = typeof development.latitude === 'number' ? development.latitude :
                (typeof development.latitude === 'object' ? development.latitude.parsedValue : 0);
            const lng = typeof development.longitude === 'number' ? development.longitude :
                (typeof development.longitude === 'object' ? development.longitude.parsedValue : 0);

            // Crear icono personalizado con el precio mínimo
            const customIcon = L.divIcon({
                className: 'custom-development-marker',
                html: `
                    <div style="background-color: #12782e; color: white; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap;">
                        ${development.min_price ? `U$S ${development.min_price.toLocaleString()}` : 'Consultar'}
                    </div>
                `,
                iconSize: [80, 30],
                iconAnchor: [40, 15],
                popupAnchor: [0, -15],
            });

            // Crear marcador
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

            // Crear contenido del popup con el mismo estilo que DevelopmentCard
            const popupContent = `
                <div style="min-width: 320px; max-width: 320px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <!-- Imagen con botón de corazón -->
                    <div style="position: relative; overflow: hidden;">
                        <img src="${development.main_image || '/placeholder.jpg'}" alt="${development.name}" 
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
                            ${capitalizeFirst(development.operation_type || '')} - ${development.neighborhood || ''}
                        </div>
                        
                        <!-- Precio -->
                        <div style="color: #12782e; font-size: 24px; font-weight: 700; margin-bottom: 12px;">
                            ${development.min_price ? `U$S ${development.min_price.toLocaleString()}` : 'Consultar'}
                        </div>
                        
                        <!-- Dirección -->
                        <div style="margin-bottom: 12px;">
                            <strong style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; color: #333;">
                                ${development.name}
                            </strong>
                            <p style="font-size: 14px; color: #666; margin: 0;">
                                ${development.neighborhood}, ${development.city}
                            </p>
                        </div>
                        
                        <!-- Características -->
                        <ul style="display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none;">
                            ${development.rooms && development.rooms.length > 0 ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${development.rooms.join(', ')} Ambientes
                            </li>` : ''}
                            ${development.posesion ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${development.posesion}
                            </li>` : ''}
                            ${development.stage ? `<li style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">
                                ${development.stage}
                            </li>` : ''}
                        </ul>
                    </div>
                </div>
            `;

            // Crear el popup
            const popup = L.popup({
                maxWidth: 320,
                className: 'development-card-popup'
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

        // Ajustar vista del mapa si hay developments
        if (developmentsWithCoords.length > 0) {
            // Crear un array de coordenadas para fitBounds
            const coordinates = developmentsWithCoords.map(dev => {
                const lat = typeof dev.latitude === 'number' ? dev.latitude :
                    (typeof dev.latitude === 'object' ? dev.latitude.parsedValue : 0);
                const lng = typeof dev.longitude === 'number' ? dev.longitude :
                    (typeof dev.longitude === 'object' ? dev.longitude.parsedValue : 0);
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
    }, [developments, onOpenLoginModal]);

    return (
        <div className={`development-map ${className}`}>
            <div
                ref={mapRef}
                className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-200"
                style={{ minHeight: '600px' }}
            />
        </div>
    );
};

export default DevelopmentMap;
