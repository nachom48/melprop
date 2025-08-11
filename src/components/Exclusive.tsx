import React from 'react';

const Exclusive: React.FC = () => {
    return (
        <div>
            {/* Formulario de búsqueda */}
            <div className="container">
                <div className="mt-10 flex flex-col gap-4 md:flex-row">
                    <div className="wrapper-input-search flex-1">
                        <input type="text" placeholder="Ingresá ciudades o barrios" className="input w-full" />
                    </div>
                    <div>
                        <select name="" id="" className="select rounded-md border-r focus-visible:outline-none">
                            <option value="">Comprar</option>
                            <option value="">Vender</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className="select rounded-md border-r focus-visible:outline-none">
                            <option value="">Propiedades</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className="select rounded-md border-r focus-visible:outline-none">
                            <option value="">Amb | Dorm</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" className="select rounded-md border-r focus-visible:outline-none">
                            <option value="">Precio</option>
                            <option value="">Mas de 50.000$</option>
                            <option value="">Mas de 100.000$</option>
                        </select>
                    </div>
                    <div className="relative">
                        <div className="bg-green-menu text-small absolute top-[-10px] right-[-10px] z-4 flex h-8 w-8 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-white">
                            <span>3</span>
                        </div>
                        <button className="btn btn-white">Más filtros</button>
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center justify-between rounded-lg bg-gray-100 p-4 md:flex-row">
                    <div>
                        <div className="text-green-menu text-sm font-bold">Casas, Departamentos y PH en Oportunidad</div>
                        <div className="text-sm">6.192 resultados</div>
                    </div>
                    <div>
                        <ul className="flex flex-col items-center gap-6 md:flex-row">
                            <li className="flex gap-2">
                                <a className="text-sm" href="">Ver mapa</a>
                                <img src="/map.svg" alt="" />
                            </li>
                            <li className="flex gap-2">
                                <a className="text-sm" href="">Ver favoritos</a>
                                <img src="/heart.svg" alt="" />
                            </li>
                            <li className="flex gap-2">
                                <a className="text-sm" href="">Guardar búsqueda</a>
                                <img src="/save.svg" alt="" />
                            </li>
                            <li>
                                <select name="" id="" className="select rounded-md border-r focus-visible:outline-none">
                                    <option value="">En oportunidad</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Propiedades destacadas */}
            <div className="my-10">
                <div className="container">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <a href="" className="md:col-span-2">
                            <div className="relative overflow-hidden rounded-lg">
                                <div className="image-opacity-500">
                                    <img className="aspect-[8/11] w-full object-cover md:aspect-[8/5.29]" src="/exclusive_5.png" alt="" />
                                </div>
                                <div className="absolute top-0 p-8">
                                    <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                        Virrey Loreto <br />
                                        1740
                                    </h3>
                                    <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                    <div className="text-white">3 y 4 ambientes</div>
                                </div>
                                <div className="absolute bottom-0 p-8">
                                    <div className="text-white">Desde</div>
                                    <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                    <div className="mt-4 flex gap-4">
                                        <div>
                                            <div className="text-white">Estado</div>
                                            <h4 className="text-warning uppercase">Disponible</h4>
                                        </div>
                                        <div>
                                            <div className="text-white">Posesión</div>
                                            <h4 className="text-warning uppercase">Inmediata</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="">
                            <div className="relative overflow-hidden rounded-lg">
                                <div className="image-opacity-500">
                                    <img className="aspect-[8/11] w-full object-cover" src="/exclusive_1.png" alt="" />
                                </div>
                                <div className="absolute top-0 p-8">
                                    <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                        Sanchez de <br />
                                        Bustamante 1745
                                    </h3>
                                    <h4 className="text-green-fluo font-bold uppercase">Barrio Norte</h4>
                                    <div className="text-white">3 y 4 ambientes</div>
                                </div>
                                <div className="absolute bottom-0 p-8">
                                    <div className="text-white">Desde</div>
                                    <h3 className="!text-green-fluo text-4xl">U$S 83.504</h3>
                                    <div className="mt-4 flex gap-4">
                                        <div>
                                            <div className="text-white">Estado</div>
                                            <h4 className="text-warning uppercase">Disponible</h4>
                                        </div>
                                        <div>
                                            <div className="text-white">Posesión</div>
                                            <h4 className="text-warning uppercase">Inmediata</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Servicios */}
            <div className="my-10">
                <div className="container">
                    <div className="border-b-green-fluo border-b-1 pb-10">
                        <h4 className="text-green-text-dark mb-12 text-center text-3xl">
                            <span>Conocé nuestros servicios exclusivos</span>
                        </h4>
                        <div className="relative m-auto grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="flex gap-3 rounded-2xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.25)] md:p-8">
                                <div className="flex-1">
                                    <h3 className="mb-1 flex items-center gap-2">Venta <i className="fas fa-circle-chevron-right"></i></h3>
                                    <p className="text-sm">Contamos con más de 20 agentes inmobiliarios expertos en inversiones inmobiliarias.</p>
                                </div>
                                <div className="service-icon">
                                    <img src="/services_2.svg" alt="Tasaciones" />
                                </div>
                            </div>
                            <div className="flex gap-3 rounded-2xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.25)] md:p-8">
                                <div className="flex-1">
                                    <h3 className="mb-1 flex items-center gap-2">Tasaciones <i className="fas fa-circle-chevron-right"></i></h3>
                                    <p className="text-sm">En 48 horas tasamos tu propiedad con la efectividad que nos caracteriza.</p>
                                </div>
                                <div className="service-icon">
                                    <img src="/services_1.svg" alt="Tasaciones" />
                                </div>
                            </div>
                            <div className="flex gap-3 rounded-2xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.25)] md:p-8">
                                <div className="flex-1">
                                    <h3 className="mb-1 flex items-center gap-2">
                                        Adm. de alquileres <i className="fas fa-circle-chevron-right"></i>
                                    </h3>
                                    <p className="text-sm">Gestionamos la administración de tu alquiler de forma fácil, rápida y eficaz.</p>
                                </div>
                                <div className="service-icon">
                                    <img src="/services_4.svg" alt="Tasaciones" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de propiedades */}
            <div className="my-10">
                <div className="container">
                    <div className="flex flex-col gap-8">
                        {/* Primera fila */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_1.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Ciudad de la Paz <br />
                                            450
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">3 y 4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_2.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Aguilar <br />
                                            2118
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">3 y 4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_3.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Migueletes <br />
                                            1080
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">1 y 2 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Segunda fila */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_1.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Aguilar <br />
                                            2365
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">1, 2, 3 y 4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 83.504</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Diciembre 2025</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="" className="md:col-span-2">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover md:aspect-[8/5.29]" src="/exclusive_4.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Olleros <br />
                                            1881
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 940.000</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Tercera fila */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_1.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Ciudad de la Paz <br />
                                            450
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">3 y 4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_2.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Aguilar <br />
                                            2118
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">3 y 4 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="">
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className="image-opacity-500">
                                        <img className="aspect-[8/11] w-full object-cover" src="/exclusive_3.png" alt="" />
                                    </div>
                                    <div className="absolute top-0 p-8">
                                        <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                                            Migueletes <br />
                                            1080
                                        </h3>
                                        <h4 className="text-green-fluo font-bold uppercase">Belgrano</h4>
                                        <div className="text-white">1 y 2 ambientes</div>
                                    </div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="text-white">Desde</div>
                                        <h3 className="!text-green-fluo text-4xl">U$S 150.480</h3>
                                        <div className="mt-4 flex gap-4">
                                            <div>
                                                <div className="text-white">Estado</div>
                                                <h4 className="text-warning uppercase">Disponible</h4>
                                            </div>
                                            <div>
                                                <div className="text-white">Posesión</div>
                                                <h4 className="text-warning uppercase">Inmediata</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exclusive; 