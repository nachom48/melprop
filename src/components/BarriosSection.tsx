import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarriosSection: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/barrios');
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div
                className="flex flex-col lg:flex-row overflow-hidden shadow-lg md:h-[250px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={handleClick}
            >
                {/* Imagen a la izquierda */}
                <div className="h-full basis-full md:basis-[300px] lg:basis-[498px]">
                    <img
                        className="h-full w-full object-cover"
                        src="best_1.png"
                        alt="Barrios y lugares"
                    />
                </div>

                {/* Contenido a la derecha */}
                <div className="bg-green-highcontrast flex flex-1 flex-col justify-center px-8 py-6 md:px-10">
                    <h3 className="font-larken text-green-text-dark mb-4 text-3xl font-bold">Barrios y lugares</h3>
                    <p className="mb-4 text-green-text font-jakarta font-normal">
                        Sumergite en un viaje a través de los distintos barrios y lugares emblemáticos que hacen vibrar la ciudad de
                        Buenos Aires.
                    </p>
                    <a
                        href="#"
                        className="btn btn-plain w-fit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                        }}
                    >
                        Ver más
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BarriosSection;
