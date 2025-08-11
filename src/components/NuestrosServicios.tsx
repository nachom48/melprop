import React from 'react';

const NuestrosServicios: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h3 className="title-with-lines">
                <span>Nuestros Servicios</span>
            </h3>

            <div className="relative m-auto mb-8 grid max-w-[1026px] grid-cols-1 gap-6 md:grid-cols-2">
                {/* Sello centrado */}
                <div className="mel-stamp">
                    <img src="/mel_stamp.svg" alt="Garantía de Calidad Mel" />
                </div>

                {/* Cards de servicios - Grid 2x2 */}
                <div className="bg-green-highcontrast flex items-start gap-8 rounded-2xl p-3 md:p-8">
                    <div className="service-icon">
                        <img src="/services_1.svg" alt="Tasaciones" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-1 flex items-center gap-2">
                            Tasaciones <i className="fas fa-circle-chevron-right"></i>
                        </h3>
                        <p>En 48 horas tasamos tu propiedad con empatía transparencia y la efectividad que nos caracteriza.</p>
                    </div>
                </div>

                <div className="bg-green-highcontrast flex gap-8 rounded-2xl p-3 md:p-8">
                    <div className="service-icon">
                        <img src="/services_2.svg" alt="Venta y alquiler" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-1 flex items-center gap-2">
                            Venta y alquiler <i className="fas fa-circle-chevron-right"></i>
                        </h3>
                        <p>Contamos con más de 20 agentes inmobiliarios expertos en inversiones inmobiliarias.</p>
                    </div>
                </div>

                <div className="bg-green-highcontrast flex gap-8 rounded-2xl p-3 md:p-8">
                    <div className="service-icon">
                        <img src="/services_3.svg" alt="Asesoramiento jurídico" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-1 flex items-center gap-2">
                            Asesoramiento jurídico <i className="fas fa-circle-chevron-right"></i>
                        </h3>
                        <p>Nuestro departamento legal cuenta con gran experiencia en derecho inmobiliario.</p>
                    </div>
                </div>

                <div className="bg-green-highcontrast flex gap-8 rounded-2xl p-3 md:p-8">
                    <div className="service-icon">
                        <img src="/services_4.svg" alt="Adm. de alquileres" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-1 flex items-center gap-2">
                            Adm. de alquileres <i className="fas fa-circle-chevron-right"></i>
                        </h3>
                        <p>Vamos a gestionar eficazmente la administración de tu alquiler de forma fácil, rápida y eficaz.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuestrosServicios; 