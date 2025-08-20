import React, { useState } from 'react';

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
    image: '/oportunidades_1.jpg'
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
    image: '/oportunidades_2.jpg'
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
    image: '/best_3.png'
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

  return (
    <div className="my-10">
      <div className="container mx-auto px-4">
        <div className="bg-medium-grey rounded-2xl p-4 md:p-10">
          <div className="flex flex-col items-center gap-6 md:gap-10 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <h3 className="!text-green-text-dark mb-3 text-3xl md:text-4xl">Oportunidades</h3>
              <p className="text-green-menu max-w-[400px] text-sm leading-6 mx-auto md:mx-0">
                Descubrí las mejores propiedades en oportunidad con Mel ¡No te pierdas lo que tenemos para ofrecerte!
              </p>
            </div>
            <div className="relative flex-1 flex justify-center">
              <div className="border-gray-300 h-[280px] w-[320px] rounded-3xl border-2 md:h-[300px] md:w-[528px] overflow-hidden mb-4 md:mb-0">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / opportunities.length)}%)`,
                    width: `${opportunities.length * 100}%`
                  }}
                >
                  {opportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="w-full h-full flex-shrink-0 pb-8 md:pb-0"
                      style={{ width: `${100 / opportunities.length}%` }}
                    >
                      <div className="flex h-full">
                        <div className="bg-white p-4 md:px-8 md:py-6 w-1/2 flex flex-col justify-between">
                          <div className="border-b border-gray-200 pb-4 md:pb-6">
                            <span className="text-green-text-dark text-sm font-semibold">
                              {opportunity.type} - {opportunity.propertyType}
                            </span>
                            <h3 className="text-green-text-dark price-underline mb-3 text-xl md:text-2xl font-bold">
                              {opportunity.price}
                            </h3>
                            <div className="mb-3">
                              <strong className="text-gray-800">{opportunity.address}</strong>
                              <p className="hidden text-sm md:flex text-gray-600">{opportunity.location}</p>
                            </div>
                            <ul className="text-xxs hidden flex-wrap gap-2 md:flex text-gray-600">
                              <li>{opportunity.area}</li>
                              <li>{opportunity.rooms}</li>
                              <li>{opportunity.bathrooms}</li>
                            </ul>
                          </div>
                          <div className="pt-2">
                            <a href="" className="btn btn-green !text-xs md:!px-10 w-full md:w-auto text-center">
                              Ver propiedad
                            </a>
                          </div>
                        </div>
                        <div className="w-1/2 h-full">
                          <img
                            className="w-full h-full object-cover"
                            src={opportunity.image}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de navegación con las clases CSS de la maqueta */}
              <div className="swiper-button-prev" onClick={prevSlide}></div>
              <div className="swiper-button-next" onClick={prevSlide}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesSlider;
