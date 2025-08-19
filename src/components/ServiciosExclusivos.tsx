import React from 'react'

const ServiciosExclusivos = () => {
    return (
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
        </div>)
}

export default ServiciosExclusivos