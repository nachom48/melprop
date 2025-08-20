import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onHomeClick?: () => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    onHomeClick,
    className = ""
}) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        if (onHomeClick) {
            onHomeClick();
        } else {
            // Redirigir a la página principal
            navigate('/');
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            {/* Botón Home */}
            <div className="navButton">
                <button
                    onClick={handleHomeClick}
                    style={{ outline: 'none' }}
                    aria-label="Pantalla Inicio"
                    disabled={currentPage === 1}
                >
                    <span role="img" className="SVGInline">
                        <svg
                            className="SVGInline-svg"
                            viewBox="0 0 22 22"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22px"
                            height="22px"
                        >
                            <g id="Background">
                                <path
                                    d="M 11.7168 3.1748 C 11.3276 2.7646 10.7573 2.7246 10.3477 3.1147 L 3.0073 10.1748 C 2.5977 10.5947 2.5977 11.2749 3.0176 11.6846 C 3.2173 11.875 3.4775 11.9844 3.7476 11.9844 L 5.0073 12.0254 L 5.0073 17.4844 C 5.0073 17.7852 5.2373 18.0254 5.5376 18.0254 L 9.0073 18.0254 L 9.0073 12.0254 L 13.0078 12.0254 L 13.0078 18.0254 L 16.4873 18.0254 C 16.7773 18.0254 17.0078 17.7852 17.0078 17.4941 L 17.0078 12.0254 L 18.2578 12.0254 C 18.8379 12.0547 19.3281 11.6055 19.3574 11.0249 C 19.377 10.7246 19.2578 10.4248 19.0371 10.2148 L 11.7168 3.1748 Z"
                                    fill={currentPage === 1 ? "#B0B0B0" : "#707070"}
                                />
                            </g>
                        </svg>
                    </span>
                </button>
            </div>

            {/* Botón Anterior */}
            <div className="navButton">
                <button
                    onClick={handlePrevClick}
                    style={{ outline: 'none' }}
                    aria-label="Pantalla anterior"
                    disabled={isPrevDisabled}
                >
                    <span role="img" className="SVGInline">
                        <svg
                            className="SVGInline-svg"
                            viewBox="0 0 22 22"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22px"
                            height="22px"
                        >
                            <g id="Layer%201">
                                <path
                                    d="M 7.2092 10.3975 L 12.3992 5.2178 C 12.699 4.9277 13.1692 4.9277 13.469 5.2178 C 13.759 5.5078 13.759 5.9775 13.469 6.2778 L 8.8089 10.9277 L 13.469 15.5879 C 13.759 15.8779 13.759 16.3477 13.469 16.6475 C 13.1692 16.9277 12.699 16.9277 12.3992 16.6475 L 7.219 11.4575 C 6.929 11.1577 6.929 10.6875 7.2092 10.3975 L 7.2092 10.3975 Z"
                                    fill={isPrevDisabled ? "#B0B0B0" : "#707070"}
                                />
                            </g>
                        </svg>
                    </span>
                </button>
            </div>

            {/* Números de página */}
            <div
                data-auto="screenNumbers"
                className="screenNumbers"
                style={{ minWidth: '41.8667px' }}
            >
                {currentPage} de {totalPages}
            </div>

            {/* Botón Siguiente */}
            <div className="navButton">
                <button
                    onClick={handleNextClick}
                    style={{ outline: 'none' }}
                    aria-label="Pantalla siguiente"
                    disabled={isNextDisabled}
                >
                    <span role="img" className="SVGInline">
                        <svg
                            className="SVGInline-svg"
                            viewBox="0 0 22 22"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22px"
                            height="22px"
                        >
                            <g id="Layer%201">
                                <path
                                    d="M 14.4775 10.3975 L 9.2876 5.2178 C 8.9878 4.9277 8.5176 4.9277 8.2178 5.2178 C 7.9277 5.5078 7.9277 5.9775 8.2178 6.2778 L 12.8779 10.9277 L 8.2178 15.5879 C 7.9277 15.8779 7.9277 16.3477 8.2178 16.6475 C 8.5176 16.9277 8.9878 16.9277 9.2876 16.6475 L 14.4678 11.4575 C 14.7578 11.1577 14.7578 10.6875 14.4775 10.3975 L 14.4775 10.3975 Z"
                                    fill={isNextDisabled ? "#B0B0B0" : "#707070"}
                                />
                            </g>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
