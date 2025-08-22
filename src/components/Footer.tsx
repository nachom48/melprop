import React from 'react';

const Footer: React.FC = () => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter subscription');
    };

    return (
        <footer className="w-full bg-green-text-dark">
            {/* Canal de atención flotante */}
            <div className="w-4/5 mx-auto relative">
                <div className="canales-atencion">
                    <div className="main-ico">
                        <i className="fas fa-headset"></i>
                    </div>
                    <ul className="list-icons">
                        <li><a href="mailto:contacto@melinmobiliario.com.ar"><i className="far fa-envelope"></i></a></li>
                        <li><a href="tel:+541170781635"><i className="fas fa-phone"></i></a></li>
                        <li><a href="https://wa.me/+541132107070"><i className="fab fa-whatsapp"></i></a></li>
                    </ul>
                </div>
            </div>

            {/* Footer principal */}
            <div className="wrapper-top-footer">
                <div className="w-4/5 mx-auto">
                    <div className="top-footer-columns">
                        {/* Columna 1: Logo y contacto */}
                        <div className="column">
                            <div className="logo">
                                <img src="/mel_logo_white.svg" alt="Logo" />
                            </div>
                            <div className="numbers">
                                <ul>
                                    <li className="text-white text-sm mb-2">
                                        <i className="fa-solid fa-phone"></i> &nbsp;&nbsp;
                                        <a href="tel:+541170781635" className="text-white hover:text-green-fluo transition-colors">+(5411) &nbsp;&nbsp;7078-1635</a>
                                    </li>
                                    <li className="text-white text-sm mb-2">
                                        <i className="fab fa-whatsapp"></i> &nbsp;&nbsp;
                                        <a href="https://api.whatsapp.com/send?phone=5491132107070&text=Hola%20Mel!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta." className="text-white hover:text-green-fluo transition-colors">
                                            +(5411) &nbsp;&nbsp; 3210-7070
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="social-footer flex gap-4 mt-4">
                                <a href="https://www.instagram.com/mel.propiedades/" className="text-white hover:text-green-fluo transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="https://www.facebook.com/Mel.Propiedades" className="text-white hover:text-green-fluo transition-colors">
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/mel-propiedades/" className="text-white hover:text-green-fluo transition-colors">
                                    <i className="fab fa-linkedin-in text-xl"></i>
                                </a>
                            </div>
                        </div>

                        {/* Columna 2: Navegación */}
                        <div className="column">
                            <div className="footer-nav grid grid-cols-2 md:grid-cols-4 gap-8">
                                <ul>
                                    <li>
                                        <h3 className="text-green-fluo text-sm font-bold mb-3">Sucursales</h3>
                                    </li>
                                    <li className="text-white text-sm mb-2">Belgrano Fco.Lacroze 2200</li>
                                    <li className="text-white text-sm mb-2">Palermo Cabello 3672</li>
                                    <li className="text-white text-sm mb-2">V. Urquiza Mendoza 5302</li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="text-green-fluo text-sm font-bold mb-3">Atención al cliente</h3>
                                    </li>
                                    <li className="text-white text-sm mb-2">Lunes a Viernes de 10 a 19 hs.</li>
                                    <li className="text-white text-sm mb-2">Sábados de 10 a 14 hs.</li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="text-green-fluo text-sm font-bold mb-3">Somos Mel</h3>
                                    </li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Nuestra Historia</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Club de Beneficios</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Sumate al equipo</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Prensa</a></li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="text-green-fluo text-sm font-bold mb-3">Servicios</h3>
                                    </li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Tasaciones</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Venta y alquiler</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">Adm. de alquileres</a></li>
                                    <li className="text-white text-sm mb-2"><a href="#" className="hover:text-green-fluo transition-colors">As. Jurídico</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Columna 3: Newsletter */}
                        <div className="column">
                            <h3 className="text-green-fluo text-sm font-bold mb-3">Newsletter</h3>
                            <p className="text-white text-sm mb-4">Suscribite ahora y recibí las mejores ofertas de acuerdo a tu interés!</p>
                            <div className="relative">
                                <form onSubmit={handleNewsletterSubmit} className="relative">
                                    <input
                                        type="email"
                                        placeholder="Ingresá tu mail..."
                                        className="w-full bg-white text-black placeholder-gray-500 px-4 py-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-fluo pr-12"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-light-green text-white rounded-full w-8 h-8 hover:bg-green-fluo transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <i className="fas fa-arrow-right text-sm"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer inferior */}
            <div className="wrapper-bottom-footer">
                <div className="w-4/5 mx-auto">
                    <div className="wrapper-footer-copy flex items-start gap-6">
                        <div className="fiscal-img flex-shrink-0">
                            <img src="/fiscal.png" alt="Logo fiscal" className="w-16 h-16" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-xs leading-relaxed mb-4">LEGAL - CABA Ley 5859 Artículo 4º "Para los casos de alquiler de vivienda, el monto máximo de
                                comisión que se le puede requerir a los propietarios será el equivalente al cuatro con quince
                                centésimos por ciento (4,15%) del valor total del respectivo contrato. Se encuentra prohibido
                                cobrar a los inquilinos que sean personas físicas comisiones inmobiliarias y gastos de gestoría
                                de informes".</p>
                            <div className="nav-copy">
                                <p className="text-white text-xs">© 2024 Mel Propiedades, Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 