import React, { useState, useEffect } from 'react';
import { getProperties } from '../services/auth';
import { useUser } from '../context/UserContext';
import PropertyCard from '../components/PropertyCard';
import styled from 'styled-components';

const CompraContainer = styled.div`
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

  .text-white {
    color: white;
  }

  .bg-green-menu {
    background-color: #12782e;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 18px;
    color: #666;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #666;
  }

  .no-results h3 {
    font-size: 24px;
    margin-bottom: 1rem;
  }

  .no-results p {
    font-size: 16px;
  }
`;

// Tipos de propiedades disponibles
const propertyTypes = [
    { value: 'departamento', label: 'Departamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'ph', label: 'PH' },
    { value: 'deposito', label: 'Depósito' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'local', label: 'Local' },
    { value: 'edificio-block', label: 'Edificio en block' }
];

// Ubicaciones disponibles
const locations = [
    'Belgrano',
    'Villa Urquiza',
    'Nuñez',
    'Palermo',
    'Colegiales'
];

// Ambientes disponibles
const rooms = [
    { value: '1', label: '1 ambiente' },
    { value: '2', label: '2 ambientes' },
    { value: '3', label: '3 ambientes' },
    { value: '4', label: '4 ambientes' },
    { value: '4+', label: '+4 ambientes' }
];

// Características disponibles
const amenities = [
    { value: 'cochera', label: 'Cochera' },
    { value: 'vestidor', label: 'Vestidor' },
    { value: 'terraza', label: 'Terraza' },
    { value: 'piscina', label: 'Piscina' },
    { value: 'parrilla', label: 'Parrilla' },
    { value: 'toilette', label: 'Toilette' }
];

// Estados disponibles
const states = [
    { value: 'estrenar', label: 'A estrenar' },
    { value: 'hasta5', label: 'Hasta 5 años' },
    { value: 'hasta10', label: 'Hasta 10 años' },
    { value: '+de10', label: '+ de 10 años' }
];

const Compra: React.FC = () => {
    const { user, addToFavorites, removeFromFavorites, favorites } = useUser();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        operation: ['venta'],
        properties: [],
        locations: [],
        rooms: [],
        amenities: [],
        states: [],
        min_price: '',
        max_price: '',
        currency: 'USD'
    });

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            // Construir parámetros de búsqueda
            const params: any = {
                operation: filters.operation,
                ...(filters.properties.length > 0 && { properties: filters.properties }),
                ...(filters.locations.length > 0 && { locations: filters.locations }),
                ...(filters.rooms.length > 0 && { rooms: filters.rooms }),
                ...(filters.amenities.length > 0 && { amenities: filters.amenities }),
                ...(filters.min_price && { min_price: filters.min_price }),
                ...(filters.max_price && { max_price: filters.max_price }),
                ...(filters.currency && { currency: filters.currency })
            };

            const response = await getProperties(params);
            setProperties(response?.objects || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterType: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleCheckboxChange = (filterType: string, value: string) => {
        setFilters(prev => {
            const currentValues = prev[filterType as keyof typeof prev] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [filterType]: newValues
            };
        });
    };

    const clearFilters = () => {
        setFilters({
            operation: ['venta'],
            properties: [],
            locations: [],
            rooms: [],
            amenities: [],
            states: [],
            min_price: '',
            max_price: '',
            currency: 'USD'
        });
    };

    const handleFavoriteToggle = async (propertyId: number) => {
        if (!user) {
            // Mostrar modal de login si no está logueado
            return;
        }

        const isFavorite = favorites.some(fav => fav.id === propertyId);

        if (isFavorite) {
            await removeFromFavorites(propertyId);
        } else {
            const property = properties.find(p => p.id === propertyId);
            if (property) {
                await addToFavorites(property);
            }
        }
    };

    const getActiveFiltersCount = () => {
        return (
            filters.properties.length +
            filters.locations.length +
            filters.rooms.length +
            filters.amenities.length +
            filters.states.length +
            (filters.min_price ? 1 : 0) +
            (filters.max_price ? 1 : 0)
        );
    };

    if (loading) {
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
                {/* Barra de búsqueda y filtros */}
                <div className="search-filters">
                    <div className="wrapper-input-search">
                        <input
                            type="text"
                            placeholder="Ingresá ciudades o barrios"
                            className="input"
                        />
                    </div>
                    <div>
                        <select
                            className="select"
                            value={filters.currency}
                            onChange={(e) => handleFilterChange('currency', e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="ARS">ARS</option>
                        </select>
                    </div>
                    <div>
                        <select className="select">
                            <option value="">Propiedades</option>
                            {propertyTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="select">
                            <option value="">Amb | Dorm</option>
                            {rooms.map(room => (
                                <option key={room.value} value={room.value}>
                                    {room.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="select">
                            <option value="">Precio</option>
                            <option value="50000">Mas de 50.000$</option>
                            <option value="100000">Mas de 100.000$</option>
                        </select>
                    </div>
                    <div className="relative">
                        <div className="bg-green-menu text-small absolute top-[-10px] right-[-10px] z-4 flex h-8 w-8 items-center justify-center rounded-full border-3 border-white text-sm font-bold text-white">
                            <span>{getActiveFiltersCount()}</span>
                        </div>
                        <button className="btn btn-white" onClick={clearFilters}>
                            Más filtros
                        </button>
                    </div>
                </div>

                {/* Resumen de resultados */}
                <div className="results-summary">
                    <div>
                        <div className="text-green-menu text-sm font-bold">
                            Casas, Departamentos y PH en Venta
                        </div>
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

                {/* Grid de propiedades */}
                <div className="properties-grid">
                    {properties.length > 0 ? (
                        <div className="grid">
                            {properties.map((property) => (
                                <div key={property.id} className="property-card">
                                    <div className="property-image">
                                        <img src={property.main_image} alt={property.title} />
                                        <button
                                            className={`favorite-btn ${favorites.some(fav => fav.id === property.id) ? 'active' : ''}`}
                                            onClick={() => handleFavoriteToggle(property.id)}
                                        >
                                            <i className={`${favorites.some(fav => fav.id === property.id) ? 'fas' : 'far'} fa-heart`}></i>
                                        </button>
                                    </div>
                                    <div className="property-content">
                                        <span className="operation-badge">
                                            Venta - {property.property_type || 'Propiedad'}
                                        </span>
                                        <h3 className="property-price">
                                            {filters.currency === 'USD' ? 'U$S' : '$'} {property.price}
                                        </h3>
                                        <div className="property-address">
                                            <strong>{property.address?.split(',')[0] || property.title}</strong>
                                            <p>{property.neighborhood || property.address}</p>
                                        </div>
                                        <ul className="property-features">
                                            {property.area && <li>{property.area} m²</li>}
                                            {property.rooms && <li>{property.rooms} Ambientes</li>}
                                            {property.bathrooms && <li>{property.bathrooms} Baños</li>}
                                            {property.parking && <li>{property.parking} Cochera</li>}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No se encontraron propiedades</h3>
                            <p>Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    )}
                </div>
            </div>
        </CompraContainer>
    );
};

export default Compra; 