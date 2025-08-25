import React from 'react';

interface HeaderDetailProps {
    headerImage: string;
    title: string;
    subtitle?: string;
    className?: string;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({
    headerImage,
    title,
    subtitle,
    className = ""
}) => {
    return (
        <div className={`relative w-full h-screen pt-16 ${className}`}>
            {/* Imagen de fondo de pantalla completa */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${headerImage})`
                }}
            />

            {/* Overlay oscuro para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-black bg-opacity-30" />

            {/* Contenido del header */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl">
                    <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {title}
                    </h3>
                    <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {subtitle}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default HeaderDetail;
