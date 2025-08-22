import React from 'react';
import BenefitsSection from './BenefitsSection';
import ContactForm from './ContactForm';
import Oportunidades from './Oportunidades';
import HeroSection from './HeroSection';

const Tasaciones: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection
                imageSrc="/tasaciones.png"
                imageAlt="Tasaciones"
                label="Tasaciones"
                title="Tasamos tu propiedad"
                description="En Mel Propiedades vas a obtener la tasación que te posibilitará la concreción efectiva de la venta o alquiler de la propiedad."
                buttonText="Consultanos"
                buttonHref="#"
            />

            {/* Video Section */}
            <div className="my-10 w-4/5 mx-auto">
                <div className="container">
                    <div className="flex gap-8">
                        <div className="basis-7/12">
                            <iframe
                                className="widescreen-video"
                                src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="flex basis-5/12 flex-col gap-5">
                            <h3 className="!text-green-text text-3xl leading-9">Tasaciones con cercanía y confianza</h3>
                            <p className="text-label">
                                +5 décadas conectando personas y propiedades, con más de 1 millón de metros cuadrados comercializados.
                            </p>
                            <p className='text-green-text'>
                                En solo 48 horas, luego de una visita detallada, evaluamos tu propiedad para brindarte una tasación precisa,
                                tanto en venta como en alquiler, en sintonía con el mercado actual
                            </p>
                            <p className='text-green-text'>
                                Entendemos el valor emocional de tu inmueble: sabemos que representa mucho más que un simple bien material.
                                Por eso, nos tomamos el tiempo de conocer cada detalle y reflejar ese valor único en cada uno de nuestros
                                servicios.
                            </p>
                            <a href="#" className="btn w-fit !px-10">Consultanos</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <BenefitsSection />


            {/* Oportunidades Section */}
            <Oportunidades />


            {/* Formulario Section */}
            <ContactForm
                title="¿Queres tasar tu propiedad?"
                description="En Mel Propiedades, nos encargamos de todo. Completa el formulario y descubre cómo podemos ayudarte a vender tu propiedad de manera rápida y segura."
                selectPlaceholder="Tipo de tasación"
            />
        </>
    );
};

export default Tasaciones; 