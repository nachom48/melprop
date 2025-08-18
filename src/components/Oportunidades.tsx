import React from 'react';

const Oportunidades: React.FC = () => {
    console.log('Oportunidades component rendering...');

    return (
        <div className="container mx-auto px-4 bg-red-100 border-2 border-red-500">
            <div className="mt-5 mb-5 flex flex-col md:mt-0 md:flex-row md:items-center md:justify-between">
                <h2 className="text-red-600 mb-4 text-4xl">Oportunidades - TEST</h2>
                <a href="#" className="text-blue-600 flex items-center gap-5 leading-4 hover:text-blue-800 transition-colors">
                    Ver más oportunidades <i className="fas fa-circle-chevron-right"></i>
                </a>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-blue-200 p-4 rounded border">
                    <h3>Propiedad 1</h3>
                    <p>Test de renderizado</p>
                </div>
                <div className="bg-green-200 p-4 rounded border">
                    <h3>Propiedad 2</h3>
                    <p>Test de renderizado</p>
                </div>
            </div>
        </div>
    );
};

export default Oportunidades; 