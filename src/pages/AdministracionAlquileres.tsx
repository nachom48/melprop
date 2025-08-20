import React from 'react';

const AdministracionAlquileres: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="highlight relative">
                <div className="image image-opacity">
                    <img src="/ada_bg.png" alt="Administración de Alquileres" />
                </div>
                <div className="container">
                    <div className="info">
                        <span className="label">Administración de Alquileres</span>
                        <h2 className="mb-10 text-4xl !text-white">
                            Administración integral de alquileres con asesoramiento personalizado
                        </h2>
                        <p className="text-green-fluo">
                            Disfrutá la tranquilidad de delegar todo en manos expertas.
                        </p>
                        <a href="#" className="btn btn-plain !px-10">
                            Consultanos
                        </a>
                    </div>
                </div>
            </div>

            {/* Contenido adicional de la página */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-green-text mb-8 text-center">
                    Nuestros Servicios de Administración
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Ofrecemos una gestión completa y profesional de tu propiedad en alquiler,
                    desde la búsqueda de inquilinos hasta el mantenimiento continuo.
                </p>

                {/* Grid de servicios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold text-green-text mb-4">Gestión de Inquilinos</h3>
                        <p className="text-gray-600">
                            Búsqueda, selección y verificación de inquilinos calificados para tu propiedad.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold text-green-text mb-4">Cobro de Alquileres</h3>
                        <p className="text-gray-600">
                            Gestión completa del cobro mensual y seguimiento de pagos atrasados.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold text-green-text mb-4">Mantenimiento</h3>
                        <p className="text-gray-600">
                            Coordinación de reparaciones y mantenimiento preventivo de tu propiedad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministracionAlquileres;
