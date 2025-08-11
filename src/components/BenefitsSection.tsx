import React from 'react';

interface BenefitsSectionProps {
    title?: string;
    className?: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
    title = "Conocé los beneficios de tasar tu propiedad con Mel Propiedades",
    className = ""
}) => {
    return (
        <div className={`my-10 ${className}`}>
            <div className="container-lg">
                <h2 className="m-auto mb-6 w-full max-w-[500px] text-center text-4xl">
                    {title}
                </h2>
                <div className="flex gap-8">
                    <div className="bg-medium-grey flex flex-1 flex-col items-center justify-between rounded-2xl py-6">
                        <div className="flex flex-col items-center flex-1">
                            <div className="border-b-1 border-white px-6 pb-4">
                                <h2 className="mb-4 text-center text-3xl">Tasación venta</h2>
                                <p className="text-center">
                                    Desarrollamos una estrategia integral para posicionar tu propiedad a un precio competitivo y atraer a
                                    compradores potenciales.
                                </p>
                            </div>
                            <ul className="checked-list">
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Determinamos el valor óptimo de venta basándonos en un análisis de propiedades recientemente
                                        comercializadas en la zona.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Consideramos factores clave como su estado de conservación, ubicación y características diferenciadoras
                                        que influyen en el precio final.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Tomamos en cuenta la evolución del mercado inmobiliario (ciclo de compradores vs. vendedores) para
                                        optimizar tiempos y resultados.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Cumplimos con todas las normas nacionales e internacionales y te brindamos asesoramiento integral en cada
                                        etapa de la compraventa.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <a href="#" className="btn">Quiero saber más!</a>
                    </div>
                    <div className="bg-medium-grey flex flex-1 flex-col items-center justify-between rounded-2xl py-6">
                        <div className="flex flex-col items-center flex-1">
                            <div className="border-b-1 border-white px-6 pb-4">
                                <h2 className="mb-4 text-center text-3xl">Tasación alquiler</h2>
                                <p className="text-center">
                                    Te ayudamos a maximizar tu ingreso por alquiler y a evaluar la rentabilidad de tu propiedad.
                                </p>
                            </div>
                            <ul className="checked-list">
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Determinamos el valor justo de renta mediante un análisis comparativo y la situación de la demanda
                                        local.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>Calculamos el potencial de rentabilidad tanto para propietarios como para inversores.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Te asesoramos sobre mejoras, estrategias de promoción y precios competitivos para atraer inquilinos de
                                        calidad.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Consideramos la duración ideal del contrato (corto o largo plazo) según tus objetivos y
                                        necesidades.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className="fas fa-circle-check"></i>
                                    <span>
                                        Valoramos la oferta de inmuebles similares en la zona para definir un posicionamiento sólido en el
                                        mercado de alquiler.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <a href="#" className="btn">Quiero saber más!</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;
