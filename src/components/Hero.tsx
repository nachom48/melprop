import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [operationType, setOperationType] = useState('venta'); // Agregar estado para tipo de operación
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!location.trim()) {
            alert('Por favor ingresa una ubicación, barrio o localidad');
            return;
        }

        // Construir los parámetros de búsqueda
        const searchParams = new URLSearchParams();
        searchParams.set('locations', location.trim());

        if (propertyType) {
            searchParams.set('properties', propertyType);
        }

        // Si se seleccionó "Terreno", ir directamente a la página de terrenos
        if (propertyType === 'terreno') {
            navigate(`/terrenos?${searchParams.toString()}`);
            return;
        }

        // Navegar según el tipo de operación seleccionado
        if (operationType === 'venta') {
            searchParams.set('operation', 'venta');
            navigate(`/resultados?${searchParams.toString()}`);
        } else if (operationType === 'alquiler') {
            searchParams.set('operation', 'alquiler');
            navigate(`/resultados?${searchParams.toString()}`);
        } else if (operationType === 'vender') {
            // Para vender, también ir a resultados pero con operación 'venta' (desde el punto de vista del comprador)
            searchParams.set('operation', 'venta');
            navigate(`/resultados?${searchParams.toString()}`);
        }

        // Si es emprendimientos, usar la lógica especial
        if (activeTab === 2) { // Emprendimientos
            // Para emprendimientos, usar 'location' en lugar de 'locations'
            const emprendimientosParams = new URLSearchParams();
            emprendimientosParams.set('location', location.trim());
            if (propertyType) {
                emprendimientosParams.set('properties', propertyType);
            }
            navigate(`/emprendimientos?${emprendimientosParams.toString()}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Sincronizar operationType cuando cambie el tab activo
    React.useEffect(() => {
        if (activeTab === 0) {
            setOperationType('venta');
        } else if (activeTab === 1) {
            setOperationType('alquiler');
        }
        // Para emprendimientos (activeTab === 2) no cambiamos operationType
    }, [activeTab]);

    // Función para obtener el texto del botón según la operación
    const getButtonText = () => {
        switch (operationType) {
            case 'venta':
                return 'Comprar';
            case 'vender':
                return 'Vender';
            case 'alquiler':
                return 'Alquilar';
            default:
                return 'Comprar';
        }
    };

    return (
        <div
            className="hero-wrapper"
            style={{ backgroundImage: `url('/hero_bg.png')` }}
        >
            <div className="relative bottom-[-195px] z-2 mx-auto w-4/5 px-4">
                {/* Título principal */}
                <h2 className="hero-title">Convertí tus sueños en m<sup>2</sup></h2>

                {/* Caja blanca principal - Ahora más ancha */}
                <div className="rounded-2xl bg-white shadow-lg mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                    {/* Sección de búsqueda */}
                    <div className="p-4 md:p-8">
                        {/* Tabs de navegación */}
                        <ul className="nav-pills">
                            <li
                                className={activeTab === 0 ? 'active' : ''}
                                onClick={() => {
                                    setActiveTab(0);
                                    setOperationType('venta');
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                Quiero comprar
                            </li>
                            <li
                                className={activeTab === 1 ? 'active' : ''}
                                onClick={() => {
                                    setActiveTab(1);
                                    setOperationType('alquiler');
                                }}
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
                                className="select w-1/5 rounded-t-md md:rounded-l-md md:rounded-t-none md:rounded-b-md md:rounded-br-none border-t-0 md:border-r md:border-b-0 md:border-l-0 focus:outline-none px-3 py-2 md:px-4 md:py-3 text-sm md:text-base"
                                style={{ cursor: 'pointer' }}
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value="">Todos los tipos</option>
                                <option value="departamento">Departamento</option>
                                <option value="casa">Casa</option>
                                <option value="oficina">Oficina</option>
                            </select>

                            <input
                                className="flex-1 border-0 bg-white px-3 py-2 md:px-4 md:py-3 focus:outline-none text-sm md:text-base"
                                type="text"
                                placeholder="Ingresá ubicación, barrio o localidad"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />

                            <button
                                className="btn-search rounded-b-md md:rounded-l-none md:rounded-r-md px-4 py-2 md:px-6 md:py-3 text-white text-sm md:text-base"
                                style={{ cursor: 'pointer' }}
                                onClick={handleSearch}
                            >
                                <i className="fas fa-search mr-2"></i>
                                {getButtonText()}
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
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-3 md:p-5 mx-4 md:mx-8 lg:mx-16 xl:mx-32">
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