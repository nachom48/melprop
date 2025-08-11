import React, { useState } from 'react';

const Hero: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div
            className="hero-wrapper bg-cover bg-center bg-no-repeat px-4 mb-[200px]"
            style={{ backgroundImage: `url('/hero_bg.png')`, paddingBottom: '500px' }}
        >
            <div className="absolute bottom-[-168px] left-1/2 transform -translate-x-1/2 z-2 w-full max-w-[864px]">
                {/* Título principal */}
                <h2 className="hero-title text-center mb-8">Convertí tus sueños en m<sup>2</sup></h2>

                {/* Caja blanca principal */}
                <div className="rounded-2xl bg-white shadow-lg">
                    {/* Sección de búsqueda */}
                    <div className="p-8">
                        {/* Tabs de navegación */}
                        <ul className="nav-pills">
                            <li
                                className={activeTab === 0 ? 'active' : ''}
                                onClick={() => setActiveTab(0)}
                                style={{ cursor: 'pointer' }}
                            >
                                Quiero comprar
                            </li>
                            <li
                                className={activeTab === 1 ? 'active' : ''}
                                onClick={() => setActiveTab(1)}
                                style={{ cursor: 'pointer' }}
                            >
                                Quiero alquilar
                            </li>
                            <li
                                className={activeTab === 2 ? 'active' : ''}
                                onClick={() => setActiveTab(2)}
                                style={{ cursor: 'pointer' }}
                            >
                                Emprendimientos
                            </li>
                        </ul>

                        {/* Campos de búsqueda */}
                        <div className="mt-4 flex rounded-md border border-gray-300 bg-white">
                            <select
                                className="select rounded-l-md border-0 border-r border-gray-300 bg-white px-4 py-3 focus:outline-none"
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="">Departamento</option>
                                <option value="">Casa</option>
                                <option value="">Oficina</option>
                                <option value="">PH</option>
                                <option value="">Terreno</option>
                                <option value="">Local</option>
                            </select>

                            <input
                                className="flex-1 border-0 bg-white px-4 py-3 focus:outline-none"
                                type="text"
                                placeholder="Ingresá ubicación, barrio o localidad"
                            />

                            <button
                                className="btn-search rounded-r-md px-6 py-3 text-white"
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="fas fa-search mr-2"></i>
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Sección de tasación */}
                    <div className="bg-green-text-dark flex items-center justify-between rounded-b-2xl p-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Tasá tu propiedad con expertos</h2>
                            <p className="text-green-social text-sm">Realizá una estimación online en minutos</p>
                        </div>
                        <div>
                            <button className="btn-consultanos rounded-lg bg-white px-6 py-3 font-semibold text-green-text-dark">
                                Consultanos
                            </button>
                        </div>
                    </div>
                </div>

                {/* Búsquedas realizadas */}
                <div className="mt-6 flex items-center gap-4">
                    <span className="text-green-text font-medium">Búsquedas realizadas:</span>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-green-menu text-sm underline hover:text-green-text-dark transition-colors"
                        >
                            Departamento en alquiler en Belgrano
                        </a>
                        <a
                            href="#"
                            className="text-green-menu text-sm underline hover:text-green-text-dark transition-colors"
                        >
                            Casa en venta en Villa Urquiza
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 