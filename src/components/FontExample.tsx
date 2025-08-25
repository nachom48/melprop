import React from 'react';

const FontExample: React.FC = () => {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center mb-8">Ejemplos de la fuente Larken</h1>

            {/* Thin (100) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Thin (100)</h2>
                <p className="font-larken font-thin text-2xl">Este es un texto con Larken Thin</p>
                <p className="font-larken font-thin italic text-xl">Este es un texto con Larken Thin Italic</p>
            </div>

            {/* Light (300) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Light (300)</h2>
                <p className="font-larken font-light text-2xl">Este es un texto con Larken Light</p>
                <p className="font-larken font-light italic text-xl">Este es un texto con Larken Light Italic</p>
            </div>

            {/* Regular (400) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Regular (400)</h2>
                <p className="font-larken font-normal text-2xl">Este es un texto con Larken Regular</p>
                <p className="font-larken italic text-xl">Este es un texto con Larken Italic</p>
            </div>

            {/* Medium (500) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Medium (500)</h2>
                <p className="font-larken font-medium text-2xl">Este es un texto con Larken Medium</p>
                <p className="font-larken font-medium italic text-xl">Este es un texto con Larken Medium Italic</p>
            </div>

            {/* Bold (700) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Bold (700)</h2>
                <p className="font-larken font-bold text-2xl">Este es un texto con Larken Bold</p>
                <p className="font-larken font-bold italic text-xl">Este es un texto con Larken Bold Italic</p>
            </div>

            {/* Extra Bold (800) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Extra Bold (800)</h2>
                <p className="font-larken font-extrabold text-2xl">Este es un texto con Larken Extra Bold</p>
                <p className="font-larken font-extrabold italic text-xl">Este es un texto con Larken Extra Bold Italic</p>
            </div>

            {/* Black (900) */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-700">Black (900)</h2>
                <p className="font-larken font-black text-2xl">Este es un texto con Larken Black</p>
                <p className="font-larken font-black italic text-xl">Este es un texto con Larken Black Italic</p>
            </div>

            {/* Ejemplos de uso en componentes */}
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Ejemplos de uso en componentes:</h3>

                <div className="space-y-4">
                    {/* Botón */}
                    <button className="font-larken font-bold bg-green-menu text-white px-6 py-3 rounded-lg hover:bg-green-text-dark transition-colors">
                        Botón con Larken Bold
                    </button>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Input con Larken Regular"
                        className="font-larken font-normal w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-menu"
                    />

                    {/* Card */}
                    <div className="font-larken font-medium bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-lg mb-2">Título de la tarjeta</h4>
                        <p className="font-normal">Contenido de la tarjeta con Larken Medium</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FontExample;
