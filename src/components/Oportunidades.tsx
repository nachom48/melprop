import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import Pagination from './Pagination';
import { Property } from '../repositories/propertiesRepository';

const Oportunidades: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 30; // Ejemplo de 30 páginas

    const properties: Property[] = [
        {
            id: 1,
            url: '/propiedades/1',
            type: 'casa',
            subtype: 'casa',
            development_assigned: false,
            operation_type: 'Venta',
            name: 'Casa en Venta - Belgrano',
            slug: 'casa-venta-belgrano-moldes-1757',
            description: 'Hermosa casa familiar en Belgrano con excelente ubicación y terminaciones de lujo',
            address: 'Moldes 1757',
            address_floor: '',
            neighborhood: 'Belgrano',
            country: 'Argentina',
            currency_symbol: 'U$S',
            city: 'Capital Federal',
            covered_m2: 430,
            uncovered_m2: 120,
            total_m2: 550,
            rooms: 5,
            bathrooms: 3,
            parking_lots: 1,
            status: 'disponible',
            substatus: 'activo',
            main_image: '/destacado_3.jpg',
            latitude: -34.5627,
            longitude: -58.45829,
            reference_code: 'C001',
            add_to_homepage: true,
            media: {
                images: [
                    { url: '/destacado_3.jpg' },
                    { url: '/destacado_3.jpg' },
                    { url: '/destacado_3.jpg' }
                ]
            },
            updated: new Date().toISOString(),
            price: 630000
        },
        {
            id: 2,
            url: '/propiedades/2',
            type: 'casa',
            subtype: 'casa',
            development_assigned: false,
            operation_type: 'Venta',
            name: 'Casa en Venta - Villa Úrquiza',
            slug: 'casa-venta-villa-urquiza-bucarelli-2989',
            description: 'Casa moderna en Villa Úrquiza con diseño contemporáneo y excelente distribución',
            address: 'Bucarelli 2989',
            address_floor: '',
            neighborhood: 'Villa Úrquiza',
            country: 'Argentina',
            currency_symbol: 'U$S',
            city: 'Capital Federal',
            covered_m2: 110,
            uncovered_m2: 80,
            total_m2: 190,
            rooms: 4,
            bathrooms: 2,
            parking_lots: 1,
            status: 'disponible',
            substatus: 'activo',
            main_image: '/destacado_3.jpg',
            latitude: -34.5689,
            longitude: -58.47891,
            reference_code: 'C002',
            add_to_homepage: true,
            media: {
                images: [
                    { url: '/destacado_3.jpg' },
                    { url: '/destacado_3.jpg' },
                    { url: '/destacado_3.jpg' }
                ]
            },
            updated: new Date().toISOString(),
            price: 265000
        }
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log('Cambiando a página:', page);
        // Aquí puedes implementar la lógica para cargar las propiedades de la página
    };

    const handleHomeClick = () => {
        setCurrentPage(1);
        console.log('Volviendo a la primera página');
        // Aquí puedes implementar la lógica para volver a la primera página
    };

    return (
        <div className="container mx-auto px-4">
            <div className="mt-5 mb-5 flex flex-col md:mt-0 md:flex-row md:items-center md:justify-between">
                <h2 className="!text-green-text mb-4 text-4xl font-larken">Oportunidades</h2>
                <a href="#" className="text-light-green flex items-center gap-5 leading-4 font-jakarta hover:text-green-text-dark transition-colors">
                    Ver más oportunidades <i className="fas fa-circle-chevron-right"></i>
                </a>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        showFavoriteButton={true}
                    />
                ))}
            </div>

            {/* Componente de Paginación */}
            <div className="my-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onHomeClick={handleHomeClick}
                />
            </div>
        </div>
    );
};

export default Oportunidades; 