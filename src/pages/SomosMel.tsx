import React from 'react';
import ContactForm from '../components/ContactForm';

const SomosMel: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section con Video */}
            <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
                <video
                    id="background-video"
                    loop
                    autoPlay
                    muted
                    poster="/video_quienes_hero.png"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1
                    }}
                >
                    <source src="/video_quienes_hero.mp4" type="video/mp4" />
                </video>

                {/* Overlay oscuro */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2
                }}></div>

                {/* Texto sobre el video */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingTop: '6%',
                    zIndex: 3
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0', padding: '0 1rem' }}>
                        <h4 className="text-jakarta mb-10 text-xl font-thin !text-white md:text-7xl md:leading-22">
                            <span className="text-green-social">+ 5 DÉCADAS,</span> <br />
                            CONVIRTIENDO <br />
                            TUS SUEÑOS <br />EN M2
                        </h4>
                    </div>
                </div>
            </div>

            {/* Sección Nuestra Historia */}
            <div className="bg-white">
                {/* Línea de color warning entre blanco y verde */}
                <div style={{
                    height: '4px',
                    backgroundColor: 'oklch(82% .189 84.429)',
                    width: '100%'
                }}></div>

                <div className="bg-green-highcontrast pb-10 md:pb-0">
                    <div className="container-lg">
                        <div className="pt-10">
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <h3 className="mb-4 text-3xl">Nuestra historia</h3>
                                    <h4 className="text-warning mb-6">Federico Lacroze 2200 | Belgrano</h4>
                                    <p className="mb-6">
                                        Hace más de 45 años Raúl Mel decide abrirse paso en el mercado inmobiliario, para forjar un camino con
                                        impronta propia.
                                    </p>
                                    <p className="mb-6">
                                        Transformando esta casona en un espacio de acompañamiento para inversores y familias que proyectan la
                                        concreción de sus sueños en m2.
                                    </p>
                                    <p>
                                        Gracias a nuestro profesionalismo y seriedad, hemos generado un sólido vínculo de confianza con nuestros
                                        clientes, lo que nos posiciona como una empresa de gran reconocimiento, confiabilidad y respaldo.
                                    </p>
                                </div>
                                <div className="hidden flex-1 md:flex">
                                    <img className="translate-y-10" src="/historia_slide_1.png" alt="Historia Mel" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Línea naranja separadora al final de "Nuestra historia" */}
            <div style={{
                height: '12px',
                backgroundColor: 'oklch(82% .189 84.429)',
                width: '100%'
            }}></div>

            {/* Sección Valores */}
            <div className="bg-green-text-dark border-warning mb-20 border-b-4">
                <div className="pt-10">
                    <div className="border-green-highcontrast border-b-2">
                        <div className="container-small">
                            <div>
                                <h4 className="text-green-fluo mb-10 text-5xl font-larken font-bold">Los valores hacen</h4>
                                <p className="text-sm leading-7 text-white">
                                    A lo largo de nuestro continuo desarrollo hemos comercializado propiedades de calidad y categoría, entre
                                    las que se cuenta edificios de viviendas, oficinas, locales comerciales y casas. Cada m2 suma experiencia,
                                    capacidad de venta y calidad a nuestra trayectoria.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Línea blanca separadora */}
                    <div className="border-white border-b-2"></div>

                    <div className="md:py-20">
                        <div className="container-medium">
                            <div className="flex flex-wrap gap-10 md:flex-nowrap">
                                <div className="basis-full md:basis-1/3">
                                    <h4 className="text-green-highcontrast mb-3">
                                        <span className="text-6xl">+5</span> <span className="text-2xl">décadas</span>
                                    </h4>
                                    <p className="text-white">Conectando personas, proyectos y lugares</p>
                                </div>
                                <div className="md:basis-2/3">
                                    <h4 className="text-green-fluo marker marker-offset-top mb-3 text-3xl">Trayectoria</h4>
                                    <p className="text-sm leading-7 text-white">
                                        A lo largo de nuestro continuo desarrollo hemos comercializado propiedades de calidad y categoría, entre
                                        las que se cuenta edificios de viviendas, oficinas, locales comerciales y casas. Cada m2 suma experiencia,
                                        capacidad de venta y calidad a nuestra trayectoria.
                                    </p>
                                </div>
                            </div>
                            <div className="divider-gradient my-10"></div>
                            <div className="flex flex-wrap gap-10 md:flex-nowrap">
                                <div className="order-2 basis-full md:order-1 md:basis-2/3">
                                    <h4 className="text-green-fluo marker marker-offset-top mb-3 text-3xl">Confianza</h4>
                                    <p className="text-sm leading-7 text-white">
                                        Gracias a nuestro profesionalismo y seriedad generamos un sólido vínculo de confianza con nuestros
                                        clientes, lo que nos posiciona como una empresa de gran reconocimiento, confiabilidad y respaldo.
                                    </p>
                                </div>
                                <div className="order-1 md:order-2 md:basis-1/3">
                                    <h4 className="text-green-highcontrast mb-3">
                                        <span className="text-6xl">+1M</span> <span className="text-2xl">de M<sup className="text-sm">2</sup></span>
                                    </h4>
                                    <p className="text-white">Más de 1 millón de metros cuadrados comercializados.</p>
                                </div>
                            </div>
                            <div className="divider-gradient my-10"></div>
                            <div className="flex flex-wrap gap-10 md:flex-nowrap">
                                <div className="md:basis-1/3">
                                    <h4 className="text-green-highcontrast mb-3">
                                        <span className="text-6xl">3</span> <span className="text-2xl">sucursales</span>
                                    </h4>
                                    <p className="text-white">Ubicadas en los barrios más estratégicos de CABA.</p>
                                </div>
                                <div className="md:basis-2/3">
                                    <h4 className="text-green-fluo marker marker-offset-top mb-3 text-3xl">Proyección</h4>
                                    <p className="text-sm leading-7 text-white">
                                        La expansión es uno de nuestros principales objetivos. Día a día apostamos a nuevos desafíos para
                                        superarnos y afianzarnos en cada lugar donde estamos presentes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario de Tasación */}
            <ContactForm
                title="¿Queres tasar tu propiedad?"
                description="En Mel Propiedades, nos encargamos de todo. Completa el formulario y descubre cómo podemos ayudarte a vender tu propiedad de manera rápida y segura."
                selectPlaceholder="Tipo de tasación"
            />
        </div>
    );
};

export default SomosMel; 