import React from 'react';

const Footer: React.FC = () => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter subscription');
    };

    return (
        <footer>
            {/* Canal de atención flotante */}
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

            {/* Footer principal */}
            <div className="wrapper-top-footer">
                <div className="container">
                    <div className="top-footer-columns">
                        {/* Columna 1: Logo y contacto */}
                        <div className="column">
                            <div className="logo">
                                <img src="/mel_logo_white.svg" alt="Logo" />
                            </div>
                            <div className="numbers">
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-phone"></i> &nbsp;&nbsp;
                                        <a href="tel:+541170781635">+(5411) &nbsp;&nbsp;7078-1635</a>
                                    </li>
                                    <li>
                                        <i className="fab fa-whatsapp"></i> &nbsp;&nbsp;
                                        <a href="https://api.whatsapp.com/send?phone=5491132107070&text=Hola%20Mel!%20%F0%9F%91%8B%20Quisiera%20hacerles%20una%20consulta.">
                                            +(5411) &nbsp;&nbsp; 3210-7070
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="social-footer">
                                <a href="https://www.instagram.com/mel.propiedades/">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.facebook.com/Mel.Propiedades">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/mel-propiedades/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>

                        {/* Columna 2: Navegación */}
                        <div className="column">
                            <div className="footer-nav">
                                <ul>
                                    <li>
                                        <h3 className="title-light-green">Sucursales</h3>
                                    </li>
                                    <li>Belgrano Fco.Lacroze 2200</li>
                                    <li>Palermo Cabello 3672</li>
                                    <li>V. Urquiza Mendoza 5302</li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="title-light-green">Atención al cliente</h3>
                                    </li>
                                    <li>Lunes a Viernes de 10 a 19 hs.</li>
                                    <li>Sábados de 10 a 14 hs.</li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="title-light-green">Somos Mel</h3>
                                    </li>
                                    <li><a href="#">Nuestra Historia</a></li>
                                    <li><a href="#">Club de Beneficios</a></li>
                                    <li><a href="#">Sumate al equipo</a></li>
                                    <li><a href="#">Prensa</a></li>
                                </ul>
                                <ul>
                                    <li>
                                        <h3 className="title-light-green">Servicios</h3>
                                    </li>
                                    <li><a href="#">Tasaciones</a></li>
                                    <li><a href="#">Venta y alquiler</a></li>
                                    <li><a href="#">Adm. de alquileres</a></li>
                                    <li><a href="#">As. Jurídico</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Columna 3: Newsletter */}
                        <div className="column search-box-wrapper">
                            <h3 className="title-light-green">Newsletter</h3>
                            <p>Suscribite ahora y recibí las mejores ofertas de acuerdo a tu interés!</p>
                            <div className="wrapper-search-input">
                                <form onSubmit={handleNewsletterSubmit}>
                                    <input type="text" placeholder="Ingresá tu mail..." />
                                    <button type="submit"><i className="fas fa-arrow-right"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer inferior */}
            <div className="wrapper-bottom-footer">
                <div className="container">
                    <div className="wrapper-footer-copy">
                        <div className="fiscal-img">
                            <img src="/fiscal.png" alt="Logo fiscal" />
                        </div>
                        <div>
                            <p>LEGAL - CABA Ley 5859 Artículo 4º "Para los casos de alquiler de vivienda, el monto máximo de
                                comisión que se le puede requerir a los propietarios será el equivalente al cuatro con quince
                                centésimos por ciento (4,15%) del valor total del respectivo contrato. Se encuentra prohibido
                                cobrar a los inquilinos que sean personas físicas comisiones inmobiliarias y gastos de gestoría
                                de informes".</p>
                            <div className="nav-copy">
                                <p>© 2024 Mel Propiedades, Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 