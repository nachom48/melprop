import React from 'react';

const BarriosSection: React.FC = () => {
    return (
        <div className="my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col overflow-hidden md:h-[250px] md:flex-row">
                    <div className="h-full basis-full md:basis-[300px] lg:basis-[498px]">
                        <img
                            className="h-full w-full object-cover"
                            src="/exclusive_2.png"
                            alt="Banner"
                        />
                    </div>
                    <div className="bg-green-highcontrast flex flex-1 flex-col justify-center px-8 py-6 md:px-10">
                        <h3 className="!text-green-menu mb-4 text-3xl font-bold">Barrios y lugares</h3>
                        <p className="mb-4 text-black">
                            Sumergite en un viaje a través de los distintos barrios y lugares emblemáticos que hacen vibrar la ciudad de
                            Buenos Aires.
                        </p>
                        <a href="" className="btn btn-plain w-fit !px-10">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarriosSection;
