import React from 'react';
import PropertyCard from './PropertyCard';

const Oportunidades: React.FC = () => {
    const properties = [
        {
            id: 1,
            image: '/destacado_3.jpg',
            type: 'Venta - Casa',
            price: 'U$S 630.000',
            address: 'Moldes 1757',
            location: 'Belgrano, Capital Federal',
            area: 430,
            rooms: 5,
            bathrooms: 3,
            garage: 1,
        },
        {
            id: 2,
            image: '/destacado_3.jpg',
            type: 'Venta - Casa',
            price: 'U$S 265.000',
            address: 'Bucarelli 2989',
            location: 'Villa Úrquiza, Capital Federal',
            area: 110,
            rooms: 4,
            bathrooms: 2,
            garage: 1,
        },
    ];

    return (
        <div className="container mx-auto px-4 ">
            <div className="mt-5 mb-5 flex flex-col md:mt-0 md:flex-row md:items-center md:justify-between">
                <h2 className="!text-green-text mb-4 text-4xl font-larken">Oportunidades</h2>
                <a href="#" className="text-light-green flex items-center gap-5 leading-4 font-jakarta hover:text-green-text-dark transition-colors">
                    Ver más oportunidades <i className="fas fa-circle-chevron-right"></i>
                </a>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </div>
    );
};

export default Oportunidades; 