import React from 'react';
import BenefitsSection from './BenefitsSection';
import ContactForm from './ContactForm';

const Tasaciones: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="highlight">
                <div className="image image-opacity">
                    <img src="/tasaciones.png" alt="Tasaciones" />
                </div>
                <div className="container">
                    <div className="info">
                        <span className="label">Tasaciones</span>
                        <h2 className="mb-10 text-4xl !text-white">Tasamos tu propiedad</h2>
                        <p className="text-green-fluo">
                            En Mel Propiedades vas a obtener la tasación que te posibilitará la concreción efectiva de la venta o alquiler
                            de la propiedad.
                        </p>
                        <a href="#" className="btn btn-plain !px-10">Consultanos</a>
                    </div>
                </div>
            </div>

            {/* Video Section */}
            <div className="my-10">
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
                            <p>
                                En solo 48 horas, luego de una visita detallada, evaluamos tu propiedad para brindarte una tasación precisa,
                                tanto en venta como en alquiler, en sintonía con el mercado actual
                            </p>
                            <p>
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
            <div className="container">
                <div className="my-10">
                    <div className="container">
                        <div className="mt-5 mb-5 flex flex-col md:mt-0 md:flex-row md:items-center md:justify-between">
                            <h2 className="!text-green-text mb-4 text-4xl">Oportunidades</h2>
                            <a href="#" className="text-light-green flex items-center gap-5 leading-4">
                                Ver más oportunidades <i className="fas fa-circle-chevron-right"></i>
                            </a>
                        </div>
                        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="border-grey-border-light rounded-3xl border-1">
                                <div className="image relative overflow-hidden rounded-tl-3xl rounded-tr-3xl">
                                    <img className="w-full" src="/oportunidades_1.jpg" alt="" />
                                    <a href="#" className="fav"><i className="far fa-heart"></i></a>
                                </div>
                                <div className="content p-4">
                                    <span>Venta - Casa</span>
                                    <h3 className="text-green-text marker mb-3 text-2xl">U$S 630.000</h3>
                                    <div className="mb-3">
                                        <strong>Moldes 1757</strong>
                                        <p className="text-sm">Belgrano, Capital Federal</p>
                                    </div>
                                    <ul className="text-xxs flex flex-wrap gap-2">
                                        <li>430 m<sup>2</sup></li>
                                        <li>5 Ambientes</li>
                                        <li>3 Baños</li>
                                        <li>1 Cochera</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-grey-border-light rounded-3xl border-1">
                                <div className="image relative rounded-tl-3xl rounded-tr-3xl">
                                    <img className="w-full" src="/oportunidades_2.jpg" alt="" />
                                    <a href="#" className="fav"><i className="far fa-heart"></i></a>
                                </div>
                                <div className="content p-4">
                                    <span className="text-sm">Venta - Casa</span>
                                    <h3 className="text-green-text marker mb-3 text-2xl">U$S 265.000</h3>
                                    <div className="mb-3">
                                        <strong>Bucarelli 2989</strong>
                                        <p className="text-sm">Villa Úrquiza, Capital Federal</p>
                                    </div>
                                    <ul className="text-xxs flex flex-wrap gap-2">
                                        <li>110 m<sup>2</sup></li>
                                        <li>4 Ambientes</li>
                                        <li>2 Baños</li>
                                        <li>1 Cochera</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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