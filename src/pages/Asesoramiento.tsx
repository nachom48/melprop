import React from 'react';
import Oportunidades from '../components/Oportunidades';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';

const Asesoramiento: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section reutilizable */}
            <HeroSection
                imageSrc="/asesoramiento.png"
                imageAlt="Asesoramiento"
                label="Asesoramiento jurídico"
                title="Garantizamos tu seguridad y protección legal"
                description="Contamos con un departamento legal propio experto en materia inmobiliaria,"
                buttonText="Consultanos"
            />

            {/* Video + texto */}
            <div className="my-10">
                <div className="container">
                    <div className="flex gap-8">
                        <div className="basis-7/12">
                            <iframe
                                className="widescreen-video"
                                src="https://www.youtube.com/embed/0Mhmul3Th9s?si=Je5nRTlcxfvPbhiQ&amp;controls=0&rel=0"
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                        <div className="flex basis-5/12 flex-col gap-5">
                            <h3 className="!text-green-text text-3xl leading-9">
                                Tu tranquilidad legal, en manos de especialistas inmobiliarios
                            </h3>
                            <p className="text-label">
                                En Mel Propiedades contamos con un equipo legal propio, listo para asesorarte en cada paso.
                            </p>
                            <p>
                                En Mel Propiedades nos ocupamos de cada detalle de tu operación inmobiliaria. Nuestro departamento legal,
                                conformado por profesionales especializados en derecho inmobiliario, se encarga de revisar y preparar toda la
                                documentación necesaria para que cada contrato y trámite esté en regla y proteja tus intereses.
                            </p>
                            <p>
                                Con una amplia experiencia en el sector, trabajamos para brindarte un servicio transparente y ágil,
                                facilitando cada etapa de la compraventa o alquiler. Así, podés enfocarte en elegir la propiedad ideal
                                mientras nosotros velamos por tu seguridad jurídica.
                            </p>
                            <a href="#" className="btn">Consultanos</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Beneficios */}
            <div className="my-10 bg-green-text bg-half-circle" style={{ backgroundImage: "url('/half_circle_bg.png')" }}>
                <div className="container-medium py-16">
                    <h2 className="!text-green-social m-auto mb-6 w-full max-w-[594px] text-center text-4xl">
                        Conocé los beneficios de nuestro asesoramiento legal
                    </h2>
                    <div className="my-20 flex flex-col gap-10">
                        <div>
                            <div className="max-w-[470px]">
                                <div className="flex items-center gap-4">
                                    <div className="thumb">
                                        <img src="/thumb.svg" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="!text-green-social mb-1 w-full text-2xl">Asesoramiento personalizado</h3>
                                        <p className="text-white">Recibí atención cercana y resolvé cada duda con nuestro equipo legal.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="max-w-[470px]">
                                <div className="flex items-center gap-4">
                                    <div className="thumb">
                                        <img src="/thumb.svg" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="!text-green-social mb-1 w-full text-2xl">Protección legal integral</h3>
                                        <p className="text-white">
                                            Nos aseguramos de que cada paso cumpla con la normativa vigente, cuidando siempre tus intereses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="max-w-[470px]">
                                <div className="flex items-center gap-4">
                                    <div className="thumb">
                                        <img src="/thumb.svg" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="!text-green-social mb-1 w-full text-2xl">Expertise en derecho inmobiliario</h3>
                                        <p className="text-white">
                                            Contamos con amplia trayectoria en el sector, para respaldar todas tus operaciones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <a href="#" className="btn">Consultanos</a>
                    </div>
                </div>
            </div>

            {/* Oportunidades (reutiliza el componente del Home) */}
            <Oportunidades />

            {/* Formulario */}
            <ContactForm
                title="Contactanos para recibir asesoramiento legal de primer nivel"
                description="Confiá en nuestra experiencia y dejá en manos de especialistas la parte legal de tu proyecto inmobiliario."
                buttonText="Consultar ahora!"
            />
        </div>
    );
};

export default Asesoramiento;


