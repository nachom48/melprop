import React, { useState, useEffect } from 'react';
import { getDevelopments, getDevelopmentBanners } from '../services/auth';
import PropertyCard from '../components/PropertyCard';
import styled from 'styled-components';

const EmprendimientosContainer = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .search-filters {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .search-filters {
      flex-direction: row;
    }
  }

  .wrapper-input-search {
    flex: 1;
  }

  .input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
  }

  .select {
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    background: white;
  }

  .btn {
    padding: 12px 24px;
    background: linear-gradient(to right, #ACA81F, #E8E215);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn:hover {
    background: linear-gradient(to right, #E8E215, #F5F3B5);
  }

  .btn-white {
    background: white;
    color: #013921;
    border: 1px solid #013921;
  }

  .btn-white:hover {
    background: #f5f5f5;
  }

  .results-summary {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    background: #f5f5f5;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .results-summary {
      flex-direction: row;
    }
  }

  .text-green-menu {
    color: #12782e;
  }

  .text-sm {
    font-size: 14px;
  }

  .font-bold {
    font-weight: 700;
  }

  .results-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .results-actions {
      flex-direction: row;
    }
  }

  .results-actions ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .results-actions ul {
      flex-direction: row;
    }
  }

  .results-actions li {
    display: flex;
    gap: 0.5rem;
  }

  .results-actions a {
    font-size: 14px;
    color: #013921;
    text-decoration: none;
  }

  .results-actions img {
    width: 16px;
    height: 16px;
  }

  .properties-grid {
    margin: 2.5rem 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .property-card {
    border: 1px solid #b7b7b7;
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.2s;
  }

  .property-card:hover {
    transform: translateY(-2px);
  }

  .property-image {
    position: relative;
    overflow: hidden;
    border-radius: 24px 24px 0 0;
  }

  .property-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .favorite-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .favorite-btn:hover {
    background: #f0f0f0;
  }

  .favorite-btn.active {
    color: #ff6b6b;
  }

  .property-content {
    padding: 1rem;
  }

  .operation-badge {
    color: #003b1f;
    font-size: 14px;
  }

  .property-price {
    color: #013921;
    font-size: 24px;
    font-weight: 700;
    margin: 0.75rem 0;
  }

  .property-address {
    margin-bottom: 0.75rem;
  }

  .property-address strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .property-address p {
    font-size: 14px;
    color: #666;
  }

  .property-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 11px;
  }

  .property-features li {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .opportunities-section {
    background: #f5f5f5;
    border-radius: 16px;
    padding: 1rem;
    margin: 2.5rem 0;
  }

  @media (min-width: 768px) {
    .opportunities-section {
      padding: 2.5rem;
    }
  }

  .opportunities-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }

  @media (min-width: 768px) {
    .opportunities-content {
      flex-direction: row;
    }
  }

  .opportunities-text {
    flex: 1;
  }

  .opportunities-title {
    color: #003b1f;
    font-size: 36px;
    margin-bottom: 0.75rem;
  }

  .opportunities-description {
    color: #12782e;
    font-size: 14px;
    line-height: 1.5;
    max-width: 400px;
  }

  .banner-container {
    position: relative;
    flex: 1;
  }

  .banner-swiper {
    border: 2px solid #ccc;
    border-radius: 24px;
    height: 210px;
    width: 320px;
  }

  @media (min-width: 768px) {
    .banner-swiper {
      height: 300px;
      width: 528px;
    }
  }

  .banner-slide {
    display: flex;
    overflow: hidden;
    border-radius: 16px;
  }

  .banner-content {
    background: white;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .banner-content {
      padding: 1.5rem 2rem;
    }
  }

  .banner-info {
    border-bottom: 1px solid #d4f2ac;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .banner-price {
    color: #013921;
    font-size: 20px;
    font-weight: 700;
    margin: 0.75rem 0;
  }

  @media (min-width: 768px) {
    .banner-price {
      font-size: 24px;
    }
  }

  .banner-address {
    margin-bottom: 0.75rem;
  }

  .banner-address strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .banner-address p {
    font-size: 14px;
    color: #666;
  }

  .banner-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 11px;
  }

  .banner-features li {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .banner-btn {
    background: linear-gradient(to right, #ACA81F, #E8E215);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .banner-btn {
      padding: 12px 40px;
    }
  }

  .banner-image {
    flex: 1;
  }

  .banner-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .recommendations-section {
    margin: 2.5rem 0;
  }

  .recommendations-header {
    margin-bottom: 1.5rem;
  }

  .recommendations-title {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }

  .recommendations-subtitle {
    font-size: 14px;
    color: #666;
  }

  .banner-section {
    margin: 2.5rem 0;
  }

  .banner-full {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .banner-full {
      flex-direction: row;
      height: 250px;
    }
  }

  .banner-image-full {
    height: 100%;
    flex: 1;
  }

  @media (min-width: 768px) {
    .banner-image-full {
      flex: 0 0 498px;
    }
  }

  .banner-image-full img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-content-full {
    background: #8acc36;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 2rem;
  }

  @media (min-width: 768px) {
    .banner-content-full {
      padding: 2.5rem;
    }
  }

  .banner-title-full {
    color: #003b1f;
    font-size: 30px;
    margin-bottom: 1rem;
  }

  .banner-description-full {
    color: white;
    margin-bottom: 1rem;
  }

  .btn-plain {
    background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 8px;
    padding: 12px 40px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }

  .btn-plain:hover {
    background: white;
    color: #8acc36;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .top-[-10px] {
    top: -10px;
  }

  .right-[-10px] {
    right: -10px;
  }

  .z-4 {
    z-index: 4;
  }

  .flex {
    display: flex;
  }

  .h-8 {
    height: 32px;
  }

  .w-8 {
    width: 32px;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .rounded-full {
    border-radius: 50%;
  }

  .border-3 {
    border-width: 3px;
  }

  .border-white {
    border-color: white;
  }

  .text-sm {
    font-size: 14px;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-white {
    color: white;
  }

  .bg-green-menu {
    background-color: #12782e;
  }
`;

const Emprendimientos: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesData, bannersData] = await Promise.all([
          getDevelopments(),
          getDevelopmentBanners()
        ]);

        setProperties(propertiesData?.objects || []);
        setBanners(bannersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <EmprendimientosContainer>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Cargando emprendimientos...
          </div>
        </div>
      </EmprendimientosContainer>
    );
  }

  return (
    <EmprendimientosContainer>
      <div className="container">
        {/* Barra de búsqueda y filtros */}
        <div className="search-filters">
          <div className="wrapper-input-search">
            <input type="text" placeholder="Ingresá ciudades o barrios" className="input" />
          </div>
          <div>
            <select className="select">
              <option value="">Comprar</option>
              <option value="">Vender</option>
            </select>
          </div>
          <div>
            <select className="select">
              <option value="">Propiedades</option>
            </select>
          </div>
          <div>
            <select className="select">
              <option value="">Amb | Dorm</option>
            </select>
          </div>
          <div>
            <select className="select">
              <option value="">Precio</option>
              <option value="">Mas de 50.000$</option>
              <option value="">Mas de 100.000$</option>
            </select>
          </div>
          <div className="relative">
            <div className="bg-green-menu text-small absolute top-[-10px] right-[-10px] z-4 flex h-8 w-8 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-white">
              <span>3</span>
            </div>
            <button className="btn btn-white">Más filtros</button>
          </div>
        </div>

        {/* Resumen de resultados */}
        <div className="results-summary">
          <div>
            <div className="text-green-menu text-sm font-bold">Emprendimientos en Oportunidad</div>
            <div className="text-sm">{properties.length} resultados</div>
          </div>
          <div className="results-actions">
            <ul>
              <li><a href="">Ver mapa</a><img src="/map.svg" alt="" /></li>
              <li><a href="">Ver favoritos</a><img src="/heart.svg" alt="" /></li>
              <li><a href="">Guardar búsqueda</a><img src="/save.svg" alt="" /></li>
              <li>
                <select className="select">
                  <option value="">En oportunidad</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

        {/* Grid de propiedades con el mismo estilo de Home (PropertyCard) */}
        <div className="properties-grid">
          <div className="grid">
            {properties.slice(0, 6).map((dev: any, index: number) => {
              const mapped = {
                id: dev.id || index,
                main_image: dev.main_image,
                price: dev.min_price ? `U$S ${dev.min_price}` : dev.price,
                address: dev.address?.split(',')[0] || dev.title,
                location: dev.neighborhood || dev.address,
                area: dev.area,
                rooms: dev.rooms,
                bathrooms: dev.bathrooms,
                parking: dev.parking,
                operation_type: dev.property_type ? `Venta - ${dev.property_type}` : 'Venta',
                title: dev.title,
              } as any;
              return (
                <PropertyCard key={mapped.id} property={mapped} />
              );
            })}
          </div>
        </div>

        {/* Sección de oportunidades */}
        <div className="opportunities-section">
          <div className="opportunities-content">
            <div className="opportunities-text">
              <h3 className="opportunities-title">Oportunidades</h3>
              <p className="opportunities-description">
                Descubrí las mejores propiedades en oportunidad con Mel ¡No te pierdas lo que tenemos para ofrecerte!
              </p>
            </div>
            <div className="banner-container">
              {banners.length > 0 && (
                <div className="banner-swiper">
                  <div className="banner-slide">
                    <div className="banner-content">
                      <div className="banner-info">
                        <span className="operation-badge">Venta - Casa</span>
                        <h3 className="banner-price">U$S {properties[0]?.min_price || '265.000'}</h3>
                        <div className="banner-address">
                          <strong>{properties[0]?.address?.split(',')[0] || 'Bucarelli 2989'}</strong>
                          <p>{properties[0]?.neighborhood || 'Villa Úrquiza, Capital Federal'}</p>
                        </div>
                        <ul className="banner-features">
                          <li>110 m²</li>
                          <li>4 Ambientes</li>
                          <li>2 Baños</li>
                        </ul>
                      </div>
                      <a href="" className="banner-btn">Ver propiedad</a>
                    </div>
                    <div className="banner-image">
                      <img src={banners[0]?.image_desktop?.url || "/banner_img.png"} alt="Banner" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Segunda grid de propiedades con PropertyCard */}
        <div className="properties-grid">
          <div className="grid">
            {properties.slice(6, 9).map((dev: any, index: number) => {
              const mapped = {
                id: dev.id || index + 6,
                main_image: dev.main_image,
                price: dev.min_price ? `U$S ${dev.min_price}` : dev.price,
                address: dev.address?.split(',')[0] || dev.title,
                location: dev.neighborhood || dev.address,
                area: dev.area,
                rooms: dev.rooms,
                bathrooms: dev.bathrooms,
                parking: dev.parking,
                operation_type: dev.property_type ? `Venta - ${dev.property_type}` : 'Venta',
                title: dev.title,
              } as any;
              return (
                <PropertyCard key={mapped.id} property={mapped} />
              );
            })}
          </div>
        </div>

        {/* Sección de recomendaciones */}
        <div className="recommendations-section">
          <div className="recommendations-header">
            <h3 className="recommendations-title">Te puede interesar</h3>
            <p className="recommendations-subtitle">En base a tus búsquedas mas recientes</p>
          </div>
          <div className="grid">
            {properties.slice(9, 12).map((dev: any, index: number) => {
              const mapped = {
                id: dev.id || index + 9,
                main_image: dev.main_image,
                price: dev.min_price ? `U$S ${dev.min_price}` : dev.price,
                address: dev.address?.split(',')[0] || dev.title,
                location: dev.neighborhood || dev.address,
                area: dev.area,
                rooms: dev.rooms,
                bathrooms: dev.bathrooms,
                parking: dev.parking,
                operation_type: dev.property_type ? `Venta - ${dev.property_type}` : 'Venta',
                title: dev.title,
              } as any;
              return (
                <PropertyCard key={mapped.id} property={mapped} />
              );
            })}
          </div>
        </div>

        {/* Banner final */}
        <div className="banner-section">
          <div className="banner-full">
            <div className="banner-image-full">
              <img src="/banner_img_2.png" alt="Banner" />
            </div>
            <div className="banner-content-full">
              <h3 className="banner-title-full">¡Encontrá tu hogar ideal en Villa Urquiza!</h3>
              <p className="banner-description-full">
                Conocé nuestras exclusivas unidades de 3 ambientes con cochera listas para comenzar a vivir!
              </p>
              <a href="" className="btn-plain">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </EmprendimientosContainer>
  );
};

export default Emprendimientos; 