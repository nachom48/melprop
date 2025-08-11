import React from 'react';
import Hero from '../components/Hero';
import ResidencialesDestacados from '../components/ResidencialesDestacados';
import NuestrosServicios from '../components/NuestrosServicios';
import LosMejores from '../components/LosMejores';
import Oportunidades from '../components/Oportunidades';
import ClubBeneficios from '../components/ClubBeneficios';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <ResidencialesDestacados />
            <NuestrosServicios />
            <LosMejores />
            <Oportunidades />
            <ClubBeneficios />
        </>
    );
};

export default Home; 