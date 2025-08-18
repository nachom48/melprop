import React from 'react';
import { useUser } from '../context/UserContext';
import ProfileLayout from '../components/ProfileLayout';
import styled from 'styled-components';

const SearchesContainer = styled.div`
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

const SearchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchCard = styled.div`
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

const SearchTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const SearchDetails = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const SearchUrl = styled.a`
  color: #059669;
  text-decoration: none;
  font-size: 12px;
  
  &:hover {
    text-decoration: underline;
  }
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

const SavedSearches: React.FC = () => {
  const { savedSearches, removeSavedSearch } = useUser();

  const handleRemoveSearch = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta búsqueda guardada?')) {
      await removeSavedSearch(id);
    }
  };

  return (
    <ProfileLayout
      title="Búsquedas guardadas"
      favoritesCount={0}
      searchesCount={savedSearches.length}
    >
      <SearchesContainer>
        {savedSearches.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>No tienes búsquedas guardadas</EmptyTitle>
            <EmptyText>
              Aún no has guardado ninguna búsqueda.
              <br />
              Cuando realices búsquedas, podrás guardarlas para recibir notificaciones.
            </EmptyText>
          </EmptyState>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>
                Búsquedas guardadas ({savedSearches.length})
              </h3>
            </div>

            <SearchesList>
              {savedSearches.map((search: any) => (
                <SearchCard key={search.id}>
                  <SearchTitle>{search.name || 'Búsqueda sin nombre'}</SearchTitle>
                  <SearchDetails>
                    {search.alert_type && `Tipo de alerta: ${search.alert_type} • `}
                    Guardada recientemente
                  </SearchDetails>
                  {search.url && (
                    <SearchUrl href={search.url} target="_blank" rel="noopener noreferrer">
                      Ver búsqueda
                    </SearchUrl>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Recibirás notificaciones cuando haya nuevas propiedades
                    </span>
                    <RemoveButton onClick={() => handleRemoveSearch(search.id)}>
                      Eliminar búsqueda
                    </RemoveButton>
                  </div>
                </SearchCard>
              ))}
            </SearchesList>
          </>
        )}
      </SearchesContainer>
    </ProfileLayout>
  );
};

export default SavedSearches; 