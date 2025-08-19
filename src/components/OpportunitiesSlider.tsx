import React, { useState, useEffect } from 'react';

interface Opportunity {
  id: number;
  type: string;
  propertyType: string;
  price: string;
  address: string;
  location: string;
  area: string;
  rooms: string;
  bathrooms: string;
  image: string;
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    type: 'Venta',
    propertyType: 'Casa',
    price: 'U$S 265.000',
    address: 'Bucarelli 2989',
    location: 'Villa Úrquiza, Capital Federal',
    area: '110 m²',
    rooms: '4 Ambientes',
    bathrooms: '2 Baños',
    image: '/banner_img.png'
  },
  {
    id: 2,
    type: 'Venta',
    propertyType: 'Casa',
    price: 'U$S 265.000',
    address: 'Bucarelli 2989',
    location: 'Villa Úrquiza, Capital Federal',
    area: '110 m²',
    rooms: '4 Ambientes',
    bathrooms: '2 Baños',
    image: '/banner_img.png'
  },
  {
    id: 3,
    type: 'Venta',
    propertyType: 'Casa',
    price: 'U$S 265.000',
    address: 'Bucarelli 2989',
    location: 'Villa Úrquiza, Capital Federal',
    area: '110 m²',
    rooms: '4 Ambientes',
    bathrooms: '2 Baños',
    image: '/banner_img.png'
  }
];

const OpportunitiesSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % opportunities.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + opportunities.length) % opportunities.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10">
      <div className="container mx-auto px-4">
        <div className="bg-medium-grey rounded-2xl p-4 md:p-10">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <h3 className="!text-green-text-dark mb-3 text-4xl">Oportunidades</h3>
              <p className="text-green-menu max-w-[400px] text-sm leading-6">
                Descubrí las mejores propiedades en oportunidad con Mel ¡No te pierdas lo que tenemos para ofrecerte!
              </p>
            </div>
            <div className="relative flex-1">
              <div className="border-gray-border h-[210px] w-[320px] rounded-3xl border-2 md:h-[300px] md:w-[528px] overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    width: `${opportunities.length * 100}%`
                  }}
                >
                  {opportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="flex-shrink-0 w-full"
                      style={{ width: `${100 / opportunities.length}%` }}
                    >
                      <div className="flex overflow-hidden rounded-2xl h-full">
                        <div className="bg-white p-4 md:px-8 md:py-6 flex-shrink-0 w-1/2">
                          <div className="border-green-highcontrast mb-6 md:border-b-1 md:pb-6">
                            <span className="text-green-text-dark text-sm">
                              {opportunity.type} - {opportunity.propertyType}
                            </span>
                            <h3 className="text-green-text marker mb-3 text-xl md:text-2xl">
                              {opportunity.price}
                            </h3>
                            <div className="mb-3">
                              <strong>{opportunity.address}</strong>
                              <p className="hidden text-sm md:flex">{opportunity.location}</p>
                            </div>
                            <ul className="text-xxs hidden flex-wrap gap-2 md:flex">
                              <li>{opportunity.area}</li>
                              <li>{opportunity.rooms}</li>
                              <li>{opportunity.bathrooms}</li>
                            </ul>
                          </div>
                          <a href="" className="btn btn-green !text-xs md:!px-10">
                            Ver propiedad
                          </a>
                        </div>
                        <div className="image flex-1">
                          <img
                            className="aspect-[1/1.5] object-cover md:aspect-[1/1.2] h-full w-full"
                            src={opportunity.image}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevSlide}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-green-menu border-3 border-white rounded-full w-10 h-10"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-green-menu border-3 border-white rounded-full w-10 h-10"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesSlider;
