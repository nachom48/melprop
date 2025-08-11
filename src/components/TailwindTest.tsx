import React from 'react';

const TailwindTest: React.FC = () => {
    return (
        <div className="p-8 bg-yellow text-black rounded-lg shadow-lg m-4">
            <h1 className="text-2xl font-bold mb-4">Prueba de Tailwind CSS + NextUI</h1>
            <p className="text-lg">Si ves este texto en negro sobre fondo amarillo con sombra, Tailwind CSS está funcionando correctamente.</p>
            <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold">
                Botón de Prueba
            </button>
        </div>
    );
};

export default TailwindTest;
