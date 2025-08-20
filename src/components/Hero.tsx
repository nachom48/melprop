import React, { useState } from 'react';

const Hero: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div
            className="hero-wrapper"
            style={{ backgroundImage: `url('/hero_bg.png')` }}
        >
            <div className="relative bottom-[-120px] z-2 mx-auto max-w-[864px] px-4">
                {/* Título principal */}
                <h2 className="hero-title">Convertí tus sueños en m<sup>2</sup></h2>

                {/* Caja blanca principal */}
                <div className="rounded-2xl bg-white shadow-lg">
                    {/* Sección de búsqueda */}
                    <div className="p-4 md:p-8">
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
                        <div className="mt-4 flex flex-col md:flex-row rounded-md border border-gray-300 bg-white">
                            <select
                                className="select rounded-t-md md:rounded-l-md md:rounded-t-none md:rounded-b-md md:rounded-br-none border-t-0 md:border-r md:border-b-0 md:border-l-0 focus:outline-none px-3 py-2 md:px-4 md:py-3 text-sm md:text-base"
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
                                className="flex-1 border-0 bg-white px-3 py-2 md:px-4 md:py-3 focus:outline-none text-sm md:text-base"
                                type="text"
                                placeholder="Ingresá ubicación, barrio o localidad"
                            />

                            <button
                                className="btn-search rounded-b-md md:rounded-l-none md:rounded-r-md px-4 py-2 md:px-6 md:py-3 text-white text-sm md:text-base"
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="fas fa-search mr-2"></i>
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Sección de tasación */}
                    <div className="bg-green-text-dark flex flex-col md:flex-row items-start md:items-center justify-between rounded-br-xl rounded-bl-xl p-4 md:p-8 gap-4 md:gap-0">
                        <div>
                            <h2 className="text-lg md:text-2xl font-bold text-white mb-2">Tasá tu propiedad con expertos</h2>
                            <p className="text-green-social text-xs md:text-sm">Realizá una estimación online en minutos</p>
                        </div>
                        <div>
                            <button className="btn-consultanos rounded-lg bg-white px-4 py-2 md:px-6 md:py-3 font-semibold text-green-text-dark text-sm md:text-base w-full md:w-auto">
                                Consultanos
                            </button>
                        </div>
                    </div>
                </div>

                {/* Búsquedas realizadas */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-3 md:p-5">
                    <h3 className="text-green-text text-sm md:text-base font-medium">Búsquedas realizadas:</h3>
                    <ul className="flex flex-col md:flex-row gap-2 md:gap-4">
                        <li>
                            <a
                                href="#"
                                className="text-green-menu text-xs md:text-sm underline hover:text-green-text-dark transition-colors"
                            >
                                Departamento en alquiler en Belgrano
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-green-menu text-xs md:text-sm underline hover:text-green-text-dark transition-colors"
                            >
                                Casa en venta en Villa Urquiza
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Hero; 