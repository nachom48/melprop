import React from 'react'

const PropiedadQueSoñas = () => {
    return (
        <div className="my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col overflow-hidden md:h-[250px] md:flex-row">
                    <div className="bg-green-text-dark flex flex-1 flex-col justify-center px-8 py-6 md:px-10">
                        <h3 className="mb-4 text-3xl font-bold" style={{ color: 'var(--color-green-social)' }}>La propiedad que soñás, existe en Mel</h3>
                        <p className="mb-4 text-white">
                            Increíbles promociones de reconocidas marcas pensados para acompañarte en cada etapa de tu proyecto de
                            adquisición de su propiedad.
                        </p>
                        <button type="button" className="btn btn-plain w-fit !px-10 bg-white text-green-600 px-6 py-2 rounded-md hover:bg-gray-100">
                            Ver más
                        </button>
                    </div>
                    <div className="h-full basis-full md:basis-[300px] lg:basis-[498px]">
                        <img className="h-full w-full object-cover" src="/banner_img_1.png" alt="Banner" />
                    </div>
                </div>
            </div>
        </div>)
}

export default PropiedadQueSoñas