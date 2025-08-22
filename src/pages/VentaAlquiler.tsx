import React from 'react';
import HeroSection from '../components/HeroSection';
import ContactForm from '../components/ContactForm';
import BenefitsSection from '../components/BenefitsSection';
import LosMejores from '../components/LosMejores';

const VentaAlquiler: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section reutilizable */}
            <HeroSection
                imageSrc="/venta_alquiler.png"
                imageAlt="Venta y alquiler"
                label="Venta y alquiler"
                title="Te acompañamos en todo el camino para llegar a tu nuevo hogar"
                description="Contamos con un staff de más de 20 agentes inmobiliarios expertos en inversiones inmobiliarias."
                buttonText="Consultanos"
            />

            {/* Sección de videos con fondo verde */}
            <div className="bg-green-highcontrast mb-10 pt-20 ">
                <div className="container w-4/5 mx-auto">
                    {/* Video principal */}
                    <iframe
                        className="widescreen-video"
                        src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />

                    {/* Grid de 3 videos */}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="flex flex-col gap-3">
                            <iframe
                                className="widescreen-video"
                                src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            <h3 className="text-green-text font-bold">Más de 45 años convirtiendo tus sueños en M2</h3>
                            <p>Contamos con un staff de más de 20 agentes inmobiliarios expertos en inversiones inmobiliarias</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <iframe
                                className="widescreen-video"
                                src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            <h3 className="text-green-text font-bold">Conocé los beneficios de tasar tu propiedad con Mel propiedades</h3>
                            <p>Te ayudamos a maximizar el ingreso por alquiler y evaluar la rentabilidad de la propiedad</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <iframe
                                className="widescreen-video"
                                src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            <h3 className="text-green-text font-bold">Que necesitas para que tasemos tu propiedad</h3>
                            <p>Te contamos la documentación que tenes que tener y tiempos de tasación</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de beneficios de tasación */}
            <BenefitsSection />
            <LosMejores />

            {/* Formulario de contacto con fondo de edificios */}
            <ContactForm
                title="¿Queres encontrar tu nuevo hogar?"
                description="En Mel Propiedades, nos encargamos de todo. Completa el formulario y descubre cómo podemos ayudarte de manera rápida y segura."
                selectPlaceholder="Quiero comprar"
            />
        </div>
    );
};

export default VentaAlquiler;
