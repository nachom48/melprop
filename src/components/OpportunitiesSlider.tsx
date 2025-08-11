import React from 'react';

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
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <h3 className="text-green-text-dark mb-3 text-4xl">Oportunidades</h3>
              <p className="text-green-menu max-w-[400px] text-sm leading-6">
                Descubrí las mejores propiedades en oportunidad con Mel ¡No te pierdas lo que tenemos para ofrecerte!
              </p>
            </div>
            <div className="relative flex-1 flex justify-center">
              <div className="relative">
                {/* Card horizontal con estilos de PropertyCard */}
                <div className="border-grey-border-light rounded-3xl border-1 overflow-hidden bg-white w-[320px] md:w-[528px]">
                  <div className="flex h-full">
                    {/* Panel izquierdo - Texto */}
                    <div className="flex-1 p-4 md:px-8 md:py-6">
                      <span className="text-green-text-dark text-sm">
                        {opportunities[currentSlide].type} - {opportunities[currentSlide].propertyType}
                      </span>
                      <h3 className="text-2xl marker mb-3" style={{
                        fontFamily: 'var(--font-larken)',
                        color: 'var(--color-green-menu)',
                        fontStyle: 'normal',
                        fontWeight: 700
                      }}>
                        {opportunities[currentSlide].price}
                      </h3>
                      <div className="mb-3">
                        <strong style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontOpticalSizing: 'auto',
                          color: 'var(--color-green-text)',
                          fontStyle: 'normal',
                          fontWeight: 400
                        }}>
                          {opportunities[currentSlide].address}
                        </strong>
                        <p className="text-sm" style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontOpticalSizing: 'auto',
                          color: 'var(--color-green-text)',
                          fontStyle: 'normal',
                          fontWeight: 400
                        }}>
                          {opportunities[currentSlide].location}
                        </p>
                      </div>
                      <ul className="text-xxs flex flex-wrap gap-2">
                        <li style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontOpticalSizing: 'auto',
                          color: 'var(--color-green-text)',
                          fontStyle: 'normal',
                          fontWeight: 400
                        }}>
                          {opportunities[currentSlide].area}
                        </li>
                        <li style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontOpticalSizing: 'auto',
                          color: 'var(--color-green-text)',
                          fontStyle: 'normal',
                          fontWeight: 400
                        }}>
                          {opportunities[currentSlide].rooms}
                        </li>
                        <li style={{
                          fontFamily: 'var(--font-jakarta)',
                          fontOpticalSizing: 'auto',
                          color: 'var(--color-green-text)',
                          fontStyle: 'normal',
                          fontWeight: 400
                        }}>
                          {opportunities[currentSlide].bathrooms}
                        </li>
                      </ul>
                      <button className="btn btn-green !text-xs md:!px-10 mt-4">Ver propiedad</button>
                    </div>

                    {/* Panel derecho - Imagen */}
                    <div className="image flex-1">
                      <img
                        className="h-full w-full object-cover"
                        src={opportunities[currentSlide].image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Botones de navegación */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-green-menu)',
                    border: '3px solid #fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px'
                  }}
                  aria-label="Anterior"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-green-menu)',
                    border: '3px solid #fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px'
                  }}
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
    </div>
  );
};

export default OpportunitiesSlider;
