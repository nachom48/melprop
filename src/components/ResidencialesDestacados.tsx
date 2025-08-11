import React, { useState } from 'react';
import PropertyCard from './PropertyCard';

const properties = [
    {
        id: 1,
        image: '/destacado_1.jpg',
        type: 'Venta - Casa',
        price: 'U$S 630.000',
        address: 'Moldes 1757',
        location: 'Belgrano, Capital Federal',
        area: 430,
        rooms: 5,
        bathrooms: 3,
        garage: 1
    },
    {
        id: 2,
        image: '/destacado_2.jpg',
        type: 'Venta - Casa',
        price: 'U$S 265.000',
        address: 'Bucarelli 2989',
        location: 'Villa Úrquiza, Capital Federal',
        area: 110,
        rooms: 4,
        bathrooms: 2,
        garage: 1
    },
    {
        id: 3,
        image: '/destacado_3.jpg',
        type: 'Venta - Casa',
        price: 'U$S 630.000',
        address: 'Burela 2300',
        location: 'Villa Úrquiza, Capital Federal',
        area: 256,
        rooms: 4,
        bathrooms: 2
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