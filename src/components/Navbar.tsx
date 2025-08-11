import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
    const { user, isLoggedIn, logout } = useUser();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');

    const handleMouseEnter = (item: string) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <>
            <header className="border-border-header flex items-center border-b bg-white">
                <div className="container flex items-center gap-8">
                    <div className="logo">
                        <Link to="/">
                            <img src="/mel_logo_green.svg" alt="Mel Propiedades" />
                        </Link>
                    </div>
                    <ul className="nav">
                        <li
                            className="flex flex-col items-center justify-center"
                            onMouseEnter={() => handleMouseEnter('comprar')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>
                                Comprar <i className={`fa-solid ${hoveredItem === 'comprar' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                            {hoveredItem === 'comprar' && (
                                <div className="wrapper-sub-menu active">
                                    <div className="container">
                                        <div className="sub-menu">
                                            <form action="">
                                                <div className="flex flex-col gap-4 lg:flex-row">
                                                    <ul className="menu-col">
                                                        <li>Tipo de propiedad</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="depto" />
                                                                <label className="text-xs" htmlFor="depto">Departamento</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="casa" />
                                                                <label className="text-xs" htmlFor="casa">Casa</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="ph" />
                                                                <label className="text-xs" htmlFor="ph">PH</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="deposito" />
                                                                <label className="text-xs" htmlFor="deposito">Depósito</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="oficina" />
                                                                <label className="text-xs" htmlFor="oficina">Oficina</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="terreno" />
                                                                <label className="text-xs" htmlFor="terreno">Terreno</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="local" />
                                                                <label className="text-xs" htmlFor="local">Local</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="edificio-block" />
                                                                <label className="text-xs" htmlFor="edificio-block">Edificio en block</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Ubicación</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="belgrano" />
                                                                <label className="text-xs" htmlFor="belgrano">Belgrano</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="urquiza" />
                                                                <label className="text-xs" htmlFor="urquiza">Villa Urquiza</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="nunez" />
                                                                <label className="text-xs" htmlFor="nunez">Nuñez</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="palermo" />
                                                                <label className="text-xs" htmlFor="palermo">Palermo</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="colegiales" />
                                                                <label className="text-xs" htmlFor="colegiales">Colegiales</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Ambientes</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="1amb" />
                                                                <label className="text-xs" htmlFor="1amb">1 ambiente</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="2amb" />
                                                                <label className="text-xs" htmlFor="2amb">2 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="3amb" />
                                                                <label className="text-xs" htmlFor="3amb">3 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="4amb" />
                                                                <label className="text-xs" htmlFor="4amb">4 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="+4amb" />
                                                                <label className="text-xs" htmlFor="+4amb">+4 ambientes</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Características</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="cochera" />
                                                                <label className="text-xs" htmlFor="cochera">Cochera</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="vestidor" />
                                                                <label className="text-xs" htmlFor="vestidor">Vestidor</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="terraza" />
                                                                <label className="text-xs" htmlFor="terraza">Terraza</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="piscina" />
                                                                <label className="text-xs" htmlFor="piscina">Piscina</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="parrilla" />
                                                                <label className="text-xs" htmlFor="parrilla">Parrilla</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="toilette" />
                                                                <label className="text-xs" htmlFor="toilette">Toilette</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Estado</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="estrenar" />
                                                                <label className="text-xs" htmlFor="estrenar">A estrenar</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="hasta5" />
                                                                <label className="text-xs" htmlFor="hasta5">Hasta 5 años</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="hasta10" />
                                                                <label className="text-xs" htmlFor="hasta10">Hasta 10 años</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="+de10" />
                                                                <label className="text-xs" htmlFor="+de10">+ de 10 años</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Precio</li>
                                                        <li className="flex gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <input type="radio" id="dolares" />
                                                                <label htmlFor="dolares">Dólares</label>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <input type="radio" id="pesos" />
                                                                <label htmlFor="pesos">Pesos</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="wrapper-input flex flex-col gap-1">
                                                                <label htmlFor="desde">Desde</label>
                                                                <input type="text" placeholder="USD" className="border-input-border max-w-180px border-1 placeholder-font-normal" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="wrapper-input flex flex-col gap-1">
                                                                <label htmlFor="hasta">Hasta</label>
                                                                <input type="text" placeholder="USD" className="border-input-border max-w-180px border-1 placeholder-font-normal" />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Temporales</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="temporales" />
                                                                <label className="text-xs" htmlFor="temporales">Si</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="flex w-full items-center justify-center">
                                                    <Link to="/compra" className="btn justify-center">
                                                        <i className="fa fa-search mt-1 ml-0"></i> Buscar
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li
                            className="flex flex-col items-center justify-center"
                            onMouseEnter={() => handleMouseEnter('alquilar')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>
                                Alquilar <i className={`fa-solid ${hoveredItem === 'alquilar' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                            {hoveredItem === 'alquilar' && (
                                <div className="wrapper-sub-menu active">
                                    <div className="container">
                                        <div className="sub-menu">
                                            <form action="">
                                                <div className="flex flex-col gap-4 lg:flex-row">
                                                    <ul className="menu-col">
                                                        <li>Tipo de propiedad</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqdepto" />
                                                                <label className="text-xs" htmlFor="alqdepto">Departamento</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqcasa" />
                                                                <label className="text-xs" htmlFor="alqcasa">Casa</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqph" />
                                                                <label className="text-xs" htmlFor="alqph">PH</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqdeposito" />
                                                                <label className="text-xs" htmlFor="alqdeposito">Depósito</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqoficina" />
                                                                <label className="text-xs" htmlFor="alqoficina">Oficina</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqterreno" />
                                                                <label className="text-xs" htmlFor="alqterreno">Terreno</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqlocal" />
                                                                <label className="text-xs" htmlFor="alqlocal">Local</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqedificio-block" />
                                                                <label className="text-xs" htmlFor="alqedificio-block">Edificio en block</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Ubicación</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqbelgrano" />
                                                                <label className="text-xs" htmlFor="alqbelgrano">Belgrano</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqurquiza" />
                                                                <label className="text-xs" htmlFor="alqurquiza">Villa Urquiza</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqnunez" />
                                                                <label className="text-xs" htmlFor="alqnunez">Nuñez</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqpalermo" />
                                                                <label className="text-xs" htmlFor="alqpalermo">Palermo</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqcolegiales" />
                                                                <label className="text-xs" htmlFor="alqcolegiales">Colegiales</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Ambientes</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq1amb" />
                                                                <label className="text-xs" htmlFor="alq1amb">1 ambiente</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq2amb" />
                                                                <label className="text-xs" htmlFor="alq2amb">2 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq3amb" />
                                                                <label className="text-xs" htmlFor="alq3amb">3 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq4amb" />
                                                                <label className="text-xs" htmlFor="alq4amb">4 ambientes</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq+4amb" />
                                                                <label className="text-xs" htmlFor="alq+4amb">+4 ambientes</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Características</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqcochera" />
                                                                <label className="text-xs" htmlFor="alqcochera">Cochera</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqvestidor" />
                                                                <label className="text-xs" htmlFor="alqvestidor">Vestidor</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqterraza" />
                                                                <label className="text-xs" htmlFor="alqterraza">Terraza</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqpiscina" />
                                                                <label className="text-xs" htmlFor="alqpiscina">Piscina</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqparrilla" />
                                                                <label className="text-xs" htmlFor="alqparrilla">Parrilla</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqtoilette" />
                                                                <label className="text-xs" htmlFor="alqtoilette">Toilette</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Estado</li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqestrenar" />
                                                                <label className="text-xs" htmlFor="alqestrenar">A estrenar</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqhasta5" />
                                                                <label className="text-xs" htmlFor="alqhasta5">Hasta 5 años</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alqhasta10" />
                                                                <label className="text-xs" htmlFor="alqhasta10">Hasta 10 años</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="form-check flex flex-row items-center gap-2">
                                                                <input className="form-check-input" type="checkbox" id="alq+de10" />
                                                                <label className="text-xs" htmlFor="alq+de10">+ de 10 años</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="menu-col">
                                                        <li>Precio</li>
                                                        <li className="flex gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <input type="radio" id="alqdolares" />
                                                                <label htmlFor="alqdolares">Dólares</label>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <input type="radio" id="alqpesos" />
                                                                <label htmlFor="alqpesos">Pesos</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="wrapper-input flex flex-col gap-1">
                                                                <label htmlFor="alqdesde">Desde</label>
                                                                <input type="text" placeholder="USD" className="border-input-border max-w-180px border-1 placeholder-font-normal" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="wrapper-input flex flex-col gap-1">
                                                                <label htmlFor="alqhasta">Hasta</label>
                                                                <input type="text" placeholder="USD" className="border-input-border max-w-180px border-1 placeholder-font-normal" />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="flex w-full items-center justify-center">
                                                    <Link to="/alquileres" className="btn justify-center">
                                                        <i className="fa fa-search mt-1 ml-0"></i> Buscar
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li className="flex flex-col items-center justify-center">
                            <Link to="/resultados/terrenos.html">Terrenos</Link>
                        </li>
                        <li className="flex flex-col items-center justify-center">
                            <Link to="/resultados/alquileres.html">Emprendimientos</Link>
                        </li>
                        <li className="flex flex-col items-center justify-center">
                            <Link to="/exclusive/index.html">Mel exclusive</Link>
                        </li>
                        <li className="flex flex-col items-center justify-center">
                            <Link to="/resultados/oportunidades.html">Oportunidades</Link>
                        </li>
                        <li
                            className="flex flex-col items-center justify-center"
                            onMouseEnter={() => handleMouseEnter('somos')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>
                                Somos Mel <i className={`fa-solid ${hoveredItem === 'somos' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                            {hoveredItem === 'somos' && (
                                <div className="wrapper-sub-menu active simple-menu">
                                    <div className="container">
                                        <div className="sub-menu">
                                            <ul className="menu-col">
                                                <li>
                                                    <Link to="/somos_mel">Historia</Link>
                                                </li>
                                                <li>
                                                    <Link to="/somos_mel">Valores</Link>
                                                </li>
                                                <li>
                                                    <Link to="/somos_mel">Prensa</Link>
                                                </li>
                                                <li>
                                                    <Link to="/somos_mel">Sumate a Mel</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li
                            className="flex flex-col items-center justify-center"
                            onMouseEnter={() => handleMouseEnter('servicios')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span>
                                Servicios <i className={`fa-solid ${hoveredItem === 'servicios' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                            {hoveredItem === 'servicios' && (
                                <div className="wrapper-sub-menu active simple-menu">
                                    <div className="container">
                                        <div className="sub-menu">
                                            <ul className="menu-col">
                                                <li>
                                                    <Link to="/servicios/tasaciones.html">Tasaciones</Link>
                                                </li>
                                                <li>
                                                    <Link to="/servicios/venta_alquiler.html">Ventas & Alquileres</Link>
                                                </li>
                                                <li>
                                                    <Link to="/servicios/ada.html">Adm. de alquileres</Link>
                                                </li>
                                                <li>
                                                    <Link to="/servicios/asesoramiento.html">As. Jurídico</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li
                            className="user-menu"
                            onMouseEnter={() => handleMouseEnter('user')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isLoggedIn ? (
                                <>
                                    <span>
                                        Hola {user?.fullName ? user.fullName.split(' ')[0] : 'Usuario'} <i className={`fa-solid ${hoveredItem === 'user' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                    </span>
                                    {hoveredItem === 'user' && (
                                        <div className="wrapper-sub-menu active simple-menu">
                                            <div className="container">
                                                <div className="sub-menu">
                                                    <ul className="menu-col">
                                                        <li>
                                                            <Link to="/perfil/datos.html">Mi cuenta</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/perfil/cambio_contrasena.html">Cambiar contraseña</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/perfil/notificaciones.html">Notificaciones</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/perfil/favoritos.html">Favoritos</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/perfil/busquedas_guardadas.html">Búsquedas guardadas</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/faqs">Preguntas Frecuentes</Link>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={logout}>Cerrar Sesión</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setLoginMode('register');
                                            setShowLoginModal(true);
                                        }}
                                    >
                                        Registrarse
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setLoginMode('login');
                                            setShowLoginModal(true);
                                        }}
                                    >
                                        Iniciar sesión
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                    <div className="hamburger">
                        <button id="nav-button"><i className="fa-solid fa-bars"></i></button>
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