import React, { useState, useEffect } from 'react';

interface DevelopmentNavbarProps {
    developmentName: string;
    className?: string;
}

const DevelopmentNavbar: React.FC<DevelopmentNavbarProps> = ({
    developmentName,
    className = ""
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Cambiar a navbar sólido después de 100px de scroll
            setIsScrolled(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-transparent'
            } ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <div className={`font-bold text-2xl ${isScrolled ? 'text-green-text' : 'text-white'
                            }`}>
                            Mel
                            <div className="text-sm uppercase">INVERSIONES</div>
                        </div>

                        {/* Línea theme-yellow */}
                        <div className="w-16 h-0.5 bg-yellow"></div>

                        {/* Nombre del emprendimiento */}
                        <span className={`font-semibold uppercase ${isScrolled ? 'text-green-text' : 'text-white'
                            }`}>
                            {developmentName}
                        </span>
                    </div>

                    {/* Menú hamburguesa */}
                    <button className={`p-2 rounded-md ${isScrolled ? 'text-green-text' : 'text-white'
                        }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DevelopmentNavbar;
