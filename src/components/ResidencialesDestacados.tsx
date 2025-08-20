import React, { useState } from 'react';
import PropertyCard from './PropertyCard';

const properties = [
    {
        url: '/propiedades/1',
        id: 1,
        type: 'casa',
        subtype: 'casa',
        development_assigned: false,
        operation_type: 'Venta',
        name: 'Casa en Venta',
        slug: 'casa-en-venta-moldes-1757',
        description: 'Hermosa casa en venta en Belgrano, Capital Federal',
        address: 'Moldes 1757',
        address_floor: '',
        neighborhood: 'Belgrano, Capital Federal',
        country: 'Argentina',
        currency_symbol: 'U$S',
        city: 'Capital Federal',
        covered_m2: 430,
        uncovered_m2: 0,
        total_m2: 430,
        rooms: 5,
        bathrooms: 3,
        parking_lots: 1,
        status: 'disponible',
        substatus: 'activo',
        main_image: '/destacado_1.jpg',
        latitude: 0,
        longitude: 0,
        reference_code: 'C001',
        add_to_homepage: false,
        media: {
            images: [{ url: '/destacado_1.jpg' }]
        },
        updated: new Date().toISOString(),
        price: 630000
    },
    {
        url: '/propiedades/2',
        id: 2,
        type: 'casa',
        subtype: 'casa',
        development_assigned: false,
        operation_type: 'Venta',
        name: 'Casa en Venta',
        slug: 'casa-en-venta-bucarelli-2989',
        description: 'Casa en venta en Villa Úrquiza, Capital Federal',
        address: 'Bucarelli 2989',
        address_floor: '',
        neighborhood: 'Villa Úrquiza, Capital Federal',
        country: 'Argentina',
        currency_symbol: 'U$S',
        city: 'Capital Federal',
        covered_m2: 110,
        uncovered_m2: 0,
        total_m2: 110,
        rooms: 4,
        bathrooms: 2,
        parking_lots: 1,
        status: 'disponible',
        substatus: 'activo',
        main_image: '/destacado_2.jpg',
        latitude: 0,
        longitude: 0,
        reference_code: 'C002',
        add_to_homepage: false,
        media: {
            images: [{ url: '/destacado_2.jpg' }]
        },
        updated: new Date().toISOString(),
        price: 265000
    },
    {
        url: '/propiedades/3',
        id: 3,
        type: 'casa',
        subtype: 'casa',
        development_assigned: false,
        operation_type: 'Venta',
        name: 'Casa en Venta',
        slug: 'casa-en-venta-burela-2300',
        description: 'Casa en venta en Villa Úrquiza, Capital Federal',
        address: 'Burela 2300',
        address_floor: '',
        neighborhood: 'Villa Úrquiza, Capital Federal',
        country: 'Argentina',
        currency_symbol: 'U$S',
        city: 'Capital Federal',
        covered_m2: 256,
        uncovered_m2: 0,
        total_m2: 256,
        rooms: 4,
        bathrooms: 2,
        parking_lots: 0,
        status: 'disponible',
        substatus: 'activo',
        main_image: '/destacado_3.jpg',
        latitude: 0,
        longitude: 0,
        reference_code: 'C003',
        add_to_homepage: false,
        media: {
            images: [{ url: '/destacado_3.jpg' }]
        },
        updated: new Date().toISOString(),
        price: 630000
    }
];

const ResidencialesDestacados: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="bg-white ">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h2 className="residenciales-title mb-6 text-4xl">Residenciales destacados</h2>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setActiveTab(0)}
                            className={`residenciales-button px-8 py-3 rounded-md transition-colors border ${activeTab === 0
                                ? 'active'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            Venta
                        </button>
                        <button
                            onClick={() => setActiveTab(1)}
                            className={`residenciales-button px-8 py-3 rounded-md transition-colors border ${activeTab === 1
                                ? 'active'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            Alquiler
                        </button>
                        <button
                            onClick={() => setActiveTab(2)}
                            className={`residenciales-button px-8 py-3 rounded-md transition-colors border ${activeTab === 2
                                ? 'active'
                                : 'bg-white border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            Últimas visitas
                        </button>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResidencialesDestacados; 