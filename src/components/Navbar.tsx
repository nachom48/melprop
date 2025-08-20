import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useUser } from '../context/UserContext';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { user, isLoggedIn, logout } = useUser();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<string[]>([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    // Detectar scroll para cambiar estilos
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
        setMobileOpenSubmenus([]);
    };

    const handleLoginClick = (mode: 'login' | 'register') => {
        setLoginMode(mode);
        setShowLoginModal(true);
        closeMenu();
    };

    const handleMouseEnter = (item: string) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const toggleMobileSubmenu = (submenu: string) => {
        setMobileOpenSubmenus(prev =>
            prev.includes(submenu)
                ? prev.filter(item => item !== submenu)
                : [...prev, submenu]
        );
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    const navigate = useNavigate();

    const handleSearch = (operation: 'venta' | 'alquiler', formData: FormData) => {
        const searchParams = new URLSearchParams();

        // Agregar operación
        searchParams.set('operation', operation);

        // Obtener tipo de propiedad seleccionada
        const propertyTypes = [];
        if (operation === 'venta') {
            if (formData.get('depto')) propertyTypes.push('departamento');
            if (formData.get('casa')) propertyTypes.push('casa');
            if (formData.get('ph')) propertyTypes.push('ph');
            if (formData.get('deposito')) propertyTypes.push('deposito');
            if (formData.get('oficina')) propertyTypes.push('oficina');
            if (formData.get('terreno')) propertyTypes.push('terreno');
            if (formData.get('local')) propertyTypes.push('local');
            if (formData.get('edificio-block')) propertyTypes.push('edificio');
        } else {
            if (formData.get('alqdepto')) propertyTypes.push('departamento');
            if (formData.get('alqcasa')) propertyTypes.push('casa');
            if (formData.get('alqph')) propertyTypes.push('ph');
            if (formData.get('alqdeposito')) propertyTypes.push('deposito');
            if (formData.get('alqoficina')) propertyTypes.push('oficina');
            if (formData.get('alqterreno')) propertyTypes.push('terreno');
            if (formData.get('alqlocal')) propertyTypes.push('local');
            if (formData.get('alqedificio-block')) propertyTypes.push('edificio');
        }

        if (propertyTypes.length > 0) {
            searchParams.set('properties', propertyTypes.join(','));
        }

        // Obtener ubicación
        if (operation === 'venta') {
            const locations = [];
            if (formData.get('belgrano')) locations.push('Belgrano');
            if (formData.get('urquiza')) locations.push('Villa Urquiza');
            if (formData.get('nunez')) locations.push('Nuñez');
            if (formData.get('palermo')) locations.push('Palermo');
            if (formData.get('colegiales')) locations.push('Colegiales');
            if (locations.length > 0) {
                searchParams.set('location', locations.join(','));
            }
        } else {
            const locations = [];
            if (formData.get('alqbelgrano')) locations.push('Belgrano');
            if (formData.get('alqurquiza')) locations.push('Villa Urquiza');
            if (formData.get('alqnunez')) locations.push('Nuñez');
            if (formData.get('alqpalermo')) locations.push('Palermo');
            if (formData.get('alqcolegiales')) locations.push('Colegiales');
            if (locations.length > 0) {
                searchParams.set('location', locations.join(','));
            }
        }

        // Obtener ambientes
        if (operation === 'venta') {
            if (formData.get('1amb')) searchParams.set('rooms', '1');
            else if (formData.get('2amb')) searchParams.set('rooms', '2');
            else if (formData.get('3amb')) searchParams.set('rooms', '3');
            else if (formData.get('4amb')) searchParams.set('rooms', '4');
            else if (formData.get('+4amb')) searchParams.set('rooms', '5');
        } else {
            if (formData.get('alq1amb')) searchParams.set('rooms', '1');
            else if (formData.get('alq2amb')) searchParams.set('rooms', '2');
            else if (formData.get('alq3amb')) searchParams.set('rooms', '3');
            else if (formData.get('alq4amb')) searchParams.set('rooms', '4');
            else if (formData.get('alq+4amb')) searchParams.set('rooms', '5');
        }

        // Obtener características
        const features = [];
        if (operation === 'venta') {
            if (formData.get('cochera')) features.push('cochera');
            if (formData.get('balcon')) features.push('balcon');
            if (formData.get('terraza')) features.push('terraza');
            if (formData.get('piscina')) features.push('piscina');
            if (formData.get('2banos')) features.push('2banos');
            if (formData.get('toilette')) features.push('toilette');
        } else {
            if (formData.get('alqcochera')) features.push('cochera');
            if (formData.get('alqvestidor')) features.push('vestidor');
            if (formData.get('alqterraza')) features.push('terraza');
            if (formData.get('alqpiscina')) features.push('piscina');
            if (formData.get('alqparrilla')) features.push('parrilla');
            if (formData.get('alqtoilette')) features.push('toilette');
        }

        if (features.length > 0) {
            searchParams.set('features', features.join(','));
        }

        // Obtener estado
        if (operation === 'venta') {
            if (formData.get('estrenar')) searchParams.set('state', 'estrenar');
            else if (formData.get('hasta5')) searchParams.set('state', 'hasta5');
            else if (formData.get('hasta10')) searchParams.set('state', 'hasta10');
            else if (formData.get('+de10')) searchParams.set('state', 'masde10');
        } else {
            if (formData.get('alqestrenar')) searchParams.set('state', 'estrenar');
            else if (formData.get('alqhasta5')) searchParams.set('state', 'hasta5');
            else if (formData.get('alqhasta10')) searchParams.set('state', 'hasta10');
            else if (formData.get('alq+de10')) searchParams.set('state', 'masde10');
        }

        // Obtener precio
        if (operation === 'venta') {
            const currency = formData.get('currency-venta');
            if (currency === 'dolares') searchParams.set('currency', 'USD');
            else if (currency === 'pesos') searchParams.set('currency', 'ARS');

            const desde = formData.get('desde');
            const hasta = formData.get('hasta');
            if (desde) searchParams.set('priceMin', desde.toString());
            if (hasta) searchParams.set('priceMax', hasta.toString());
        } else {
            const currency = formData.get('currency-alquiler');
            if (currency === 'alqdolares') searchParams.set('currency', 'USD');
            else if (currency === 'alqpesos') searchParams.set('currency', 'ARS');

            const desde = formData.get('alqdesde');
            const hasta = formData.get('alqhasta');
            if (desde) searchParams.set('priceMin', desde.toString());
            if (hasta) searchParams.set('priceMax', hasta.toString());
        }

        // Agregar página
        searchParams.set('page', '1');

        // Navegar a la página de resultados
        navigate(`/resultados?${searchParams.toString()}`);

        // Cerrar el submenú
        setHoveredItem(null);
    };

    return (
        <>
            <header className={`navbar-header ${isScrolled ? 'scrolled' : ''} w-full`}>
                <div className="navbar-container w-full">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <Link to="/" onClick={closeMenu}>
                            <img src="/mel_logo_green.svg" alt="Mel Propiedades" />
                        </Link>
                    </div>

                    {/* Menú desktop */}
                    <nav className="navbar-desktop-nav">
                        <div className="nav-links">
                            <div
                                className="nav-link-dropdown"
                                onMouseEnter={() => handleMouseEnter('comprar')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="nav-link">
                                    Comprar <i className={`fa-solid ${hoveredItem === 'comprar' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </span>
                                {hoveredItem === 'comprar' && (
                                    <div className="submenu-wrapper">
                                        <div className="submenu-content">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.currentTarget);
                                                handleSearch('venta', formData);
                                            }}>
                                                <div className="submenu-grid">
                                                    <div className="submenu-column">
                                                        <h4>Tipo de propiedad</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="depto" id="depto" /> Departamento</label>
                                                            <label><input type="checkbox" name="casa" id="casa" /> Casa</label>
                                                            <label><input type="checkbox" name="ph" id="ph" /> PH</label>
                                                            <label><input type="checkbox" name="deposito" id="deposito" /> Depósito</label>
                                                            <label><input type="checkbox" name="oficina" id="oficina" /> Oficina</label>
                                                            <label><input type="checkbox" name="terreno" id="terreno" /> Terreno</label>
                                                            <label><input type="checkbox" name="local" id="local" /> Local</label>
                                                            <label><input type="checkbox" name="edificio-block" id="edificio-block" /> Edificio en block</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Ubicación</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="belgrano" id="belgrano" /> Belgrano</label>
                                                            <label><input type="checkbox" name="urquiza" id="urquiza" /> Villa Urquiza</label>
                                                            <label><input type="checkbox" name="nunez" id="nunez" /> Nuñez</label>
                                                            <label><input type="checkbox" name="palermo" id="palermo" /> Palermo</label>
                                                            <label><input type="checkbox" name="colegiales" id="colegiales" /> Colegiales</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Ambientes</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="1amb" id="1amb" /> 1 ambiente</label>
                                                            <label><input type="checkbox" name="2amb" id="2amb" /> 2 ambientes</label>
                                                            <label><input type="checkbox" name="3amb" id="3amb" /> 3 ambientes</label>
                                                            <label><input type="checkbox" name="4amb" id="4amb" /> 4 ambientes</label>
                                                            <label><input type="checkbox" name="+4amb" id="+4amb" /> +4 ambientes</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Características</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="cochera" id="cochera" /> Cochera</label>
                                                            <label><input type="checkbox" name="balcon" id="balcon" /> Balcón</label>
                                                            <label><input type="checkbox" name="terraza" id="terraza" /> Terraza</label>
                                                            <label><input type="checkbox" name="piscina" id="piscina" /> Piscina</label>
                                                            <label><input type="checkbox" name="2banos" id="2banos" /> 2 baños</label>
                                                            <label><input type="checkbox" name="toilette" id="toilette" /> Toilette</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Estado</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="estrenar" id="estrenar" /> A estrenar</label>
                                                            <label><input type="checkbox" name="hasta5" id="hasta5" /> Hasta 5 años</label>
                                                            <label><input type="checkbox" name="hasta10" id="hasta10" /> Hasta 10 años</label>
                                                            <label><input type="checkbox" name="+de10" id="+de10" /> + de 10 años</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Precio</h4>
                                                        <div className="currency-group">
                                                            <label><input type="radio" name="currency-venta" id="dolares" value="dolares" /> Dólares</label>
                                                            <label><input type="radio" name="currency-venta" id="pesos" value="pesos" /> Pesos</label>
                                                        </div>
                                                        <div className="price-inputs">
                                                            <div>
                                                                <label htmlFor="desde">Desde</label>
                                                                <input type="text" placeholder="USD" name="desde" id="desde" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="hasta">Hasta</label>
                                                                <input type="text" placeholder="USD" name="hasta" id="hasta" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="submenu-search">
                                                    <button type="submit" className="search-btn">
                                                        <i className="fa fa-search"></i> Buscar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className="nav-link-dropdown"
                                onMouseEnter={() => handleMouseEnter('alquilar')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="nav-link">
                                    Alquilar <i className={`fa-solid ${hoveredItem === 'alquilar' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </span>
                                {hoveredItem === 'alquilar' && (
                                    <div className="submenu-wrapper">
                                        <div className="submenu-content">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.currentTarget);
                                                handleSearch('alquiler', formData);
                                            }}>
                                                <div className="submenu-grid">
                                                    <div className="submenu-column">
                                                        <h4>Tipo de propiedad</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="alqdepto" id="alqdepto" /> Departamento</label>
                                                            <label><input type="checkbox" name="alqcasa" id="alqcasa" /> Casa</label>
                                                            <label><input type="checkbox" name="alqph" id="alqph" /> PH</label>
                                                            <label><input type="checkbox" name="alqdeposito" id="alqdeposito" /> Depósito</label>
                                                            <label><input type="checkbox" name="alqoficina" id="alqoficina" /> Oficina</label>
                                                            <label><input type="checkbox" name="alqterreno" id="alqterreno" /> Terreno</label>
                                                            <label><input type="checkbox" name="alqlocal" id="alqlocal" /> Local</label>
                                                            <label><input type="checkbox" name="alqedificio-block" id="alqedificio-block" /> Edificio en block</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Ubicación</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="alqbelgrano" id="alqbelgrano" /> Belgrano</label>
                                                            <label><input type="checkbox" name="alqurquiza" id="alqurquiza" /> Villa Urquiza</label>
                                                            <label><input type="checkbox" name="alqnunez" id="alqnunez" /> Nuñez</label>
                                                            <label><input type="checkbox" name="alqpalermo" id="alqpalermo" /> Palermo</label>
                                                            <label><input type="checkbox" name="alqcolegiales" id="alqcolegiales" /> Colegiales</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Ambientes</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="alq1amb" id="alq1amb" /> 1 ambiente</label>
                                                            <label><input type="checkbox" name="alq2amb" id="alq2amb" /> 2 ambientes</label>
                                                            <label><input type="checkbox" name="alq3amb" id="alq3amb" /> 3 ambientes</label>
                                                            <label><input type="checkbox" name="alq4amb" id="alq4amb" /> 4 ambientes</label>
                                                            <label><input type="checkbox" name="alq+4amb" id="alq+4amb" /> +4 ambientes</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Características</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="alqcochera" id="alqcochera" /> Cochera</label>
                                                            <label><input type="checkbox" name="alqvestidor" id="alqvestidor" /> Vestidor</label>
                                                            <label><input type="checkbox" name="alqterraza" id="alqterraza" /> Terraza</label>
                                                            <label><input type="checkbox" name="alqpiscina" id="alqpiscina" /> Piscina</label>
                                                            <label><input type="checkbox" name="alqparrilla" id="alqparrilla" /> Parrilla</label>
                                                            <label><input type="checkbox" name="alqtoilette" id="alqtoilette" /> Toilette</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Estado</h4>
                                                        <div className="checkbox-group">
                                                            <label><input type="checkbox" name="alqestrenar" id="alqestrenar" /> A estrenar</label>
                                                            <label><input type="checkbox" name="alqhasta5" id="alqhasta5" /> Hasta 5 años</label>
                                                            <label><input type="checkbox" name="alqhasta10" id="alqhasta10" /> Hasta 10 años</label>
                                                            <label><input type="checkbox" name="alq+de10" id="alq+de10" /> + de 10 años</label>
                                                        </div>
                                                    </div>
                                                    <div className="submenu-column">
                                                        <h4>Precio</h4>
                                                        <div className="currency-group">
                                                            <label><input type="radio" name="currency-alquiler" id="alqdolares" value="alqdolares" /> Dólares</label>
                                                            <label><input type="radio" name="currency-alquiler" id="alqpesos" value="alqpesos" /> Pesos</label>
                                                        </div>
                                                        <div className="price-inputs">
                                                            <div>
                                                                <label htmlFor="alqdesde">Desde</label>
                                                                <input type="text" placeholder="USD" name="alqdesde" id="alqdesde" />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="alqhasta">Hasta</label>
                                                                <input type="text" placeholder="USD" name="alqhasta" id="alqhasta" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="submenu-search">
                                                    <button type="submit" className="search-btn">
                                                        <i className="fa fa-search"></i> Buscar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link to="/terrenos" className="nav-link">Terrenos</Link>
                            <Link to="/emprendimientos" className="nav-link">Emprendimientos</Link>
                            <Link to="/exclusive" className="nav-link">Mel exclusive</Link>
                            <Link to="/oportunidades" className="nav-link">Oportunidades</Link>

                            <div
                                className="nav-link-dropdown"
                                onMouseEnter={() => handleMouseEnter('somos')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="nav-link">
                                    Somos Mel <i className={`fa-solid ${hoveredItem === 'somos' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </span>
                                {hoveredItem === 'somos' && (
                                    <div className="submenu-wrapper submenu-small">
                                        <div className="submenu-content">
                                            <ul className="submenu-list">
                                                <li><Link to="/somos_mel">Historia</Link></li>
                                                <li><Link to="/somos_mel">Valores</Link></li>
                                                <li><Link to="/somos_mel">Prensa</Link></li>
                                                <li><Link to="/somos_mel">Sumate a Mel</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className="nav-link-dropdown"
                                onMouseEnter={() => handleMouseEnter('servicios')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="nav-link">
                                    Servicios <i className={`fa-solid ${hoveredItem === 'servicios' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </span>
                                {hoveredItem === 'servicios' && (
                                    <div className="submenu-wrapper submenu-small">
                                        <div className="submenu-content">
                                            <ul className="submenu-list">
                                                <li><Link to="/tasaciones">Tasaciones</Link></li>
                                                <li><Link to="/venta-alquiler">Ventas & Alquileres</Link></li>
                                                <li><Link to="/adm-alquileres">Adm. de alquileres</Link></li>
                                                <li><Link to="/asesoramiento-juridico">As. Jurídico</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Usuario desktop */}
                        <div className="navbar-user-section">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <span className="user-greeting">Hola {user?.full_name ? user.full_name.split(' ')[0] : 'Usuario'}</span>
                                    <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
                                </div>
                            ) : (
                                <div className="auth-buttons-desktop">
                                    <button
                                        onClick={() => handleLoginClick('login')}
                                        className="btn-login"
                                    >
                                        Iniciar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Botón hamburguesa */}
                    <button
                        onClick={toggleMenu}
                        className={`navbar-hamburger ${isMenuOpen ? 'active' : ''}`}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>

                {/* Menú móvil */}
                <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-content">
                        {/* Usuario en móvil */}
                        <div className="mobile-user-section">
                            {isLoggedIn ? (
                                <div className="mobile-user-info">
                                    <span className="mobile-user-greeting">
                                        Hola {user?.full_name ? user.full_name.split(' ')[0] : 'Usuario'}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="mobile-logout-btn"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="mobile-auth-buttons">
                                    {!isLoggedIn ? (
                                        <button
                                            onClick={() => handleLoginClick('login')}
                                            className="mobile-btn-login"
                                        >
                                            Iniciar Sesión
                                        </button>
                                    ) : (
                                        <div className={`mobile-user-section ${isUserDropdownOpen ? 'open' : ''}`}>
                                            <div className="mobile-user-info">
                                                <span
                                                    className="mobile-user-greeting"
                                                    onClick={toggleUserDropdown}
                                                >
                                                    Hola {user?.full_name ? user.full_name.split(' ')[0] : 'Usuario'} <i className="fa-solid fa-chevron-down"></i>
                                                </span>
                                                <div className="mobile-user-dropdown">
                                                    <a href="/perfil/datos.html">Mi cuenta</a>
                                                    <a href="/perfil/cambio_contrasena.html">Cambiar contraseña</a>
                                                    <a href="/perfil/notificaciones.html">Notificaciones</a>
                                                    <a href="/perfil/favoritos.html">Favoritos</a>
                                                    <a href="/perfil/busquedas_guardadas.html">Búsquedas guardadas</a>
                                                    <a href="/faqs/index.html">Preguntas Frecuentes</a>
                                                    <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Enlaces del menú móvil */}
                        <div className="mobile-nav-links">
                            {/* Comprar con submenú */}
                            <div className={`mobile-nav-link-dropdown ${mobileOpenSubmenus.includes('comprar') ? 'open' : ''}`}>
                                <button
                                    className="mobile-nav-link"
                                    onClick={() => toggleMobileSubmenu('comprar')}
                                >
                                    Comprar <i className="fa-solid fa-chevron-down"></i>
                                </button>
                                <div className="mobile-submenu">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        handleSearch('venta', formData);
                                        closeMenu();
                                    }}>
                                        <div className="mobile-submenu-content">
                                            <div className="mobile-submenu-grid">
                                                {/* Tipo de propiedad */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Tipo de propiedad</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="depto" id="mobdepto" />
                                                            Departamento
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="casa" id="mobcasa" />
                                                            Casa
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="ph" id="mobph" />
                                                            PH
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="deposito" id="mobdeposito" />
                                                            Depósito
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="oficina" id="moboficina" />
                                                            Oficina
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="terreno" id="mobterreno" />
                                                            Terreno
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="local" id="moblocal" />
                                                            Local
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="edificio-block" id="mobedificio-block" />
                                                            Edificio en block
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Ubicación */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Ubicación</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="belgrano" id="mobbelgrano" />
                                                            Belgrano
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="urquiza" id="moburquiza" />
                                                            Villa Urquiza
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="nunez" id="mobnunez" />
                                                            Nuñez
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="palermo" id="mobpalermo" />
                                                            Palermo
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="colegiales" id="mobcolegiales" />
                                                            Colegiales
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Ambientes */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Ambientes</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="1amb" id="mob1amb" />
                                                            1 ambiente
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="2amb" id="mob2amb" />
                                                            2 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="3amb" id="mob3amb" />
                                                            3 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="4amb" id="mob4amb" />
                                                            4 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="+4amb" id="mob+4amb" />
                                                            +4 ambientes
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Características */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Características</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="cochera" id="mobcochera" />
                                                            Cochera
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="balcon" id="mobbalcon" />
                                                            Balcón
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="terraza" id="mobterraza" />
                                                            Terraza
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="piscina" id="mobpiscina" />
                                                            Piscina
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="2banos" id="mob2banos" />
                                                            2 baños
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="toilette" id="mobtoilette" />
                                                            Toilette
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Estado */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Estado</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="estrenar" id="mobestrenar" />
                                                            A estrenar
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="hasta5" id="mobhasta5" />
                                                            Hasta 5 años
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="hasta10" id="mobhasta10" />
                                                            Hasta 10 años
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="+de10" id="mob+de10" />
                                                            + de 10 años
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Precio */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Precio</h4>
                                                    <div className="mobile-currency-group">
                                                        <label>
                                                            <input type="radio" name="currency-venta" id="mobdolares" value="dolares" />
                                                            Dólares
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="currency-venta" id="mobpesos" value="pesos" />
                                                            Pesos
                                                        </label>
                                                    </div>
                                                    <div className="mobile-price-inputs">
                                                        <div>
                                                            <label htmlFor="mobdesde">Desde</label>
                                                            <input type="text" name="desde" id="mobdesde" placeholder="USD" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobhasta">Hasta</label>
                                                            <input type="text" name="hasta" id="mobhasta" placeholder="USD" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mobile-submenu-search">
                                                <button type="submit" className="mobile-submenu-search">
                                                    <i className="fa fa-search"></i> Buscar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Alquilar con submenú */}
                            <div className={`mobile-nav-link-dropdown ${mobileOpenSubmenus.includes('alquilar') ? 'open' : ''}`}>
                                <button
                                    className="mobile-nav-link"
                                    onClick={() => toggleMobileSubmenu('alquilar')}
                                >
                                    Alquilar <i className="fa-solid fa-chevron-down"></i>
                                </button>
                                <div className="mobile-submenu">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        handleSearch('alquiler', formData);
                                        closeMenu();
                                    }}>
                                        <div className="mobile-submenu-content">
                                            <div className="mobile-submenu-grid">
                                                {/* Tipo de propiedad */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Tipo de propiedad</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="alqdepto" id="mobalqdepto" />
                                                            Departamento
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqcasa" id="mobalqcasa" />
                                                            Casa
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqph" id="mobalqph" />
                                                            PH
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqdeposito" id="mobalqdeposito" />
                                                            Depósito
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqoficina" id="mobalqoficina" />
                                                            Oficina
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqterreno" id="mobalqterreno" />
                                                            Terreno
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqlocal" id="mobalqlocal" />
                                                            Local
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqedificio-block" id="mobalqedificio-block" />
                                                            Edificio en block
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Ubicación */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Ubicación</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="alqbelgrano" id="mobalqbelgrano" />
                                                            Belgrano
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqurquiza" id="mobalqurquiza" />
                                                            Villa Urquiza
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqnunez" id="mobalqnunez" />
                                                            Nuñez
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqpalermo" id="mobalqpalermo" />
                                                            Palermo
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqcolegiales" id="mobalqcolegiales" />
                                                            Colegiales
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Ambientes */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Ambientes</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="alq1amb" id="mobalq1amb" />
                                                            1 ambiente
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alq2amb" id="mobalq2amb" />
                                                            2 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alq3amb" id="mobalq3amb" />
                                                            3 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alq4amb" id="mobalq4amb" />
                                                            4 ambientes
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alq+4amb" id="mobalq+4amb" />
                                                            +4 ambientes
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Características */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Características</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="alqcochera" id="mobalqcochera" />
                                                            Cochera
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqvestidor" id="mobalqvestidor" />
                                                            Vestidor
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqterraza" id="mobalqterraza" />
                                                            Terraza
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqpiscina" id="mobalqpiscina" />
                                                            Piscina
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqparrilla" id="mobalqparrilla" />
                                                            Parrilla
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqtoilette" id="mobalqtoilette" />
                                                            Toilette
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Estado */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Estado</h4>
                                                    <div className="mobile-checkbox-group">
                                                        <label>
                                                            <input type="checkbox" name="alqestrenar" id="mobalqestrenar" />
                                                            A estrenar
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqhasta5" id="mobalqhasta5" />
                                                            Hasta 5 años
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alqhasta10" id="mobalqhasta10" />
                                                            Hasta 10 años
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" name="alq+de10" id="mobalq+de10" />
                                                            + de 10 años
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Precio */}
                                                <div className="mobile-submenu-column">
                                                    <h4>Precio</h4>
                                                    <div className="mobile-currency-group">
                                                        <label>
                                                            <input type="radio" name="currency-alquiler" id="mobalqdolares" value="alqdolares" />
                                                            Dólares
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="currency-alquiler" id="mobalqpesos" value="alqpesos" />
                                                            Pesos
                                                        </label>
                                                    </div>
                                                    <div className="mobile-price-inputs">
                                                        <div>
                                                            <label htmlFor="mobalqdesde">Desde</label>
                                                            <input type="text" name="alqdesde" id="mobalqdesde" placeholder="USD" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobalqhasta">Hasta</label>
                                                            <input type="text" name="alqhasta" id="mobalqhasta" placeholder="USD" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mobile-submenu-search">
                                                <button type="submit" className="mobile-submenu-search">
                                                    <i className="fa fa-search"></i> Buscar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Enlaces simples */}
                            <a href="/resultados/terrenos.html" className="mobile-nav-link">Terrenos</a>
                            <a href="/resultados/alquileres.html" className="mobile-nav-link">Emprendimientos</a>
                            <a href="/exclusive/index.html" className="mobile-nav-link">Mel exclusive</a>
                            <a href="/resultados/oportunidades.html" className="mobile-nav-link">Oportunidades</a>

                            {/* Somos Mel con submenú pequeño */}
                            <div className={`mobile-nav-link-dropdown ${mobileOpenSubmenus.includes('somos-mel') ? 'open' : ''}`}>
                                <button
                                    className="mobile-nav-link"
                                    onClick={() => toggleMobileSubmenu('somos-mel')}
                                >
                                    Somos Mel <i className="fa-solid fa-chevron-down"></i>
                                </button>
                                <div className="mobile-submenu-small">
                                    <ul className="mobile-submenu-list">
                                        <li><a href="/somos_mel/index.html">Historia</a></li>
                                        <li><a href="/somos_mel/index.html">Valores</a></li>
                                        <li><a href="/somos_mel/index.html">Prensa</a></li>
                                        <li><a href="/somos_mel/index.html">Sumate a Mel</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Servicios con submenú pequeño */}
                            <div className={`mobile-nav-link-dropdown ${mobileOpenSubmenus.includes('servicios') ? 'open' : ''}`}>
                                <button
                                    className="mobile-nav-link"
                                    onClick={() => toggleMobileSubmenu('servicios')}
                                >
                                    Servicios <i className="fa-solid fa-chevron-down"></i>
                                </button>
                                <div className="mobile-submenu-small">
                                    <ul className="mobile-submenu-list">
                                        <li><a href="/servicios/tasaciones.html">Tasaciones</a></li>
                                        <li><a href="/servicios/venta_alquiler.html">Ventas & Alquileres</a></li>
                                        <li><a href="/servicios/ada.html">Adm. de alquileres</a></li>
                                        <li><a href="/servicios/asesoramiento.html">As. Jurídico</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
            <LoginModal
                isShown={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                logOrReg={loginMode}
            />
        </>

    );
};

export default Navbar; 