import React from 'react';

const ClubBeneficios: React.FC = () => {
    return (
        <div className="container mx-auto px-4 ">
            <div className="my-20 flex flex-col gap-10 md:flex-row md:gap-30">
                <div>
                    <div className="mb-5">
                        <div className="text-green-menu mb-3">Club de beneficios</div>
                        <h3 className="!text-green-text mb-8 !text-3xl">Conocé los descuentos exclusivos</h3>
                        <p className="mb-10">
                            Increíbles promociones de reconocidas marcas pensados para acompañarte en cada etapa de tu proyecto de
                            adquisición de su propiedad.
                        </p>
                    </div>
                    <div className="relative rounded-2xl border-1">
                        <div className="bg-green-highcontrast flex translate-x-[-25px] translate-y-[-10px] flex-wrap justify-between gap-5 rounded-2xl px-10 pt-6 pb-16 
                        shadow-[8px_8px_0px_0px_rgba(19,120,46,1)]
                        ">
                            <img src="/simmons.svg" alt="" />
                            <img src="/volf.svg" alt="" />
                            <img src="/fravega.svg" alt="" />
                            <img src="/peabody.svg" alt="" />
                        </div>
                        <div className="absolute bottom-[-20px] left-10">
                            <button className="btn btn-long">Quiero saber más!</button>
                        </div>
                    </div>
                </div>

                <div className="flex-grow">
                    <img className="m-auto w-full max-w-none md:w-[446px]" src="/barrios.png" alt="Barrios y lugares" />
                    <div className="bg-green-text-dark relative z-10 mt-[-100px] ml-0 max-w-[320px] rounded-xl px-6 py-6 md:ml-[-50px]">
                        <h3 className="!text-green-fluo font-larken mb-2 text-2xl">Barrios y lugares</h3>
                        <p className="mb-4 text-white">
                            Sumergite en un viaje a través de los distintos barrios y lugares emblemáticos que hacen vibrar la ciudad de
                            Buenos Aires.
                        </p>
                        <div>
                            <a href="#" className="btn btn-white !px-8 !py-6 text-sm">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubBeneficios; 