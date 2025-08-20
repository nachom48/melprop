import React from 'react';
import { useUser } from '../context/UserContext';
import ProfileLayout from '../components/ProfileLayout';
import styled from 'styled-components';

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #d1d5db;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FavoriteCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: white;
  transition: all 0.2s;
  
  &:hover {
    border-color: #059669;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const PropertyDetails = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #dc2626;
  }
`;

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useUser();

  const handleRemoveFavorite = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres quitar esta propiedad de favoritos?')) {
      await removeFromFavorites(id);
    }
  };

  return (
    <ProfileLayout
      title="Mis favoritos"
      favoritesCount={favorites.length}
      searchesCount={0}
    >
      <FavoritesContainer>
        {favorites.length === 0 ? (
          <EmptyState>
            <EmptyIcon>❤️</EmptyIcon>
            <EmptyTitle>No tienes favoritos</EmptyTitle>
            <EmptyText>
              Aún no has agregado ninguna propiedad a tus favoritos.
              <br />
              Explora las propiedades disponibles y agrega las que más te gusten.
            </EmptyText>
          </EmptyState>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>
                Propiedades favoritas ({favorites.length})
              </h3>
            </div>

            <FavoritesList>
              {favorites.map((favorite: any) => (
                <FavoriteCard key={favorite.id}>
                  <PropertyTitle>{favorite.title || favorite.name || 'Propiedad'}</PropertyTitle>
                  <PropertyDetails>
                    {favorite.location && `${favorite.location} • `}
                    {favorite.price && `$${favorite.price.toLocaleString()}`}
                  </PropertyDetails>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Agregado recientemente
                    </span>
                    <RemoveButton onClick={() => handleRemoveFavorite(favorite.id)}>
                      Quitar de favoritos
                    </RemoveButton>
                  </div>
                </FavoriteCard>
              ))}
            </FavoritesList>
          </>
        )}
      </FavoritesContainer>
    </ProfileLayout>
  );
};

export default Favorites; 