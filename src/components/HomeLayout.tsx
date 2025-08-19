import React from 'react';
import NuestrosServicios from './NuestrosServicios';
import EmprendimientosSection from './EmprendimientosSection';
import Oportunidades from './Oportunidades';
import BarriosSection from './BarriosSection';

const HomeLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sección: Conoce nuestros servicios */}
            <section className="py-16 bg-white">
                <NuestrosServicios />
            </section>

            {/* Sección: Emprendimientos */}
            <section className="py-16 bg-gray-50">
                <EmprendimientosSection />
            </section>

            {/* Sección: Oportunidades */}
            <section className="py-16 bg-white">
                <Oportunidades />
            </section>

            {/* Sección: Barrios y lugares */}
            <section className="py-16 bg-gray-50">
                <BarriosSection />
            </section>
        </div>
    );
};

export default HomeLayout;
