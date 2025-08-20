import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import PropertyCard from '../components/PropertyCard';
import styled from 'styled-components';

const CompraContainer = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
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

  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 18px;
    color: #666;
  }

  .error {
    text-align: center;
    padding: 2rem;
    font-size: 18px;
    color: #DE1E1E;
    background: #ffebee;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #666;
    font-size: 18px;
  }

  .load-more {
    text-align: center;
    margin: 2rem 0;
  }

  .load-more-btn {
    padding: 12px 24px;
    background: linear-gradient(to right, #ACA81F, #E8E215);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .load-more-btn:hover:not(:disabled) {
    background: linear-gradient(to right, #E8E215, #F5F3B5);
  }

  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Compra: React.FC = () => {
  const { addToFavorites, removeFromFavorites, favorites } = useUser();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // Datos mock para desarrollo
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        title: 'Casa en Venta',
        main_image: '/destacado_1.jpg',
        price: 'U$S 630.000',
        address: 'Moldes 1757',
        neighborhood: 'Belgrano, Capital Federal',
        area: 430,
        rooms: 5,
        bathrooms: 3,
        parking: 1,
        operation_type: 'Venta'
      },
      {
        id: 2,
        title: 'Departamento en Venta',
        main_image: '/destacado_2.jpg',
        price: 'U$S 265.000',
        address: 'Bucarelli 2989',
        neighborhood: 'Villa Úrquiza, Capital Federal',
        area: 110,
        rooms: 4,
        bathrooms: 2,
        parking: 1,
        operation_type: 'Venta'
      }
    ];

    setProperties(mockProperties);
    setCount(mockProperties.length);
    setLoading(false);
  }, []);

  const handleLoadMore = async () => {
    // Simular carga de más propiedades
    setLoading(true);
    setTimeout(() => {
      const moreProperties = [
        {
          id: 3,
          title: 'Casa en Venta',
          main_image: '/destacado_3.jpg',
          price: 'U$S 450.000',
          address: 'Burela 2300',
          neighborhood: 'Villa Úrquiza, Capital Federal',
          area: 256,
          rooms: 4,
          bathrooms: 2,
          parking: 0,
          operation_type: 'Venta'
        }
      ];
      setProperties(prev => [...prev, ...moreProperties]);
      setCount(prev => prev + moreProperties.length);
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = (propertyId: number) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  if (loading && properties.length === 0) {
    return (
      <CompraContainer>
        <div className="container">
          <div className="loading">
            Cargando propiedades...
          </div>
        </div>
      </CompraContainer>
    );
  }

  return (
    <CompraContainer>
      <div className="container">
        {/* Resumen de resultados */}
        <div className="results-summary">
          <div>
            <span className="text-green-menu font-bold">
              {count} propiedades encontradas
            </span>
          </div>
          <div className="text-sm">
            <span className="text-green-menu font-bold">
              Filtros aplicados: Compra
            </span>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Propiedades */}
        {properties.length > 0 ? (
          <>
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                />
              ))}
            </div>

            {/* Botón de cargar más */}
            {count > properties.length && (
              <div className="load-more">
                <button
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Cargar más propiedades'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            No se encontraron propiedades con los filtros seleccionados.
          </div>
        )}
      </div>
    </CompraContainer>
  );
};

export default Compra; 