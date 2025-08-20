import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terrenos from './pages/Terrenos';
import TasacionesPage from './pages/TasacionesPage';
import ExclusivePage from './pages/ExclusivePage';
import SomosMel from './pages/SomosMel';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import SavedSearches from './pages/SavedSearches';
import FAQs from './pages/FAQs';
import Emprendimientos from './pages/Emprendimientos';
import Compra from './pages/Compra';
import Alquileres from './pages/Alquileres';
import LoginPage from './pages/Login';
import Asesoramiento from './pages/Asesoramiento';
import VentaAlquiler from './pages/VentaAlquiler';
import Resultados from './pages/Resultados';
import AdministracionAlquileres from './pages/AdministracionAlquileres';
import Barrios from './pages/Barrios';
import './index.css';

function App() {
  return (
    <GoogleOAuthProvider clientId="539501720078-apotvsti0kelt6jdqpfuuo8ah0akiiaf.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <div className="min-h-screen bg-white text-black">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/terrenos" element={<Terrenos />} />
                <Route path="/resultados/terrenos.html" element={<Terrenos />} />
                <Route path="/servicios/tasaciones.html" element={<TasacionesPage />} />
                <Route path="/tasaciones" element={<TasacionesPage />} />
                <Route path="/exclusive/index.html" element={<ExclusivePage />} />
                <Route path="/exclusive" element={<ExclusivePage />} />
                <Route path="/somos_mel" element={<SomosMel />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/perfil/datos" element={<Profile />} />
                <Route path="/perfil/cambio_contrasena" element={<ChangePassword />} />
                <Route path="/perfil/notificaciones" element={<Notifications />} />
                <Route path="/perfil/favoritos" element={<Favorites />} />
                <Route path="/perfil/busquedas_guardadas" element={<SavedSearches />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/faqs/index.html" element={<FAQs />} />
                <Route path="/emprendimientos" element={<Emprendimientos />} />
                <Route path="/resultados/alquileres.html" element={<Emprendimientos />} />
                <Route path="/compra" element={<Compra />} />
                <Route path="/alquileres" element={<Alquileres />} />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/asesoramiento-juridico" element={<Asesoramiento />} />
                <Route path="/servicios/venta_alquiler" element={<VentaAlquiler />} />
                <Route path="/venta-alquiler" element={<VentaAlquiler />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/adm-alquileres" element={<AdministracionAlquileres />} />
                <Route path="/barrios" element={<Barrios />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
